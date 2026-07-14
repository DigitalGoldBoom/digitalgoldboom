"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * CountUp — animates 0 → value when it enters the viewport (once).
 * Reduced motion: renders the final value immediately.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => prefix + Math.round(n).toLocaleString("en-US") + suffix;

    if (prefersReducedMotion()) {
      el.textContent = fmt(value);
      return;
    }
    el.textContent = fmt(0);

    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting) || done.current) return;
        done.current = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix, duration]);

  return <span ref={ref} className={className} />;
}
