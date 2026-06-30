"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Mining-industry early-reviewer capture. POSTs to /api/subscribe with source:"industry-feedback"
 * plus name + company/role. Mirrors Hero.tsx — status from the REAL response, no fake success.
 */
export default function IndustryReviewForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
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
        body: JSON.stringify({
          email,
          source: "industry-feedback",
          name: name || undefined,
          company: company || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      track("industry_feedback_submit");
      setStatus("success");
      setEmail("");
      setName("");
      setCompany("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[var(--r-xl)] border p-6 text-center"
        style={{ borderColor: "var(--border-gold)", background: "var(--accent-gold-wash)" }}
      >
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          Thank you — you&apos;re on the reviewer list.
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          We&apos;ll be in touch with a copy and how to share your feedback.
        </p>
      </div>
    );
  }

  const locked = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left">
      <div>
        <label htmlFor="ind-email" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Email <span style={{ color: "var(--accent-gold)" }}>*</span>
        </label>
        <input
          id="ind-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={locked}
          placeholder="you@email.com"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="ind-name" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Name
        </label>
        <input
          id="ind-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={locked}
          placeholder="Your name"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="ind-company" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Company / role{" "}
          <span className="font-normal" style={{ color: "var(--text-tertiary)" }}>
            — so we know your angle
          </span>
        </label>
        <input
          id="ind-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={locked}
          placeholder="e.g. Geologist, Acme Gold"
          className="input"
        />
      </div>

      <button type="submit" disabled={locked} className="btn-primary w-full">
        {status === "submitting" ? "Sending…" : "Become an early reviewer →"}
      </button>

      <p role="status" aria-live="polite" className="min-h-[1rem] text-xs" style={{ color: "var(--text-tertiary)" }}>
        {status === "error" ? (
          <span style={{ color: "#ff6b6b" }}>{message}</span>
        ) : (
          <span>No spam. We only email you about the book and your review.</span>
        )}
      </p>
    </form>
  );
}
