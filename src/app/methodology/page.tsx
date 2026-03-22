import { PageHeader, SectionWrapper, Card } from "@/components/ui";

const sections = [
  {
    title: "Case Selection Criteria",
    content:
      "Cases are selected based on strategic significance, data availability, geographic diversity, and analytical value across all three lenses. Each case must meet a minimum threshold of open-source documentation.",
  },
  {
    title: "Analytical Framework",
    content:
      "Each case is analyzed through three structured lenses — Escalation, Infrastructure, and Governance — using a standardized taxonomy that enables cross-case comparison while respecting the unique context of each incident.",
  },
  {
    title: "ATT&CK Mapping",
    content:
      "Technical analysis follows the MITRE ATT&CK framework for Enterprise. Technique mappings are derived from published threat intelligence reports, government advisories, and peer-reviewed academic sources.",
  },
  {
    title: "Attribution Standards",
    content:
      "Attribution assessments follow a structured confidence scale (Confirmed, High, Moderate, Low, Contested) based on the weight of publicly available evidence, official government attributions, and expert consensus.",
  },
  {
    title: "Source Evaluation",
    content:
      "All sources are evaluated for reliability, bias, and corroboration. The Atlas prioritizes primary sources (government advisories, court documents, vendor reports) supplemented by established academic and journalistic analysis.",
  },
];

export default function MethodologyPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Methodology"
        subtitle="Transparency in analytical methodology is essential for credibility. This page documents the frameworks, criteria, and standards used throughout the Atlas."
      />
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
              {section.title}
            </h3>
            <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
              {section.content}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
