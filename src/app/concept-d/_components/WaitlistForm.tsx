"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Variant = "hero" | "final";

export default function WaitlistForm({
  source,
  variant = "hero",
}: {
  source: "concept-d-hero" | "concept-d-final-cta";
  variant?: Variant;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      track(
        variant === "hero" ? "hero_email_submit" : "final_cta_email_submit",
        { source }
      );
      setStatus("ok");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  const dark = variant === "final";

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xl"
      style={{ fontFamily: "var(--font-plex), system-ui, sans-serif" }}
    >
      <div
        className="flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-stretch sm:gap-0"
        style={{
          background: dark
            ? "rgba(255,255,255,0.06)"
            : "rgba(28,25,23,0.04)",
          border: dark
            ? "1px solid rgba(255,255,255,0.14)"
            : "1px solid rgba(28,25,23,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent px-4 py-4 text-base outline-none sm:py-3"
          style={{
            color: dark ? "#FAFAF9" : "#0C0A09",
            fontFamily: "var(--font-plex), system-ui, sans-serif",
          }}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer rounded-xl px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-300 sm:py-3"
          style={{
            background: "#CA8A04",
            color: "#1C1917",
            boxShadow:
              "0 10px 30px rgba(202,138,4,0.25), 0 1px 0 rgba(255,255,255,0.3) inset",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          {status === "loading" ? "Joining…" : "Join the waitlist →"}
        </button>
      </div>
      <p
        className="mt-3 text-xs tracking-wide"
        style={{
          color: dark ? "rgba(250,250,249,0.6)" : "rgba(28,25,23,0.55)",
        }}
      >
        Free until the book drops. $39 after. No spam.
      </p>
      {message && (
        <p
          role="status"
          className="mt-2 text-sm"
          style={{
            color:
              status === "ok"
                ? "#CA8A04"
                : dark
                  ? "#FCA5A5"
                  : "#B91C1C",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
