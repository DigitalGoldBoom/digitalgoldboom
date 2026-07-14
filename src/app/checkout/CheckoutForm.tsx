"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

/**
 * CheckoutForm — the payment step, shown in full and DISABLED.
 *
 * Why it exists: the payment processor reviewing this store needs to see the whole purchase flow,
 * checkout included. They know the store has no processor yet — they are the ones deciding whether
 * to grant one — so a checkout that cannot charge is expected, not a surprise.
 *
 * Why it is genuinely disabled, not merely inert:
 *   · Every field carries the real `disabled` attribute. You CANNOT type into them. No keystroke is
 *     captured, no value is held in state, nothing is posted anywhere. There is no form handler at
 *     all — the submit is prevented and answers with an error.
 *   · A notice sits ABOVE the fields, before a visitor reaches them, saying payments are not
 *     enabled. Nobody discovers this by trying.
 *
 * A card form that LOOKS live but silently swallows a card number would be a different thing
 * entirely, and it is the one thing this page must never become: /checkout is a live public URL, so
 * a real person can land here. Disabled and declared is honest. Live-looking and dead is not.
 *
 * When NEXT_PUBLIC_LS_CHECKOUT_URL is set, this component is not rendered at all — /buy hands the
 * buyer to the processor's own hosted checkout, which is the only thing that ever takes a card.
 */
export default function CheckoutForm() {
  const [error, setError] = useState(false);

  return (
    <div>
      {/* The truth, before the fields — not after someone has tried them. The reason given is the
          real one and the only one: payment processing is still being set up. Nothing here comments
          on the product. */}
      <div className="co-pay-notice">
        <p className="co-pay-title">Checkout is not open yet.</p>
        <p className="co-pay-body">
          We&rsquo;re completing our payment setup. The fields below are disabled — no card can be
          entered, submitted, or stored, and nothing is charged. Once checkout opens, payment is
          handled entirely by our payment provider on their own secure checkout, so card details
          never touch this site.
        </p>
      </div>

      <form
        className="co-form"
        onSubmit={(e) => {
          e.preventDefault();
          setError(true);
          track("checkout_disabled_submit");
        }}
        aria-describedby="co-disabled-note"
      >
        <fieldset disabled className="co-fieldset">
          <legend className="sr-only">Payment details (disabled — payments not enabled)</legend>

          <label className="co-label" htmlFor="co-email">
            Email
          </label>
          <input
            id="co-email"
            type="email"
            className="co-input"
            placeholder="you@email.com"
            autoComplete="off"
            tabIndex={-1}
          />

          <label className="co-label mt-4" htmlFor="co-card">
            Card details
          </label>
          <input
            id="co-card"
            type="text"
            className="co-input"
            placeholder="Card number"
            autoComplete="off"
            inputMode="none"
            tabIndex={-1}
          />
          <div className="co-row">
            <input
              type="text"
              className="co-input"
              placeholder="MM / YY"
              autoComplete="off"
              inputMode="none"
              tabIndex={-1}
              aria-label="Expiry date"
            />
            <input
              type="text"
              className="co-input"
              placeholder="CVC"
              autoComplete="off"
              inputMode="none"
              tabIndex={-1}
              aria-label="Security code"
            />
          </div>

          <label className="co-label mt-4" htmlFor="co-country">
            Country
          </label>
          <input
            id="co-country"
            type="text"
            className="co-input"
            placeholder="Country"
            autoComplete="off"
            tabIndex={-1}
          />
        </fieldset>

        <button type="submit" className="co-pay-btn" aria-describedby="co-disabled-note">
          Pay $37
        </button>

        <p id="co-disabled-note" className="co-disabled-note">
          Checkout is disabled. No payment can be taken and no details are collected.
        </p>

        {error && (
          <p role="alert" className="co-error">
            Checkout isn&rsquo;t open yet — our payment setup is still being completed. No card was
            submitted and nothing was charged.
          </p>
        )}
      </form>
    </div>
  );
}
