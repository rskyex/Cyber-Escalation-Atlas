import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A chronological view of documented cyber operations and governance milestones.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
