import type { Incident } from "@/lib/types/incidents";
import { SectionHeading } from "./SectionHeading";

interface SummarySectionProps {
  incident: Incident;
}

export function SummarySection({ incident }: SummarySectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <SectionHeading id="summary">Executive Summary</SectionHeading>
        <p className="text-base text-steel-500 dark:text-steel-200 leading-relaxed">
          {incident.summary}
        </p>
      </div>

      <div className="p-5 rounded-lg border-l-4 border-atlas-500 bg-atlas-50/50 dark:bg-atlas-900/10 dark:border-atlas-400">
        <h3 className="text-sm font-semibold text-atlas-700 dark:text-atlas-300 uppercase tracking-wider mb-2">
          Why This Matters
        </h3>
        <p className="text-base text-ink dark:text-white leading-relaxed">
          {incident.whyThisMatters}
        </p>
      </div>
    </section>
  );
}
