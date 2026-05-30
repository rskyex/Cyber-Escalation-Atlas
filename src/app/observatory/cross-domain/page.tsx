"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid } from "@/components/observatory";

interface Domain {
  id: string;
  name: string;
  short: string;
  x: number;
  y: number;
  tone: "atlas" | "amber" | "plasma" | "violet";
  description: string;
  example: string;
}

const domains: Domain[] = [
  { id: "cyber",   name: "Cyber Operations",          short: "CYB", x: 50, y: 50, tone: "atlas",  description: "Espionage, sabotage, disruption operations against networked infrastructure.", example: "NotPetya, SolarWinds" },
  { id: "space",   name: "Space Systems",             short: "ORB", x: 78, y: 22, tone: "amber",  description: "Satellite communications, ISR, GNSS positioning. Increasingly entangled with terrestrial cyber.", example: "Viasat KA-SAT (2022)" },
  { id: "gnss",    name: "GNSS / Positioning",        short: "GPS", x: 88, y: 50, tone: "amber",  description: "Time, navigation, financial-system synchronization. Spoofable and jamable.", example: "Black Sea spoofing" },
  { id: "ai",      name: "AI Command Systems",        short: "AIC", x: 22, y: 22, tone: "plasma", description: "Decision-support and increasingly decision-execution systems in defense postures.", example: "Maven · Replicator" },
  { id: "nuc",     name: "Nuclear C3",                short: "NC3", x: 22, y: 78, tone: "plasma", description: "Nuclear command, control, communications. Tightly coupled to early-warning sensors.", example: "1983 false alarm" },
  { id: "info",    name: "Information Domain",        short: "INF", x: 12, y: 50, tone: "violet", description: "Narrative, attribution, deterrence signaling. Operates concurrent with kinetic action.", example: "Hybrid threat doctrine" },
  { id: "fin",     name: "Financial Infrastructure",  short: "FIN", x: 78, y: 78, tone: "atlas",  description: "Settlement systems, payment rails, trading venues. Latency-sensitive, cascade-prone.", example: "SWIFT incidents" },
  { id: "auton",   name: "Autonomous Weapons",        short: "AWS", x: 50, y: 92, tone: "plasma", description: "Drone swarms, loitering munitions, counter-UAS interceptors with target-selection autonomy.", example: "Loitering munitions" },
];

interface Edge {
  from: string;
  to: string;
  label: string;
  intensity: "high" | "medium" | "low";
}

const edges: Edge[] = [
  { from: "cyber",  to: "space",  label: "modem firmware wiper", intensity: "high" },
  { from: "cyber",  to: "gnss",   label: "timing spoofing",      intensity: "medium" },
  { from: "cyber",  to: "fin",    label: "settlement disruption", intensity: "high" },
  { from: "cyber",  to: "nuc",    label: "early-warning sensor manipulation", intensity: "low" },
  { from: "cyber",  to: "ai",     label: "data poisoning",       intensity: "medium" },
  { from: "ai",     to: "auton",  label: "target prioritization", intensity: "high" },
  { from: "ai",     to: "nuc",    label: "decision-support",     intensity: "medium" },
  { from: "ai",     to: "info",   label: "narrative generation", intensity: "medium" },
  { from: "space",  to: "gnss",   label: "shared constellation", intensity: "high" },
  { from: "space",  to: "nuc",    label: "early-warning sat",    intensity: "high" },
  { from: "gnss",   to: "fin",    label: "clock synchronization", intensity: "medium" },
  { from: "gnss",   to: "auton",  label: "navigation feed",      intensity: "high" },
  { from: "info",   to: "nuc",    label: "deterrence signaling", intensity: "medium" },
  { from: "info",   to: "cyber",  label: "attribution narrative", intensity: "medium" },
  { from: "auton",  to: "nuc",    label: "escalation threshold", intensity: "low" },
  { from: "fin",    to: "info",   label: "sanctions transmission", intensity: "medium" },
];

const scenarios = [
  {
    id: "viasat",
    name: "Viasat / KA-SAT 2022",
    path: ["cyber", "space", "gnss", "fin"],
    blurb: "Modem-firmware wiper → satellite outage → terrestrial NATO communications + agricultural GNSS-dependent operations.",
  },
  {
    id: "swarm",
    name: "Autonomous Counter-Strike",
    path: ["ai", "auton", "nuc"],
    blurb: "AI command system delegates target prioritization → autonomous swarm engages → near nuclear threshold posture.",
  },
  {
    id: "narrative",
    name: "Narrative Compression",
    path: ["cyber", "info", "nuc", "auton"],
    blurb: "Attribution claim accelerates public narrative → political pressure compresses NC3 decision cycle → autonomous response envelope expanded.",
  },
  {
    id: "fin-cascade",
    name: "Financial Cascade",
    path: ["cyber", "fin", "info"],
    blurb: "Settlement disruption → media reports panic → sanctions invoked → counter-cyber retaliation.",
  },
];

