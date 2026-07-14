import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import VaultShell from "@/components/VaultShell";
import AffiliateInterestForm from "@/components/AffiliateInterestForm";
import { generateMetadata as genMeta, generateFAQSchema } from "@/lib/seo";

/* /partners — CASH-ONLY rework (per SALES-DESIGN-affiliates-mining.md, 2026-07-01).
   Lives at /partners because that is the URL PRINTED IN THE BOOK ("An Invitation to Influencers,
   Advocates & Believers" → "Start at digitalgoldboom.com/partners"). Ink cannot be edited, so the
   canonical page answers the printed address directly rather than bouncing the reader through a
   redirect to a word the book never used. /affiliates redirects here.

   PRE-LAUNCH. The program is not open: nobody can join, get a link, or earn today. Every CTA on the
   page therefore points at ONE action — put your name down — and nothing on it may imply otherwise.
   Cash commission on book sales; NO NATG token, no wallet, no tiers, no view-targets.

   The payment/affiliate tooling is never NAMED on this page. A reader who has just closed the book
   on "I would rather grow this with the people who believe in it than pay strangers to shout about
   it" does not care which company processes the payout, and naming it turns the warm end of a book
   into an admin form. The vendor is an implementation detail; it can change without a word of this
   page changing, which is the point. */

export const metadata: Metadata = genMeta({
  title: "Partner With Us — Help Carry Digital Gold Boom",
  description:
    "Ideas like this don't spread on their own. Put your name down to help carry Digital Gold Boom, and keep 50% of every copy your link sells. Pre-launch: partners are approved before their link goes live.",
  path: "/partners",
  keywords: ["Digital Gold Boom affiliate", "book affiliate program", "refer and earn", "cash commission affiliate"],
});

// One action on the whole page: put your name down. Every CTA is the same anchor to the same form,
// because there is exactly one thing a visitor can do today.
function AffiliateCTA({ children = "Put your name down", className = "v2-btn" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a href="#join" className={className}>
      {children} &rarr;
    </a>
  );
}

const facts = [
  { h: "50% per sale", p: "You keep half of every copy your link sells — US$18.50 on each $37 sale, the same on the first and the thousandth." },
  { h: "Tracked for you", p: "Every click and every sale your link makes is counted automatically. Nothing for you to manage." },
  { h: "No tiers, no targets", p: "One flat rate for everyone. No thresholds to hit, no ladder to climb, no minimum before you earn." },
];

// The pre-launch path, honestly told. Vetting is stated up front rather than buried: it is the
// reason the program is worth being in, and a partner who would not pass should find that out on
// this page, not after they have built a post around it.
const steps = [
  { n: "01", h: "Put your name down", p: "Tell us who you are and where your people are. It takes a minute." },
  { n: "02", h: "We get to know you", p: "Every partner is approved before their link goes live. This is a small program on purpose." },
  { n: "03", h: "You get the kit", p: "Footage, images and copy you can post as they are — so making something good is the easy part." },
  { n: "04", h: "The doors open", p: "Your link goes live, every sale it makes is tracked, and half of it is yours." },
];

const toolkit = [
  { h: "Gold & mining B-roll", p: "Cinematic, on-brand footage — post it as-is or cut it into your own." },
  { h: "Images & thumbnails", p: "Ready-sized visuals for every platform." },
];

// Sample B-roll shown on the page to break it up and prove the footage is real and
// good — these are real gold/deposit clips already in the site. Muted autoplay loops.
const brollExamples = [
  { src: "/film/ignition-loop.mp4", label: "Molten gold" },
  { src: "/deposit/deposit-turntable.webm", label: "Verified deposit" },
  { src: "/deposit/spin.mp4", label: "Gold in the round" },
];

// ── "What you're promoting" section data — every figure verified against the book
// (Read This First, Ch 8–9, 11, 16) and the site stats registry. Doctrine locks:
// "reserved" never "raised"; "patent applications" never "patents"; the new industry
// is the hero, not the token. Do not hard-code price-driven figures beyond the book's
// stated snapshots — these are the book's own reference numbers, not live values.
const marketStats = [
  { v: "$35B", l: "Tokenized real-world-asset market, early 2026" },
  { v: "$6B", l: "Tokenized gold so far (PAXG + XAUT)" },
  { v: "0.01%", l: "Of gold’s ~$58T value tokenized to date" },
  { v: "$22T", l: "Verified gold still sitting in the ground" },
];

const bookPoints = [
  "Builds one case, chapter by chapter: why digital gold mining is the inevitable future of gold.",
  "Three trillion-dollar forces meet at one point for the first time — gold’s 6,000-year trust, the values-driven capital that refused to fund mining, and the blockchain that matured between them. It happens once.",
  "Gold’s value gets a second road out of the ground — the value proven and tokenized, the metal left where it sits.",
  "Run head-to-head on a single deposit, digital gold mining beats traditional mining on all four scorecards: time & risk, money, the environment, and every stakeholder.",
  "Written so a total beginner gets it — no gold, blockchain, or investing background needed — detailed and carefully sourced, and clear about what’s established today versus what’s a forward-looking forecast. Substance, not hype.",
];

