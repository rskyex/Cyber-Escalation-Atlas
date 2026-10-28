"use client";

import { seedIncidents } from "@/data/incidents";
import {
  buildVersionedCsv,
  buildVersionedJson,
  type DatasetMeta,
} from "@/lib/utils/datasetExport";
import { DATASET_VERSION, DATASET_LAST_UPDATED } from "@/lib/datasetStats";
import { SITE_URL } from "@/lib/utils/cite";

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const meta: DatasetMeta = {
  dataset: "Cyber Escalation Atlas: documented cases",
  version: DATASET_VERSION,
  lastUpdated: DATASET_LAST_UPDATED,
  recordCount: seedIncidents.length,
  license: "CC BY 4.0",
  source: `${SITE_URL}/data`,
};

const base = `cyber-escalation-atlas-v${DATASET_VERSION}`;

export function DataDownloads() {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => download(`${base}.csv`, buildVersionedCsv(seedIncidents, meta), "text/csv")}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-atlas-500 hover:bg-atlas-600 text-white text-sm font-medium transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M4 21h16" />
        </svg>
        Download CSV
      </button>
      <button
        onClick={() => download(`${base}.json`, buildVersionedJson(seedIncidents, meta), "application/json")}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-atlas-400/50 dark:border-atlas-600/40 text-atlas-700 dark:text-atlas-400 hover:bg-atlas-50/50 dark:hover:bg-atlas-900/20 text-sm font-medium transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M4 21h16" />
        </svg>
        Download JSON
      </button>
    </div>
  );
}