export default function CrossDomainPage() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [pulseTick, setPulseTick] = useState(0);

  const activeScenario = scenarios[scenarioIdx];

  useEffect(() => {
    const id = setInterval(() => setPulseTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const W = 800;
  const H = 600;

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-04"
        coordinate="Cross-Domain · Global"
        title="Cross-Domain Escalation Map"
        tagline="Escalation refuses domain boundaries."
        description="Eight interlocked operational domains. An action in one — cyber, space, AI command, nuclear C3, information, financial, autonomous weapons — propagates through structural entanglements that no single ministry, command, or doctrine wholly governs. Select a scenario to trace propagation."
        status="modeled"
      />

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="tag-mono mr-2">SCENARIO ·</span>
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setScenarioIdx(i)}
            className={`px-3 py-1.5 rounded-md text-caption transition-all border ${
              scenarioIdx === i
                ? "bg-amber-500/15 border-amber-500/40 text-amber-200"
                : "bg-white/[0.02] border-white/[0.05] text-steel-400 hover:text-white hover:border-amber-500/20"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <PanelGrid cols={2} className="mb-8">
        <Panel label="DOMAIN PROPAGATION MAP" status={`active path · ${activeScenario.name}`} statusTone="amber" ticks className="lg:col-span-2">
          <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
              <defs>
                <radialGradient id="dom-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <filter id="dom-blur">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>

              {/* Domain field background */}
              <rect x="0" y="0" width={W} height={H} fill="rgba(10, 15, 28, 0.4)" rx="8" />

              {/* Background mesh */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`hl-${i}`}
                  x1="0"
                  y1={(i / 7) * H}
                  x2={W}
                  y2={(i / 7) * H}
                  stroke="rgba(132, 147, 175, 0.05)"
                  strokeDasharray="2 4"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`vl-${i}`}
                  x1={(i / 9) * W}
                  y1="0"
                  x2={(i / 9) * W}
                  y2={H}
                  stroke="rgba(132, 147, 175, 0.05)"
                  strokeDasharray="2 4"
                />
              ))}

              {/* All edges (faint) */}
              {edges.map((e, i) => {
                const from = domains.find((d) => d.id === e.from)!;
                const to = domains.find((d) => d.id === e.to)!;
                const x1 = (from.x / 100) * W;
                const y1 = (from.y / 100) * H;
                const x2 = (to.x / 100) * W;
                const y2 = (to.y / 100) * H;
                const isPathEdge =
                  activeScenario.path.indexOf(e.from) >= 0 &&
                  activeScenario.path.indexOf(e.to) ===
                    activeScenario.path.indexOf(e.from) + 1;
                const opacity = isPathEdge ? 1 : 0.18;
                const strokeColor = isPathEdge ? "rgba(230, 165, 92, 0.85)" : "rgba(132, 147, 175, 0.45)";
                const w = isPathEdge ? 2 : e.intensity === "high" ? 1.3 : 0.7;
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={strokeColor}
                      strokeWidth={w}
                      opacity={opacity}
                      strokeDasharray={isPathEdge ? "0" : "3 5"}
                      className={isPathEdge ? "edge-pulse" : ""}
                    />
                    {isPathEdge && (
                      <text
                        x={(x1 + x2) / 2}
                        y={(y1 + y2) / 2 - 6}
                        fill="rgba(230, 165, 92, 0.9)"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                        textAnchor="middle"
                      >
                        {e.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Propagation pulses along scenario path */}
              {activeScenario.path.slice(0, -1).map((id, i) => {
                const from = domains.find((d) => d.id === id)!;
                const to = domains.find((d) => d.id === activeScenario.path[i + 1])!;
                const x1 = (from.x / 100) * W;
                const y1 = (from.y / 100) * H;
                const x2 = (to.x / 100) * W;
                const y2 = (to.y / 100) * H;
                return (
                  <motion.circle
                    key={`pulse-${pulseTick}-${i}`}
                    r="5"
                    fill="rgba(230, 165, 92, 0.95)"
                    initial={{ cx: x1, cy: y1, opacity: 0 }}
                    animate={{ cx: x2, cy: y2, opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.4,
                      times: [0, 0.1, 0.85, 1],
                      ease: "easeInOut",
                    }}
                    style={{ filter: "drop-shadow(0 0 6px rgba(230, 165, 92, 0.9))" }}
                  />
                );
              })}

              {/* Domain nodes */}
              {domains.map((d) => {
                const x = (d.x / 100) * W;
                const y = (d.y / 100) * H;
                const inPath = activeScenario.path.includes(d.id);
                const pathIndex = activeScenario.path.indexOf(d.id);
                const fill =
                  d.tone === "atlas"
                    ? "#2DD4A8"
                    : d.tone === "amber"
                      ? "#E6A55C"
                      : d.tone === "plasma"
                        ? "#FF6B5B"
                        : "#AE93FF";

                return (
                  <g key={d.id}>
                    {/* Halo */}
                    <circle
                      cx={x}
                      cy={y}
                      r={inPath ? 38 : 26}
                      fill={fill}
                      opacity={inPath ? 0.15 : 0.05}
                    />
                    {inPath && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={28}
                        fill="none"
                        stroke={fill}
                        strokeWidth="1"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: pathIndex * 0.3 }}
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                    )}

                    {/* Core */}
                    <circle cx={x} cy={y} r="12" fill={fill} opacity="0.9" />
                    <circle cx={x} cy={y} r="6" fill="#0A0F1C" />
                    <circle cx={x} cy={y} r="3" fill={fill} />

                    {/* Path index */}
                    {inPath && (
                      <circle
                        cx={x + 14}
                        cy={y - 14}
                        r="9"
                        fill="#0A0F1C"
                        stroke={fill}
                        strokeWidth="1.5"
                      />
                    )}
                    {inPath && (
                      <text
                        x={x + 14}
                        y={y - 11}
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                        fill={fill}
                      >
                        {pathIndex + 1}
                      </text>
                    )}

                    {/* Short label */}
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                      fill="#0A0F1C"
                    >
                      {d.short}
                    </text>

                    {/* Full label */}
                    <text
                      x={x}
                      y={y + 32}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="Inter, sans-serif"
                      fontWeight={inPath ? 600 : 500}
                      fill={inPath ? "#FFFFFF" : "rgba(229, 234, 244, 0.7)"}
                    >
                      {d.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom legend */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-[11px] font-mono">
              <span className="flex items-center gap-2 text-steel-400">
                <span className="w-3 h-3 rounded-full bg-atlas-400" /> baseline domain
              </span>
              <span className="flex items-center gap-2 text-steel-400">
                <span className="w-3 h-3 rounded-full bg-amber-400" /> entangled / dual-use
              </span>
              <span className="flex items-center gap-2 text-steel-400">
                <span className="w-3 h-3 rounded-full bg-plasma-400" /> escalation-prone
              </span>
              <span className="flex items-center gap-2 text-steel-400">
                <span className="w-3 h-3 rounded-full bg-violet-300" /> interpretive layer
              </span>
            </div>
          </div>
        </Panel>
      </PanelGrid>

      <PanelGrid cols={2} className="mb-8">
        <Panel label="SCENARIO INTERPRETATION" statusTone="amber">
          <h3 className="font-display text-subheading text-white mb-3">{activeScenario.name}</h3>
          <p className="text-caption text-steel-300 leading-relaxed mb-5">{activeScenario.blurb}</p>

          <p className="tag-mono mb-3 text-amber-400">PROPAGATION CHAIN</p>
          <div className="flex flex-wrap items-center gap-2">
            {activeScenario.path.map((id, i) => {
              const d = domains.find((dd) => dd.id === id)!;
              const fillClass =
                d.tone === "atlas"
                  ? "border-atlas-500/40 text-atlas-300"
                  : d.tone === "amber"
                    ? "border-amber-500/40 text-amber-300"
                    : d.tone === "plasma"
                      ? "border-plasma-500/40 text-plasma-300"
                      : "border-violet-500/40 text-violet-300";
              return (
                <div key={id} className="flex items-center gap-2">
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-mono uppercase border ${fillClass} bg-black/30`}
                  >
                    {i + 1} · {d.short}
                  </div>
                  {i < activeScenario.path.length - 1 && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-amber-500">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel label="DOMAIN ROSTER" statusTone="atlas">
          <div className="space-y-3">
            {domains.map((d) => {
              const inPath = activeScenario.path.includes(d.id);
              const accent =
                d.tone === "atlas"
                  ? "text-atlas-400"
                  : d.tone === "amber"
                    ? "text-amber-400"
                    : d.tone === "plasma"
                      ? "text-plasma-400"
                      : "text-violet-300";
              return (
                <div
                  key={d.id}
                  className={`flex items-start gap-3 transition-opacity ${inPath ? "opacity-100" : "opacity-50"}`}
                >
                  <span className={`tag-mono ${accent} w-12 flex-shrink-0 mt-0.5`}>{d.short}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-caption text-white">{d.name}</p>
                    <p className="text-[11px] text-steel-500 leading-snug">{d.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </PanelGrid>
    </>
  );
}
