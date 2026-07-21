"use client";

import { useState, useCallback, useEffect } from "react";
import type { Incident, GovernanceFlag } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { UnpeaceAxis } from "@/components/case-detail/UnpeaceAxis";
import { EscalationRadar } from "@/components/case-detail/EscalationRadar";
import { GovernanceFlagsGrid } from "@/components/case-detail/GovernanceFlagsGrid";
import { ComparativeRadar } from "./ComparativeRadar";
import {
  unpeaceScore,
  entanglementScore,
  tierIndex,
  incidentTypeLabels,
  incidentTypeBadge,
  escalationTierLabels,
  escalationTierBadge,
  attributionLabels,
  attributionBadge,
  targetSectorLabels,
  governanceFlagLabels,
} from "@/lib/utils/incidents";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_SELECTIONS = 3;

// ---------------------------------------------------------------------------
// Similarity / difference detection
// ---------------------------------------------------------------------------

type Verdict = "same" | "different" | "partial";

/** All values identical */
function allSame(values: string[]): boolean {
  return values.length > 0 && values.every((v) => v === values[0]);
}

/** Check array overlap: same if identical sets, partial if any overlap, different if none */
function setOverlap(arrays: string[][]): Verdict {
  if (arrays.length < 2) return "same";
  const sets = arrays.map((a) => new Set(a));
  // Check if all sets are identical
  const first = sets[0];
  const firstArr = Array.from(first);
  const identical = sets.every(
    (s) => s.size === first.size && firstArr.every((v) => s.has(v)),
  );
  if (identical) return "same";
  // Check for any overlap
  const allValues = Array.from(new Set(arrays.flat()));
  const hasOverlap = allValues.some((v) =>
    sets.every((s) => s.has(v)),
  );
  return hasOverlap ? "partial" : "different";
}

const verdictBg: Record<Verdict, string> = {
  same: "bg-atlas-50/40 dark:bg-atlas-900/8",
  partial: "bg-signal-50/25 dark:bg-signal-900/5",
  different: "bg-signal-50/40 dark:bg-signal-900/10",
};

const verdictBorder: Record<Verdict, string> = {
  same: "border-l-atlas-400 dark:border-l-atlas-600",
  partial: "border-l-signal-300 dark:border-l-signal-600",
  different: "border-l-signal-400 dark:border-l-signal-500",
};

const verdictLabel: Record<Verdict, { text: string; color: string }> = {
  same: { text: "Same", color: "text-atlas-600 dark:text-atlas-400" },
  partial: { text: "Partial overlap", color: "text-signal-600 dark:text-signal-400" },
  different: { text: "Different", color: "text-signal-600 dark:text-signal-400" },
};

// ---------------------------------------------------------------------------
// Selector
// ---------------------------------------------------------------------------

