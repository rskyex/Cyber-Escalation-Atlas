import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threat Actors",
  description:
    "Profiles of state and state-affiliated threat actors, their attributed operations, TTPs, and the contested cases where attribution fails.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
