"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid, MetricBlock } from "@/components/observatory";

interface Stage {
  id: string;
  index: number;
  title: string;
  short: string;
  latency: string;
  latencyMs: number;
  attribution: number;
  escalationRisk: number;
  overrideWindow: string;
  confidenceDeg: number;
  doctrinalNote: string;
  exampleSystems: string[];
  tone: "atlas" | "amber" | "plasma";
}

const stages: Stage[] = [
  {
    id: "human",
    index: 0,
    title: "Human-Only Deliberation",
    short: "Analyst-driven response",
    latency: "12–72 h",
    latencyMs: 12 * 3600 * 1000,
    attribution: 78,
    escalationRisk: 18,
    overrideWindow: "Indefinite",
    confidenceDeg: 4,
    doctrinalNote:
      "Cold-War-era posture. Time-rich deliberation, contested findings before action. Attribution arrives before retaliation.",
    exampleSystems: ["Diplomatic démarche", "Intelligence community estimates", "Indictment process"],
    tone: "atlas",
  },
  {
    id: "augmented",
    index: 1,
    title: "Human + AI Decision Support",
    short: "AI-assisted, human-authorized",
    latency: "30 min – 6 h",
    latencyMs: 30 * 60 * 1000,
    attribution: 64,
    escalationRisk: 36,
    overrideWindow: "Reviewable",
    confidenceDeg: 14,
    doctrinalNote:
      "Current normative ceiling. AI accelerates analysis; humans retain final call. Confidence inferred from model-stated certainty, not validated independently.",
    exampleSystems: ["Sentinel detection pipelines", "Threat-hunt copilots", "ATT&CK classifiers"],
    tone: "atlas",
  },
  {
    id: "semi",
    index: 2,
    title: "Semi-Autonomous Response",
    short: "Pre-authorized response envelopes",
    latency: "5–60 s",
    latencyMs: 30 * 1000,
    attribution: 41,
    escalationRisk: 71,
    overrideWindow: "≤ 60 s · narrow",
    confidenceDeg: 38,
    doctrinalNote:
      "Active-defense doctrine. Pre-authorized countermeasures triggered on signature match. Override window often insufficient for human judgment.",
    exampleSystems: ["Persistent engagement platforms", "Auto-block firewall mesh", "Counter-UAS interceptors"],
    tone: "amber",
  },
  {
    id: "auton",
    index: 3,
    title: "Autonomous Retaliation",
    short: "Machine-to-machine escalation",
    latency: "0.1–2 s",
    latencyMs: 400,
    attribution: 22,
    escalationRisk: 92,
    overrideWindow: "None practical",
    confidenceDeg: 67,
    doctrinalNote:
      "Speculative-but-emerging tier. Autonomous AI command systems respond before human cognition completes. Retaliation occurs against attribution-uncertain target.",
    exampleSystems: ["Hypothetical AI-on-AI deterrence", "Autonomous swarm counter-targeting", "Algorithmic launch-on-warning"],
    tone: "plasma",
  },
];

