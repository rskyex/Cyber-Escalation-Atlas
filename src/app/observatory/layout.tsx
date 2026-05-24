import type { Metadata } from "next";
import { AtmosphericBackground } from "@/components/observatory";

export const metadata: Metadata = {
  title: "Escalation Observatory · Cyber Escalation Atlas",
  description:
    "Interactive observatory mapping AI-mediated escalation, attribution uncertainty, machine-speed governance, and cross-domain conflict propagation.",
};

export default function ObservatoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <AtmosphericBackground density="medium" variant="command" />
      <div className="relative mx-auto max-w-content px-6 lg:px-8 pt-16 sm:pt-20 pb-24">
        {children}
      </div>
    </div>
  );
}
