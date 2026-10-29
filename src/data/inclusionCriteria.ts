import type { InclusionCriterion } from "@/lib/types/incidents";

/**
 * Inclusion criteria (methodology §03). Each case records which ones it meets
 * in `inclusionCriteriaMet`. "formal-governance-response" and
 * "two-source-categories" follow mechanically from the record and are checked
 * by scripts/check-coding.mjs; the other three are coding judgements.
 */
export const inclusionCriteria: { id: InclusionCriterion; label: string; rule: string }[] = [
  {
    id: "state-attribution",
    label: "Attributed (publicly or by government statement) to a state or state-affiliated actor",
    rule: "A government statement, or published vendor/journalistic attribution, names a state or a state-affiliated actor. Criminal groups described as not state-sponsored do not count.",
  },
  {
    id: "effects-beyond-target",
    label: "Produced effects beyond the immediate target (collateral, cascading, or cross-border)",
    rule: "Documented effects on parties other than the organisation attacked, or across borders.",
  },
  {
    id: "formal-governance-response",
    label: "Triggered a formal governance response (attribution statement, sanctions, indictment, regulatory change)",
    rule: "Attribution consequences other than \"No Formal Response\", or a 'regulatory-change' flag.",
  },
  {
    id: "two-source-categories",
    label: "Documented by at least two independent source categories (government, vendor, academic, journalistic, legal)",
    rule: "The case's sources span at least two categories.",
  },
  {
    id: "two-analytical-lenses",
    label: "Relevant to at least two of the three analytical lenses (escalation, infrastructure, governance)",
    rule: "Every current case has escalation and infrastructure coding, so this criterion does not currently discriminate.",
  },
];

export const INCLUSION_THRESHOLD = 3;
