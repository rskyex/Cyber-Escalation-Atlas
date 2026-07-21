"use client";

import type { Incident } from "@/lib/types/incidents";
import { comparativeProfile } from "@/lib/utils/incidents";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Distinct, colour-blind-friendly series colours (also differ in stroke).
const SERIES_COLORS = ["#2dd4a8", "#f59e0b", "#818cf8"];

const AXES: { key: keyof ReturnType<typeof comparativeProfile>; label: string }[] = [
  { key: "escalation", label: "Escalation" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "governance", label: "Governance" },
  { key: "attribution", label: "Attribution" },
  { key: "entanglement", label: "Entanglement" },
];

export function ComparativeRadar({ incidents }: { incidents: Incident[] }) {
  if (incidents.length < 2) return null;

  const profiles = incidents.map((i) => comparativeProfile(i));

  // Pivot to one row per axis, one column per case.
  const data = AXES.map(({ key, label }) => {
    const row: Record<string, string | number> = { axis: label };
    incidents.forEach((inc, idx) => {
      row[inc.shortName] = profiles[idx][key];
    });
    return row;
  });

  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider">
          Comparative Profile
        </p>
        <span className="text-[10px] font-mono text-steel-500 dark:text-ink-400">
          0–100 · derived heuristic
        </span>
      </div>
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="currentColor" className="text-steel-300/40 dark:text-ink-500/40" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fontSize: 11, fill: "currentColor" }}
              className="text-steel-600 dark:text-steel-300"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: "currentColor" }}
              className="text-steel-400 dark:text-ink-500"
            />
            {incidents.map((inc, idx) => (
              <Radar
                key={inc.id}
                name={inc.shortName}
                dataKey={inc.shortName}
                stroke={SERIES_COLORS[idx % SERIES_COLORS.length]}
                fill={SERIES_COLORS[idx % SERIES_COLORS.length]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[11px] text-steel-500 dark:text-ink-400 leading-snug">
        Axes normalise each case to a 0–100 scale from the same heuristic fields
        used elsewhere in the Atlas (peak tier, sector/country spread,
        governance-response density, attribution strength, entanglement). A
        comparison aid, not a measurement.
      </p>
    </div>
  );
}
