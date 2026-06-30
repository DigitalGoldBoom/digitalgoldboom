import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import VaultShell from "@/components/VaultShell";
import AffiliateInterestForm from "@/components/AffiliateInterestForm";
import { generateMetadata as genMeta, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Share & Earn — Digital Gold Boom Affiliate Program",
  description:
    "Earn from sharing Digital Gold Boom: 50% commission on every sale you refer, plus your purchase back in NATG when your post takes off. Three ways to earn — join the early list.",
  path: "/affiliates",
  keywords: [
    "Digital Gold Boom affiliate",
    "share to earn book",
    "book affiliate program",
    "NatGold affiliate",
    "earn NATG",
    "refer and earn",
  ],
});

// Three earn-routes (locked by dgb-cmo 2026-06-30). NATG tiers are NOT live yet — they launch with
// the token (~Jul 2026); the `status` tag makes that explicit. No fabricated numbers anywhere.
const ways = [
  {
    title: "Earn 50% on every sale",
    reward: "50% commission, in cash",
    trigger: "Someone buys through your personal link",
    line: "Sign up, get your own link, share it anywhere. Every sale it brings you pays you half the price — in cash, through LemonSqueezy.",
    status: "Opens at launch",
    live: false,
  },
  {
    title: "Share it, get half back",
    reward: "50% of your purchase back, in NATG",
    trigger: "Your post about the book reaches 2,000 views",
    line: "Post about the book on social. If it passes 2,000 views, we send you half of what you paid — in NATG, the project's token.",
    status: "Launching with the token",
    live: false,
  },
  {
    title: "Go big, get it all back",
    reward: "100% of your purchase back, in NATG",
    trigger: "Your post reaches 10,000 views",
    line: "If your post passes 10,000 views, your whole purchase comes back to you in NATG. You read the book free for helping people find it.",
    status: "Launching with the token",
    live: false,
  },
];

const steps = [
  { n: "1", h: "Join the early list", p: "Leave your details below so you're first in when the program opens." },
  { n: "2", h: "At launch, pick your path", p: "Grab your affiliate link, share a post, or do both." },
  { n: "3", h: "Share it where your people are", p: "Your own link, or a post about the book." },
  { n: "4", h: "Get rewarded", p: "Cash for the sales you refer, NATG when your post takes off." },
];

// Locked toolkit — no fabricated counts. The real B-roll comes later from dgb-cinematographer; the
// files will be served from Vercel Blob. This is the locked-state UI that sells the perk.
const toolkit = [
  { h: "Mining B-roll clips", p: "Short, on-brand footage you can post as-is." },
  { h: "Images & thumbnails", p: "Ready-sized visuals for every platform." },
  { h: "Captions & hashtags", p: "Copy-and-paste hooks that travel." },
  { h: "Post templates", p: "Proven shapes for a share that actually gets views." },
];

const faqs = [
  {
    question: "When does this start?",
    answer:
      "The program opens when the book goes on sale and the NATG token launches (targeted for July 2026). Join the list now and you'll be first to know.",
  },
  {
    question: "When do the token rewards — 50% and 100% back — begin?",
    answer:
      "When NATG launches. Until the token is live we can't pay in it, so those two tiers are marked “launching with the token.” The list holds your spot.",
  },
  {
    question: "How do you check a post really hit 2,000 or 10,000 views?",
    answer:
      "We're finalizing how we verify views before launch — built to be fair and hard to fake. Everyone on the list gets the full rules before the program opens.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Cash affiliate commissions are paid through LemonSqueezy on its regular payout schedule. Token rewards are sent in NATG after your post is verified. Exact timing comes with the launch rules.",
  },
  {
    question: "Do I need to own crypto, or understand it?",
    answer:
      "No. For the cash side, you just need a way to receive a payout (PayPal or bank). For the NATG rewards you'll need a wallet to receive the token — we'll walk you through it, step by step, in plain language.",
  },
  {
    question: "What counts as a valid share?",
    answer:
      "A real post about the book on your own social account, with real views from real people. The full do's and don'ts come with the launch rules.",
  },
  {
    question: "Can I do more than one?",
    answer:
      "Yes. Refer sales with your link and share posts for the token rewards. They stack.",
  },
];

function StatusChip({ label, live }: { label: string; live: boolean }) {
  // "Opens at launch" = neutral gold outline. "Launching with the token" = clearly not-live (muted,
  // with a dot) so a visitor never thinks the NATG tiers are payable today.
  return (
    <span
      className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em]"
      style={{
        borderColor: live ? "var(--border-gold)" : "var(--border-base)",
        color: live ? "var(--accent-gold)" : "var(--text-tertiary)",
        background: live ? "var(--accent-gold-wash)" : "transparent",
      }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--accent-gold)", opacity: live ? 1 : 0.5 }}
      />
      {label}
    </span>
  );
}

