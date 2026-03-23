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
  { label: "Compare", href: "/compare" },
];

export const secondaryNav: NavItem[] = [
  { label: "Methodology", href: "/methodology" },
  { label: "Sources", href: "/sources" },
  { label: "About", href: "/about" },
];
