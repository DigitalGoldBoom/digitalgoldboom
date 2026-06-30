import type { Metadata } from "next";
import type { CSSProperties } from "react";
import JsonLd from "@/components/JsonLd";
import BuyButton from "@/components/BuyButton";
import Book3D from "@/components/Book3D";
import Footer from "@/components/Footer";
import VaultShell from "@/components/VaultShell";
import { generateMetadata as genMeta, generateFAQSchema } from "@/lib/seo";

const PRICE = "17";
const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

export const metadata: Metadata = genMeta({
  title: "Get the Book — Digital Gold Boom",
  description:
    "Digital Gold Boom by Andrew Fletcher — the plain-English guide to digital gold mining and the tokenization of in-ground verified gold. Ebook (PDF, EPUB, Kindle), instant download, $17.",
  path: "/book",
  keywords: ["digital gold boom book", "NatGold book", "gold tokenization book", "digital gold mining", "Andrew Fletcher"],
});

// Real, verifiable selling points only — no invented ratings, reviews, page-counts or download
// numbers (Golden Rule #1 + LemonSqueezy bans fake reviews). Framed as information & analysis
// about the tokenization industry, which is exactly what LemonSqueezy approved.
const learn = [
  {
    h: "Why traditional gold mining is breaking down",
    p: "The structural squeeze on conventional mining — and why digging more out of the ground is getting harder, not easier.",
  },
  {
    h: "Why gold doesn’t need to be extracted to have value",
    p: "The core idea the whole book turns on: verified gold that stays in the ground can still be owned, priced and traded.",
  },
  {
    h: "What tokenization actually is",
    p: "Digital alchemy in plain English — how in-ground, independently-verified gold becomes a tradeable digital asset.",
  },
  {
    h: "How the value is verified (and what BIV means)",
    p: "How a resource is proven and measured, and the Baseline Intrinsic Value that sits underneath it — no hype, just the method.",
  },
  {
    h: "A real, end-to-end example",
    p: "A walk through a live transaction so the model isn’t theory — you see how it works from resource to token.",
  },
  {
    h: "The risks, and how to think about it",
    p: "An honest look at the challenges and how to weigh digital gold mining for yourself. Education, not a pitch.",
  },
];

const faqs = [
  {
    question: "What format is the book?",
    answer:
      "A digital ebook bundle: PDF, EPUB and Kindle (MOBI). It reads on any phone, tablet, e-reader or computer. There is no physical/print edition at this time.",
  },
  {
    question: "How do I get it after I pay?",
    answer:
      "Checkout is handled securely by LemonSqueezy. The moment your payment goes through, you get an email with your download link and receipt — usually within a minute.",
  },
  {
    question: "How much does it cost?",
    answer: `US$${PRICE}, one time. No subscription.`,
  },
  {
    question: "What if it's not for me?",
    answer:
      "You're covered by a 30-day money-back guarantee. Email us within 30 days and we'll refund you in full, no questions asked.",
  },
  {
    question: "What is NatGold?",
    answer:
      "NatGold is the real-world example the book uses: an approach to tokenizing in-ground, independently-verified gold. The book explains and analyses how it works — it does not sell tokens or digital assets.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. Digital Gold Boom is educational — it explains a new asset class so you can understand it. Nothing in it is financial, investment or tax advice.",
  },
];

const bookLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Digital Gold Boom",
  author: { "@type": "Person", name: "Andrew Fletcher" },
  bookFormat: "https://schema.org/EBook",
  inLanguage: "en",
  description:
    "A plain-English guide to digital gold mining and the tokenization of in-ground, independently-verified gold — what it is, how it is verified, and how to think about it.",
  offers: {
    "@type": "Offer",
    price: `${PRICE}.00`,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://digitalgoldboom.com/book",
  },
};

const darkScope: CSSProperties = {
  // Flip the text tokens to their on-dark values for this dark section (the codebase pattern).
  ["--text-primary" as string]: "var(--text-on-dark-primary)",
  ["--text-secondary" as string]: "var(--text-on-dark-secondary)",
  ["--text-tertiary" as string]: "var(--text-on-dark-tertiary)",
};

export default function BookPage() {
  return (
    <VaultShell>
      <JsonLd data={bookLd} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-20"
        style={{ background: "var(--bg-contrast-deep)", ...darkScope }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="flex justify-center order-1 lg:order-none">
            <Book3D />
          </div>

          <div>
            <p className="eyebrow mb-5">The book · Andrew Fletcher</p>
            <h1
              className="font-extrabold tracking-[-0.03em] leading-[1.1]"
              style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}
            >
              Digital Gold Boom
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              It’s not gold. It’s not Bitcoin. It’s the rise of <span className="text-gold">digital gold mining</span> —
              and this is the plain-English guide to how it works, before it goes mainstream.
            </p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                ${PRICE}
              </span>
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                one-time · instant download
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BuyButton checkoutUrl={checkoutUrl} label={`Get the book — $${PRICE}`} event="book_buy_click_hero" />
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                PDF · EPUB · Kindle
              </span>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
              <li>✓ Reads on any device</li>
              <li>✓ 30-day money-back guarantee</li>
              <li>✓ Secure checkout (LemonSqueezy)</li>
              <li>✓ Delivered to your inbox</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-canvas)" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            What you’ll understand by the end
          </h2>
          <p className="mx-auto mt-3 max-w-[60ch] text-center" style={{ color: "var(--text-secondary)" }}>
            A clear, honest map of a new asset class — written to be understood, not to sell you a token.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learn.map((item) => (
              <div key={item.h} className="card">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.h}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Who it’s for
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              If you keep hearing about tokenized gold, real-world assets and “digital gold mining” and want to
              actually understand what’s going on — without a finance degree and without the crypto noise — this is
              for you.
            </p>
            <p>
              It’s written in plain language. You don’t need to know anything about mining or blockchain to follow it.
              You’ll come out able to explain the idea, weigh it, and decide what you think for yourself.
            </p>
          </div>
        </div>
      </section>

      {/* ── AUTHOR ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-contrast)", ...darkScope }}>
        <div className="mx-auto max-w-[760px] px-6">
          <p className="eyebrow mb-4">The author</p>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Andrew Fletcher
          </h2>
          <p className="mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Andrew Fletcher writes from inside the industry he’s describing. Digital Gold Boom is his plain-English
            account of digital gold mining and the tokenization of in-ground verified gold — the case for it, how it
            works, and the risks — so a normal reader can understand a shift most people haven’t noticed yet.
          </p>
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

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: "var(--bg-contrast-deep)", ...darkScope }}>
        <div className="mx-auto max-w-[640px] px-6">
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Understand it before everyone else does.
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Digital Gold Boom — ${PRICE}, instant download, yours to keep.
          </p>
          <div className="mt-8 flex justify-center">
            <BuyButton checkoutUrl={checkoutUrl} label={`Get the book — $${PRICE}`} event="book_buy_click_footer" />
          </div>
          <p className="mt-5 text-xs" style={{ color: "var(--text-tertiary)" }}>
            PDF · EPUB · Kindle · 30-day money-back guarantee · Secure checkout via LemonSqueezy · Educational — not financial advice.
          </p>
        </div>
      </section>

      <Footer />
    </VaultShell>
  );
}
