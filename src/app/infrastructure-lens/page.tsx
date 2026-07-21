import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { InfrastructureLens } from "@/components/infrastructure/InfrastructureLens";

export const metadata: Metadata = {
  title: "Infrastructure Lens",
  description:
    "Technical systems targeted and exploited across state-linked cyber campaigns, mapped by sector and technique.",
};

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
