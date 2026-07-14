import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";
import Reveal from "../chapters/_components/Reveal";
import { HERO, SECTIONS, CLOSING, ALL_CHAPTERS, type Chapter } from "../chapters/chapters-content";
import ChapterRail from "./_components/ChapterRail";

/* /chapters2 — DESIGN OPTION B: "The Prospectus".
   ----------------------------------------------------------------------------
   Same seventeen chapters, same words, same pictures as /chapters — they all read from the one
   content file (src/app/chapters/chapters-content.ts). Only the design differs.

   The register here is the Series-B institutional deck: a SOLID ink canvas (the site's gold
   shimmer is deliberately covered — that was the note), a Swiss two-column grid, a sticky index
   rail that tracks where you are, hairlines instead of boxes, mono labels, and one enormous
   ghosted numeral per chapter. Nothing floats, nothing glows, nothing is translucent. The
   confidence comes from the grid and the restraint, not from effects.

   NOT PUBLIC: noindex, no navbar link, not in the sitemap. A review page. */

export const metadata: Metadata = {
  ...genMeta({
    title: "The Chapters (Option B) — Digital Gold Boom",
    description: "Design option B for the chapter-summary page.",
    path: "/chapters2",
  }),
  robots: { index: false, follow: false },
};

function ChapterBlock({ ch }: { ch: Chapter }) {
  return (
    <article id={`c2-ch-${ch.n}`} className="c2-block scroll-mt-24">
      <Reveal>
        {/* head: mono label, hairline, ghost numeral */}
        <div className="c2-head">
          <span className="c2-label">Chapter {String(ch.n).padStart(2, "0")}</span>
          <span className="c2-rule" aria-hidden />
          <span className="c2-ghost" aria-hidden>
            {String(ch.n).padStart(2, "0")}
          </span>
        </div>

        <h3 className="c2-title">{ch.title}</h3>

        {ch.claim && <p className="c2-claim">{ch.claim}</p>}

        <div className="c2-grid">
          <figure className="c2-figure">
            <Image
              src={ch.image}
              alt={ch.alt}
              width={1600}
              height={1073}
              sizes="(max-width: 900px) 92vw, 46vw"
              className="c2-img"
            />
          </figure>
          <p className="c2-summary">{ch.summary}</p>
        </div>
      </Reveal>

      {ch.handoff && (
        <Reveal>
          <div className="c2-handoff">
            <span className="c2-handoff-label">Hands forward</span>
            <p>{ch.handoff}</p>
          </div>
        </Reveal>
      )}
    </article>
  );
}

export default function Chapters2Page() {
  return (
    <div className="c2">
      {/* the solid canvas — sits over the site's shimmer field, so this page reads as ink */}
      <div className="c2-canvas" aria-hidden />

      <div className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="c2-hero">
          <div className="c2-wrap">
            <p className="c2-label">{HERO.eyebrow}</p>
            <h1 className="c2-h1">
              {HERO.headline}
              <br />
              <span className="c2-gold">{HERO.headlineGold}</span>
            </h1>

            <div className="c2-hero-grid">
              <p className="c2-standfirst">{HERO.standfirst}</p>
              <div>
                <p className="c2-chainnote">{HERO.chainNote}</p>
                <div className="c2-cta-row">
                  <Link href="/buy" className="c2-btn">
                    Get the book
                  </Link>
                  <Link href="/free" className="c2-btn-ghost">
                    Read 5 chapters free
                  </Link>
                </div>
              </div>
            </div>

            {/* the deck-style fact strip */}
            <dl className="c2-facts">
              <div>
                <dt>Chapters</dt>
                <dd>{ALL_CHAPTERS.length}</dd>
              </div>
              <div>
                <dt>Sections</dt>
                <dd>{SECTIONS.length}</dd>
              </div>
              <div>
                <dt>The claim</dt>
                <dd className="c2-fact-text">Gold&rsquo;s value is breaking free of extraction.</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── BODY: sticky index rail + the chapters ────────── */}
        <div className="c2-wrap c2-body">
          <ChapterRail sections={SECTIONS} />

          <main className="c2-col">
            {SECTIONS.map((section, si) => (
              <section key={section.id} id={`c2-${section.id}`} className="scroll-mt-24">
                <Reveal>
                  <header className="c2-sect">
                    <p className="c2-label">{section.label}</p>
                    <h2 className="c2-sect-title">{section.title}</h2>
                    <p className="c2-sect-intro">{section.intro}</p>
                  </header>
                </Reveal>

                {section.chapters.map((ch) => (
                  <ChapterBlock key={ch.n} ch={ch} />
                ))}

                {si === 0 && (
                  <Reveal>
                    <div className="c2-mid">
                      <p className="c2-mid-h">The case is made by Chapter 8.</p>
                      <p className="c2-mid-p">
                        The other nine chapters open the machine and show you it working.
                      </p>
                      <Link href="/buy" className="c2-btn">
                        Get the book
                      </Link>
                    </div>
                  </Reveal>
                )}
              </section>
            ))}

            <Reveal>
              <p className="c2-closing">{CLOSING}</p>
            </Reveal>

            {/* ── CLOSING CTA ──────────────────────────────── */}
            <Reveal>
              <section className="c2-end">
                <h2 className="c2-end-h">
                  Read the whole case, <span className="c2-gold">start to finish.</span>
                </h2>
                <p className="c2-end-p">
                  Seventeen chapters. Every figure sourced to a primary record you can check
                  yourself.
                </p>
                <div className="c2-cta-row">
                  <Link href="/buy" className="c2-btn">
                    Get the book
                  </Link>
                  <Link href="/free" className="c2-btn-ghost">
                    Read 5 chapters free
                  </Link>
                </div>
              </section>
            </Reveal>
          </main>
        </div>
      </div>
    </div>
  );
}
