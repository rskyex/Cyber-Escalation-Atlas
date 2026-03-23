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
}
