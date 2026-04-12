"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { legalFrameworks } from "@/data/legalFrameworks";
import { seedIncidents } from "@/data/incidents";

export default function LegalPage() {
  const [selectedFramework, setSelectedFramework] = useState(legalFrameworks[0].id);
  const [selectedRule, setSelectedRule] = useState(legalFrameworks[0].rules[0].ruleId);

  const framework = legalFrameworks.find((f) => f.id === selectedFramework)!;
  const rule = framework.rules.find((r) => r.ruleId === selectedRule) || framework.rules[0];

  return (
    <SectionWrapper>
      <PageHeader
        title="Legal Framework Mapper"
        subtitle="How international legal frameworks apply to cyber operations in the dataset. Select a framework and rule to examine its relevance, analytical controversy, and implicated cases."
      />

      {/* Caveat */}
      <div className="p-4 rounded-xl bg-signal-50/30 dark:bg-signal-900/10 border border-signal-200/30 dark:border-signal-700/20 mb-8">
        <p className="text-xs text-signal-700 dark:text-signal-300 italic">
          Legal classifications on this page reflect analytical frameworks used in academic and policy literature. They do not constitute legal determinations.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Framework tree */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-20 space-y-2 p-4 rounded-xl border border-transparent dark:border-white/[0.04] bg-ink-50/50 dark:bg-white/[0.03]">
            {legalFrameworks.map((fw) => (
              <div key={fw.id}>
                <button
                  onClick={() => {
                    setSelectedFramework(fw.id);
                    setSelectedRule(fw.rules[0].ruleId);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-bold rounded-md transition-colors ${
                    selectedFramework === fw.id
                      ? "text-atlas-600 dark:text-atlas-400 bg-atlas-50/50 dark:bg-atlas-900/15"
                      : "text-ink dark:text-white hover:bg-ink-50/50 dark:hover:bg-ink-700/30"
                  }`}
                >
                  {fw.name}
                </button>
                {selectedFramework === fw.id && (
                  <div className="ml-3 mt-1 space-y-0.5">
                    {fw.rules.map((r) => (
                      <button
                        key={r.ruleId}
                        onClick={() => setSelectedRule(r.ruleId)}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors ${
                          selectedRule === r.ruleId
                            ? "text-atlas-600 dark:text-atlas-400 bg-atlas-50/40 dark:bg-atlas-900/10 font-medium"
                            : "text-steel-500 dark:text-steel-400 hover:text-ink dark:hover:text-white"
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Right: Rule detail */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 p-6">
            <h2 className="text-xl font-bold text-ink dark:text-white mb-1">{rule.name}</h2>
            <p className="text-xs text-steel-500 dark:text-steel-400 mb-4">{framework.name}</p>

            {/* Description */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">{rule.description}</p>
            </div>

            {/* Cyber controversy */}
            <div className="mb-6 p-4 rounded-lg bg-ink-50/30 dark:bg-ink-800/20 border border-steel-200/15 dark:border-ink-600/20">
              <p className="text-xs font-semibold text-signal-700 dark:text-signal-400 uppercase tracking-wider mb-1">Analytical Controversy in Cyberspace</p>
              <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">{rule.cyberControversy}</p>
            </div>

            {/* Implicated cases */}
            <div>
              <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
                Implicated Cases ({rule.cases.length})
              </p>
              <div className="space-y-2">
                {rule.cases.map((c) => {
                  const inc = seedIncidents.find((i) => i.slug === c.caseSlug);
                  return (
                    <a
                      key={c.caseSlug}
                      href={`/cases/${c.caseSlug}`}
                      className="block p-3 rounded-lg border border-steel-200/15 dark:border-ink-600/20 hover:border-atlas-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-ink dark:text-white">
                          {inc?.shortName || c.caseSlug}
                        </span>
                        <span className="text-xs font-mono text-steel-500">{inc?.year}</span>
                      </div>
                      <p className="text-xs text-steel-500 dark:text-steel-400 italic">
                        {c.note}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
