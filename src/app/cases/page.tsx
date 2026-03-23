import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { sortByYear } from "@/lib/utils/incidents";
import { CasesExplorer } from "@/components/cases/CasesExplorer";

export default function CasesPage() {
  const incidents = sortByYear(seedIncidents, "desc");

  return (
    <SectionWrapper>
      <PageHeader
        title="Cases"
        subtitle="Structured case studies of significant cyber operations, analyzed across escalation, infrastructure, and governance dimensions."
      />
      <CasesExplorer incidents={incidents} />
    </SectionWrapper>
  );
}
