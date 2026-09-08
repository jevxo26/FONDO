# FONDO Design System

## 1. Brand
- **Name:** FONDO — Smart Subscription Food Delivery
- **Tagline:** "Healthy, scheduled, and customizable meal delivery services"
- **Personality:** Heritage Hearth & Precision — merges traditional Mughlai culinary heritage with clinical high-end dining precision. Sophisticated, warm, trustworthy.
- **Style:** Minimalist with tactile accents. Significant whitespace, restricted palette, food photography and typography lead.

## 2. Color System

**Single source of truth:** all color tokens live in `src/app/globals.css` (light `:root` + `.dark`). Components consume them via Tailwind utilities (`bg-primary`, `text-muted-foreground`, `bg-warning/10`, …) — never hardcode brand hex values in components. Shadows over brand colors use `color-mix(in srgb, var(--primary) N%, transparent)`.

### Palette
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `#FFFCF5` | `#1C1510` | Page background (warm cream / warm brown) |
| `--foreground` | `#2B1A12` | `#F7EDE3` | Main text |
| `--card` | `#FFFFFF` | `#261C14` | Card background |
| `--card-foreground` | `#2B1A12` | `#F7EDE3` | Card text |
| `--popover` | `#FFFFFF` | `#261C14` | Dropdown/menu backgrounds |
| `--popover-foreground` | `#2B1A12` | `#F7EDE3` | Text on popover |
| `--primary` | `#CEA359` | `#E8B84A` | Logo Gold — button fills, active states, premium indicators (brighter in dark) |
| `--primary-foreground` | `#FFFFFF` | `#2B1A12` | Text on primary |
| `--secondary` | `#F5EBD9` | `#382C1E` | Warm sand backgrounds, soft pills |
| `--secondary-foreground` | `#3B2218` | `#F7EDE3` | Text on secondary |
| `--muted` | `#F6ECE2` | `#2E2418` | Subtle backgrounds |
| `--muted-foreground` | `#7A6252` | `#B9A89B` | Muted text |
| `--accent` | `#FFF5D6` | `#4A3A16` | Soft butter — highlights, selection |
| `--accent-foreground` | `#8A6A1D` | `#FFC27A` | Text on accent |
| `--destructive` | `#D63C2C` | `#E0524A` | Error states, danger badges |
| `--destructive-foreground` | `#FFFFFF` | `#FFFFFF` | Text on destructive |
| `--success` | `#2F8A5B` | `#4CAF84` | Success states |
| `--warning` | `#C97B1E` | `#E0A44F` | Warning states |
| `--info` | `#3E6FB0` | `#6FA1D9` | Info/blue states |
| `--border` | `#EDE0D4` | `#3D2E20` | Borders |
| `--input` | `#E8D9CC` | `#3D2E20` | Input borders |
| `--ring` | `#CEA359` | `#E8B84A` | Focus rings |
| `--sidebar` | `#FFFBF5` | `#221510` | Sidebar background |
| `--sidebar-foreground` | `#2B1A12` | `#F7EDE3` | Sidebar text |
| `--sidebar-accent` | `#F5EBD9` | `#382C1E` | Sidebar accent |
| `--sidebar-accent-foreground` | `#2B1A12` | `#F7EDE3` | Sidebar accent text |
| `--sidebar-border` | `#EDE0D4` | `#3D2E20` | Sidebar borders |
| `--sidebar-ring` | `#CEA359` | `#E8B84A` | Sidebar focus ring |
| `--overlay` | `#2A1712` | `#1A120B` | Warm dark overlay over photos (service banner, hero) |
| `--chart-1..5` | `#CEA359` / `#E8955A` / `#F5A623` / `#2F8A5B` / `#3E6FB0` | `#E8B84A` / `#F5A623` / `#7BD389` / `#6FA1D9` / `#E8955A` | Chart series (recharts fills) |

### Variant System
StatCard, accent bars, status badges, and table pills use semantic tokens (see `StatusBadge` in `src/components/common/status-badge.tsx`):

| Variant | Token | Visual |
|---------|-------|--------|
| `default` | `--primary` | Logo Gold |
| `success` | `--success` | Green |
| `warning` | `--warning` | Amber |
| `danger` | `--destructive` | Red |
| `info` | `--info` | Blue |
| `muted` | `--muted-foreground` | Gray |

Badge pattern: `bg-{token}/10 text-{token}` (+ optional `ring-1 ring-{token}/20`). Tokens adapt automatically to dark mode — no `dark:` overrides needed.

