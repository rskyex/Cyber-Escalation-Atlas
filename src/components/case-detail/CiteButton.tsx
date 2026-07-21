"use client";

import { useState } from "react";
import type { Incident } from "@/lib/types/incidents";
import { caseBibtex, caseApa, caseChicago } from "@/lib/utils/cite";

type Format = "bibtex" | "apa" | "chicago";

/** Today's date as "Month D, YYYY" for the "accessed" field. */
function accessedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CiteButton({ incident }: { incident: Incident }) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<Format>("bibtex");
  const [copied, setCopied] = useState(false);

  const accessed = accessedDate();
  const text =
    format === "bibtex"
      ? caseBibtex(incident, accessed)
      : format === "apa"
        ? caseApa(incident, accessed)
        : caseChicago(incident, accessed);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-steel-200/40 dark:border-ink-600/50 text-ink dark:text-steel-200 hover:border-atlas-400/60 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
        aria-expanded={open}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 5h8m-8 5h5M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
        Cite this case
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-[min(92vw,32rem)] rounded-xl border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-800 shadow-xl p-4">
          <div className="flex items-center gap-1 mb-3">
            {(["bibtex", "apa", "chicago"] as Format[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-2.5 py-1 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
                  format === f
                    ? "bg-atlas-500 text-white"
                    : "text-steel-500 dark:text-steel-400 hover:bg-ink-50 dark:hover:bg-ink-700/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <pre className="text-[11px] font-mono text-ink dark:text-steel-200 bg-ink-50/60 dark:bg-ink-900/40 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-words">
            {text}
          </pre>
          <div className="flex justify-end mt-3">
            <button
              onClick={copy}
              className="px-3 py-1.5 rounded-md text-xs font-medium bg-atlas-500 hover:bg-atlas-600 text-white transition-colors"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
