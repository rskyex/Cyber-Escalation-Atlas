import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { EscalationLens } from "@/components/escalation/EscalationLens";

export default function EscalationLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Escalation Lens"
        subtitle="Analyze how cyber operations move through phases of escalation — from initial access to strategic consequences — and how states signal, restrain, or intensify."
      />
      <EscalationLens incidents={seedIncidents} />
    </SectionWrapper>
  );
}
