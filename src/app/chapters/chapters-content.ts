/**
 * /chapters — ALL THE WORDS AND PICTURES FOR THE PAGE LIVE IN THIS ONE FILE.
 * ============================================================================
 * Edit here. Never edit the design file (page.tsx) to change copy.
 *
 * TO CHANGE THE WORDS
 *   Each chapter below has four text fields. Rewrite any of them freely:
 *     title    — the chapter's name (currently the book's real chapter title)
 *     summary  — the paragraph that sells the chapter
 *     claim    — the one-line punch, shown as a gold pull-quote (optional; delete
 *                the line and the pull-quote simply disappears for that chapter)
 *     handoff  — the question this chapter hands to the next one. It is printed on
 *                the gold chain running down the page — this is what makes the
 *                reader feel the chapters connect. (Chapter 17 has none: it is the end.)
 *
 * TO CHANGE A PICTURE
 *   Drop the new file at web/public/chapters/ch-01.webp (…ch-17.webp), same name.
 *   Nothing else to do. Keep them landscape (roughly 3:2) and under ~300KB.
 *   Also update that chapter's `alt` line to describe what the new picture shows.
 *
 * WHERE THIS TEXT CAME FROM (nothing here is invented — Golden Rule #1)
 *   summary + handoff  → the book's front matter, "Read This First" §"Why the Chapters
 *                        Fall in This Order" (_book/front-matter/how-to-read-this-book.md),
 *                        where the author himself lays out each chapter and the question it
 *                        passes forward.
 *   claim (ch 1–8)     → Chapter 8, §"Seven Chapters and the Case"
 *                        (_book/chapters/ch-08-current_updated.md), where the author states
 *                        each chapter's case in one sentence. Chapter 8's own line is the
 *                        book's overall case. Chapters 9–17 have no such line in the book, so
 *                        they have none here — none was made up to fill the gap.
 *   section intros     → "Read This First", the Section 1 and Section 2 openers.
 *   images             → the book's 17 NATGEO chapter images, optimized for the web.
 *
 * STATUS: DRAFT COPY. This is the author's own book prose, used so the page reads finished
 * from day one. It has NOT been through the funnel copy chain (dgb-funnel-copywriter →
 * dgb-copy-chief) as sales copy. Rewrite as you like — that is what this file is for.
 */

export type Chapter = {
  n: number;
  title: string;
  summary: string;
  /** One-line case. Optional — omit and no pull-quote renders. */
  claim?: string;
  /** The question handed to the next chapter. Omit on the last chapter. */
  handoff?: string;
  image: string;
  alt: string;
};

export type BookSection = {
  id: string;
  /** "Section 1" */
  label: string;
  title: string;
  intro: string;
  chapters: Chapter[];
};

/* ── HERO ─────────────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "Inside the book",
  // Two lines: the second is the gold one.
  headline: "Seventeen chapters.",
  headlineGold: "One case, built one part at a time.",
  standfirst:
    "This book makes one claim: gold's value is breaking free of extraction, and the shift is inevitable. It does not ask you to take that on faith. It builds the claim the way you would build any machine — one part at a time, each part tested before the next is added.",
  // The line that explains the chain running down the page.
  chainNote:
    "That is why the chapters fall in the order they do. Each one answers the question the chapter before it raised, then raises the next. Follow the chain and the conclusion assembles itself in front of you.",
};

/* ── CLOSING LINE (printed at the end of the chain) ───────────────────────── */

export const CLOSING =
  "By the last page of Section 2, you have both sides in front of you: the whole case, and the honest challenges to it.";

/* ── THE 17 CHAPTERS, IN TWO SECTIONS ─────────────────────────────────────── */

