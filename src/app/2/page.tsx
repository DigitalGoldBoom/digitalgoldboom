// Server Component — this page is pure markup; the only interactive pieces (Book3D, NumberCounter,
// BuyButton) are their own client islands. Keeping the page server-rendered means the browser does
// NOT download/hydrate the whole page (that was a ~1s main-thread block on mobile), so first paint
// and LCP land far sooner.
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Book3D from "@/components/Book3D";
import NumberCounter from "@/components/NumberCounter";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import StickyCTA from "@/components/StickyCTA";
import { FREE_CHAPTERS_V2 } from "@/lib/chapters";
import type { Metadata } from "next";

/**
 * /2 — the HOME PAGE REDESIGN, for Andrew to review side-by-side against the live `/`.
 *
 * The live home page is NOT touched. That was his instruction, in his words: "I don't want the
 * current versions to be overwritten. That is really important." Same convention Session B used for
 * /chapters2 and /chapters3 — put the alternative on a numbered route and let him judge the built
 * thing rather than a description of it.
 *
 * What differs from `/`, and why (all four from the conversion-flow audit):
 *  1. PROOF ABOVE THE ASK. The live hero's first CTA has zero proof above it — no number, no name,
 *     nothing to believe. The author's credential now sits in the fold, in the skim layer.
 *  2. THE CTAs STOP BOUNCING OFF-PAGE. This page already carries a full lead-magnet form at
 *     #start-reading that NOTHING linked to — every button navigated to /free instead, paying a
 *     page load to land on a second capture surface. The buttons now scroll to the form that's
 *     already here.
 *  3. A PHONE FOLD THAT ISN'T DEAD. 128px of padding under a fixed nav is gone; the book comes up.
 *  4. TABLET EXISTS. Every grid used to jump grid-cols-1 → lg:, so 768–1023px got the phone stack
 *     inside a 1320px shell.
 * Plus the chapter rows use the copy-chief-passed lines and the inverted weight (the claim is the
 * headline; the chapter title is the label), so the book's own numbers stop being the faintest text
 * on the page.
 *
 * NOINDEX — this is a review route, not a second home page. It must never compete with `/` in search.
 */
export const metadata: Metadata = {
  title: "Home — redesign preview",
  robots: { index: false, follow: false },
};

const STEPS = [
  { n: "01", t: "Verify", b: "A deposit is drilled, sampled and certified to institutional standard (NI 43-101) — the same proof a $10-billion mine is financed on." },
  { n: "02", t: "Tokenize", b: "Verified ounces are recorded digitally by geological confidence. Each NATG token references one ounce of in-ground gold." },
  { n: "03", t: "Trade", b: "Priced off the gold industry's own math — spot price minus mining cost. The first tokens trade on Kraken once its listing review completes." },
];

// The five chapters come from src/lib/chapters.ts — one source, shared with /free, so the two
// pages promising the same book can never again describe two different books.

const SECTIONS = [
  { n: "01", title: "The Inevitability of Digital Gold Mining", meta: "Chapters 1–8", body: "What gold is, why the old way of producing it is failing, where its value actually comes from, and the force large enough to move it — brought together into a single case." },
  { n: "02", title: "The NatGold Digital Gold Mining Ecosystem", meta: "Chapters 9–16", body: "Who built it and whether it actually works: the people, the proof, the method, the approval gate, the mint, the partners, the forecast, and the demand — ending on the honest challenges." },
];

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 mb-10">
      <span className="v2-num">{n}</span>
      <span className="h-px flex-1 max-w-[80px]" style={{ background: "var(--v2-line)" }} />
      <span className="v2-eyebrow" style={{ gap: 0 }}>{children}</span>
    </div>
  );
}

