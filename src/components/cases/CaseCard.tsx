"use client";

import type { Incident } from "@/lib/types/incidents";
import { Card, Badge } from "@/components/ui";
import {
  incidentTypeLabels,
  escalationTierLabels,
  targetSectorLabels,
  incidentTypeBadge,
  escalationTierBadge,
  unpeaceScore,
} from "@/lib/utils/incidents";

interface CaseCardProps {
  incident: Incident;
}

export function CaseCard({ incident }: CaseCardProps) {
  const score = unpeaceScore(incident);
  const sectors = incident.infrastructure.targetSectors.slice(0, 3);

  return (
    <a href={`/cases/${incident.slug}`} className="block">
    <Card hover className="group">
      <div className="flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-navy dark:text-offwhite leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {incident.name}
            </h3>
            <p className="text-sm text-slate dark:text-navy-200 mt-0.5">
              {incident.dateRange}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant={incidentTypeBadge[incident.incidentType]}>
              {incidentTypeLabels[incident.incidentType]}
            </Badge>
          </div>
        </div>

        {/* Sector + escalation row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant={escalationTierBadge[incident.escalation.peakTier]}>
            {escalationTierLabels[incident.escalation.peakTier]}
          </Badge>
          {sectors.map((s) => (
            <Badge key={s} variant="default">
              {targetSectorLabels[s]}
            </Badge>
          ))}
        </div>

        {/* Why this matters */}
        <p className="text-sm text-slate dark:text-navy-200 leading-relaxed line-clamp-3">
          {incident.whyThisMatters}
        </p>

        {/* Footer: score + attribution */}
        <div className="flex items-center justify-between pt-1 border-t border-navy-200/20 dark:border-navy-600/30">
          <span className="text-xs text-slate dark:text-navy-300">
            {incident.attribution.attributedTo.length > 50
              ? incident.attribution.attributedTo.slice(0, 50) + "\u2026"
              : incident.attribution.attributedTo}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate dark:text-navy-300">Unpeace</span>
            <span
              className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
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
        </div>
      </div>
    </Card>
    </a>
  );
}
