"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModulePanel from "./ModulePanel";
import TranscriptBlock from "./TranscriptBlock";
import FilmCTA from "./FilmCTA";
import { MountainScene } from "./Scenery";
import { useSectionView } from "./useSectionView";
import { PLATES } from "./plates";

/**
 * S1 — HERO (Module 1, the teaching core). Night. Full-viewport mountain,
 * headline lands like a title card (CSS load choreography ≤900ms, paints
 * before JS — no hidden-until-hydrated content), 3-layer parallax on scroll
 * (2 layers + half distance on phone), Module 1 panel lower-right (desktop) /
 * under the CTA peeking above the fold (phone — the peek IS the scroll cue).
 */
export default function S1Hero({
  heroCtaRef,
}: {
  heroCtaRef: React.RefObject<HTMLElement | null>;
}) {
  const sectionRef = useSectionView("hero");
  const scope = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return; // reduced motion: static composite (CSS hides the cue on scroll)
          // Parallax: scenery layers only, never text. Phone: 2 layers, half distance.
          const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", scope.current!);
          layers.forEach((el) => {
            const depth = Number(el.dataset.depth);
            if (!desktop && depth > 0.8) return; // drop the foreground layer on small
            gsap.to(el, {
              yPercent: -14 * depth * (desktop ? 1 : 0.5),
              ease: "none",
              scrollTrigger: {
                trigger: scope.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        },
      );

      // Scroll cue fades out permanently on first scroll — all breakpoints, and
      // under reduced-motion too (the global reset makes the fade instant).
      const cue = cueRef.current;
      if (cue) {
        const onScroll = () => {
          cue.dataset.gone = "true";
          window.removeEventListener("scroll", onScroll);
        };
        window.addEventListener("scroll", onScroll, { passive: true, once: true });
      }
    },
    { scope },
  );

  return (
    <section
      id="s-hero"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="It's not gold. It's not bitcoin."
    >
      <div ref={scope} className="absolute inset-0 z-0">
        <MountainScene variant="night" src={PLATES.nightMountain} />
      </div>

      <div className="sfilm-contain relative z-10 pb-16 pt-28 lg:pb-24">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p data-film-intro="1" className="v2-eyebrow mb-7">
              A shift in the gold industry
            </p>
            <h1
              data-film-intro="2"
              className="v2-display"
              style={{ fontSize: "clamp(2.2rem, 9vw, 5.5rem)" }}
            >
              It&rsquo;s not gold.
              <br />
              It&rsquo;s not <span className="v2-gold">bitcoin.</span>
            </h1>
            <p
              data-film-intro="3"
              className="mt-7 max-w-[48ch] text-lg leading-relaxed"
              style={{ color: "var(--v2-dim)" }}
            >
              A new industry is being built around the world&rsquo;s oldest asset — and most
              people have never heard of it. The two-minute video explains the model. The
              book tells the whole story.
            </p>
            <div data-film-intro="4" className="mt-8" ref={heroCtaRef as React.RefObject<HTMLDivElement>}>
              <FilmCTA section="hero" className="v2-btn w-full sm:w-auto" />
            </div>
            <p data-film-intro="5" className="mt-3 text-sm" style={{ color: "var(--v2-dim)" }}>
              Digital book · delivered instantly · 60-day money-back guarantee
            </p>
            <p data-film-intro="6" className="mt-2 text-xs" style={{ color: "var(--v2-dim)" }}>
              Educational — not financial advice.
            </p>
          </div>

          <div data-film-intro="panel">
            <ModulePanel
              section="hero"
              module="m1"
              chip="01 · THE MODEL"
              title="The Model"
              promise="It's the thing gold and bitcoin were always reaching for — explained in two minutes."
              duration="2:20"
            />
            <TranscriptBlock module="m1" />
          </div>
        </div>
      </div>

      {/* Scroll cue — all breakpoints (designer ruling: the cue replaces the
          phone panel-peek as the "there's more" signal) */}
      <div
        ref={cueRef}
        aria-hidden
        className="sfilm-cue absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <span className="v2-num">scroll</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="rgba(232,178,58,0.7)" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
