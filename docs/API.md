# FONDO — API Specification

Full reference for the Express 5 API. Frontend devs: every endpoint you need is here. Mounted under `/api`.

**Status legend:** 🟢 built & wired · 🟡 built with known gap (see note) · 🔴 broken (fix pending) · ⚪ planned (no routes yet)

---

## 1. Conventions

### Base URL
```
https://<host>/api
```

### Response envelope
Every endpoint returns:
```jsonc
{ "success": true, "message": "string", "data": <T> }   // 2xx
{ "success": false, "message": "string", "data": null } // 4xx/5xx
```

### Authentication
- `Authorization: Bearer <accessToken>` on protected routes.
- Refresh token lives in HttpOnly cookie; 401 auto-calls `POST /auth/refresh`, concurrent requests queue and retry.
- Admin/vendor gating = `verifyToken` → `authorize(role...)` → `hasPermission(module)`. Super-admin bypasses permission checks.

### Errors
| Code | Meaning |
|------|---------|
| 400 | Validation failed (`message` lists first error) |
| 401 | Missing/invalid token |
| 403 | Wrong role or missing permission module |
| 404 | Not found |
| 429 | Rate limited (general 100/min, auth 20/min) |
| 500 | Server error |

### Types
Shared TS types in `src/types/*.ts` (e.g. `Food` in `src/types/food.ts`, `Order` in `src/types/order.ts`). Returned `data` matches those interfaces.

---

## 2. Auth — `/api/auth`

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/register` | — | 🟢 | Customer register |
| POST | `/login` | — | 🟢 | email **or** phone + password |
| POST | `/otp/send` | — | 🟢 | purpose: LOGIN/REGISTER/FORGOT_PASSWORD/PHONE_VERIFY/EMAIL_VERIFY |
| POST | `/otp/verify` | — | 🟢 | |
| POST | `/refresh` | cookie | 🟢 | rotate refresh token |
| POST | `/logout` | — | 🟢 | clears cookie |
| GET | `/me` | 🔐 | 🟢 | current user + role |
| POST | `/forgot-password` | — | 🟢 | sends reset OTP/token |
| POST | `/reset-password` | — | 🟢 | token + new password |
| PATCH | `/change-password` | 🔐 | 🟢 | current + new password |

**POST `/register`**
```jsonc
{ "firstName": "Ayesha", "lastName": "Rahman", "phone": "01700000000",
  "email": "a@b.com", "password": "secret123", "gender": "FEMALE", "dateOfBirth": "2000-01-01" }
```
**POST `/login`** → `{ "email": "a@b.com" | "phone": "017...", "password": "..." }`
Returns `{ accessToken, user }`.

---

## 3. Users — `/api/users`

### Self
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| PATCH | `/me` | 🔐 | 🟢 | update profile |
| DELETE | `/me` | 🔐 | 🟢 | soft-delete self |
| GET | `/me/addresses` | 🔐 | 🟢 | → addressRoutes |
| POST/PATCH/DELETE | `/me/addresses/...` | 🔐 | 🟢 | see §4 |
| GET/POST/DELETE | `/me/devices` | 🔐 | 🟢 | see §4 |
| GET/PATCH | `/me/notification-settings` | 🔐 | 🟢 | see §4 |
| GET | `/me/login-history` | 🔐 | 🟢 | see §4 |

### Admin (permission `users`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/users` | 🔐+perm | 🟢 | list users |
| POST | `/users` | 🔐+perm | 🟡 | **body NOT validated** (S4) |
| GET | `/users/:id` | 🔐+perm | 🟢 | |
| PATCH | `/users/:id` | 🔐+perm | 🟢 | |
| DELETE | `/users/:id` | 🔐+perm | 🟢 | |

### RBAC — `/api/admin` (permission `users`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/admin/permissions` | 🔐+perm | 🟢 | permission modules list |
| POST | `/admin/users/:userId/permissions` | 🔐+perm | 🟢 | toggle `{ module, enabled }` |

