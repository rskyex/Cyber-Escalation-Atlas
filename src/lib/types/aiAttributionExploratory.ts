// ---------------------------------------------------------------------------
// Exploratory scaffolding for AI-in-the-loop characterisation / attribution
// cases. This is INTENTIONALLY separate from the main Incident type system
// because the entries are not coded findings — they sit at a lower
// evidentiary bar and use a lighter field set.
// ---------------------------------------------------------------------------

export type AIAttributionCategory =
  | "A_DiscreteIncident"
  | "B_Capability";

export type AIAttributionVerifiability =
  | "Confirmed"
  | "Reported"
  | "Inferred";

export type AIAttributionPublicDisclosure = "Yes" | "No" | "Partial";

export interface AIAttributionSource {
  title: string;
  url: string;
  fetched: boolean;
}

export interface AIAttributionExploratoryEntry {
  name: string;
  year: string;
  category: AIAttributionCategory;
  system: string;
  judgmentEntered: string;
  authorityAugmented: string;
  publicDisclosure: AIAttributionPublicDisclosure;
  sources: AIAttributionSource[];
  verifiability: AIAttributionVerifiability;
  accountabilityNote: string;
}
