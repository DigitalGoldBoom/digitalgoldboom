// Short factual blurbs for each book section, surfaced at the top of the
// section accordion in the live dashboard. US English. Keep these short.
// Drift-check: voice canon is C:\DGB\context\author-style-guide.md.
//
// Aligned to the current 17-chapter / 2-section book (Operation Condense,
// 2026-06-12). Section titles are verbatim from the published book PDF:
// Section 1 = The Inevitability of Digital Gold Mining (Ch 1–8); Section 2 =
// The NatGold Digital Gold Mining Ecosystem (Ch 9–16). Ch 17 (The Road Ahead)
// is a qualitative closer with no live-moving figures, so it has no stat cards
// and no section panel.

export type SectionBlurb = {
  number: number;
  title: string;
  blurb: string;
};

export const SECTION_BLURBS: SectionBlurb[] = [
  {
    number: 1,
    title: 'The Inevitability of Digital Gold Mining',
    blurb:
      "Gold's monetary value never depended on mining it. Roughly 219,890 tonnes already sits above ground, recycled for centuries, while about $22 trillion more is verified underground to the mining industry's own court-grade reporting standards. These eight chapters build the case that connecting that value digitally — rather than extracting it — is the inevitable next step.",
  },
  {
    number: 2,
    title: 'The NatGold Digital Gold Mining Ecosystem',
    blurb:
      'How NatGold Digital turns verified in-ground gold into a tradeable token without a single ounce mined. The Baseline Intrinsic Value (spot price minus all-in sustaining cost) prices each token off data the industry already publishes; global verification standards, independent custody, and a qualification pipeline sit underneath.',
  },
];
