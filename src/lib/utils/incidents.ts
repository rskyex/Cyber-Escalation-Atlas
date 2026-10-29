// ---------------------------------------------------------------------------
// Label maps, badge colors, and filter helpers for the incident type system
// ---------------------------------------------------------------------------

import type {
  IncidentType,
  AttributionConfidence,
  EscalationTier,
  TargetSector,
  GovernanceFlag,
  SourceCategory,
  Incident,
  ThresholdCode,
  AttributionLayer,
} from "@/lib/types/incidents";
import { countryName, scopeLabels } from "@/data/countries";

// ---- Label maps -------------------------------------------------------------

export const incidentTypeLabels: Record<IncidentType, string> = {
  espionage: "Espionage",
  destructive: "Destructive",
  ransomware: "Ransomware",
  influence: "Influence Operation",
  sabotage: "Sabotage",
  hybrid: "Hybrid",
};

export const attributionLabels: Record<AttributionConfidence, string> = {
  confirmed: "Confirmed",
  high: "High Confidence",
  moderate: "Moderate Confidence",
  low: "Low Confidence",
  contested: "Contested",
};

export const escalationTierLabels: Record<EscalationTier, string> = {
  probing: "Probing",
  intrusion: "Intrusion",
  disruption: "Disruption",
  degradation: "Degradation",
  destruction: "Destruction",
  strategic: "Strategic Impact",
};

export const targetSectorLabels: Record<TargetSector, string> = {
  energy: "Energy",
  finance: "Finance",
  government: "Government",
  healthcare: "Healthcare",
  telecommunications: "Telecommunications",
  transportation: "Transportation",
  defense: "Defense",
  technology: "Technology",
  manufacturing: "Manufacturing",
  media: "Media",
  education: "Education",
  "critical-infrastructure": "Critical Infrastructure",
  hospitality: "Hospitality",
};

/** Closed threshold list (methodology §06). */
export const thresholdMeta: Record<ThresholdCode, { label: string; crossedWhen: string; evidence: string }> = {
  "physical-effects": {
    label: "Physical effects",
    crossedWhen: "The operation damaged equipment or changed a physical process (power cut, centrifuges, chemical dosing, bricked hardware).",
    evidence: "Victim, government or vendor technical report.",
  },
  "civilian-service-harm": {
    label: "Civilian service harm",
    crossedWhen: "Essential services to the public were disrupted (power, water, fuel, health care, emergency alerts, public telecoms, core government services).",
    evidence: "Official statement or two independent reports.",
  },
  "unintended-spillover": {
    label: "Unintended spillover",
    crossedWhen: "Effects reached states or organisations outside the evident target set.",
    evidence: "Technical analysis of propagation, or victims outside the target state.",
  },
  "wartime-use": {
    label: "Wartime use",
    crossedWhen: "Used during an armed conflict between states, by a party to it. Russia–Ukraine is counted from 24 February 2022.",
    evidence: "Operation date within the conflict.",
  },
  "election-or-nc3-target": {
    label: "Election or NC3 target",
    crossedWhen: "Targets electoral bodies, parties during a campaign, or nuclear command, control and communications.",
    evidence: "Official statement or two independent reports.",
  },
};
export const THRESHOLD_CODES = Object.keys(thresholdMeta) as ThresholdCode[];

/** Governance flags that record an official act, versus analyst judgements. */
export const FORMAL_FLAGS: GovernanceFlag[] = [
  "attribution-public",
  "sanctions-imposed",
  "indictment",
  "regulatory-change",
  "international-cooperation",
  "un-discussion",
];
export const ANALYTIC_FLAGS: GovernanceFlag[] = ["norm-violation", "deterrence-signal"];

/** Display names for an incident's target countries and geographic scope. */
export function targetCountryNames(incident: Incident): string[] {
  const names = incident.infrastructure.targetCountries.map(countryName);
  const scope = incident.infrastructure.geographicScope;
  return scope ? [...names, scopeLabels[scope]] : names;
}

export const governanceFlagLabels: Record<GovernanceFlag, string> = {
  "norm-violation": "Norm Violation (analyst judgement)",
  "attribution-public": "Public Attribution",
  "sanctions-imposed": "Sanctions Imposed",
  indictment: "Indictment",
  "un-discussion": "UN Discussion",
  "regulatory-change": "Regulatory Change",
  "international-cooperation": "International Cooperation",
  "deterrence-signal": "Deterrence Signal (analyst judgement)",
};

export const sourceCategoryLabels: Record<SourceCategory, string> = {
  government: "Government",
  vendor: "Vendor Report",
  academic: "Academic",
  journalistic: "Journalistic",
  legal: "Legal",
};

// ---- Badge color maps -------------------------------------------------------
// Values correspond to Badge component `variant` prop.

