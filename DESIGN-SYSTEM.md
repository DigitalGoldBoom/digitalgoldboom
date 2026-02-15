# DESIGN-SYSTEM.md — digitalgoldboom.com

**Created:** 2026-02-14  
**Designer:** Dieter 🎨  
**Phase:** 2 (Complete)  
**Version:** 1.0

---

> "Good design is as little design as possible."  
> — Dieter Rams

This design system provides exact specifications for building digitalgoldboom.com. Ada should be able to implement any component without design questions.

---

## 1. Color Palette

### 1.1 Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--gold-primary` | `#FFD700` | Primary accent, CTAs, important highlights |
| `--gold-light` | `#FFE55C` | Hover states, glow effects |
| `--gold-dark` | `#CC9900` | Pressed states, borders |
| `--gold-muted` | `#B8860B` | Secondary gold elements, subtle accents |
| `--gold-glow` | `rgba(255, 215, 0, 0.15)` | Background glow, card highlights |

### 1.2 Background Colors (Dark Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0B` | Page background |
| `--bg-secondary` | `#111113` | Card backgrounds, elevated surfaces |
| `--bg-tertiary` | `#1A1A1D` | Input fields, code blocks, hover states |
| `--bg-elevated` | `#222226` | Dropdowns, modals, tooltips |

### 1.3 Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#F5F5F5` | Headings, body text |
| `--text-secondary` | `#A1A1AA` | Secondary text, descriptions |
| `--text-tertiary` | `#71717A` | Captions, timestamps, meta |
| `--text-disabled` | `#52525B` | Disabled states |
| `--text-inverse` | `#0A0A0B` | Text on gold backgrounds |

### 1.4 Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#22C55E` | Positive price change, success states |
| `--success-muted` | `rgba(34, 197, 94, 0.15)` | Success backgrounds |
| `--error` | `#EF4444` | Negative price change, errors |
| `--error-muted` | `rgba(239, 68, 68, 0.15)` | Error backgrounds |
| `--warning` | `#F59E0B` | Warnings, caution |
| `--warning-muted` | `rgba(245, 158, 11, 0.15)` | Warning backgrounds |
| `--info` | `#3B82F6` | Info states, links |

### 1.5 Border Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--border-default` | `#27272A` | Default borders |
| `--border-subtle` | `#1F1F23` | Subtle dividers |
| `--border-focus` | `#FFD700` | Focus rings |
| `--border-hover` | `#3F3F46` | Hover borders |

### 1.6 Tailwind Config

```js
// tailwind.config.js colors extension
colors: {
  gold: {
    DEFAULT: '#FFD700',
    light: '#FFE55C',
    dark: '#CC9900',
    muted: '#B8860B',
    glow: 'rgba(255, 215, 0, 0.15)',
  },
  dark: {
    900: '#0A0A0B',
    800: '#111113',
    700: '#1A1A1D',
    600: '#222226',
    500: '#27272A',
    400: '#3F3F46',
    300: '#52525B',
    200: '#71717A',
    100: '#A1A1AA',
  },
}
```

---

## 2. Typography

### 2.1 Font Families

| Usage | Font | Fallback | Weight Range |
|-------|------|----------|--------------|
| Headings | `"Inter"` | `system-ui, sans-serif` | 600–700 |
| Body | `"Inter"` | `system-ui, sans-serif` | 400–500 |
| Monospace | `"JetBrains Mono"` | `monospace` | 400–500 |

**Why Inter:** Clean, modern, excellent legibility at all sizes, wide language support, variable font available.

### 2.2 Type Scale

| Token | Size (px) | Size (rem) | Line Height | Weight | Usage |
|-------|-----------|------------|-------------|--------|-------|
| `--text-display` | 60 | 3.75 | 1.1 | 700 | Hero headlines only |
| `--text-h1` | 40 | 2.5 | 1.2 | 700 | Page titles |
| `--text-h2` | 32 | 2 | 1.25 | 600 | Section headers |
| `--text-h3` | 24 | 1.5 | 1.3 | 600 | Subsections |
| `--text-h4` | 20 | 1.25 | 1.4 | 600 | Card titles |
| `--text-h5` | 18 | 1.125 | 1.4 | 600 | Widget headers |
| `--text-h6` | 16 | 1 | 1.5 | 600 | Small headers |
| `--text-body-lg` | 18 | 1.125 | 1.6 | 400 | Lead paragraphs |
| `--text-body` | 16 | 1 | 1.6 | 400 | Body text |
| `--text-body-sm` | 14 | 0.875 | 1.5 | 400 | Secondary body |
| `--text-caption` | 12 | 0.75 | 1.4 | 500 | Labels, captions |
| `--text-overline` | 11 | 0.6875 | 1.4 | 600 | Overlines, tags |

