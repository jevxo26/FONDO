# FONDO — API Reference (Route Table)

Complete route inventory. Frontend devs: use this to find the exact endpoint + auth for any screen. Full contracts in `docs/API.md`.

**Legend:** 🔐 = Bearer token · perm = permission module · 🟢 built · 🟡 gap · 🔴 broken · ⚪ planned
**Envelope:** all responses `{ success, message, data }`.

---

## A. Auth — base `/api/auth`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 1 | POST | `/api/auth/register` | — | 🟢 | Register customer |
| 2 | POST | `/api/auth/login` | — | 🟢 | email/phone + password |
| 3 | POST | `/api/auth/otp/send` | — | 🟢 | Send OTP |
| 4 | POST | `/api/auth/otp/verify` | — | 🟢 | Verify OTP |
| 5 | POST | `/api/auth/refresh` | cookie | 🟢 | Rotate refresh token |
| 6 | POST | `/api/auth/logout` | — | 🟢 | Logout, clear cookie |
| 7 | GET | `/api/auth/me` | 🔐 | 🟢 | Current user |
| 8 | POST | `/api/auth/forgot-password` | — | 🟢 | Send reset OTP |
| 9 | POST | `/api/auth/reset-password` | — | 🟢 | Set new password |
| 10 | PATCH | `/api/auth/change-password` | 🔐 | 🟢 | Change password |

---

## B. Users — base `/api/users`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 11 | PATCH | `/api/users/me` | 🔐 | 🟢 | Update profile |
| 12 | DELETE | `/api/users/me` | 🔐 | 🟢 | Delete self |
| 13 | GET | `/api/users` | 🔐 perm users | 🟢 | Admin list users |
| 14 | POST | `/api/users` | 🔐 perm users | 🟡 | Admin create user (unvalidated, S4) |
| 15 | GET | `/api/users/:id` | 🔐 perm users | 🟢 | Admin get user |
| 16 | PATCH | `/api/users/:id` | 🔐 perm users | 🟢 | Admin update user |
| 17 | DELETE | `/api/users/:id` | 🔐 perm users | 🟢 | Admin delete user |

### Addresses — base `/api/users/me/addresses`
| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 18 | GET | `/api/users/me/addresses` | 🔐 | 🟢 | List my addresses |
| 19 | POST | `/api/users/me/addresses` | 🔐 | 🟢 | Create address |
| 20 | PATCH | `/api/users/me/addresses/:id` | 🔐 | 🟢 | Update |
| 21 | DELETE | `/api/users/me/addresses/:id` | 🔐 | 🟢 | Delete |
| 22 | PATCH | `/api/users/me/addresses/:id/default` | 🔐 | 🟢 | Set default |

### Devices — base `/api/users/me/devices`
| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 23 | GET | `/api/users/me/devices` | 🔐 | 🟢 | List devices |
| 24 | POST | `/api/users/me/devices` | 🔐 | 🟢 | Register device/push |
| 25 | DELETE | `/api/users/me/devices/:id` | 🔐 | 🟢 | Unregister |

### Notification settings — base `/api/users/me/notification-settings`
| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 26 | GET | `/api/users/me/notification-settings` | 🔐 | 🟢 | Get prefs |
| 27 | PATCH | `/api/users/me/notification-settings` | 🔐 | 🟢 | Update prefs |

### Login history — base `/api/users/me/login-history`
| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 28 | GET | `/api/users/me/login-history` | 🔐 | 🟢 | List logins |

---

