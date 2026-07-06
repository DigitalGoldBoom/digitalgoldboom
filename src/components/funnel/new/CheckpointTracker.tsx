"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import type { ColdVariantKey } from "./variants";

/**
 * Scroll checkpoints for the funnel report: fires once per section as the
 * reader reaches S3 / S5 / S7 / S9 (taxonomy per dgb-conversion-analytics —
 * context in props, never in names).
 */
const CHECKPOINTS: [string, string][] = [
  ["cold-s3", "s_scroll_s3"],
  ["cold-s5", "s_scroll_s5"],
  ["cold-s7", "s_scroll_s7"],
  ["cold-s9", "s_scroll_s9"],
];

export default function CheckpointTracker({ variant }: { variant: ColdVariantKey }) {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const [id, event] of CHECKPOINTS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const io = new IntersectionObserver(
        (entries, obs) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          track(event, { page: "new", variant });
          obs.disconnect();
        },
        { threshold: 0.25 },
      );
      io.observe(el);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [variant]);

  return null;
}
