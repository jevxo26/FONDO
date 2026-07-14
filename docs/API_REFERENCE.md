# FONDO — API Reference (Compressed)

> **Full spec:** `API.md`  
> **Base URL:** `http://localhost:3000/api`  
> **Auth:** JWT Bearer in `Authorization` header  
> **Body:** JSON

**Status Legend**
| Badge | Meaning |
|-------|---------|
| 🟢 | Built and working |
| 🟡 | Partial (route exists, incomplete) |
| ⚪ | Planned (not started) |

---

## 1. Auth

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| POST | `/auth/register` | — | 🟡 Partial |
| POST | `/auth/login` | — | 🟢 Built |
| POST | `/auth/login/otp` | — | ⚪ Planned |
| POST | `/auth/otp/verify` | — | ⚪ Planned |
| POST | `/auth/otp/send` | — | ⚪ Planned |
| POST | `/auth/refresh` | — | ⚪ Planned |
| POST | `/auth/logout` | JWT | ⚪ Planned |
| POST | `/auth/forgot-password` | — | ⚪ Planned |
| POST | `/auth/reset-password` | — | ⚪ Planned |
| PATCH | `/auth/change-password` | JWT | ⚪ Planned |
| POST | `/auth/social-login/google` | — | ⚪ Planned |
| POST | `/auth/social-login/facebook` | — | ⚪ Planned |

---

## 2. Users & Profile

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/users/me` | JWT | 🟡 Partial |
| PATCH | `/users/me` | JWT | 🟡 Partial |
| DELETE | `/users/me` | JWT (Customer) | ⚪ Planned |
| GET | `/users` | JWT (Admin) | 🟢 Built |
| GET | `/users/:id` | JWT (Self/Admin) | 🟢 Built |
| PATCH | `/users/:id` | JWT (Admin) | 🟢 Built |
| DELETE | `/users/:id` | JWT (SuperAdmin) | 🟡 Partial |
| GET | `/users/:userId/addresses` | JWT | ⚪ Planned |
| POST | `/users/:userId/addresses` | JWT | ⚪ Planned |
| PATCH | `/addresses/:id` | JWT | ⚪ Planned |
| DELETE | `/addresses/:id` | JWT | ⚪ Planned |
| PATCH | `/addresses/:id/default` | JWT | ⚪ Planned |
| GET | `/users/:userId/devices` | JWT | ⚪ Planned |
| POST | `/users/:userId/devices` | JWT | ⚪ Planned |
| DELETE | `/devices/:id` | JWT | ⚪ Planned |
| GET | `/users/:userId/notification-settings` | JWT | ⚪ Planned |
| PATCH | `/users/:userId/notification-settings` | JWT | ⚪ Planned |
| GET | `/users/:userId/login-history` | JWT (Self/Admin) | ⚪ Planned |

---

## 3. Food Catalog (Customer)

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/foods` | — | ⚪ Planned |
| GET | `/foods/:id` | — | ⚪ Planned |
| GET | `/foods/slug/:slug` | — | ⚪ Planned |
| GET | `/categories` | — | ⚪ Planned |
| GET | `/categories/:id` | — | ⚪ Planned |
| GET | `/tags` | — | ⚪ Planned |
| POST | `/foods/:foodId/favorite` | JWT (Customer) | ⚪ Planned |
| GET | `/foods/:foodId/reviews` | — | ⚪ Planned |
| POST | `/foods/:foodId/reviews` | JWT (Customer) | ⚪ Planned |

---

