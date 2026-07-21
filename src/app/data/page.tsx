import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { DataDownloads } from "@/components/data/DataDownloads";
import { codebook } from "@/lib/utils/datasetExport";
import { caseCount, dataCutoff } from "@/lib/datasetStats";

export const metadata: Metadata = {
  title: "Data & Downloads",
  description:
    "Export the full Cyber Escalation Atlas dataset as CSV or JSON, with a field-by-field codebook and changelog.",
};

const changelog: { date: string; note: string }[] = [
  {
    date: dataCutoff,
    note: "Landmark cases (NotPetya, SolarWinds, Stuxnet, WannaCry, Viasat KA-SAT) reviewed; verified primary-source URLs and additional academic/journalistic references added; per-record review dates set.",
  },
  {
    date: "2024",
    note: "Dataset expanded with 2024 operations and additional globally-sourced and attribution-focused cases.",
  },
  {
    date: "2023",
    note: "Initial corpus assembled: 20 seed cases across escalation, infrastructure, and governance lenses.",
  },
];

export default function DataPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Data & Downloads"
        subtitle="The Atlas dataset is open. Export it, inspect the field definitions, and reproduce every derived score yourself."
      />

      <div className="max-w-3xl space-y-10">
        <section>
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="text-sm text-steel-500 dark:text-steel-300">
              <strong className="text-ink dark:text-white">{caseCount}</strong> documented cases
            </span>
            <span className="text-sm text-steel-500 dark:text-steel-300">
              Data cutoff <strong className="text-ink dark:text-white font-mono">{dataCutoff}</strong>
            </span>
            <span className="text-sm text-steel-500 dark:text-steel-300">
              License{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-atlas-600 dark:text-atlas-400 hover:underline"
              >
                CC BY 4.0
              </a>
            </span>
          </div>
          <DataDownloads />
          <p className="text-xs text-steel-500 dark:text-ink-400 mt-3">
            CSV is a flat, one-row-per-case export (good for spreadsheets). JSON
            preserves the full nested record structure. Both are generated from
            the same source data that powers the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-3">Codebook</h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-4">
            Field definitions for the CSV export. Derived scores (unpeace,
            entanglement) are documented in{" "}
            <a href="/methodology#scoring" className="text-atlas-600 dark:text-atlas-400 hover:underline">
              methodology §06
            </a>{" "}
            and can be recomputed from the other columns.
          </p>
          <div className="overflow-x-auto rounded-xl border border-steel-200/30 dark:border-ink-600/40">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink-50/50 dark:bg-ink-800/30">
                  <th className="text-left p-3 text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider">Field</th>
                  <th className="text-left p-3 text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {codebook.map((c) => (
                  <tr key={c.key} className="border-t border-steel-200/15 dark:border-ink-600/20">
                    <td className="p-3 font-mono text-xs text-atlas-700 dark:text-atlas-400 whitespace-nowrap align-top">{c.key}</td>
                    <td className="p-3 text-xs text-steel-500 dark:text-steel-300">{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-3">Changelog</h2>
          <ol className="relative border-l border-steel-200/40 dark:border-ink-600/40 ml-2">
            {changelog.map((c, i) => (
              <li key={i} className="ml-4 mb-4">
                <span className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full bg-atlas-400 dark:bg-atlas-500" />
                <p className="text-xs font-mono text-steel-500 dark:text-ink-400">{c.date}</p>
                <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">{c.note}</p>
              </li>
            ))}
          </ol>
          <p className="text-xs text-steel-500 dark:text-ink-400 mt-2">
            Candidate cases under consideration are tracked in{" "}
            <span className="font-mono">docs/dataset-todo.md</span> and are not
            added until fully sourced.
          </p>
        </section>
      </div>
    </SectionWrapper>
  );
}
