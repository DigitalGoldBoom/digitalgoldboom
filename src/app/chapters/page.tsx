import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VaultShell from "@/components/VaultShell";
import { generateMetadata as genMeta } from "@/lib/seo";
import Reveal from "./_components/Reveal";
import { HERO, SECTIONS, CLOSING, type Chapter } from "./chapters-content";

/* /chapters — the chapter-summary page: what is inside the book, chapter by chapter, and how the
   chapters connect.

   THE IDEA: the book's own front matter says the chapters are a CHAIN — "each one answers the
   question the chapter before it raised, then raises the next". So the page is built as a chain: a
   gold thread runs down its full length, every chapter hangs off it, and the author's own handoff
   question is printed ON the thread between one chapter and the next. Scrolling the page is
   walking the argument.

   ALL COPY AND IMAGES LIVE IN ./chapters-content.ts — edit there, not here.

   NOT PUBLIC YET: this page is gated by CHAPTERS_LIVE (src/lib/flags.ts) — no navbar link, not in
   the sitemap, and noindex below. Reachable by direct link so it can be reviewed on the real site.
   Flipping the flag on means also removing the robots override here and adding /chapters to the
   sitemap; the flag file spells that out. */

export const metadata: Metadata = {
  ...genMeta({
    title: "The Chapters — Digital Gold Boom",
    description:
      "All seventeen chapters of Digital Gold Boom, and how each one answers the question the chapter before it raised. Twenty-two trillion dollars of gold sits verified in the ground; this is the case for reaching it without a mine.",
    path: "/chapters",
  }),
  // Hidden while the page is being finished. Remove when CHAPTERS_LIVE goes true.
  robots: { index: false, follow: false },
};

/* ── one chapter ──────────────────────────────────────────────────────────── */

function ChapterRow({ ch }: { ch: Chapter }) {
  // Odd chapters: picture on the right. Even: picture on the left. On phone/tablet the picture is
  // always first — a reader scrolling a narrow screen should meet the image, then the words.
  const pictureRight = ch.n % 2 === 1;

  return (
    <article
      id={`ch-${String(ch.n).padStart(2, "0")}`}
      className="chp-row scroll-mt-28 grid grid-cols-1 items-center gap-8 py-14 md:py-20 lg:grid-cols-2 lg:gap-16"
    >
      {/* PICTURE */}
      <Reveal className={pictureRight ? "lg:order-2" : "lg:order-1"}>
        <figure className="chp-frame">
          <Image
            src={ch.image}
            alt={ch.alt}
            width={1600}
            height={1073}
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="chp-img"
          />
          <span aria-hidden className="chp-frame-num">
            {String(ch.n).padStart(2, "0")}
          </span>
        </figure>
      </Reveal>

      {/* WORDS */}
      <Reveal delay={90} className={pictureRight ? "lg:order-1" : "lg:order-2"}>
        {/* 52ch is the reading measure once the row is two columns. Below that the row is a single
            column and the same cap would leave a dead gutter beside the text, so it opens up. */}
        <div className="max-w-[62ch] lg:max-w-[52ch]">
          <p className="chp-eyebrow">Chapter {String(ch.n).padStart(2, "0")}</p>

          <h3
            className="v2-display mt-4"
            style={{ fontSize: "clamp(1.55rem, 2.9vw, 2.35rem)" }}
          >
            {ch.title}
          </h3>

          {ch.claim && (
            <p className="chp-claim mt-6">{ch.claim}</p>
          )}

          <p
            className="mt-6 leading-relaxed"
            style={{ color: "var(--v2-dim)", fontSize: "1.0125rem" }}
          >
            {ch.summary}
          </p>
        </div>
      </Reveal>
    </article>
  );
}

/* ── the link in the chain between two chapters ───────────────────────────── */

