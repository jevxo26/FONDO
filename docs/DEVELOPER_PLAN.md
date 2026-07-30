# FONDO — Developer Build Plan

> Follow steps in order. Each step depends on previous.
> `[ ]` = pending | `[x]` = done | `[!]` = blocked
>
> **Package ownership:** Admin creates/manages packages (PRD §12). Vendor only manages foods.

---

## PHASE 1: ADMIN PACKAGE MANAGEMENT

**Why first:** Packages are foundation — subscriptions, daily meal generation, customer checkout all depend on it. Frontend form already built, backend partial.

---

### Step 1 — Complete Package Backend CRUD

**Depends on:** None

**What:** Add missing endpoints for full Package lifecycle

**Files to modify:**
- `server/services/packageService.ts` — Add:
  - `updatePackage(id, data)` — PATCH
  - `deletePackage(id)` — soft delete
  - `getAllPackagesAdmin(query)` — include drafts, pagination, search
- `server/controllers/packageController.ts` — Add:
  - `updatePackage`, `deletePackage`, `getPackagesAdmin`
- `server/routes/packageRoutes.ts` — Add admin routes:
  - `PATCH /api/package/:id` (admin)
  - `DELETE /api/package/:id` (admin)
  - `GET /api/package/admin/all` (admin — with drafts)

**Verify:** `curl GET /api/package/admin/all` returns packages with pagination

---

### Step 2 — Package Sub-Resource CRUD

**Depends on:** Step 1

**What:** Build CRUD for all Package sub-models

**Files to create:**
- `server/services/packageSubresourceService.ts` (max 300 lines)
- `server/controllers/packageSubresourceController.ts`
- `server/routes/packageSubresourceRoutes.ts`

