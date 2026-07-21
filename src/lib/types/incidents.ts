// ---------------------------------------------------------------------------
// Canonical incident type system for Cyber Escalation Atlas
// ---------------------------------------------------------------------------

// ---- Enum-like unions -------------------------------------------------------

export type IncidentType =
  | "espionage"
  | "destructive"
  | "ransomware"
  | "influence"
  | "sabotage"
  | "hybrid";

export type AttributionConfidence =
  | "confirmed"
  | "high"
  | "moderate"
  | "low"
  | "contested";

export type EscalationTier =
  | "probing"
  | "intrusion"
  | "disruption"
  | "degradation"
  | "destruction"
  | "strategic";

export type TargetSector =
  | "energy"
  | "finance"
  | "government"
  | "healthcare"
  | "telecommunications"
  | "transportation"
  | "defense"
  | "technology"
  | "manufacturing"
  | "media"
  | "education"
  | "critical-infrastructure"
  | "multiple";

export type GovernanceFlag =
  | "norm-violation"
  | "attribution-public"
  | "sanctions-imposed"
  | "indictment"
  | "un-discussion"
  | "regulatory-change"
  | "international-cooperation"
  | "deterrence-signal";

export type SourceCategory =
  | "government"
  | "vendor"
  | "academic"
  | "journalistic"
  | "legal";

// ---- Helper types -----------------------------------------------------------

export interface Attribution {
  confidence: AttributionConfidence;
  attributedTo: string;
  country: string;
  aliases: string[];
}

export interface EscalationPhase {
  tier: EscalationTier;
  label: string;
  description: string;
  date?: string;
}

export interface EscalationProfile {
  phases: EscalationPhase[];
  peakTier: EscalationTier;
  restraintFactors: string[];
  thresholdCrossings: string[];
}

export interface AttackTechnique {
  id: string; // e.g. "T1195.002"
  name: string;
  tactic: string;
}

export interface InfrastructureProfile {
  targetSectors: TargetSector[];
  targetCountries: string[];
  techniques: AttackTechnique[];
  malwareFamilies: string[];
  impactSummary: string;
}

export interface GovernanceProfile {
  flags: GovernanceFlag[];
  normsInvoked: string[];
  policyResponses: string[];
  regulatoryChanges: string[];
  impact: string;
}

export interface TeachingBlock {
  keyQuestion: string;
  discussionPoints: string[];
  furtherReading: string[];
}

export interface SourceRef {
  title: string;
  url?: string;
  category: SourceCategory;
  date?: string;
}

// ---- Attribution Lens types (Upgrade 1) ------------------------------------

export type AttributionActor =
  | "US Government"
  | "UK Government"
  | "EU"
  | "Allied Coalition"
  | "Academic/Private Sector"
  | "Contested/Unknown";

export type AttributionCoordinationType = "joint" | "unilateral" | "none";

export type AttributionConsequenceType =
  | "Sanctions"
  | "Indictment"
  | "Diplomatic Expulsion"
  | "Public Naming Only"
  | "No Formal Response";

export interface AttributionClaimant {
  actor: AttributionActor | string;
  date: string;
  confidenceLevel: string;
  evidenceBasis: string;
}

export interface AttributionDetail {
  claimants: AttributionClaimant[];
  coordinationType: AttributionCoordinationType;
  consequences: AttributionConsequenceType[];
}

// ---- Core Incident type -----------------------------------------------------

export interface Incident {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  year: number;
  dateRange: string;
  incidentType: IncidentType;
  summary: string;
  attribution: Attribution;
  escalation: EscalationProfile;
  infrastructure: InfrastructureProfile;
  governance: GovernanceProfile;
  whyThisMatters: string;
  teaching: TeachingBlock;
  sources: SourceRef[];
  /** Attribution Lens detail (Upgrade 1) */
  attributionDetail?: AttributionDetail;
  /** Threat actor profile slug (Upgrade 3) */
  actorSlug?: string;
  /** ISO date (YYYY-MM or YYYY-MM-DD) the record was last reviewed/updated. */
  lastUpdated?: string;
  /** Legal frameworks/rules whose application to this case is debated. */
  legalFrameworks?: LegalFrameworkRef[];
}

/** A legal rule/framework whose application to a case is analysed. */
export interface LegalFrameworkRef {
  /** Stable id matching a rule in src/data/legalFrameworks.ts */
  ruleId: string;
  /** Short human label, e.g. "Tallinn Manual Rule 71 — Sovereignty". */
  label: string;
  /** The specific legal question this case raises for the rule. */
  question: string;
}
