"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import Book3D from "@/components/Book3D";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "submitting" | "success" | "error";

export default function HeroBoardD() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const earth = earthRef.current;
    const book = bookRef.current;
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
    tl.fromTo(reveals, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.15 });
    if (book) tl.fromTo(book, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 }, 0.3);

    const parallaxTweens: gsap.core.Tween[] = [];
    if (earth) {
      parallaxTweens.push(
        gsap.to(earth, {
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
        })
      );
    }
    if (book) {
      parallaxTweens.push(
        gsap.to(book, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
        })
      );
    }

    return () => {
      parallaxTweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
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
        body: JSON.stringify({ email, source: "hero-board-d" }),
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
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-canvas text-tp"
    >
      {/* Atmospheric earth-cube layer — low opacity, editorial */}
      <div
        ref={earthRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div className="absolute inset-0 opacity-[0.08] hidden lg:block">
          <Image
            src="/images/earth-cubes/earth-cube-hero-pristine.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
      </div>

      {/* Warm gold radial wash — subtle, single source */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(1000px 700px at 75% 20%, rgba(202,138,4,0.06), transparent 60%), radial-gradient(800px 600px at 10% 90%, rgba(28,25,23,0.04), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-40 md:pt-36 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-16 items-center">
          <div ref={contentRef}>
            <div
              data-reveal
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "var(--accent-gold-wash)",
                border: "1px solid var(--border-gold)",
              }}
            >
              <span className="eyebrow" style={{ color: "var(--accent-gold)" }}>
                Decoding the next gold rush
              </span>
            </div>

            <h1
              data-reveal
              className="display-xl text-tp"
              style={{ maxWidth: "14ch" }}
            >
              <span className="block">Missed Bitcoin?</span>
              <span className="block mt-2">
                <em className="italic font-light">Don&rsquo;t miss</em>{" "}
                <span className="gold-underline" style={{ color: "var(--accent-gold)" }}>
                  digital gold mining.
                </span>
              </span>
            </h1>

            <p
              data-reveal
              className="mt-10 text-ts leading-[1.6] max-w-[54ch]"
              style={{ fontSize: "clamp(1rem, 1.35vw, 1.15rem)", fontWeight: 400 }}
            >
              Tokenization just triggered the biggest gold rush in history. This time it&rsquo;s digital, eco-friendly, and global.
            </p>

            <form
              data-reveal
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 flex w-full max-w-[540px] flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="hero-email-d" className="sr-only">
                Email address
              </label>
              <input
                id="hero-email-d"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={locked}
                placeholder="you@email.com"
                className="input flex-1 min-w-0 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={locked}
                className="btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "submitting"
                  ? "Adding you…"
                  : status === "success"
                  ? "You are on the list"
                  : "Join the waitlist →"}
              </button>
            </form>

            <p
              role="status"
              aria-live="polite"
              data-reveal
              className="mt-3 text-xs text-tt min-h-[1rem]"
            >
              {status === "success" && (
                <span style={{ color: "#15803D", fontWeight: 500 }}>{message}</span>
              )}
              {status === "error" && (
                <span style={{ color: "#B91C1C", fontWeight: 500 }}>{message}</span>
              )}
              {(status === "idle" || status === "submitting") && (
                <span>Free until the book drops. $39 after. No spam.</span>
              )}
            </p>

            <div
              data-reveal
              className="mt-12 pt-8 border-t flex flex-wrap items-center gap-x-10 gap-y-4"
              style={{ borderColor: "var(--border-base)" }}
            >
              <div>
                <div
                  className="font-mono text-tp"
                  style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  $469M
                </div>
                <div
                  className="eyebrow mt-1"
                  style={{ color: "var(--text-tertiary)", fontSize: "10px" }}
                >
                  Pre-market reserved
                </div>
              </div>
              <div>
                <div
                  className="font-mono text-tp"
                  style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  17,466
                </div>
                <div
                  className="eyebrow mt-1"
                  style={{ color: "var(--text-tertiary)", fontSize: "10px" }}
                >
                  Investors
                </div>
              </div>
              <div>
                <div
                  className="font-mono text-tp"
                  style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  162
                </div>
                <div
                  className="eyebrow mt-1"
                  style={{ color: "var(--text-tertiary)", fontSize: "10px" }}
                >
                  Countries
                </div>
              </div>
            </div>
          </div>

          <div ref={bookRef} className="relative flex items-center justify-center">
            <Book3D />
          </div>
        </div>
      </div>
    </section>
  );
}
