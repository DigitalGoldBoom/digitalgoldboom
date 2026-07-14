/**
 * The five free chapters — the ONE source of truth for what the lead magnet contains.
 *
 * The home page and /free both promise the same five chapters, and they had drifted into two
 * different sets of invented blurbs. A reader who meets the offer twice must meet the same offer
 * twice, so both pages now read from here.
 *
 * The titles are the chapters' REAL titles (C:\DGB-Website\_book\chapters\ch-01…ch-05). The line
 * under each is that chapter's own claim, compressed from the book's case summary in Chapter 8
 * ("Seven Chapters and the Case: Digital Gold Mining Is Inevitable") — where the author states
 * each chapter's argument himself. Nothing here is a marketer's invention, and no figure appears
 * that the book does not state: the Panama mine ($10B, 39 days), the 93% held-not-consumed share,
 * and the $6B of gold already trading in token form all come straight out of that summary.
 *
 * Chapter 8's version runs a paragraph per chapter. A stranger deciding whether to hand over an
 * email will read a line, so each is compressed to one.
 */
export type ChapterTeaser = { title: string; line: string };

export const FREE_CHAPTERS: ChapterTeaser[] = [
  {
    title: "Gold's Legacy and Its Digital Future",
    line: "The world wants gold more than ever. The capital that wants it most cannot hold it — purely because of how the metal is produced.",
  },
  {
    title: "The Extraction S.P.I.R.A.L.™",
    line: "Six forces compounding against every new mine. In Panama, a $10 billion mine vanished in 39 days.",
  },
  {
    title: "Gold's First Principles",
    line: "93% of gold is never consumed, only held. Its value is created the moment geology proves it is there — not when it is dug up.",
  },
  {
    title: "Digital Alchemy",
    line: "The rails are already proven: $6 billion of gold trades in token form today. Aim them at the gold still in the ground.",
  },
  {
    title: "The Scorecard",
    line: "Same deposit, same gold, same price. Run both models head to head and it is not close.",
  },
];

/**
 * FREE_CHAPTERS_V2 — the REDESIGN's chapter lines. Used ONLY by the versioned "2" routes
 * (/2 and /free2). The live pages above are untouched; nothing here changes what is on the site
 * today. Andrew reviews the "2" pages, and only then do we decide whether these replace the ones
 * above.
 *
 * Why they differ: the author's note was "keep it to the main chapter objective — ch8 can show you
 * that." Chapter 8's "Seven Chapters and the Case" states each chapter's argument in his own words,
 * so each line now LEADS with what the chapter sets out to prove and CLOSES with the proof — the
 * shape Ch 8 itself uses. The old lines reach for a hook first (the Panama figure, the 93%) and
 * leave the objective implied.
 *
 * Graded by dgb-copy-chief: PASS 91/100, compliance gate clean. Two corrections it forced, worth
 * knowing about because both were in the LIVE lines above:
 *   · "93% of gold is never consumed" is wrong as written — the book's 93% is a share of ANNUAL
 *     DEMAND (WGC 2024: 93% monetary / 7% industrial), not of all the gold that exists. Rescoped.
 *   · "$6 billion of gold trades in token form" needs to say WHAT that is — receipts for bullion
 *     already mined, refined and vaulted — or a reader blurs it with the book's own model. Plus an
 *     as-of date, because it went $1.9B → $6B in twelve months and will read stale without one.
 */
export const FREE_CHAPTERS_V2: ChapterTeaser[] = [
  {
    title: "Gold's Legacy and Its Digital Future",
    line: "The asset modern capital wants most is the one it cannot hold — not because of what gold is, but because of how the metal is produced.",
  },
  {
    title: "The Extraction S.P.I.R.A.L.™",
    line: "Six forces now compound against every new mine, and the public holds the veto — in Panama, a $10 billion mine vanished in 39 days. Higher gold prices only tighten the spiral.",
  },
  {
    title: "Gold's First Principles",
    line: "Only 7% of gold demand is industrial. The rest is bought to be held — so gold's worth rests on proof that it is real and scarce, which makes extraction a cost, not the value.",
  },
  {
    title: "Digital Alchemy",
    line: "Six billion dollars of gold already trades in token form (February 2026) — but every token is a receipt for metal already mined, refined and vaulted. The rails are proven. Only the gold they point at has to change.",
  },
  {
    title: "The Scorecard",
    line: "Same deposit. Same gold. Same price. Run both models side by side on time, risk, money and damage — and it is not close.",
  },
];