**Endpoints to build:**

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/package/:packageId/days` | Add day |
| PATCH | `/api/package-days/:dayId` | Update day |
| DELETE | `/api/package-days/:dayId` | Remove day |
| POST | `/api/package-days/:dayId/meals` | Add meal to day |
| PATCH | `/api/package-meals/:mealId` | Update meal |
| DELETE | `/api/package-meals/:mealId` | Remove meal |
| POST | `/api/package-meals/:mealId/foods` | Assign food to meal |
| DELETE | `/api/package-meal-foods/:id` | Remove food from meal |
| POST | `/api/package/:packageId/prices` | Add price tier |
| PATCH | `/api/package/:packageId/rules` | Update rules |
| POST | `/api/package/:packageId/benefits` | Add benefit |
| DELETE | `/api/package/:packageId/benefits/:benefitId` | Remove benefit |
| PATCH | `/api/package/:packageId/nutrition` | Update nutrition |
| PATCH | `/api/package/:packageId/schedule` | Update delivery schedule |
| PATCH | `/api/package/:packageId/availability` | Update availability |
| POST | `/api/package/:packageId/tags` | Add tag |
| DELETE | `/api/package/:packageId/tags/:tagId` | Remove tag |

**Mount** in `server/index.ts` at `/api/package` prefix

---

### Step 3 — Create Package API Slice (Frontend)

**Depends on:** Step 1

**What:** RTK Query slice for package API calls

**Files to create:**
- `src/store/api/slices/packages-api.ts` — Define:
  - `useGetPackagesQuery` (admin list)
  - `useGetPackageQuery` (single with detail)
  - `useCreatePackageMutation`
  - `useUpdatePackageMutation`
  - `useDeletePackageMutation`
- `src/store/api/tags.ts` — Add `"Package"` tag

**Files to modify:**
- `src/app/dashboard/admin/foods/packages/page.tsx` — Replace static `foodPackages` with `useGetPackagesQuery`
- `src/components/dashboard/admin/foods/packages/package-card.tsx` — Add edit/delete dropdown

---

### Step 4 — Wire Add Package Form to API

**Depends on:** Step 1

**What:** Connect existing form to live POST endpoint

**Files to modify:**
- `src/app/dashboard/admin/foods/packages/add/page.tsx` — Replace `fetch("/api/package")` call with RTK Query `useCreatePackageMutation`

**Verify:** Submit form → package appears in package list

---

### Step 5 — Build Package Detail Page

**Depends on:** Step 2, 3

**What:** Package detail view with sub-resource management

**Files to create:**
- `src/app/dashboard/admin/foods/packages/[id]/page.tsx`
- `src/components/dashboard/admin/foods/packages/package-detail-overview.tsx`
- `src/components/dashboard/admin/foods/packages/package-days-tree.tsx`
- `src/components/dashboard/admin/foods/packages/package-rules-card.tsx`
- `src/components/dashboard/admin/foods/packages/package-nutrition-card.tsx`
- `src/components/dashboard/admin/foods/packages/package-benefits-card.tsx`

**Sections on page:**
1. Overview (name, slug, code, category, status badge, price)
2. Days & Meals tree (expandable — day → meals → foods)
3. Rules & Schedule card
4. Nutrition card
5. Benefits list (add/remove)
6. Edit button → `/packages/[id]/edit`

---

### Step 6 — Build Package Edit Page

**Depends on:** Step 5

**What:** Reuse Add form with initial values from API

**Files to create:**
- `src/app/dashboard/admin/foods/packages/[id]/edit/page.tsx`
- `src/hooks/forms/use-package-form.ts` — wraps create/update mutations with onSuccess

---

### Step 7 — PackageCategory CRUD

**Depends on:** Step 1

**What:** Modal for managing package categories

**Files to create:**
- `src/components/dashboard/admin/foods/packages/add-category-modal.tsx`
  - Fields: name, slug (auto), description, icon, status
- `src/store/api/slices/package-categories-api.ts`
- Mount `POST /api/package/categories` + `GET /api/package/categories` (already exist, verify)

---

## PHASE 2: CUSTOMER SUBSCRIPTION FLOW

---

### Step 8 — Fix Vendor Route Auth (🚨 Security)

**Depends on:** None (parallel with Phase 1)

**Risk:** HIGH — all vendor routes currently public

**What:** Add authentication middleware to vendor routes

**Files to modify:**
- `server/routes/vendorRoutes.ts` — Add:
  ```ts
  router.use(verifyToken);
  router.use(authorize("ADMIN", "SUPER_ADMIN", "VENDOR", "VENDOR_STAFF"));
  ```
- `server/controllers/vendorController.ts` — Change `Request` → `AuthRequest` where needed

**Verify:** `curl GET /api/vendor/all` without token → 401

---

### Step 9 — Wire Customer Package Pages to Live API

**Depends on:** Step 1

**What:** Replace static data in customer-facing package pages

**Files to modify:**
- `src/app/(main)/packages/page.tsx` — Fetch from `/api/package` instead of static `foodPackages`
- `src/app/(main)/packages/[id]/page.tsx` — Fetch from `/api/package/:id`

**Note:** These pages currently use `generateStaticParams` and static data. Replace with server-side fetch using `apiFetch<T>()`.

---

### Step 10 — Build Subscription Backend

**Depends on:** Step 1 (needs Package CRUD)

**Files to create:**
- `server/services/subscriptionService.ts` (max 300 lines)
  - `createSubscription(customerId, data)` — validate package, dates
  - `getCustomerSubscriptions(customerId)`
  - `getSubscriptionById(id)`
  - `pauseSubscription(id)` / `resumeSubscription(id)`
  - `cancelSubscription(id)`
  - `skipMeal(subscriptionId, dayNumber, mealType)`
  - `autoRenew(subscriptionId)`
- `server/controllers/subscriptionController.ts`
- `server/routes/subscriptionRoutes.ts`

**Routes:**
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/subscriptions` | Customer |
| GET | `/api/subscriptions` | Customer |
| GET | `/api/subscriptions/:id` | Customer |
| PATCH | `/api/subscriptions/:id/pause` | Customer |
| PATCH | `/api/subscriptions/:id/resume` | Customer |
| DELETE | `/api/subscriptions/:id` | Customer |
| POST | `/api/subscriptions/:id/skip-meal` | Customer |
| GET | `/api/admin/subscriptions` | Admin |
| PATCH | `/api/admin/subscriptions/:id/status` | Admin |

**Mount** in `server/index.ts`

---

### Step 11 — Build Customer Subscription Frontend

**Depends on:** Step 10

**Files to create:**
- `src/store/api/slices/subscriptions-api.ts` — RTK Query
- `src/hooks/use-subscriptions.ts`
- `src/app/(main)/subscriptions/page.tsx` — List subscriptions
- `src/app/(main)/subscriptions/[id]/page.tsx` — Detail + pause/resume/cancel/skip
- `src/components/(main)/subscription/subscription-card.tsx`

