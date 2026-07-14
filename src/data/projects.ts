// Projects data — the verified source of truth for the public Projects dashboard
// (Cahuilla + Friday). Every figure traces to the QP-reviewed NI 43-101 source
// files in _knowledge/{cahuilla,friday}/source-files/ or to the named company
// press release. `sourceTag` marks provenance ('report' = the NI 43-101;
// 'release' = a company press release; 'book' = the book's framing).
//
// ── MINTED vs PROJECTED — the distinction this file exists to protect ───────
// MINTED  = NATG that actually exists on the Ethereum blockchain today. Read
//           live from the contract (lib/live/onchain.ts), never hard-coded.
//           Only SLICES of each property have been tokenized so far.
// PROJECTED = what the FULL deposits would generate if tokenized in their
//           entirety at the published resource-tier ratios. A forward-looking
//           figure. It must never be presented as tokens that exist.
//
// Conflating those two is exactly the disclosure failure the BCSC forced
// NatBridge Resources to publicly correct on 2026-07-09. Keep them separate.
//
// Live value = tokens × live BIV (the same NatGold BIV feed /live uses).

export type SourceTag = 'report' | 'release' | 'book';

/** One completed tokenization event — a specific parcel/claim minted on-chain. */
export type MintedTranche = {
  /** The exact ground that was tokenized (e.g. "Patented claims 45 & 46"). */
  parcel: string;
  /** NATG generated and minted from this tranche (per company disclosure). */
  tokens: number;
  /** ISO date the tokenization completed. */
  date: string;
  /** Who the interest was acquired from for tokenization. */
  acquiredFrom: string;
  /** Plain-language note on what is NOT included in this tranche. */
  remainder: string;
};

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
  // ---- MINTED ON-CHAIN (what actually exists today) ----
  minted: {
    /** Sum of this project's tranches, per company disclosure. */
    tokens: number;
    tranches: MintedTranche[];
  };
  // ---- PROJECTED (hero block: FULL-deposit token amount + backing categories) ----
  // NOT minted. What the whole deposit would generate if fully tokenized.
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

/**
 * PROJECTED total if BOTH deposits were tokenized in full:
 * 247,498 (Cahuilla) + 314,204 (Friday) = 561,702. Forward-looking — NOT minted.
 */
export const PROJECTED_TOKENS = 561_702;

/**
 * The aggregate NatGold states in its July 9 2026 release: 57,200 + 49,600.
 *
 * ⚠️ The contract reports 106,799 — one token fewer. Verified by direct
 * totalSupply() read on 2026-07-14. We display the CHAIN figure as the minted
 * total and disclose this one-token variance rather than paper over it.
 * The per-property splits below are the company's; only the chain total is ours.
 */
export const MINTED_TOKENS_PER_DISCLOSURE = 106_800;

/** NATG smart contract — the single source of truth for minted supply. */
export const NATG_CONTRACT_ADDRESS = '0x59c323346F4f62aE18289F346501389392cf5939';

/**
 * Program allocations skimmed off every tokenization, per the July 9 2026
 * release (stated across both completed tokenizations).
 */
export const MINTED_ALLOCATIONS = {
  contingencyFund: { pct: 5, tokens: 5_340 },
  socialGiveback: { pct: 2, tokens: 2_136 },
} as const;

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
    // Source: NatGold Digital press release, July 9 2026 (full text mirrored at
    // _knowledge/natgold/site-mirror/press-releases/press-release-2026-07-09-*.md).
    // NOTE — an unresolved conflict sits in this file: the Mar 12 2026 definitive
    // agreement (see `deal` below) describes FIVE patented claims at Friday; the
    // July 9 release calls Alaska 4 "the first of four patented claims". We do not
    // guess. The UI states only what is minted and that the rest is not.
    minted: {
      tokens: 49_600,
      tranches: [
        {
          parcel: 'Patented claim “Alaska 4”, Friday Gold Mine',
          tokens: 49_600,
          date: '2026-07-09',
          acquiredFrom: 'Sovereon Gold Corp.',
          remainder:
            'The first claim at Friday to be tokenized. The remaining patented claims were not included and have not been minted.',
        },
      ],
    },
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
    // Figures pulled 2026-07-14 pending an art redo (author call). The dashboard
    // hides the "Figures & maps" block entirely while this is empty — repopulate
    // to bring it back. Source images remain in /public/projects/friday/.
    figures: [],
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
    // Source: NatGold Digital press release, July 9 2026. NatGold issued NO
    // standalone release for the June 30 Cahuilla tokenization — the July 9
    // release and two NatBridge releases are the only citable records of it.
    minted: {
      tokens: 57_200,
      tranches: [
        {
          parcel: 'Patented mining claims 45 & 46, Cahuilla Gold Project',
          tokens: 57_200,
          date: '2026-06-30',
          acquiredFrom: 'NatBridge Resources Ltd. (CSE: NATB)',
          remainder:
            'Two parcels only — the first tokenization NatGold completed. The balance of the Cahuilla deposit has not been minted.',
        },
      ],
    },
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
    // Figures pulled 2026-07-14 pending an art redo (author call). See Friday above.
    figures: [],
  },
];