## C. Food catalog (public) — base `/api/foods`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 29 | GET | `/api/foods` | — | 🟢 | List APPROVED foods |
| 30 | GET | `/api/foods/slug/:slug` | — | 🟢 | Detail by slug |
| 31 | GET | `/api/foods/:id` | — | 🟢 | Detail by id |
| 32 | GET | `/api/foods/categories/list` | — | 🟢 | Categories |
| 33 | GET | `/api/foods/categories/:id` | — | 🟢 | Category + foods |
| 34 | GET | `/api/foods/tags/list` | — | 🟢 | Tags |
| 35 | GET | `/api/foods/:foodId/reviews` | — | 🟢 | Food reviews |
| 36 | POST | `/api/foods/:foodId/reviews` | 🔐 | 🟢 | Write review |
| 37 | GET | `/api/foods/:foodId/favorite` | 🔐 | 🟢 | Favorite status |
| 38 | POST | `/api/foods/:foodId/favorite` | 🔐 | 🟢 | Add favorite |
| 39 | DELETE | `/api/foods/:foodId/favorite` | 🔐 | 🟢 | Remove favorite |
| 40 | GET | `/api/foods/favorites` | 🔐 | 🟢 | My favorites |
| 41 | GET | `/api/foods/vendor/foods` | 🔐 perm foods | 🟢 | My vendor's foods |

---

## D. Admin food management — base `/api/admin`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 42 | GET | `/api/admin/foods` | 🔐 ADMIN perm foods | 🟢 | List all foods |
| 43 | GET | `/api/admin/foods/:id` | 🔐 ADMIN perm foods | 🟢 | Food detail |
| 44 | POST | `/api/admin/foods` | 🔐 ADMIN perm foods | 🟢 | Create food (auto-APPROVED) |
| 45 | PUT | `/api/admin/foods/:id` | 🔐 ADMIN perm foods | 🟢 | Update food |
| 46 | DELETE | `/api/admin/foods/:id` | 🔐 ADMIN perm foods | 🟢 | Delete food |
| 47 | PATCH | `/api/admin/foods/:id/approve` | 🔐 ADMIN perm foods | 🟢 | Approve |
| 48 | PATCH | `/api/admin/foods/:id/reject` | 🔐 ADMIN perm foods | 🟢 | Reject `{ reason }` |
| 49 | GET | `/api/admin/categories` | 🔐 ADMIN perm foods | 🟢 | Categories |
| 50 | POST | `/api/admin/categories` | 🔐 ADMIN perm foods | 🟢 | Create category |
| 51 | PUT | `/api/admin/categories/:id` | 🔐 ADMIN perm foods | 🟢 | Update category |
| 52 | DELETE | `/api/admin/categories/:id` | 🔐 ADMIN perm foods | 🟢 | Delete category |
| 53 | POST | `/api/admin/categories/:categoryId/subcategories` | 🔐 ADMIN | 🟢 | Create subcategory |
| 54 | PUT | `/api/admin/subcategories/:id` | 🔐 ADMIN | 🟢 | Update subcategory |
| 55 | DELETE | `/api/admin/subcategories/:id` | 🔐 ADMIN | 🟢 | Delete subcategory |
| 56 | POST | `/api/admin/foods/:foodId/variants` | 🔐 ADMIN | 🟢 | Create variant |
| 57 | PUT | `/api/admin/variants/:id` | 🔐 ADMIN | 🟢 | Update variant |
| 58 | DELETE | `/api/admin/variants/:id` | 🔐 ADMIN | 🟢 | Delete variant |
| 59 | POST | `/api/admin/foods/:foodId/addons` | 🔐 ADMIN | 🟢 | Create addon |
| 60 | PUT | `/api/admin/addons/:id` | 🔐 ADMIN | 🟢 | Update addon |
| 61 | DELETE | `/api/admin/addons/:id` | 🔐 ADMIN | 🟢 | Delete addon |
| 62 | POST | `/api/admin/addons/:addonId/items` | 🔐 ADMIN | 🟢 | Create addon item |
| 63 | PUT | `/api/admin/addon-items/:id` | 🔐 ADMIN | 🟢 | Update addon item |
| 64 | DELETE | `/api/admin/addon-items/:id` | 🔐 ADMIN | 🟢 | Delete addon item |
| 65 | GET | `/api/admin/foods/:foodId/nutrition` | 🔐 ADMIN | 🟢 | Get nutrition |
| 66 | PATCH | `/api/admin/foods/:foodId/nutrition` | 🔐 ADMIN | 🟢 | Update nutrition |
| 67 | POST | `/api/admin/foods/:foodId/ingredients` | 🔐 ADMIN | 🟢 | Add ingredient |
| 68 | DELETE | `/api/admin/ingredients/:id` | 🔐 ADMIN | 🟢 | Remove ingredient |
| 69 | POST | `/api/admin/foods/:foodId/allergens` | 🔐 ADMIN | 🟢 | Add allergen |
| 70 | DELETE | `/api/admin/allergens/:id` | 🔐 ADMIN | 🟢 | Remove allergen |
| 71 | POST | `/api/admin/foods/:foodId/prices` | 🔐 ADMIN | 🟢 | Add price |
| 72 | DELETE | `/api/admin/prices/:id` | 🔐 ADMIN | 🟢 | Remove price |
| 73 | POST | `/api/admin/foods/:foodId/images` | 🔐 ADMIN | 🟢 | Add image (`FoodImage`) |
| 74 | DELETE | `/api/admin/food-images/:id` | 🔐 ADMIN | 🟢 | Remove image |
| 75 | POST | `/api/admin/foods/:foodId/discounts` | 🔐 ADMIN | 🟢 | Add discount |
| 76 | DELETE | `/api/admin/discounts/:id` | 🔐 ADMIN | 🟢 | Remove discount |
| 77 | POST | `/api/admin/foods/:foodId/tags` | 🔐 ADMIN | 🟢 | Attach tags |
| 78 | DELETE | `/api/admin/foods/:foodId/tags/:tagId` | 🔐 ADMIN | 🟢 | Detach tag |
| 79 | POST | `/api/admin/tags` | 🔐 ADMIN | 🟢 | Create tag |
| 80 | POST | `/api/admin/foods/:foodId/labels` | 🔐 ADMIN | 🟢 | Add label |
| 81 | DELETE | `/api/admin/labels/:id` | 🔐 ADMIN | 🟢 | Remove label |
| 82 | PATCH | `/api/admin/foods/:foodId/availability` | 🔐 ADMIN | 🟢 | Update availability |
| 83 | POST | `/api/admin/foods/:foodId/schedules` | 🔐 ADMIN | 🟢 | Add schedule |
| 84 | DELETE | `/api/admin/schedules/:id` | 🔐 ADMIN | 🟢 | Remove schedule |
| 85 | PATCH | `/api/admin/foods/:foodId/visibility` | 🔐 ADMIN | 🟢 | Update visibility |

