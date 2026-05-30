"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid } from "@/components/observatory";

interface Actor {
  id: string;
  name: string;
  role: string;
  tone: "atlas" | "amber" | "plasma" | "violet";
  description: string;
}

const actors: Actor[] = [
  { id: "analyst", name: "Analyst", role: "Interprets signal", tone: "atlas", description: "Trained human interprets ambiguous indicators, applies tradecraft, drafts assessment with confidence statements." },
  { id: "ai", name: "AI System", role: "Prioritises options", tone: "violet", description: "Models score and rank possible interpretations and responses. Stated confidence rarely independently validated." },
  { id: "command", name: "Operational Command", role: "Authorises response", tone: "amber", description: "Military or agency leadership decides whether and how to respond within delegated authority envelope." },
  { id: "auton", name: "Autonomous Executor", role: "Executes action", tone: "plasma", description: "Pre-authorized automated system carries out the response. May commence before human authorization concludes." },
  { id: "political", name: "Political Leadership", role: "Defines meaning", tone: "amber", description: "Executive and legislative branches determine public framing, attribution, retaliation thresholds." },
  { id: "public", name: "Public / Press", role: "Legitimates narrative", tone: "violet", description: "Mediated narrative shapes which interpretation becomes politically actionable." },
];

interface Phase {
  id: string;
  name: string;
  description: string;
  authorityAlloc: { actor: string; weight: number }[];
}

const phases: Phase[] = [
  {
    id: "detect",
    name: "Detection",
    description: "Signal observed. Interpretive frame still open.",
    authorityAlloc: [
      { actor: "analyst",   weight: 45 },
      { actor: "ai",        weight: 40 },
      { actor: "command",   weight: 10 },
      { actor: "auton",     weight: 5  },
      { actor: "political", weight: 0  },
      { actor: "public",    weight: 0  },
    ],
  },
  {
    id: "classify",
    name: "Classification",
    description: "Signal is sorted into a category. Interpretive authority concentrates.",
    authorityAlloc: [
      { actor: "analyst",   weight: 35 },
      { actor: "ai",        weight: 45 },
      { actor: "command",   weight: 15 },
      { actor: "auton",     weight: 0  },
      { actor: "political", weight: 5  },
      { actor: "public",    weight: 0  },
    ],
  },
  {
    id: "authorize",
    name: "Authorisation",
    description: "Decision to act. The authority that matters now is delegation-state, not deliberation.",
    authorityAlloc: [
      { actor: "analyst",   weight: 10 },
      { actor: "ai",        weight: 15 },
      { actor: "command",   weight: 45 },
      { actor: "auton",     weight: 5  },
      { actor: "political", weight: 25 },
      { actor: "public",    weight: 0  },
    ],
  },
  {
    id: "execute",
    name: "Execution",
    description: "Response is enacted. Autonomous systems compress execution under prior authorisation.",
    authorityAlloc: [
      { actor: "analyst",   weight: 0  },
      { actor: "ai",        weight: 15 },
      { actor: "command",   weight: 20 },
      { actor: "auton",     weight: 60 },
      { actor: "political", weight: 5  },
      { actor: "public",    weight: 0  },
    ],
  },
  {
    id: "frame",
    name: "Public Framing",
    description: "Narrative settles. Interpretive authority migrates to legitimacy producers.",
    authorityAlloc: [
      { actor: "analyst",   weight: 5  },
      { actor: "ai",        weight: 5  },
      { actor: "command",   weight: 10 },
      { actor: "auton",     weight: 0  },
      { actor: "political", weight: 40 },
      { actor: "public",    weight: 40 },
    ],
  },
  {
    id: "accountability",
    name: "Accountability",
    description: "Retrospective: who, after the fact, is held to answer? Often least where authority operated most.",
    authorityAlloc: [
      { actor: "analyst",   weight: 5  },
      { actor: "ai",        weight: 0  },
      { actor: "command",   weight: 25 },
      { actor: "auton",     weight: 0  },
      { actor: "political", weight: 40 },
      { actor: "public",    weight: 30 },
    ],
  },
];

