"use client";

import type { Incident } from "@/lib/types/incidents";
import {
  unpeaceScore,
  entanglementScore,
  tierIndex,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";
import { UnpeaceAxis } from "./UnpeaceAxis";

interface UnpeaceSectionProps {
  incident: Incident;
}

function DimensionBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-steel-500 dark:text-steel-300">{label}</span>
        <span className="text-xs font-mono text-steel-500 dark:text-steel-300">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-600/40 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function UnpeaceSection({ incident }: UnpeaceSectionProps) {
  const score = unpeaceScore(incident);
  const entanglement = entanglementScore(incident);
  const escalation = tierIndex(incident.escalation.peakTier) + 1;
  const thresholds = incident.escalation.thresholdCrossings.length;
  const govFlags = incident.governance.flags.length;
  const sectors = incident.infrastructure.targetSectors.length;
  const countries = incident.infrastructure.targetCountries.length;

  return (
    <section>
      <SectionHeading id="unpeace">Unpeace Position</SectionHeading>

      {/* Main axis visualization */}
      <div className="p-5 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold ${
              score >= 7
                ? "bg-signal-100 dark:bg-signal-900/40 text-signal-700 dark:text-signal-300"
                : score >= 4
                  ? "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                  : "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-300"
            }`}
          >
            {score}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink dark:text-white">
              Unpeace Score
            </p>
            <p className="text-xs text-steel-500 dark:text-steel-300">
              Composite severity rating on the peace–conflict spectrum
            </p>
          </div>
        </div>
        <UnpeaceAxis score={score} />
      </div>

      {/* Dimension breakdown */}
      <div className="space-y-3 p-5 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30">
        <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-1">
          Contributing Dimensions
        </p>
        <DimensionBar
          label="Escalation peak"
          value={escalation}
          max={6}
          color="bg-signal-400 dark:bg-signal-500"
        />
        <DimensionBar
          label="Threshold crossings"
          value={thresholds}
          max={4}
          color="bg-signal-400 dark:bg-signal-500"
        />
        <DimensionBar
          label="Governance flags"
          value={govFlags}
          max={8}
          color="bg-atlas-400 dark:bg-atlas-500"
        />
        <DimensionBar
          label="Sectors affected"
          value={sectors}
          max={6}
          color="bg-ink-400 dark:bg-steel-400"
        />
        <DimensionBar
          label="Entanglement"
          value={entanglement}
          max={10}
          color="bg-ink-400 dark:bg-steel-400"
        />
        <DimensionBar
          label="Country scope"
          value={countries}
          max={6}
          color="bg-ink-400 dark:bg-steel-400"
        />
      </div>
    </section>
  );
}
