"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper, Badge } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import {
  unpeaceScore,
  incidentTypeLabels,
  incidentTypeBadge,
} from "@/lib/utils/incidents";
import type { IncidentType } from "@/lib/types/incidents";

const TYPE_COLORS: Record<IncidentType, string> = {
  espionage: "#8493AF",
  destructive: "#F59E0B",
  ransomware: "#EF4444",
  sabotage: "#D97706",
  influence: "#6EE7B7",
  hybrid: "#2DD4A8",
};

const GOVERNANCE_MILESTONES = [
  { year: 2013, label: "First UN GGE consensus report" },
  { year: 2015, label: "UN GGE voluntary norms" },
  { year: 2017, label: "UN GGE failure to reach consensus" },
  { year: 2020, label: "UN OEWG first report" },
  { year: 2021, label: "Tallinn Manual 2.0 widely cited" },
  { year: 2023, label: "UN OEWG continued mandate" },
];

const MIN_YEAR = 2007;
const MAX_YEAR = 2025;
const RANGE = MAX_YEAR - MIN_YEAR;

export default function TimelinePage() {
  const [active, setActive] = useState<string | null>(null);

  const sorted = [...seedIncidents].sort((a, b) => a.year - b.year);

  return (
    <SectionWrapper>
      <PageHeader
        title="Timeline"
        subtitle="All cases plotted chronologically, sized by Unpeace score and coloured by operation type, with international governance milestones overlaid."
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 text-xs text-steel-500 dark:text-steel-400">
        {(Object.keys(TYPE_COLORS) as IncidentType[]).map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: TYPE_COLORS[t] }}
            />
            {incidentTypeLabels[t]}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative mb-12">
        {/* Axis */}
        <div className="h-px bg-steel-200/40 dark:bg-ink-600/40 w-full absolute top-1/2" />

        {/* Year labels */}
        <div className="flex justify-between text-[10px] font-mono text-steel-400 dark:text-ink-500 mb-2">
          {Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i)
            .filter((y) => y % 2 === 0 || y === MIN_YEAR)
            .map((y) => (
              <span
                key={y}
                className="absolute"
                style={{
                  left: `${((y - MIN_YEAR) / RANGE) * 100}%`,
                  transform: "translateX(-50%)",
                  top: "-18px",
                }}
              >
                {y}
              </span>
            ))}
        </div>

        {/* Governance markers */}
        {GOVERNANCE_MILESTONES.map((m) => (
          <div
            key={m.year}
            className="absolute top-0 bottom-0 flex flex-col items-center"
            style={{ left: `${((m.year - MIN_YEAR) / RANGE) * 100}%` }}
          >
            <div className="w-px h-full border-l border-dashed border-atlas-400/30 dark:border-atlas-500/20" />
            <span className="absolute -top-7 text-[9px] font-mono text-atlas-500 dark:text-atlas-400 whitespace-nowrap -translate-x-1/2">
              {m.label}
            </span>
          </div>
        ))}

        {/* Case nodes */}
        <div className="relative h-32 mt-10">
          {sorted.map((inc, i) => {
            const score = unpeaceScore(inc);
            const size = Math.max(16, score * 4);
            const x = ((inc.year - MIN_YEAR) / RANGE) * 100;
            // Stagger vertically to avoid overlap
            const y = 20 + (i % 3) * 30;
            const isActive = active === inc.id;

            return (
              <button
                key={inc.id}
                className="absolute group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-400 focus-visible:ring-offset-2"
                style={{
                  left: `${x}%`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isActive ? 20 : 1,
                }}
                aria-label={`${inc.shortName}, ${inc.year}, ${incidentTypeLabels[inc.incidentType]}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(inc.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(inc.id)}
                onBlur={() => setActive(null)}
                onClick={() =>
                  setActive(active === inc.id ? null : inc.id)
                }
              >
                <span
                  className={`block rounded-full border-2 border-white dark:border-ink-800 shadow-sm transition-all ${
                    isActive ? "ring-2 ring-atlas-400/50 scale-125" : ""
                  }`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: TYPE_COLORS[inc.incidentType],
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Active tooltip */}
        {active && (() => {
          const inc = seedIncidents.find((i) => i.id === active);
          if (!inc) return null;
          return (
            <div className="mt-4 p-4 rounded-xl bg-white dark:bg-ink-700 border dark:border-white/[0.04] shadow-lg max-w-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-ink dark:text-white">
                  {inc.shortName}
                </span>
                <Badge variant={incidentTypeBadge[inc.incidentType]}>
                  {incidentTypeLabels[inc.incidentType]}
                </Badge>
              </div>
              <p className="text-xs text-steel-500 dark:text-steel-400 mb-2">
                {inc.dateRange} · Unpeace {unpeaceScore(inc) * 10}
              </p>
              <p className="text-xs text-steel-500 dark:text-steel-300 line-clamp-2">
                {inc.summary}
              </p>
              <a
                href={`/cases/${inc.slug}`}
                className="inline-block mt-2 text-xs text-atlas-600 dark:text-atlas-400 hover:underline"
              >
                View case →
              </a>
            </div>
          );
        })()}
      </div>

      {/* Analytical annotation */}
      <div className="p-5 rounded-xl border-l-4 border-atlas-500 bg-atlas-50/40 dark:bg-atlas-900/10 mb-10">
        <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-400 uppercase tracking-wider mb-2">
          Pattern Analysis
        </p>
        <p className="text-sm text-ink dark:text-white leading-relaxed">
          The timeline reveals distinct clustering: a pre-norm period (2007–2014) dominated by pioneering sabotage and espionage operations,
          a contested period (2015–2019) where governance frameworks emerged alongside increasingly sophisticated attacks,
          and an escalatory period (2020–present) marked by ransomware industrialisation, wartime cyber operations, and strategic pre-positioning.
          The 2017 GGE consensus failure correlates with an observable acceleration in destructive operations,
          suggesting that norm vacuum periods may reduce restraint incentives.
        </p>
      </div>
    </SectionWrapper>
  );
}
