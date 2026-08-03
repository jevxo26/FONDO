# FONDO — API Reference (Route Table)

Complete route inventory — **built and planned**. Frontend devs: use this to find the exact endpoint + auth for any screen. Full request/response contracts in `docs/API.md`.

**Legend:** 🔐 = Bearer token · perm = permission module · 🟢 built · 🟡 gap · 🔴 broken · ⚪ planned
**Envelope:** all responses `{ success, message, data }`.
**Planned rows** (⚪) are designed from `prisma/schema.prisma` — subject to change at build.

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
| 14 | POST | `/api/users` | 🔐 perm users | 🟢 | Admin create user |
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
| 96 | POST | `/api/package/vendor/create` | 🔐 perm packages | 🟢 | Create → PENDING (S3 fixed) |
| 97 | GET | `/api/package/admin` | 🔐 ADMIN perm packages | 🟢 | List all + status filter |
| 98 | POST | `/api/package/admin/create` | 🔐 ADMIN perm packages | 🟢 | Build w/ vendorId → APPROVED |
| 99 | PATCH | `/api/package/admin/:id/approve` | 🔐 ADMIN perm packages | 🟢 | Approve/publish |
| 100 | PATCH | `/api/package/admin/:id/reject` | 🔐 ADMIN perm packages | 🟢 | Reject w/ reason |
| 101 | GET | `/api/package/vendor/packages` | 🔐 perm packages | 🟢 | Vendor own packages |
| 102 | GET | `/api/package/vendor/open-requests` | 🔐 perm packages | 🟢 | Vendor request queue |
| 103 | PATCH | `/api/package/vendor/accept-request/:id` | 🔐 perm packages | 🟢 | Accept custom request |
| 104 | POST | `/api/package/custom-request` | 🔐 | 🟢 | Customer custom request |
| 105 | POST | `/api/package/custom-request/:id/pay` | 🔐 | 🟢 | Pay custom order |
| 106 | POST | `/api/package/:packageId/reviews` | 🔐 | 🟢 | Create review |
| 107 | PATCH | `/api/package/reviews/:reviewId` | 🔐 | 🟢 | Update review |
| 108 | DELETE | `/api/package/reviews/:reviewId` | 🔐 | 🟢 | Delete review |
| 109 | GET | `/api/package/reviews/pending` | 🔐 ADMIN | 🟢 | Moderation queue |
| 110 | PATCH | `/api/package/reviews/:reviewId/status` | 🔐 ADMIN | 🟢 | Approve/hide |

---

## G. Cart & checkout — base `/api/cart`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 111 | GET | `/api/cart` | 🔐 | 🟢 | Get cart |
| 112 | POST | `/api/cart` | 🔐 | 🟢 | Init `{ packageId?, customMealPlanId? }` |
| 113 | DELETE | `/api/cart` | 🔐 | 🟢 | Clear cart |
| 114 | POST | `/api/cart/items` | 🔐 | 🟢 | Add item |
| 115 | PATCH | `/api/cart/items/:id` | 🔐 | 🟢 | Update qty |
| 116 | DELETE | `/api/cart/items/:id` | 🔐 | 🟢 | Remove item |
| 117 | POST | `/api/cart/items/:itemId/addons` | 🔐 | 🟢 | Add addon |
| 118 | DELETE | `/api/cart/addons/:id` | 🔐 | 🟢 | Remove addon |
| 119 | POST | `/api/cart/meals` | 🔐 | 🟢 | Add meal (package flow) |
| 120 | DELETE | `/api/cart/meals/:id` | 🔐 | 🟢 | Remove meal |
| 121 | POST | `/api/cart/meals/:mealId/foods` | 🔐 | 🟢 | Add food to meal |
| 122 | DELETE | `/api/cart/meals/:mealId/foods/:foodId` | 🔐 | 🟢 | Remove food from meal |
| 123 | POST | `/api/cart/checkout` | 🔐 | 🟢 | Checkout summary |
| 124 | POST | `/api/cart/checkout/apply-coupon` | 🔐 | 🟢 | Apply coupon |
| 125 | DELETE | `/api/cart/checkout/remove-coupon` | 🔐 | 🟢 | Remove coupon |
| 126 | POST | `/api/cart/checkout/select-address` | 🔐 | 🟢 | Select delivery address |
| 127 | POST | `/api/cart/checkout/place-order` | 🔐 | 🟢 | Place order |