const credibility = [
  {
    h: "The team behind NatGold",
    items: [
      "Executive Chairman — former Chief of Staff of the U.S. SEC",
      "CEO — former Colombian cabinet minister",
      "Director / Advisor — former CFTC attorney and ex-General Counsel of Cboe Digital",
      "Supply side chaired by the former Chief Innovation Officer of Barrick Gold, through NatBridge Resources — publicly listed (CSE: NATB · OTC: NATBF · FRA: GI80)",
      "Built on Fireblocks — trusted by 2,400+ institutions (BNP Paribas, BNY, VanEck)",
    ],
  },
  {
    h: "Patents & standards",
    items: [
      "Ten non-provisional patent applications in full examination at the U.S. Patent & Trademark Office",
      "Gold admitted only to bank-grade standards (NI 43-101, JORC, S-K 1300)",
      "Every deposit cleared through an 8-stage independent approval",
    ],
  },
];

const premarketStats = [
  { v: "US$469.138M", l: "Reserved before any public launch" },
  { v: "17,466", l: "Participants" },
  { v: "162", l: "Countries" },
  { v: "133,518", l: "NatGold Tokens reserved" },
];

const faqs = [
  { question: "Is the program open?", answer: "Not yet. You're putting your name down to be considered. We'll email you when your link is ready, and tell you exactly what happens next." },
  { question: "How much do I earn?", answer: "50% of every sale your link makes — US$18.50 on each $37 copy. The same flat rate on your first sale and your thousandth." },
  { question: "How are sales tracked and paid?", answer: "Every click and every sale tied to your unique link is counted automatically, and your balance is paid out on a regular schedule. Nothing for you to manage." },
  { question: "Why do you approve people first?", answer: "Because one bad post can put the whole shopfront at risk. Every partner signs a short, plain media policy: no investment talk, no promises about what anything will be worth, and you say clearly that you earn a commission. Say what the book says, and you'll never come near the line." },
  { question: "Do I need to own any digital assets?", answer: "No. This is a straightforward cash commission for selling a book. No wallet, nothing token-related." },
  { question: "What does it cost me?", answer: "Nothing. It's free to put your name down and free to be a partner." },
  { question: "Do I need a big audience?", answer: "No. A hundred people who trust you beat a hundred thousand who don't. What matters is that the book belongs in front of your world." },
];

