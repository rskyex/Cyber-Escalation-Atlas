import { PageHeader, SectionWrapper, Card, Badge } from "@/components/ui";

const governanceAreas = [
  {
    title: "International Norms & Frameworks",
    description:
      "How existing and emerging international cyber norms (UN GGE, OEWG, Tallinn Manual) apply to documented cases. Tracks norm adherence, violations, and evolution.",
    tags: ["UN GGE", "OEWG", "Tallinn Manual"],
  },
  {
    title: "Attribution & Accountability",
    description:
      "State attribution practices, public attribution statements, indictments, sanctions, and other accountability mechanisms deployed in response to operations.",
    tags: ["Public Attribution", "Indictments", "Sanctions"],
  },
  {
    title: "Regulatory Responses",
    description:
      "Domestic and international regulatory changes triggered or accelerated by major cyber incidents — from CISA directives to EU NIS2.",
    tags: ["CISA", "NIS2", "Executive Orders"],
  },
  {
    title: "Deterrence & Signaling",
    description:
      "How states use cyber operations, public statements, and policy signals to deter adversaries and establish red lines in cyberspace.",
    tags: ["Deterrence", "Red Lines", "Signaling"],
  },
];

export default function GovernanceLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Governance Lens"
        subtitle="The governance dimension is central to the Atlas. This lens evaluates policy responses, international norms, regulatory frameworks, and accountability mechanisms shaped by major cyber incidents."
        accent
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {governanceAreas.map((area) => (
          <Card key={area.title} hover>
            <h3 className="font-semibold text-teal-600 dark:text-teal-300 mb-2">
              {area.title}
            </h3>
            <p className="text-sm text-slate dark:text-navy-200 leading-relaxed mb-4">
              {area.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {area.tags.map((tag) => (
                <Badge key={tag} variant="teal">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 p-6 rounded-lg border border-teal/30 dark:border-teal/20 bg-teal-50/50 dark:bg-teal-900/10">
        <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
          The Governance Lens is designed to be the most policy-relevant
          analytical layer of the Atlas. When fully populated, each case will
          include structured governance metadata covering norm applicability,
          attribution confidence, policy responses, and long-term regulatory
          impact.
        </p>
      </div>
    </SectionWrapper>
  );
}