export default function AuthorityPage() {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const activePhase = phases[activePhaseIdx];

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-07"
        coordinate="Authority · Σ"
        title="Human-Machine Authority Layer"
        tagline="Authority transfers faster than accountability."
        description="Across the lifecycle of any incident, interpretive and executive authority migrates between six actors — analyst, AI system, command, autonomous executor, political leadership, public. Where authority lives at each phase shapes who can be answerable later."
        status="modeled"
      />

      {/* ═══ PHASE TIMELINE ═══ */}
      <Panel label="AUTHORITY MIGRATION · 6-PHASE LIFECYCLE" status={activePhase.name.toLowerCase()} statusTone="violet" className="mb-8">
        <div className="grid grid-cols-6 gap-2">
          {phases.map((p, i) => {
            const isActive = activePhaseIdx === i;
            return (
              <button
                key={p.id}
                onClick={() => setActivePhaseIdx(i)}
                className={`group relative flex flex-col items-center gap-2 cursor-pointer transition-all py-3 rounded-md border ${
                  isActive
                    ? "border-violet-500/40 bg-violet-500/10"
                    : "border-transparent hover:border-white/[0.08] hover:bg-white/[0.02]"
                }`}
              >
                <span className={`tag-mono ${isActive ? "text-violet-300" : "text-steel-500"}`}>
                  PHASE {i + 1}
                </span>
                <span
                  className={`text-caption font-display leading-tight text-center ${
                    isActive ? "text-white" : "text-steel-400 group-hover:text-white"
                  }`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="obs-rule mt-6 mb-6" />

        <p className="text-caption text-steel-300 leading-relaxed">
          <span className="text-violet-300">{activePhase.name}:</span> {activePhase.description}
        </p>
      </Panel>

      {/* ═══ AUTHORITY ALLOCATION ═══ */}
      <PanelGrid cols={2} className="mb-8">
        <Panel label="AUTHORITY DISTRIBUTION" status="6 actors" statusTone="violet" ticks>
          <p className="text-caption text-steel-400 mb-5">
            Width of each band shows proportional interpretive / executive authority held by that actor during this phase.
          </p>
          <div className="space-y-3">
            {activePhase.authorityAlloc.map((alloc) => {
              const actor = actors.find((a) => a.id === alloc.actor)!;
              const fill =
                actor.tone === "atlas"
                  ? "rgb(45, 212, 168)"
                  : actor.tone === "amber"
                    ? "rgb(230, 165, 92)"
                    : actor.tone === "plasma"
                      ? "rgb(255, 107, 91)"
                      : "rgb(174, 147, 255)";

              return (
                <div key={alloc.actor}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display text-caption"
                        style={{ color: alloc.weight > 5 ? fill : "rgb(132, 147, 175)" }}
                      >
                        {actor.name}
                      </span>
                      <span className="tag-mono">{actor.role}</span>
                    </div>
                    <span className="font-display text-caption text-white">
                      {alloc.weight}<span className="text-steel-500 ml-0.5 text-[10px]">%</span>
                    </span>
                  </div>
                  <div className="relative h-2 bg-white/[0.03] rounded-full overflow-hidden">
                    <motion.div
                      key={`${activePhase.id}-${alloc.actor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${alloc.weight}%` }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${fill}99, ${fill}cc)`,
                        boxShadow: alloc.weight > 30 ? `0 0 12px ${fill}40` : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel label="AUTHORITY FLOW · SANKEY" status="across phases" statusTone="atlas">
          <AuthoritySankey phases={phases} actors={actors} activePhaseIdx={activePhaseIdx} />
        </Panel>
      </PanelGrid>

      <Panel label="STRUCTURAL READING" statusTone="violet">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <p className="font-editorial italic text-body-lg text-amber-300/80 leading-snug mb-3">
              &ldquo;Authority migrates. Accountability does not.&rdquo;
            </p>
            <p className="text-caption text-steel-300 leading-relaxed">
              The autonomous executor holds 60% of operational authority during the Execution phase — and zero percent in the Accountability phase. Authority that cannot be answerable is structural impunity, not delegation.
            </p>
          </div>
          <div>
            <p className="tag-mono mb-2 text-atlas-400">DESIGN QUESTION</p>
            <p className="text-caption text-steel-300 leading-relaxed">
              The central design question facing machine-speed institutions is not <span className="text-amber-300">whether</span> AI systems should hold authority — they already do — but <span className="text-atlas-300">at which phases authority should transfer back</span> to actors who can be examined retrospectively.
            </p>
          </div>
          <div>
            <p className="tag-mono mb-2 text-plasma-400">RECURRING PATTERN</p>
            <p className="text-caption text-steel-300 leading-relaxed">
              In observed cases, authority concentrates where deliberation is unstructured (Classification, Framing) and disperses where execution is automated (Execution, Authorisation). The dispersion is what makes outcomes feel unowned.
            </p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function AuthoritySankey({
  phases,
  actors,
  activePhaseIdx,
}: {
  phases: Phase[];
  actors: Actor[];
  activePhaseIdx: number;
}) {
  const W = 460;
  const H = 280;
  const padding = 8;
  const colW = (W - padding * 2) / phases.length;

  const toneColor = (tone: Actor["tone"]) =>
    tone === "atlas"
      ? "rgba(45, 212, 168, 0.7)"
      : tone === "amber"
        ? "rgba(230, 165, 92, 0.7)"
        : tone === "plasma"
          ? "rgba(255, 107, 91, 0.75)"
          : "rgba(174, 147, 255, 0.7)";

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H + 40}`} className="w-full">
        {/* Background phase columns */}
        {phases.map((p, i) => {
          const x = padding + i * colW;
          const isActive = i === activePhaseIdx;
          return (
            <g key={p.id}>
              <rect
                x={x}
                y={0}
                width={colW - 4}
                height={H}
                fill={isActive ? "rgba(174, 147, 255, 0.05)" : "rgba(255, 255, 255, 0.012)"}
                rx="2"
              />
              <text
                x={x + (colW - 4) / 2}
                y={H + 14}
                textAnchor="middle"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fill={isActive ? "rgba(174, 147, 255, 1)" : "rgba(132, 147, 175, 0.7)"}
              >
                P{i + 1}
              </text>
              <text
                x={x + (colW - 4) / 2}
                y={H + 26}
                textAnchor="middle"
                fontSize="9"
                fontFamily="Inter, sans-serif"
                fill={isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(132, 147, 175, 0.5)"}
              >
                {p.name.slice(0, 8)}
              </text>
            </g>
          );
        })}

        {/* Stacked authority bars per phase */}
        {phases.map((p, i) => {
          const x = padding + i * colW + 4;
          let y = 8;
          const totalH = H - 16;
          return p.authorityAlloc.map((alloc) => {
            const actor = actors.find((a) => a.id === alloc.actor)!;
            const h = (alloc.weight / 100) * totalH;
            const rect = (
              <rect
                key={`${p.id}-${alloc.actor}`}
                x={x}
                y={y}
                width={colW - 12}
                height={Math.max(0, h - 1)}
                fill={toneColor(actor.tone)}
                opacity={i === activePhaseIdx ? 1 : 0.5}
              />
            );
            y += h;
            return rect;
          });
        })}

        {/* Connecting ribbons */}
        {phases.slice(0, -1).map((p, i) => {
          const x1 = padding + i * colW + colW - 8;
          const x2 = padding + (i + 1) * colW + 4;
          let y1 = 8;
          let y2 = 8;
          const totalH = H - 16;

          return actors.map((actor) => {
            const a1 = p.authorityAlloc.find((a) => a.actor === actor.id)!;
            const a2 = phases[i + 1].authorityAlloc.find((a) => a.actor === actor.id)!;
            const h1 = (a1.weight / 100) * totalH;
            const h2 = (a2.weight / 100) * totalH;
            const path = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2} L ${x2} ${y2 + h2} C ${(x1 + x2) / 2} ${y2 + h2}, ${(x1 + x2) / 2} ${y1 + h1}, ${x1} ${y1 + h1} Z`;
            const node = (
              <path
                key={`r-${i}-${actor.id}`}
                d={path}
                fill={toneColor(actor.tone)}
                opacity={i === activePhaseIdx || i + 1 === activePhaseIdx ? 0.45 : 0.15}
              />
            );
            y1 += h1;
            y2 += h2;
            return node;
          });
        })}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {actors.map((a) => (
          <div key={a.id} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: toneColor(a.tone) }}
            />
            <span className="text-[11px] text-steel-400">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
