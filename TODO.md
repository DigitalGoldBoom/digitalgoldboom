# TODO — digitalgoldboom.com (web)

Tracked open work for the live Next.js site. Highest-priority / money-impacting at top.

## 🔴 CRITICAL — losing money right now

### 1. NewsletterForm loses every signup (real bug)
- **What's wrong:** [`src/components/NewsletterForm.tsx`](src/components/NewsletterForm.tsx) is a
  **stub**. It fakes a `setTimeout`, shows "You're in!", and **throws the email away** — no API
  call, no `track()` event. Every person who signs up is lost.
- **Why it matters:** Pillar #3 (capture the visitor → owned list → book sales) is the core of the
  1M-sales mission. This is the biggest leak on the site.
- **Blocked on:** the email-tool decision (Kit vs Beehiiv vs newer/better) — **owned by the
  `dgb-cmo` skill**, which deep-researches and DECIDES the marketing stack. Docs currently
  contradict each other (GROWTH-STRATEGY → Kit; INTEGRATIONS → "Beehiiv confirmed"; code → Kit).
- **Plan to execute (when un-parked):**
  1. Run `dgb-cmo` → resolve the email-tool contradiction with a fresh sourced review; RECORD the
     decision so all docs + code agree.
  2. `dgb-cmo` DISPATCHES to `dgb-conversion-analytics` → wire `NewsletterForm` to
     `/api/subscribe`, fire the `track()` events, add double opt-in + rate-limiting.
  3. VERIFY end-to-end: real submit → 200 → record lands in the email tool → confirm mail sent.
- **Status:** PARKED by Andrew 2026-06-27 ("critical to execute" but focused elsewhere for now).