export const SECTIONS: BookSection[] = [
  {
    id: "section-1",
    label: "Section 1",
    title: "The Inevitability of Digital Gold Mining",
    intro:
      "Section 1 is designed to prove one claim: digital gold mining is the inevitable future of gold. It builds the proof one part at a time — what gold is, why the old way of producing it is failing, where gold's value actually comes from, and the force large enough to move it. Then Chapter 8 brings the parts together into a single case.",
    chapters: [
      {
        n: 1,
        title: "Gold's Legacy and Its Digital Future",
        claim:
          "Gold is the ultimate store of value, but modern capital refuses to hold it because extracting it destroys the environment.",
        summary:
          "Gold has anchored the world's money for six thousand years, and the world wants it more than ever. What changed is not gold but the world around it — money went digital, and capital began to judge an asset by how it's made. Gold's value never lived in the metal, and now it can go digital too.",
        handoff:
          "As the world goes digital and its values shift, it is turning its back on the way we get gold. Just how hard is that getting to justify?",
        image: "/chapters/ch-01.webp",
        alt: "Chapter 1 — Gold's Legacy and Its Digital Future",
      },
      {
        n: 2,
        title: "The Problem: The Extraction S.P.I.R.A.L.™",
        claim:
          "The traditional mining model is collapsing under social and economic pressure, giving society a lethal veto over new mines.",
        summary:
          "Every new ounce of gold still comes from the ground one way — extraction — and that one way is breaking down. Six compounding forces grind against every new mine: the easy ore is gone, so each ounce moves more rock, does more damage, and draws more resistance. Even record prices only tighten it: the Extraction S.P.I.R.A.L.™",
        handoff:
          "The harder extraction gets, the louder one question becomes: does gold even need to be dug up to have value?",
        image: "/chapters/ch-02.webp",
        alt: "Chapter 2 — The Problem: The Extraction S.P.I.R.A.L.",
      },
      {
        n: 3,
        title: "Gold's First Principles: Why Gold Doesn't Need to Be Extracted",
        claim:
          "Because gold is held as wealth rather than consumed, its bankable value is created the moment geology verifies it exists — making physical extraction an unnecessary cost.",
        summary:
          "Strip gold to first principles and the old assumption falls away. Gold is not consumed like other metals; it is held as wealth, and its worth rests on proof that it is real and scarce. The mining world already runs this way — investing billions in a verified deposit before an ounce is lifted. Extraction was never the value, only the cost of reaching it.",
        handoff:
          "The value comes from proving the gold is there, not from hauling it up. So how do you unlock it without a mine?",
        image: "/chapters/ch-03.webp",
        alt: "Chapter 3 — Gold's First Principles",
      },
      {
        n: 4,
        title: "Digital Alchemy: How Tokenization Unlocks Gold Without Extraction",
        claim:
          "Blockchain tokenization provides the mature, institution-grade system to move that verified in-ground value instantly, without ever digging it up.",
        summary:
          "Tokenization is the delivery method — the rails that carry an asset's value without changing it. It is no longer experimental: the largest institutions in finance already move trillions across these rails, settling in minutes what once took days. Point them at gold that is verified but still in the ground, and its value becomes NatGold Tokens ('NATG'): real gold, minted without a mine.",
        handoff:
          "Carrying gold's value digitally is possible. But possible is not better — so on the same gold deposit, head to head, which one wins?",
        image: "/chapters/ch-04.webp",
        alt: "Chapter 4 — Digital Alchemy",
      },
      {
        n: 5,
        title: "Scorecard: Digital Gold Mining vs Traditional Gold Mining",
        claim:
          "This new model — digital gold mining — beats traditional extraction on time, risk, financial return, and environmental impact on the same one-million-ounce deposit.",
        summary:
          "Claims are easy, so Chapter 5 measures. It runs digital gold mining and traditional mining on the same gold deposit — same gold, same price — across time and risk, money, the environment, and who comes out ahead. Side by side, with nowhere to hide, digital gold mining wins on every one.",
        handoff:
          "Better on one gold deposit is not yet inevitable. Tokenization is already sweeping finance — so is gold's turn part of that wave, or just better on paper?",
        image: "/chapters/ch-05.webp",
        alt: "Chapter 5 — Scorecard: Digital Gold Mining vs Traditional Gold Mining",
      },
      {
        n: 6,
        title: "Digital Gold Mining Has Passed the Point of No Return",
        claim:
          "The model is scalable and market-ready today — hundreds of millions in registered demand, trillions in already-verified geology.",
        summary:
          "A better model can still fail, so it must clear the test every innovation faces: do people want it, do the economics work, can it be built now. Digital gold mining clears all three at once, and unlike a vault-backed token it scales across the verified geology already in the ground. The conditions are not coming; they are here.",
        handoff:
          "The model is ready. But who will carry it — who wants gold the most, hates how we get it, and has the reach to make the world listen?",
        image: "/chapters/ch-06.webp",
        alt: "Chapter 6 — Digital Gold Mining Has Passed the Point of No Return",
      },
      {
        n: 7,
        title: "The $124 Trillion Shift in Capital and Values",
        claim:
          "The generation inheriting $124 trillion needs gold's stability but rejects the mine's destruction; because digital gold mining resolves that conflict, they will drive its adoption.",
        summary:
          "A ready model still needs capital, and a particular kind. The generation now inheriting $124 trillion — the largest handover of wealth in history — holds gold at three times the rate of its grandparents, yet refuses to defend how it's mined. Digital gold mining removes the mine, turning the asset they couldn't defend into one they don't just hold but spread.",
        handoff:
          "Gold's six thousand years, the blockchain rails that finally matured, and now a generation with the values and the wealth to back it — three forces that never once aligned. What happens at the one moment in history they meet?",
        image: "/chapters/ch-07.webp",
        alt: "Chapter 7 — The $124 Trillion Shift in Capital and Values",
      },
      {
        n: 8,
        title: "Why Digital Gold Mining Is the Inevitable Future of Gold",
        claim:
          "The convergence of capital, technology, and demand makes digital gold mining the inevitable future of gold.",
        summary:
          "Three forces that ran on separate clocks for a generation finally meet at one point: gold's six-thousand-year value, the capital that refused to hold it, and the blockchain that grew up in between. The meeting does not repeat. Out of it, gold's value gets a second road out of the ground — real and tokenized, with the metal vaulted in the ground.",
        handoff: "The case has been made. So who built it, and why did it take seven years?",
        image: "/chapters/ch-08.webp",
        alt: "Chapter 8 — Why Digital Gold Mining Is the Inevitable Future of Gold",
      },
    ],
  },
  {
    id: "section-2",
    label: "Section 2",
    title: "The NatGold Digital Gold Mining Ecosystem",
    intro:
      "Section 1 proves the case. Section 2 answers the natural next question: who built this, and does it actually work? It opens the machine and walks you through every part — the people, the proof, the method, the gate, the mint, the partners, the forecast, the demand. Then it ends where an honest case has to: on the challenges ahead.",
    chapters: [
      {
        n: 9,
        title: "NatGold Digital: The Team, the Vision & Why It's Taken Seven Years",
        summary:
          "The vision is simple: give gold a digital form that can sit at the center of money. Gold can't get there: it leaves the ground too slowly. Bitcoin can't: its supply is frozen at 21 million. NatGold Tokens escape both flaws, growing only as verified gold is added. Built over seven years by a former U.S. SEC chief of staff, a former Colombian cabinet minister, and a former Barrick innovation chief.",
        handoff: "The team is proven. But how do you prove the gold is there?",
        image: "/chapters/ch-09.webp",
        alt: "Chapter 9 — NatGold Digital: The Team, the Vision & Why It's Taken Seven Years",
      },
      {
        n: 10,
        title: "Built on Verification: Global Standards That Prove Gold's Existence",
        summary:
          "Verification is how a gold deposit goes from a claim to verified, real gold. Independent experts drill it, sample it under strict chain of custody, model the deposit, and audit the result, each staking a professional license on it. It is the same proof banks rely on to invest billions, and the bedrock everything after it rests on.",
        handoff:
          "The gold is verified. So how does verified gold in the ground become a NatGold Token you can trade?",
        image: "/chapters/ch-10.webp",
        alt: "Chapter 10 — Built on Verification",
      },
      {
        n: 11,
        title: "Decoding Digital Gold Mining: The Key Innovations",
        summary:
          "The key innovations turn a verified gold deposit — in Canada, the US, or Australia — into uniform, interchangeable NATG, whatever its grade or confidence, by fixed rules rather than human judgment. Ten patent applications are in full examination at the U.S. Patent and Trademark Office.",
        handoff: "The method works on paper. But what stops the wrong gold deposits from getting in?",
        image: "/chapters/ch-11.webp",
        alt: "Chapter 11 — Decoding Digital Gold Mining: The Key Innovations",
      },
      {
        n: 12,
        title: "Qualification & Approval: How Deposits Enter the NatGold Pipeline",
        summary:
          "To enter the pipeline, a gold deposit must pass all eight stages. It pre-qualifies on permanent, outright title and a compliant resource, then signs a binding agreement. Independent firms handle the technical and legal checks, inspect the deposit on site, and re-count the gold. Finally a three-specialist committee votes unanimously and both the CEO and CFO sign.",
        handoff:
          "Once a gold deposit becomes a Certified NatGold Resource, how does that turn into a NatGold Token you can own?",
        image: "/chapters/ch-12.webp",
        alt: "Chapter 12 — Qualification & Approval",
      },
      {
        n: 13,
        title: "Minting NatGold Tokens: From Certified NatGold Resource to Tradeable Token",
        summary:
          "Minting turns an approved deposit into tradeable NATG, and it is deliberately paced. Deposits wait in a queue, and NATG are minted only as real demand calls for them: first in, first out, with the order locked on the blockchain. That way supply never floods and no holder is diluted. The full evidence, down to the original drill core, is kept in a secure warehouse.",
        handoff: "The NatGold Token is minted. But is the system underneath it strong enough to trust?",
        image: "/chapters/ch-13.webp",
        alt: "Chapter 13 — Minting NatGold Tokens",
      },
      {
        n: 14,
        title: "The Institutional Ecosystem: Built for the World's Most Cautious Capital",
        summary:
          "The ecosystem runs on leading industry specialists, each independent: Fireblocks for the institutional backend, High Ridge Trust as the Nevada-chartered custodian holding NATG off any exchange, FYEO for security audits published in full, a PCAOB-registered firm on the books, and Kraken for trading. No single company holds everything, so no single failure can bring it down.",
        handoff: "The system is built. So what could it produce at scale?",
        image: "/chapters/ch-14.webp",
        alt: "Chapter 14 — The Institutional Ecosystem",
      },
      {
        n: 15,
        title: "The 3-Year $61B Forecast and How NatGold Digital Is Built to Deliver It",
        summary:
          "The three-year forecast: $61 billion of NatGold Tokens — and that's a sliver of what's stranded. Some $22 trillion of gold sits already drilled and verified, too costly or too damaging to mine. Digital gold mining unlocks the deposits that qualify, no mine needed.",
        handoff: "The forecast rests on one assumption: that the buyers show up. Did they?",
        image: "/chapters/ch-15.webp",
        alt: "Chapter 15 — The 3-Year $61B Forecast",
      },
      {
        n: 16,
        title: "Pre-Market Demand: US$469M from 17,466 Participants, 162 Countries",
        summary:
          "Before a single NATG traded, 17,466 people across 162 countries reserved $469 million worth. No money changed hands; this was demand reserved on the record, before NATG ever went on sale. The numbers point to strong global demand for the digital gold mining model itself, not just the token. That signal spans the world.",
        handoff: "The case is proven and the demand is real. So what could still go wrong?",
        image: "/chapters/ch-16.webp",
        alt: "Chapter 16 — Pre-Market Demand",
      },
      {
        n: 17,
        title: "The Road Ahead: Challenges and Questions, Answered",
        summary:
          "Every new asset class, once it launches, meets the same phase: the market reacts, the landscape shifts, and hard questions arrive. This chapter takes that phase head-on — it names the challenges digital gold mining faces, at full strength, then works through each with the same mechanics the book has built.",
        image: "/chapters/ch-17.webp",
        alt: "Chapter 17 — The Road Ahead",
      },
    ],
  },
];

export const ALL_CHAPTERS: Chapter[] = SECTIONS.flatMap((s) => s.chapters);