type BadgeVariant = "default" | "teal" | "amber" | "navy";

export const incidentTypeBadge: Record<IncidentType, BadgeVariant> = {
  espionage: "navy",
  destructive: "amber",
  ransomware: "amber",
  influence: "default",
  sabotage: "amber",
  hybrid: "teal",
};

export const attributionBadge: Record<AttributionConfidence, BadgeVariant> = {
  confirmed: "teal",
  high: "teal",
  moderate: "default",
  low: "amber",
  contested: "amber",
};

export const escalationTierBadge: Record<EscalationTier, BadgeVariant> = {
  probing: "default",
  intrusion: "default",
  disruption: "navy",
  degradation: "amber",
  destruction: "amber",
  strategic: "teal",
};

export const governanceFlagBadge: Record<GovernanceFlag, BadgeVariant> = {
  "norm-violation": "amber",
  "attribution-public": "teal",
  "sanctions-imposed": "teal",
  indictment: "teal",
  "un-discussion": "navy",
  "regulatory-change": "navy",
  "international-cooperation": "default",
  "deterrence-signal": "default",
};

// ---- Escalation tier ordering -----------------------------------------------

const tierOrder: EscalationTier[] = [
  "probing",
  "intrusion",
  "disruption",
  "degradation",
  "destruction",
  "strategic",
];

export function tierIndex(tier: EscalationTier): number {
  return tierOrder.indexOf(tier);
}

export function compareTiers(a: EscalationTier, b: EscalationTier): number {
  return tierIndex(a) - tierIndex(b);
}

// ---- Filter helpers ---------------------------------------------------------

export function filterByType(
  incidents: Incident[],
  type: IncidentType,
): Incident[] {
  return incidents.filter((i) => i.incidentType === type);
}

export function filterByAttribution(
  incidents: Incident[],
  confidence: AttributionConfidence,
): Incident[] {
  return incidents.filter((i) => i.attribution.confidence === confidence);
}

export function filterBySector(
  incidents: Incident[],
  sector: TargetSector,
): Incident[] {
  return incidents.filter((i) =>
    i.infrastructure.targetSectors.includes(sector),
  );
}

export function filterByGovernanceFlag(
  incidents: Incident[],
  flag: GovernanceFlag,
): Incident[] {
  return incidents.filter((i) => i.governance.flags.includes(flag));
}

export function filterByYear(
  incidents: Incident[],
  startYear: number,
  endYear?: number,
): Incident[] {
  const end = endYear ?? startYear;
  return incidents.filter((i) => i.year >= startYear && i.year <= end);
}

export function filterByCountry(
  incidents: Incident[],
  country: string,
): Incident[] {
  const lower = country.toLowerCase();
  return incidents.filter(
    (i) =>
      i.attribution.country.toLowerCase() === lower ||
      targetCountryNames(i).some((c) => c.toLowerCase() === lower),
  );
}

export function sortByYear(
  incidents: Incident[],
  direction: "asc" | "desc" = "asc",
): Incident[] {
  return [...incidents].sort((a, b) =>
    direction === "asc" ? a.year - b.year : b.year - a.year,
  );
}

export function sortByEscalation(
  incidents: Incident[],
  direction: "asc" | "desc" = "desc",
): Incident[] {
  return [...incidents].sort((a, b) => {
    const diff =
      tierIndex(a.escalation.peakTier) - tierIndex(b.escalation.peakTier);
    return direction === "asc" ? diff : -diff;
  });
}

// ---- Comparative profile (radar axes) ---------------------------------------

const confidenceStrength: Record<AttributionConfidence, number> = {
  confirmed: 100,
  high: 80,
  moderate: 60,
  low: 40,
  contested: 20,
};

export interface ComparativeProfile {
  escalation: number; // 0–100, peak tier
  infrastructure: number; // 0–100, sector + country spread
  governance: number; // 0–100, governance-response density
  attribution: number; // 0–100, attribution strength
  entanglement: number; // 0–100, entanglement score
}

/**
 * Normalise an incident onto five comparable 0–100 axes for the radar overlay.
 * These are derived from the same heuristic fields as the case scores; they are
 * comparison aids, not measurements.
 */
export function comparativeProfile(incident: Incident): ComparativeProfile {
  const tier = tierIndex(incident.escalation.peakTier) + 1; // 1–6
  const sectors = incident.infrastructure.targetSectors.length;
  const countries = incident.infrastructure.targetCountries.length;
  const govFlags = governanceAxis(incident).formal; // 0–6 formal responses
  return {
    escalation: Math.round((tier / 6) * 100),
    infrastructure: Math.min(100, Math.round(((sectors + countries) / 12) * 100)),
    governance: Math.min(100, Math.round((govFlags / FORMAL_FLAGS.length) * 100)),
    attribution: confidenceStrength[incident.attribution.confidence],
    entanglement: entanglementScore(incident) * 10,
  };
}

