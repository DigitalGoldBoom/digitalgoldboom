"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

type BuyButtonProps = {
  /** LemonSqueezy product checkout URL (from NEXT_PUBLIC_LS_*_CHECKOUT_URL). */
  checkoutUrl?: string;
  label?: string;
  /** Shown (disabled) when no checkoutUrl is set yet. Defaults to the label. */
  unavailableLabel?: string;
  className?: string;
  /** Vercel analytics event name fired on click. */
  event?: string;
  /** Optional props attached to the click event (taxonomy: context in props, never in the name). */
  eventProps?: Record<string, string>;
  children?: React.ReactNode;
};

/**
 * BuyButton — opens the LemonSqueezy CHECKOUT OVERLAY (their secure, hosted, merchant-of-record
 * checkout) as a modal on top of the site. We never see or store card details — LemonSqueezy
 * handles payment, tax, fraud, and delivers the book file + receipt. (Verified against LS docs:
 * lemon.js + an <a class="lemonsqueezy-button"> opens the overlay; ?embed=1 forces the modal.)
 *
 * Ready-to-connect: the checkout URL comes from NEXT_PUBLIC_LS_CHECKOUT_URL, passed in by the
 * page. Until the store is approved and that value is set, the button renders DISABLED — no dead
 * checkout link can ship by accident.
 *
 * React note (LS docs): lemon.js may init before this mounts, so we call window.createLemonSqueezy()
 * on mount and on script load to (re)bind the overlay to this button.
 */
export default function BuyButton({
  checkoutUrl,
  label = "Get the book — $37",
  unavailableLabel,
  className = "btn-primary",
  event = "book_buy_click",
  eventProps,
  children,
}: BuyButtonProps) {
  useEffect(() => {
    if (checkoutUrl) window.createLemonSqueezy?.();
  }, [checkoutUrl]);

  if (!checkoutUrl) {
    return (
      <button
        type="button"
        className={className}
        disabled
        aria-disabled="true"
        title="Available soon"
      >
        {unavailableLabel ?? children ?? label}
      </button>
    );
  }

  // The overlay needs ?embed=1 on the checkout URL; add it if it isn't already there.
  const url = checkoutUrl.includes("embed=")
    ? checkoutUrl
    : `${checkoutUrl}${checkoutUrl.includes("?") ? "&" : "?"}embed=1`;

  return (
    <>
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="afterInteractive"
        onLoad={() => window.createLemonSqueezy?.()}
      />
      <a
        href={url}
        className={`lemonsqueezy-button ${className}`}
        onClick={() => (eventProps ? track(event, eventProps) : track(event))}
      >
        {children ?? label}
      </a>
    </>
  );
}
