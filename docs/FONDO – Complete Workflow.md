# FONDO — Complete Workflow

> **Working reference.** This doc replaces `docs/FONDO – Complete System Workflow.md` (the PRD, kept for historical requirements). Read this first; it reflects the *actual* MVP build, the post-merge schema, and what is deferred to future mini-plans.

- **Business model:** Centralized marketplace — customer never sees the vendor. Admin transparently swaps the vendor fulfilling a package. No zones in MVP; the order vendor resolves from the package.
- **Stack:** Next.js 16 (App Router) + Express 5 custom server + Prisma/Neon + Redux Toolkit (RTK Query) + Tailwind v4 + shadcn/ui.
- **Status legend:** 🟢 built & wired · 🟡 built with known gap · ⚪ planned (schema only, no routes) · 🔴 broken (needs fix).

---

## 1. Roles

Only **5 active roles** (DB enum trimmed). Kitchen/Vendor-Staff/Support are collapsed into these.

| Role         | What they do                                                                  | Auth gate                          |
| ------------ | ----------------------------------------------------------------------------- | ---------------------------------- |
| `SUPER_ADMIN`| Platform owner, everything `ADMIN` does + settlement/revenue control           | `verifyToken` + `authorize`        |
| `ADMIN`      | Approve vendor foods/packages, manage catalog, orders, users, coupons         | `verifyToken` + `authorize`        |
| `VENDOR`     | Self-service: manage own foods (via vendor/food), accept orders, kitchen ops   | `verifyToken` + `hasPermission("foods")` |
| `RIDER`      | Accept delivery, update delivery status, upload delivery proof                 | ⚪ planned (no routes yet)          |
| `CUSTOMER`   | Browse, subscribe, order, pay, track, review                                   | `verifyToken` + `authorize("CUSTOMER")` |

> `VENDOR_STAFF` model removed. Vendor identity = `User.vendorId → Vendor`. Server resolves the vendor with `vendor.findFirst({ where: { user: { id: userId } } })`.

### Permission modules (`hasPermission`)

`users`, `foods`, `packages`, `orders`, `vendors`, `settings`, `coupons`, `reports`. Super-admin always passes. Admin user → module toggles live in `UserPermission`. Without a toggle, a module endpoint returns `403`.

---

## 2. Core business loop

```
              admin approves food/package
                        │
  Vendor ──creates──► Food / Package (PENDING) ──► APPROVED ──► published
                        ▲                                   │
  Admin creates ────────┘            (admin-created ⇒ auto-APPROVED)
                        │
  Customer: browse → cart → checkout → SSLCommerz sandbox payment ──► Order (PENDING → CONFIRMED)
                        │
              package carries vendorId → order.vendorId resolved at creation
                        │
  Vendor kitchen: update meal status (PREPARING → READY) on vendor Orders page
                        │
  Admin assigns rider (planned) → Delivery (planned)
                        │
  Customer tracks order (planned) → payment settles → wallet credit (refund/withdraw)
```

**One-vendor-per-package.** In MVP a package belongs to exactly one vendor (`Package.vendorId`). Daily orders take that vendor. Admin can later re-assign orders to a different vendor (order-level `vendorId` exists).

---

## 3. Auth & account (`/api/auth`, `/api/users`)

- Register (customer), login, OTP send/verify, refresh, logout, me.
- Forgot/reset password via OTP flow.
- Change password (authed).
- Profile update, delete-me.
- Sub-resources: addresses, devices, notification-settings, login-history.
- Admin: user CRUD + `POST /api/users` (⚠️ body **not** validated — fix in security pass).

**JWT:** access token in header, refresh token in HttpOnly cookie. 401 auto-triggers `/auth/refresh`; concurrent failed requests are queued on the client.

---

## 4. Food catalog (`/api/foods`, `/api/admin/foods`, `/api/vendor/foods`)

- Public: list (only `FoodStatus.APPROVED`), slug detail, categories, tags, reviews, favorites.
- Admin: full food CRUD + variants, addons, addon items, nutrition, ingredients, allergens, prices, images, discounts, tags, labels, availability, schedules, visibility, approval (`approve`/`reject`).
- Vendor: create/list/get own vendor-food links, update food status. Vendor-created food is `PENDING` until admin approves.
- Food approval fields: `approvedBy`, `approvedAt`, `rejectionReason` (`FoodStatus` enum).

