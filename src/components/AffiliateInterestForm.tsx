"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The PRE-LAUNCH sign-up for the partner program — the only action /partners offers, because the
 * program is not open and nobody can join, get a link, or earn today. ONE field (email): the
 * program's tooling is deliberately unnamed on the page, and the vetting conversation happens by
 * email, so there is nothing else worth asking a stranger for at this stage.
 *
 * POSTs to /api/subscribe with source:"affiliate-interest" and tag:"affiliate". Status comes from
 * the REAL response (never fake success on a non-2xx). dgb-conversion-analytics owns final wiring.
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
        // tag:"affiliate" — without it the API defaults everyone to "free-chapters", which buries
        // a would-be promoter in the same bucket as a reader who wanted a free sample. These two
        // people need completely different emails from you, so they cannot share a tag.
        body: JSON.stringify({ email, source: "affiliate-interest", tag: "affiliate" }),
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
        <p className="font-semibold" style={{ color: "#F4F4F7" }}>You&rsquo;re on the list.</p>
        <p className="mt-2 text-sm" style={{ color: "var(--v2-dim)" }}>
          We&rsquo;ll come back to you before the doors open, with exactly what happens next.
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
