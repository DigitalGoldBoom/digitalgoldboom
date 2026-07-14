import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import VaultShell from "@/components/VaultShell";
import CheckoutForm from "./CheckoutForm";
import { BOOK_ON_SALE } from "@/lib/flags";
import "./checkout.css";

const PRICE = "37.00";
const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

export const metadata: Metadata = {
  title: "Checkout — Digital Gold Boom",
  description: "Complete your order for Digital Gold Boom, the digital book by Andrew Fletcher.",
  robots: { index: false, follow: false },
};

/**
 * /checkout — the purchase flow, shown end to end.
 *
 * It exists because a payment processor reviewing this store needs to see the whole flow, checkout
 * included, and they know the store has no processor yet — they are the ones deciding whether to
 * grant one.
 *
 * IT TAKES NOTHING. The card fields are genuinely `disabled`: you cannot type into them, no value
 * is held, no handler posts anywhere. A notice says so ABOVE them, before a visitor reaches them,
 * and the pay button answers with a plain error. /checkout is a live public URL — a real person can
 * land here — and a form that LOOKED live while silently swallowing a card number would be a
 * different thing entirely. Disabled and declared is honest. Live-looking and dead is not.
 *
 * Once NEXT_PUBLIC_LS_CHECKOUT_URL exists, this page redirects straight to the processor's own
 * hosted checkout: the only thing that ever handles a card is the processor, never this site.
 */

const ASSURANCES = [
  {
    t: "60-day money-back guarantee",
    b: "Read it, and if it isn't for you, email us inside 60 days for a full refund. No hoops.",
  },
  {
    t: "Your card never touches this site",
    b: "Payment is handled entirely by our payment provider on their own secure checkout. We never see, hold, or store card details.",
  },
  {
    t: "Instant delivery",
    b: "A download link is emailed to you the moment payment clears — PDF, EPUB and Kindle.",
  },
  {
    t: "A real person answers",
    b: "Any problem with an order, email fletcher@digitalgoldboom.com. Usually answered within one business day.",
  },
];

function Tick() {
  return (
    <svg className="co-assure-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CheckoutPage() {
  return (
    <VaultShell>
      <main className="pb-24 pt-32">
        <div className="co-wrap">
          {/* The flow, stated. Step 2 is where it currently stops, and the page says why. */}
          <nav className="co-steps" aria-label="Checkout progress">
            <span className="co-step co-step--on">
              <span className="co-step-n">1</span> Your order
            </span>
            <span className="co-step-line" aria-hidden />
            <span className="co-step co-step--on">
              <span className="co-step-n">2</span> Payment
            </span>
            <span className="co-step-line" aria-hidden />
            <span className="co-step">
              <span className="co-step-n">3</span> Delivery
            </span>
          </nav>

          <div className="co-grid mt-9">
            {/* ── PAYMENT ──────────────────────────────────────────── */}
            <div className="co-panel">
              <div className="co-panel-head">
                <span className="co-panel-title">Payment</span>
                <span className="co-num">${PRICE} USD</span>
              </div>
              <div className="co-panel-body">
                {BOOK_ON_SALE && checkoutUrl ? (
                  // A live store never renders a form here at all: the buyer goes to the processor's
                  // own hosted checkout, because that is the only place a card should ever be typed.
                  <div className="co-pay-notice">
                    <p className="co-pay-title">Continue to secure checkout</p>
                    <p className="co-pay-body">
                      Payment is completed on our provider&rsquo;s secure checkout.
                    </p>
                    <a href={checkoutUrl} className="co-pay-btn mt-5 inline-flex">
                      Pay ${PRICE}
                    </a>
                  </div>
                ) : (
                  <CheckoutForm />
                )}
              </div>
            </div>

            {/* ── ORDER SUMMARY ────────────────────────────────────── */}
            <div className="co-sticky">
              <div className="co-panel">
                <div className="co-panel-head">
                  <span className="co-panel-title">Your order</span>
                </div>
                <div className="co-panel-body">
                  <div className="co-line">
                    <div className="flex gap-4">
                      <div className="relative h-[76px] w-[52px] shrink-0">
                        <Image
                          src="/book3d-framer/cover-front-v2.webp"
                          alt="Digital Gold Boom"
                          fill
                          sizes="52px"
                          className="rounded-[3px] object-cover"
                        />
                      </div>
                      <div>
                        <p className="co-line-name">Digital Gold Boom</p>
                        <p className="co-line-meta">
                          Digital book (ebook) by Andrew Fletcher
                          <br />
                          PDF · EPUB · Kindle · instant download
                        </p>
                      </div>
                    </div>
                    <span className="co-num">${PRICE}</span>
                  </div>

                  <div className="co-line">
                    <div>
                      <p className="co-line-name">Delivery</p>
                      <p className="co-line-meta">Emailed download link</p>
                    </div>
                    <span className="co-num">Free</span>
                  </div>

                  <div className="co-total">
                    <span className="co-total-label">Total</span>
                    <span className="co-total-num">${PRICE}</span>
                  </div>
                  <p className="co-line-meta mt-2">One-time payment. No subscription.</p>

                  <div className="co-assure">
                    {ASSURANCES.map((a) => (
                      <div key={a.t} className="co-assure-row">
                        <Tick />
                        <div>
                          <p className="co-assure-t">{a.t}</p>
                          <p className="co-assure-b">{a.b}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="co-fine">
                By completing this order you agree to our{" "}
                <Link href="/terms">Terms &amp; refund policy</Link> and{" "}
                <Link href="/privacy">Privacy policy</Link>. Digital Gold Boom is an educational book
                about an industry. It is not financial, investment, or tax advice, and it does not
                sell tokens or digital assets. Questions:{" "}
                <a href="mailto:fletcher@digitalgoldboom.com">fletcher@digitalgoldboom.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </VaultShell>
  );
}
