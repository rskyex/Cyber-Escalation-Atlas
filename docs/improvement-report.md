# Cyber Escalation Atlas — Improvement Report

Response to the external audit's 16 improvement points, implemented in four
phases. This document records **what was implemented**, **what was deliberately
deferred or held**, and **judgment calls** made along the way.

Guiding constraint throughout: **no fabrication of sources, facts, attribution,
or dates**, and preservation of the site's methodological-humility tone. Every
external link added was verified before inclusion; unverifiable links were
omitted rather than guessed.

---

## Phase 1 — Reliability

### 1-1 Case-count consistency ✅
- Created `src/lib/datasetStats.ts` as the single source of truth:
  `caseCount = seedIncidents.length`, plus `dataCutoff` and
  `observatoryLayerCount`.
- Homepage hero, `opengraph-image`, and `twitter-image` now derive the count
  instead of hardcoding `"36"`.
- Added `scripts/check-counts.mjs` (+ `npm run check:counts`) that counts
  records in the data files and fails if any display page reintroduces a
  hardcoded case count. **Passes at 36.**
- **Finding / judgment call:** the audit's "43 incidents" and "32 dropdown"
  figures **do not exist anywhere in this repository's code** — the escalation
  lens and compare tool were already fully data-driven off the 36-record
  corpus. The discrepancy is live-site/version drift, not a code bug. The fix
  therefore focused on removing the only genuine hardcoded literals and adding a
  regression guard so counts can never drift again. Terminology ("incident"
  vs "case") is clarified in the `datasetStats` docstring.

### 1-2 Provenance for uncited precision statistics ✅
- Built `StatWithProvenance` / `ProvenanceMark` / `ProvenanceNote`
  (`src/components/observatory/StatProvenance.tsx`) with three markers:
  `≈` illustrative, `▣` structural, `§` sourced. Wired into `MetricBlock`.
- Added a page-level provenance banner to **all 8 Observatory layer pages**,
  plus inline markers on the homepage stat cards, the Observatory hub cards, and
  the compression page's flagged percentages (64% / 36% / etc.).
- **Judgment call:** rather than rewrite every inline number across nine pages
  (high regression risk), the point-of-use banner honestly labels every figure
  on a page as illustrative, and the reusable component is available for
  finer-grained marking. The most-cited offenders (homepage + compression) got
  explicit inline markers.

### 1-3 Score-breakdown transparency ✅
- Added `unpeaceBreakdown` / `entanglementBreakdown` helpers exposing each
  component's input × weight = contribution.
- Added a `ScoreBreakdown` panel to every case page (bar per component, raw sum,
  cap note, formula string).
- Added methodology **§06 "Scoring Formulas"** with anchors (`#unpeace-score`,
  `#entanglement-score`) that the panels link to.
- **Correction:** the site previously described unpeace as "0–100"; it is
  computed 1–10 and rendered on a 0–100 axis. Methodology now states this
  accurately.

### 1-4 Source URLs + landmark enrichment ✅
- `SourceRef.url` already existed and `SourceCard` already rendered links; the
  work was data.
- Added **verified** primary-source URLs and 1–2 additional real
  academic/journalistic sources to the five landmark cases (NotPetya,
  SolarWinds, Stuxnet, WannaCry, Viasat KA-SAT). All 15 URLs were confirmed by a
  verification pass (redirects resolved to final canonical destinations, e.g.
  DOJ `/opa/pr/…` → `/archives/opa/pr/…`, Mandiant → `cloud.google.com`).
- Hyperlinked the `/sources` institution list to official domains.
- **Held (no fabrication):** where a specific URL could not be confirmed (e.g.
  the NCSC NotPetya statement slug), the source is cited **without** a URL
  rather than with a guessed one. Sources like NHS England's review, ICS-CERT
  advisories, and EO 14028 remain title+date only for the same reason.

### 1-5 Data freshness ✅
- Footer shows `Data cutoff: YYYY-MM`, auto-derived from the newest **case**
  date (deliberately not `lastUpdated`, which is a review date).
- Added optional `lastUpdated` to `Incident`; case headers show
  "Record reviewed" (or fall back to the dataset cutoff).
- Set `lastUpdated: "2026-07"` on the five landmark records reviewed in this
  pass.
- Created `docs/dataset-todo.md` — a **candidate backlog template**, explicitly
  not data. **No 2025–26 cases were invented.**

---

## Phase 2 — Depth

### 2-1 Actors ✅
- Actor detail pages gained: an **activity timeline**, a per-case **Attribution
  Basis** block (confidence + claimants + consequences), and, for the
  **Unknown / Contested** profile, a **"Why Attribution Fails" typology**
  sorting its 14 cases into technical-evidence / competing-claims /
  no-political-attribution gaps.
