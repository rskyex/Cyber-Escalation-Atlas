"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import type { Incident } from "@/lib/types/incidents";
import { incidentCoords } from "@/lib/utils/geo";
import {
  escalationTierBadge,
  escalationTierLabels,
  incidentTypeLabels,
} from "@/lib/utils/incidents";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const pinColor: Record<string, string> = {
  atlas: "#0D7377",
  signal: "#D97706",
  ink: "#485F87",
  default: "#7587A5",
};

interface CasesMapProps {
  incidents: Incident[];
}

export function CasesMap({ incidents }: CasesMapProps) {
  const [tooltip, setTooltip] = useState<{
    incident: Incident;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative w-full rounded-xl border border-transparent dark:border-white/[0.04] bg-ink-50/50 dark:bg-white/[0.03] overflow-hidden">
      <ComposableMap
        projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[0, 20]} zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={(geo as { rsmKey: string }).rsmKey}
                  geography={geo}
                  fill="currentColor"
                  stroke="currentColor"
                  className="text-ink-100 dark:text-ink-600 stroke-steel-200/40 dark:stroke-ink-500/30"
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", opacity: 0.8 },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {incidents.map((incident) => {
            const coords = incidentCoords(
              incident.infrastructure.targetCountries,
            );
            const variant =
              escalationTierBadge[incident.escalation.peakTier];
            const color = pinColor[variant] || pinColor.default;

            return (
              <Marker key={incident.id} coordinates={coords}>
                <circle
                  r={5}
                  fill={color}
                  fillOpacity={0.85}
                  stroke="#fff"
                  strokeWidth={1.2}
                  className="cursor-pointer transition-transform hover:scale-150"
                  onMouseEnter={(e) => {
                    const rect = (
                      e.currentTarget.closest("svg") as SVGSVGElement
                    )?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({
                        incident,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-10 pointer-events-none px-3 py-2 rounded-md shadow-lg border border-transparent dark:border-white/[0.04] bg-white dark:bg-ink-700 max-w-xs"
          style={{
            left: Math.min(tooltip.x + 12, 600),
            top: tooltip.y - 8,
          }}
        >
          <p className="text-sm font-semibold text-ink dark:text-white">
            {tooltip.incident.shortName}
          </p>
          <p className="text-xs text-steel-500 dark:text-steel-300">
            {tooltip.incident.dateRange}
          </p>
          <p className="text-xs text-steel-500 dark:text-steel-400 mt-1">
            {incidentTypeLabels[tooltip.incident.incidentType]} &middot;{" "}
            {escalationTierLabels[tooltip.incident.escalation.peakTier]}
          </p>
        </div>
      )}
    </div>
  );
}
