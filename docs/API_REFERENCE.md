# FONDO — API Reference

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
| POST | `/auth/register` | — | 🟢 Built |
| POST | `/auth/login` | — | 🟢 Built |
| POST | `/auth/otp/send` | — | 🟢 Built |
| POST | `/auth/otp/verify` | — | 🟢 Built |
| POST | `/auth/refresh` | — | 🟢 Built |
| POST | `/auth/logout` | — | 🟢 Built |
| GET | `/auth/me` | JWT | 🟢 Built |
| POST | `/auth/forgot-password` | — | 🟢 Built |
| POST | `/auth/reset-password` | — | 🟢 Built |
| PATCH | `/auth/change-password` | JWT | 🟢 Built |

---

## 2. Users & Profile

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/users/me` | JWT | 🟢 Built |
| PATCH | `/users/me` | JWT | 🟢 Built |
| DELETE | `/users/me` | JWT | 🟢 Built |
| GET | `/users` | JWT (Admin) | 🟢 Built |
| POST | `/users` | — | 🟢 Built |
| GET | `/users/:id` | JWT | 🟢 Built |
| PATCH | `/users/:id` | JWT | 🟢 Built |
| GET | `/users/me/addresses` | JWT | 🟢 Built |
| POST | `/users/me/addresses` | JWT | 🟢 Built |
| PATCH | `/users/me/addresses/:id` | JWT | 🟢 Built |
| DELETE | `/users/me/addresses/:id` | JWT | 🟢 Built |
| PATCH | `/users/me/addresses/:id/default` | JWT | 🟢 Built |
| GET | `/users/me/devices` | JWT | 🟢 Built |
| POST | `/users/me/devices` | JWT | 🟢 Built |
| DELETE | `/users/me/devices/:id` | JWT | 🟢 Built |
| GET | `/users/me/notification-settings` | JWT | 🟢 Built |
| PATCH | `/users/me/notification-settings` | JWT | 🟢 Built |
| GET | `/users/me/login-history` | JWT | 🟢 Built |

---

## 3. Food Catalog (Customer)

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/foods` | — | 🟢 Built |
| GET | `/foods/:id` | — | 🟢 Built |
| GET | `/foods/slug/:slug` | — | 🟢 Built |
| GET | `/foods/categories/list` | — | 🟢 Built |
| GET | `/foods/categories/:id` | — | 🟢 Built |
| GET | `/foods/tags/list` | — | 🟢 Built |
| POST | `/foods/:foodId/favorite` | JWT | 🟢 Built |
| DELETE | `/foods/:foodId/favorite` | JWT | 🟢 Built |
| GET | `/foods/:foodId/reviews` | — | 🟢 Built |
| POST | `/foods/:foodId/reviews` | JWT | 🟢 Built |

---

## 4. Food Admin (CRUD)

All mounted at `/api/admin` prefix. Require JWT (Admin | SuperAdmin).

| Method | Endpoint | Status |
|--------|----------|--------|
| POST | `/admin/foods` | 🟢 Built |
| PUT | `/admin/foods/:id` | 🟢 Built |
| DELETE | `/admin/foods/:id` | 🟢 Built |
| POST | `/admin/categories` | 🟢 Built |
| PUT | `/admin/categories/:id` | 🟢 Built |
| DELETE | `/admin/categories/:id` | 🟢 Built |
| POST | `/admin/categories/:categoryId/subcategories` | 🟢 Built |
| PUT | `/admin/subcategories/:id` | 🟢 Built |
| DELETE | `/admin/subcategories/:id` | 🟢 Built |
| POST | `/admin/foods/:foodId/variants` | 🟢 Built |
| PUT | `/admin/variants/:id` | 🟢 Built |
| DELETE | `/admin/variants/:id` | 🟢 Built |
| POST | `/admin/foods/:foodId/addons` | 🟢 Built |
| PUT | `/admin/addons/:id` | 🟢 Built |
| DELETE | `/admin/addons/:id` | 🟢 Built |
| POST | `/admin/addons/:addonId/items` | 🟢 Built |
| PUT | `/admin/addon-items/:id` | 🟢 Built |
| DELETE | `/admin/addon-items/:id` | 🟢 Built |
| GET | `/admin/foods/:foodId/nutrition` | 🟢 Built |
| PATCH | `/admin/foods/:foodId/nutrition` | 🟢 Built |
| POST | `/admin/foods/:foodId/ingredients` | 🟢 Built |
| DELETE | `/admin/ingredients/:id` | 🟢 Built |
| POST | `/admin/foods/:foodId/allergens` | 🟢 Built |
| DELETE | `/admin/allergens/:id` | 🟢 Built |
| POST | `/admin/foods/:foodId/prices` | 🟢 Built |
| POST | `/admin/foods/:foodId/discounts` | 🟢 Built |
| DELETE | `/admin/discounts/:id` | 🟢 Built |
| POST | `/admin/foods/:foodId/tags` | 🟢 Built |
| DELETE | `/admin/foods/:foodId/tags/:tagId` | 🟢 Built |
| POST | `/admin/tags` | 🟢 Built |
| POST | `/admin/foods/:foodId/labels` | 🟢 Built |
| DELETE | `/admin/labels/:id` | 🟢 Built |
| PATCH | `/admin/foods/:foodId/availability` | 🟢 Built |
| POST | `/admin/foods/:foodId/schedules` | 🟢 Built |
| DELETE | `/admin/schedules/:id` | 🟢 Built |
| PATCH | `/admin/foods/:foodId/visibility` | 🟢 Built |

