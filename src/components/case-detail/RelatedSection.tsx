import type { Incident } from "@/lib/types/incidents";
import { SectionHeading } from "./SectionHeading";
import { RelatedCaseCard } from "./RelatedCaseCard";

interface RelatedSectionProps {
  related: Incident[];
}

export function RelatedSection({ related }: RelatedSectionProps) {
  if (related.length === 0) return null;

  return (
    <section>
      <SectionHeading id="related">Related Cases</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((inc) => (
          <RelatedCaseCard key={inc.id} incident={inc} />
        ))}
      </div>
    </section>
  );
}