---

## H. Payments — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 128 | GET | `/api/payment-methods` | — | 🟢 | Payment methods |
| 129 | GET+POST | `/api/payments/success` | — | 🟢 | Gateway success |
| 130 | GET+POST | `/api/payments/fail` | — | 🟢 | Gateway fail |
| 131 | GET+POST | `/api/payments/cancel` | — | 🟢 | Gateway cancel |
| 132 | POST | `/api/payments/ipn` | — | 🟢 | Gateway IPN |
| 133 | POST | `/api/payments/initiate` | 🔐 | 🟢 | Initiate SSLCommerz |
| 134 | POST | `/api/payments/:id/retry` | 🔐 CUSTOMER | 🟢 | Retry payment |
| 135 | POST | `/api/payments/:id/refund` | 🔐 ADMIN perm settings | 🟡 | Wallet refund |
| 136 | POST | `/api/payments/:id/adjust` | 🔐 ADMIN perm settings | 🟡 | Adjust payment |
| 137 | GET | `/api/payments` | 🔐 | 🟢 | List (paginated) |
| 138 | GET | `/api/payments/:id` | 🔐 | 🟢 | Detail |

---

## I. Orders — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 139 | GET | `/api/orders` | 🔐 | 🟢 | My orders |
| 140 | GET | `/api/orders/:id` | 🔐 | 🟢 | Order detail |
| 141 | PATCH | `/api/orders/:id` | 🔐 | 🟢 | Update notes/schedule |
| 142 | POST | `/api/orders/:id/cancel` | 🔐 | 🟢 | Cancel |
| 143 | POST | `/api/orders/:orderId/feedback` | 🔐 | 🟢 | Submit feedback |
| 144 | GET | `/api/orders/:orderId/invoice` | 🔐 | 🟢 | Invoice |
| 145 | GET | `/api/orders/:orderId/invoice/download` | 🔐 | 🟢 | Invoice PDF |
| 146 | DELETE | `/api/orders/:id` | 🔐 ADMIN perm orders | 🟢 | Soft delete |
| 147 | PATCH | `/api/orders/:id/status` | 🔐 ADMIN perm orders | 🟢 | Update status |
| 148 | PATCH | `/api/orders/:id/assign-vendor` | 🔐 ADMIN perm orders | 🟢 | Assign vendor |
| 149 | PATCH | `/api/orders/:id/assign-rider` | 🔐 ADMIN perm orders | 🟢 | Assign rider |
| 150 | GET | `/api/admin/orders` | 🔐 ADMIN perm orders | 🟢 | List all (paginated) |
| 151 | GET | `/api/vendors/:vendorId/orders` | 🔐 ADMIN perm orders | 🟢 | Vendor orders (paginated) |
| 152 | POST | `/api/orders/:orderId/refund` | 🔐 ADMIN perm orders | 🟢 | Refund |
| 153 | GET | `/api/orders/:orderId/refunds` | 🔐 ADMIN perm orders | 🟢 | Refunds |
| 154 | PATCH | `/api/order-meals/:id/status` | 🔐 ADMIN perm orders | 🟢 | Meal status |

---

## J. Wallets — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 155 | GET | `/api/wallet` | 🔐 CUSTOMER | 🟢 | Balance |
| 156 | GET | `/api/wallet/transactions` | 🔐 CUSTOMER | 🟢 | Transactions |
| 157 | POST | `/api/wallet/topup` | 🔐 CUSTOMER | 🟢 | Top-up |
| 158 | GET | `/api/wallet/topup/success` | — | 🟢 | Top-up callback |
| 159 | POST | `/api/wallet/withdraw` | 🔐 CUSTOMER | 🟢 | Request withdraw |
| 160 | GET | `/api/wallet/withdrawals` | 🔐 ADMIN perm settings | 🟢 | Admin list |
| 161 | PATCH | `/api/wallet/withdraw/:id/approve` | 🔐 ADMIN perm settings | 🟢 | Approve |
| 162 | PATCH | `/api/wallet/withdraw/:id/reject` | 🔐 ADMIN perm settings | 🟢 | Reject |

