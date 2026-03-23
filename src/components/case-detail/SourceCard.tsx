import type { SourceRef } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { sourceCategoryLabels } from "@/lib/utils/incidents";

const categoryIcon: Record<string, string> = {
  government: "G",
  vendor: "V",
  academic: "A",
  journalistic: "J",
  legal: "L",
};

interface SourceCardProps {
  source: SourceRef;
}

export function SourceCard({ source }: SourceCardProps) {
  const inner = (
    <div className="flex items-start gap-3 p-3.5 rounded-lg border border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/25 hover:border-teal-300/50 dark:hover:border-teal-600/40 transition-colors">
      {/* Category icon */}
      <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md bg-navy-50 dark:bg-navy-600/40 text-xs font-bold text-navy dark:text-navy-200">
        {categoryIcon[source.category] ?? "?"}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium leading-snug ${
            source.url
              ? "text-teal-700 dark:text-teal-400"
              : "text-navy dark:text-offwhite"
          }`}
        >
          {source.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge variant="default">
            {sourceCategoryLabels[source.category]}
          </Badge>
          {source.date && (
            <span className="text-[11px] font-mono text-slate dark:text-navy-400">
              {source.date}
            </span>
          )}
        </div>
      </div>

      {/* External link indicator */}
      {source.url && (
        <svg
          className="shrink-0 w-3.5 h-3.5 text-navy-300 dark:text-navy-500 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
          />
        </svg>
      )}
    </div>
  );

  if (source.url) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {inner}
      </a>
    );
  }

  return inner;
}
