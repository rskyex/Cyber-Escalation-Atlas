"use client";

import { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Provenance markers for displayed statistics.
//
// The Observatory presents many precise-looking numbers (latencies,
// confidence percentages, order-of-magnitude ratios). Most are *model
// parameters* chosen to illustrate a dynamic — not empirical measurements.
// The site's methodology explicitly commits to avoiding false precision, so
// every such figure carries a machine-honest provenance marker: readers can
// tell at a glance whether a number is measured, illustrative, or structural.
// ---------------------------------------------------------------------------

export type ProvenanceKind = "illustrative" | "structural" | "sourced";

const COPY: Record<ProvenanceKind, string> = {
  illustrative:
    "Illustrative — a model parameter chosen to explore the dynamic, not an empirical measurement.",
  structural:
    "Structural — a count of elements defined in this model, not an empirical measurement.",
  sourced: "Sourced figure — see citation.",
};

const GLYPH: Record<ProvenanceKind, string> = {
  illustrative: "≈",
  structural: "▣",
  sourced: "§",
};

/**
 * A small superscript marker rendered next to a statistic. Uses a native
 * `title` tooltip plus an accessible label, so it needs no JS tooltip library
 * and remains keyboard/screen-reader legible.
 */
export function ProvenanceMark({
  kind,
  source,
  sourceUrl,
}: {
  kind: ProvenanceKind;
  source?: string;
  sourceUrl?: string;
}) {
  const text =
    kind === "sourced" && source ? `Source: ${source}` : COPY[kind];

  const toneClass =
    kind === "sourced"
      ? "text-atlas-400 border-atlas-400/40 hover:bg-atlas-400/10"
      : "text-amber-400/80 border-amber-400/30 hover:bg-amber-400/10";

  const inner = (
    <sup
      title={text}
      aria-label={text}
      tabIndex={0}
      className={`ml-0.5 inline-flex h-3.5 w-3.5 -translate-y-1 items-center justify-center rounded-full border text-[8px] font-mono leading-none cursor-help focus:outline-none focus-visible:ring-1 focus-visible:ring-atlas-400 ${toneClass}`}
    >
      {GLYPH[kind]}
    </sup>
  );

  if (kind === "sourced" && sourceUrl) {
    return (
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

/**
 * Wraps a numeric value with an inline provenance marker. Use this in place of
 * a bare `{value}` render wherever a precise-looking statistic is shown.
 */
export function StatWithProvenance({
  value,
  unit,
  kind = "illustrative",
  source,
  sourceUrl,
  className = "",
}: {
  value: ReactNode;
  unit?: string;
  kind?: ProvenanceKind;
  source?: string;
  sourceUrl?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{value}</span>
      {unit && <span className="ml-1 text-caption text-steel-500">{unit}</span>}
      <ProvenanceMark kind={kind} source={source} sourceUrl={sourceUrl} />
    </span>
  );
}

/**
 * A page/section-level banner explaining the provenance convention. Rendered
 * near the top of each Observatory layer that carries illustrative figures.
 */
export function ProvenanceNote({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border border-amber-400/20 bg-amber-400/[0.04] px-4 py-3 ${className}`}
    >
      <span className="mt-0.5 status-dot status-dot-amber shrink-0" />
      <p className="text-caption text-steel-300/90 leading-relaxed">
        {children ?? (
          <>
            <span className="font-medium text-amber-300/90">
              Figures on this layer are illustrative.
            </span>{" "}
            Latencies, percentages and ratios are model parameters chosen to
            explore escalation dynamics — not empirical measurements. Markers
            (<span className="font-mono text-amber-400/80">≈</span> illustrative,{" "}
            <span className="font-mono text-amber-400/80">▣</span> structural,{" "}
            <span className="font-mono text-atlas-400">§</span> sourced) denote
            each figure&apos;s epistemic status. See{" "}
            <a
              href="/methodology"
              className="text-atlas-400 underline underline-offset-2 hover:text-atlas-300"
            >
              methodology
            </a>{" "}
            for how the model is parameterised.
          </>
        )}
      </p>
    </div>
  );
}
