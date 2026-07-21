"use client";

import { ReactNode } from "react";
import { ProvenanceMark, type ProvenanceKind } from "./StatProvenance";

interface PanelProps {
  children: ReactNode;
  className?: string;
  label?: string;
  strong?: boolean;
  ticks?: boolean;
  status?: string;
  statusTone?: "atlas" | "amber" | "plasma" | "violet";
}

export function Panel({
  children,
  className = "",
  label,
  strong,
  ticks,
  status,
  statusTone = "atlas",
}: PanelProps) {
  const dotClass =
    statusTone === "amber"
      ? "status-dot status-dot-amber"
      : statusTone === "plasma"
        ? "status-dot status-dot-plasma"
        : statusTone === "violet"
          ? "status-dot status-dot-amber"
          : "status-dot";

  return (
    <div
      className={`relative rounded-lg ${strong ? "obs-panel-strong" : "obs-panel"} ${ticks ? "corner-ticks" : ""} ${className}`}
    >
      {label && (
        <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-3">
          <span className="tag-mono text-atlas-400/90">{label}</span>
          {status && (
            <span className="flex items-center gap-2 tag-mono">
              <span className={dotClass} />
              {status}
            </span>
          )}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

export function PanelGrid({
  children,
  cols = 2,
  className = "",
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const colsClass =
    cols === 1
      ? "grid-cols-1"
      : cols === 2
        ? "grid-cols-1 lg:grid-cols-2"
        : cols === 3
          ? "grid-cols-1 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return <div className={`grid ${colsClass} gap-5 ${className}`}>{children}</div>;
}

export function MetricBlock({
  label,
  value,
  unit,
  tone = "atlas",
  hint,
  provenance,
  source,
  sourceUrl,
}: {
  label: string;
  value: string | number;
  unit?: string;
  tone?: "atlas" | "amber" | "plasma" | "violet" | "steel";
  hint?: string;
  /** Epistemic status of the value; renders an inline provenance marker. */
  provenance?: ProvenanceKind;
  source?: string;
  sourceUrl?: string;
}) {
  const toneClass =
    tone === "atlas"
      ? "text-atlas-400"
      : tone === "amber"
        ? "text-amber-400"
        : tone === "plasma"
          ? "text-plasma-400"
          : tone === "violet"
            ? "text-violet-300"
            : "text-steel-300";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="tag-mono">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <span className={`font-display text-heading ${toneClass}`}>{value}</span>
        {unit && <span className="text-caption text-steel-500">{unit}</span>}
        {provenance && (
          <ProvenanceMark
            kind={provenance}
            source={source}
            sourceUrl={sourceUrl}
          />
        )}
      </span>
      {hint && <span className="text-caption text-steel-500 leading-snug">{hint}</span>}
    </div>
  );
}
