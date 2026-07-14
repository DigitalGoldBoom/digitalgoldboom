"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { track } from "@vercel/analytics";
import Book3D from "@/components/Book3D";
import BuyButton from "@/components/BuyButton";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { ScrubSection, TextStep } from "./ScrubSection";
import { useReducedMotion } from "./useReducedMotion";
import CountUp from "./CountUp";
import StickyBar from "./StickyBar";

gsap.registerPlugin(ScrollTrigger);

const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

/**
 * CineFilm — /film. Nine beats, six Seedance clips scrubbed as canvas frame
 * sequences: scrolling IS the story. One case, beat by beat, then ONE product:
 * the book at $37 (early-reader, rising to $97) via LemonSqueezy.
 *
 * Locked doctrine honored throughout: the hero is THE NEW INDUSTRY; the
 * NatGold Token ("NATG") is named, never sold; "reserved", never "raised";
 * "patent applications", never "patents"; every figure is from the verified
 * registry — nothing invented, nothing dated.
 */
export default function CineFilm() {
  const proofRef = useRef<HTMLElement | null>(null);
  const finaleCtaRef = useRef<HTMLDivElement | null>(null);

  // Lenis smooth scroll — desktop fine-pointers only, native on touch /
  // reduced-motion (same proven wiring as /s WorldDriver).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis: Lenis | null = null;
    let raf: ((t: number) => void) | null = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    track("film_page_view");
  }, []);

  return (
    <div style={{ background: "var(--cine-bg)", overflowX: "clip" }}>
      <div className="cine-grain" aria-hidden />

      <main>
        {/* ---- BEAT 1 · THE HOOK · clip 1: Earth turning digital ---- */}
        <ScrubSection clip="clip1" heightVh={320} ariaLabel="The hook">
          <TextStep from={0.06} to={0.46}>
            <h1 className="cine-display cine-h1">
              The biggest financial transformation in history is underway.
            </h1>
          </TextStep>
          <TextStep from={0.54} to={0.96}>
            <p className="cine-display cine-h2">
              Every asset is going digital.
              <br />
              <span style={{ color: "var(--cine-gold)" }}>
                Gold is being changed at its root.
              </span>
            </p>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 2 · THE BIND · clip 2: the pit ---- */}
        <ScrubSection clip="clip2" heightVh={300} ariaLabel="The bind">
          <TextStep from={0.15} to={0.85}>
            <p className="cine-display cine-h2">
              The world&rsquo;s most trusted asset —{" "}
              <span style={{ color: "var(--cine-gold)" }}>
                and modern money refuses to fund how it&rsquo;s made.
              </span>
            </p>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 3 · THE SECRET · clip 3: the vein, scanned ---- */}
        <ScrubSection clip="clip3" heightVh={340} ariaLabel="The secret">
          <TextStep from={0.08} to={0.34}>
            <p className="cine-display cine-h2">Gold is never used up.</p>
          </TextStep>
          <TextStep from={0.38} to={0.64}>
            <p className="cine-line">
              Its value is born the moment geology proves it exists.
            </p>
          </TextStep>
          <TextStep from={0.68} to={0.96}>
            <p className="cine-line">
              Verification is the backbone the industry already banks billions
              on.
            </p>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 4 · THE REVEAL · clip 4: the mint. The last line lands
             exactly as the light condenses into its single point (~p 0.82+). ---- */}
        <ScrubSection clip="clip4" heightVh={420} ariaLabel="The reveal">
          <TextStep from={0.06} to={0.24}>
            <p className="cine-display cine-h2">It&rsquo;s not gold.</p>
          </TextStep>
          <TextStep from={0.28} to={0.46}>
            <p className="cine-display cine-h2">It&rsquo;s not Bitcoin.</p>
          </TextStep>
          <TextStep from={0.5} to={0.72}>
            <p className="cine-display cine-h2">
              It&rsquo;s the evolution of both.
            </p>
          </TextStep>
          <TextStep from={0.82} to={1} holdOut>
            <div>
              <p className="cine-kicker">Introducing</p>
              <p className="cine-display cine-h1" style={{ marginTop: "0.6rem" }}>
                NatGold Token{" "}
                <span style={{ color: "var(--cine-gold)" }}>
                  (&lsquo;NATG&rsquo;)
                </span>
              </p>
              <p className="cine-line" style={{ marginTop: "1rem", color: "var(--cine-dim)" }}>
                One token, one verified ounce, still in the ground.
              </p>
            </div>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 5 · THE PROOF · stat cards over a dimmed still + first
             Book3D. Sticky buy bar begins here. ---- */}
        <section
          ref={proofRef as React.RefObject<HTMLElement>}
          aria-label="The proof"
          style={{
            position: "relative",
            // extra bottom padding: the sticky buy pill docks from this beat on
            // and must never sit over the closing line on small screens
            padding:
              "clamp(5rem, 12vh, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(9rem, 18vh, 13rem)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/film/still-vein.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.22,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, var(--cine-bg) 0%, transparent 22%, transparent 78%, var(--cine-bg) 100%)",
            }}
          />
          <div style={{ position: "relative", maxWidth: "72rem", margin: "0 auto" }}>
            <p className="cine-kicker" style={{ textAlign: "center" }}>
              Same deposit. Two industries.
            </p>
            <div
              style={{
                display: "grid",
                gap: "1.25rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                marginTop: "2.5rem",
              }}
            >
              <div className="cine-card">
                <div className="cine-stat-value">23+ years vs ~6 months</div>
                <div className="cine-stat-label">
                  from discovery to value — traditional mining vs digital gold
                  mining.
                </div>
              </div>
              <div className="cine-card">
                <div className="cine-stat-value">$300M vs $51M</div>
                <div className="cine-stat-label">
                  the cost of proving and producing the same gold.
                </div>
              </div>
              <div className="cine-card">
                <div className="cine-stat-value">124 tonnes vs none</div>
                <div className="cine-stat-label">
                  rock moved per ounce of gold — versus not one tonne.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(1rem, 4vw, 3rem)",
                marginTop: "3.5rem",
              }}
            >
              <div style={{ transform: "scale(0.62)", transformOrigin: "center", margin: "-4rem -3rem" }}>
                <Book3D />
              </div>
              <p className="cine-line" style={{ maxWidth: "24rem" }}>
                Every one of these numbers is worked out in the book —{" "}
                <span style={{ color: "var(--cine-gold)" }}>
                  line by line, sources shown.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ---- BEAT 6 · THE SIGNAL · clip 5: the world ignites + counters.
             clip5 is a two-part chained sequence (ground→space + space→ignition),
             242 frames scrubbed as one continuous move. ---- */}
        <ScrubSection clip="clip5" frames={242} heightVh={400} ariaLabel="The signal">
          {/* counters land as the world starts igniting (part B of the sequence) */}
          <TextStep from={0.45} to={1} holdOut>
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "clamp(1rem, 3vw, 2.5rem)",
                }}
              >
                <div className="cine-card" style={{ minWidth: "13rem" }}>
                  <div className="cine-stat-value">
                    US$<CountUp value={469} />M
                  </div>
                  <div className="cine-stat-label">in NATG reserved</div>
                </div>
                <div className="cine-card" style={{ minWidth: "13rem" }}>
                  <div className="cine-stat-value">
                    <CountUp value={17466} />
                  </div>
                  <div className="cine-stat-label">people</div>
                </div>
                <div className="cine-card" style={{ minWidth: "13rem" }}>
                  <div className="cine-stat-value">
                    <CountUp value={162} />
                  </div>
                  <div className="cine-stat-label">countries</div>
                </div>
              </div>
              <p className="cine-line" style={{ marginTop: "2rem", color: "var(--cine-dim)" }}>
                Before trading, before a dollar of paid marketing.
              </p>
            </div>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 7 · THE BUILDERS · name cards over a dimmed loop ---- */}
        <ScrubSection
          clip={null}
          heightVh={340}
          ariaLabel="The builders"
          backdrop={<LoopBackdrop />}
        >
          <TextStep from={0.05} to={0.3}>
            <p className="cine-display cine-h2">
              Built for seven years,{" "}
              <span style={{ color: "var(--cine-gold)" }}>quietly.</span>
            </p>
          </TextStep>
          <TextStep from={0.34} to={0.78} holdOut={false}>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                maxWidth: "36rem",
                margin: "0 auto",
              }}
            >
              {[
                "Former SEC Chief of Staff",
                "Former Colombian cabinet minister",
                "Former CFTC attorney",
                "Barrick's former innovation chief",
              ].map((name) => (
                <div key={name} className="cine-card">
                  <div
                    className="cine-display"
                    style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.4rem)" }}
                  >
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </TextStep>
          <TextStep from={0.82} to={1} holdOut>
            <p className="cine-line">
              Seven years.{" "}
              <span style={{ color: "var(--cine-gold)" }}>
                Patent applications under U.S. examination.
              </span>
            </p>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 8 · ONCE IN HISTORY · clip 6: the alignment ---- */}
        <ScrubSection clip="clip6" heightVh={320} ariaLabel="Once in history">
          <TextStep from={0.12} to={0.55}>
            <p className="cine-display cine-h2">
              Gold, capital, and blockchain —{" "}
              <span style={{ color: "var(--cine-gold)" }}>
                aligned for the first time in history.
              </span>
            </p>
          </TextStep>
          <TextStep from={0.62} to={1} holdOut>
            <p className="cine-display cine-h2">
              And this alignment locks in forever.
            </p>
          </TextStep>
        </ScrubSection>

        {/* ---- BEAT 9 · THE BOOK · Book3D full-screen star + the offer ---- */}
        <FinaleBeat finaleCtaRef={finaleCtaRef} />
      </main>

      <StickyBar fromRef={proofRef} finaleCtaRef={finaleCtaRef} />
    </div>
  );
}

