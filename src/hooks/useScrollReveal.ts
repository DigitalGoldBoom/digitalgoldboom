"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * useScrollReveal — fade a section's [data-reveal] children in as they enter view.
 *
 * Design choices that keep it SMOOTH (the site kept feeling "jolty"):
 *   - FADE ONLY, no translate. Moving content while the user is also scrolling is what reads as
 *     "jolty" — a pure opacity fade has zero geometric movement, so there is nothing to jolt.
 *   - ONE passive IntersectionObserver per section (off the main thread; no per-scroll-frame work).
 *   - Anything already on screen at load is shown INSTANTLY and never hidden — hiding on-screen
 *     content after first paint is exactly the "flickers once on load" bug.
 *   - Honours reduced-motion.
 *
 * Call sites are unchanged: useScrollReveal(sectionRef). Legacy options still type-check; only
 * stagger/duration are used now (y/start/ease/delay/once are ignored — the IO + fade model makes
 * them unnecessary).
 */

type RevealOptions = {
  selector?: string;
  stagger?: number;
  duration?: number;
  // Accepted for backwards-compat with old call sites; no longer used.
  y?: number;
  start?: string;
  ease?: string;
  delay?: number;
  once?: boolean;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function useScrollReveal<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  options: RevealOptions = {},
) {
  const { selector = "[data-reveal]", stagger = 0.04, duration = 0.5 } = options;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const els = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    const showInstant = (el: HTMLElement) => {
      el.style.opacity = "1";
    };

    if (prefersReducedMotion()) {
      els.forEach(showInstant);
      return;
    }

    // Already in view at first paint → show instantly and NEVER hide it. Hiding content that the
    // browser has already painted on-screen is the "flickers once when loading" bug.
    if (scope.getBoundingClientRect().top < window.innerHeight) {
      els.forEach(showInstant);
      return;
    }

    // Below the fold (off-screen) → start hidden, then fade in on entry. No transform = no movement.
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transition = `opacity ${duration}s ${EASE}`;
      el.style.willChange = "opacity";
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        els.forEach((el, i) => {
          el.style.transitionDelay = `${(i * stagger).toFixed(3)}s`;
          el.style.opacity = "1";
          const ms = (duration + i * stagger) * 1000 + 80;
          window.setTimeout(() => {
            el.style.willChange = "auto";
            el.style.transitionDelay = "";
          }, ms);
        });
        obs.disconnect(); // reveal once and stay
      },
      // Fire a touch before the section is fully in view so the fade is settling as it arrives.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(scope);

    return () => io.disconnect();
  }, [scopeRef, selector, stagger, duration]);
}
