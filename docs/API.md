# FONDO — API Reference

> **Base URL:** `http://localhost:3000/api`  
> **Response Envelope:** `{ success: boolean, message: string, data: object | array | null }`  
> **Auth:** JWT Bearer in `Authorization` header  
> **Request body:** JSON. `*` = required. Omitted fields = optional.

**Status Legend**
| | Meaning |
|---|---------|
| 🟢 | Built and working |
| 🟡 | Partial (route exists, incomplete) |
| ⚪ | Planned (not started) |

**Quick reference:** [`API_REFERENCE.md`](./API_REFERENCE.md) — one-page route table.

## Index

<div style="display: flex; gap: 40px;">
<div>

| | Feature | Workflow Module |
|---|---|---|
| 🟡 | [Auth](#1-auth) | Module 1 |
| 🟡 | [Users & Profile](#2-users--profile) | Module 1 |
| ⚪ | [Food Catalog (Customer)](#3-food-catalog-customer) | Module 4 |
| ⚪ | [Food Admin (CRUD)](#4-food-admin-crud) | Module 4 |
| ⚪ | [Cart & Checkout](#5-cart--checkout) | Module 7 |
| ⚪ | [Orders](#6-orders) | Module 7 |
| ⚪ | [Customers (Admin)](#7-customers-admin) | Module 1 |
| ⚪ | [Vendors](#8-vendors) | Module 3 |
| ⚪ | [Packages & Meal Plans](#9-packages--meal-plans) | Module 6 |
| ⚪ | [Subscriptions](#10-subscriptions) | Module 12 |

</div>
<div>

| | Feature | Workflow Module |
|---|---|---|
| ⚪ | [Payments](#11-payments) | Module 8 |
| ⚪ | [Customer Wallet](#12-customer-wallet) | Module 8 |
| ⚪ | [Vendor Settlements](#13-vendor-settlements) | Module 8 |
| ⚪ | [Riders](#14-riders) | Module 9 |
| ⚪ | [Deliveries & Tracking](#15-deliveries--live-tracking) | Module 9 |
| ⚪ | [Notifications](#16-notifications) | Module 10 |
| ⚪ | [Support Tickets](#17-support-tickets) | Module 10 |
| ⚪ | [CMS](#18-cms) | Module 11 |
| ⚪ | [Reports & Analytics](#19-reports--analytics) | Module 14 |
| ⚪ | [Roles & Permissions](#20-roles--permissions) | Module 2 |
| ⚪ | [System Settings](#21-system-settings) | Module 11 |

</div>
</div>

---

## Conventions

### Pagination
`GET` list endpoints accept `?page=1&limit=20`. Response:
```json
{ "items": [], "total": 100, "page": 1, "limit": 20, "totalPages": 5 }
```

### Soft Delete
Models with `deletedAt` in the workflow doc use soft delete. Send `DELETE` request as normal; the record is marked deleted, not removed.

### Standard CRUD
`GET /resource` — list all (paginated)  
`GET /resource/:id` — get one  
`POST /resource` — create  
`PATCH /resource/:id` — partial update  
`DELETE /resource/:id` — delete

---

## 1. Auth

🟡 **Partial** — only `POST /auth/login` is built. The rest are scaffolded (routes/commented) or planned.

### 🟡 `POST /auth/register`
Create a new customer account.

**Request**
```json
{
  "fullName": "*String",
  "phone": "*String",
  "email": "String",
  "password": "*String (min 6 chars)",
  "dateOfBirth": "Date",
  "gender": "String (male|female|other)"
}
```

**Response** `201`
```json
{
  "user": { "id": "Int", "fullName": "String", "phone": "String", "email": "String", "role": "String" },
  "accessToken": "String",
  "refreshToken": "String"
}
```

### 🟢 `POST /auth/login`
Login with phone/email and password.

**Request**
```json
{
  "phone": "*String (or email)",
  "password": "*String"
}
```

**Response**
```json
{
  "accessToken": "String",
  "refreshToken": "String",
  "user": { "id": "Int", "fullName": "String", "phone": "String", "email": "String", "role": "String", "avatar": "String" }
}
```

### ⚪ `POST /auth/login/otp`
Request OTP for phone login.

**Request**
```json
{ "phone": "*String" }
```

**Response**
```json
{ "otpSent": true, "expiresIn": 300 }
```

### ⚪ `POST /auth/otp/verify`
Verify OTP and log in.

**Request**
```json
{ "phone": "*String", "otp": "*String", "purpose": "*Enum (LOGIN|REGISTER|FORGOT_PASSWORD|PHONE_VERIFY|EMAIL_VERIFY)" }
```

**Response** (purpose=LOGIN)
```json
{ "verified": true, "accessToken": "String", "refreshToken": "String", "user": {} }
```

### ⚪ `POST /auth/otp/send`
Send OTP for a specific purpose.

**Request**
```json
{ "phone": "*String (or email)", "purpose": "*Enum" }
```

**Response**
```json
{ "sent": true, "expiresIn": 300 }
```

### ⚪ `POST /auth/refresh`
Exchange refresh token for a new access token.

**Request**
```json
{ "refreshToken": "*String" }
```

**Response**
```json
{ "accessToken": "String", "refreshToken": "String" }
```

### ⚪ `POST /auth/logout`
Invalidate current session.

**Auth:** JWT  
**Request**
```json
{ "refreshToken": "*String" }
```

**Response**
```json
{ "message": "Logged out" }
```

### ⚪ `POST /auth/forgot-password`
Request password reset OTP/email.

**Request**
```json
{ "phone": "*String (or email)" }
```

**Response**
```json
{ "resetToken": "String", "expiresIn": 600 }
```

### ⚪ `POST /auth/reset-password`
Reset password using token from forgot-password.

**Request**
```json
{ "token": "*String", "newPassword": "*String (min 6 chars)" }
```

**Response**
```json
{ "message": "Password reset successful" }
```

### ⚪ `PATCH /auth/change-password`
Change password while logged in.

**Auth:** JWT  
**Request**
```json
{ "currentPassword": "*String", "newPassword": "*String (min 6 chars)" }
```

**Response**
```json
{ "message": "Password changed" }
```

---

## 2. Users & Profile

🟡 **Partial** — `GET /users/me`, `PATCH /users/me` exist. Admin routes and sub-resources are planned.

### 🟢 `GET /users/me`
Get current user profile.

**Auth:** JWT  
**Response**
```json
{
  "id": "Int",
  "fullName": "String",
  "firstName": "String",
  "lastName": "String",
  "phone": "String",
  "email": "String",
  "avatar": "String",
  "gender": "String",
  "dateOfBirth": "Date",
  "role": "String",
  "status": "String",
  "isPhoneVerified": "Boolean",
  "isEmailVerified": "Boolean",
  "profile": { "profession": "String", "company": "String", "bio": "Text", "preferredLanguage": "String", "timezone": "String" },
  "notificationSettings": { "pushNotification": "Boolean", "emailNotification": "Boolean", ... }
}
```

### 🟢 `PATCH /users/me`
Update own profile.

**Auth:** JWT  
**Request**
```json
{
  "fullName": "String",
  "firstName": "String",
  "lastName": "String",
  "phone": "String",
  "email": "String",
  "avatar": "String",
  "gender": "String",
  "dateOfBirth": "Date"
}
```

**Response** `200` — updated user object

### ⚪ `DELETE /users/me`
Delete own account.

**Auth:** JWT (Customer)  
**Response** `200`

### ⚪ `GET /users`
List users (admin).

**Auth:** JWT (SuperAdmin, Admin)  
**Query:** `?page=1&limit=20&role=CUSTOMER&search=&status=`  
**Response** — paginated list of user objects

### ⚪ `GET /users/:id`
Get single user.

**Auth:** JWT (Self, SuperAdmin, Admin)  
**Response** — full user object

### ⚪ `PATCH /users/:id`
Update any user (admin).

**Auth:** JWT (SuperAdmin, Admin)  
**Request** — same as PATCH /users/me

### ⚪ `DELETE /users/:id`
Soft-delete user.

**Auth:** JWT (SuperAdmin)

### --- Addresses ---

### ⚪ `GET /users/:userId/addresses`
List user addresses.

**Response**
```json
{
  "items": [
    { "id": "Int", "label": "String", "receiverName": "String", "receiverPhone": "String", "area": "String", "district": "String", "division": "String", "address": "String (concatenated)", "latitude": "Float", "longitude": "Float", "isDefault": "Boolean" }
  ]
}
```

### ⚪ `POST /users/:userId/addresses`
Add address.

**Request**
```json
{
  "label": "*String (Home|Office|Other)",
  "receiverName": "*String",
  "receiverPhone": "*String",
  "country": "String",
  "division": "*String",
  "district": "*String",
  "upazila": "String",
  "area": "*String",
  "road": "String",
  "house": "String",
  "floor": "String",
  "apartment": "String",
  "landmark": "String",
  "postalCode": "String",
  "latitude": "Float",
  "longitude": "Float",
  "deliveryInstruction": "Text",
  "isDefault": "Boolean"
}
```

**Response** `201` — address object

### ⚪ `PATCH /addresses/:id`
Update address.

### ⚪ `DELETE /addresses/:id`
Soft-delete address.

### ⚪ `PATCH /addresses/:id/default`
Set as default address.

### --- Devices ---

### ⚪ `GET /users/:userId/devices`
List registered devices.

### ⚪ `POST /users/:userId/devices`
Register device for push notifications.

**Request**
```json
{
  "deviceId": "*String",
  "deviceName": "String",
  "deviceType": "*String (mobile|tablet|desktop)",
  "operatingSystem": "String",
  "osVersion": "String",
  "appVersion": "String",
  "pushToken": "*String",
  "ipAddress": "String"
}
```

### ⚪ `DELETE /devices/:id`
Unregister device.

### --- Notification Settings ---

### ⚪ `GET /users/:userId/notification-settings`
Get preferences.

### ⚪ `PATCH /users/:userId/notification-settings`
Update preferences.

**Request**
```json
{
  "pushNotification": "Boolean",
  "emailNotification": "Boolean",
  "smsNotification": "Boolean",
  "orderNotification": "Boolean",
  "paymentNotification": "Boolean",
  "promotionNotification": "Boolean",
  "chatNotification": "Boolean",
  "systemNotification": "Boolean"
}
```

### --- Login History ---

### ⚪ `GET /users/:userId/login-history`
List login attempts. **Auth:** JWT (Self, SuperAdmin)

---

## 3. Food Catalog (Customer)

⚪ **Planned** — not started.

### `GET /foods`
Browse foods with filters and pagination. Public.

**Query**
```
?page=1&limit=20
&categoryId=Int
&foodType=VEG|NON_VEG|VEGAN|SEAFOOD
&spiceLevel=MILD|MEDIUM|HOT|EXTRA_HOT
&dietType=String (e.g. Keto, Diabetic)
&minPrice=Float
&maxPrice=Float
&search=String (name/slug)
&sortBy=name|price|rating|popularity
&sortOrder=asc|desc
```

**Response**
```json
{
  "items": [
    {
      "id": "Int",
      "name": "String",
      "slug": "String",
      "shortDescription": "String",
      "thumbnail": "String (URL)",
      "coverImage": "String (URL)",
      "foodType": "Enum (VEG|NON_VEG|VEGAN|SEAFOOD)",
      "spiceLevel": "String",
      "preparationTime": "Int (minutes)",
      "calories": "Float",
      "protein": "Float",
      "fat": "Float",
      "carbohydrate": "Float",
      "servingSize": "String",
      "isFeatured": "Boolean",
      "isPopular": "Boolean",
      "isRecommended": "Boolean",
      "status": "String",
      "category": { "id": "Int", "name": "String", "slug": "String" },
      "variants": [
        { "id": "Int", "name": "String", "price": "Float", "discountPrice": "Float", "servingSize": "String" }
      ],
      "addons": [
        { "id": "Int", "name": "String", "isRequired": "Boolean", "items": [ { "id": "Int", "name": "String", "price": "Float" } ] }
      ],
      "rating": { "averageRating": "Float", "totalReview": "Int" },
      "labels": [ { "label": "String", "color": "String" } ],
      "tags": [ { "name": "String" } ],
      "diets": [ { "dietType": "String" } ],
      "discount": { "discountType": "String", "discountValue": "Float" }
    }
  ],
  "pagination": { "total": "Int", "page": "Int", "limit": "Int", "totalPages": "Int" }
}
```

### `GET /foods/:id`
Get single food by ID.

**Response** — same item shape as above, plus:
```json
{
  "nutrition": { "calories": "Float", "protein": "Float", "fat": "Float", "carbohydrate": "Float", "fiber": "Float", "sugar": "Float", "sodium": "Float", "cholesterol": "Float" },
  "ingredients": [ { "ingredientName": "String", "quantity": "String", "unit": "String" } ],
  "allergens": [ { "allergen": "String", "description": "String" } ],
  "schedules": [ { "mealType": "Enum", "startTime": "String", "endTime": "String" } ],
  "gallery": [ { "image": "String (URL)", "sortOrder": "Int" } ],
  "reviews": [ { "id": "Int", "customerName": "String", "rating": "Int", "review": "Text", "createdAt": "DateTime" } ],
  "isFavorited": "Boolean",
  "preparation": { "preparationTime": "Int", "cookTime": "Int", "packingTime": "Int" },
  "availability": [ { "dayName": "String", "startTime": "String", "endTime": "String" } ]
}
```

### `GET /foods/slug/:slug`
Get food by slug — same response as `/:id`.

### `GET /categories`
List all food categories.

**Response**
```json
{ "items": [ { "id": "Int", "name": "String", "slug": "String", "description": "String", "icon": "String", "image": "String (URL)", "sortOrder": "Int", "subCategories": [ { "id": "Int", "name": "String", "slug": "String" } ] } ] }
```

### `GET /categories/:id`
Get category with subcategories and food count.

### `GET /tags`
List all food tags (e.g. Healthy, High Protein, Keto, Popular).

**Response**
```json
{ "items": [ { "id": "Int", "name": "String", "slug": "String" } ] }
```

### `POST /foods/:foodId/favorite`
Toggle favorite for current user.

**Auth:** JWT (Customer)  
**Response**
```json
{ "isFavorited": "Boolean" }
```

### `GET /foods/:foodId/reviews`
List reviews for a food.

**Query:** `?page=1&limit=10`  
**Response**
```json
{ "items": [ { "id": "Int", "customerName": "String", "avatar": "String", "rating": "Int", "review": "Text", "createdAt": "DateTime" } ], "pagination": {} }
```

### `POST /foods/:foodId/reviews`
Submit a review.

**Auth:** JWT (Customer)  
**Request**
```json
{ "rating": "*Int (1-5)", "review": "String", "orderId": "Int" }
```

**Response** `201`

---

## 4. Food Admin (CRUD)

⚪ **Planned** — not started.

All endpoints in this section require **Auth:** JWT (Admin) unless noted.

### `POST /foods`
Create a new food item.

**Request**
```json
{
  "categoryId": "*Int",
  "subCategoryId": "Int",
  "foodCode": "*String (unique)",
  "name": "*String",
  "slug": "*String (unique)",
  "shortDescription": "String",
  "description": "Text",
  "thumbnail": "String (URL)",
  "coverImage": "String (URL)",
  "preparationTime": "Int (minutes)",
  "calories": "Float",
  "protein": "Float",
  "fat": "Float",
  "carbohydrate": "Float",
  "servingSize": "String",
  "foodType": "*Enum (VEG|NON_VEG|VEGAN|SEAFOOD)",
  "spiceLevel": "String (mild|medium|hot|extra_hot)",
  "isFeatured": "Boolean",
  "isPopular": "Boolean",
  "isRecommended": "Boolean",
  "status": "String"
}
```

**Response** `201` — food object

### `PUT /foods/:id`
Update food — same body as POST (PUT = full replace).

### `DELETE /foods/:id`
Soft-delete food.

### --- Category CRUD ---

### `POST /categories`
```json
{ "name": "*String", "slug": "*String (unique)", "description": "String", "icon": "String", "image": "String (URL)", "sortOrder": "Int", "status": "String" }
```

### `PUT /categories/:id`
Update category.

### `DELETE /categories/:id`
Soft-delete category.

### `POST /categories/:categoryId/subcategories`
```json
{ "name": "*String", "slug": "*String (unique)", "description": "String", "icon": "String", "image": "String (URL)", "sortOrder": "Int", "status": "String" }
```

### `PUT /subcategories/:id`
Update subcategory.

### `DELETE /subcategories/:id`
Soft-delete subcategory.

### --- Variant CRUD ---

### `POST /foods/:foodId/variants`
```json
{ "name": "*String", "description": "String", "price": "*Float", "discountPrice": "Float", "weight": "String", "servingSize": "String", "status": "String" }
```

### `PUT /variants/:id`
Update variant.

### `DELETE /variants/:id`
Delete variant.

### --- Addon CRUD ---

### `POST /foods/:foodId/addons`
```json
{ "name": "*String", "isRequired": "Boolean", "maxSelection": "Int", "status": "String" }
```

### `PUT /addons/:id`
Update addon group.

### `DELETE /addons/:id`
Delete addon group.

### `POST /addons/:addonId/items`
```json
{ "name": "*String", "price": "*Float", "image": "String (URL)", "status": "String" }
```

### `PUT /addon-items/:id`
Update addon item.

### `DELETE /addon-items/:id`
Delete addon item.

### --- Nutrition, Ingredients, Allergens ---

### `GET /foods/:foodId/nutrition`
Get nutrition info.

### `PATCH /foods/:foodId/nutrition`
```json
{ "calories": "Float", "protein": "Float", "fat": "Float", "carbohydrate": "Float", "fiber": "Float", "sugar": "Float", "sodium": "Float", "cholesterol": "Float", "servingSize": "String" }
```

### `POST /foods/:foodId/ingredients`
```json
{ "ingredientName": "*String", "quantity": "String", "unit": "String", "isOptional": "Boolean" }
```

### `DELETE /ingredients/:id`

### `POST /foods/:foodId/allergens`
```json
{ "allergen": "*String", "description": "String" }
```

### `DELETE /allergens/:id`

### --- Pricing & Discounts ---

### `POST /foods/:foodId/prices`
```json
{ "basePrice": "*Float", "salePrice": "Float", "currency": "String", "effectiveFrom": "Date", "effectiveTo": "Date" }
```

### `POST /foods/:foodId/discounts`
```json
{ "discountType": "*Enum (PERCENTAGE|FLAT)", "discountValue": "*Float", "startDate": "Date", "endDate": "Date" }
```

### `DELETE /discounts/:id`

### --- Tags & Labels ---

### `POST /foods/:foodId/tags`
```json
{ "tagIds": "*[Int]" }
```

### `DELETE /foods/:foodId/tags/:tagId`

### `POST /tags`
```json
{ "name": "*String", "slug": "*String" }
```

### `POST /foods/:foodId/labels`
```json
{ "label": "*String", "color": "String" }
```

### `DELETE /labels/:id`

### --- Schedule & Availability ---

### `PATCH /foods/:foodId/availability`
```json
{ "isAvailable": "Boolean", "availableFrom": "Time", "availableTo": "Time", "availableDays": "[String]" }
```

### `POST /foods/:foodId/schedule`
```json
{ "mealType": "*Enum (BREAKFAST|LUNCH|DINNER|SNACKS)", "startTime": "String (HH:mm)", "endTime": "String (HH:mm)", "status": "String" }
```

### `DELETE /schedules/:id`

### `PATCH /foods/:foodId/visibility`
```json
{ "isFeatured": "Boolean", "isRecommended": "Boolean", "displayOrder": "Int" }
```

---

## 5. Cart & Checkout

⚪ **Planned** — not started.

### `GET /cart`
Get current user's active cart.

**Auth:** JWT (Customer)  
**Response**
```json
{
  "id": "Int",
  "customerId": "Int",
  "packageId": "Int",
  "customMealPlanId": "Int",
  "couponId": "Int",
  "subtotal": "Float",
  "discount": "Float",
  "deliveryCharge": "Float",
  "vat": "Float",
  "totalAmount": "Float",
  "status": "String",
  "items": [
    {
      "id": "Int",
      "foodId": "Int",
      "foodName": "String",
      "foodImage": "String",
      "quantity": "Int",
      "unitPrice": "Float",
      "totalPrice": "Float",
      "addons": [ { "name": "String", "price": "Float", "quantity": "Int" } ]
    }
  ],
  "meals": [
    {
      "dayNumber": "Int",
      "mealType": "String",
      "mealTime": "String",
      "foods": [ { "foodId": "Int", "foodName": "String", "quantity": "Int", "isReplacement": "Boolean" } ]
    }
  ]
}
```

### `POST /cart`
Initialize cart with a package or custom meal plan.

**Auth:** JWT (Customer)  
**Request**
```json
{ "packageId": "Int (or customMealPlanId)", "customMealPlanId": "Int" }
```

**Response** `201` — cart object

### `DELETE /cart`
Clear cart.

### `POST /cart/items`
Add food item to cart.

**Request**
```json
{ "foodId": "*Int", "packageMealId": "Int", "quantity": "*Int (default 1)", "unitPrice": "*Float" }
```

### `PATCH /cart/items/:id`
Update item quantity.

**Request**
```json
{ "quantity": "*Int" }
```

### `DELETE /cart/items/:id`
Remove item from cart.

### `POST /cart/items/:itemId/addons`
Add addon to cart item.

**Request**
```json
{ "addonItemId": "*Int", "quantity": "*Int", "price": "*Float" }
```

### `DELETE /cart/addons/:id`
Remove addon.

### `POST /cart/meals`
Add meal to cart (package flow).

**Request**
```json
{ "dayNumber": "*Int", "mealType": "*String", "mealTime": "String" }
```

### `DELETE /cart/meals/:id`
Remove meal from cart.

### `POST /cart/meals/:mealId/foods`
Select food for a meal.

**Request**
```json
{ "foodId": "*Int", "quantity": "Int", "isReplacement": "Boolean" }
```

### `DELETE /cart/meals/:mealId/foods/:foodId`
Remove food from meal.

### --- Checkout ---

### `POST /cart/checkout`
Get checkout summary.

**Auth:** JWT (Customer)  
**Response**
```json
{
  "subtotal": "Float",
  "discount": "Float",
  "deliveryCharge": "Float",
  "vat": "Float",
  "grandTotal": "Float",
  "itemCount": "Int",
  "mealCount": "Int",
  "appliedCoupon": { "code": "String", "discountAmount": "Float" },
  "deliveryAddress": { "id": "Int", "label": "String", "address": "String" },
  "availablePaymentMethods": [ { "id": "Int", "name": "String", "logo": "String", "isDefault": "Boolean" } ]
}
```

### `POST /cart/checkout/apply-coupon`
**Request**
```json
{ "couponCode": "*String" }
```

**Response**
```json
{ "valid": true, "discountAmount": "Float", "newTotal": "Float" }
```

### `DELETE /cart/checkout/remove-coupon`

### `POST /cart/checkout/select-address`
**Request**
```json
{ "addressId": "*Int" }
```

### `POST /orders`
Place order from cart.

**Auth:** JWT (Customer)  
**Request**
```json
{
  "cartId": "*Int",
  "addressId": "*Int",
  "paymentMethodId": "*Int",
  "notes": "Text",
  "deliverySchedule": { "deliveryDate": "*Date", "deliverySlot": "String" }
}
```

**Response** `201`
```json
{ "orderId": "Int", "orderNumber": "String", "totalAmount": "Float", "paymentUrl": "String" }
```

---

## 6. Orders

⚪ **Planned** — not started.

### `GET /orders`
List current customer's orders.

**Auth:** JWT (Customer)  
**Query:** `?page=1&limit=10&status=CONFIRMED|PREPARING|DELIVERED|CANCELLED`  
**Response**
```json
{
  "items": [
    {
      "id": "Int",
      "orderNumber": "String",
      "status": "String",
      "totalAmount": "Float",
      "paymentStatus": "String",
      "itemsCount": "Int",
      "placedAt": "DateTime",
      "nextDeliveryDate": "Date",
      "deliveryStatus": "String"
    }
  ],
  "pagination": {}
}
```

### `GET /orders/:id`
Get full order details.

**Auth:** JWT (Customer, Admin, Vendor)  
**Response**
```json
{
  "id": "Int",
  "orderNumber": "String",
  "customer": { "id": "Int", "fullName": "String", "phone": "String" },
  "address": { "label": "String", "receiverName": "String", "receiverPhone": "String", "address": "String" },
  "subtotal": "Float",
  "discount": "Float",
  "deliveryCharge": "Float",
  "vat": "Float",
  "totalAmount": "Float",
  "paymentStatus": "String",
  "orderStatus": "String",
  "deliveryStatus": "String",
  "notes": "Text",
  "placedAt": "DateTime",
  "confirmedAt": "DateTime",
  "completedAt": "DateTime",
  "items": [
    { "id": "Int", "foodName": "String", "quantity": "Int", "unitPrice": "Float", "totalPrice": "Float", "status": "String" }
  ],
  "meals": [
    { "dayNumber": "Int", "deliveryDate": "Date", "mealType": "String", "mealTime": "String", "status": "String", "foods": [ { "foodName": "String", "quantity": "Int", "status": "String" } ] }
  ],
  "schedule": { "deliveryDate": "Date", "deliverySlot": "String", "estimatedDeliveryTime": "String", "status": "String" },
  "statusHistory": [ { "previousStatus": "String", "currentStatus": "String", "changedBy": "String", "remarks": "String", "createdAt": "DateTime" } ],
  "timeline": [ { "title": "String", "description": "String", "status": "String", "createdAt": "DateTime" } ],
  "invoice": { "invoiceNumber": "String", "invoiceDate": "Date", "grandTotal": "Float", "pdfUrl": "String" },
  "cancellation": { "reason": "String", "cancelledAt": "DateTime" },
  "feedback": { "rating": "Int", "review": "Text" },
  "rider": { "id": "Int", "fullName": "String", "phone": "String" }
}
```

### `PATCH /orders/:id`
Update order (notes or schedule).

**Auth:** JWT (Customer, Admin)  
**Request**
```json
{ "notes": "String", "deliverySchedule": { "deliveryDate": "Date", "deliverySlot": "String" } }
```

### `DELETE /orders/:id`
Soft-delete order. **Auth:** JWT (SuperAdmin)

### `POST /orders/:id/cancel`
Cancel order.

**Auth:** JWT (Customer, Admin)  
**Request**
```json
{ "reason": "*String", "cancelledBy": "*String (customer|admin)" }
```

**Response**
```json
{ "id": "Int", "status": "CANCELLED", "refundStatus": "PENDING", "refundAmount": "Float" }
```

### `PATCH /orders/:id/status`
Update order status.

**Auth:** JWT (Admin, Vendor)  
**Request**
```json
{ "status": "*String (CONFIRMED|PREPARING|READY_FOR_PICKUP|DELIVERED|CANCELLED)", "remarks": "String" }
```

### `PATCH /orders/:id/assign-vendor`
Assign vendor to order (hidden from customer).

**Auth:** JWT (Admin)  
**Request**
```json
{ "vendorId": "*Int" }
```

### `PATCH /orders/:id/assign-rider`
Assign rider for delivery.

**Auth:** JWT (Admin, Vendor)  
**Request**
```json
{ "riderId": "*Int" }
```

### `GET /admin/orders`
List all orders (admin).

**Auth:** JWT (SuperAdmin, Admin)  
**Query:** `?page=1&limit=20&status=&paymentStatus=&vendorId=&customerId=&from=&to=`

### `GET /vendors/:vendorId/orders`
List vendor orders.

**Auth:** JWT (Vendor)

### `POST /orders/:orderId/refund`
Process refund.

**Auth:** JWT (Admin)  
**Request**
```json
{ "amount": "*Float", "refundMethod": "String", "reason": "*String" }
```

### `GET /orders/:orderId/refunds`
List refunds for an order.

### `POST /orders/:orderId/feedback`
Submit feedback.

**Auth:** JWT (Customer)  
**Request**
```json
{ "rating": "*Int (1-5)", "review": "String" }
```

### `GET /orders/:orderId/invoice`
Get invoice.

### `PATCH /order-meals/:id/status`
Update individual meal status.

**Auth:** JWT (Admin, Vendor)  
**Request**
```json
{ "status": "*String" }
```

---

## 7. Customers (Admin)

⚪ **Planned** — not started.

### `GET /api/admin/customers`
List all customers.

**Auth:** JWT (Admin)  
**Query:** `?page=1&limit=20&search=&status=`  
**Response**
```json
{
  "items": [
    {
      "id": "Int",
      "fullName": "String",
      "phone": "String",
      "email": "String",
      "totalOrders": "Int",
      "totalSpent": "Float",
      "subscriptionCount": "Int",
      "walletBalance": "Float",
      "status": "String",
      "lastOrderDate": "Date",
      "joinedAt": "DateTime"
    }
  ],
  "pagination": {}
}
```

### `GET /api/admin/customers/:id`
Get customer details.

**Response** — customer object + recent orders, subscription info, wallet balance

### `GET /api/admin/customers/:id/orders`
List customer orders.

### `GET /api/admin/customers/:id/subscriptions`
List customer subscriptions.

### `GET /api/admin/customers/:id/wallet`
Get customer wallet details.

**Response**
```json
{ "balance": "Float", "holdBalance": "Float", "transactions": [ ... ] }
```

### `GET /api/admin/customers/:id/payments`
List customer payment history.

---

## 8. Vendors

⚪ **Planned** — not started.

### Public Endpoints

### `GET /vendors`
List vendors. **Auth:** None  
**Query:** `?page=1&limit=20&status=active&search=`  
**Response** — paginated list of basic vendor info

### `GET /vendors/:id`
Get vendor info. **Auth:** None — only public info returned

### --- Vendor Self-Service (Vendor Dashboard) ---

All endpoints below require **Auth:** JWT (Vendor)

### `GET /vendors/me`
Get current vendor's full profile.

**Response**
```json
{
  "id": "Int",
  "vendorCode": "String",
  "businessName": "String",
  "ownerName": "String",
  "phone": "String",
  "email": "String",
  "logo": "String",
  "coverImage": "String",
  "description": "Text",
  "status": "String",
  "verificationStatus": "String",
  "isOnline": "Boolean",
  "commissionType": "String",
  "commissionValue": "Float",
  "openingTime": "String",
  "closingTime": "String",
  "branches": [ { "id": "Int", "branchName": "String", "area": "String", "isMainBranch": "Boolean" } ],
  "address": { "area": "String", "district": "String", "division": "String", ... }
}
```

### `PATCH /vendors/me`
Update own vendor info.

### `PATCH /vendors/me/online`
Toggle online/offline status.

### --- Branches ---

### `GET /vendors/me/branches`
### `POST /vendors/me/branches`

**Request**
```json
{ "branchName": "*String", "branchCode": "*String", "phone": "String", "email": "String", "division": "String", "district": "String", "area": "String", "road": "String", "house": "String", "latitude": "Float", "longitude": "Float", "isMainBranch": "Boolean" }
```

### `PATCH /branches/:id`
### `DELETE /branches/:id`

### --- Kitchens ---

### `GET /vendors/me/kitchens`
### `POST /vendors/me/kitchens`

**Request**
```json
{ "branchId": "*Int", "kitchenName": "*String", "kitchenCode": "*String", "capacity": "Int", "preparationTime": "Int" }
```

### `PATCH /kitchens/:id`
### `DELETE /kitchens/:id`

### --- Staff ---

### `GET /vendors/me/staff`
### `POST /vendors/me/staff`

**Request**
```json
{ "userId": "*Int", "branchId": "Int", "designation": "*String", "phone": "*String", "email": "String", "salary": "Float" }
```

### `PATCH /staff/:id`
### `DELETE /staff/:id`
### `POST /staff/:id/roles`

**Request**
```json
{ "role": "*String (KitchenManager|Chef|Cook|Packing)", "permissions": "[String]" }
```

### --- Documents ---

### `GET /vendors/me/documents`
### `POST /vendors/me/documents`

**Request**
```json
{ "documentType": "*String (Trade License|NID|Food License|etc.)", "documentNumber": "*String", "documentFile": "*String (URL)", "issueDate": "Date", "expiryDate": "Date" }
```

### --- Bank Accounts ---

### `GET /vendors/me/bank-accounts`
### `POST /vendors/me/bank-accounts`

**Request**
```json
{ "bankName": "*String", "branchName": "String", "accountName": "*String", "accountNumber": "*String", "routingNumber": "String", "mobileBankingType": "String (bKash|Nagad|Rocket)", "mobileBankingNumber": "String", "isPrimary": "Boolean" }
```

### `PATCH /bank-accounts/:id`
### `DELETE /bank-accounts/:id`

### --- Operating Hours ---

### `GET /vendors/me/operating-hours`
### `POST /vendors/me/operating-hours`

**Request**
```json
{ "day": "*String (Monday|Tuesday|...|Sunday)", "openingTime": "*String (HH:mm)", "closingTime": "*String (HH:mm)", "isClosed": "Boolean" }
```

### `PATCH /operating-hours/:id`

### --- Service Areas ---

### `GET /vendors/me/service-areas`
### `POST /vendors/me/service-areas`

**Request**
```json
{ "division": "*String", "district": "*String", "area": "*String", "deliveryCharge": "Float", "minimumOrderAmount": "Float", "estimatedDeliveryTime": "Int" }
```

### `DELETE /service-areas/:id`

### --- Settings ---

### `GET /vendors/me/settings`
### `PATCH /vendors/me/settings`

**Request**
```json
{ "autoAcceptOrder": "Boolean", "autoAssignRider": "Boolean", "allowCustomMeal": "Boolean", "notificationEnabled": "Boolean" }
```

### --- Vendor Food Mapping ---

### `GET /vendors/me/foods`
List foods mapped to this vendor.

### `POST /vendors/me/foods`
Map a food to this vendor.

**Request**
```json
{ "foodId": "*Int", "vendorFoodCode": "String", "vendorSku": "String", "kitchenId": "Int", "priority": "Int", "isPrimary": "Boolean" }
```

### `PATCH /vendor-foods/:id`
Update vendor food config.

### `DELETE /vendor-foods/:id`
Unlink food from vendor.

### `GET /vendor-foods/:id/price`
### `POST /vendor-foods/:id/price`

**Request**
```json
{ "costPrice": "*Float", "sellingPrice": "*Float", "discountPrice": "Float", "effectiveFrom": "Date", "effectiveTo": "Date" }
```

### `GET /vendor-foods/:id/stock`
### `PATCH /vendor-foods/:id/stock`

**Request**
```json
{ "availableQuantity": "Int", "reservedQuantity": "Int", "minimumStock": "Int", "stockStatus": "String (IN_STOCK|LOW_STOCK|OUT_OF_STOCK)" }
```

### `GET /vendor-foods/:id/recipes`
### `POST /vendor-foods/:id/recipes`
```json
{ "recipeName": "*String", "description": "Text", "yieldQuantity": "Int" }
```

### `GET /vendor-foods/:id/cost`
### `PATCH /vendor-foods/:id/cost`
```json
{ "ingredientCost": "Float", "packagingCost": "Float", "labourCost": "Float", "overheadCost": "Float" }
```

### --- Vendor Admin Endpoints ---

**Auth:** JWT (Admin, SuperAdmin)

### `POST /vendors`
Register new vendor.

**Request**
```json
{ "userId": "*Int", "businessName": "*String", "ownerName": "*String", "phone": "*String", "email": "String", "tradeLicenseNumber": "*String", "tinNumber": "String", "binNumber": "String", "description": "Text", "commissionType": "String", "commissionValue": "Float" }
```

### `PATCH /vendors/:id`
Update vendor.

### `DELETE /vendors/:id`
Soft-delete vendor.

### `PATCH /vendors/:id/status`
Verify or reject vendor.

**Request**
```json
{ "verificationStatus": "*String (verified|rejected)", "rejectionReason": "String" }
```

### `GET /vendors/:vendorId/documents`
List vendor documents.

### `PATCH /documents/:id/verify`

**Request**
```json
{ "verificationStatus": "*String (verified|rejected)" }
```

### `POST /vendors/:vendorId/commissions`
Set commission rule.

**Request**
```json
{ "commissionType": "*String (percentage|flat)", "commissionPercentage": "Float", "flatAmount": "Float", "effectiveFrom": "*Date", "effectiveTo": "Date" }
```

### `GET /vendors/:vendorId/earnings`
### `GET /vendors/:vendorId/activity`

### --- Vendor-Food Assignment (Admin) ---

### `GET /foods/:foodId/vendor-assignments`
List which vendors serve a given food.

### `POST /foods/:foodId/vendor-assignments`

**Request**
```json
{ "vendorId": "*Int", "priority": "Int", "allocationPercentage": "Float", "isDefault": "Boolean", "effectiveFrom": "Date", "effectiveTo": "Date" }
```

### `PATCH /vendor-assignments/:id`
### `DELETE /vendor-assignments/:id`

---

## 9. Packages & Meal Plans

⚪ **Planned** — not started.

### Public Endpoints

### `GET /packages`
List available packages.

**Query:** `?page=1&limit=20&categoryId=&packageType=&status=active`  
**Response**
```json
{
  "items": [
    {
      "id": "Int",
      "packageCode": "String",
      "name": "String",
      "slug": "String",
      "description": "Text",
      "thumbnail": "String",
      "coverImage": "String",
      "packageType": "String",
      "durationDays": "Int",
      "totalMeals": "Int",
      "price": "Float",
      "discountPrice": "Float",
      "currency": "String",
      "isCustomizable": "Boolean",
      "category": { "id": "Int", "name": "String" },
      "tags": [ "String" ],
      "benefits": [ { "title": "String", "description": "String", "icon": "String" } ],
      "nutrition": { "dailyCalories": "Float", "dailyProtein": "Float", "dailyCarb": "Float", "dailyFat": "Float" },
      "rating": { "averageRating": "Float", "totalReview": "Int" }
    }
  ],
  "pagination": {}
}
```

### `GET /packages/:id`
Get package with full detail — days, meals, foods, schedule, rules.

**Response**
```json
{
  "id": "Int",
  "...": "...",
  "rules": { "minimumOrderDays": "Int", "maximumOrderDays": "Int", "minimumMealsPerDay": "Int", "allowPause": "Boolean", "allowSkipMeal": "Boolean", "allowCancellation": "Boolean", "advancePaymentRequired": "Boolean" },
  "schedule": { "deliveryDays": "[String]", "deliveryTimeStart": "String", "deliveryTimeEnd": "String", "mealCutoffTime": "String" },
  "days": [
    {
      "dayNumber": "Int",
      "title": "String",
      "meals": [
        { "mealType": "String", "mealTime": "String", "calories": "Float", "foods": [ { "foodId": "Int", "foodName": "String", "thumbnail": "String", "quantity": "Int", "isOptional": "Boolean" } ] }
      ]
    }
  ]
}
```

### --- Admin Package CRUD ---

**Auth:** JWT (Admin) for all below

### `POST /packages`
**Request**
```json
{ "packageCode": "*String", "name": "*String", "slug": "*String", "description": "Text", "packageType": "*String", "durationDays": "*Int", "totalMeals": "*Int", "price": "*Float", "discountPrice": "Float", "currency": "String", "isCustomizable": "Boolean", "status": "String" }
```

### `PATCH /packages/:id`
### `DELETE /packages/:id`

### `POST /packages/:packageId/days`
**Request**
```json
{ "dayNumber": "*Int", "title": "String", "description": "String" }
```

### `POST /package-days/:dayId/meals`
**Request**
```json
{ "mealType": "*Enum (Breakfast|Lunch|Dinner|Snacks)", "mealTime": "*String (HH:mm)", "calories": "Float" }
```

### `POST /package-meals/:mealId/foods`
**Request**
```json
{ "foodId": "*Int", "quantity": "Int", "isOptional": "Boolean", "sortOrder": "Int" }
```

### `DELETE /package-meal-foods/:id`

### `POST /packages/:packageId/prices`
```json
{ "basePrice": "*Float", "discountPrice": "Float", "vat": "Float", "deliveryCharge": "Float", "effectiveFrom": "Date", "effectiveTo": "Date" }
```

### `PATCH /packages/:packageId/rules`
```json
{ "minimumOrderDays": "Int", "maximumOrderDays": "Int", "advancePaymentRequired": "Boolean", "allowPause": "Boolean", "allowSkipMeal": "Boolean", "allowCancellation": "Boolean" }
```

### `POST /packages/:packageId/benefits`
```json
{ "title": "*String", "description": "String", "icon": "String", "sortOrder": "Int" }
```

### `PATCH /packages/:packageId/nutrition`
```json
{ "dailyCalories": "Float", "dailyProtein": "Float", "dailyCarbohydrate": "Float", "dailyFat": "Float", "dailyFiber": "Float" }
```

### `PATCH /packages/:packageId/schedule`
```json
{ "deliveryDays": "[String]", "deliveryTimeStart": "String", "deliveryTimeEnd": "String", "mealCutoffTime": "String" }
```

### `PATCH /packages/:packageId/availability`
```json
{ "availableFrom": "Date", "availableTo": "Date", "availableDays": "[String]", "status": "String" }
```

### --- Package Reviews ---

### `GET /packages/:packageId/reviews`
### `POST /packages/:packageId/reviews`
**Auth:** JWT (Customer)
```json
{ "rating": "*Int (1-5)", "review": "String", "orderId": "Int" }
```

### --- Custom Meal Plans ---

**Auth:** JWT (Customer)

### `GET /customers/me/meal-plans`
List custom meal plans.

### `POST /customers/me/meal-plans`
**Request**
```json
{ "packageId": "*Int", "name": "*String", "totalDays": "*Int" }
```

### `GET /meal-plans/:id`
Get plan with days and meals.

### `DELETE /meal-plans/:id`

### `POST /meal-plans/:planId/meals`
```json
{ "dayNumber": "*Int", "mealType": "*Enum", "mealTime": "String" }
```

### `POST /meal-plans/:planId/meal-foods`
```json
{ "customMealId": "*Int", "foodId": "*Int", "quantity": "Int" }
```

### --- Preferences & Restrictions ---

**Auth:** JWT (Customer)

### `GET /customers/me/preferences`
### `POST /customers/me/preferences`
```json
{ "mealType": "String", "preferredCuisine": "String", "spiceLevel": "String", "preferredCalories": "Float", "preferredProtein": "Float" }
```

### `DELETE /preferences/:id`

### `GET /customers/me/dietary-restrictions`
### `POST /customers/me/dietary-restrictions`
```json
{ "restrictionType": "*String (No Beef|No Pork|Vegetarian|Vegan|etc.)", "description": "String" }
```

### `DELETE /dietary-restrictions/:id`

---

## 10. Subscriptions

⚪ **Planned** — not started.

### `POST /subscriptions`
Subscribe to a package.

**Auth:** JWT (Customer)  
**Request**
```json
{ "packageId": "*Int (or customMealPlanId)", "customMealPlanId": "Int", "startDate": "*Date", "endDate": "*Date", "duration": "*Int", "autoRenew": "Boolean" }
```

**Response** `201`
```json
{ "id": "Int", "subscriptionNumber": "String", "status": "ACTIVE", "startDate": "Date", "endDate": "Date" }
```

### `GET /subscriptions`
List customer's subscriptions.

**Auth:** JWT (Customer)  
**Query:** `?page=1&limit=10&status=active|paused|expired|cancelled`  
**Response**
```json
{
  "items": [
    {
      "id": "Int",
      "subscriptionNumber": "String",
      "package": { "name": "String", "thumbnail": "String" },
      "status": "String",
      "startDate": "Date",
      "endDate": "Date",
      "autoRenew": "Boolean",
      "totalAmount": "Float",
      "paidAmount": "Float",
      "nextDeliveryDate": "Date",
      "daysCompleted": "Int",
      "daysRemaining": "Int"
    }
  ],
  "pagination": {}
}
```

### `GET /subscriptions/:id`
Get full subscription detail.

**Response**
```json
{
  "id": "Int",
  "subscriptionNumber": "String",
  "customer": { "id": "Int", "fullName": "String", "phone": "String" },
  "package": { "id": "Int", "name": "String", "slug": "String" },
  "status": "String",
  "startDate": "Date",
  "endDate": "Date",
  "duration": "Int",
  "autoRenew": "Boolean",
  "totalAmount": "Float",
  "paidAmount": "Float",
  "remainingAmount": "Float",
  "cycles": [
    { "cycleNumber": "Int", "startDate": "Date", "endDate": "Date", "status": "String" }
  ],
  "days": [
    {
      "dayNumber": "Int",
      "deliveryDate": "Date",
      "status": "String",
      "meals": [
        { "mealType": "String", "mealTime": "String", "food": { "name": "String", "thumbnail": "String" }, "status": "String", "deliveryStatus": "String", "feedback": { "rating": "Int" } }
      ]
    }
  ]
}
```

### `DELETE /subscriptions/:id`
Cancel subscription.

### --- Subscription Lifecycle ---

**Auth:** JWT (Customer)

### `POST /subscriptions/:id/pause`
**Request**
```json
{ "pauseStartDate": "*Date", "pauseEndDate": "*Date", "reason": "String" }
```

### `POST /subscriptions/:id/resume`
**Request**
```json
{ "resumeDate": "*Date" }
```

### `POST /subscriptions/:id/freeze`
**Request**
```json
{ "freezeStartDate": "*Date", "freezeEndDate": "*Date", "reason": "String" }
```

### `POST /subscriptions/:id/skip-meal`
**Request**
```json
{ "subscriptionMealId": "*Int", "skipDate": "*Date", "reason": "String", "replacementMealId": "Int" }
```

### `POST /subscriptions/:id/renew`
**Request**
```json
{ "paymentMethodId": "*Int" }
```

### `POST /subscriptions/:id/upgrade`
**Request**
```json
{ "newPackageId": "*Int", "paymentMethodId": "Int (for price difference)" }
```

### `POST /subscriptions/:id/downgrade`
**Request**
```json
{ "newPackageId": "*Int" }
```

### --- Subscription Admin ---

**Auth:** JWT (Admin)

### `GET /admin/subscriptions`
List all subscriptions — paginated, filterable by status, customer, package.

### `PATCH /subscription-days/:id/status`
Override a day's status.

### `PATCH /subscription-meals/:id/status`

### --- Meal Feedback & Issues ---

**Auth:** JWT (Customer)

### `POST /subscription-meals/:mealId/feedback`
```json
{ "rating": "*Int (1-5)", "review": "String", "image": "String (URL)" }
```

### `POST /subscription-meals/:mealId/issue`
```json
{ "issueType": "*String (quality|missing|late|wrong_item)", "description": "String", "attachment": "String (URL)" }
```

### `POST /subscription-meals/:mealId/replace`
```json
{ "newFoodId": "*Int", "reason": "String" }
```

### --- Admin Issue Management ---

**Auth:** JWT (Admin)

### `GET /admin/meal-issues`
List all reported issues.

### `PATCH /meal-issues/:id/resolve`
```json
{ "resolution": "*String", "resolvedBy": "*Int" }
```

### --- Invoices & History ---

### `GET /subscriptions/:id/history`
Action log.

### `GET /subscriptions/:id/status-history`
Status transitions.

### `GET /subscriptions/:id/invoices`
List subscription invoices.

**Response**
```json
{ "items": [ { "invoiceNumber": "String", "invoiceDate": "Date", "total": "Float", "pdfUrl": "String" } ] }
```

---

## 11. Payments

⚪ **Planned** — not started.

### `GET /payment-methods`
List available methods. **Auth:** None

**Response**
```json
{ "items": [ { "id": "Int", "name": "String (bKash|Visa|Cash)", "code": "String", "logo": "String", "type": "String", "isDefault": "Boolean" } ] }
```

### `POST /payments/initiate`
Start a payment.

**Auth:** JWT (Customer)  
**Request**
```json
{ "orderId": "*Int", "paymentMethodId": "*Int", "gatewayId": "*Int", "amount": "*Float", "currency": "String" }
```

**Response** `201`
```json
{ "paymentId": "Int", "gatewayUrl": "String", "transactionId": "String" }
```

### `POST /payments/confirm`
Gateway callback — update payment status.

**Auth:** None (called by payment gateway)
**Request**
```json
{ "transactionId": "*String", "gatewayTransactionId": "*String", "status": "*String (success|failed)", "gatewayResponse": "JSON" }
```

### `POST /payments/:id/retry`
Retry failed payment.

**Auth:** JWT (Customer)

### `POST /payments/:id/refund`
Process refund.

**Auth:** JWT (Admin)  
**Request**
```json
{ "amount": "*Float", "reason": "*String", "processedBy": "*Int" }
```

### `POST /payments/:id/adjust`
Adjust payment amount.

**Auth:** JWT (Admin)  
**Request**
```json
{ "adjustmentType": "*String (correction|chargeback|bonus)", "amount": "*Float", "reason": "*String" }
```

### `GET /payments`
List payments. **Auth:** JWT (Admin, Customer)  
**Query:** `?page=1&limit=20&status=&customerId=&from=&to=`

### `GET /payments/:id`
Get payment details.

**Response**
```json
{
  "id": "Int",
  "paymentNumber": "String",
  "orderId": "Int",
  "orderNumber": "String",
  "customerName": "String",
  "paymentMethod": "String",
  "amount": "Float",
  "currency": "String",
  "status": "String",
  "paymentDate": "DateTime",
  "transactions": [ { "gatewayTransactionId": "String", "status": "String", "amount": "Float", "processedAt": "DateTime" } ],
  "refunds": [ { "refundAmount": "Float", "refundMethod": "String", "status": "String", "processedAt": "DateTime" } ],
  "adjustments": [ { "adjustmentType": "String", "amount": "Float", "reason": "String" } ]
}
```

---

## 12. Customer Wallet

⚪ **Planned** — not started.

### `GET /wallet`
Get current customer's wallet.

**Auth:** JWT (Customer)  
**Response**
```json
{ "id": "Int", "walletNumber": "String", "balance": "Float", "holdBalance": "Float", "currency": "String", "status": "String" }
```

### `GET /wallet/transactions`
List wallet transactions.

**Query:** `?page=1&limit=20&type=credit|debit`  
**Response**
```json
{
  "items": [
    { "id": "Int", "transactionType": "Enum (CREDIT|DEBIT)", "amount": "Float", "balanceBefore": "Float", "balanceAfter": "Float", "referenceType": "String (order|topup|cashback|refund)", "referenceId": "Int", "remarks": "String", "createdAt": "DateTime" }
  ],
  "pagination": {}
}
```

### `POST /wallet/topup`
Add funds via payment gateway.

**Auth:** JWT (Customer)  
**Request**
```json
{ "amount": "*Float", "paymentMethodId": "*Int" }
```

**Response**
```json
{ "paymentId": "Int", "gatewayUrl": "String" }
```

### `POST /wallet/withdraw`
Request withdrawal.

**Auth:** JWT (Customer)  
**Request**
```json
{ "amount": "*Float", "withdrawMethod": "*String (bank|mobile_banking)", "accountNumber": "*String" }
```

### `PATCH /wallet/withdraw/:id/approve`
Approve withdrawal. **Auth:** JWT (Admin)

---

## 13. Vendor Settlements

⚪ **Planned** — not started.

### `GET /vendors/:vendorId/wallet`
Get vendor wallet.

**Auth:** JWT (Vendor, Admin)  
**Response**
```json
{ "balance": "Float", "holdBalance": "Float", "currency": "String", "status": "String" }
```

### `GET /vendors/:vendorId/wallet/transactions`
### `GET /vendors/:vendorId/settlements`
List settlements. **Response**
```json
{
  "items": [
    { "id": "Int", "settlementNumber": "String", "settlementPeriodStart": "Date", "settlementPeriodEnd": "Date", "totalOrders": "Int", "grossAmount": "Float", "commissionAmount": "Float", "adjustmentAmount": "Float", "netAmount": "Float", "paymentStatus": "String", "paymentDate": "DateTime" }
  ]
}
```

### `GET /settlements/:id`
Get settlement with order breakdown.

### `POST /admin/settlements`
Create settlement batch. **Auth:** JWT (Admin)

**Request**
```json
{ "vendorId": "*Int", "settlementPeriodStart": "*Date", "settlementPeriodEnd": "*Date" }
```

### `POST /settlements/:id/process`
Mark settlement as paid. **Auth:** JWT (Admin)

**Request**
```json
{ "transactionId": "String", "paymentMethod": "String", "processedAt": "DateTime" }
```

### `GET /platform/revenue`
Platform revenue summary. **Auth:** JWT (Admin)

**Response**
```json
{ "totalRevenue": "Float", "commissionRevenue": "Float", "deliveryRevenue": "Float", "subscriptionRevenue": "Float", "period": { "from": "Date", "to": "Date" } }
```

---

## 14. Riders

⚪ **Planned** — not started.

### Rider CRUD (Admin)

### `GET /riders`
List riders. **Auth:** JWT (Admin, Vendor)  
**Query:** `?page=1&limit=20&status=&isOnline=`

**Response**
```json
{
  "items": [
    {
      "id": "Int",
      "riderCode": "String",
      "fullName": "String",
      "phone": "String",
      "email": "String",
      "profileImage": "String",
      "status": "String",
      "isOnline": "Boolean",
      "isAvailable": "Boolean",
      "employmentType": "String",
      "vehicleType": "String",
      "totalDeliveries": "Int",
      "averageRating": "Float",
      "averageDeliveryTime": "Float",
      "earnings": "Float"
    }
  ],
  "pagination": {}
}
```

### `POST /riders`
**Auth:** JWT (Admin, Vendor)  
**Request**
```json
{ "userId": "*Int", "vendorId": "Int", "branchId": "Int", "fullName": "*String", "phone": "*String", "email": "String", "nidNumber": "*String", "licenseNumber": "*String", "licenseExpiryDate": "Date", "joiningDate": "Date", "employmentType": "String (fulltime|parttime|contract)" }
```

### `GET /riders/:id`
**GET /riders/:id** returns full rider profile.

### `PATCH /riders/:id`
### `DELETE /riders/:id`
Soft-delete.

### `PATCH /riders/:id/online`
Toggle online. **Auth:** JWT (Rider)

### `PATCH /riders/:id/status`
Change status. **Auth:** JWT (Admin)

### --- Documents & Vehicle ---

### `GET /riders/:riderId/documents`
### `POST /riders/:riderId/documents`
```json
{ "documentType": "*String (NID|Driving License)", "documentNumber": "*String", "documentUrl": "*String (URL)", "expiryDate": "Date" }
```

### `PATCH /rider-documents/:id/verify`
**Auth:** JWT (Admin)
```json
{ "verificationStatus": "*String (verified|rejected)" }
```

### `GET /riders/:riderId/vehicle`
### `POST /riders/:riderId/vehicle`
```json
{ "vehicleType": "*String (bike|scooter|car)", "brand": "String", "model": "String", "registrationNumber": "*String", "color": "String", "insuranceNumber": "String", "insuranceExpiryDate": "Date" }
```

### `PATCH /rider-vehicle/:id`

### --- Performance & Ratings ---

### `GET /riders/:riderId/performance`
**Response**
```json
{ "totalDeliveries": "Int", "completedDeliveries": "Int", "cancelledDeliveries": "Int", "averageDeliveryTime": "Float", "averageRating": "Float", "acceptanceRate": "Float", "completionRate": "Float" }
```

### `GET /riders/:riderId/ratings`
**Response**
```json
{ "items": [ { "customerName": "String", "rating": "Int", "review": "String", "createdAt": "DateTime" } ] }
```

### --- Rider Wallet ---

### `GET /riders/:riderId/wallet`
### `GET /riders/:riderId/wallet/transactions`
### `POST /rider-wallet/withdraw`
**Request**
```json
{ "amount": "*Float", "withdrawMethod": "*String", "accountNumber": "*String" }
```

### --- Availability & Shift ---

### `GET /riders/:riderId/availability`
### `POST /riders/:riderId/availability`
```json
{ "dayOfWeek": "*String (Monday|...|Sunday)", "startTime": "*String (HH:mm)", "endTime": "*String (HH:mm)", "isAvailable": "Boolean" }
```

### `POST /riders/:riderId/shifts`
```json
{ "shiftName": "*String", "startTime": "*String (HH:mm)", "endTime": "*String (HH:mm)", "status": "String" }
```

### `POST /riders/:riderId/attendance`
```json
{ "checkIn": "*DateTime", "checkOut": "DateTime", "workingHours": "Float", "attendanceStatus": "String (present|absent|late)" }
```

---

## 15. Deliveries & Live Tracking

⚪ **Planned** — not started.

### `POST /orders/:orderId/delivery`
Create delivery for an order.

**Auth:** JWT (Admin)  
**Request**
```json
{ "deliveryType": "String (standard|express|scheduled)", "priority": "Int" }
```

**Response** `201`
```json
{ "id": "Int", "deliveryCode": "String", "deliveryStatus": "PENDING" }
```

### `PATCH /deliveries/:id/assign-rider`
**Auth:** JWT (Admin, Vendor)  
**Request**
```json
{ "riderId": "*Int" }
```

### `PATCH /deliveries/:id/status`
Update delivery status.

**Auth:** JWT (Rider, Admin)  
**Request**
```json
{ "status": "*String (picked_up|on_the_way|delivered|failed)", "remarks": "String", "location": { "latitude": "Float", "longitude": "Float" } }
```

### `POST /deliveries/:id/proof`
Upload delivery proof.

**Auth:** JWT (Rider)  
**Request**
```json
{ "proofType": "*String (photo|signature|otp)", "image": "String (URL)", "signature": "String (URL)", "otp": "String" }
```

### `POST /deliveries/:id/attempt`
Log failed delivery attempt.

**Auth:** JWT (Rider)  
**Request**
```json
{ "reason": "*String" }
```

### `GET /deliveries`
List deliveries. **Auth:** JWT (Admin, Vendor, Rider)  
**Query:** `?page=1&limit=20&status=&riderId=&from=&to=`

### `GET /deliveries/:id`
Get delivery details with tracking info.

### --- Routes ---

### `POST /routes/optimize`
Generate optimized delivery route.

**Auth:** JWT (Admin)  
**Request**
```json
{ "riderId": "*Int", "deliveryIds": "*[Int]" }
```

**Response**
```json
{ "id": "Int", "routeCode": "String", "totalDistance": "Float", "estimatedDuration": "Int", "stops": [ { "stopNumber": "Int", "deliveryId": "Int", "customerAddress": "String", "latitude": "Float", "longitude": "Float", "estimatedArrivalTime": "DateTime" } ] }
```

### `GET /routes/:id`
Get route with stops.

### `PATCH /routes/:id/assign-rider`
**Request**
```json
{ "riderId": "*Int" }
```

### --- Live Tracking ---

### `POST /tracking/session`
Start tracking. **Auth:** JWT (Rider)

**Request**
```json
{ "deliveryId": "*Int" }
```

**Response**
```json
{ "id": "Int", "trackingCode": "String", "sessionId": "String" }
```

### `PATCH /tracking/session/:id/end`
End tracking.

### `POST /tracking/location`
Update rider location. **Auth:** JWT (Rider)

**Request**
```json
{ "sessionId": "*String", "latitude": "*Float", "longitude": "*Float", "speed": "Float", "heading": "Float", "accuracy": "Float", "batteryLevel": "Float" }
```

### `GET /deliveries/:deliveryId/tracking`
Get tracking info (customer-facing). **Auth:** JWT (Customer, Admin)

**Response**
```json
{
  "deliveryStatus": "String",
  "riderName": "String",
  "riderPhone": "String",
  "riderPhoto": "String",
  "riderLatitude": "Float",
  "riderLongitude": "Float",
  "estimatedArrivalTime": "DateTime",
  "remainingDistance": "Float",
  "remainingDuration": "Int",
  "events": [ { "event": "String (picked_up|nearby|arrived|delivered)", "description": "String", "createdAt": "DateTime" } ]
}
```

### `GET /tracking/eta/:deliveryId`
Get ETA only. **Auth:** JWT (Customer)

---

## 16. Notifications

⚪ **Planned** — not started.

### `GET /notifications`
List current user's notifications.

**Auth:** JWT (All)  
**Query:** `?page=1&limit=20&type=order|payment|promotion|system`  
**Response**
```json
{
  "items": [
    { "id": "Int", "title": "String", "message": "String", "type": "String", "referenceType": "String", "referenceId": "Int", "isRead": "Boolean", "createdAt": "DateTime" }
  ],
  "pagination": {},
  "unreadCount": "Int"
}
```

### `PATCH /notifications/:id/read`
Mark one as read.

### `POST /notifications/read-all`
Mark all as read.

### `GET /notifications/unread-count`
**Response**
```json
{ "unreadCount": "Int" }
```

### --- Admin: Broadcast & Announcements ---

### `POST /admin/broadcast`
Send push/email/SMS to targeted users.

**Auth:** JWT (Admin)  
**Request**
```json
{ "title": "*String", "message": "*String", "targetType": "*String (all|customers|vendors|riders|custom_segment)", "segmentId": "Int", "channels": ["push", "email", "sms"], "scheduledAt": "DateTime" }
```

### `GET /admin/announcements`
List announcements.

### `POST /admin/announcements`
**Request**
```json
{ "title": "*String", "description": "Text", "image": "String (URL)", "startDate": "Date", "endDate": "Date" }
```

### `PATCH /admin/announcements/:id`

### --- FAQ ---

### `GET /faq/categories`
Public.

### `GET /faq/categories/:categoryId/faqs`
Public.

### `POST /admin/faq/categories`
**Auth:** JWT (Admin)
```json
{ "name": "*String", "icon": "String" }
```

### `POST /admin/faq`
```json
{ "categoryId": "*Int", "question": "*String", "answer": "*Text", "sortOrder": "Int" }
```

### `PATCH /admin/faq/:id`
### `DELETE /admin/faq/:id`

---

## 17. Support Tickets

⚪ **Planned** — not started.

### `POST /support/tickets`
Create ticket.

**Auth:** JWT (Customer)  
**Request**
```json
{ "orderId": "Int", "categoryId": "*Int", "subject": "*String", "description": "*String", "priority": "String (low|medium|high|urgent)" }
```

**Response** `201`
```json
{ "id": "Int", "ticketNumber": "String", "status": "OPEN" }
```

### `GET /support/tickets`
List user's tickets. **Auth:** JWT (Customer, SupportAgent)

### `GET /support/tickets/:id`
Get ticket with replies.

### `PATCH /support/tickets/:id`
Update. **Auth:** JWT (SupportAgent)

**Request**
```json
{ "status": "String (OPEN|IN_PROGRESS|WAITING|RESOLVED|CLOSED)", "assignedTo": "Int", "priority": "String" }
```

### `POST /support/tickets/:id/replies`
Add reply. **Auth:** JWT (Owner, SupportAgent)

**Request**
```json
{ "message": "*String", "attachment": "String (URL)", "isInternal": "Boolean (for agent notes)" }
```

### `GET /support/tickets/:id/replies`

### --- Admin: Ticket Management ---

### `GET /admin/support/tickets`
List all tickets. **Auth:** JWT (SupportAgent)

**Query:** `?page=1&limit=20&status=&priority=&assignedTo=`

### `GET /admin/support/categories`
### `POST /admin/support/categories`
```json
{ "name": "*String", "description": "String" }
```

---

## 18. CMS

⚪ **Planned** — not started.

### `GET /cms/banners`
List active banners. **Auth:** None  
**Response**
```json
{ "items": [ { "id": "Int", "title": "String", "subtitle": "String", "image": "String (URL)", "redirectType": "String (food|package|category|url)", "redirectId": "String", "displayOrder": "Int" } ] }
```

### `POST /cms/banners`
**Auth:** JWT (Admin)
```json
{ "title": "*String", "subtitle": "String", "image": "*String (URL)", "redirectType": "String", "redirectId": "String", "displayOrder": "Int", "startDate": "Date", "endDate": "Date" }
```

### `PATCH /cms/banners/:id`
### `DELETE /cms/banners/:id`

### `GET /cms/sliders`
### `POST /cms/sliders`
```json
{ "title": "*String", "description": "String", "image": "*String (URL)", "buttonText": "String", "buttonUrl": "String", "displayOrder": "Int" }
```

### `PATCH /cms/sliders/:id`
### `DELETE /cms/sliders/:id`

### `GET /cms/blogs`
Public, paginated.

### `GET /cms/blogs/:slug`
### `POST /cms/blogs`
**Auth:** JWT (Admin)
```json
{ "title": "*String", "slug": "*String", "thumbnail": "String (URL)", "content": "*Text", "categoryId": "Int" }
```

### `PATCH /cms/blogs/:id`
### `DELETE /cms/blogs/:id`

### `GET /cms/pages/:slug`
Get static page (About, Privacy, Terms, etc.).

---

## 19. Reports & Analytics

⚪ **Planned** — not started.

### `GET /analytics/dashboard`
Dashboard overview metrics.

**Auth:** JWT (Admin)  
**Response**
```json
{
  "totalUsers": "Int",
  "totalCustomers": "Int",
  "totalVendors": "Int",
  "totalRiders": "Int",
  "totalOrders": "Int",
  "completedOrders": "Int",
  "cancelledOrders": "Int",
  "totalRevenue": "Float",
  "todaySales": "Float",
  "todayOrders": "Int",
  "activeSubscriptions": "Int",
  "pendingVendors": "Int"
}
```

### `GET /analytics/sales`
Sales analytics. **Query:** `?from=Date&to=Date&period=daily|weekly|monthly`

**Response**
```json
{ "data": [ { "date": "Date", "totalSales": "Float", "grossRevenue": "Float", "netRevenue": "Float", "commission": "Float", "refundAmount": "Float", "deliveryCharge": "Float" } ], "summary": { "total": "Float", "average": "Float", "growth": "Float" } }
```

### `GET /analytics/revenue`
Revenue breakdown.

### `GET /analytics/customer/:customerId`
Per-customer analytics.

### `GET /analytics/vendor/:vendorId`
Per-vendor performance.

### `GET /analytics/rider/:riderId`
Per-rider metrics.

### `GET /analytics/package/:packageId`
Per-package performance.

### --- Reports ---

### `POST /reports/generate`
Generate a report.

**Auth:** JWT (Admin)  
**Request**
```json
{ "reportType": "*String (sales|revenue|finance|subscription|customer|vendor|rider|delivery|payment|tax|inventory|marketing|coupon|refund|audit)", "startDate": "*Date", "endDate": "*Date", "filters": "JSON", "exportType": "String (pdf|csv|xlsx)" }
```

### `GET /reports`
List generated reports.

### `GET /reports/:id`
Get report detail + download URL.

### `POST /reports/schedules`
Schedule recurring report.

**Request**
```json
{ "reportTemplateId": "*Int", "frequency": "*String (daily|weekly|monthly)", "nextRun": "*Date", "emailTo": "*[String]" }
```

### `GET /reports/templates`
List report templates.

### `POST /reports/templates`
**Request**
```json
{ "name": "*String", "reportType": "*String", "description": "String", "filters": "JSON", "columns": "[String]", "chartType": "String" }
```

### --- KPIs ---

### `GET /analytics/kpis`
**Response**
```json
{ "items": [ { "name": "String", "code": "String", "value": "Float", "target": "Float", "percentage": "Float", "reportDate": "Date" } ] }
```

### --- Dashboard Configuration ---

### `GET /analytics/dashboard/widgets`
### `POST /analytics/dashboard/widgets`
```json
{ "name": "*String", "widgetType": "*String (chart|table|metric|list)", "position": "Int", "configuration": "JSON" }
```

### `PATCH /analytics/dashboard/widgets/:id`
### `DELETE /analytics/dashboard/widgets/:id`

### `GET /analytics/dashboard/layout`
Get user's dashboard layout.

### `PATCH /analytics/dashboard/layout`
```json
{ "layout": "JSON", "theme": "String" }
```

---

## 20. Roles & Permissions

⚪ **Planned** — not started.

### `GET /roles`
List all roles.

**Auth:** JWT (SuperAdmin, Admin)  
**Response**
```json
{ "items": [ { "id": "Int", "name": "String", "slug": "String", "description": "String", "isDefault": "Boolean", "status": "String" } ] }
```

### `POST /roles`
**Auth:** JWT (SuperAdmin)

**Request**
```json
{ "name": "*String", "slug": "*String", "description": "String", "isDefault": "Boolean", "status": "String" }
```

### `PATCH /roles/:id`
### `DELETE /roles/:id`

### `GET /permissions`
List all permissions.

**Auth:** JWT (SuperAdmin, Admin)

### `POST /permissions`
**Auth:** JWT (SuperAdmin)
```json
{ "module": "*String", "name": "*String", "slug": "*String", "description": "String" }
```

### `PATCH /permissions/:id`
### `DELETE /permissions/:id`

### `GET /roles/:roleId/permissions`
Get permissions assigned to a role.

### `POST /roles/:roleId/permissions`
Assign permissions.

**Request**
```json
{ "permissionIds": "*[Int]" }
```

### `DELETE /roles/:roleId/permissions/:permissionId`
Remove permission from role.

### `GET /users/:userId/roles`
Get user's roles.

### `POST /users/:userId/roles`
Assign role to user.

**Auth:** JWT (SuperAdmin)  
**Request**
```json
{ "roleId": "*Int", "expiresAt": "DateTime" }
```

### `DELETE /users/:userId/roles/:userRoleId`
Remove role from user.

---

## 21. System Settings

⚪ **Planned** — not started.

### `GET /admin/settings`
Get all settings (key-value list).

**Auth:** JWT (SuperAdmin)

### `PATCH /admin/settings/:key`
Update a specific setting.

**Request**
```json
{ "settingValue": "*String" }
```

### `GET /admin/settings/general`
**Response**
```json
{ "appName": "String", "appLogo": "String (URL)", "supportEmail": "String", "supportPhone": "String", "currency": "String", "timezone": "String", "language": "String", "maintenanceMode": "Boolean" }
```

### `PATCH /admin/settings/general`
```json
{ "appName": "String", "appLogo": "String", "supportEmail": "String", "supportPhone": "String", "currency": "String", "timezone": "String", "language": "String" }
```

### `PATCH /admin/settings/payment`
```json
{ "gatewayName": "String", "isSandbox": "Boolean", "merchantId": "String", "storeId": "String", "apiKey": "String" }
```

### `PATCH /admin/settings/delivery`
```json
{ "minimumDeliveryTime": "Int", "maximumDeliveryDistance": "Float", "defaultDeliveryCharge": "Float", "freeDeliveryAmount": "Float" }
```

### `PATCH /admin/settings/packages`
```json
{ "minimumOrderDays": "Int", "maximumOrderDays": "Int", "allowCustomization": "Boolean", "allowPause": "Boolean", "allowSkipMeal": "Boolean" }
```

### `PATCH /admin/settings/commission`
```json
{ "defaultCommissionType": "String", "defaultCommissionRate": "Float", "minimumCommission": "Float", "maximumCommission": "Float" }
```

### `PATCH /admin/settings/notifications`
```json
{ "pushEnabled": "Boolean", "smsEnabled": "Boolean", "emailEnabled": "Boolean", "marketingEnabled": "Boolean" }
```

### `GET /admin/feature-flags`
List all feature toggles.

**Auth:** JWT (Admin)  
**Response**
```json
{ "items": [ { "featureName": "String", "isEnabled": "Boolean", "description": "String" } ] }
```

### `PATCH /admin/feature-flags/:name`
Toggle feature.

**Auth:** JWT (SuperAdmin)  
**Request**
```json
{ "isEnabled": "*Boolean" }
```

### `GET /admin/maintenance`
Check maintenance mode.

### `POST /admin/maintenance`
Enable/disable.

**Auth:** JWT (SuperAdmin)  
**Request**
```json
{ "enabled": "*Boolean", "message": "String", "startTime": "DateTime", "endTime": "DateTime" }
```

### `GET /health`
Basic health check. **Auth:** None

**Response**
```json
{ "status": "ok", "timestamp": "DateTime", "uptime": "Int" }
```

---

> **Document version:** 2.0.0  
> **Field reference:** See `docs/FONDO – Complete System Workflow.md` Modules 1–15 for all model field definitions  
> **Last updated:** 2026-07-09