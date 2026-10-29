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
  | "hospitality";

/** Non-country geography (targetCountries holds ISO 3166-1 alpha-2 codes only). */
export type GeographicScope = "global" | "nato-allies" | "central-europe" | "allied-jurisdictions";

/** Closed list of escalation thresholds (methodology §06). */
export type ThresholdCode =
  | "physical-effects"
  | "civilian-service-harm"
  | "unintended-spillover"
  | "wartime-use"
  | "election-or-nc3-target";

/** Evidence layers behind an attribution (methodology §05). */
export type AttributionLayer = "technical" | "governmental" | "legal" | "documentary";

export type GovernanceFlag =
  | "norm-violation"
  | "attribution-public"
  | "sanctions-imposed"
  | "indictment"
  | "un-discussion"
  | "regulatory-change"
  | "international-cooperation"
  | "deterrence-signal";

/** The five inclusion criteria on /methodology §03 (see src/data/inclusionCriteria.ts). */
export type InclusionCriterion =
  | "state-attribution"
  | "effects-beyond-target"
  | "formal-governance-response"
  | "two-source-categories"
  | "two-analytical-lenses";

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
  /** MITRE ATT&CK group IDs for the aliases, where ATT&CK has the group. */
  intrusionSetIds?: string[];
  /** State organ named in the attribution (GRU, MSS, GCHQ, ...). */
  organ?: string;
  /** Evidence layers; derived from claimants and consequences when absent. */
  layers?: AttributionLayer[];
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
  /** Thresholds crossed, from the closed list; these enter the scores. */
  thresholds: ThresholdCode[];
  /** Why the case is significant (narrative; not scored). */
  significance: string[];
}

export interface AttackTechnique {
  id: string; // e.g. "T1195.002"
  name: string;
  tactic: string;
}

export interface InfrastructureProfile {
  targetSectors: TargetSector[];
  /** ISO 3166-1 alpha-2 codes. */
  targetCountries: string[];
  geographicScope?: GeographicScope;
  /** Named target organisations, where the record names them. */
  targetEntities?: { name: string; sector: TargetSector; country?: string }[];
  /** Sector and country tied together by the record text ([sector, ISO code]). */
  sectorCountryPairs?: [TargetSector, string][];
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
  /** Open-ended seminar questions (landmark cases). */
  discussionQuestions?: string[];
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
  | "Public Naming"
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
  lastUpdated: string;
  /** Inclusion criteria this case meets. The guideline is at least 3 of 5. */
  inclusionCriteriaMet: InclusionCriterion[];
  /** Records in this or another Faultline dataset that one cited source names together. */
  relatedRecords?: { id: string; sourceUrl: string }[];
  /** Legal frameworks/rules whose application to this case is debated. */
  legalFrameworks?: LegalFrameworkRef[];
}

/** A legal rule/framework whose application to a case is analysed. */
export interface LegalFrameworkRef {
  /** Stable id matching a rule in src/data/legalFrameworks.ts */
  ruleId: string;
  /** Short human label, e.g. "Tallinn Manual 2.0, Rule 4 – Violation of sovereignty" (see src/data/tallinnRules.ts). */
  label: string;
  /** The specific legal question this case raises for the rule. */
  question: string;
}
