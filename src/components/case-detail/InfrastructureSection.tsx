import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

interface InfrastructureSectionProps {
  incident: Incident;
}

export function InfrastructureSection({ incident }: InfrastructureSectionProps) {
  const { malwareFamilies, impactSummary, techniques } =
    incident.infrastructure;

  return (
    <section>
      <SectionHeading id="infrastructure">
        Infrastructure Meaning
      </SectionHeading>

      <div className="space-y-4">
        {/* Malware families */}
        {malwareFamilies.length > 0 && (
          <div className="p-4 rounded-lg bg-white dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30">
            <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-2">
              Malware / tooling
            </p>
            <div className="flex flex-wrap gap-1.5">
              {malwareFamilies.map((m) => (
                <Badge key={m} variant="amber" mono>
                  {m}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Technique summary (brief — full ATT&CK mapping is separate) */}
        <div className="p-4 rounded-lg bg-white dark:bg-navy-700/30 border border-navy-200/20 dark:border-navy-600/30">
          <p className="text-xs font-medium text-slate dark:text-navy-300 uppercase tracking-wider mb-2">
            Capability profile
          </p>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed mb-3">
            {impactSummary}
          </p>
          <p className="text-xs text-slate dark:text-navy-300">
            {techniques.length} ATT&CK techniques mapped &mdash; see{" "}
            <a href="#attack" className="text-teal-600 dark:text-teal-400 hover:underline">
              ATT&CK mapping
            </a>{" "}
            below.
          </p>
        </div>
      </div>
    </section>
  );
}
