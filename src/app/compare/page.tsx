import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { CompareTool } from "@/components/compare/CompareTool";

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