---

### Step 12 — Build Daily Meal Generation

**Depends on:** Step 10

**What:** Cron job that generates daily orders from active subscriptions

**Files to create:**
- `server/services/dailyMealGenerationService.ts`
  - `generateDailyOrders()` — Main cron function:
    1. Query ACTIVE subscriptions for today
    2. For each: get package days/meals/foods
    3. Create Order + OrderMeals + OrderMealFoods
    4. Assign vendor (via VendorFoodAssignment or package vendor)
    5. Create Delivery record (PENDING)
    6. Notify vendor kitchen
  - `generateOrdersForDate(date)` — Manual backfill
- `server/controllers/dailyMealController.ts` — Manual trigger
- `server/routes/dailyMealRoutes.ts`
  - `POST /api/admin/daily-meals/generate` — Admin trigger

**Setup:**
- `pnpm add node-cron`
- In `server/index.ts`: `cron.schedule("0 2 * * *", generateDailyOrders)` (2 AM daily)

---

### Step 13 — Build Admin Subscription Pages

**Depends on:** Step 10

**Files to create:**
- `src/app/dashboard/admin/subscriptions/page.tsx` — All subscriptions DataTable
- `src/app/dashboard/admin/subscriptions/[id]/page.tsx` — Detail + status management
- `src/components/dashboard/admin/subscriptions/subscription-columns.tsx`
- `src/components/dashboard/admin/subscriptions/subscription-table-section.tsx`

---

## PHASE 3: ADMIN CRUD FORMS

---

### Step 14 — Admin Food Add/Edit Modal

**Depends on:** None (parallel)

**What:** Full food creation form as Dialog modal

**Files to create:**
- `src/components/dashboard/admin/foods/add-food-modal.tsx` — Dialog with react-hook-form
- `src/hooks/forms/use-food-form.ts`
- `src/store/api/slices/admin-foods-api.ts` — createFood, updateFood, deleteFood mutations
- `server/validations/admin-food.validation.ts` — Create/update validation schemas

**Form sections:**
1. Basic Info (name, slug, foodCode, category, subcategory, foodType, spiceLevel)
2. Nutrition (calories, protein, fat, carbs, fiber, sugar, sodium)
3. Pricing (basePrice, salePrice, discount)
4. Media (thumbnail, gallery)
5. Schedule & Availability (mealType, startTime, endTime, availableDays)
6. Tags & Labels (tag select, diet select, isFeatured, isPopular toggles)

**Files to modify:**
- `src/app/dashboard/admin/foods/page.tsx` — Wire "Add Food" button to modal

---

### Step 15 — Admin Category Add/Edit Modal

**Depends on:** None (parallel)

**Files to create:**
- `src/components/dashboard/admin/foods/categories/add-category-modal.tsx`
  - Fields: name, slug (auto), description, icon, image, sortOrder, status
- `src/store/api/slices/admin-categories-api.ts`
- `src/hooks/forms/use-category-form.ts`

---

### Step 16 — Admin Coupon Add/Edit Modal

**Depends on:** None (parallel)

**Files to create:**
- `src/components/dashboard/admin/payments/coupons/add-coupon-modal.tsx`
  - Fields: couponCode, title, description, discountType, discountValue, minOrder, maxDiscount, usageLimit, perUserLimit, startDate, endDate, status
- `src/store/api/slices/admin-coupons-api.ts`
- `src/hooks/forms/use-coupon-form.ts`

---

### Step 17 — Food Sub-Resource Inline Editors

**Depends on:** Step 14

**What:** Inline edit sections on food detail page

**Files to create:**
- `src/components/dashboard/admin/foods/variants-section.tsx` — Variant CRUD table
- `src/components/dashboard/admin/foods/addons-section.tsx` — Addon groups + items
- `src/components/dashboard/admin/foods/ingredients-section.tsx` — Ingredient list
- `src/components/dashboard/admin/foods/pricing-section.tsx` — Price tiers
- `src/components/dashboard/admin/foods/schedule-section.tsx` — Meal schedules
- `src/components/dashboard/admin/foods/gallery-section.tsx` — Image upload + sort

---

## PHASE 4: VENDOR DASHBOARD

---

