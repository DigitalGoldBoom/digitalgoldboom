"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { track } from "@vercel/analytics";
import NumberCounter from "@/components/NumberCounter";
import ModulePanel from "./ModulePanel";
import TranscriptBlock from "./TranscriptBlock";
import FilmCTA from "./FilmCTA";
import { useSectionView } from "./useSectionView";

/**
 * S3 — WHO BUILT IT (Module 2 + the receipts bento). Institutional register:
 * tiles rise like stamped documents (batch, 90ms stagger, once). Patents
 * counter ticks to 10 — its "applications — in examination, USPTO" caption is
 * STATIC markup, never animated, never separable from the number. The demand
 * tile is deliberately cool: static text, NO counter (compliance posture).
 * Radke/Ash ship as typographic cards (no licensed photos yet — never AI faces).
 * Press-release link: URL owed by the author — source line ships as text until
 * it exists (never a fabricated href).
 */
export default function S3WhoBuilt() {
  const sectionRef = useSectionView("who_built");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-s3-head]", scope.current!).forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          });
        });
        gsap.set("[data-s3-tile]", { y: 28, opacity: 0 });
        ScrollTrigger.batch("[data-s3-tile]", {
          start: "top 80%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.09 }),
        });
      });
    },
    { scope },
  );

  return (
    <section
      id="s-who-built"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative py-24 md:py-32"
    >
      <div ref={scope} className="sfilm-contain relative z-10">
        <div data-s3-head>
          <p className="v2-eyebrow mb-8">Who built it</p>
          <h2 className="v2-display" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.25rem)", maxWidth: "17ch" }}>
            The people who wrote the rules joined it.
          </h2>
        </div>

        <div data-s3-head className="mt-10 max-w-[860px]">
          <ModulePanel
            section="who_built"
            module="m2"
            chip="02 · WHO BUILT IT"
            title="Who Built It"
            promise="Look who walked away from the old system to build this."
            duration="1:15"
          />
          <TranscriptBlock module="m2" />
        </div>

        <p className="mt-8 max-w-[70ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          The platform behind the model, NatGold Digital, is chaired by Mark Radke, former
          Chief of Staff of the U.S. Securities and Exchange Commission. NatBridge Resources,
          the first mining company built for the model, is chaired by Michelle Ash, former
          Chief Innovation Officer of Barrick Gold — the world&rsquo;s largest gold miner at the
          time she held the role. The method is the subject of ten patent applications now in
          examination at the U.S. Patent and Trademark Office. And before a single NatGold
          Token traded, 17,466 people across 162 countries reserved $469 million worth —
          reservations recorded on the public record, with no money changing hands.
        </p>

        {/* THE RECEIPTS — bento. Phone order (via CSS order): demand first after video. */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Demand tile — wide, FIRST on phone */}
          <div
            data-s3-tile
            className="v2-tile order-1 p-7 md:order-3 md:col-span-2 lg:col-span-3 md:p-9"
          >
            <div className="v2-num mb-4" style={{ color: "var(--v2-gold)" }}>THE DEMAND SIGNAL</div>
            <p style={{ fontSize: "clamp(1.25rem, 2.6vw, 1.875rem)", fontWeight: 400, color: "#F4F4F7" }}>
              $469M reserved · 17,466 people · 162 countries
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--v2-dim)" }}>
              No money changed hands.
            </p>
            <p className="mt-4 max-w-[68ch] text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
              The book examines each of these facts — who these people are, what the patent
              applications cover, and what that demand signal does and does not prove.
            </p>
            <p className="mt-3 text-xs" style={{ color: "var(--v2-dim)" }}>
              Source:{" "}
              <a
                href="https://natgold.com/natgold-digital-closes-pre-market-token-reservation-program-with-global-demand-exceeding-us469m/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white"
                onClick={() => track("who_built_press_release_click")}
              >
                NatGold Digital closing release, February 26, 2026
              </a>
            </p>
          </div>

          {/* Radke */}
          <div data-s3-tile className="v2-tile order-2 p-7">
            <div className="v2-num mb-5">THE REGULATOR&rsquo;S OFFICE</div>
            <h3 style={{ fontSize: "1.375rem", fontWeight: 500, color: "#F4F4F7" }}>Mark Radke</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
              Executive Chairman, NatGold Digital. Former Chief of Staff, U.S. Securities and
              Exchange Commission.
            </p>
          </div>

          {/* Ash */}
          <div data-s3-tile className="v2-tile order-3 p-7 md:order-2">
            <div className="v2-num mb-5">THE WORLD&rsquo;S LARGEST MINER</div>
            <h3 style={{ fontSize: "1.375rem", fontWeight: 500, color: "#F4F4F7" }}>Michelle Ash</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
              Chair, NatBridge Resources. Former Chief Innovation Officer of Barrick Gold —
              then the biggest gold miner on earth.
            </p>
          </div>

          {/* Patents */}
          <div data-s3-tile className="v2-tile order-4 p-7">
            <div className="v2-num mb-5">THE METHOD</div>
            <p
              className="font-mono"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)", color: "#F4F4F7", lineHeight: 1 }}
            >
              <NumberCounter start={0} end={10} durationMs={800} ariaLabel="ten" staticFirst />
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--v2-dim)" }}>
              patent applications — in examination, USPTO
            </p>
          </div>

          {/* Deposits — typographic (map render lands later) */}
          <div data-s3-tile className="v2-tile relative order-5 overflow-hidden p-7 md:col-span-2">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(232,178,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,178,58,0.5) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="relative">
              <div className="v2-num mb-5">IN THE PIPELINE</div>
              <p style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", fontWeight: 400, color: "#F4F4F7", letterSpacing: "0.06em" }}>
                CAHUILLA, CALIFORNIA · FRIDAY, IDAHO
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--v2-dim)" }}>
                Two real gold deposits, already moving through the model.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <FilmCTA section="who_built" className="v2-btn-ghost" />
        </div>
      </div>
    </section>
  );
}
