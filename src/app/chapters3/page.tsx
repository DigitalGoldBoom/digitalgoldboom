import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";
import { HERO, SECTIONS, CLOSING, ALL_CHAPTERS } from "../chapters/chapters-content";
import SplitScroller from "./_components/SplitScroller";

/* /chapters3 — DESIGN OPTION C: "The Pinned Film".
   ----------------------------------------------------------------------------
   Same seventeen chapters, same words, same pictures as /chapters and /chapters2 — all three read
   from the one content file (src/app/chapters/chapters-content.ts). Only the design differs.

   Where option A is a chain and option B is a document, option C is a FILM: the picture is pinned
   to one half of the screen and the argument runs past it. Each chapter's picture cross-fades in
   as its words arrive, the numeral flips, and a gold bar tracks how far through the seventeen you
   are. Solid ink canvas, no shimmer. The reader is watching, not browsing.

   NOT PUBLIC: noindex, no navbar link, not in the sitemap. A review page. */

export const metadata: Metadata = {
  ...genMeta({
    title: "The Chapters (Option C) — Digital Gold Boom",
    description: "Design option C for the chapter-summary page.",
    path: "/chapters3",
  }),
  robots: { index: false, follow: false },
};

export default function Chapters3Page() {
  return (
    <div className="c3">
      {/* solid canvas — covers the site's shimmer field */}
      <div className="c3-canvas" aria-hidden />

      <div className="relative z-10">
        {/* ── HERO: one full screen, nothing but the claim ──── */}
        <section className="c3-hero">
          <div className="c3-hero-inner">
            <p className="c3-kicker">{HERO.eyebrow}</p>
            <h1 className="c3-h1">
              {HERO.headline}
              <br />
              <span className="c3-gold">{HERO.headlineGold}</span>
            </h1>
            <p className="c3-standfirst">{HERO.standfirst}</p>
            <div className="c3-cta-row">
              <Link href="/buy" className="c3-btn">
                Get the book
              </Link>
              <Link href="/free" className="c3-btn-ghost">
                Read 5 chapters free
              </Link>
            </div>
            <p className="c3-scroll-cue">
              <span aria-hidden>&darr;</span> {ALL_CHAPTERS.length} chapters, in the order they
              were built
            </p>
          </div>
        </section>

        {/* ── THE FILM ───────────────────────────────────────── */}
        <SplitScroller sections={SECTIONS} />

        {/* ── CLOSE ──────────────────────────────────────────── */}
        <section className="c3-end">
          <p className="c3-closing">{CLOSING}</p>
          <h2 className="c3-end-h">
            Read the whole case, <span className="c3-gold">start to finish.</span>
          </h2>
          <div className="c3-cta-row c3-cta-center">
            <Link href="/buy" className="c3-btn">
              Get the book
            </Link>
            <Link href="/free" className="c3-btn-ghost">
              Read 5 chapters free
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
