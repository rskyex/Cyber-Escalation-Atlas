#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Coding-consistency guard.
//
// Checks that each case's governance flags agree with its attribution detail
// (claimants, coordination type, consequences). It reports; it does not
// recode. Errors are contradictions between two fields of the same record and
// fail the run. Warnings are omissions a stricter codebook would likely flag;
// they are printed but do not fail. Also checks the mechanical inclusion
// criteria and lists cases below the 3-of-5 guideline or with one source
// category.
//
// Run: npm run check:coding
// ---------------------------------------------------------------------------

const { seedIncidents } = await import("@/data/incidents");
const { countryNames } = await import("@/data/countries");
const { confidenceFromLayers, attributionLayers } = await import("@/lib/utils/incidents");

// Claimant actors that are not a state speaking for itself.
const NON_STATE_CLAIMANTS = new Set(["Academic/Private Sector", "Contested/Unknown"]);
const FORMAL_FLAGS = ["attribution-public", "sanctions-imposed", "indictment"];
// Consequence ↔ flag pairs that must appear together.
const PAIRS = [
  ["Indictment", "indictment"],
  ["Sanctions", "sanctions-imposed"],
];

const errors = [];
const warnings = [];
const add = (list, inc, rule, detail) => list.push({ slug: inc.slug, rule, detail });

for (const inc of seedIncidents) {
  const flags = new Set(inc.governance.flags);
  const d = inc.attributionDetail;
  if (!d) {
    add(warnings, inc, "no-attribution-detail", "no attributionDetail; flag checks skipped");
    continue;
  }
  const cons = new Set(d.consequences);
  const stateClaimants = d.claimants.filter((c) => !NON_STATE_CLAIMANTS.has(c.actor));
  const noFormalResponse = d.consequences.length === 1 && cons.has("No Formal Response");

  // 1. Consequences and flags name the same formal response.
  for (const [consequence, flag] of PAIRS) {
    if (cons.has(consequence) && !flags.has(flag))
      add(errors, inc, `${flag}-missing`, `consequences include "${consequence}" but no '${flag}' flag`);
    if (flags.has(flag) && !cons.has(consequence))
      add(errors, inc, `${flag}-unsupported`, `'${flag}' flag but consequences do not include "${consequence}"`);
  }

  // 2. Public attribution needs a state to have named someone.
  if (flags.has("attribution-public")) {
    const countryUnknown = /^unknown/i.test(inc.attribution.country);
    if (stateClaimants.length === 0 || countryUnknown)
      add(
        errors,
        inc,
        "attribution-public-without-state",
        `'attribution-public' but ${stateClaimants.length === 0 ? "no government claimant" : "no state named"} (country: "${inc.attribution.country}"; claimants: ${d.claimants.map((c) => c.actor).join(", ")})`,
      );
  }

  // 3. International cooperation cannot be unilateral or absent.
  if (flags.has("international-cooperation") && d.coordinationType !== "joint")
    add(errors, inc, "cooperation-vs-coordination", `'international-cooperation' flag with coordination '${d.coordinationType}'`);

  // 4. "No Formal Response" leaves nothing for formal or analytic flags to describe.
  if (noFormalResponse) {
    const formal = FORMAL_FLAGS.filter((f) => flags.has(f));
    if (formal.length) add(errors, inc, "formal-flag-with-no-response", `${formal.join(", ")} with "No Formal Response"`);
    // A deterrence signal is a reading of a state response, so it needs one.
    if (flags.has("deterrence-signal")) add(errors, inc, "deterrence-signal-with-no-response", `deterrence-signal with "No Formal Response"`);
  }

  // Norm violation is the atlas's judgement and must name the norm.
  if (flags.has("norm-violation") && !inc.governance.normsInvoked.length)
    add(errors, inc, "norm-violation-without-norm", "'norm-violation' flag but normsInvoked is empty");

  // 5. Consequence lists that contradict themselves.
  if (cons.has("No Formal Response") && cons.size > 1)
    add(errors, inc, "no-response-plus-response", `"No Formal Response" listed with ${[...cons].filter((c) => c !== "No Formal Response").join(", ")}`);

  // Warnings: likely omissions.
  const nonState = /criminal|not (directly )?state|individuals|non-state/i.test(inc.attribution.country) || /criminal/i.test(inc.attribution.attributedTo);
  if (cons.has("Public Naming") && !flags.has("attribution-public") && !nonState)
    add(warnings, inc, "naming-without-attribution-flag", `"Public Naming" but no 'attribution-public' flag (country: "${inc.attribution.country}")`);
  if (d.coordinationType === "joint" && !flags.has("international-cooperation"))
    add(warnings, inc, "joint-without-cooperation-flag", "coordination 'joint' but no 'international-cooperation' flag");
  if (d.coordinationType === "none" && stateClaimants.length > 0)
    add(warnings, inc, "none-with-state-claimant", `coordination 'none' but government claimant(s): ${stateClaimants.map((c) => c.actor).join(", ")}`);
}

