"use client";

import Image from "next/image";
import Book3D from "@/components/Book3D";
import ShimmerDots from "@/components/ShimmerDots";
import NumberCounter from "@/components/NumberCounter";
import BuyButton from "@/components/BuyButton";

const bookCheckout = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

const STEPS = [
  { n: "01", t: "Verify", b: "A deposit is drilled, sampled and certified to institutional standard (NI 43-101) — the same proof a $10-billion mine is financed on." },
  { n: "02", t: "Tokenize", b: "Verified ounces are recorded digitally by geological confidence. Each NATG token references one ounce of in-ground gold." },
  { n: "03", t: "Trade", b: "Priced off the gold industry's own math — spot price minus mining cost. The first tokens are set to trade on Kraken from July 8, 2026." },
];

const SECTIONS = [
  { n: "01", title: "The Inevitability of Digital Gold Mining", meta: "Chapters 1–8", body: "What gold is, why the old way of producing it is failing, where its value actually comes from, and the force large enough to move it — brought together into a single case." },
  { n: "02", title: "The NatGold Digital Gold Mining Ecosystem", meta: "Chapters 9–17", body: "Who built it and whether it actually works: the people, the proof, the method, the approval gate, the mint, the partners, the forecast, and the demand — ending on the honest challenges." },
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

export default function V2Page() {
  return (
    <div className="v2 relative overflow-clip">
      {/* Fixed gold shimmer field + glows */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        <ShimmerDots opacity={0.45} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(80% 50% at 50% -5%, rgba(232,178,58,0.12), transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,13,0.2), rgba(8,8,13,0.75))" }} />
      </div>

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] flex items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-32 pb-20 lg:pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
              <div>
                <p className="v2-eyebrow mb-8">A shift in the gold industry</p>
                <h1 className="v2-display" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                  It&rsquo;s not gold.
                  <br />
                  It&rsquo;s not <span className="v2-gold">bitcoin.</span>
                </h1>
                <p className="mt-8 max-w-[48ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  There is a change underway in how the world&rsquo;s oldest asset works — and most people have never heard of it. This book is the first <span style={{ color: "#F4F4F7" }}>plain-English account</span> of the whole thing.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <BuyButton checkoutUrl={bookCheckout} label="Get the book — $37" event="v2_buy_click_hero" className="v2-btn" />
                  <span className="text-sm" style={{ color: "var(--v2-faint)" }}>
                    Digital book · delivered instantly · 60-day money-back guarantee
                  </span>
                </div>
                <p className="mt-3 text-xs" style={{ color: "var(--v2-faint)" }}>
                  Educational — not financial advice.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <Book3D />
              </div>
            </div>
          </div>
        </section>

        {/* ── $22T STAT ────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="00">The stakes</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <h2 className="v2-display" style={{ fontSize: "clamp(2.2rem, 5vw, 4.25rem)", maxWidth: "15ch" }}>
              Gold mining <span className="v2-gold" style={{ fontStyle: "italic", fontWeight: 300 }}>already</span> runs on verification, not extraction.
            </h2>
            <div className="lg:pt-3">
              <p className="text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                <span style={{ color: "#F4F4F7", fontWeight: 600 }}>No billion-dollar gold investment happens without geological verification first.</span> Every deposit that ever made it into the system started with a geologist proving the gold exists. Verification is the backbone — extraction is the part everyone assumed was non-negotiable.
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
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
            <h2 className="v2-display" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)", maxWidth: "18ch" }}>
              Why this is worth understanding <span className="v2-gold">now.</span>
            </h2>
            <div className="lg:pt-2">
              <p className="text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
                Three long-running shifts have lined up at once: central banks are holding gold at multi-decade highs, real-world assets are being represented digitally at institutional scale, and a younger generation wants gold without the environmental cost of mining it. The model is no longer theoretical — the first deposits have been submitted, and the first tokens are set to trade on <span style={{ color: "#F4F4F7" }}>July 8, 2026.</span>
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
                Written by <span style={{ color: "#F4F4F7", fontWeight: 600 }}>Andrew Fletcher</span> — former President of Great Eagle Gold Corp, now NatBridge Resources, which signed the first NatGold supply agreement.
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
              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
                <BuyButton checkoutUrl={bookCheckout} label="Get the book — $37" event="v2_buy_click_book_section" className="v2-btn" />
                <span className="text-sm" style={{ color: "var(--v2-faint)" }}>
                  Digital book · delivered instantly · 60-day money-back guarantee
                </span>
              </div>
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
                In 2020 he walked away from a <span style={{ color: "#F4F4F7", fontWeight: 600 }}>$30 million gold deal in Colombia</span> after standing at the edge of a mercury-contaminated pit where workers, some of them teenagers, handled the material without protection. That day is where this book began.
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
          <p className="mt-6 mx-auto text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "46ch" }}>
            Digital Gold Boom is a one-time $37 purchase — the launch price, before it moves to its regular $97. You get the complete book, delivered digitally the moment you check out.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <BuyButton checkoutUrl={bookCheckout} label="Get the book — $37" event="v2_buy_click_final" className="v2-btn" />
            <span className="text-sm" style={{ color: "var(--v2-faint)" }}>
              Digital book · delivered instantly · 60-day money-back guarantee
            </span>
          </div>
          <p className="mt-6 mx-auto text-xs leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "52ch" }}>
            Secure checkout via LemonSqueezy.
            <br />
            Educational content — not financial advice.
          </p>
        </section>
      </main>
    </div>
  );
}
