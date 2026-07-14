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
