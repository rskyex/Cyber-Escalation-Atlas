import type { Incident } from "@/lib/types/incidents";
import { seedIncidents as original } from "./seed";
import { newCases2024 } from "./newCases2024";
import { newCasesGlobal } from "./newCasesGlobal";
import { attributionDetails, actorSlugs } from "./attributionData";

/** Enrich original seed incidents with attribution detail and actor slug. */
function enrichIncidents(incidents: Incident[]): Incident[] {
  return incidents.map((inc) => ({
    ...inc,
    attributionDetail: attributionDetails[inc.slug] ?? inc.attributionDetail,
    actorSlug: actorSlugs[inc.slug] ?? inc.actorSlug,
  }));
}

export const seedIncidents: Incident[] = [
  ...enrichIncidents(original),
  ...newCases2024,
  ...newCasesGlobal,
];
