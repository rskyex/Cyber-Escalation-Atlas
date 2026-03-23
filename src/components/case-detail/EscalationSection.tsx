import type { Incident, EscalationTier } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  escalationTierLabels,
  escalationTierBadge,
  tierIndex,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

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

      {/* 7-dimension tier ladder */}
      <div className="mb-6">
        <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-3">
          Escalation Ladder
        </p>
        <div className="flex items-end gap-1 h-24">
          {allTiers.map((tier, idx) => {
            const isActive = idx <= peakIdx;
            const isPeak = tier === peakTier;
            const height = `${((idx + 1) / allTiers.length) * 100}%`;
            return (
              <div key={tier} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t transition-colors ${
                    isPeak
                      ? "bg-amber-500 dark:bg-amber-400"
                      : isActive
                        ? "bg-teal-400 dark:bg-teal-500"
                        : "bg-navy-100 dark:bg-navy-600/40"
                  }`}
                  style={{ height }}
                />
                <span
                  className={`text-[10px] leading-tight text-center ${
                    isPeak
                      ? "font-bold text-amber-700 dark:text-amber-300"
                      : "text-slate dark:text-navy-300"
                  }`}
                >
                  {escalationTierLabels[tier].split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase timeline */}
      <div className="mb-6">
        <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-3">
          Phases
        </p>
        <div className="space-y-3">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-3 rounded-md bg-white dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30"
            >
              <div className="shrink-0 w-20">
                {phase.date && (
                  <span className="text-xs font-mono text-slate dark:text-navy-300">
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
                <p className="text-sm font-semibold text-navy dark:text-offwhite">
                  {phase.label}
                </p>
                <p className="text-sm text-slate dark:text-navy-200 mt-0.5">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threshold crossings + restraint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-700/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
            Threshold Crossings
          </p>
          <ul className="space-y-1">
            {thresholdCrossings.map((t, i) => (
              <li key={i} className="text-sm text-navy dark:text-offwhite flex gap-2">
                <span className="text-amber-500 shrink-0">&bull;</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-lg bg-teal-50/50 dark:bg-teal-900/10 border border-teal-200/30 dark:border-teal-700/30">
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
            Restraint Factors
          </p>
          <ul className="space-y-1">
            {restraintFactors.map((r, i) => (
              <li key={i} className="text-sm text-navy dark:text-offwhite flex gap-2">
                <span className="text-teal-500 shrink-0">&bull;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
