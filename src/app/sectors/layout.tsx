import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Cyber operations by targeted critical-infrastructure sector.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
