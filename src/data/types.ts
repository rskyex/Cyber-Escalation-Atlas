/**
 * Re-export canonical types from lib/types/incidents.
 * Kept for backward compatibility with existing page imports.
 */
export type {
  Incident,
  Incident as CaseStudy,
  IncidentType,
  IncidentType as OperationType,
  AttributionConfidence,
  AttributionConfidence as AttributionLevel,
  EscalationTier,
  EscalationPhase,
  EscalationProfile,
  EscalationProfile as EscalationData,
  AttackTechnique,
  InfrastructureProfile,
  InfrastructureProfile as InfrastructureData,
  GovernanceProfile,
  GovernanceProfile as GovernanceData,
  GovernanceFlag,
  TargetSector,
  Attribution,
  Attribution as AttributionStatement,
  TeachingBlock,
  SourceRef,
  SourceCategory,
  AttributionActor,
  AttributionCoordinationType,
  AttributionConsequenceType,
  AttributionClaimant,
  AttributionDetail,
} from "@/lib/types/incidents";
