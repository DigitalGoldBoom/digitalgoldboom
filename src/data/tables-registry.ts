// Recreated chapter tables for the /live dashboard.
// Each TableEntry is a structured representation of a book table — the
// renderer pairs it with the live LiveBundle and produces a visually faithful,
// live-valued recreation directly inside the chapter accordion.
//
// Six tables:
//   Ch 5  — Scorecard 2: Financial Performance — 1M-oz Benchmark Deposit
//   Ch 11 — Baseline Intrinsic Value Formula
//   Ch 11 — Resource Tier Exchange Ratios
//   Ch 13 — Token Allocation by Submission Pathway
//   Ch 15 — Three-Year Token Minting Forecast at Today's BIV
//   Ch 16 — BIV Trajectory During Pre-Market Window + Today
//
// Each table sits at orderInChapter=1 inside its chapter so it renders ABOVE
// the per-stat cards (the table is the chapter's headline structure).

export type TableFormat =
  | 'comparison-2col'
  | 'breakdown-allocation'
  | 'formula-card'
  | 'checkpoint-timeline';

export type CellFormat = 'currency' | 'percent' | 'number' | 'multiplier';

export type TableCell = {
  /** A formula string resolved by lib/live/table-derive.ts. */
  derivation?: string;
  /** A pre-rendered literal value (e.g. "508,000 oz" or "—"). */
  staticValue?: string;
  format?: CellFormat;
  precision?: number;
  /** Either a unit suffix ("/oz", "/token") or a magnitude ("M", "B", "T"). */
  suffix?: string;
};

export type TableLocation = {
  section: number;
  chapter: number;
  orderInChapter: number;
};

export type ComparisonColumn = { id: string; label: string };

export type ComparisonRow = {
  id: string;
  label: string;
  cells: Record<string, TableCell>;
};

export type FormulaSpec = {
  lhs: { label: string } & TableCell;
  operator: string;
  rhs: { label: string } & TableCell;
  result: { label: string } & TableCell;
};

export type AllocationPart = {
  id: string;
  label: string;
  pct: number;
  value: TableCell;
};

export type Checkpoint = {
  id: string;
  date: string;
  label: string;
  value: TableCell;
};

export type TableEntry = {
  id: string;
  title: string;
  format: TableFormat;
  location: TableLocation;
  /** comparison-2col only */
  columns?: ComparisonColumn[];
  rows?: ComparisonRow[];
  /** formula-card only */
  formula?: FormulaSpec;
  /** breakdown-allocation only */
  total?: { label?: string } & TableCell;
  parts?: AllocationPart[];
  /** checkpoint-timeline only */
  checkpoints?: Checkpoint[];
};

