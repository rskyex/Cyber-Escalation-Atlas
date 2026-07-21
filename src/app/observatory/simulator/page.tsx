"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid, MetricBlock, ProvenanceNote } from "@/components/observatory";

interface Params {
  attribution: number;
  automation: number;
  ambiguity: number;
  alliance: number;
  tempo: number;
}

function calcRisk(p: Params) {
  const lowConf = (100 - p.attribution) / 100;
  const highAuto = p.automation / 100;
  const interaction = lowConf * highAuto * 1.4;

  const ambigBoost = (p.ambiguity / 100) * 0.4;
  const tempoBoost = (p.tempo / 100) * 0.35;
  const allianceDamp = ((100 - p.alliance) / 100) * 0.25;

  let r = (interaction * 0.55 + ambigBoost + tempoBoost + allianceDamp) * 100;

  // Phase-shift bonus when both critical thresholds crossed
  if (p.attribution < 40 && p.automation > 70) r += 18;

  return Math.max(0, Math.min(100, Math.round(r)));
}

function riskTier(r: number) {
  if (r >= 75) return { label: "CRITICAL", tone: "plasma" as const, color: "rgb(255, 107, 91)" };
  if (r >= 55) return { label: "ELEVATED", tone: "amber" as const, color: "rgb(230, 165, 92)" };
  if (r >= 30) return { label: "CONTESTED", tone: "amber" as const, color: "rgb(230, 165, 92)" };
  return { label: "NOMINAL", tone: "atlas" as const, color: "rgb(45, 212, 168)" };
}

const presets = [
  { id: "stable", name: "Stable Posture",      params: { attribution: 78, automation: 30, ambiguity: 25, alliance: 78, tempo: 35 } as Params },
  { id: "current", name: "Current Doctrine",   params: { attribution: 62, automation: 55, ambiguity: 50, alliance: 65, tempo: 60 } as Params },
  { id: "active",  name: "Active-Defense",     params: { attribution: 50, automation: 75, ambiguity: 55, alliance: 60, tempo: 75 } as Params },
  { id: "compress",name: "Machine-Speed",      params: { attribution: 35, automation: 88, ambiguity: 70, alliance: 50, tempo: 90 } as Params },
  { id: "false",   name: "False-Flag",         params: { attribution: 22, automation: 65, ambiguity: 85, alliance: 45, tempo: 70 } as Params },
];

