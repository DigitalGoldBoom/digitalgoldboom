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
  ariaLabel,
  staticFirst = false,
}: {
  start: number;
  end: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Screen readers hear this final value once — never the intermediate ticks. */
  ariaLabel?: string;
  /** Render the FINAL value on SSR/no-JS (static state carries the meaning);
      the count-up still runs from `start` when scrolled into view. */
  staticFirst?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(staticFirst ? end : start);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      // Reduced motion: no ticking — jump straight to the final value.
      if (reduceMotion) {
        setValue(end);
        return;
      }
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

  const body = (
    <>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </>
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ ...style, fontVariantNumeric: "tabular-nums" }}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {ariaLabel ? <span aria-hidden="true">{body}</span> : body}
    </span>
  );
}
