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
  /** Label used when there is no checkout yet. Defaults to `label` — the button looks the same. */
  unavailableLabel?: string;
  /** Where the button goes when there is no checkout. Never a dead button. */
  fallbackHref?: string;
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
 * Ready-to-connect: the checkout URL comes from NEXT_PUBLIC_LS_CHECKOUT_URL, passed in by the page.
 * Until the store is approved and that value exists, the button CANNOT open a checkout — no store,
 * no checkout link, for anyone. It used to render disabled in that state. That was wrong: a dead
 * button is the worst thing a visitor (or a merchant reviewer) can click. It reads as a broken
 * site, and it burns the one moment someone was willing to act.
 *
 * So there is no disabled state. Without a checkout the button becomes a LINK to `fallbackHref` —
 * the truthful next step, which today is the pre-launch panel on /buy. It never collects a card, it
 * never imitates a payment form, and it never promises a purchase it cannot complete.
 *
 * React note (LS docs): lemon.js may init before this mounts, so we call window.createLemonSqueezy()
 * on mount and on script load to (re)bind the overlay to this button.
 */
export default function BuyButton({
  checkoutUrl,
  label = "Get the book — $37",
  unavailableLabel,
  fallbackHref = "/checkout",
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
      <a
        href={fallbackHref}
        className={className}
        onClick={() => track("book_buy_click_prelaunch")}
      >
        {unavailableLabel ?? children ?? label}
      </a>
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