---

## 4. Address / Device / Notification / Login-history (mounted under `/api/users/me`)

### Addresses — `/me/addresses`
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/` | 🔐 | 🟢 | list my addresses |
| POST | `/` | 🔐 | 🟢 | create |
| PATCH | `/:id` | 🔐 | 🟢 | update |
| DELETE | `/:id` | 🔐 | 🟢 | remove |
| PATCH | `/:id/default` | 🔐 | 🟢 | set default |

**POST create** → `{ label?, receiverName, receiverPhone, division, district, area, upazila?, road?, house?, floor?, apartment?, landmark?, postalCode?, latitude?, longitude?, isDefault? }`

### Devices — `/me/devices`
`GET /` · `POST /` (`{ deviceId, deviceType: mobile|tablet|desktop, pushToken, ... }`) · `DELETE /:id`

### Notification settings — `/me/notification-settings`
`GET /` · `PATCH /` (9 booleans: push/email/sms/order/payment/promotion/chat/marketing/system)

### Login history — `/me/login-history`
`GET /`

---

## 5. Food catalog — `/api/foods`

### Public
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/foods` | — | 🟢 | only `FoodStatus.APPROVED` |
| GET | `/foods/slug/:slug` | — | 🟢 | |
| GET | `/foods/categories/list` | — | 🟢 | |
| GET | `/foods/categories/:id` | — | 🟢 | |
| GET | `/foods/tags/list` | — | 🟢 | |
| GET | `/foods/:id` | — | 🟢 | |
| GET | `/foods/:foodId/reviews` | — | 🟢 | |
| GET | `/foods/:foodId/favorite` | 🔐 | 🟢 | is-favorited? |
| POST | `/foods/:foodId/favorite` | 🔐 | 🟢 | toggle on |
| DELETE | `/foods/:foodId/favorite` | 🔐 | 🟢 | toggle off |
| POST | `/foods/:foodId/reviews` | 🔐 | 🟢 | `{ rating: 1-5, review? }` |
| GET | `/foods/favorites` | 🔐 | 🟢 | list my favorites |
| GET | `/foods/vendor/foods` | 🔐+perm `foods` | 🟢 | foods linked to my vendor |

> ⚠️ Route-order: static paths (`favorites`, `vendor/foods`, `categories/...`, `tags/...`, `slug/...`) are defined before the `/:id` catch-all. Fine as-is.

---

## 6. Admin food management — `/api/admin` (roles SUPER_ADMIN/ADMIN, permission `foods`)

| Method | Path | Status | Notes |
|--------|------|--------|-------|
| GET | `/admin/foods` | 🟢 | list (incl. PENDING) |
| GET | `/admin/foods/:id` | 🟢 | |
| POST | `/admin/foods` | 🟢 | create → auto-APPROVED |
| PUT | `/admin/foods/:id` | 🟢 | |
| DELETE | `/admin/foods/:id` | 🟢 | |
| PATCH | `/admin/foods/:id/approve` | 🟢 | |
| PATCH | `/admin/foods/:id/reject` | 🟢 | `{ reason }` |
| GET | `/admin/categories` | 🟢 | |
| POST | `/admin/categories` | 🟢 | |
| PUT/DELETE | `/admin/categories/:id` | 🟢 | |
| POST | `/admin/categories/:categoryId/subcategories` | 🟢 | |
| PUT/DELETE | `/admin/subcategories/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/variants` | 🟢 | |
| PUT/DELETE | `/admin/variants/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/addons` | 🟢 | |
| PUT/DELETE | `/admin/addons/:id` | 🟢 | |
| POST | `/admin/addons/:addonId/items` | 🟢 | |
| PUT/DELETE | `/admin/addon-items/:id` | 🟢 | |
| GET/PATCH | `/admin/foods/:foodId/nutrition` | 🟢 | |
| POST | `/admin/foods/:foodId/ingredients` / `DELETE /admin/ingredients/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/allergens` / `DELETE /admin/allergens/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/prices` / `DELETE /admin/prices/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/images` / `DELETE /admin/food-images/:id` | 🟢 | `FoodImage` |
| POST | `/admin/foods/:foodId/discounts` / `DELETE /admin/discounts/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/tags` / `DELETE /admin/foods/:foodId/tags/:tagId` | 🟢 | |
| POST | `/admin/tags` | 🟢 | |
| POST | `/admin/foods/:foodId/labels` / `DELETE /admin/labels/:id` | 🟢 | |
| PATCH | `/admin/foods/:foodId/availability` | 🟢 | |
| POST | `/admin/foods/:foodId/schedules` / `DELETE /admin/schedules/:id` | 🟢 | |
| PATCH | `/admin/foods/:foodId/visibility` | 🟢 | |

