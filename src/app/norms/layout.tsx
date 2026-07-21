import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Norm Evolution Tracker",
  description:
    "Six international cyber norms tracked across the dataset: their origins, and whether each incident reinforced, violated, or exposed gaps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
