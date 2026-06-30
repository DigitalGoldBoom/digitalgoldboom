'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Final numeric value to animate to. */
  value: number;
  /** Formats the (animating) number into display text. */
  format: (n: number) => string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * CountUp — isolated leaf client component that animates a number from 0 to
 * `value` on first scroll-into-view, then holds. Respects prefers-reduced-motion
 * (renders the final value instantly) and SSRs the final value so no-JS visitors
 * and crawlers always see the real figure. rAF only; no parent re-renders.
 */
export default function CountUp({ value, format, durationMs = 1100, className, style }: Props) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // SSR / no-JS already shows the real `value` (initial state); reduced-motion
    // keeps it. We only ever mutate state inside async callbacks (rAF / observer),
    // never synchronously in the effect body.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(p < 1 ? value * eased : value);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !started.current) {
              started.current = true;
              setDisplay(0);
              run();
              io.disconnect();
            }
          }
        },
        { threshold: 0.35 },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf);
      };
    }

    started.current = true;
    run();
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {format(display)}
    </span>
  );
}
