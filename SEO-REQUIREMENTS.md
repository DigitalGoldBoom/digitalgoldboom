# SEO Requirements — digitalgoldboom.com

**Created by:** Gatsby 🔍 (SEO Ninja)  
**For:** Ada (Developer)  
**Date:** 2026-02-14  

---

## 1. Technical SEO Checklist

### Meta Tags (Every Page)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[150-160 chars max]">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://digitalgoldboom.com/[current-path]">
```

### Open Graph (Required)
```html
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:image" content="https://digitalgoldboom.com/images/og-[page].jpg">
<meta property="og:url" content="https://digitalgoldboom.com/[path]">
<meta property="og:type" content="website"> <!-- or "article" for news -->
<meta property="og:site_name" content="Digital Gold Boom">
```
**OG Image specs:** 1200×630px, <300KB, JPG format

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@digitalgoldboom">
<meta name="twitter:title" content="[Page Title]">
<meta name="twitter:description" content="[150 chars max]">
<meta name="twitter:image" content="https://digitalgoldboom.com/images/twitter-[page].jpg">
```

### robots.txt
Place at root: `https://digitalgoldboom.com/robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: https://digitalgoldboom.com/sitemap.xml
```

### sitemap.xml
- Generate dynamically or at build time
- Include all public pages with `<lastmod>` dates
- Submit to Google Search Console after launch
- Priority: Home (1.0), Book (0.9), Prices (0.8), News index (0.7), Articles (0.6)

### Canonical URLs
- **Every page must have a canonical tag**
- Self-referencing canonicals for main pages
- No trailing slashes (pick one style, stick to it)
- Always use `https://` (not http)

---

## 2. Page-Level Requirements

### Title Tag Formula
```
[Primary Keyword] — [Secondary Benefit] | Digital Gold Boom
```
- **Length:** 50-60 characters max
- **Primary keyword first**
- **Brand at end**

**Examples:**
- Home: `Digital Gold Investment 2026 — Tokenized Gold Guide | Digital Gold Boom`
- Prices: `Live Gold Price & PAXG Tracker — Real-Time Data | Digital Gold Boom`
- Book: `Digital Gold Boom Book — Your Guide to Gold Investment | Digital Gold Boom`
- News: `Gold News & Tokenization Updates Today | Digital Gold Boom`

### Meta Description Rules
- **Length:** 150-160 characters (Google truncates at ~160)
- **Include primary keyword naturally**
- **Include CTA** (Learn more, Check prices, Read now)
- **No duplicate descriptions across pages**

### Heading Structure
```
<h1> — ONE per page, contains primary keyword
  <h2> — Section headers (2-6 per page)
    <h3> — Subsections as needed
```
- **H1 must be unique per page**
- **H1 should differ slightly from title tag** (avoid exact duplication)
- **Never skip levels** (no H1 → H3)

### Image Alt Text Rules
- **Descriptive:** What's in the image + context
- **Include keywords naturally** (don't stuff)
- **Length:** 125 characters max
- **Format:** `[What it is] - [Context]`

**Examples:**
```html
<img alt="Gold bars stacked in vault - physical gold vs tokenized gold comparison">
<img alt="PAXG price chart showing 30-day trend - February 2026">
<img alt="Digital Gold Boom book cover - gold investment guide">
```

---

## 3. Core Web Vitals Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| **LCP** (Largest Contentful Paint) | <2.0s | <2.5s |
| **INP** (Interaction to Next Paint) | <150ms | <200ms |
| **CLS** (Cumulative Layout Shift) | <0.05 | <0.1 |

### How to Hit These:
- **LCP:** Preload hero images, use `next/image` with priority, inline critical CSS
- **INP:** Minimize JS, defer non-critical scripts, no layout thrashing
- **CLS:** Set explicit width/height on images, reserve space for dynamic content, no font flash (use `font-display: swap`)

---

## 4. URL Structure

### Rules
- **Lowercase only**
- **Hyphens for spaces** (not underscores)
- **No query parameters** for content pages
- **No file extensions** (.html, .php)
- **Max 3 levels deep**
- **Descriptive slugs** with keywords

### URL Map
```
/                           → Home
/prices                     → Live prices dashboard
/prices/gold                → Gold spot price
/prices/paxg                → PAXG token price
/book                       → Book landing page
/news                       → News index
/news/[slug]                → Individual articles
/about                      → About page
/contact                    → Contact page
```

### Bad vs Good
```
❌ /article.php?id=123
✅ /news/gold-tokenization-trends-2026

❌ /Book_Page
✅ /book

❌ /news/category/articles/post/my-article
✅ /news/my-article
```

---

## 5. Primary Keywords by Page

### Home (`/`)
| Priority | Keyword | Search Intent |
|----------|---------|---------------|
| 1 | digital gold | Informational |
| 2 | tokenized gold | Informational |
| 3 | gold investment 2026 | Commercial |

**Use in:** H1, first paragraph, meta description

### Prices (`/prices`)
| Priority | Keyword | Search Intent |
|----------|---------|---------------|
| 1 | gold price live | Transactional |
| 2 | PAXG price | Transactional |
| 3 | gold vs crypto | Informational |

**Use in:** H1, price labels, chart captions

### Book (`/book`)
| Priority | Keyword | Search Intent |
|----------|---------|---------------|
| 1 | digital gold boom book | Navigational |
| 2 | gold investment book | Commercial |

**Use in:** H1, book title area, CTA buttons

### News (`/news`)
| Priority | Keyword | Search Intent |
|----------|---------|---------------|
| 1 | gold news | Informational |
| 2 | tokenization news | Informational |
| 3 | gold market today | Informational |

**Use in:** H1, section headers, article summaries

---

## 6. Schema Markup (JSON-LD)

### Organization Schema (Every Page — in `<head>`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Gold Boom",
  "url": "https://digitalgoldboom.com",
  "logo": "https://digitalgoldboom.com/images/logo.png",
  "sameAs": [
    "https://twitter.com/digitalgoldboom"
  ]
}
```

### Book Schema (`/book`)
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Digital Gold Boom",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "description": "Complete guide to digital gold investment and tokenization.",
  "isbn": "[ISBN if available]",
  "numberOfPages": "[Page count]",
  "bookFormat": "https://schema.org/EBook",
  "url": "https://digitalgoldboom.com/book"
}
```

