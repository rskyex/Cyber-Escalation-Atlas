// ---------------------------------------------------------------------------
// Brief filtering + deterministic template brief.
//
// The template brief is used when no AI model is configured (or when the AI
// call fails and the reader asks for a fallback). It is assembled ONLY from
// fields in the case records: counts, names, years, attribution fields,
// escalation tiers, governance flags and the recorded policy responses.
// It never adds facts that are not in the dataset.
// ---------------------------------------------------------------------------

import type {
  Incident,
  TargetSector,
  EscalationTier,
  AttributionConfidence,
  GovernanceFlag,
} from "@/lib/types/incidents";
import {
  incidentTypeLabels,
  attributionLabels,
  escalationTierLabels,
  targetSectorLabels,
  governanceFlagLabels,
  tierIndex,
} from "@/lib/utils/incidents";

export type BriefType = "executive" | "technical" | "governance";

export interface BriefFilters {
  actor: string;
  sector: string;
  region: string;
}

export const TEMPLATE_BRIEF_LABEL = "Template brief (no AI model configured)";

/** Shared filter logic for the API route and the client fallback. */
export function filterCasesForBrief(
  incidents: Incident[],
  { actor, sector, region }: BriefFilters,
): Incident[] {
  let cases = [...incidents];
  if (actor !== "all") cases = cases.filter((c) => c.actorSlug === actor);
  if (sector !== "all") {
    cases = cases.filter((c) =>
      c.infrastructure.targetSectors.includes(sector as TargetSector),
    );
  }
  if (region !== "all") {
    cases = cases.filter((c) =>
      c.infrastructure.targetCountries.some(
        (country) => country.toLowerCase() === region.toLowerCase(),
      ),
    );
  }
  return cases;
}

