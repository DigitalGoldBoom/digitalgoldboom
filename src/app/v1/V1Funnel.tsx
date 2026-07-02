"use client";

import Book3D from "@/components/Book3D";
import NumberCounter from "@/components/NumberCounter";
import SalesField from "@/components/funnel/sales/SalesField";
import SalesCTA from "@/components/funnel/sales/SalesCTA";
import PhotorealSlot from "@/components/funnel/sales/PhotorealSlot";
import Reveal from "@/components/funnel/sales/Reveal";
import { StepFlow, ConvergenceDiagram, ProcessTimeline, SpiralAccent } from "./visuals";

/* COPY IS LOCKED — pasted verbatim from SALES-COPY-FINAL-v1-s.md (PAGE /v1). Do not rewrite.
   Built on the v2 design system, elevated. One product, one CTA → LemonSqueezy ($37 book). */

const STEPS = [
  { n: "01", t: "Verify", b: "Independent geologists prove the gold exists in the ground, to the institutional standards (NI 43-101, JORC, S-K 1300) the industry already trusts." },
  { n: "02", t: "Represent", b: "That verified, in-ground gold is recorded digitally as a token. Each token references one ounce of verified in-ground gold." },
  { n: "03", t: "Hold and transfer", b: "It can be held and moved on the same digital rails the rest of finance now uses — without the cost or damage of extraction." },
];

const FORCES = [
  "Central banks holding gold at multi-decade highs",
  "Real-world assets represented digitally at institutional scale",
  "A younger generation that wants gold without the cost of mining it",
];

const PROOF_STAGES = [
  { t: "Verification", b: "Independent geologists prove the deposit, to the standard the industry finances on." },
  { t: "Institutional standards", b: "Held to NI 43-101 / JORC / S-K 1300 — the same proof a mine is financed on." },
  { t: "The approval gate", b: "What each stage actually requires before it can move forward." },
  { t: "Through the model", b: "Real deposits walked end to end — not theory, documented step by step." },
];

const CONTENTS = [
  { n: "01", t: "The Inevitability of Digital Gold Mining", b: "Chapters 1–8. What gold is, why the old way of producing it is failing, where its value actually comes from, and the force large enough to move it — brought together into a single case." },
  { n: "02", t: "The NatGold Digital Gold Mining Ecosystem", b: "Chapters 9–17. Who built it and whether it works: the people, the proof, the method, the approval gate, the mint, the partners, the forecast, and the demand — ending on the honest challenges." },
];

// Named risks — taken verbatim from the Beat 10 copy ("can you sell when you want, is the
// gold really there, what if the company fails, what if a government seizes the ground, what
// if the gold price falls"). The "still open" one is NOT named in the copy, so it is marked
// as its own honest tile rather than pinned to a specific risk (no fabrication).
const RISKS = [
  "Can you sell when you want?",
  "Is the gold really there?",
  "What if the company fails?",
  "What if a government seizes the ground?",
  "What if the gold price falls?",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="v2-eyebrow mb-7">{children}</p>;
}

function Divider() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="v2-divider" />
    </div>
  );
}

