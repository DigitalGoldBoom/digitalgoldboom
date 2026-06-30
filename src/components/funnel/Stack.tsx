"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import BuyButton from "@/components/BuyButton";

/**
 * Stack — three SEPARATE purchase options (not a bundle). The book is live (links to /book);
 * the Primer and the yearly Updates are "ready to connect" — their LemonSqueezy checkout URLs
 * (NEXT_PUBLIC_LS_PRIMER_CHECKOUT_URL / NEXT_PUBLIC_LS_NEWSLETTER_CHECKOUT_URL) get set later;
 * until then their buttons show "Coming soon". Prices are real and owner-set.
 */
const OPTIONS = [
  {
    eyebrow: "The book",
    name: "Digital Gold Boom",
    desc: "The complete case, in plain English — every stat sourced, every claim traceable.",
    price: "$17",
    note: "one-time",
    kind: "link" as const,
    href: "/book",
    cta: "Get the book",
  },
  {
    eyebrow: "Fast start",
    name: "The Primer",
    desc: "The quick guide to digital gold mining — the whole idea in one sitting.",
    price: "$99",
    note: "one-time",
    kind: "buy" as const,
    checkoutUrl: process.env.NEXT_PUBLIC_LS_PRIMER_CHECKOUT_URL,
    cta: "Get the Primer",
    event: "primer_buy_click",
  },
  {
    eyebrow: "Stay ahead",
    name: "Industry Intelligence Updates",
    desc: "Periodic updates as the space evolves — new deposits, partners and milestones.",
    price: "$199",
    note: "per year",
    kind: "buy" as const,
    checkoutUrl: process.env.NEXT_PUBLIC_LS_NEWSLETTER_CHECKOUT_URL,
    cta: "Subscribe",
    event: "newsletter_buy_click",
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-surface relative">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-[640px]">
          <p data-reveal className="eyebrow mb-6">Get started</p>
          <h2 data-reveal className="display-lg text-tp" style={{ maxWidth: "16ch" }}>
            Pick what you <span style={{ color: "var(--accent-gold)" }}>need.</span>
          </h2>
          <p
            data-reveal
            className="mt-6 text-ts"
            style={{ fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: "48ch" }}
          >
            No bundle. Each available on its own — start with the book, or go deeper.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {OPTIONS.map((o) => (
            <div
              key={o.name}
              data-reveal
              className="lift-card flex flex-col h-full"
              style={{
                background: "var(--bg-canvas)",
                border: "1px solid var(--border-base)",
                borderRadius: "var(--r-2xl)",
                padding: "clamp(24px, 5vw, 36px)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <p
                className="font-mono mb-5"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent-gold)",
                  fontWeight: 600,
                }}
              >
                {o.eyebrow}
              </p>

              <h3
                className="text-tp"
                style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)", fontWeight: 500, lineHeight: 1.25 }}
              >
                {o.name}
              </h3>

              <p className="mt-3 text-ts" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                {o.desc}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className="font-mono tabular-nums text-tp"
                  style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)", fontWeight: 300, letterSpacing: "-0.02em" }}
                >
                  {o.price}
                </span>
                <span className="text-tt" style={{ fontSize: "0.8125rem" }}>
                  {o.note}
                </span>
              </div>

              <div className="mt-6 pt-2 mt-auto">
                {o.kind === "link" ? (
                  <Link href={o.href} className="btn-primary w-full">
                    {o.cta} →
                  </Link>
                ) : (
                  <BuyButton
                    checkoutUrl={o.checkoutUrl}
                    label={o.cta}
                    unavailableLabel="Coming soon"
                    event={o.event}
                    className="btn-primary w-full"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-6 text-center text-tt" style={{ fontSize: "0.8125rem" }}>
          Secure checkout via LemonSqueezy · Educational — not financial advice.
        </p>
      </div>
    </section>
  );
}
