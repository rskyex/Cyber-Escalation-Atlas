import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { CompareTool } from "@/components/compare/CompareTool";

export const metadata: Metadata = {
  title: "Compare Cases",
  description:
    "Compare cyber operations side by side across escalation, infrastructure, attribution, governance, and entanglement dimensions.",
};

export default function ComparePage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Compare"
        subtitle="Side-by-side comparison of cases across escalation, infrastructure, and governance dimensions. Select two or more cases to analyze commonalities and divergences."
      />
      <CompareTool incidents={seedIncidents} />
    </SectionWrapper>
  );
}
