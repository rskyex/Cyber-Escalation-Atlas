"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ObservatoryHeader, Panel, PanelGrid, MetricBlock, ProvenanceNote } from "@/components/observatory";

interface Process {
  id: string;
  name: string;
  domain: string;
  cycleSeconds: number;
  tone: "atlas" | "amber" | "plasma" | "violet";
  description: string;
}

const processes: Process[] = [
  { id: "ai-agent", name: "Autonomous AI Agent", domain: "Computational", cycleSeconds: 0.4, tone: "plasma", description: "Token-by-token decision in milliseconds. No human deliberation interleaved." },
  { id: "auto-def", name: "Automated Network Defense", domain: "Cyber", cycleSeconds: 2, tone: "plasma", description: "Signature-match block, sinkholing, traffic isolation triggered without analyst." },
  { id: "nuc-warn", name: "Nuclear Early-Warning", domain: "Nuclear", cycleSeconds: 240, tone: "amber", description: "Detection to launch-authority decision window. Historically the shortest human-in-loop decision." },
  { id: "cyber-resp", name: "Cyber Incident Response", domain: "Cyber", cycleSeconds: 14400, tone: "atlas", description: "Containment, eradication, forensic recovery. Hours-to-days." },
  { id: "intel-est", name: "Intelligence Estimate", domain: "Intelligence", cycleSeconds: 7 * 86400, tone: "atlas", description: "Coordinated assessment cycle with cross-agency review." },
  { id: "espionage", name: "Cyber Espionage Campaign", domain: "Cyber", cycleSeconds: 180 * 86400, tone: "violet", description: "Average dwell-time of state-linked espionage operations." },
  { id: "sanction", name: "Sanctions Designation", domain: "Diplomatic", cycleSeconds: 60 * 86400, tone: "amber", description: "Evidence gathering, legal review, multilateral coordination, public release." },
  { id: "norm-form", name: "International Norm Formation", domain: "Diplomatic", cycleSeconds: 5 * 365 * 86400, tone: "violet", description: "From incident → diplomatic consensus → enshrined norm. Often years." },
];

const scales = [
  { label: "0.1s", seconds: 0.1 },
  { label: "1s",   seconds: 1 },
  { label: "10s",  seconds: 10 },
  { label: "1min", seconds: 60 },
  { label: "1h",   seconds: 3600 },
  { label: "1d",   seconds: 86400 },
  { label: "1wk",  seconds: 7 * 86400 },
  { label: "1mo",  seconds: 30 * 86400 },
  { label: "1yr",  seconds: 365 * 86400 },
  { label: "10yr", seconds: 10 * 365 * 86400 },
];

