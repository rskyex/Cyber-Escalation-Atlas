import type { Metadata } from "next";
import { PageHeader, SectionWrapper, Card } from "@/components/ui";

interface SourceLink {
  name: string;
  url: string;
}

const sourceCategories: { category: string; sources: SourceLink[] }[] = [
  {
    category: "Government & Institutional",
    sources: [
      { name: "CISA Cybersecurity Advisories", url: "https://www.cisa.gov/news-events/cybersecurity-advisories" },
      { name: "NSA Cybersecurity Advisories & Guidance", url: "https://www.nsa.gov/Press-Room/Cybersecurity-Advisories-Guidance/" },
      { name: "FBI Cyber", url: "https://www.fbi.gov/investigate/cyber" },
      { name: "DOJ National Security Division", url: "https://www.justice.gov/nsd" },
      { name: "UNODA — ICT Security (GGE/OEWG)", url: "https://disarmament.unoda.org/ict-security/" },
      { name: "NATO CCDCOE", url: "https://ccdcoe.org/" },
    ],
  },
  {
    category: "Threat Intelligence Vendors",
    sources: [
      { name: "Mandiant (Google Cloud)", url: "https://www.mandiant.com/" },
      { name: "CrowdStrike", url: "https://www.crowdstrike.com/" },
      { name: "Microsoft Security Blog (MSTIC)", url: "https://www.microsoft.com/en-us/security/blog/" },
      { name: "Recorded Future", url: "https://www.recordedfuture.com/" },
      { name: "Dragos", url: "https://www.dragos.com/" },
      { name: "Symantec / Broadcom", url: "https://www.broadcom.com/" },
    ],
  },
  {
    category: "Academic & Policy Research",
    sources: [
      { name: "Journal of Cybersecurity (Oxford)", url: "https://academic.oup.com/cybersecurity" },
      { name: "Belfer Center, Harvard Kennedy School", url: "https://www.belfercenter.org/" },
      { name: "Carnegie Endowment", url: "https://carnegieendowment.org/" },
      { name: "CSIS Strategic Technologies Program", url: "https://www.csis.org/programs/strategic-technologies-program" },
      { name: "King's College London", url: "https://www.kcl.ac.uk/" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Sources",
  description:
    "The curated corpus of government, vendor, academic, and journalistic sources underpinning the Cyber Escalation Atlas.",
};

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
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-steel-200/40 dark:border-ink-600/40 bg-ink-50/40 dark:bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-ink dark:text-steel-200 hover:border-atlas-400/60 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                >
                  {source.name}
                  <svg width="9" height="9" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3h7v7M13 3L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-xs text-steel-500 dark:text-ink-400 leading-relaxed max-w-2xl">
        Links point to each institution&apos;s official domain. Case-specific
        primary sources — advisories, indictments, vendor reports, and academic
        analyses — are cited on individual case pages, with direct links where a
        stable public URL exists.
      </p>
    </SectionWrapper>
  );
}
