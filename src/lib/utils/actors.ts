// ---------------------------------------------------------------------------
// Actor-page helpers: attribution-basis summaries and the why-attribution-fails
// typology for the Unknown / Contested group.
//
// All classification here is DERIVED from existing incident fields
// (attribution.confidence, attributionDetail). It is the Atlas's own analytic
// categorisation, clearly labelled as such — never an invented external fact.
// ---------------------------------------------------------------------------

import type { Incident } from "@/lib/types/incidents";

/** Incidents attributed to an actor slug, oldest first. */
export function actorCases(all: Incident[], slug: string): Incident[] {
  return all
    .filter((i) => i.actorSlug === slug)
    .sort((a, b) => a.year - b.year);
}

export type AttributionGap =
  | "technical-evidence"
  | "competing-claims"
  | "no-political-attribution";

export const attributionGapMeta: Record<
  AttributionGap,
  { label: string; description: string }
> = {
  "technical-evidence": {
    label: "Insufficient technical evidence",
    description:
      "Forensic indicators are too thin, too shared, or too easily spoofed to link the operation to a specific actor with confidence.",
  },
  "competing-claims": {
    label: "Competing or contested claims",
    description:
      "Multiple actors are named by different parties, or a claimed attribution is publicly disputed, leaving no consensus.",
  },
  "no-political-attribution": {
    label: "No formal political attribution",
    description:
      "Technical suspicion may exist, but no government has made a formal public attribution — often because diplomatic equities outweigh accountability.",
  },
};

/**
 * Classify why a case resists confident attribution, using only existing
 * fields. Order of precedence keeps the classification deterministic.
 */
export function attributionGap(inc: Incident): AttributionGap {
  if (inc.attribution.confidence === "contested") return "competing-claims";
  const coordination = inc.attributionDetail?.coordinationType;
  const consequences = inc.attributionDetail?.consequences ?? [];
  if (
    coordination === "none" ||
    consequences.includes("No Formal Response") ||
    (consequences.length === 1 && consequences[0] === "Public Naming Only")
  ) {
    return "no-political-attribution";
  }
  // Remaining low-confidence cases: treat as an evidentiary gap.
  return "technical-evidence";
}

/** Group a set of incidents by their attribution gap. */
export function groupByAttributionGap(
  incidents: Incident[],
): Record<AttributionGap, Incident[]> {
  const out: Record<AttributionGap, Incident[]> = {
    "technical-evidence": [],
    "competing-claims": [],
    "no-political-attribution": [],
  };
  for (const inc of incidents) out[attributionGap(inc)].push(inc);
  return out;
}
