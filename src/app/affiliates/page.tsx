import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import VaultShell from "@/components/VaultShell";
import AffiliateInterestForm from "@/components/AffiliateInterestForm";
import { generateMetadata as genMeta, generateFAQSchema } from "@/lib/seo";

/* /affiliates — CASH-ONLY rework (per SALES-DESIGN-affiliates-mining.md, 2026-07-01).
   Paid affiliate program on LemonSqueezy's native affiliate feature: earn a cash commission on
   every sale you refer. NO NATG token, no wallet, no tiers, no view-targets. Ported to the v2
   register. The real LemonSqueezy affiliate signup link is set in NEXT_PUBLIC_LS_AFFILIATE_URL once
   the program is enabled in the store; until then the CTA renders a safe disabled state and the
   one-field email fallback captures promoters who want to be walked through it. */

const affiliateUrl = process.env.NEXT_PUBLIC_LS_AFFILIATE_URL;

export const metadata: Metadata = genMeta({
  title: "Affiliate Program — Earn a Commission on Every Sale",
  description:
    "Promote Digital Gold Boom and earn a cash commission on every copy your link sells. Sign up as a LemonSqueezy affiliate, get your own link, tracked automatically, paid by wire. Free to join.",
  path: "/affiliates",
  keywords: ["Digital Gold Boom affiliate", "book affiliate program", "refer and earn", "cash commission affiliate"],
});

// Primary CTA → LemonSqueezy affiliate signup. Real link when the program is enabled; safe disabled
// state until then (never ship a dead [WIRE] link).
function AffiliateCTA({ children = "Become an affiliate", className = "v2-btn" }: { children?: React.ReactNode; className?: string }) {
  if (!affiliateUrl) {
    return (
      <button type="button" disabled aria-disabled className={className} title="Opens when the program is enabled">
        Affiliate sign-up opens at launch
      </button>
    );
  }
  return (
    <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children} &rarr;
    </a>
  );
}

const facts = [
  { h: "Your rate", p: "A flat commission on every sale your link makes — the same on the first and the thousandth. The exact rate is set in LemonSqueezy and shown to you at signup." },
  { h: "Tracked for you", p: "Every click and sale through your unique link is counted automatically in your own LemonSqueezy dashboard. Nothing to manage." },
  { h: "Paid by wire", p: "Your balance is paid out on LemonSqueezy's regular schedule, after its standard holding period, direct to your account." },
];

const steps = [
  { n: "01", h: "Sign up as an affiliate", p: "Create your free affiliate account with LemonSqueezy. Takes a couple of minutes." },
  { n: "02", h: "Get your link", p: "LemonSqueezy gives you a unique link and your own dashboard to track clicks and sales." },
  { n: "03", h: "Share it where your people are", p: "Post your link anywhere you reach an audience — social, newsletter, video, bio." },
  { n: "04", h: "Get paid", p: "Every sale through your link earns you a commission, paid out by wire from LemonSqueezy." },
];

const toolkit = [
  { h: "Mining B-roll clips", p: "Short, on-brand footage you can post as-is." },
  { h: "Images & thumbnails", p: "Ready-sized visuals for every platform." },
  { h: "Captions & hashtags", p: "Copy-and-paste hooks that travel." },
  { h: "Post templates", p: "Proven shapes for a share that actually gets views." },
];

const faqs = [
  { question: "How much do I earn?", answer: "You earn a commission on every copy sold through your link. The exact rate is set in LemonSqueezy and shown to you when you sign up." },
  { question: "How are sales tracked?", answer: "LemonSqueezy tracks every click and sale tied to your unique link, in your own dashboard. You don't have to manage anything." },
  { question: "How and when do I get paid?", answer: "LemonSqueezy pays your commission balance by wire on its regular payout schedule, after its standard holding period. You'll see the exact cadence when you sign up." },
  { question: "Do I need to own crypto?", answer: "No. This is a straightforward cash commission for selling a book. No crypto, no wallet, nothing token-related." },
  { question: "What does it cost me?", answer: "Nothing. Signing up as a LemonSqueezy affiliate is free." },
  { question: "What counts as a valid sale?", answer: "A real purchase made through your link. LemonSqueezy handles the attribution and the standard rules; you'll see them when you sign up." },
];

