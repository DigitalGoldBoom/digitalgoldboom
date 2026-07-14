"use client";

import { useEffect, useState } from "react";
import type { BookSection } from "../../chapters/chapters-content";

/**
 * ChapterRail — the sticky index down the left of /chapters2.
 *
 * Desktop only (it is hidden by CSS below the two-column breakpoint). It lists all seventeen
 * chapters as mono numerals, marks the one you are reading, and jumps to any of them. The active
 * chapter is tracked with a single IntersectionObserver over the chapter blocks rather than a
 * scroll listener — no work happens on the scroll thread at all.
 */
export default function ChapterRail({ sections }: { sections: BookSection[] }) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(".c2-block"));
    if (!blocks.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // The chapter whose block occupies the reading band nearest the top wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const n = Number(visible.target.id.replace("c2-ch-", ""));
        if (n) setActive(n);
      },
      // A band across the upper-middle of the viewport: what the eye is actually on.
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="c2-rail" aria-label="Chapters">
      {sections.map((s) => (
        <div key={s.id} className="c2-rail-sect">
          <p className="c2-rail-label">{s.label}</p>
          <ul>
            {s.chapters.map((ch) => (
              <li key={ch.n}>
                <a
                  href={`#c2-ch-${ch.n}`}
                  className={`c2-rail-item ${active === ch.n ? "is-active" : ""}`}
                  aria-current={active === ch.n ? "true" : undefined}
                >
                  <span className="c2-rail-n">{String(ch.n).padStart(2, "0")}</span>
                  <span className="c2-rail-t">{ch.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
