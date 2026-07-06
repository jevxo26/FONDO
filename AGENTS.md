<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FONDO - Smart Subscription Food Delivery Platform

## Project Vision
A modern subscription-based food delivery platform for healthy, scheduled, and customizable meal delivery services. Customers subscribe to meal plans, customize meals, pay in advance, and receive meals automatically according to delivery schedules.

## System Actors (8 Roles)
- Super Admin, Admin, Vendor, Vendor Staff, Kitchen Staff, Rider, Customer, Support Agent

## Business Model
- Centralized marketplace: customers never know which vendor prepares their food
- System manages vendors internally while presenting a unified food catalog
- Admin can switch vendors at any time without affecting customer experience

## Business Workflow
Admin → Register Vendor → Vendor Adds Foods → Admin Approves → Customer Browses Packages → Customizes Meals → Checkout → Advance Payment → Subscription Created → Daily Orders Auto-Generated → Kitchen Prepares → Rider Assigned → Delivery → Rating & Feedback

## Enterprise Modules
1. Authentication & User Management
2. Role & Permission Management
3. Food & Menu Management
4. Vendor & Kitchen Management
5. Package & Meal Planning
6. Cart & Order Management
7. Payment & Settlement
8. Rider & Delivery Management
9. Chat, Notification & Customer Support
10. CMS, Inventory & System Settings
11. Subscription & Meal Lifecycle
12. Marketing, Referral & Loyalty
13. Reports & Business Intelligence
14. Infrastructure, DevOps & System Operations

## Tech Stack (Frontend)
- Next.js, React, TypeScript, Redux Toolkit, TanStack Query, Tailwind CSS, Shadcn/UI

## Architecture
- Monorepo: `src/` (Next.js frontend) + `server/` (Express backend)
- Backend team handles `server/` and `prisma/`
- Frontend only focused on `src/`

## Design System
See `docs/DESIGN.md` for FONDO brand colors, typography, spacing, and component tokens.

## Coding Conventions & Best Practices

### File Structure
```
src/
  app/                          # Next.js App Router pages
  components/
    {feature}/                  # Feature-based folders (layout, auth, cart, etc.)
      {component-name}/
        component.tsx           # Component file (<100 lines)
        component-client.tsx    # Client sub-component (if needed)
  data/                         # Static data, constants, types
    {domain}.ts                 # e.g., navigation.ts
  store/                        # Redux Toolkit state management
    store.ts                    # configureStore + typed hooks
    slices/                     # Redux slices per domain
  lib/                          # Utilities
    utils.ts                    # cn() helper
```

### Component Rules
- **<100 lines per file**. Break into multiple files if bigger.
- **UI only**. No data fetching or business logic in components — keep presentation pure.
- **Server-first**. Default to server components. Add `"use client"` only for:
  - `usePathname()`, `useSearchParams()`
  - Redux hooks (`useAppDispatch`, `useAppSelector`)
  - Event handlers (`onClick`, `onSubmit`)
  - `useState`, `useEffect`, `useRef`
  - Any browser-only API

### Data Separation
- Static data (arrays, constants, types) goes in `src/data/`
- Do NOT hardcode data arrays inside component files
- Import data: `import { mainNavLinks } from "@/data/navigation"`

### Icons
- Use **Lucide icons** (already in deps) — prefer over custom SVGs
- Import: `import { Heart, ShoppingCart } from "lucide-react"`
- If Lucide lacks the icon needed, use inline SVG code as a fallback

### State Management
- **Redux Toolkit** for global state (auth, cart, UI)
- **TanStack Query** for server state (API data fetching)
- Use typed hooks from `@/store/store`: `useAppDispatch`, `useAppSelector`

### CSS & Styling
- **Tailwind CSS v4** with CSS variables in `globals.css`
- Use `cn()` from `@/lib/utils` for conditional classes
- Container wrapper: `<div className="wrapper">` (defined in globals.css)
- Use `@utility` in globals.css for reusable utility classes
- Theme tokens defined in `:root` and `.dark` — never hardcode hex values in components

### Imports
- Use `@/` alias: `@/components/...`, `@/store/...`, `@/data/...`, `@/lib/...`
- Sibling imports: `./search-form`, `../other-component`
