import type { MetadataRoute } from "next";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";

const SITE_URL = "https://cyber-escalation-atlas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/observatory",
    "/observatory/compression",
    "/observatory/attribution-field",
    "/observatory/agent-pathways",
    "/observatory/cross-domain",
    "/observatory/tempo",
    "/observatory/governance-cascade",
    "/observatory/authority",
    "/observatory/simulator",
    "/cases",
    "/actors",
    "/compare",
    "/timeline",
    "/sectors",
    "/norms",
    "/legal",
    "/escalation-lens",
    "/infrastructure-lens",
    "/governance-lens",
    "/attribution-lens",
    "/brief",
    "/methodology",
    "/sources",
    "/glossary",
    "/cite",
    "/data",
    "/about",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const caseRoutes = seedIncidents.map((inc) => ({
    url: `${SITE_URL}/cases/${inc.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const actorRoutes = actorProfiles.map((a) => ({
    url: `${SITE_URL}/actors/${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...caseRoutes, ...actorRoutes];
}
