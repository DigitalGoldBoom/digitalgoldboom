"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Early-interest capture for the affiliate / share-to-earn program (opens at launch).
 * POSTs to /api/subscribe with source:"affiliate-interest" plus the optional social handle and
 * wallet (for NATG rewards later). Mirrors Hero.tsx: status comes from the REAL response — never
 * fake success on a non-2xx. dgb-conversion-analytics owns final wiring/hardening (tracking event
 * name, rate-limit, Kit custom-field mapping) — this fires a track() and sends the fields cleanly.
 */
export default function AffiliateInterestForm() {
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [wallet, setWallet] = useState("");
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
          source: "affiliate-interest",
          handle: handle || undefined,
          wallet: wallet || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }
      track("affiliate_interest_submit");
      setStatus("success");
      setEmail("");
      setHandle("");
      setWallet("");
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
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          We&apos;ll send the full rules — and your spot — before the program opens. No spam.
        </p>
      </div>
    );
  }

  const locked = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left">
      <div>
        <label htmlFor="aff-email" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Email <span style={{ color: "var(--accent-gold)" }}>*</span>
        </label>
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
          className="input"
        />
      </div>

      <div>
        <label htmlFor="aff-handle" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Where you&apos;ll share
        </label>
        <input
          id="aff-handle"
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          disabled={locked}
          placeholder="Your main social handle (e.g. @yourname)"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="aff-wallet" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          Wallet address{" "}
          <span className="font-normal" style={{ color: "var(--text-tertiary)" }}>
            — optional, for NATG rewards later
          </span>
        </label>
        <input
          id="aff-wallet"
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          disabled={locked}
          placeholder="0x… (you can add this later)"
          className="input"
        />
      </div>

      <button type="submit" disabled={locked} className="btn-primary w-full">
        {status === "submitting" ? "Adding you…" : "Join the early list →"}
      </button>

      <p role="status" aria-live="polite" className="min-h-[1rem] text-xs" style={{ color: "var(--text-tertiary)" }}>
        {status === "error" ? (
          <span style={{ color: "#ff6b6b" }}>{message}</span>
        ) : (
          <span>The program opens at launch. No spam, unsubscribe anytime.</span>
        )}
      </p>
    </form>
  );
}
