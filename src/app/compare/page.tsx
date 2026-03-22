import { PageHeader, SectionWrapper, Card } from "@/components/ui";

export default function ComparePage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Compare"
        subtitle="Side-by-side comparison of cases across escalation, infrastructure, and governance dimensions. Select two or more cases to analyze commonalities and divergences."
      />
      <Card>
        <div className="text-center py-12">
          <p className="text-slate dark:text-navy-200 mb-2">
            The comparison tool will allow multi-case analysis across all three
            lenses.
          </p>
          <p className="text-sm text-slate/60 dark:text-navy-300">
            Select cases to compare once the dataset is populated.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="w-48 h-64 rounded-lg border-2 border-dashed border-navy-200/30 dark:border-navy-600/30 flex items-center justify-center text-sm text-slate/40 dark:text-navy-400">
              Case A
            </div>
            <div className="w-48 h-64 rounded-lg border-2 border-dashed border-navy-200/30 dark:border-navy-600/30 flex items-center justify-center text-sm text-slate/40 dark:text-navy-400">
              Case B
            </div>
          </div>
        </div>
      </Card>
    </SectionWrapper>
  );
}
