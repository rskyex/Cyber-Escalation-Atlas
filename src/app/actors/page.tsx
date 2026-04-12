"use client";

import Link from "next/link";
import { PageHeader, SectionWrapper, Badge } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import { incidentTypeLabels } from "@/lib/utils/incidents";
import type { IncidentType } from "@/lib/types/incidents";

function getActorCases(slug: string) {
  return seedIncidents.filter((i) => i.actorSlug === slug);
}

function dominantType(slug: string): string {
  const cases = getActorCases(slug);
  const counts: Partial<Record<IncidentType, number>> = {};
  cases.forEach((c) => {
    counts[c.incidentType] = (counts[c.incidentType] || 0) + 1;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return top ? incidentTypeLabels[top[0] as IncidentType] : "—";
}

export default function ActorsPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Threat Actor Profiles"
        subtitle="Named threat actors in the dataset, their state nexus, attributed operations, and behavioural patterns."
      />
      <div className="space-y-3">
        {actorProfiles.map((actor) => {
          const cases = getActorCases(actor.slug);
          const years = cases.map((c) => c.year);
          const firstYear = years.length ? Math.min(...years) : null;
          const lastYear = years.length ? Math.max(...years) : null;

          return (
            <Link key={actor.slug} href={`/actors/${actor.slug}`} className="block group">
              <div className="p-5 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 hover:border-atlas-400/50 dark:hover:border-atlas-600/40 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-ink dark:text-white group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {actor.name}
                    </h3>
                    <p className="text-xs text-steel-500 dark:text-steel-400 mt-0.5">
                      {actor.stateNexus}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-steel-500 dark:text-ink-400 shrink-0">
                    {cases.length} case{cases.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-steel-500 dark:text-steel-400">
                  <Badge variant="default">
                    {dominantType(actor.slug)}
                  </Badge>
                  {actor.primarySectors.slice(0, 3).map((s) => (
                    <Badge key={s} variant="default">{s}</Badge>
                  ))}
                  {firstYear && lastYear && (
                    <span className="font-mono">
                      {firstYear === lastYear ? firstYear : `${firstYear}–${lastYear}`}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
