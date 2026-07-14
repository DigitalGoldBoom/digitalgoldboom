"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BookSection } from "../../chapters/chapters-content";

/**
 * SplitScroller — the mechanic of /chapters3.
 *
 * One pane is PINNED (the picture); the other pane SCROLLS (the argument). As each chapter's text
 * enters the reading band, its picture cross-fades into the pinned pane and the big numeral flips
 * over. The reader never leaves the picture — the book changes it for them. A thin gold progress
 * bar across the top of the pinned pane shows how far through the seventeen you are.
 *
 * Below the split breakpoint there is no room to pin anything, so the layout becomes full-bleed
 * cinematic cards — the picture behind the words — rather than a squashed two-column.
 *
 * All seventeen pictures are mounted once and cross-faded with opacity (never re-mounted, never
 * re-fetched). The first two load eagerly; the rest are lazy, so the pane is cheap to arrive at.
 */
export default function SplitScroller({ sections }: { sections: BookSection[] }) {
  const chapters = sections.flatMap((s) => s.chapters);
  const [active, setActive] = useState(chapters[0].n);
  const storyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // which chapter the reader is on → drives the pinned picture
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-ch]"));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(Number(hit.target.getAttribute("data-ch")));
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: 0 },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  // progress through the seventeen. rAF-throttled so the scroll thread stays clean.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = storyRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const done = total > 0 ? (-r.top) / total : 0;
        setProgress(Math.min(1, Math.max(0, done)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const activeCh = chapters.find((c) => c.n === active) ?? chapters[0];

  return (
    <div className="c3-split">
      {/* ── PINNED PANE ────────────────────────────────────── */}
      <aside className="c3-pin" aria-hidden>
        <div className="c3-stage">
          {chapters.map((ch, i) => (
            <Image
              key={ch.n}
              src={ch.image}
              alt=""
              fill
              sizes="50vw"
              priority={i < 2}
              className={`c3-stage-img ${ch.n === active ? "is-on" : ""}`}
            />
          ))}
          <div className="c3-stage-veil" />

          <div className="c3-stage-meta">
            <span className="c3-stage-num">{String(activeCh.n).padStart(2, "0")}</span>
            <span className="c3-stage-of">/ {String(chapters.length).padStart(2, "0")}</span>
          </div>

          <div className="c3-bar">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </aside>

      {/* ── SCROLLING PANE ─────────────────────────────────── */}
      <div className="c3-story" ref={storyRef}>
        {sections.map((section, si) => (
          <section key={section.id}>
            <header className="c3-sect">
              <p className="c3-kicker">{section.label}</p>
              <h2 className="c3-sect-title">{section.title}</h2>
              <p className="c3-sect-intro">{section.intro}</p>
            </header>

            {section.chapters.map((ch) => (
              <article key={ch.n} data-ch={ch.n} className="c3-ch">
                {/* the picture, in the flow — phone/tablet only, where nothing can be pinned */}
                <figure className="c3-ch-fig">
                  <Image
                    src={ch.image}
                    alt={ch.alt}
                    width={1600}
                    height={1073}
                    sizes="92vw"
                    className="c3-ch-img"
                  />
                  <figcaption>{String(ch.n).padStart(2, "0")}</figcaption>
                </figure>

                <p className="c3-kicker">Chapter {String(ch.n).padStart(2, "0")}</p>
                <h3 className="c3-ch-title">{ch.title}</h3>
                {ch.claim && <p className="c3-ch-claim">{ch.claim}</p>}
                <p className="c3-ch-summary">{ch.summary}</p>

                {ch.handoff && (
                  <p className="c3-ch-handoff">
                    <span aria-hidden>&darr;</span> {ch.handoff}
                  </p>
                )}
              </article>
            ))}

            {si === 0 && (
              <div className="c3-mid">
                <p className="c3-mid-h">The case is made by Chapter 8.</p>
                <p className="c3-mid-p">
                  The other nine chapters open the machine and show you it working.
                </p>
                <Link href="/buy" className="c3-btn">
                  Get the book
                </Link>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
