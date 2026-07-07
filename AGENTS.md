<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FONDO - Subscription Food Delivery Platform

**8 roles**: Super Admin, Admin, Vendor, Vendor Staff, Kitchen Staff, Rider, Customer, Support Agent
**Model**: Centralized marketplace — customers never see the vendor, admin switches vendors transparently
**Workflow**: Admin→Vendor→Food→Approval→Browse→Customize→Pay→Subscribe→Order→Cook→Deliver→Rate
**14 modules**: Auth, Roles, Menu, Vendor, Package, Cart, Payment, Rider, Chat, CMS, Subscription, Marketing, Reports, Infra
**Stack**: Next.js, React, TypeScript, Redux Toolkit, TanStack Query, Tailwind CSS v4, shadcn/ui
**Architecture**: `src/` (frontend) + `server/` + `prisma/` — frontend only in `src/`
**Design tokens**: See `docs/DESIGN.md`

## File Structure
```
src/
  app/                          # App Router pages
  components/{feature}/{name}/  # Feature-based, <100 lines per file
  data/{domain}.ts              # Static data, constants, types
  store/                        # Redux Toolkit (store.ts, slices/)
  lib/utils.ts                  # cn() helper
```

## Conventions

### Components
- **<100 lines** per file — split if bigger
- **UI only** — no data fetching or business logic
- **Server-first** — `"use client"` only for hooks, event handlers, browser APIs

### State
- **Redux Toolkit** for global state (auth, cart, UI)
- **TanStack Query** for server state
- Typed hooks: `useAppDispatch`, `useAppSelector` from `@/store/store`

### CSS
- Tailwind CSS v4 with CSS variables in `globals.css`
- `cn()` from `@/lib/utils` for conditional classes
- Container: `<div className="wrapper">`
- Use `@utility` for reusable classes; never hardcode hex values

### Icons
- Prefer **Lucide icons** — import from `lucide-react`
- Fallback: inline SVG

### Data
- Static data in `src/data/` — never hardcode in components
- Import: `import { x } from "@/data/x"`

### Imports
- Use `@/` alias: `@/components/`, `@/store/`, `@/data/`, `@/lib/`
- Sibling imports: `./file`, `../dir/file`

### Mock Data
- All mock data uses **seeded PRNG** — never `Math.random()`
- Pattern: `export const rand = seededRandom(N)` → `rand()` throughout
- Prevents SSR hydration mismatches

### Reusable Components
- Check `src/components/ui/` (shadcn) before building custom
- Add new shadcn components: `npx shadcn@latest add @shadcn/<name>`
- Common patterns: `src/components/common/`
- DataTable at `src/components/common/table/` — uses TanStack Table

### Testing
- **File naming**: `*.test.tsx` co-located with component
- **Mock data**: Seeded PRNG from `src/data/` for deterministic fixtures
- **Per component**: Render (required props), Variants (loading/empty/error), Interactions (click/type/select → callbacks), Accessibility (keyboard, ARIA, focus)

### Error, Loading & Empty States
- **Loading**: `<Skeleton>` from `@/components/ui/skeleton`
- **Empty**: DataTable built-in `emptyMessage` prop with `<SearchX>` icon
- **Error**: TBD — use a toast pattern (shadcn Sonner)

### Exports
- Components: `export function Button`
- Pages: `export default function Page`
- Data/constants: `export const sidebarItems`
- Types: `export type CustomerOrder`
- Index files: `export { X } from "./x"`

### Naming
| Category | Convention | Example |
|---|---|---|
| Files | kebab-case | `order-columns.tsx` |
| Components | PascalCase | `OrderStatusBadge` |
| Functions | camelCase | `generateOrders` |
| Types | PascalCase | `CustomerOrder` |
| Data files | camelCase | `orders.ts` |
| Dirs | kebab-case | `common/table/` |

### TypeScript
- `interface` for component props, `type` for unions/complex types
- Generics on reusable: `function DataTable<TData>`
- Inline destructure props — no separate interface file
- Import types with `type`: `import type { Foo } from "@/foo"`