export default function TempoPage() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = performance.now();
    const tick = () => {
      setNow(performance.now() - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const minSec = Math.log10(0.1);
  const maxSec = Math.log10(10 * 365 * 86400);
  const project = (sec: number) => ((Math.log10(sec) - minSec) / (maxSec - minSec)) * 100;

  return (
    <>
      <ObservatoryHeader
        layerIndex="L-05"
        coordinate="Temporal · Δt"
        title="Escalation Tempo Comparator"
        tagline="Machine-speed becomes physically visible."
        description="Eight strategic processes plotted on a logarithmic time axis spanning seven orders of magnitude, from autonomous AI agents (sub-second) to international norm formation (years). The gap between tempo classes is the gap that machine-speed actors exploit."
        status="live"
      />

      <ProvenanceNote className="mb-10" />

      <Panel label="TEMPO COMPARATOR · LOG SCALE" status="streaming" className="mb-8">
        <div className="space-y-1.5">
          {processes.map((p, i) => {
            const x = project(p.cycleSeconds);
            const tone =
              p.tone === "atlas"
                ? "rgb(45, 212, 168)"
                : p.tone === "amber"
                  ? "rgb(230, 165, 92)"
                  : p.tone === "plasma"
                    ? "rgb(255, 107, 91)"
                    : "rgb(174, 147, 255)";

            // animated clock, synced to cycle, capped
            const cycleMs = p.cycleSeconds * 1000;
            const t = (now % Math.min(cycleMs, 60000)) / Math.min(cycleMs, 60000);
            const rotation = t * 360;

            return (
              <div key={p.id} className="grid grid-cols-12 gap-3 items-center py-2">
                {/* Label */}
                <div className="col-span-12 sm:col-span-4 lg:col-span-3 flex items-center gap-3">
                  <ClockGlyph rotation={rotation} color={tone} />
                  <div>
                    <p className="font-display text-caption text-white leading-tight">{p.name}</p>
                    <p className="tag-mono text-steel-500">{p.domain}</p>
                  </div>
                </div>

                {/* Bar */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-7">
                  <div className="relative h-6">
                    <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-px bg-white/[0.05]" />

                    {/* Background scale ticks */}
                    {scales.map((s) => {
                      const sx = project(s.seconds);
                      return (
                        <div
                          key={s.label}
                          className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/[0.07]"
                          style={{ left: `${sx}%` }}
                        />
                      );
                    })}

                    {/* Bar fill from 0.1s to process tempo */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${x}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                      className="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${tone})`,
                      }}
                    />

                    {/* Tempo marker */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.06 + 0.6 }}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                      style={{
                        left: `${x}%`,
                        marginLeft: -6,
                        background: tone,
                        boxShadow: `0 0 12px ${tone}`,
                      }}
                    />
                  </div>
                </div>

                {/* Value */}
                <div className="col-span-12 sm:col-span-2 lg:col-span-2 text-right">
                  <span className="font-display text-caption text-white">
                    {formatDuration(p.cycleSeconds)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Axis */}
        <div className="relative mt-6 pt-1">
          <div className="h-px bg-white/[0.08]" />
          <div className="relative h-6">
            {scales.map((s) => {
              const sx = project(s.seconds);
              return (
                <div
                  key={s.label}
                  className="absolute top-0 -translate-x-1/2 text-[10px] font-mono text-steel-500"
                  style={{ left: `${sx}%` }}
                >
                  <span className="block w-px h-2 bg-steel-700 mx-auto mb-1" />
                  {s.label}
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* ═══ TEMPO ASYMMETRY READING ═══ */}
      <PanelGrid cols={3} className="mb-8">
        <Panel label="TEMPO CLASS · MACHINE-SPEED" statusTone="plasma" status="autonomous">
          <MetricBlock
            label="Cycle order of magnitude"
            value="10⁰ s"
            tone="plasma"
            hint="Sub-second to seconds. AI agents, automated defense."
          />
          <p className="mt-4 text-caption text-steel-400 leading-relaxed">
            Decisions complete before human attention can be directed.
            Override windows narrower than human reaction time.
          </p>
        </Panel>
        <Panel label="TEMPO CLASS · OPERATIONAL" statusTone="amber" status="institutional">
          <MetricBlock
            label="Cycle order of magnitude"
            value="10³–10⁵ s"
            tone="amber"
            hint="Minutes to days. Crisis response, IR, NC3."
          />
          <p className="mt-4 text-caption text-steel-400 leading-relaxed">
            The historic bandwidth of crisis decision-making.
            Now squeezed between machine-speed below and ponderous diplomacy above.
          </p>
        </Panel>
        <Panel label="TEMPO CLASS · INSTITUTIONAL" statusTone="violet" status="deliberative">
          <MetricBlock
            label="Cycle order of magnitude"
            value="10⁷–10⁸ s"
            tone="violet"
            hint="Weeks to years. Sanctions, norms, treaty."
          />
          <p className="mt-4 text-caption text-steel-400 leading-relaxed">
            International law and diplomacy operate at the slow tempo of consensus.
            Adversaries operate seven orders of magnitude faster.
          </p>
        </Panel>
      </PanelGrid>

      <Panel label="TEMPO ASYMMETRY · STRUCTURAL READING" statusTone="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="font-editorial italic text-body-lg text-amber-300/80 leading-snug mb-3">
              &ldquo;Governance speed has not slowed, operations have accelerated past it.&rdquo;
            </p>
            <p className="text-caption text-steel-300 leading-relaxed">
              International norm formation cycles around <span className="text-amber-300">five-year horizons</span>. Autonomous AI systems make decisions in <span className="text-plasma-300">fractions of a second</span>. That is a factor of ten-to-the-eighth gap. Every doctrinal escalation review must now contend with the temporal arbitrage actors gain by operating in faster classes than the institutions tasked with constraining them.
            </p>
          </div>
          <div>
            <p className="tag-mono mb-2 text-atlas-400">CONSEQUENCES OF THE GAP</p>
            <ul className="space-y-2 text-caption text-steel-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-plasma-400 mt-1">▸</span>
                <span><span className="text-white">Pre-delegation pressure</span>, political authorities pushed to pre-authorize machine response.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">▸</span>
                <span><span className="text-white">Narrative pre-emption</span>, public attribution races ahead of intelligence consensus.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-atlas-400 mt-1">▸</span>
                <span><span className="text-white">Norm decay</span>, slow norms become unenforceable against fast operations.</span>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
    </>
  );
}

function ClockGlyph({ rotation, color }: { rotation: number; color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="4"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "12px 12px" }}
      />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="6"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
        style={{ transform: `rotate(${rotation / 12}deg)`, transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} h`;
  if (seconds < 7 * 86400) return `${Math.round(seconds / 86400)} d`;
  if (seconds < 30 * 86400) return `${Math.round(seconds / 86400 / 7)} wk`;
  if (seconds < 365 * 86400) return `${Math.round(seconds / 86400 / 30)} mo`;
  return `${Math.round(seconds / 86400 / 365)} yr`;
}