### FoodStatus lifecycle

```
Vendor creates ──► PENDING ──admin──► APPROVED (published to catalog)
                     │                    │
                     └────admin reject────┘  (rejectionReason set)
Admin creates ─────────────────────────► APPROVED (auto)
```

---

## 5. Packages (`/api/package`)

- Public: list, detail. Categories list.
- Vendor: create package, view open requests, accept custom request.
- Customer: custom meal-plan request, pay for custom order.
- Reviews: create/update/delete (customer), pending-moderation list + status toggle (admin).

**Known gap:** `createVendorPackage` trusts a client-sent `status` (a vendor can self-publish). Fix in security pass → status is server-assigned (`draft`/`pending`), admin approves.

**Schema note:** `Package` gains `vendorId → Vendor` (one vendor per package). Package children (`PackageDay`, `PackageMeal`, `PackageMealFood`, prices, rules, benefits, nutrition, schedule, images, tags, reviews, rating, customization, availability, `CustomMealPlan`) stay.

---

## 6. Cart & checkout (`/api/cart`)

- Cart init, get, clear; items add/update/remove; addons add/remove.
- Meal-based cart (package flow): add/remove meals, add/remove food in a meal.
- Checkout: summary, apply/remove coupon, select address, **place-order**.
- Place order → payment initiation (SSLCommerz sandbox).

**Known gap:** `paymentUrl` produced by order-creation is broken/misbuilt; retry relies on the canonical initiate call. Flagged in orderCreationService.

---

## 7. Payment (`/api/payments`)

**Gateway:** SSLCommerz **sandbox only** (no live merchant flow).

- Public/gateway callbacks: `/payments/success|fail|cancel|ipn` (GET+POST).
- Customer: `initiate`, `retry`.
- Admin: `refund`, `adjust` (internal ledger → wallet credit, admin approved).
- Query: `list` (customer sees own, admin sees all), `getById`.
- `PaymentMethod` seeded at boot (bkash, nagad, cod(default), card, rocket).

### Payment status lifecycle

```
PENDING → PROCESSING → COMPLETED
              │           │
              ├── FAILED ──┘ (retry allowed)
              └── CANCELLED
COMPLETED ──refund──► REFUNDED / PARTIALLY_REFUNDED (internal wallet, admin approval)
```

---

## 8. Orders (`/api/orders`)

- Customer: list, getById, update, cancel, submit feedback, invoice, invoice download (PDF).
- Admin: **all order endpoints are 🔴 broken** — admin routes lack `verifyToken` (see §Security), so `authorize` always 401s. Routes exist: delete, update status, assign vendor, assign rider, list-all, list-vendor, refund, list-refunds, update meal status.
- Meal-level status lives on the vendor Orders page (`/order-meals/:id/status`) — kitchen dashboard was deleted.

### Order status lifecycle

```
PENDING → PAYMENT_PENDING → CONFIRMED → PREPARING → READY_FOR_PICKUP → PICKED_UP
    │                                                                    │
    └── CANCELLED ◄──────────────────────────────────────────────────────┘
→ ON_THE_WAY → DELIVERED → COMPLETED   (refund ⇒ REFUNDED)
```

`DeliveryStatus` (parallel tracking): PENDING → ASSIGNED → ACCEPTED → PICKED_UP → ON_THE_WAY → ARRIVED → DELIVERED / FAILED / CANCELLED.

---

## 9. Delivery & riders ⚪ planned

- Models exist (`Rider*`, `Delivery*`, `Tracking*`, `Route*`) — kept in schema, marked **Future**.
- **No rider routes yet.** Assigning a rider (`/orders/:id/assign-rider`), delivery status updates, live tracking, proofs, and ETA are part of the rider mini-plan.
- MVP delivery UX = customer sees order + meal status; admin manually manages assignment (when routes are built).

---

## 10. Wallet & settlements

- Customer: `GET /wallet`, transactions, top-up (SSLCommerz callback), withdraw (admin-approved).
- Admin: list withdrawals, approve, reject.
- Vendor: wallet balance, settlement history (admin-managed); **self-service wallet is 🟡** — vendor calls currently hit a 403 because they lack the `vendors` permission module.
- Admin settlements: create/process settlement, platform revenue report.
- Refunds land in customer wallet (internal), not gateway pushback (sandbox has no real refund API in use).

