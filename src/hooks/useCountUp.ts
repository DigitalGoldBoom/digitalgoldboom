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

    const counter = { value: from };
    el.textContent = format(from);

    const tween = gsap.to(counter, {
      value: to,
      duration,
      ease,
      onUpdate: () => {
        el.textContent = format(counter.value);
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
