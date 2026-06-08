"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper, Badge } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import {
  unpeaceScore,
  incidentTypeLabels,
  incidentTypeBadge,
  targetSectorLabels,
} from "@/lib/utils/incidents";
import type { TargetSector, IncidentType, Incident } from "@/lib/types/incidents";

const SECTORS: TargetSector[] = [
  "energy", "finance", "government", "healthcare", "telecommunications",
  "transportation", "defense", "technology", "manufacturing", "media",
  "critical-infrastructure",
];

function getCases(sector: TargetSector) {
  return seedIncidents.filter((i) => i.infrastructure.targetSectors.includes(sector));
}

function dominantOpType(cases: Incident[]): string {
  if (!cases.length) return "—";
  const counts: Partial<Record<IncidentType, number>> = {};
  cases.forEach((c) => { counts[c.incidentType] = (counts[c.incidentType] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ? incidentTypeLabels[top[0] as IncidentType] : "—";
}

function topActor(cases: Incident[]): string {
  if (!cases.length) return "—";
  const counts: Record<string, number> = {};
  cases.forEach((c) => {
    const slug = c.actorSlug || "unknown";
    counts[slug] = (counts[slug] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
}

function avgScore(cases: Incident[]): number {
  if (!cases.length) return 0;
  return Math.round(cases.reduce((s, c) => s + unpeaceScore(c) * 10, 0) / cases.length);
}

export default function SectorsPage() {
  const [selected, setSelected] = useState<TargetSector | null>(null);
  const detailCases = selected ? getCases(selected) : [];

  return (
    <SectionWrapper>
      <PageHeader
        title="Sector Risk Dashboard"
        subtitle="Incident distribution, escalation patterns, and dominant threat actors across critical infrastructure sectors in the dataset."
      />

      {/* Sector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {SECTORS.map((sector) => {
          const cases = getCases(sector);
          if (cases.length === 0) return null;
          const lastYear = Math.max(...cases.map((c) => c.year));
          const isSelected = selected === sector;

          return (
            <button
              key={sector}
              onClick={() => setSelected(isSelected ? null : sector)}
              className={`text-left p-5 rounded-xl border transition-all ${
                isSelected
                  ? "border-atlas-400 dark:border-atlas-500 bg-atlas-50/40 dark:bg-atlas-900/10 ring-1 ring-atlas-400/30"
                  : "border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 hover:border-steel-400/40"
              }`}
            >
              <h3 className="text-base font-bold text-ink dark:text-white mb-2">
                {targetSectorLabels[sector]}
              </h3>
              <div className="space-y-1 text-xs text-steel-500 dark:text-steel-400">
                <div className="flex justify-between">
                  <span>Incidents</span>
                  <span className="font-bold text-ink dark:text-white">{cases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Most recent</span>
                  <span className="font-mono">{lastYear}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dominant type</span>
                  <span>{dominantOpType(cases)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Unpeace</span>
                  <span className="font-mono">{avgScore(cases)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sector Detail */}
      {selected && (
        <section className="rounded-xl border-2 border-atlas-400/40 dark:border-atlas-600/30 bg-white dark:bg-ink-700/20 p-6">
          <h2 className="text-xl font-bold text-ink dark:text-white mb-4">
            {targetSectorLabels[selected]}, Detail
          </h2>

          {/* Cases list */}
          <div className="space-y-2 mb-6">
            {detailCases.map((inc) => (
              <a key={inc.id} href={`/cases/${inc.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50/30 dark:hover:bg-ink-700/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink dark:text-white">{inc.shortName}</span>
                  <Badge variant={incidentTypeBadge[inc.incidentType]}>{incidentTypeLabels[inc.incidentType]}</Badge>
                </div>
                <span className="text-xs font-mono text-steel-500">{inc.year} · UP {unpeaceScore(inc) * 10}</span>
              </a>
            ))}
          </div>

          {/* TTP concentration */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-ink dark:text-white mb-2">TTP Concentration</h3>
            <div className="flex flex-wrap gap-1">
              {(() => {
                const tactics: Record<string, number> = {};
                detailCases.forEach((c) => c.infrastructure.techniques.forEach((t) => {
                  tactics[t.tactic] = (tactics[t.tactic] || 0) + 1;
                }));
                return Object.entries(tactics)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 8)
                  .map(([tactic, count]) => (
                    <span key={tactic} className="text-xs px-2 py-1 rounded-md bg-ink-50 dark:bg-ink-600/30 text-ink dark:text-steel-300">
                      {tactic} ({count})
                    </span>
                  ));
              })()}
            </div>
          </div>

          {/* Governance response pattern */}
          <div>
            <h3 className="text-sm font-bold text-ink dark:text-white mb-2">Governance Response Pattern</h3>
            <div className="flex flex-wrap gap-1">
              {(() => {
                const flags: Record<string, number> = {};
                detailCases.forEach((c) => c.governance.flags.forEach((f) => {
                  flags[f] = (flags[f] || 0) + 1;
                }));
                return Object.entries(flags)
                  .sort((a, b) => b[1] - a[1])
                  .map(([flag, count]) => (
                    <Badge key={flag} variant="default">{flag} ({count})</Badge>
                  ));
              })()}
            </div>
          </div>
        </section>
      )}
    </SectionWrapper>
  );
}
