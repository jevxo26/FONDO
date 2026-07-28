# 🍱 FONDO — Centralized Subscription Food Delivery Platform

FONDO is a centralized subscription food delivery marketplace built with Next.js 16 (App Router), Express 5 custom server, Prisma 6, and Neon PostgreSQL.

---

## 📌 1. Project Overview & Business Model
- **Centralized Marketplace**: Customers subscribe or order food transparently without direct vendor exposure; admin manages vendors seamlessly behind the scenes.
- **8 RBAC System Roles**: Super Admin, Admin, Vendor, Vendor Staff, Kitchen Staff, Rider, Customer, Support Agent.
- **Tech Stack**:
  - **Frontend**: Next.js 16 (App Router), React 19, Redux Toolkit, TanStack Query, Tailwind CSS v4, shadcn/ui (`base-nova`).
  - **Backend**: Express 5 Custom Server, Node.js, Prisma ORM 6.19.3.
  - **Database**: PostgreSQL (Neon Cloud DB).

---

## 🛠️ 2. Comprehensive Modifications & Optimizations (যা যা পরিবর্তন ও অপটিমাইজ করা হয়েছে)

### 📂 A. Modified Files List:
1. **`src/app/(main)/page.tsx`**:
   - Added `try-catch` wrapper on server-side `apiFetch` for `/api/foods` & `/api/foods/categories/list`.
   - Integrated automatic fallback to `CATEGORY_CARDS` from `src/data/homepage.ts` if backend is slow/offline.
2. **`src/app/dashboard/admin/page.tsx`**:
   - Converted to client component connected with `useGetOrdersQuery` for real-time overview stats & revenue metrics.
3. **`src/app/dashboard/vendor/page.tsx`**:
   - Connected stats to live RTK Query hooks (`useGetOrdersQuery`, `useGetFoodsQuery`) with smooth loading spinners.
4. **`src/app/dashboard/kitchen/page.tsx`**:
   - Transformed into a real-time Kitchen Display System (KDS).
   - State transition buttons (`QUEUED` ➔ `PREPARING` ➔ `READY`) synced with backend status mutations (`updateOrderStatus`) + offline fallback.
5. **`src/app/dashboard/rider/page.tsx`**:
   - Dynamic rider order listing connected to `useGetOrdersQuery`.
   - Real-time total daily earnings & delivery fee calculator.
6. **`server/lib/prisma.ts`**:
   - Implemented `globalThis` singleton pattern to prevent database connection pool exhaustion in serverless & dev environments.
7. **`next.config.ts`**:
   - Configured `turbopack.root = path.resolve(__dirname)` to resolve workspace root compilation warnings.
8. **`tsconfig.server.json`**:
   - Upgraded `moduleResolution` to `node16` for modern TypeScript compatibility.
9. **`package.json`**:
   - Added project-level Prisma scripts (`npm run prisma:push`, `npm run prisma:generate`, `npm run prisma:migrate`) to fix CLI version mismatches.
10. **`.env` & `.env.example`**:
    - Embedded production Neon DB PostgreSQL connection string with SSL & connection pooling configuration.

---

## 🚀 3. Getting Started

### Prerequisites
- Node.js >= 20.x
- pnpm / npm
- Neon PostgreSQL Database

### Command Cheat Sheet

| Command | Description |
|---|---|
| `npm run dev` | Starts Express 5 + Next.js Turbopack development server on port `3000`. |
| `npm run build` | Builds Next.js production bundle and compiles server TS code. |
| `npm run start` | Runs the compiled production server (`NODE_ENV=production node dist/server/index.js`). |
| `npm run prisma:push` | Pushes Prisma schema changes directly to Neon PostgreSQL. |
| `npm run prisma:generate` | Generates Prisma Client. |
| `npm run prisma:migrate` | Runs database migrations against PostgreSQL. |
| `npm run lint` | Runs ESLint code quality check. |
| `npm run format` | Runs Prettier code formatting across `src/` and `server/`. |

---

## 📋 4. Pending Features & Future Roadmap (কী কি কাজ বাকি আছে)

| Feature / Module | Description | Status |
|---|---|---|
| **Live WebSocket Push** | Real-time push notifications for live order status updates on Rider & Kitchen KDS. | ⏳ Planned |
| **SSLCommerz Live Gateway** | Complete live payment callback verification & webhook handling. | 🛠️ In Progress |
| **Comprehensive Test Suite** | Integration tests with Vitest/Playwright for full E2E user checkout. | ⏳ Planned |
| **Advanced Analytics PDF Export** | Admin financial report export feature in PDF/Excel format. | ⏳ Planned |

---

## 📁 5. Repository Architecture
```
FONDO/
├── src/                    # Next.js 16 App Router (Frontend)
│   ├── app/                # (main) = Customer App, dashboard/ = Multi-role Dashboards
│   ├── components/         # Feature components (<100 lines per file)
│   ├── data/               # Fallback static datasets
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API client, tokens, utilities
│   ├── store/              # Redux Toolkit & RTK Query slices
│   └── types/              # Domain TypeScript types
├── server/                 # Express 5 Custom Server
│   ├── controllers/        # Express route handlers
│   ├── middlewares/        # Auth, JWT, validation middlewares
│   ├── routes/             # REST API endpoints (/api/*)
│   └── services/           # Prisma DB queries & business logic
├── prisma/
│   └── schema.prisma       # PostgreSQL Database Schema
└── README.md               # Project Documentation
```
