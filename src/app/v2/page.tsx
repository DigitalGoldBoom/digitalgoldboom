"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import Book3D from "@/components/Book3D";
import ShimmerDots from "@/components/ShimmerDots";
import NumberCounter from "@/components/NumberCounter";
import BuyButton from "@/components/BuyButton";
import Footer from "@/components/Footer";

const bookCheckout = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;
const primerCheckout = process.env.NEXT_PUBLIC_LS_PRIMER_CHECKOUT_URL;
const updatesCheckout = process.env.NEXT_PUBLIC_LS_NEWSLETTER_CHECKOUT_URL;

const STEPS = [
  { n: "01", t: "Verify", b: "Independent geological proof that the gold is really in the ground." },
  { n: "02", t: "Tokenize", b: "That verified ownership becomes a digital, gold-backed asset on-chain." },
  { n: "03", t: "Trade", b: "Anyone, anywhere, 24/7. No extraction. No ESG cost." },
];

const STATS = [
  { node: <NumberCounter start={400} end={469} prefix="US$" suffix="M+" />, label: "Pre-market reservations" },
  { node: <NumberCounter start={16000} end={17466} suffix="+" />, label: "Global investors" },
  { node: <NumberCounter start={150} end={162} />, label: "Countries" },
  { node: <>Jul 8, 2026</>, label: "Token launch · Kraken" },
];

const SECTIONS = [
  { n: "01", title: "Why Gold No Longer Needs Mining", meta: "Chapters 1–8", body: "Why the old extraction-based gold industry is structurally collapsing — at the exact moment trillions in verified gold sit untouched in the ground." },
  { n: "02", title: "The NatGold Digital Mining Ecosystem", meta: "Chapters 9–16", body: "How it actually works: the team, the patents, the verification standards, the approval pipeline, the token economics." },
  { n: "03", title: "The $1B Case Study: Cahuilla", meta: "Chapters 17–19", body: "The first real deposit through the pipeline — the transaction, the players, the financial and environmental scorecard." },
  { n: "04", title: "The Opportunity, Risks & Future", meta: "Chapters 20–23", body: "An honest risk register, the investment options today, a 10-year forecast, and the parallel to the EV transition." },
];

