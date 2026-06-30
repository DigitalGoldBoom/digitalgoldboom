import type { Metadata } from "next";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";
import VaultShell from "@/components/VaultShell";

const PRICE = "17";
const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

export const metadata: Metadata = {
  title: "Buy Digital Gold Boom (ebook) — $17",
  description:
    "Digital Gold Boom by Andrew Fletcher. A digital book (PDF, EPUB, Kindle) of information and analysis about the gold tokenization industry. $17, instant download.",
  // Plain product page used for checkout / merchant review — keep it out of the search index so
  // it doesn't compete with /book.
  robots: { index: false, follow: false },
};

/**
 * /buy — the deliberately plain product page (the "merchant processing" page). This is the clean,
 * honest book listing shown to the payment processor: a digital book of information & analysis,
 * a price, what you get, and a secure checkout. No token/crypto/investment promotion — matching
 * exactly what LemonSqueezy approved ("selling purely information and analysis... not the assets").
 */
export default function BuyPage() {
  return (
    <VaultShell>
      <main className="pt-32 pb-20" style={{ minHeight: "70vh" }}>
        <div className="mx-auto max-w-[900px] px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[auto_1fr] sm:gap-12 sm:items-start">
            {/* Cover */}
            <Image
              src="/book3d-framer/cover-front.webp"
              alt="Digital Gold Boom — book cover"
              width={500}
              height={763}
              priority
              className="w-[200px] sm:w-[240px] h-auto rounded-lg"
              style={{ boxShadow: "var(--shadow-lg)" }}
            />

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                Digital Gold Boom
              </h1>
              <p className="mt-1 text-sm" style={{ color: "var(--text-tertiary)" }}>
                by Andrew Fletcher · digital book (ebook)
              </p>

              <p className="mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                A plain-English book of information and analysis about the gold tokenization industry — what
                digital gold mining is, how in-ground verified gold is tokenized, how it’s verified, and how to
                think about it. Educational reading; it does not sell tokens or digital assets.
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                  ${PRICE}
                </span>
                <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                  one-time payment
                </span>
              </div>

              <div className="mt-6">
                <BuyButton checkoutUrl={checkoutUrl} label={`Buy now — $${PRICE}`} event="book_buy_click_plain" />
              </div>

              <div
                className="mt-8 rounded-xl p-5 text-sm"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-base)", color: "var(--text-secondary)" }}
              >
                <p className="mb-2 font-semibold" style={{ color: "var(--text-primary)" }}>
                  What you get
                </p>
                <ul className="space-y-1.5" style={{ color: "var(--text-tertiary)" }}>
                  <li>• Instant download after payment (link emailed to you)</li>
                  <li>• PDF, EPUB and Kindle (MOBI) formats — reads on any device</li>
                  <li>• Secure checkout handled by LemonSqueezy</li>
                  <li>• 30-day money-back guarantee</li>
                </ul>
              </div>

              <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                Questions or problems with your order? Email{" "}
                <a href="mailto:support@digitalgoldboom.com" style={{ color: "var(--accent-gold)" }}>
                  support@digitalgoldboom.com
                </a>
                . Digital Gold Boom is an educational book; nothing in it is financial advice.
              </p>
            </div>
          </div>
        </div>
      </main>
    </VaultShell>
  );
}
