"use client";

import type * as XLSXType from "xlsx";
import type { Incident } from "@/lib/types/incidents";
import {
  incidentTypeLabels,
  escalationTierLabels,
  targetSectorLabels,
  attributionLabels,
  governanceFlagLabels,
  sourceCategoryLabels,
  unpeaceScore,
  entanglementScore,
} from "@/lib/utils/incidents";
import { actorProfiles } from "@/data/actors";
import { normsData } from "@/data/norms";
import { legalFrameworks } from "@/data/legalFrameworks";
import {
  aiAttributionExploratory,
  aiAttributionExploratoryBanner,
  aiAttributionRejectedBorderlines,
} from "@/data/aiAttributionExploratory";

async function loadXLSX(): Promise<typeof XLSXType> {
  return await import("xlsx");
}

// ---------------------------------------------------------------------------
// Sheet builders
// ---------------------------------------------------------------------------

function buildIncidentsSheet(incidents: Incident[]) {
  return incidents.map((i) => ({
    ID: i.id,
    Slug: i.slug,
    Name: i.name,
    "Short Name": i.shortName,
    Year: i.year,
    "Date Range": i.dateRange,
    Type: incidentTypeLabels[i.incidentType],
    "Peak Escalation Tier": escalationTierLabels[i.escalation.peakTier],
    "Unpeace Score": unpeaceScore(i),
    "Entanglement Score": entanglementScore(i),
    "Attributed To": i.attribution.attributedTo,
    "Attribution Country": i.attribution.country,
    "Attribution Confidence": attributionLabels[i.attribution.confidence],
    "Attribution Aliases": i.attribution.aliases.join("; "),
    "Target Sectors": i.infrastructure.targetSectors
      .map((s) => targetSectorLabels[s])
      .join("; "),
    "Target Countries": i.infrastructure.targetCountries.join("; "),
    "Malware Families": i.infrastructure.malwareFamilies.join("; "),
    "Impact Summary": i.infrastructure.impactSummary,
    "Governance Flags": i.governance.flags
      .map((f) => governanceFlagLabels[f])
      .join("; "),
    "Norms Invoked": i.governance.normsInvoked.join("; "),
    "Policy Responses": i.governance.policyResponses.join("; "),
    "Regulatory Changes": i.governance.regulatoryChanges.join("; "),
    "Governance Impact": i.governance.impact,
    "Restraint Factors": i.escalation.restraintFactors.join("; "),
    "Threshold Crossings": i.escalation.thresholdCrossings.join("; "),
    Summary: i.summary,
    "Why This Matters": i.whyThisMatters,
    "Actor Slug": i.actorSlug ?? "",
  }));
}

function buildEscalationPhasesSheet(incidents: Incident[]) {
  return incidents.flatMap((i) =>
    i.escalation.phases.map((p, idx) => ({
      "Case Slug": i.slug,
      "Case Name": i.name,
      "Phase #": idx + 1,
      Tier: escalationTierLabels[p.tier],
      Label: p.label,
      Description: p.description,
      Date: p.date ?? "",
    })),
  );
}

function buildTechniquesSheet(incidents: Incident[]) {
  return incidents.flatMap((i) =>
    i.infrastructure.techniques.map((t) => ({
      "Case Slug": i.slug,
      "Case Name": i.name,
      "Technique ID": t.id,
      "Technique Name": t.name,
      Tactic: t.tactic,
    })),
  );
}

function buildSourcesSheet(incidents: Incident[]) {
  return incidents.flatMap((i) =>
    i.sources.map((s) => ({
      "Case Slug": i.slug,
      "Case Name": i.name,
      "Source Title": s.title,
      Category: sourceCategoryLabels[s.category],
      Date: s.date ?? "",
      URL: s.url ?? "",
    })),
  );
}

function buildTeachingSheet(incidents: Incident[]) {
  return incidents.map((i) => ({
    "Case Slug": i.slug,
    "Case Name": i.name,
    "Key Question": i.teaching.keyQuestion,
    "Discussion Points": i.teaching.discussionPoints.join(" | "),
    "Further Reading": i.teaching.furtherReading.join(" | "),
  }));
}