export const TABLES_REGISTRY: TableEntry[] = [
  // =========================================================================
  // CHAPTER 5 — Scorecard 2: Financial Performance — 1M-oz Benchmark Deposit
  // =========================================================================
  {
    id: 'ch05-scorecard-2-financial',
    title: 'Scorecard 2: Financial Performance — 1M-oz Benchmark Deposit',
    format: 'comparison-2col',
    location: { section: 1, chapter: 5, orderInChapter: 1 },
    columns: [
      { id: 'trad', label: 'Traditional Mining' },
      { id: 'digital', label: 'Digital Gold Mining' },
    ],
    rows: [
      {
        id: 'units',
        label: 'Units delivered',
        cells: {
          trad: { staticValue: '508,000 oz', format: 'number' },
          digital: { staticValue: '462,000 tokens', format: 'number' },
        },
      },
      {
        id: 'unit-price',
        label: 'Per-unit valuation',
        cells: {
          trad: { derivation: 'spot', format: 'currency', precision: 0, suffix: '/oz' },
          digital: { derivation: 'biv', format: 'currency', precision: 0, suffix: '/token' },
        },
      },
      {
        id: 'gross',
        label: 'Gross value',
        cells: {
          trad: { derivation: '508000 × spot', format: 'currency', precision: 2, suffix: 'B' },
          digital: { derivation: '462000 × biv', format: 'currency', precision: 2, suffix: 'B' },
        },
      },
      {
        id: 'op-cost',
        label: 'Less: Operating cost (AISC / AITC)',
        cells: {
          trad: { derivation: '508000 × aisc', format: 'currency', precision: 0, suffix: 'M' },
          digital: { derivation: '462000 × biv × 0.33', format: 'currency', precision: 0, suffix: 'M' },
        },
      },
      {
        id: 'closure',
        label: 'Less: Closure & remediation liability',
        cells: {
          trad: { staticValue: '$80M' },
          digital: { staticValue: '—' },
        },
      },
      {
        id: 'net-value',
        label: 'Net value to resource owner',
        cells: {
          trad: {
            derivation: '508000 × spot - 508000 × aisc - 80000000',
            format: 'currency',
            precision: 2,
            suffix: 'B',
          },
          digital: {
            derivation: '462000 × 0.67 × biv',
            format: 'currency',
            precision: 0,
            suffix: 'M',
          },
        },
      },
      {
        id: 'capex',
        label: 'Pre-production CapEx',
        cells: {
          trad: { staticValue: '$300M' },
          digital: { staticValue: '$51M' },
        },
      },
      {
        id: 'cash-deployed',
        label: 'Total cash deployed',
        cells: {
          trad: {
            derivation: '508000 × aisc + 380000000',
            format: 'currency',
            precision: 2,
            suffix: 'B',
          },
          digital: { staticValue: '~$51M (CapEx + cash app fee)' },
        },
      },
      {
        id: 'cash-roi',
        label: 'Cash ROI',
        cells: {
          trad: {
            derivation:
              '(508000 × spot - 508000 × aisc - 80000000) / (508000 × aisc + 380000000)',
            format: 'multiplier',
            precision: 2,
          },
          digital: {
            derivation: '(462000 × 0.67 × biv) / 51000000',
            format: 'multiplier',
            precision: 1,
          },
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 11 — Baseline Intrinsic Value Formula
  // =========================================================================
  {
    id: 'ch11-biv-formula',
    title: 'Baseline Intrinsic Value Formula',
    format: 'formula-card',
    location: { section: 2, chapter: 11, orderInChapter: 1 },
    formula: {
      lhs: {
        label: 'COMEX Gold Spot',
        derivation: 'spot',
        format: 'currency',
        precision: 0,
        suffix: '/oz',
      },
      operator: '−',
      rhs: {
        label: 'NatGold AISC',
        derivation: 'aisc',
        format: 'currency',
        precision: 0,
        suffix: '/oz',
      },
      result: {
        label: 'BIV per Token',
        derivation: 'biv',
        format: 'currency',
        precision: 0,
        suffix: '/token',
      },
    },
  },

  // =========================================================================
  // CHAPTER 11 — Resource Tier Exchange Ratios
  // =========================================================================
  {
    id: 'ch11-exchange-ratios',
    title: 'Resource Tier Exchange Ratios',
    format: 'breakdown-allocation',
    location: { section: 2, chapter: 11, orderInChapter: 2 },
    total: { staticValue: '1 oz of verified in-ground gold' },
    parts: [
      {
        id: 'measured',
        label: 'Measured (highest geological confidence)',
        pct: 0.8,
        value: {
          derivation: 'biv × 0.80',
          format: 'currency',
          precision: 0,
          suffix: '/oz tokenized',
        },
      },
      {
        id: 'indicated',
        label: 'Indicated',
        pct: 0.4,
        value: {
          derivation: 'biv × 0.40',
          format: 'currency',
          precision: 0,
          suffix: '/oz tokenized',
        },
      },
      {
        id: 'inferred',
        label: 'Inferred',
        pct: 0.2,
        value: {
          derivation: 'biv × 0.20',
          format: 'currency',
          precision: 0,
          suffix: '/oz tokenized',
        },
      },
    ],
  },

  // NOTE: the Ch 13 Token Allocation table (static 73/20/5/2 percentages) was
  // stripped 2026-06-30 — it has no live data behind it. The same split is shown
  // with live dollar values in the Ch 15 three-year forecast table below.

  // =========================================================================
  // CHAPTER 15 — Three-Year Token Minting Forecast at Today's BIV
  // =========================================================================
  {
    id: 'ch15-three-year-forecast',
    title: "Three-Year Token Minting Forecast at Today's BIV",
    format: 'breakdown-allocation',
    location: { section: 2, chapter: 15, orderInChapter: 1 },
    total: {
      label: 'Total token value, 17.5M tokens × BIV',
      derivation: '17500000 × biv',
      format: 'currency',
      precision: 1,
      suffix: 'B',
    },
    parts: [
      {
        id: 'mining-co',
        label: 'Mining Companies (73%)',
        pct: 0.73,
        value: {
          derivation: '17500000 × biv × 0.73',
          format: 'currency',
          precision: 1,
          suffix: 'B',
        },
      },
      {
        id: 'natgold-digital',
        label: 'NatGold Digital (20%)',
        pct: 0.2,
        value: {
          derivation: '17500000 × biv × 0.20',
          format: 'currency',
          precision: 1,
          suffix: 'B',
        },
      },
      {
        id: 'integrity',
        label: 'Contingency Fund (5%)',
        pct: 0.05,
        value: {
          derivation: '17500000 × biv × 0.05',
          format: 'currency',
          precision: 1,
          suffix: 'B',
        },
      },
      {
        id: 'social',
        label: 'Social Giveback (2%)',
        pct: 0.02,
        value: {
          derivation: '17500000 × biv × 0.02',
          format: 'currency',
          precision: 1,
          suffix: 'B',
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 16 — BIV Trajectory During Pre-Market Window + Today
  // =========================================================================
  {
    id: 'ch16-biv-trajectory',
    title: 'BIV Trajectory During Pre-Market Window + Today',
    format: 'checkpoint-timeline',
    location: { section: 2, chapter: 16, orderInChapter: 1 },
    checkpoints: [
      {
        id: 'jun16',
        date: '2025-06-16',
        label: 'First public update',
        value: { staticValue: '$1,854/token' },
      },
      {
        id: 'jul17',
        date: '2025-07-17',
        label: 'Program low',
        value: { staticValue: '$1,762/token' },
      },
      {
        id: 'dec31',
        date: '2025-12-31',
        label: 'Year-end',
        value: { staticValue: '$2,721/token' },
      },
      {
        id: 'jan12',
        date: '2026-01-12',
        label: 'Late-wave start',
        value: { staticValue: '$3,001/token' },
      },
      {
        id: 'feb25',
        date: '2026-02-25',
        label: 'Pre-market close (LOCKED)',
        value: { staticValue: '$3,518/token' },
      },
      {
        id: 'today',
        date: '(today)',
        label: 'Live BIV',
        value: { derivation: 'biv', format: 'currency', precision: 0, suffix: '/token' },
      },
    ],
  },
];

/** Filter helper: tables for a given chapter, sorted by orderInChapter. */
export function tablesForChapter(chapter: number): TableEntry[] {
  return TABLES_REGISTRY.filter((t) => t.location.chapter === chapter).sort(
    (a, b) => a.location.orderInChapter - b.location.orderInChapter,
  );
}

// Current-book chapter titles for chapters that appear on the dashboard as
// TABLES ONLY (no stat card). The renderer groups by stats, so without this a
// table-only chapter would never get a panel and its table would be invisible.
const TABLE_CHAPTER_TITLES: Record<number, string> = {
  5: 'Scorecard: Digital Gold Mining vs Traditional Gold Mining',
  11: 'Decoding Digital Gold Mining: The Key Innovations',
  15: 'The 3-Year $61B Forecast and How NatGold Digital Is Built to Deliver It',
  16: 'Pre-Market Demand: US$469M from 17,466 Participants, 162 Countries',
};

/**
 * Chapters in a given section that carry a table, with their titles — so the
 * dashboard can render a panel for a table-only chapter even when no stat card
 * lives there. Deduped, sorted by chapter.
 */
export function tableChaptersForSection(
  section: number,
): Array<{ chapter: number; chapterTitle: string }> {
  const seen = new Set<number>();
  const out: Array<{ chapter: number; chapterTitle: string }> = [];
  for (const t of TABLES_REGISTRY) {
    if (t.location.section !== section) continue;
    if (seen.has(t.location.chapter)) continue;
    seen.add(t.location.chapter);
    out.push({
      chapter: t.location.chapter,
      chapterTitle: TABLE_CHAPTER_TITLES[t.location.chapter] ?? `Chapter ${t.location.chapter}`,
    });
  }
  return out.sort((a, b) => a.chapter - b.chapter);
}
