# Changelog

## Dataset 2.0.0 — 2026-10-29

Breaking schema changes (field names and meanings):

- `escalation.thresholdCrossings` is replaced by `escalation.thresholds`, a closed list of five
  codes (physical effects, civilian service harm, unintended spillover, wartime use, election or
  NC3 target), coded for every case. The old free text is kept as `escalation.significance` and is
  not scored. Wartime use counts Russia–Ukraine from 24 February 2022.
- Unpeace score: `1 + 9 × (1.2 × peak + thresholds − 1.2) ÷ 11`, rounded. Governance responses
  are no longer part of severity and are reported as a separate axis (formal responses and
  analyst judgements). No cap is needed; no case reaches 10 (Viasat is highest).
- Entanglement: `clamp(sectors + countries − 1, 1, 10)` from ISO codes, 10 when the scope is
  global; thresholds no longer counted.
- `infrastructure.targetCountries` holds ISO 3166-1 alpha-2 codes. Non-country areas move to
  `infrastructure.geographicScope` (global, nato-allies, central-europe, allied-jurisdictions).
- The `multiple` sector is removed; `hospitality` is added (Scattered Spider). NotPetya lists
  transportation and manufacturing.
- Consequence "Public Naming Only" is renamed "Public Naming".

Recoding (from `npm run check:coding`, which now passes and runs in `check:data`):

- Ukraine grid 2016: `indictment` added. NotPetya, SolarWinds, WannaCry: `international-cooperation`
  added. Australia Parliament: `attribution-public` removed (no state named on the record).
  Costa Rica, Storm-0558, Kyivstar: `international-cooperation` removed (unilateral).
  `deterrence-signal` removed from Stuxnet, Iran nuclear, India/Pakistan, APT-C-23, Thailand and
  Shamoon. Shamoon's consequence is "No Formal Response" (Panetta's speech named no state).
- Attribution confidence is defined by evidence layers. Kyivstar high (was confirmed: only the
  victim state attributed); Stuxnet and Flame moderate (was high: no government attribution).
  Belgacom stays high on documentary and technical layers. 18 other cases where the claimant
  table implies a different level are listed by the check for review, not recoded.
- Ecuador 2019 data exposure removed: no attacker, outside the atlas's scope. 35 cases.
- New fields: `attribution.intrusionSetIds` (MITRE ATT&CK IDs, checked on attack.mitre.org),
  `attribution.organ`, `attribution.layers`, `infrastructure.targetEntities`,
  `infrastructure.sectorCountryPairs`, `relatedRecords` (only where one cited source names both).

Actor profiles: MITRE group IDs, state organ and attribution basis on every profile. The MSS
profile holds only MSS-attributed groups; new profiles for PRC operations with no organ named,
GCHQ, US–Israeli operations (reported), and criminal ransomware groups. The rule is stated on
/actors.

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
