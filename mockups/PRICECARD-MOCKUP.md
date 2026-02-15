# PriceCard Component — Visual Mockups 🖼️

**Designer:** Eames 🖼️  
**Date:** 2026-02-14  
**Based on:** Dieter's Design Audit  
**Aesthetic:** Bloomberg × Stripe — Data-dense, monochrome, gold as accent only

---

## Design Philosophy

> "Trust through simplicity. Authority through restraint."

- **Zero third-party branding**
- **Gold reserved for:** Logo, Book CTA, BIV highlight only
- **Everything else:** Monochrome (whites/grays on dark)
- **Data display:** Bold prices, minimal chrome

---

## 1. PriceCard Variants

### 1.1 Default Variant

```
┌─────────────────────────────────────┐
│                                     │
│  COMEX Gold Spot            ● LIVE  │  ← Label (overline) + Status
│  XAU/USD                            │  ← Sublabel (tertiary)
│                                     │
│         $2,847.50                   │  ← Price (hero size)
│         ▲ +0.42%                    │  ← Change (color-coded)
│                                     │
│  Updated 12:34 PM UTC               │  ← Timestamp (muted)
│                                     │
└─────────────────────────────────────┘
```

**Specs:**
```
┌─ Container ──────────────────────────┐
│  padding: 24px (p-6)                 │
│  border: 1px solid var(--border)     │
│  border-radius: 12px (rounded-xl)    │
│  background: var(--bg-secondary)     │
│  min-width: 280px                    │
│  max-width: 340px                    │
└──────────────────────────────────────┘

Typography:
  Label:     12px, 600 weight, uppercase, tracking-wide, --text-secondary
  Sublabel:  14px, 400 weight, --text-tertiary
  Price:     36px (text-4xl), 700 weight, --text-primary
  Change:    14px, 500 weight, --color-success or --color-error
  Timestamp: 12px, 400 weight, --text-muted

Status Dot:
  Size: 8px × 8px
  Color: --color-success (#22C55E)
  Animation: pulse (2s infinite)
```

---

### 1.2 Featured Variant (BIV Only)

```
┌─────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Gold gradient bar (4px)
│                                     │
│  BULLION INTRINSIC VALUE   [BIV]    │  ← Label + Gold badge
│  Gold Spot − Mining Cost            │  ← Formula sublabel
│                                     │
│         $1,397.50                   │  ← Price (gold tint)
│         ▲ +1.24%                    │
│                                     │
│  = $2,847.50 − $1,450.00            │  ← Calculation breakdown
│                                     │
│  Updated 12:34 PM UTC               │
│                                     │
└─────────────────────────────────────┘
```

**Additional Specs:**
```
┌─ Featured Additions ─────────────────┐
│  border-top: 4px solid --gold        │
│  background: linear-gradient(        │
│    180deg,                           │
│    rgba(255, 215, 0, 0.08) 0%,       │
│    var(--bg-secondary) 100%          │
│  )                                   │
│                                      │
│  BIV Badge:                          │
│    padding: 2px 8px                  │
│    background: --gold                │
│    color: --bg-primary (#0A0A0F)     │
│    border-radius: 4px                │
│    font-size: 11px                   │
│    font-weight: 700                  │
│    letter-spacing: 0.05em            │
│                                      │
│  Price Color: var(--gold) #FFD700    │
│                                      │
│  Calculation Row:                    │
│    font-size: 13px                   │
│    color: --text-muted               │
│    font-family: monospace            │
└──────────────────────────────────────┘
```

---

### 1.3 Compact Variant

```
┌────────────────────────────┐
│  Gold Spot     $2,847.50   │
│  XAU/USD        ▲ +0.42%   │
└────────────────────────────┘
```

**Specs:**
```
┌─ Compact Container ──────────────────┐
│  padding: 16px (p-4)                 │
│  border: 1px solid var(--border)     │
│  border-radius: 8px (rounded-lg)     │
│  background: var(--bg-secondary)     │
│  display: flex                       │
│  justify-content: space-between      │
│  align-items: center                 │
│  min-width: 240px                    │
└──────────────────────────────────────┘

Typography:
  Label:  14px, 600 weight, --text-primary
  Symbol: 12px, 400 weight, --text-tertiary
  Price:  20px (text-xl), 700 weight, --text-primary
  Change: 12px, 500 weight, color-coded
```

---

## 2. Hero Section Layout