### Brand Color Budget
Primary is **Logo Gold** (`#CEA359`) — derived from the brand logo. **Butter** (`#FFF5D6`) sits in the `--accent` family for highlights. Use primary for high-signal actions and accents, never as a background fill for large areas.
- **USE `--primary`** for: CTA buttons, active/selected states (tabs, pills, pagination, sidebar active), count badges, high-signal emphasis tags, icon accents.
- **Text on primary** uses `--primary-foreground`.
- **Decorative accents on light backgrounds:** `text-primary` for emphasis headings/icons, `bg-primary/10` (or `bg-primary/5`) for soft tint chips, `border-primary/30` for subtle borders/lines. Keep these restrained — one warm accent per view.
- **Dark surfaces** (DarkCard, `bg-foreground` sections): `text-primary`/`bg-primary/10` warm accents are correct there.
- Rating stars: `fill-primary text-primary`. Focus rings: `ring-primary`.
- Eyebrow/section labels: `text-muted-foreground` + uppercase tracking.
- Decorative dividers/lines: `bg-primary/30`, not solid primary.
- Brand-tinted shadows/glows: `color-mix(in srgb, var(--primary) N%, transparent)` — never hardcoded `rgba(168, 90, 56, …)`.

### Exceptions (data, not theme)
These color values are **data**, not component styling, and stay hardcoded:
- Tag/label preset palettes (`src/data/mock-coupons.ts`, `src/data/foodsdata.ts`, `tag-section.tsx` presets) — stored in DB, rendered via inline `style`.
- Tier colors (`--tier-bg/fg/stripe` in `globals.css` + `.tier-*` utilities).

### Tier Color System
For customer/profile tiering, use the `.tier-bronze` / `.tier-silver` / `.tier-gold` utilities in `globals.css` (they set `--tier-bg` / `--tier-fg` / `--tier-stripe` for light and dark).

## 3. Typography

### Font Stack
| Font | CSS Variable | Usage |
|------|-------------|-------|
| Bai Jamjuree | `--font-heading` | All headings (hero, section titles, card titles, stat values) |
| Inter | `--font-sans` | Body text, UI labels, buttons, badges, prices |

### Type Scale
| Style | Font | Size | Weight | Notes |
|-------|------|------|--------|-------|
| Display | Bai Jamjuree | 40px | 700 | Hero |
| Headline-lg | Bai Jamjuree | 32px / 28px mobile | 700 | Page titles |
| Headline-md | Bai Jamjuree | 24px | 600 | Section headers |
| Card Title | Bai Jamjuree | 18px | 600 | Card headings |
| Stat Value | Bai Jamjuree | 28-30px | 700 | Dashboard stat cards |
| Body | Inter | 14-16px | 400 | Paragraphs |
| Small | Inter | 12-13px | 400 | Captions, metadata |
| Price | Inter | 18-20px | 700 | Monetary values |
| Label | Inter | 14px | 600, 0.02em | Form labels |
| Badge | Inter | 10-11px | 700, uppercase | Status badges, pills |

### Font Size CSS Variables (in `@theme inline`)
| Token | Value | Usage |
|-------|-------|-------|
| `--font-size-display` | 40px | Hero |
| `--font-size-h1` | 32px | Page titles |
| `--font-size-h2` | 24px | Section headers |
| `--font-size-card-title` | 18px | Card headings |
| `--font-size-body` | 15px | Paragraphs |
| `--font-size-small` | 12px | Captions, metadata |
| `--font-size-price` | 19px | Monetary values |
| `--font-size-label` | 14px | Form labels |
| `--font-size-badge` | 11px | Status badges, pills |

**Labels rule:** Use `text-[10px] uppercase tracking-widest` for stat labels and metadata to keep them compact and consistent.

## 4. Layout & Spacing

### Page Structure
| Property | Value |
|----------|-------|
| Max width | 1440px (via `.wrapper` class) |
| Horizontal padding | `clamp(1rem, 0.5rem + 2vw, 3.75rem)` |
| Section gap | `clamp(2rem, 1.5rem + 2.5vw, 5rem)` |
| Grid | 12-column for desktop |

### Container `.wrapper`
```css
.wrapper {
  margin-inline: auto;
  width: 100%;
  max-width: 1440px;
  padding-inline: var(--space-container);
}
```

### Responsive Breakpoints
| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, stacked |
| Tablet | 768-1024px | 2 columns |
| Desktop | > 1024px | Full grid |

