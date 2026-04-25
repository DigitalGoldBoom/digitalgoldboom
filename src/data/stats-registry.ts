// Auto-assembled from Phase 1 audit of Digital Gold Boom Ch 1-16.
// Ch 17-23 pending — second pass after author finishes back-half edits.
// Snapshot anchors: COMEX gold $5,194/oz, AISC $1,676/oz, BIV $3,518/token
// as of pre-market reservation close, Feb 25-26, 2026.
//
// Sort order: section -> chapter -> orderInChapter (book reading order).
// Every liveSourceId references SOURCES_CATALOG in ./sources-catalog.ts.

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
  // Free-form annotation: deferred reconciliation, divergences across chapters,
  // book-feedback cross-references, or anything the dashboard renderer should know
  // beyond the snapshot value itself. Surfaces in the audit log and in tooltips.
  notes?: string;
};

const S1 = 'Why Gold No Longer Needs Mining';
const S2 = 'The NatGold Digital Mining Ecosystem';

const CH1 = 'Gold, Money and Our Digital Future';
const CH2 = 'The Death of Gold Mining: The Extraction S.P.I.R.A.L.';
const CH3 = "Gold's First Principles: Why Gold Doesn't Need to Be Extracted";
const CH4 = 'Digital Alchemy: How Tokenization Unlocks Gold Without Extraction';
const CH5 = 'Scorecard: Digital Gold Mining vs Traditional Gold Mining';
const CH6 = 'Digital Gold Mining Has Passed the Point of No Return';
const CH7 = 'The $84 Trillion Shift in Capital and Values';
const CH8 = 'Once-in-a-Lifetime Alignment';
const CH9 = 'NatGold Digital: The Team, the Vision & Why It Took Seven Years';
const CH10 = "Built on Verification: Global Standards That Prove Gold's Existence";
const CH11 = 'Decoding Digital Gold Mining: The Key Innovations';
const CH12 = 'Qualification & Approval: How Deposits Enter the NatGold Pipeline';
const CH13 = 'Minting NatGold Tokens: From Certified NatGold Resource to Tradeable Token';
const CH14 = 'The Institutional Ecosystem: Who Built It and Why It Holds';
const CH15 = 'The 3-Year $61B Forecast and How NatGold Digital Is Built to Deliver It';
const CH16 = 'Pre-Market Demand: US$469M+ from 17,000+ Investors, 162 Countries';