> Meta payloads mirror the `Food` relation shapes in `src/types/food.ts`. Each `POST` under a `:foodId` writes a child row and returns the created row.

---

## 7. Vendor foods — `/api/vendor/foods` (permission `foods`)

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/vendor/foods` | 🔐+perm | 🟢 | create food (+ VendorFood link) → PENDING |
| GET | `/vendor/foods` | 🔐+perm | 🟢 | list my vendor foods |
| GET | `/vendor/foods/:id` | 🔐+perm | 🟢 | |
| PATCH | `/vendor/foods/:id/status` | 🔐+perm | 🟢 | `{ status: ACTIVE\|INACTIVE }` |

**POST body** (large create — see `createVendorFoodSchema`): `{ name, slug, categoryId, subCategoryId?, foodType: VEG|NON_VEG|VEGAN|SEAFOOD, basePrice, discountPrice?, shortDescription?, fullDescription?, preparationTime?, thumbnail?, coverImage?, galleryImages?: [{url}], variants?: [...], nutrition?: {...}, ingredients?: [{name}], allergens?: [{name}], labels?: string[], tags?: string[], available?, visible?, featured?, availableDays?: string[], timeSlots?: {start,end} }`

> 🟡 `createFood` resolves the vendor via `VendorStaff` — replaced with `User.vendorId` lookup in the schema-refactor pass. Same for `listFoods`/`getFood`/`updateFoodStatus` (vendor-scope).

---

## 8. Packages — `/api/package`

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/package/categories` | 🔐 ADMIN | 🟢 | |
| GET | `/package/categories` | — | 🟢 | |
| GET | `/package/` | — | 🟢 | list published |
| GET | `/package/:id` | — | 🟢 | detail |
| POST | `/package/vendor/create` | 🔐+perm `packages` | 🟡 | **trusts client status** (S3) |
| GET | `/package/vendor/open-requests` | 🔐+perm | 🟢 | vendor custom-request queue |
| PATCH | `/package/vendor/accept-request/:id` | 🔐+perm | 🟢 | |
| POST | `/package/custom-request` | 🔐 | 🟢 | customer custom meal plan |
| POST | `/package/custom-request/:id/pay` | 🔐 | 🟢 | |
| POST | `/package/:packageId/reviews` | 🔐 | 🟢 | |
| PATCH | `/package/reviews/:reviewId` | 🔐 | 🟢 | |
| DELETE | `/package/reviews/:reviewId` | 🔐 | 🟢 | |
| GET | `/package/reviews/pending` | 🔐 ADMIN | 🟢 | moderation queue |
| PATCH | `/package/reviews/:reviewId/status` | 🔐 ADMIN | 🟢 | approve/hide |

---

