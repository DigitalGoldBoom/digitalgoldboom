"use client";

/*
  HERO G — Swiss Modernism Editorial (Dark + Gold)
  ================================================
  Pattern: Strict 12-column grid · Asymmetric balance
  Framework: PlayStation (three-surface, weight-300 display, 1.2× scale-hover, gallery whitespace)
  Palette: Original DGB dark #0A0A0F + gold #D4A843 + Plus Jakarta + Geist Mono

  Layout:
  - Row 1: giant vertical index rail "01" + "THE BOOK" label on left
  - Row 2: huge weight-300 headline spans cols 2-10
  - Row 3: split — body copy left (cols 2-6), Book3D right (cols 7-12) overlapping
  - Row 4: full-width form band at bottom with gold primary CTA + ghost secondary
  - Mono stat chips run beneath form as a ribbon
*/

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import Book3D from "@/components/Book3D";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "submitting" | "success" | "error";

// Dark palette — original DGB tokens, inline to override light globals
const DARK = {
  bg: "#0A0A0F",
  bgElev: "#111118",
  bgActive: "#1A1A24",
  tp: "#F5F5F7",
  ts: "#C6C6CC",
  tt: "#9A9AA0",
  gold: "#D4A843",
  goldHover: "#F4C563",
  goldWash: "rgba(212, 168, 67, 0.10)",
  border: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(255, 255, 255, 0.16)",
  borderGold: "rgba(212, 168, 67, 0.28)",
};

