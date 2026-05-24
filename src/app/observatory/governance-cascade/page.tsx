"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid, MetricBlock } from "@/components/observatory";

interface Stage {
  id: string;
  index: number;
  title: string;
  short: string;
  what: string;
  failure: string;
  example: string;
  tone: "atlas" | "amber" | "plasma";
}

const stages: Stage[] = [
  {
    id: "signal",
    index: 1,
    title: "Signal Detected",
    short: "Sensor activation",
    what: "An indicator is observed: network anomaly, satellite return, intelligence cue, financial irregularity.",
    failure: "Detection thresholds calibrated for absence of false alarms — true signals discarded as noise.",
    example: "1983: false missile-launch alert from sun-on-cloud reflection.",
    tone: "atlas",
  },
  {
    id: "class",
    index: 2,
    title: "Misclassification",
    short: "Wrong category assigned",
    what: "The signal is sorted into an interpretive frame: espionage vs. attack, accident vs. attribution, criminal vs. state.",
    failure: "Categories shaped by prior cases, not current evidence. Novel events forced into stale taxonomies.",
    example: "NotPetya: months of categorisation drift before 'destructive' superseded 'ransomware'.",
    tone: "atlas",
  },
  {
    id: "auth",
    index: 3,
    title: "Authority Ambiguity",
    short: "No clear decision owner",
    what: "Multiple institutions claim — or deny — jurisdiction. Decision authority becomes contested.",
    failure: "Inter-agency seams paralyze response. Authority defaults to whichever body has automated capability.",
    example: "Cross-domain incidents (cyber + space + financial) lacking single accountable command.",
    tone: "amber",
  },
  {
    id: "auto",
    index: 4,
    title: "Automation Continuation",
    short: "Pre-authorised response fires",
    what: "While humans deliberate jurisdiction, automated systems continue to act under pre-existing authorities.",
    failure: "Machine action proceeds in absence of contested human decision. Override windows close.",
    example: "Active-defense platforms triggering counter-action on signature match.",
    tone: "amber",
  },
  {
    id: "esc",
    index: 5,
    title: "Retaliatory Escalation",
    short: "Counter-action launched",
    what: "Response is executed before contested interpretation resolved. Targeted actor may not be responsible party.",
    failure: "Retaliation becomes provocation. Original signal source may be opportunistic third party.",
    example: "Hypothetical: AI counter-targeting against false-flag operation routed through neutral nation.",
    tone: "plasma",
  },
  {
    id: "crisis",
    index: 6,
    title: "Crisis",
    short: "Compounding ambiguity",
    what: "Multiple cascading failures interact. Each new event is misread through the lens of the prior misclassification.",
    failure: "No institutional pathway exists for graceful retraction — public posture freezes hostile interpretation.",
    example: "Doctrinal lock-in: positions taken during 24-hour news cycle become 6-month policy.",
    tone: "plasma",
  },
];

