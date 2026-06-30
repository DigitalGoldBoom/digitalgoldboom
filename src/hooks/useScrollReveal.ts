"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * useScrollReveal — smooth, professional "rise & fade" reveal for a section's [data-reveal]
 * children as they enter view.
 *
 * Why this is smooth (the site used to feel "jolty"): the jolt came from the *underlying* causes
 * — a fixed nav blurring the page every scroll frame, ~10 GSAP ScrollTriggers recalculating
 * offsets, a post-font re-measure that shifted positions, CSS smooth-scroll input lag, and big
 * counters re-laying-out each frame. Those are all fixed now, so we can keep real motion:
 *   - ONE passive IntersectionObserver per section (no per-scroll-frame work, off main thread).
 *   - GPU-only transform + opacity (translateY) — never animates layout.
 *   - Gentle ease-out over ~0.7s with a light stagger; fires a touch before the section is fully
 *     in view so the motion is settling as it arrives (it doesn't fight your scroll).
 *   - Anything already on screen at first paint shows instantly (no hide-then-show flash).
 *   - Honours reduced-motion (content shown immediately).
 *
 * Call sites are unchanged: useScrollReveal(sectionRef). y/stagger/duration are tunable; legacy
 * start/ease/delay/once options still type-check but are unused.
 */

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  // Accepted for backwards-compat; unused with the IO model.
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
  const {
    selector = "[data-reveal]",
    y = 22, // subtle, premium rise — enough to read as motion, small enough not to feel jumpy
    stagger = 0.08,
    duration = 0.7,
  } = options;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const els = Array.from(scope.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    const showInstant = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    if (prefersReducedMotion()) {
      els.forEach(showInstant);
      return;
    }

    // Already in view at first paint → show instantly, never hide it (hiding painted content is
    // the "flickers once on load" bug).
    if (scope.getBoundingClientRect().top < window.innerHeight) {
      els.forEach(showInstant);
      return;
    }

    // Below the fold → start hidden (GPU transform + opacity only), then rise & fade in on entry.
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.transition = `opacity ${duration}s ${EASE}, transform ${duration}s ${EASE}`;
      el.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        els.forEach((el, i) => {
          el.style.transitionDelay = `${(i * stagger).toFixed(3)}s`;
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0)";
          const ms = (duration + i * stagger) * 1000 + 80;
          window.setTimeout(() => {
            el.style.willChange = "auto";
            el.style.transitionDelay = "";
          }, ms);
        });
        obs.disconnect(); // reveal once and stay
      },
      // Fire a bit before the section is fully in view so the rise is settling as it arrives.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(scope);

    return () => io.disconnect();
  }, [scopeRef, selector, y, stagger, duration]);
}
