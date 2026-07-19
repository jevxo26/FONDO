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
| `npx prisma studio` | Open Prisma Studio to browse data |
| `npx shadcn@latest add @shadcn/<name>` | Add shadcn component (style: `base-nova`) |

## Architecture

```
src/                  # Next.js 16 App Router (frontend only)
  app/                # Route groups: (main)/ = customer-facing, dashboard/ = admin
  components/{feature}/{name}/   # Feature-based, <100 lines per file
  components/ui/      # shadcn components
  components/common/  # Shared: cards, table/, section-header
  data/{domain}.ts    # Static data, constants
  store/              # Redux Toolkit (store.ts, slices/)
  lib/                # Utilities: api-client, query-client, token, utils
  hooks/              # Custom React hooks
  types/              # Shared TypeScript types (one file per domain)

server/               # Express 5 custom server (NOT in src/)
  index.ts            # Entrypoint: Express + Next.js hybrid, Prisma connect
  controllers/        # Route handlers
  services/           # Business logic (Prisma queries)
  middlewares/        # verifyToken, authorize, validate
  routes/             # /api/* route definitions
  validations/        # Yup/express-validator schemas (one per domain)
  utils/              # catchAsync, sendResponse, AppError, pagination

prisma/
  schema.prisma       # PostgreSQL schema (30+ models)
  migrations/         # 9 migrations
```

**API routes** mounted at `/api/auth`, `/api/users`, `/api/foods`, `/api/cart`, `/api/orders`, `/api/admin/*` in `server/index.ts`. All other routes pass through to Next.js.

## Conventions

### Components
- **<100 lines** per file — split if bigger
- **UI only** — no data fetching or business logic
- **Server-first** — `"use client"` only for hooks, event handlers, browser APIs

### State
- **Redux Toolkit** for global state (auth, cart/UI/mutations) — slices in `store/slices/`
- **TanStack Query** for server state (Provider in `components/providers/query-provider.tsx`)
- Typed hooks: `useAppDispatch`, `useAppSelector` from `@/store/store`

### CSS
- Tailwind CSS v4 with CSS variables in `globals.css`
- `cn()` from `@/lib/utils` for conditional classes
- Container: `<div className="wrapper">` — max-width 1440px, responsive padding
- Use `@utility` for reusable classes; never hardcode hex values
- Full design system reference: `DESIGN.md` (tokens, shadows, radius, dark mode, component palette)

### Icons
- **Lucide icons** — import from `lucide-react`

### API Client
- Axios instance at `src/lib/api-client.ts`, base URL `/api`, auto-attaches JWT Bearer token
- Response envelope: `{ success, message, data }` — client unwraps to `data` directly
- Methods: `api.get<T>(url)`, `api.post<T>(url, body?)`, `api.patch<T>(url, body)`, `api.delete<T>(url)`
- `T` = response type from `src/types/` (e.g., `api.get<Cart>("/cart")`)
- Errors throw `ApiError(statusCode, message)` — use `handleApiError(error)` for user messages
- 401 auto-triggers `/auth/refresh`, queues concurrent failed requests

### Data Fetching (TanStack Query)
- Query keys are plain strings per domain (`["cart"]`, `["favorites"]`, `["foods"]`, `["orders"]`)
- Use `staleTime` on infrequent-data queries to avoid connection pool exhaustion
- Mutation hooks own `onSuccess`/`onError` — toast + Redux dispatch inside hook
- Components only call `mutate(data)` and read `isPending` for loading
- Do NOT pass inline `onSuccess`/`onError` to `mutate()` in components (exception: redirect)

### Loading States
- Buttons: `disabled={isPending}`, icon swaps to `<Loader2 className="animate-spin" />`
- Click handlers: `if (isPending) return` guard prevents double-fire before re-render
- Per-item loading: track pending IDs in `Set<string>` state
- Full-page loading: `isLoading && !data` pattern

### Types
- All shared TypeScript types in `src/types/{domain}.ts` (e.g., `food.ts`, `cart.ts`, `order.ts`)
- Never inline types inside hooks, components, or data files
- Import: `import type { Food } from "@/types/food"`

### Validations (Backend)
- Yup/express-validator schemas in `server/validations/{domain}.validation.ts`
- One file per domain (cart, order, food, user, etc.)
- Mounted via `validate(schema)` middleware in route definitions

### Data & Imports
- Static data in `src/data/{domain}.ts` — one file per domain
- Import with `@/` alias: `@/components/`, `@/store/`, `@/data/`, `@/lib/`, `@/types/`, `@/hooks/`
- Sibling imports: `./file`, `../dir/file`

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
| Validation files | kebab-case | `cart.validation.ts` |
| Dirs | kebab-case | `common/table/` |

### Fonts
- **Fraunces** (serif) for headings — loaded in `layout.tsx`
- **Inter** (sans-serif) for UI

## Known Gaps

- **No test framework** — no jest/vitest in `package.json`, no test files exist. Tests are not yet set up.
- **Prisma needs schema sync** — `npx prisma generate` after any schema change, `npx prisma migrate dev` after model additions.
- **Neon connection pool limit** — Free tier ~9 connections. Keep concurrent API calls low. Use `staleTime` on queries. Guard mutations with `if (isPending) return`.
