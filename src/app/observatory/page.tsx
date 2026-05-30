"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const layers = [
  {
    coord: "L-01",
    coordinate: "47.4° N · 8.5° E",
    title: "Decision Compression",
    tagline: "The collapse of deliberative time.",
    href: "/observatory/compression",
    description:
      "How AI compresses retaliation timelines from days to seconds. Four-stage transition from human-only deliberation to autonomous response, with attribution-confidence degradation tracked at each stage.",
    metric: "0.4s",
    metricLabel: "autonomous tier latency",
    tone: "atlas",
  },
  {
    coord: "L-02",
    coordinate: "38.9° N · 77.0° W",
    title: "Attribution Field",
    tagline: "Who has authority to define responsibility?",
    href: "/observatory/attribution-field",
    description:
      "Beyond binary attribution. Five fragmented attribution streams — technical, intelligence, political, public, alliance — each with independent confidence and contested timing.",
    metric: "5",
    metricLabel: "contested attribution streams",
    tone: "violet",
  },
  {
    coord: "L-03",
    coordinate: "37.4° N · 122.1° W",
    title: "Agent Pathways",
    tagline: "When tool-use becomes infrastructure impact.",
    href: "/observatory/agent-pathways",
    description:
      "Agentic AI escalation chains. Prompt injection cascading through tool misuse, autonomous action, cross-system propagation, and recursive feedback loops.",
    metric: "6→∞",
    metricLabel: "branching propagation depth",
    tone: "plasma",
  },
  {
    coord: "L-04",
    coordinate: "Cross-Domain · Global",
    title: "Cross-Domain Map",
    tagline: "Escalation refuses domain boundaries.",
    href: "/observatory/cross-domain",
    description:
      "Live propagation across cyber, space, nuclear, AI command, information, financial, and autonomous-weapons domains. Pulses signal cross-contamination events.",
    metric: "7",
    metricLabel: "interlocked domains",
    tone: "atlas",
  },
  {
    coord: "L-05",
    coordinate: "Temporal · Δt",
    title: "Escalation Tempo",
    tagline: "Machine-speed becomes physically visible.",
    href: "/observatory/tempo",
    description:
      "Tempo comparator across six time-scales. Side-by-side: AI agents (seconds), nuclear warning (minutes), cyber espionage (months), sanctions (weeks).",
    metric: "10⁶×",
    metricLabel: "tempo asymmetry: AI vs. diplomacy",
    tone: "amber",
  },
  {
    coord: "L-06",
    coordinate: "Institutional · Δ",
    title: "Governance Cascade",
    tagline: "Where institutions fail in slow motion.",
    href: "/observatory/governance-cascade",
    description:
      "Procedural collapse sequence: signal detected → misclassification → authority ambiguity → automation continuation → retaliatory escalation. Replay any breakdown.",
    metric: "6",
    metricLabel: "cascade failure modes",
    tone: "plasma",
  },
  {
    coord: "L-07",
    coordinate: "Authority · Σ",
    title: "Human-Machine Authority",
    tagline: "Authority transfers faster than accountability.",
    href: "/observatory/authority",
    description:
      "Authority transition diagrams. Who holds interpretive authority at each phase: analyst, AI prioritizer, autonomous executor, political leadership.",
    metric: "4",
    metricLabel: "authority loci",
    tone: "violet",
  },
];

const simulator = {
  coord: "SIM-Δ",
  title: "Live Escalation Simulator",
  href: "/observatory/simulator",
  description:
    "Interactive crisis simulator. Modulate attribution confidence and automation level. Observe how escalation risk spikes when low confidence meets high autonomy.",
  rule: "IF  attribution_confidence < 40%   AND  automation_level > 70%   THEN  escalation_risk → critical",
};

