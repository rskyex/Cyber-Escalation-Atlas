import type { AttributionConfidence, GovernanceFlag } from "@/lib/types/incidents";

/**
 * Governance flag codebook (methodology §05). Formal flags record an official
 * act and are checked against attribution detail by scripts/check-coding.mjs;
 * analytic flags are the atlas's own judgement and are labelled as such.
 */
export const flagCodebook: { flag: GovernanceFlag; kind: "formal" | "analytic"; definition: string; evidence: string }[] = [
  {
    flag: "attribution-public",
    kind: "formal",
    definition: "A government names the responsible state or state organ on the record.",
    evidence: "Official statement, advisory or court filing naming the state. “A sophisticated state actor” is not enough.",
  },
  {
    flag: "sanctions-imposed",
    kind: "formal",
    definition: "Sanctions designations that cite this operation.",
    evidence: "Official designation notice (OFAC, EU Council, FCDO). Must match a “Sanctions” consequence.",
  },
  {
    flag: "indictment",
    kind: "formal",
    definition: "Criminal charges that cite this operation.",
    evidence: "Unsealed indictment or justice ministry record. Must match an “Indictment” consequence.",
  },
  {
    flag: "regulatory-change",
    kind: "formal",
    definition: "A binding rule, directive or law adopted in response.",
    evidence: "The instrument and its stated link to the case.",
  },
  {
    flag: "international-cooperation",
    kind: "formal",
    definition: "Two or more states act jointly: a joint statement, joint advisory or joint operation.",
    evidence: "The joint document. Attribution coordination must be “joint”.",
  },
  {
    flag: "un-discussion",
    kind: "formal",
    definition: "Raised by a state in a UN body.",
    evidence: "UN record.",
  },
  {
    flag: "norm-violation",
    kind: "analytic",
    definition: "The atlas judges the operation contrary to a named norm (a UN GGE 2015 norm, a Tallinn Manual rule).",
    evidence: "The norm must be listed in the case's norms invoked.",
  },
  {
    flag: "deterrence-signal",
    kind: "analytic",
    definition: "A state response the atlas reads as meant to deter.",
    evidence: "Needs at least one formal response to interpret; never coded with “No Formal Response”.",
  },
];

/** Attribution confidence levels defined by evidence layers (methodology §05). */
export const confidenceLevels: { level: AttributionConfidence; requires: string }[] = [
  { level: "confirmed", requires: "A government attributes on the record and a legal act follows (indictment or sanctions), or two or more governments attribute on the record and technical analysis agrees." },
  { level: "high", requires: "One government attributes on the record, with technical analysis; or authenticated primary documents (for example the Snowden files) with technical analysis." },
  { level: "moderate", requires: "Technical analysis only, or technical analysis plus press reports citing unnamed officials." },
  { level: "low", requires: "Indicators only, or a single unverified claim." },
  { level: "contested", requires: "Credible competing attributions, or reciprocal operations coded as one case." },
];