function countBy<T extends string>(items: T[]): [T, number][] {
  const m = new Map<T, number>();
  for (const it of items) m.set(it, (m.get(it) ?? 0) + 1);
  return Array.from(m.entries()).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

const CONFIDENCE_ORDER: AttributionConfidence[] = [
  "confirmed",
  "high",
  "moderate",
  "low",
  "contested",
];

export function buildTemplateBrief(
  cases: Incident[],
  filters: BriefFilters & { actorName?: string },
  briefType: BriefType = "executive",
): string {
  const lines: string[] = [];
  const sorted = [...cases].sort(
    (a, b) => a.year - b.year || a.name.localeCompare(b.name),
  );
  const years = sorted.map((c) => c.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const filterText = [
    `Actor: ${filters.actor === "all" ? "all actors" : filters.actorName ?? filters.actor}`,
    `Sector: ${
      filters.sector === "all"
        ? "all sectors"
        : targetSectorLabels[filters.sector as TargetSector] ?? filters.sector
    }`,
    `Region: ${filters.region === "all" ? "global" : filters.region}`,
  ].join("; ");

  // ---- Scope ---------------------------------------------------------------
  lines.push(`## Scope`);
  lines.push(
    `This brief covers ${plural(cases.length, "case")} from the Cyber Escalation Atlas dataset, dated ${
      minYear === maxYear ? `${minYear}` : `${minYear} to ${maxYear}`
    }. Filters applied: ${filterText}.`,
  );
  const typeCounts = countBy(cases.map((c) => c.incidentType));
  lines.push(
    `By incident type: ${typeCounts
      .map(([t, n]) => `${incidentTypeLabels[t]} ${n}`)
      .join(", ")}.`,
  );
  lines.push("");

  // ---- Cases ---------------------------------------------------------------
  lines.push(`## Cases in scope`);
  for (const c of sorted) {
    const title = c.name.includes(String(c.year)) ? c.name : `${c.name} (${c.year})`;
    lines.push(
      `- ${title}: ${incidentTypeLabels[c.incidentType]}. Attribution: ${c.attribution.attributedTo}. State nexus: ${c.attribution.country}. Confidence: ${attributionLabels[
        c.attribution.confidence
      ]}. Peak escalation tier: ${escalationTierLabels[c.escalation.peakTier]}.`,
    );
  }
  lines.push("");

  // ---- Escalation peaks ----------------------------------------------------
  lines.push(`## Escalation peaks`);
  const tierCounts = countBy(cases.map((c) => c.escalation.peakTier)).sort(
    (a, b) => tierIndex(b[0] as EscalationTier) - tierIndex(a[0] as EscalationTier),
  );
  lines.push(
    `Peak tier distribution: ${tierCounts
      .map(([t, n]) => `${escalationTierLabels[t]} ${n}`)
      .join(", ")}.`,
  );
  const topTier = tierCounts[0][0];
  const topCases = sorted.filter((c) => c.escalation.peakTier === topTier);
  lines.push(
    `Highest tier reached: ${escalationTierLabels[topTier]}, by ${topCases
      .map((c) => `${c.shortName || c.name} (${c.year})`)
      .join(", ")}.`,
  );
  const totalCrossings = cases.reduce(
    (n, c) => n + c.escalation.thresholdCrossings.length,
    0,
  );
  lines.push(
    `${plural(totalCrossings, "threshold crossing")} recorded across these cases. For the highest tier cases:`,
  );
  for (const c of topCases) {
    if (c.escalation.thresholdCrossings.length === 0) continue;
    lines.push(`- ${c.shortName || c.name}: ${c.escalation.thresholdCrossings.join("; ")}`);
  }
  lines.push("");

  // ---- Attribution status --------------------------------------------------
  lines.push(`## Attribution status`);
  const confCounts = CONFIDENCE_ORDER.map(
    (k) => [k, cases.filter((c) => c.attribution.confidence === k).length] as const,
  ).filter(([, n]) => n > 0);
  lines.push(
    `Attribution confidence: ${confCounts
      .map(([k, n]) => `${attributionLabels[k]} ${n}`)
      .join(", ")}.`,
  );
  const publicAttr = cases.filter((c) =>
    c.governance.flags.includes("attribution-public"),
  ).length;
  lines.push(
    `${publicAttr} of ${cases.length} cases carry a public attribution flag in the dataset.`,
  );
  const countries = countBy(cases.map((c) => c.attribution.country));
  lines.push(
    `Attributed state nexus: ${countries.map(([k, n]) => `${k} ${n}`).join(", ")}.`,
  );
  lines.push("");

  // ---- Type specific section -------------------------------------------------
  if (briefType === "technical") {
    lines.push(`## Techniques and tooling recorded`);
    const techs = countBy(
      cases.flatMap((c) =>
        c.infrastructure.techniques.map((t) => `${t.id} ${t.name}`),
      ),
    );
    if (techs.length) {
      lines.push(
        `Most frequent ATT&CK techniques: ${techs
          .slice(0, 8)
          .map(([t, n]) => `${t} (${n})`)
          .join("; ")}.`,
      );
    }
    const malware = countBy(cases.flatMap((c) => c.infrastructure.malwareFamilies));
    if (malware.length) {
      lines.push(
        `Malware families named: ${malware.map(([m]) => m).join(", ")}.`,
      );
    }
    const sectors = countBy(cases.flatMap((c) => c.infrastructure.targetSectors));
    lines.push(
      `Target sectors: ${sectors
        .map(([s, n]) => `${targetSectorLabels[s]} ${n}`)
        .join(", ")}.`,
    );
    lines.push("");
  }

  // ---- Governance responses ------------------------------------------------
  lines.push(`## Governance responses`);
  const flagCounts = countBy(cases.flatMap((c) => c.governance.flags));
  lines.push(
    flagCounts.length
      ? `Governance flags recorded: ${flagCounts
          .map(([f, n]) => `${governanceFlagLabels[f as GovernanceFlag]} ${n}`)
          .join(", ")}.`
      : `No governance flags are recorded for these cases.`,
  );
  const noResponse = sorted.filter((c) => c.governance.policyResponses.length === 0);
  if (noResponse.length) {
    lines.push(
      `Cases with no recorded policy response: ${noResponse
        .map((c) => c.shortName || c.name)
        .join(", ")}.`,
    );
  }
  const maxPerCase = briefType === "governance" ? 3 : 1;
  for (const c of sorted) {
    if (c.governance.policyResponses.length === 0) continue;
    lines.push(
      `- ${c.shortName || c.name}: ${c.governance.policyResponses
        .slice(0, maxPerCase)
        .join("; ")}`,
    );
  }
  if (briefType === "governance") {
    const norms = countBy(cases.flatMap((c) => c.governance.normsInvoked));
    if (norms.length) {
      lines.push("");
      lines.push(`## Norms invoked`);
      for (const [n, k] of norms.slice(0, 8)) lines.push(`- ${n} (${plural(k, "case")})`);
    }
    const reg = sorted.filter((c) => c.governance.regulatoryChanges.length > 0);
    if (reg.length) {
      lines.push("");
      lines.push(`## Regulatory changes recorded`);
      for (const c of reg) {
        lines.push(`- ${c.shortName || c.name}: ${c.governance.regulatoryChanges.join("; ")}`);
      }
    }
  }
  lines.push("");
  lines.push(`## Note`);
  lines.push(
    `This text is assembled by a fixed template from the case records only. It contains no model output and no analytical judgement. Check each case page for sources.`,
  );
  return lines.join("\n");
}
