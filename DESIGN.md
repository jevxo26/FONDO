---
name: Heritage Hearth & Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#d1dbec'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dfe9fa'
  surface-container-highest: '#d9e3f4'
  on-surface: '#121c28'
  on-surface-variant: '#4d4636'
  inverse-surface: '#27313e'
  inverse-on-surface: '#eaf1ff'
  outline: '#7f7664'
  outline-variant: '#d1c5b1'
  surface-tint: '#765a00'
  primary: '#765a00'
  on-primary: '#ffffff'
  primary-container: '#c8a23d'
  on-primary-container: '#4c3900'
  inverse-primary: '#eac259'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#605e5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#aaa6a2'
  on-tertiary-container: '#3e3c39'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf95'
  primary-fixed-dim: '#eac259'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#594400'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e6e2dd'
  tertiary-fixed-dim: '#cac6c1'
  on-tertiary-fixed: '#1d1b19'
  on-tertiary-fixed-variant: '#484643'
  background: '#f8f9ff'
  on-background: '#121c28'
  surface-variant: '#d9e3f4'
  surface-warm: '#FDF8F3'
  surface-white: '#FFFFFF'
  border-subtle: '#F3F4F6'
  input-bg: '#F9FAFB'
  status-error: '#DC2626'
  status-success: '#16A34A'
  rating-star: '#F59E0B'
typography:
  display:
    fontFamily: Fraunces
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Fraunces
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  price-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
  price-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  section-v-space: 80px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The brand personality merges the soul of traditional Mughlai culinary heritage with the clinical precision of modern high-end dining. It is sophisticated, warm, and trustworthy, evoking the sensory richness of slow-cooked spices through a refined, minimalist lens.

The design style is **Minimalist with Tactile accents**. It leverages significant whitespace and a restricted, high-end color palette to allow food photography and typography to take center stage. The interface uses subtle container tiers and soft shadows to create a layered, organized feel that mirrors the meticulous preparation of the cuisine.

## Colors

