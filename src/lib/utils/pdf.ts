"use client";

import jsPDF from "jspdf";
import type { Incident } from "@/lib/types/incidents";
import {
  incidentTypeLabels,
  escalationTierLabels,
  targetSectorLabels,
  attributionLabels,
  unpeaceScore,
} from "@/lib/utils/incidents";

function addHeader(doc: jsPDF) {
  doc.setFontSize(8);
  doc.setTextColor(45, 212, 168);
  doc.text("Cyber Escalation Atlas", 14, 10);
  doc.setDrawColor(45, 212, 168);
  doc.line(14, 12, 196, 12);
}

function addFooter(doc: jsPDF) {
  const h = doc.internal.pageSize.height;
  doc.setFontSize(7);
  doc.setTextColor(132, 147, 175);
  doc.text("Cyber Escalation Atlas, research reference", 14, h - 8);
  doc.text(`Generated ${new Date().toISOString().slice(0, 10)}`, 196, h - 8, { align: "right" });
}

export function exportCasePdf(incident: Incident) {
  const doc = new jsPDF();
  addHeader(doc);
  let y = 20;

  // Title
  doc.setFontSize(16);
  doc.setTextColor(10, 15, 28);
  doc.text(incident.name, 14, y);
  y += 10;

  // Metadata
  doc.setFontSize(9);
  doc.setTextColor(80, 90, 110);
  const meta = [
    `Year: ${incident.year}`,
    `Type: ${incidentTypeLabels[incident.incidentType]}`,
    `Sectors: ${incident.infrastructure.targetSectors.map((s) => targetSectorLabels[s]).join(", ")}`,
    `Attribution: ${incident.attribution.attributedTo}`,
    `Confidence: ${attributionLabels[incident.attribution.confidence]}`,
    `Unpeace Score: ${unpeaceScore(incident) * 10}`,
    `Peak Escalation: ${escalationTierLabels[incident.escalation.peakTier]}`,
  ];
  meta.forEach((line) => {
    doc.text(line, 14, y);
    y += 5;
  });
  y += 3;

  // Summary
  doc.setFontSize(11);
  doc.setTextColor(10, 15, 28);
  doc.text("Summary", 14, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(80, 90, 110);
  const summaryLines = doc.splitTextToSize(incident.summary, 180);
  doc.text(summaryLines, 14, y);
  y += summaryLines.length * 4.5 + 5;

  // Why this matters
  doc.setFontSize(11);
  doc.setTextColor(10, 15, 28);
  doc.text("Why This Matters", 14, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(80, 90, 110);
  const whyLines = doc.splitTextToSize(incident.whyThisMatters, 180);
  doc.text(whyLines, 14, y);
  y += whyLines.length * 4.5 + 5;

  // Governance Impact
  doc.setFontSize(11);
  doc.setTextColor(10, 15, 28);
  doc.text("Governance Impact", 14, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(80, 90, 110);
  const govLines = doc.splitTextToSize(incident.governance.impact, 180);
  doc.text(govLines, 14, y);
  y += govLines.length * 4.5 + 5;

  // ATT&CK Techniques
  if (incident.infrastructure.techniques.length > 0) {
    doc.setFontSize(11);
    doc.setTextColor(10, 15, 28);
    doc.text("ATT&CK Techniques", 14, y);
    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(80, 90, 110);
    incident.infrastructure.techniques.forEach((t) => {
      if (y > 270) { doc.addPage(); addHeader(doc); y = 20; }
      doc.text(`${t.id}: ${t.name} (${t.tactic})`, 14, y);
      y += 4;
    });
  }

  addFooter(doc);
  doc.save(`CEA-${incident.slug}.pdf`);
}

export function exportLensPdf(title: string, content: string) {
  const doc = new jsPDF();
  addHeader(doc);

  doc.setFontSize(16);
  doc.setTextColor(10, 15, 28);
  doc.text(title, 14, 20);

  doc.setFontSize(9);
  doc.setTextColor(80, 90, 110);
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 14, 30);

  addFooter(doc);
  doc.save(`CEA-${title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}

export function exportComparePdf(cases: Incident[]) {
  const doc = new jsPDF({ orientation: "landscape" });
  addHeader(doc);

  doc.setFontSize(14);
  doc.setTextColor(10, 15, 28);
  doc.text("Case Comparison", 14, 20);

  let y = 30;
  doc.setFontSize(8);

  // Headers
  const colW = (280 - 40) / cases.length;
  doc.setTextColor(10, 15, 28);
  doc.text("Field", 14, y);
  cases.forEach((c, i) => {
    doc.text(c.shortName, 50 + i * colW, y);
  });
  y += 6;

  const rows = [
    ["Year", ...cases.map((c) => String(c.year))],
    ["Type", ...cases.map((c) => incidentTypeLabels[c.incidentType])],
    ["Country", ...cases.map((c) => c.attribution.country)],
    ["Unpeace", ...cases.map((c) => String(unpeaceScore(c) * 10))],
    ["Peak Tier", ...cases.map((c) => escalationTierLabels[c.escalation.peakTier])],
  ];

  doc.setTextColor(80, 90, 110);
  rows.forEach((row) => {
    if (y > 190) { doc.addPage(); addHeader(doc); y = 20; }
    doc.text(row[0], 14, y);
    row.slice(1).forEach((val, i) => {
      doc.text(val, 50 + i * colW, y);
    });
    y += 5;
  });

  addFooter(doc);
  doc.save(`CEA-compare-${cases.map((c) => c.slug).join("-")}.pdf`);
}
