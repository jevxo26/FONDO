---
name: Heritage Precision
colors:
  surface: '#fff8f1'
  surface-dim: '#e1d9cd'
  surface-bright: '#fff8f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2e6'
  surface-container: '#f5ede1'
  surface-container-high: '#f0e7db'
  surface-container-highest: '#eae1d5'
  on-surface: '#1f1b14'
  on-surface-variant: '#4d4636'
  inverse-surface: '#343028'
  inverse-on-surface: '#f8f0e3'
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
  background: '#fff8f1'
  on-background: '#1f1b14'
  surface-variant: '#eae1d5'
  heritage-cream: '#FDF8F3'
  golden-amber: '#C8A23D'
  charcoal-black: '#1A1A1A'
  status-red: '#DC2626'
  status-green: '#16A34A'
  star-gold: '#F59E0B'
  body-gray: '#4B5563'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  price-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  section-gap-lg: 80px
  section-gap-sm: 40px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The brand identity bridges the gap between centuries-old Mughlai culinary traditions and modern, high-end hospitality. It targets a discerning audience in Dhaka who values the "slow-fire" philosophy but expects the efficiency and visual polish of a contemporary global restaurant. 

The design system employs a **Modern-Heritage** style—a fusion of **Minimalism** and **Corporate/Modern** reliability, accented with **Tactile** warmth. It utilizes a spacious, editorial layout to convey premium quality, using high-resolution photography of aged copper pots and artisanal plating to ground the digital experience in physical reality. The interface should feel expensive, calm, and deeply rooted in its local origin.

## Colors

The palette is anchored by **Heritage Cream**, a warm, inviting neutral that replaces sterile whites to evoke the feel of traditional parchment or linen. **Golden Amber** serves as the primary accent, used to highlight craftsmanship, luxury, and key actions. **Charcoal Black** provides the necessary weight and authority, used for high-contrast typography and primary interactive elements.

- **Primary (Golden Amber):** Use for "Order" actions, active states, and premium badges.
- **Secondary (Charcoal Black):** Use for headers, footer backgrounds, and high-priority buttons to ensure a grounded, modern feel.
- **Tertiary/Neutral (Heritage Cream):** The primary canvas for all pages to maintain warmth and softness.
- **Functional Colors:** Use `status-red` for discounts and alerts, and `star-gold` exclusively for ratings to differentiate from the brand amber.

## Typography

This design system uses a classic Serif/Sans-Serif pairing. **Playfair Display** carries the emotional weight of the brand, used for large headlines to communicate elegance and history. **Inter** handles the functional aspects, providing maximum legibility for menu items, descriptions, and transactional data.

- **Editorial Flair:** Use italics within Playfair Display headlines for specific words (e.g., "local", "heritage") to emphasize the artisanal nature of the food.
- **Hierarchy:** Ensure price points are always in a bold weight of the sans-serif face to maintain a clear commercial signal amidst the editorial styling.
- **Uppercase Labels:** Small caps or all-caps with increased letter spacing should be used for overlines and category labels to add a sophisticated, organized structure.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, centering content within a 1200px container to maintain an editorial feel. On mobile, it transitions to a single-column fluid flow with tight margins to maximize screen real estate for food photography.

- **Grid:** A 12-column system is used for desktop. Food cards typically span 4 columns (3-up), while large "Tonight's signature" sections use a 7/5 split between imagery and text.
- **Vertical Rhythm:** Generous white space (80px+) between sections is mandatory to prevent the UI from feeling cluttered, reinforcing the "Slow Food" brand narrative.
- **Mobile Reflow:** In mobile views, horizontal scrolling "carousels" should be used for category filters and "Popular Categories" to reduce page length.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and extremely subtle **Ambient Shadows**. 

- **Surface Strategy:** The primary background is the warm `heritage-cream`. White (`#FFFFFF`) is used for elevated containers like food cards and order summaries to make them "pop" slightly against the cream base.
- **Shadows:** Use soft, multi-layered shadows for cards. Shadows should have a low opacity (4-8%) and a subtle amber tint (`#C8A23D` at 5% opacity) to maintain warmth.
- **Interactions:** On hover, cards should subtly lift (increased shadow spread) or scale (1.02x) to indicate interactivity without breaking the sophisticated aesthetic.

## Shapes

The shape language is consistently "Rounded," avoiding sharp industrial corners in favor of approachable, organic curves.

- **Cards:** Use a `1rem` (16px) radius for food cards and containers to match the softness of the brand.
- **Interactive Elements:** Primary action buttons (like "Order Now") use a **Pill-shaped** (rounded-full) treatment to stand out. Secondary inputs and small badges use the standard `0.5rem` (8px) radius.
- **Photography:** Large hero images and chef portraits should feature rounded corners to harmonize with the UI components.

## Components

### Buttons
- **Primary Dark:** Solid `#1A1A1A` background, white text, pill-shaped. Used for final conversion points.
- **Primary Golden:** Solid `#C8A23D` background, white text. Used for "Add to Cart" or secondary CTA.
- **Ghost/Outline:** Transparent background with a subtle `#1A1A1A` border. Used for "View All" or navigation-type actions.

### Food Cards
- **Structure:** White background, 16px border radius, subtle ambient shadow.
- **Badges:** Small "Best Seller" or "Discount" badges should be placed in the top-left of the image container with a slight overlap.
- **Cart CTA:** Integrated into the bottom of the card, often using a "plus" icon next to the primary action.

### Category Pills
- **Active:** Charcoal Black background with white text.
- **Inactive:** White background with a 1px `#F3F4F6` border and Charcoal Black text. 
- **Shape:** Always pill-shaped (rounded-full).

### Input Fields
- **Styling:** Light gray background (`#F9FAFB`), 8px border radius, and a `#D1D5DB` border that turns Golden Amber on focus.

### Feedback & Status
- **Rating Stars:** Use `star-gold` for filled states. Always accompanied by a numerical value in parentheses for clarity.
- **Success States:** Use a soft green background with dark green text for order confirmations.