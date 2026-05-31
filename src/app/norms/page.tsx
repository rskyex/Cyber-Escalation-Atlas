"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper, Badge } from "@/components/ui";
import { normsData } from "@/data/norms";
import { seedIncidents } from "@/data/incidents";

const statusColors: Record<string, { bg: string; text: string }> = {
  Emerging: { bg: "bg-atlas-50 dark:bg-atlas-900/30", text: "text-atlas-700 dark:text-atlas-400" },
  Contested: { bg: "bg-signal-50 dark:bg-signal-900/25", text: "text-signal-700 dark:text-signal-300" },
  "Partially Accepted": { bg: "bg-ink-100 dark:bg-ink-600/40", text: "text-ink dark:text-steel-300" },
  "Violated Repeatedly": { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300" },
};

const effectColors: Record<string, string> = {
  reinforced: "text-atlas-600 dark:text-atlas-400",
  violated: "text-red-600 dark:text-red-400",
  "exposed gap in": "text-signal-600 dark:text-signal-400",
};

export default function NormsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedNorm = normsData.find((n) => n.normId === selected);

  return (
    <SectionWrapper>
      <PageHeader
        title="Norm Evolution Tracker"
        subtitle="Tracking six key international cyber norms across the dataset, their status, the cases that test them, and whether each incident reinforced, violated, or exposed gaps in the normative framework."
      />

      {/* Norm cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {normsData.map((norm) => {
          const sc = statusColors[norm.status] || statusColors.Emerging;
          const isSelected = selected === norm.normId;
          return (
            <button
              key={norm.normId}
              onClick={() => setSelected(isSelected ? null : norm.normId)}
              className={`text-left p-5 rounded-xl border transition-all ${
                isSelected
                  ? "border-atlas-400 dark:border-atlas-500 ring-1 ring-atlas-400/30 bg-atlas-50/30 dark:bg-atlas-900/10"
                  : "border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 hover:border-steel-400/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-ink dark:text-white leading-snug">
                  {norm.title}
                </h3>
                <span className="text-xs text-steel-500 font-mono shrink-0">
                  {norm.cases.length}
                </span>
              </div>
              <p className="text-xs text-steel-500 dark:text-steel-400 line-clamp-2 mb-3">
                {norm.description}
              </p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${sc.bg} ${sc.text}`}>
                {norm.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail view */}
      {selectedNorm && (
        <section className="rounded-xl border-2 border-atlas-400/40 dark:border-atlas-600/30 bg-white dark:bg-ink-700/20 p-6 mb-10">
          <h2 className="text-xl font-bold text-ink dark:text-white mb-2">
            {selectedNorm.title}
          </h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-4">
            {selectedNorm.description}
          </p>

          {/* Legal basis */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-400 uppercase tracking-wider mb-1">Anchor Instruments</p>
            <div className="flex flex-wrap gap-1">
              {selectedNorm.anchorInstruments.map((a) => (
                <Badge key={a} variant="default">{a}</Badge>
              ))}
            </div>
          </div>

          {/* Timeline of cases */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">Cases Implicating This Norm</p>
            <div className="space-y-2">
              {selectedNorm.normEffects.map((ne) => {
                const inc = seedIncidents.find((i) => i.slug === ne.caseSlug);
                if (!inc) return null;
                return (
                  <a key={ne.caseSlug} href={`/cases/${ne.caseSlug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50/30 dark:hover:bg-ink-700/30 transition-colors border border-steel-200/15 dark:border-ink-600/20">
                    <div>
                      <span className="text-sm font-medium text-ink dark:text-white">{inc.shortName}</span>
                      <span className="text-xs text-steel-500 ml-2">{inc.year}</span>
                    </div>
                    <span className={`text-xs font-medium ${effectColors[ne.effect]}`}>
                      {ne.effect}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Current assessment */}
          <div className="p-4 rounded-lg bg-ink-50/30 dark:bg-ink-800/20 border border-steel-200/15 dark:border-ink-600/20">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">Current Assessment</p>
            <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
              This norm is assessed as <strong className="text-ink dark:text-white">{selectedNorm.status.toLowerCase()}</strong>.
              Of {selectedNorm.normEffects.length} implicated cases,{" "}
              {selectedNorm.normEffects.filter((e) => e.effect === "violated").length} violated the norm,{" "}
              {selectedNorm.normEffects.filter((e) => e.effect === "reinforced").length} reinforced it, and{" "}
              {selectedNorm.normEffects.filter((e) => e.effect === "exposed gap in").length} exposed gaps in its application.
            </p>
          </div>
        </section>
      )}
    </SectionWrapper>
  );
}
