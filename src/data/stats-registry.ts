// Live-stat registry for the /live dashboard.
//
// REWORKED 2026-06-30 for the current 17-chapter / 2-section book (Operation
// Condense). STRIPPED 2026-06-30 (author directive): a figure earns a card ONLY
// if it has live data behind it — a feed drives it, OR it is a fixed INPUT to a
// number a feed drives (e.g. the 133,518 reserved-token count feeds the live
// BIV math). Figures that are just "what they are" with no live feed (gold ETF
// AUM, GLD, ESG AUM, central-bank tonnes, annual demand, the 98% operating
// margin, Fireblocks corporate stats) are NOT shown here.
//
// The gold-anchored token economics the book presents AS TABLES (Ch 5 scorecard,
// Ch 11 BIV formula + exchange ratios, Ch 15 three-year forecast, Ch 16 BIV
// trajectory) are rendered as live TABLES via tables-registry.ts, recreated the
// way the book displays them. They are not duplicated as cards here.
//
// The locked anchors (spot $5,194 / AISC $1,676 / BIV $3,518) show once in the
// always-on Key Inputs row at the top of the page.
//
// Every value/quote was re-verified verbatim against C:\DGB-Book\chapters\ch-*.
// Snapshot anchors as of the pre-market close, Feb 25–26, 2026.

export type StatCategory =
  | 'anchor'
  | 'token'
  | 'derived'
  | 'market-cap'
  | 'comparison';

export type StatEntry = {
  id: string;
  label: string;
  category: StatCategory;
  location: {
    section: number;
    sectionTitle: string;
    chapter: number;
    chapterTitle: string;
    figure?: string;
    orderInChapter: number;
  };
  bookSnapshot: {
    value: number;
    unit: string;
    date: string;
    formula?: string;
  };
  citations: Array<{
    file: string;
    quote: string;
  }>;
  liveSourceId: string;
  derivation?: string;
  displayHint: {
    format: 'currency' | 'percent' | 'number' | 'price-per-oz';
    precision: number;
    suffix?: string;
  };
  directionPolarity?: 'positive' | 'negative';
  notes?: string;
};

const S1 = 'The Inevitability Case';
const S2 = 'The NatGold Ecosystem';

const CH1 = "Gold's Legacy and Its Digital Future";
const CH4 = 'Digital Alchemy: How Tokenization Unlocks Gold Without Extraction';
const CH16 = 'Pre-Market Demand: US$469M from 17,466 Participants, 162 Countries';

const CHAPTERS_DIR = 'C:\\DGB-Book\\chapters';

