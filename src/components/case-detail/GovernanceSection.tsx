import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  governanceFlagLabels,
  governanceFlagBadge,
} from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

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
      <div className="rounded-lg border-2 border-teal-400/60 dark:border-teal-500/40 bg-white dark:bg-navy-700/30 overflow-hidden">
        {/* Governance flags header */}
        <div className="px-5 py-4 bg-teal-50/60 dark:bg-teal-900/15 border-b border-teal-200/40 dark:border-teal-700/30">
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2.5">
            Governance Flags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {flags.map((f) => (
              <Badge key={f} variant={governanceFlagBadge[f]}>
                {governanceFlagLabels[f]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Norms invoked */}
          {normsInvoked.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
                Norms invoked
              </p>
              <ul className="space-y-1.5">
                {normsInvoked.map((n, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate dark:text-navy-200 flex gap-2"
                  >
                    <span className="text-teal-500 shrink-0">&bull;</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Policy responses */}
          {policyResponses.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
                Policy responses
              </p>
              <ul className="space-y-1.5">
                {policyResponses.map((r, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate dark:text-navy-200 flex gap-2"
                  >
                    <span className="text-navy-300 shrink-0">&bull;</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regulatory changes */}
          {regulatoryChanges.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
                Regulatory changes
              </p>
              <ul className="space-y-1.5">
                {regulatoryChanges.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate dark:text-navy-200 flex gap-2"
                  >
                    <span className="text-navy-300 shrink-0">&bull;</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Governance impact */}
          <div className="pt-4 border-t border-navy-200/20 dark:border-navy-600/30">
            <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
              Governance impact assessment
            </p>
            <p className="text-sm text-navy dark:text-offwhite leading-relaxed">
              {impact}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
