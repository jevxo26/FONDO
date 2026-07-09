# FONDO — Build Plan

> **How to use:** Each sprint has a table. Backend builds the endpoints. Frontend builds the pages. Do not start next sprint until current one is complete.

| Sprint | Focus | Sections |
|---|---|---|
| [1](#sprint-1--core-customer-flow) | Customer core flow | 1, 2, 3, 4, 5 |
| [2](#sprint-2--order-fulfillment) | Orders & payments | 6, 7, 10, 11, 12 |
| [3](#sprint-3--vendor-platform) | Vendor marketplace | 8, 9, 13 |
| [4](#sprint-4--operations) | Delivery & support | 14, 15, 16, 17 |
| [5](#sprint-5--admin--platform) | Admin tools | 18, 19, 20, 21 |

---

## Sprint 1 — Core Customer Flow

Goal: Customer can register → browse foods → add to cart → checkout.

| | Section | Feature | Backend | Frontend |
|---|---|---|---|---|
| ✅ | [2](API.md#2-users--profile) | Users & Profile | Build: user CRUD, profile, address CRUD, device CRUD | Build: Profile page, Address form, Device registration |
| ✅ | [3](API.md#3-food-catalog-customer) | Food Catalog | Build: food list, detail, category list, review CRUD, favorites | Wire frontend to API (replace mock data) |
| ✅ | [4](API.md#4-food-admin-crud) | Food Admin | Build: food CRUD, category CRUD, variant CRUD, addon CRUD, nutrition, pricing, tags, labels, schedule | Build: Food list, create, edit pages in dashboard |
| | [1](API.md#1-auth) | Auth | Build: register, login, OTP, forgot/reset password, logout | Build: Login page, Register page, Forgot Password page |
| | [5](API.md#5-cart--checkout) | Cart & Checkout | Build: cart CRUD, meal management, checkout, coupon apply | Build: Cart page, Checkout flow |

**Reference:** `API.md` sections 1–5. `docs/FONDO – Complete System Workflow.md` Modules 1, 4, 7.

---

## Sprint 2 — Order Fulfillment

Goal: Customer places order → pays → sees history. Admin manages orders and customers.

| | Section | Feature | Backend | Frontend |
|---|---|---|---|---|
| | [6](API.md#6-orders) | Orders | Build: place order, list, detail, status update, cancel, refund, feedback | Build: Order list page, Order detail page, My orders page |
| | [11](API.md#11-payments) | Payments | Build: payment initiate, gateway confirm, retry, refund, history | Build: Payment method selection, gateway redirect handling |
| | [12](API.md#12-customer-wallet) | Customer Wallet | Build: wallet CRUD, topup via gateway, withdraw, transaction list | Build: Wallet page, Wallet topup flow |
| | [7](API.md#7-customers-admin) | Customers (Admin) | Build: list customers, detail, order/payment/subscription history | Build: Customer list page, Customer detail page in dashboard |
| | [10](API.md#10-subscriptions) | Subscriptions | Build: subscribe, list, detail, pause, resume, freeze, skip, renew, upgrade, downgrade | Build: Subscription pages in dashboard, Manage subscription page |

**Reference:** `API.md` sections 6, 7, 10, 11, 12. `docs/FONDO – Complete System Workflow.md` Modules 1, 7, 8, 12.

---

## Sprint 3 — Vendor Platform

Goal: Vendors onboard, manage food catalog, pricing, stock. Admin manages commissions and settlements.

| | Section | Feature | Backend | Frontend |
|---|---|---|---|---|
| | [8](API.md#8-vendors) | Vendors | Build: vendor CRUD, branches, kitchens, staff, documents, bank accounts, operating hours, service areas, settings, vendor-food mapping | Build: Vendor registration, Vendor dashboard, Food management, Settings pages |
| | [9](API.md#9-packages--meal-plans) | Packages & Meal Plans | Build: package CRUD, days, meals, foods, pricing, rules, benefits, nutrition, schedule, custom meal plans, preferences | Build: Package list page, Package detail page, Package admin pages, Custom meal plan builder |
| | [13](API.md#13-vendor-settlements) | Vendor Settlements | Build: vendor wallet, settlement batches, commission rules, earnings, platform revenue | Build: Settlement pages in dashboard, Earnings page for vendors |

**Reference:** `API.md` sections 8, 9, 13. `docs/FONDO – Complete System Workflow.md` Modules 3, 5, 6, 8.

---

## Sprint 4 — Operations

Goal: Riders deliver orders. Live tracking works. Support handles tickets. Notifications sent.

| | Section | Feature | Backend | Frontend |
|---|---|---|---|---|
| | [14](API.md#14-riders) | Riders | Build: rider CRUD, documents, vehicles, availability, shifts, attendance, performance, wallet | Build: Rider list, Rider detail, Performance pages in dashboard |
| | [15](API.md#15-deliveries--live-tracking) | Deliveries & Tracking | Build: delivery CRUD, assign rider, status update, proof, routes, optimization, live tracking session, location updates, ETA | Build: Delivery pages, Live tracking map, ETA display |
| | [16](API.md#16-notifications) | Notifications | Build: notification list, mark read, broadcast, announcements, FAQ management | Build: Notification bell, Notification list page, Announcement pages |
| | [17](API.md#17-support-tickets) | Support Tickets | Build: ticket CRUD, replies, categories, agent assignment | Build: Support ticket page, Ticket detail, Agent reply interface |

**Reference:** `API.md` sections 14–17. `docs/FONDO – Complete System Workflow.md` Modules 9, 10.

---

## Sprint 5 — Admin & Platform

Goal: Admins manage content, view reports, configure roles/settings.

| | Section | Feature | Backend | Frontend |
|---|---|---|---|---|
| | [18](API.md#18-cms) | CMS | Build: banners, sliders, blogs, static pages CRUD | Build: Banner management, Blog editor, Page editor in dashboard |
| | [19](API.md#19-reports--analytics) | Reports & Analytics | Build: dashboard metrics, sales/revenue/finance reports, KPIs, report generation, scheduled reports | Build: Dashboard widgets, Report pages, export UI |
| | [20](API.md#20-roles--permissions) | Roles & Permissions | Build: role CRUD, permission CRUD, role-permission assignment, user-role assignment | Build: Role management, Permission management pages |
| | [21](API.md#21-system-settings) | System Settings | Build: settings CRUD, feature flags, maintenance mode, health check | Build: Settings pages, Feature toggle UI in dashboard |

**Reference:** `API.md` sections 18–21. `docs/FONDO – Complete System Workflow.md` Modules 2, 11, 14.

---

## Dependencies Map

```
Sprint 1 (Auth → Users → Foods → Cart)
    ↓
Sprint 2 (Orders → Payments → Wallet → Subscriptions)
    ↓
Sprint 3 (Vendors → Packages → Settlements)
    ↓
Sprint 4 (Riders → Deliveries → Notifications → Support)
    ↓
Sprint 5 (CMS → Reports → Roles → Settings)
```

- Each sprint depends on the previous one being complete
- Vendors (Sprint 3) need orders (Sprint 2) before they can function
- Riders (Sprint 4) need deliveries (Sprint 3 vendors) before they have work
- CMS and Settings (Sprint 5) are standalone — can start earlier if team is idle