---

## 5. Cart & Checkout

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/cart` | JWT (Customer) | 🟢 Built |
| POST | `/cart` | JWT (Customer) | 🟢 Built |
| DELETE | `/cart` | JWT (Customer) | 🟢 Built |
| POST | `/cart/items` | JWT (Customer) | 🟢 Built |
| PATCH | `/cart/items/:id` | JWT (Customer) | 🟢 Built |
| DELETE | `/cart/items/:id` | JWT (Customer) | 🟢 Built |
| POST | `/cart/items/:itemId/addons` | JWT (Customer) | 🟢 Built |
| DELETE | `/cart/addons/:id` | JWT (Customer) | 🟢 Built |
| POST | `/cart/meals` | JWT (Customer) | 🟢 Built |
| DELETE | `/cart/meals/:id` | JWT (Customer) | 🟢 Built |
| POST | `/cart/meals/:mealId/foods` | JWT (Customer) | 🟢 Built |
| DELETE | `/cart/meals/:mealId/foods/:foodId` | JWT (Customer) | 🟢 Built |
| POST | `/cart/checkout` | JWT (Customer) | 🟢 Built |
| POST | `/cart/checkout/apply-coupon` | JWT (Customer) | 🟢 Built |
| DELETE | `/cart/checkout/remove-coupon` | JWT (Customer) | 🟢 Built |
| POST | `/cart/checkout/select-address` | JWT (Customer) | 🟢 Built |
| POST | `/cart/checkout/place-order` | JWT (Customer) | 🟢 Built |

---

## 6. Orders

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/api/orders` | JWT (Customer) | 🟢 Built |
| GET | `/api/orders/:id` | JWT (Customer/Admin/Vendor) | 🟢 Built |
| PATCH | `/api/orders/:id` | JWT (Customer/Admin) | 🟢 Built |
| DELETE | `/api/orders/:id` | JWT (SuperAdmin) | 🟢 Built |
| POST | `/api/orders/:id/cancel` | JWT (Customer/Admin) | 🟢 Built |
| PATCH | `/api/orders/:id/status` | JWT (Admin/Vendor) | 🟢 Built |
| PATCH | `/api/orders/:id/assign-vendor` | JWT (Admin) | 🟢 Built |
| PATCH | `/api/orders/:id/assign-rider` | JWT (Admin/Vendor) | 🟢 Built |
| GET | `/api/admin/orders` | JWT (Admin/SuperAdmin) | 🟢 Built |
| GET | `/api/vendors/:vendorId/orders` | JWT (Vendor) | 🟢 Built |
| POST | `/api/orders/:orderId/refund` | JWT (Admin) | 🟢 Built |
| GET | `/api/orders/:orderId/refunds` | JWT (Admin) | 🟢 Built |
| POST | `/api/orders/:orderId/feedback` | JWT (Customer) | 🟢 Built |
| GET | `/api/orders/:orderId/invoice` | JWT (Customer/Admin) | 🟢 Built |
| PATCH | `/api/order-meals/:id/status` | JWT (Admin/Vendor) | 🟢 Built |

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