---

## K. Vendors — base `/api/vendor`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 163 | GET | `/api/vendor/my-profile` | 🔐 VENDOR | 🟢 | Self profile |
| 164 | POST | `/api/vendor/add` | 🔐 perm vendors | 🟢 | Create vendor |
| 165 | GET | `/api/vendor/all` | 🔐 perm vendors | 🟢 | All vendors |
| 166 | GET | `/api/vendor/:vendorCode` | 🔐 perm vendors | 🟢 | Vendor detail (S2 fixed) |
| 167 | PATCH | `/api/vendor/:vendorCode` | 🔐 perm vendors | 🟢 | Update |
| 168 | DELETE | `/api/vendor/:vendorCode` | 🔐 perm vendors | 🟢 | Soft delete |
| 169 | PUT | `/api/vendor/:vendorCode/profile` | 🔐 perm vendors | 🟢 | Upsert profile |
| 170 | POST | `/api/vendor/:vendorCode/branches` | 🔐 perm vendors | 🟢 | Add branch |
| 171 | GET | `/api/vendor/:vendorCode/branches` | 🔐 perm vendors | 🟢 | List branches |
| 172 | POST | `/api/vendor/branches/:branchId/kitchens` | 🔐 perm vendors | 🟢 | Add kitchen |
| 173 | POST | `/api/vendor/:vendorCode/documents` | 🔐 perm vendors | 🟢 | Upload document |
| 174 | PATCH | `/api/vendor/documents/:docId/verify` | 🔐 perm vendors | 🟢 | Verify document |
| 175 | GET | `/api/vendor/:vendorCode/wallet` | 🔐 | 🟢 | Vendor wallet (self or admin) |
| 176 | GET | `/api/vendor/:vendorCode/settlements` | 🔐 | 🟢 | Vendor settlements (self or admin) |
| 177 | POST | `/api/vendor/:vendorCode/settlements/trigger` | 🔐 perm settings | 🟢 | Generate period |
| 178 | PATCH | `/api/vendor/:vendorCode/settings` | 🔐 perm vendors | 🟢 | Update settings |
| 179 | PUT | `/api/vendor/:vendorCode/operating-hours` | 🔐 perm vendors | 🟢 | Operating hours |

---

## L. Coupons — base `/api/admin/coupons`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 180 | GET | `/api/admin/coupons` | 🔐 ADMIN perm coupons | 🟢 | List |
| 181 | GET | `/api/admin/coupons/:id` | 🔐 ADMIN perm coupons | 🟢 | Detail |
| 182 | POST | `/api/admin/coupons` | 🔐 ADMIN perm coupons | 🟢 | Create |
| 183 | PATCH | `/api/admin/coupons/:id` | 🔐 ADMIN perm coupons | 🟢 | Update |
| 184 | DELETE | `/api/admin/coupons/:id` | 🔐 ADMIN perm coupons | 🟢 | Delete |

---

## M. Settlements — base `/api`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 185 | GET | `/api/vendors/:vendorId/wallet` | 🔐 reports or vendor self | 🟢 | Vendor wallet |
| 186 | GET | `/api/vendors/:vendorId/wallet/transactions` | 🔐 reports or vendor self | 🟢 | Wallet txns |
| 187 | GET | `/api/vendors/:vendorId/settlements` | 🔐 reports or vendor self | 🟢 | Settlements |
| 188 | GET | `/api/settlements/:id` | 🔐 ADMIN perm reports | 🟢 | Settlement detail |
| 189 | GET | `/api/admin/settlements` | 🔐 ADMIN perm settings | 🟢 | All settlements |
| 190 | POST | `/api/admin/settlements` | 🔐 ADMIN perm settings | 🟢 | Create |
| 191 | POST | `/api/settlements/:id/process` | 🔐 ADMIN perm settings | 🟢 | Process |
| 192 | GET | `/api/platform/revenue` | 🔐 ADMIN perm settings | 🟢 | Platform revenue |

---

