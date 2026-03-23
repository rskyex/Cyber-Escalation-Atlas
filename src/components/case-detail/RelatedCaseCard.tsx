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
      className="group block p-4 rounded-lg border border-navy-200/30 dark:border-navy-600/40 bg-white dark:bg-navy-700/25 hover:border-teal-300/50 dark:hover:border-teal-600/40 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy dark:text-offwhite group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors leading-snug">
            {incident.shortName}
          </p>
          <p className="text-xs text-slate dark:text-navy-300 mt-0.5">
            {incident.dateRange} · {incident.attribution.country}
          </p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
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

      <p className="text-xs text-slate dark:text-navy-300 mt-2 line-clamp-2 leading-relaxed">
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
