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
        <div className="p-4 rounded-lg bg-teal-50/50 dark:bg-teal-900/10 border border-teal-200/30 dark:border-teal-700/30">
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-1">
            Key Question
          </p>
          <p className="text-base text-navy dark:text-offwhite font-medium">
            {keyQuestion}
          </p>
        </div>

        {/* Discussion points */}
        <div>
          <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
            Discussion Points
          </p>
          <ul className="space-y-1.5">
            {discussionPoints.map((d, i) => (
              <li
                key={i}
                className="text-sm text-slate dark:text-navy-200 flex gap-2"
              >
                <span className="text-navy-300 shrink-0">
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
            <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
              Further Reading
            </p>
            <ul className="space-y-1">
              {furtherReading.map((r, i) => (
                <li
                  key={i}
                  className="text-sm text-slate dark:text-navy-200"
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