function Handoff({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="chp-handoff">
        <span aria-hidden className="chp-node" />
        <p>
          <span aria-hidden className="chp-arrow">
            &rarr;
          </span>{" "}
          {text}
        </p>
      </div>
    </Reveal>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

export default function ChaptersPage() {
  return (
    <VaultShell>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[860px] px-6 text-center">
          <p className="v2-eyebrow mb-7 justify-center">{HERO.eyebrow}</p>
          <h1
            className="v2-display mx-auto"
            style={{ fontSize: "clamp(2.3rem, 5.4vw, 4rem)", maxWidth: "16ch" }}
          >
            {HERO.headline}{" "}
            <span className="v2-gold">{HERO.headlineGold}</span>
          </h1>
          <p
            className="mx-auto mt-8 max-w-[62ch] text-lg leading-relaxed"
            style={{ color: "var(--v2-dim)" }}
          >
            {HERO.standfirst}
          </p>
          <p
            className="mx-auto mt-5 max-w-[62ch] leading-relaxed"
            style={{ color: "var(--v2-faint)" }}
          >
            {HERO.chainNote}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/buy" className="v2-btn">
              Get the book &rarr;
            </Link>
            <Link href="/free" className="v2-btn-ghost">
              Read 5 chapters free
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE CHAIN ──────────────────────────────────────────── */}
      <div className="chp-chain relative mx-auto w-full max-w-[1180px] px-6 pb-8 md:px-10">
        {SECTIONS.map((section, si) => (
          <section key={section.id} id={section.id}>
            {/* section header */}
            <Reveal>
              <header className="chp-sect relative py-20 text-center md:py-28">
                <span aria-hidden className="chp-sect-ghost">
                  {si + 1}
                </span>
                <p className="v2-eyebrow relative justify-center">{section.label}</p>
                <h2
                  className="v2-display relative mx-auto mt-6"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", maxWidth: "20ch" }}
                >
                  {section.title}
                </h2>
                <p
                  className="relative mx-auto mt-7 max-w-[64ch] leading-relaxed"
                  style={{ color: "var(--v2-dim)" }}
                >
                  {section.intro}
                </p>
              </header>
            </Reveal>

            {/* chapters + the handoff question between each */}
            {section.chapters.map((ch) => (
              <div key={ch.n}>
                <ChapterRow ch={ch} />
                {ch.handoff && <Handoff text={ch.handoff} />}
              </div>
            ))}

            {/* end of Section 1 — the one place the reader is offered the book mid-page */}
            {si === 0 && (
              <Reveal>
                <div className="chp-mid">
                  <p className="chp-mid-h v2-display">The case is made by Chapter 8.</p>
                  <p className="chp-mid-p">
                    The other nine chapters open the machine and show you it working.
                  </p>
                  <Link href="/buy" className="v2-btn mt-6 inline-flex">
                    Get the book &rarr;
                  </Link>
                </div>
              </Reveal>
            )}
          </section>
        ))}

        {/* the chain ends */}
        <Reveal>
          <div className="chp-end">
            <span aria-hidden className="chp-node" />
            <p>{CLOSING}</p>
          </div>
        </Reveal>
      </div>

      {/* ── CLOSING CTA ────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[720px] px-6 pb-28 pt-8 text-center md:pb-36">
        <div
          className="rounded-[24px] p-8 md:p-12"
          style={{
            border: "1px solid rgba(232,178,58,0.3)",
            background: "rgba(255,255,255,0.018)",
          }}
        >
          <h2
            className="v2-display mx-auto"
            style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)", maxWidth: "18ch" }}
          >
            Read the whole case, <span className="v2-gold">start to finish.</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-[52ch] leading-relaxed"
            style={{ color: "var(--v2-dim)" }}
          >
            Seventeen chapters. Every figure sourced to a primary record you can check yourself.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/buy" className="v2-btn">
              Get the book &rarr;
            </Link>
            <Link href="/free" className="v2-btn-ghost">
              Read 5 chapters free
            </Link>
          </div>
        </div>
      </section>
    </VaultShell>
  );
}
