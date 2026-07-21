// ---------------------------------------------------------------------------
// Dataset export: flat CSV + JSON serialisations of the incident corpus.
// Field set mirrors the codebook on /data.
// ---------------------------------------------------------------------------

import type { Incident } from "@/lib/types/incidents";
import {
  unpeaceScore,
  entanglementScore,
} from "@/lib/utils/incidents";

export interface ExportColumn {
  key: string;
  description: string;
}

/** The codebook: every exported column and what it means. */
export const codebook: ExportColumn[] = [
  { key: "id", description: "Stable unique identifier for the incident record." },
  { key: "slug", description: "URL slug (matches /cases/<slug>)." },
  { key: "name", description: "Full incident name." },
  { key: "shortName", description: "Short display name." },
  { key: "year", description: "Primary year of the operation." },
  { key: "dateRange", description: "Human-readable date range." },
  { key: "incidentType", description: "espionage | destructive | ransomware | influence | sabotage | hybrid." },
  { key: "attributedTo", description: "Named responsible actor (as publicly attributed)." },
  { key: "attributionCountry", description: "Attributed state nexus." },
  { key: "attributionConfidence", description: "confirmed | high | moderate | low | contested." },
  { key: "peakTier", description: "Peak escalation tier: probing…strategic." },
  { key: "unpeaceScore", description: "Composite severity, 0–100 (see methodology §06)." },
  { key: "entanglementScore", description: "Cross-dimension spread, 1–10 (see methodology §06)." },
  { key: "targetSectors", description: "Affected sectors (semicolon-separated)." },
  { key: "targetCountries", description: "Affected countries/regions (semicolon-separated)." },
  { key: "thresholdCrossings", description: "Escalation thresholds crossed (semicolon-separated)." },
  { key: "governanceFlags", description: "Governance mechanisms triggered (semicolon-separated)." },
  { key: "attackTechniques", description: "MITRE ATT&CK technique IDs (semicolon-separated)." },
  { key: "lastUpdated", description: "Date the record was last reviewed (if set)." },
];

function csvEscape(s: string): string {
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function row(inc: Incident): Record<string, string> {
  return {
    id: inc.id,
    slug: inc.slug,
    name: inc.name,
    shortName: inc.shortName,
    year: String(inc.year),
    dateRange: inc.dateRange,
    incidentType: inc.incidentType,
    attributedTo: inc.attribution.attributedTo,
    attributionCountry: inc.attribution.country,
    attributionConfidence: inc.attribution.confidence,
    peakTier: inc.escalation.peakTier,
    unpeaceScore: String(unpeaceScore(inc) * 10),
    entanglementScore: String(entanglementScore(inc)),
    targetSectors: inc.infrastructure.targetSectors.join("; "),
    targetCountries: inc.infrastructure.targetCountries.join("; "),
    thresholdCrossings: inc.escalation.thresholdCrossings.join("; "),
    governanceFlags: inc.governance.flags.join("; "),
    attackTechniques: inc.infrastructure.techniques.map((t) => t.id).join("; "),
    lastUpdated: inc.lastUpdated ?? "",
  };
}

export function buildCsv(incidents: Incident[]): string {
  const cols = codebook.map((c) => c.key);
  const header = cols.join(",");
  const lines = incidents.map((inc) => {
    const r = row(inc);
    return cols.map((c) => csvEscape(r[c] ?? "")).join(",");
  });
  return [header, ...lines].join("\n");
}

export function buildJson(incidents: Incident[]): string {
  // Export the full, structured records (not the flattened row) for JSON.
  return JSON.stringify(incidents, null, 2);
}