export default function SimulatorPage() {
  const [params, setParams] = useState<Params>(presets[1].params);

  const risk = useMemo(() => calcRisk(params), [params]);
  const tier = riskTier(risk);

  const rulesFired = [
    {
      id: "thresh",
      condition: "attribution_confidence < 40%  ∧  automation_level > 70%",
      fired: params.attribution < 40 && params.automation > 70,
      consequence: "escalation_risk → critical · phase-shift bonus +18",
    },
    {
      id: "ambig",
      condition: "ambiguity > 60%  ∧  tempo > 60%",
      fired: params.ambiguity > 60 && params.tempo > 60,
      consequence: "interpretive_lock_in → narrative authority captured by fastest actor",
    },
    {
      id: "alliance",
      condition: "alliance_coherence < 50%",
      fired: params.alliance < 50,
      consequence: "joint_attribution → unstable · counter-narrative likely",
    },
    {
      id: "compress",
      condition: "automation_level > 80%  ∧  tempo > 80%",
      fired: params.automation > 80 && params.tempo > 80,
      consequence: "override_window → effectively zero",
    },
  ];

  return (
    <>
      <ObservatoryHeader
        layerIndex="SIM-Δ"
        coordinate="Interactive · Live"
        title="Live Escalation Simulator"
        tagline="Where every layer meets a slider."
        description="The simulator composes all seven layers into a single interactive surface. Modulate five parameters and observe how escalation risk responds, phase-shifts occur when low attribution confidence meets high automation."
        status="live"
      />

      <ProvenanceNote className="mb-10" />

      {/* ═══ PRESET ROW ═══ */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="tag-mono mr-2">DOCTRINAL PRESET ·</span>
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => setParams(p.params)}
            className="px-3 py-1.5 rounded-md text-caption transition-all border bg-white/[0.02] border-white/[0.05] text-steel-400 hover:text-white hover:border-atlas-500/30"
          >
            {p.name}
          </button>
        ))}
      </div>

      <PanelGrid cols={2} className="mb-8">
        {/* ═══ CONTROL SURFACE ═══ */}
        <Panel label="PARAMETER CONTROL · 5-AXIS" status="active" statusTone="atlas">
          <div className="space-y-5">
            <Slider
              label="Attribution Confidence"
              hint="Pre-action certainty about responsible actor."
              value={params.attribution}
              onChange={(v) => setParams((s) => ({ ...s, attribution: v }))}
              tone="violet"
              threshold={40}
              thresholdDirection="below"
            />
            <Slider
              label="Automation Level"
              hint="Share of decision pipeline under autonomous execution."
              value={params.automation}
              onChange={(v) => setParams((s) => ({ ...s, automation: v }))}
              tone="plasma"
              threshold={70}
              thresholdDirection="above"
            />
            <Slider
              label="Interpretive Ambiguity"
              hint="Contested classification: espionage vs. attack, accident vs. attribution."
              value={params.ambiguity}
              onChange={(v) => setParams((s) => ({ ...s, ambiguity: v }))}
              tone="amber"
            />
            <Slider
              label="Tempo Pressure"
              hint="Speed at which the adversary's posture demands response."
              value={params.tempo}
              onChange={(v) => setParams((s) => ({ ...s, tempo: v }))}
              tone="amber"
            />
            <Slider
              label="Alliance Coherence"
              hint="Confidence in joint attribution and response coordination."
              value={params.alliance}
              onChange={(v) => setParams((s) => ({ ...s, alliance: v }))}
              tone="atlas"
              threshold={50}
              thresholdDirection="below"
              invert
            />
          </div>
        </Panel>

        {/* ═══ RISK READOUT ═══ */}
        <Panel label="ESCALATION RISK · COMPUTED" status={tier.label.toLowerCase()} statusTone={tier.tone} strong ticks>
          <div className="text-center py-6">
            <p className="tag-mono mb-3">CURRENT POSTURE</p>
            <motion.div
              key={risk}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-display"
              style={{ color: tier.color }}
            >
              <div className="text-[88px] leading-none font-light tracking-tight">
                {risk}
              </div>
              <div className="tag-mono mt-2 tracking-[0.3em]" style={{ color: tier.color }}>
                {tier.label}
              </div>
            </motion.div>

            <div className="mt-8 relative h-2 bg-white/[0.04] rounded-full overflow-hidden max-w-md mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${risk}%` }}
                transition={{ duration: 0.4 }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(45, 212, 168, 0.6), rgba(230, 165, 92, 0.85), rgba(255, 107, 91, 0.95))`,
                  boxShadow: `0 0 12px ${tier.color}`,
                }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-[30%] w-px h-3 bg-white/30" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[55%] w-px h-3 bg-amber-400/60" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-px h-3 bg-plasma-400/70" />
            </div>
            <div className="flex justify-between mt-1.5 max-w-md mx-auto text-[10px] font-mono text-steel-600">
              <span>nominal</span>
              <span>contested</span>
              <span>elevated</span>
              <span>critical</span>
            </div>
          </div>

          <div className="obs-rule my-6" />

          <PanelGrid cols={2}>
            <MetricBlock label="Override window" value={params.automation > 80 ? "Closed" : params.automation > 60 ? "<5s" : "Open"} tone={params.automation > 80 ? "plasma" : params.automation > 60 ? "amber" : "atlas"} />
            <MetricBlock label="Authority gap" value={params.ambiguity > 60 ? "Open" : "Closed"} tone={params.ambiguity > 60 ? "amber" : "atlas"} />
          </PanelGrid>
        </Panel>
      </PanelGrid>

      {/* ═══ RULE TRACE ═══ */}
      <Panel label="RULE TRACE · DOCTRINAL TRIGGERS" status={`${rulesFired.filter((r) => r.fired).length}/4 firing`} statusTone={rulesFired.filter((r) => r.fired).length > 1 ? "plasma" : "amber"} className="mb-8">
        <div className="space-y-3">
          {rulesFired.map((r) => (
            <motion.div
              key={r.id}
              animate={{ borderColor: r.fired ? "rgba(255, 107, 91, 0.45)" : "rgba(132, 147, 175, 0.08)" }}
              className={`rounded-md border p-4 ${r.fired ? "bg-plasma-500/[0.04]" : "bg-white/[0.01]"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`status-dot ${r.fired ? "status-dot-plasma" : ""}`} style={{ opacity: r.fired ? 1 : 0.3 }} />
                    <span className={`tag-mono ${r.fired ? "text-plasma-300" : "text-steel-500"}`}>
                      RULE {r.fired ? "ACTIVE" : "DORMANT"}
                    </span>
                  </div>
                  <code className={`block font-mono text-[12px] leading-relaxed ${r.fired ? "text-white" : "text-steel-500"}`}>
                    {r.condition}
                  </code>
                  {r.fired && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 text-caption text-plasma-300/90 leading-relaxed"
                    >
                      → {r.consequence}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>

      {/* ═══ POSTURE INTERPRETATION ═══ */}
      <Panel label="POSTURE INTERPRETATION" statusTone="violet">
        <p className="font-editorial italic text-body-lg text-amber-300/85 leading-snug mb-4">
          {tier.label === "CRITICAL"
            ? "The composition you have assembled is structurally unstable. Errors here become outcomes."
            : tier.label === "ELEVATED"
              ? "This posture relies on assumptions about adversary restraint that may not hold under tempo pressure."
              : tier.label === "CONTESTED"
                ? "Risk is manageable but contested. Small shifts in attribution or automation will move you across the threshold."
                : "Stable posture. Authority, ambiguity, and tempo are within institutional tolerance."}
        </p>
        <p className="text-caption text-steel-300 leading-relaxed max-w-3xl">
          The simulator is descriptive, not prescriptive. It models the structural interactions between five doctrinal variables that recur across the dataset. Real-world decisions involve additional variables, domestic politics, regime type, prior signaling, technical surprise, that no scalar parameter set can adequately encode.
        </p>
      </Panel>
    </>
  );
}