### 2.1 Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                      Gold Went Digital.                                     │
│                      This Changes Everything.                               │
│                                                                             │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────────┐       │
│  │  Gold Spot      │   │  Mining Cost    │   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│       │
│  │  XAU/USD        │   │  AISC           │   │  BIV          [BIV]│       │
│  │                 │   │                 │   │                    │       │
│  │  $2,847.50      │   │  $1,450.00      │   │  $1,397.50         │       │
│  │  ▲ +0.42%       │   │  (Quarterly)    │   │  ▲ +1.24%          │       │
│  │                 │   │                 │   │                    │       │
│  └─────────────────┘   └─────────────────┘   └────────────────────┘       │
│       [subdued]            [subdued]              [FEATURED]               │
│                                                                             │
│                        [ View All Prices → ]                                │
│                                                                             │
│     47,000+ readers already understand the new gold economy                │
│                                                                             │
│                     [ Get the Free Book ]                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Desktop Grid Specs:**
```
┌─ Hero Grid ──────────────────────────┐
│  display: grid                       │
│  grid-template-columns: repeat(3,1fr)│
│  gap: 24px                           │
│  max-width: 900px                    │
│  margin: 0 auto                      │
│                                      │
│  Card 1 & 2 (subdued):               │
│    opacity: 0.85                     │
│    border: 1px solid --border-subtle │
│                                      │
│  Card 3 (BIV featured):              │
│    Full featured styles              │
│    box-shadow: 0 0 30px gold/10%     │
└──────────────────────────────────────┘
```

---

