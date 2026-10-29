# Changelog

## Dataset 1.2.0 — 2026-10-29

Record fields:

- Every case now has `lastUpdated` (2026-10-29, the date of this review) and `inclusionCriteriaMet`,
  the methodology §03 criteria it meets. Two criteria (formal governance response, two source
  categories) follow from the record and are checked by `npm run check:coding`; the other three are
  coding judgements. Four cases meet fewer than 3 of 5: Oldsmar, India/Pakistan, APT-C-23 and
  Thailand. Five cases have one source category: Oldsmar, Costa Rica, Australia Parliament,
  India/Pakistan and APT-C-23.
- 69 sources gained a URL (84 of 117 now have one). Each URL was opened and matched to the cited
  document, or, where the site blocks automated requests, its exact path was confirmed by a redirect
  or the publisher's own listing. Where the document showed the citation was wrong, the title or
  date was corrected: Petya (Microsoft), Industroyer2 (ESET), Conti update (9 Mar 2022), CSRB report
  (2 Apr 2024), KV botnet (a DOJ, not FBI, release), Transparent Tribe (Kaspersky, 20 Aug 2020),
  APT-C-23 (ESET, 30 Sep 2020), Bangladesh e-gov (TechCrunch), Der Spiegel and Kaspersky Regin
  titles, Salt Typhoon (Treasury jy2792 title; the CISA document is a hardening guide, not an
  advisory), and Stevens' Flame paper (CRYPTO 2013, sole author).
- Not yet corrected, for review: no published document was found for several cited sources
  (Recorded Future 2019 India/Pakistan report, Check Point Gaza Cybergang report, Thai Election
  Commission statement and Reuters article, Bangladesh CERT 2021 advisory, ACSC Parliament advisory,
  UnitedHealth 13 Mar 2024 update, Microsoft Salt Typhoon profile, Washington Post 26 Oct 2024
  article, Belgian prosecutor closure statement). Kyivstar's "SBU statement" was a Reuters interview;
  TSA directive Pipeline-2021-01 dates from May 2021, not July; the Clapper remarks were at GEOINT,
  not AFCEA; the Caesars figure was the WSJ's, not Bloomberg's; Cloud Hopper was a PwC/BAE report.

Exports:

- Unpeace score is exported on its native 1–10 scale (was multiplied to 0–100) in the CSV, compare
  and PDF exports; both scores are labelled with their scale. CSV gains `inclusionCriteriaMet` and
  `sourceUrls`.

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
