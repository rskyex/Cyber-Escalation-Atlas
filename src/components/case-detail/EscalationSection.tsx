"use client";

import type { Incident, EscalationTier } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  escalationTierLabels,
  escalationTierBadge,
  tierIndex,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";
import { EscalationRadar } from "./EscalationRadar";

const allTiers: EscalationTier[] = [
  "probing",
  "intrusion",
  "disruption",
  "degradation",
  "destruction",
  "strategic",
];

interface EscalationSectionProps {
  incident: Incident;
}

export function EscalationSection({ incident }: EscalationSectionProps) {
  const { phases, peakTier, restraintFactors, thresholdCrossings } =
    incident.escalation;
  const peakIdx = tierIndex(peakTier);

  return (
    <section>
      <SectionHeading id="escalation">Escalation Profile</SectionHeading>

      {/* Radar + tier ladder side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Radar chart */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-ink-50/50 dark:bg-white/[0.03] border border-transparent dark:border-white/[0.04]">
          <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-2">
            7-Dimension Profile
          </p>
          <EscalationRadar incident={incident} size={260} />
        </div>

        {/* Tier ladder */}
        <div className="p-4 rounded-lg bg-ink-50/50 dark:bg-white/[0.03] border border-transparent dark:border-white/[0.04]">
          <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-3">
            Escalation Ladder
          </p>
          <div className="flex items-end gap-1.5 h-28">
            {allTiers.map((tier, idx) => {
              const isActive = idx <= peakIdx;
              const isPeak = tier === peakTier;
              const height = `${((idx + 1) / allTiers.length) * 100}%`;
              return (
                <div
                  key={tier}
                  className="flex-1 flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`w-full rounded-t transition-colors ${
                      isPeak
                        ? "bg-signal-500 dark:bg-signal-400"
                        : isActive
                          ? "bg-atlas-400/70 dark:bg-atlas-500/70"
                          : "bg-ink-100 dark:bg-ink-600/40"
                    }`}
                    style={{ height }}
                  />
                  <span
                    className={`text-[10px] leading-tight text-center ${
                      isPeak
                        ? "font-bold text-signal-700 dark:text-signal-300"
                        : "text-steel-500 dark:text-steel-300"
                    }`}
                  >
                    {escalationTierLabels[tier].split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="mb-6">
        <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-3">
          Phases
        </p>
        <div className="space-y-3">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-3 rounded-md bg-ink-50/50 dark:bg-white/[0.03] border border-transparent dark:border-white/[0.04]"
            >
              <div className="shrink-0 w-20">
                {phase.date && (
                  <span className="text-xs font-mono text-steel-500 dark:text-steel-300">
                    {phase.date}
                  </span>
                )}
                <div className="mt-1">
                  <Badge variant={escalationTierBadge[phase.tier]}>
                    {escalationTierLabels[phase.tier]}
                  </Badge>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink dark:text-white">
                  {phase.label}
                </p>
                <p className="text-sm text-steel-500 dark:text-steel-200 mt-0.5">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threshold crossings + restraint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-signal-50/50 dark:bg-signal-900/10 border border-signal-200/30 dark:border-signal-700/30">
          <p className="text-xs font-semibold text-signal-700 dark:text-signal-300 uppercase tracking-wider mb-2">
            Threshold Crossings
          </p>
          <ul className="space-y-1">
            {thresholdCrossings.map((t, i) => (
              <li
                key={i}
                className="text-sm text-ink dark:text-white flex gap-2"
              >
                <span className="text-signal-500 shrink-0">&bull;</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-lg bg-atlas-50/50 dark:bg-atlas-900/10 border border-atlas-200/30 dark:border-atlas-700/30">
          <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-300 uppercase tracking-wider mb-2">
            Restraint Factors
          </p>
          <ul className="space-y-1">
            {restraintFactors.map((r, i) => (
              <li
                key={i}
                className="text-sm text-ink dark:text-white flex gap-2"
              >
                <span className="text-atlas-500 shrink-0">&bull;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
