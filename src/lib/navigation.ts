export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Cases", href: "/cases" },
  { label: "Escalation Lens", href: "/escalation-lens" },
  { label: "Infrastructure Lens", href: "/infrastructure-lens" },
  { label: "Governance Lens", href: "/governance-lens", highlight: true },
  { label: "Compare", href: "/compare" },
  { label: "Methodology", href: "/methodology" },
  { label: "Sources", href: "/sources" },
];

export const secondaryNav: NavItem[] = [
  { label: "Teaching Mode", href: "#" },
  { label: "About", href: "/about" },
];
