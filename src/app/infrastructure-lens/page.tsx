import { PageHeader, SectionWrapper, Card, Badge } from "@/components/ui";

export default function InfrastructureLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Infrastructure Lens"
        subtitle="Examine the technical infrastructure targeted and exploited across documented cyber campaigns — from initial compromise vectors to command-and-control architectures."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Target Sectors
          </h3>
          <p className="text-sm text-slate dark:text-navy-200">
            Distribution of targeted critical infrastructure sectors across all
            documented cases.
          </p>
          <div className="mt-4 h-36 rounded-md border border-dashed border-navy-200/30 dark:border-navy-600/30 flex items-center justify-center text-sm text-slate/50 dark:text-navy-400">
            Sector chart placeholder
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            ATT&CK Coverage
          </h3>
          <p className="text-sm text-slate dark:text-navy-200">
            MITRE ATT&CK technique coverage across the case study corpus.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge mono variant="teal">T1566</Badge>
            <Badge mono variant="teal">T1190</Badge>
            <Badge mono variant="teal">T1059</Badge>
            <Badge mono variant="default">+ more</Badge>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Geographic Reach
          </h3>
          <p className="text-sm text-slate dark:text-navy-200">
            Map visualization of operation origins and target geographies.
          </p>
          <div className="mt-4 h-36 rounded-md border border-dashed border-navy-200/30 dark:border-navy-600/30 flex items-center justify-center text-sm text-slate/50 dark:text-navy-400">
            Map placeholder
          </div>
        </Card>
      </div>
    </SectionWrapper>
  );
}