### RBAC — base `/api/admin`
| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 86 | GET | `/api/admin/permissions` | 🔐 perm users | 🟢 | Modules |
| 87 | POST | `/api/admin/users/:userId/permissions` | 🔐 perm users | 🟢 | Toggle `{ module, enabled }` |

---

## E. Vendor foods — base `/api/vendor/foods`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 88 | POST | `/api/vendor/foods` | 🔐 perm foods | 🟢 | Create food → PENDING |
| 89 | GET | `/api/vendor/foods` | 🔐 perm foods | 🟢 | My vendor foods |
| 90 | GET | `/api/vendor/foods/:id` | 🔐 perm foods | 🟢 | Detail |
| 91 | PATCH | `/api/vendor/foods/:id/status` | 🔐 perm foods | 🟢 | `{ status: ACTIVE\|INACTIVE }` |

---

## F. Packages — base `/api/package`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 92 | GET | `/api/package` | — | 🟢 | List packages |
| 93 | GET | `/api/package/:id` | — | 🟢 | Package detail |
| 94 | GET | `/api/package/categories` | — | 🟢 | Package categories |
| 95 | POST | `/api/package/categories` | 🔐 ADMIN | 🟢 | Create category |
| 96 | POST | `/api/package/vendor/create` | 🔐 perm packages | 🟡 | Create (S3 status trust) |
| 97 | GET | `/api/package/vendor/open-requests` | 🔐 perm packages | 🟢 | Vendor request queue |
| 98 | PATCH | `/api/package/vendor/accept-request/:id` | 🔐 perm packages | 🟢 | Accept custom request |
| 99 | POST | `/api/package/custom-request` | 🔐 | 🟢 | Customer custom request |
| 100 | POST | `/api/package/custom-request/:id/pay` | 🔐 | 🟢 | Pay custom order |
| 101 | POST | `/api/package/:packageId/reviews` | 🔐 | 🟢 | Create review |
| 102 | PATCH | `/api/package/reviews/:reviewId` | 🔐 | 🟢 | Update review |
| 103 | DELETE | `/api/package/reviews/:reviewId` | 🔐 | 🟢 | Delete review |
| 104 | GET | `/api/package/reviews/pending` | 🔐 ADMIN | 🟢 | Moderation queue |
| 105 | PATCH | `/api/package/reviews/:reviewId/status` | 🔐 ADMIN | 🟢 | Approve/hide |