## N. Customers — base `/api/admin/customers`

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 193 | GET | `/api/admin/customers` | 🔐 ADMIN perm users | 🟢 | List |
| 194 | GET | `/api/admin/customers/:id` | 🔐 ADMIN perm users | 🟢 | Detail |
| 195 | GET | `/api/admin/customers/:id/orders` | 🔐 ADMIN perm users | 🟢 | Orders |
| 196 | GET | `/api/admin/customers/:id/subscriptions` | 🔐 ADMIN perm users | 🟢 | Subscriptions |
| 197 | GET | `/api/admin/customers/:id/wallet` | 🔐 ADMIN perm users | 🟢 | Wallet |
| 198 | GET | `/api/admin/customers/:id/payments` | 🔐 ADMIN perm users | 🟢 | Payments |

---

## O. Upload & health

| # | Method | Path | Auth | Status | Description |
|---|--------|------|------|--------|-------------|
| 199 | POST | `/api/upload/image` | 🔐 | 🟢 | Upload image (jpg/png/webp ≤5MB) |
| 200 | GET | `/api/health` | — | 🟢 | Health check |

---

## P. Subscriptions — ⚪ planned, base `/api`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 201 | POST | `/api/subscriptions` | 🔐 CUSTOMER | Subscribe to package |
| 202 | GET | `/api/subscriptions` | 🔐 CUSTOMER | My subscriptions |
| 203 | GET | `/api/subscriptions/:id` | 🔐 CUSTOMER | Detail + days/meals |
| 204 | DELETE | `/api/subscriptions/:id` | 🔐 CUSTOMER | Cancel |
| 205 | POST | `/api/subscriptions/:id/pause` | 🔐 CUSTOMER | Pause |
| 206 | POST | `/api/subscriptions/:id/resume` | 🔐 CUSTOMER | Resume |
| 207 | POST | `/api/subscriptions/:id/freeze` | 🔐 CUSTOMER | Freeze |
| 208 | POST | `/api/subscriptions/:id/skip-meal` | 🔐 CUSTOMER | Skip meal |
| 209 | POST | `/api/subscriptions/:id/renew` | 🔐 CUSTOMER | Renew |
| 210 | POST | `/api/subscriptions/:id/upgrade` | 🔐 CUSTOMER | Upgrade package |
| 211 | POST | `/api/subscriptions/:id/downgrade` | 🔐 CUSTOMER | Downgrade package |
| 212 | GET | `/api/subscriptions/:id/history` | 🔐 CUSTOMER | Action log |
| 213 | GET | `/api/subscriptions/:id/status-history` | 🔐 CUSTOMER | Status transitions |
| 214 | GET | `/api/subscriptions/:id/invoices` | 🔐 CUSTOMER | Invoices |
| 215 | POST | `/api/subscription-meals/:mealId/feedback` | 🔐 CUSTOMER | Meal feedback |
| 216 | POST | `/api/subscription-meals/:mealId/issue` | 🔐 CUSTOMER | Report issue |
| 217 | POST | `/api/subscription-meals/:mealId/replace` | 🔐 CUSTOMER | Replace meal |
| 218 | GET | `/api/admin/subscriptions` | 🔐 ADMIN perm subscriptions | All subscriptions |
| 219 | PATCH | `/api/subscription-days/:id/status` | 🔐 ADMIN | Override day status |
| 220 | PATCH | `/api/subscription-meals/:id/status` | 🔐 ADMIN | Override meal status |
| 221 | GET | `/api/admin/meal-issues` | 🔐 ADMIN | All issues |
| 222 | PATCH | `/api/meal-issues/:id/resolve` | 🔐 ADMIN | Resolve issue |

---

