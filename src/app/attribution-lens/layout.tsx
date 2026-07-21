import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attribution Lens",
  description:
    "Who attributed each operation, in what sequence, with what evidence, and to what political consequence.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