function buildAttributionDetailSheet(incidents: Incident[]) {
  return incidents.flatMap((i) => {
    const detail = i.attributionDetail;
    if (!detail) return [];
    return detail.claimants.map((c) => ({
      "Case Slug": i.slug,
      "Case Name": i.name,
      Actor: c.actor,
      Date: c.date,
      "Confidence Level": c.confidenceLevel,
      "Evidence Basis": c.evidenceBasis,
      "Coordination Type": detail.coordinationType,
      Consequences: detail.consequences.join("; "),
    }));
  });
}

function buildActorsSheet() {
  return actorProfiles.map((a) => ({
    Slug: a.slug,
    Name: a.name,
    "State Nexus": a.stateNexus,
    "Mission Type": a.missionType,
    "Primary Sectors": a.primarySectors.join("; "),
    "Operational Period": a.operationalPeriod,
    TTPs: a.ttps,
    "Behavioural Signature": a.behavioralSignature,
    "Governance Footprint": a.governanceFootprint,
  }));
}

function buildNormsSheet() {
  return normsData.map((n) => ({
    "Norm ID": n.normId,
    Title: n.title,
    Status: n.status,
    "Anchor Instruments": n.anchorInstruments.join("; "),
    "Linked Cases": n.cases.join("; "),
    Description: n.description,
  }));
}

function buildNormEffectsSheet() {
  return normsData.flatMap((n) =>
    n.normEffects.map((e) => ({
      "Norm ID": n.normId,
      "Norm Title": n.title,
      "Case Slug": e.caseSlug,
      Effect: e.effect,
    })),
  );
}

function buildLegalRulesSheet() {
  return legalFrameworks.flatMap((fw) =>
    fw.rules.map((r) => ({
      "Framework ID": fw.id,
      "Framework Name": fw.name,
      "Rule ID": r.ruleId,
      "Rule Name": r.name,
      Description: r.description,
      "Cyber Controversy": r.cyberControversy,
      "Linked Case Count": r.cases.length,
    })),
  );
}

const categoryLabel: Record<string, string> = {
  A_DiscreteIncident: "A — Discrete incident",
  B_Capability: "B — Capability",
};

function buildAIAttributionExploratoryRows() {
  return aiAttributionExploratory.map((e) => ({
    Name: e.name,
    Year: e.year,
    Category: categoryLabel[e.category] ?? e.category,
    "System / AI": e.system,
    "Judgment Entered": e.judgmentEntered,
    "Authority Augmented": e.authorityAugmented,
    "AI Role Disclosed Publicly": e.publicDisclosure,
    Verifiability: e.verifiability,
    Sources: e.sources
      .map((s) => `${s.title} — ${s.url}${s.fetched ? "" : " (not directly fetched)"}`)
      .join(" | "),
    "Accountability Note": e.accountabilityNote,
  }));
}

function buildAIAttributionRejectedRows() {
  return aiAttributionRejectedBorderlines.map((b) => ({
    "Rejected Borderline": b.name,
    "Reason Rejected": b.reason,
    Source: b.source ?? "",
  }));
}

/**
 * Custom sheet builder for the exploratory AI-in-Attribution sheet.
 * Lays down a banner block at the top (scope + empty-Category-A finding),
 * blank row, the data table, blank rows, then a rejected-borderlines table.
 * Uses aoa_to_sheet + sheet_add_json so the banner sits outside the data
 * grid and cannot be mistaken for headers.
 */
