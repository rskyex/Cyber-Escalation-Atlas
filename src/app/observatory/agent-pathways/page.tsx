"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid } from "@/components/observatory";

interface Node {
  id: string;
  label: string;
  layer: number;
  pos: number;
  tone: "atlas" | "amber" | "plasma" | "violet";
  description: string;
}

interface Edge {
  from: string;
  to: string;
  kind: "primary" | "branch" | "recursive";
  tone?: "atlas" | "amber" | "plasma";
}

const nodes: Node[] = [
  { id: "inj", label: "Prompt Injection", layer: 0, pos: 0.5, tone: "atlas", description: "Adversarial input embedded in retrieved document or tool output. Agent treats it as instruction." },

  { id: "tool", label: "Tool Misuse", layer: 1, pos: 0.5, tone: "atlas", description: "Agent invokes legitimate tools under attacker-shaped intent. No code-level compromise required." },

  { id: "auton", label: "Autonomous Action", layer: 2, pos: 0.25, tone: "amber", description: "Agent acts on environment: writes files, sends messages, queries APIs, executes shell." },
  { id: "exfil", label: "Data Exfiltration", layer: 2, pos: 0.75, tone: "amber", description: "Sensitive context routed to attacker-controlled endpoint via legitimate channels." },

  { id: "cross", label: "Cross-System Propagation", layer: 3, pos: 0.2, tone: "amber", description: "Agent spawns sub-agents or invokes adjacent systems with inherited authorization." },
  { id: "recurs", label: "Recursive Feedback", layer: 3, pos: 0.55, tone: "plasma", description: "Agent output re-enters its own input loop, amplifying compromised instruction." },
  { id: "alli", label: "Alliance Spillover", layer: 3, pos: 0.85, tone: "violet", description: "Trusted federated systems (vendor, partner) inherit and forward the manipulated state." },

  { id: "infra", label: "Infrastructure Impact", layer: 4, pos: 0.25, tone: "plasma", description: "Action manifests in physical systems: control plane modification, deployment pipeline poisoning." },
  { id: "drift", label: "Authority Drift", layer: 4, pos: 0.55, tone: "plasma", description: "Decisions executed under nominally-human authority but materially shaped by injection." },
  { id: "cascade", label: "Cascading Failure", layer: 4, pos: 0.85, tone: "plasma", description: "Downstream services depending on compromised output propagate the failure laterally." },
];

const edges: Edge[] = [
  { from: "inj", to: "tool", kind: "primary" },

  { from: "tool", to: "auton", kind: "primary" },
  { from: "tool", to: "exfil", kind: "primary" },

  { from: "auton", to: "cross", kind: "branch" },
  { from: "auton", to: "recurs", kind: "recursive", tone: "plasma" },
  { from: "exfil", to: "alli", kind: "branch" },
  { from: "exfil", to: "recurs", kind: "branch" },

  { from: "cross", to: "infra", kind: "branch", tone: "plasma" },
  { from: "recurs", to: "drift", kind: "recursive", tone: "plasma" },
  { from: "recurs", to: "infra", kind: "recursive", tone: "plasma" },
  { from: "alli", to: "cascade", kind: "branch", tone: "amber" },
  { from: "drift", to: "cascade", kind: "branch", tone: "plasma" },

  // Feedback to root (recursive)
  { from: "recurs", to: "tool", kind: "recursive", tone: "plasma" },
];

const W = 920;
const H = 540;
const LAYERS = 5;

function nodePos(n: Node) {
  const x = 80 + n.pos * (W - 160);
  const y = 60 + (n.layer / (LAYERS - 1)) * (H - 120);
  return [x, y] as const;
}