function Slider({
  label,
  hint,
  value,
  onChange,
  tone,
  threshold,
  thresholdDirection,
  invert,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  tone: "atlas" | "amber" | "plasma" | "violet";
  threshold?: number;
  thresholdDirection?: "above" | "below";
  invert?: boolean;
}) {
  const fill =
    tone === "atlas"
      ? "rgb(45, 212, 168)"
      : tone === "amber"
        ? "rgb(230, 165, 92)"
        : tone === "plasma"
          ? "rgb(255, 107, 91)"
          : "rgb(174, 147, 255)";

  const overThreshold =
    threshold !== undefined &&
    ((thresholdDirection === "above" && value > threshold) ||
      (thresholdDirection === "below" && value < threshold));

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-caption text-white">{label}</span>
          {overThreshold && (
            <span className="tag-mono text-plasma-300">↯ THRESHOLD CROSSED</span>
          )}
        </div>
        <span className="font-display text-subheading" style={{ color: fill }}>
          {value}
          <span className="text-[10px] font-mono ml-0.5 text-steel-500">%</span>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: fill }}
      />
      {threshold !== undefined && (
        <div className="relative h-px -mt-2 pointer-events-none">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-px h-2.5"
            style={{
              left: `${threshold}%`,
              background: invert ? "rgb(45, 212, 168)" : "rgb(255, 107, 91)",
            }}
          />
        </div>
      )}
      <p className="text-[11px] text-steel-500 leading-snug mt-1">{hint}</p>
    </div>
  );
}
