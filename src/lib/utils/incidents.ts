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
} from "@/lib/types/incidents";

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
  multiple: "Multiple Sectors",
};

export const governanceFlagLabels: Record<GovernanceFlag, string> = {
  "norm-violation": "Norm Violation",
  "attribution-public": "Public Attribution",
  "sanctions-imposed": "Sanctions Imposed",
  indictment: "Indictment",
  "un-discussion": "UN Discussion",
  "regulatory-change": "Regulatory Change",
  "international-cooperation": "International Cooperation",
  "deterrence-signal": "Deterrence Signal",
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
      i.infrastructure.targetCountries.some(
        (c) => c.toLowerCase() === lower,
      ),
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

/**
 * Compute a 1–10 "unpeace" score reflecting escalation severity,
 * threshold crossings, and governance impact weight.
 */
export function unpeaceScore(incident: Incident): number {
  const base = tierIndex(incident.escalation.peakTier) + 1; // 1-6
  const crossings = incident.escalation.thresholdCrossings.length;
  const govWeight = incident.governance.flags.length;
  return Math.min(
    10,
    Math.round(((base * 1.2 + crossings + govWeight * 0.5) / 10) * 10),
  );
}

/**
 * Compute entanglement risk score (how many sectors, countries, and
 * collateral dimensions an incident touches). Range 1–10.
 */
export function entanglementScore(incident: Incident): number {
  const sectors = incident.infrastructure.targetSectors.length;
  const countries = incident.infrastructure.targetCountries.length;
  const crossings = incident.escalation.thresholdCrossings.length;
  return Math.min(10, Math.max(1, sectors + countries + crossings - 1));
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
