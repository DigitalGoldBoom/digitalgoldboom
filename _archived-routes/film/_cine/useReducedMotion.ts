"use client";

import { useSyncExternalStore } from "react";

/**
 * useReducedMotion — live subscription to prefers-reduced-motion.
 * SSR snapshot is false; the client snapshot corrects on hydration.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