export default function ObservatoryHome() {
  return (
    <div className="relative">
      {/* ═══ MASTHEAD ═══ */}
      <div className="mb-20 sm:mb-28 max-w-5xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
          <span className="tag-mono text-atlas-400/90">CEA / OBSERVATORY</span>
          <span className="tag-mono">v 2.0 · STRATEGIC LAYER</span>
          <span className="flex items-center gap-2 tag-mono">
            <span className="status-dot" />
            ATMOSPHERIC TELEMETRY · LIVE
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-editorial italic text-amber-400/70 text-body-lg mb-3"
        >
          A living atlas of machine-speed geopolitical escalation.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-display-lg sm:text-display-xl text-white tracking-tight leading-[1.02]"
        >
          Escalation
          <br />
          <span className="text-atlas-400">Observatory</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-8 text-body-lg text-steel-300 max-w-2xl leading-relaxed"
        >
          Seven interactive layers tracing how cyber operations now propagate
          through AI command systems, satellite infrastructure, nuclear signaling,
          and political authority — at speeds that outpace human deliberation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-4 text-body text-steel-400 max-w-2xl leading-relaxed"
        >
          The central question is not <span className="text-amber-300/90">what did the system do</span> — it is <span className="text-atlas-300">who held authority to define meaning and response</span>.
        </motion.p>

        <div className="obs-rule mt-14" />
      </div>

      {/* ═══ SIMULATOR CALLOUT ═══ */}
      <Link href={simulator.href} className="group block mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative obs-panel-strong corner-ticks rounded-xl p-8 sm:p-10 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-radial from-plasma/[0.12] via-amber/[0.04] to-transparent blur-2xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag-mono text-plasma-400">{simulator.coord}</span>
                <span className="tag-mono">PRIORITY · INTERACTIVE</span>
                <span className="flex items-center gap-2 tag-mono text-plasma-300">
                  <span className="status-dot status-dot-plasma" />
                  LIVE
                </span>
              </div>
              <h2 className="font-display text-heading sm:text-display text-white mb-4 group-hover:text-atlas-300 transition-colors">
                {simulator.title}
              </h2>
              <p className="text-body text-steel-300 leading-relaxed mb-5">
                {simulator.description}
              </p>
              <code className="block font-mono text-[11px] sm:text-caption text-amber-300/90 bg-black/30 border border-amber-500/20 rounded px-4 py-3 leading-relaxed">
                {simulator.rule}
              </code>
            </div>

            <div className="flex items-center gap-3 text-atlas-300 group-hover:text-atlas-200 transition-colors">
              <span className="font-display text-body-lg">Enter simulator</span>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* ═══ LAYERS ═══ */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="tag-mono mb-2 text-atlas-400">SEVEN OBSERVATORY LAYERS</p>
            <h2 className="font-display text-heading text-white">Layers · L-01 → L-07</h2>
          </div>
          <p className="hidden sm:block text-caption text-steel-400 max-w-xs text-right">
            Each layer is independently navigable. All seven share state in the simulator.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {layers.map((l, i) => {
          const accent =
            l.tone === "atlas"
              ? "text-atlas-400"
              : l.tone === "amber"
                ? "text-amber-400"
                : l.tone === "plasma"
                  ? "text-plasma-400"
                  : "text-violet-300";
          const accentBorder =
            l.tone === "atlas"
              ? "group-hover:border-atlas-500/30"
              : l.tone === "amber"
                ? "group-hover:border-amber-500/30"
                : l.tone === "plasma"
                  ? "group-hover:border-plasma-500/30"
                  : "group-hover:border-violet-500/30";
          return (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <Link href={l.href} className="group block h-full">
                <div
                  className={`relative obs-panel rounded-xl p-7 h-full transition-all duration-300 ${accentBorder} group-hover:bg-white/[0.025]`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex flex-col">
                      <span className={`tag-mono ${accent}`}>{l.coord}</span>
                      <span className="tag-mono mt-0.5">{l.coordinate}</span>
                    </div>
                    <div className="text-right">
                      <span className={`block font-display text-subheading ${accent}`}>{l.metric}</span>
                      <span className="tag-mono">{l.metricLabel}</span>
                    </div>
                  </div>

                  <p className="font-editorial italic text-caption text-amber-300/70 mb-2">{l.tagline}</p>
                  <h3 className="font-display text-subheading text-white mb-3 group-hover:text-atlas-300 transition-colors">
                    {l.title}
                  </h3>
                  <p className="text-caption text-steel-400 leading-relaxed">{l.description}</p>

                  <div className="mt-5 flex items-center gap-1.5 text-micro font-mono text-atlas-400/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    ENTER LAYER →
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ═══ FOOTER NOTE ═══ */}
      <div className="obs-rule mt-20 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-caption text-steel-400 leading-relaxed">
        <div>
          <p className="tag-mono mb-2 text-atlas-400">DOCTRINAL POSTURE</p>
          <p>
            This observatory does not catalogue threats to be feared. It interprets
            machine-mediated escalation as a structural condition to be governed.
          </p>
        </div>
        <div>
          <p className="tag-mono mb-2 text-amber-400">CONTESTED INTERPRETATION</p>
          <p>
            Every visualization here makes ambiguity visible. Confidence bands,
            authority gaps, and procedural seams are foreground, not error margin.
          </p>
        </div>
        <div>
          <p className="tag-mono mb-2 text-violet-300">EPISTEMIC HUMILITY</p>
          <p>
            Models are modeled. Scenarios are scenarios. Inferences shown here
            are research instruments, not operational claims.
          </p>
        </div>
      </div>
    </div>
  );
}
