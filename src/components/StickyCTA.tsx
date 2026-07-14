"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

/**
 * StickyCTA — the phone-only ask that follows the reader down the page.
 *
 * Why it exists: on a phone, a long page had exactly one ask, near the top. A reader who scrolled
 * through the whole argument, was convinced, and stopped — had nothing to tap. He had to scroll-hunt
 * back up. Most of this site's traffic is mobile, so that was most of the traffic.
 *
 * It is deliberately narrow:
 *  - Phone/tablet only (below lg). On desktop the ask is always visible in the nav.
 *  - Arms only AFTER the hero has passed, so it never competes with the fold's own CTA.
 *  - Disarms when the real form scrolls into view — a floating button covering the field it points
 *    at is a button fighting its own destination.
 */
export default function StickyCTA({
  targetId,
  label,
  source,
}: {
  /** The id of the element this bar sends the reader to (the form). */
  targetId: string;
  label: string;
  source: string;
}) {
  const [armed, setArmed] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    let pastHero = false;
    let targetVisible = false;

    const sync = () => setArmed(pastHero && !targetVisible);

    // Arm once the reader is past roughly one screen — i.e. the hero's own CTA is gone.
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.9;
      sync();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Disarm while the destination form is on screen.
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(
        ([entry]) => {
          targetVisible = entry.isIntersecting;
          sync();
        },
        { rootMargin: "-10% 0px -25% 0px" },
      );
      io.observe(target);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [targetId]);

  const go = () => {
    track("sticky_cta_click", { source });
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    // Put the cursor in the field, so the tap that got them here is the last one they need.
    window.setTimeout(() => {
      target.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <div
      ref={sentinel}
      aria-hidden={!armed}
      className="sticky-cta lg:hidden"
      data-armed={armed ? "true" : "false"}
    >
      <button type="button" onClick={go} className="lm-submit" tabIndex={armed ? 0 : -1}>
        <span>{label}</span>
        <span className="lm-submit-disc" aria-hidden>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
