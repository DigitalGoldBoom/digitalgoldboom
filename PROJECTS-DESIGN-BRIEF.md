# Projects Dashboard — Designer Brief

**Goal.** A serious, credible public page that shows how solid these two gold assets are and how they move through the NatGold **tokenization pipeline**. Two deposits: **Friday** (current, QP-verified) and **Cahuilla** (in the pipeline; book framing). Match the look of the `/live` dashboard and the site design tokens.

**Status: ready to design.** The verified data + the diagrams are in place. Do **not** invent or change any number — pull everything from the data module.

---

## Where everything is

| Thing | Location |
|------|----------|
| **Verified data** (single source of truth) | [`src/data/projects.ts`](src/data/projects.ts) — `PROJECTS`, `COMBINED_TOKENS`, `BIV_ANCHOR_USD` |
| **Diagrams** (already copied in) | `/public/projects/friday/*` and `/public/projects/cahuilla/*` (drillmap, geology, soils, longsection, photo) |
| **Live token value** | `BIV` from the existing live feed (`src/lib/live/sources.ts`) — value = `tokens × live BIV` |

Every figure in `projects.ts` carries provenance: `sourceTag` ('report' = NI 43-101, 'release' = company press release) and `isHistorical` on each resource/backing row.

---

## Page structure

### 1. PIPELINE SUMMARY — the top section (hero)
The thing the author specifically wants at the top: a summary of the pipeline across both projects.
- **Headline:** combined **561,702 NatGold Tokens** (`COMBINED_TOKENS`) entering the pipeline from these two deposits.
- **Per project, show the token amount AND the resource categories (including historical) backing it** — read straight from `project.pipeline`:
  - Friday → **314,204 tokens**, backed by Measured 182,175 oz ×0.80, Indicated 391,908 oz ×0.40, Inferred 58,558 oz ×0.20 (all **current**).
  - Cahuilla → **247,498 tokens**, backed by 618,746 controlled Indicated oz ×0.40 (**historical** estimate — flag it visually, e.g. a small "historical" tag, per `isHistorical`).
- **Live value:** show `tokens × live BIV` for each project and the combined total (updates with the gold price, like `/live`).
- Show the NatGold / seller split (`natgoldPct` / `sellerPct` / `sellerName`).

### 2. Per-project sections (one block each, Friday then Cahuilla)
Use `project.verified` to set the tone (Friday = "current, verified"; Cahuilla = "in pipeline").
1. **Asset header** — name, tagline, location, status.
2. **Token calculation** — the oz → ×ratio → tokens math, by category, as a clean **table** (the "resource split for the token"). Total = `pipeline.totalTokens`.
3. **Resource** — the full deposit resource table (`resource[]`: category, tonnes, grade g/t, ounces), `resourceNote`, `cutoff`. Label historical rows.
4. **Deposit history** (`history`) and **Drilling program** (`drilling`) — short narrative blocks.
5. **Diagrams** — the figures gallery (`figures[]`): drill map, geology, soils, long-section, photo.
6. **Ownership & deal** (`deal`) — price, terms, key dates; mark it as company-disclosure sourced.
7. **Report credit** (`report`) — effective date, QP, firm, prepared-for. Lends the page its authority.
8. **Royalties** (Friday only, `royalties`).

---

## Tone & honesty
- This is investor-facing and about real mineral assets — credibility is the whole point. Lead with the verification (QP, NI 43-101, drill counts, footage) — that's what makes it land as "solid."
- Keep **report-sourced** figures (geology / resource / drilling) visually distinct from **press-release-sourced** figures (deal terms, token counts) so nothing reads as more certified than it is. `sourceTag` is on the data for this.
- Historical backing (Cahuilla) is shown as part of the pipeline, flagged via `isHistorical` — present it cleanly, not buried.

## Build notes
- New route: `src/app/projects/page.tsx` (server component; fetch the live BIV like `/live/page.tsx` does, pass to a client dashboard for the live token values).
- Reuse `/live` brand tokens, card styles, and the `LiveGate`/`VaultShell` shells if appropriate.
- Responsive: Desktop / Tablet / Phone; the diagrams must scale without overflow.
