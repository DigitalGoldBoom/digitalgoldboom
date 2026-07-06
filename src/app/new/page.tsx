import type { Metadata } from "next";
import ColdPage from "./ColdPage";
import { resolveVariant } from "@/components/funnel/new/variants";
import "./cold.css";

/**
 * /new — the cold-traffic TEXT-ONLY sales page ("the descent to the proof").
 * Copy: web/SALES-COPY-COLD-2026-07-06.md (PASS 95/100, gate clean).
 * Design: web/SALES-DESIGN-BRIEF-COLD-2026-07-06.md.
 * ONE product: the book at $37 early-reader (regular $97) via LemonSqueezy.
 *
 * noindex: the copy's 23 flagged numbers have not been through
 * dgb-fact-verifier yet — indexing is the author's call at launch
 * (same rule as /s). Message-match hero variants ride on ?v= (v1/v2/v3).
 */
export const metadata: Metadata = {
  title: "Digital Gold Boom — It's not gold. It's not bitcoin.",
  description:
    "A new industry is being built around the world's oldest asset — and almost no one has heard of it yet. One book explains the whole thing in plain English, by someone who ran a gold company inside it. Educational — not financial advice.",
  robots: { index: false, follow: false },
};

export default async function NewColdPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  return <ColdPage variant={resolveVariant(v)} />;
}
