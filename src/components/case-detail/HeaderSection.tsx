import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  incidentTypeLabels,
  incidentTypeBadge,
  escalationTierLabels,
  escalationTierBadge,
  attributionLabels,
  attributionBadge,
  targetSectorLabels,
  unpeaceScore,
} from "@/lib/utils/incidents";

interface HeaderSectionProps {
  incident: Incident;
}

export function HeaderSection({ incident }: HeaderSectionProps) {
  const score = unpeaceScore(incident);

  return (
    <header className="space-y-5">
      {/* Back link */}
      <a
        href="/cases"
        className="inline-flex items-center gap-1 text-sm text-teal-600 dark:text-teal-400 hover:underline"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All cases
      </a>

      {/* Title + date */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-offwhite tracking-tight">
          {incident.name}
        </h1>
        <p className="text-base text-slate dark:text-navy-200 mt-1">
          {incident.dateRange}
        </p>
      </div>

      {/* Field badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={incidentTypeBadge[incident.incidentType]}>
          {incidentTypeLabels[incident.incidentType]}
        </Badge>
        <Badge variant={escalationTierBadge[incident.escalation.peakTier]}>
          Peak: {escalationTierLabels[incident.escalation.peakTier]}
        </Badge>
        <Badge variant={attributionBadge[incident.attribution.confidence]}>
          Attribution: {attributionLabels[incident.attribution.confidence]}
        </Badge>
        {incident.infrastructure.targetSectors.slice(0, 3).map((s) => (
          <Badge key={s} variant="default">
            {targetSectorLabels[s]}
          </Badge>
        ))}
      </div>

      {/* Quick facts row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-navy-50/50 dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30">
        <Fact label="Year" value={String(incident.year)} />
        <Fact label="Actor country" value={incident.attribution.country} />
        <Fact
          label="Target regions"
          value={incident.infrastructure.targetCountries.join(", ")}
        />
        <Fact
          label="Unpeace score"
          value={
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
          }
        />
      </div>
    </header>
  );
}

function Fact({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-navy dark:text-offwhite">{value}</dd>
    </div>
  );
}
