import type { Incident } from "@/lib/types/incidents";
import { SectionHeading } from "./SectionHeading";
import { SourceCard } from "./SourceCard";

interface SourcesSectionProps {
  incident: Incident;
}

export function SourcesSection({ incident }: SourcesSectionProps) {
  return (
    <section>
      <SectionHeading id="sources">Sources</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {incident.sources.map((src, i) => (
          <SourceCard key={i} source={src} />
        ))}
      </div>

      <p className="text-xs text-steel-500 dark:text-ink-400 mt-3 italic">
        Sources listed reflect publicly available materials used to construct
        this case entry. Inclusion does not imply endorsement. Where no URL is
        provided, the source may be found via its title and date.
      </p>
    </section>
  );
}
