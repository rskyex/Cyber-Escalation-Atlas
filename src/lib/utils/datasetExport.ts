// ---------------------------------------------------------------------------
// Dataset export: flat CSV + JSON serialisations of the incident corpus.
// Field set mirrors the codebook on /data.
// ---------------------------------------------------------------------------

import type { Incident } from "@/lib/types/incidents";
import {
  unpeaceScore,
  entanglementScore,
  governanceAxis,
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
  { key: "unpeaceScore", description: "Composite severity, 1–10 (see methodology §06). The site draws it on a 0–100 axis; the export keeps the native scale." },
  { key: "entanglementScore", description: "Sector and country spread, 1–10 (see methodology §06)." },
  { key: "targetSectors", description: "Affected sectors (semicolon-separated)." },
  { key: "targetCountries", description: "Target countries as ISO 3166-1 alpha-2 codes (semicolon-separated)." },
  { key: "thresholds", description: "Thresholds crossed, from the closed list (methodology §06; semicolon-separated)." },
  { key: "significance", description: "Why the case is significant (narrative, not scored; semicolon-separated)." },
  { key: "governanceFormal", description: "Count of formal governance responses (separate axis, not part of severity)." },
  { key: "geographicScope", description: "global | nato-allies | central-europe | allied-jurisdictions, when targets are not listed as countries." },
  { key: "intrusionSetIds", description: "MITRE ATT&CK group IDs (semicolon-separated)." },
  { key: "attributionOrgan", description: "State organ named in the attribution." },
  { key: "governanceFlags", description: "Governance mechanisms triggered (semicolon-separated)." },
  { key: "attackTechniques", description: "MITRE ATT&CK technique IDs (semicolon-separated)." },
  { key: "lastUpdated", description: "Date the record was last reviewed." },
  { key: "inclusionCriteriaMet", description: "Inclusion criteria met (methodology §03; semicolon-separated). The guideline is at least 3 of 5." },
  { key: "sourceUrls", description: "URLs of sources that have a stable official page (semicolon-separated)." },
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
    unpeaceScore: String(unpeaceScore(inc)),
    entanglementScore: String(entanglementScore(inc)),
    targetSectors: inc.infrastructure.targetSectors.join("; "),
    targetCountries: inc.infrastructure.targetCountries.join("; "),
    thresholds: inc.escalation.thresholds.join("; "),
    significance: inc.escalation.significance.join("; "),
    governanceFormal: String(governanceAxis(inc).formal),
    geographicScope: inc.infrastructure.geographicScope ?? "",
    intrusionSetIds: (inc.attribution.intrusionSetIds ?? []).join("; "),
    attributionOrgan: inc.attribution.organ ?? "",
    governanceFlags: inc.governance.flags.join("; "),
    attackTechniques: inc.infrastructure.techniques.map((t) => t.id).join("; "),
    lastUpdated: inc.lastUpdated,
    inclusionCriteriaMet: inc.inclusionCriteriaMet.join("; "),
    sourceUrls: inc.sources.flatMap((s) => (s.url ? [s.url] : [])).join("; "),
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

// ---- Versioned exports (used by /data) ------------------------------------

export interface DatasetMeta {
  dataset: string;
  version: string;
  lastUpdated: string;
  recordCount: number;
  license: string;
  source: string;
}

/**
 * CSV with a short metadata header. Lines starting with "#" are comments;
 * in pandas use read_csv(path, comment="#"), in R use comment.char = "#".
 */
export function buildVersionedCsv(incidents: Incident[], meta: DatasetMeta): string {
  const header = [
    `# dataset: ${meta.dataset}`,
    `# version: ${meta.version}`,
    `# last_updated: ${meta.lastUpdated}`,
    `# record_count: ${meta.recordCount}`,
    `# license: ${meta.license}`,
    `# source: ${meta.source}`,
  ];
  return [...header, buildCsv(incidents)].join("\n");
}

/** JSON with a metadata block and the full nested records. */
export function buildVersionedJson(incidents: Incident[], meta: DatasetMeta): string {
  return JSON.stringify({ meta, records: incidents }, null, 2);
}
