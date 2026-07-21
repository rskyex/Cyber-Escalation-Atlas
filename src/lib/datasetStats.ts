// ---------------------------------------------------------------------------
// Dataset statistics — single source of truth for user-facing counts.
//
// Every page that displays "N cases" MUST derive it from here rather than
// hardcoding a literal, so the figure can never drift out of sync with the
// underlying data. See scripts/check-counts.mjs for the consistency test.
// ---------------------------------------------------------------------------

import { seedIncidents } from "@/data/incidents";
import type { Incident } from "@/lib/types/incidents";

/**
 * The canonical count of documented cases in the atlas.
 *
 * Note on terminology: the dataset is organised one record per *incident*
 * (a discrete operation or campaign). Throughout the UI these records are
 * surfaced as "cases". The two words refer to the same underlying rows —
 * there is no separate, larger incident tally. Any page that needs a count
 * reads `caseCount` so the numbers cannot diverge.
 */
export const caseCount: number = seedIncidents.length;

/** Number of interactive Observatory layers (L-01 … L-07). */
export const observatoryLayerCount = 7;

/**
 * Best-effort occurrence date for a single incident, used to derive the
 * dataset *coverage* cutoff (how current the corpus is). This intentionally
 * uses the incident's own date — NOT `lastUpdated`, which records when a
 * record was last reviewed, a different question.
 */
function incidentDate(inc: Incident): Date {
  // Pull a trailing YYYY(-MM(-DD)) or YYYY out of the free-text dateRange.
  const match = inc.dateRange?.match(/(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?\s*$/);
  if (match) {
    const [, y, m, d] = match;
    return new Date(Number(y), m ? Number(m) - 1 : 11, d ? Number(d) : 28);
  }
  return new Date(inc.year, 11, 31);
}

/** The latest incident date across the whole dataset. */
export function latestIncidentDate(
  incidents: Incident[] = seedIncidents,
): Date {
  return incidents
    .map(incidentDate)
    .reduce((a, b) => (b > a ? b : a), new Date(0));
}

/** The most recent case year present in the dataset. */
export const latestCaseYear: number = seedIncidents.reduce(
  (max, inc) => Math.max(max, inc.year),
  0,
);

/**
 * Data cutoff label, "YYYY-MM", auto-derived from the newest case date.
 * Displayed site-wide so readers know how current the corpus is.
 */
export const dataCutoff: string = (() => {
  const d = latestIncidentDate();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
})();
