# Live-Stats Database — Outline

How we'd give the live dashboard a memory. Today nothing is stored — every page
load asks the outside feeds "what is the number right now?" and forgets the
answer after a few minutes. This outline adds a **dated record of every reading**
so we can show history, draw charts, prove where a number came from, and keep
working when a feed is down.

It maps 1:1 onto what the code already produces — `LiveValue` and `LiveBundle`
in [src/lib/live/sources.ts](src/lib/live/sources.ts).

- **Engine:** Postgres (Vercel Postgres / Neon — already in the Vercel stack).
  The schema is plain SQL, so it moves to any SQL database unchanged.
- **Two layers below:** the **Core** (4 tables) is everything you need to start.
  The **Build-on** layer is optional extras for when you want more.

---

## Plain-words picture

- One **feed** = an outside source we ask (NatGold, CoinGecko, Treasury, DefiLlama).
- One **snapshot** = one round of asking *all* the feeds at once (= one `LiveBundle`).
- One **reading** = a single number inside that round (gold price, BIV, US debt…).
- One **error** = a feed that didn't answer that round.

Every few minutes a small timed job takes one snapshot and saves all its readings.
The dashboard then reads the newest snapshot from our own database instead of
hitting the outside feeds on every visit. Charts just read the long list of past
readings for one number.

---

## CORE — start here (4 tables)

### 1. `live_sources` — the feeds we ask (reference list)
One row per upstream. Rarely changes. Mirrors the source labels/URLs already in
sources.ts.

| column        | type          | notes                                        |
|---------------|---------------|----------------------------------------------|
| `id`          | text (PK)     | `natgold_snapshot`, `coingecko_paxg`, …      |
| `label`       | text          | "NatGold API (COMEX)"                         |
| `url`         | text          | upstream endpoint                            |
| `ttl_seconds` | int           | how long we cache it (300, 3600, 86400)      |
| `active`      | bool          | turn a feed off without deleting it          |
| `created_at`  | timestamptz   | default `now()`                              |

### 2. `live_snapshots` — one row per "ask everything" round
One row per `fetchLiveBundle()` run.

| column        | type           | notes                                       |
|---------------|----------------|---------------------------------------------|
| `id`          | bigserial (PK) |                                             |
| `assembled_at`| timestamptz    | `LiveBundle.assembledAt`                    |
| `ok`          | bool           | true if every feed answered                 |
| `error_count` | int            | how many feeds failed this round            |
| `created_at`  | timestamptz    | default `now()`                             |

### 3. `live_readings` — the heart: every number, every round (time-series)
One row per metric per snapshot. This is what charts and "latest value" both read.

| column        | type           | notes                                              |
|---------------|----------------|----------------------------------------------------|
| `id`          | bigserial (PK) |                                                    |
| `snapshot_id` | bigint (FK)    | → `live_snapshots.id`, `ON DELETE CASCADE`         |
| `metric`      | text           | `spot`,`aisc`,`biv`,`paxg`,`xaut`,`btc_mcap`,`us_debt`,`rwa_mcap` |
| `value`       | numeric        | `LiveValue.value`                                  |
| `unit`        | text           | `USD/oz`, `USD/token`, `USD`                       |
| `source_id`   | text (FK)      | → `live_sources.id`                                |
| `updated_at`  | timestamptz    | the feed's **own** timestamp (`LiveValue.updatedAt`)|
| `stale`       | bool           | true if served from fallback (`LiveValue.stale`)   |
| `meta`        | jsonb          | extras: `{change24h, marketCap, …}` (`LiveValue.meta`)|

Constraints / indexes:
- `UNIQUE (snapshot_id, metric)` — one reading per number per round.
- `INDEX (metric, updated_at DESC)` — fast "newest gold price" + chart pulls.

### 4. `live_errors` — which feed failed, and why
One row per failed leg. Mirrors `LiveBundle.errors`.

| column        | type           | notes                                |
|---------------|----------------|--------------------------------------|
| `id`          | bigserial (PK) |                                      |
| `snapshot_id` | bigint (FK)    | → `live_snapshots.id`, cascade       |
| `source_key`  | text           | `paxg`, `usDebt`, `snapshot`, …      |
| `message`     | text           | the error string                     |
| `created_at`  | timestamptz    | default `now()`                      |

---

## BUILD-ON — add later when you want more

### 5. `stat_definitions` — the book figures registry, in the DB
Today the registry lives in code ([src/data/stats-registry.ts](src/data/stats-registry.ts)).
Move (or mirror) it here when you want to edit figures without a redeploy.
One row per `StatEntry`: `id`, `label`, `category`, `section`, `chapter`,
`book_value`, `book_unit`, `book_date`, `formula`, `live_source_id`,
`derivation`, `display_format`, `precision`, `direction_polarity`, `notes`.

### 6. `derived_values` — computed book stats per snapshot
The output of [src/lib/live/derive.ts](src/lib/live/derive.ts), stored so the
"book snapshot vs today" deltas are also historical.
`id`, `snapshot_id` (FK), `stat_id` (→ `stat_definitions`), `value`, `created_at`.
Unique on `(snapshot_id, stat_id)`.

### 7. `source_health` — uptime / latency log (optional ops table)
One row per feed per round: `snapshot_id`, `source_id`, `ok`, `latency_ms`,
`http_status`. Powers a "which feeds are flaky" view.

---

## How it gets filled and read

**Write (every 5 min):** a Vercel Cron job hits a new `POST /api/live/ingest`
route → calls the existing `fetchLiveBundle()` → inserts 1 `live_snapshots` row +
N `live_readings` rows (+ any `live_errors`). Nothing else changes upstream.

**Read:**
- *Dashboard "now":* `SELECT` the newest `live_snapshots` row and its readings —
  no outside call on the visitor's path, so it's instant and never half-loads.
- *Charts / history:* pull `live_readings WHERE metric = $1 ORDER BY updated_at`.
- *Live feeds stay as the fallback* if the DB is empty or behind.

**Housekeeping:** old rows can be thinned (e.g. keep 5-min detail for 90 days,
then one row per day) with a scheduled `DELETE` — add when volume matters, not now.

---

## Reference SQL (Core only — copy/paste to start)

```sql
CREATE TABLE live_sources (
  id          TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  url         TEXT NOT NULL,
  ttl_seconds INTEGER NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE live_snapshots (
  id           BIGSERIAL PRIMARY KEY,
  assembled_at TIMESTAMPTZ NOT NULL,
  ok           BOOLEAN NOT NULL,
  error_count  INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE live_readings (
  id          BIGSERIAL PRIMARY KEY,
  snapshot_id BIGINT NOT NULL REFERENCES live_snapshots(id) ON DELETE CASCADE,
  metric      TEXT NOT NULL,
  value       NUMERIC NOT NULL,
  unit        TEXT NOT NULL,
  source_id   TEXT REFERENCES live_sources(id),
  updated_at  TIMESTAMPTZ NOT NULL,
  stale       BOOLEAN NOT NULL DEFAULT FALSE,
  meta        JSONB,
  UNIQUE (snapshot_id, metric)
);
CREATE INDEX live_readings_metric_time_idx ON live_readings (metric, updated_at DESC);

CREATE TABLE live_errors (
  id          BIGSERIAL PRIMARY KEY,
  snapshot_id BIGINT NOT NULL REFERENCES live_snapshots(id) ON DELETE CASCADE,
  source_key  TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

*Outline only — no tables created, no code wired yet. Next step when you're ready:
pick the engine (Vercel Postgres/Neon recommended), run the Core SQL, add the
`/api/live/ingest` route + Vercel Cron.*
