import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { sourceCategoryLabels } from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

interface SourcesSectionProps {
  incident: Incident;
}

export function SourcesSection({ incident }: SourcesSectionProps) {
  return (
    <section>
      <SectionHeading id="sources">Sources</SectionHeading>

      <div className="rounded-lg border border-navy-200/30 dark:border-navy-600/40 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-50 dark:bg-navy-700/50">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate dark:text-navy-300 uppercase tracking-wider">
                Source
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate dark:text-navy-300 uppercase tracking-wider w-28">
                Category
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate dark:text-navy-300 uppercase tracking-wider w-28 hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-200/20 dark:divide-navy-600/30">
            {incident.sources.map((src, i) => (
              <tr key={i} className="bg-white dark:bg-navy-700/20">
                <td className="px-4 py-3 text-navy dark:text-offwhite">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {src.title}
                    </a>
                  ) : (
                    src.title
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="default">
                    {sourceCategoryLabels[src.category]}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate dark:text-navy-300 text-xs font-mono hidden sm:table-cell">
                  {src.date ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate dark:text-navy-400 mt-3 italic">
        Sources listed reflect publicly available materials used to construct
        this case entry. Inclusion does not imply endorsement. Where no URL is
        provided, the source may be found via its title and date.
      </p>
    </section>
  );
}