## 9. Cart & checkout — `/api/cart`

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/cart` | 🔐 | 🟢 | |
| POST | `/cart` | 🔐 | 🟢 | init `{ packageId?, customMealPlanId? }` |
| DELETE | `/cart` | 🔐 | 🟢 | clear |
| POST | `/cart/items` | 🔐 | 🟢 | `{ foodId, packageMealId?, quantity?, unitPrice }` |
| PATCH | `/cart/items/:id` | 🔐 | 🟢 | `{ quantity }` |
| DELETE | `/cart/items/:id` | 🔐 | 🟢 | |
| POST | `/cart/items/:itemId/addons` | 🔐 | 🟢 | `{ addonItemId, quantity?, price }` |
| DELETE | `/cart/addons/:id` | 🔐 | 🟢 | |
| POST | `/cart/meals` | 🔐 | 🟢 | `{ dayNumber, mealType, mealTime? }` |
| DELETE | `/cart/meals/:id` | 🔐 | 🟢 | |
| POST | `/cart/meals/:mealId/foods` | 🔐 | 🟢 | `{ foodId, quantity?, isReplacement? }` |
| DELETE | `/cart/meals/:mealId/foods/:foodId` | 🔐 | 🟢 | |
| POST | `/cart/checkout` | 🔐 | 🟢 | summary (totals, address, coupon) |
| POST | `/cart/checkout/apply-coupon` | 🔐 | 🟢 | `{ couponCode }` |
| DELETE | `/cart/checkout/remove-coupon` | 🔐 | 🟢 | |
| POST | `/cart/checkout/select-address` | 🔐 | 🟢 | `{ addressId }` |
| POST | `/cart/checkout/place-order` | 🔐 | 🟡 | → §10, orderCreationService paymentUrl gap (S10) |

**POST `/cart/checkout/place-order`**
```jsonc
{ "cartId"?, "addressId"?, "paymentMethodId": "uuid", "items"?: [{foodId, name, quantity, unitPrice, totalPrice}],
  "notes"?, "deliverySchedule"?: {deliveryDate?, deliverySlot?} }
```

---

## 10. Payments — `/api/payments`

### Gateway callbacks (public)
| Method | Path | Status | Notes |
|--------|------|--------|-------|
| GET+POST | `/payments/success` | 🟢 | SSLCommerz success |
| GET+POST | `/payments/fail` | 🟢 | |
| GET+POST | `/payments/cancel` | 🟢 | |
| POST | `/payments/ipn` | 🟢 | instant notification |

### Customer
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/payment-methods` | — | 🟢 | seeded methods |
| POST | `/payments/initiate` | 🔐 | 🟢 | `{ orderId, gatewayCode?=sslcommerz, amount, currency?=BDT, paymentMethodId? }` → `{ paymentUrl, payment }` |
| POST | `/payments/:id/retry` | 🔐 CUSTOMER | 🟢 | `{ paymentMethodId? }` |

### Admin (permission `settings`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/payments/:id/refund` | 🔐 ADMIN | 🟡 | wallet-based, sandbox only `{ amount, reason, refundMethod? }` |
| POST | `/payments/:id/adjust` | 🔐 ADMIN | 🟡 | `{ adjustmentType: correction\|chargeback\|bonus, amount, reason }` |

### Query
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/payments` | 🔐 | 🟡 | customer sees own, admin all; pagination gap (S11) |
| GET | `/payments/:id` | 🔐 | 🟢 | |

**GET `/payments` query:** `page?, limit?, status?, customerId? (admin), from?, to?`

---

## 11. Orders — `/api/orders`

### Customer
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/orders` | 🔐 | 🟢 | my orders |
| GET | `/orders/:id` | 🔐 | 🟢 | |
| PATCH | `/orders/:id` | 🔐 | 🟢 | `{ notes?, deliverySchedule? }` |
| POST | `/orders/:id/cancel` | 🔐 | 🟢 | `{ reason, cancelledBy: customer\|admin }` |
| POST | `/orders/:orderId/feedback` | 🔐 | 🟢 | `{ rating: 1-5, review? }` |
| GET | `/orders/:orderId/invoice` | 🔐 | 🟢 | |
| GET | `/orders/:orderId/invoice/download` | 🔐 | 🟢 | PDF |

