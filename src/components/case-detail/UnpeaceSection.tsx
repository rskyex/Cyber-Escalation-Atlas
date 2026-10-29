"use client";

import type { Incident } from "@/lib/types/incidents";
import {
  unpeaceScore,
  unpeaceBreakdown,
  entanglementBreakdown,
  governanceAxis,
  governanceFlagLabels,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";
import { UnpeaceAxis } from "./UnpeaceAxis";
import { ScoreBreakdown } from "./ScoreBreakdown";

interface UnpeaceSectionProps {
  incident: Incident;
}

export function UnpeaceSection({ incident }: UnpeaceSectionProps) {
  const score = unpeaceScore(incident);
  const unpeace = unpeaceBreakdown(incident);
  const entanglement = entanglementBreakdown(incident);
  const gov = governanceAxis(incident);

  return (
    <section>
      <SectionHeading id="unpeace">Unpeace Position</SectionHeading>

      {/* Main axis visualization */}
      <div className="p-5 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold ${
              score >= 7
                ? "bg-signal-100 dark:bg-signal-900/40 text-signal-700 dark:text-signal-300"
                : score >= 4
                  ? "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                  : "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-300"
            }`}
          >
            {score}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink dark:text-white">
              Unpeace Score
            </p>
            <p className="text-xs text-steel-500 dark:text-steel-300">
              Severity on the peace–conflict spectrum (1–10): peak tier and thresholds crossed
            </p>
          </div>
        </div>
        <UnpeaceAxis score={score} />
        <div className="mt-4 pt-4 border-t border-steel-200/20 dark:border-ink-600/30 text-sm">
          <p className="font-semibold text-ink dark:text-white">Governance response (separate axis)</p>
          <p className="text-steel-500 dark:text-steel-300 mt-1">
            {gov.formal} formal {gov.formal === 1 ? "response" : "responses"}
            {gov.formal > 0 && `: ${gov.formalFlags.map((f) => governanceFlagLabels[f].toLowerCase()).join(", ")}`}.
            {gov.analytic > 0 && ` Analyst judgements: ${gov.analyticFlags.map((f) => governanceFlagLabels[f].replace(" (analyst judgement)", "").toLowerCase()).join(", ")}.`}
          </p>
        </div>
      </div>

      {/* Transparent score breakdowns */}
      <div className="grid gap-5 md:grid-cols-2">
        <ScoreBreakdown
          title="Unpeace"
          breakdown={unpeace}
          max={10}
          methodologyAnchor="unpeace-score"
        />
        <ScoreBreakdown
          title="Entanglement"
          breakdown={entanglement}
          max={10}
          methodologyAnchor="entanglement-score"
        />
      </div>
    </section>
  );
}
