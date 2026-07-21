import type { Incident } from "@/lib/types/incidents";
import { legalDimensionsForCase } from "@/lib/utils/legal";
import { SectionHeading } from "./SectionHeading";

interface Props {
  incident: Incident;
}

/**
 * "Legal dimensions" — the reverse of the Legal Mapper. Lists every legal rule
 * whose analysis references this case, with the specific question it raises,
 * derived automatically from the rule→case mapping in legalFrameworks.ts.
 */
export function LegalDimensionsSection({ incident }: Props) {
  const dimensions = legalDimensionsForCase(incident.slug);
  if (dimensions.length === 0) return null;

  // Group by framework for readability.
  const byFramework = new Map<string, typeof dimensions>();
  for (const d of dimensions) {
    const list = byFramework.get(d.frameworkName) ?? [];
    list.push(d);
    byFramework.set(d.frameworkName, list);
  }

  return (
    <section>
      <SectionHeading id="legal">Legal Dimensions</SectionHeading>
      <p className="text-sm text-steel-500 dark:text-steel-300 mb-4 leading-relaxed">
        Rules whose application to this operation is debated in the literature.
        These are analytical questions, not findings — the Atlas records where a
        case sits in legal debate, it does not adjudicate legality (see{" "}
        <a href="/methodology#behavior-vs-law" className="text-atlas-600 dark:text-atlas-400 hover:underline">
          methodology §09
        </a>
        ).
      </p>

      <div className="space-y-4">
        {Array.from(byFramework.entries()).map(([framework, rules]) => (
          <div
            key={framework}
            className="p-4 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30"
          >
            <p className="text-xs font-semibold text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-2.5">
              {framework}
            </p>
            <ul className="space-y-2.5">
              {rules.map((r) => (
                <li key={r.ruleId} className="text-sm">
                  <span className="font-medium text-ink dark:text-white">
                    {r.ruleName}
                  </span>
                  <p className="text-steel-500 dark:text-steel-300 leading-snug mt-0.5">
                    {r.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a
        href="/legal"
        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-atlas-600 dark:text-atlas-400 hover:underline"
      >
        Explore the full Legal Mapper
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
