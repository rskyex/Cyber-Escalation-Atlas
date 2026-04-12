export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Cases", href: "/cases" },
  { label: "Escalation", href: "/escalation-lens" },
  { label: "Infrastructure", href: "/infrastructure-lens" },
  { label: "Governance", href: "/governance-lens", highlight: true },
  { label: "Attribution", href: "/attribution-lens" },
  { label: "Timeline", href: "/timeline" },
  { label: "Actors", href: "/actors" },
  { label: "Sectors", href: "/sectors" },
  { label: "Compare", href: "/compare" },
];

export const secondaryNav: NavItem[] = [
  { label: "Brief Generator", href: "/brief" },
  { label: "Norms", href: "/norms" },
  { label: "Legal", href: "/legal" },
  { label: "Methodology", href: "/methodology" },
  { label: "Sources", href: "/sources" },
  { label: "About", href: "/about" },
];
