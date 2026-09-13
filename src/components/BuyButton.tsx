"use client";

import { track } from "@vercel/analytics";

type BuyButtonProps = {
  /** Whop hosted checkout URL for the book (from NEXT_PUBLIC_WHOP_CHECKOUT_URL). */
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
 * BuyButton — sends the buyer to Whop's hosted checkout (Whop is the merchant of record: it takes
 * the payment, handles tax and fraud, and delivers the book file + receipt). This site never sees or
 * stores card details; the button is a plain link to the checkout page.
 *
 * Ready-to-connect: the checkout URL comes from NEXT_PUBLIC_WHOP_CHECKOUT_URL, passed in by the
 * page. Until that value exists there is no checkout to send anyone to. The button does NOT render
 * disabled in that state — a dead button reads as a broken site and burns the one moment someone
 * was willing to act. Without a checkout it becomes a LINK to `fallbackHref` — the truthful next
 * step, which today is the pre-launch panel on /checkout. It never collects a card, never imitates
 * a payment form, and never promises a purchase it cannot complete.
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

  return (
    <a
      href={checkoutUrl}
      className={className}
      onClick={() => (eventProps ? track(event, eventProps) : track(event))}
    >
      {children ?? label}
    </a>
  );
}
