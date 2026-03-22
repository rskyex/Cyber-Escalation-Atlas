import { PageHeader, SectionWrapper, Card, Badge, FilterShell } from "@/components/ui";

const placeholderCases = [
  { name: "NotPetya (2017)", region: "Global", type: "Destructive" },
  { name: "SolarWinds (2020)", region: "United States", type: "Espionage" },
  { name: "Colonial Pipeline (2021)", region: "United States", type: "Ransomware" },
];

export default function CasesPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Cases"
        subtitle="Structured case studies of significant cyber operations, analyzed across escalation, infrastructure, and governance dimensions."
      />
      <FilterShell
        filters={
          <div className="space-y-3">
            <p className="text-sm text-slate dark:text-navy-200">
              Filters will be available when the full dataset is loaded.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-slate/60 dark:text-navy-300">Region</p>
              <p className="text-xs text-slate/60 dark:text-navy-300">Year</p>
              <p className="text-xs text-slate/60 dark:text-navy-300">Operation Type</p>
              <p className="text-xs text-slate/60 dark:text-navy-300">Attribution Confidence</p>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {placeholderCases.map((c) => (
            <Card key={c.name} hover>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-navy dark:text-offwhite">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate dark:text-navy-200 mt-1">
                    {c.region}
                  </p>
                </div>
                <Badge variant="amber">{c.type}</Badge>
              </div>
            </Card>
          ))}
          <p className="text-sm text-slate dark:text-navy-300 text-center py-8">
            Full dataset of 20 cases will be populated in subsequent updates.
          </p>
        </div>
      </FilterShell>
    </SectionWrapper>
  );
}
