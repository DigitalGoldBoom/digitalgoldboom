// Per-table neutral prose summaries shown directly below each recreated
// chapter table on /live. Each function takes the LiveBundle and returns a
// 2-4 sentence factual description of how the table's anchor inputs have
// drifted from the book's pre-market-close snapshot.
//
// Tone: factual, neutral, no marketing — the table itself does the persuading.
//
// Snapshot anchors (book lock, Feb 25-26 2026):
//   COMEX spot: $5,194/oz
//   AISC:       $1,676/oz
//   BIV:        $3,518/token

import type { LiveBundle } from './sources';

const SNAPSHOT_SPOT = 5_194;
const SNAPSHOT_BIV = 3_518;

/** Verb describing direction of a percent change with a flat band. */
function moveVerb(pct: number): 'risen' | 'fallen' | 'held roughly steady' {
  if (pct > 0.5) return 'risen';
  if (pct < -0.5) return 'fallen';
  return 'held roughly steady';
}

function pctChange(snapshot: number, live: number): number {
  if (snapshot === 0) return 0;
  return ((live - snapshot) / snapshot) * 100;
}

function fmtUsdInt(n: number): string {
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

type SummaryFn = (live: LiveBundle) => string;

const FALLBACK = 'Live values unavailable — showing the book snapshot.';

/**
 * Ch 5 — Scorecard 2: Financial Performance.
 * The summary explains how spot and BIV deltas propagate through the table's
 * gross / net / ROI math.
 */
export const ch05Scorecard2Summary: SummaryFn = (live) => {
  const spot = live.spot?.value;
  const biv = live.biv?.value;
  if (spot === undefined || biv === undefined) return FALLBACK;
  const spotPct = pctChange(SNAPSHOT_SPOT, spot);
  const bivPct = pctChange(SNAPSHOT_BIV, biv);
  return (
    `Gold spot has ${moveVerb(spotPct)} ${Math.abs(spotPct).toFixed(1)}% since the book's snapshot, ` +
    `from ${fmtUsdInt(SNAPSHOT_SPOT)} to ${fmtUsdInt(spot)}/oz. ` +
    `BIV has ${moveVerb(bivPct)} ${Math.abs(bivPct).toFixed(1)}% to ${fmtUsdInt(biv)}/token. ` +
    `Both columns of the scorecard scale proportionally — net values and cash ROI track those deltas.`
  );
};

/**
 * Ch 11 — BIV Formula (spot − AISC = BIV).
 */
export const ch11BivFormulaSummary: SummaryFn = (live) => {
  const spot = live.spot?.value;
  const aisc = live.aisc?.value;
  const biv = live.biv?.value;
  if (spot === undefined || aisc === undefined || biv === undefined) return FALLBACK;
  const bivPct = pctChange(SNAPSHOT_BIV, biv);
  return (
    `The formula is unchanged: BIV is COMEX spot minus the NatGold Real-Time AISC Index. ` +
    `At today's ${fmtUsdInt(spot)}/oz spot and ${fmtUsdInt(aisc)}/oz AISC, BIV settles at ${fmtUsdInt(biv)}/token — ` +
    `${moveVerb(bivPct)} ${Math.abs(bivPct).toFixed(1)}% from the book's ${fmtUsdInt(SNAPSHOT_BIV)} lock.`
  );
};

/**
 * Ch 11 — Resource Tier Exchange Ratios (Measured 0.80 / Indicated 0.40 / Inferred 0.20).
 */
export const ch11ExchangeRatiosSummary: SummaryFn = (live) => {
  const biv = live.biv?.value;
  if (biv === undefined) return FALLBACK;
  const measured = biv * 0.8;
  return (
    `The exchange ratios (0.80 / 0.40 / 0.20) are fixed by NatGold methodology. ` +
    `The dollar values they produce track BIV: at today's ${fmtUsdInt(biv)} BIV, ` +
    `a Measured ounce tokenizes to ${fmtUsdInt(measured)} versus ${fmtUsdInt(SNAPSHOT_BIV * 0.8)} at the book's snapshot.`
  );
};

/**
 * Ch 13 — Token Allocation by Submission Pathway.
 */
export const ch13TokenAllocationSummary: SummaryFn = () => {
  return (
    `Allocation percentages are protocol constants set by NatGold Digital — ` +
    `they don't move with spot or AISC. The Integrity Fund (5%) and Social Giveback (2%) ` +
    `apply on both pathways; the difference is whether the deposit was submitted by an external ` +
    `mining company (73% to the miner, 20% to NatGold) or acquired directly by NatGold (93%).`
  );
};

/**
 * Ch 15 — Three-Year Token Minting Forecast at today's BIV.
 */
export const ch15ThreeYearForecastSummary: SummaryFn = (live) => {
  const biv = live.biv?.value;
  if (biv === undefined) return FALLBACK;
  const totalLive = 17_500_000 * biv;
  const totalSnapshot = 17_500_000 * SNAPSHOT_BIV;
  const pct = pctChange(totalSnapshot, totalLive);
  return (
    `The 17.5M-token target is the program plan; the dollar totals scale with BIV. ` +
    `At today's ${fmtUsdInt(biv)}/token the three-year aggregate is ` +
    `$${(totalLive / 1_000_000_000).toFixed(1)}B versus $${(totalSnapshot / 1_000_000_000).toFixed(1)}B at the book's lock — ` +
    `${moveVerb(pct)} ${Math.abs(pct).toFixed(1)}%. Allocation splits (73 / 20 / 5 / 2) are protocol constants.`
  );
};

/**
 * Ch 16 — BIV Trajectory During Pre-Market Window + Today.
 */
export const ch16BivTrajectorySummary: SummaryFn = (live) => {
  const biv = live.biv?.value;
  if (biv === undefined) return FALLBACK;
  const closePct = pctChange(SNAPSHOT_BIV, biv);
  return (
    `The five historical checkpoints are locked — they were the BIV reference on those dates ` +
    `during the pre-market reservation window. Today's BIV sits at ${fmtUsdInt(biv)}/token, ` +
    `${moveVerb(closePct)} ${Math.abs(closePct).toFixed(1)}% from the ${fmtUsdInt(SNAPSHOT_BIV)} pre-market close on Feb 25 2026.`
  );
};

/** Index every summary function by its table id for easy lookup. */
export const TABLE_SUMMARIES: Record<string, SummaryFn> = {
  'ch05-scorecard-2-financial': ch05Scorecard2Summary,
  'ch11-biv-formula': ch11BivFormulaSummary,
  'ch11-exchange-ratios': ch11ExchangeRatiosSummary,
  'ch13-token-allocation': ch13TokenAllocationSummary,
  'ch15-three-year-forecast': ch15ThreeYearForecastSummary,
  'ch16-biv-trajectory': ch16BivTrajectorySummary,
};
