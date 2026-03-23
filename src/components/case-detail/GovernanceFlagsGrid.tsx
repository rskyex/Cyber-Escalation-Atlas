import type { GovernanceFlag } from "@/lib/types/incidents";
import {
  governanceFlagLabels,
  governanceFlagBadge,
} from "@/lib/utils/incidents";

const allFlags: GovernanceFlag[] = [
  "norm-violation",
  "attribution-public",
  "sanctions-imposed",
  "indictment",
  "un-discussion",
  "regulatory-change",
  "international-cooperation",
  "deterrence-signal",
];

const flagIcons: Record<GovernanceFlag, string> = {
  "norm-violation": "!",
  "attribution-public": "A",
  "sanctions-imposed": "S",
  indictment: "I",
  "un-discussion": "U",
  "regulatory-change": "R",
  "international-cooperation": "C",
  "deterrence-signal": "D",
};

interface GovernanceFlagsGridProps {
  activeFlags: GovernanceFlag[];
}

const activeBg: Record<string, string> = {
  amber: "bg-signal-50 dark:bg-signal-900/20 border-signal-300/60 dark:border-signal-600/40",
  teal: "bg-atlas-50 dark:bg-atlas-900/20 border-atlas-300/60 dark:border-atlas-600/40",
  default: "bg-ink-50 dark:bg-ink-700/40 border-steel-200/60 dark:border-ink-500/40",
  navy: "bg-ink-100 dark:bg-ink-600/40 border-steel-400/60 dark:border-ink-500/40",
};

const activeText: Record<string, string> = {
  amber: "text-signal-700 dark:text-signal-300",
  teal: "text-atlas-700 dark:text-atlas-300",
  default: "text-ink dark:text-ink-100",
  navy: "text-ink dark:text-ink-100",
};

export function GovernanceFlagsGrid({ activeFlags }: GovernanceFlagsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {allFlags.map((flag) => {
        const active = activeFlags.includes(flag);
        const variant = governanceFlagBadge[flag];

        return (
          <div
            key={flag}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-opacity ${
              active
                ? activeBg[variant]
                : "bg-ink-50/30 dark:bg-ink-800/20 border-steel-200/15 dark:border-ink-700/20 opacity-30"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                active
                  ? `${activeText[variant]} ${variant === "amber" ? "bg-signal-100 dark:bg-signal-900/40" : variant === "teal" ? "bg-atlas-100 dark:bg-atlas-900/40" : "bg-ink-100 dark:bg-ink-600/50"}`
                  : "bg-ink-100/50 dark:bg-ink-700/30 text-steel-400 dark:text-ink-500"
              }`}
            >
              {flagIcons[flag]}
            </span>
            <span
              className={`text-[10px] font-medium text-center leading-tight ${
                active
                  ? activeText[variant]
                  : "text-steel-400 dark:text-ink-500"
              }`}
            >
              {governanceFlagLabels[flag]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
