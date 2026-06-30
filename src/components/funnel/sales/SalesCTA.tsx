"use client";

import BuyButton from "@/components/BuyButton";

const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

/**
 * SalesCTA — the single, compliance-anchored call to action for the /v1 + /s funnel.
 *
 * One product, one button → the LemonSqueezy checkout overlay ($37 book, 12-month
 * money-back guarantee). The lines UNDER the button are non-negotiable furniture and are
 * ALWAYS visible (never behind a hover/accordion):
 *   - delivery + guarantee  ("Digital book · delivered instantly · 12-month money-back guarantee")
 *   - the educational fine print ("Educational — not financial advice.")
 *
 * `fine` lets the close/final CTA pass the fuller compliance line (secure checkout via
 * LemonSqueezy + the author-stake disclosure). `subline` is the optional dated-urgency line
 * used on /s ("Read it before the first tokens trade on July 8, 2026.").
 */
export default function SalesCTA({
  event,
  align = "left",
  subline,
  price = "37",
  regular,
  deliveryLine = "Digital book · delivered instantly · 12-month money-back guarantee",
  fine = "Educational — not financial advice.",
}: {
  /** Vercel analytics event name, unique per placement (e.g. "v1_hero_buy"). */
  event: string;
  align?: "left" | "center";
  subline?: string;
  /** The charge price shown on the button (no $). Default "37". */
  price?: string;
  /** Optional honest anchor — the genuine REGULAR price (no $), shown struck through above
   *  the button (e.g. "97"). This is the going-to / list price, NOT a fake "was" price; the
   *  real discount is set in LemonSqueezy (list $97 → launch $37). */
  regular?: string;
  /** The always-visible delivery + guarantee furniture under the button. */
  deliveryLine?: React.ReactNode;
  /** Educational fine print. Pass null to fold it into deliveryLine (used on /s). */
  fine?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <div className={center ? "flex flex-col items-center text-center" : "flex flex-col items-start"}>
      {regular && (
        <p className="mb-3 text-sm" style={{ color: "var(--v2-faint)" }}>
          Early-reader price ·{" "}
          <span style={{ textDecoration: "line-through" }}>${regular}</span>{" "}
          <span className="v2-gold" style={{ fontWeight: 600 }}>${price}</span>
        </p>
      )}
      <BuyButton
        checkoutUrl={checkoutUrl}
        label={`Get the book — $${price}`}
        unavailableLabel="Coming soon"
        event={event}
        className="v2-btn w-full sm:w-auto"
      />

      {subline && (
        <p className="mt-4 text-sm" style={{ color: "var(--v2-dim)" }}>
          {subline}
        </p>
      )}

      <p className="mt-4 text-sm" style={{ color: "var(--v2-faint)" }}>
        {deliveryLine}
      </p>
      {fine != null && (
        <p className="mt-1.5 text-xs" style={{ color: "var(--v2-faint)" }}>
          {fine}
        </p>
      )}
    </div>
  );
}
