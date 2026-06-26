"use client";

import { useEffect, useRef, useState } from "react";

/**
 * NumberCounter — count-up animation that fires when scrolled into view.
 * Mirrors the Framer "NumberCounter" component used on the token-launch cards.
 */
export default function NumberCounter({
  start,
  end,
  prefix = "",
  suffix = "",
  durationMs = 1600,
  className,
  style,
}: {
  start: number;
  end: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(start);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(end);
      return;
    }

    let raf = 0;
    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(Math.round(start + (end - start) * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) run();
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [start, end, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