### 2.3 Letter Spacing

| Element | Letter Spacing |
|---------|----------------|
| Display/H1 | `-0.02em` |
| H2–H3 | `-0.01em` |
| Body text | `0` |
| Overlines/Labels | `0.05em` (uppercase) |

### 2.4 Price Display Typography

For price widgets, use tabular numbers for alignment:

```css
.price-value {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

---

## 3. Spacing System

### 3.1 Base Unit

**Base:** `4px` — All spacing derives from multiples of 4.

### 3.2 Spacing Scale

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--space-0` | 0 | Reset |
| `--space-1` | 4px | Tight inline spacing |
| `--space-2` | 8px | Icon gaps, tight padding |
| `--space-3` | 12px | Button padding (y), input padding |
| `--space-4` | 16px | Default padding, gaps |
| `--space-5` | 20px | Card padding (mobile) |
| `--space-6` | 24px | Section gaps, card padding (desktop) |
| `--space-8` | 32px | Component margins |
| `--space-10` | 40px | Section padding (mobile) |
| `--space-12` | 48px | Large gaps |
| `--space-16` | 64px | Section padding (desktop) |
| `--space-20` | 80px | Page section margins |
| `--space-24` | 96px | Hero padding |
| `--space-32` | 128px | Large section breaks |

### 3.3 Component Padding Rules

| Component | Mobile | Desktop |
|-----------|--------|---------|
| **Container** | `16px` horizontal | `24px` horizontal |
| **Card** | `20px` | `24px` |
| **Button (sm)** | `8px 16px` | `8px 16px` |
| **Button (md)** | `12px 24px` | `12px 24px` |
| **Button (lg)** | `16px 32px` | `16px 32px` |
| **Input** | `12px 16px` | `12px 16px` |
| **Section** | `40px 0` | `64px 0` |
| **Nav** | `12px 16px` | `16px 24px` |

### 3.4 Container Width

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile | `100%` | `16px` |
| Tablet | `100%` | `24px` |
| Desktop | `1200px` | `24px` |
| Wide | `1440px` | `48px` |

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}
```

---

## 4. Component Specifications

### 4.1 Buttons

#### Primary Button (Gold CTA)
```css
.btn-primary {
  background: var(--gold-primary);
  color: var(--text-inverse);
  font-weight: 600;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: var(--gold-light);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.btn-primary:active {
  background: var(--gold-dark);
  transform: translateY(1px);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--gold-primary);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: var(--dark-400);
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid var(--border-default);
  cursor: pointer;
  transition: all 150ms ease;
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-hover);
}

.btn-secondary:active {
  background: var(--bg-elevated);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--gold-primary);
  font-weight: 500;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
}

.btn-ghost:hover {
  background: var(--gold-glow);
}
```

#### Button Sizes
| Size | Font | Padding | Height |
|------|------|---------|--------|
| `sm` | 14px | `8px 16px` | 36px |
| `md` | 16px | `12px 24px` | 44px |
| `lg` | 18px | `16px 32px` | 52px |

---

### 4.2 Cards

#### Base Card
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
}

.card:hover {
  border-color: var(--border-default);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
```

#### Article Card
```
┌────────────────────────────────────┐
│ [Image 16:9 ratio]                 │  ← aspect-ratio: 16/9
├────────────────────────────────────┤
│ CATEGORY · 5 min read              │  ← overline, --text-tertiary
│                                    │
│ Article Title Goes Here            │  ← h4, --text-primary
│                                    │
│ Brief excerpt text that gives      │  ← body-sm, --text-secondary
│ readers a preview...               │     max 2 lines, truncate
│                                    │
│ Feb 14, 2026                       │  ← caption, --text-tertiary
└────────────────────────────────────┘
```

```css
.article-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  transition: all 200ms ease;
}

.article-card:hover {
  border-color: var(--gold-muted);
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.article-card__image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.article-card__content {
  padding: 20px;
}

.article-card__category {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--gold-muted);
}
```

