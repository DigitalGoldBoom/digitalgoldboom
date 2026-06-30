import type { Metadata } from "next";
import Footer from "@/components/Footer";
import VaultShell from "@/components/VaultShell";
import IndustryReviewForm from "@/components/IndustryReviewForm";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "For the Mining Industry — Review Digital Gold Boom",
  description:
    "Work in gold or mining? Read Digital Gold Boom and give your expert feedback. Become an early reviewer of the plain-English guide to digital gold mining and the tokenization of in-ground verified gold.",
  path: "/mining-industry",
  keywords: [
    "gold mining industry book",
    "mining industry feedback",
    "digital gold mining review",
    "tokenization of gold",
    "in-ground gold reserves",
  ],
});

const why = [
  {
    h: "You see what outsiders miss",
    p: "Reserves, grades, AISC, permitting, the realities of getting gold out of the ground — you live it. That's exactly the lens this book needs tested against.",
  },
  {
    h: "It's about your industry's next chapter",
    p: "Digital gold mining is about valuing and tokenizing in-ground, independently-verified gold. Whatever you make of it, your read sharpens the argument.",
  },
  {
    h: "Honest beats flattering",
    p: "Tell us where it's right, where it's wrong, and what's missing. Hard feedback is the useful kind, and it's what we're asking for.",
  },
];

const steps = [
  { n: "1", h: "Put your name down", p: "Tell us who you are and your angle in the industry." },
  { n: "2", h: "We send you the book", p: "You get a copy to read on your own time." },
  { n: "3", h: "Give your honest read", p: "Share what holds up, what doesn't, and what's missing." },
  { n: "4", h: "Help shape it", p: "Your feedback informs the book. Reviewers who want credit can have it." },
];

export default function MiningIndustryPage() {
  return (
    <VaultShell>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24" style={{ background: "var(--bg-contrast-deep)" }}>
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <p className="eyebrow mb-5">For the mining industry</p>
          <h1
            className="font-extrabold tracking-[-0.03em] leading-[1.1]"
            style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
          >
            You know this ground <span className="text-gold">better than anyone.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Digital Gold Boom makes the case for digital gold mining — valuing and tokenizing
            in-ground, verified gold. Before it reaches a wider audience, we want it read by the people
            who actually work the industry. Read it, and tell us where we&apos;re right, where
            we&apos;re wrong, and what&apos;s missing.
          </p>
          <div className="mt-9 flex justify-center">
            <a href="#review" className="btn-primary">
              Become an early reviewer →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY YOUR READ MATTERS ────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-canvas)" }}>
        <div className="mx-auto max-w-[1000px] px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Why your read matters
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.h} className="card">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  {w.h}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {w.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-[1000px] px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            How it works
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n}>
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--r-pill)] font-mono text-sm font-semibold"
                  style={{ background: "var(--accent-gold-wash)", color: "var(--accent-gold)", border: "1px solid var(--border-gold)" }}
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-semibold" style={{ color: "var(--text-primary)" }}>
                  {s.h}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {s.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHOR ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-contrast)" }}>
        <div className="mx-auto max-w-[760px] px-6">
          <p className="eyebrow mb-4">The author</p>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Andrew Fletcher
          </h2>
          <p className="mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Andrew Fletcher is the former president of Great Eagle Gold Corp, which became NatBridge
            Resources — the company that signed the first NatGold supply agreement. He writes from
            inside the industry he&apos;s describing, which is exactly why an industry read of the book
            is worth having.
          </p>
        </div>
      </section>

      {/* ── CAPTURE ──────────────────────────────────────────────────────── */}
      <section id="review" className="scroll-mt-24 py-16 md:py-24" style={{ background: "var(--bg-contrast-deep)" }}>
        <div className="mx-auto max-w-[520px] px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Become an early reviewer
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch]" style={{ color: "var(--text-secondary)" }}>
            Put your name down and we&apos;ll send you the book and a simple way to give your feedback.
          </p>
          <div className="mt-8">
            <IndustryReviewForm />
          </div>
          <p className="mx-auto mt-5 max-w-[44ch] text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            We email you about the book and your review only. See our{" "}
            <a href="/privacy" style={{ color: "var(--accent-gold)" }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </VaultShell>
  );
}
