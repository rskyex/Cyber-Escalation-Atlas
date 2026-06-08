"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid, MetricBlock } from "@/components/observatory";

interface Stream {
  id: string;
  name: string;
  axis: string;
  authority: string;
  baseline: number;
  description: string;
  tone: "atlas" | "amber" | "plasma" | "violet";
}

const streams: Stream[] = [
  {
    id: "tech",
    name: "Technical Attribution",
    axis: "TECH",
    authority: "Threat-intel vendors · IR firms",
    baseline: 72,
    description: "Indicator-of-compromise overlap, infrastructure reuse, code lineage, operational tradecraft.",
    tone: "atlas",
  },
  {
    id: "intel",
    name: "Intelligence Attribution",
    axis: "INT",
    authority: "Signals + human intelligence services",
    baseline: 81,
    description: "Compartmented sources rarely released publicly. Highest confidence, lowest legitimacy.",
    tone: "violet",
  },
  {
    id: "pol",
    name: "Political Attribution",
    axis: "POL",
    authority: "Executive · diplomatic statements",
    baseline: 58,
    description: "Public naming decisions shaped by alliance dynamics, deterrence theory, domestic politics.",
    tone: "amber",
  },
  {
    id: "pub",
    name: "Public / Media Attribution",
    axis: "PUB",
    authority: "Press · researchers · open source",
    baseline: 44,
    description: "Operates on incomplete evidence with rapid news cycles. High visibility, contested rigor.",
    tone: "plasma",
  },
  {
    id: "alli",
    name: "Alliance Attribution",
    axis: "ALY",
    authority: "Five Eyes · NATO · coalition partners",
    baseline: 67,
    description: "Joint statements signal coordination but mask underlying disagreements about evidence.",
    tone: "atlas",
  },
];

const cases = [
  {
    id: "notpetya",
    name: "NotPetya",
    year: 2017,
    confidences: { tech: 92, intel: 88, pol: 71, pub: 58, alli: 76 },
    contested: "Cost: Maersk + Merck claimed damages, insurers invoked 'act of war' exclusion.",
  },
  {
    id: "solarwinds",
    name: "SolarWinds",
    year: 2020,
    confidences: { tech: 84, intel: 90, pol: 78, pub: 62, alli: 71 },
    contested: "Espionage vs. attack threshold contested; sanctions delayed pending intent assessment.",
  },
  {
    id: "viasat",
    name: "Viasat KA-SAT",
    year: 2022,
    confidences: { tech: 79, intel: 83, pol: 81, pub: 51, alli: 77 },
    contested: "Joint attribution from US+EU+UK; cross-domain (cyber + space) complicated framing.",
  },
  {
    id: "anonymous",
    name: "Anonymous-Source · 2024",
    year: 2024,
    confidences: { tech: 41, intel: 55, pol: 28, pub: 67, alli: 18 },
    contested: "Media named state actor 6 weeks before intelligence community reached consensus.",
  },
];