export default function AffiliatesPage() {
  return (
    <VaultShell>
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <p className="v2-eyebrow mb-7 justify-center">Share the book, earn a commission</p>
          <h1 className="v2-display mx-auto" style={{ fontSize: "clamp(2.4rem, 6vw, 4.25rem)", maxWidth: "18ch" }}>
            Promote the book. <span className="v2-gold">Earn cash</span> on every sale you refer.
          </h1>
          <p className="mx-auto mt-8 max-w-[58ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            Sign up as a LemonSqueezy affiliate, get your own link, and earn a commission on every copy of Digital Gold Boom it sells. Tracked automatically. Paid by wire, straight from LemonSqueezy.
          </p>
          <div className="mt-10 flex justify-center">
            <AffiliateCTA />
          </div>
          <p className="mx-auto mt-6 max-w-[64ch] text-xs leading-relaxed" style={{ color: "var(--v2-faint)" }}>
            This is a paid affiliate program: when someone buys the book through your link, you earn a commission on that sale. Tracking and payouts are handled by LemonSqueezy. See our{" "}
            <a href="/disclaimer" className="v2-gold">Disclaimer</a> and <a href="/terms" className="v2-gold">Terms</a>.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

      {/* ── THE COMMISSION ───────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-20 md:py-28">
        <h2 className="v2-display text-center mx-auto" style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)", maxWidth: "18ch" }}>
          One link. One rate. <span className="v2-gold">Paid on every sale.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[60ch] text-center text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          You earn a commission on every copy of the book your link sells — the same rate on the first sale and the thousandth. There are no tiers to chase and no targets to hit.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {facts.map((f) => (
            <div key={f.h} className="v2-tile h-full p-8">
              <h3 className="v2-gold" style={{ fontSize: "1.15rem", fontWeight: 500, marginBottom: 12 }}>{f.h}</h3>
              <p style={{ color: "var(--v2-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>{f.p}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm" style={{ color: "var(--v2-faint)" }}>
          The exact commission rate and payout details are set in LemonSqueezy and shown to you when you sign up.
        </p>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-20 md:py-28">
        <h2 className="v2-display mb-12" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}>How it works.</h2>
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

      {/* ── AFFILIATE TOOLKIT (gated) ────────────────────────── */}
      <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-20 md:py-28 text-center">
        <p className="v2-eyebrow mb-6 justify-center">Affiliate toolkit</p>
        <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", maxWidth: "20ch" }}>
          We give you everything to <span className="v2-gold">post with.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          The hardest part of sharing is making something good. Sign up and get a kit of ready-made mining footage, images, captions, and post templates, so your posts do the work for you.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
          {toolkit.map((t) => (
            <div key={t.h} className="v2-tile p-6">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[12px]" style={{ background: "rgba(255,255,255,0.04)", color: "var(--v2-faint)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 500, color: "#F4F4F7" }}>{t.h}</h3>
              <p className="mt-2" style={{ color: "var(--v2-faint)", fontSize: "0.8rem", lineHeight: 1.55 }}>{t.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><AffiliateCTA /></div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[760px] px-6 py-20 md:py-28">
        <h2 className="v2-display mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>Questions.</h2>
        <dl className="divide-y" style={{ borderColor: "var(--v2-line)" }}>
          {faqs.map((f) => (
            <div key={f.question} className="py-5" style={{ borderColor: "var(--v2-line)" }}>
              <dt className="font-semibold" style={{ color: "#F4F4F7" }}>{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── SIGNUP ───────────────────────────────────────────── */}
      <section id="join" className="scroll-mt-24 mx-auto w-full max-w-[560px] px-6 py-20 md:py-28 text-center">
        <div className="rounded-[24px] p-8 md:p-10" style={{ border: "1px solid rgba(232,178,58,0.4)", background: "linear-gradient(180deg, rgba(232,178,58,0.07), rgba(232,178,58,0.02))" }}>
          <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)", maxWidth: "16ch" }}>
            Get your link and start earning.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            Sign up as a LemonSqueezy affiliate, grab your unique link, and earn a commission on every copy you sell. Free to join, tracked automatically, paid by wire.
          </p>
          <div className="mt-8 flex justify-center"><AffiliateCTA className="v2-btn w-full sm:w-auto" /></div>

          <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1" style={{ background: "var(--v2-line)" }} />
            <span className="font-mono text-xs" style={{ color: "var(--v2-faint)" }}>or</span>
            <span className="h-px flex-1" style={{ background: "var(--v2-line)" }} />
          </div>

          <p className="mb-4 text-sm" style={{ color: "var(--v2-dim)" }}>
            Prefer we walk you through it? Leave your email and we&apos;ll send the steps.
          </p>
          <AffiliateInterestForm />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[700px] px-6 py-24 text-center">
        <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "18ch" }}>
          Help people find the book. <span className="v2-gold">Earn for every copy you sell.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[50ch] text-lg" style={{ color: "var(--v2-dim)" }}>
          If your audience would want Digital Gold Boom, your link turns that into a commission on every sale.
        </p>
        <div className="mt-9 flex justify-center"><AffiliateCTA /></div>
      </section>
    </VaultShell>
  );
}
