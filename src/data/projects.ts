// Projects data — the verified source of truth for the public Projects dashboard
// (Cahuilla + Friday). Every figure traces to the QP-reviewed NI 43-101 source
// files in C:\DGB-Book\knowledge\{cahuilla,friday}\source-files\ or to the named
// company press release. Presented AS THE BOOK FRAMES IT (author decision
// 2026-06-30 — both deposits are in NatGold's tokenization pipeline; NatGold
// program eligibility governs). `sourceTag` marks provenance ('report' = the
// NI 43-101; 'release' = a company press release; 'book' = the book's framing).
//
// Token amounts are FIXED counts; each project's live value = tokens × live BIV
// (the same NatGold BIV feed the /live dashboard uses).

export type SourceTag = 'report' | 'release' | 'book';

/** A resource category that backs the minted tokens (used by the pipeline section). */
export type TokenBacking = {
  category: 'Measured' | 'Indicated' | 'Inferred';
  /** Contributing ounces from this category (controlled position). */
  ounces: number;
  /** Exchange ratio: Measured .80 / Indicated .40 / Inferred .20. */
  ratio: number;
  /** Tokens minted from this category (published / book value). */
  tokens: number;
  /** True when the backing ounces come from a historical (non-current) estimate. */
  isHistorical: boolean;
};

/** A row in the full deposit resource table. */
export type ResourceRow = {
  category: 'Measured' | 'Indicated' | 'Inferred';
  tonnes?: number;
  gradeGt?: number; // g/t Au
  ounces: number;
  isHistorical: boolean;
};

export type ProjectFigure = {
  /** Public path under /public/projects/... */
  src: string;
  caption: string;
  kind: 'drillmap' | 'geology' | 'soils' | 'section' | 'photo';
};

export type Project = {
  id: 'friday' | 'cahuilla';
  name: string;
  tagline: string;
  location: string;
  status: string;
  verified: boolean; // true = current QP-verified resource; false = historical-estimate-backed
  // ---- PIPELINE SUMMARY (hero block: token amount + the categories backing it) ----
  pipeline: {
    totalTokens: number;
    natgoldPct: number;
    sellerPct: number;
    sellerName: string;
    /** The resource categories (incl. historical) that back the minted tokens. */
    backing: TokenBacking[];
    /** Plain note on what the backing is (controlled position, historical, etc.). */
    backingNote: string;
  };
  // ---- FULL DEPOSIT RESOURCE (resource table) ----
  resource: ResourceRow[];
  resourceNote: string;
  cutoff: string;
  report: {
    effectiveDate: string;
    qp: string;
    firm: string;
    preparedFor: string;
  };
  deal: {
    price: string;
    terms: string;
    keyDates: string;
    sourceTag: SourceTag;
  };
  history: string;
  drilling: string;
  royalties?: string;
  figures: ProjectFigure[];
};

// Book-canonical per-token BIV anchor (Feb 26 2026 close). The live page should
// override the dollar value with tokens × LIVE BIV from the NatGold feed.
export const BIV_ANCHOR_USD = 3518;

/** Combined pipeline headline: 247,498 (Cahuilla) + 314,204 (Friday) = 561,702. */
export const COMBINED_TOKENS = 561_702;

