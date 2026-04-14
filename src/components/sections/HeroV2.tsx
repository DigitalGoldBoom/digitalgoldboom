"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import Book3D from "@/components/Book3D";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "submitting" | "success" | "error";

export default function HeroV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const earth = earthRef.current;
    const book = bookRef.current;
    if (!section || !content || !earth || !book) return;

    if (prefersReducedMotion()) {
      section.querySelectorAll("[data-hero-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const reveals = content.querySelectorAll("[data-hero-reveal]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(reveals, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.2 });
    tl.fromTo(earth, { opacity: 0, scale: 0.9 }, { opacity: 0.4, scale: 1, duration: 1.4 }, 0);
    tl.fromTo(book, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 }, 0.4);

    const earthTween = gsap.to(earth, {
      y: -60,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      immediateRender: false,
    });
    const bookTween = gsap.to(book, {
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      immediateRender: false,
    });

    return () => {
      if (earthTween.scrollTrigger) earthTween.scrollTrigger.kill();
      earthTween.kill();
      if (bookTween.scrollTrigger) bookTween.scrollTrigger.kill();
      bookTween.kill();
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
        body: JSON.stringify({ email, source: "hero-v2" }),
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
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Earth cube — parallax mid-layer at 40% opacity */}
      <div
        ref={earthRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      >
        <Image
          src="/images/earth-cubes/earth-cube-hero-pristine.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </div>

      {/* Darken overlay to ground the content */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.8) 40%, rgba(10,10,15,0.4) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-40 md:pt-36 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-10 items-center">
          <div ref={contentRef}>
            <p data-hero-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">
              DECODING THE START OF THE BIGGEST GOLD RUSH IN HISTORY
            </p>
            <h1
              data-hero-reveal
              className="text-tp font-extrabold tracking-[-0.04em] leading-[1.12]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
            >
              <span className="block whitespace-nowrap">Missed Bitcoin?</span>
              <span className="block whitespace-nowrap mt-2">
                <em className="italic font-extrabold">Don&rsquo;t Miss</em>{" "}
                <span className="text-gold">Digital Gold Mining.</span>
              </span>
            </h1>
            <div
              data-hero-reveal
              className="mt-8 md:mt-10 max-w-[58ch] text-ts leading-[1.5]"
              style={{ fontSize: "clamp(1rem, 1.35vw, 1.125rem)" }}
            >
              <p>Tokenization just triggered the biggest gold rush in history.</p>
              <p>This time it&rsquo;s digital, eco-friendly, and global.</p>
            </div>
            <form
              data-hero-reveal
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 flex w-full max-w-[560px] flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="hero-email-v2" className="sr-only">Email address</label>
              <input
                id="hero-email-v2"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={locked}
                placeholder="you@email.com"
                className="flex-1 min-w-0 bg-void/60 backdrop-blur-sm border border-border px-5 py-4 text-sm text-tp placeholder:text-tt/60 focus:outline-none focus:border-gold transition-colors duration-300 rounded-lg disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={locked}
                className="shrink-0 bg-btn-bg text-btn-text text-sm font-semibold px-7 py-4 rounded-lg hover:opacity-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "submitting"
                  ? "Adding you…"
                  : status === "success"
                    ? "You are on the list"
                    : "Join the launch waitlist →"}
              </button>
            </form>
            <p role="status" aria-live="polite" data-hero-reveal className="mt-3 text-xs text-tt min-h-[1rem]">
              {status === "success" && <span className="text-green">{message}</span>}
              {status === "error" && <span className="text-[#ff6b6b]">{message}</span>}
              {(status === "idle" || status === "submitting") && (
                <span>Free until the book drops. $39 after. No spam.</span>
              )}
            </p>
            <p
              data-hero-reveal
              className="mt-8 max-w-[56ch] text-tp leading-[1.55] font-medium"
              style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)" }}
            >
              Get in early. Get informed. Get the edge.
              <span className="block text-tt mt-1 font-normal">
                This book explains everything before a token has been minted.
              </span>
            </p>
          </div>

          <div ref={bookRef} className="relative flex items-center justify-center">
            <Book3D />
          </div>
        </div>
      </div>
    </section>
  );
}