// ---- MITRE ATT&CK -----------------------------------------------------------

/**
 * Build the canonical attack.mitre.org URL for a technique ID.
 * "T1195.002" → https://attack.mitre.org/techniques/T1195/002/
 * "T1059"     → https://attack.mitre.org/techniques/T1059/
 * Works for Enterprise and ICS (T0xxx) technique IDs alike. Returns null for
 * anything that isn't a well-formed technique ID, so we never emit a bad link.
 */
export function mitreUrl(id: string): string | null {
  const m = id.trim().match(/^(T\d{4})(?:\.(\d{3}))?$/);
  if (!m) return null;
  const [, base, sub] = m;
  return sub
    ? `https://attack.mitre.org/techniques/${base}/${sub}/`
    : `https://attack.mitre.org/techniques/${base}/`;
}

// ---- Lookup helpers ---------------------------------------------------------

export function findBySlug(
  incidents: Incident[],
  slug: string,
): Incident | undefined {
  return incidents.find((i) => i.slug === slug);
}

export function findById(
  incidents: Incident[],
  id: string,
): Incident | undefined {
  return incidents.find((i) => i.id === id);
}

// ---- Unique value extractors (for building filter UIs) ----------------------

export function uniqueTypes(incidents: Incident[]): IncidentType[] {
  return Array.from(new Set(incidents.map((i) => i.incidentType)));
}

export function uniqueSectors(incidents: Incident[]): TargetSector[] {
  return Array.from(
    new Set(incidents.flatMap((i) => i.infrastructure.targetSectors)),
  );
}

export function uniqueGovernanceFlags(incidents: Incident[]): GovernanceFlag[] {
  return Array.from(new Set(incidents.flatMap((i) => i.governance.flags)));
}

export function yearRange(
  incidents: Incident[],
): { min: number; max: number } | null {
  if (incidents.length === 0) return null;
  const years = incidents.map((i) => i.year);
  return { min: Math.min(...years), max: Math.max(...years) };
}

// ---- Derived scores ---------------------------------------------------------

/** Weights of the unpeace severity formula; the sensitivity table varies them. */
export const UNPEACE_WEIGHTS = { tier: 1.2, threshold: 1 } as const;

/**
 * Raw unpeace severity on 1–10 without rounding. The weighted sum is rescaled
 * by its theoretical range (tier 1–6, thresholds 0–5), so it cannot exceed 10
 * and needs no cap. Governance responses are not part of severity.
 */
export function unpeaceRaw(incident: Incident, weights: { tier: number; threshold: number } = UNPEACE_WEIGHTS): number {
  const tier = tierIndex(incident.escalation.peakTier) + 1; // 1–6
  const x = incident.escalation.thresholds.length; // 0–5
  const lo = weights.tier * 1;
  const hi = weights.tier * 6 + weights.threshold * THRESHOLD_CODES.length;
  return 1 + (9 * (weights.tier * tier + weights.threshold * x - lo)) / (hi - lo);
}

/** Unpeace severity, 1–10 (rounded). */
export function unpeaceScore(incident: Incident): number {
  return Math.round(unpeaceRaw(incident));
}

/** Governance response axis, reported separately from severity. */
export function governanceAxis(incident: Incident): { formal: number; analytic: number; formalFlags: GovernanceFlag[]; analyticFlags: GovernanceFlag[] } {
  const formalFlags = incident.governance.flags.filter((f) => FORMAL_FLAGS.includes(f));
  const analyticFlags = incident.governance.flags.filter((f) => ANALYTIC_FLAGS.includes(f));
  return { formal: formalFlags.length, analytic: analyticFlags.length, formalFlags, analyticFlags };
}

/**
 * Entanglement: spread across sectors and countries, 1–10, computed from the
 * sector list and ISO country codes. A global scope sets the score to 10.
 */
export function entanglementScore(incident: Incident): number {
  if (incident.infrastructure.geographicScope === "global") return 10;
  const sectors = incident.infrastructure.targetSectors.length;
  const countries = incident.infrastructure.targetCountries.length;
  return Math.min(10, Math.max(1, sectors + countries - 1));
}

/** Rank (1 = most severe, ties share the top rank) of each incident under given weights. */
export function unpeaceRanks(incidents: Incident[], weights: { tier: number; threshold: number }): Map<string, number> {
  const vals = incidents.map((i) => unpeaceRaw(i, weights));
  const sorted = [...vals].sort((a, b) => b - a);
  return new Map(incidents.map((i, k) => [i.slug, 1 + sorted.findIndex((v) => Math.abs(v - vals[k]) < 1e-9)]));
}

// ---- Attribution confidence from evidence layers ----------------------------