---

## 11. Coupons (`/api/admin/coupons`)

- Admin CRUD only. Applied at checkout via `/cart/checkout/apply-coupon`.

---

## 12. Support & notifications

- **Chat/support → email + WhatsApp.** No DB tables. Contact page form → nodemailer (`SUPPORT_EMAIL`); WhatsApp button → `SUPPORT_WHATSAPP` `wa.me` link.
- **Notifications:** refresh-button only (RTK Query tag invalidation on dashboard header). Manual refresh beats polling on Neon free tier (9-connection pool). No socket/bell/push in MVP.
- Notification *settings* (per-user toggles) live at `/api/users/me/notification-settings`.

---

## 13. Schema (post-merge) summary

183 → **~160 models.** Merge/drop executed this pass:

| Dropped model          | Why / replacement                                                       |
| ---------------------- | ----------------------------------------------------------------------- |
| `FoodGallery`          | Identical to `FoodImage` (used). Drop.                                  |
| `VendorStaff`          | Replaced by `User.vendorId → Vendor` 1:1.                               |
| `VendorPaymentInfo`    | Unused; `VendorBankAccount` covers payouts.                             |
| `VendorEarning`        | Unused; `VendorSettlementItem` / `VendorWalletTransaction` cover it.    |
| `PaymentLog`           | Unused; `PaymentTransaction` is the single payment ledger.              |
| `PaymentHistory`       | Unused; same ledger.                                                    |
| `PaymentInvoice`       | Unused; `OrderInvoice` (used) is the invoice.                           |
| 14× `VendorFood*` children | Unused (Price, Stock, Availability, PreparationTime, Recipe, RecipeItem, Cost, Packaging, Image, Quality, Zone, Schedule, Inventory, Performance). |
| Kept                | `VendorFoodStatusHistory`, `VendorFoodAssignment` (both used), all Rider/Delivery/Tracking/CMS/Inventory/Referral/Zone models (**Future**). |

**Added:** `Package.vendorId → Vendor` (one vendor per package).

---

## 14. Security & known gaps (priority order)

| # | Gap | Fix |
|---|-----|-----|
| S1 | 🔴 Admin order routes missing `verifyToken` (401 always) | Add `verifyToken` to admin order routes |
| S2 | 🟡 Vendor routes public (`GET /api/vendor/:vendorCode`, sub-resources) | Gate with auth per route |
| S3 | 🟡 `createVendorPackage` trusts client `status` | Server-assign status; admin approval |
| S4 | 🟡 `POST /api/users` unvalidated | Add create-user validation |
| S5 | 🟡 Vendor self-wallet 403 (permission module) | Vendor-facing wallet uses own permission/self scope |
| S6 | 🟡 JWT fallback secrets in env | Fail hard if env missing |
| S7 | 🟡 Upload has no fileFilter/type limit | Add multer fileFilter |
| S8 | 🟡 Payment price/amount trust | Server recompute totals; never trust client |
| S9 | 🟡 IDOR gaps (cross-customer resource access) | Scope queries to `req.user.id` |
| S10 | 🟡 Broken `paymentUrl` from orderCreationService | Rebuild URL; use canonical initiate |
| S11 | 🟡 No pagination on `listAllOrders` / `listPayments` | Add limit/offset |

---

## 15. Environment (`server/config/env.ts`)

`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `PORT`, `NODE_ENV`, `CORS_ORIGIN`, `SSLCOMMERZ_STORE_ID`, `SSLCOMMERZ_STORE_PASSWD`, `SSLCOMMERZ_IS_LIVE`, `SUPPORT_EMAIL`, `SUPPORT_WHATSAPP`, `MAIL_*` (nodemailer), `UPLOAD_*`.

---

## 16. Future mini-plans (deferred, schema-ready)

1. Rider & delivery (routes + rider app flow)
2. Chat/support tickets
3. CMS (banner, slider, blog, static pages)
4. Analytics & reports
5. Inventory & supply chain
6. Referral & loyalty
7. Zones / service-area routing
8. Live notifications (polling → socket)

---

*Next: full endpoint contracts in `docs/API.md`; route lookup table in `docs/API_REFERENCE.md`.*
