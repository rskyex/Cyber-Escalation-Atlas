import type { Incident } from "@/lib/types/incidents";
import { incidentTypeLabels } from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

interface CoerciveSectionProps {
  incident: Incident;
}

const coerciveDescriptions: Record<string, string> = {
  espionage:
    "Intelligence collection, coercive value lies in the information advantage gained and the implicit signal that the adversary can access sensitive systems.",
  destructive:
    "Destruction of data or systems, coercive value through denial, punishment, or deterrence signaling.",
  ransomware:
    "Denial of access through encryption, coercive value through economic extortion and operational disruption.",
  influence:
    "Manipulation of information or perception, coercive value through shaping public discourse, sowing confusion, or undermining institutional trust.",
  sabotage:
    "Physical or functional disruption of systems, coercive value through demonstrating capability to cause real-world harm.",
  hybrid:
    "Combination of multiple coercive functions, blends intelligence, disruption, and economic pressure.",
};

export function CoerciveSection({ incident }: CoerciveSectionProps) {
  return (
    <section>
      <SectionHeading id="coercive">Coercive Function</SectionHeading>
      <div className="p-5 rounded-lg bg-white dark:bg-ink-700/30 border border-steel-200/20 dark:border-ink-600/30">
        <p className="text-sm font-semibold text-ink dark:text-white mb-1">
          {incidentTypeLabels[incident.incidentType]}
        </p>
        <p className="text-sm text-steel-500 dark:text-steel-200 leading-relaxed">
          {coerciveDescriptions[incident.incidentType]}
        </p>
        {incident.escalation.thresholdCrossings.length > 0 && (
          <div className="mt-3 pt-3 border-t border-steel-200/20 dark:border-ink-600/30">
            <p className="text-xs font-medium text-steel-500 dark:text-steel-300 uppercase tracking-wider mb-1.5">
              Observed coercive effects
            </p>
            <ul className="space-y-1">
              {incident.escalation.thresholdCrossings.map((t, i) => (
                <li
                  key={i}
                  className="text-sm text-steel-500 dark:text-steel-200 flex gap-2"
                >
                  <span className="text-signal-500 shrink-0">&bull;</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
