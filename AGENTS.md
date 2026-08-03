<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FONDO — Subscription Food Delivery Platform

**Business model:** Centralized marketplace — customers never see the vendor, admin switches vendors transparently. See `docs/FONDO – Complete System Workflow.md` for the full PRD (~6,300 lines covering all modules, data models, and business flows).

**8 roles:** Super Admin, Admin, Vendor, Vendor Staff, Kitchen Staff, Rider, Customer, Support Agent

**Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Express 5 (custom server), Prisma (PostgreSQL via Neon), Redux Toolkit (RTK Query), Tailwind CSS v4, shadcn/ui (style: `base-nova`)

## Commands

| Command                                     | What it does                                                                                                                                                                              |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                                  | `nodemon --watch server --watch tsconfig.server.json --ext ts --ts-node --project tsconfig.server.json server/index.ts` — Express 5 + Next.js turbopack on port 3000. **NOT** `next dev`. |
| `pnpm build`                                | `next build && tsc --project tsconfig.server.json` → outputs `dist/`                                                                                                                      |
| `pnpm start`                                | `NODE_ENV=production node dist/server/index.js`                                                                                                                                           |
| `pnpm lint`                                 | `eslint`                                                                                                                                                                                  |
| `pnpm format`                               | `prettier --write "{src,server}/**/*.{ts,tsx,js,jsx,json}"`                                                                                                                               |
| `pnpm prisma generate`                      | Generate Prisma client after schema changes                                                                                                                                               |
| `pnpm prisma migrate dev`                   | Run migrations against PostgreSQL                                                                                                                                                         |
| `pnpm prisma studio`                        | Open Prisma Studio to browse data                                                                                                                                                         |
| `pnpm dlx shadcn@latest add @shadcn/<name>` | Add shadcn component (style: `base-nova`)                                                                                                                                                 |

## Architecture

```
src/                  # Next.js 16 App Router (frontend only)
  app/                # Route groups: (main)/ = customer-facing, dashboard/ = admin
  components/{feature}/{name}/   # Feature-based, max 150 lines per file
  components/ui/      # shadcn components
  components/common/  # Shared: cards, table/, section-header
  data/{domain}.ts    # Static data, constants
  store/              # Redux Toolkit (store.ts, api/, slices/)
  lib/{domain}/       # Domain libs as dirs (validations/)
  hooks/              # Custom React hooks
  hooks/forms/        # Form-specific logic hooks (useCheckout, useReviewForm)
  types/              # Shared TypeScript types (one file per domain)

server/               # Express 5 custom server (NOT in src/)
  index.ts            # Entrypoint: Express + Next.js hybrid, Prisma connect
  controllers/        # Thin route handlers (<20 lines each)
  services/           # Business logic, max 300 lines per file
  middlewares/        # verifyToken, authorize, validate
  routes/             # /api/* route definitions
  validations/        # Yup/express-validator schemas (one per domain)
  utils/              # catchAsync, sendResponse, AppError, pagination
  config/             # env, upload config

prisma/
  schema.prisma       # PostgreSQL schema (30+ models)
  migrations/         # 9 migrations
```

**API routes** mounted at `/api/auth`, `/api/users`, `/api/foods`, `/api/cart`, `/api/orders`, `/api/admin/*` in `server/index.ts`. All other routes pass through to Next.js.

## Conventions

### Components

- **<150 lines** per file — split by section if exceeded
- **UI only** — no data fetching, no business logic, no react-hook-form, no RTK Query hooks
- **Server-first** — `"use client"` only for hooks, event handlers, browser APIs
- **Modal forms** split into field-group components (e.g., `branch-basic-fields.tsx`, `branch-address-fields.tsx`) — parent keeps Dialog wrapper + state + handleSubmit only
- **Page files** (<150 lines) — orchestrate data fetching + compose subcomponents; never inline large JSX sections

### State

- **Redux Toolkit** for global state (auth, UI) — slices in `store/slices/`
- **RTK Query** for all API calls (single paradigm with Redux) — api slices in `store/api/slices/`
- Typed hooks: `useAppDispatch`, `useAppSelector` from `@/store/store`

### Business Logic

- **Components never contain business logic** — extract into hooks in `src/hooks/` or `src/hooks/forms/`
- Form logic: extract into `src/hooks/forms/use-{domain}-form.ts` — returns `{ mutate, isPending, formState, handlers }`
- Checkout-level orchestration: extract into `src/hooks/use-{domain}.ts` (e.g., `useCheckout` returns all state + handlers)
- Hooks expose `{ mutate, mutateAsync, isPending }` with optional `onSuccess`/`onError`/`onSettled` callbacks

### CSS

- Tailwind CSS v4 with CSS variables in `globals.css`
- `cn()` from `@/lib/utils` for conditional classes
- Container: `<div className="wrapper">` — max-width 1440px, responsive `padding-inline: var(--space-container)`
- Use `@utility` for reusable classes; never hardcode hex values
- Animation: `animate-fadeIn` utility available for fade + translateY entrance
- Fluid spacing: `var(--space-section)` for section gaps, `var(--space-container)` for container padding
- Font size tokens: `text-display`, `text-h1`, `text-h2`, `text-card-title`, `text-body`, `text-small`, `text-price`, `text-label`, `text-badge`
- Radius tokens: `rounded-sm`/`md`/`lg`/`xl`/`2xl`/`3xl`/`4xl`/`full`
- Full design system reference: `docs/DESIGN.md` (tokens, shadows, radius, dark mode, component palette)