const OPTIONS = [
  { eyebrow: "The book", name: "Digital Gold Boom", desc: "The complete case, every stat sourced.", price: "$17", note: "one-time", kind: "link" as const, href: "/book", cta: "Get the book" },
  { eyebrow: "Fast start", name: "The Primer", desc: "The whole idea in one sitting.", price: "$99", note: "one-time", kind: "buy" as const, checkout: primerCheckout, cta: "Get the Primer", event: "v2_primer_click" },
  { eyebrow: "Stay ahead", name: "Intelligence Updates", desc: "Periodic updates as the space evolves.", price: "$199", note: "per year", kind: "buy" as const, checkout: updatesCheckout, cta: "Subscribe", event: "v2_updates_click" },
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>, source: string) {
    e.preventDefault();
    setStatus("submitting");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) { setStatus("error"); setMsg(data.message ?? "Something went wrong."); return; }
      track("v2_email_submit");
      setStatus("success"); setMsg("You're on the list."); setEmail("");
    } catch { setStatus("error"); setMsg("Network error. Try again."); }
  }

  const locked = status === "submitting" || status === "success";

  const EmailForm = ({ source }: { source: string }) => (
    <form onSubmit={(e) => submit(e, source)} noValidate className="mt-9 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row">
      <label htmlFor={`em-${source}`} className="sr-only">Email</label>
      <input id={`em-${source}`} type="email" required autoComplete="email" inputMode="email"
        value={email} onChange={(e) => setEmail(e.target.value)} disabled={locked}
        placeholder="you@email.com" className="v2-input flex-1" />
      <button type="submit" disabled={locked} className="v2-btn shrink-0 whitespace-nowrap" style={{ opacity: locked ? 0.7 : 1 }}>
        {status === "submitting" ? "Adding you…" : status === "success" ? "You're in ✓" : "Join the launch list"}
      </button>
    </form>
  );

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
                <p className="v2-eyebrow mb-8">Decoding the biggest gold rush in history</p>
                <h1 className="v2-display" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                  Missed Bitcoin?
                  <br />
                  Don&rsquo;t miss <span className="v2-gold">digital gold mining.</span>
                </h1>
                <p className="mt-8 max-w-[46ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  Tokenization just triggered the oldest store of value&rsquo;s first real upgrade in 5,000 years — digital, eco-friendly, global. This is the plain-English guide, before a token has been minted.
                </p>
                <EmailForm source="v2-hero" />
                <p className="mt-3 text-xs" style={{ color: "var(--v2-faint)" }} role="status" aria-live="polite">
                  {status === "success" ? <span className="v2-gold">{msg}</span>
                    : status === "error" ? <span style={{ color: "#ff7a7a" }}>{msg}</span>
                    : "Free to join. No spam. Unsubscribe anytime."}
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
                Geologically verified gold, sitting in the ground.
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "46ch" }}>
                Enough to reset the financial order — locked behind an extraction model the world is walking away from. Traditional gold mining is dying.
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

        {/* ── TOKEN LAUNCH (bento stats) ───────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="03">You&rsquo;re early</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
            <h2 className="v2-display" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)", maxWidth: "18ch" }}>
              The official digital gold mining token launches <span className="v2-gold">July 8, 2026 on Kraken.</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="v2-tile p-6 md:p-7 flex flex-col justify-end" style={{ minHeight: 150 }}>
                  <span className="block h-px w-9 mb-5" style={{ background: "var(--v2-gold)" }} />
                  <div className="font-mono" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", color: "#F4F4F7", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                    {s.node}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: "var(--v2-faint)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-sm" style={{ color: "var(--v2-faint)" }}>
            Pre-market reservations closed 5.3&times; oversubscribed. Figures are reserved, not raised.
          </p>
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
            </div>
          </div>
        </section>

        {/* ── PRICING (separate options) ───────────────────────── */}
        <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32">
          <SectionLabel n="05">Get started</SectionLabel>
          <h2 className="v2-display mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", maxWidth: "16ch" }}>
            Pick what you <span className="v2-gold">need.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OPTIONS.map((o) => (
              <div key={o.name} className="v2-tile p-8 flex flex-col">
                <div className="v2-num v2-gold mb-6" style={{ color: "var(--v2-gold)" }}>{o.eyebrow}</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 500, color: "#F4F4F7" }}>{o.name}</h3>
                <p className="mt-3" style={{ color: "var(--v2-dim)", fontSize: "0.9375rem", lineHeight: 1.6 }}>{o.desc}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-mono" style={{ fontSize: "2rem", fontWeight: 300, color: "#F4F4F7", fontVariantNumeric: "tabular-nums" }}>{o.price}</span>
                  <span style={{ color: "var(--v2-faint)", fontSize: "0.8125rem" }}>{o.note}</span>
                </div>
                <div className="mt-7 mt-auto pt-2">
                  {o.kind === "link" ? (
                    <Link href={o.href} className="v2-btn w-full">{o.cta} →</Link>
                  ) : (
                    <BuyButton checkoutUrl={o.checkout} label={o.cta} unavailableLabel="Coming soon" event={o.event} className="v2-btn w-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-28 md:py-36 text-center">
          <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", maxWidth: "16ch" }}>
            Understand it before <span className="v2-gold">Wall Street</span> does.
          </h2>
          <p className="mt-6 mx-auto text-lg" style={{ color: "var(--v2-dim)", maxWidth: "42ch" }}>
            Gold only gets digitized once. That&rsquo;s the thing to be early to.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-[520px]"><EmailForm source="v2-final" /></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
