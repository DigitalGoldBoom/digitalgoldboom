"use client";

import { useEffect } from "react";

/**
 * PsRevealInit — drives the `.ps-reveal` scroll-in animation site-wide.
 * Adds `.is-in` when an element enters the viewport. If reduced-motion is on,
 * everything is revealed immediately (ps.css also force-shows it via CSS).
 */
/**
 * Pause the page's infinite CSS animations while they are off screen.
 *
 * The photo cube (6 image faces), the gold wireframe cube (5 nested cubes = 30 faces) and the
 * marquees all spin forever. Left alone, a phone keeps compositing every one of them while the
 * reader is three sections away, and every other frame on the page pays for it — which is what
 * made scrolling feel slow. Pausing is invisible by definition (the reader cannot see what is off
 * their screen) and the animation resumes exactly where it left off, so nothing about the look or
 * the speed changes. The margin is generous so nothing is ever caught mid-resume on entry.
 */
function usePauseOffscreenAnimations() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".ps-marquee, .ps-cube-scene, .ps-goldcube"),
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle("ps-anim-paused", !e.isIntersecting);
        }
      },
      { rootMargin: "300px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function PsRevealInit() {
  usePauseOffscreenAnimations();

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
