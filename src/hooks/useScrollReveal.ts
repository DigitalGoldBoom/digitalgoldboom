"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  ease?: string;
  delay?: number;
  once?: boolean;
};

export function useScrollReveal<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  options: RevealOptions = {},
) {
  const {
    selector = "[data-reveal]",
    y = 28,
    stagger = 0.12,
    duration = 0.9,
    start = "top 82%",
    ease = "power3.out",
    delay = 0,
    once = true, // play once and STAY — no reverse-on-scroll-out (that caused the jolty feel)
  } = options;

  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const elements = scope.querySelectorAll(selector);
    if (elements.length === 0) return;

    if (prefersReducedMotion()) {
      elements.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const tween = gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        delay,
        scrollTrigger: {
          trigger: scope,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
        // Keep immediateRender false so content is NEVER stuck hidden if a trigger misfires
        // (a blank section is worse than a small reveal). The jolt is mostly killed by once:true
        // above (no reverse/re-animate on scroll-out) + the fonts.ready refresh.
        immediateRender: false,
      },
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [scopeRef, selector, y, stagger, duration, start, ease, delay, once]);

  return triggerRef;
}