### Admin (SUPER_ADMIN/ADMIN, permission `orders`)
> 🔴 **All broken** — routes missing `verifyToken` (S1); `authorize` reads `req.user` = undefined → 401.
| Method | Path | Status | Notes |
|--------|------|--------|-------|
| DELETE | `/orders/:id` | 🔴 | soft delete |
| PATCH | `/orders/:id/status` | 🔴 | `{ status: CONFIRMED|PREPARING|READY_FOR_PICKUP|PICKED_UP|ON_THE_WAY|DELIVERED|CANCELLED, remarks? }` |
| PATCH | `/orders/:id/assign-vendor` | 🔴 | `{ vendorId }` |
| PATCH | `/orders/:id/assign-rider` | 🔴 | `{ riderId }` |
| GET | `/admin/orders` | 🔴 | list all (pagination gap S11) |
| GET | `/vendors/:vendorId/orders` | 🔴 | |
| POST | `/orders/:orderId/refund` | 🔴 | `{ amount, reason, refundMethod? }` |
| GET | `/orders/:orderId/refunds` | 🔴 | |
| PATCH | `/order-meals/:id/status` | 🔴 | `{ status }` (kitchen meal status) |

---

## 12. Wallets — `/api/wallet`

### Customer
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/wallet` | 🔐 CUSTOMER | 🟢 | balance + hold |
| GET | `/wallet/transactions` | 🔐 CUSTOMER | 🟢 | |
| POST | `/wallet/topup` | 🔐 CUSTOMER | 🟢 | `{ amount, paymentMethodId? }` → SSLCommerz |
| GET | `/wallet/topup/success` | — | 🟢 | gateway callback |
| POST | `/wallet/withdraw` | 🔐 CUSTOMER | 🟢 | `{ amount, withdrawMethod: bank\|mobile_banking, accountNumber }` |

### Admin (permission `settings`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/wallet/withdrawals` | 🔐 ADMIN | 🟢 | |
| PATCH | `/wallet/withdraw/:id/approve` | 🔐 ADMIN | 🟢 | |
| PATCH | `/wallet/withdraw/:id/reject` | 🔐 ADMIN | 🟢 | |

---

## 13. Vendors — `/api/vendor`

### Self (current vendor)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/vendor/my-profile` | 🔐 VENDOR | 🟡 | authorize still lists `VENDOR_STAFF` (remove) |

### Admin lifecycle (permission `vendors`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/vendor/add` | 🔐+perm | 🟢 | create vendor + login user |
| GET | `/vendor/all` | 🔐+perm | 🟢 | |
| GET | `/vendor/:vendorCode` | — | 🟡 | **public** (S2) |
| PATCH | `/vendor/:vendorCode` | 🔐+perm | 🟢 | |
| DELETE | `/vendor/:vendorCode` | 🔐+perm | 🟢 | soft delete |
| PUT | `/vendor/:vendorCode/profile` | 🔐+perm | 🟢 | upsert profile |
| POST | `/vendor/:vendorCode/branches` | 🔐+perm | 🟢 | |
| GET | `/vendor/:vendorCode/branches` | 🔐+perm | 🟢 | |
| POST | `/vendor/branches/:branchId/kitchens` | 🔐+perm | 🟢 | |
| POST | `/vendor/:vendorCode/documents` | 🔐+perm | 🟢 | upload legal doc |
| PATCH | `/vendor/documents/:docId/verify` | 🔐+perm | 🟢 | |
| GET | `/vendor/:vendorCode/wallet` | 🔐+perm | 🟡 | vendor self-call 403s (S5) |
| GET | `/vendor/:vendorCode/settlements` | 🔐+perm | 🟡 | (S5) |
| POST | `/vendor/:vendorCode/settlements/trigger` | 🔐+perm `settings` | 🟢 | generate settlement period |
| PATCH | `/vendor/:vendorCode/settings` | 🔐+perm | 🟢 | |
| PUT | `/vendor/:vendorCode/operating-hours` | 🔐+perm | 🟢 | |

