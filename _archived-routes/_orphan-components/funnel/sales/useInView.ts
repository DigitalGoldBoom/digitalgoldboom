"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useInView — fires once when the element crosses `threshold` into view.
 * Under prefers-reduced-motion it reports `true` immediately (final state, no animation),
 * so every visual built on it is reduced-motion-safe by construction.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
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

  return { ref, inView };
}