export const STATS_REGISTRY: StatEntry[] = [
  // =========================================================================
  // SECTION 1 — THE INEVITABILITY CASE
  // =========================================================================

  // ---- CHAPTER 1 — Gold's Legacy and Its Digital Future -------------------
  // Both recompute live from the gold spot price.
  {
    id: 'ch01-in-ground-gold-value',
    label: 'Verified in-ground gold value (global)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 1,
      chapterTitle: CH1,
      figure: 'The gold still underground',
      orderInChapter: 1,
    },
    bookSnapshot: {
      // Exact product of the real inputs at the Feb 26 2026 close ($5,194/oz):
      // 132,000 t × 32,150.7 oz/t × $5,194 = $22,042,777,125,600. Stored exact;
      // the display rounds it. The book states this as "$22 trillion".
      value: 22_042_777_125_600,
      unit: 'USD',
      date: '2026-02-26',
      formula: '132,000 tonnes verified in-ground gold × 32,150.7 oz/tonne × spot',
    },
    citations: [
      {
        file: `${CHAPTERS_DIR}\\ch-01-current_updated.md`,
        quote:
          'Twenty-two trillion dollars of verified gold sits beneath the surface of the planet.',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '132000 × 32150.7 × gold_spot_price',
    displayHint: { format: 'currency', precision: 1, suffix: 'T' },
  },
  {
    id: 'ch01-above-ground-gold-value',
    label: 'Above-ground gold total value',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 1,
      chapterTitle: CH1,
      figure: 'The 23-metre cube',
      orderInChapter: 2,
    },
    bookSnapshot: {
      // Exact product at the Feb 26 2026 close ($5,194/oz):
      // 219,890 t × 32,150.7 oz/t × $5,194 = $36,719,592,895,062. Stored exact;
      // the display rounds it. The book states this as "approximately $36 trillion".
      value: 36_719_592_895_062,
      unit: 'USD',
      date: '2026-02-26',
      formula: '219,890 tonnes refined above-ground × 32,150.7 oz/tonne × spot',
    },
    citations: [
      {
        file: `${CHAPTERS_DIR}\\ch-01-current_updated.md`,
        quote:
          "At today's price, that single cube is worth approximately $36 trillion.",
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '219890 × 32150.7 × gold_spot_price',
    displayHint: { format: 'currency', precision: 1, suffix: 'T' },
  },

  // ---- CHAPTER 4 — Digital Alchemy: Tokenization --------------------------
  {
    id: 'ch04-tokenized-rwa-market',
    label: 'Tokenized real-world-asset (RWA) market size',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'The tokenized RWA market',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 35_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'Sum across all tokenized asset categories (live: DefiLlama RWA)',
    },
    citations: [
      {
        file: `${CHAPTERS_DIR}\\ch-04-current.md`,
        quote: 'The tokenized real-world asset market crossed $35 billion by early 2026.',
      },
    ],
    liveSourceId: 'rwa-tokenized-market-cap',
    derivation: 'rwa.xyz total tokenized RWA market cap',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
  },
  {
    id: 'ch04-tokenized-gold-market',
    label: 'Tokenized gold market size (PAXG + XAUT)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'Gold already trades as a token',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 6_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'PAXG + XAUT combined market cap (live: CoinGecko)',
    },
    citations: [
      {
        file: `${CHAPTERS_DIR}\\ch-04-current.md`,
        quote:
          'Products like Paxos Gold (PAXG) and Tether Gold (XAUT) surpassed $6 billion in combined market capitalization by February 2026.',
      },
    ],
    liveSourceId: 'tokenized-gold-market-cap',
    derivation: 'paxg.market_cap + xaut.market_cap',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch04-total-gold-ecosystem-value',
    label: 'Total gold ecosystem value (in-ground + above-ground)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'How little of gold is tokenized so far',
      orderInChapter: 3,
    },
    bookSnapshot: {
      // Exact product at the Feb 26 2026 close ($5,194/oz):
      // (132,000 + 219,890) t × 32,150.7 oz/t × $5,194 = $58,762,370,020,662.
      // Stored exact; the display rounds it. The book states "$58 trillion".
      value: 58_762_370_020_662,
      unit: 'USD',
      date: '2026-02-26',
      formula: '(132,000 + 219,890) tonnes × 32,150.7 oz/tonne × spot',
    },
    citations: [
      {
        file: `${CHAPTERS_DIR}\\ch-04-current.md`,
        quote: '$6 billion against a $58 trillion gold ecosystem, 0.01% captured.',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '(132000 + 219890 tonnes) × 32150.7 oz/tonne × gold_spot_price',
    displayHint: { format: 'currency', precision: 1, suffix: 'T' },
  },

  // =========================================================================
  // SECTION 2 — THE NATGOLD ECOSYSTEM
  // =========================================================================
  // Section 2's gold-anchored token economics are rendered as live TABLES via
  // tables-registry.ts (Ch 11 BIV formula + exchange ratios, Ch 15 three-year
  // forecast, Ch 16 BIV trajectory). The one card below is the live recompute
  // the tables don't carry: the reserved-token count × today's BIV.

  // ---- CHAPTER 16 — Pre-Market Demand -------------------------------------
  {
    id: 'ch16-pre-market-reservation-value',
    label: 'Pre-market reserved tokens — value at BIV',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: '133,518 reserved tokens × live BIV',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 469_656_324,
      unit: 'USD',
      date: '2026-02-26',
      formula: '133,518 reserved tokens × $3,518 BIV at the pre-market close',
    },
    citations: [
      {
        file: `${CHAPTERS_DIR}\\ch-16-current.md`,
        quote:
          'Pre-Market Demand: US$469M from 17,466 Participants, 162 Countries — 133,518 NatGold Tokens reserved.',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '133518 × biv',
    displayHint: { format: 'currency', precision: 0, suffix: 'M' },
    notes:
      'The 133,518 token count is FIXED (a locked historical reservation count — never "raised"/"paid"), but it is kept because it is the INPUT to a live number: 133,518 × today\'s BIV = the reserved tokens\' current worth. Book-snapshot column = the close value (133,518 × $3,518 ≈ $469.66M; actual cumulative reservations were $469.138M as BIV rose over the program).',
  },
];
