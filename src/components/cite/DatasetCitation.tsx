"use client";

import { useState } from "react";
import {
  datasetBibtex,
  datasetApa,
  datasetChicago,
} from "@/lib/utils/cite";

type Format = "bibtex" | "apa" | "chicago";

function accessedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DatasetCitation() {
  const [format, setFormat] = useState<Format>("apa");
  const [copied, setCopied] = useState(false);
  const accessed = accessedDate();

  const text =
    format === "bibtex"
      ? datasetBibtex(accessed)
      : format === "apa"
        ? datasetApa(accessed)
        : datasetChicago(accessed);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-xl border border-steel-200/30 dark:border-ink-600/40 bg-white dark:bg-ink-700/20 p-5">
      <div className="flex items-center gap-1 mb-3">
        {(["apa", "chicago", "bibtex"] as Format[]).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-3 py-1 rounded text-xs font-medium uppercase tracking-wider transition-colors ${
              format === f
                ? "bg-atlas-500 text-white"
                : "text-steel-500 dark:text-steel-400 hover:bg-ink-50 dark:hover:bg-ink-700/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <pre className="text-xs font-mono text-ink dark:text-steel-200 bg-ink-50/60 dark:bg-ink-900/40 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-words">
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
  );
}
