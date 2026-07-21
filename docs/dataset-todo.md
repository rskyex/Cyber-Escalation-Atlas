# Dataset expansion — candidate cases (research backlog)

This is a **research to-do list**, not data. Nothing here is part of the
published dataset until it has been fully sourced and verified against the
inclusion criteria in [`/methodology`](../src/app/methodology/page.tsx)
(section 03). The Atlas does not add cases from memory or speculation; each
entry below is a prompt for future sourcing work, not a claim of fact.

## How to promote a candidate to the dataset

A candidate becomes a case only when **all** of the following hold:

1. It satisfies ≥3 of the five inclusion criteria (methodology §03).
2. Every field in the `Incident` type (`src/lib/types/incidents.ts`) can be
   filled from **cited, verifiable** public sources — no placeholders.
3. It carries ≥2 independent source categories, each with a real, resolving
   URL where a stable one exists.
4. `lastUpdated` is set to the date the record was compiled/reviewed.
5. `npm run build` and `npm run check:counts` both pass.

Do **not** invent attribution, dates, malware families, or ATT&CK IDs to
complete a record. If a field cannot be sourced, the candidate stays here.

## Candidate template

Copy this block per candidate. Leave `// TODO: verify source` only in this
file — never in shipped data.

```
### <Working name / operation>
- Year / date range:            <!-- to source -->
- Suspected actor & confidence: <!-- confirmed | high | moderate | low | contested -->
- Incident type:                <!-- espionage | destructive | ransomware | influence | sabotage | hybrid -->
- Why it matters (1 sentence):
- Candidate sources (need real URLs):
  - [ ] Government/legal (CISA / DOJ / national CERT / court filing)
  - [ ] Vendor/technical (Mandiant / Microsoft / CrowdStrike / etc.)
  - [ ] Academic or major journalism
- Open questions / attribution disputes:
- Inclusion-criteria check (≥3 of 5):  [ ] attribution  [ ] spillover  [ ] governance response  [ ] ≥2 source categories  [ ] ≥2 lenses
```

## Areas known to be under-represented

These are gaps to prioritise, phrased as sourcing tasks — not assertions that
specific incidents occurred as imagined:

- **2024–2026 operations.** Coverage thins toward the present. Recent
  incidents must be sourced from primary reporting before inclusion; do not
  back-fill from recollection.
- **Non-Western-reported operations.** English-language open-source bias is
  acknowledged in methodology §02. Candidates documented primarily in
  non-English sources need careful translation and corroboration.
- **Financial-sector and telecom operations** beyond the current sample.
- **Operations with contested or absent attribution** — these are analytically
  valuable for the attribution-uncertainty theme, but must be labelled
  `contested`/`low` honestly rather than assigned a state to look complete.

## Changelog discipline

When a candidate is promoted, record it in the dataset changelog surfaced on
the `/data` page so the corpus's growth is auditable.