### Stacking / Spacing
| Token | Value |
|-------|-------|
| Card padding | 16-20px (responsive: `md:p-6`) |
| Input padding | 10-14px |
| Small stack | 8px |
| Medium stack | 16px |
| Large stack | 24px |

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0px 1px 2px rgba(30,26,22,0.04), 0px 8px 24px rgba(30,26,22,0.06)` | Default card elevation |
| `--shadow-badge` | `0px 4px 8px rgba(30,26,22,0.05), 0px 24px 48px -12px rgba(30,26,22,0.18)` | Floating badges, tooltips |
| `--shadow-elevated` | `0px 8px 24px -8px rgba(13,21,40,0.12), 0px 4px 8px -4px rgba(13,21,40,0.06)` | Hover states, popovers |
| `--pill-shadow` | `inset 0 1px 1px primary/20, 0 2px 12px primary/12` | Navbar icon pill rest state |
| `--pill-shadow-hover` | `inset 0 1px 1px primary/22, 0 0 20px primary/30` | Navbar icon pill hover |
| `--icon-shadow` | `0 1px 2px primary/40` | Navbar icon drop shadow |

Use `cn()` helper + Tailwind utilities (e.g. `shadow-[var(--shadow-card)]`). Never hardcode `box-shadow` in components. Navbar icon pills use the global `.nav-icon-pill` / `.nav-icon` classes in `@layer components` (globals.css) — no per-component shadow strings.

## 6. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.375rem | Small chips, inline badges |
| `--radius-md` | 0.5rem | Input fields, checkboxes, small cards |
| `--radius-lg` | 0.625rem | Default — cards, dialogs |
| `--radius-xl` | 0.875rem | Medium cards |
| `--radius-2xl` | 1.125rem | Large food cards |
| `--radius-3xl` | 1.375rem | Premium containers, dashboards cards, tables |
| `--radius-4xl` | 1.625rem | Hero sections, prominent surfaces |
| `--radius-full` | 9999px | Pill buttons, avatar circles, badges |

**Dashboard/table containers** always use `rounded-3xl` for premium feel.

## 7. Premium Design Guidelines

These rules apply across all dashboard components, cards, and containers.

### 7.1 Warm Terracotta Gradient Background
Premium containers use a subtle warm gradient instead of flat `bg-card`:
```
bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.01]
```
Opacity is low (3% primary at peak) so it reads as a warm glow, not colored.

### 7.2 Depth Layers (Blur Orbs)
Add 2-3 blur orbs per container for depth:
```
<div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
<div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
<div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
```
Sizes alternate (`size-36`, `size-20`, `size-28`) and positions avoid overlap.

### 7.3 Diamond Corner
Small rotated square in the top-right as a premium detail:
```
<div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
```

### 7.4 Spring Transitions
Every interactive element uses:
```
transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]
```
For links/cards that go somewhere, add `hover:shadow-[var(--shadow-elevated)]`.

### 7.5 Terracotta Dividers
Replace `border-border` solid lines with gradient dividers for premium sections:
```
<div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/30 to-transparent" />
```

### 7.6 Accent Bars
Stat blocks and metric cards use a 2-6px thick accent bar on one edge:
```
<div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary to-primary/60" />
```
Positions: left (default), right, top, bottom. Always match bar color to variant.

### 7.7 Colored Top Stripe
For tiered/profile cards, a 4px (`h-1`) colored stripe at the top of the card signals category:
- Bronze: `bg-amber-600`
- Silver: `bg-slate-400`
- Terracotta: `bg-primary`

### 7.8 Stat Value Emphasis
Stat values always use `font-heading` with `tracking-tight` for a premium editorial feel:
```
<p className="font-heading text-[30px] font-bold leading-tight tracking-tighter ...">{value}</p>
```

### 7.9 Label Convention
Labels on stat blocks and metadata use a standard format:
```
<p className="text-[10px] uppercase tracking-widest text-muted-foreground">Label</p>
```
Always `text-[10px]`, `uppercase`, `tracking-widest`, `text-muted-foreground`.

### 7.10 Status Pills
Use compact pills for status indicators:
```
<span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 bg-success/10 text-success ring-success/20">
  Active
</span>
```
Variants follow the same `bg-{variant}/10 text-{variant} ring-{variant}/20` pattern.

### 7.11 Table Design
- **Wrapper:** Warm gradient + blur orbs + diamond corner
- **Toolbar:** `bg-card` with `border-b border-primary/10`
- **Header/Footer:** `bg-amber-50/80` (light) / `dark:bg-amber-950/30`
- **Rows:** `bg-card`, no zebra, `hover:bg-primary/8`
- **Pagination:** Terracotta active page with `shadow-[0_2px_8px_rgba(168,90,56,0.25)]`

### 7.12 No Double Bezel
Do not wrap premium containers with `bg-border/15 p-[1px]` inner/outer pattern. Use `overflow-hidden rounded-3xl` with a direct gradient background instead.

## 8. Available shadcn Components (`src/components/ui/`)

Style: **base-nova** | Icons: **Lucide** | RSC: **Yes**

`avatar` · `badge` · `breadcrumb` · `button` · `card` · `checkbox` · `dialog` · `dropdown-menu` · `empty` · `field` · `input` · `label` · `pagination` · `popover` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `sonner` · `table` · `tooltip`

Add new ones with `npx shadcn@latest add @shadcn/<name>`.
