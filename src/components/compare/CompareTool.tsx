"use client";

import { useState } from "react";
import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { UnpeaceAxis } from "@/components/case-detail/UnpeaceAxis";
import { EscalationRadar } from "@/components/case-detail/EscalationRadar";
import { GovernanceFlagsGrid } from "@/components/case-detail/GovernanceFlagsGrid";
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
      <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
        Select up to {MAX_SELECTIONS} incidents
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
                ? "bg-teal-50 dark:bg-teal-900/20 border border-teal-300/50 dark:border-teal-600/40 text-teal-700 dark:text-teal-300 font-medium"
                : isDisabled
                  ? "text-navy-300 dark:text-navy-500 cursor-not-allowed"
                  : "text-navy dark:text-offwhite hover:bg-navy-50/50 dark:hover:bg-navy-700/30"
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="truncate">{inc.shortName}</span>
              <span className="text-[10px] font-mono text-slate dark:text-navy-400 shrink-0">
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
// Comparison row helper
// ---------------------------------------------------------------------------

function CompareRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-navy-200/15 dark:border-navy-600/20">
      <div className="px-4 py-2 bg-navy-50/30 dark:bg-navy-800/20">
        <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <div className="grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-navy-200/15 dark:divide-navy-600/20"
        style={{ gridTemplateColumns: `repeat(var(--cols), minmax(0, 1fr))` }}
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
// Main component
// ---------------------------------------------------------------------------

export function CompareTool({ incidents }: { incidents: Incident[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selected = selectedIds
    .map((id) => incidents.find((i) => i.id === id))
    .filter(Boolean) as Incident[];

  const cols = selected.length;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar selector */}
      <aside className="w-full lg:w-56 shrink-0">
        <div className="sticky top-20 space-y-4 p-4 rounded-lg border border-navy-200/30 dark:border-navy-600/40 bg-white dark:bg-navy-700/50 max-h-[calc(100vh-6rem)] overflow-y-auto">
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
            <p className="text-slate dark:text-navy-200 mb-1">
              Select incidents from the sidebar to compare.
            </p>
            <p className="text-sm text-slate/60 dark:text-navy-400">
              Choose 2–3 cases to analyse commonalities and divergences across
              escalation, infrastructure, and governance dimensions.
            </p>
          </div>
        ) : (
          <div
            className="rounded-lg border border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/20 overflow-hidden"
            style={{ "--cols": cols } as React.CSSProperties}
          >
            {/* ---- Header row ---- */}
            <div
              className="grid divide-x divide-navy-200/15 dark:divide-navy-600/20 border-b border-navy-200/20 dark:border-navy-600/25 bg-navy-50/50 dark:bg-navy-800/30"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {selected.map((inc) => (
                <div key={inc.id} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <a
                        href={`/cases/${inc.slug}`}
                        className="text-base font-bold text-navy dark:text-offwhite hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                      >
                        {inc.shortName}
                      </a>
                      <p className="text-xs text-slate dark:text-navy-300 mt-0.5">
                        {inc.dateRange} · {inc.attribution.country}
                      </p>
                    </div>
                    <button
                      onClick={() => toggle(inc.id)}
                      className="text-navy-300 dark:text-navy-500 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
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

            {/* ---- Unpeace score ---- */}
            <CompareRow label="Unpeace Score">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <UnpeaceAxis score={unpeaceScore(inc)} />
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Key metrics ---- */}
            <CompareRow label="Key Metrics">
              {selected.map((inc) => {
                const score = unpeaceScore(inc);
                const ent = entanglementScore(inc);
                const tier = tierIndex(inc.escalation.peakTier) + 1;
                return (
                  <CompareCell key={inc.id}>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-navy dark:text-offwhite">{score * 10}</p>
                        <p className="text-[10px] text-slate dark:text-navy-400">Unpeace</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-navy dark:text-offwhite">{ent}</p>
                        <p className="text-[10px] text-slate dark:text-navy-400">Entanglement</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-navy dark:text-offwhite">{tier}/6</p>
                        <p className="text-[10px] text-slate dark:text-navy-400">Peak Tier</p>
                      </div>
                    </div>
                  </CompareCell>
                );
              })}
            </CompareRow>

            {/* ---- Escalation radar ---- */}
            <CompareRow label="Escalation Profile">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <EscalationRadar incident={inc} size={220} />
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Attribution ---- */}
            <CompareRow label="Attribution">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={attributionBadge[inc.attribution.confidence]}>
                        {attributionLabels[inc.attribution.confidence]}
                      </Badge>
                    </div>
                    <p className="text-sm text-navy dark:text-offwhite">
                      {inc.attribution.attributedTo}
                    </p>
                    {inc.attribution.aliases.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {inc.attribution.aliases.map((a) => (
                          <span
                            key={a}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-navy-100/50 dark:bg-navy-600/30 text-navy dark:text-navy-200"
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

            {/* ---- Target sectors ---- */}
            <CompareRow label="Target Sectors">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <div className="flex flex-wrap gap-1">
                    {inc.infrastructure.targetSectors.map((s) => (
                      <Badge key={s} variant="default">
                        {targetSectorLabels[s]}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-slate dark:text-navy-300 mt-2">
                    {inc.infrastructure.targetCountries.join(", ")}
                  </p>
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Threshold crossings ---- */}
            <CompareRow label="Threshold Crossings">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  {inc.escalation.thresholdCrossings.length === 0 ? (
                    <p className="text-xs text-slate dark:text-navy-400 italic">
                      No threshold crossings recorded.
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {inc.escalation.thresholdCrossings.map((t, i) => (
                        <li key={i} className="text-xs text-slate dark:text-navy-200 flex items-start gap-1.5">
                          <span className="text-amber-500 mt-0.5 shrink-0">·</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Restraint factors ---- */}
            <CompareRow label="Restraint Factors">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  {inc.escalation.restraintFactors.length === 0 ? (
                    <p className="text-xs text-slate dark:text-navy-400 italic">
                      No restraint factors recorded.
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {inc.escalation.restraintFactors.map((r, i) => (
                        <li key={i} className="text-xs text-slate dark:text-navy-200 flex items-start gap-1.5">
                          <span className="text-teal-500 mt-0.5 shrink-0">·</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Governance flags ---- */}
            <CompareRow label="Governance Flags">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <GovernanceFlagsGrid activeFlags={inc.governance.flags} />
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Governance impact ---- */}
            <CompareRow label="Governance Impact">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
                    {inc.governance.impact}
                  </p>
                  {inc.governance.normsInvoked.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-navy-200/10 dark:border-navy-600/15">
                      <p className="text-[10px] font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1">
                        Norms invoked
                      </p>
                      <ul className="space-y-0.5">
                        {inc.governance.normsInvoked.map((n, i) => (
                          <li key={i} className="text-[11px] text-slate dark:text-navy-300 italic">
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CompareCell>
              ))}
            </CompareRow>

            {/* ---- Teaching question ---- */}
            <CompareRow label="Key Question">
              {selected.map((inc) => (
                <CompareCell key={inc.id}>
                  <p className="text-sm text-navy dark:text-offwhite font-medium italic leading-relaxed">
                    &ldquo;{inc.teaching.keyQuestion}&rdquo;
                  </p>
                </CompareCell>
              ))}
            </CompareRow>
          </div>
        )}
      </div>
    </div>
  );
}
