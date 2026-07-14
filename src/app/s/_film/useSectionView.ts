"use client";

import { useEffect, useRef } from "react";
import { sectionReached, type SectionToken } from "./filmBus";

/**
 * useSectionView — section-reach instrumentation (taxonomy: `<section>_view`,
 * once each). On a section-built page this IS the scroll-depth system; it also
 * feeds over_section to the sticky pill. Fires when the section overlaps the
 * MIDDLE BAND of the viewport (rootMargin -40%/-40%) — a plain ratio threshold
 * can never fire on sections taller than the viewport (100svh hero, pins).
 */
export function useSectionView(token: SectionToken) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) sectionReached(token);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [token]);

  return ref;
}
