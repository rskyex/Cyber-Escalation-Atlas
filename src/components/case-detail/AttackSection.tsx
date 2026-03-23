"use client";

import type { Incident } from "@/lib/types/incidents";
import { Collapsible } from "./Collapsible";

interface AttackSectionProps {
  incident: Incident;
}

export function AttackSection({ incident }: AttackSectionProps) {
  const { techniques } = incident.infrastructure;

  if (techniques.length === 0) return null;

  // Group by tactic
  const byTactic = new Map<string, { id: string; name: string }[]>();
  for (const t of techniques) {
    const list = byTactic.get(t.tactic) ?? [];
    list.push({ id: t.id, name: t.name });
    byTactic.set(t.tactic, list);
  }

  return (
    <div id="attack">
      <Collapsible title="ATT&CK Mapping" secondary>
        <div className="space-y-4">
          {Array.from(byTactic.entries()).map(([tactic, techs]) => (
            <div key={tactic}>
              <p className="text-xs font-semibold text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-1.5">
                {tactic}
              </p>
              <div className="space-y-1">
                {techs.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="font-mono text-xs text-atlas-600 dark:text-atlas-400 shrink-0">
                      {t.id}
                    </span>
                    <span className="text-ink dark:text-white">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-steel-500 dark:text-ink-400 mt-4 italic">
          Technique IDs reference the MITRE ATT&CK Enterprise or ICS matrices.
          Mappings are illustrative, not exhaustive.
        </p>
      </Collapsible>
    </div>
  );
}
