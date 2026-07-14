"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import BuyButton from "@/components/BuyButton";
import type { ColdVariantKey } from "./variants";

/**
 * Sticky mobile buy bar (phone only — desktop rhythm carries itself).
 * Slides in once the reader scrolls past the hero's CTA; hides while the S9
 * primary CTA is in view (never two CTAs visible). Height 64px, safe-area
 * padded. On long mobile sales pages this is consistently the highest-lift
 * single element: the decision moment can happen at ANY beat.
 */
export default function StickyBuyBar({
  variant,
  checkoutUrl,
}: {
  variant: ColdVariantKey;
  checkoutUrl?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [closeInView, setCloseInView] = useState(false);
  const pingedRef = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("cold-s1");
    const closer = document.getElementById("cold-s9");
    if (!hero) return;

    const heroIO = new IntersectionObserver(
      ([e]) => {
        // Past the hero = the hero has scrolled up out of view.
        setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    heroIO.observe(hero);

    let closeIO: IntersectionObserver | undefined;
    if (closer) {
      closeIO = new IntersectionObserver(
        ([e]) => setCloseInView(e.isIntersecting),
        { threshold: 0.35 },
      );
      closeIO.observe(closer);
    }

    return () => {
      heroIO.disconnect();
      closeIO?.disconnect();
    };
  }, []);

  const shown = pastHero && !closeInView;

  useEffect(() => {
    if (shown && !pingedRef.current) {
      pingedRef.current = true;
      track("s_sticky_cta_view", { page: "new", variant });
    }
  }, [shown, variant]);

  return (
    <div className={`cold-sticky-bar${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
      <span className="text-sm" style={{ color: "var(--v2-dim)" }}>
        Digital Gold Boom — <span style={{ color: "#F4F4F7", fontWeight: 600 }}>$37</span>
      </span>
      <BuyButton
        checkoutUrl={checkoutUrl}
        label="Get the book"
        event="s_sticky_cta_click"
        eventProps={{ page: "new", variant }}
        className="v2-btn"
      />
    </div>
  );
}