export default function DecisionCompressionPage() {
  const [active, setActive] = useState<Stage>(stages[1]);

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-01"
        coordinate="47.4° N · 8.5° E"
        title="Decision Compression Layer"
        tagline="The collapse of deliberative time."
        description="As decision-making migrates from human deliberation to autonomous response, retaliation latency collapses by six orders of magnitude, while attribution certainty degrades and override windows narrow toward zero. Hover or select a tier."
        status="modeled"
      />

      {/* ═══ COMPRESSION SPECTRUM ═══ */}
      <Panel label="DECISION TIER · TEMPORAL SPECTRUM" status="active" className="mb-8">
        <div className="relative pt-6 pb-3">
          {/* Track */}
          <div className="relative h-1 bg-white/[0.04] rounded-full overflow-hidden">
            <div className="absolute inset-0 compress-bar opacity-80" />
          </div>

          {/* Stops */}
          <div className="relative grid grid-cols-4 mt-6">
            {stages.map((s) => {
              const isActive = active.id === s.id;
              const dotColor =
                s.tone === "atlas"
                  ? "bg-atlas-400 shadow-glow-sm"
                  : s.tone === "amber"
                    ? "bg-amber-400"
                    : "bg-plasma-400";
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s)}
                  className={`group relative flex flex-col items-center gap-3 cursor-pointer transition-all ${
                    isActive ? "scale-105" : ""
                  }`}
                >
                  <span
                    className={`absolute -top-12 w-3 h-3 rounded-full ${dotColor} ${
                      isActive ? "ring-4 ring-white/10" : "opacity-60 group-hover:opacity-100"
                    }`}
                  />
                  <span
                    className={`mt-0 tag-mono ${
                      isActive ? "text-white" : "text-steel-500 group-hover:text-steel-300"
                    }`}
                  >
                    TIER {s.index}
                  </span>
                  <span
                    className={`font-display text-caption text-center leading-tight ${
                      isActive ? "text-white" : "text-steel-400 group-hover:text-steel-200"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`tag-mono text-[10px] ${
                      s.tone === "atlas"
                        ? "text-atlas-400/80"
                        : s.tone === "amber"
                          ? "text-amber-400/90"
                          : "text-plasma-300"
                    }`}
                  >
                    {s.latency}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* ═══ ACTIVE TIER DASHBOARD ═══ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <PanelGrid cols={3} className="mb-8">
            <Panel label={`ACTIVE TIER · ${active.index}`} status={active.short} statusTone={active.tone}>
              <h3 className="font-display text-subheading text-white mb-3">{active.title}</h3>
              <p className="text-caption text-steel-300 leading-relaxed mb-5">
                {active.doctrinalNote}
              </p>
              <div className="space-y-2">
                <p className="tag-mono text-atlas-400/90">EXAMPLE SYSTEMS</p>
                {active.exampleSystems.map((sys) => (
                  <div key={sys} className="flex items-start gap-2">
                    <span className="text-atlas-500 mt-1">›</span>
                    <span className="text-caption text-steel-300">{sys}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel label="LATENCY · TIME-TO-RESPONSE">
              <MetricBlock
                label="Response latency"
                value={active.latency}
                tone={active.tone === "atlas" ? "atlas" : active.tone === "amber" ? "amber" : "plasma"}
                hint="Time from signal detection to retaliatory action initiated."
              />
              <div className="mt-6 obs-rule" />
              <div className="mt-6">
                <MetricBlock
                  label="Human override window"
                  value={active.overrideWindow}
                  tone="steel"
                  hint="Practical interval for human cancellation."
                />
              </div>
            </Panel>

            <Panel label="EPISTEMIC STATE" statusTone="violet">
              <MetricBlock
                label="Attribution confidence"
                value={`${active.attribution}%`}
                tone="violet"
                hint="Pre-action certainty about responsible actor."
              />
              <div className="mt-6 obs-rule" />
              <div className="mt-6">
                <MetricBlock
                  label="Confidence degradation"
                  value={`−${active.confidenceDeg} pts`}
                  tone="amber"
                  hint="Loss in attribution rigor vs. human-only baseline."
                />
              </div>
            </Panel>
          </PanelGrid>

          {/* Risk bar + override comparison */}
          <Panel label="ESCALATION RISK ENVELOPE" status={`${active.escalationRisk}% · ${active.tone === "plasma" ? "critical" : active.tone === "amber" ? "elevated" : "nominal"}`} statusTone={active.tone}>
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="tag-mono">UNINTENDED ESCALATION PROBABILITY</span>
                  <span className="font-display text-subheading text-white">
                    {active.escalationRisk}<span className="text-steel-500 text-caption font-sans ml-1">%</span>
                  </span>
                </div>
                <div className="relative h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${active.escalationRisk}%` }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      active.tone === "atlas"
                        ? "bg-atlas-400"
                        : active.tone === "amber"
                          ? "bg-amber-400"
                          : "bg-plasma-400"
                    }`}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[40%] w-px h-3 bg-white/30" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-px h-3 bg-amber-400/60" />
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] font-mono text-steel-600">
                  <span>0 · stable</span>
                  <span className="text-steel-500">40 · contested</span>
                  <span className="text-amber-500/80">70 · doctrinal threshold</span>
                  <span className="text-plasma-400/80">100 · runaway</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="tag-mono mb-1">DRIVER · CONFIDENCE LOSS</p>
                  <p className="text-caption text-steel-300 leading-relaxed">
                    Attribution moves from contested but adjudicable → unverifiable in operational time.
                  </p>
                </div>
                <div>
                  <p className="tag-mono mb-1">DRIVER · OVERRIDE COMPRESSION</p>
                  <p className="text-caption text-steel-300 leading-relaxed">
                    Window for human cancellation collapses below human cognitive minimum.
                  </p>
                </div>
                <div>
                  <p className="tag-mono mb-1">DRIVER · DELEGATION FORCING</p>
                  <p className="text-caption text-steel-300 leading-relaxed">
                    Tempo asymmetry pressures political leadership to pre-delegate authority.
                  </p>
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>
      </AnimatePresence>

      {/* ═══ COMPRESSION VISUAL ═══ */}
      <Panel label="LATENCY COMPRESSION · LOG-SCALE" className="mt-8">
        <CompressionLatencyVisual stages={stages} activeId={active.id} />
      </Panel>
    </>
  );
}

function CompressionLatencyVisual({ stages, activeId }: { stages: Stage[]; activeId: string }) {
  // Log scale from 0.1s to 72h
  const min = Math.log10(0.1);
  const max = Math.log10(72 * 3600);
  const labels = [
    { val: 0.1, label: "0.1s" },
    { val: 1, label: "1s" },
    { val: 60, label: "1min" },
    { val: 3600, label: "1h" },
    { val: 86400, label: "1d" },
    { val: 72 * 3600, label: "3d" },
  ];

  const project = (ms: number) => {
    const sec = ms / 1000;
    const v = Math.log10(Math.max(sec, 0.1));
    return ((v - min) / (max - min)) * 100;
  };

  return (
    <div className="relative">
      {/* Axis */}
      <div className="relative h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <div className="absolute inset-0 compress-bar opacity-50" />
      </div>
      <div className="relative h-8 mt-1">
        {labels.map((l) => {
          const x = ((Math.log10(l.val) - min) / (max - min)) * 100;
          return (
            <div
              key={l.label}
              className="absolute top-0 -translate-x-1/2 text-[10px] font-mono text-steel-500"
              style={{ left: `${x}%` }}
            >
              <span className="block w-px h-2 bg-steel-700 mx-auto mb-1" />
              {l.label}
            </div>
          );
        })}
      </div>

      {/* Tier markers */}
      <div className="relative h-32 mt-4">
        {stages.map((s, i) => {
          const x = project(s.latencyMs);
          const isActive = s.id === activeId;
          const color =
            s.tone === "atlas"
              ? "bg-atlas-400 border-atlas-300"
              : s.tone === "amber"
                ? "bg-amber-400 border-amber-300"
                : "bg-plasma-400 border-plasma-300";
          return (
            <div
              key={s.id}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${x}%`, opacity: isActive ? 1 : 0.55 }}
            >
              <div className="w-px h-8 bg-white/15" />
              <div
                className={`w-3 h-3 rounded-full ${color} border-2 ${
                  isActive ? "ring-4 ring-white/10 scale-125" : ""
                } transition-all`}
              />
              <span className="tag-mono mt-2 text-center max-w-[100px] leading-tight">
                T{i} · {s.title.split(" ")[0].toUpperCase()}
              </span>
            </div>
          );
        })}

        {/* Compression arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="comp-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(45, 212, 168, 0.5)" />
              <stop offset="60%" stopColor="rgba(230, 165, 92, 0.7)" />
              <stop offset="100%" stopColor="rgba(255, 107, 91, 0.9)" />
            </linearGradient>
          </defs>
          {stages.slice(0, -1).map((s, i) => {
            const x1 = project(s.latencyMs);
            const x2 = project(stages[i + 1].latencyMs);
            return (
              <line
                key={i}
                x1={`${x1}%`}
                y1="60%"
                x2={`${x2}%`}
                y2="60%"
                stroke="url(#comp-arrow)"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      <p className="mt-6 text-caption text-steel-400 leading-relaxed">
        <span className="text-amber-300">Reading:</span> Compression spans nearly six orders of magnitude.
        The transition from Tier 1 (augmented) to Tier 3 (autonomous) is not a continuous slope; it is a phase-shift in <span className="text-atlas-300">who, structurally, can be held accountable</span> for what occurred.
      </p>
    </div>
  );
}
