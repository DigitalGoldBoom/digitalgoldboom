"use client";

import { useEffect, type RefObject } from "react";
import { track } from "@vercel/analytics";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * Shared micro-hooks for the /new cold page.
 *
 * Discipline (playbook §1.1): the AUTHORED state is always the finished one —
 * thread segments drawn, rules full-width, icons complete. These hooks hide
 * from JS on mount and reveal on entry, so no-JS and reduced-motion visitors
 * get the complete page with zero flash.
 */

/** Draw-on-enter for [data-draw] elements inside a scope.
 *  data-draw="stroke"  → SVG path draw (pathLength=1 dash trick)
 *  data-draw="scaleX"  → horizontal rule draw
 *  data-draw="scaleY"  → vertical thread draw
 */
export function useDrawOnEnter<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  { duration = 0.6, stagger = 0.08 }: { duration?: number; stagger?: number } = {},
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReducedMotion()) return;

    const els = Array.from(scope.querySelectorAll<HTMLElement | SVGElement>("[data-draw]"));
    if (els.length === 0) return;

    // Already on screen at first paint → leave it drawn (never hide painted content).
    if (scope.getBoundingClientRect().top < window.innerHeight) return;

    const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    els.forEach((el) => {
      const mode = el.getAttribute("data-draw");
      const s = (el as HTMLElement).style;
      if (mode === "stroke") {
        s.strokeDashoffset = "1";
        s.transition = `stroke-dashoffset ${duration}s ${ease}`;
      } else {
        s.transform = mode === "scaleX" ? "scaleX(0)" : "scaleY(0)";
        s.transition = `transform ${duration}s ${ease}`;
      }
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        els.forEach((el, i) => {
          const s = (el as HTMLElement).style;
          s.transitionDelay = `${(i * stagger).toFixed(3)}s`;
          if (el.getAttribute("data-draw") === "stroke") s.strokeDashoffset = "0";
          else s.transform = "none";
        });
        obs.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    io.observe(scope);
    return () => io.disconnect();
  }, [scopeRef, duration, stagger]);
}

/** Fire ONE analytics event when the element becomes ~half visible (CTA views,
 *  scroll checkpoints). */
export function useViewPing<T extends HTMLElement>(
  ref: RefObject<T | null>,
  event: string,
  props: Record<string, string>,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        track(event, props);
        obs.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
    // props is a fresh object per render; the event name is the identity here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
}
