import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { GovernanceLens } from "@/components/governance/GovernanceLens";

export const metadata: Metadata = {
  title: "Governance Lens",
  description:
    "Policy responses, international norms, and regulatory frameworks shaped by state-linked cyber incidents.",
};

export default function GovernanceLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Governance Lens"
        subtitle="The governance dimension is central to the Atlas. This lens evaluates how international norms, attribution practices, sanctions, regulatory frameworks, and accountability mechanisms shape, and are shaped by, major cyber incidents."
        accent
      />
      <GovernanceLens incidents={seedIncidents} />
    </SectionWrapper>
  );
}
