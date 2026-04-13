"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function ScrollTracker() {
  useEffect(() => {
    let fired = false;

    function onScroll() {
      if (fired) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      const pct = window.scrollY / max;
      if (pct >= 0.75) {
        fired = true;
        track("scroll_depth_75");
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
