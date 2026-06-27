"use client";

import { useState, FormEvent } from "react";
import { track } from "@vercel/analytics";

export default function PsWaitlistForm({ source = "ps-home" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

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
      if (!res.ok) throw new Error("network");
      track("ps_waitlist_submit");
      setState("ok");
      setMsg("You're on the list — watch your inbox.");
      setEmail("");
    } catch {
      setState("err");
      setMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="flex-1 rounded-full px-5 py-4 text-base outline-none transition-colors"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--ps-line-strong)",
            color: "#fff",
          }}
        />
        <button type="submit" disabled={state === "loading"} className="ps-cta justify-center">
          {state === "loading" ? "Joining…" : "Get it Free"}
        </button>
      </div>
      <p className="mt-3 text-sm text-[var(--ps-text-3)]" aria-live="polite">
        {state === "ok" || state === "err" ? msg : "No spam, just genuine updates!"}
      </p>
    </form>
  );
}