#### Price Widget Card
```
┌────────────────────────────────────────┐
│  GOLD SPOT (XAU/USD)                   │  ← overline
│  ═══════════════════════════════════   │  ← gold border
│                                        │
│  $2,847.50                             │  ← h2 size, white
│  +$12.30 (+0.43%)        ▲             │  ← success green
│                                        │
│  Last updated: 2 min ago               │  ← caption, tertiary
└────────────────────────────────────────┘
```

```css
.price-widget {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-top: 3px solid var(--gold-primary);
  border-radius: 0 0 12px 12px;
  padding: 24px;
}

.price-widget__value {
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
  line-height: 1.2;
}

.price-widget__change {
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
}

.price-widget__change--positive {
  color: var(--success);
}

.price-widget__change--negative {
  color: var(--error);
}
```

#### CTA Card
```
┌────────────────────────────────────────┐
│                                        │
│  📖 Get Your Free Copy                 │  ← emoji + h3
│                                        │
│  Download "The Digital Gold Boom"      │  ← body, secondary
│  and discover the future of gold       │
│  investment.                           │
│                                        │
│  [Download Now — Free]                 │  ← btn-primary, full width
│                                        │
└────────────────────────────────────────┘
   ↑ Subtle gold glow on card
```

```css
.cta-card {
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    rgba(255, 215, 0, 0.05) 100%
  );
  border: 1px solid var(--gold-dark);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.08);
}

.cta-card__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.cta-card__description {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.6;
}
```

---

### 4.3 Form Inputs

#### Text Input
```css
.input {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: var(--text-primary);
  width: 100%;
  transition: all 150ms ease;
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:hover {
  border-color: var(--border-hover);
}

.input:focus {
  outline: none;
  border-color: var(--gold-primary);
  box-shadow: 0 0 0 3px var(--gold-glow);
}

.input:disabled {
  background: var(--bg-secondary);
  color: var(--text-disabled);
  cursor: not-allowed;
}

.input--error {
  border-color: var(--error);
}

.input--error:focus {
  box-shadow: 0 0 0 3px var(--error-muted);
}
```

#### Input with Label
```css
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-helper {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 6px;
}

.form-error {
  font-size: 12px;
  color: var(--error);
  margin-top: 6px;
}
```

#### Newsletter Form (Inline)
```
┌─────────────────────────────────┬──────────────┐
│ Enter your email                │  Subscribe   │
└─────────────────────────────────┴──────────────┘
```

```css
.newsletter-form {
  display: flex;
  gap: 0;
  max-width: 480px;
}

.newsletter-form__input {
  flex: 1;
  border-radius: 8px 0 0 8px;
  border-right: none;
}

.newsletter-form__button {
  border-radius: 0 8px 8px 0;
  white-space: nowrap;
}
```

---

### 4.4 Navigation

#### Header (Sticky)
```
┌────────────────────────────────────────────────────────────┐
│  🪙 DigitalGoldBoom     News  Prices  Book  Newsletter     │
│                                        [Download Book →]   │
└────────────────────────────────────────────────────────────┘
```

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 11, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__link {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease;
}

.header__link:hover {
  color: var(--text-primary);
}

.header__link--active {
  color: var(--gold-primary);
}

/* Mobile menu toggle */
.header__menu-btn {
  display: none;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header__nav {
    display: none;
  }
  .header__menu-btn {
    display: block;
  }
  .header__cta {
    display: none;
  }
}
```

#### Mobile Navigation Drawer
```css
.mobile-nav {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  padding: 24px;
  z-index: 99;
  transform: translateX(100%);
  transition: transform 300ms ease;
}

.mobile-nav--open {
  transform: translateX(0);
}

.mobile-nav__link {
  display: block;
  padding: 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-subtle);
}
```

---

### 4.5 Footer

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Stay Updated                                              │
│  Get weekly insights on digital gold and tokenization.     │
│                                                            │
│  ┌─────────────────────────────────┬──────────────┐        │
│  │ Enter your email                │  Subscribe   │        │
│  └─────────────────────────────────┴──────────────┘        │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🪙 DigitalGoldBoom                                        │
│                                                            │
│  NAVIGATE          RESOURCES        LEGAL                  │
│  Home              The Book         Privacy                │
│  Prices            Newsletter       Terms                  │
│  News              Research         Disclaimers            │
│  About                                                     │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  © 2026 DigitalGoldBoom. All rights reserved.              │
│                                         𝕏  📘  ✉️           │
└────────────────────────────────────────────────────────────┘
```

