import type { Metadata } from "next";
import VaultShell from "@/components/VaultShell";
import IndustryReviewForm from "@/components/IndustryReviewForm";
import { generateMetadata as genMeta } from "@/lib/seo";

/* /mining-industry — recruit industry reviewers. Ported to the v2 register per
   SALES-DESIGN-affiliates-mining.md, kept deliberately SOBER (the most skeptical audience on the
   site — restraint is the conversion strategy; no hype, no price/token talk). Added the
   "What you'll be reading" reassurance beat + a trust line above the capture. Hero stays type-only:
   no verified documentary fieldwork image exists, and the spec says an inaccurate/cliché image
   would lose this audience, so a strong type hero is the right call until a real asset lands. */

export const metadata: Metadata = genMeta({
  title: "For the Mining Industry — Digital Gold Boom",
  description:
    "Work in gold or mining? Connect with the people building digital gold mining. Understand the model for valuing and tokenizing in-ground verified gold, and help move a new industry forward.",
  path: "/mining-industry",
  keywords: ["digital gold mining", "gold mining industry", "tokenization of gold", "in-ground gold reserves", "NatGold", "join digital gold mining"],
});

const why = [
  { h: "You see what outsiders miss", p: "Reserves, grades, AISC, permitting, the realities of getting gold out of the ground — you live it. The people building this need that lens at the table." },
  { h: "It's your industry's next chapter", p: "Digital gold mining is about valuing and representing in-ground, independently-verified gold. Whoever knows gold best should be part of shaping it." },
  { h: "Get in at the start", p: "This is a new industry in its first chapter. Connecting now means understanding it — and helping steer it — before the wider market catches on." },
];

const steps = [
  { n: "01", h: "Introduce yourself", p: "Tell us who you are and your angle in the industry." },
  { n: "02", h: "Get the full book", p: "We send you the complete book, so you can understand the model in depth." },
  { n: "03", h: "Connect", p: "Share your read, your questions, and your expertise directly with the people building this." },
  { n: "04", h: "Move it forward", p: "Stay close as digital gold mining takes shape, and contribute where it fits." },
];

const reading = [
  { h: "A complete, finished book", p: "The whole model, start to finish — not a pitch deck." },
  { h: "Sourced, and honest about it", p: "Established figures trace to a primary record you can check; forward-looking forecasts are clearly flagged as forecasts." },
  { h: "Written for professionals", p: "Technical where it must be, readable throughout." },
];

export default function MiningIndustryPage() {
  return (
    <VaultShell>
      {/* ── HERO (type-only, sober) ──────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-[840px] px-6 text-center">
          <p className="v2-eyebrow mb-7 justify-center">For the mining industry</p>
          <h1 className="v2-display mx-auto" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", maxWidth: "18ch" }}>
            You know this ground <span className="v2-gold">better than anyone.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[60ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            Digital gold mining is a new industry taking shape right now — valuing and representing in-ground, verified gold instead of tearing it out. This is an open invitation to the people who know gold best: connect with us, understand the model in full, and help move it forward.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#connect" className="v2-btn">Connect with us &rarr;</a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

      {/* ── WHY YOUR READ MATTERS ────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 md:py-28">
        <h2 className="v2-display mb-12 text-center mx-auto" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}>Why get involved.</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {why.map((w) => (
            <div key={w.h} className="v2-tile h-full p-8">
              <h3 style={{ fontSize: "1.15rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 12 }}>{w.h}</h3>
              <p style={{ color: "var(--v2-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>{w.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 md:py-28">
        <h2 className="v2-display mb-12" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>How it works.</h2>
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="v2-tile h-full p-7">
              <div className="v2-num v2-gold mb-6" style={{ color: "var(--v2-gold)" }}>{s.n}</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 8 }}>{s.h}</h3>
              <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.p}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

      {/* ── AUTHOR ───────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[780px] px-6 py-20 md:py-28">
        <p className="v2-eyebrow mb-5">The author</p>
        <h2 className="v2-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>Andrew Fletcher</h2>
        <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "62ch" }}>
          Andrew Fletcher is the former President of Great Eagle Gold Corp, which became NatBridge Resources, the company that signed the first NatGold supply agreement. He has assessed more than two hundred gold projects across multiple continents. He draws on that first-hand experience and the public record — which is exactly why an industry read of the book is worth having.
        </p>
      </section>

      {/* ── WHAT YOU'LL BE READING (reassurance beat) ────────── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {reading.map((r) => (
            <div key={r.h} className="rounded-[20px] p-6" style={{ border: "1px solid var(--v2-line)" }}>
              <h3 className="v2-gold" style={{ fontSize: "1rem", fontWeight: 500, marginBottom: 8 }}>{r.h}</h3>
              <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{r.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAPTURE ──────────────────────────────────────────── */}
      <section id="connect" className="scroll-mt-24 mx-auto w-full max-w-[560px] px-6 py-20 md:py-28 text-center">
        <div className="rounded-[24px] p-8 md:p-10" style={{ border: "1px solid rgba(232,178,58,0.3)", background: "rgba(255,255,255,0.018)" }}>
          <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", maxWidth: "18ch" }}>Connect with the people building this.</h2>
          <p className="mx-auto mt-4 max-w-[50ch] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            Put your name down. We&apos;ll send you the full book and a direct line to the team moving digital gold mining forward.
          </p>
          <div className="mt-8 text-left">
            <IndustryReviewForm />
          </div>
          <p className="mx-auto mt-5 max-w-[44ch] text-xs leading-relaxed" style={{ color: "var(--v2-faint)" }}>
            We email you about the book and your review only. See our <a href="/privacy" className="v2-gold">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </VaultShell>
  );
}
