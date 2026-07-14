import type { Metadata } from "next";
import SalesFilm from "./SalesFilm";
import "./film.css";

/**
 * /s — the VIDEO-LED sales page for cold social traffic ("the page is the
 * film"): seven sections, four chaptered video modules (placeholders until the
 * masters ship), one product — the book at $37 via LemonSqueezy.
 * Root (/) is untouched and still renders /v2.
 *
 * noindex: A/B variant + copy not yet fact-verified — indexing is the author's
 * call at launch (with dgb-seo-llm). VideoObject schema is added ONLY when the
 * real video files ship.
 */
export const metadata: Metadata = {
  title: "Digital Gold Boom — It's not gold. It's not bitcoin.",
  description:
    "A new industry is being built around the world's oldest asset — verified, in-ground gold represented digitally, without mining it out. The two-minute video explains the model; the $37 book tells the whole story, in plain English, by Andrew Fletcher. Educational — not financial advice.",
  robots: { index: false, follow: false },
};

export default function ShortPage() {
  return <SalesFilm />;
}
