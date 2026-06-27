"use client";

import { useState, FormEvent } from "react";
import { track } from "@vercel/analytics";

/**
 * PsWaitlistForm — node-exact clone of the Framer "Join the Waitlist" form:
 * pill email input (fill rgb(33,33,33), radius 100px, placeholder "Enter your email")
 * with the green "Get Digital Gold Boom Free" button on the right, and the
 * "No spam, just genuine updates!" line with a check icon below. Posts to /api/subscribe.
 */
const CHECK_ICON = "https://framerusercontent.com/images/AmSPZcDJDRerBarMeWXXOO7Ae90.svg";

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
    <div className="flex w-full max-w-[530px] flex-col items-center gap-3">
      <form onSubmit={onSubmit} className="relative w-full" noValidate>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="h-[60px] w-full rounded-full pl-5 pr-[150px] text-[17px] outline-none"
          style={{
            background: "rgb(33,33,33)",
            border: "1px solid rgb(0,0,0)",
            color: "rgb(225,227,233)",
            fontFamily: "var(--font-ps-rethink), sans-serif",
            fontWeight: 500,
          }}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="ps-cta absolute right-1.5 top-1.5 h-[48px]"
        >
          {state === "loading" ? "Joining…" : "Get Digital Gold Boom Free"}
        </button>
      </form>

      <div className="flex items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHECK_ICON} alt="" width={15} height={15} aria-hidden />
        <span
          className="text-[11px] font-medium"
          style={{ color: "rgb(167,173,190)", fontFamily: "var(--font-ps-manrope), sans-serif" }}
          aria-live="polite"
        >
          {state === "ok" || state === "err" ? msg : "No spam, just genuine updates!"}
        </span>
      </div>
    </div>
  );
}