### Server Services

- **Max 300 lines** per file — split by domain concern
- Convention: `server/services/{domain}{SubDomain}Service.ts` (e.g., `orderCreationService.ts`, `orderCrudService.ts`)
- Controllers stay <20 lines — thin wrappers that call service, catch error, send response

### Icons

- **Lucide icons** — import from `lucide-react`

### API Client

- Axios instance at `src/lib/api-client.ts`, base URL `/api`, auto-attaches JWT Bearer token
- Response envelope: `{ success, message, data }` — client unwraps to `data` directly
- Methods: `api.get<T>(url)`, `api.post<T>(url, body?)`, `api.patch<T>(url, body)`, `api.delete<T>(url)`
- `T` = response type from `src/types/` (e.g., `api.get<Cart>("/cart")`)
- Errors throw `ApiError(statusCode, message)` — use `handleApiError(error)` for user messages
- 401 auto-triggers `/auth/refresh`, queues concurrent failed requests

### Data Fetching — Which Tool

**One rule: if the page is a server page, use `apiFetch`. If the page is a client page, use RTK Query. Never mix (no server-fetch-then-seed-RTK-cache pattern).**

| Page type                                 | Tool                                                    | Example                    |
| ----------------------------------------- | ------------------------------------------------------- | -------------------------- |
| Server page (no hooks/state, public/SEO)  | `apiFetch<T>()` — Next.js server fetch + cache          | homepage, food detail      |
| Client page (hooks, state, interactivity) | RTK Query hooks — `useXxxQuery()` / `useXxx()` directly | dashboards, filters, forms |

### Data Fetching (RTK Query)

- API endpoints defined in `src/store/api/slices/{domain}-api.ts` — one file per domain
- Each file exports both RTK Query hooks AND wrapped mutation hooks:
  - **Queries**: `useXxxQuery()` returns `{ data, isLoading, error }` — use directly in page/component
  - **Mutations**: Use the wrapped `useXxx()` hook that returns `{ mutate, mutateAsync, isPending }` with `onSuccess`/`onError`/`onSettled` callbacks
- Copy `src/store/api/slices/example-api.ts` to start a new domain
- Tag constants declared in `src/store/api/tags.ts` (shared across domains, cross-invalidation via shared tag strings)

### Adding a New API Call

1. **Copy** `src/store/api/slices/example-api.ts` → `src/store/api/slices/{domain}-api.ts`
2. **Edit types**: Replace `Item`, `CreatePayload`, `UpdatePayload` with your domain types
3. **Edit paths**: Swap `/examples` with real endpoint paths
4. **Edit tags**: Add domain tag to `src/store/api/tags.ts`
5. **Use** in component:
   ```tsx
   import { useListExamplesQuery, useCreateExample } from "@/store/api/slices/examples-api";

   // Query
   const { data, isLoading } = useListExamplesQuery();

   // Mutation
   const { mutate, isPending } = useCreateExample();
   mutate({ name: "foo" }, { onSuccess: () => toast.success("Created") });
   ```

### Server-Side Data Fetching (Next.js Server Components)

Use only for **server pages** — public/SEO pages with no hooks or interactivity. Client/interactive pages use RTK Query (see above).

- Use `apiFetch<T>(endpoint, options?)` from `@/lib/api` (already exists, wraps `fetch` with Next.js cache)
- Response envelope `{ success, message, data }` unwrapped automatically — callers receive `T` directly
- Supports `revalidate` (seconds) and `tags` (on-demand revalidation) via `next` config
- Auth token read from `refreshToken` cookie automatically
- On error: throws `ApiError(statusCode, message)` — caught by `error.tsx` boundary

```tsx
// src/app/(main)/foods/[slug]/page.tsx — Server Component
import { apiFetch } from "@/lib/api";

export default async function FoodDetails({ params }) {
  const { slug } = await params;
  const food = await apiFetch<Food>(`/api/foods/slug/${slug}`);
  return <ProductHero food={food} />;
}
```

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

| Category         | Convention | Example              |
| ---------------- | ---------- | -------------------- |
| Files            | kebab-case | `order-columns.tsx`  |
| Components       | PascalCase | `OrderStatusBadge`   |
| Functions        | camelCase  | `generateOrders`     |
| Types            | PascalCase | `CustomerOrder`      |
| Data files       | camelCase  | `orders.ts`          |
| Validation files | kebab-case | `cart.validation.ts` |
| Dirs             | kebab-case | `common/table/`      |

### Fonts

- **Fraunces** (serif) for headings — loaded in `layout.tsx`
- **Inter** (sans-serif) for UI

## Commits

- **Never auto-commit.** Only commit when the user explicitly asks.
- After finishing a task, provide a short suggested commit message instead (under 72 chars, conventional format, e.g. `feat(scope): summary`).
- If the user says "commit", then stage intended files only and commit.

## Known Gaps

- **No test framework** — no jest/vitest in `package.json`, no test files exist. Tests are not yet set up.
- **Prisma needs schema sync** — `pnpm prisma generate` after any schema change, `pnpm prisma migrate dev` after model additions.
- **Neon connection pool limit** — Free tier ~9 connections. Keep concurrent API calls low. Guard mutations with `if (isPending) return`.
