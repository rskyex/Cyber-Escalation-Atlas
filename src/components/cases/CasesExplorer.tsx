"use client";

import { useState, useMemo } from "react";
import type { Incident } from "@/lib/types/incidents";
import { unpeaceScore } from "@/lib/utils/incidents";
import { CasesFilters, defaultFilters } from "./CasesFilters";
import type { CasesFilterState } from "./CasesFilters";
import { CaseCard } from "./CaseCard";
import { CasesMap } from "./CasesMap";

// ---------------------------------------------------------------------------
// Filter logic
// ---------------------------------------------------------------------------

function applyFilters(
  incidents: Incident[],
  f: CasesFilterState,
): Incident[] {
  return incidents.filter((inc) => {
    if (f.escalationTier && inc.escalation.peakTier !== f.escalationTier)
      return false;
    if (f.sector && !inc.infrastructure.targetSectors.includes(f.sector))
      return false;
    if (f.actorType && inc.incidentType !== f.actorType) return false;
    if (f.attribution && inc.attribution.confidence !== f.attribution)
      return false;
    if (f.governanceFlag && !inc.governance.flags.includes(f.governanceFlag))
      return false;
    if (
      f.region &&
      !inc.infrastructure.targetCountries.some(
        (c) => c.toLowerCase() === f.region.toLowerCase(),
      )
    )
      return false;
    if (inc.year < f.yearMin || inc.year > f.yearMax) return false;
    if (f.entanglement > 0 && unpeaceScore(inc) < f.entanglement) return false;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type ViewMode = "list" | "map";

interface CasesExplorerProps {
  incidents: Incident[];
}

export function CasesExplorer({ incidents }: CasesExplorerProps) {
  const [filters, setFilters] = useState<CasesFilterState>(defaultFilters);
  const [view, setView] = useState<ViewMode>("list");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => applyFilters(incidents, filters),
    [incidents, filters],
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* ---- Mobile filter toggle ---- */}
      <button
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        className="lg:hidden flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        {mobileFiltersOpen ? "Hide filters" : "Show filters"}
      </button>

      {/* ---- Sidebar filters ---- */}
      <aside
        className={`w-full lg:w-64 shrink-0 ${
          mobileFiltersOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="sticky top-20 space-y-4 p-4 rounded-lg border border-navy-200/30 dark:border-navy-600/40 bg-white dark:bg-navy-700/50">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-navy-300">
            Filters
          </h3>
          <CasesFilters filters={filters} onChange={setFilters} />
        </div>
      </aside>

      {/* ---- Main content ---- */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate dark:text-navy-300">
            {filtered.length} of {incidents.length} cases
          </p>
          <div className="flex items-center rounded-md border border-navy-200/30 dark:border-navy-600/40 overflow-hidden">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "list"
                  ? "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
                  : "text-slate dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-600/30"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("map")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "map"
                  ? "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
                  : "text-slate dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-600/30"
              }`}
            >
              Map
            </button>
          </div>
        </div>

        {/* View */}
        {view === "map" && <CasesMap incidents={filtered} />}

        {view === "map" && filtered.length > 0 && (
          <div className="mt-6" />
        )}

        {/* Always show cards (below map when in map mode, as the primary list) */}
        {filtered.length === 0 ? (
          <p className="text-sm text-slate dark:text-navy-300 text-center py-12">
            No cases match the current filters.
          </p>
        ) : (
          <div className={`space-y-4 ${view === "map" ? "mt-2" : ""}`}>
            {filtered.map((inc) => (
              <CaseCard key={inc.id} incident={inc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