export default function AffiliatesPage() {
  return (
    <VaultShell>
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-28">
        {/* The reader arriving here has just closed the book on "I would rather grow this with the
            people who believe in it than pay strangers to shout about it." The old hero met them
            with a commission table. This one answers the sentence they arrived on, in the voice
            they have been reading for 400 pages, and only then talks about money. */}
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <p className="v2-eyebrow mb-7 justify-center">The invitation, continued</p>
          <h1 className="v2-display mx-auto" style={{ fontSize: "clamp(2.4rem, 6vw, 4.25rem)", maxWidth: "18ch" }}>
            Ideas like this don&rsquo;t spread <span className="v2-gold">on their own.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[58ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            They spread through people who care enough to pass them on. If you finished the book and
            felt that this <span style={{ color: "#F4F4F7" }}>ought to exist</span>, there is a way to
            help carry it &mdash; and to be paid properly for doing it.
          </p>
          <p className="mx-auto mt-5 max-w-[58ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            The program isn&rsquo;t open yet. Put your name down and you&rsquo;re first through the
            door when it is.
          </p>
          <div className="mt-10 flex justify-center">
            <AffiliateCTA />
          </div>
          <p className="mx-auto mt-6 max-w-[64ch] text-xs leading-relaxed" style={{ color: "var(--v2-faint)" }}>
            Haven&rsquo;t read it? <a href="/free" className="v2-gold">Start with the first five chapters, free</a> &mdash;
            nobody should carry a book they haven&rsquo;t read. This is a paid affiliate program: when
            someone buys the book through your link, you earn a commission on that sale. See our{" "}
            <a href="/disclaimer" className="v2-gold">Disclaimer</a> and <a href="/terms" className="v2-gold">Terms</a>.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

      {/* ── WHAT YOU'RE PROMOTING ────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-20 md:py-28">
        <p className="v2-eyebrow mb-6 justify-center">What you&rsquo;re promoting</p>
        <h2 className="v2-display text-center mx-auto" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.5rem)", maxWidth: "16ch" }}>
          It&rsquo;s not gold. It&rsquo;s not <span className="v2-gold">bitcoin.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[64ch] text-center text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          It&rsquo;s the best of both — the rails Bitcoin created (the blockchain) carrying gold&rsquo;s 6,000 years of monetary trust. NatGold is the natural evolution of gold and Bitcoin in today&rsquo;s digital, values-conscious world. <span style={{ color: "#F4F4F7" }}>Digital Gold Boom</span> is the first plain-English account of it.
        </p>

        {/* What is digital gold mining */}
        <div className="mt-12 mx-auto max-w-[920px] v2-tile p-8 md:p-10">
          <h3 className="v2-gold" style={{ fontSize: "1.15rem", fontWeight: 500, marginBottom: 12 }}>
            What is digital gold mining?
          </h3>
          <p style={{ color: "var(--v2-dim)", fontSize: "1rem", lineHeight: 1.7 }}>
            A brand-new industry launching <span style={{ color: "#F4F4F7" }}>July 2026</span>. A multi-patent-pending process that tokenizes geologically verified gold deposits into the first gold-backed digital asset — <span style={{ color: "#F4F4F7" }}>NatGold Tokens (NATG)</span> — removing the heavy financial, environmental, and social costs of traditional mining, while unlocking gold&rsquo;s value on the blockchain.
          </p>
        </div>

        {/* Why now — market stat tiles */}
        <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {marketStats.map((s) => (
            <div key={s.l} className="v2-tile p-6 text-center">
              <div className="v2-display v2-gold" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1 }}>{s.v}</div>
              <p className="mt-3" style={{ color: "var(--v2-dim)", fontSize: "0.85rem", lineHeight: 1.5 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* What the book dives into + credibility */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="v2-tile p-8 md:p-10">
            <h3 style={{ fontSize: "1.15rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 18 }}>What the book dives into</h3>
            <ul className="space-y-4">
              {bookPoints.map((p, i) => (
                <li key={i} className="flex gap-3" style={{ color: "var(--v2-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <span aria-hidden className="v2-gold" style={{ flexShrink: 0 }}>→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {credibility.map((c) => (
              <div key={c.h} className="v2-tile p-7">
                <h3 className="v2-gold" style={{ fontSize: "1.05rem", fontWeight: 500, marginBottom: 14 }}>{c.h}</h3>
                <ul className="space-y-2.5">
                  {c.items.map((it, i) => (
                    <li key={i} className="flex gap-2.5" style={{ color: "var(--v2-dim)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                      <span aria-hidden className="v2-gold" style={{ flexShrink: 0 }}>•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-market demand — highlighted band */}
        <div className="mt-5 rounded-[24px] p-8 md:p-10" style={{ border: "1px solid rgba(232,178,58,0.4)", background: "linear-gradient(180deg, rgba(232,178,58,0.07), rgba(232,178,58,0.02))" }}>
          <p className="v2-eyebrow mb-8 justify-center">Pre-market demand — before any public launch</p>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {premarketStats.map((s) => (
              <div key={s.l} className="text-center">
                <div className="v2-display v2-gold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", lineHeight: 1 }}>{s.v}</div>
                <p className="mt-3" style={{ color: "var(--v2-dim)", fontSize: "0.85rem", lineHeight: 1.5 }}>{s.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "60ch", marginInline: "auto" }}>
            Reserved demand only — non-binding expressions of interest, with no money changing hands until the token goes live.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-10"><div className="v2-divider" /></div>

      {/* ── THE COMMISSION ───────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1320px] px-6 md:px-10 py-20 md:py-28">
        <h2 className="v2-display text-center mx-auto" style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)", maxWidth: "18ch" }}>
          <span className="v2-gold">Half</span> of every sale you bring.
        </h2>
        <p className="mx-auto mt-5 max-w-[60ch] text-center text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          Believing in something shouldn&rsquo;t cost you money. When the doors open, you keep half of
          every copy your link sells &mdash; US$18.50 on each $37 sale, the same on the first and the
          thousandth. No tiers to chase, no targets to hit.
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
          Tracking and payout details are covered in the questions below.
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
          The hardest part of sharing is making something good. Get a growing library of ready-made gold and mining footage and images, so your posts do the work for you.
        </p>

        {/* Sample B-roll — muted autoplay loops, a taste of the library */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {brollExamples.map((clip) => (
            <div key={clip.src} className="v2-tile relative overflow-hidden p-0">
              <video
                src={clip.src}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                aria-label={`Example B-roll: ${clip.label}`}
                className="block h-full w-full object-cover"
                style={{ aspectRatio: "16 / 10" }}
              />
              <span
                className="v2-num absolute bottom-3 left-3"
                style={{ color: "#F4F4F7", background: "rgba(0,2,18,0.55)", padding: "4px 9px", borderRadius: 8, backdropFilter: "blur(6px)" }}
              >
                {clip.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--v2-faint)" }}>
          A sample of the B-roll in the kit — more clips inside.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 mx-auto max-w-[720px]">
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
            Put your name down.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            The program isn&rsquo;t open yet. Leave your email and you&rsquo;re first in line when it
            is &mdash; we&rsquo;ll come back to you with exactly what happens next. Free, and nothing
            is owed either way.
          </p>
          <div className="mt-8">
            <AffiliateInterestForm />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[700px] px-6 py-24 text-center">
        <h2 className="v2-display mx-auto" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "18ch" }}>
          Movements are shaped by the people who <span className="v2-gold">show up early.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[50ch] text-lg" style={{ color: "var(--v2-dim)" }}>
          This is early. If you want to help build it, the door is open.
        </p>
        <div className="mt-9 flex justify-center"><AffiliateCTA /></div>
      </section>
    </VaultShell>
  );
}
