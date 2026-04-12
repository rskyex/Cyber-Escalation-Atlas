"use client";

import type {
  IncidentType,
  EscalationTier,
  TargetSector,
  AttributionConfidence,
  GovernanceFlag,
} from "@/lib/types/incidents";
import {
  incidentTypeLabels,
  escalationTierLabels,
  targetSectorLabels,
  attributionLabels,
  governanceFlagLabels,
} from "@/lib/utils/incidents";

// ---------------------------------------------------------------------------
// Filter state
// ---------------------------------------------------------------------------

export interface CasesFilterState {
  escalationTier: EscalationTier | "";
  sector: TargetSector | "";
  actorType: IncidentType | "";
  attribution: AttributionConfidence | "";
  governanceFlag: GovernanceFlag | "";
  region: string;
  yearMin: number;
  yearMax: number;
  entanglement: number; // 0 = any
}

export const defaultFilters: CasesFilterState = {
  escalationTier: "",
  sector: "",
  actorType: "",
  attribution: "",
  governanceFlag: "",
  region: "",
  yearMin: 2000,
  yearMax: 2025,
  entanglement: 0,
};

// ---------------------------------------------------------------------------
// Region options derived from dataset
// ---------------------------------------------------------------------------

const REGIONS = [
  "Global",
  "United States",
  "Ukraine",
  "Iran",
  "Saudi Arabia",
  "Taiwan",
  "Albania",
  "Costa Rica",
  "Bangladesh",
  "Australia",
  "India",
  "Pakistan",
  "Israel",
  "Thailand",
  "Ecuador",
  "Guam",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface CasesFiltersProps {
  filters: CasesFilterState;
  onChange: (next: CasesFilterState) => void;
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-atlas-500"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CasesFilters({ filters, onChange }: CasesFiltersProps) {
  function set<K extends keyof CasesFilterState>(
    key: K,
    value: CasesFilterState[K],
  ) {
    onChange({ ...filters, [key]: value });
  }

  const escalationOptions = (
    Object.entries(escalationTierLabels) as [EscalationTier, string][]
  ).map(([v, l]) => ({ value: v, label: l }));

  const sectorOptions = (
    Object.entries(targetSectorLabels) as [TargetSector, string][]
  ).map(([v, l]) => ({ value: v, label: l }));

  const actorOptions = (
    Object.entries(incidentTypeLabels) as [IncidentType, string][]
  ).map(([v, l]) => ({ value: v, label: l }));

  const attrOptions = (
    Object.entries(attributionLabels) as [AttributionConfidence, string][]
  ).map(([v, l]) => ({ value: v, label: l }));

  const govOptions = (
    Object.entries(governanceFlagLabels) as [GovernanceFlag, string][]
  ).map(([v, l]) => ({ value: v, label: l }));

  const regionOptions = REGIONS.map((r) => ({ value: r, label: r }));

  const hasActive =
    filters.escalationTier !== "" ||
    filters.sector !== "" ||
    filters.actorType !== "" ||
    filters.attribution !== "" ||
    filters.governanceFlag !== "" ||
    filters.region !== "" ||
    filters.yearMin !== defaultFilters.yearMin ||
    filters.yearMax !== defaultFilters.yearMax ||
    filters.entanglement > 0;

  return (
    <div className="space-y-4">
      <SelectField
        label="Escalation category"
        value={filters.escalationTier}
        options={escalationOptions}
        onChange={(v) => set("escalationTier", v as EscalationTier | "")}
      />
      <SelectField
        label="Sector"
        value={filters.sector}
        options={sectorOptions}
        onChange={(v) => set("sector", v as TargetSector | "")}
      />
      <SelectField
        label="Operation type"
        value={filters.actorType}
        options={actorOptions}
        onChange={(v) => set("actorType", v as IncidentType | "")}
      />
      <SelectField
        label="Attribution level"
        value={filters.attribution}
        options={attrOptions}
        onChange={(v) => set("attribution", v as AttributionConfidence | "")}
      />

      {/* Governance flags — visually distinct section */}
      <div className="pt-2 border-t border-steel-200/20 dark:border-ink-600/30">
        <SelectField
          label="Governance response"
          value={filters.governanceFlag}
          options={govOptions}
          onChange={(v) => set("governanceFlag", v as GovernanceFlag | "")}
        />
      </div>

      <SelectField
        label="Region"
        value={filters.region}
        options={regionOptions}
        onChange={(v) => set("region", v)}
      />

      {/* Year range */}
      <div className="pt-2 border-t border-steel-200/20 dark:border-ink-600/30">
        <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">
          Year range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={2000}
            max={2025}
            value={filters.yearMin}
            onChange={(e) => set("yearMin", Number(e.target.value))}
            className="w-20 text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-atlas-500"
          />
          <span className="text-xs text-steel-500 dark:text-steel-400">&ndash;</span>
          <input
            type="number"
            min={2000}
            max={2025}
            value={filters.yearMax}
            onChange={(e) => set("yearMax", Number(e.target.value))}
            className="w-20 text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-atlas-500"
          />
        </div>
      </div>

      {/* Entanglement score */}
      <div>
        <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">
          Min. entanglement score
        </label>
        <input
          type="range"
          min={0}
          max={10}
          value={filters.entanglement}
          onChange={(e) => set("entanglement", Number(e.target.value))}
          className="w-full accent-atlas-500"
        />
        <div className="flex justify-between text-xs text-steel-500 dark:text-ink-400 mt-0.5">
          <span>Any</span>
          <span>{filters.entanglement > 0 ? `≥ ${filters.entanglement}` : "—"}</span>
        </div>
      </div>

      {/* Reset */}
      {hasActive && (
        <button
          onClick={() => onChange(defaultFilters)}
          className="w-full text-xs text-atlas-600 dark:text-atlas-400 hover:underline pt-1"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