export default function HeroG() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const book = bookRef.current;
    const rail = railRef.current;
    if (!section || !content) return;

    if (prefersReducedMotion()) {
      section.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const reveals = content.querySelectorAll("[data-reveal]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (rail) tl.fromTo(rail, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8 });
    tl.fromTo(reveals, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.1);
    if (book) tl.fromTo(book, { opacity: 0, scale: 0.94, x: 24 }, { opacity: 1, scale: 1, x: 0, duration: 1.1 }, 0.3);

    const bookParallax = book
      ? gsap.to(book, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
        })
      : null;

    return () => {
      if (bookParallax?.scrollTrigger) bookParallax.scrollTrigger.kill();
      bookParallax?.kill();
      tl.kill();
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "hero-g" }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      track("hero_email_submit");
      setStatus("success");
      setMessage("You are on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const locked = status === "submitting" || status === "success";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: `radial-gradient(1200px 900px at 80% 20%, rgba(212,168,67,0.07), transparent 55%), ${DARK.bg}`,
        color: DARK.tp,
        minHeight: "100dvh",
      }}
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${DARK.gold} 20%, ${DARK.gold} 80%, transparent)`, opacity: 0.4 }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28 min-h-[100dvh] flex flex-col">
        {/* Strict 12-col grid */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 flex-1 items-start">
          {/* COL 1 — vertical index rail (desktop only) */}
          <aside
            ref={railRef}
            className="hidden lg:block col-span-1 pt-4"
            style={{ borderTop: `1px solid ${DARK.border}` }}
          >
            <div
              className="font-mono tabular-nums"
              style={{
                fontSize: "clamp(2.25rem, 3.2vw, 3rem)",
                fontWeight: 300,
                color: DARK.gold,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              01
            </div>
            <div
              className="mt-4 font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: DARK.tt,
                fontWeight: 600,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                display: "inline-block",
                marginTop: 16,
              }}
            >
              The Book · Vol 1
            </div>
          </aside>

          {/* COLS 2-11 — content */}
          <div ref={contentRef} className="col-span-12 lg:col-span-11">
            {/* Eyebrow */}
            <div
              data-reveal
              className="flex items-center gap-3 mb-10"
              style={{ borderTop: `1px solid ${DARK.border}`, paddingTop: 28 }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: DARK.gold }} />
              <span
                className="font-mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: DARK.gold,
                  fontWeight: 600,
                }}
              >
                Decoding the next gold rush
              </span>
              <span className="flex-1 h-px" style={{ background: DARK.border }} />
              <span
                className="font-mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: DARK.tt,
                  fontWeight: 500,
                }}
              >
                N°01 · 2026
              </span>
            </div>

            {/* Headline — massive weight 300, spans the full content width */}
            <h1
              data-reveal
              style={{
                fontSize: "clamp(2.75rem, 7vw, 6rem)",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: DARK.tp,
                maxWidth: "14ch",
              }}
            >
              Missed Bitcoin?
              <span className="block mt-2">
                <em className="italic" style={{ fontWeight: 300 }}>Don&rsquo;t miss</em>
              </span>
              <span className="block mt-2" style={{ color: DARK.gold }}>
                digital gold mining.
              </span>
            </h1>

            {/* Split row: body left, book right */}
            <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10">
              {/* Body copy */}
              <div className="col-span-12 lg:col-span-6">
                <p
                  data-reveal
                  style={{
                    color: DARK.ts,
                    fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    maxWidth: "44ch",
                  }}
                >
                  Tokenization just triggered the biggest gold rush in history. This time it&rsquo;s digital, eco-friendly, and global.
                </p>

                {/* Form */}
                <form
                  data-reveal
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 flex w-full max-w-[500px] flex-col gap-3 sm:flex-row sm:items-stretch"
                >
                  <label htmlFor="hero-g-email" className="sr-only">Email address</label>
                  <input
                    id="hero-g-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={locked}
                    placeholder="you@email.com"
                    className="flex-1 min-w-0"
                    style={{
                      background: "transparent",
                      border: `1px solid ${DARK.borderStrong}`,
                      borderRadius: 3,
                      padding: "16px 20px",
                      color: DARK.tp,
                      fontSize: 15,
                      fontFamily: "inherit",
                      outline: "none",
                      transition: "border-color 180ms, box-shadow 180ms",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = DARK.gold;
                      e.currentTarget.style.boxShadow = `0 0 0 3px rgba(212,168,67,0.2)`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = DARK.borderStrong;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="submit"
                    disabled={locked}
                    className="shrink-0 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap hero-g-cta"
                  >
                    {status === "submitting" ? "Adding you…" : status === "success" ? "You are on the list" : "Join the waitlist →"}
                  </button>
                </form>
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-3 min-h-[1rem]"
                  style={{ fontSize: 12, color: DARK.tt }}
                >
                  {status === "success" && <span style={{ color: "#4ADE80", fontWeight: 500 }}>{message}</span>}
                  {status === "error" && <span style={{ color: "#F87171", fontWeight: 500 }}>{message}</span>}
                  {(status === "idle" || status === "submitting") && <span>Free until the book drops. $39 after. No spam.</span>}
                </p>
              </div>

              {/* Book3D */}
              <div className="col-span-12 lg:col-span-6 flex items-center justify-center lg:justify-end relative">
                {/* Mobile static cover */}
                <div
                  className="lg:hidden relative"
                  style={{ maxWidth: 220, width: "100%", aspectRatio: "500/763" }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(55% 45% at 50% 50%, rgba(212,168,67,0.3), transparent 65%)",
                      filter: "blur(30px)",
                      transform: "scale(1.4)",
                    }}
                  />
                  <Image
                    src="/images/Digital Gold Boom Cover (1).png"
                    alt="Digital Gold Boom"
                    fill
                    priority
                    sizes="220px"
                    style={{ objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
                  />
                </div>

                {/* Desktop interactive Book3D */}
                <div ref={bookRef} className="hidden lg:block relative" style={{ perspective: "1400px" }}>
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(55% 45% at 50% 50%, rgba(212,168,67,0.28), transparent 65%)",
                      filter: "blur(50px)",
                      transform: "scale(1.4)",
                      zIndex: 0,
                    }}
                  />
                  <div className="relative z-10">
                    <Book3D />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stat ribbon — full width */}
        <div
          data-reveal
          className="mt-auto pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          style={{ borderTop: `1px solid ${DARK.border}` }}
        >
          {[
            { v: "$469M", l: "Reserved" },
            { v: "17,466", l: "Investors" },
            { v: "162", l: "Countries" },
            { v: "10", l: "Patents" },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="font-mono tabular-nums"
                style={{
                  fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                  fontWeight: 400,
                  color: DARK.gold,
                  letterSpacing: "-0.015em",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                className="mt-2 font-mono"
                style={{
                  fontSize: "9.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: DARK.tt,
                  fontWeight: 600,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero-g-cta {
          background: ${DARK.gold};
          color: ${DARK.bg};
          padding: 14px 28px;
          border-radius: 999px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        }
        .hero-g-cta:hover {
          background: ${DARK.goldHover};
          transform: scale(1.2);
          box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px ${DARK.gold};
        }
        .hero-g-cta:active {
          opacity: 0.8;
          transform: scale(0.98);
        }
      `}</style>
    </section>
  );
}
