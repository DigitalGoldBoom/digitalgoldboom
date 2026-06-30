"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Optional, lowest-friction fallback for the CASH affiliate program: a promoter who'd rather be
 * walked through LemonSqueezy onboarding leaves their email and we send the steps. ONE field only
 * (email) — the NATG wallet + social-handle fields were removed (the program is cash-commission
 * only; no token, no wallet). POSTs to /api/subscribe with source:"affiliate-interest". Status comes
 * from the REAL response (never fake success on a non-2xx). dgb-conversion-analytics owns final wiring.
 */
export default function AffiliateInterestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "affiliate-interest" }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      track("affiliate_walkthrough_request");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[20px] border p-6 text-center" style={{ borderColor: "var(--v2-gold)", background: "var(--v2-gold-soft)" }}>
        <p className="font-semibold" style={{ color: "#F4F4F7" }}>Done — check your inbox.</p>
        <p className="mt-2 text-sm" style={{ color: "var(--v2-dim)" }}>
          We&apos;ll send you the steps to sign up as a LemonSqueezy affiliate. No spam.
        </p>
      </div>
    );
  }

  const locked = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3 sm:flex-row">
      <label htmlFor="aff-email" className="sr-only">Email</label>
      <input
        id="aff-email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={locked}
        placeholder="you@email.com"
        className="v2-input flex-1"
      />
      <button type="submit" disabled={locked} className="v2-btn-ghost shrink-0 whitespace-nowrap">
        {status === "submitting" ? "Sending…" : "Send me the steps"}
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
