import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { EscalationLens } from "@/components/escalation/EscalationLens";

export const metadata: Metadata = {
  title: "Escalation Lens",
  description:
    "How cyber operations climb the escalation ladder from access to strategic impact — and where restraint holds.",
};

export default function EscalationLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Escalation Lens"
        subtitle="Analyze how cyber operations move through phases of escalation, from initial access to strategic consequences, and how states signal, restrain, or intensify."
      />
      <EscalationLens incidents={seedIncidents} />
    </SectionWrapper>
  );
}
