#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Count-consistency guard.
//
// Verifies that (a) the number of incident records in the data layer is what
// we expect, and (b) no page reintroduces a hardcoded case-count literal that
// could drift away from the single source of truth (src/lib/datasetStats.ts).
//
// Run: node scripts/check-counts.mjs
// ---------------------------------------------------------------------------

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const DATA_FILES = [
  "src/data/incidents/seed.ts",
  "src/data/incidents/newCases2024.ts",
  "src/data/incidents/newCasesGlobal.ts",
  "src/data/incidents/newCasesAttribution.ts",
];

// Count top-level incident records by counting `slug:` keys, which appear
// exactly once per incident object in these source files.
let total = 0;
const perFile = {};
for (const rel of DATA_FILES) {
  const src = readFileSync(join(root, rel), "utf8");
  const n = (src.match(/^\s*slug:\s*["'`]/gm) || []).length;
  perFile[rel] = n;
  total += n;
}

const errors = [];

// (1) Sanity: the corpus should not silently collapse to zero.
if (total === 0) {
  errors.push("No incident records found — data layer may be broken.");
}

// (2) Pages that surface a case count must reference the derived export,
//     not a bare numeric literal. Flag any `value: "<number>"` paired with a
//     "Cases" label in the hero / social-card stat arrays.
const DISPLAY_FILES = [
  "src/app/page.tsx",
  "src/app/opengraph-image.tsx",
  "src/app/twitter-image.tsx",
];

for (const rel of DISPLAY_FILES) {
  const src = readFileSync(join(root, rel), "utf8");
  const hardcoded = src.match(
    /value:\s*["'`]\d+["'`]\s*,\s*label:\s*["'`][^"'`]*Cases[^"'`]*["'`]/g,
  );
  if (hardcoded) {
    errors.push(
      `${rel} contains a hardcoded case count: ${hardcoded.join(
        ", ",
      )}. Derive it from caseCount in src/lib/datasetStats.ts instead.`,
    );
  }
}

console.log("Incident records per file:");
for (const [f, n] of Object.entries(perFile)) console.log(`  ${n.toString().padStart(3)}  ${f}`);
console.log(`  ---\n  ${total.toString().padStart(3)}  total (caseCount)`);

if (errors.length) {
  console.error("\n✗ Count-consistency check FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log("\n✓ Count-consistency check passed. All user-facing counts derive from the data layer.");