## Q. Riders — 🟡 UI shell (mock), backend ⚪ planned, base `/api`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 223 | GET | `/api/riders` | 🔐 ADMIN, VENDOR | List riders |
| 224 | POST | `/api/riders` | 🔐 ADMIN, VENDOR | Create rider |
| 225 | GET | `/api/riders/:id` | 🔐 ADMIN, VENDOR | Detail |
| 226 | PATCH | `/api/riders/:id` | 🔐 ADMIN, VENDOR | Update |
| 227 | DELETE | `/api/riders/:id` | 🔐 ADMIN | Soft delete |
| 228 | PATCH | `/api/riders/:id/online` | 🔐 RIDER | Toggle online |
| 229 | PATCH | `/api/riders/:id/status` | 🔐 ADMIN | Change status |
| 230 | GET | `/api/riders/:riderId/documents` | 🔐 | List documents |
| 231 | POST | `/api/riders/:riderId/documents` | 🔐 | Upload document |
| 232 | PATCH | `/api/rider-documents/:id/verify` | 🔐 ADMIN | Verify document |
| 233 | GET | `/api/riders/:riderId/vehicle` | 🔐 | Get vehicle |
| 234 | POST | `/api/riders/:riderId/vehicle` | 🔐 | Add vehicle |
| 235 | PATCH | `/api/rider-vehicle/:id` | 🔐 | Update vehicle |
| 236 | GET | `/api/riders/:riderId/performance` | 🔐 ADMIN | Performance metrics |
| 237 | GET | `/api/riders/:riderId/ratings` | 🔐 ADMIN | Ratings |
| 238 | GET | `/api/riders/:riderId/wallet` | 🔐 RIDER, ADMIN | Rider wallet |
| 239 | GET | `/api/riders/:riderId/wallet/transactions` | 🔐 RIDER, ADMIN | Wallet txns |
| 240 | POST | `/api/rider-wallet/withdraw` | 🔐 RIDER | Withdraw request |
| 241 | GET | `/api/riders/:riderId/availability` | 🔐 RIDER | Availability |
| 242 | POST | `/api/riders/:riderId/availability` | 🔐 RIDER | Set availability |
| 243 | POST | `/api/riders/:riderId/shifts` | 🔐 ADMIN, VENDOR | Add shift |
| 244 | POST | `/api/riders/:riderId/attendance` | 🔐 RIDER, ADMIN | Log attendance |

---

## R. Deliveries & Live Tracking — ⚪ planned, base `/api`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 245 | POST | `/api/orders/:orderId/delivery` | 🔐 ADMIN | Create delivery |
| 246 | PATCH | `/api/deliveries/:id/assign-rider` | 🔐 ADMIN, VENDOR | Assign rider |
| 247 | PATCH | `/api/deliveries/:id/status` | 🔐 RIDER, ADMIN | Update status |
| 248 | POST | `/api/deliveries/:id/proof` | 🔐 RIDER | Upload delivery proof |
| 249 | POST | `/api/deliveries/:id/attempt` | 🔐 RIDER | Log failed attempt |
| 250 | GET | `/api/deliveries` | 🔐 ADMIN, VENDOR, RIDER | List deliveries |
| 251 | GET | `/api/deliveries/:id` | 🔐 | Delivery detail |
| 252 | POST | `/api/routes/optimize` | 🔐 ADMIN | Optimize route |
| 253 | GET | `/api/routes/:id` | 🔐 | Route + stops |
| 254 | PATCH | `/api/routes/:id/assign-rider` | 🔐 ADMIN | Assign route rider |
| 255 | POST | `/api/tracking/session` | 🔐 RIDER | Start tracking session |
| 256 | PATCH | `/api/tracking/session/:id/end` | 🔐 RIDER | End session |
| 257 | POST | `/api/tracking/location` | 🔐 RIDER | Update rider location |
| 258 | GET | `/api/deliveries/:deliveryId/tracking` | 🔐 CUSTOMER, ADMIN | Customer tracking |
| 259 | GET | `/api/tracking/eta/:deliveryId` | 🔐 CUSTOMER | ETA only |

---

## S. Notifications — ⚪ planned, base `/api`

