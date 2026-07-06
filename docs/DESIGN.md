# FONDO Design System

## 1. Brand
- **Name:** FONDO - Smart Subscription Food Delivery
- **Tagline:** "Healthy, scheduled, and customizable meal delivery services"

## 2. Color System

### Shadcn Tokens (use in components)
| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FAF5EB` | Page background |
| `--foreground` | `#16100C` | Main text |
| `--card` | `#FFFFFF` | Card background |
| `--card-foreground` | `#16100C` | Card text |
| `--primary` | `#CEA359` | Gold buttons, accents |
| `--primary-foreground` | `#1B0E08` | Text on primary |
| `--secondary` | `#FBF5EB` | Cream backgrounds |
| `--secondary-foreground` | `#1B1612` | Text on secondary |
| `--muted` | `#F5F0E8` | Subtle backgrounds |
| `--muted-foreground` | `#635C57` | Muted text |
| `--destructive` | `#EF4444` | Errors, badges |
| `--border` | `#DDD6CF` | Borders |
| `--input` | `#DDD6CF` | Input borders |
| `--ring` | `#CEA359` | Focus rings |
| `--success` | `#10B981` | Success states |

### New Variables (Figma colors)
| Variable | Hex | Usage |
|----------|-----|-------|
| `--black` | `#0B0F19` | Deepest black |
| `--heading` | `#1B1612` | Headings |
| `--body` | `#111827` | Body text |
| `--gold-light` | `#DD9C42` | Light gold accents |
| `--star` | `#F59E0B` | Rating stars |
| `--orange` | `#E7963D` | Badges, combo accents |
| `--cream-light` | `#FCFAF6` | Hero gradient start |
| `--cream-lighter` | `#FFF5E2` | Hero gradient end |
| `--surface` | `#F9FAFB` | Search bar bg |
| `--bg-nav` | `rgba(0,0,0,0.004)` | Navbar bg |
| `--bg-wishlist` | `rgba(239,68,68,0.2)` | Wishlist icon bg |
| `--text-nav` | `rgba(22,16,12,0.75)` | Nav link text |
| `--text-info` | `rgba(22,16,12,0.8)` | Info bar text |

## 3. Typography

### Font Stack
| Font | CSS Variable | Usage |
|------|-------------|-------|
| Fraunces | `--font-fraunces` | All headings (hero, section titles, card titles) |
| Inter | `--font-sans` | Body text, UI labels, buttons, badges |

### Type Scale
| Style | Font | Size | Weight |
|-------|------|------|--------|
| Hero Title | Fraunces | 64px | Normal |
| Section Title | Fraunces | 48px | Normal |
| Card Title | Fraunces | 18px | Normal |
| Body | Inter | 14-16px | Regular |
| Small | Inter | 12-13px | Regular |
| Price | Inter | 18-20px | Bold |
| Badge | Inter | 10-12px | Bold |

## 4. Spacing & Layout
| Token | Value |
|-------|-------|
| Page Width | 1440px |
| Horizontal Padding | 60px |
| Section Gap | 108px |
| Card Padding | 16-20px |
| Input Padding | 10-14px |

## 5. Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 0.625rem | Base radius |
| Card | 20px | Food cards, combo cards |
| Button | 8-16px | Standard buttons |
| Pill | 20px (full) | Category pills, badges |
| Image | 24px | Hero image, signature plate |

## 6. Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0px 1px 2px rgba(30,26,22,0.04), 0px 8px 24px rgba(30,26,22,0.06)` | Card elevation |
| `--shadow-badge` | `0px 4px 8px rgba(30,26,22,0.05), 0px 24px 48px -12px rgba(30,26,22,0.18)` | Badge popups |
| `--shadow-elevated` | `0px 8px 24px -8px rgba(13,21,40,0.12), 0px 4px 8px -4px rgba(13,21,40,0.06)` | Elevated cards |

## 7. Responsive Breakpoints
| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, stacked |
| Tablet | 768-1024px | 2 columns |
| Desktop | > 1024px | Full layout |
