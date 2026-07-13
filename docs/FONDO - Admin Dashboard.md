# FONDO Admin Dashboard
## Complete Design Specification

**Version:** 1.0  
**Purpose:** Comprehensive guide for designing and building the FONDO Admin Dashboard  
**Audience:** UI/UX Designers, Frontend Developers, Product Managers  
**Status:** Enterprise Specification

---

## Table of Contents

1. [Admin Dashboard Overview](#admin-dashboard-overview)
2. [Navigation Architecture](#navigation-architecture)
3. [Dashboard Pages](#dashboard-pages)
4. [Sidebar Navigation Map](#sidebar-navigation-map)
5. [Page Specifications](#page-specifications)
6. [Component Library](#component-library)
7. [Data Flow & APIs](#data-flow--apis)
8. [Permissions & Access Control](#permissions--access-control)

---

## Admin Dashboard Overview

### What is the Admin Dashboard?

The Admin Dashboard is the **control center** for FONDO. It's where admins manage the entire ecosystem: customers, vendors, orders, payments, deliveries, support, analytics, and platform settings.

### Admin Types & Access Levels

```
Super Admin
├─ Full platform access
├─ User management (admins, vendors)
├─ Financial settlements
├─ System configuration
└─ Data export & compliance

Admin
├─ Customer management
├─ Vendor management
├─ Order management
├─ Delivery management
├─ Support & escalations
├─ Basic analytics
└─ Cannot: Delete data, Manage other admins

Moderator
├─ Customer support
├─ Order resolution
├─ Refund processing
├─ Content moderation
└─ Cannot: Edit vendor info, Manage admins

Analyst
├─ View-only analytics
├─ Report generation
├─ Data export
└─ Cannot: Modify any data
```

### Key Features

| Feature | Purpose | User |
|---------|---------|------|
| **Dashboard Home** | KPI overview, key metrics | All admins |
| **Vendor Management** | Onboard, monitor, suspend vendors | Admin, Super Admin |
| **Customer Management** | View profiles, process refunds, support | Admin, Moderator |
| **Order Management** | Monitor, cancel, resolve orders | Admin, Moderator |
| **Delivery Management** | Assign riders, track, resolve issues | Admin, Moderator |
| **Payment & Settlement** | View transactions, settle vendors | Admin, Super Admin |
| **Analytics & Reports** | Business intelligence, KPIs | Analyst, Admin |
| **Marketing & Campaigns** | Coupons, promotions, referrals | Admin |
| **Support & Tickets** | Customer support, escalations | Moderator, Admin |
| **Settings & CMS** | Platform configuration | Super Admin |

---

## Navigation Architecture

### Sidebar Navigation Structure

```
MAIN NAVIGATION
├─ 📊 DASHBOARD
│  ├─ Home
│  ├─ Analytics Overview
│  └─ Quick Stats
│
├─ 👥 VENDOR MANAGEMENT
│  ├─ Vendors List
│  ├─ Onboarding
│  ├─ Performance
│  ├─ Settlements
│  ├─ Vendor Tickets
│  └─ Blacklist
│
├─ 👤 CUSTOMER MANAGEMENT
│  ├─ Customers List
│  ├─ Subscriptions
│  ├─ Wallet & Credits
│  ├─ Refunds
│  └─ Customer Segments
│
├─ 📦 ORDER MANAGEMENT
│  ├─ All Orders
│  ├─ By Status
│  │  ├─ Pending
│  │  ├─ Confirmed
│  │  ├─ In Kitchen
│  │  ├─ Ready for Pickup
│  │  ├─ In Transit
│  │  └─ Delivered/Cancelled
│  ├─ Kitchen Queue
│  └─ Order Analytics
│
├─ 🚚 DELIVERY MANAGEMENT
│  ├─ Live Deliveries
│  ├─ Riders List
│  ├─ Routes & Optimization
│  ├─ Performance Metrics
│  ├─ Issues & Resolutions
│  └─ Rider Earnings
│
├─ 💳 PAYMENT & SETTLEMENT
│  ├─ Transactions
│  ├─ Refunds
│  ├─ Vendor Settlements
│  ├─ Payment Methods
│  ├─ Failed Payments
│  └─ Financial Reports
│
├─ 📊 MARKETING
│  ├─ Campaigns
│  ├─ Coupons & Discounts
│  ├─ Referral Program
│  ├─ Loyalty Program
│  ├─ Email Marketing
│  └─ Performance Analytics
│
├─ 💬 SUPPORT
│  ├─ Support Tickets
│  ├─ Chat Management
│  ├─ Escalations
│  ├─ FAQs
│  ├─ Feedback Analysis
│  └─ Knowledge Base
│
├─ 📋 FOOD MANAGEMENT
│  ├─ Food Items
│  ├─ Categories
│  ├─ Meal Plans
│  ├─ Packages
│  ├─ Nutrition Data
│  ├─ Approval Queue
│  └─ Inventory
│
├─ 📈 ANALYTICS & REPORTS
│  ├─ Dashboard
│  ├─ Sales Reports
│  ├─ Revenue Reports
│  ├─ Customer Analytics
│  ├─ Vendor Analytics
│  ├─ Rider Analytics
│  ├─ Delivery Analytics
│  ├─ Custom Reports
│  └─ Data Export
│
├─ ⚙️ SETTINGS
│  ├─ General Settings
│  ├─ User Management
│  ├─ Roles & Permissions
│  ├─ System Configuration
│  ├─ Payment Gateway
│  ├─ SMS & Email
│  ├─ Notifications
│  └─ Backup & Restore
│
└─ 🔐 ADMIN ACCOUNT
   ├─ Profile
   ├─ Change Password
   ├─ Activity Log
   ├─ Logout
   └─ Support

COLLAPSIBLE SECTIONS
├─ 📋 CMS (Content Management)
│  ├─ Banners
│  ├─ Pages
│  ├─ Announcements
│  └─ Terms & Conditions
│
└─ 🔧 SYSTEM
   ├─ Maintenance Mode
   ├─ Feature Toggles
   ├─ System Logs
   ├─ Error Logs
   ├─ API Monitoring
   └─ Database Health
```

---

## Dashboard Pages

### 1. HOME / DASHBOARD

**Purpose:** Overview of platform health, key metrics, and alerts.

#### Main Components

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD HOME                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Time Range Filter: Today | This Week | This Month | Custom]
│  [Download Report] [Print] [Refresh]                        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  KPI CARDS ROW 1                                            │
├──────────────┬──────────────┬──────────────┬──────────────┤
│ Revenue      │ Orders       │ Customers    │ Vendors      │
│ ৳45,63,500   │ 2,456        │ 12,340       │ 127          │
│ ↑ 12% vs YTD │ ↑ 8% vs YTD  │ ↑ 15% vs YTD │ ↑ 5% vs YTD  │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Avg Order    │ Delivery     │ Churn Rate   │ Payment      │
│ Value        │ Success Rate │              │ Success      │
│ ৳1,856       │ 98.5%        │ 2.3%         │ 99.2%        │
│ ↑ 4%         │ ↓ -0.3%      │ ↓ -0.5%      │ ↑ 0.2%       │
└──────────────┴──────────────┴──────────────┴──────────────┘

│  ALERTS & WARNINGS                                          │
├──────────────────────────────────────────────────────────────┤
│ ⚠️  5 orders stuck in kitchen > 2 hours                     │
│ ⚠️  Vendor "Kitchen Paradise" offline since 45 minutes      │
│ ✓  Payment gateway latency normal (245ms avg)              │
│ 🔔 3 pending vendor approvals                              │
└──────────────────────────────────────────────────────────────┘

├─────────────────────────────────────────────────────────────┤
│  CHARTS ROW                                                  │
├──────────────────────┬──────────────────────────────────────┤
│  Revenue Trend       │  Order Volume by Time                │
│  (Line Chart)        │  (Bar Chart)                         │
│  Last 30 days        │  Per hour today                      │
│                      │                                       │
│  [Revenue growing]   │  [Peak 11 AM - 2 PM]                │
│                      │                                       │
├──────────────────────┼──────────────────────────────────────┤
│  Top Vendors         │  Delivery Performance                │
│  (Pie Chart)         │  (Gauge Chart)                       │
│                      │                                       │
│  Vendor A: 25%       │  On-time: 98.5% ✓                  │
│  Vendor B: 22%       │  Late: 1.2%                         │
│  Vendor C: 18%       │  Cancelled: 0.3%                    │
│  Others: 35%         │                                       │
└──────────────────────┴──────────────────────────────────────┘

├─────────────────────────────────────────────────────────────┤
│  QUICK ACTIONS                                              │
├──────────────────────────────────────────────────────────────┤
│  [View Pending Vendors] [Resolve Orders] [View Tickets]    │
│  [Export Daily Report] [Check System Health]               │
└──────────────────────────────────────────────────────────────┘

│  RECENT ACTIVITY FEED                                        │
├──────────────────────────────────────────────────────────────┤
│ 2 mins ago | Vendor "Fresh Meals" approved                │
│ 5 mins ago | Order #ORD-2024-00123 marked delivered       │
│ 12 mins ago | Customer refund processed ৳850              │
│ 15 mins ago | Rider "Kamal Khan" started 3 deliveries    │
└──────────────────────────────────────────────────────────────┘
```

#### Dashboard Cards

| Card | Data | Update Frequency | Click Action |
|------|------|---|---|
| **Revenue** | Today's revenue, % change vs period | Real-time | View revenue report |
| **Orders** | Today's orders, % change | Real-time | View all orders |
| **Customers** | Total active customers | Every 5 min | View customer list |
| **Vendors** | Active vendors count | Every 5 min | View vendor list |
| **Avg Order Value** | Average order amount | Every 5 min | View AOV analysis |
| **Delivery Rate** | % of on-time deliveries | Real-time | View delivery analytics |
| **Churn Rate** | % subscriptions cancelled | Hourly | View churn analysis |
| **Payment Success** | % successful payments | Real-time | View payment report |

#### Charts

1. **Revenue Trend** (Line Chart)
   - X-axis: Last 30 days
   - Y-axis: Revenue amount
   - Click point: View day details

2. **Order Volume** (Bar Chart)
   - X-axis: Hours of day
   - Y-axis: Order count
   - Hover: Show exact count

3. **Top Vendors** (Pie Chart)
   - Slices: By vendor name
   - Click: View vendor details

4. **Delivery Performance** (Gauge)
   - On-time percentage
   - Color coded (green/yellow/red)

#### Alerts Section

Shows critical issues that need immediate attention:
- Orders stuck in kitchen
- Vendor downtime
- Payment gateway issues
- System errors
- Pending approvals

---

### 2. VENDOR MANAGEMENT

#### 2.1 Vendors List

**Purpose:** View all vendors, approve/suspend, manage status.

```
┌─────────────────────────────────────────────────────────────┐
│              VENDORS MANAGEMENT                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Search: vendor name...] [Filter ▼] [Sort ▼]             │
│  Filters: Status | Rating | Approved Date | City           │
│  [+ Add New Vendor] [Export CSV] [Bulk Action ▼]           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  TABLE: VENDORS                                             │
├────┬──────────────────┬────────┬────────┬──────┬──────────┤
│ ID │ Vendor Name      │ Status │ Rating │ Food │ Actions  │
│    │                  │        │ (1-5)  │ Cnt  │          │
├────┼──────────────────┼────────┼────────┼──────┼──────────┤
│ V1 │ Fresh Meals      │ Active │ 4.8    │ 47   │ ⋯        │
│    │ City: Dhaka      │        │        │      │ • View   │
│    │ Joined: 3m ago   │        │        │      │ • Edit   │
│    │ Kitchens: 2      │        │        │      │ • Suspend│
│    │                  │        │        │      │ • Delete │
├────┼──────────────────┼────────┼────────┼──────┼──────────┤
│ V2 │ Kitchen Paradise │ Active │ 4.5    │ 52   │ ⋯        │
│    │ City: Dhaka      │        │        │      │ • View   │
│    │ Joined: 2w ago   │        │        │      │ • Edit   │
│    │ Kitchens: 3      │        │        │      │ • Suspend│
├────┼──────────────────┼────────┼────────┼──────┼──────────┤
│ V3 │ Spice House      │ Pending│ 0      │ 12   │ ⋯        │
│    │ City: Dhaka      │        │        │      │ • View   │
│    │ Joined: 1d ago   │        │        │      │ • Approve│
│    │ Kitchens: 1      │        │        │      │ • Reject │
├────┼──────────────────┼────────┼────────┼──────┼──────────┤
│ V4 │ Healthy Bowls    │ Active │ 4.2    │ 38   │ ⋯        │
│    │ City: Dhaka      │        │        │      │ • View   │
│    │ Joined: 5d ago   │        │        │      │ • Edit   │
│    │ Kitchens: 2      │        │        │      │ • Suspend│
└────┴──────────────────┴────────┴────────┴──────┴──────────┘

Pagination: [< Prev] 1 2 3 [Next >] | Showing 1-10 of 127
```

#### Vendor Details Modal/Page

When clicking on a vendor, shows full profile:

```
┌──────────────────────────────────────────────────┐
│  VENDOR DETAILS: Fresh Meals               [×]   │
├──────────────────────────────────────────────────┤
│                                                  │
│  TABS: [Basic Info] [Kitchens] [Food] [Payment] │
│        [Performance] [Settlement] [Documents]   │
│                                                  │
├──────────────────────────────────────────────────┤
│  BASIC INFO TAB                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Company Name: Fresh Meals Bangladesh           │
│  Registration #: REG-2024-00145                 │
│  Owner Name: Ahmed Hassan                       │
│  Email: contact@freshmeals.bd                   │
│  Phone: +880 1700 000000                        │
│  City: Dhaka, Bangladesh                        │
│  Joined Date: March 15, 2024                    │
│  Status: ✓ Active                               │
│  Rating: 4.8/5 (234 reviews)                    │
│  Total Orders: 2,456                            │
│                                                  │
│  [Edit Info] [Suspend] [Deactivate] [Delete]   │
│                                                  │
└──────────────────────────────────────────────────┘
```

#### Vendor Kitchens Sub-page

```
┌──────────────────────────────────────────────────┐
│  VENDOR: Fresh Meals → KITCHENS              [×]   │
├──────────────────────────────────────────────────┤
│                                                  │
│  [+ Add New Kitchen] [Bulk Action ▼]            │
│                                                  │
│  TABLE: KITCHENS                                │
├────┬─────────────┬────────┬──────────┬─────────┤
│ ID │ Kitchen     │ Status │ Capacity │ Actions │
├────┼─────────────┼────────┼──────────┼─────────┤
│ K1 │ Kitchen A   │ Active │ 150/day  │ ⋯       │
│    │ Address: .. │        │          │ • View  │
│    │ Staff: 8    │        │          │ • Edit  │
├────┼─────────────┼────────┼──────────┼─────────┤
│ K2 │ Kitchen B   │ Active │ 120/day  │ ⋯       │
│    │ Address: .. │        │          │ • View  │
│    │ Staff: 6    │        │          │ • Edit  │
└────┴─────────────┴────────┴──────────┴─────────┘
```

#### Vendor Performance Sub-page

Shows vendor quality metrics:

```
┌──────────────────────────────────────────────────┐
│  VENDOR: Fresh Meals → PERFORMANCE           [×]   │
├──────────────────────────────────────────────────┤
│                                                  │
│  PERFORMANCE CARDS                              │
├──────────────┬──────────────┬──────────────────┤
│ Food Quality │ Delivery Time│ Hygiene Score    │
│ 4.8/5        │ 28 min avg   │ 4.5/5            │
│ ↑ +0.2 this month            │ ↓ -0.1 this month│
├──────────────┼──────────────┼──────────────────┤
│ Customer     │ Order        │ Cancellation     │
│ Satisfaction │ Accuracy     │ Rate             │
│ 4.7/5        │ 99.2%        │ 0.8%             │
│ ↑ +0.1       │ ↑ +0.3%      │ ↓ -0.2%          │
└──────────────┴──────────────┴──────────────────┘

│  CHARTS                                         │
├─────────────────────────────────────────────────┤
│  [Line Chart: Quality Trend - Last 30 days]    │
│  [Bar Chart: Orders per day - Last 7 days]     │
│  [Gauge: Current performance rating]           │
│                                                  │
│  [Download Performance Report]                 │
└──────────────────────────────────────────────────┘
```

#### Vendor Settlement Sub-page

Financial settlement information:

```
┌──────────────────────────────────────────────────┐
│  VENDOR: Fresh Meals → SETTLEMENT            [×]   │
├──────────────────────────────────────────────────┤
│                                                  │
│  BANK DETAILS                                   │
│  ├─ Bank Name: Dhaka Bank                       │
│  ├─ Account Holder: Ahmed Hassan                │
│  ├─ Account Number: ••••••••1234                │
│  └─ Status: ✓ Verified                          │
│                                                  │
│  SETTLEMENT SUMMARY                             │
├──────────────────────────────────────────────────┤
│  Period: This Month (Jan 1 - Jan 31)            │
│  ├─ Total Orders: 256                           │
│  ├─ Gross Revenue: ৳1,52,000                    │
│  ├─ Platform Commission (15%): -৳22,800        │
│  ├─ Delivery Cost (Deducted): -৳28,400         │
│  ├─ Refunds: -৳2,800                           │
│  └─ Net Amount Due: ৳98,000                     │
│                                                  │
│  [Previous Period: Dec 15,000 (Settled)]       │
│  [Upcoming Payout: Jan 31]                      │
│                                                  │
│  [View Full History] [Manual Payout]           │
│  [Download Settlement Statement]               │
└──────────────────────────────────────────────────┘
```

#### 2.2 Onboarding Queue

**Purpose:** Review and approve new vendor applications.

```
┌──────────────────────────────────────────────────────┐
│         VENDOR ONBOARDING QUEUE                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Filter: Pending | Reviewing | Rejected]          │
│  Pending: 3 | Reviewing: 1 | Total: 4              │
│                                                      │
│  TABLE: APPLICATIONS                                │
├────┬────────────┬──────────┬──────────┬──────────┤
│ ID │ Company    │ Applied  │ Status   │ Actions  │
├────┼────────────┼──────────┼──────────┼──────────┤
│ A1 │ Spice House│ 1d ago   │ Pending  │ ⋯        │
│    │ Owner: ...  │          │ Documents│ • Review │
│    │ City: Dhaka │          │ Complete │ • Approve│
│    │             │          │          │ • Reject │
├────┼────────────┼──────────┼──────────┼──────────┤
│ A2 │ Green Bowl │ 3d ago   │ Reviewing│ ⋯        │
│    │ Owner: ...  │          │ In Review│ • Resume │
│    │ City: Dhaka │          │          │ • Reject │
└────┴────────────┴──────────┴──────────┴──────────┘
```

**Application Review Modal:**

```
┌─────────────────────────────────────────────┐
│  APPLICATION REVIEW: Spice House        [×]   │
├─────────────────────────────────────────────┤
│                                              │
│  COMPANY INFORMATION                        │
│  ├─ Company Name: Spice House Bangladesh   │
│  ├─ Registration: REG-2024-00200           │
│  ├─ Owner: Fatima Ahmed                    │
│  ├─ Email: fatima@spicehouse.bd            │
│  ├─ Phone: +880 1800 000000                │
│  └─ Address: Mirpur, Dhaka                 │
│                                              │
│  DOCUMENTS CHECKLIST                        │
│  ✓ Trade License                           │
│  ✓ Tax ID                                   │
│  ✓ Bank Account Verification               │
│  ✓ Food Safety Certificate                 │
│  ⊗ Health Department Approval (MISSING)    │
│                                              │
│  KITCHEN DETAILS                            │
│  └─ Kitchens: 1                             │
│     ├─ Capacity: 100/day                   │
│     ├─ Address: Mirpur                     │
│     └─ Staff: 5                             │
│                                              │
│  INITIAL FOODS: 12 items submitted         │
│  [View Foods] [View Documents]             │
│                                              │
│  NOTES:                                      │
│  [Admin note field..............]           │
│                                              │
│  [Approve] [Request More Info] [Reject]   │
└─────────────────────────────────────────────┘
```

#### 2.3 Vendor Blacklist

**Purpose:** Manage vendors with serious issues.

```
┌─────────────────────────────────────────────────┐
│         VENDOR BLACKLIST                        │
├─────────────────────────────────────────────────┤
│                                                  │
│  [+ Add to Blacklist] [Export]                  │
│                                                  │
│  TABLE: BLACKLISTED VENDORS                     │
├────┬──────────────┬──────────┬────────────────┤
│ ID │ Vendor       │ Reason   │ Blacklist Date │
├────┼──────────────┼──────────┼────────────────┤
│ B1 │ Bad Kitchen  │ Quality  │ Jan 15, 2024   │
│    │ Status: 🔴    │ Issues   │ Duration: ∞    │
├────┼──────────────┼──────────┼────────────────┤
│ B2 │ Late Foods   │ Chronic  │ Jan 10, 2024   │
│    │ Status: 🟡    │ Delays   │ Review: Jan 20 │
└────┴──────────────┴──────────┴────────────────┘
```

---

### 3. CUSTOMER MANAGEMENT

#### 3.1 Customers List

**Purpose:** View all customers, search, filter, manage profiles.

```
┌─────────────────────────────────────────────────┐
│          CUSTOMER MANAGEMENT                    │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Search: name/email/phone...] [Filter ▼]      │
│  Filters: Status | Subscription | City | Joined│
│  [+ Invite Customer] [Export] [Bulk Action]    │
│                                                  │
│  TABLE: CUSTOMERS                              │
├────┬──────────────┬─────────────┬─────────────┤
│ ID │ Customer     │ Subscription│ LTV         │
├────┼──────────────┼─────────────┼─────────────┤
│ C1 │ Ahmed Khan   │ Active      │ ৳24,500     │
│    │ Email: ...   │ 7-day plan  │ Orders: 12  │
│    │ Phone: ...   │ Expires: ... │ Joined: 2m  │
├────┼──────────────┼─────────────┼─────────────┤
│ C2 │ Farah Ali    │ Paused      │ ৳18,200     │
│    │ Email: ...   │ 10-day plan │ Orders: 8   │
│    │ Phone: ...   │ Resumes: .. │ Joined: 1m  │
└────┴──────────────┴─────────────┴─────────────┘
```

#### 3.2 Customer Details

```
┌────────────────────────────────────────────┐
│  CUSTOMER: Ahmed Khan               [×]     │
├────────────────────────────────────────────┤
│                                            │
│  TABS: [Profile] [Subscriptions] [Orders] │
│        [Wallet] [Refunds] [Activity]      │
│                                            │
│  PROFILE TAB                              │
│  ├─ Name: Ahmed Khan                      │
│  ├─ Email: ahmed@email.com                │
│  ├─ Phone: +880 1700 000000              │
│  ├─ City: Dhaka                           │
│  ├─ Joined: Feb 15, 2024                  │
│  ├─ Status: ✓ Active                      │
│  ├─ Total Orders: 32                      │
│  ├─ LTV: ৳24,500                          │
│  └─ Wallet Balance: ৳1,200                │
│                                            │
│  SUBSCRIPTIONS TAB                        │
│  ├─ Active: 1                             │
│  │  ├─ 7-day plan, ৳3,500/week            │
│  │  ├─ Status: Active                     │
│  │  ├─ Next Renewal: Feb 28               │
│  │  └─ [View Details] [Pause] [Cancel]   │
│  │                                        │
│  └─ Paused: 1                             │
│     ├─ 30-day plan, ৳12,000/month        │
│     ├─ Paused: Feb 1                      │
│     └─ [Resume]                           │
│                                            │
│  [Issue Refund] [Send Message]           │
└────────────────────────────────────────────┘
```

#### 3.3 Customer Segments

Segment customers for targeted campaigns:

```
┌──────────────────────────────────────────────┐
│        CUSTOMER SEGMENTS                     │
├──────────────────────────────────────────────┤
│                                              │
│  PREDEFINED SEGMENTS                        │
│  ├─ Active Subscribers: 8,234               │
│  │  └─ Subscriptions active, not paused    │
│  ├─ At-Risk (High Churn): 1,456            │
│  │  └─ No order in 7+ days                 │
│  ├─ VIP (LTV > ৳50,000): 324               │
│  │  └─ Highest value customers             │
│  ├─ Inactive: 2,134                         │
│  │  └─ No activity in 30+ days             │
│  └─ New (< 7 days): 456                    │
│     └─ Recently joined                      │
│                                              │
│  [+ Create Custom Segment]                 │
│                                              │
│  SEGMENT DETAILS (click to view)            │
│  ├─ Size                                    │
│  ├─ Demographics                            │
│  ├─ LTV Distribution                       │
│  ├─ Churn Rate                              │
│  └─ Actions: [View List] [Campaign]       │
└──────────────────────────────────────────────┘
```

#### 3.4 Refunds Management

```
┌────────────────────────────────────────────────┐
│         REFUND MANAGEMENT                      │
├────────────────────────────────────────────────┤
│                                                │
│  [Filter: Pending | Approved | Rejected]      │
│  Pending: 8 | Approved (7d): 42 | Total: 125  │
│                                                │
│  TABLE: REFUND REQUESTS                       │
├────┬──────────┬────────┬─────────┬───────────┤
│ ID │ Customer │ Amount │ Reason  │ Status    │
├────┼──────────┼────────┼─────────┼───────────┤
│ R1 │ Ahmed K. │ ৳2,800 │ Quality │ Pending   │
│    │ Order ID │        │ Issue   │ [Review] │
│    │ ORD-123  │        │         │ [Approve]│
├────┼──────────┼────────┼─────────┼───────────┤
│ R2 │ Farah A. │ ৳3,500 │ Delivery│ Approved  │
│    │ Order ID │        │ Late    │ [Process]│
│    │ ORD-124  │        │         │          │
└────┴──────────┴────────┴─────────┴───────────┘
```

---

### 4. ORDER MANAGEMENT

#### 4.1 All Orders

```
┌─────────────────────────────────────────────────┐
│            ORDER MANAGEMENT                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Search: Order ID/Customer...] [Filter ▼]     │
│  Filters: Status | Date | Vendor | Delivery    │
│  Quick Filters: [All] [Pending] [Confirmed]    │
│                 [In Kitchen] [Ready] [Transit]  │
│                 [Delivered] [Cancelled]         │
│                                                  │
│  TABLE: ORDERS                                  │
├───┬────────┬──────────┬────────┬───────┬──────┤
│ID │ Cust.  │ Items    │ Total  │ Status│ Act. │
├───┼────────┼──────────┼────────┼───────┼──────┤
│O1 │ Ahmed  │ 3 items  │ ৳1,850 │ ⏳    │ ⋯    │
│   │        │ Chicken, │        │Transit│ View │
│   │        │ Rice...  │        │(3 min)│ Cancel
├───┼────────┼──────────┼────────┼───────┼──────┤
│O2 │ Farah  │ 2 items  │ ৳1,200 │ ✓ Done│ ⋯    │
│   │        │ Salad... │        │       │ View │
└───┴────────┴──────────┴────────┴───────┴──────┘
```

#### 4.2 Order Details

```
┌────────────────────────────────────────┐
│  ORDER #ORD-2024-00456          [×]     │
├────────────────────────────────────────┤
│                                        │
│  STATUS: 🟡 In Kitchen (1:45 mins)   │
│                                        │
│  TIMELINE                              │
│  ├─ ✓ 1:00 PM - Order Placed          │
│  ├─ ✓ 1:05 PM - Confirmed             │
│  ├─ ✓ 1:10 PM - Assigned (Kitchen A)  │
│  ├─ 🟡 1:15 PM - In Preparation       │
│  ├─ ⊘ 2:00 PM - Ready for Pickup (exp)│
│  ├─ ⊘ In Transit                      │
│  └─ ⊘ Delivered                       │
│                                        │
│  CUSTOMER INFO                         │
│  ├─ Ahmed Khan                         │
│  ├─ Phone: +880 17XX XXX XXX          │
│  ├─ Address: Mirpur, Dhaka            │
│  └─ Delivery Addr: Same ^             │
│                                        │
│  ITEMS (3)                             │
│  ├─ Chicken Rice (1) = ৳800           │
│  ├─ Green Salad (1) = ৳400            │
│  └─ Mango Juice (1) = ৳250            │
│                                        │
│  PRICING                               │
│  ├─ Subtotal: ৳1,450                  │
│  ├─ Delivery: ৳200                    │
│  ├─ Discount: -৳200                   │
│  └─ Total: ৳1,450                     │
│                                        │
│  VENDOR: Kitchen Paradise              │
│  RIDER: (Not assigned yet)             │
│                                        │
│  [Assign Rider] [Cancel Order]        │
│  [Send Notification] [View Chat]      │
└────────────────────────────────────────┘
```

#### 4.3 Kitchen Queue

**Purpose:** Real-time order queue for kitchen staff.

```
┌────────────────────────────────────────────┐
│         KITCHEN QUEUE                      │
├────────────────────────────────────────────┤
│ [Vendor Filter ▼] [Kitchen Filter ▼]      │
│                                            │
│  QUEUED: 12 | IN PREP: 8 | READY: 5      │
│                                            │
│  IN PREPARATION                            │
│  ┌────────────────────────────────────┐   │
│  │ Order #ORD-00456                   │   │
│  │ 📋 Items: Chicken Rice x1          │   │
│  │ ⏱️  Started: 10 mins ago            │   │
│  │ 📍 Kitchen: Fresh Meals (A)        │   │
│  │ Status: Cooking pasta (2/3 done)   │   │
│  │ Est. Ready: 5 mins                 │   │
│  │ [Mark Ready] [Add Time]            │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Order #ORD-00457                   │   │
│  │ 📋 Items: Salad x2                 │   │
│  │ ⏱️  Started: 8 mins ago             │   │
│  │ 📍 Kitchen: Kitchen Paradise (B)   │   │
│  │ Status: Assembling (1/2 done)      │   │
│  │ Est. Ready: 8 mins                 │   │
│  │ [Mark Ready] [Add Time]            │   │
│  └────────────────────────────────────┘   │
│                                            │
│  QUEUED (Next to Prepare)                 │
│  1. Order #ORD-00458                      │
│  2. Order #ORD-00459                      │
│  [Show All 12]                            │
└────────────────────────────────────────────┘
```

---

### 5. DELIVERY MANAGEMENT

#### 5.1 Live Deliveries

**Purpose:** Real-time tracking of all active deliveries.

```
┌──────────────────────────────────────────────┐
│         LIVE DELIVERIES                      │
├──────────────────────────────────────────────┤
│                                              │
│  ACTIVE: 45 | COMPLETED (today): 213         │
│  SUCCESS RATE: 98.5%                         │
│                                              │
│  MAP VIEW [Map icon] | LIST VIEW [List icon]│
│                                              │
│  [Show Map with delivery locations]         │
│                                              │
│  DELIVERIES LIST                            │
│  ┌──────────────────────────────────────┐  │
│  │ Delivery #DEL-0001                   │  │
│  │ Rider: Kamal Khan (⭐ 4.8)           │  │
│  │ Customer: Ahmed Khan                 │  │
│  │ Order: ORD-456, 3 items              │  │
│  │ Status: 📍 En Route (5 mins left)    │  │
│  │ Location: Mirpur → Dhanmondi         │  │
│  │ [View Map] [Contact] [Cancel]        │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Delivery #DEL-0002                   │  │
│  │ Rider: Fatima Ahmed (⭐ 4.6)         │  │
│  │ Customer: Farah Ali                  │  │
│  │ Order: ORD-457, 2 items              │  │
│  │ Status: 🔔 Arriving (1 min)          │  │
│  │ Location: Gulshan → Motijheel        │  │
│  │ [View Map] [Contact] [Mark Done]     │  │
│  └──────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

#### 5.2 Riders Management

```
┌────────────────────────────────────────────┐
│        RIDER MANAGEMENT                    │
├────────────────────────────────────────────┤
│                                            │
│  [Filter: Active | Off-duty | Suspended] │
│  Total Riders: 287 | Active: 156         │
│                                            │
│  TABLE: RIDERS                            │
├────┬──────────┬────────┬────────┬──────┤
│ ID │ Rider    │ Rating │ Earn.  │ Act. │
├────┼──────────┼────────┼────────┼──────┤
│ R1 │ Kamal K. │ 4.8⭐  │ ৳15.2k │ ⋯    │
│    │ 5km away │ (234)  │ this m │ View │
│    │ Active   │        │        │ Assign
├────┼──────────┼────────┼────────┼──────┤
│ R2 │ Fatima A.│ 4.6⭐  │ ৳12.8k │ ⋯    │
│    │ 3km away │ (189)  │ this m │ View │
│    │ Active   │        │        │ Assign
└────┴──────────┴────────┴────────┴──────┘
```

#### 5.3 Routes & Optimization

```
┌──────────────────────────────────────────────┐
│      DELIVERY ROUTES & OPTIMIZATION          │
├──────────────────────────────────────────────┤
│                                              │
│  [Optimize Routes] [View All Routes]        │
│                                              │
│  ROUTE OPTIMIZATION SUGGESTION              │
│  Rider: Kamal Khan                         │
│  Current: 3 deliveries in 45 mins          │
│  Optimized: 4 deliveries in 42 mins        │
│  Efficiency Gain: +33% (3 mins saved)      │
│  [Apply Optimization]                       │
│                                              │
│  TOP RIDERS (by efficiency)                 │
│  1. Rider A: 8 deliveries, 95 mins         │
│  2. Rider B: 7 deliveries, 88 mins         │
│  3. Rider C: 6 deliveries, 75 mins         │
│                                              │
│  UNDERPERFORMING RIDERS                     │
│  1. Rider D: 3 deliveries, 120 mins        │
│  2. Rider E: 2 deliveries, 95 mins         │
│  [Provide Guidance] [Retrain]               │
└──────────────────────────────────────────────┘
```

---

### 6. PAYMENT & SETTLEMENT

#### 6.1 Transactions

```
┌─────────────────────────────────────────────┐
│         PAYMENT TRANSACTIONS                │
├─────────────────────────────────────────────┤
│                                              │
│  [Filter: All | Successful | Failed]        │
│  [Date Range] [Payment Method]              │
│  Total Revenue (Today): ৳45,63,500          │
│                                              │
│  TABLE: TRANSACTIONS                        │
├────┬──────┬────────┬──────────┬───────────┤
│ ID │ Cust │ Amount │ Method   │ Status    │
├────┼──────┼────────┼──────────┼───────────┤
│ T1 │ Ahmed│ ৳3,500 │ bKash    │ ✓ Success │
│    │      │        │ (1701...)│ Time: 2:15│
├────┼──────┼────────┼──────────┼───────────┤
│ T2 │ Farah│ ৳2,800 │ Card     │ ✗ Failed  │
│    │      │        │ Visa     │ Retry: 3x │
└────┴──────┴────────┴──────────┴───────────┘
```

#### 6.2 Vendor Settlement

```
┌────────────────────────────────────────────┐
│       VENDOR SETTLEMENT                    │
├────────────────────────────────────────────┤
│                                            │
│  Settlement Period: Jan 1 - Jan 31, 2024  │
│                                            │
│  TABLE: SETTLEMENT REPORT                 │
├────┬──────────┬─────────┬──────┬─────────┤
│ ID │ Vendor   │ Orders  │ Due  │ Status  │
├────┼──────────┼─────────┼──────┼─────────┤
│ S1 │ Fresh M. │ 256     │ ৳98k │ Pending │
│    │          │ Rev: 1.5M      │ [Pay]   │
├────┼──────────┼─────────┼──────┼─────────┤
│ S2 │ Paradise │ 312     │ ৳125k│ Pending │
│    │          │ Rev: 1.9M      │ [Pay]   │
└────┴──────────┴─────────┴──────┴─────────┘

│  [Bulk Settlement] [Export] [Payment History]
└────────────────────────────────────────────┘
```

---

### 7. MARKETING

#### 7.1 Campaigns

```
┌────────────────────────────────────────────┐
│          MARKETING CAMPAIGNS               │
├────────────────────────────────────────────┤
│                                            │
│  [+ Create Campaign] [Templates]           │
│  [Filter: Active | Scheduled | Ended]      │
│                                            │
│  ACTIVE CAMPAIGNS                          │
│  ┌──────────────────────────────────────┐ │
│  │ Campaign: "Summer Salad Promo"       │ │
│  │ Status: 🟢 Active                    │ │
│  │ Type: Discount (15% off)             │ │
│  │ Target: All users                    │ │
│  │ Duration: Jan 1 - Jan 15             │ │
│  │ Stats:                               │ │
│  │  • Impressions: 45,234               │ │
│  │  • Clicks: 8,234                     │ │
│  │  • Conversion: 12.3% (1,013)         │ │
│  │  • Revenue: ৳5,65,000                │ │
│  │ [Edit] [Pause] [View Details]       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  SCHEDULED CAMPAIGNS                      │
│  • "Health Month" - Starts Feb 1          │
│  • "New Vendor Launch" - Starts Feb 5     │
└────────────────────────────────────────────┘
```

#### 7.2 Coupons & Discounts

```
┌────────────────────────────────────────────┐
│       COUPONS & DISCOUNTS                  │
├────────────────────────────────────────────┤
│                                            │
│  [+ Create Coupon] [Bulk Upload]           │
│  [Filter: Active | Scheduled | Expired]    │
│                                            │
│  TABLE: COUPONS                            │
├───┬──────┬────────┬───────────┬──────────┤
│ID │ Code │ Discount│ Used      │ Status   │
├───┼──────┼────────┼───────────┼──────────┤
│C1 │SUMMER│ 20% off │ 456/1000 │ Active   │
│   │      │ Max ৳500│ ৳2,28,000│ Ends: 15d│
├───┼──────┼────────┼───────────┼──────────┤
│C2 │NEW50 │ ৳500 off│ 234/500  │ Active   │
│   │      │ Min ৳2k │ ৳1,17,000│ Ends: 7d │
└───┴──────┴────────┴───────────┴──────────┘
```

---

### 8. SUPPORT & TICKETS

#### 8.1 Support Tickets

```
┌────────────────────────────────────────────┐
│        SUPPORT TICKETS                     │
├────────────────────────────────────────────┤
│                                            │
│  [Filter: Open | In Progress | Resolved]  │
│  [Priority: High | Medium | Low]           │
│  Open: 23 | In Progress: 8 | Resolved: 156│
│                                            │
│  URGENT TICKETS (High Priority)            │
│  ┌──────────────────────────────────────┐ │
│  │ Ticket #TKT-0089                     │ │
│  │ Customer: Ahmed Khan                 │ │
│  │ Subject: Order not delivered         │ │
│  │ Priority: 🔴 HIGH                    │ │
│  │ Status: 🟡 In Progress               │ │
│  │ Created: 2 hours ago                 │ │
│  │ Assigned: Fatima (Support)           │ │
│  │ [View Details] [Resolve]             │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  OPEN TICKETS                              │
│  1. Ticket #TKT-0090 (1 hour ago)         │
│  2. Ticket #TKT-0091 (45 mins ago)        │
│  [Show All 23]                             │
└────────────────────────────────────────────┘
```

#### 8.2 Ticket Details

```
┌─────────────────────────────────────────┐
│  TICKET #TKT-0089                   [×]   │
├─────────────────────────────────────────┤
│                                         │
│  Customer: Ahmed Khan                  │
│  Subject: Order never arrived          │
│  Priority: 🔴 HIGH                     │
│  Status: 🟡 In Progress                │
│  Created: Jan 15, 3:45 PM              │
│  Assigned: Fatima Ahmed (Support Agent)│
│                                         │
│  ORDER INFO                             │
│  └─ Order ID: ORD-456                  │
│     Amount: ৳1,850                     │
│     Date: Jan 15, 3:00 PM              │
│     Status: Marked Delivered (system)  │
│     Rider: Kamal Khan                  │
│                                         │
│  CONVERSATION                           │
│  ├─ Customer (3:45 PM): "My order never│
│  │  came. Rider said he delivered but  │
│  │  I was home all day!"               │
│  │                                     │
│  ├─ Support (3:50 PM): "I'm checking   │
│  │  this. Let me contact the rider."   │
│  │                                     │
│  ├─ Support (4:15 PM): "Rider confirms │
│  │  he left at front door. Can you      │
│  │  check?"                            │
│  │                                     │
│  └─ [Reply field.........................]│
│                                         │
│  ACTIONS                                │
│  [Issue Refund] [Check Rider Location] │
│  [Mark Resolved] [Escalate]            │
└─────────────────────────────────────────┘
```

---

### 9. FOOD MANAGEMENT

#### 9.1 Food Items

```
┌────────────────────────────────────────────┐
│         FOOD MANAGEMENT                    │
├────────────────────────────────────────────┤
│                                            │
│  [+ Add Food] [Import CSV]                │
│  [Filter: Approved | Pending | Rejected]  │
│  [Category Filter] [Vendor Filter]        │
│  Approved: 2,345 | Pending: 34            │
│                                            │
│  TABLE: FOODS                              │
├────┬────────┬────────┬────────┬──────────┤
│ ID │ Food   │ Vendor │ Price  │ Status   │
├────┼────────┼────────┼────────┼──────────┤
│ F1 │ Chicken│ Fresh  │ ৳250   │ ✓Approved│
│    │ Rice   │ Meals  │        │          │
├────┼────────┼────────┼────────┼──────────┤
│ F2 │ Prawn  │ Spice  │ ৳350   │ 🟡 Pend. │
│    │ Curry  │ House  │        │ [Review] │
└────┴────────┴────────┴────────┴──────────┘
```

#### 9.2 Food Details

```
┌────────────────────────────────────────┐
│  FOOD ITEM: Chicken Rice           [×]   │
├────────────────────────────────────────┤
│                                        │
│  [Image: Chicken Rice dish]            │
│                                        │
│  Name: Chicken Rice                   │
│  Category: Main Course                │
│  Vendor: Fresh Meals                  │
│  Price: ৳250                          │
│  Cooking Time: 15 mins                │
│  Availability: ✓ Available            │
│  Status: ✓ Approved                   │
│                                        │
│  NUTRITION (per serving)              │
│  ├─ Calories: 480 kcal                │
│  ├─ Protein: 25g                      │
│  ├─ Carbs: 45g                        │
│  ├─ Fat: 12g                          │
│  └─ Fiber: 2g                         │
│                                        │
│  DESCRIPTION                          │
│  "Delicious grilled chicken with      │
│   fragrant basmati rice, served       │
│   with seasonal vegetables."          │
│                                        │
│  REVIEWS: 4.8/5 (234 reviews)        │
│  TIMES ORDERED: 2,456                 │
│                                        │
│  [Edit] [Deactivate] [View Reviews]  │
│  [Reject] [Approve] [Request Changes] │
└────────────────────────────────────────┘
```

#### 9.3 Meal Plans

```
┌────────────────────────────────────────┐
│        MEAL PLANS MANAGEMENT           │
├────────────────────────────────────────┤
│                                        │
│  [+ Create Plan] [Templates]           │
│                                        │
│  PREDEFINED PLANS                      │
│  ┌──────────────────────────────────┐ │
│  │ Plan: "7-Day Healthy"            │ │
│  │ Price: ৳3,500/week               │ │
│  │ Foods: 21 items (breakfast,      │ │
│  │        lunch, dinner daily)      │ │
│  │ Subscribers: 4,234               │ │
│  │ [View] [Edit] [Analytics]        │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ Plan: "30-Day Premium"           │ │
│  │ Price: ৳14,000/month             │ │
│  │ Foods: 90 items (curated)        │ │
│  │ Subscribers: 2,567               │ │
│  │ [View] [Edit] [Analytics]        │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

### 10. ANALYTICS & REPORTS

#### 10.1 Analytics Dashboard

```
┌──────────────────────────────────────────────┐
│        ANALYTICS & BUSINESS INTELLIGENCE    │
├──────────────────────────────────────────────┤
│                                              │
│  [Date Range: This Month] [Compare Period]  │
│  [Export Report] [Download CSV]             │
│                                              │
│  KPI CARDS                                  │
│  ├─ Total Revenue: ৳45,63,500 (+12%)       │
│  ├─ Orders: 2,456 (+8%)                    │
│  ├─ Customers: 12,340 (+15%)               │
│  ├─ Avg AOV: ৳1,856 (+4%)                  │
│  └─ Churn Rate: 2.3% (-0.5%)               │
│                                              │
│  CHARTS                                     │
│  ├─ Revenue by Day (Line Chart)            │
│  ├─ Orders by Hour (Bar Chart)             │
│  ├─ Vendor Performance (Pie Chart)         │
│  ├─ Delivery Stats (Gauge Chart)           │
│  ├─ Customer Growth (Area Chart)           │
│  └─ Payment Methods (Donut Chart)          │
│                                              │
│  [View Detailed Reports] [Create Custom]   │
└──────────────────────────────────────────────┘
```

#### 10.2 Report Types

**Available Reports:**
- Sales Reports (daily/weekly/monthly)
- Revenue Reports (by vendor, city, time)
- Customer Analytics (acquisition, retention, LTV)
- Vendor Performance (ratings, orders, revenue)
- Rider Analytics (deliveries, earnings, ratings)
- Delivery Analytics (on-time %, cost, efficiency)
- Payment Reports (success rate, refunds, methods)
- Subscription Reports (active, churn, retention)
- Marketing ROI (campaigns, coupons, referrals)
- Tax & Compliance Reports

---

### 11. SETTINGS & CONFIGURATION

#### 11.1 General Settings

```
┌────────────────────────────────────────────┐
│          GENERAL SETTINGS                  │
├────────────────────────────────────────────┤
│                                            │
│  PLATFORM SETTINGS                        │
│  ├─ Platform Name: FONDO                  │
│  ├─ Support Email: support@fondo.bd       │
│  ├─ Support Phone: +880 1XXX XXXXXX      │
│  ├─ Timezone: Asia/Dhaka                  │
│  ├─ Currency: BDT (৳)                     │
│  └─ Language: Bengali, English             │
│                                            │
│  DELIVERY SETTINGS                        │
│  ├─ Default Delivery Fee: ৳50              │
│  ├─ Free Delivery Above: ৳2,000            │
│  ├─ Average Delivery Time: 25 mins        │
│  ├─ Service Areas: [City List]            │
│  └─ Operating Hours: 6 AM - 11 PM        │
│                                            │
│  PAYMENT SETTINGS                         │
│  ├─ Accepted Methods: [List]              │
│  ├─ Advance Payment Required: ✓           │
│  ├─ Platform Commission: 15%              │
│  ├─ Min Settlement Amount: ৳1,000         │
│  └─ Settlement Frequency: Weekly          │
│                                            │
│  [Save Changes] [Reset to Default]        │
└────────────────────────────────────────────┘
```

#### 11.2 User Management (Super Admin)

```
┌────────────────────────────────────────────┐
│         ADMIN USER MANAGEMENT              │
├────────────────────────────────────────────┤
│                                            │
│  [+ Add Admin User] [Import]               │
│                                            │
│  TABLE: ADMIN USERS                       │
├────┬──────────┬──────────┬───────────────┤
│ ID │ Name     │ Role     │ Status        │
├────┼──────────┼──────────┼───────────────┤
│ A1 │ John Doe │ Super    │ ✓ Active      │
│    │ john@... │ Admin    │ Last: 5 mins  │
├────┼──────────┼──────────┼───────────────┤
│ A2 │ Jane Sm. │ Admin    │ ✓ Active      │
│    │ jane@... │          │ Last: 1 hour  │
└────┴──────────┴──────────┴───────────────┘

│  [+ Invite Admin] [Remove User] [Edit Role]
└────────────────────────────────────────────┘
```

#### 11.3 Roles & Permissions

```
┌────────────────────────────────────────────┐
│       ROLES & PERMISSIONS                  │
├────────────────────────────────────────────┤
│                                            │
│  [+ Create Role] [Manage Permissions]     │
│                                            │
│  ROLE: "Admin"                            │
│  ├─ Vendor Management: ✓ View, ✓ Edit    │
│  ├─ Customer Management: ✓ View, ✓ Refund│
│  ├─ Order Management: ✓ View, ✓ Cancel   │
│  ├─ Analytics: ✓ View                     │
│  ├─ Settings: ✗ Denied                    │
│  └─ User Management: ✗ Denied             │
│                                            │
│  [Edit Role] [Delete Role] [Duplicate]    │
└────────────────────────────────────────────┘
```

---

## Sidebar Navigation Map

### Collapsed View (Icons Only)
```
📊 Dashboard
👥 Vendors
👤 Customers
📦 Orders
🚚 Delivery
💳 Payment
📊 Marketing
💬 Support
📋 Food
📈 Analytics
⚙️ Settings
🔐 Account
```

### Expanded View (Full Labels)
```
Dashboard
├─ Home
├─ Analytics Overview
└─ Quick Stats

Vendor Management
├─ Vendors List
├─ Onboarding
├─ Performance
├─ Settlements
├─ Vendor Tickets
└─ Blacklist

Customer Management
├─ Customers List
├─ Subscriptions
├─ Wallet & Credits
├─ Refunds
└─ Segments

Order Management
├─ All Orders
├─ By Status
├─ Kitchen Queue
└─ Order Analytics

Delivery Management
├─ Live Deliveries
├─ Riders List
├─ Routes & Optimization
├─ Performance Metrics
├─ Issues & Resolutions
└─ Rider Earnings

Payment & Settlement
├─ Transactions
├─ Refunds
├─ Vendor Settlements
├─ Payment Methods
├─ Failed Payments
└─ Financial Reports

Marketing
├─ Campaigns
├─ Coupons & Discounts
├─ Referral Program
├─ Loyalty Program
├─ Email Marketing
└─ Performance Analytics

Support
├─ Support Tickets
├─ Chat Management
├─ Escalations
├─ FAQs
├─ Feedback Analysis
└─ Knowledge Base

Food Management
├─ Food Items
├─ Categories
├─ Meal Plans
├─ Packages
├─ Nutrition Data
├─ Approval Queue
└─ Inventory

Analytics & Reports
├─ Dashboard
├─ Sales Reports
├─ Revenue Reports
├─ Customer Analytics
├─ Vendor Analytics
├─ Rider Analytics
├─ Delivery Analytics
├─ Custom Reports
└─ Data Export

Settings
├─ General Settings
├─ User Management
├─ Roles & Permissions
├─ System Configuration
├─ Payment Gateway
├─ SMS & Email
├─ Notifications
└─ Backup & Restore

CMS (Collapsible)
├─ Banners
├─ Pages
├─ Announcements
└─ Terms & Conditions

System (Collapsible)
├─ Maintenance Mode
├─ Feature Toggles
├─ System Logs
├─ Error Logs
├─ API Monitoring
└─ Database Health

Admin Account
├─ Profile
├─ Change Password
├─ Activity Log
├─ Logout
└─ Support
```

---

## Component Library

### Reusable Components

#### Card Component
```
┌─────────────────────┐
│ CARD TITLE          │
├─────────────────────┤
│ Card content here   │
│                     │
│ [Action Button]     │
└─────────────────────┘
```

#### Table Component
```
┌────┬──────┬──────┬──────┐
│ ID │ Name │ Rate │ Actn │
├────┼──────┼──────┼──────┤
│ 1  │ Item │ 4.5  │  ⋯   │
└────┴──────┴──────┴──────┘
```

#### Filter Component
```
[Filter ▼] [Sort ▼] [Search box] [Export] [Refresh]
```

#### Status Badges
```
✓ Active (Green)
🟡 Pending (Yellow)
✗ Failed (Red)
⚪ Inactive (Gray)
```

#### Progress Indicators
```
[████████░░] 80%
```

#### Charts
- Line Charts (trends)
- Bar Charts (comparison)
- Pie Charts (distribution)
- Gauge Charts (KPIs)
- Area Charts (volume)
- Donut Charts (proportions)

---

## Data Flow & APIs

### Key Admin APIs

#### 1. **Dashboard Overview**
```
GET /api/admin/dashboard/overview
Response:
{
  "revenue": 45635500,
  "orders": 2456,
  "customers": 12340,
  "vendors": 127,
  "charts": {...}
}
```

#### 2. **Vendor Management**
```
GET /api/admin/vendors
POST /api/admin/vendors
GET /api/admin/vendors/:id
PATCH /api/admin/vendors/:id
DELETE /api/admin/vendors/:id
```

#### 3. **Order Management**
```
GET /api/admin/orders
PATCH /api/admin/orders/:id/status
DELETE /api/admin/orders/:id
```

#### 4. **Payment Processing**
```
GET /api/admin/payments
POST /api/admin/refunds
GET /api/admin/settlements
```

#### 5. **Analytics**
```
GET /api/admin/analytics/revenue
GET /api/admin/analytics/customers
GET /api/admin/analytics/vendors
GET /api/admin/analytics/custom
```

---

## Permissions & Access Control

### Admin Roles

```
SUPER ADMIN
├─ All Permissions
├─ User Management
├─ System Settings
├─ Financial Settlement
└─ Data Access: Full

ADMIN
├─ Vendor Management
├─ Customer Management
├─ Order Management
├─ Delivery Management
├─ Basic Analytics
└─ Data Access: All except Finance

MODERATOR
├─ Customer Support
├─ Order Resolution
├─ Refund Processing
├─ Content Moderation
└─ Data Access: Assigned tickets/orders

ANALYST
├─ Analytics Viewing
├─ Report Generation
├─ Data Export
└─ Data Access: Read-only
```

---

## UI/UX Design Guidelines

### Color Scheme
- Primary: #1E3A8A (Dark Blue)
- Success: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)
- Neutral: #6B7280 (Gray)

### Typography
- Headings: Bold, 20-32px
- Body Text: Regular, 14-16px
- Buttons: Medium, 14px
- Status: Small, 12px

### Spacing
- Padding: 8px, 16px, 24px
- Margin: 16px, 24px, 32px
- Gap: 12px, 16px

### Responsive Design
- Desktop: Full sidebar, expanded tables
- Tablet: Collapsible sidebar, adjusted tables
- Mobile: Hamburger menu, card-based layout

---

## Development Priorities

### Phase 1: Core Dashboard
- Home Dashboard
- Vendor Management
- Customer Management
- Order Management

### Phase 2: Operations
- Delivery Management
- Kitchen Queue
- Payment Management

### Phase 3: Analytics
- Analytics Dashboard
- Reports
- Insights

### Phase 4: Advanced
- Marketing
- Support
- Settings
- AI-powered recommendations

---

**End of Admin Dashboard Specification**

*This document provides complete guidance for implementing the FONDO Admin Dashboard. Each page includes cards, tables, subpages, workflows, and user actions.*