export const PROJECTS: Project[] = [
  // =========================================================================
  // FRIDAY — current, QP-verified resource (NI 43-101 eff. May 7 2026)
  // =========================================================================
  {
    id: 'friday',
    name: 'Friday Gold Project',
    tagline: 'A drilled, independently verified resource entering the NatGold pipeline.',
    location: 'Orogrande Mining District, Idaho County, central Idaho, USA',
    status: 'Current NI 43-101 Mineral Resource — Measured, Indicated & Inferred (QP-verified)',
    verified: true,
    pipeline: {
      totalTokens: 314_204,
      natgoldPct: 73,
      sellerPct: 20,
      sellerName: 'Sovereon Gold Corp.',
      backing: [
        { category: 'Measured', ounces: 182_175, ratio: 0.8, tokens: 145_740, isHistorical: false },
        { category: 'Indicated', ounces: 391_908, ratio: 0.4, tokens: 156_753, isHistorical: false },
        { category: 'Inferred', ounces: 58_558, ratio: 0.2, tokens: 11_711, isHistorical: false },
      ],
      backingNote:
        '314,204 tokens backed by a current, QP-verified resource — including a substantial Measured (highest-confidence) component.',
    },
    resource: [
      { category: 'Measured', tonnes: 6_918_542, gradeGt: 0.82, ounces: 182_175, isHistorical: false },
      { category: 'Indicated', tonnes: 21_536_578, gradeGt: 0.57, ounces: 391_908, isHistorical: false },
      { category: 'Inferred', tonnes: 3_281_727, gradeGt: 0.56, ounces: 58_558, isHistorical: false },
    ],
    resourceNote:
      '632,641 oz Au total (574,083 oz Measured + Indicated at 0.63 g/t, plus 58,558 oz Inferred), within the 5 patented claims NatGold is acquiring.',
    cutoff: '0.25 g/t Au, constrained in an optimized open-pit shell',
    report: {
      effectiveDate: 'May 7, 2026',
      qp: 'Ronald G. Simpson, P.Geo.',
      firm: 'GeoSim Services Inc. (independent)',
      preparedFor: 'Sovereon Gold Corp.',
    },
    deal: {
      price: 'US$20 million',
      terms: '$2M after a 45-day due-diligence period, then $18M within a year; NatGold acquires 100% of the 5 patented claims, Sovereon retains 20% of minted tokens.',
      keyDates: 'Sovereon Option Agreement Mar 6, 2026; NatGold Definitive Agreement Mar 12, 2026.',
      sourceTag: 'release',
    },
    history:
      'Operators in the estimate: Cyprus-Amax (1996–98), Kinross (1998–99), Premium Exploration (2009–14), Endomines (2019–22). Endomines mined underground 2019–22 (998 oz from 11,608 t) before suspension.',
    drilling:
      '90 holes used in the resource estimate — 55 core + 35 reverse-circulation. Coarse native gold + electrum favorable for gravity; pit shell uses 85% metallurgical recovery.',
    royalties:
      'On the 5 patented claims: 3% NSR Idaho Gold Corp. (capped US$1M), 1% NSR Del Steiner (capped US$1M), and a 2%→3% NSR (Premium).',
    figures: [
      { src: '/projects/friday/drillmap.png', caption: 'Friday drill-hole map', kind: 'drillmap' },
      { src: '/projects/friday/geology.png', caption: 'Friday geology', kind: 'geology' },
      { src: '/projects/friday/soils.png', caption: 'Friday soil geochemistry', kind: 'soils' },
      { src: '/projects/friday/longsection.png', caption: 'Friday long-section', kind: 'section' },
      { src: '/projects/friday/photo.png', caption: 'Friday Gold Project', kind: 'photo' },
    ],
  },

  // =========================================================================
  // CAHUILLA — in NatGold's tokenization pipeline (book framing; historical-backed)
  // =========================================================================
  {
    id: 'cahuilla',
    name: 'Cahuilla Gold Project',
    tagline: 'A drilled California gold system moving through the NatGold tokenization pipeline.',
    location: 'Northwest Imperial County, California, USA',
    status: 'In the NatGold tokenization pipeline (NatBridge Resources Ltd., CSE: NATB)',
    verified: false,
    pipeline: {
      totalTokens: 247_498,
      natgoldPct: 73,
      sellerPct: 20,
      sellerName: 'Teras Resources (vendor)',
      backing: [
        { category: 'Indicated', ounces: 618_746, ratio: 0.4, tokens: 247_498, isHistorical: true },
      ],
      backingNote:
        '247,498 tokens backed by 618,746 controlled Indicated ounces — the NatGold-controlled portion of a ~1.26M-oz Indicated estimate drilled under NI 43-101 (historical estimate).',
    },
    resource: [
      { category: 'Indicated', tonnes: 82_114_000, gradeGt: 0.51, ounces: 1_261_000, isHistorical: true },
      { category: 'Inferred', tonnes: 3_585_000, gradeGt: 0.72, ounces: 75_000, isHistorical: true },
    ],
    resourceNote:
      'Book framing: ~1.26M oz Indicated gold across the deposit; NatGold controls 618,746 indicated ounces, which convert at the 0.40 Indicated ratio to 247,498 NatGold Tokens. Figures are from NI 43-101 historical estimates.',
    cutoff: 'NatGold Digital Mining Cutoff Grade 0.10 g/t (program standard)',
    report: {
      effectiveDate: 'NI 43-101, 2026 (NatBridge / APEX · Capps Geoscience)',
      qp: 'Dr. Richard C. Capps, Ph.D. & Michael B. Dufresne, M.Sc., P.Geol.',
      firm: 'APEX Geoscience Ltd. / Capps Geoscience LLC (independent)',
      preparedFor: 'NatBridge Resources Ltd.',
    },
    deal: {
      price: 'Phase 1 (Parcels 45 & 46): US$2,755,056',
      terms: '$50,000 (LOI, paid) + $277,506 (paid) + $2,427,550 due within 30 days of the tokenization event.',
      keyDates: 'Binding acquisition agreement with Teras signed Oct 17, 2025; submitted for tokenization Nov 14, 2025.',
      sourceTag: 'release',
    },
    history:
      'Explored by Newmont, Homestake, Kennecott and Teras over multiple campaigns since 1988. More than $26 million spent proving the gold is there.',
    drilling:
      '131 holes for 73,766 ft (22,484 m) by CGC-Teras / Teras (2011–17) — 116 RC + 15 diamond core — plus earlier Kennecott RC drilling (1993–96). Strike ~2.7 km, width 400–700 m.',
    figures: [
      { src: '/projects/cahuilla/drillmap.png', caption: 'Cahuilla drill-hole map', kind: 'drillmap' },
      { src: '/projects/cahuilla/photo.png', caption: 'Cahuilla Gold Project', kind: 'photo' },
    ],
  },
];
