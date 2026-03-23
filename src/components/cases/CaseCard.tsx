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
            <h3 className="font-semibold text-ink dark:text-white leading-tight group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
              {incident.name}
            </h3>
            <p className="text-sm text-steel-500 dark:text-steel-300 mt-0.5">
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
        <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed line-clamp-3">
          {incident.whyThisMatters}
        </p>

        {/* Footer: score + attribution */}
        <div className="flex items-center justify-between pt-1 border-t border-steel-200/20 dark:border-ink-600/30">
          <span className="text-xs text-steel-500 dark:text-steel-400">
            {incident.attribution.attributedTo.length > 50
              ? incident.attribution.attributedTo.slice(0, 50) + "\u2026"
              : incident.attribution.attributedTo}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-steel-500 dark:text-steel-400">Unpeace</span>
            <span
              className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                score >= 7
                  ? "bg-signal-100 dark:bg-signal-900/40 text-signal-700 dark:text-signal-300"
                  : score >= 4
                    ? "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                    : "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-400"
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
