"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper, Badge } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import type { Incident, AttributionConsequenceType } from "@/lib/types/incidents";

const ACTORS = [
  "US Government",
  "UK Government",
  "EU",
  "Allied Coalition",
  "Academic/Private Sector",
  "Contested/Unknown",
] as const;

const CONSEQUENCES: AttributionConsequenceType[] = [
  "Sanctions",
  "Indictment",
  "Diplomatic Expulsion",
  "Public Naming Only",
  "No Formal Response",
];

function hasClaimant(inc: Incident, actor: string): boolean {
  return (
    inc.attributionDetail?.claimants.some((c) => c.actor === actor) ?? false
  );
}

function ConsequenceGroup({
  consequence,
  cases,
}: {
  consequence: string;
  cases: Incident[];
}) {
  const filtered = cases.filter((c) =>
    c.attributionDetail?.consequences.includes(consequence as AttributionConsequenceType)
  );
  if (filtered.length === 0) return null;
  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-ink dark:text-white mb-2">
        {consequence}{" "}
        <span className="text-xs font-normal text-steel-500">
          ({filtered.length})
        </span>
      </h4>
      <div className="space-y-1">
        {filtered.map((inc) => (
          <a
            key={inc.slug}
            href={`/cases/${inc.slug}`}
            className="block text-sm text-steel-400 dark:text-steel-300 hover:text-atlas-500 transition-colors"
          >
            {inc.shortName} ({inc.year})
          </a>
        ))}
      </div>
    </div>
  );
}

export default function AttributionLensPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const incidents = seedIncidents.filter((i) => i.attributionDetail);

  return (
    <SectionWrapper>
      <PageHeader
        label="ATT"
        title="Attribution Lens"
        subtitle="The political and evidentiary structure of attribution claims across all cases. Who attributed, in what sequence, with what evidence, and to what consequence."
      />

      {/* Section A: Attribution Confidence Matrix */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-ink dark:text-white mb-1">
          Attribution Confidence Matrix
        </h2>
        <p className="text-sm text-steel-500 dark:text-steel-300 mb-6 max-w-2xl">
          Each cell indicates whether that actor made an attribution claim for
          that case. A dense reference for understanding the pattern of
          coordinated versus unilateral attribution.
        </p>
        <div className="overflow-x-auto rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-ink-50/50 dark:bg-ink-800/30">
                <th className="text-left p-2 font-semibold text-ink dark:text-ink-100 border-b border-steel-200/20 dark:border-ink-600/25 min-w-[140px] sticky left-0 bg-ink-50/50 dark:bg-ink-800/30 z-10">
                  Case
                </th>
                {ACTORS.map((a) => (
                  <th
                    key={a}
                    className="p-2 font-semibold text-ink dark:text-ink-100 border-b border-steel-200/20 dark:border-ink-600/25 text-center whitespace-nowrap"
                  >
                    {a}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seedIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  className="border-b border-steel-200/10 dark:border-ink-600/15 hover:bg-ink-50/30 dark:hover:bg-ink-700/20"
                >
                  <td className="p-2 sticky left-0 bg-white dark:bg-ink-700/20 z-10">
                    <a
                      href={`/cases/${inc.slug}`}
                      className="text-ink dark:text-white hover:text-atlas-500 font-medium transition-colors"
                    >
                      {inc.shortName}
                    </a>
                  </td>
                  {ACTORS.map((actor) => (
                    <td key={actor} className="p-2 text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          hasClaimant(inc, actor)
                            ? "bg-atlas-500"
                            : "bg-steel-200 dark:bg-ink-600"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section B: Attribution Chain */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-ink dark:text-white mb-1">
          Attribution Chain Visualisation
        </h2>
        <p className="text-sm text-steel-500 dark:text-steel-300 mb-6 max-w-2xl">
          Who attributed in what sequence for each case. Expand a case to see
          the full attribution timeline.
        </p>
        <div className="space-y-2">
          {incidents.map((inc) => {
            const detail = inc.attributionDetail!;
            const isOpen = expanded === inc.slug;
            return (
              <div
                key={inc.slug}
                className="rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : inc.slug)}
                  className="w-full text-left px-5 py-3 flex items-center justify-between hover:bg-ink-50/30 dark:hover:bg-ink-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-ink dark:text-white">
                      {inc.shortName}
                    </span>
                    <Badge variant={detail.coordinationType === "joint" ? "teal" : detail.coordinationType === "unilateral" ? "navy" : "default"}>
                      {detail.coordinationType}
                    </Badge>
                  </div>
                  <svg
                    className={`w-4 h-4 text-steel-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 border-t border-steel-200/15 dark:border-ink-600/25">
                    <div className="mt-3 space-y-2">
                      {detail.claimants
                        .sort((a, b) => a.date.localeCompare(b.date))
                        .map((c, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="text-xs font-mono text-steel-500 dark:text-ink-400 w-24 shrink-0 pt-0.5">
                              {c.date}
                            </span>
                            <span className="text-atlas-600 dark:text-atlas-400 font-medium shrink-0">
                              →
                            </span>
                            <div>
                              <span className="font-medium text-ink dark:text-white">
                                {c.actor}
                              </span>
                              <span className="text-steel-500 dark:text-steel-400">
                                {" "}
                                [{c.confidenceLevel}] — {c.evidenceBasis}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section C: Attribution Consequences */}
      <section>
        <h2 className="text-lg font-bold text-ink dark:text-white mb-1">
          Attribution Consequences
        </h2>
        <p className="text-sm text-steel-500 dark:text-steel-300 mb-6 max-w-2xl">
          Cases grouped by what the attribution claim produced — from formal
          sanctions and indictments to public naming with no further response.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONSEQUENCES.map((cons) => (
            <div
              key={cons}
              className="p-5 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20"
            >
              <ConsequenceGroup consequence={cons} cases={incidents} />
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