/** Evidence layers coded on the record (methodology §05). */
export function attributionLayers(incident: Incident): AttributionLayer[] {
  return incident.attribution.layers ?? [];
}

/**
 * Confidence implied by the layers (methodology §05):
 * confirmed = a government on the record + a legal act, or two or more governments + technical;
 * high = one government + technical, documentary + technical, or a government alone;
 * moderate = technical only; low = none. "contested" is coded by hand.
 */
export function confidenceFromLayers(incident: Incident): AttributionConfidence {
  const L = new Set(attributionLayers(incident));
  const gov = L.has("governmental") || L.has("multi-governmental");
  if (gov && L.has("legal")) return "confirmed";
  if (L.has("multi-governmental") && L.has("technical")) return "confirmed";
  if ((gov || L.has("documentary")) && L.has("technical")) return "high";
  if (gov) return "high";
  if (L.has("technical")) return "moderate";
  return "low";
}

// ---- Score breakdowns (transparency of the composite formulas) -------------

export interface ScoreComponent {
  label: string;
  /** Raw input value (e.g. number of thresholds crossed). */
  input: number;
  /** Weight applied to the input in the formula. */
  weight: number;
  /** Weighted contribution to the raw score (input × weight). */
  contribution: number;
  /** Short note on what the component measures. */
  note: string;
}

export interface ScoreBreakdown {
  score: number;
  /** Raw score before rounding. */
  raw: number;
  /** Whether the raw value was clamped to the 1–10 range. */
  capped: boolean;
  components: ScoreComponent[];
  /** Human-readable formula string. */
  formula: string;
}

/** Decompose the unpeace score. Mirrors {@link unpeaceScore}. */
export function unpeaceBreakdown(incident: Incident): ScoreBreakdown {
  const tier = tierIndex(incident.escalation.peakTier) + 1;
  const x = incident.escalation.thresholds.length;
  const components: ScoreComponent[] = [
    {
      label: "Escalation peak",
      input: tier,
      weight: UNPEACE_WEIGHTS.tier,
      contribution: tier * UNPEACE_WEIGHTS.tier,
      note: `Peak tier reached (${incident.escalation.peakTier}), ranked 1–6.`,
    },
    {
      label: "Thresholds crossed",
      input: x,
      weight: UNPEACE_WEIGHTS.threshold,
      contribution: x * UNPEACE_WEIGHTS.threshold,
      note: x
        ? `From the closed list: ${incident.escalation.thresholds.map((t) => thresholdMeta[t].label.toLowerCase()).join(", ")}.`
        : "None of the five listed thresholds.",
    },
  ];
  const raw = unpeaceRaw(incident);
  return {
    score: Math.round(raw),
    raw,
    capped: false,
    components,
    formula: "1 + 9 × (1.2 × peak + thresholds − 1.2) ÷ 11, rounded (range 1–10, no cap; governance is a separate axis)",
  };
}

/** Decompose the entanglement score. Mirrors {@link entanglementScore}. */
export function entanglementBreakdown(incident: Incident): ScoreBreakdown {
  const sectors = incident.infrastructure.targetSectors.length;
  const countries = incident.infrastructure.targetCountries.length;
  const global = incident.infrastructure.geographicScope === "global";
  const components: ScoreComponent[] = [
    { label: "Sectors affected", input: sectors, weight: 1, contribution: sectors, note: "Distinct sectors in targetSectors." },
    { label: "Countries", input: countries, weight: 1, contribution: countries, note: "ISO country codes in targetCountries." },
    { label: "Baseline offset", input: 1, weight: -1, contribution: -1, note: "Constant offset so a single-sector, single-country event scores 1." },
  ];
  const raw = global ? 10 : sectors + countries - 1;
  const score = Math.min(10, Math.max(1, raw));
  return {
    score,
    raw,
    capped: !global && (raw > 10 || raw < 1),
    components,
    formula: global ? "Geographic scope is global, so the score is 10" : "clamp( sectors + countries − 1, 1, 10 )",
  };
}

/**
 * Find related incidents by shared sector, actor country, or incident type.
 * Returns up to `limit` incidents sorted by overlap count.
 */
export function findRelated(
  target: Incident,
  all: Incident[],
  limit = 4,
): Incident[] {
  const scored = all
    .filter((i) => i.id !== target.id)
    .map((i) => {
      let overlap = 0;
      if (i.incidentType === target.incidentType) overlap += 2;
      if (i.attribution.country === target.attribution.country) overlap += 2;
      if (i.escalation.peakTier === target.escalation.peakTier) overlap += 1;
      const sharedSectors = i.infrastructure.targetSectors.filter((s) =>
        target.infrastructure.targetSectors.includes(s),
      ).length;
      overlap += sharedSectors;
      return { incident: i, overlap };
    })
    .filter((s) => s.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);

  return scored.slice(0, limit).map((s) => s.incident);
}
