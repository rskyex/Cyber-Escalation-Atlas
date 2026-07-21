export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Observatory", href: "/observatory", highlight: true },
  { label: "Cases", href: "/cases" },
  { label: "Escalation", href: "/escalation-lens" },
  { label: "Infrastructure", href: "/infrastructure-lens" },
  { label: "Governance", href: "/governance-lens" },
  { label: "Attribution", href: "/attribution-lens" },
  { label: "Timeline", href: "/timeline" },
  { label: "Actors", href: "/actors" },
  { label: "Compare", href: "/compare" },
];

export const secondaryNav: NavItem[] = [
  { label: "Brief Generator", href: "/brief" },
  { label: "Norms", href: "/norms" },
  { label: "Legal", href: "/legal" },
  { label: "Glossary", href: "/glossary" },
  { label: "Data", href: "/data" },
  { label: "Methodology", href: "/methodology" },
  { label: "Sources", href: "/sources" },
  { label: "Cite", href: "/cite" },
  { label: "About", href: "/about" },
];