**Delivery:** easy-way, **no socket.io**. RTK Query — poll `unread-count` (row 263) every 30s **only while the dashboard tab is focused** (`skipPollingIfUnfocused` + `refetchOnFocus`); fetch full list (row 260) on panel open / count change / **dashboard header refresh button** (`RefreshCw` → `invalidateTags(TAG_TYPES)`).

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 260 | GET | `/api/notifications` | 🔐 ALL | My notifications |
| 261 | PATCH | `/api/notifications/:id/read` | 🔐 | Mark read |
| 262 | POST | `/api/notifications/read-all` | 🔐 | Mark all read |
| 263 | GET | `/api/notifications/unread-count` | 🔐 | Unread count |
| 264 | POST | `/api/admin/broadcast` | 🔐 ADMIN | Broadcast push/email/sms |
| 265 | GET | `/api/admin/announcements` | 🔐 ADMIN | List announcements |
| 266 | POST | `/api/admin/announcements` | 🔐 ADMIN | Create announcement |
| 267 | PATCH | `/api/admin/announcements/:id` | 🔐 ADMIN | Update announcement |
| 268 | GET | `/api/faq/categories` | — | FAQ categories |
| 269 | GET | `/api/faq/categories/:categoryId/faqs` | — | FAQs |
| 270 | POST | `/api/admin/faq/categories` | 🔐 ADMIN | Create FAQ category |
| 271 | POST | `/api/admin/faq` | 🔐 ADMIN | Create FAQ |
| 272 | PATCH | `/api/admin/faq/:id` | 🔐 ADMIN | Update FAQ |
| 273 | DELETE | `/api/admin/faq/:id` | 🔐 ADMIN | Delete FAQ |

---

## T. Support & Contact — ⚪ planned, base `/api`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 274 | POST | `/api/support/contact` | — | Send { subject, issue, message, email? } to support inbox |
| 275 | GET | `/api/support/config` | — | { email, whatsapp } for the contact page |


---

## U. CMS — 🟡 UI shell (mock), backend ⚪ planned, base `/api`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 276 | GET | `/api/cms/banners` | — | Active banners |
| 277 | POST | `/api/cms/banners` | 🔐 ADMIN perm cms | Create banner |
| 278 | PATCH | `/api/cms/banners/:id` | 🔐 ADMIN | Update banner |
| 279 | DELETE | `/api/cms/banners/:id` | 🔐 ADMIN | Delete banner |
| 280 | GET | `/api/cms/sliders` | — | Active sliders |
| 281 | POST | `/api/cms/sliders` | 🔐 ADMIN | Create slider |
| 282 | PATCH | `/api/cms/sliders/:id` | 🔐 ADMIN | Update slider |
| 283 | DELETE | `/api/cms/sliders/:id` | 🔐 ADMIN | Delete slider |
| 284 | GET | `/api/cms/blogs` | — | Published blogs |
| 285 | GET | `/api/cms/blogs/:slug` | — | Blog detail |
| 286 | POST | `/api/cms/blogs` | 🔐 ADMIN | Create blog |
| 287 | PATCH | `/api/cms/blogs/:id` | 🔐 ADMIN | Update blog |
| 288 | DELETE | `/api/cms/blogs/:id` | 🔐 ADMIN | Delete blog |
| 289 | GET | `/api/cms/pages/:slug` | — | Static page |

---

## V. Reports & Analytics — 🟡 UI shell (mock), backend ⚪ planned, base `/api`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 290 | GET | `/api/analytics/dashboard` | 🔐 ADMIN perm reports | Overview KPIs |
| 291 | GET | `/api/analytics/sales` | 🔐 ADMIN perm reports | Sales analytics |
| 292 | GET | `/api/analytics/revenue` | 🔐 ADMIN perm reports | Revenue breakdown |
| 293 | GET | `/api/analytics/customer/:customerId` | 🔐 ADMIN | Per-customer |
| 294 | GET | `/api/analytics/vendor/:vendorId` | 🔐 ADMIN | Per-vendor |
| 295 | GET | `/api/analytics/rider/:riderId` | 🔐 ADMIN | Per-rider |
| 296 | GET | `/api/analytics/package/:packageId` | 🔐 ADMIN | Per-package |
| 297 | GET | `/api/analytics/kpis` | 🔐 ADMIN | KPIs |
| 298 | POST | `/api/reports/generate` | 🔐 ADMIN perm reports | Generate report |
| 299 | GET | `/api/reports` | 🔐 ADMIN | List reports |
| 300 | GET | `/api/reports/:id` | 🔐 ADMIN | Report + download |
| 301 | POST | `/api/reports/schedules` | 🔐 ADMIN | Schedule report |
| 302 | GET | `/api/reports/templates` | 🔐 ADMIN | Templates |
| 303 | POST | `/api/reports/templates` | 🔐 ADMIN | Create template |
| 304 | GET | `/api/admin/activity-logs` | 🔐 ADMIN perm reports | Activity log |

