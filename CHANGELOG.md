# Changelog

## Dataset 1.1.0 — 2026-10-28

Data corrections:

- Tallinn Manual 2.0 rule numbers corrected across norms, the legal mapper, the governance lens,
  case records and the methodology page. Intervention is Rule 66 (was 32 / 80), proportionality
  Rule 113 (was 32), distinction Rule 93 (was 30), countermeasures Rule 20 (was 69), due diligence
  Rules 6–7 (was 14), attribution Rules 14, 15 and 17 (was 4), jurisdiction Rule 8 (was 2),
  law-enforcement cooperation Rule 13 (was 14), necessity Rule 26 (was 22).
- All rule numbers now come from `src/data/tallinnRules.ts`, with the source of each number
  (the Manual's table of contents and the CCDCOE International Cyber Law toolkit).
- `npm run check:data` added as an alias of `check:counts`.
