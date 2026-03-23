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
        <p className="text-base text-slate dark:text-navy-200 leading-relaxed">
          {incident.summary}
        </p>
      </div>

      <div className="p-5 rounded-lg border-l-4 border-teal-500 bg-teal-50/50 dark:bg-teal-900/10 dark:border-teal-400">
        <h3 className="text-sm font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
          Why This Matters
        </h3>
        <p className="text-base text-navy dark:text-offwhite leading-relaxed">
          {incident.whyThisMatters}
        </p>
      </div>
    </section>
  );
}