### Step 18 — Build Vendor API Endpoints

**Depends on:** Step 8 (must fix auth first)

**Files to create (one service per domain):**
- `server/services/vendorFoodService.ts`
  - `getVendorFoods(vendorId)` — list foods with vendor-specific price/stock
  - `updateFoodPrice(vendorFoodId, price)`
  - `updateFoodStock(vendorFoodId, stock)`
- `server/services/vendorOrderService.ts`
  - `getVendorOrders(vendorId, statusFilter)`
  - `acceptOrder(orderId)`
  - `updateOrderMealStatus(mealId, status)` — preparing → ready
- `server/services/vendorStaffService.ts` — Staff CRUD
- `server/services/vendorBankService.ts` — Bank account CRUD
- `server/services/vendorHoursService.ts` — Operating hours + holidays CRUD
- `server/services/vendorAreaService.ts` — Service area CRUD
- `server/services/vendorProfileService.ts` — Profile update + settings

**Mount** vendor routes at `/api/vendor` with `verifyToken` + `authorize("VENDOR", "VENDOR_STAFF")`

---

### Step 19 — Build Vendor Frontend Pages

**Depends on:** Step 18

**Spec:** Follow `docs/VENDOR_DASHBOARD_PLAN.md`

**Files to create (13 pages):**

| Page | Route | Key Components |
|------|-------|---------------|
| Overview | `/dashboard/vendor` | StatCards, recent orders, earnings sparkline |
| Foods | `/dashboard/vendor/foods` | DataTable + add/price/stock modals |
| Orders | `/dashboard/vendor/orders` | DataTable + status chips |
| Order Detail | `/dashboard/vendor/orders/[id]` | Detail + assign rider |
| Kitchens | `/dashboard/vendor/kitchens` | DataTable + CRUD modal |
| Staff | `/dashboard/vendor/staff` | DataTable + role modal |
| Branches | `/dashboard/vendor/branches` | DataTable + CRUD modal |
| Earnings | `/dashboard/vendor/earnings` | Wallet + settlements |
| Bank Accounts | `/dashboard/vendor/bank-accounts` | DataTable + CRUD modal |
| Profile | `/dashboard/vendor/profile` | Form + documents + online toggle |
| Operating Hours | `/dashboard/vendor/operating-hours` | Weekly table + holidays |
| Service Areas | `/dashboard/vendor/service-areas` | DataTable + CRUD modal |
| Settings | `/dashboard/vendor/settings` | Toggle cards + danger zone |

**Component directories to create (~40 files):**
```
src/components/dashboard/vendor/
  overview/
  foods/
  orders/ (order-table-section, order-columns, order-detail/)
  kitchens/ (kitchen-table-section, kitchen-columns, add-kitchen-modal)
  staff/ (staff-table-section, staff-columns, add-staff-modal, assign-role-modal)
  branches/ (branch-table-section, branch-columns, add-branch-modal)
  earnings/ (settlement-table-section, settlement-columns, wallet-table-section, wallet-columns)
  bank-accounts/ (bank-table-section, bank-columns, add-bank-modal)
  profile/ (profile-form, documents-section, online-toggle)
  operating-hours/ (hours-table, holiday-section)
  service-areas/ (area-table-section, area-columns, add-area-modal)
  settings/ (settings-cards, danger-zone)
```

**Data files:**
- `src/data/vendor-foods.ts`
- `src/data/vendor-branches.ts`
- `src/data/vendor-kitchens.ts`
- `src/data/vendor-staff.ts`
- `src/data/vendor-earnings.ts`
- `src/data/vendor-bank-accounts.ts`
- `src/data/vendor-operating-hours.ts`
- `src/data/vendor-service-areas.ts`
- `src/data/vendor-profile.ts`

---

## PHASE 5: KITCHEN DASHBOARD

---

### Step 20 — Build Kitchen Backend

**Depends on:** Step 12 (needs daily orders to exist)

**Files to create:**
- `server/services/kitchenService.ts`
  - `getTodaysMeals(kitchenId)` — today's meals grouped by order
  - `updateMealStatus(mealId, status)` — cooking → packed → ready
  - `getKitchenQueue()` — pending queue with priority
- `server/controllers/kitchenController.ts`
- Mount at `/api/kitchen` with `verifyToken` + `authorize("KITCHEN_STAFF")`

---

