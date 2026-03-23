import type { Incident } from "@/lib/types/incidents";
import { SectionHeading } from "./SectionHeading";
import { GovernanceFlagsGrid } from "./GovernanceFlagsGrid";

interface GovernanceSectionProps {
  incident: Incident;
}

export function GovernanceSection({ incident }: GovernanceSectionProps) {
  const { flags, normsInvoked, policyResponses, regulatoryChanges, impact } =
    incident.governance;

  return (
    <section>
      <SectionHeading id="governance">Governance Analysis</SectionHeading>

      {/* Prominent governance card with accent border */}
      <div className="rounded-lg border-2 border-atlas-400/60 dark:border-atlas-500/40 bg-white dark:bg-ink-700/30 overflow-hidden">
        {/* Flags grid header */}
        <div className="px-5 py-5 bg-atlas-50/60 dark:bg-atlas-900/15 border-b border-atlas-200/40 dark:border-atlas-700/30">
          <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-300 uppercase tracking-wider mb-3">
            Governance Flags
          </p>
          <GovernanceFlagsGrid activeFlags={flags} />
        </div>

        <div className="p-5 space-y-5">
          {/* Norms invoked */}
          {normsInvoked.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
                Norms invoked
              </p>
              <ul className="space-y-1.5">
                {normsInvoked.map((n, i) => (
                  <li
                    key={i}
                    className="text-sm text-steel-500 dark:text-steel-200 flex gap-2"
                  >
                    <span className="text-atlas-500 shrink-0">&bull;</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Policy responses */}
          {policyResponses.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
                Policy responses
              </p>
              <ul className="space-y-1.5">
                {policyResponses.map((r, i) => (
                  <li
                    key={i}
                    className="text-sm text-steel-500 dark:text-steel-200 flex gap-2"
                  >
                    <span className="text-steel-400 shrink-0">&bull;</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regulatory changes */}
          {regulatoryChanges.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
                Regulatory changes
              </p>
              <ul className="space-y-1.5">
                {regulatoryChanges.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm text-steel-500 dark:text-steel-200 flex gap-2"
                  >
                    <span className="text-steel-400 shrink-0">&bull;</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Governance impact */}
          <div className="pt-4 border-t border-steel-200/20 dark:border-ink-600/30">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
              Governance impact assessment
            </p>
            <p className="text-sm text-ink dark:text-white leading-relaxed">
              {impact}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
