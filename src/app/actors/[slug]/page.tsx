import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import { SectionWrapper, Badge } from "@/components/ui";
import {
  unpeaceScore,
  incidentTypeLabels,
  incidentTypeBadge,
  attributionLabels,
  attributionBadge,
} from "@/lib/utils/incidents";
import {
  actorCases,
  groupByAttributionGap,
  attributionGapMeta,
  type AttributionGap,
} from "@/lib/utils/actors";

export function generateStaticParams() {
  return actorProfiles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const actor = actorProfiles.find((a) => a.slug === params.slug);
  if (!actor) return { title: "Actor Not Found" };
  return { title: `${actor.name}, Cyber Escalation Atlas` };
}

export default function ActorDetailPage({ params }: { params: { slug: string } }) {
  const actor = actorProfiles.find((a) => a.slug === params.slug);
  if (!actor) notFound();

  const cases = actorCases(seedIncidents, params.slug);
  const isUnknownContested = actor.slug === "unknown-contested";
  const gapGroups = groupByAttributionGap(cases);
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

        {/* Activity timeline */}
        {cases.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-ink dark:text-white mb-4">Activity Timeline</h2>
            <ol className="relative border-l border-steel-200/40 dark:border-ink-600/40 ml-2">
              {cases.map((inc) => (
                <li key={inc.id} className="ml-4 mb-3">
                  <span className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full bg-atlas-400 dark:bg-atlas-500" />
                  <a href={`/cases/${inc.slug}`} className="group block">
                    <span className="text-xs font-mono text-steel-500 dark:text-ink-400 mr-2">{inc.year}</span>
                    <span className="text-sm font-medium text-ink dark:text-white group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {inc.shortName}
                    </span>
                    <span className="ml-2 text-xs text-steel-500">{incidentTypeLabels[inc.incidentType]}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Attribution basis */}
        {cases.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-ink dark:text-white mb-2">Attribution Basis</h2>
            <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-4">
              How firmly each operation is tied to this actor, and by whom. Confidence
              reflects the weight of public evidence, not intelligence-community ground
              truth (see{" "}
              <a href="/methodology#attribution" className="text-atlas-600 dark:text-atlas-400 hover:underline">
                methodology §08
              </a>
              ).
            </p>
            <div className="space-y-2.5">
              {cases.map((inc) => (
                <div
                  key={inc.id}
                  className="p-3.5 rounded-lg border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <a href={`/cases/${inc.slug}`} className="text-sm font-medium text-ink dark:text-white hover:text-atlas-600 dark:hover:text-atlas-400">
                      {inc.shortName}
                    </a>
                    <Badge variant={attributionBadge[inc.attribution.confidence]}>
                      {attributionLabels[inc.attribution.confidence]}
                    </Badge>
                  </div>
                  {inc.attributionDetail && inc.attributionDetail.claimants.length > 0 ? (
                    <p className="text-xs text-steel-500 dark:text-steel-400 leading-snug">
                      Attributed by{" "}
                      {inc.attributionDetail.claimants.map((c) => c.actor).join(", ")}
                      {inc.attributionDetail.consequences.length > 0 && (
                        <> · Consequences: {inc.attributionDetail.consequences.join(", ")}</>
                      )}
                    </p>
                  ) : (
                    <p className="text-xs text-steel-500 dark:text-steel-400 leading-snug">
                      Named actor: {inc.attribution.attributedTo || "—"}
                      {inc.attribution.country ? ` (${inc.attribution.country})` : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Unknown / Contested typology */}
        {isUnknownContested && (
          <section>
            <h2 className="text-lg font-bold text-ink dark:text-white mb-2">
              Why Attribution Fails
            </h2>
            <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-4">
              The cases below share one feature: no confident, consensus attribution
              exists. Attribution uncertainty is not a single problem but several. The
              Atlas sorts these cases into three failure modes — a derived analytic
              categorisation based on each record&apos;s confidence level and
              attribution detail, not an external ruling.
            </p>
            <div className="space-y-4">
              {(Object.keys(attributionGapMeta) as AttributionGap[]).map((gap) => {
                const group = gapGroups[gap];
                if (group.length === 0) return null;
                const meta = attributionGapMeta[gap];
                return (
                  <div key={gap} className="p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-ink dark:text-white">{meta.label}</h3>
                      <span className="text-xs font-mono text-steel-500 shrink-0">{group.length} cases</span>
                    </div>
                    <p className="text-xs text-steel-500 dark:text-steel-400 leading-snug mb-2.5">{meta.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.map((inc) => (
                        <a
                          key={inc.id}
                          href={`/cases/${inc.slug}`}
                          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-ink-50 dark:bg-ink-600/30 text-ink dark:text-steel-200 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                        >
                          {inc.shortName}
                          <span className="font-mono text-[10px] text-steel-500">{inc.year}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

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