export default function V1Funnel() {
  return (
    <div className="v2 relative overflow-clip">
      <SalesField />

      <main className="relative z-10">
        {/* ── BEAT 1 · HOOK ───────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-32 pb-20 lg:pt-28">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              <div>
                <Reveal as="div"><Eyebrow>A shift in the gold industry</Eyebrow></Reveal>
                <Reveal as="h1" delay={60} className="v2-display" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                  It&rsquo;s not gold.
                  <br />
                  It&rsquo;s not <span className="v2-gold">bitcoin.</span>
                </Reveal>
                <Reveal as="p" delay={120} className="mt-8 max-w-[48ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  There is a change underway in how the world&rsquo;s oldest asset works — and most people have never heard of it. This book is the first plain-English account of the whole thing.
                </Reveal>
                <Reveal delay={180} className="mt-10">
                  <SalesCTA event="v1_hero_buy" regular="97" />
                </Reveal>
              </div>

              {/* HERO VISUAL — interim = Book3D (on-brand, zero new asset, ship-now path).
                  SWAP POINT: when the author delivers the Tier-4 photoreal gold-mass, replace
                  <Book3D/> with:
                  <PhotorealSlot label="hero gold-mass" src="/sales/hero-goldmass.avif"
                    alt="A rough natural gold nugget glowing from within" priority aspect="1 / 1" /> */}
              <div className="flex justify-center lg:justify-end">
                <Book3D />
              </div>
            </div>
          </div>
        </section>

        {/* ── BEAT 2 · THE SHIFT ──────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>What changed</Eyebrow></Reveal>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal as="h2" className="v2-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4.25rem)", maxWidth: "16ch" }}>
                For six thousand years, owning gold meant digging it out of the ground.
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-8" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.25rem)", fontWeight: 300, color: "#F4F4F7", letterSpacing: "-0.02em" }}>
                  For the first time, <span className="v2-gold">it doesn&rsquo;t have to.</span>
                </p>
                <span className="mt-7 block h-px w-24" style={{ background: "var(--v2-gold)" }} />
              </Reveal>
            </div>
            <Reveal as="p" delay={120} className="text-lg leading-relaxed lg:pt-3" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
              A new approach lets the value of a gold deposit be independently verified — proven real by geologists, to the same standard a mine is financed on — while the gold stays exactly where it sits, and then represented digitally. The industry calls it <span style={{ color: "#F4F4F7" }}>digital gold mining.</span> This book is a plain-English account of how it works, who is building it, and what it means for an industry that has not changed its method in a century.
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── BEAT 3 · THE PROBLEM ────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          {/* movement 1 — the stat lead */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <div
                className="v2-display font-mono v2-gold"
                style={{ fontSize: "clamp(5rem, 16vw, 12rem)", lineHeight: 0.85 }}
                aria-label="$22 trillion of geologically verified gold still in the ground"
              >
                <NumberCounter start={0} end={22} prefix="$" suffix="T" />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-base leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "44ch" }}>
                Gold that is geologically verified, sitting in the ground. As of February 26, 2026, gold at $5,194/oz.
              </p>
            </Reveal>
          </div>

          {/* movement 2 — the strain */}
          <div className="mt-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 md:mt-28">
            <div>
              <Reveal><Eyebrow>The problem</Eyebrow></Reveal>
              <Reveal as="h2" delay={60} className="v2-display" style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)", maxWidth: "18ch" }}>
                The old way of producing gold is under real strain.
              </Reveal>
              <Reveal as="p" delay={120} className="mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "56ch" }}>
                In 2020, in Chocó, Colombia, Andrew Fletcher flew in to finance a gold pipeline and walked away from it. He landed on site and stood at the edge of a mercury-contaminated pit where workers, some of them teenagers, handled the material with no protection. That is the cost the old model carries, and the world is less willing to pay it every year. The book lays out six compounding forces squeezing the extraction model — what Fletcher calls the Extraction S.P.I.R.A.L. — and why even record gold prices tighten that squeeze instead of easing it: the easy ore is gone, so each new ounce moves more rock and draws more opposition. The path from a verified deposit to a produced ounce has nearly tripled in two decades — in the United States it now averages 29 years.
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <div className="v2-tile px-6 py-5">
                    <div className="font-mono v2-gold" style={{ fontSize: "1.9rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>29 yrs</div>
                    <div className="mt-2 text-sm" style={{ color: "var(--v2-faint)" }}>US average, verified deposit → produced ounce</div>
                  </div>
                  <div className="v2-tile px-6 py-5">
                    <div className="font-mono v2-gold" style={{ fontSize: "1.9rem", lineHeight: 1 }}>~3×</div>
                    <div className="mt-2 text-sm" style={{ color: "var(--v2-faint)" }}>longer than two decades ago</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-8">
              <Reveal>
                {/* SWAP POINT — somber documentary cost still (author-manual, sensitive).
                    Pass src once the author approves it. */}
                <PhotorealSlot
                  label="documentary cost still"
                  tone="somber"
                  alt="A desaturated scarred artisanal gold-mining pit, no people"
                  aspect="16 / 10"
                />
              </Reveal>
              <Reveal delay={80}>
                <SpiralAccent />
              </Reveal>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── BEAT 4 · THE REFRAME ────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>The reframe</Eyebrow></Reveal>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal as="h2" className="v2-display" style={{ fontSize: "clamp(2.1rem, 5vw, 4.25rem)", maxWidth: "15ch" }}>
              The gold industry <span className="v2-gold" style={{ fontStyle: "italic", fontWeight: 300 }}>already</span> runs on verification, not just digging.
            </Reveal>
            <div className="lg:pt-3">
              <Reveal as="p" className="text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                No serious gold investment happens without independent geologists first proving the gold is there. That proof is the backbone of the whole industry — banks finance billion-dollar mines on it, and verified deposits change hands for real money before a single ounce is lifted. The book makes the case that extraction was only ever the costly method of reaching that value, never the value itself.
              </Reveal>
              <Reveal delay={120}>
                <figure className="v2-tile mt-9 m-0 p-7" style={{ borderTop: "1px solid var(--v2-gold)" }}>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="font-mono v2-gold" style={{ fontSize: "2.2rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>$1B</span>
                    <span className="font-mono" style={{ fontSize: "1.4rem", color: "#F4F4F7", fontVariantNumeric: "tabular-nums" }}>~39M oz</span>
                  </div>
                  <p className="mt-4" style={{ color: "var(--v2-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    In 2025, Barrick Gold sold its half of the Donlin deposit in Alaska — roughly 39 million ounces of verified gold — for one billion dollars in cash, with nothing in production.
                  </p>
                  <figcaption className="mt-3 font-mono" style={{ color: "var(--v2-faint)", fontSize: "0.75rem", letterSpacing: "0.02em" }}>
                    Reported industry transaction — verified gold has real market value before a single ounce is mined.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BEAT 5 · THE MECHANISM ──────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>The model</Eyebrow></Reveal>
          <Reveal as="h2" delay={60} className="v2-display mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", maxWidth: "20ch" }}>
            How digital gold mining actually works.
          </Reveal>

          <StepFlow steps={STEPS} />

          <Reveal delay={80}>
            <div
              className="mt-6 rounded-[22px] p-8 md:p-10"
              style={{
                border: "1px solid rgba(232,178,58,0.35)",
                background: "linear-gradient(180deg, rgba(232,178,58,0.08), rgba(232,178,58,0.02))",
              }}
            >
              <p className="font-mono v2-gold mb-4" style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Digital gold mining
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "#E7E7EE", maxWidth: "74ch" }}>
                A model developed by NatGold Digital: a digital token that references one ounce of independently verified in-ground gold, leaving the gold where it sits instead of mining it out. The underlying methodology is the subject of <span style={{ color: "#F4F4F7" }}>ten patent-pending applications</span> now in examination at the U.S. Patent and Trademark Office.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── BEAT 6 · WHY NOW ────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>Why now</Eyebrow></Reveal>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Reveal as="h2" delay={60} className="v2-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", maxWidth: "16ch" }}>
                Why this is worth understanding now.
              </Reveal>
              <Reveal as="p" delay={120} className="mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "52ch" }}>
                Three long-running shifts have lined up at once: central banks are holding gold at multi-decade highs, real-world assets are being represented digitally at institutional scale, and a younger generation wants gold without the environmental cost of mining it. The model is no longer theoretical. The first deposits have been submitted, and the first tokens are set to trade on <span className="v2-gold">July 8, 2026.</span>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <ConvergenceDiagram forces={FORCES} />
            </Reveal>
          </div>
          <Reveal delay={80}>
            <p className="mt-14 text-center" style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", fontWeight: 300, color: "#F4F4F7", letterSpacing: "-0.01em", maxWidth: "28ch", marginInline: "auto" }}>
              This is a real development inside a multi-trillion-dollar industry — and it is <span className="v2-gold">about to be tested in public.</span>
            </p>
          </Reveal>
        </section>

        <Divider />

        {/* ── BEAT 7 · PROOF ON REAL DEPOSITS ─────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>Proof on real ground</Eyebrow></Reveal>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal as="h2" delay={60} className="v2-display" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.25rem)", maxWidth: "20ch" }}>
                Not theory — real gold deposits, taken through the model and documented step by step.
              </Reveal>
              <Reveal as="p" delay={120} className="mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                In Chapter 15, the book follows real projects — among them the Cahuilla project and Friday Gold Mines, deposits with decades of drilling behind them — through the digital gold mining process: the verification, the institutional standards, the approval gate, what each stage actually requires. You see the model work on real ground, not just on paper.
              </Reveal>
            </div>
            <Reveal delay={120}>
              {/* SWAP POINT — drill-core anchor still (author-manual). Process imagery only:
                  no dollar value, no resource size, no investment outcome (compliance). */}
              <PhotorealSlot
                label="drill-core anchor"
                tone="gold"
                alt="Rock drill cores in sample trays on a field table"
                aspect="4 / 3"
              />
            </Reveal>
          </div>
          <Reveal delay={80}>
            <div className="mt-16">
              <ProcessTimeline stages={PROOF_STAGES} />
            </div>
          </Reveal>
        </section>

        {/* ── BEAT 8 · CREDIBILITY ────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>Who wrote it</Eyebrow></Reveal>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              {/* AUTHOR PORTRAIT — must be a REAL author-supplied photo (never AI-generated).
                  SWAP POINT: drop the real portrait in here once supplied:
                  <Image src="/sales/author.webp" alt="Andrew Fletcher, author" width={520} height={620} … />
                  Interim = a quiet monogram tile (no fabricated face). */}
              <div
                className="v2-tile flex aspect-[4/5] items-center justify-center"
                style={{ border: "1px solid rgba(232,178,58,0.3)" }}
                data-photoreal-slot="author portrait"
              >
                <span className="v2-display v2-gold" style={{ fontSize: "clamp(3rem,8vw,5rem)", opacity: 0.6 }}>AF</span>
              </div>
            </Reveal>
            <div>
              <Reveal as="h2" className="v2-display" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.25rem)", maxWidth: "18ch" }}>
                Written by someone who ran a gold company inside this shift.
              </Reveal>
              <Reveal as="p" delay={80} className="mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "56ch" }}>
                Andrew Fletcher is the former President of Great Eagle Gold, now NatBridge Resources — the first gold company built to align with this model. As President he led the company that struck its supply agreement with NatGold Digital. He has assessed more than two hundred gold projects across multiple continents. This is the industry explained by someone who has worked inside it — not a summary written from the outside.
              </Reveal>
              <Reveal delay={120}>
                <p
                  className="mt-9 rounded-2xl p-6 text-base leading-relaxed"
                  style={{ border: "1px solid var(--v2-line)", color: "#E7E7EE", maxWidth: "60ch" }}
                >
                  This book is educational — not financial advice.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── BEAT 9 · WHAT YOU GET ───────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>What is inside</Eyebrow></Reveal>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="order-2 flex justify-center lg:order-1">
              <Book3D />
            </div>
            <div className="order-1 lg:order-2">
              <Reveal as="h2" className="v2-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", maxWidth: "16ch" }}>
                The complete picture, built one piece at a time.
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTENTS.map((c, i) => (
                  <Reveal key={c.n} delay={i * 60}>
                    <div className="v2-tile h-full p-6">
                      <div className="v2-num v2-gold mb-3" style={{ color: "var(--v2-gold)" }}>{c.n}</div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 8, lineHeight: 1.3 }}>{c.t}</h3>
                      <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{c.b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={120}>
                <p className="mt-7 text-base" style={{ color: "var(--v2-faint)" }}>
                  Every statistic sourced to a primary record you can check. Written in plain English.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BEAT 10 · HONESTY AS PROOF ──────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <Reveal><Eyebrow>Read the downside too</Eyebrow></Reveal>
          <Reveal as="h2" delay={60} className="v2-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", maxWidth: "18ch" }}>
            The book argues a case — and then <span className="v2-gold">argues against it.</span>
          </Reveal>
          <Reveal as="p" delay={120} className="mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "62ch" }}>
            One chapter puts the whole thesis under stress: can you sell when you want, is the gold really there, what if the company fails, what if a government seizes the ground, what if the gold price falls. The author names each one at full strength and answers it with the same mechanics the book lays out — and he is candid that one of them is still open. You get the entire case, and the entire downside, in one place, to judge for yourself.
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RISKS.map((r, i) => (
              <Reveal key={r} delay={i * 50}>
                <div className="v2-tile flex h-full items-start gap-3 p-6">
                  <span aria-hidden className="mt-0.5 v2-gold" style={{ fontSize: "1.1rem" }}>✓</span>
                  <div>
                    <p style={{ color: "#F4F4F7", fontSize: "1rem", lineHeight: 1.4 }}>{r}</p>
                    <p className="mt-1.5 font-mono" style={{ color: "var(--v2-faint)", fontSize: "0.7rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      Named & answered
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={RISKS.length * 50}>
              <div
                className="flex h-full items-start gap-3 rounded-[22px] p-6"
                style={{ border: "1px solid rgba(232,178,58,0.55)", background: "rgba(232,178,58,0.05)" }}
              >
                <span aria-hidden className="mt-0.5 v2-gold" style={{ fontSize: "1.1rem" }}>●</span>
                <div>
                  <p style={{ color: "#F4F4F7", fontSize: "1rem", lineHeight: 1.4 }}>One the author marks still open — and says so.</p>
                  <p className="mt-1.5 font-mono v2-gold" style={{ fontSize: "0.7rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    Still open
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── BEAT 11 · CLOSE ─────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-28 md:py-36 text-center">
          <Reveal><Eyebrow>Read it for yourself</Eyebrow></Reveal>
          <Reveal as="h2" delay={60} className="v2-display mx-auto" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", maxWidth: "16ch" }}>
            Understand it for the price of a <span className="v2-gold">paperback.</span>
          </Reveal>
          <Reveal as="p" delay={120} className="mx-auto mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "50ch" }}>
            Digital Gold Boom is a one-time $37 — the early-reader launch price, before it moves to its regular $97. In return, I&rsquo;m asking the first readers for an honest review. You get the complete book, delivered digitally the moment you check out — and the chance to understand this model before the first tokens trade on July 8, 2026.
          </Reveal>
          <Reveal as="p" delay={150} className="mx-auto mt-5 text-base" style={{ color: "var(--v2-faint)", maxWidth: "52ch" }}>
            If the book is not worth your time, email us within 12 months for a full refund. No questions asked.
          </Reveal>
          <Reveal delay={180} className="mt-10 flex justify-center">
            <div className="w-full max-w-[420px]">
              <SalesCTA
                event="v1_final_buy"
                align="center"
                regular="97"
                fine="Secure checkout via LemonSqueezy. Educational content — not financial advice."
              />
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
