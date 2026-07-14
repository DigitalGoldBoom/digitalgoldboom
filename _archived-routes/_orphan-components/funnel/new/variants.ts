/**
 * Message-match hero variants (copy file §MESSAGE-MATCH HERO VARIANTS).
 * Keyed by ?v= UTM param; CTA block identical across all three.
 * The variant tag rides on every tracked event (context in props, never in names).
 */

export type ColdVariantKey = "v1" | "v2" | "v3";

export type ColdVariant = {
  key: ColdVariantKey;
  /** Headline pre-split into its two mask-reveal lines. */
  lines: [string, string];
  subhead: string;
};

export const COLD_VARIANTS: Record<ColdVariantKey, ColdVariant> = {
  v1: {
    key: "v1",
    lines: ["It’s not gold.", "It’s not bitcoin."],
    subhead:
      "A new industry is being built around the world’s oldest asset — and almost no one has heard of it yet. One book explains the whole thing in plain English, by someone who ran a gold company inside it.",
  },
  v2: {
    key: "v2",
    lines: ["A billion dollars —", "for gold still in the ground."],
    subhead:
      "In 2025, half of one verified Alaskan gold deposit sold for $1 billion in cash — with no mine built on it and nothing in production. This book explains why that price made sense, and what it starts.",
  },
  v3: {
    key: "v3",
    lines: ["A $10 billion mine.", "Gone in 39 days."],
    subhead:
      "The old way of producing gold is breaking down — and a second road has opened. This book explains both, start to finish, in plain English.",
  },
};

export function resolveVariant(v: string | undefined): ColdVariant {
  if (v === "2" || v === "v2") return COLD_VARIANTS.v2;
  if (v === "3" || v === "v3") return COLD_VARIANTS.v3;
  return COLD_VARIANTS.v1;
}
