/**
 * Core data types for the Cyber Escalation Atlas.
 * These types define the structure for case data that will be populated
 * in subsequent updates.
 */

export interface CaseStudy {
  id: string;
  name: string;
  slug: string;
  year: number;
  region: string;
  attribution: AttributionLevel;
  operationType: OperationType;
  summary: string;
  escalation: EscalationData;
  infrastructure: InfrastructureData;
  governance: GovernanceData;
}

export type AttributionLevel =
  | "confirmed"
  | "high"
  | "moderate"
  | "low"
  | "contested";

export type OperationType =
  | "espionage"
  | "destructive"
  | "ransomware"
  | "influence"
  | "sabotage"
  | "hybrid";

export interface EscalationData {
  phases: EscalationPhase[];
  peakLevel: number;
  restraintSignals: string[];
  thresholdEvents: string[];
}

export interface EscalationPhase {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export interface InfrastructureData {
  targetSectors: string[];
  attackTechniques: AttackTechnique[];
  c2Infrastructure: string[];
  impactScope: string;
}

export interface AttackTechnique {
  id: string; // MITRE ATT&CK ID, e.g., "T1566.001"
  name: string;
  tactic: string;
}

export interface GovernanceData {
  normsApplicable: string[];
  attributionStatements: AttributionStatement[];
  regulatoryResponses: string[];
  policyImpact: string;
}

export interface AttributionStatement {
  source: string;
  date: string;
  confidence: AttributionLevel;
  content: string;
}
