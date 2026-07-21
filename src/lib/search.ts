// ---------------------------------------------------------------------------
// Client-side search index over the whole atlas.
//
// The index is assembled once from the static data modules (effectively at
// build time, since the data is bundled). A lightweight token-scoring matcher
// avoids pulling in a fuzzy-search dependency while still handling partial and
// multi-word queries.
// ---------------------------------------------------------------------------

import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import { normsData } from "@/data/norms";
import { legalFrameworks } from "@/data/legalFrameworks";
import { glossaryTerms } from "@/data/glossary";

export type SearchType = "Case" | "Actor" | "Norm" | "Legal" | "Term";

export interface SearchItem {
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  /** Lower-cased keyword blob used for matching. */
  haystack: string;
}

function build(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const inc of seedIncidents) {
    items.push({
      type: "Case",
      title: inc.name,
      subtitle: `${inc.dateRange} · ${inc.attribution.country}`,
      href: `/cases/${inc.slug}`,
      haystack: [
        inc.name,
        inc.shortName,
        inc.attribution.attributedTo,
        inc.attribution.country,
        ...inc.attribution.aliases,
        ...inc.infrastructure.targetSectors,
        inc.summary,
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const a of actorProfiles) {
    items.push({
      type: "Actor",
      title: a.name,
      subtitle: a.stateNexus,
      href: `/actors/${a.slug}`,
      haystack: [a.name, a.stateNexus, a.missionType, ...a.primarySectors]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const n of normsData) {
    items.push({
      type: "Norm",
      title: n.title,
      subtitle: n.status,
      href: `/norms`,
      haystack: [n.title, n.description, ...n.anchorInstruments]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const fw of legalFrameworks) {
    for (const r of fw.rules) {
      items.push({
        type: "Legal",
        title: r.name,
        subtitle: fw.name,
        href: `/legal`,
        haystack: [r.name, fw.name, r.description, r.cyberControversy]
          .join(" ")
          .toLowerCase(),
      });
    }
  }

  for (const t of glossaryTerms) {
    items.push({
      type: "Term",
      title: t.term,
      subtitle: "Glossary",
      href: `/glossary#${t.id}`,
      haystack: [t.term, t.definition, ...(t.aliases ?? [])]
        .join(" ")
        .toLowerCase(),
    });
  }

  return items;
}

export const searchIndex: SearchItem[] = build();

/** Score an item against a query. Higher is better; 0 means no match. */
function score(item: SearchItem, tokens: string[]): number {
  const title = item.title.toLowerCase();
  let s = 0;
  for (const tok of tokens) {
    if (!item.haystack.includes(tok)) return 0; // every token must appear
    if (title.includes(tok)) s += 3;
    if (title.startsWith(tok)) s += 2;
    s += 1;
  }
  return s;
}

export function search(query: string, limit = 20): SearchItem[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  return searchIndex
    .map((item) => ({ item, s: score(item, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.item);
}