## 4. Food Admin (CRUD)

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| POST | `/foods` | JWT (Admin) | ⚪ Planned |
| PUT | `/foods/:id` | JWT (Admin) | ⚪ Planned |
| DELETE | `/foods/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/categories` | JWT (Admin) | ⚪ Planned |
| PUT | `/categories/:id` | JWT (Admin) | ⚪ Planned |
| DELETE | `/categories/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/categories/:categoryId/subcategories` | JWT (Admin) | ⚪ Planned |
| PUT | `/subcategories/:id` | JWT (Admin) | ⚪ Planned |
| DELETE | `/subcategories/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/variants` | JWT (Admin) | ⚪ Planned |
| PUT | `/variants/:id` | JWT (Admin) | ⚪ Planned |
| DELETE | `/variants/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/addons` | JWT (Admin) | ⚪ Planned |
| PUT | `/addons/:id` | JWT (Admin) | ⚪ Planned |
| DELETE | `/addons/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/addons/:addonId/items` | JWT (Admin) | ⚪ Planned |
| PUT | `/addon-items/:id` | JWT (Admin) | ⚪ Planned |
| DELETE | `/addon-items/:id` | JWT (Admin) | ⚪ Planned |
| GET | `/foods/:foodId/nutrition` | JWT (Admin) | ⚪ Planned |
| PATCH | `/foods/:foodId/nutrition` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/ingredients` | JWT (Admin) | ⚪ Planned |
| DELETE | `/ingredients/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/allergens` | JWT (Admin) | ⚪ Planned |
| DELETE | `/allergens/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/prices` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/discounts` | JWT (Admin) | ⚪ Planned |
| DELETE | `/discounts/:id` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/tags` | JWT (Admin) | ⚪ Planned |
| DELETE | `/foods/:foodId/tags/:tagId` | JWT (Admin) | ⚪ Planned |
| POST | `/tags` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/labels` | JWT (Admin) | ⚪ Planned |
| DELETE | `/labels/:id` | JWT (Admin) | ⚪ Planned |
| PATCH | `/foods/:foodId/availability` | JWT (Admin) | ⚪ Planned |
| POST | `/foods/:foodId/schedule` | JWT (Admin) | ⚪ Planned |
| DELETE | `/schedules/:id` | JWT (Admin) | ⚪ Planned |
| PATCH | `/foods/:foodId/visibility` | JWT (Admin) | ⚪ Planned |

---

## 5. Cart & Checkout

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/cart` | JWT (Customer) | ⚪ Planned |
| POST | `/cart/items` | JWT (Customer) | ⚪ Planned |
| PATCH | `/cart/items/:id` | JWT (Customer) | ⚪ Planned |
| DELETE | `/cart/items/:id` | JWT (Customer) | ⚪ Planned |
| POST | `/cart/coupon` | JWT (Customer) | ⚪ Planned |
| DELETE | `/cart/coupon` | JWT (Customer) | ⚪ Planned |
| POST | `/cart/checkout` | JWT (Customer) | ⚪ Planned |

---

## 6. Orders

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/orders` | JWT (Customer/Admin) | ⚪ Planned |
| GET | `/orders/:id` | JWT (Customer/Admin) | ⚪ Planned |
| POST | `/orders` | JWT (Customer) | ⚪ Planned |
| PATCH | `/orders/:id/status` | JWT (Admin) | ⚪ Planned |
| POST | `/orders/:id/cancel` | JWT (Customer/Admin) | ⚪ Planned |
| POST | `/orders/:id/refund` | JWT (Admin) | ⚪ Planned |
| POST | `/orders/:id/feedback` | JWT (Customer) | ⚪ Planned |
| GET | `/orders/:id/invoice` | JWT (Customer/Admin) | ⚪ Planned |

---

## 7. Customers (Admin)

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/customers` | JWT (Admin) | ⚪ Planned |
| GET | `/customers/:id` | JWT (Admin) | ⚪ Planned |
| GET | `/customers/:id/orders` | JWT (Admin) | ⚪ Planned |
| GET | `/customers/:id/subscriptions` | JWT (Admin) | ⚪ Planned |
| GET | `/customers/:id/wallet` | JWT (Admin) | ⚪ Planned |

---

## 8–21 (Planned)

See `API.md` for full specs on:
- Vendors (full), Packages & Meal Plans, Vendor Settlements
- Riders, Deliveries & Tracking, Notifications, Support Tickets
- CMS, Reports & Analytics, Roles & Permissions, System Settings

---

## Standard Error Format

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

Common HTTP codes: 400 (validation), 401 (unauthorized), 403 (forbidden), 404 (not found), 409 (conflict), 500 (server error).
