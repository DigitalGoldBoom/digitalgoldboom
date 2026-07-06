"use client";

import { useRef } from "react";
import { useDrawOnEnter } from "./hooks";

/**
 * ThreadSegment — one link of the page's gold spine: a 1.5px vertical gold
 * line that draws downward as it enters view, connecting section to section
 * (the house gold-thread signature). Authored drawn; hidden only from JS.
 */
export default function ThreadSegment({ height = 96 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useDrawOnEnter(ref, { duration: 0.8 });
  return (
    <div ref={ref} aria-hidden className="cold-wrap">
      <div className="cold-thread" data-draw="scaleY" style={{ height }} />
    </div>
  );
}
