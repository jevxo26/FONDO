<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FONDO — Subscription Food Delivery Platform

**Business model:** Centralized marketplace — customers never see the vendor, admin switches vendors transparently. See `docs/FONDO – Complete System Workflow.md` for the full PRD (~6,300 lines covering all modules, data models, and business flows).

**8 roles:** Super Admin, Admin, Vendor, Vendor Staff, Kitchen Staff, Rider, Customer, Support Agent

**Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Express 5 (custom server), Prisma (PostgreSQL via Neon), Redux Toolkit, TanStack Query, Tailwind CSS v4, shadcn/ui (style: `base-nova`)

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | `nodemon --watch server --watch tsconfig.server.json --ext ts --ts-node --project tsconfig.server.json server/index.ts` — Express 5 + Next.js turbopack on port 3000. **NOT** `next dev`. |
| `npm run build` | `next build && tsc --project tsconfig.server.json` → outputs `dist/` |
| `npm run start` | `NODE_ENV=production node dist/server/index.js` |
| `npm run lint` | `eslint` |
| `npm run format` | `prettier --write "{src,server}/**/*.{ts,tsx,js,jsx,json}"` |
| `npx prisma generate` | Generate Prisma client after schema changes |
| `npx prisma migrate dev` | Run migrations against PostgreSQL |
| `npx shadcn@latest add @shadcn/<name>` | Add shadcn component (style: `base-nova`) |

## Architecture

```
src/                  # Next.js 16 App Router (frontend only)
  app/                # Route groups: (main)/ = customer-facing, dashboard/ = admin
  components/{feature}/{name}/   # Feature-based, <100 lines per file
  components/ui/      # shadcn components (22 installed)
  components/common/  # Shared: cards, rating-stars, section-header, table/
  data/{domain}.ts    # Static data, constants, types (never hardcode in components)
  store/              # Redux Toolkit (store.ts, slices/)
  lib/utils.ts        # cn() helper
  hooks/              # Custom hooks
  types/              # Shared TypeScript types

server/               # Express 5 custom server (NOT in src/)
  index.ts            # Entrypoint: Express + Next.js hybrid, Prisma connect
  controllers/        # Route handlers
  services/           # Business logic
  middlewares/        # authMiddleware.ts
  routes/             # /api/* routes (user, food, auth, addon, category, tag, variant)
  validations/        # Input validation (express-validator)
  utils/              # catchAsync, sendResponse, bcrypt, responseStyle

prisma/
  schema.prisma       # PostgreSQL schema (currently: User, Category, SubCategory, Food)
  migrations/         # 3 migrations (url_added, role_added, user_updated)
```

**API routes** are mounted at `/api/*` in `server/index.ts`. All other routes pass through to Next.js.

## Conventions

### Components
- **<100 lines** per file — split if bigger
- **UI only** — no data fetching or business logic
- **Server-first** — `"use client"` only for hooks, event handlers, browser APIs

### State
- **Redux Toolkit** for global state (auth, cart, UI) — slices in `store/slices/`
- **TanStack Query** for server state (not yet wired)
- Typed hooks: `useAppDispatch`, `useAppSelector` from `@/store/store`

### CSS
- Tailwind CSS v4 with CSS variables in `globals.css`
- `cn()` from `@/lib/utils` for conditional classes
- Container: `<div className="wrapper">` — max-width 1440px, responsive padding
- Use `@utility` for reusable classes; never hardcode hex values
- Full design system reference: `DESIGN.md` (tokens, shadows, radius, dark mode, component palette)

### Icons
- **Lucide icons** — import from `lucide-react`

### Data & Imports
- Static data in `src/data/` — one file per domain (foods, orders, vendors, etc.)
- Import with `@/` alias: `@/components/`, `@/store/`, `@/data/`, `@/lib/`
- Sibling imports: `./file`, `../dir/file`

### Mock Data
- All mock data uses **seeded PRNG** — never `Math.random()`
- Pattern: `export const rand = seededRandom(N)` → `rand()` throughout
- Prevents SSR hydration mismatches

### Reusable Components
- Check `src/components/ui/` (shadcn) before building custom
- Common patterns: `src/components/common/`
- DataTable at `src/components/common/table/` — uses TanStack Table

### Naming
| Category | Convention | Example |
|---|---|---|
| Files | kebab-case | `order-columns.tsx` |
| Components | PascalCase | `OrderStatusBadge` |
| Functions | camelCase | `generateOrders` |
| Types | PascalCase | `CustomerOrder` |
| Data files | camelCase | `orders.ts` |
| Dirs | kebab-case | `common/table/` |

### Fonts (from code, not design doc)
- **Fraunces** (serif) for headings — loaded in `layout.tsx`
- **Inter** (sans-serif) for UI

## Known Gaps

- **No test framework** — no jest/vitest in `package.json`, no test files exist. Tests are not yet set up.
- **Prisma schema is partial** — only User, Category, SubCategory, Food models exist. Full schema spec is in `docs/FONDO – Complete System Workflow.md`.
- **TanStack Query not wired** — `@tanstack/react-query` is in deps but no QueryClientProvider found in layout.
- **Some server routes are commented out** — auth, upload routes exist but are disabled in `server/index.ts`.
