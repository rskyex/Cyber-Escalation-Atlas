import type { Incident } from "@/lib/types/incidents";
import { targetSectorLabels, entanglementScore } from "@/lib/utils/incidents";
import { Badge } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

interface EntanglementSectionProps {
  incident: Incident;
}

export function EntanglementSection({ incident }: EntanglementSectionProps) {
  const score = entanglementScore(incident);
  const { targetSectors, targetCountries, impactSummary } =
    incident.infrastructure;

  return (
    <section>
      <SectionHeading id="entanglement">Entanglement Risk</SectionHeading>
      <div className="p-5 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider">
            Entanglement score
          </span>
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              score >= 7
                ? "bg-signal-100 dark:bg-signal-900/40 text-signal-700 dark:text-signal-300"
                : score >= 4
                  ? "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                  : "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-300"
            }`}
          >
            {score}
          </span>
        </div>

        <div>
          <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-2">
            Sectors affected
          </p>
          <div className="flex flex-wrap gap-1.5">
            {targetSectors.map((s) => (
              <Badge key={s} variant="default">
                {targetSectorLabels[s]}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-2">
            Countries / regions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {targetCountries.map((c) => (
              <Badge key={c} variant="navy">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-1">
            Impact summary
          </p>
          <p className="text-sm text-steel-500 dark:text-steel-200 leading-relaxed">
            {impactSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