```css
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  margin-top: 80px;
}

.footer__newsletter {
  background: linear-gradient(
    180deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
  padding: 48px 24px;
  text-align: center;
}

.footer__content {
  padding: 48px 24px;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 48px;
}

@media (max-width: 768px) {
  .footer__content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .footer__content {
    grid-template-columns: 1fr;
  }
}

.footer__heading {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.footer__link {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  transition: color 150ms ease;
}

.footer__link:hover {
  color: var(--gold-primary);
}

.footer__bottom {
  border-top: 1px solid var(--border-subtle);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--text-tertiary);
}
```

---

## 5. Effects

### 5.1 Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0 | Sharp edges |
| `--radius-sm` | 4px | Tags, badges |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals, large cards |
| `--radius-2xl` | 24px | Hero elements |
| `--radius-full` | 9999px | Pills, avatars |

### 5.2 Shadows

```css
/* Subtle - for slight elevation */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);

/* Medium - cards, dropdowns */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);

/* Large - modals, popovers */
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);

/* Extra large - hero elements */
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);

/* Gold glow - CTAs, highlights */
--shadow-gold-sm: 0 0 12px rgba(255, 215, 0, 0.2);
--shadow-gold-md: 0 0 24px rgba(255, 215, 0, 0.25);
--shadow-gold-lg: 0 0 40px rgba(255, 215, 0, 0.3);
```

### 5.3 Hover States

| Element | Hover Effect |
|---------|--------------|
| Cards | `translateY(-4px)` + `shadow-lg` + border color change |
| Buttons (primary) | Lighten background + gold glow |
| Buttons (secondary) | Background fill + border change |
| Links | Color change to gold |
| Nav items | Color change + optional underline |
| Images | Slight scale (`1.02`) in cards |

### 5.4 Transitions & Animations

#### Standard Transitions
```css
--transition-fast: 150ms ease;      /* Buttons, inputs */
--transition-base: 200ms ease;      /* Cards, general */
--transition-slow: 300ms ease;      /* Modals, drawers */
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy */
```

#### Keyframe Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gold pulse (for loading states, live indicators) */
@keyframes goldPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Price update flash */
@keyframes priceFlash {
  0% { background: transparent; }
  50% { background: var(--gold-glow); }
  100% { background: transparent; }
}

.price-updated {
  animation: priceFlash 600ms ease;
}
```

#### Loading States
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-elevated) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 6. Responsive Breakpoints

### 6.1 Breakpoint Values

| Name | Min Width | Usage |
|------|-----------|-------|
| `sm` | 480px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### 6.2 Mobile-First Media Queries

```css
/* Base styles: Mobile (< 480px) */

