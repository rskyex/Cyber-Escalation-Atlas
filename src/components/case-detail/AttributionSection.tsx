import type { Incident } from "@/lib/types/incidents";
import { SectionHeading } from "./SectionHeading";
import { AttributionTable } from "./AttributionTable";

interface AttributionSectionProps {
  incident: Incident;
}

export function AttributionSection({ incident }: AttributionSectionProps) {
  return (
    <section>
      <SectionHeading id="attribution">Attribution Assessment</SectionHeading>
      <AttributionTable incident={incident} />
    </section>
  );
}
