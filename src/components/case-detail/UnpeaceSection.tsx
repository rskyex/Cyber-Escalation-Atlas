import type { Incident } from "@/lib/types/incidents";
import {
  unpeaceScore,
  entanglementScore,
  tierIndex,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

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
        <span className="text-xs text-slate dark:text-navy-300">{label}</span>
        <span className="text-xs font-mono text-slate dark:text-navy-300">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 rounded-full bg-navy-100 dark:bg-navy-600/40 overflow-hidden">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Score display */}
        <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30">
          <span
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${
              score >= 7
                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                : score >= 4
                  ? "bg-navy-100 dark:bg-navy-600/50 text-navy dark:text-navy-100"
                  : "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
            }`}
          >
            {score}
          </span>
          <span className="text-sm font-medium text-navy dark:text-offwhite mt-2">
            Unpeace Score
          </span>
          <span className="text-xs text-slate dark:text-navy-300 mt-0.5">
            Composite severity (1–10)
          </span>
        </div>

        {/* Dimension breakdown */}
        <div className="space-y-3 p-5 rounded-lg bg-white dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30">
          <DimensionBar
            label="Escalation peak"
            value={escalation}
            max={6}
            color="bg-amber-400 dark:bg-amber-500"
          />
          <DimensionBar
            label="Threshold crossings"
            value={thresholds}
            max={4}
            color="bg-amber-400 dark:bg-amber-500"
          />
          <DimensionBar
            label="Governance flags"
            value={govFlags}
            max={8}
            color="bg-teal-400 dark:bg-teal-500"
          />
          <DimensionBar
            label="Sectors affected"
            value={sectors}
            max={6}
            color="bg-navy-400 dark:bg-navy-300"
          />
          <DimensionBar
            label="Entanglement"
            value={entanglement}
            max={10}
            color="bg-navy-400 dark:bg-navy-300"
          />
          <DimensionBar
            label="Country scope"
            value={countries}
            max={6}
            color="bg-navy-400 dark:bg-navy-300"
          />
        </div>
      </div>
    </section>
  );
}
