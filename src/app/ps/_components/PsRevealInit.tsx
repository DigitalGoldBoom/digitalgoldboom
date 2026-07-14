"use client";

import { useEffect } from "react";

/**
 * PsRevealInit — drives the `.ps-reveal` scroll-in animation site-wide.
 * Adds `.is-in` when an element enters the viewport. If reduced-motion is on,
 * everything is revealed immediately (ps.css also force-shows it via CSS).
 */
export default function PsRevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ps-reveal"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Failsafe. Everything wearing .ps-reveal starts at opacity 0, so anything this observer
    // fails to catch stays INVISIBLE — content silently deleted from the page, with a refresh as
    // the only cure. A short element that never satisfies the 15% threshold, an element mounted
    // after this ran, a browser that throttles the callback: all end the same way. Sweeping the
    // stragglers in costs one timer and removes the whole class of failure. Hiding content is
    // never worth an animation.
    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".ps-reveal:not(.is-in)")
        .forEach((el) => el.classList.add("is-in"));
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
