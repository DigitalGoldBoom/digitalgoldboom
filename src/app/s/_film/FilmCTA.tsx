"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import BuyButton from "@/components/BuyButton";
import type { SectionToken } from "./filmBus";

/**
 * FilmCTA — one wrapper for every placed CTA on /s, carrying the per-position
 * taxonomy: `<section>_cta_view` (IO, once) + `<section>_cta_click` on click
 * capture; the BuyButton itself fires `<section>_outbound_buy` with the
 * destination prop (the standing outbound event, same handler, before nav).
 */

const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

export default function FilmCTA({
  section,
  className = "v2-btn",
  label = "Get the book — $37",
  extraClickProps,
  onViewRef,
}: {
  section: SectionToken | "sticky_cta";
  className?: string;
  label?: string;
  extraClickProps?: () => Record<string, string>;
  /** Optional: receive the wrapper element (the sticky pill watches the hero CTA). */
  onViewRef?: (el: HTMLSpanElement | null) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const viewFired = useRef(false);

  useEffect(() => {
    onViewRef?.(ref.current);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting) && !viewFired.current) {
          viewFired.current = true;
          track(`${section}_cta_view`);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [section, onViewRef]);

  return (
    <span
      ref={ref}
      className="inline-flex"
      onClickCapture={() =>
        track(`${section}_cta_click`, extraClickProps ? extraClickProps() : undefined)
      }
    >
      <BuyButton
        checkoutUrl={checkoutUrl}
        label={label}
        className={className}
        event={`${section}_outbound_buy`}
        eventProps={{ destination: "lemonsqueezy" }}
      />
    </span>
  );
}