export default function AttributionFieldPage() {
  const [activeCase, setActiveCase] = useState(cases[0]);
  const [overrides, setOverrides] = useState<Record<string, number>>({});

  const getValue = (streamId: string) =>
    overrides[streamId] ?? activeCase.confidences[streamId as keyof typeof activeCase.confidences];

  const spreads = streams.map((s) => getValue(s.id));
  const variance =
    Math.max(...spreads) - Math.min(...spreads);
  const mean = Math.round(spreads.reduce((a, b) => a + b, 0) / spreads.length);

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-02"
        coordinate="38.9° N · 77.0° W"
        title="Attribution Confidence Field"
        tagline="Who has authority to define responsibility?"
        description="Attribution is never singular. Five independent streams converge, or contest, on the question of state responsibility, each with its own evidentiary logic, audience, and political weight. The variance between them is where authority gets allocated."
        status="modeled"
      />

      {/* ═══ CASE SELECTOR ═══ */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="tag-mono mr-2">CASE FIELD ·</span>
        {cases.map((c) => {
          const isActive = activeCase.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCase(c);
                setOverrides({});
              }}
              className={`px-3 py-1.5 rounded-md text-caption transition-all border ${
                isActive
                  ? "bg-atlas-500/20 border-atlas-500/40 text-atlas-200"
                  : "bg-white/[0.02] border-white/[0.05] text-steel-400 hover:text-white hover:border-atlas-500/20"
              }`}
            >
              {c.name} <span className="text-steel-500 ml-1">{c.year}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ ATTRIBUTION POLYGON ═══ */}
      <PanelGrid cols={2} className="mb-8">
        <Panel label="FIVE-AXIS ATTRIBUTION POLYGON" status="contested" statusTone="violet" ticks>
          <AttributionPolygon streams={streams} values={streams.map((s) => getValue(s.id))} />
          <p className="mt-4 text-caption text-steel-400 leading-relaxed">
            <span className="text-amber-300">Reading:</span> A symmetric polygon signals consensus. Asymmetry exposes contested terrain, where one authority claims certainty another has not validated.
          </p>
        </Panel>

        <Panel label="FIELD STATISTICS" status="live">
          <PanelGrid cols={2}>
            <MetricBlock
              label="Mean confidence"
              value={`${mean}%`}
              tone="atlas"
              hint="Cross-stream average."
            />
            <MetricBlock
              label="Stream variance"
              value={`${variance}`}
              unit="pts"
              tone={variance > 30 ? "plasma" : variance > 15 ? "amber" : "atlas"}
              hint="Max − min spread. > 30 = contested."
            />
            <MetricBlock
              label="Highest authority"
              value={streams.find((s) => getValue(s.id) === Math.max(...spreads))?.axis ?? "—"}
              tone="violet"
              hint="Stream claiming greatest certainty."
            />
            <MetricBlock
              label="Lowest authority"
              value={streams.find((s) => getValue(s.id) === Math.min(...spreads))?.axis ?? "—"}
              tone="amber"
              hint="Stream contesting consensus."
            />
          </PanelGrid>

          <div className="obs-rule my-6" />

          <p className="tag-mono text-amber-400 mb-2">CONTESTED INTERPRETATION</p>
          <p className="text-caption text-steel-300 leading-relaxed">{activeCase.contested}</p>
        </Panel>
      </PanelGrid>

      {/* ═══ STREAM SLIDERS ═══ */}
      <Panel label="STREAM MODULATION · DRAG TO RE-WEIGHT" status="interactive" className="mb-8">
        <p className="text-caption text-steel-400 mb-5">
          The question is not which stream is correct, but who is heard. Adjust each stream and watch the polygon, and the authority gap, reshape.
        </p>
        <div className="space-y-5">
          {streams.map((s) => {
            const v = getValue(s.id);
            const baseline = s.baseline;
            const drift = v - baseline;
            return (
              <div key={s.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 sm:col-span-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`tag-mono ${
                        s.tone === "atlas"
                          ? "text-atlas-400"
                          : s.tone === "amber"
                            ? "text-amber-400"
                            : s.tone === "plasma"
                              ? "text-plasma-400"
                              : "text-violet-300"
                      }`}
                    >
                      {s.axis}
                    </span>
                    <span className="font-display text-caption text-white">{s.name}</span>
                  </div>
                  <p className="text-[11px] text-steel-500 mt-0.5">{s.authority}</p>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={v}
                    onChange={(e) =>
                      setOverrides((o) => ({ ...o, [s.id]: Number(e.target.value) }))
                    }
                    className="w-full accent-atlas-500"
                  />
                  <div className="relative h-1 -mt-2 pointer-events-none">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-amber-400/60"
                      style={{ left: `${baseline}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-2 flex items-center justify-end gap-2">
                  <span className="font-display text-subheading text-white">{v}</span>
                  <span className="tag-mono">%</span>
                  <span
                    className={`tag-mono ml-1 ${
                      Math.abs(drift) < 2
                        ? "text-steel-600"
                        : drift > 0
                          ? "text-atlas-400"
                          : "text-plasma-400"
                    }`}
                  >
                    {drift > 0 ? `+${drift}` : drift}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ═══ AUTHORITY GAP ═══ */}
      <Panel label="AUTHORITY GAP · WHO DEFINES RESPONSIBILITY" statusTone="violet">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div>
            <p className="font-editorial italic text-body-lg text-amber-300/80 leading-snug mb-3">
              &ldquo;The fact of an attack is not the same as the authority to name it.&rdquo;
            </p>
            <p className="text-caption text-steel-400 leading-relaxed">
              In every major case, attribution traveled an institutional path: from incident response, to intelligence consensus, to political timing, to public release. Each handoff is a re-attribution.
            </p>
          </div>
          <div>
            <p className="tag-mono mb-2 text-atlas-400">EVIDENCE ASYMMETRY</p>
            <p className="text-caption text-steel-300 leading-relaxed">
              Streams with highest confidence (intelligence) often have lowest releasability. Streams with highest legitimacy (alliance) often have lowest evidence access. The seam between them is the political process.
            </p>
          </div>
          <div>
            <p className="tag-mono mb-2 text-violet-300">TEMPORAL CONTESTATION</p>
            <p className="text-caption text-steel-300 leading-relaxed">
              Media attribution typically arrives weeks before intelligence concurrence. The result: narrative authority precedes evidentiary authority. Retraction is structurally rare.
            </p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function AttributionPolygon({ streams, values }: { streams: Stream[]; values: number[] }) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = streams.length;

  const point = (i: number, val: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const dist = r * (val / 100);
    return [cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist] as const;
  };

  const axisPoint = (i: number, distFactor = 1) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + Math.cos(angle) * r * distFactor, cy + Math.sin(angle) * r * distFactor] as const;
  };

  const polygonPoints = values.map((v, i) => point(i, v).join(",")).join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
        <defs>
          <radialGradient id="poly-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(45, 212, 168, 0.35)" />
            <stop offset="70%" stopColor="rgba(139, 107, 255, 0.12)" />
            <stop offset="100%" stopColor="rgba(255, 107, 91, 0.04)" />
          </radialGradient>
          <filter id="poly-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Reference rings */}
        {[0.25, 0.5, 0.75, 1].map((f, idx) => (
          <polygon
            key={f}
            points={Array.from({ length: n })
              .map((_, i) => axisPoint(i, f).join(","))
              .join(" ")}
            fill="none"
            stroke="rgba(132, 147, 175, 0.08)"
            strokeWidth={idx === 3 ? 1 : 0.5}
            strokeDasharray={idx === 3 ? "" : "2 4"}
          />
        ))}

        {/* Confidence labels on rings */}
        {[0.25, 0.5, 0.75].map((f) => (
          <text
            key={f}
            x={cx + 4}
            y={cy - r * f}
            fill="rgba(132, 147, 175, 0.5)"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
          >
            {Math.round(f * 100)}
          </text>
        ))}

        {/* Axes */}
        {streams.map((s, i) => {
          const [x, y] = axisPoint(i, 1);
          return (
            <line
              key={s.id}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(132, 147, 175, 0.12)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="url(#poly-fill)"
          stroke="rgba(45, 212, 168, 0.7)"
          strokeWidth="1.5"
          filter="url(#poly-glow)"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Vertex dots */}
        {values.map((v, i) => {
          const [x, y] = point(i, v);
          const s = streams[i];
          const color =
            s.tone === "atlas"
              ? "#2DD4A8"
              : s.tone === "amber"
                ? "#E6A55C"
                : s.tone === "plasma"
                  ? "#FF6B5B"
                  : "#AE93FF";
          return (
            <motion.circle
              key={s.id}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          );
        })}

        {/* Axis labels */}
        {streams.map((s, i) => {
          const [x, y] = axisPoint(i, 1.15);
          return (
            <text
              key={s.id + "-l"}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={
                s.tone === "atlas"
                  ? "#2DD4A8"
                  : s.tone === "amber"
                    ? "#E6A55C"
                    : s.tone === "plasma"
                      ? "#FF6B5B"
                      : "#AE93FF"
              }
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.1em"
            >
              {s.axis}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