function appendAIAttributionExploratorySheet(
  XLSX: typeof XLSXType,
  wb: XLSXType.WorkBook,
) {
  const bannerAOA: string[][] = aiAttributionExploratoryBanner.map((line) => [line]);
  const ws = XLSX.utils.aoa_to_sheet(bannerAOA);

  const dataRows = buildAIAttributionExploratoryRows();
  const dataStartRow = bannerAOA.length + 1;
  XLSX.utils.sheet_add_json(ws, dataRows, {
    origin: { r: dataStartRow, c: 0 },
    skipHeader: false,
  });

  const rejectedRows = buildAIAttributionRejectedRows();
  const rejectedHeaderRow = dataStartRow + dataRows.length + 3;
  XLSX.utils.sheet_add_aoa(
    ws,
    [["REJECTED BORDERLINE CASES (not included above; recorded for audit trail)"]],
    { origin: { r: rejectedHeaderRow - 1, c: 0 } },
  );
  XLSX.utils.sheet_add_json(ws, rejectedRows, {
    origin: { r: rejectedHeaderRow, c: 0 },
    skipHeader: false,
  });

  ws["!cols"] = [
    { wch: 48 },
    { wch: 18 },
    { wch: 22 },
    { wch: 60 },
    { wch: 60 },
    { wch: 40 },
    { wch: 16 },
    { wch: 14 },
    { wch: 80 },
    { wch: 80 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "AI-in-Attribution (Exploratory)");
}

function buildLegalRuleCasesSheet() {
  return legalFrameworks.flatMap((fw) =>
    fw.rules.flatMap((r) =>
      r.cases.map((c) => ({
        "Framework ID": fw.id,
        "Rule ID": r.ruleId,
        "Rule Name": r.name,
        "Case Slug": c.caseSlug,
        Note: c.note,
      })),
    ),
  );
}

// ---------------------------------------------------------------------------
// Column auto-sizing
// ---------------------------------------------------------------------------

function autoFit<T extends Record<string, unknown>>(rows: T[]): XLSXType.ColInfo[] {
  if (rows.length === 0) return [];
  const headers = Object.keys(rows[0]);
  return headers.map((h) => {
    let max = h.length;
    for (const r of rows) {
      const v = r[h];
      const s = v == null ? "" : String(v);
      const len = Math.min(s.length, 80);
      if (len > max) max = len;
    }
    return { wch: Math.min(Math.max(max + 2, 10), 60) };
  });
}

function appendSheet(
  XLSX: typeof XLSXType,
  wb: XLSXType.WorkBook,
  name: string,
  rows: Record<string, unknown>[],
) {
  if (rows.length === 0) return;
  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = autoFit(rows);
  XLSX.utils.book_append_sheet(wb, ws, name);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Export the full Cyber Escalation Atlas dataset as a multi-sheet .xlsx workbook.
 * Each entity (incidents, escalation phases, techniques, sources, actors, norms,
 * legal frameworks) lives on its own sheet so analysts can pivot/filter natively.
 */
export async function exportAllDataExcel(incidents: Incident[]) {
  const XLSX = await loadXLSX();
  const wb = XLSX.utils.book_new();

  appendSheet(XLSX, wb, "Incidents", buildIncidentsSheet(incidents));
  appendSheet(XLSX, wb, "Escalation Phases", buildEscalationPhasesSheet(incidents));
  appendSheet(XLSX, wb, "ATT&CK Techniques", buildTechniquesSheet(incidents));
  appendSheet(XLSX, wb, "Attribution Detail", buildAttributionDetailSheet(incidents));
  appendSheet(XLSX, wb, "Sources", buildSourcesSheet(incidents));
  appendSheet(XLSX, wb, "Teaching", buildTeachingSheet(incidents));
  appendSheet(XLSX, wb, "Threat Actors", buildActorsSheet());
  appendSheet(XLSX, wb, "Norms", buildNormsSheet());
  appendSheet(XLSX, wb, "Norm Effects", buildNormEffectsSheet());
  appendSheet(XLSX, wb, "Legal Rules", buildLegalRulesSheet());
  appendSheet(XLSX, wb, "Legal Rule Cases", buildLegalRuleCasesSheet());
  appendAIAttributionExploratorySheet(XLSX, wb);

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `cyber-escalation-atlas-${date}.xlsx`);
}

/**
 * Export only the currently filtered incident list (Incidents sheet plus the
 * normalised child tables that pivot off it).
 */
export async function exportIncidentsExcel(
  incidents: Incident[],
  suffix = "filtered",
) {
  const XLSX = await loadXLSX();
  const wb = XLSX.utils.book_new();

  appendSheet(XLSX, wb, "Incidents", buildIncidentsSheet(incidents));
  appendSheet(XLSX, wb, "Escalation Phases", buildEscalationPhasesSheet(incidents));
  appendSheet(XLSX, wb, "ATT&CK Techniques", buildTechniquesSheet(incidents));
  appendSheet(XLSX, wb, "Attribution Detail", buildAttributionDetailSheet(incidents));
  appendSheet(XLSX, wb, "Sources", buildSourcesSheet(incidents));
  appendSheet(XLSX, wb, "Teaching", buildTeachingSheet(incidents));

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `cea-incidents-${suffix}-${date}.xlsx`);
}