export default function GovernanceCascadePage() {
  const [playing, setPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActiveIdx((i) => {
        if (i >= stages.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 1600);
    return () => clearInterval(id);
  }, [playing]);

  const active = stages[activeIdx];

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-06"
        coordinate="Institutional · Δ"
        title="Governance Cascade"
        tagline="Where institutions fail in slow motion."
        description="Crisis rarely arrives from a single catastrophic decision. It arrives through six smaller failures stacked atop one another — each plausible in isolation, each compounding the last. The cascade is the most-observed and least-prevented pattern in modern incident escalation."
        status="modeled"
      />

      {/* ═══ CONTROL BAR ═══ */}
      <Panel label="CASCADE SIMULATOR · 6-STAGE FAILURE" status={playing ? "running" : "paused"} statusTone={playing ? "plasma" : "atlas"} className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (activeIdx >= stages.length - 1) {
                  setActiveIdx(0);
                  setPlaying(true);
                } else {
                  setPlaying((p) => !p);
                }
              }}
              className="px-4 py-2 rounded-md bg-atlas-500/20 border border-atlas-500/40 text-atlas-200 hover:bg-atlas-500/30 transition-colors text-caption font-medium flex items-center gap-2"
            >
              {playing ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="2.5" height="8" /><rect x="6.5" y="1" width="2.5" height="8" /></svg>
                  Pause
                </>
              ) : activeIdx >= stages.length - 1 ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 1 L9 5 L1 9 Z" /></svg>
                  Replay cascade
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 1 L9 5 L1 9 Z" /></svg>
                  Run cascade
                </>
              )}
            </button>
            <button
              onClick={() => { setPlaying(false); setActiveIdx(0); }}
              className="px-3 py-2 rounded-md text-caption text-steel-400 hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
          <span className="tag-mono">STAGE {active.index} / 6 · {active.title.toUpperCase()}</span>
        </div>

        {/* Stage spine */}
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-px bg-white/[0.08]" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(activeIdx / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute top-5 left-0 h-px"
            style={{
              background: "linear-gradient(90deg, rgba(45, 212, 168, 0.7), rgba(230, 165, 92, 0.85), rgba(255, 107, 91, 0.95))",
              boxShadow: "0 0 10px rgba(230, 165, 92, 0.4)",
            }}
          />

          <div className="grid grid-cols-6 gap-2 relative">
            {stages.map((s, i) => {
              const reached = i <= activeIdx;
              const isActive = i === activeIdx;
              const dotColor =
                s.tone === "atlas" ? "bg-atlas-400" : s.tone === "amber" ? "bg-amber-400" : "bg-plasma-400";
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveIdx(i);
                    setPlaying(false);
                  }}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      reached
                        ? `${dotColor} ${isActive ? "ring-4 ring-white/15 scale-125" : "opacity-80"}`
                        : "bg-steel-700 opacity-50"
                    }`}
                  />
                  <span
                    className={`mt-3 tag-mono ${reached ? "text-white" : "text-steel-600"} ${isActive ? "text-amber-300" : ""}`}
                  >
                    STAGE {s.index}
                  </span>
                  <span
                    className={`mt-1 text-[11px] font-display leading-tight transition-colors ${
                      reached ? "text-steel-200 group-hover:text-white" : "text-steel-600"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* ═══ ACTIVE STAGE DETAIL ═══ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <PanelGrid cols={3} className="mb-8">
            <Panel label={`STAGE ${active.index}`} status={active.short} statusTone={active.tone}>
              <h3 className="font-display text-subheading text-white mb-3">{active.title}</h3>
              <p className="text-caption text-steel-300 leading-relaxed">{active.what}</p>
            </Panel>

            <Panel label="FAILURE MODE" statusTone="amber">
              <p className="font-editorial italic text-body text-amber-300/80 leading-snug mb-3">
                Where it goes wrong:
              </p>
              <p className="text-caption text-steel-300 leading-relaxed">{active.failure}</p>
            </Panel>

            <Panel label="HISTORICAL ECHO" statusTone="violet">
              <p className="tag-mono mb-2">CASE / ANALOG</p>
              <p className="text-caption text-steel-300 leading-relaxed">{active.example}</p>
            </Panel>
          </PanelGrid>
        </motion.div>
      </AnimatePresence>

      {/* ═══ SYSTEMIC FRAGILITY DASHBOARD ═══ */}
      <Panel label="SYSTEMIC FRAGILITY · LIVE READING" statusTone="plasma">
        <PanelGrid cols={4}>
          <MetricBlock
            label="Ambiguity index"
            value={Math.min(100, (activeIdx + 1) * 17).toString()}
            unit="/100"
            tone={activeIdx >= 4 ? "plasma" : activeIdx >= 2 ? "amber" : "atlas"}
            hint="Aggregate uncertainty across active stages."
          />
          <MetricBlock
            label="Authority gap"
            value={activeIdx >= 2 ? "open" : "closed"}
            tone={activeIdx >= 2 ? "amber" : "atlas"}
            hint="Whether any single body holds clear decision authority."
          />
          <MetricBlock
            label="Override window"
            value={activeIdx >= 3 ? "closed" : "open"}
            tone={activeIdx >= 3 ? "plasma" : "atlas"}
            hint="Whether human cancellation remains practically possible."
          />
          <MetricBlock
            label="Crisis lock-in"
            value={activeIdx >= 5 ? "active" : activeIdx >= 4 ? "imminent" : "absent"}
            tone={activeIdx >= 5 ? "plasma" : activeIdx >= 4 ? "amber" : "atlas"}
            hint="Whether positions taken can still be retracted."
          />
        </PanelGrid>

        <div className="obs-rule my-6" />

        <p className="font-editorial italic text-body-lg text-amber-300/80 leading-snug mb-3">
          &ldquo;The crisis is not the last stage. It is the moment the first four became unrecoverable.&rdquo;
        </p>
        <p className="text-caption text-steel-300 leading-relaxed max-w-3xl">
          Every observed major escalation in the dataset followed some variant of this sequence. The intervention point is rarely Stage 6.
          It is the institutional design of Stages 2 and 3 — taxonomies and authority architectures — where most cascades are still
          quietly preventable.
        </p>
      </Panel>
    </>
  );
}