export const STATS_REGISTRY: StatEntry[] = [
  // =========================================================================
  // CHAPTER 1 — Gold, Money and Our Digital Future
  // =========================================================================
  {
    id: 'ch01-in-ground-gold-value',
    label: 'In-ground gold verified value (global)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 1,
      chapterTitle: CH1,
      figure: 'Opening section, "Gold: A Verified Anchor"',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 22_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '~132,000 tonnes verified in-ground gold × 32,150.7 oz/tonne × $5,194/oz spot',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-01\\ch-01-gold-money-digital-future.md',
        quote:
          'The in-ground gold reserve verified to mineable standard sits at approximately 22 trillion dollars at the current spot price.',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation:
      'in_ground_tonnes (132000, USGS/WGC) × 32150.7 oz/tonne × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },
  {
    id: 'ch01-above-ground-gold-value',
    label: 'Above-ground gold total ecosystem value',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 1,
      chapterTitle: CH1,
      figure: 'The Monetary Gold Ecosystem',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 36_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '~219,890 tonnes refined above-ground × 32,150.7 oz/tonne × $5,194/oz spot',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-01\\ch-01-gold-money-digital-future.md',
        quote:
          "The gold already refined and held — about 36 trillion dollars' worth at current prices — sits across three categories: jewelry, private investment, and official reserves.",
      },
    ],
    liveSourceId: 'gold-spot',
    derivation:
      'above_ground_tonnes (219890, USGS/WGC) × 32150.7 oz/tonne × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },
  {
    id: 'ch01-bitcoin-market-cap',
    label: 'Bitcoin market capitalization (Feb 2026 reference)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 1,
      chapterTitle: CH1,
      figure: 'Comparing to Bitcoin',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 1_800_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'BTC price × ~21M circulating supply',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-01\\ch-01-gold-money-digital-future.md',
        quote:
          'Bitcoin reached approximately 1.8 trillion dollars in market capitalization by February 2026.',
      },
    ],
    liveSourceId: 'btc-market-cap',
    derivation: 'CoinGecko bitcoin.market_data.market_cap.usd',
    displayHint: { format: 'currency', precision: 1, suffix: 'T' },
  },
  {
    id: 'ch01-cb-gold-purchases-2025-ytd',
    label: 'Central bank gold purchases (2025 YTD, 9 months)',
    category: 'comparison',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 1,
      chapterTitle: CH1,
      figure: 'Central Bank Momentum',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 863,
      unit: 'tonnes',
      date: '2025-09-30',
      formula: 'WGC quarterly aggregation Jan-Sep 2025',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-01\\ch-01-gold-money-digital-future.md',
        quote: 'Central banks accumulated 863 tonnes through 2025.',
      },
    ],
    liveSourceId: 'wgc-central-bank-purchases',
    derivation: 'WGC current-year-to-date central bank net purchases (tonnes)',
    displayHint: { format: 'number', precision: 0, suffix: ' tonnes' },
  },

  // =========================================================================
  // CHAPTER 2 — The Death of Gold Mining: The Extraction S.P.I.R.A.L.
  // =========================================================================
  {
    id: 'ch02-ath-gold-price-jan-2026',
    label: 'All-time high gold spot price (Jan 28 2026)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 2,
      chapterTitle: CH2,
      figure: 'The All-Time High',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 5589,
      unit: 'USD/oz',
      date: '2026-01-28',
      formula: 'COMEX intraday/settlement high',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-02\\ch-02-death-of-gold-mining-spiral.md',
        quote:
          'On January 28, 2026, gold reached an all-time high of $5,589 per ounce.',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation:
      'Track running max of COMEX spot since publication; show book ATH alongside current ATH',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch02-global-aisc',
    label: 'Global AISC (all-in sustaining cost)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 2,
      chapterTitle: CH2,
      figure: 'Cost Structure Under Pressure',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 1676,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula:
        'NatGold Real-Time AISC Index, 37 publicly reporting producers, weighted',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-02\\ch-02-death-of-gold-mining-spiral.md',
        quote: 'Global all-in sustaining cost stands at $1,676 per ounce.',
      },
    ],
    liveSourceId: 'natgold-aisc',
    derivation: 'NatGold Real-Time AISC Index live value',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch02-us-aisc',
    label: 'US-specific AISC',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 2,
      chapterTitle: CH2,
      figure: 'Cost Structure Under Pressure',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 1716,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula: 'AISC aggregated for US-domiciled producers',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-02\\ch-02-death-of-gold-mining-spiral.md',
        quote: 'US AISC at $1,716 per ounce.',
      },
    ],
    liveSourceId: 'sp-global-mining',
    derivation: 'S&P Global aggregated US-producer AISC (quarterly)',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch02-exploration-spend-current',
    label: 'Global gold exploration spending (current annual)',
    category: 'comparison',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 2,
      chapterTitle: CH2,
      figure: 'The Exploration Drought',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 5_600_000_000,
      unit: 'USD',
      date: '2025-12-31',
      formula: 'Sum of disclosed exploration budgets across public miners',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-02\\ch-02-death-of-gold-mining-spiral.md',
        quote: 'Exploration spending stood at $5.6 billion.',
      },
    ],
    liveSourceId: 'sp-global-mining',
    derivation: 'S&P Global / PDAC annual aggregated gold exploration budgets',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch02-gold-etf-aum',
    label: 'Gold ETF AUM (global)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 2,
      chapterTitle: CH2,
      figure: 'The Institutional Flow',
      orderInChapter: 5,
    },
    bookSnapshot: {
      value: 701_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'Sum of AUM across all gold-backed ETF products',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-02\\ch-02-death-of-gold-mining-spiral.md',
        quote: 'Gold ETF AUM stood at $701 billion.',
      },
    ],
    liveSourceId: 'gold-etf-aum',
    derivation: 'WGC gold ETF holdings & flows monthly aggregate',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
  },

  // =========================================================================
  // CHAPTER 3 — Gold's First Principles
  // =========================================================================
  {
    id: 'ch03-above-ground-inventory-tonnes',
    label: 'Above-ground gold inventory (refined, tonnes)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 3,
      chapterTitle: CH3,
      figure: 'The Reservoir',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 219_890,
      unit: 'tonnes',
      date: '2026-02-26',
      formula: 'Cumulative refined gold over recorded history (USGS/WGC)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-03\\ch-03-why-gold-doesnt-need-extraction.md',
        quote:
          'The 219,890 tonnes of above-ground gold represents roughly 7,000 years of human gold production.',
      },
    ],
    liveSourceId: 'usgs-wgc-gold-stocks',
    derivation: 'USGS/WGC annually updated cumulative refined gold inventory',
    displayHint: { format: 'number', precision: 0, suffix: ' tonnes' },
  },
  {
    id: 'ch03-total-gold-ecosystem-value',
    label: 'Total gold ecosystem value (in-ground + above-ground)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 3,
      chapterTitle: CH3,
      figure: 'The Ecosystem',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 58_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '($22T in-ground) + ($36T above-ground) = $58T at $5,194/oz spot',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-03\\ch-03-why-gold-doesnt-need-extraction.md',
        quote:
          'The entire gold ecosystem — in-ground, refined, and held — sits at 58 trillion dollars.',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation:
      '(132000 + 219890 tonnes) × 32150.7 oz/tonne × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },
  {
    id: 'ch03-gold-demand-total-tonnes',
    label: 'Global gold demand (annual total)',
    category: 'comparison',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 3,
      chapterTitle: CH3,
      figure: 'The Global Demand Breakdown',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 4974,
      unit: 'tonnes',
      date: '2025-12-31',
      formula: 'jewelry + investment + central bank + industrial (WGC)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-03\\ch-03-why-gold-doesnt-need-extraction.md',
        quote: 'Global demand for gold totaled 4,974 tonnes.',
      },
    ],
    liveSourceId: 'wgc-gold-demand-trends',
    derivation: 'WGC Gold Demand Trends total annual demand',
    displayHint: { format: 'number', precision: 0, suffix: ' tonnes' },
  },

  // =========================================================================
  // CHAPTER 4 — Digital Alchemy: Tokenization
  // =========================================================================
  {
    id: 'ch04-tokenized-rwa-market',
    label: 'Tokenized RWA market size',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'The Tokenized RWA Market',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 35_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'Sum across all tokenized asset categories',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-04\\ch-04-digital-alchemy-tokenization.md',
        quote: 'The tokenized RWA market reached $35 billion by early 2026.',
      },
    ],
    liveSourceId: 'rwa-tokenized-market-cap',
    derivation: 'rwa.xyz total tokenized RWA market cap',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
  },
  {
    id: 'ch04-tokenized-gold-market',
    label: 'Tokenized gold market size',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'The Tokenized RWA Market — gold breakdown',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 6_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'PAXG + XAUT + minor gold tokens combined market cap',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-04\\ch-04-digital-alchemy-tokenization.md',
        quote: 'Tokenized gold represents $6 billion of the RWA market.',
      },
    ],
    liveSourceId: 'tokenized-gold-market-cap',
    derivation: 'paxg.market_cap + xaut.market_cap (+ minor)',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
  },
  {
    id: 'ch04-paxg-market-cap',
    label: 'Paxos Gold (PAXG) market cap',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'Existing Gold Tokens',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 6_000_000_000,
      unit: 'USD (combined PAXG+XAUT)',
      date: '2026-02-26',
      formula: 'PAXG price × circulating supply (book reports combined $6B)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-04\\ch-04-digital-alchemy-tokenization.md',
        quote: 'Paxos Gold and Tether Gold combined hold $6 billion in market cap.',
      },
    ],
    liveSourceId: 'paxg',
    derivation: 'CoinGecko pax-gold.market_data.market_cap.usd',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch04-xaut-market-cap',
    label: 'Tether Gold (XAUT) market cap',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 4,
      chapterTitle: CH4,
      figure: 'Existing Gold Tokens',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 6_000_000_000,
      unit: 'USD (combined PAXG+XAUT)',
      date: '2026-02-26',
      formula: 'XAUT price × circulating supply (book reports combined $6B)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-04\\ch-04-digital-alchemy-tokenization.md',
        quote: 'Paxos Gold and Tether Gold combined hold $6 billion in market cap.',
      },
    ],
    liveSourceId: 'xaut',
    derivation: 'CoinGecko tether-gold.market_data.market_cap.usd',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },

  // =========================================================================
  // CHAPTER 5 — Scorecard
  // =========================================================================
  // The financial scorecard is built directly on the locked anchors.
  // Most Ch 5 entries (benchmark deposit size, ore grade, strip ratio, allocation %, royalty rates)
  // are fixed methodology specs and are NOT in the registry. See audit log.
  {
    id: 'ch05-comex-spot-locked',
    label: 'COMEX gold spot (Ch 5 locked reference)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 5194,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula: 'COMEX daily settlement at Feb 26 2026 pre-market close',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote: 'COMEX spot $5,194/oz at the reference timestamp (26 February 2026).',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: 'live COMEX spot',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch05-traditional-aisc',
    label: 'Traditional mining AISC (Ch 5 locked reference)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 1676,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula: 'NatGold Real-Time AISC Index locked at Feb 26 2026',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote:
          'Traditional mining: $300M CapEx, $1,676/oz AISC, 508,000 oz refined gold delivered.',
      },
    ],
    liveSourceId: 'natgold-aisc',
    derivation: 'NatGold Real-Time AISC Index live',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch05-traditional-gross-revenue',
    label: 'Traditional mining gross revenue (1M-oz benchmark)',
    category: 'derived',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 2_640_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '508,000 oz × $5,194/oz',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote: '$2.64B gross value (traditional mining)',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '508000 × gold_spot_price',
    displayHint: { format: 'currency', precision: 2, suffix: 'B' },
  },
  {
    id: 'ch05-traditional-operating-cost',
    label: 'Traditional mining operating cost (AISC × oz)',
    category: 'derived',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 851_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '508,000 oz × $1,676/oz',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote: '$851M operating cost (traditional mining)',
      },
    ],
    liveSourceId: 'natgold-aisc',
    derivation: '508000 × aisc',
    displayHint: { format: 'currency', precision: 0, suffix: 'M' },
  },
  {
    id: 'ch05-traditional-net-value',
    label: 'Traditional mining net value to resource owner',
    category: 'derived',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 5,
    },
    bookSnapshot: {
      value: 1_710_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '$2.64B gross − $851M AISC − $80M closure liability',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote: 'Net value to the resource owner $1.71B (traditional)',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation:
      '(508000 × gold_spot_price) − (508000 × aisc) − 80_000_000 (closure liability midpoint)',
    displayHint: { format: 'currency', precision: 2, suffix: 'B' },
  },
  {
    id: 'ch05-biv-per-token',
    label: 'Baseline Intrinsic Value (BIV) per NatGold Token',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 6,
    },
    bookSnapshot: {
      value: 3518,
      unit: 'USD/token',
      date: '2026-02-26',
      formula: '$5,194 spot − $1,676 AISC',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote: '$3,518 BIV per token (= Spot − AISC)',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: 'gold_spot_price − aisc',
    displayHint: { format: 'currency', precision: 0 },
  },
  {
    id: 'ch05-digital-gross-value',
    label: 'Digital mining gross value (420k tokens × BIV)',
    category: 'derived',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 7,
    },
    bookSnapshot: {
      value: 1_480_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '420,000 tokens × $3,518/token',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote: '$1.48B gross value (digital mining)',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '420000 × biv',
    displayHint: { format: 'currency', precision: 2, suffix: 'B' },
  },
  {
    id: 'ch05-digital-operating-cost',
    label: 'Digital mining operating cost (AITC, 33% of gross BIV)',
    category: 'derived',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance — Step 5 (Net Value)',
      orderInChapter: 8,
    },
    bookSnapshot: {
      value: 488_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula:
        '420,000 tokens × $3,518/token × 33% AITC (= 20% tokenization fee + 7% ecosystem + 6% royalties/taxes; ~$100-150K cash app fee paid separately)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote:
          '| Less: Operating cost (AISC / AITC) | $851M | $488M |',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '420000 × biv × 0.33',
    displayHint: { format: 'currency', precision: 0, suffix: 'M' },
    notes:
      'Added 2026-04-25 per book-changelog.md (was missing from Phase 1 first pass — Agent A audit truncated mid-Ch 5). Strict math: 420,000 × $3,518 × 0.33 = $487,594,800 → $488M. Pairs with ch05-traditional-operating-cost ($851M) in Step 5 net-value table; digital saves $362M (-43%). Cash portion ~$100-150K (app fee only); $488M paid in NatGold Tokens at the tokenization event. Resolves book-feedback.md item 4 (2026-04-25).',
  },
  {
    id: 'ch05-digital-net-value',
    label: 'Digital mining net value to resource owner (67% retained)',
    category: 'derived',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 5,
      chapterTitle: CH5,
      figure: 'Scorecard 2: Financial Performance',
      orderInChapter: 9,
    },
    bookSnapshot: {
      value: 990_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '281,400 tokens (67% of 420k) × $3,518/token',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-05\\ch-05-scorecard-digital-vs-traditional.md',
        quote:
          'The remaining 67% — 281,400 NatGold Tokens × $3,518 BIV = $990 million — is retained by the resource owner.',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '420000 × 0.67 × biv',
    displayHint: { format: 'currency', precision: 0, suffix: 'M' },
  },

  // =========================================================================
  // CHAPTER 6 — Point of No Return
  // =========================================================================
  {
    id: 'ch06-gld-aum',
    label: 'SPDR Gold Shares (GLD) AUM',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 6,
      chapterTitle: CH6,
      figure: 'GLD: Demand on the Sidelines (Figure 6.1)',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 180_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'State Street GLD reported AUM',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-06\\ch-06-point-of-no-return.md',
        quote: 'Today, it holds approximately $180 billion',
      },
    ],
    liveSourceId: 'gold-etf-aum',
    derivation: 'State Street GLD ETF reported AUM (subset of WGC ETF flows)',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
  },
  {
    id: 'ch06-gold-etf-category-aum',
    label: 'Gold ETF category AUM (broader than GLD)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 6,
      chapterTitle: CH6,
      figure: 'GLD precedent paragraph',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 700_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'WGC global gold ETF holdings & flows aggregate',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-06\\ch-06-point-of-no-return.md',
        quote:
          'the broader gold ETF category it pioneered has grown to more than $700 billion.',
      },
    ],
    liveSourceId: 'gold-etf-aum',
    derivation: 'WGC global gold ETF AUM monthly aggregate',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
  },
  {
    id: 'ch06-esg-aum',
    label: 'Global ESG-mandated AUM',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 6,
      chapterTitle: CH6,
      figure: 'The New Gap',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 35_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'GSIA / Bloomberg Intelligence aggregate (Bloomberg ~$35T 2024)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-06\\ch-06-point-of-no-return.md',
        quote:
          'Global ESG-mandated assets under management (AUM, the total value of assets managed under a given strategy) have surpassed $35 trillion and are projected to exceed $50 trillion by mid-decade',
      },
    ],
    liveSourceId: 'esg-aum',
    derivation: 'GSIA / Bloomberg Intelligence latest published figure',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
    notes:
      'CANONICAL ESG AUM SNAPSHOT — pin dashboard here until book-side reconciliation lands. Ch 6 / Ch 7 / Ch 8 currently cite $35T / $33T / $30T+ for the same metric. Author-acknowledged divergence (book-feedback.md 2026-04-25); deferred to a researcher-verification pass that will lock canonical 2026 GSIA / PRI / Bloomberg figure plus 2030 projection then sweep all three chapters. Until that ships, ch07-esg-aum-current and ch08-esg-aum-current carry chapter-specific snapshot values for citation accuracy but should not drive the live "$X delta since pre-market close" badge.',
  },
  {
    id: 'ch06-tokenized-gold-market',
    label: 'Tokenized gold market cap (early 2026)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 6,
      chapterTitle: CH6,
      figure: 'Tokenized Gold Market Tripled in One Year (Figure 6.3)',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 6_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'PAXG + XAUT combined (~96-97% of category)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-06\\ch-06-point-of-no-return.md',
        quote:
          'The total tokenised gold market surpassed $6 billion in early 2026, more than tripling from approximately $1.9 billion in early 2025.',
      },
    ],
    liveSourceId: 'tokenized-gold-market-cap',
    derivation: 'paxg.market_cap + xaut.market_cap',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch06-in-ground-verified-gold-restate',
    label: 'In-ground verified gold (Ch 6 restatement)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 6,
      chapterTitle: CH6,
      figure: 'Pillar Two: Viability — The Digital Gold Mining Advantage',
      orderInChapter: 5,
    },
    bookSnapshot: {
      value: 22_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '~132,000 tonnes × 32,150.7 oz/tonne × $5,194/oz',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-06\\ch-06-point-of-no-return.md',
        quote:
          'have catalogued more than $22 trillion in qualifying in-ground gold',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '132000 × 32150.7 × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },

  // =========================================================================
  // CHAPTER 7 — The $84 Trillion Shift
  // =========================================================================
  {
    id: 'ch07-gold-etf-aum',
    label: 'Gold ETF total AUM (book-wide Feb 26 2026 anchor)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 7,
      chapterTitle: CH7,
      figure: 'The Gold Paradox',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 701_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'Total global gold-backed ETF AUM at book-wide 26 Feb 2026 reference',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-07\\ch-07-84-trillion-shift.md',
        quote:
          'Gold ETF holdings grew 801 tonnes in 2025, the largest annual addition in twelve years; total AUM reached $701 billion by the 26 February 2026 reference used throughout this book.',
      },
    ],
    liveSourceId: 'gold-etf-aum',
    derivation: 'WGC monthly ETF AUM aggregate',
    displayHint: { format: 'currency', precision: 0, suffix: 'B' },
    notes:
      'Updated 2026-04-25 per book-changelog.md: was $559B / 2025-12-31. New canonical aligns Ch 7 with Ch 2 / Ch 6 ($701B Feb 26 2026). Kindle output may lag working/ — registry tracks working canonical. Book-wide rule: gold-correlated figures lock to Feb 26 2026 pre-market close.',
  },
  {
    id: 'ch07-esg-aum-current',
    label: 'Global ESG AUM (Ch 7 current)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 7,
      chapterTitle: CH7,
      figure: 'The Capital Behind the Values',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 33_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'GSIA $30.3T (2022) adjusted to ~$33T (2024 Bloomberg Intelligence)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-07\\ch-07-84-trillion-shift.md',
        quote:
          'ESG-mandated assets now exceed **$33 trillion** globally, a figure projected to surpass $40 trillion by 2030.',
      },
    ],
    liveSourceId: 'esg-aum',
    derivation: 'GSIA / Bloomberg Intelligence latest published figure',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
    notes:
      'Chapter-specific snapshot — diverges from ch06-esg-aum ($35T) and ch08-esg-aum-current ($30T+) for the same metric. Book-side reconciliation deferred to researcher-verification pass (book-feedback.md 2026-04-25). Dashboard should NOT drive the live "$X delta since pre-market close" badge from this entry; pin to ch06-esg-aum until reconciled.',
  },
  {
    id: 'ch07-in-ground-verified-gold-restate',
    label: 'In-ground verified gold (Ch 7 restatement, $22T)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 7,
      chapterTitle: CH7,
      figure: 'The Gold Paradox',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 22_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '132,000 tonnes × 32,150.7 oz/tonne × $5,194/oz',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-07\\ch-07-84-trillion-shift.md',
        quote:
          'More than **$22 trillion** in verified in-ground gold, approximately 132,000 tonnes of documented reserves and resources',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '132000 × 32150.7 × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },

  // =========================================================================
  // CHAPTER 8 — Once-in-a-Lifetime Alignment
  // =========================================================================
  {
    id: 'ch08-gold-price-feb-2026',
    label: 'COMEX gold spot price (Feb 26 2026 close, Ch 8 anchor)',
    category: 'anchor',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 8,
      chapterTitle: CH8,
      figure: 'Gold in 2026 (Figure 8.2)',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 5194,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula: 'COMEX pre-market close',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-08\\ch-08-once-in-a-generation-alignment.md',
        quote:
          'Gold traded at $5,194 per ounce at the February 26 close (already ahead of every forecast made at the start of the year).',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: 'live COMEX spot',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch08-gold-market-cap-feb-2026',
    label: 'Total above-ground gold market cap (Feb 26 2026)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 8,
      chapterTitle: CH8,
      figure: 'Gold in 2026 (Figure 8.2)',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 36_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '219,890 tonnes × 32,150.7 oz/tonne × $5,194/oz',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-08\\ch-08-once-in-a-generation-alignment.md',
        quote: 'Its total market capitalisation has crossed $36 trillion.',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '219890 × 32150.7 × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },
  {
    id: 'ch08-tokenized-gold-mar-2026',
    label: 'Tokenized gold (PAXG + XAUT) market cap, Mar 2026',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 8,
      chapterTitle: CH8,
      figure: 'Gold in 2026',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 6_000_000_000,
      unit: 'USD',
      date: '2026-03-01',
      formula: 'PAXG + XAUT combined market cap',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-08\\ch-08-once-in-a-generation-alignment.md',
        quote:
          'Tokenized physical gold (PAXG and XAUT, now a $6 billion market) saw combined daily trading volumes exceed $1 billion in early March.',
      },
    ],
    liveSourceId: 'tokenized-gold-market-cap',
    derivation: 'paxg.market_cap + xaut.market_cap',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch08-cb-purchases-2025',
    label: 'Central bank gold purchases 2025 (full year)',
    category: 'comparison',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 8,
      chapterTitle: CH8,
      figure: 'Gold in 2026 (Figure 8.2)',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 863,
      unit: 'tonnes',
      date: '2025-12-31',
      formula: 'WGC official 2025 net purchases',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-08\\ch-08-once-in-a-generation-alignment.md',
        quote:
          'Central banks purchased 863 tonnes in 2025, the third consecutive year of historically elevated accumulation',
      },
    ],
    liveSourceId: 'wgc-central-bank-purchases',
    derivation: 'WGC current-year reported net purchases',
    displayHint: { format: 'number', precision: 0, suffix: ' tonnes' },
  },
  {
    id: 'ch08-esg-aum-current',
    label: 'ESG capital seeking safe haven (Ch 8)',
    category: 'market-cap',
    location: {
      section: 1,
      sectionTitle: S1,
      chapter: 8,
      chapterTitle: CH8,
      figure: 'ESG capital in 2026',
      orderInChapter: 5,
    },
    bookSnapshot: {
      value: 30_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'GSIA / Bloomberg latest figure',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-08\\ch-08-once-in-a-generation-alignment.md',
        quote:
          'the $30 trillion-plus in ESG capital [3] that most needs a safe haven right now is watching gold perform in real time and it cannot participate.',
      },
    ],
    liveSourceId: 'esg-aum',
    derivation: 'GSIA / Bloomberg Intelligence latest published figure',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
    notes:
      'Chapter-specific snapshot — diverges from ch06-esg-aum ($35T) and ch07-esg-aum-current ($33T) for the same metric. Book-side reconciliation deferred to researcher-verification pass (book-feedback.md 2026-04-25). Dashboard should NOT drive the live "$X delta since pre-market close" badge from this entry; pin to ch06-esg-aum until reconciled.',
  },

  // =========================================================================
  // CHAPTER 11 — Decoding Digital Gold Mining (THE LOCKED ANCHORS)
  // =========================================================================
  {
    id: 'ch11-anchor-comex-spot',
    label: 'COMEX gold spot price (BIV equation anchor)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 11,
      chapterTitle: CH11,
      figure: 'Figure 11.3 — BIV equation panel',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 5194,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula: 'COMEX pre-market close (locked book reference)',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-11\\ch-11-decoding-digital-gold-mining.md',
        quote:
          'COMEX Spot Price ($5,194/oz) minus AISC ($1,676/oz) equals Baseline Intrinsic Value ($3,518/oz).',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: 'live COMEX spot',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch11-anchor-aisc',
    label: 'AISC (BIV equation anchor)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 11,
      chapterTitle: CH11,
      figure: 'Figure 11.3 — BIV equation panel',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 1676,
      unit: 'USD/oz',
      date: '2026-02-26',
      formula: 'NatGold Real-Time AISC Index, 37 producers weighted',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-11\\ch-11-decoding-digital-gold-mining.md',
        quote:
          'AISC — All-In Sustaining Cost — the full cost of getting an ounce of gold from the ground into that vault.',
      },
    ],
    liveSourceId: 'natgold-aisc',
    derivation: 'NatGold Real-Time AISC Index live value',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch11-anchor-biv',
    label: 'Baseline Intrinsic Value (BIV) per NatGold Token',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 11,
      chapterTitle: CH11,
      figure: 'Figure 11.3 — "How to Value Gold Underground"',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 3518,
      unit: 'USD/token',
      date: '2026-02-26',
      formula: '$5,194 spot − $1,676 AISC',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-11\\ch-11-decoding-digital-gold-mining.md',
        quote:
          'Baseline Intrinsic Value = COMEX Spot Gold Price − AISC ... That is the Baseline Intrinsic Value of a single NatGold Token at the February 26, 2026 close.',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: 'gold_spot_price − aisc',
    displayHint: { format: 'currency', precision: 0 },
  },
  {
    id: 'ch11-pre-market-reservation-amount',
    label: 'Pre-market reservation total ($)',
    category: 'market-cap',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 11,
      chapterTitle: CH11,
      figure: 'How to Value Gold Underground',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 469_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'NatGold pre-market reservation total at close',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-11\\ch-11-decoding-digital-gold-mining.md',
        quote:
          '$469 million of pre-market reservations from 17,466 participants across 162 countries came in against exactly this valuation model.',
      },
    ],
    liveSourceId: 'natgold-biv-historical',
    derivation:
      'Locked at publication ($469.138M, 17,466 participants, 162 countries). Phase 2 may surface live secondary-market data once tokens trade.',
    displayHint: { format: 'currency', precision: 0, suffix: 'M' },
  },

  // =========================================================================
  // CHAPTER 13 — Minting NatGold Tokens
  // =========================================================================
  // The hypothetical 370k oz / 128k token walkthrough is dependent on BIV.
  // Allocation %s (73/20/5/2, 93/5/2) are fixed rules — NOT in registry.
  {
    id: 'ch13-hypothetical-mining-company-proceeds',
    label: 'Hypothetical 370k-oz deposit — mining company proceeds (73% × 128k tokens × BIV)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 13,
      chapterTitle: CH13,
      figure: 'Figure 13.6 — Tokenization in Practice walkthrough',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 328_700_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '128,000 tokens × 0.73 × $3,518/token',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-13\\ch-13-minting-natgold-tokens.md',
        quote:
          'The mining company receives $328.7 million in liquid tokens on a timeline measured in months rather than decades.',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '128000 × 0.73 × biv',
    displayHint: { format: 'currency', precision: 1, suffix: 'M' },
  },

  // =========================================================================
  // CHAPTER 15 — The 3-Year $61B Forecast
  // =========================================================================
  {
    id: 'ch15-three-year-forecast-gross-value',
    label: 'Three-year token minting forecast (gross value at BIV)',
    category: 'market-cap',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Opening — bullet point 1',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 61_600_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '17.5M tokens × $3,518 BIV',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote:
          'The forecast: 17.5 million tokens minted, $61.6 billion in total token value.',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '17500000 × biv',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch15-mining-company-73pct-cumulative',
    label: 'Mining company 73% allocation cumulative (3-year)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Where Every Token Goes',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 44_900_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '17.5M × 0.73 × $3,518',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote: 'Mining Companies: 73% — $44.9 billion cumulative',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '17500000 × 0.73 × biv',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch15-natgold-digital-20pct-cumulative',
    label: 'NatGold Digital 20% allocation cumulative (3-year)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Where Every Token Goes',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 12_300_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '17.5M × 0.20 × $3,518',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote: 'NatGold Digital: 20% — $12.3 billion cumulative',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '17500000 × 0.20 × biv',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },
  {
    id: 'ch15-integrity-fund-5pct-cumulative',
    label: 'Integrity Fund 5% allocation cumulative (3-year)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Where Every Token Goes',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 3_080_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '17.5M × 0.05 × $3,518',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote: 'Integrity Fund: 5% — $3.08 billion cumulative',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '17500000 × 0.05 × biv',
    displayHint: { format: 'currency', precision: 2, suffix: 'B' },
  },
  {
    id: 'ch15-social-giveback-2pct-cumulative',
    label: 'Social Giveback 2% allocation cumulative (3-year)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Where Every Token Goes',
      orderInChapter: 5,
    },
    bookSnapshot: {
      value: 1_230_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '17.5M × 0.02 × $3,518',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote: 'Social Giveback: 2% — $1.23 billion cumulative',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '17500000 × 0.02 × biv',
    displayHint: { format: 'currency', precision: 2, suffix: 'B' },
  },
  {
    id: 'ch15-social-giveback-year1',
    label: 'Social Giveback — Year 1 value',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Social Giveback in Context',
      orderInChapter: 6,
    },
    bookSnapshot: {
      value: 176_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'Year 1: 2.5M tokens × 0.02 × $3,518',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote:
          "At the forecast volumes, NatGold's 2% works out to $176 million in Year 1 and $1.23 billion cumulatively by Year 3.",
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: '2500000 × 0.02 × biv',
    displayHint: { format: 'currency', precision: 0, suffix: 'M' },
  },
  {
    id: 'ch15-idle-asset-22-trillion',
    label: 'Idle in-ground gold resources value ($22T anchor restate)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'The Idle Asset Opportunity',
      orderInChapter: 7,
    },
    bookSnapshot: {
      value: 22_000_000_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: '132,000 tonnes × 32,150.7 oz/tonne × $5,194/oz',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote:
          '$22 trillion. That is the estimated value of geologically verified in-ground gold resources — the reserves and identified resources confirmed under the NI 43-101, JORC, and S-K 1300 frameworks',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: '132000 × 32150.7 × gold_spot_price',
    displayHint: { format: 'currency', precision: 0, suffix: 'T' },
  },
  {
    id: 'ch15-newmont-comparison-year3',
    label: 'NatGold Year 3 projection vs. Newmont annual revenue ($35.2B)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 15,
      chapterTitle: CH15,
      figure: 'Putting the Forecast in Perspective',
      orderInChapter: 8,
    },
    bookSnapshot: {
      value: 35_200_000_000,
      unit: 'USD',
      date: '2026-02-26',
      formula: 'Year 3 tokens × $3,518 BIV',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-15\\ch-15-forecast-and-business-model.md',
        quote:
          "NatGold's Year 3 projection of $35.2 billion represents roughly 1.9 times Newmont's annual revenue — achieved without a single mine built, haul truck running, or ounce extracted.",
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: 'tokens_year_3 × biv (Year 3 token count derived from forecast schedule)',
    displayHint: { format: 'currency', precision: 1, suffix: 'B' },
  },

  // =========================================================================
  // CHAPTER 16 — Pre-Market Demand
  // =========================================================================
  {
    id: 'ch16-closing-biv-per-token',
    label: 'Closing BIV per token (program close Feb 25-26 2026)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Pre-Market Demand opening',
      orderInChapter: 1,
    },
    bookSnapshot: {
      value: 3518,
      unit: 'USD/token',
      date: '2026-02-25',
      formula: '$5,194 spot − $1,676 AISC',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote:
          'By close on February 25, 2026, the same NatGold Token was worth $3,518.[1]',
      },
    ],
    liveSourceId: 'natgold-biv',
    derivation: 'gold_spot_price − aisc',
    displayHint: { format: 'currency', precision: 0 },
  },
  {
    id: 'ch16-gold-spot-at-close',
    label: 'Gold spot at pre-market close (Ch 16 anchor)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Pre-Market Demand opening',
      orderInChapter: 2,
    },
    bookSnapshot: {
      value: 5194,
      unit: 'USD/oz',
      date: '2026-02-25',
      formula: 'COMEX close',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote: 'driven by gold itself rising to $5,194 an ounce at close.[20]',
      },
    ],
    liveSourceId: 'gold-spot',
    derivation: 'live COMEX spot',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch16-aisc-at-close',
    label: 'AISC at pre-market close (Ch 16 anchor)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Pre-Market Demand opening — equation restate',
      orderInChapter: 3,
    },
    bookSnapshot: {
      value: 1676,
      unit: 'USD/oz',
      date: '2026-02-25',
      formula: 'NatGold Real-Time AISC Index',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote: 'COMEX $5,194 − AISC $1,676 = BIV $3,518 as of February 26, 2026',
      },
    ],
    liveSourceId: 'natgold-aisc',
    derivation: 'NatGold Real-Time AISC Index live',
    displayHint: { format: 'price-per-oz', precision: 0 },
  },
  {
    id: 'ch16-biv-jun-2025-checkpoint',
    label: 'BIV checkpoint — June 16 2025 (first public update)',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Demand-curve narrative — historical reference',
      orderInChapter: 4,
    },
    bookSnapshot: {
      value: 1854,
      unit: 'USD/token',
      date: '2025-06-16',
      formula: 'Locked historical BIV checkpoint',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote:
          'At the first public update on June 16, 2025, each NatGold Token was worth around $1,854 in Baseline Intrinsic Value.[15]',
      },
    ],
    liveSourceId: 'natgold-biv-historical',
    derivation: 'Locked at publication; historical reference, not live-tracked.',
    displayHint: { format: 'currency', precision: 0 },
  },
  {
    id: 'ch16-biv-jul-2025-checkpoint',
    label: 'BIV checkpoint — July 17 2025',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Demand-curve narrative — historical reference',
      orderInChapter: 5,
    },
    bookSnapshot: {
      value: 1761.69,
      unit: 'USD/token',
      date: '2025-07-17',
      formula: 'Locked historical BIV checkpoint at 8:00 AM EST cut',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote: 'BIV $1,761.69 at 8:00 AM EST cut',
      },
    ],
    liveSourceId: 'natgold-biv-historical',
    derivation: 'Locked at publication; historical reference, not live-tracked.',
    displayHint: { format: 'currency', precision: 2 },
  },
  {
    id: 'ch16-biv-yearend-2025-checkpoint',
    label: 'BIV checkpoint — Dec 31 2025 year-end',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Demand-curve narrative — historical reference',
      orderInChapter: 6,
    },
    bookSnapshot: {
      value: 2721.23,
      unit: 'USD/token',
      date: '2025-12-31',
      formula: 'Locked historical BIV year-end checkpoint',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote: 'BIV $2,721.23',
      },
    ],
    liveSourceId: 'natgold-biv-historical',
    derivation: 'Locked at publication; historical reference, not live-tracked.',
    displayHint: { format: 'currency', precision: 2 },
  },
  {
    id: 'ch16-biv-jan-12-2026-checkpoint',
    label: 'BIV checkpoint — January 12 2026',
    category: 'anchor',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Demand-curve narrative — historical reference',
      orderInChapter: 7,
    },
    bookSnapshot: {
      value: 3001,
      unit: 'USD/token',
      date: '2026-01-12',
      formula: 'Locked historical BIV checkpoint',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote: 'BIV $3,001',
      },
    ],
    liveSourceId: 'natgold-biv-historical',
    derivation: 'Locked at publication; historical reference, not live-tracked.',
    displayHint: { format: 'currency', precision: 0 },
  },
  {
    id: 'ch16-biv-late-wave-avg',
    label: 'BIV late-wave average (Jan 12 - Feb 25 2026)',
    category: 'derived',
    location: {
      section: 2,
      sectionTitle: S2,
      chapter: 16,
      chapterTitle: CH16,
      figure: 'Demand-curve narrative — late-wave window',
      orderInChapter: 8,
    },
    bookSnapshot: {
      value: 3260,
      unit: 'USD/token',
      date: '2026-02-25',
      formula: '($3,001 + $3,518) / 2 = $3,260 midpoint',
    },
    citations: [
      {
        file: 'C:\\DGB\\output\\kindle\\ch-16\\ch-16-pre-market-demand.md',
        quote:
          'Average BIV during the window: midpoint of ($3,001 per[18] + $3,518 per[1]) ÷ 2 = $3,260.',
      },
    ],
    liveSourceId: 'natgold-biv-historical',
    derivation: 'Locked at publication; (3001 + 3518) / 2 average over the window.',
    displayHint: { format: 'currency', precision: 0 },
  },
];
