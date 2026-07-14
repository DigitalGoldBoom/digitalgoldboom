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