### Article Schema (Each news article)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article Title]",
  "description": "[Article summary]",
  "image": "[Article featured image URL]",
  "datePublished": "[ISO 8601 date]",
  "dateModified": "[ISO 8601 date]",
  "author": {
    "@type": "Organization",
    "name": "Digital Gold Boom"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digital Gold Boom",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digitalgoldboom.com/images/logo.png"
    }
  }
}
```

### FAQPage Schema (If FAQ section exists)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is tokenized gold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tokenized gold is physical gold represented as digital tokens on a blockchain..."
      }
    }
  ]
}
```

---

## 7. Internal Linking Strategy

### Link Map
```
HOME ←→ ALL PAGES (via nav)
  │
  ├── PRICES
  │     └── Link to: Book (CTA), News (related articles)
  │
  ├── BOOK
  │     └── Link to: Prices (see live data), News (stay updated)
  │
  └── NEWS
        └── Each article links to: Book (learn more), Prices (check prices), Related articles (2-3)
```

### Rules
1. **Every page links to Book** (primary conversion goal)
2. **News articles link to Prices** with contextual anchors ("check the current gold price")
3. **Use descriptive anchor text** — NOT "click here"
4. **3-5 internal links per page minimum**
5. **Related articles** at bottom of each news post (3 links)

### Anchor Text Examples
```
❌ "Click here to learn more"
✅ "Learn about tokenized gold investment"

❌ "Read more"  
✅ "Read our guide to PAXG vs physical gold"
```

---

## 8. Mobile-First Requirements

### Responsive Breakpoints
```css
/* Mobile first */
@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### Touch Targets
- **Minimum size:** 44×44px for all tappable elements
- **Spacing:** 8px minimum between touch targets
- **Thumb zone:** Primary CTAs in bottom 2/3 of screen

### Performance
- **First byte:** <600ms
- **Mobile page weight:** <1MB total
- **Images:** WebP with JPEG fallback, responsive srcset
- **Fonts:** Max 2 families, subset to needed characters

### Mobile UX Checklist
- [ ] No horizontal scroll
- [ ] Text readable without zoom (16px+ base)
- [ ] Forms use appropriate input types (`tel`, `email`, `number`)
- [ ] No intrusive interstitials
- [ ] Sticky nav doesn't eat >15% of viewport
- [ ] Price tables scroll horizontally if needed (with indicator)

---

## Pre-Launch Checklist

- [ ] All pages have unique title tags
- [ ] All pages have unique meta descriptions
- [ ] All pages have canonical tags
- [ ] All images have alt text
- [ ] robots.txt deployed
- [ ] sitemap.xml generated and accessible
- [ ] Schema markup validated (schema.org validator)
- [ ] Core Web Vitals pass (PageSpeed Insights)
- [ ] Mobile-friendly test pass (Google)
- [ ] No broken internal links
- [ ] 404 page exists with navigation
- [ ] HTTPS enforced, HTTP redirects to HTTPS
- [ ] Google Search Console verified
- [ ] Google Analytics / Plausible installed

---

**Questions?** Ping Gatsby 🔍

*SEO is not a one-time thing. We'll audit monthly post-launch.*
