import type { Metadata } from "next";
import ShortFunnel from "./ShortFunnel";

/**
 * /s — the SHORT sales-funnel page for cold social traffic (single screen).
 * Split-tested against /v1. Root (/) is untouched and still renders /v2.
 *
 * noindex: A/B test variant — kept out of search so it doesn't compete with / .
 */
export const metadata: Metadata = {
  title: "Digital Gold Boom — It's not gold. It's not bitcoin.",
  description:
    "A real change is underway in how the world's oldest asset works — verify gold and represent its value digitally, without mining it out. The $37 book, in plain English, by Andrew Fletcher.",
  robots: { index: false, follow: false },
};

export default function ShortPage() {
  return <ShortFunnel />;
}
