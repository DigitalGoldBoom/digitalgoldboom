"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import FilmCTA from "./FilmCTA";
import { currentSection, onPanelSound } from "./filmBus";

/**
 * StickyBuy — the docked buy pill, ALL breakpoints (designer's final ruling
 * after the global-Navbar conflict: the custom /s header is cut; this pill is
 * the always-reachable buy). Appears when the S1 hero CTA scrolls out (<10%
 * visible); hides while any panel plays with sound ≥50% in view, and while the
 * S7 primary CTA is ≥50% in view (S7's own CTA serves the close); dismissible
 * (44px target, gone for the session). z-45 — below the global Navbar.
 *
 * Events (taxonomy): sticky_cta_view (first shown) · sticky_cta_click
 * { over_section } · sticky_cta_dismiss. over_section = the section most
 * recently reached, so the sticky's credit flows to the content that earned it.
 */

export default function StickyBuy({
  heroCtaRef,
  closeCtaRef,
}: {
  heroCtaRef: React.RefObject<HTMLElement | null>;
  closeCtaRef: React.RefObject<HTMLElement | null>;
}) {
  const [heroOut, setHeroOut] = useState(false);
  const [closeVisible, setCloseVisible] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const viewFired = useRef(false);

  useEffect(() => {
    const hero = heroCtaRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(
      (es) => setHeroOut((es[0]?.intersectionRatio ?? 0) < 0.1),
      { threshold: [0, 0.1] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [heroCtaRef]);

  useEffect(() => {
    const el = closeCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => setCloseVisible((es[0]?.intersectionRatio ?? 0) >= 0.5),
      { threshold: [0, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [closeCtaRef]);

  useEffect(() => onPanelSound(setSoundActive), []);

  const shown = heroOut && !closeVisible && !soundActive && !dismissed;

  useEffect(() => {
    if (shown && !viewFired.current) {
      viewFired.current = true;
      track("sticky_cta_view");
    }
  }, [shown]);

  return (
    <div className="sfilm-sticky" data-shown={shown} aria-hidden={!shown}>
      {/* Disclosure chip — one unit with the pill (compliance: disclosure near every CTA) */}
      <span className="sfilm-sticky-note">Educational — not financial advice.</span>
      <div className="flex items-center gap-1">
        <FilmCTA
          section="sticky_cta"
          extraClickProps={() => ({ over_section: currentSection() })}
        />
        <button
          type="button"
          className="sfilm-sticky-dismiss"
          aria-label="Dismiss buy button"
          tabIndex={shown ? 0 : -1}
          onClick={() => {
            setDismissed(true);
            track("sticky_cta_dismiss");
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
