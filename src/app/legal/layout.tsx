import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Mapper",
  description:
    "How international legal rules — Tallinn Manual, UN Charter, IHL, GGE norms — apply to documented cyber operations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