---

## G. Cart & checkout — base `/api/cart`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 106 | GET | `/api/cart` | 🔐 | 🟢 | Get cart |
| 107 | POST | `/api/cart` | 🔐 | 🟢 | Init `{ packageId?, customMealPlanId? }` |
| 108 | DELETE | `/api/cart` | 🔐 | 🟢 | Clear cart |
| 109 | POST | `/api/cart/items` | 🔐 | 🟢 | Add item |
| 110 | PATCH | `/api/cart/items/:id` | 🔐 | 🟢 | Update qty |
| 111 | DELETE | `/api/cart/items/:id` | 🔐 | 🟢 | Remove item |
| 112 | POST | `/api/cart/items/:itemId/addons` | 🔐 | 🟢 | Add addon |
| 113 | DELETE | `/api/cart/addons/:id` | 🔐 | 🟢 | Remove addon |
| 114 | POST | `/api/cart/meals` | 🔐 | 🟢 | Add meal (package flow) |
| 115 | DELETE | `/api/cart/meals/:id` | 🔐 | 🟢 | Remove meal |
| 116 | POST | `/api/cart/meals/:mealId/foods` | 🔐 | 🟢 | Add food to meal |
| 117 | DELETE | `/api/cart/meals/:mealId/foods/:foodId` | 🔐 | 🟢 | Remove food from meal |
| 118 | POST | `/api/cart/checkout` | 🔐 | 🟢 | Checkout summary |
| 119 | POST | `/api/cart/checkout/apply-coupon` | 🔐 | 🟢 | Apply coupon |
| 120 | DELETE | `/api/cart/checkout/remove-coupon` | 🔐 | 🟢 | Remove coupon |
| 121 | POST | `/api/cart/checkout/select-address` | 🔐 | 🟢 | Select delivery address |
| 122 | POST | `/api/cart/checkout/place-order` | 🔐 | 🟡 | Place order (S10) |

---

## H. Payments — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 123 | GET | `/api/payment-methods` | — | 🟢 | Payment methods |
| 124 | GET+POST | `/api/payments/success` | — | 🟢 | Gateway success |
| 125 | GET+POST | `/api/payments/fail` | — | 🟢 | Gateway fail |
| 126 | GET+POST | `/api/payments/cancel` | — | 🟢 | Gateway cancel |
| 127 | POST | `/api/payments/ipn` | — | 🟢 | Gateway IPN |
| 128 | POST | `/api/payments/initiate` | 🔐 | 🟢 | Initiate SSLCommerz |
| 129 | POST | `/api/payments/:id/retry` | 🔐 CUSTOMER | 🟢 | Retry payment |
| 130 | POST | `/api/payments/:id/refund` | 🔐 ADMIN perm settings | 🟡 | Wallet refund |
| 131 | POST | `/api/payments/:id/adjust` | 🔐 ADMIN perm settings | 🟡 | Adjust payment |
| 132 | GET | `/api/payments` | 🔐 | 🟡 | List (S11) |
| 133 | GET | `/api/payments/:id` | 🔐 | 🟢 | Detail |

---

