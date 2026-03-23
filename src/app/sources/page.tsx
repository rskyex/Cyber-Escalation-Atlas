import { PageHeader, SectionWrapper, Card, Badge } from "@/components/ui";

const sourceCategories = [
  {
    category: "Government & Institutional",
    sources: [
      "CISA Advisories",
      "NSA/CSS Technical Reports",
      "FBI Flash Alerts",
      "DOJ Indictments",
      "UN GGE/OEWG Reports",
      "NATO CCDCOE Publications",
    ],
  },
  {
    category: "Threat Intelligence Vendors",
    sources: [
      "Mandiant/Google TAG",
      "CrowdStrike",
      "Microsoft MSTIC",
      "Recorded Future",
      "Dragos",
      "Symantec/Broadcom",
    ],
  },
  {
    category: "Academic & Policy Research",
    sources: [
      "Journal of Cybersecurity (Oxford)",
      "Belfer Center, Harvard Kennedy School",
      "Carnegie Endowment Cyber Policy Initiative",
      "CSIS Strategic Technologies Program",
      "King's College London Cyber Security Research Group",
    ],
  },
];

export default function SourcesPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Sources"
        subtitle="The Atlas draws from a curated corpus of primary and secondary sources across government, industry, and academia. All sources are evaluated for reliability and relevance."
      />
      <div className="space-y-6">
        {sourceCategories.map((cat) => (
          <Card key={cat.category}>
            <h3 className="font-semibold text-ink dark:text-white mb-3">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.sources.map((source) => (
                <Badge key={source} variant="default">
                  {source}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
