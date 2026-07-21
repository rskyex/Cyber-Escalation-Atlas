import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Brief Generator",
  description:
    "Generate structured intelligence briefs from the Cyber Escalation Atlas dataset. Verify before operational use.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