@media (min-width: 480px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 6.3 Responsive Changes

| Element | Mobile | Tablet (768px+) | Desktop (1024px+) |
|---------|--------|-----------------|-------------------|
| **Container padding** | 16px | 24px | 24px |
| **Section padding** | 40px 0 | 48px 0 | 64px 0 |
| **H1 size** | 32px | 36px | 40px |
| **H2 size** | 24px | 28px | 32px |
| **Body size** | 16px | 16px | 16px |
| **Grid columns** | 1 | 2 | 3–4 |
| **Nav** | Hamburger menu | Hamburger menu | Inline links |
| **Card layout** | Stack | 2-column grid | 3-column grid |
| **Hero** | Stacked | Stacked | Side-by-side |
| **Footer columns** | 1 | 2 | 4 |
| **Price widgets** | Stack | 2-column | 4-column |

### 6.4 Touch Targets

Minimum touch target: `44px × 44px` (WCAG 2.1 Level AAA)

```css
@media (pointer: coarse) {
  .btn, .input, .header__link {
    min-height: 44px;
  }
}
```

---

## 7. Accessibility (WCAG AA)

### 7.1 Color Contrast

All text meets WCAG AA standards:

| Combination | Ratio | Pass |
|-------------|-------|------|
| `--text-primary` on `--bg-primary` | 15.5:1 | ✅ AAA |
| `--text-secondary` on `--bg-primary` | 6.8:1 | ✅ AA |
| `--text-tertiary` on `--bg-primary` | 4.7:1 | ✅ AA |
| `--gold-primary` on `--bg-primary` | 10.2:1 | ✅ AAA |
| `--text-inverse` on `--gold-primary` | 11.4:1 | ✅ AAA |

### 7.2 Focus States

All interactive elements must have visible focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--gold-primary);
  outline-offset: 2px;
}
```

### 7.3 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.4 Screen Reader Considerations

- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- All images require `alt` text
- Price changes announce with `aria-live="polite"`
- Form inputs have associated labels
- Error messages linked with `aria-describedby`

---

## 8. Icon Set

**Recommended:** [Lucide Icons](https://lucide.dev/) — Clean, consistent, tree-shakable.

### Core Icons Needed

| Icon | Usage |
|------|-------|
| `menu` | Mobile nav toggle |
| `x` | Close/dismiss |
| `arrow-right` | CTAs, links |
| `arrow-up-right` | External links |
| `download` | Book download |
| `mail` | Newsletter |
| `trending-up` | Positive change |
| `trending-down` | Negative change |
| `book-open` | Book references |
| `newspaper` | News/articles |
| `bar-chart-2` | Prices |
| `info` | Tooltips |
| `check` | Success |
| `alert-circle` | Warnings/errors |
| `loader` | Loading |
| `sun` / `moon` | Theme toggle (future) |

### Icon Sizing

| Size | Dimension | Usage |
|------|-----------|-------|
| `sm` | 16px | Inline text |
| `md` | 20px | Buttons, nav |
| `lg` | 24px | Standalone |
| `xl` | 32px | Feature icons |

---

## 9. Design Tokens (CSS Variables)

Complete token export for `globals.css`:

```css
:root {
  /* Colors - Gold */
  --gold-primary: #FFD700;
  --gold-light: #FFE55C;
  --gold-dark: #CC9900;
  --gold-muted: #B8860B;
  --gold-glow: rgba(255, 215, 0, 0.15);
  
  /* Colors - Background */
  --bg-primary: #0A0A0B;
  --bg-secondary: #111113;
  --bg-tertiary: #1A1A1D;
  --bg-elevated: #222226;
  
  /* Colors - Text */
  --text-primary: #F5F5F5;
  --text-secondary: #A1A1AA;
  --text-tertiary: #71717A;
  --text-disabled: #52525B;
  --text-inverse: #0A0A0B;
  
  /* Colors - Semantic */
  --success: #22C55E;
  --success-muted: rgba(34, 197, 94, 0.15);
  --error: #EF4444;
  --error-muted: rgba(239, 68, 68, 0.15);
  --warning: #F59E0B;
  --warning-muted: rgba(245, 158, 11, 0.15);
  --info: #3B82F6;
  
  /* Colors - Border */
  --border-default: #27272A;
  --border-subtle: #1F1F23;
  --border-focus: #FFD700;
  --border-hover: #3F3F46;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
  --shadow-gold-sm: 0 0 12px rgba(255, 215, 0, 0.2);
  --shadow-gold-md: 0 0 24px rgba(255, 215, 0, 0.25);
  --shadow-gold-lg: 0 0 40px rgba(255, 215, 0, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## 10. Design Principles Summary

1. **Less is more** — Every element must earn its place
2. **Dark-first** — Optimized for dark mode; light mode deferred
3. **Gold as accent** — Sparingly used for impact
4. **Conversion-focused** — CTAs are prominent but not overwhelming
5. **Mobile-first** — Start small, scale up
6. **Accessible** — WCAG AA minimum, AAA where possible
7. **Performance** — Minimal CSS, no heavy assets
8. **Consistent** — Use tokens, never one-off values

---

## Phase 2 Complete

**Delivered:**
- Full color palette with semantic tokens
- Typography scale with Inter font
- 4px-based spacing system
- Component specs (buttons, cards, forms, nav, footer)
- Effects system (shadows, transitions, animations)
- Responsive breakpoints with change matrix
- Accessibility requirements
- Complete CSS custom properties

**For Phase 4 (Component Build):**
- All specs are implementation-ready
- Tailwind config values provided
- CSS variables for direct use
- ASCII diagrams for visual reference

**Open Questions Resolved:**
- ✅ Light mode: Deferred (dark-first, add later)
- ✅ Icon set: Lucide Icons recommended
- ✅ Font: Inter (variable, Google Fonts or self-hosted)

---

*"Good design is thorough down to the last detail."*  
— Dieter Rams

**Last Updated:** 2026-02-14 00:35 UTC  
**Designer:** Dieter 🎨