The palette is rooted in **Warm Cream (#FDF8F3)**, which serves as the primary canvas, providing a softer, more "heritage" feel than pure white. **Golden Amber (#C8A23D)** is the prestige accent used for primary actions, branding, and highlighting quality indicators like ratings.

**Near Black (#1A1A1A)** provides high-contrast grounding for primary text and secondary buttons, ensuring the "precision" aspect of the brand is maintained. Use **Status Red (#DC2626)** sparingly for error states and discount badges, and **Success Green (#16A34A)** for confirmation states in forms.

## Typography

This system employs a classic Serif/Sans-Serif pairing. **Fraunces** (loaded via `next/font/google` as `--font-fraunces`) is used for all headlines and brand moments to signal tradition and elegance. **Inter** (loaded as `--font-sans`) handles all functional UI elements, body text, and labels to ensure maximum legibility and a contemporary, "precise" feel.

- **Headlines:** Use tighter line heights and bold weights to create visual impact.
- **Labels:** Use Inter Semi-Bold with a slight letter spacing for form labels and category headers to distinguish them from standard body copy.
- **Prices:** Treated as high-priority data, rendered in Inter Bold for clarity.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop with a maximum width of 1440px (via `.wrapper` utility class), centering the content to create a focused, boutique experience. On mobile, it transitions to a single-column fluid layout with 16px side margins.

- **Vertical Rhythm:** Sections are separated by generous 80px gaps to emphasize the "Slow-cooked" brand ethos through whitespace.
- **Stacking:** Elements within components (like input fields or food cards) use an 8px (sm) or 16px (md) vertical stack to maintain clean associations between labels, inputs, and descriptions.
- **Grid:** Use a 12-column grid for desktop, allowing cards to span 4 columns (3-up) or 3 columns (4-up) depending on the context.

## Elevation & Depth

Visual hierarchy is primarily achieved through **Tonal Layers** and **Low-contrast Outlines**. 

- **Level 0 (Base):** The Warm Cream background (#FDF8F3).
- **Level 1 (Containers):** Cards and form sections use a White (#FFFFFF) background with a subtle 1px border (#F3F4F6).
- **Interactive Depth:** On hover or selection, elements may use a very soft, diffused ambient shadow (Color: #1A1A1A, Opacity: 4%, Blur: 12px) to lift them slightly off the page without appearing bulky.
- **Active States:** Selection is indicated through a change in border-color (to Golden Amber) or background-color (to Near Black).

## Shapes

The shape language is consistently **Rounded**, striking a balance between organic comfort and geometric order.

- **Standard Elements:** Input fields, checkboxes, and small cards use a **0.5rem (8px)** radius.
- **Prominent Elements:** Large food cards and order summary containers use a **1rem (16px)** radius.
- **Pill Shapes:** Category filters and "Order Now" buttons use a fully rounded **2rem (32px)** radius to feel approachable and tactile.

## Components

### Forms & Inputs
- **Input Fields:** Use a subtle background (#F9FAFB) with a 1px border (#D1D5DB). On focus, the border shifts to Golden Amber (#C8A23D) with a subtle glow.
- **Labels:** Positioned above the field in Inter Semi-Bold (Label-md). Required fields are marked with a Golden Amber asterisk.
- **Validation:** 
  - **Error:** Border color shifts to #DC2626; helper text appears below in 12px Inter.
  - **Success:** Border color shifts to #16A34A; often accompanied by a small checkmark icon.
- **Placeholders:** Rendered in #9CA3AF to ensure clear contrast with user-entered text.

### Buttons
- **Primary (Action):** Golden Amber background with White text. Used for "Add to Cart" or "Place Order."
- **Secondary (Utility):** Near Black background with White text. Used for "Order Now" or checkout transitions.
- **Secondary (Outline):** White background with Near Black 1px border and text. Used for "Track Order" or "Cancel."
- **Icon-based:** Use a circular background (Golden or Black) with centered white icons. Ensure a minimum touch target of 44x44px.

### Cards & Feedback
- **Food Cards:** White background with 16px corner radius. Image occupies the top half with a slight zoom on hover.
- **Pills:** Active pills use the Near Black background to create a high-contrast focal point against the cream layout.

---

## Shadows (from `globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--shadow-card` | `0px 1px 2px rgba(30,26,22,0.04), 0px 8px 24px rgba(30,26,22,0.06)` | Default card elevation |
| `--shadow-badge` | `0px 4px 8px rgba(30,26,22,0.05), 0px 24px 48px -12px rgba(30,26,22,0.18)` | Floating badges, tooltips |
| `--shadow-elevated` | `0px 8px 24px -8px rgba(13,21,40,0.12), 0px 4px 8px -4px rgba(13,21,40,0.06)` | Hover states, popovers |

Use the `cn()` helper and Tailwind's shadow utilities; avoid hardcoding `box-shadow` values in components.

## Radius Scale (CSS variables in `globals.css`)

| Token | Value | Element mapping |
|---|---|---|
| `--radius-sm` | `0.375rem` | Small chips, inline badges |
| `--radius-md` | `0.5rem` | Input fields, checkboxes, small cards |
| `--radius-lg` | `0.625rem` | Default radius (cards, dialogs) |
| `--radius-xl` | `0.875rem` | Medium cards |
| `--radius-2xl` | `1.125rem` | Large food cards |
| `--radius-3xl` | `1.375rem` | Order summary containers |
| `--radius-4xl` | `1.625rem` | Hero sections, prominent surfaces |
| `--radius-full` | `9999px` | Pill buttons, avatar circles |

## Fluid Spacing (from `globals.css`)

| Token | Value |
|---|---|
| `--space-section` | `clamp(2rem, 1.5rem + 2.5vw, 5rem)` |
| `--space-container` | `clamp(1rem, 0.5rem + 2vw, 3.75rem)` |

Use `--space-section` for vertical gaps between major page sections. Use `--space-container` for horizontal padding and component-level spacing.

## Dark Mode

Dark mode is available via the `.dark` class on `<html>`. Colors defined under `.dark` in `globals.css`:

| Token | Light | Dark |
|---|---|---|
| `--background` | `#FAF5EB` | `#1A1A1A` |
| `--foreground` | `#16100C` | `#FAF5EB` |
| `--card` | `#FFFFFF` | `#2C2C2C` |
| `--card-foreground` | `#16100C` | `#FAF5EB` |
| `--popover` | `#FFFFFF` | `#2C2C2C` |
| `--popover-foreground` | `#16100C` | `#FAF5EB` |
| `--primary` | `#CEA359` | `#CEA359` |
| `--primary-foreground` | `#1B0E08` | `#1B0E08` |
| `--secondary` | `#FBF5EB` | `#2C2C2C` |
| `--secondary-foreground` | `#1B1612` | `#FAF5EB` |
| `--muted` | `#F5F0E8` | `#2C2C2C` |
| `--muted-foreground` | `#635C57` | `#9CA3AF` |
| `--accent` | `#FBF5EB` | `#2C2C2C` |
| `--accent-foreground` | `#1B1612` | `#FAF5EB` |
| `--destructive` | `#EF4444` | `#EF4444` |
| `--border` | `#DDD6CF` | `#3A3A3A` |
| `--input` | `#DDD6CF` | `#3A3A3A` |
| `--ring` | `#CEA359` | `#CEA359` |
| `--sidebar` | `#FFFFFF` | `#1A1A1A` |
| `--sidebar-foreground` | `#16100C` | `#FAF5EB` |
| `--sidebar-primary` | `#CEA359` | `#CEA359` |
| `--sidebar-primary-foreground` | `#1B0E08` | `#1B0E08` |
| `--sidebar-accent` | `#FBF5EB` | `#2C2C2C` |
| `--sidebar-accent-foreground` | `#1B1612` | `#FAF5EB` |
| `--sidebar-border` | `#DDD6CF` | `#3A3A3A` |
| `--sidebar-ring` | `#CEA359` | `#CEA359` |

## Container `.wrapper`

Defined as a `@layer utilities` class in `globals.css`:

```css
.wrapper {
  margin-inline: auto;
  width: 100%;
  max-width: 1440px;
  padding-inline: 1rem;
}
@media (width >= 40rem) {
  .wrapper { padding-inline: 1.5rem; }
}
@media (width >= 64rem) {
  .wrapper { padding-inline: 60px; }
}
```

Apply `<div className="wrapper">` around section content to align with the grid.

## Available shadcn Components (`src/components/ui/`)

Style: **base-nova** | Icons: **Lucide** | RSC: **Yes**

`avatar` · `badge` · `breadcrumb` · `button` · `card` · `checkbox` · `dialog` · `dropdown-menu` · `empty` · `field` · `input` · `label` · `pagination` · `popover` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `sonner` · `table` · `tooltip`

Add new ones with `npx shadcn@latest add @shadcn/<name>`.