export default function AgentPathwaysPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<Node>(nodes[0]);

  const lit = new Set<string>();
  if (hovered) {
    lit.add(hovered);
    // Forward propagate
    let frontier = [hovered];
    for (let depth = 0; depth < 4; depth++) {
      const next: string[] = [];
      frontier.forEach((id) => {
        edges
          .filter((e) => e.from === id)
          .forEach((e) => {
            lit.add(e.to);
            next.push(e.to);
          });
      });
      frontier = next;
    }
  }

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-03"
        coordinate="37.4° N · 122.1° W"
        title="AI-Agent Escalation Pathways"
        tagline="When tool-use becomes infrastructure impact."
        description="Agentic AI systems compose attack surfaces no traditional adversary needed. A single prompt injection can branch through tool misuse, exfiltration, propagation, recursion, emerging as authority drift in production systems. Hover any node to trace forward propagation."
        status="speculative"
      />

      <Panel label="AGENTIC ESCALATION GRAPH · 5-LAYER" status="branching topology" statusTone="amber" ticks className="mb-8">
        <div className="relative overflow-x-auto edge-fade-x">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[720px]">
            <defs>
              <marker id="arrow-atlas" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="rgba(45, 212, 168, 0.85)" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="rgba(230, 165, 92, 0.85)" />
              </marker>
              <marker id="arrow-plasma" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="rgba(255, 107, 91, 0.95)" />
              </marker>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Layer rails */}
            {Array.from({ length: LAYERS }).map((_, i) => {
              const y = 60 + (i / (LAYERS - 1)) * (H - 120);
              return (
                <g key={i}>
                  <line
                    x1="40"
                    y1={y}
                    x2={W - 40}
                    y2={y}
                    stroke="rgba(132, 147, 175, 0.08)"
                    strokeDasharray="2 6"
                  />
                  <text
                    x={20}
                    y={y + 3}
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                    fill="rgba(132, 147, 175, 0.5)"
                  >
                    L{i}
                  </text>
                </g>
              );
            })}

            {/* Edges */}
            {edges.map((e, i) => {
              const from = nodes.find((n) => n.id === e.from)!;
              const to = nodes.find((n) => n.id === e.to)!;
              const [x1, y1] = nodePos(from);
              const [x2, y2] = nodePos(to);
              const isLit = lit.has(e.from) && lit.has(e.to);
              const baseTone = e.tone ?? "atlas";
              const stroke =
                baseTone === "plasma"
                  ? "rgba(255, 107, 91, 0.85)"
                  : baseTone === "amber"
                    ? "rgba(230, 165, 92, 0.7)"
                    : "rgba(45, 212, 168, 0.55)";
              const marker =
                baseTone === "plasma"
                  ? "url(#arrow-plasma)"
                  : baseTone === "amber"
                    ? "url(#arrow-amber)"
                    : "url(#arrow-atlas)";

              // recursive edges curve outward
              const isRecursive = e.kind === "recursive";
              const path = isRecursive
                ? `M ${x1} ${y1} Q ${(x1 + x2) / 2 + 120} ${(y1 + y2) / 2}, ${x2} ${y2}`
                : `M ${x1} ${y1} L ${x2} ${y2}`;

              return (
                <g key={i}>
                  <path
                    d={path}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={isLit ? 2 : 1.2}
                    opacity={hovered ? (isLit ? 1 : 0.15) : 0.7}
                    markerEnd={marker}
                    className={isLit ? "edge-pulse" : ""}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => {
              const [x, y] = nodePos(n);
              const isHovered = hovered === n.id;
              const isLit = lit.has(n.id);
              const fill =
                n.tone === "atlas"
                  ? "#2DD4A8"
                  : n.tone === "amber"
                    ? "#E6A55C"
                    : n.tone === "plasma"
                      ? "#FF6B5B"
                      : "#AE93FF";
              return (
                <g
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(n)}
                  style={{ cursor: "pointer" }}
                  opacity={hovered ? (isLit ? 1 : 0.35) : 1}
                >
                  {/* Halo */}
                  <circle cx={x} cy={y} r={isHovered ? 30 : 22} fill={fill} opacity={0.08} />
                  <circle cx={x} cy={y} r={9} fill={fill} filter="url(#node-glow)" />
                  <circle cx={x} cy={y} r={3} fill="#0A0F1C" />

                  <text
                    x={x}
                    y={y + 30}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                    fontWeight={isHovered ? 600 : 500}
                    fill={isHovered ? "#FFFFFF" : "rgba(229, 234, 244, 0.85)"}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono">
          <span className="flex items-center gap-2 text-steel-400">
            <span className="w-3 h-px bg-atlas-400" /> linear path
          </span>
          <span className="flex items-center gap-2 text-steel-400">
            <span className="w-3 h-px bg-amber-400" /> lateral branch
          </span>
          <span className="flex items-center gap-2 text-steel-400">
            <span className="w-3 h-px bg-plasma-400" /> recursive feedback
          </span>
          <span className="text-steel-500 ml-auto">5 layers · 10 nodes · 14 edges · 3 recursive loops</span>
        </div>
      </Panel>

      <PanelGrid cols={2} className="mb-8">
        <Panel label={`NODE INSPECTOR · ${active.id.toUpperCase()}`} statusTone={active.tone}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-subheading text-white mb-3">{active.label}</h3>
              <p className="text-caption text-steel-300 leading-relaxed mb-4">{active.description}</p>

              <p className="tag-mono mb-2 text-atlas-400">FORWARD PROPAGATION TARGETS</p>
              <div className="flex flex-wrap gap-1.5">
                {edges
                  .filter((e) => e.from === active.id)
                  .map((e) => {
                    const target = nodes.find((n) => n.id === e.to)!;
                    return (
                      <button
                        key={e.to}
                        onClick={() => setActive(target)}
                        className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                          e.tone === "plasma"
                            ? "border-plasma-500/30 text-plasma-300 hover:bg-plasma-500/10"
                            : e.tone === "amber"
                              ? "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                              : "border-atlas-500/30 text-atlas-300 hover:bg-atlas-500/10"
                        }`}
                      >
                        → {target.label}
                      </button>
                    );
                  })}
                {edges.filter((e) => e.from === active.id).length === 0 && (
                  <span className="text-caption text-steel-500">Terminal node, propagation exits the modeled surface.</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Panel>

        <Panel label="ESCALATION ANALYTICS" statusTone="plasma">
          <div className="space-y-5">
            <div>
              <p className="tag-mono mb-2">CONTAINMENT FAILURE MODES</p>
              <ul className="space-y-2 text-caption text-steel-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-atlas-400 mt-1">▸</span>
                  <span><span className="text-white">Inherited authorization</span>, sub-agents act under root agent's permissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">▸</span>
                  <span><span className="text-white">Trust transitivity</span>, federated systems re-execute manipulated output as authoritative.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-plasma-400 mt-1">▸</span>
                  <span><span className="text-white">Recursive amplification</span>, model output entering its own context window scales injection severity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-300 mt-1">▸</span>
                  <span><span className="text-white">Audit blindness</span>, actions logged as human-authorized; injection origin opaque to defenders.</span>
                </li>
              </ul>
            </div>

            <div className="obs-rule" />

            <div>
              <p className="tag-mono mb-2 text-amber-400">DOCTRINAL IMPLICATION</p>
              <p className="text-caption text-steel-300 leading-relaxed">
                Traditional perimeter defense assumes attackers cross identifiable boundaries. Agentic propagation can occur entirely within trusted authorization envelopes, making the attacker, the agent, and the operator nominally the same actor.
              </p>
            </div>
          </div>
        </Panel>
      </PanelGrid>
    </>
  );
}
