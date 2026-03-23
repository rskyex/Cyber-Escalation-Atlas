import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  incidentTypeLabels,
  incidentTypeBadge,
  escalationTierLabels,
  escalationTierBadge,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

interface RelatedSectionProps {
  related: Incident[];
}

export function RelatedSection({ related }: RelatedSectionProps) {
  if (related.length === 0) return null;

  return (
    <section>
      <SectionHeading id="related">Related Cases</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((inc) => (
          <a
            key={inc.id}
            href={`/cases/${inc.slug}`}
            className="block p-4 rounded-lg border border-navy-200/30 dark:border-navy-600/40 bg-white dark:bg-navy-700/30 hover:shadow-md dark:hover:shadow-navy-900/40 transition-shadow"
          >
            <p className="text-sm font-semibold text-navy dark:text-offwhite">
              {inc.shortName}
            </p>
            <p className="text-xs text-slate dark:text-navy-300 mt-0.5">
              {inc.dateRange}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant={incidentTypeBadge[inc.incidentType]}>
                {incidentTypeLabels[inc.incidentType]}
              </Badge>
              <Badge variant={escalationTierBadge[inc.escalation.peakTier]}>
                {escalationTierLabels[inc.escalation.peakTier]}
              </Badge>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
