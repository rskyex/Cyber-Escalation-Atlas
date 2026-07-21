// ---------------------------------------------------------------------------
// Reverse index: case → legal rules.
//
// The legal data is authored forward (rule → cases). The case page needs the
// inverse (which rules does THIS case implicate?), derived automatically so
// the two directions can never fall out of sync.
// ---------------------------------------------------------------------------

import { legalFrameworks } from "@/data/legalFrameworks";

export interface CaseLegalDimension {
  frameworkId: string;
  frameworkName: string;
  ruleId: string;
  ruleName: string;
  /** The case-specific legal question, from the rule's per-case note. */
  note: string;
}

// Build the reverse map once at module load.
const reverseIndex: Map<string, CaseLegalDimension[]> = (() => {
  const map = new Map<string, CaseLegalDimension[]>();
  for (const fw of legalFrameworks) {
    for (const rule of fw.rules) {
      for (const c of rule.cases) {
        const list = map.get(c.caseSlug) ?? [];
        list.push({
          frameworkId: fw.id,
          frameworkName: fw.name,
          ruleId: rule.ruleId,
          ruleName: rule.name,
          note: c.note,
        });
        map.set(c.caseSlug, list);
      }
    }
  }
  return map;
})();

/** All legal rules whose analysis references the given case slug. */
export function legalDimensionsForCase(slug: string): CaseLegalDimension[] {
  return reverseIndex.get(slug) ?? [];
}