function IncidentSelector({
  incidents,
  selected,
  onToggle,
}: {
  incidents: Incident[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-2">
        Select 2–{MAX_SELECTIONS} incidents
      </p>
      {incidents.map((inc) => {
        const isSelected = selected.includes(inc.id);
        const isDisabled = !isSelected && selected.length >= MAX_SELECTIONS;
        return (
          <button
            key={inc.id}
            onClick={() => !isDisabled && onToggle(inc.id)}
            disabled={isDisabled}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              isSelected
                ? "bg-atlas-50 dark:bg-atlas-900/20 border border-atlas-400/50 dark:border-atlas-600/40 text-atlas-700 dark:text-atlas-400 font-medium"
                : isDisabled
                  ? "text-steel-400 dark:text-ink-500 cursor-not-allowed"
                  : "text-ink dark:text-white hover:bg-ink-50/50 dark:hover:bg-ink-700/30"
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="truncate">{inc.shortName}</span>
              <span className="text-[10px] font-mono text-steel-500 dark:text-ink-400 shrink-0">
                {inc.year}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comparison row with verdict indicator
// ---------------------------------------------------------------------------

function CompareRow({
  label,
  verdict,
  children,
  colCount,
}: {
  label: string;
  verdict?: Verdict;
  children: React.ReactNode;
  colCount: number;
}) {
  const v = verdict ?? "same";
  return (
    <div className={`border-b border-steel-200/15 dark:border-ink-600/20 border-l-[3px] ${verdictBorder[v]}`}>
      <div className={`px-4 py-2 flex items-center justify-between ${verdictBg[v]}`}>
        <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider">
          {label}
        </p>
        {verdict && colCount >= 2 && (
          <span className={`text-[10px] font-medium uppercase tracking-wider ${verdictLabel[v].color}`}>
            {verdictLabel[v].text}
          </span>
        )}
      </div>
      <div
        className="grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-steel-200/15 dark:divide-ink-600/20"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    </div>
  );
}

function CompareCell({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

// ---------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------

function buildCsv(selected: Incident[]): string {
  const allFlags: GovernanceFlag[] = [
    "norm-violation", "attribution-public", "sanctions-imposed", "indictment",
    "un-discussion", "regulatory-change", "international-cooperation", "deterrence-signal",
  ];

  const headers = [
    "Field",
    ...selected.map((inc) => inc.shortName),
  ];

  const rows: string[][] = [
    ["Year", ...selected.map((inc) => String(inc.year))],
    ["Date Range", ...selected.map((inc) => inc.dateRange)],
    ["Incident Type", ...selected.map((inc) => incidentTypeLabels[inc.incidentType])],
    ["Attribution", ...selected.map((inc) => inc.attribution.attributedTo)],
    ["Attribution Country", ...selected.map((inc) => inc.attribution.country)],
    ["Attribution Confidence", ...selected.map((inc) => attributionLabels[inc.attribution.confidence])],
    ["Peak Escalation Tier", ...selected.map((inc) => escalationTierLabels[inc.escalation.peakTier])],
    ["Unpeace Score", ...selected.map((inc) => String(unpeaceScore(inc) * 10))],
    ["Entanglement Score", ...selected.map((inc) => String(entanglementScore(inc)))],
    ["Target Sectors", ...selected.map((inc) => inc.infrastructure.targetSectors.map((s) => targetSectorLabels[s]).join("; "))],
    ["Target Countries", ...selected.map((inc) => inc.infrastructure.targetCountries.join("; "))],
    ["Threshold Crossings", ...selected.map((inc) => inc.escalation.thresholdCrossings.join("; ") || "None")],
    ["Restraint Factors", ...selected.map((inc) => inc.escalation.restraintFactors.join("; ") || "None")],
    ...allFlags.map((flag) => [
      `Gov: ${governanceFlagLabels[flag]}`,
      ...selected.map((inc) => inc.governance.flags.includes(flag) ? "Yes" : "No"),
    ]),
    ["Norms Invoked", ...selected.map((inc) => inc.governance.normsInvoked.join("; "))],
    ["Governance Impact", ...selected.map((inc) => inc.governance.impact)],
    ["Key Question", ...selected.map((inc) => inc.teaching.keyQuestion)],
  ];

  const escape = (s: string) => {
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  return [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
}

function downloadCsv(selected: Incident[]) {
  const csv = buildCsv(selected);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `compare-${selected.map((i) => i.slug).join("-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

// Default landing comparison so the tool demonstrates itself immediately.
const SAMPLE_SLUGS = ["notpetya", "stuxnet"];

export function CompareTool({ incidents }: { incidents: Incident[] }) {
  const sampleIds = SAMPLE_SLUGS.map(
    (slug) => incidents.find((i) => i.slug === slug)?.id,
  ).filter(Boolean) as string[];

  const [selectedIds, setSelectedIds] = useState<string[]>(sampleIds);
  const [showTable, setShowTable] = useState(false);
  const [isSample, setIsSample] = useState(true);

  // On mount, hydrate selection from ?ids=slug1,slug2 if present.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get("ids");
    if (idsParam) {
      const ids = idsParam
        .split(",")
        .map((slug) => incidents.find((i) => i.slug === slug)?.id)
        .filter(Boolean)
        .slice(0, MAX_SELECTIONS) as string[];
      if (ids.length > 0) {
        setSelectedIds(ids);
        setIsSample(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect the current selection into the URL for shareable links.
  useEffect(() => {
    const slugs = selectedIds
      .map((id) => incidents.find((i) => i.id === id)?.slug)
      .filter(Boolean);
    const params = new URLSearchParams(window.location.search);
    if (slugs.length > 0) params.set("ids", slugs.join(","));
    else params.delete("ids");
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }, [selectedIds, incidents]);

  const toggle = useCallback((id: string) => {
    setIsSample(false);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const selected = selectedIds
    .map((id) => incidents.find((i) => i.id === id))
    .filter(Boolean) as Incident[];

  const cols = selected.length;

  // Pre-compute verdicts for each row
  const verdicts = cols >= 2
    ? {
        type: allSame(selected.map((i) => i.incidentType)) ? "same" as Verdict : "different" as Verdict,
        country: allSame(selected.map((i) => i.attribution.country)) ? "same" as Verdict : "different" as Verdict,
        confidence: allSame(selected.map((i) => i.attribution.confidence)) ? "same" as Verdict : "different" as Verdict,
        peakTier: allSame(selected.map((i) => i.escalation.peakTier)) ? "same" as Verdict : "different" as Verdict,
        sectors: setOverlap(selected.map((i) => i.infrastructure.targetSectors)),
        flags: setOverlap(selected.map((i) => i.governance.flags)),
        unpeace: allSame(selected.map((i) => String(unpeaceScore(i)))) ? "same" as Verdict : "different" as Verdict,
      }
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar selector */}
      <aside className="w-full lg:w-56 shrink-0 print:hidden">
        <div className="sticky top-20 space-y-4 p-4 rounded-xl border border-transparent dark:border-white/[0.04] bg-ink-50/50 dark:bg-white/[0.03] max-h-[calc(100vh-6rem)] overflow-y-auto">
          <IncidentSelector
            incidents={incidents}
            selected={selectedIds}
            onToggle={toggle}
          />
        </div>
      </aside>

      {/* Comparison area */}
      <div className="flex-1 min-w-0">
        {selected.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-steel-500 dark:text-steel-300 mb-1">
              Select incidents from the sidebar to compare.
            </p>
            <p className="text-sm text-steel-600 dark:text-ink-400">
              Choose 2–3 cases to analyse commonalities and divergences across
              escalation, infrastructure, and governance dimensions.
            </p>
          </div>
        ) : (
          <>
            {isSample && cols >= 2 && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-atlas-400/30 bg-atlas-50/40 dark:bg-atlas-900/10 px-4 py-2.5 print:hidden">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-atlas-400 shrink-0" />
                <p className="text-xs text-steel-600 dark:text-steel-300 leading-relaxed">
                  <span className="font-medium text-ink dark:text-white">Sample comparison</span>{" "}
                  (NotPetya vs Stuxnet). Pick cases from the sidebar to build your
                  own — the URL updates so any comparison is shareable.
                </p>
              </div>
            )}

            {/* Action bar */}
            {cols >= 2 && (
              <div className="flex items-center justify-between mb-4 print:hidden">
                <div className="flex items-center gap-4 text-xs text-steel-500 dark:text-steel-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-atlas-400" />
                    Same across cases
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-signal-400" />
                    Different or partial
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTable(!showTable)}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-transparent dark:border-white/[0.04] text-ink dark:text-ink-100 hover:bg-ink-50/50 dark:hover:bg-ink-700/30 transition-colors"
                  >
                    {showTable ? "Rich view" : "Table view"}
                  </button>
                  <button
                    onClick={() => downloadCsv(selected)}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-atlas-400/50 dark:border-atlas-600/40 text-atlas-700 dark:text-atlas-400 hover:bg-atlas-50/50 dark:hover:bg-atlas-900/20 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>
            )}

            {/* ---- Table view ---- */}
            {showTable ? (
              <PrintTable selected={selected} />
            ) : (
              /* ---- Rich comparison view ---- */
              <div className="rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 overflow-hidden">
                {/* Header row */}
                <div
                  className="grid divide-x divide-steel-200/15 dark:divide-ink-600/20 border-b border-steel-200/20 dark:border-ink-600/25 bg-ink-50/50 dark:bg-ink-800/30"
                  style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                  {selected.map((inc) => (
                    <div key={inc.id} className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <a
                            href={`/cases/${inc.slug}`}
                            className="text-base font-bold text-ink dark:text-white hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                          >
                            {inc.shortName}
                          </a>
                          <p className="text-xs text-steel-500 dark:text-steel-400 mt-0.5">
                            {inc.dateRange} · {inc.attribution.country}
                          </p>
                        </div>
                        <button
                          onClick={() => toggle(inc.id)}
                          className="text-steel-400 dark:text-ink-500 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors print:hidden"
                          title="Remove from comparison"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant={incidentTypeBadge[inc.incidentType]}>
                          {incidentTypeLabels[inc.incidentType]}
                        </Badge>
                        <Badge variant={escalationTierBadge[inc.escalation.peakTier]}>
                          {escalationTierLabels[inc.escalation.peakTier]}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Combined comparative radar */}
                {cols >= 2 && (
                  <div className="border-b border-steel-200/15 dark:border-ink-600/20">
                    <ComparativeRadar incidents={selected} />
                  </div>
                )}

                {/* Unpeace score */}
                <CompareRow label="Unpeace Score" verdict={verdicts?.unpeace} colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      <UnpeaceAxis score={unpeaceScore(inc)} />
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Key metrics */}
                <CompareRow label="Key Metrics" verdict={verdicts?.peakTier} colCount={cols}>
                  {selected.map((inc) => {
                    const score = unpeaceScore(inc);
                    const ent = entanglementScore(inc);
                    const tier = tierIndex(inc.escalation.peakTier) + 1;
                    return (
                      <CompareCell key={inc.id}>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-lg font-bold text-ink dark:text-white">{score * 10}</p>
                            <p className="text-[10px] text-steel-500 dark:text-ink-400">Unpeace</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-ink dark:text-white">{ent}</p>
                            <p className="text-[10px] text-steel-500 dark:text-ink-400">Entanglement</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-ink dark:text-white">{tier}/6</p>
                            <p className="text-[10px] text-steel-500 dark:text-ink-400">Peak Tier</p>
                          </div>
                        </div>
                      </CompareCell>
                    );
                  })}
                </CompareRow>

                {/* Escalation radar */}
                <CompareRow label="Escalation Profile" colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      <EscalationRadar incident={inc} size={220} />
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Attribution */}
                <CompareRow label="Attribution" verdict={verdicts?.country} colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={attributionBadge[inc.attribution.confidence]}>
                            {attributionLabels[inc.attribution.confidence]}
                          </Badge>
                        </div>
                        <p className="text-sm text-ink dark:text-white">
                          {inc.attribution.attributedTo}
                        </p>
                        {inc.attribution.aliases.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {inc.attribution.aliases.map((a) => (
                              <span
                                key={a}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-100/50 dark:bg-ink-600/30 text-ink dark:text-steel-300"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Target sectors */}
                <CompareRow label="Target Sectors" verdict={verdicts?.sectors} colCount={cols}>
                  {selected.map((inc) => {
                    const sharedSectors = cols >= 2
                      ? new Set(
                          selected
                            .flatMap((i) => i.infrastructure.targetSectors)
                            .filter((s) =>
                              selected.every((i) => i.infrastructure.targetSectors.includes(s)),
                            ),
                        )
                      : new Set<string>();

                    return (
                      <CompareCell key={inc.id}>
                        <div className="flex flex-wrap gap-1">
                          {inc.infrastructure.targetSectors.map((s) => (
                            <span
                              key={s}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                sharedSectors.has(s)
                                  ? "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-400 ring-1 ring-atlas-400/40 dark:ring-atlas-600/30"
                                  : "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                              }`}
                            >
                              {targetSectorLabels[s]}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-steel-500 dark:text-steel-400 mt-2">
                          {inc.infrastructure.targetCountries.join(", ")}
                        </p>
                      </CompareCell>
                    );
                  })}
                </CompareRow>

                {/* Threshold crossings */}
                <CompareRow label="Threshold Crossings" colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      {inc.escalation.thresholdCrossings.length === 0 ? (
                        <p className="text-xs text-steel-500 dark:text-ink-400 italic">
                          No threshold crossings recorded.
                        </p>
                      ) : (
                        <ul className="space-y-1">
                          {inc.escalation.thresholdCrossings.map((t, i) => (
                            <li key={i} className="text-xs text-steel-500 dark:text-steel-300 flex items-start gap-1.5">
                              <span className="text-signal-500 mt-0.5 shrink-0">·</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Restraint factors */}
                <CompareRow label="Restraint Factors" colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      {inc.escalation.restraintFactors.length === 0 ? (
                        <p className="text-xs text-steel-500 dark:text-ink-400 italic">
                          No restraint factors recorded.
                        </p>
                      ) : (
                        <ul className="space-y-1">
                          {inc.escalation.restraintFactors.map((r, i) => (
                            <li key={i} className="text-xs text-steel-500 dark:text-steel-300 flex items-start gap-1.5">
                              <span className="text-atlas-500 mt-0.5 shrink-0">·</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Governance flags */}
                <CompareRow label="Governance Flags" verdict={verdicts?.flags} colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      <GovernanceFlagsGrid activeFlags={inc.governance.flags} />
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Governance impact */}
                <CompareRow label="Governance Impact" colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
                        {inc.governance.impact}
                      </p>
                      {inc.governance.normsInvoked.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-steel-200/10 dark:border-ink-600/15">
                          <p className="text-[10px] font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1">
                            Norms invoked
                          </p>
                          <ul className="space-y-0.5">
                            {inc.governance.normsInvoked.map((n, i) => (
                              <li key={i} className="text-[11px] text-steel-500 dark:text-steel-400 italic">
                                {n}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CompareCell>
                  ))}
                </CompareRow>

                {/* Teaching question */}
                <CompareRow label="Key Question" colCount={cols}>
                  {selected.map((inc) => (
                    <CompareCell key={inc.id}>
                      <p className="text-sm text-ink dark:text-white font-medium italic leading-relaxed">
                        &ldquo;{inc.teaching.keyQuestion}&rdquo;
                      </p>
                    </CompareCell>
                  ))}
                </CompareRow>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Print-friendly table view
// ---------------------------------------------------------------------------

function PrintTable({ selected }: { selected: Incident[] }) {
  const allFlags: GovernanceFlag[] = [
    "norm-violation", "attribution-public", "sanctions-imposed", "indictment",
    "un-discussion", "regulatory-change", "international-cooperation", "deterrence-signal",
  ];

  interface RowDef {
    label: string;
    values: string[];
  }

  const rows: RowDef[] = [
    { label: "Year", values: selected.map((i) => String(i.year)) },
    { label: "Date Range", values: selected.map((i) => i.dateRange) },
    { label: "Incident Type", values: selected.map((i) => incidentTypeLabels[i.incidentType]) },
    { label: "Attribution", values: selected.map((i) => i.attribution.attributedTo) },
    { label: "Country", values: selected.map((i) => i.attribution.country) },
    { label: "Confidence", values: selected.map((i) => attributionLabels[i.attribution.confidence]) },
    { label: "Peak Tier", values: selected.map((i) => escalationTierLabels[i.escalation.peakTier]) },
    { label: "Unpeace Score", values: selected.map((i) => String(unpeaceScore(i) * 10)) },
    { label: "Entanglement", values: selected.map((i) => String(entanglementScore(i))) },
    { label: "Target Sectors", values: selected.map((i) => i.infrastructure.targetSectors.map((s) => targetSectorLabels[s]).join(", ")) },
    { label: "Target Countries", values: selected.map((i) => i.infrastructure.targetCountries.join(", ")) },
    { label: "Threshold Crossings", values: selected.map((i) => i.escalation.thresholdCrossings.join("; ") || "None") },
    { label: "Restraint Factors", values: selected.map((i) => i.escalation.restraintFactors.join("; ") || "None") },
    ...allFlags.map((flag) => ({
      label: governanceFlagLabels[flag],
      values: selected.map((i) => i.governance.flags.includes(flag) ? "Yes" : "No"),
    })),
    { label: "Norms Invoked", values: selected.map((i) => i.governance.normsInvoked.join("; ")) },
    { label: "Governance Impact", values: selected.map((i) => i.governance.impact) },
    { label: "Key Question", values: selected.map((i) => i.teaching.keyQuestion) },
  ];

  return (
    <div className="rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-ink-50/50 dark:bg-ink-800/30">
            <th className="text-left p-3 text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider border-b border-steel-200/20 dark:border-ink-600/25 min-w-[140px]">
              Field
            </th>
            {selected.map((inc) => (
              <th
                key={inc.id}
                className="text-left p-3 text-xs font-semibold text-ink dark:text-ink-100 border-b border-steel-200/20 dark:border-ink-600/25 min-w-[200px]"
              >
                <a
                  href={`/cases/${inc.slug}`}
                  className="hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                >
                  {inc.shortName}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isSame = allSame(row.values);
            return (
              <tr
                key={row.label}
                className={`border-b border-steel-200/10 dark:border-ink-600/15 ${
                  isSame
                    ? "bg-atlas-50/30 dark:bg-atlas-900/5"
                    : ""
                }`}
              >
                <td className={`p-3 text-xs font-medium whitespace-nowrap ${
                  isSame
                    ? "text-atlas-700 dark:text-atlas-400"
                    : "text-ink dark:text-ink-100"
                }`}>
                  <span className="flex items-center gap-1.5">
                    {!isSame && selected.length >= 2 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-signal-400 shrink-0" />
                    )}
                    {isSame && selected.length >= 2 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-atlas-400 shrink-0" />
                    )}
                    {row.label}
                  </span>
                </td>
                {row.values.map((val, idx) => (
                  <td
                    key={idx}
                    className="p-3 text-xs text-steel-500 dark:text-steel-300"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
