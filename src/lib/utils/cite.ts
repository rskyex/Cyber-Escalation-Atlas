// ---------------------------------------------------------------------------
// Citation formatting for the Atlas and individual cases.
// ---------------------------------------------------------------------------

import type { Incident } from "@/lib/types/incidents";

export const SITE_URL = "https://cyber-escalation-atlas.vercel.app";
export const AUTHOR = "Koyanagi, Risa";
export const AUTHOR_PLAIN = "Risa Koyanagi";

/** A stable BibTeX key for a case. */
function bibKey(inc: Incident): string {
  return `cea-${inc.slug.replace(/[^a-z0-9]/gi, "")}`;
}

export function caseBibtex(inc: Incident, accessed: string): string {
  return `@misc{${bibKey(inc)},
  author       = {${AUTHOR}},
  title        = {${inc.name} --- Cyber Escalation Atlas Case Study},
  howpublished = {Cyber Escalation Atlas},
  year         = {${inc.year}},
  url          = {${SITE_URL}/cases/${inc.slug}},
  note         = {Accessed: ${accessed}}
}`;
}

export function caseApa(inc: Incident, accessed: string): string {
  return `${AUTHOR_PLAIN}. (${inc.year}). ${inc.name} — Cyber Escalation Atlas case study. Cyber Escalation Atlas. Retrieved ${accessed}, from ${SITE_URL}/cases/${inc.slug}`;
}

export function caseChicago(inc: Incident, accessed: string): string {
  return `${AUTHOR_PLAIN}. "${inc.name} — Cyber Escalation Atlas Case Study." Cyber Escalation Atlas. Accessed ${accessed}. ${SITE_URL}/cases/${inc.slug}.`;
}

// ---- Whole-dataset citations -----------------------------------------------

export function datasetBibtex(accessed: string): string {
  return `@misc{cyber-escalation-atlas,
  author       = {${AUTHOR}},
  title        = {Cyber Escalation Atlas},
  howpublished = {Faultline research ecosystem},
  url          = {${SITE_URL}},
  note         = {Accessed: ${accessed}}
}`;
}

export function datasetApa(accessed: string): string {
  return `${AUTHOR_PLAIN}. Cyber Escalation Atlas. Faultline research ecosystem. Retrieved ${accessed}, from ${SITE_URL}`;
}

export function datasetChicago(accessed: string): string {
  return `${AUTHOR_PLAIN}. "Cyber Escalation Atlas." Faultline research ecosystem. Accessed ${accessed}. ${SITE_URL}.`;
}
