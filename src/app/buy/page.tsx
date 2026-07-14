import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import Book3D from "@/components/Book3D";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import VaultShell from "@/components/VaultShell";
import { BOOK_ON_SALE } from "@/lib/flags";

const PRICE = "37";
const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

export const metadata: Metadata = {
  title: "Digital Gold Boom (ebook) — $37",
  description:
    "Digital Gold Boom by Andrew Fletcher. A digital book (PDF, EPUB, Kindle) of information and analysis about the gold tokenization industry. $37, one-time payment, 60-day money-back guarantee.",
  // INDEXED. It used to be noindex, from when this was a secret pre-launch page reachable only by a
  // URL handed to a reviewer. It is now the site's product page, linked from the nav and the footer:
  // a real product, at a real price, with a refund policy behind it. A store that hides its product
  // page from search is telling anyone who checks that the store is not really open — which is the
  // opposite of what a merchant reviewer needs to conclude.
};

/**
 * /buy — the product page.
 *
 * This is the page a PAYMENT PROCESSOR reads during merchant review, and it is written for that
 * reader as much as for a buyer. What such a review actually looks for: a real product, described
 * plainly; one clear price; what the buyer receives and how; a refund policy; terms and privacy;
 * a working support address; and no investment, token, or returns promotion anywhere near the
 * money. Every one of those is on this page, and each links to the page that governs it.
 *
 * WHAT THIS PAGE DOES NOT DO. There is no checkout yet — the store is not approved, so no checkout
 * link exists for anyone. The site therefore does not imitate one. No fake payment form, no field
 * that takes a card, no "processing" screen. Faking a payment flow is the fastest way to fail the
 * very review this page exists for, quite apart from being a lie told to a stranger. Instead the
 * buy button leads to the honest next step below: the book is finished after the launch it
 * describes; join the list and read the first five chapters now.
 *
 * The moment NEXT_PUBLIC_LS_CHECKOUT_URL is set in Vercel, BOOK_ON_SALE flips by itself and this
 * same page becomes a live checkout. Nothing here needs rewriting.
 */

const WHAT_YOU_GET = [
  "The complete book — 17 chapters, delivered as a download link emailed to you.",
  "PDF, EPUB and Kindle (MOBI). Reads on any phone, tablet, e-reader or computer.",
  "Every figure sourced, with established facts and forward-looking forecasts clearly separated.",
  "Free updates to the edition you buy.",
];

const INSIDE = [
  {
    part: "Part one — the case",
    meta: "Chapters 1–8",
    body: "What gold actually is, why the six-thousand-year-old way of producing it is breaking down, where its value really comes from, and the model that reaches it without a mine. Each chapter tested before the next is added.",
  },
  {
    part: "Part two — the ecosystem",
    meta: "Chapters 9–17",
    body: "Who is building this and whether it works: the people, the verification standard, the approval gate, the partners, the demand on record — and an honest chapter on what could still go wrong.",
  },
];

export default function BuyPage() {
  return (
    <VaultShell>
      <main className="pb-24 pt-32">
        <div className="mx-auto max-w-[1000px] px-6">
          {/* ── PRODUCT ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[auto_1fr] md:gap-14">
            <div className="flex justify-center">
              <Book3D />
            </div>

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                Digital Gold Boom
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
                by Andrew Fletcher · digital book (ebook) · PDF, EPUB, Kindle
              </p>

              <p className="mt-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                A plain-English book of information and analysis about the gold tokenization
                industry: what digital gold mining is, how gold that has been geologically verified
                in the ground is tokenized, how that verification works, and how to think about it.
                Written for a reader with no background in gold, mining, or blockchain.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                It is educational reading. It does not sell tokens or digital assets, it does not
                offer an investment, and nothing in it is financial advice.
              </p>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                  ${PRICE}
                </span>
                <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                  one-time payment · no subscription
                </span>
              </div>

              <div className="mt-7">
                <BuyButton
                  checkoutUrl={checkoutUrl}
                  label={`Buy now — $${PRICE}`}
                  fallbackHref="/checkout"
                  event="book_buy_click_plain"
                />
              </div>

              <p className="mt-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
                Secure checkout. 60-day money-back guarantee —{" "}
                <Link href="/terms" style={{ color: "var(--accent-gold)" }}>
                  see our refund policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* ── WHAT YOU GET ─────────────────────────────────────── */}
          <div
            className="mt-16 rounded-2xl p-7 md:p-8"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-base)" }}
          >
            <p className="mb-4 font-semibold" style={{ color: "var(--text-primary)" }}>
              What you get
            </p>
            <ul className="space-y-2.5">
              {WHAT_YOU_GET.map((w) => (
                <li key={w} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <span aria-hidden style={{ color: "var(--accent-gold)" }}>
                    •
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── WHAT'S INSIDE ────────────────────────────────────── */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {INSIDE.map((s) => (
              <div
                key={s.part}
                className="rounded-2xl p-7"
                style={{ border: "1px solid var(--border-base)" }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {s.part}
                </p>
                <p className="mt-1 font-mono text-xs" style={{ color: "var(--accent-gold)" }}>
                  {s.meta}
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* ── PRE-LAUNCH (only while there is no checkout) ──────── */}
          {!BOOK_ON_SALE && (
            <section
              id="reserve"
              className="mt-8 scroll-mt-28 rounded-2xl p-7 md:p-9"
              style={{
                border: "1px solid rgba(232,178,58,0.4)",
                background: "linear-gradient(180deg, rgba(232,178,58,0.07), rgba(232,178,58,0.02))",
              }}
            >
              {/* State the fact, explain nothing. The page does not comment on the product (a
                  product page that editorialises about its own product is not a product page), and
                  it does not narrate our back-office either — nobody buying a book needs to hear
                  about our admin, and explaining yourself unprompted reads as an apology. */}
              <p className="v2-eyebrow mb-5">Opening shortly</p>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Checkout opens shortly.
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Orders aren&rsquo;t being taken just yet. Nothing is charged and no card details are
                collected in the meantime.
              </p>
              <p className="mt-4 max-w-[62ch] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Leave your email and you&rsquo;ll be first to know the moment it opens &mdash; and
                you&rsquo;ll get the first five chapters straight away, free.
              </p>

              <div className="mt-8 max-w-[520px]">
                <div className="lm-shell">
                  <div className="lm-core">
                    <LeadMagnetForm source="buy_page_prelaunch" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── SUPPORT + LEGAL ──────────────────────────────────── */}
          <div className="mt-12 text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            <p>
              Questions, or a problem with an order? Email{" "}
              <a href="mailto:fletcher@digitalgoldboom.com" style={{ color: "var(--accent-gold)" }}>
                fletcher@digitalgoldboom.com
              </a>{" "}
              and a real person replies, usually within one business day.
            </p>
            <p className="mt-3">
              <Link href="/terms" style={{ color: "var(--accent-gold)" }}>
                Terms &amp; refund policy
              </Link>{" "}
              ·{" "}
              <Link href="/privacy" style={{ color: "var(--accent-gold)" }}>
                Privacy policy
              </Link>{" "}
              ·{" "}
              <Link href="/disclaimer" style={{ color: "var(--accent-gold)" }}>
                Disclaimer
              </Link>{" "}
              ·{" "}
              <Link href="/contact" style={{ color: "var(--accent-gold)" }}>
                Contact
              </Link>
            </p>
            <p className="mt-3">
              Digital Gold Boom is an educational book. It is not financial, investment, or tax
              advice, it does not sell tokens or digital assets, and it makes no promise about the
              future value of anything.
            </p>
          </div>
        </div>
      </main>
    </VaultShell>
  );
}
