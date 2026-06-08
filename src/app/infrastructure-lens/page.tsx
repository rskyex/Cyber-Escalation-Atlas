import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { InfrastructureLens } from "@/components/infrastructure/InfrastructureLens";

export default function InfrastructureLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Infrastructure Lens"
        subtitle="Examine how cyber operations target critical infrastructure sectors, their strategic importance, interdependencies, governance gaps, and escalation potential."
      />
      <InfrastructureLens incidents={seedIncidents} />
    </SectionWrapper>
  );
}
