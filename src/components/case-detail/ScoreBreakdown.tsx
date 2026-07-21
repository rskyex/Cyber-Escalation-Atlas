"use client";

import Link from "next/link";
import type { ScoreBreakdown as ScoreBreakdownData } from "@/lib/utils/incidents";

interface Props {
  title: string;
  breakdown: ScoreBreakdownData;
  /** Display denominator, e.g. 10. */
  max: number;
  /** Anchor on /methodology explaining this score. */
  methodologyAnchor: string;
}

/**
 * Transparent, tabular decomposition of a composite score: each component's
 * raw input, its weight, and its weighted contribution — so a reader can see
 * exactly how the headline number is assembled rather than trusting a black box.
 */
export function ScoreBreakdown({
  title,
  breakdown,
  max,
  methodologyAnchor,
}: Props) {
  const { score, raw, capped, components, formula } = breakdown;
  // Largest absolute contribution, for bar scaling.
  const maxContribution = Math.max(
    1,
    ...components.map((c) => Math.abs(c.contribution)),
  );

  return (
    <div className="p-5 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider">
          {title} · score breakdown
        </p>
        <span className="text-sm font-mono text-ink dark:text-white">
          {score}
          <span className="text-steel-400">/{max}</span>
        </span>
      </div>

      <div className="space-y-3">
        {components.map((c) => {
          const pct = (Math.abs(c.contribution) / maxContribution) * 100;
          const negative = c.contribution < 0;
          return (
            <div key={c.label}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-ink dark:text-steel-100">
                  {c.label}
                </span>
                <span className="text-[11px] font-mono text-steel-500 dark:text-steel-300">
                  {c.input} × {c.weight} ={" "}
                  <span
                    className={
                      negative
                        ? "text-steel-400"
                        : "text-ink dark:text-white font-medium"
                    }
                  >
                    {c.contribution > 0 ? "+" : ""}
                    {Number.isInteger(c.contribution)
                      ? c.contribution
                      : c.contribution.toFixed(1)}
                  </span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-600/40 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    negative
                      ? "bg-steel-300 dark:bg-steel-600"
                      : "bg-atlas-400 dark:bg-atlas-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-steel-500 dark:text-steel-400 leading-snug">
                {c.note}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-steel-200/20 dark:border-ink-600/30 flex items-baseline justify-between">
        <span className="text-[11px] font-mono text-steel-500 dark:text-steel-300">
          Raw sum{" "}
          {Number.isInteger(raw) ? raw : raw.toFixed(1)}
          {capped && " → capped"}
        </span>
        <span className="text-[11px] font-mono text-ink dark:text-white">
          = {score}/{max}
        </span>
      </div>

      <p className="mt-3 text-[11px] text-steel-500 dark:text-steel-400 leading-relaxed">
        <span className="font-mono text-steel-600 dark:text-steel-300">
          {formula}
        </span>
        . These weights are an{" "}
        <span className="italic">interpretive heuristic</span>, not a validated
        metric — see the{" "}
        <Link
          href={`/methodology#${methodologyAnchor}`}
          className="text-atlas-600 dark:text-atlas-400 underline underline-offset-2 hover:text-atlas-500"
        >
          scoring methodology
        </Link>{" "}
        for rationale and limits.
      </p>
    </div>
  );
}