// Geography: ISO codes only; non-country areas go in geographicScope.
for (const inc of seedIncidents) {
  for (const c of inc.infrastructure.targetCountries)
    if (!countryNames[c]) add(errors, inc, "country-not-iso", `targetCountries has "${c}", not a known ISO 3166-1 alpha-2 code`);
  if (inc.infrastructure.targetSectors.includes("multiple")) add(errors, inc, "sector-multiple", '"multiple" is not a sector');
}

// Attribution confidence vs evidence layers (methodology §05). Reported for
// review, not failed: the claimant table is coarse.
for (const inc of seedIncidents) {
  if (inc.attribution.confidence === "contested") continue;
  const implied = confidenceFromLayers(inc);
  if (implied !== inc.attribution.confidence)
    add(warnings, inc, "confidence-vs-layers", `coded "${inc.attribution.confidence}", layers (${attributionLayers(inc).join(", ") || "none"}) imply "${implied}"`);
}

// Inclusion criteria: the two mechanical ones must match the record.
const lowInclusion = [];
const singleCategory = [];
for (const inc of seedIncidents) {
  const met = new Set(inc.inclusionCriteriaMet ?? []);
  const cons = inc.attributionDetail?.consequences ?? [];
  const formal =
    !(cons.length === 1 && cons[0] === "No Formal Response") || inc.governance.flags.includes("regulatory-change");
  const categories = [...new Set(inc.sources.map((s) => s.category))];
  if (formal !== met.has("formal-governance-response"))
    add(errors, inc, "inclusion-formal-response", `inclusionCriteriaMet ${formal ? "omits" : "claims"} formal-governance-response`);
  if ((categories.length >= 2) !== met.has("two-source-categories"))
    add(errors, inc, "inclusion-source-categories", `inclusionCriteriaMet disagrees with source categories (${categories.join(", ")})`);
  if (!inc.lastUpdated) add(errors, inc, "no-last-updated", "lastUpdated missing");
  if (met.size < 3) lowInclusion.push(`${inc.slug} (${met.size}/5: ${[...met].join(", ")})`);
  if (categories.length === 1) singleCategory.push(`${inc.slug} (${categories[0]})`);
}

function print(title, list) {
  console.log(`\n${title} (${list.length})`);
  const byRule = new Map();
  for (const m of list) byRule.set(m.rule, [...(byRule.get(m.rule) ?? []), m]);
  for (const [rule, ms] of byRule) {
    console.log(`  ${rule} (${ms.length})`);
    for (const m of ms) console.log(`    - ${m.slug}: ${m.detail}`);
  }
}

console.log(`Checked ${seedIncidents.length} cases.`);
print("Errors", errors);
print("Warnings", warnings);
console.log(`
Cases meeting fewer than 3 of 5 inclusion criteria (${lowInclusion.length})`);
for (const l of lowInclusion) console.log(`  - ${l}`);
console.log(`
Cases with only one source category (${singleCategory.length})`);
for (const l of singleCategory) console.log(`  - ${l}`);

if (errors.length) {
  console.error(`\n✗ Coding-consistency check FAILED: ${errors.length} contradiction(s) in ${new Set(errors.map((e) => e.slug)).size} case(s).`);
  process.exit(1);
}
console.log("\n✓ Coding-consistency check passed.");
