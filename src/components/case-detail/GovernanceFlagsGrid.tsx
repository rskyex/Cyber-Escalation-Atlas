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
  amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-300/60 dark:border-amber-600/40",
  teal: "bg-teal-50 dark:bg-teal-900/20 border-teal-300/60 dark:border-teal-600/40",
  default: "bg-navy-50 dark:bg-navy-700/40 border-navy-200/60 dark:border-navy-500/40",
  navy: "bg-navy-100 dark:bg-navy-600/40 border-navy-300/60 dark:border-navy-500/40",
};

const activeText: Record<string, string> = {
  amber: "text-amber-700 dark:text-amber-300",
  teal: "text-teal-700 dark:text-teal-300",
  default: "text-navy dark:text-navy-100",
  navy: "text-navy dark:text-navy-100",
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
                : "bg-navy-50/30 dark:bg-navy-800/20 border-navy-200/15 dark:border-navy-700/20 opacity-30"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                active
                  ? `${activeText[variant]} ${variant === "amber" ? "bg-amber-100 dark:bg-amber-900/40" : variant === "teal" ? "bg-teal-100 dark:bg-teal-900/40" : "bg-navy-100 dark:bg-navy-600/50"}`
                  : "bg-navy-100/50 dark:bg-navy-700/30 text-navy-300 dark:text-navy-500"
              }`}
            >
              {flagIcons[flag]}
            </span>
            <span
              className={`text-[10px] font-medium text-center leading-tight ${
                active
                  ? activeText[variant]
                  : "text-navy-300 dark:text-navy-500"
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
