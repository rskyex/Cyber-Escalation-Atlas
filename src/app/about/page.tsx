import { PageHeader, SectionWrapper, Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="About"
        subtitle="The Cyber Escalation Atlas is an independent research project that provides structured, policy-grade analysis of significant cyber operations."
      />
      <div className="space-y-6 max-w-3xl">
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Purpose
          </h3>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
            The Atlas serves as an interactive reference for policymakers,
            analysts, educators, and students seeking to understand how cyber
            operations unfold, how they relate to broader geopolitical dynamics,
            and what governance responses have been developed. It bridges the
            gap between technical threat intelligence and policy analysis.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Approach
          </h3>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
            Each case is analyzed through three complementary lenses —
            Escalation, Infrastructure, and Governance — that together provide
            a comprehensive picture of how cyber operations create strategic
            effects. The tool is designed to be a teaching instrument as much
            as a reference, with structured data enabling cross-case comparison
            and pattern identification.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Contact
          </h3>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
            For inquiries about the project, data corrections, or collaboration
            opportunities, please reach out through the project repository.
          </p>
        </Card>
      </div>
    </SectionWrapper>
  );
}
