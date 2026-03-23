"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import type { Incident } from "@/lib/types/incidents";
import { tierIndex, entanglementScore } from "@/lib/utils/incidents";

// 7 dimensions normalised to 0–1 for radar shape
function radarData(incident: Incident) {
  const esc = (tierIndex(incident.escalation.peakTier) + 1) / 6;
  const phases = Math.min(incident.escalation.phases.length / 5, 1);
  const thresholds = Math.min(
    incident.escalation.thresholdCrossings.length / 4,
    1,
  );
  const restraint =
    1 - Math.min(incident.escalation.restraintFactors.length / 4, 1); // inverse
  const govFlags = Math.min(incident.governance.flags.length / 8, 1);
  const sectors = Math.min(
    incident.infrastructure.targetSectors.length / 6,
    1,
  );
  const entangle = entanglementScore(incident) / 10;

  return [
    { axis: "Escalation", value: esc },
    { axis: "Phases", value: phases },
    { axis: "Thresholds", value: thresholds },
    { axis: "Restraint gap", value: restraint },
    { axis: "Governance", value: govFlags },
    { axis: "Sector reach", value: sectors },
    { axis: "Entanglement", value: entangle },
  ];
}

interface EscalationRadarProps {
  incident: Incident;
  size?: number;
}

export function EscalationRadar({ incident, size = 280 }: EscalationRadarProps) {
  const data = radarData(incident);

  return (
    <div
      className="mx-auto"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
          <PolarGrid
            stroke="currentColor"
            className="text-steel-200/50 dark:text-ink-600/60"
          />
          <PolarAngleAxis
            dataKey="axis"
            tick={{
              fontSize: 10,
              fill: "currentColor",
            }}
            className="text-steel-500 dark:text-steel-300"
          />
          <Radar
            dataKey="value"
            stroke="#0D7377"
            fill="#0D7377"
            fillOpacity={0.15}
            strokeWidth={1.5}
            dot={{
              r: 3,
              fill: "#0D7377",
              stroke: "#0D7377",
              strokeWidth: 0,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
