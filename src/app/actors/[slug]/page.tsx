import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import { SectionWrapper, Badge } from "@/components/ui";
import {
  unpeaceScore,
  incidentTypeLabels,
  incidentTypeBadge,
} from "@/lib/utils/incidents";

export function generateStaticParams() {
  return actorProfiles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const actor = actorProfiles.find((a) => a.slug === params.slug);
  if (!actor) return { title: "Actor Not Found" };
  return { title: `${actor.name} — Cyber Escalation Atlas` };
}

export default function ActorDetailPage({ params }: { params: { slug: string } }) {
  const actor = actorProfiles.find((a) => a.slug === params.slug);
  if (!actor) notFound();

  const cases = seedIncidents.filter((i) => i.actorSlug === params.slug);
  const techniques = cases.flatMap((c) => c.infrastructure.techniques);
  const tacticCounts: Record<string, number> = {};
  techniques.forEach((t) => {
    tacticCounts[t.tactic] = (tacticCounts[t.tactic] || 0) + 1;
  });
  const topTactics = Object.entries(tacticCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <a href="/actors" className="text-xs text-atlas-600 dark:text-atlas-400 hover:underline mb-4 block">
            ← All Actors
          </a>
          <h1 className="text-display font-display text-ink dark:text-white mb-2">{actor.name}</h1>
          <p className="text-body-lg text-steel-500 dark:text-steel-400">{actor.stateNexus}</p>
        </div>

        {/* Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">Mission Type</p>
            <p className="text-sm text-steel-500 dark:text-steel-300">{actor.missionType}</p>
          </div>
          <div className="p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">Primary Sectors</p>
            <div className="flex flex-wrap gap-1">{actor.primarySectors.map((s) => <Badge key={s} variant="default">{s}</Badge>)}</div>
          </div>
          <div className="p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">Operational Period</p>
            <p className="text-sm text-steel-500 dark:text-steel-300">{actor.operationalPeriod}</p>
          </div>
          <div className="p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">Attributed Cases</p>
            <p className="text-2xl font-bold text-atlas-600 dark:text-atlas-400">{cases.length}</p>
          </div>
        </section>

        {/* Cases */}
        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-4">Attributed Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cases.map((inc) => (
              <a key={inc.id} href={`/cases/${inc.slug}`} className="block p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 hover:border-atlas-400/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-ink dark:text-white">{inc.shortName}</span>
                  <span className="text-xs font-mono text-steel-500">{inc.year}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={incidentTypeBadge[inc.incidentType]}>{incidentTypeLabels[inc.incidentType]}</Badge>
                  <span className="text-xs text-steel-500">Unpeace {unpeaceScore(inc) * 10}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* TTP Pattern */}
        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-2">TTP Pattern Summary</h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-4">{actor.ttps}</p>
          {topTactics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {topTactics.map(([tactic, count]) => (
                <span key={tactic} className="text-xs px-2 py-1 rounded-md bg-ink-50 dark:bg-ink-600/30 text-ink dark:text-steel-300">
                  {tactic} ({count})
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Behavioral Signature */}
        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-2">Behavioural Signature</h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">{actor.behavioralSignature}</p>
        </section>

        {/* Governance Footprint */}
        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-2">Governance Footprint</h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">{actor.governanceFootprint}</p>
        </section>
      </div>
    </SectionWrapper>
  );
}
