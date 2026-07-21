"use client";

import type { Incident } from "@/lib/types/incidents";
import { mitreUrl } from "@/lib/utils/incidents";
import { Collapsible } from "./Collapsible";

interface AttackSectionProps {
  incident: Incident;
}

export function AttackSection({ incident }: AttackSectionProps) {
  const { techniques } = incident.infrastructure;

  if (techniques.length === 0) return null;

  // Group by tactic (kill-chain position), preserving first-seen order.
  const byTactic = new Map<string, typeof techniques>();
  for (const t of techniques) {
    const list = byTactic.get(t.tactic) ?? [];
    list.push(t);
    byTactic.set(t.tactic, list);
  }

  return (
    <div id="attack">
      <Collapsible title={`ATT&CK Mapping · ${techniques.length} techniques`} secondary>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-4 text-xs font-semibold text-steel-500 dark:text-steel-300 uppercase tracking-wider">
                  Tactic
                </th>
                <th className="py-2 pr-4 text-xs font-semibold text-steel-500 dark:text-steel-300 uppercase tracking-wider">
                  Technique
                </th>
                <th className="py-2 text-xs font-semibold text-steel-500 dark:text-steel-300 uppercase tracking-wider">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from(byTactic.entries()).map(([tactic, techs]) =>
                techs.map((t, i) => {
                  const url = mitreUrl(t.id);
                  return (
                    <tr
                      key={`${tactic}-${t.id}`}
                      className="border-t border-steel-200/20 dark:border-ink-600/30 align-top"
                    >
                      <td className="py-2 pr-4">
                        {i === 0 ? (
                          <span className="text-xs font-medium text-ink dark:text-steel-100">
                            {tactic}
                          </span>
                        ) : (
                          <span className="sr-only">{tactic}</span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-ink dark:text-white">
                        {t.name}
                      </td>
                      <td className="py-2">
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs text-atlas-600 dark:text-atlas-400 hover:underline"
                          >
                            {t.id}
                            <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M6 3h7v7M13 3L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-steel-500">
                            {t.id}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }),
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-steel-500 dark:text-ink-400 mt-4 italic">
          Technique IDs link to the MITRE ATT&CK Enterprise or ICS matrices at
          attack.mitre.org. Mappings reflect publicly reported tradecraft and
          are illustrative, not exhaustive.
        </p>
      </Collapsible>
    </div>
  );
}