---

## 14. Coupons — `/api/admin/coupons` (ADMIN, permission `coupons`)

| Method | Path | Status | Notes |
|--------|------|--------|-------|
| GET | `/admin/coupons` | 🟢 | |
| GET | `/admin/coupons/:id` | 🟢 | |
| POST | `/admin/coupons` | 🟢 | see `createCouponSchema` |
| PATCH | `/admin/coupons/:id` | 🟢 | |
| DELETE | `/admin/coupons/:id` | 🟢 | |

**POST** → `{ couponCode, discountType: PERCENTAGE|FIXED, discountValue, title?, description?, minimumOrderAmount?, maximumDiscount?, usageLimit?, perUserLimit?, startDate?, endDate?, status? }`

---

## 15. Settlements & revenue — `/api/settlements` (ADMIN)

| Method | Path | Perm | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/vendors/:vendorId/wallet` | reports | 🟢 | |
| GET | `/vendors/:vendorId/wallet/transactions` | reports | 🟢 | |
| GET | `/vendors/:vendorId/settlements` | reports | 🟢 | |
| GET | `/settlements/:id` | reports | 🟢 | |
| GET | `/admin/settlements` | settings | 🟢 | |
| POST | `/admin/settlements` | settings | 🟢 | `{ vendorId, settlementPeriodStart, settlementPeriodEnd }` |
| POST | `/settlements/:id/process` | settings | 🟢 | `{ transactionId?, paymentMethod?, processedAt? }` |
| GET | `/platform/revenue` | settings | 🟢 | `?from&to` |

---

## 16. Customers admin — `/api/admin/customers` (ADMIN, permission `users`)

| Method | Path | Status | Notes |
|--------|------|--------|-------|
| GET | `/admin/customers` | 🟢 | |
| GET | `/admin/customers/:id` | 🟢 | |
| GET | `/admin/customers/:id/orders` | 🟢 | |
| GET | `/admin/customers/:id/subscriptions` | 🟢 | |
| GET | `/admin/customers/:id/wallet` | 🟢 | |
| GET | `/admin/customers/:id/payments` | 🟢 | |

---

## 17. Upload — `/api/upload` (🔐 any authed user)

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/upload/image` | 🔐 | 🟡 | `multipart/form-data` field `image`; **no fileFilter/type limit** (S7) |

Returns `{ url }`. Files served from `/uploads/*`.

---

## 18. Notifications / misc

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/api/health` | — | 🟢 | `{ status:"ok", timestamp }` |
| GET | `/api/upload/image` | — | — | (upload only) |

> No notification inbox/feed endpoints in MVP — refresh-button invalidation only. Settings live under `/api/users/me/notification-settings`.

---

## 19. Planned modules — ⚪ no routes yet

| Module | Route area | Schema status |
|--------|-----------|---------------|
| Subscriptions | `/api/subscriptions` | `Subscription` model exists |
| Riders & deliveries | `/api/riders`, `/api/deliveries`, `/api/tracking` | full `Rider*`, `Delivery*`, `Tracking*`, `Route*` models |
| Support/chat | email + WhatsApp | no tables |
| CMS | `/api/admin/cms` | `Banner/Slider/Blog/StaticPage` models |
| Reports/analytics | `/api/admin/reports` | `ActivityLog`, `PlatformRevenue` |
| Inventory & supply | `/api/admin/inventory` | `Inventory/Supplier/Purchase/WasteLog` models |
| Referral & loyalty | `/api/referral` | `Referral` model |
| Zones / service areas | `/api/admin/zones` | `VendorZone/Zone` models |

---

*Route lookup table with method × path matrix: `docs/API_REFERENCE.md`.*
