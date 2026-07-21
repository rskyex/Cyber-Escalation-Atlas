import type { Metadata } from "next";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { DatasetCitation } from "@/components/cite/DatasetCitation";

export const metadata: Metadata = {
  title: "How to Cite",
  description:
    "Recommended citation formats (APA, Chicago, BibTeX) for the Cyber Escalation Atlas and its individual case studies.",
};

export default function CitePage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="How to Cite"
        subtitle="If you use the Cyber Escalation Atlas in research or teaching, please cite it. Recommended formats for the whole atlas and for individual cases are below."
      />

      <div className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-3">
            Citing the whole atlas
          </h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-4">
            Use this when referencing the platform, its methodology, or the
            dataset as a whole. Pick your preferred style; the access date is
            filled in automatically.
          </p>
          <DatasetCitation />
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-3">
            Citing an individual case
          </h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-3">
            Every case page carries a{" "}
            <span className="font-medium text-ink dark:text-white">Cite this case</span>{" "}
            button (top right) that generates APA, Chicago, and BibTeX with the
            correct year, URL, and access date for that specific operation. For
            example, a BibTeX entry looks like:
          </p>
          <pre className="text-xs font-mono text-ink dark:text-steel-200 bg-ink-50/60 dark:bg-ink-900/40 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-words border border-steel-200/30 dark:border-ink-600/40">
{`@misc{cea-notpetya,
  author       = {Koyanagi, Risa},
  title        = {NotPetya --- Cyber Escalation Atlas Case Study},
  howpublished = {Cyber Escalation Atlas},
  year         = {2017},
  url          = {https://cyber-escalation-atlas.vercel.app/cases/notpetya},
  note         = {Accessed: ...}
}`}
          </pre>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink dark:text-white mb-3">
            Citing primary sources
          </h2>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
            The Atlas is a secondary, interpretive resource. For claims of fact
            about a specific operation, cite the primary sources listed on each
            case page (government advisories, indictments, vendor reports, and
            academic or journalistic analyses) rather than the Atlas alone. The
            Atlas is best cited for its structured comparison and analytical
            framing, not as the origin of factual claims.
          </p>
        </section>
      </div>
    </SectionWrapper>
  );
}
