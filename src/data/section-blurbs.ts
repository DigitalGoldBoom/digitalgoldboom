// Short factual blurbs for each book section, surfaced at the top of the
// section accordion in the live dashboard. US English. Keep these short.
// Drift-check: voice canon is C:\DGB\context\author-style-guide.md.
//
// Section 3 + 4 are placeholders — those chapters aren't in stats-registry.ts
// yet (Phase 1 covers Ch 1–16; Ch 17–23 land in a second-pass audit).

export type SectionBlurb = {
  number: number;
  title: string;
  blurb: string;
};

export const SECTION_BLURBS: SectionBlurb[] = [
  {
    number: 1,
    title: 'Why Gold No Longer Needs Mining',
    blurb:
      "Gold's monetary role outlived the case for digging it up. Roughly 219,890 tonnes already sits above ground, recycled and re-recycled for centuries. Reserves of $22 trillion of in-ground gold are verified to mineable standard. Extraction was never the value. Verification is.",
  },
  {
    number: 2,
    title: 'The NatGold Digital Mining Ecosystem',
    blurb:
      'NatGold turns verified in-ground gold into a tradeable token without a single ounce mined. The Baseline Intrinsic Value (spot minus AISC) prices each token off the same data the industry already publishes. Standards, custody, and an institutional verification chain sit underneath.',
  },
  {
    number: 3,
    // TODO: fill once Ch 17–22 land in stats-registry.ts (second-pass audit).
    title: '',
    blurb: '',
  },
  {
    number: 4,
    // TODO: fill once Ch 23 lands in stats-registry.ts (second-pass audit).
    title: '',
    blurb: '',
  },
];