### Step 21 — Build Kitchen Frontend Pages

**Depends on:** Step 20

**Files to create:**
- `src/app/dashboard/kitchen/page.tsx` — Overview (today's count, pending, in-progress, completed)
- `src/app/dashboard/kitchen/orders/page.tsx` — Today's order cards with status
- `src/app/dashboard/kitchen/meals/page.tsx` — Meal prep list with status action buttons
- `src/components/dashboard/kitchen/kitchen-stat-cards.tsx`
- `src/components/dashboard/kitchen/order-card.tsx`
- `src/components/dashboard/kitchen/meal-prep-row.tsx`
- `src/store/api/slices/kitchen-api.ts`

---

## PHASE 6: RIDER & DELIVERY

---

### Step 22 — Build Rider Backend

**Depends on:** None

**Files to create:**
- `server/services/riderService.ts` — Rider CRUD + profile, documents, vehicle, availability, shifts, attendance
- `server/services/deliveryService.ts`
  - `assignRider(deliveryId, riderId)`
  - `updateDeliveryStatus(id, status)` — PENDING → ASSIGNED → PICKED_UP → ON_THE_WAY → DELIVERED
  - `getRiderDeliveries(riderId, statusFilter)`
- `server/services/trackingService.ts`
  - `startTrackingSession(deliveryId, riderId)`
  - `updateLocation(trackingSessionId, lat, lng, speed, heading)`
  - `getTrackingData(deliveryId)` — For customer view
- `server/controllers/riderController.ts`
- `server/controllers/deliveryController.ts`
- `server/controllers/trackingController.ts`

**Mount:**
- `/api/rider` — Rider self-service
- `/api/admin/riders` — Admin management
- `/api/delivery` — Delivery operations
- `/api/tracking` — Live tracking

---

### Step 23 — WebSocket (Socket.io)

**Depends on:** Step 22

**Files to create:**
- `server/socket/index.ts` — Socket.io server setup
  - `connection` → authenticate via JWT, join room per delivery
  - Events:
    - `rider:location-update` → rider sends lat/lng → broadcast to customer room
    - `delivery:status-change` → push status update
    - `chat:send` → real-time messaging
    - `chat:typing` → typing indicator

**Modify:**
- `server/index.ts` — Attach Socket.io to HTTP server

---

### Step 24 — Build Rider Frontend Pages

**Depends on:** Step 22

**Files to create:**
- `src/app/dashboard/rider/page.tsx` — Overview (today's deliveries, earnings today)
- `src/app/dashboard/rider/deliveries/page.tsx` — Delivery list + accept/start/complete actions
- `src/app/dashboard/rider/deliveries/[id]/page.tsx` — Delivery detail + route + proof
- `src/app/dashboard/rider/earnings/page.tsx`
- `src/app/dashboard/rider/performance/page.tsx`
- `src/app/dashboard/rider/profile/page.tsx`
- `src/components/dashboard/rider/` — Rider components
- `src/store/api/slices/rider-api.ts`
- `src/store/api/slices/delivery-api.ts`

---

### Step 25 — Customer Live Tracking

**Depends on:** Step 23

**Files to create:**
- `src/components/(main)/tracking/live-tracking-map.tsx` — Map with rider marker
- `src/components/(main)/tracking/delivery-timeline.tsx` — Status timeline
- `src/hooks/use-tracking.ts` — WebSocket hook for live location

**Files to modify:**
- `src/app/(main)/track-order/page.tsx` — Wire to real data + live map

---

## PHASE 7: CHAT, SUPPORT & NOTIFICATIONS

---

### Step 26 — Build Real-time Chat

**Depends on:** Step 23 (Socket.io)

**Files to create:**
- `server/services/conversationService.ts`
  - `createConversation(participants, type)`
  - `sendMessage(conversationId, senderId, message, type)`
  - `getConversationHistory(conversationId, page)`
  - `markAsRead(conversationId, userId)`
- `server/controllers/conversationController.ts`
- `server/routes/conversationRoutes.ts`

**Frontend:**
- `src/components/chat/chat-widget.tsx` — Floating chat bubble (customer → support)
- `src/components/chat/chat-dashboard.tsx` — Full chat UI (admin/support agent)
- `src/hooks/use-chat.ts` — Socket.io chat hook

---

### Step 27 — Build Support Tickets

**Depends on:** None

**Files to create:**
- `server/services/supportTicketService.ts`
  - CRUD tickets, add reply, assign agent, change status
- `server/controllers/supportTicketController.ts`
- `server/routes/supportTicketRoutes.ts`

**Frontend:**
- `src/app/dashboard/admin/support/page.tsx` — Ticket queue DataTable
- `src/app/dashboard/admin/support/[id]/page.tsx` — Ticket detail + reply thread
- `src/components/dashboard/admin/support/` — Components

---

### Step 28 — Build Notification System

**Depends on:** None (can use polling, or Step 23 for real-time)

**Files to create:**
- `server/services/notificationService.ts`
  - `createNotification(userId, title, message, type, refType, refId)`
  - `getUserNotifications(userId, page)`
  - `markAsRead(notificationId)`
  - `markAllAsRead(userId)`
  - `getUnreadCount(userId)`
- `server/controllers/notificationController.ts`
- `server/routes/notificationRoutes.ts`

**Frontend:**
- `src/components/notification/notification-dropdown.tsx` — Bell icon with badge, dropdown list
- `src/components/notification/notification-item.tsx`
- `src/hooks/use-notifications.ts`

---

## PHASE 8: CMS, REPORTS & INVENTORY

---

### Step 29 — Build CMS

**Depends on:** None

**Files to create:**
- `server/services/cmsService.ts` — Banner, Slider, Blog, StaticPage CRUD
- `server/controllers/cmsController.ts`
- `server/routes/cmsRoutes.ts` — Mount at `/api/admin/cms`

**Frontend:**
- `src/app/dashboard/admin/cms/banners/page.tsx`
- `src/app/dashboard/admin/cms/banners/add-banner-modal.tsx`
- `src/app/dashboard/admin/cms/blogs/page.tsx`
- `src/app/dashboard/admin/cms/blogs/add-blog-modal.tsx`
- `src/app/dashboard/admin/cms/pages/page.tsx`

---

### Step 30 — Build Admin Analytics

**Depends on:** None

**Files to create:**
- `server/services/analyticsService.ts`
  - `getRevenueStats(period)` — daily/weekly/monthly revenue
  - `getOrderStats(period)` — order volume, avg order value
  - `getCustomerStats(period)` — new customers, active subs
  - `getVendorStats(period)` — top vendors, performance
  - `getDashboardSummary()` — all KPIs for overview
- `server/controllers/analyticsController.ts`
- Mount at `/api/admin/analytics`

**Frontend:**
- `src/app/dashboard/admin/analytics/page.tsx`
  - Revenue line chart
  - Order volume bar chart
  - Customer growth
  - Top vendors table
  - Package popularity
- Use `recharts` (check if in package.json first)

---

### Step 31 — Build Reports

**Depends on:** Step 30 (reuses analytics data)

**Files to create:**
- `server/services/reportService.ts`
  - `generateSalesReport(startDate, endDate)`
  - `generateRevenueReport(startDate, endDate)`
  - `generateVendorReport(vendorId, period)`
  - `generateRiderReport(riderId, period)`
  - `exportToCSV(data, filename)`
  - `exportToPDF(data, filename)`
- `server/controllers/reportController.ts`

**Frontend:**
- Update existing report tab pages:
  - `src/app/dashboard/admin/reports/sales/page.tsx`
  - `src/app/dashboard/admin/reports/revenue/page.tsx`
  - `src/app/dashboard/admin/reports/vendors/page.tsx`
  - `src/app/dashboard/admin/reports/riders/page.tsx`
  - `src/app/dashboard/admin/reports/customers/page.tsx`
  - `src/app/dashboard/admin/reports/subscriptions/page.tsx`
  - `src/app/dashboard/admin/reports/inventory/page.tsx`

---

### Step 32 — Build Inventory & Supplier

**Depends on:** None

**Files to create:**
- `server/services/inventoryService.ts`
  - CRUD inventory items
  - Stock adjustments (increase/decrease)
  - Low stock alerts (below minimumStock)
- `server/services/supplierService.ts`
  - Supplier CRUD
  - Purchase order CRUD
- `server/services/purchaseService.ts`
  - Create purchase from supplier
  - Receive purchase (updates inventory)
- `server/services/wasteService.ts`
  - Log waste
  - Waste report

**Frontend:**
- `src/app/dashboard/vendor/inventory/page.tsx` — Inventory table + stock adjustments
- `src/app/dashboard/vendor/suppliers/page.tsx` — Supplier list + CRUD
- `src/app/dashboard/vendor/purchases/page.tsx` — Purchase orders
- `src/components/dashboard/vendor/inventory/`
- `src/components/dashboard/vendor/suppliers/`

---

## PHASE 9: MARKETING & POLISH

---

### Step 33 — Referral System

**Depends on:** None

**Files to create:**
- `server/services/referralService.ts`
  - `generateReferralCode(userId)` — create unique code
  - `applyReferral(code, newUserId)` — on registration
  - `getReferralRewards(userId)`
- Update `server/services/authService.ts` — Accept referralCode during registration
- `src/components/(main)/referral/referral-section.tsx` — Share code, track rewards

---

### Step 34 — Loyalty & Rewards

**Depends on:** None

**Files to create:**
- `server/services/loyaltyService.ts`
  - `earnPoints(customerId, orderAmount)` — points per order
  - `redeemPoints(customerId, points)` — convert to discount
  - `getLoyaltyTier(customerId)` — bronze/silver/gold/platinum
- `src/components/(main)/loyalty/loyalty-card.tsx` — Points balance + tier badge

---

### Step 35 — Performance Optimization

**Depends on:** All above

**Tasks:**
- Run `pnpm build` — fix any type/build errors
- Replace external image URLs with `next/image`
- Run bundle analyzer — identify large chunks
- Code-split lazy-loaded routes
- Add React.memo to expensive list components
- Prisma: check for N+1 queries, add `include`/`select` optimization
- API: add Redis caching for frequently queried endpoints (packages, foods)

---

### Step 36 — Testing & Bug Bash

**Depends on:** All above

**Test all flows:**

| Flow | Steps |
|------|-------|
| Customer | Register → Browse packages → Select package → Customize meals → Checkout → Pay → View subscription → Track delivery → Review |
| Admin | Login → Create package → Add days/meals/foods → Approve food → Manage vendors → View reports |
| Vendor | Login → View dashboard → Manage foods → Receive order → Prepare → Mark ready |
| Kitchen | View today's queue → Cook → Pack → Mark ready |
| Rider | Accept delivery → Pickup → Navigate → Deliver → OTP/photo proof |

**Fix all issues found.** Run `pnpm lint` and fix warnings.

---

## DEPENDENCY GRAPH

```
Phase 1 ──► Phase 2 ──► Phase 4 ──► Phase 5
  │              │                     │
  │              ▼                     ▼
  └──► Phase 3 ──► Phase 6 ──► Phase 7 ──► Phase 8 ──► Phase 9
       (parallel)

Phase 1 (Steps 1-7):   Packages — foundation
Phase 2 (Steps 8-13):  Subscriptions + daily generation
Phase 3 (Steps 14-17): Admin CRUD forms (can parallel with Phase 2)
Phase 4 (Steps 18-19): Vendor dashboard
Phase 5 (Steps 20-21): Kitchen dashboard
Phase 6 (Steps 22-25): Rider + delivery + tracking
Phase 7 (Steps 26-28): Chat + support + notifications
Phase 8 (Steps 29-32): CMS + analytics + reports + inventory
Phase 9 (Steps 33-36): Marketing + polish + test
```

---

## FILE COUNT SUMMARY

| Phase | Steps | Backend Files | Frontend Files | Total |
|-------|:-----:|:-------------:|:--------------:|:-----:|
| 1 — Packages | 1-7 | 4 | 12 | 16 |
| 2 — Subscriptions | 8-13 | 6 | 8 | 14 |
| 3 — Admin CRUD | 14-17 | 1 | 10 | 11 |
| 4 — Vendor Dashboard | 18-19 | 7 | 50+ | 57+ |
| 5 — Kitchen | 20-21 | 2 | 6 | 8 |
| 6 — Rider & Delivery | 22-25 | 6 | 15 | 21 |
| 7 — Chat & Support | 26-28 | 4 | 8 | 12 |
| 8 — CMS & Reports | 29-32 | 5 | 15 | 20 |
| 9 — Marketing & Polish | 33-36 | 3 | 3 | 6 |
| **Total** | **36** | **38** | **~127** | **~165** |
