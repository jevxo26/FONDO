# FONDO — Complete Workflow

> **Business & Workflow reference** — the working plan our project is built by. Replaces the old full PRD (`FONDO – Complete System Workflow.md`, deleted — we no longer build by it). No data models here; see `prisma/schema.prisma` for those.

- **Business model:** Centralized marketplace — customers never see the vendor. Admin transparently switches the vendor fulfilling a package/order.
- **Status legend:** 🟢 built & wired · 🟡 built, gap known · 🔴 broken (fix pending) · ⚪ planned
- **Stack:** Next.js 16 (App Router) + Express 5 custom server + Prisma/Neon + Redux Toolkit (RTK Query) + Tailwind v4 + shadcn/ui

---

## 1. Project Vision

A subscription meal-delivery platform: customers pick a weekly/monthly meal package, get a plan, and receive cooked food daily — without ever seeing the restaurant. The platform curates vendors, packages, and delivery, so the customer experience stays consistent even as the vendor behind any package changes.

We are building it **lean, in phases** — each phase is fully functional before the next starts (see `docs/DEVELOPER_PLAN.md`). Current state: the complete buy→fulfill→settle loop is built; subscriptions, riders, tracking, support, CMS-backend, and analytics are the roadmap.

---

## 2. Business Model

- **Centralized marketplace.** The platform is the single face to the customer. Vendors supply food under the FONDO brand.
- **Hidden vendor.** A package/order resolves to exactly one vendor internally; the customer is never exposed to the vendor or to swaps.
- **Recurring revenue.** Customers subscribe to meal packages (order-based today; true recurring billing planned). Platform takes **commission** on orders; vendors are paid via **settlements**.
- **Money flows:** order → SSLCommerz (sandbox) payment → confirmed order → delivery → settlement → vendor payout. Refunds/adjustments move through the customer wallet.

---

## 3. System Actors

| Role | What they do |
|------|--------------|
| `SUPER_ADMIN` | Platform owner — everything `ADMIN` does + settlement/revenue control |
| `ADMIN` | Approve vendor foods/packages, manage catalog, orders, users, customers, coupons |
| `VENDOR` | Self-service — submit foods/packages for approval, receive orders, kitchen ops, own profile/branches |
| `RIDER` | ⚪ planned — accept deliveries, update status, live location |
| `CUSTOMER` | Browse, pick a package, customize, pay, order, review, track |

> Access model is **fixed roles + permission modules** (per-admin toggles: `users`, `foods`, `packages`, `orders`, `vendors`, `settings`, `coupons`, `reports`). Super Admin bypasses checks. No custom role management.

---

## 4. Complete Business Workflow

```
Vendor ──submits──► Package (PENDING) ──admin approves► APPROVED ──► published
Admin ──selects vendor + its foods──► Package (APPROVED) ──► published directly
Customer: browse → package detail → customize meals → cart → checkout
          → SSLCommerz sandbox payment → Order (PENDING → CONFIRMED)
Order status: CONFIRMED → PREPARING → READY_FOR_PICKUP → PICKED_UP → ON_THE_WAY → DELIVERED
Payment settles → vendor wallet credit → admin triggers settlement → vendor payout
Refunds/adjustments → customer wallet
```

- **One vendor per package** in MVP (`Package.vendorId`); order inherits it, admin can re-assign at order level.
- **Two creation paths:** Admin picks a vendor, adds foods **from that vendor's approved menu** (`?vendorId=` on the vendor-foods endpoint), and the package is **APPROVED/published immediately**. Vendor-built packages start **PENDING** and only publish once an admin approves them.
- **Admin-created catalog items auto-APPROVED**; vendor-submitted start PENDING.
- **Status is order-driven** — no scheduler yet (daily generation planned).

---

## 5. Customer Journey

| Step | Status |
|------|--------|
| Register / login (OTP) | 🟢 |
| Browse foods, categories, packages | 🟢 |
| Package detail + customize meals | 🟢 |
| Cart + checkout (coupon, address, totals) | 🟢 |
| SSLCommerz payment + callbacks | 🟢 |
| Order list/detail + invoice PDF | 🟢 |
| Review food/package/order | 🟢 |
| Live tracking map | ⚪ |
| Active subscription management | ⚪ |

---

## 6. Subscription Lifecycle

⚪ **Planned.** Subscribe to a package or custom meal plan for N days → system generates daily meals.
`PENDING → ACTIVE → PAUSED/FROZEN → RESUMED → EXPIRED/CANCELLED`; actions: pause/resume/freeze, skip meal (with replacement), renew, upgrade/downgrade. Until it ships, recurring meals are handled as normal orders.

---

## 7. Daily Meal Generation

⚪ **Planned.** For each active subscription, generate one day per date with breakfast/lunch/dinner meals → vendor kitchen queue → delivery → feedback. MVP equivalent: the customer builds the week in the **cart** and places one order.

---

## 8. Vendor Workflow

| Area | Status |
|------|--------|
| Onboarding (profile, branches, kitchens, documents, hours) | 🟢 |
| Submit foods → PENDING → admin approval | 🟢 |
| Submit packages → PENDING → admin approval | 🟢 |
| Receive/fulfill orders, kitchen status updates | 🟢 |
| Vendor wallet + settlements (admin triggers period) | 🟢 |
| Menu control (availability, visibility, schedules, pricing) | 🟢 |

