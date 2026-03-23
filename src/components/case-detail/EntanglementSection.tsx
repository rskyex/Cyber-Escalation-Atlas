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
      <div className="p-5 rounded-lg bg-white dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider">
            Entanglement score
          </span>
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              score >= 7
                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                : score >= 4
                  ? "bg-navy-100 dark:bg-navy-600/50 text-navy dark:text-navy-100"
                  : "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
            }`}
          >
            {score}
          </span>
        </div>

        <div>
          <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-2">
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
          <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-2">
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
          <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-1">
            Impact summary
          </p>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
            {impactSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