export default function AffiliatesPage() {
  return (
    <VaultShell>
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24" style={{ background: "var(--bg-contrast-deep)" }}>
        <div className="mx-auto max-w-[860px] px-6 text-center">
          <p className="eyebrow mb-5">Share the boom</p>
          <h1
            className="font-extrabold tracking-[-0.03em] leading-[1.1]"
            style={{ color: "var(--text-primary)", fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}
          >
            Share the book. <span className="text-gold">Get rewarded</span> for it.
          </h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Three ways to earn from spreading Digital Gold Boom — from a 50% cut on every sale you
            refer, to your whole purchase back in NATG when your post takes off.
          </p>
          <div className="mt-9 flex justify-center">
            <a href="#join" className="btn-primary">
              Join the early list →
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-[60ch] text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Affiliate disclosure: this is a paid affiliate / share-to-earn program — people who share
            the book can earn a commission or reward when it leads to a sale or meets the rules. See
            our{" "}
            <a href="/disclaimer" style={{ color: "var(--accent-gold)" }}>
              Disclaimer
            </a>{" "}
            and{" "}
            <a href="/terms" style={{ color: "var(--accent-gold)" }}>
              Terms
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── WAYS TO EARN ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-canvas)" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Three ways to earn
          </h2>
          <p className="mx-auto mt-3 max-w-[60ch] text-center" style={{ color: "var(--text-secondary)" }}>
            Refer sales for cash, or share a post and earn your purchase back in the token. You can do
            both.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="card flex flex-col">
                <StatusChip label={w.status} live={w.live} />
                <h3 className="mt-5 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  {w.title}
                </h3>
                <p className="mt-2 text-xl font-extrabold" style={{ color: "var(--accent-gold)" }}>
                  {w.reward}
                </p>
                <p className="mt-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {w.trigger}
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {w.line}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
            The two NATG reward tiers begin when the token launches. The cash affiliate link opens
            when the book goes on sale.
          </p>
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

      {/* ── AFFILIATE TOOLKIT (gated) ────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-contrast)" }}>
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <p className="eyebrow mb-4">Affiliate toolkit</p>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            We give you everything to post with
          </h2>
          <p className="mx-auto mt-3 max-w-[60ch]" style={{ color: "var(--text-secondary)" }}>
            The hardest part of sharing is making something good. Join and unlock a kit of ready-made
            mining footage and captions — so your posts have the best shot at the view targets.
          </p>

          <div className="relative mt-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
              {toolkit.map((t) => (
                <div
                  key={t.h}
                  className="rounded-[var(--r-xl)] border p-6 text-left"
                  style={{ borderColor: "var(--border-base)", background: "var(--bg-surface)" }}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-[var(--r-md)]"
                    style={{ background: "var(--bg-contrast-deep)", color: "var(--text-tertiary)" }}
                  >
                    {/* lock glyph */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t.h}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                    {t.p}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a href="#join" className="btn-primary">
              Join to unlock the toolkit →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-canvas)" }}>
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Questions
          </h2>
          <dl className="mt-8 divide-y" style={{ borderColor: "var(--border-base)" }}>
            {faqs.map((f) => (
              <div key={f.question} className="py-5" style={{ borderColor: "var(--border-base)" }}>
                <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {f.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CAPTURE ──────────────────────────────────────────────────────── */}
      <section id="join" className="scroll-mt-24 py-16 md:py-24" style={{ background: "var(--bg-contrast-deep)" }}>
        <div className="mx-auto max-w-[520px] px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Be first in when it opens
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch]" style={{ color: "var(--text-secondary)" }}>
            The program opens at launch. Leave your details and you&apos;ll get the full rules — and
            your spot — before anyone else. No spam.
          </p>
          <div className="mt-8">
            <AffiliateInterestForm />
          </div>
          <p className="mx-auto mt-5 max-w-[44ch] text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            By joining you agree to our{" "}
            <a href="/terms" style={{ color: "var(--accent-gold)" }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" style={{ color: "var(--accent-gold)" }}>
              Privacy Policy
            </a>
            . We email you about the program; unsubscribe any time.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: "var(--bg-contrast)" }}>
        <div className="mx-auto max-w-[640px] px-6">
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Help people see the next gold rush coming.
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            You found Digital Gold Boom early. Get rewarded for making sure others don&apos;t miss it.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="#join" className="btn-primary">
              Join the early list →
            </a>
          </div>
        </div>
      </section>

    </VaultShell>
  );
}
