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
import { dataCutoff } from "@/lib/datasetStats";

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
        className="inline-flex items-center gap-1 text-sm text-atlas-600 dark:text-atlas-400 hover:underline"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All cases
      </a>

      {/* Title + date */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white tracking-tight">
          {incident.name}
        </h1>
        <p className="text-base text-steel-500 dark:text-steel-200 mt-1">
          {incident.dateRange}
        </p>
        <p className="mt-1.5 text-xs font-mono text-steel-500 dark:text-ink-400">
          {incident.lastUpdated
            ? `Record reviewed: ${incident.lastUpdated}`
            : `Dataset reviewed: ${dataCutoff}`}
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-ink-50/50 dark:bg-white/[0.03] border border-transparent dark:border-white/[0.04]">
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
                  ? "bg-signal-100 dark:bg-signal-900/40 text-signal-700 dark:text-signal-300"
                  : score >= 4
                    ? "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                    : "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-300"
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
      <dt className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-ink dark:text-white">{value}</dd>
    </div>
  );
}
