"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

type CountUpOptions = {
  from?: number;
  to: number;
  duration?: number;
  format?: (value: number) => string;
  start?: string;
  ease?: string;
};

export function useCountUp<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: CountUpOptions,
) {
  const {
    from = 0,
    to,
    duration = 1.6,
    format = (n: number) => Math.round(n).toLocaleString(),
    start = "top 75%",
    ease = "power2.out",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = format(to);
      return;
    }

    // If the number is already on screen at first paint, just show the FINAL value — don't reset
    // it to the start value (that server "$22T" → "$0T" reset is the "flickers once on load" bug).
    // The count-up animation still plays when you scroll down INTO it from above (the common case).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.textContent = format(to);
      return;
    }

    const counter = { value: from };
    let last = format(from);
    el.textContent = last;

    const tween = gsap.to(counter, {
      value: to,
      duration,
      ease,
      onUpdate: () => {
        // Only write to the DOM when the DISPLAYED string actually changes. At integer display
        // that's ~N writes across the whole animation instead of ~60/sec — so a big number stops
        // re-laying-out its text every frame (the "jolty $22T" cause), while looking identical.
        const s = format(counter.value);
        if (s !== last) {
          last = s;
          el.textContent = s;
        }
      },
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
      immediateRender: false,
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [ref, from, to, duration, format, start, ease]);
}
