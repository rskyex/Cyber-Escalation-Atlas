import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { glossaryTerms } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Definitions of the core concepts used across the Cyber Escalation Atlas — unpeace, entanglement, attribution layers, compellence, deterrence, and more — with their scholarly sources.",
};

export default function GlossaryPage() {
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <SectionWrapper>
      <PageHeader
        title="Glossary"
        subtitle="The concepts the Atlas relies on, defined and sourced. Where a term originates with a specific scholar, the origin is named so you can trace it."
      />

      {/* Quick index */}
      <nav className="mb-10 flex flex-wrap gap-2">
        {sorted.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="text-xs px-2.5 py-1 rounded-md border border-steel-200/40 dark:border-ink-600/40 text-steel-600 dark:text-steel-300 hover:border-atlas-400/60 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
          >
            {t.term}
          </a>
        ))}
      </nav>

      <div className="max-w-3xl space-y-6">
        {sorted.map((t) => (
          <div
            key={t.id}
            id={t.id}
            className="scroll-mt-24 p-5 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20"
          >
            <div className="flex items-baseline gap-2 mb-2 flex-wrap">
              <h2 className="text-base font-bold text-ink dark:text-white">{t.term}</h2>
              {t.aliases && t.aliases.length > 0 && (
                <span className="text-xs text-steel-500 dark:text-ink-400 italic">
                  also: {t.aliases.join(", ")}
                </span>
              )}
            </div>
            <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
              {t.definition}
            </p>
            {t.source && (
              <p className="mt-3 text-xs text-steel-500 dark:text-ink-400">
                <span className="font-semibold text-ink dark:text-steel-200">Source: </span>
                {t.sourceHref ? (
                  <a href={t.sourceHref} className="text-atlas-600 dark:text-atlas-400 hover:underline">
                    {t.source}
                  </a>
                ) : (
                  t.source
                )}
              </p>
            )}
            {!t.source && t.sourceHref && (
              <a href={t.sourceHref} className="mt-3 inline-block text-xs text-atlas-600 dark:text-atlas-400 hover:underline">
                Related in the Atlas →
              </a>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