/** Beat 7 backdrop — the world-ignition loop, dimmed. Poster under reduced motion. */
function LoopBackdrop() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/film/clip5/poster.webp" alt="" className="cine-poster" />
      ) : (
        <video
          className="cine-poster"
          src="/film/ignition-loop.mp4"
          poster="/film/clip5/poster.webp"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    </div>
  );
}

/**
 * Beat 9 — the finale. The comet's gold glow dissolves onto the book, five
 * "what's inside" lines reveal one per scroll step beside it, then the offer
 * stack and the single LemonSqueezy CTA.
 */
const INSIDE_LINES = [
  "Why digital gold mining is inevitable — the full case, built argument by argument.",
  "The head-to-head — traditional vs digital mining on the same deposit, every number shown.",
  "How it works — how gold is verified, valued, tokenized, and protected.",
  "The record — the $469M pre-market signal, documented.",
  "The risks — the final chapter stress-tests the whole case.",
];

function FinaleBeat({
  finaleCtaRef,
}: {
  finaleCtaRef: React.RefObject<HTMLDivElement | null>;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLLIElement | null)[]>([]);

  return (
    <ScrubSection
      clip={null}
      heightVh={520}
      ariaLabel="The book"
      onProgress={(p) => {
        // the comet's gold glow dissolves onto the book over the first third
        if (glowRef.current) {
          glowRef.current.style.opacity = String(
            Math.max(0, Math.min(1, p * 3)) * 0.85,
          );
        }
        // five inside-lines, one per scroll step across p 0.1 → 0.75
        linesRef.current.forEach((el, i) => {
          if (!el) return;
          const at = 0.1 + (i * 0.65) / INSIDE_LINES.length;
          const o = Math.max(0, Math.min(1, (p - at) / 0.06));
          el.style.opacity = String(o);
          el.style.transform = `translateY(${(1 - o) * 16}px)`;
        });
      }}
      backdrop={
        <div
          ref={glowRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(232,182,76,0.32) 0%, rgba(232,182,76,0.08) 45%, transparent 75%)",
          }}
        />
      }
    >
      <div
        className="cine-finale"
        style={{
          pointerEvents: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(1.5rem, 5vw, 4rem)",
          maxWidth: "76rem",
          textAlign: "left",
        }}
      >
        <div className="cine-finale-book">
          <Book3D />
        </div>
        <div style={{ maxWidth: "26rem" }}>
          <p className="cine-kicker">Inside the book</p>
          <ul
            style={{
              marginTop: "1.25rem",
              display: "grid",
              gap: "0.9rem",
              listStyle: "none",
              padding: 0,
            }}
          >
            {INSIDE_LINES.map((line, i) => (
              <li
                key={i}
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                style={{
                  opacity: 0,
                  fontSize: "clamp(0.92rem, 1.5vw, 1.05rem)",
                  lineHeight: 1.5,
                  color: "var(--cine-dim)",
                  paddingLeft: "1.1rem",
                  borderLeft: "2px solid rgba(232,182,76,0.5)",
                }}
              >
                {line}
              </li>
            ))}
          </ul>

          <div
            ref={finaleCtaRef}
            style={{ marginTop: "2rem", display: "grid", gap: "0.8rem" }}
          >
            <p
              className="cine-display"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              17 chapters ·{" "}
              <span style={{ color: "var(--cine-gold)" }}>
                $37 early-reader
              </span>{" "}
              — rising to $97 · 60-day guarantee
            </p>
            <div>
              <BuyButton
                checkoutUrl={checkoutUrl}
                label="Get the book — $37"
                className="cine-btn"
                event="film_finale_outbound_buy"
                eventProps={{ destination: "lemonsqueezy" }}
              />
            </div>
            <p className="cine-note">Educational — not financial advice.</p>
          </div>
        </div>
      </div>
    </ScrubSection>
  );
}