## I. Orders — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 134 | GET | `/api/orders` | 🔐 | 🟢 | My orders |
| 135 | GET | `/api/orders/:id` | 🔐 | 🟢 | Order detail |
| 136 | PATCH | `/api/orders/:id` | 🔐 | 🟢 | Update notes/schedule |
| 137 | POST | `/api/orders/:id/cancel` | 🔐 | 🟢 | Cancel |
| 138 | POST | `/api/orders/:orderId/feedback` | 🔐 | 🟢 | Submit feedback |
| 139 | GET | `/api/orders/:orderId/invoice` | 🔐 | 🟢 | Invoice |
| 140 | GET | `/api/orders/:orderId/invoice/download` | 🔐 | 🟢 | Invoice PDF |
| 141 | DELETE | `/api/orders/:id` | 🔐 ADMIN perm orders | 🔴 | Soft delete (S1) |
| 142 | PATCH | `/api/orders/:id/status` | 🔐 ADMIN perm orders | 🔴 | Update status (S1) |
| 143 | PATCH | `/api/orders/:id/assign-vendor` | 🔐 ADMIN perm orders | 🔴 | Assign vendor (S1) |
| 144 | PATCH | `/api/orders/:id/assign-rider` | 🔐 ADMIN perm orders | 🔴 | Assign rider (S1) |
| 145 | GET | `/api/admin/orders` | 🔐 ADMIN perm orders | 🔴 | List all (S1) |
| 146 | GET | `/api/vendors/:vendorId/orders` | 🔐 ADMIN perm orders | 🔴 | Vendor orders (S1) |
| 147 | POST | `/api/orders/:orderId/refund` | 🔐 ADMIN perm orders | 🔴 | Refund (S1) |
| 148 | GET | `/api/orders/:orderId/refunds` | 🔐 ADMIN perm orders | 🔴 | Refunds (S1) |
| 149 | PATCH | `/api/order-meals/:id/status` | 🔐 ADMIN perm orders | 🔴 | Meal status (S1) |

---

## J. Wallets — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 150 | GET | `/api/wallet` | 🔐 CUSTOMER | 🟢 | Balance |
| 151 | GET | `/api/wallet/transactions` | 🔐 CUSTOMER | 🟢 | Transactions |
| 152 | POST | `/api/wallet/topup` | 🔐 CUSTOMER | 🟢 | Top-up |
| 153 | GET | `/api/wallet/topup/success` | — | 🟢 | Top-up callback |
| 154 | POST | `/api/wallet/withdraw` | 🔐 CUSTOMER | 🟢 | Request withdraw |
| 155 | GET | `/api/wallet/withdrawals` | 🔐 ADMIN perm settings | 🟢 | Admin list |
| 156 | PATCH | `/api/wallet/withdraw/:id/approve` | 🔐 ADMIN perm settings | 🟢 | Approve |
| 157 | PATCH | `/api/wallet/withdraw/:id/reject` | 🔐 ADMIN perm settings | 🟢 | Reject |

---

## K. Vendors — base `/api/vendor`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 158 | GET | `/api/vendor/my-profile` | 🔐 VENDOR | 🟡 | Self profile (S5) |
| 159 | POST | `/api/vendor/add` | 🔐 perm vendors | 🟢 | Create vendor |
| 160 | GET | `/api/vendor/all` | 🔐 perm vendors | 🟢 | All vendors |
| 161 | GET | `/api/vendor/:vendorCode` | — | 🟡 | Public (S2) |
| 162 | PATCH | `/api/vendor/:vendorCode` | 🔐 perm vendors | 🟢 | Update |
| 163 | DELETE | `/api/vendor/:vendorCode` | 🔐 perm vendors | 🟢 | Soft delete |
| 164 | PUT | `/api/vendor/:vendorCode/profile` | 🔐 perm vendors | 🟢 | Upsert profile |
| 165 | POST | `/api/vendor/:vendorCode/branches` | 🔐 perm vendors | 🟢 | Add branch |
| 166 | GET | `/api/vendor/:vendorCode/branches` | 🔐 perm vendors | 🟢 | List branches |
| 167 | POST | `/api/vendor/branches/:branchId/kitchens` | 🔐 perm vendors | 🟢 | Add kitchen |
| 168 | POST | `/api/vendor/:vendorCode/documents` | 🔐 perm vendors | 🟢 | Upload document |
| 169 | PATCH | `/api/vendor/documents/:docId/verify` | 🔐 perm vendors | 🟢 | Verify document |
| 170 | GET | `/api/vendor/:vendorCode/wallet` | 🔐 perm vendors | 🟡 | Vendor wallet (S5) |
| 171 | GET | `/api/vendor/:vendorCode/settlements` | 🔐 perm vendors | 🟡 | Vendor settlements (S5) |
| 172 | POST | `/api/vendor/:vendorCode/settlements/trigger` | 🔐 perm settings | 🟢 | Generate period |
| 173 | PATCH | `/api/vendor/:vendorCode/settings` | 🔐 perm vendors | 🟢 | Update settings |
| 174 | PUT | `/api/vendor/:vendorCode/operating-hours` | 🔐 perm vendors | 🟢 | Operating hours |

