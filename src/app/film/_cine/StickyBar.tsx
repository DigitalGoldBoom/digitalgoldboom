"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import BuyButton from "@/components/BuyButton";

const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

/**
 * StickyBar — the docked "Get the book — $37" pill. Appears once the reader
 * scrolls past the PROOF beat (beat 5) sentinel and stays for the rest of the
 * page, hiding only while the finale's own CTA is on screen (that CTA serves
 * the close). No dismiss: this page has exactly one exit — the book.
 */
export default function StickyBar({
  fromRef,
  finaleCtaRef,
}: {
  fromRef: React.RefObject<HTMLElement | null>;
  finaleCtaRef: React.RefObject<HTMLElement | null>;
}) {
  const [reached, setReached] = useState(false);
  const [finaleVisible, setFinaleVisible] = useState(false);
  const viewFired = useRef(false);

  useEffect(() => {
    const el = fromRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) setReached(true);
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fromRef]);

  useEffect(() => {
    const el = finaleCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => setFinaleVisible((es[0]?.intersectionRatio ?? 0) >= 0.3),
      { threshold: [0, 0.3] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [finaleCtaRef]);

  const shown = reached && !finaleVisible;

  useEffect(() => {
    if (shown && !viewFired.current) {
      viewFired.current = true;
      track("film_sticky_cta_view");
    }
  }, [shown]);

  return (
    <div className="cine-stickybar" data-shown={shown} aria-hidden={!shown}>
      <span className="cine-stickybar-note">
        Educational — not financial advice.
      </span>
      <BuyButton
        checkoutUrl={checkoutUrl}
        label="Get the book — $37"
        className="cine-btn"
        event="film_sticky_outbound_buy"
        eventProps={{ destination: "lemonsqueezy" }}
      />
    </div>
  );
}
