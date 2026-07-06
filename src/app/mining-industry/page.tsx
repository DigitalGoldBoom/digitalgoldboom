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
  title: "For the Mining Industry — Review Digital Gold Boom",
  description:
    "Work in gold or mining? Read Digital Gold Boom and give your expert feedback. Become an early reviewer of the plain-English account of digital gold mining and the tokenization of in-ground verified gold.",
  path: "/mining-industry",
  keywords: ["gold mining industry book", "mining industry feedback", "digital gold mining review", "tokenization of gold", "in-ground gold reserves"],
});

const why = [
  { h: "You see what outsiders miss", p: "Reserves, grades, AISC, permitting, the realities of getting gold out of the ground — you live it. That's exactly the lens this book needs tested against." },
  { h: "It's about your industry's next chapter", p: "Digital gold mining is about valuing and representing in-ground, independently-verified gold. Whatever you make of it, your read sharpens the argument." },
  { h: "Honest beats flattering", p: "Tell us where it's right, where it's wrong, and what's missing. Hard feedback is the useful kind, and it's what we're asking for." },
];

const steps = [
  { n: "01", h: "Put your name down", p: "Tell us who you are and your angle in the industry." },
  { n: "02", h: "We send you the book", p: "You get a full copy to read on your own time, free." },
  { n: "03", h: "Give your honest read", p: "Share what holds up, what doesn't, and what's missing." },
  { n: "04", h: "Help shape it", p: "Your feedback informs the book. Reviewers who want credit can have it." },
];

const reading = [
  { h: "Two sections, seventeen chapters", p: "A complete, finished book, not a pitch deck." },
  { h: "Every statistic sourced", p: "Each figure traces to a primary record you can check." },
  { h: "Written in plain English", p: "Technical where it must be, readable throughout." },
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
            Digital Gold Boom makes the case for digital gold mining: valuing and representing in-ground, verified gold. Before it reaches a wider audience, we want it read by the people who actually work the industry. Read it, and tell us where we&apos;re right, where we&apos;re wrong, and what&apos;s missing.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#review" className="v2-btn">Become an early reviewer &rarr;</a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

      {/* ── WHY YOUR READ MATTERS ────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 md:py-28">
        <h2 className="v2-display mb-12 text-center mx-auto" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}>Why your read matters.</h2>
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
      <section id="review" className="scroll-mt-24 mx-auto w-full max-w-[560px] px-6 py-20 md:py-28 text-center">
        <div className="rounded-[24px] p-8 md:p-10" style={{ border: "1px solid rgba(232,178,58,0.3)", background: "rgba(255,255,255,0.018)" }}>
          <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", maxWidth: "16ch" }}>Become an early reviewer.</h2>
          <p className="mx-auto mt-4 max-w-[50ch] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            We&apos;re asking for your honest read, including where it&apos;s wrong. Put your name down and we&apos;ll send you the book and a simple way to give your feedback.
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