---

## L. Coupons — base `/api/admin/coupons`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 175 | GET | `/api/admin/coupons` | 🔐 ADMIN perm coupons | 🟢 | List |
| 176 | GET | `/api/admin/coupons/:id` | 🔐 ADMIN perm coupons | 🟢 | Detail |
| 177 | POST | `/api/admin/coupons` | 🔐 ADMIN perm coupons | 🟢 | Create |
| 178 | PATCH | `/api/admin/coupons/:id` | 🔐 ADMIN perm coupons | 🟢 | Update |
| 179 | DELETE | `/api/admin/coupons/:id` | 🔐 ADMIN perm coupons | 🟢 | Delete |

---

## M. Settlements — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 180 | GET | `/api/vendors/:vendorId/wallet` | 🔐 ADMIN perm reports | 🟢 | Vendor wallet |
| 181 | GET | `/api/vendors/:vendorId/wallet/transactions` | 🔐 ADMIN perm reports | 🟢 | Wallet txns |
| 182 | GET | `/api/vendors/:vendorId/settlements` | 🔐 ADMIN perm reports | 🟢 | Settlements |
| 183 | GET | `/api/settlements/:id` | 🔐 ADMIN perm reports | 🟢 | Settlement detail |
| 184 | GET | `/api/admin/settlements` | 🔐 ADMIN perm settings | 🟢 | All settlements |
| 185 | POST | `/api/admin/settlements` | 🔐 ADMIN perm settings | 🟢 | Create |
| 186 | POST | `/api/settlements/:id/process` | 🔐 ADMIN perm settings | 🟢 | Process |
| 187 | GET | `/api/platform/revenue` | 🔐 ADMIN perm settings | 🟢 | Platform revenue |

---

## N. Customers — base `/api/admin/customers`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 188 | GET | `/api/admin/customers` | 🔐 ADMIN perm users | 🟢 | List |
| 189 | GET | `/api/admin/customers/:id` | 🔐 ADMIN perm users | 🟢 | Detail |
| 190 | GET | `/api/admin/customers/:id/orders` | 🔐 ADMIN perm users | 🟢 | Orders |
| 191 | GET | `/api/admin/customers/:id/subscriptions` | 🔐 ADMIN perm users | 🟢 | Subscriptions |
| 192 | GET | `/api/admin/customers/:id/wallet` | 🔐 ADMIN perm users | 🟢 | Wallet |
| 193 | GET | `/api/admin/customers/:id/payments` | 🔐 ADMIN perm users | 🟢 | Payments |

---

## O. Upload & health

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 194 | POST | `/api/upload/image` | 🔐 | 🟡 | Upload image (S7) |
| 195 | GET | `/api/health` | — | 🟢 | Health check |

---

## P. Planned — ⚪ no routes (schema only)

| Module | Suggested base |
|--------|----------------|
| Subscriptions | `/api/subscriptions` |
| Riders & deliveries | `/api/riders`, `/api/deliveries`, `/api/tracking` |
| Support / chat (email+WhatsApp) | contact page + `mailto:`/`wa.me` |
| CMS | `/api/admin/cms` |
| Reports / analytics | `/api/admin/reports` |
| Inventory & supply | `/api/admin/inventory` |
| Referral & loyalty | `/api/referral` |
| Zones / service areas | `/api/admin/zones` |