- **Judgment call:** the typology is a **derived analytic categorisation** from
  existing fields (`attribution.confidence`, `attributionDetail`), labelled as
  such on the page — not an external ruling. `src/lib/utils/actors.ts`.

### 2-2 Norms ✅
- Added `originYear` + `originBasis` to each norm (from the instruments already
  listed on each norm, e.g. UN GGE 2015, ILC Articles 2001, AP I 1977).
- Replaced the flat case list with a **chronological, linked timeline**; cards
  show the articulation year; count reconciled to `normEffects`.

### 2-3 Legal reverse-mapping ✅
- `src/lib/utils/legal.ts` builds a case→rule index from the existing
  rule→case data.
- Added a **"Legal Dimensions"** section to case pages listing implicated rules
  and their case-specific questions, linking to `/legal`.

### 2-4 ATT&CK expansion ✅
- **Finding:** all 36 incidents already carry populated `techniques` data — no
  fabrication needed.
- Added `mitreUrl()` and rendered a **Tactic / Technique / ID table** on case
  pages, every ID linking to `attack.mitre.org`.

---

## Phase 3 — Tools

### 3-1 Compare ✅
- Combined **5-axis radar overlay** (recharts) via `comparativeProfile()`.
- Selection reflected in a shareable `?ids=` URL; landing shows a **sample
  comparison (NotPetya vs Stuxnet)** with a labelled banner.

### 3-2 Brief generator ✅
- **Static example brief** shown before generation; standard disclaimer
  **"AI-generated from the CEA dataset — verify before operational use"** now
  prepended to every generated brief.

### 3-3 Simulator ✅
- Added **case-grounded presets** (NotPetya, SolarWinds, Viasat, Stuxnet) with
  parameter estimates explicitly labelled **illustrative**, rationale, and case
  links.
- Added a **"Model Documentation"** panel with the full risk formula,
  coefficients, and tier thresholds.

### 3-4 Site-wide search ✅
- Client-side index (`src/lib/search.ts`) over cases, actors, norms, legal
  rules, and glossary; `SearchModal` with **Cmd/Ctrl-K**, keyboard nav, and a
  header trigger. **No new dependency** (custom token scorer rather than
  Fuse.js) to avoid supply-chain surface.

---

## Phase 4 — Academic infrastructure & technical

### 4-1 Citation ✅
- `/cite` (APA / Chicago / BibTeX for the atlas) + a per-case **"Cite this
  case"** button. `src/lib/utils/cite.ts`.

### 4-2 Dataset publication ✅
- `/data` with CSV + JSON export (generated from bundled data), a **codebook**,
  a **changelog**, and a CC BY 4.0 note.

### 4-3 Education ✅
- `/glossary` — sourced concept definitions (`src/data/glossary.ts`), linked
  from search and from first-use contexts.
- **Discussion Questions** (4 open-ended prompts) added to each landmark case.

### 4-4 SEO / metadata ✅
- `metadataBase` + title template; per-page metadata across server pages and
  client-page layouts; cleaner case/actor titles + OG.
- `sitemap.ts`, `robots.ts`, JSON-LD (Dataset + Person), and a custom
  `not-found` page with section links.
- **Deferred (optional):** per-case dynamic `@vercel/og` images. The site-wide
  OG image (`opengraph-image.tsx` / `twitter-image.tsx`) already exists and
  satisfies the baseline requirement; per-case dynamic OG is a nice-to-have left
  as a follow-up to keep this change set focused.

### 4-5 Accessibility ✅
- Simulator sliders: `aria-label` / `aria-valuemin/max/now/valuetext` +
  focus-visible outline.
- Timeline dots: `aria-label`, `aria-pressed`, keyboard-focus tooltip, visible
  focus ring (no longer color-only for assistive tech).
- Global `:focus-visible` fallback in `globals.css`; `lang="en"` confirmed; all
  images carry `alt`.
- **Partially verified:** 390px mobile layout — wide content (ATT&CK table,
  codebook, compare, radar) is wrapped in `overflow-x-auto`/`ResponsiveContainer`
  containers, but a full device sweep of every page was not performed in this
  pass and is recommended before release.

---

## Verification performed
- `npm run build` — **passes** (type-checks all routes).
- `npm run check:counts` — **passes** (36 records; no hardcoded counts).
- All 15 case-source URLs are the externally verified set; institution links use
  official domains.
- No 2025–26 cases invented; candidate work parked in `docs/dataset-todo.md`.

## Open items / recommended follow-ups
1. Full 390px device sweep of every route.
2. Per-case dynamic OG images (`@vercel/og`).
3. Re-confirm the NCSC NotPetya URL (currently omitted) or cite the confirmed
   GOV.UK alternative.
4. Finer-grained inline provenance markers on the remaining Observatory pages
   (attribution-field, tempo, authority) beyond the page-level banners.
5. Reconcile the deployed site's case count with this repo (the live "43/32"
   figures are not present in this codebase).