export default function HomeRedesignPage() {
  // Preload the hero book-cover art — it's the LCP element but ships as a CSS background image
  // inside Book3D, which browsers fetch late at low priority. Preloading (hoisted into <head> in
  // the SSR HTML) starts the download immediately, in parallel with the page JS, so LCP lands far
  // sooner on mobile. Same art the /book hero uses.
  ReactDOM.preload("/book3d-framer/cover-front-v2.webp", { as: "image", fetchPriority: "high" });
  ReactDOM.preload("/book3d-framer/cover-texture.webp", { as: "image", fetchPriority: "high" });

  return (
    <div className="rd2 v2 dgb-vault-bg relative">
      {/* Gold shimmer field lives in the root layout now (SiteBackground) — one continuous field
          for the whole site, so it never re-pops between pages. dgb-vault-bg makes this page's
          base transparent so that single field shows through. */}
      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────── */}
        {/* The phone hero was ~1,110px — 1.5 screens — with 128px of dead padding under a fixed nav,
            so the book (the thing being offered) started BELOW the first screen on most phones. The
            padding comes down and the book comes up: a social visitor should SEE the product before
            he is asked for anything. */}
        <section className="relative min-h-[100svh] flex items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-24 pb-16 md:pt-28 md:pb-20">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-8 lg:gap-8 items-center">
              <div>
                <p className="v2-eyebrow mb-8">A shift in the gold industry</p>
                <h1 className="v2-display" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                  It&rsquo;s not gold.
                  <br />
                  It&rsquo;s not <span className="v2-gold">bitcoin.</span>
                </h1>
                <p className="mt-7 max-w-[50ch] text-lg leading-relaxed sm:text-xl" style={{ color: "var(--v2-dim)" }}>
                  For six thousand years, unlocking gold&rsquo;s value meant one thing: <span style={{ color: "#F4F4F7" }}>digging it out of the ground.</span>{" "}That just ended &mdash; and almost no one has noticed yet.
                </p>

                {/* THE PROOF, ABOVE THE ASK — the redesign's central move on this page.
                    The live home page's first CTA sits ~497px down a phone with NOTHING above it but
                    an eyebrow, a claim and a promise: no number, no name, no reason to believe. The
                    first hard fact lands 2,000px further on, and the author's credential — the
                    strongest proof a book has — is 62%-opacity body prose six screens down.
                    One line, in the skim layer, before he is asked for anything. */}
                <p className="lm-principle mt-7" style={{ maxWidth: "48ch" }}>
                  <span style={{ color: "#F4F4F7", fontWeight: 600 }}>Andrew Fletcher</span>{" "}was
                  President &amp; CEO of Great Eagle Gold &mdash; now NatBridge Resources, the first
                  gold company built for this model. He has assessed hundreds of gold projects.
                </p>

                {/* Two doors, one primary. The free chapters are the offer that is real today, so
                    they keep the weight. The book sits beside it as a quiet second door: a visitor
                    who already wants it should never have to hunt for the price, and a payment
                    processor reviewing the site should reach the product page from the front door
                    rather than a URL handed to them. (Session B's call, at Andrew's request — kept.) */}
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href="#start-reading" className="v2-btn">Read the first 5 chapters — free</a>
                  <Link href="/buy" className="v2-btn-ghost">The full book — $37</Link>
                </div>
                {/* PRE-LAUNCH, said plainly. The book is still being written — the last chapters
                    close on a launch that has not happened yet — so there is nothing to sell and
                    no date to promise. Saying so is not a weakness: it explains why the five
                    chapters are free, and it makes the email the only thing being asked for. */}
                <p className="mt-4 text-sm" style={{ color: "var(--v2-faint)" }}>
                  Free · sent to your inbox · read it before anyone else.
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--v2-faint)" }}>
                  The full book lands after the launch. The first five chapters are ready now.
                </p>
                <p className="mt-2 text-xs" style={{ color: "var(--v2-faint)" }}>
                  Educational — not financial advice.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <Book3D />
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD MAGNET — first 5 chapters free (email capture) ───
            Was a centred box that restated the hero's headline word for word and then asked for an
            email, having shown nothing new in between: the second ask, with nothing earned since
            the first. It now SHOWS the goods — the five chapters, by name — and the form sits
            beside them. A reader who can see what is behind the door does not need persuading to
            knock. Split, not centred, so the eye lands on the contents first and the field second. */}
        <section
          id="start-reading"
          className="scroll-mt-24 mx-auto w-full max-w-[1320px] px-6 md:px-10 py-20 md:py-28"
        >
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.02fr_0.98fr] md:gap-10 lg:gap-20">
            <div>
              <span className="lm-eyebrow">Free preview</span>
              <h2
                className="v2-display mt-7"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.1rem)", maxWidth: "14ch" }}
              >
                Start with the first <span className="v2-gold">5 chapters.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "42ch" }}>
                Free, in your inbox. Exactly what you get:
              </p>

              <ol className="mt-8">
                {FREE_CHAPTERS_V2.map((c, i) => (
                  <li key={c.title} className="lm-row">
                    <span className="lm-row-n" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="lm-row-h">{c.title}</span>
                      <span className="lm-row-t">{c.line}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* The form is the ONLY enclosed thing on the section — so the enclosure means
                "this is the thing you act on" rather than being a box drawn around a box. */}
            <div className="lm-shell">
              <div className="lm-core">
                <LeadMagnetForm source="home_lead_magnet" />
              </div>
            </div>
          </div>
        </section>

        {/* ── $22T STAT ────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="00">The stakes</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-10 lg:gap-20 items-center">
            <div className="v2-display font-mono v2-gold" style={{ fontSize: "clamp(5rem, 16vw, 12rem)", lineHeight: 0.85 }}>
              <NumberCounter start={0} end={22} prefix="$" suffix="T" />
            </div>
            <div>
              <h2 className="v2-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", maxWidth: "16ch" }}>
                Verified gold, sitting in the ground.
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "48ch" }}>
                132,000 tonnes of it — drilled, mapped and certified to the same standard a $10-billion mine is financed on. The gold is real. The way we&rsquo;ve always unlocked it — extraction — is breaking down.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

        {/* ── REFRAME ──────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="01">The reframe</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-8 lg:gap-16 items-start">
            <h2 className="v2-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4.25rem)", maxWidth: "15ch" }}>
              Gold mining <span className="v2-gold" style={{ fontStyle: "italic", fontWeight: 300 }}>already</span>{" "}runs on verification, not extraction.
            </h2>
            <div className="lg:pt-3">
              <p className="text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                <span style={{ color: "#F4F4F7", fontWeight: 600 }}>No billion-dollar gold investment happens without geological verification first.</span>{" "}Every deposit that ever made it into the system started with a geologist proving the gold exists. Verification is the backbone — extraction is the part everyone assumed was non-negotiable.
              </p>
              <p className="mt-8" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", fontWeight: 300, color: "#F4F4F7", letterSpacing: "-0.02em" }}>
                It isn&rsquo;t. <span className="v2-gold">Not anymore.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS (bento) ─────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="02">How digital gold mining works</SectionLabel>
          <h2 className="v2-display mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", maxWidth: "20ch" }}>
            Blockchain finally matured enough to <span className="v2-gold">bypass extraction.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="v2-tile p-8 md:p-10">
                <div className="v2-num mb-8">STEP {s.n}</div>
                <h3 style={{ fontSize: "clamp(1.5rem, 2vw, 1.875rem)", fontWeight: 400, color: "#F4F4F7", marginBottom: 12 }}>{s.t}</h3>
                <p className="leading-relaxed" style={{ color: "var(--v2-dim)", fontSize: "0.95rem" }}>{s.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY NOW ──────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="03">Why now</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-8 lg:gap-16 items-start">
            <h2 className="v2-display" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)", maxWidth: "18ch" }}>
              Why this is worth understanding <span className="v2-gold">now.</span>
            </h2>
            <div className="lg:pt-2">
              <p className="text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                Three long-running shifts have lined up at once: central banks are holding gold at multi-decade highs, real-world assets are being represented digitally at institutional scale, and a younger generation wants gold without the environmental cost of mining it. The model is no longer theoretical — the first deposits have been submitted, and trading begins <span style={{ color: "#F4F4F7" }}>once Kraken completes its listing review.</span>
              </p>
              <p className="mt-8" style={{ fontSize: "clamp(1.25rem, 2vw, 1.625rem)", fontWeight: 300, color: "#F4F4F7", letterSpacing: "-0.01em", maxWidth: "30ch" }}>
                A real development inside a multi-trillion-dollar industry — <span className="v2-gold">about to be tested in public.</span>
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

        {/* ── THE BOOK ─────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="04">The book</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
            <div className="flex justify-center order-2 lg:order-1"><Book3D /></div>
            <div className="order-1 lg:order-2">
              <h2 className="v2-display" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}>Digital Gold Boom.</h2>
              <p className="mt-5 v2-gold" style={{ fontSize: "clamp(1rem,1.4vw,1.25rem)", fontWeight: 500, letterSpacing: "0.02em" }}>
                Tell all. Nothing held back.
              </p>
              <p className="mt-8 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "52ch" }}>
                The first <span style={{ color: "#F4F4F7" }}>plain-English account</span>{" "}of digital gold mining — the whole story, start to finish. Written so a reader with no background in gold, blockchain, or investing can follow every step — detailed and carefully sourced, and clear about what&rsquo;s established today versus what&rsquo;s a forward-looking forecast.
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "52ch" }}>
                By <span style={{ color: "#F4F4F7", fontWeight: 600 }}>Andrew Fletcher</span> — former President &amp; CEO of Great Eagle Gold, now NatBridge Resources, which signed the first NatGold supply agreement.
              </p>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SECTIONS.map((s) => (
                  <div key={s.n} className="v2-tile p-6">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="v2-num v2-gold" style={{ color: "var(--v2-gold)" }}>SECTION {s.n}</span>
                      <span className="v2-num">{s.meta}</span>
                    </div>
                    <h4 style={{ fontSize: "1.1875rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 8, lineHeight: 1.25 }}>{s.title}</h4>
                    <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#start-reading" className="v2-btn">Read the first 5 chapters — free</a>
              </div>
              <p className="mt-4 text-sm" style={{ color: "var(--v2-faint)" }}>
                Free · sent to your inbox · and first in line for the full book.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

        {/* ── ABOUT THE AUTHOR ─────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="05">About the author</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="v2-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4.25rem)" }}>Andrew Fletcher.</h2>
              <p className="mt-5 v2-gold" style={{ fontSize: "clamp(1rem,1.4vw,1.25rem)", fontWeight: 500, letterSpacing: "0.02em" }}>
                President &amp; CEO, Great Eagle Gold — now NatBridge Resources.
              </p>
              <p className="mt-8 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                Andrew Fletcher was President &amp; CEO of Great Eagle Gold — now <span style={{ color: "#F4F4F7", fontWeight: 600 }}>NatBridge Resources</span>, the first gold company built to align with NatGold&rsquo;s Digital Gold Mining Model. He signed the landmark supply agreement that delivers tokenization-ready gold deposits to back the NatGold Token (&ldquo;NATG&rdquo;), and has assessed hundreds of gold projects.
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                In 2020 he walked away from a <span style={{ color: "#F4F4F7", fontWeight: 600 }}>$30 million gold deal in Colombia</span>{" "}after standing at the edge of a mercury-contaminated pit where workers, some of them teenagers, handled the material without protection. That day is where this book began.
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                The two companies at the center cannot tell the whole story — one is heads-down building it, the other is publicly listed and limited in what it can say. <span style={{ color: "#F4F4F7", fontWeight: 600 }}>Digital Gold Boom</span>{" "}is the one place it is told start to finish: a full analysis of why digital gold mining is the future of gold, and a complete breakdown of NatGold Digital&rsquo;s vision, team, technology, and how digital gold mining works.
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div
                className="relative w-full max-w-[360px] overflow-hidden rounded-[20px]"
                style={{ aspectRatio: "4 / 5", boxShadow: "0 0 40px rgba(232,178,58,0.28)" }}
              >
                <Image
                  src="/images/ai-profile-af.webp"
                  alt="Andrew Fletcher, author of Digital Gold Boom"
                  fill
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA / OFFER ────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-28 md:py-36 text-center">
          <SectionLabel n="06">Read it for yourself</SectionLabel>
          <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", maxWidth: "20ch" }}>
            Understand the future of gold <span className="v2-gold">before Wall Street does.</span>
          </h2>
          <p className="mt-5 mx-auto v2-gold" style={{ fontSize: "clamp(1rem,1.4vw,1.25rem)", fontWeight: 500, letterSpacing: "0.02em" }}>
            Get it Early. Get Informed. Get the Edge.
          </p>
          <p className="mt-6 mx-auto text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "48ch" }}>
            Start with the first five chapters — free, sent to your inbox. Confirm the email we send
            you and the chapters are yours, and you&rsquo;re first in line when the complete book is ready.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href="#start-reading" className="v2-btn">Read the first 5 chapters — free</a>
            <span className="text-sm" style={{ color: "var(--v2-faint)" }}>
              Free · sent to your inbox · no payment
            </span>
          </div>
          <p className="mt-6 mx-auto text-xs leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "52ch" }}>
            Educational content — not financial advice.
          </p>
        </section>
      </main>

      {/* The phone-only ask that follows the reader. This page runs ~7 screens on a phone and had
          exactly one CTA the whole way down — a reader convinced by the author section had to
          scroll-hunt back to the top to act. It disarms when the form is on screen. */}
      <StickyCTA targetId="start-reading" label="Get the first 5 chapters" source="home2_sticky" />
    </div>
  );
}