---

## W. System Settings — ⚪ planned, base `/api/admin`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 305 | GET | `/api/admin/settings` | 🔐 SUPER_ADMIN | All settings |
| 306 | PATCH | `/api/admin/settings/:key` | 🔐 SUPER_ADMIN | Update setting |
| 307 | GET | `/api/admin/settings/general` | 🔐 | General settings |
| 308 | PATCH | `/api/admin/settings/general` | 🔐 SUPER_ADMIN | Update general |
| 309 | PATCH | `/api/admin/settings/payment` | 🔐 SUPER_ADMIN | Payment settings |
| 310 | PATCH | `/api/admin/settings/delivery` | 🔐 SUPER_ADMIN | Delivery settings |
| 311 | PATCH | `/api/admin/settings/packages` | 🔐 SUPER_ADMIN | Package rules |
| 312 | PATCH | `/api/admin/settings/commission` | 🔐 SUPER_ADMIN | Commission rules |
| 313 | PATCH | `/api/admin/settings/notifications` | 🔐 SUPER_ADMIN | Notification toggles |
| 314 | GET | `/api/admin/feature-flags` | 🔐 ADMIN | Feature flags |
| 315 | PATCH | `/api/admin/feature-flags/:name` | 🔐 SUPER_ADMIN | Toggle flag |
| 316 | GET | `/api/admin/maintenance` | 🔐 | Maintenance status |
| 317 | POST | `/api/admin/maintenance` | 🔐 SUPER_ADMIN | Toggle maintenance |

---

## X. Inventory & Supply Chain — ⚪ planned, base `/api/vendor`

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 318 | GET | `/api/vendor/inventory` | 🔐 VENDOR | List inventory |
| 319 | POST | `/api/vendor/inventory` | 🔐 VENDOR | Add item |
| 320 | PATCH | `/api/vendor/inventory/:id` | 🔐 VENDOR | Update item |
| 321 | DELETE | `/api/vendor/inventory/:id` | 🔐 VENDOR | Delete item |
| 322 | GET | `/api/vendor/inventory/:id/transactions` | 🔐 VENDOR | Item transactions |
| 323 | GET | `/api/vendor/suppliers` | 🔐 VENDOR | List suppliers |
| 324 | POST | `/api/vendor/suppliers` | 🔐 VENDOR | Create supplier |
| 325 | PATCH | `/api/vendor/suppliers/:id` | 🔐 VENDOR | Update supplier |
| 326 | DELETE | `/api/vendor/suppliers/:id` | 🔐 VENDOR | Delete supplier |
| 327 | GET | `/api/vendor/purchases` | 🔐 VENDOR | List purchases |
| 328 | POST | `/api/vendor/purchases` | 🔐 VENDOR | Create purchase |
| 329 | GET | `/api/vendor/purchases/:id` | 🔐 VENDOR | Purchase detail |
| 330 | PATCH | `/api/vendor/purchases/:id/status` | 🔐 VENDOR | Receive/cancel |
| 331 | GET | `/api/vendor/waste` | 🔐 VENDOR | List waste logs |
| 332 | POST | `/api/vendor/waste` | 🔐 VENDOR | Log waste |
| 333 | PATCH | `/api/vendor/waste/:id/approve` | 🔐 VENDOR | Approve waste |

---

## Y. Zones & Service Areas — ⚪ planned

| # | Method | Path | Auth | Description |
|---|--------|------|------|-------------|
| 334 | GET | `/api/vendor/zones` | 🔐 VENDOR | My zones |
| 335 | POST | `/api/vendor/zones` | 🔐 VENDOR | Create zone |
| 336 | PATCH | `/api/vendor/zones/:id` | 🔐 VENDOR | Update zone |
| 337 | DELETE | `/api/vendor/zones/:id` | 🔐 VENDOR | Delete zone |
| 338 | GET | `/api/admin/zones` | 🔐 ADMIN | All vendor zones |

---

> **Totals:** 200 built/partial/broken rows · 138 planned rows · 338 total.
> **Version:** 4.0.0 — complete route matrix (built + planned). **Last updated:** 2026-08-03.
> Full contracts: `docs/API.md`. Field reference: `prisma/schema.prisma`.
