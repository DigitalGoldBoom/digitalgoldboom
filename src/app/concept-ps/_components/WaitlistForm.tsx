"use client";

import { useState, FormEvent } from "react";
import { track } from "@vercel/analytics";

type Props = {
  source: "concept-ps-hero" | "concept-ps-final-cta";
  variant?: "light" | "dark";
};

export default function WaitlistForm({ source, variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("Network");
      track(source === "concept-ps-hero" ? "hero_email_submit" : "final_cta_email_submit");
      setState("ok");
      setMsg("You're on the list. Watch your inbox.");
      setEmail("");
    } catch {
      setState("err");
      setMsg("Something went wrong. Try again.");
    }
  };

  const isDark = variant === "dark";
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
  const inputBorder = isDark ? "rgba(255,255,255,0.25)" : "#E2E8F0";
  const inputColor = isDark ? "#F8FAFC" : "#020617";
  const microColor = isDark ? "rgba(248,250,252,0.6)" : "#64748B";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="flex-1 px-5 py-4 text-base rounded-lg outline-none transition-colors duration-200 focus:ring-2 focus:ring-[#CA8A04]"
          style={{
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            color: inputColor,
            fontFamily: "var(--font-inter)",
          }}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="ps-cta px-7 py-4 rounded-lg font-semibold cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60"
          style={{
            background: "#CA8A04",
            color: "#FFFFFF",
            fontFamily: "var(--font-inter)",
            letterSpacing: "0.2px",
            whiteSpace: "nowrap",
          }}
        >
          {state === "loading" ? "Joining…" : "Join the waitlist →"}
        </button>
      </div>
      <p
        className="mt-3 text-sm"
        style={{ color: microColor, fontFamily: "var(--font-inter)" }}
        aria-live="polite"
      >
        {state === "ok" || state === "err"
          ? msg
          : "Free until the book drops. $39 after. No spam."}
      </p>
      <style jsx>{`
        .ps-cta:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-cta,
          .ps-cta:hover {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </form>
  );
}