---

## 9. Kitchen Workflow

🟡 **Partial** — kitchen ops live in the vendor role (vendor staff update order/meal status `PREPARING → READY_FOR_PICKUP`).
⚪ Dedicated kitchen dashboard (today's queue, per-meal checklist) planned.

---

## 10. Rider Workflow

⚪ **Planned.** Admin/vendor create riders + verify documents/vehicles → rider goes online → assigned deliveries → status updates + proof → earnings to rider wallet → withdrawals.

---

## 11. Customer Tracking

🟡 Today: order status + invoice only (text states). ⚪ Planned: live map, rider position, ETA, event feed.

---

## 12. Admin Management

| Area | Status |
|------|--------|
| Vendors (create/edit/branches/kitchens/documents/verify) | 🟢 |
| Customers (list/detail, orders, subscriptions, wallet, payments) | 🟢 |
| Food catalog (full CRUD + sub-resources + approval) | 🟢 |
| Packages (create w/ vendor select → publish, approve/reject vendor submissions, categories, reviews moderation) | 🟢 |
| Orders (list all, status, assign vendor/rider, refund) | 🟢 |
| Payments (refund/adjust, sandbox) + list | 🟡 |
| Coupons CRUD | 🟢 |
| Riders | ⚪ (UI shell exists) |
| Reports & platform revenue | 🟢 basic / ⚪ analytics |

---

## 13. Hidden Vendor Architecture

- MVP: package → `Package.vendorId`; order stores `order.vendorId` at creation. All vendor ops scoped by `User.vendorId` (no VendorStaff).
- Swapping: admin re-assigns an order to another vendor (`assign-vendor`, fixed S1). No vendor info appears in the customer flow.

---

## 14. Notifications

Easy-way inbox — **no socket.io, no realtime push**. RTK Query drives delivery with minimal DB load:
- **Unread-count polled every 30s, only while the dashboard tab is focused** (`skipPollingIfUnfocused` + `refetchOnFocus`). Hidden tabs make zero requests.
- **Full list fetched on demand**: panel opens, unread count changes, or the **refresh button** in the dashboard header (dispatches `invalidateTags` → refetches all active queries).
- New notifications arrive within one focused poll (~30s) or instantly via the refresh button — fast enough for order/approval status updates without websocket infrastructure.

- 🟢 Settings: per-user preferences + device push tokens + notification-settings endpoints.
- ⚪ In-app inbox (polled via RTK Query), unread badge, broadcast, announcements, FAQ.
- Out of scope: socket.io, push servers, realtime delivery — polling + manual refresh only.

---

## 15. Marketing

- 🟢 Coupons (discount codes) at checkout.
- ⚪ Banners/sliders (UI shell exists), blog/SEO.

---

## 16. Analytics & Reports

- 🟢 Platform revenue + vendor settlements + per-customer lookups; activity logged.
- ⚪ Dashboard KPIs, sales/customer/vendor/rider/package analytics, scheduled reports.

---

## 17. Support

Support is **email + WhatsApp only** — no ticket/chat tables (schema removed).

- 🟢 Email contact via `/support` form (`subject`, reason/issue, `message`) → emailed to the support inbox.
- 🟢 WhatsApp button (`wa.me/<number>` link) on the same page.
- ⚪ Not built yet: the `/support` page + `POST /api/support/contact` endpoint (planned).

---

## 18. Tech Stack

Frontend: Next.js 16 + React 19 + TS 5 + Tailwind v4 + shadcn/ui
State: Redux Toolkit + RTK Query
Server: Express 5 (custom, alongside Next on :3000)
DB: PostgreSQL (Neon) + Prisma
Payments: SSLCommerz sandbox
Realtime: none — notifications via RTK Query polling (no socket.io)

---

## 19. Build Status Map

| Module | Status |
|--------|--------|
| Auth & account | 🟢 |
| Food catalog + approval | 🟢 |
| Packages & meal plans | 🟢 |
| Cart & checkout | 🟢 |
| Payments (SSLCommerz) | 🟢 |
| Customer wallet | 🟢 |
| Orders (customer) | 🟢 / admin 🟢 |
| Vendors | 🟢 |
| Users & Customers admin | 🟢 |
| Coupons | 🟢 |
| Settlements & revenue | 🟢 |
| RBAC (permission modules) | 🟢 |
| Upload / health | 🟡 / 🟢 |
| CMS (banners/sliders/blogs/pages) | 🟡 UI shell, backend ⚪ |
| Riders / Deliveries / Tracking | ⚪ |
| Subscriptions | ⚪ |
| Notifications inbox | ⚪ (RTK Query polling, no socket.io) |
| Support (email/WhatsApp) | ⚪ |
| Referral | ❌ dropped |
| Analytics & reports | ⚪ |
| System settings | ⚪ |

---

> **API contracts:** `docs/API.md` (request/response specs) + `docs/API_REFERENCE.md` (route matrix). **Build steps:** `docs/DEVELOPER_PLAN.md`. **Last updated:** 2026-08-03
