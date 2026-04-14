"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Props = {
  source: "concept-old-hero" | "concept-old-final-cta";
  eventName: "hero_email_submit" | "final_cta_email_submit";
  variant?: "dark" | "panel";
};

export default function WaitlistForm({ source, eventName, variant = "dark" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || "Something went wrong. Try again.");
        return;
      }
      track(eventName);
      setStatus("success");
      setMessage("You're in. Check your inbox.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const panelBg =
    variant === "panel" ? "rgba(17, 17, 24, 0.72)" : "rgba(10, 10, 15, 0.55)";

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 520,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          padding: 8,
          borderRadius: 14,
          border: "1px solid rgba(212, 168, 67, 0.28)",
          background: panelBg,
          backdropFilter: "blur(8px)",
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={status === "loading"}
          aria-label="Email address"
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#F5F5F7",
            fontFamily: "var(--font-exo2), sans-serif",
            fontSize: 16,
            padding: "14px 14px",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="dgb-cta"
          style={{
            background: "#D4A843",
            color: "#0A0A0F",
            border: "none",
            borderRadius: 10,
            padding: "14px 22px",
            fontFamily: "var(--font-orbitron), sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "transform 180ms ease, background 180ms ease, box-shadow 180ms ease",
          }}
        >
          {status === "loading" ? "Joining…" : "Join the waitlist →"}
        </button>
      </div>
      <p
        style={{
          fontFamily: "var(--font-orbitron), monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:
            status === "error"
              ? "#F87171"
              : status === "success"
                ? "#22C55E"
                : "#9A9AA0",
          margin: 0,
        }}
      >
        {message || "Free until the book drops. $39 after. No spam."}
      </p>
      <style jsx>{`
        .dgb-cta:hover:not(:disabled) {
          background: #f4c563 !important;
          transform: scale(1.04);
          box-shadow: 0 0 0 2px #f5f5f7, 0 0 0 4px #d4a843;
        }
        @media (prefers-reduced-motion: reduce) {
          .dgb-cta {
            transition: none !important;
          }
          .dgb-cta:hover:not(:disabled) {
            transform: none;
          }
        }
      `}</style>
    </form>
  );
}
