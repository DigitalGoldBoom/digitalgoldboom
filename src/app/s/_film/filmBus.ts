import { track } from "@vercel/analytics";

/**
 * filmBus — tiny page-local store for the /s film page.
 * One WorldDriver writes here every scrubbed frame; the dust field and the
 * seam read from it without touching React state (zero re-renders on scroll).
 * Also carries the section-reach tracker (over_section for the sticky CTA)
 * and the "a panel has sound on" flag the sticky pill hides behind.
 */

type Listener = (daylight: number, seam: number) => void;

const listeners = new Set<Listener>();

export const world = {
  daylight: 0.35,
  seam: 0,
};

export function onWorldUpdate(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setWorld(daylight: number, seam: number) {
  world.daylight = daylight;
  world.seam = seam;
  for (const fn of listeners) fn(daylight, seam);
}

/* ── Section reach (taxonomy: `<section>_view`, fired once each) ── */

export const SECTION_TOKENS = [
  "hero",
  "trillion",
  "who_built",
  "why_now",
  "inside",
  "author",
  "close",
] as const;
export type SectionToken = (typeof SECTION_TOKENS)[number];

const seen = new Set<SectionToken>();
let current: SectionToken = "hero";

export function sectionReached(token: SectionToken) {
  current = token;
  if (seen.has(token)) return;
  seen.add(token);
  track(`${token}_view`);
}

export function currentSection(): SectionToken {
  return current;
}

/* ── Sound-on panels (the sticky pill hides while one is active+visible) ── */

const soundOnVisible = new Set<string>();
const soundListeners = new Set<(any_: boolean) => void>();

export function setPanelSoundVisible(module: string, on: boolean) {
  if (on) soundOnVisible.add(module);
  else soundOnVisible.delete(module);
  const active = soundOnVisible.size > 0;
  for (const fn of soundListeners) fn(active);
}

export function onPanelSound(fn: (active: boolean) => void): () => void {
  soundListeners.add(fn);
  return () => soundListeners.delete(fn);
}