### 2.2 Tablet Layout (768px–1023px)

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│                Gold Went Digital.                         │
│                This Changes Everything.                   │
│                                                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │
│   │  BULLION INTRINSIC VALUE                  [BIV] │   │
│   │  = Gold Spot − Mining Cost                      │   │
│   │                                                  │   │
│   │              $1,397.50/oz                        │   │
│   │               ▲ +1.24%                           │   │
│   │                                                  │   │
│   │       [ See How It's Calculated → ]              │   │
│   │                                                  │   │
│   └──────────────────────────────────────────────────┘   │
│                                                           │
│    ┌───────────────────┐   ┌───────────────────┐         │
│    │ Gold Spot         │   │ Mining Cost       │         │
│    │ $2,847.50 ▲+0.42% │   │ $1,450.00/oz      │         │
│    └───────────────────┘   └───────────────────┘         │
│                 [compact cards]                           │
│                                                           │
│              [ Get the Free Book ]                        │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

### 2.3 Mobile Layout (<768px)

```
┌─────────────────────────────────────┐
│                                     │
│        Gold Went Digital.           │
│    This Changes Everything.         │
│                                     │
│  ┌─────────────────────────────┐   │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │
│  │                             │   │
│  │  THE NEW GOLD METRIC  [BIV] │   │
│  │                             │   │
│  │       $1,397.50/oz          │   │
│  │        ▲ +1.24%             │   │
│  │                             │   │
│  │  = Gold Spot − Mining Cost  │   │
│  │                             │   │
│  │  [ What is BIV? → ]         │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│     [ View All Prices ]             │
│     (link, not button)              │
│                                     │
│  47,000+ readers already get it     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    [ GET THE FREE BOOK ]    │   │ ← Full-width gold CTA
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Mobile Specs:**
```
┌─ Mobile Hero ────────────────────────┐
│  padding: 24px 16px                  │
│  text-align: center                  │
│                                      │
│  BIV Card:                           │
│    width: 100%                       │
│    margin: 0 16px                    │
│    padding: 24px 20px                │
│                                      │
│  CTA Button:                         │
│    width: calc(100% - 32px)          │
│    height: 56px (touch-friendly)     │
│    font-size: 16px                   │
│    font-weight: 700                  │
│                                      │
│  "View All Prices" link:             │
│    padding: 12px                     │
│    font-size: 14px                   │
│    touch-target: 44px min            │
└──────────────────────────────────────┘
```

---

## 3. Component States

### 3.1 Loading State (Skeleton)

```
┌─────────────────────────────────────┐
│                                     │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ● ····    │  ← Pulsing dot
│  ▓▓▓▓▓▓▓                            │
│                                     │
│         ▓▓▓▓▓▓▓▓▓▓▓                 │  ← Shimmer animation
│         ▓▓▓▓▓▓▓                     │
│                                     │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                 │
│                                     │
└─────────────────────────────────────┘
```

**Skeleton CSS:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 0%,
    var(--bg-elevated) 50%,
    var(--bg-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton dimensions (match actual content) */
.skeleton-label { width: 120px; height: 14px; }
.skeleton-sublabel { width: 70px; height: 12px; margin-top: 4px; }
.skeleton-price { width: 140px; height: 40px; margin: 16px auto; }
.skeleton-change { width: 60px; height: 14px; margin: 0 auto; }
.skeleton-timestamp { width: 160px; height: 12px; margin-top: 12px; }
```

---

### 3.2 Loaded State

```
┌─────────────────────────────────────┐
│                                     │
│  COMEX Gold Spot            ● LIVE  │  ← Green dot, steady
│  XAU/USD                            │
│                                     │
│         $2,847.50                   │
│         ▲ +0.42%                    │  ← Green text
│                                     │
│  Updated 12:34 PM UTC               │
│                                     │
└─────────────────────────────────────┘
```

---

### 3.3 Error State (API Failure)

```
┌─────────────────────────────────────┐
│                                     │
│  COMEX Gold Spot            ● ···   │  ← Red dot, pulsing slowly
│  XAU/USD                            │
│                                     │
│         $2,847.50                   │  ← Last known price (dimmed)
│         (Last known)                │  ← Instead of change
│                                     │
│  ⚠ Unable to fetch live data        │  ← Warning message
│  [ Retry ]                          │  ← Retry button
│                                     │
└─────────────────────────────────────┘
```

**Error State Specs:**
```
┌─ Error Styling ──────────────────────┐
│  Status dot: --color-error (#EF4444) │
│  Animation: pulse-slow (3s infinite) │
│                                      │
│  Price styling:                      │
│    opacity: 0.6                      │
│    Show last known value             │
│                                      │
│  "(Last known)" text:                │
│    color: --text-muted               │
│    font-size: 12px                   │
│    font-style: italic                │
│                                      │
│  Warning row:                        │
│    color: --color-warning (#F59E0B)  │
│    font-size: 12px                   │
│    display: flex                     │
│    align-items: center               │
│    gap: 6px                          │
│                                      │
│  Retry button:                       │
│    padding: 8px 16px                 │
│    border: 1px solid --border        │
│    border-radius: 6px                │
│    font-size: 12px                   │
│    cursor: pointer                   │
│    hover: bg --bg-elevated           │
└──────────────────────────────────────┘
```

---

### 3.4 Price Change Indicators

**Price Going UP:**
```
│         $2,847.50                   │
│         ▲ +0.42%                    │
```

```css
.price-up {
  color: var(--color-success);  /* #22C55E */
}
.price-up::before {
  content: "▲ +";
}
/* Flash animation on change */
.price-flash-up {
  animation: flash-green 0.6s ease-out;
}
@keyframes flash-green {
  0% { background-color: rgba(34, 197, 94, 0.3); }
  100% { background-color: transparent; }
}
```

**Price Going DOWN:**
```
│         $2,847.50                   │
│         ▼ −0.31%                    │
```

```css
.price-down {
  color: var(--color-error);  /* #EF4444 */
}
.price-down::before {
  content: "▼ −";
}
.price-flash-down {
  animation: flash-red 0.6s ease-out;
}
@keyframes flash-red {
  0% { background-color: rgba(239, 68, 68, 0.3); }
  100% { background-color: transparent; }
}
```

**Price FLAT (< 0.01% change):**
```
│         $2,847.50                   │
│         ● 0.00%                     │
```

```css
.price-flat {
  color: var(--text-muted);
}
.price-flat::before {
  content: "● ";
}
```

---

## 4. Responsive Breakpoints

| Breakpoint | Width | Layout | Card Style |
|------------|-------|--------|------------|
| **Mobile** | <640px | Single column, BIV only in hero | Full-width cards |
| **Mobile-L** | 640–767px | Single column, BIV only | Cards with 16px margin |
| **Tablet** | 768–1023px | BIV featured + 2 compact below | Mixed layout |
| **Desktop** | 1024–1279px | 3-column grid | All cards equal width |
| **Desktop-L** | ≥1280px | 3-column grid, max-width container | Max 340px per card |

**Breakpoint CSS:**
```css
/* Mobile first */
.price-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .price-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 24px;
  }
  .price-grid .compact-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .price-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1080px;
    margin: 0 auto;
  }
  .price-grid .compact-row {
    display: contents; /* Flatten for 3-col grid */
  }
}

/* Desktop Large */
@media (min-width: 1280px) {
  .price-card {
    max-width: 340px;
  }
}
```

---

## 5. Color System (Simplified Per Dieter)

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--gold` | `#FFD700` | Logo, Book CTA, BIV only |
| `--gold-subtle` | `rgba(255,215,0,0.1)` | BIV card gradient |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0F` | Page background |
| `--bg-secondary` | `#111118` | Card backgrounds |
| `--bg-tertiary` | `#1A1A24` | Skeleton base |
| `--bg-elevated` | `#252530` | Hover states, skeleton highlight |
| `--border` | `rgba(255,255,255,0.1)` | Card borders |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Subdued card borders |

### Text Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FFFFFF` | Headlines, prices |
| `--text-secondary` | `#E5E5E5` | Labels |
| `--text-tertiary` | `#A3A3A3` | Sublabels |
| `--text-muted` | `#737373` | Timestamps, hints |

### Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#22C55E` | Price up, live status |
| `--color-error` | `#EF4444` | Price down, errors |
| `--color-warning` | `#F59E0B` | Warnings, alerts |

---

## 6. Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon gaps, tight spacing |
| `--space-sm` | 8px | Between related elements |
| `--space-md` | 16px | Card padding (compact) |
| `--space-lg` | 24px | Card padding (default), grid gaps |
| `--space-xl` | 32px | Section spacing |
| `--space-2xl` | 48px | Hero padding |

---

## 7. Typography Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Hero | 48px | 800 | 1.1 | Page titles |
| Price-lg | 36px | 700 | 1.2 | Featured price |
| Price-md | 24px | 700 | 1.2 | Default price |
| Price-sm | 20px | 700 | 1.2 | Compact price |
| Label | 12px | 600 | 1.4 | Overlines, uppercase |
| Body | 14px | 400 | 1.5 | Descriptions |
| Caption | 12px | 400 | 1.4 | Timestamps, hints |

---

## 8. Interactive States

### Hover (Desktop Only)

```
Default → Hover
┌──────────────┐    ┌──────────────┐
│              │    │  ╭──────────╮│  ← Subtle lift
│   $2,847     │ →  │  │ $2,847   ││    transform: translateY(-2px)
│              │    │  ╰──────────╯│    box-shadow: 0 4px 20px rgba(0,0,0,0.2)
└──────────────┘    └──────────────┘
```

```css
.price-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.price-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Featured card hover */
.price-card.featured:hover {
  box-shadow: 0 4px 30px rgba(255, 215, 0, 0.15);
}
```

### Focus (Accessibility)

```css
.price-card:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}
```

### Active/Pressed

```css
.price-card:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

---

## 9. Animation Specs

### Live Status Dot Pulse

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-dot.live {
  animation: pulse 2s ease-in-out infinite;
}
```

### Price Update Flash

```css
@keyframes price-update {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.price-value.updating {
  animation: price-update 0.3s ease-out;
}
```

### Skeleton Shimmer

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 10. Touch Target Compliance (WCAG 2.1)

All interactive elements meet 44×44px minimum:

| Element | Actual Size | Touch Area |
|---------|-------------|------------|
| Price Card (click to expand) | 280×180px | ✅ Full card |
| "View All Prices" link | 14px text | 44px min-height applied |
| Retry button | 32px height | 44px touch target |
| Status dot (non-interactive) | 8px | N/A |

---

## Implementation Notes for Ada 💻

1. **Component Structure:**
   ```tsx
   <PriceCard
     symbol="XAU"
     label="COMEX Gold Spot"
     sublabel="XAU/USD"
     variant="default" | "featured" | "compact"
   />
   ```

2. **State Management:**
   - Use React Query or SWR for data fetching
   - Cache last known value for error fallback
   - Refresh interval: 30 seconds for live data

3. **API Priority:**
   - Primary: CoinGecko (free, reliable)
   - Fallback: MetalpriceAPI
   - AISC: Static config value (quarterly update)
   - BIV: Client-calculated (Gold - AISC)

4. **Accessibility:**
   - `aria-live="polite"` on price updates
   - `role="status"` for live indicator
   - Proper heading hierarchy

5. **Performance:**
   - Preload fonts for price display
   - Use CSS containment on cards
   - Lazy load below-fold cards

---

*Mockups ready for implementation. Zero third-party branding. Bloomberg meets Stripe.*

— Eames 🖼️
