"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveal — the house "reveal-on-scroll" motion for the /v1 + /s sales funnel.
 *
 * Each block fades up (translateY 16px -> 0, opacity 0 -> 1), 500ms,
 * cubic-bezier(0.22,0.61,0.36,1), triggered at ~15% in view via a shared
 * IntersectionObserver, and runs ONCE per element. An optional `delay` staggers
 * children (the spec asks for ~60ms per child).
 *
 * prefers-reduced-motion: the element renders in its FINAL state immediately —
 * no transform, no fade. SSR also renders the final state, so there is zero CLS
 * and the content is always present for crawlers / no-JS.
 */
export default function Reveal({
  children,
  as,
  className,
  style,
  delay = 0,
  y = 16,
  threshold = 0.15,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** stagger in ms */
  delay?: number;
  /** travel distance in px */
  y?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  // Start "shown" so SSR/no-JS/reduced-motion all render the final state.
  const [shown, setShown] = useState(true);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    // If the element is already on screen at load (e.g. the hero / LCP), DON'T hide it —
    // leave it painted so there's no flash and the LCP is never gated behind an animation.
    // Only content below the fold gets the hide-then-reveal-on-scroll treatment.
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.9;
    if (alreadyInView) {
      setShown(true);
      return;
    }

    // Below the fold + motion allowed: hide, then reveal on intersect.
    setShown(false);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return createElement(
    Tag,
    {
      ref,
      className,
      style: {
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 500ms cubic-bezier(0.22,0.61,0.36,1) ${delay}ms, transform 500ms cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
        willChange: shown ? "auto" : "opacity, transform",
      },
    },
    children,
  );
}
