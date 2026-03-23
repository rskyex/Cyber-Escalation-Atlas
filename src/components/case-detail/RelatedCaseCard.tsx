import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  incidentTypeLabels,
  incidentTypeBadge,
  escalationTierLabels,
  escalationTierBadge,
  unpeaceScore,
} from "@/lib/utils/incidents";

interface RelatedCaseCardProps {
  incident: Incident;
}

export function RelatedCaseCard({ incident }: RelatedCaseCardProps) {
  const score = unpeaceScore(incident);

  return (
    <a
      href={`/cases/${incident.slug}`}
      className="group block p-4 rounded-lg border border-steel-200/30 dark:border-ink-600/40 bg-white dark:bg-ink-700/25 hover:border-atlas-300/50 dark:hover:border-atlas-600/40 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink dark:text-white group-hover:text-atlas-700 dark:group-hover:text-atlas-400 transition-colors leading-snug">
            {incident.shortName}
          </p>
          <p className="text-xs text-steel-500 dark:text-steel-300 mt-0.5">
            {incident.dateRange} · {incident.attribution.country}
          </p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
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

      <p className="text-xs text-steel-500 dark:text-steel-300 mt-2 line-clamp-2 leading-relaxed">
        {incident.whyThisMatters}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        <Badge variant={incidentTypeBadge[incident.incidentType]}>
          {incidentTypeLabels[incident.incidentType]}
        </Badge>
        <Badge variant={escalationTierBadge[incident.escalation.peakTier]}>
          {escalationTierLabels[incident.escalation.peakTier]}
        </Badge>
      </div>
    </a>
  );
}
