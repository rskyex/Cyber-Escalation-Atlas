"use client";

import type { Incident } from "@/lib/types/incidents";
import { Collapsible } from "./Collapsible";

interface TeachingSectionProps {
  incident: Incident;
}

export function TeachingSection({ incident }: TeachingSectionProps) {
  const { keyQuestion, discussionPoints, furtherReading } = incident.teaching;

  return (
    <Collapsible title="Teaching Mode">
      <div className="space-y-5">
        {/* Key question */}
        <div className="p-4 rounded-lg bg-atlas-50/50 dark:bg-atlas-900/10 border border-atlas-200/30 dark:border-atlas-700/30">
          <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-300 uppercase tracking-wider mb-1">
            Key Question
          </p>
          <p className="text-base text-ink dark:text-white font-medium">
            {keyQuestion}
          </p>
        </div>

        {/* Discussion points */}
        <div>
          <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
            Discussion Points
          </p>
          <ul className="space-y-1.5">
            {discussionPoints.map((d, i) => (
              <li
                key={i}
                className="text-sm text-steel-500 dark:text-steel-200 flex gap-2"
              >
                <span className="text-steel-400 shrink-0">
                  {i + 1}.
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Further reading */}
        {furtherReading.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
              Further Reading
            </p>
            <ul className="space-y-1">
              {furtherReading.map((r, i) => (
                <li
                  key={i}
                  className="text-sm text-steel-500 dark:text-steel-200"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Collapsible>
  );
}
