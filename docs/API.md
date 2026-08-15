# FONDO — API Specification

Complete reference for the Express 5 API (custom server, mounted under `/api`). Every endpoint — **built, partial, and planned** — with its request body and response structure.

**Status legend:**
| | Meaning |
|---|---|
| 🟢 | Built & wired — works end to end |
| 🟡 | Built with a known gap (see note) |
| 🔴 | Broken — fix pending |
| ⚪ | Planned — no routes yet (endpoints designed from `prisma/schema.prisma`, subject to change at build) |

---

## Quick reference

- Base URL: `https://<host>/api`
- Response envelope: `{ success, message, data }`
- Auth: `Authorization: Bearer <accessToken>` · refresh token in HttpOnly cookie, auto-rotated on 401
- RBAC: `verifyToken` → `authorize(role...)` → `hasPermission(module)`; Super Admin bypasses permission checks
- Types: mirror `src/types/*.ts` (e.g. `Food` → `src/types/food.ts`)
- Route matrix (method × path, one flat table): **`docs/API_REFERENCE.md`**

---

## Index

| # | Module | # | Module |
|---|--------|---|--------|
| [1](#1-auth) | Auth | [15](#15-deliveries) | Deliveries & Live Tracking ⚪ |
| [2](#2-users) | Users & Profile | [16](#16-notifications) | Notifications ⚪ |
| [3](#3-food-catalog) | Food Catalog (Customer) | [17](#17-support) | Support (email/WhatsApp) ⚪ |
| [4](#4-food-admin) | Food Admin (CRUD) | [18](#18-cms) | CMS 🟡 |
| [5](#5-cart-checkout) | Cart & Checkout | [19](#19-reports) | Reports & Analytics 🟡 |
| [6](#6-orders) | Orders | [20](#20-settings) | System Settings ⚪ |
| [7](#7-customers) | Customers (Admin) | [21](#21-coupons) | Coupons |
| [8](#8-vendors) | Vendors | [22](#22-inventory) | Inventory & Supply Chain ⚪ |
| [9](#9-packages) | Packages & Meal Plans | [23](#23-zones) | Zones & Service Areas ⚪ |
| [10](#10-subscriptions) | Subscriptions ⚪ | [24](#24-upload) | Upload & Files |
| [11](#11-payments) | Payments | [25](#25-misc) | Misc / Health |
| [12](#12-wallet) | Customer Wallet | | |
| [13](#13-settlements) | Vendor Settlements | | |
| [14](#14-riders) | Riders 🟡 | | |

---

## Conventions

### Response envelope
```jsonc
{ "success": true,  "message": "string", "data": <T> }    // 2xx
{ "success": false, "message": "string", "data": null }    // 4xx / 5xx
```

### Errors
| Code | Meaning |
|------|---------|
| 400 | Validation failed (`message` lists first error) |
| 401 | Missing / invalid token |
| 403 | Wrong role or missing permission module |
| 404 | Not found |
| 429 | Rate limited (general 100/min, auth 20/min) |
| 500 | Server error |

### Body convention
- `*` = required. Example: `{ "name": "*String", "email": "String (optional)" }`
- All money = Decimal(10,2), serialized as number.

### Standard CRUD
Unless noted, list endpoints paginate with `?page=1&limit=10` → `{ items: [], pagination: { page, limit, totalItems, totalPages } }`.

### Soft delete
`DELETE` on admin/user resources is a soft delete (`deletedAt` set) unless noted.

---

<a id="1-auth"></a>
## 1. Auth — `/api/auth`

🟢 Built. All auth routes rate-limited (20/min).

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/auth/register` | — | 🟢 | Customer register |
| POST | `/auth/login` | — | 🟢 | email **or** phone + password |
| POST | `/auth/otp/send` | — | 🟢 | purpose: `LOGIN` \| `REGISTER` \| `FORGOT_PASSWORD` \| `PHONE_VERIFY` \| `EMAIL_VERIFY` |
| POST | `/auth/otp/verify` | — | 🟢 | |
| POST | `/auth/refresh` | cookie | 🟢 | rotates refresh token |
| POST | `/auth/logout` | — | 🟢 | clears cookie |
| GET | `/auth/me` | 🔐 | 🟢 | current user + role |
| POST | `/auth/forgot-password` | — | 🟢 | sends reset OTP/token |
| POST | `/auth/reset-password` | — | 🟢 | token + new password |
| PATCH | `/auth/change-password` | 🔐 | 🟢 | current + new password |

**POST `/auth/register`**
```jsonc
{ "firstName": "Ayesha", "lastName": "Rahman", "phone": "01700000000",
  "email": "a@b.com", "password": "secret123", "gender": "FEMALE", "dateOfBirth": "2000-01-01" }
```
**Response `201`** → `{ accessToken, refreshToken(cookie), user: { id, firstName, lastName, email, phone, role } }`

**POST `/auth/login`**
```jsonc
{ "email": "a@b.com" | "phone": "01700000000", "password": "secret123" }
```
**Response `200`** → `{ accessToken, user }`

**POST `/auth/otp/send`**
```jsonc
{ "purpose": "REGISTER", "email"?: "a@b.com", "phone"?: "01700000000" }
```
**POST `/auth/otp/verify`**
```jsonc
{ "purpose": "REGISTER", "email"?: ..., "phone"?: ..., "otp": "123456" }
```
**POST `/auth/forgot-password`** → `{ "email": "a@b.com" | "phone": "017..." }`
**POST `/auth/reset-password`** → `{ "token": "resetToken", "newPassword": "..." }`
**PATCH `/auth/change-password`** → `{ "currentPassword": "...", "newPassword": "..." }`

**GET `/auth/me`** → `{ id, firstName, lastName, email, phone, gender, role, permissions: [module], vendorId? }`

---

<a id="2-users"></a>
## 2. Users & Profile — `/api/users`

### Self
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| PATCH | `/users/me` | 🔐 | 🟢 | update profile |
| DELETE | `/users/me` | 🔐 | 🟢 | soft-delete self |
| GET | `/users/me/addresses` | 🔐 | 🟢 | → addresses below |
| POST | `/users/me/addresses` | 🔐 | 🟢 | |
| PATCH | `/users/me/addresses/:id` | 🔐 | 🟢 | |
| DELETE | `/users/me/addresses/:id` | 🔐 | 🟢 | |
| PATCH | `/users/me/addresses/:id/default` | 🔐 | 🟢 | set default |
| GET | `/users/me/devices` | 🔐 | 🟢 | |
| POST | `/users/me/devices` | 🔐 | 🟢 | |
| DELETE | `/users/me/devices/:id` | 🔐 | 🟢 | |
| GET | `/users/me/notification-settings` | 🔐 | 🟢 | |
| PATCH | `/users/me/notification-settings` | 🔐 | 🟢 | 9 booleans |
| GET | `/users/me/login-history` | 🔐 | 🟢 | |

**PATCH `/users/me`** → `{ firstName?, lastName?, email?, phone?, gender?, dateOfBirth?, profileImage? }`

**POST `/users/me/addresses`** → `{ label?, receiverName*, receiverPhone*, division*, district*, area*, upazila?, road?, house?, floor?, apartment?, landmark?, postalCode?, latitude?, longitude?, isDefault? }`

**POST `/users/me/devices`** → `{ deviceId*, deviceType: "mobile"|"tablet"|"desktop", pushToken?, ... }`

**PATCH `/users/me/notification-settings`** → booleans: `push, email, sms, order, payment, promotion, chat, marketing, system`

### Admin (permission `users`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/users` | 🔐+perm | 🟢 | list users |
| POST | `/users` | 🔐+perm | 🟢 | validated |
| GET | `/users/:id` | 🔐+perm | 🟢 | |
| PATCH | `/users/:id` | 🔐+perm | 🟢 | |
| DELETE | `/users/:id` | 🔐+perm | 🟢 | |

**POST `/users`** (admin) → `{ firstName*, lastName*, email, phone*, password*, role*, status? }`
**GET `/users`** → `?page&limit&search&role&status`

### RBAC — permission modules (fixed roles)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/admin/permissions` | 🔐 SUPER_ADMIN/ADMIN | 🟢 | list permission modules |
| POST | `/admin/users/:userId/permissions` | 🔐+perm `users` | 🟢 | toggle `{ module, enabled }` |

No custom-role CRUD — the platform uses the fixed 5 roles (SUPER_ADMIN, ADMIN, VENDOR, RIDER, CUSTOMER) + per-admin permission-module toggles.

---

<a id="3-food-catalog"></a>
## 3. Food Catalog — `/api/foods` (Customer)

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
| GET | `/foods/favorites` | 🔐 | 🟢 | list my favorites |
| GET | `/foods/:foodId/favorite` | 🔐 | 🟢 | is-favorited? |
| POST | `/foods/:foodId/favorite` | 🔐 | 🟢 | toggle on |
| DELETE | `/foods/:foodId/favorite` | 🔐 | 🟢 | toggle off |
| POST | `/foods/:foodId/reviews` | 🔐 | 🟢 | |
| GET | `/foods/vendor/foods` | 🔐+perm `foods` | 🟢 | foods linked to my vendor |

> Route-order: static paths (`favorites`, `vendor/foods`, `categories/...`, `tags/...`, `slug/...`) are defined before the `/:id` catch-all.

**GET `/foods`** → `?categoryId&search&foodType&tags&page&limit&sort`
**Response**
```jsonc
{ "items": [ { "id": "UUID", "name": "String", "slug": "String", "thumbnail": "String",
    "basePrice": "Number", "discountPrice": "Number?", "foodType": "VEG|NON_VEG|VEGAN|SEAFOOD",
    "category": { "id", "name" }, "avgRating": "Number", "reviewCount": "Int" } ], "pagination": {} }
```

**GET `/foods/slug/:slug` / `/foods/:id`** → full `Food`
```jsonc
{ "id": "UUID", "name": "String", "slug": "String", "description": "String", "thumbnail": "String",
  "images": [ { "id", "url", "isPrimary" } ], "prices": [ { "id", "priceLabel", "price", "discountPrice?" } ],
  "variants": [ { "id", "name", "options" } ], "addons": [ { "id", "name", "items": [ { "id", "name", "price" } ] } ],
  "nutrition": { "calories", "protein", "carbs", "fat", ... }, "ingredients": [{ "id", "name" }],
  "allergens": [{ "id", "name" }], "labels": ["String"], "tags": [{ "id", "name" }],
  "schedules": [ { "availableDays", "timeSlots" } ], "available": "Boolean", "visible": "Boolean",
  "avgRating": "Number", "reviewCount": "Int", "isFavorited": "Boolean" }
```

**POST `/foods/:foodId/reviews`** → `{ "rating": 1-5, "review"?: "String" }`

---

<a id="4-food-admin"></a>
## 4. Food Admin (CRUD) — `/api/admin` (roles SUPER_ADMIN/ADMIN, permission `foods`)

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
| POST | `/admin/foods/:foodId/ingredients` | 🟢 | |
| DELETE | `/admin/ingredients/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/allergens` | 🟢 | |
| DELETE | `/admin/allergens/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/prices` | 🟢 | |
| DELETE | `/admin/prices/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/images` | 🟢 | `FoodImage` |
| DELETE | `/admin/food-images/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/discounts` | 🟢 | |
| DELETE | `/admin/discounts/:id` | 🟢 | |
| POST | `/admin/foods/:foodId/tags` | 🟢 | |
| DELETE | `/admin/foods/:foodId/tags/:tagId` | 🟢 | |
| POST | `/admin/tags` | 🟢 | |
| POST | `/admin/foods/:foodId/labels` | 🟢 | |
| DELETE | `/admin/labels/:id` | 🟢 | |
| PATCH | `/admin/foods/:foodId/availability` | 🟢 | `{ available }` |
| POST | `/admin/foods/:foodId/schedules` | 🟢 | `{ availableDays, timeSlots }` |
| DELETE | `/admin/schedules/:id` | 🟢 | |
| PATCH | `/admin/foods/:foodId/visibility` | 🟢 | `{ visible }` |

**POST `/admin/foods`** — large create (mirrors `Food` relations in `src/types/food.ts`):
```jsonc
{ "name": "*", "slug": "*", "categoryId": "*", "subCategoryId"?, "foodType"?, "basePrice"?: "*",
  "shortDescription"?, "fullDescription"?, "preparationTime"?, "thumbnail"?, "coverImage"?,
  "gallery"?: [{ "url" }], "variants"?: [{ "name", "options": [] }], "addons"?: [{ "name", "items": [] }],
  "nutrition"?: { ... }, "ingredients"?: [{ "name" }], "allergens"?: [{ "name" }], "labels"?: ["String"],
  "tags"?: [{ "name" }], "prices"?: [{ "priceLabel", "price", "discountPrice" }],
  "schedules"?: [{ "availableDays": ["Mon"], "timeSlots": [{ "start", "end" }] }] }
```
> Each child `POST` under a `:foodId` writes one child row and returns the created row.

---

## Vendor Foods — `/api/vendor/foods` (permission `foods`)

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/vendor/foods` | 🔐+perm | 🟢 | create food (+ vendor link) → PENDING |
| GET | `/vendor/foods` | 🔐+perm | 🟢 | list my vendor foods |
| GET | `/vendor/foods/:id` | 🔐+perm | 🟢 | |
| PATCH | `/vendor/foods/:id/status` | 🔐+perm | 🟢 | `{ status: ACTIVE\|INACTIVE }` |

**POST `/vendor/foods`** (large create — `createVendorFoodSchema`):
```jsonc
{ "name": "*", "slug": "*", "categoryId": "*", "subCategoryId"?, "foodType": "VEG|NON_VEG|VEGAN|SEAFOOD",
  "basePrice": "*", "discountPrice"?, "shortDescription"?, "fullDescription"?, "preparationTime"?, "thumbnail"?,
  "coverImage"?, "galleryImages"?: [{ "url" }], "variants"?: [...], "nutrition"?: {...}, "ingredients"?: [{ "name" }],
  "allergens"?: [{ "name" }], "labels"?: ["String"], "tags"?: ["String"], "available"?, "visible"?, "featured"?,
  "availableDays"?: ["String"], "timeSlots"?: [{ "start", "end" }] }
```
> Vendor is resolved via `User.vendorId` (VendorStaff was dropped in the schema-refactor pass).

---

<a id="5-cart-checkout"></a>
## 5. Cart & Checkout — `/api/cart`

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/cart` | 🔐 | 🟢 | |
| POST | `/cart` | 🔐 | 🟢 | init `{ packageId?, customMealPlanId? }` |
| DELETE | `/cart` | 🔐 | 🟢 | clear |
| POST | `/cart/items` | 🔐 | 🟢 | |
| PATCH | `/cart/items/:id` | 🔐 | 🟢 | `{ quantity }` |
| DELETE | `/cart/items/:id` | 🔐 | 🟢 | |
| POST | `/cart/items/:itemId/addons` | 🔐 | 🟢 | |
| DELETE | `/cart/addons/:id` | 🔐 | 🟢 | |
| POST | `/cart/meals` | 🔐 | 🟢 | |
| DELETE | `/cart/meals/:id` | 🔐 | 🟢 | |
| POST | `/cart/meals/:mealId/foods` | 🔐 | 🟢 | |
| DELETE | `/cart/meals/:mealId/foods/:foodId` | 🔐 | 🟢 | |
| POST | `/cart/checkout` | 🔐 | 🟢 | summary (totals, address, coupon) |
| POST | `/cart/checkout/apply-coupon` | 🔐 | 🟢 | `{ couponCode }` |
| DELETE | `/cart/checkout/remove-coupon` | 🔐 | 🟢 | |
| POST | `/cart/checkout/select-address` | 🔐 | 🟢 | `{ addressId }` |
| POST | `/cart/checkout/place-order` | 🔐 | 🟢 | → `{ orderId, orderNumber, totalAmount }` |

**POST `/cart/items`** → `{ foodId*, packageMealId?, quantity?, unitPrice* }`
**POST `/cart/items/:itemId/addons`** → `{ addonItemId*, quantity?, price* }`
**POST `/cart/meals`** → `{ dayNumber*, mealType*, mealTime? }`
**POST `/cart/meals/:mealId/foods`** → `{ foodId*, quantity?, isReplacement? }`

**POST `/cart/checkout`** → summary
```jsonc
{ "subtotal": "Number", "discount": "Number", "deliveryCharge": "Number", "tax": "Number",
  "grandTotal": "Number", "address": { ... }?, "coupon": { "couponCode", "discountAmount" }? }
```

**POST `/cart/checkout/place-order`**
```jsonc
{ "cartId"?, "addressId"?, "paymentMethodId": "*UUID", "items"?: [{ foodId, name, quantity, unitPrice, totalPrice }],
  "notes"?, "deliverySchedule"?: { "deliveryDate"?, "deliverySlot"? } }
```
**Response `201`** → `{ orderId, orderNumber, totalAmount }`

---

<a id="6-orders"></a>
## 6. Orders — `/api/orders`

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

**GET `/orders`** → `?page&limit&status`
```jsonc
{ "items": [ { "id": "UUID", "orderNumber": "String", "status": "String", "grandTotal": "Number",
    "items": [ { "food": { "name", "thumbnail" }, "quantity", "totalPrice" } ], "createdAt": "DateTime" } ],
  "pagination": {} }
```

### Admin (SUPER_ADMIN/ADMIN, permission `orders`)
| Method | Path | Status | Notes |
|--------|------|--------|-------|
| DELETE | `/orders/:id` | 🟢 | soft delete |
| PATCH | `/orders/:id/status` | 🟢 | `{ status: CONFIRMED\|PREPARING\|READY_FOR_PICKUP\|PICKED_UP\|ON_THE_WAY\|DELIVERED\|CANCELLED, remarks? }` |
| PATCH | `/orders/:id/assign-vendor` | 🟢 | `{ vendorId }` |
| PATCH | `/orders/:id/assign-rider` | 🟢 | `{ riderId }` |
| GET | `/admin/orders` | 🟢 | list all; `?page&limit&status` → `{ items, pagination }` |
| GET | `/vendors/:vendorId/orders` | 🟢 | `?page&limit` → `{ items, pagination }` |
| POST | `/orders/:orderId/refund` | 🟢 | `{ amount, reason, refundMethod? }` |
| GET | `/orders/:orderId/refunds` | 🟢 | |
| PATCH | `/order-meals/:id/status` | 🟢 | `{ status }` (kitchen meal status) |

---

<a id="7-customers"></a>
## 7. Customers (Admin) — `/api/admin/customers` (permission `users`)

| Method | Path | Status | Notes |
|--------|------|--------|-------|
| GET | `/admin/customers` | 🟢 | |
| GET | `/admin/customers/:id` | 🟢 | |
| GET | `/admin/customers/:id/orders` | 🟢 | |
| GET | `/admin/customers/:id/subscriptions` | 🟢 | |
| GET | `/admin/customers/:id/wallet` | 🟢 | |
| GET | `/admin/customers/:id/payments` | 🟢 | |

**GET `/admin/customers`** → `?page&limit&search&status`
```jsonc
{ "items": [ { "id", "firstName", "lastName", "email", "phone", "status", "totalOrders", "totalSpent",
    "subscriptionActive": "Boolean", "joinedAt": "DateTime" } ], "pagination": {} }
```

---

<a id="8-vendors"></a>
## 8. Vendors — `/api/vendor`

### Self (current vendor)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/vendor/my-profile` | 🔐 VENDOR | 🟢 | |

### Admin lifecycle (permission `vendors`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/vendor/add` | 🔐+perm | 🟢 | create vendor + login user |
| GET | `/vendor/all` | 🔐+perm | 🟢 | |
| GET | `/vendor/:vendorCode` | 🔐+perm | 🟢 | authed (S2 fixed) |
| PATCH | `/vendor/:vendorCode` | 🔐+perm | 🟢 | |
| DELETE | `/vendor/:vendorCode` | 🔐+perm | 🟢 | soft delete |
| PUT | `/vendor/:vendorCode/profile` | 🔐+perm | 🟢 | upsert profile |
| POST | `/vendor/:vendorCode/branches` | 🔐+perm | 🟢 | |
| GET | `/vendor/:vendorCode/branches` | 🔐+perm | 🟢 | |
| POST | `/vendor/branches/:branchId/kitchens` | 🔐+perm | 🟢 | |
| POST | `/vendor/:vendorCode/documents` | 🔐+perm | 🟢 | upload legal doc |
| PATCH | `/vendor/documents/:docId/verify` | 🔐+perm | 🟢 | |
| GET | `/vendor/:vendorCode/wallet` | 🔐 | 🟢 | vendor self or admin+perm (S5) |
| GET | `/vendor/:vendorCode/settlements` | 🔐 | 🟢 | vendor self or admin+perm (S5) |
| POST | `/vendor/:vendorCode/settlements/trigger` | 🔐+perm `settings` | 🟢 | generate settlement period |
| PATCH | `/vendor/:vendorCode/settings` | 🔐+perm | 🟢 | |
| PUT | `/vendor/:vendorCode/operating-hours` | 🔐+perm | 🟢 | |

**POST `/vendor/add`**
```jsonc
{ "vendorName": "*", "vendorCode": "*", "phone": "*", "email"?, "businessType"?, "status"?,
  "user": { "firstName": "*", "lastName": "*", "phone": "*", "email"?, "password": "*" } }
```
**Response `201`** → `{ id, vendorCode, vendorName, status, user: { id, email } }`

**GET `/vendor/:vendorCode`** → `{ id, vendorCode, vendorName, phone, email, logo?, banner?, status, address?, profile: {...}, operatingHours, rating, branchCount, kitchenCount }`

**POST `/vendor/:vendorCode/branches`** → `{ name*, address*, phone?, latitude?, longitude?, status? }`
**POST `/vendor/branches/:branchId/kitchens`** → `{ name*, status? }`

---

<a id="9-packages"></a>
## 9. Packages & Meal Plans — `/api/package`

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/package/categories` | 🔐 ADMIN | 🟢 | |
| GET | `/package/categories` | — | 🟢 | |
| GET | `/package/` | — | 🟢 | list published (APPROVED only) |
| GET | `/package/:id` | — | 🟢 | detail |
| GET | `/package/admin` | 🔐 ADMIN+perm `packages` | 🟢 | list all w/ status filter |
| POST | `/package/admin/create` | 🔐 ADMIN+perm `packages` | 🟢 | admin builds package w/ `vendorId` → APPROVED |
| PATCH | `/package/admin/:id/approve` | 🔐 ADMIN+perm `packages` | 🟢 | |
| PATCH | `/package/admin/:id/reject` | 🔐 ADMIN+perm `packages` | 🟢 | body `{ reason* }` |
| POST | `/package/vendor/create` | 🔐+perm `packages` | 🟢 | forces PENDING; foods must belong to vendor |
| GET | `/package/vendor/packages` | 🔐+perm | 🟢 | vendor's own packages + status |
| GET | `/package/vendor/open-requests` | 🔐+perm | 🟢 | vendor custom-request queue |
| PATCH | `/package/vendor/accept-request/:id` | 🔐+perm | 🟢 | |
| POST | `/package/custom-request` | 🔐 | 🟢 | customer custom meal plan |
| POST | `/package/custom-request/:id/pay` | 🔐 | 🟢 | |
| POST | `/package/:packageId/reviews` | 🔐 | 🟢 | |
| PATCH | `/package/reviews/:reviewId` | 🔐 | 🟢 | |
| DELETE | `/package/reviews/:reviewId` | 🔐 | 🟢 | |
| GET | `/package/reviews/pending` | 🔐 ADMIN | 🟢 | moderation queue |
| PATCH | `/package/reviews/:reviewId/status` | 🔐 ADMIN | 🟢 | approve/hide |

**GET `/package/`** → `?categoryId&page&limit`
**GET `/package/:id`** → `{ id, name, slug, thumbnail, description, durationDays, pricePerDay, totalPrice, category, meals: [ { dayNumber, meals: [ { mealType, mealTime, foodId?, foodName, image } ] } ], reviews }`

**GET `/package/admin`** → `?status=PENDING|APPROVED|REJECTED&vendorId&search&page&limit`
```jsonc
{ "items": [ { "id", "packageCode", "name", "status", "rejectionReason", "createdAt",
    "packageCategory": { "id", "name" }, "vendor": { "id", "businessName" },
    "approver": { "id", "fullName" }, "prices": [ { "durationDays", "price", "discountPrice" } ],
    "rating": { "average", "count" }, "_count": { "packageItems": 1 } } ], "pagination": {} }
```

**POST `/package/admin/create`** — admin builds the package; `vendorId` selects the vendor and every `foodId` must be on that vendor's **approved** menu. Result status is **APPROVED** (published immediately):
```jsonc
{ "vendorId": "*", "packageCode"?, "name": "*", "slug"?, "description"?, "thumbnail"?, "packageType"?,
  "durationDays": "*", "totalMeals": "*", "price": "*", "discountPrice"?, "currency"?,
  "isCustomizable"?, "packageCategoryId"?,
  "days": [ { "dayNumber": 1, "title"?, "description"?, "meals": [ { "mealType": "BREAKFAST|LUNCH|DINNER",
    "mealTime": "08:00", "foods": [ { "foodId": "UUID", "quantity": 1 } ] } ] } ] }
```

**POST `/package/vendor/create`** — vendor submits a package for review (status **PENDING**; every `foodId` must be on the vendor's own approved menu; `vendorId` is resolved from the token):
```jsonc
{ "name": "*", "slug"?, "description"?, "thumbnail"?, "packageType"?, "durationDays": "*",
  "totalMeals": "*", "price": "*", "discountPrice"?, "isCustomizable"?, "packageCategoryId"?,
  "days": [ { "dayNumber": 1, "title"?, "description"?, "meals": [ { "mealType": "BREAKFAST|LUNCH|DINNER",
    "mealTime": "08:00", "foods": [ { "foodId": "UUID", "quantity": 1 } ] } ] } ] }
```

**GET `/package/vendor/packages`** → `{ "items": [ { "id", "packageCode", "name", "status", "rejectionReason", "createdAt" } ], "pagination": {} }`

**PATCH `/package/admin/:id/approve`** — publishes (APPROVED). **PATCH `/package/admin/:id/reject`** → `{ "reason": "*" }` → REJECTED.

**POST `/package/custom-request`** → `{ packageId* | customMealPlanId*, startDate*, endDate*, notes? }`

---

<a id="10-subscriptions"></a>
## 10. Subscriptions

⚪ **Planned** — `Subscription` model exists, no routes yet. Endpoints designed from schema (`subscriptionNumber`, `duration`, `autoRenew`, `totalAmount`/`paidAmount`/`remainingAmount`).

### Customer
**POST `/subscriptions`** — subscribe to a package.
```jsonc
{ "packageId": "*UUID (or customMealPlanId)", "customMealPlanId": "UUID", "startDate": "*Date",
  "endDate": "*Date", "duration": "*Int", "autoRenew": "Boolean" }
```
**Response `201`**
```jsonc
{ "id": "UUID", "subscriptionNumber": "String", "status": "PENDING", "startDate": "Date", "endDate": "Date",
  "totalAmount": "Number", "paidAmount": "Number", "remainingAmount": "Number" }
```

**GET `/subscriptions`** — list mine.
`?page=1&limit=10&status=PENDING|ACTIVE|PAUSED|EXPIRED|CANCELLED`
```jsonc
{ "items": [ { "id", "subscriptionNumber", "package": { "name", "thumbnail" }, "status", "startDate", "endDate",
    "autoRenew", "totalAmount", "paidAmount", "nextDeliveryDate", "daysCompleted", "daysRemaining" } ],
  "pagination": {} }
```

**GET `/subscriptions/:id`** — full detail (customer).
```jsonc
{ "id", "subscriptionNumber", "customer": { "id", "fullName", "phone" }, "package": { "id", "name", "slug" },
  "status", "startDate", "endDate", "duration", "autoRenew", "totalAmount", "paidAmount", "remainingAmount",
  "days": [ { "dayNumber", "deliveryDate", "status", "meals": [ { "mealType", "mealTime", "food": { "name", "thumbnail" }, "status" } ] } ] }
```

**DELETE `/subscriptions/:id`** — cancel.

### Lifecycle (customer)
| Method | Path | Request |
|--------|------|---------|
| POST | `/subscriptions/:id/pause` | `{ pauseStartDate*, pauseEndDate*, reason? }` |
| POST | `/subscriptions/:id/resume` | `{ resumeDate* }` |
| POST | `/subscriptions/:id/freeze` | `{ freezeStartDate*, freezeEndDate*, reason? }` |
| POST | `/subscriptions/:id/skip-meal` | `{ subscriptionMealId*, skipDate*, reason?, replacementMealId? }` |
| POST | `/subscriptions/:id/renew` | `{ paymentMethodId* }` |
| POST | `/subscriptions/:id/upgrade` | `{ newPackageId*, paymentMethodId? }` |
| POST | `/subscriptions/:id/downgrade` | `{ newPackageId* }` |
| GET | `/subscriptions/:id/history` | — |
| GET | `/subscriptions/:id/status-history` | — |
| GET | `/subscriptions/:id/invoices` | — |

### Meal feedback & issues (customer)
| Method | Path | Request |
|--------|------|---------|
| POST | `/subscription-meals/:mealId/feedback` | `{ rating: 1-5*, review?, image? }` |
| POST | `/subscription-meals/:mealId/issue` | `{ issueType*: quality\|missing\|late\|wrong_item, description?, attachment? }` |
| POST | `/subscription-meals/:mealId/replace` | `{ newFoodId*, reason? }` |

### Admin
| Method | Path | Notes |
|--------|------|------|
| GET | `/admin/subscriptions` | paginated, filter `status/customer/package` |
| PATCH | `/subscription-days/:id/status` | override a day's status |
| PATCH | `/subscription-meals/:id/status` | |
| GET | `/admin/meal-issues` | list all reported issues |
| PATCH | `/meal-issues/:id/resolve` | `{ resolution*, resolvedBy* }` |

---

<a id="11-payments"></a>
## 11. Payments — `/api/payments`

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
| POST | `/payments/initiate` | 🔐 | 🟢 | → `{ paymentUrl, payment }` |
| POST | `/payments/:id/retry` | 🔐 CUSTOMER | 🟢 | `{ paymentMethodId? }` |

**POST `/payments/initiate`**
```jsonc
{ "orderId": "*UUID", "gatewayCode"?: "sslcommerz", "amount": "*Number", "currency"?: "BDT", "paymentMethodId"? }
```
**Response `201`** → `{ paymentId, paymentNumber, gatewayUrl, transactionId?, status: "PENDING" }`

### Admin (permission `settings`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/payments/:id/refund` | 🔐 ADMIN | 🟡 | wallet-based, sandbox only `{ amount, reason, refundMethod? }` |
| POST | `/payments/:id/adjust` | 🔐 ADMIN | 🟡 | `{ adjustmentType: correction\|chargeback\|bonus, amount, reason }` |

### Query
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/payments` | 🔐 | 🟢 | customer sees own, admin all; `?page&limit&status` → `{ items, pagination }` |
| GET | `/payments/:id` | 🔐 | 🟢 | |

**GET `/payments`** → `?page&limit&status&customerId(admin)&from&to`
**GET `/payments/:id`**
```jsonc
{ "id", "paymentNumber", "orderId", "orderNumber", "customerName", "paymentMethod", "amount", "currency",
  "status", "paymentDate", "transactions": [ { "gatewayTransactionId", "status", "amount", "processedAt" } ],
  "refunds": [ { "refundAmount", "refundMethod", "status", "processedAt" } ],
  "adjustments": [ { "adjustmentType", "amount", "reason" } ] }
```

---

<a id="12-wallet"></a>
## 12. Customer Wallet — `/api/wallet`

### Customer
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/wallet` | 🔐 CUSTOMER | 🟢 | balance + hold |
| GET | `/wallet/transactions` | 🔐 CUSTOMER | 🟢 | |
| POST | `/wallet/topup` | 🔐 CUSTOMER | 🟢 | → SSLCommerz |
| GET | `/wallet/topup/success` | — | 🟢 | gateway callback |
| POST | `/wallet/withdraw` | 🔐 CUSTOMER | 🟢 | |

### Admin (permission `settings`)
| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/wallet/withdrawals` | 🔐 ADMIN | 🟢 | |
| PATCH | `/wallet/withdraw/:id/approve` | 🔐 ADMIN | 🟢 | |
| PATCH | `/wallet/withdraw/:id/reject` | 🔐 ADMIN | 🟢 | |

**GET `/wallet`** → `{ id, balance, holdBalance, currency: "BDT", status }`
**GET `/wallet/transactions`** → `?page&limit&type=CREDIT|DEBIT`
```jsonc
{ "items": [ { "id", "transactionType": "CREDIT|DEBIT", "amount", "balanceBefore", "balanceAfter",
    "referenceType": "order|topup|cashback|refund", "referenceId", "remarks", "createdAt" } ], "pagination": {} }
```
**POST `/wallet/topup`** → `{ amount*, paymentMethodId? }` → `{ paymentId, gatewayUrl }`
**POST `/wallet/withdraw`** → `{ amount*, withdrawMethod: "bank"|"mobile_banking"*, accountNumber* }`

---

<a id="13-settlements"></a>
## 13. Vendor Settlements — `/api/settlements` (ADMIN)

| Method | Path | Perm | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/vendors/:vendorId/wallet` | reports or vendor self | 🟢 | |
| GET | `/vendors/:vendorId/wallet/transactions` | reports or vendor self | 🟢 | |
| GET | `/vendors/:vendorId/settlements` | reports or vendor self | 🟢 | |
| GET | `/settlements/:id` | reports | 🟢 | |
| GET | `/admin/settlements` | settings | 🟢 | |
| POST | `/admin/settlements` | settings | 🟢 | `{ vendorId, settlementPeriodStart, settlementPeriodEnd }` |
| POST | `/settlements/:id/process` | settings | 🟢 | `{ transactionId?, paymentMethod?, processedAt? }` |
| GET | `/platform/revenue` | settings | 🟢 | `?from&to` |

**GET `/vendors/:vendorId/settlements`**
```jsonc
{ "items": [ { "id", "settlementNumber", "settlementPeriodStart", "settlementPeriodEnd", "totalOrders",
    "grossAmount", "commissionAmount", "vatAmount", "adjustmentAmount", "netAmount", "paymentStatus", "paymentDate" } ],
  "pagination": {} }
```
**GET `/platform/revenue`** → `{ totalRevenue, commissionRevenue, deliveryRevenue, subscriptionRevenue, period: { from, to } }`

---

<a id="14-riders"></a>
## 14. Riders

🟡 **UI shell exists** (`dashboard/admin/riders/*` — list, live, performance, earnings) but **mock data, no backend routes yet**. `Rider` + `RiderProfile` models exist. Endpoints designed from schema.

### Admin CRUD
| Method | Path | Auth | Request / Notes |
|--------|------|------|-----------------|
| GET | `/riders` | 🔐 ADMIN, VENDOR | `?page&limit&status&isOnline` |
| POST | `/riders` | 🔐 ADMIN, VENDOR | `{ userId*, vendorId?, branchId?, vehicleType? }` (profile via RiderProfile) |
| GET | `/riders/:id` | 🔐 ADMIN, VENDOR | |
| PATCH | `/riders/:id` | 🔐 ADMIN, VENDOR | |
| DELETE | `/riders/:id` | 🔐 ADMIN | soft delete |
| PATCH | `/riders/:id/online` | 🔐 RIDER | toggle online |
| PATCH | `/riders/:id/status` | 🔐 ADMIN | `{ status: ACTIVE\|INACTIVE\|SUSPENDED }` |

**GET `/riders`**
```jsonc
{ "items": [ { "id", "riderCode", "user": { "fullName", "phone", "email", "profileImage" },
    "status", "isOnline", "isAvailable", "vehicleType", "totalDeliveries", "averageRating",
    "averageDeliveryTime", "earnings" } ], "pagination": {} }
```

**POST `/riders`**
```jsonc
{ "userId": "*UUID", "vendorId": "UUID", "branchId": "UUID",
  "profile": { "employmentType": "fulltime|parttime|contract", "nidNumber", "licenseNumber",
    "licenseExpiryDate", "joiningDate", "emergencyContactName", "emergencyContactPhone", "bankAccount" } }
```

### Documents & vehicle
| Method | Path | Auth | Request |
|--------|------|------|---------|
| GET | `/riders/:riderId/documents` | 🔐 | |
| POST | `/riders/:riderId/documents` | 🔐 | `{ documentType*: NID\|Driving License, documentNumber*, documentUrl*, expiryDate? }` |
| PATCH | `/rider-documents/:id/verify` | 🔐 ADMIN | `{ verificationStatus*: verified\|rejected }` |
| GET | `/riders/:riderId/vehicle` | 🔐 | |
| POST | `/riders/:riderId/vehicle` | 🔐 | `{ vehicleType*: bike\|scooter\|car, brand?, model?, registrationNumber*, color?, insuranceNumber?, insuranceExpiryDate? }` |
| PATCH | `/rider-vehicle/:id` | 🔐 | |

### Performance, wallet, availability
| Method | Path | Notes |
|--------|------|-------|
| GET | `/riders/:riderId/performance` | `{ totalDeliveries, completedDeliveries, cancelledDeliveries, averageDeliveryTime, averageRating, acceptanceRate, completionRate }` |
| GET | `/riders/:riderId/ratings` | `{ items: [ { customerName, rating, review, createdAt } ] }` |
| GET | `/riders/:riderId/wallet` | |
| GET | `/riders/:riderId/wallet/transactions` | |
| POST | `/rider-wallet/withdraw` | `{ amount*, withdrawMethod*, accountNumber* }` |
| GET | `/riders/:riderId/availability` | |
| POST | `/riders/:riderId/availability` | `{ dayOfWeek*: Mon..Sun, startTime*: HH:mm, endTime*: HH:mm, isAvailable? }` |
| POST | `/riders/:riderId/shifts` | `{ shiftName*, startTime*, endTime*, status? }` |
| POST | `/riders/:riderId/attendance` | `{ checkIn*, checkOut?, workingHours?, attendanceStatus? }` |

---

<a id="15-deliveries"></a>
## 15. Deliveries & Live Tracking

⚪ **Planned** — full `Delivery*`, `Tracking*`, `Route*` models exist, no routes yet.

### Deliveries
**POST `/orders/:orderId/delivery`** (🔐 ADMIN) → `{ deliveryType?: "standard"|"express"|"scheduled", priority?: Int }`
**Response `201`** → `{ id, deliveryCode, deliveryStatus: "PENDING" }`

| Method | Path | Auth | Request |
|--------|------|------|---------|
| PATCH | `/deliveries/:id/assign-rider` | 🔐 ADMIN, VENDOR | `{ riderId* }` |
| PATCH | `/deliveries/:id/status` | 🔐 RIDER, ADMIN | `{ status*: picked_up\|on_the_way\|delivered\|failed, remarks?, location?: { latitude, longitude } }` |
| POST | `/deliveries/:id/proof` | 🔐 RIDER | `{ proofType*: photo\|signature\|otp, image?, signature?, otp? }` |
| POST | `/deliveries/:id/attempt` | 🔐 RIDER | `{ reason* }` |
| GET | `/deliveries` | 🔐 ADMIN, VENDOR, RIDER | `?page&limit&status&riderId&from&to` |
| GET | `/deliveries/:id` | 🔐 | detail + tracking |

**GET `/deliveries/:id`**
```jsonc
{ "id", "deliveryCode", "order": { "id", "orderNumber" }, "rider": { "id", "fullName", "phone" },
  "deliveryStatus", "deliveryType", "address": { ... }, "deliveryCharge", "assignedAt", "pickedUpAt",
  "deliveredAt", "proof": { "type", "url" }?, "attempts": [ { "reason", "attemptedAt" } ] }
```

### Routes
| Method | Path | Auth | Request |
|--------|------|------|---------|
| POST | `/routes/optimize` | 🔐 ADMIN | `{ riderId*, deliveryIds*: [UUID] }` |
| GET | `/routes/:id` | 🔐 | route + stops |
| PATCH | `/routes/:id/assign-rider` | 🔐 ADMIN | `{ riderId* }` |

**POST `/routes/optimize`** → `{ id, routeCode, totalDistance, estimatedDuration, stops: [ { stopNumber, deliveryId, customerAddress, latitude, longitude, estimatedArrivalTime } ] }`

### Live tracking
| Method | Path | Auth | Request / Notes |
|--------|------|------|-----------------|
| POST | `/tracking/session` | 🔐 RIDER | `{ deliveryId* }` → `{ id, trackingCode }` |
| PATCH | `/tracking/session/:id/end` | 🔐 RIDER | |
| POST | `/tracking/location` | 🔐 RIDER | `{ sessionId*, latitude*, longitude*, speed?, heading?, accuracy?, batteryLevel? }` |
| GET | `/deliveries/:deliveryId/tracking` | 🔐 CUSTOMER, ADMIN | customer-facing |
| GET | `/tracking/eta/:deliveryId` | 🔐 CUSTOMER | |

**GET `/deliveries/:deliveryId/tracking`**
```jsonc
{ "deliveryStatus", "rider": { "name", "phone", "photo" }, "riderLatitude", "riderLongitude",
  "estimatedArrivalTime", "remainingDistance", "remainingDuration", "events": [ { "event",
  "description", "createdAt" } ] }
```

---

<a id="16-notifications"></a>
## 16. Notifications

⚪ **Planned — easy-way inbox (no websockets)**. `Notification` model exists (`title`, `message`, `type`, `referenceType`, `referenceId`, `isRead`, `readAt`). Delivery is **not realtime** — **no socket.io**. RTK Query strategy:
- **Poll only `unread-count`** every **30s**, and **only while the dashboard tab is focused** (`skipPollingIfUnfocused` + `refetchOnFocus` via `setupListeners`). Background/hidden tabs make **zero** requests — keeps Neon free-tier load minimal.
- **Full list is fetched on demand**, not polled: on panel open, when unread count changes, or on the manual **refresh button** in the dashboard header.
- Manual refresh button (`RefreshCw` in the header) dispatches `api.util.invalidateTags(TAG_TYPES)` → refetches all currently-subscribed queries (orders, notifications, wallet, …) in one click.
Settings already live at `/api/users/me/notification-settings`.

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/notifications` | 🔐 ALL | `?page&limit&type=order\|payment\|promotion\|system` — fetched on panel open / manual refresh |
| PATCH | `/notifications/:id/read` | 🔐 | mark one read |
| POST | `/notifications/read-all` | 🔐 | |
| GET | `/notifications/unread-count` | 🔐 | polled 30s while tab focused — drives the unread badge |

**GET `/notifications`**
```jsonc
{ "items": [ { "id", "title", "message", "type", "referenceType", "referenceId", "isRead", "readAt",
    "createdAt" } ], "pagination": {}, "unreadCount": "Int" }
```

### Admin: broadcast & announcements (⚪)
| Method | Path | Request |
|--------|------|---------|
| POST | `/admin/broadcast` | `{ title*, message*, targetType*: all\|customers\|vendors\|riders\|custom_segment, segmentId?, channels: [push,email,sms], scheduledAt? }` |
| GET | `/admin/announcements` | |
| POST | `/admin/announcements` | `{ title*, description?, image?, startDate?, endDate? }` |
| PATCH | `/admin/announcements/:id` | |

### FAQ (⚪)
`GET /faq/categories` (public) · `GET /faq/categories/:categoryId/faqs` (public) · `POST /admin/faq/categories` · `POST /admin/faq` · `PATCH /admin/faq/:id` · `DELETE /admin/faq/:id`

---

<a id="17-support"></a>
## 17. Support & Contact

Support is **email + WhatsApp only** — no ticket/chat tables (removed from schema).

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/support/contact` | — | ⚪ | `{ subject*, issue*, message*, email? }` → emails the support inbox |
| GET | `/support/config` | — | ⚪ | `{ email, whatsapp }` for the contact page |

**POST `/support/contact`**
```jsonc
{ "subject"*, "issue"*, "message"*, "email"?: "guests only — authed users send from their account" }
```
**Response `200`** → `{ success: true }`

---

<a id="18-cms"></a>
## 18. CMS

🟡 **UI shell exists** (`dashboard/admin/cms/*` — banners, sliders, blogs, pages, settings) but **mock data, no backend routes yet**. `Banner`, `Slider`, `Blog`, `StaticPage` models exist.

### Banners & sliders (public read / admin write)
| Method | Path | Auth | Request |
|--------|------|------|---------|
| GET | `/cms/banners` | — | list active (`status=active`, within `startDate`/`endDate`) |
| POST | `/cms/banners` | 🔐 ADMIN | `{ title*, subtitle?, image*, redirectType?, redirectId?, displayOrder?, startDate?, endDate?, status? }` |
| PATCH | `/cms/banners/:id` | 🔐 ADMIN | |
| DELETE | `/cms/banners/:id` | 🔐 ADMIN | |
| GET | `/cms/sliders` | — | |
| POST | `/cms/sliders` | 🔐 ADMIN | `{ title*, image*, description?, displayOrder?, status? }` |
| PATCH | `/cms/sliders/:id` | 🔐 ADMIN | |
| DELETE | `/cms/sliders/:id` | 🔐 ADMIN | |

**GET `/cms/banners`** → `{ items: [ { id, title, subtitle, image, redirectType, redirectId, displayOrder } ] }`

### Blogs
| Method | Path | Auth |
|--------|------|------|
| GET | `/cms/blogs` | — (paginated, published) |
| GET | `/cms/blogs/:slug` | — |
| POST | `/cms/blogs` | 🔐 ADMIN |
| PATCH | `/cms/blogs/:id` | 🔐 ADMIN |
| DELETE | `/cms/blogs/:id` | 🔐 ADMIN |

**POST `/cms/blogs`** → `{ title*, slug*, content*, thumbnail?, categoryId?, status? }`

### Static pages
**GET `/cms/pages/:slug`** (public) — About, Privacy, Terms etc.
```jsonc
{ "title", "slug", "content", "metaTitle", "metaDescription", "updatedAt" }
```

---

<a id="19-reports"></a>
## 19. Reports & Analytics

🟡 **UI shell exists** (`dashboard/admin/reports/*` — revenue, vendors, customers, riders, subscriptions, inventory) but **mock data, no backend routes yet**. Platform revenue + settlements are built (see §13). `ActivityLog`, `PlatformRevenue` models exist.

### Analytics
| Method | Path | Notes |
|--------|------|-------|
| GET | `/analytics/dashboard` | overview KPIs (totalUsers, totalCustomers, totalVendors, totalOrders, completedOrders, cancelledOrders, totalRevenue, todaySales, todayOrders, activeSubscriptions, pendingVendors) |
| GET | `/analytics/sales` | `?from&to&period=daily\|weekly\|monthly` |
| GET | `/analytics/revenue` | breakdown |
| GET | `/analytics/customer/:customerId` | per-customer |
| GET | `/analytics/vendor/:vendorId` | per-vendor |
| GET | `/analytics/rider/:riderId` | per-rider |
| GET | `/analytics/package/:packageId` | per-package |
| GET | `/analytics/kpis` | `{ items: [ { name, code, value, target, percentage, reportDate } ] }` |

**GET `/analytics/sales`**
```jsonc
{ "data": [ { "date", "totalSales", "grossRevenue", "netRevenue", "commission", "refundAmount", "deliveryCharge" } ],
  "summary": { "total", "average", "growth" } }
```

### Reports
| Method | Path | Request |
|--------|------|---------|
| POST | `/reports/generate` | `{ reportType*: sales\|revenue\|finance\|subscription\|customer\|vendor\|rider\|delivery\|payment\|tax\|inventory\|marketing\|coupon\|refund\|audit, startDate*, endDate*, filters?, exportType?: pdf\|csv\|xlsx }` |
| GET | `/reports` | list generated |
| GET | `/reports/:id` | detail + download URL |
| POST | `/reports/schedules` | `{ reportTemplateId*, frequency*: daily\|weekly\|monthly, nextRun*, emailTo*: [String] }` |
| GET | `/reports/templates` | |
| POST | `/reports/templates` | `{ name*, reportType*, description?, filters?, columns?, chartType? }` |

### Activity log
**GET `/admin/activity-logs`** → `?page&limit&userId&module&action&from&to`
```jsonc
{ "items": [ { "id", "user": { "name", "email" }, "module", "action", "description", "ipAddress", "device", "browser", "createdAt" } ], "pagination": {} }
```

---

<a id="20-settings"></a>
## 20. System Settings

⚪ **Planned** — `SystemSetting` (key-value), `FeatureFlag`, `ActivityLog` models exist, no routes yet.

| Method | Path | Auth | Request |
|--------|------|------|---------|
| GET | `/admin/settings` | 🔐 SUPER_ADMIN | all key-value settings |
| PATCH | `/admin/settings/:key` | 🔐 SUPER_ADMIN | `{ settingValue* }` |
| GET | `/admin/settings/general` | 🔐 | |
| PATCH | `/admin/settings/general` | 🔐 SUPER_ADMIN | `{ appName, appLogo, supportEmail, supportPhone, currency, timezone, language }` |
| PATCH | `/admin/settings/payment` | 🔐 SUPER_ADMIN | `{ gatewayName, isSandbox, storeId, apiKey }` |
| PATCH | `/admin/settings/delivery` | 🔐 SUPER_ADMIN | `{ minimumDeliveryTime, maximumDeliveryDistance, defaultDeliveryCharge, freeDeliveryAmount }` |
| PATCH | `/admin/settings/packages` | 🔐 SUPER_ADMIN | `{ minimumOrderDays, maximumOrderDays, allowCustomization, allowPause, allowSkipMeal }` |
| PATCH | `/admin/settings/commission` | 🔐 SUPER_ADMIN | `{ defaultCommissionType, defaultCommissionRate }` |
| PATCH | `/admin/settings/notifications` | 🔐 SUPER_ADMIN | `{ pushEnabled, smsEnabled, emailEnabled, marketingEnabled }` |
| GET | `/admin/feature-flags` | 🔐 ADMIN | |
| PATCH | `/admin/feature-flags/:name` | 🔐 SUPER_ADMIN | `{ isEnabled* }` |
| GET | `/admin/maintenance` | 🔐 | |
| POST | `/admin/maintenance` | 🔐 SUPER_ADMIN | `{ enabled*, message?, startTime?, endTime? }` |

**GET `/admin/settings/general`** → `{ appName, appLogo, supportEmail, supportPhone, currency, timezone, language, maintenanceMode }`

---

<a id="21-coupons"></a>
## 21. Coupons — `/api/admin/coupons` (ADMIN, permission `coupons`)

| Method | Path | Status | Notes |
|--------|------|--------|-------|
| GET | `/admin/coupons` | 🟢 | |
| GET | `/admin/coupons/:id` | 🟢 | |
| POST | `/admin/coupons` | 🟢 | see below |
| PATCH | `/admin/coupons/:id` | 🟢 | |
| DELETE | `/admin/coupons/:id` | 🟢 | |

**POST `/admin/coupons`**
```jsonc
{ "couponCode": "*", "discountType": "*PERCENTAGE|FIXED", "discountValue": "*", "title"?, "description"?,
  "minimumOrderAmount"?, "maximumDiscount"?, "usageLimit"?, "perUserLimit"?, "startDate"?, "endDate"?, "status"? }
```

**GET `/admin/coupons`** → `{ items: [ { id, couponCode, discountType, discountValue, minimumOrderAmount, maximumDiscount, usageLimit, perUserLimit, startDate, endDate, status, usageCount } ], pagination: {} }`

> Coupon redemption happens at checkout: `POST /cart/checkout/apply-coupon` (see §5). Usage rows write to `CouponUsage`.

---

<a id="22-inventory"></a>
## 22. Inventory & Supply Chain

⚪ **Planned** — `Inventory`, `InventoryTransaction`, `Supplier`, `Purchase`, `PurchaseItem`, `WasteLog` models exist, no routes yet. Vendor-scoped.

### Inventory (vendor)
| Method | Path | Auth | Request |
|--------|------|------|---------|
| GET | `/vendor/inventory` | 🔐 VENDOR | `?page&limit&search&status&category` |
| POST | `/vendor/inventory` | 🔐 VENDOR | `{ ingredientName*, category?, unit*, minimumStock?, currentStock?, maximumStock?, status? }` |
| PATCH | `/vendor/inventory/:id` | 🔐 VENDOR | |
| DELETE | `/vendor/inventory/:id` | 🔐 VENDOR | soft delete |
| GET | `/vendor/inventory/:id/transactions` | 🔐 VENDOR | |

**GET `/vendor/inventory`**
```jsonc
{ "items": [ { "id", "ingredientName", "category", "unit", "minimumStock", "currentStock", "maximumStock",
    "status", "stockStatus": "LOW|OK|OUT", "updatedAt" } ], "pagination": {} }
```

### Suppliers (vendor)
| Method | Path | Request |
|--------|------|---------|
| GET | `/vendor/suppliers` | `?page&limit` |
| POST | `/vendor/suppliers` | `{ companyName*, phone*, contactPerson?, email?, address?, status? }` |
| PATCH | `/vendor/suppliers/:id` | |
| DELETE | `/vendor/suppliers/:id` | |

### Purchases (vendor)
| Method | Path | Request |
|--------|------|---------|
| GET | `/vendor/purchases` | `?page&limit&status&from&to` |
| POST | `/vendor/purchases` | `{ supplierId*, purchaseDate?, items*: [ { inventoryId*, quantity*, unitPrice* } ], vat?, discount? }` |
| GET | `/vendor/purchases/:id` | |
| PATCH | `/vendor/purchases/:id/status` | `{ status*: pending\|received\|cancelled }` |

**POST `/vendor/purchases`** → `{ purchaseNumber, grandTotal }` (auto-generates `PurchaseItem`, stock adjustment on `received`).

### Waste (vendor)
| Method | Path | Request |
|--------|------|---------|
| GET | `/vendor/waste` | `?page&limit&from&to` |
| POST | `/vendor/waste` | `{ inventoryId*, quantity*, reason*, approvedBy? }` |
| PATCH | `/vendor/waste/:id/approve` | |

---

<a id="23-zones"></a>
## 23. Zones & Service Areas

⚪ **Planned** — `VendorZone` model exists (`zoneName`, `zoneCode`, `description`, `status`), no routes yet.

| Method | Path | Auth | Request / Notes |
|--------|------|------|-----------------|
| GET | `/vendor/zones` | 🔐 VENDOR | my zones |
| POST | `/vendor/zones` | 🔐 VENDOR | `{ zoneName*, zoneCode?, description?, status? }` |
| PATCH | `/vendor/zones/:id` | 🔐 VENDOR | |
| DELETE | `/vendor/zones/:id` | 🔐 VENDOR | |
| GET | `/admin/zones` | 🔐 ADMIN | all vendor zones |

**GET `/vendor/zones`** → `{ items: [ { id, zoneName, zoneCode, description, status, deliveryCount } ] }`

---

<a id="24-upload"></a>
## 24. Upload & Files — `/api/upload`

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| POST | `/upload/image` | 🔐 any authed | 🟢 | `multipart/form-data` field `image`; jpg/jpeg/png/gif/webp, max 5MB (S7 fixed) |

**Response `200`** → `{ url }`. Files served from `/uploads/*`.
```
POST /api/upload/image        Content-Type: multipart/form-data
  image: <file>
```

---

<a id="25-misc"></a>
## 25. Misc / Health

| Method | Path | Auth | Status | Notes |
|--------|------|------|--------|-------|
| GET | `/health` | — | 🟢 | `{ status: "ok", timestamp }` |

---

> **Document version:** 4.2.0 — complete spec (built + planned), aligned to current build plan.
> **Field reference:** `prisma/schema.prisma` for planned module models.
> **Route matrix:** `docs/API_REFERENCE.md`.
> **Last updated:** 2026-08-03
