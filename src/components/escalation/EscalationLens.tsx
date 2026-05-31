"use client";

import { useState } from "react";
import type { Incident, EscalationTier, IncidentType } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  unpeaceScore,
  escalationTierLabels,
  escalationTierBadge,
  incidentTypeLabels,
  incidentTypeBadge,
  tierIndex,
} from "@/lib/utils/incidents";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PlottedIncident {
  incident: Incident;
  score: number; // 1–10
  display: number; // 0–100
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const zones = [
  {
    label: "Stable",
    range: "0–30",
    start: 0,
    end: 30,
    bg: "bg-atlas-50 dark:bg-atlas-900/15",
    border: "border-atlas-200/40 dark:border-atlas-700/25",
    dot: "bg-atlas-500",
    text: "text-atlas-700 dark:text-atlas-400",
    description:
      "Routine intelligence collection, low-severity probes, or operations contained within accepted norms of peacetime competition. Minimal governance response expected.",
  },
  {
    label: "Contested",
    range: "30–60",
    start: 30,
    end: 60,
    bg: "bg-ink-50 dark:bg-ink-700/20",
    border: "border-steel-200/40 dark:border-ink-600/25",
    dot: "bg-ink-400",
    text: "text-ink dark:text-ink-100",
    description:
      "Operations that strain existing norms or provoke formal attribution, indictment, or sanctions. The line between peacetime espionage and coercive action is actively debated.",
  },
  {
    label: "Escalatory",
    range: "60–100",
    start: 60,
    end: 100,
    bg: "bg-signal-50 dark:bg-signal-900/10",
    border: "border-signal-200/40 dark:border-signal-700/25",
    dot: "bg-signal-500",
    text: "text-signal-700 dark:text-signal-300",
    description:
      "Destructive or strategic-impact operations that cross established thresholds, causing physical damage, mass economic disruption, or triggering multilateral governance responses.",
  },
];

const tierDefinitions: { tier: EscalationTier; description: string }[] = [
  {
    tier: "probing",
    description:
      "Scanning, reconnaissance, and testing defences without meaningful disruption. Establishes access potential.",
  },
  {
    tier: "intrusion",
    description:
      "Unauthorized access gained and maintained. Data may be collected but no operational effect is imposed on the target.",
  },
  {
    tier: "disruption",
    description:
      "Operations that temporarily deny or degrade services. Systems recover without permanent damage, but operational continuity is interrupted.",
  },
  {
    tier: "degradation",
    description:
      "Sustained impairment of target capabilities. May involve data destruction, prolonged outages, or significant economic cost.",
  },
  {
    tier: "destruction",
    description:
      "Irreversible damage to systems, data, or infrastructure. Recovery requires rebuilding rather than restoring.",
  },
  {
    tier: "strategic",
    description:
      "Operations with national-security or international significance, affecting critical infrastructure, economic stability, or interstate relations.",
  },
];

// ---------------------------------------------------------------------------
// Schelling framework text
// ---------------------------------------------------------------------------

interface SchellingCase {
  incident: Incident;
  reasoning: string;
}

function classifySchelling(incidents: Incident[]): {
  compellence: SchellingCase[];
  deterrence: SchellingCase[];
} {
  const compellence: SchellingCase[] = [];
  const deterrence: SchellingCase[] = [];

  for (const inc of incidents) {
    // Heuristic: destructive, sabotage, and ransomware operations
    // with high threshold crossings lean compellence (forcing action).
    // Espionage and influence lean deterrence (signalling capability).
    const isCompellent =
      (inc.incidentType === "destructive" ||
        inc.incidentType === "sabotage" ||
        inc.incidentType === "ransomware") &&
      inc.escalation.thresholdCrossings.length > 0;

    if (isCompellent) {
      compellence.push({
        incident: inc,
        reasoning: buildCompellenceReasoning(inc),
      });
    } else {
      deterrence.push({
        incident: inc,
        reasoning: buildDeterrenceReasoning(inc),
      });
    }
  }

  return { compellence, deterrence };
}

function buildCompellenceReasoning(inc: Incident): string {
  const crossings = inc.escalation.thresholdCrossings;
  if (crossings.length > 0) {
    return `Crossed ${crossings.length} threshold${crossings.length > 1 ? "s" : ""}: ${crossings[0]}.`;
  }
  return "Imposed direct costs to compel a change in adversary behaviour.";
}

function buildDeterrenceReasoning(inc: Incident): string {
  const restraints = inc.escalation.restraintFactors;
  if (restraints.length > 0) {
    return `Restraint observed: ${restraints[0]}.`;
  }
  return "Demonstrated capability without imposing irreversible damage, signalling potential rather than exercising it.";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function IncidentDot({
  item,
  isActive,
  onHover,
  onLeave,
  onClick,
}: {
  item: PlottedIncident;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const zone = zones.find(
    (z) => item.display >= z.start && item.display < z.end,
  ) ?? zones[2];

  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 group/dot focus:outline-none"
      style={{ left: `${item.display}%`, transform: "translate(-50%, -50%)" }}
      title={item.incident.shortName}
    >
      <span
        className={`block rounded-full border-2 border-white dark:border-ink-800 shadow-sm transition-all ${zone.dot} ${
          isActive ? "w-5 h-5 ring-2 ring-offset-1 ring-atlas-400/50 dark:ring-atlas-500/40 dark:ring-offset-ink-800" : "w-3.5 h-3.5"
        }`}
      />
    </button>
  );
}

function AxisTooltip({ item }: { item: PlottedIncident }) {
  const inc = item.incident;
  return (
    <div className="p-3.5 rounded-xl bg-white dark:bg-ink-700 border border-transparent dark:border-white/[0.04] shadow-lg max-w-xs">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <p className="text-sm font-semibold text-ink dark:text-white leading-snug">
          {inc.shortName}
        </p>
        <span
          className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
            item.score >= 7
              ? "bg-signal-100 dark:bg-signal-900/40 text-signal-700 dark:text-signal-300"
              : item.score >= 4
                ? "bg-ink-100 dark:bg-ink-600/50 text-ink dark:text-ink-100"
                : "bg-atlas-50 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-400"
          }`}
        >
          {item.score}
        </span>
      </div>
      <p className="text-xs text-steel-500 dark:text-steel-400 mb-2">
        {inc.dateRange} · {inc.attribution.country}
      </p>
      <div className="flex flex-wrap gap-1 mb-2">
        <Badge variant={incidentTypeBadge[inc.incidentType]}>
          {incidentTypeLabels[inc.incidentType]}
        </Badge>
        <Badge variant={escalationTierBadge[inc.escalation.peakTier]}>
          {escalationTierLabels[inc.escalation.peakTier]}
        </Badge>
      </div>
      <p className="text-xs text-steel-500 dark:text-steel-300 leading-relaxed line-clamp-3">
        {inc.whyThisMatters}
      </p>
      <a
        href={`/cases/${inc.slug}`}
        className="inline-block mt-2 text-xs text-atlas-600 dark:text-atlas-400 hover:underline"
      >
        View case detail →
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface EscalationLensProps {
  incidents: Incident[];
}

export function EscalationLens({ incidents }: EscalationLensProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Plot data
  const plotted: PlottedIncident[] = incidents.map((inc) => {
    const s = unpeaceScore(inc);
    return { incident: inc, score: s, display: s * 10 };
  });

  // Sort for the listing below the axis
  const sorted = [...plotted].sort((a, b) => b.score - a.score);

  const activeItem = plotted.find((p) => p.incident.id === activeId) ?? null;

  // Schelling split
  const { compellence, deterrence } = classifySchelling(incidents);

  return (
    <div className="space-y-14">
      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Unpeace axis with all incidents                        */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="text-lg font-bold text-ink dark:text-white tracking-tight mb-1">
          Unpeace Spectrum
        </h2>
        <p className="text-sm text-steel-500 dark:text-steel-300 mb-6 max-w-2xl">
          Each incident is positioned on a 0–100 unpeace axis reflecting
          escalation severity, threshold crossings, and governance weight.
          Hover or tap an incident to inspect.
        </p>

        {/* Axis */}
        <div className="relative">
          {/* Zone background */}
          <div className="flex h-14 rounded-xl overflow-hidden border border-steel-200/20 dark:border-ink-600/30">
            {zones.map((z) => (
              <div
                key={z.label}
                className={`h-full ${z.bg} ${
                  z.label !== "Escalatory" ? "border-r border-steel-200/20 dark:border-ink-600/25" : ""
                }`}
                style={{ width: `${z.end - z.start}%` }}
              />
            ))}

            {/* Dots */}
            {plotted.map((item) => (
              <IncidentDot
                key={item.incident.id}
                item={item}
                isActive={item.incident.id === activeId}
                onHover={() => setActiveId(item.incident.id)}
                onLeave={() => setActiveId(null)}
                onClick={() =>
                  setActiveId(
                    activeId === item.incident.id ? null : item.incident.id,
                  )
                }
              />
            ))}
          </div>

          {/* Zone labels + scale */}
          <div className="flex mt-1.5">
            {zones.map((z) => (
              <div
                key={z.label}
                className={`text-center text-[10px] font-medium uppercase tracking-wider ${z.text}`}
                style={{ width: `${z.end - z.start}%` }}
              >
                {z.label} ({z.range})
              </div>
            ))}
          </div>

          {/* Tick marks */}
          <div className="flex justify-between mt-0.5 text-[9px] font-mono text-steel-400 dark:text-ink-500 px-0.5">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
            <span>60</span>
            <span>70</span>
            <span>80</span>
            <span>90</span>
            <span>100</span>
          </div>
        </div>

        {/* Tooltip */}
        {activeItem && (
          <div className="mt-4">
            <AxisTooltip item={activeItem} />
          </div>
        )}

        {/* Incident listing by zone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {zones.map((z) => {
            const inZone = sorted.filter(
              (p) => p.display >= z.start && p.display < (z.end === 100 ? 101 : z.end),
            );
            return (
              <div
                key={z.label}
                className={`rounded-xl p-4 border ${z.border} ${z.bg}`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-2 ${z.text}`}
                >
                  {z.label} ({inZone.length})
                </p>
                {inZone.length === 0 ? (
                  <p className="text-xs text-steel-500 dark:text-ink-400 italic">
                    No incidents in this zone.
                  </p>
                ) : (
                  <ul className="space-y-1.5">
                    {inZone.map((p) => (
                      <li key={p.incident.id}>
                        <a
                          href={`/cases/${p.incident.slug}`}
                          className="flex items-center justify-between gap-2 text-sm hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                          onMouseEnter={() => setActiveId(p.incident.id)}
                          onMouseLeave={() => setActiveId(null)}
                        >
                          <span className="text-ink dark:text-white truncate">
                            {p.incident.shortName}
                          </span>
                          <span className="text-xs font-mono text-steel-500 dark:text-ink-400 shrink-0">
                            {p.display}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Escalation category cards                              */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="text-lg font-bold text-ink dark:text-white tracking-tight mb-1">
          Escalation Categories
        </h2>
        <p className="text-sm text-steel-500 dark:text-steel-300 mb-6 max-w-2xl">
          Cyber operations are classified along a six-tier escalation
          ladder. Each tier describes a qualitative shift in the nature
          and severity of the operation, not a linear progression.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tierDefinitions.map(({ tier, description }, idx) => {
            const count = incidents.filter(
              (i) => i.escalation.peakTier === tier,
            ).length;
            return (
              <div
                key={tier}
                className="p-4 rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/25"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={escalationTierBadge[tier]}>
                    {escalationTierLabels[tier]}
                  </Badge>
                  <span className="text-xs font-mono text-steel-500 dark:text-ink-400">
                    Tier {idx + 1}
                  </span>
                </div>
                <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
                  {description}
                </p>
                <p className="text-xs text-steel-400 dark:text-ink-500 mt-2.5">
                  {count} incident{count !== 1 ? "s" : ""} in dataset
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Schelling compellence vs deterrence split              */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="text-lg font-bold text-ink dark:text-white tracking-tight mb-1">
          Compellence vs. Deterrence
        </h2>
        <p className="text-sm text-steel-500 dark:text-steel-300 mb-6 max-w-2xl leading-relaxed">
          Thomas Schelling distinguished two coercive logics: <em>compellence</em> (forcing
          an adversary to change behaviour through imposed costs) and <em>deterrence</em> (dissuading
          action by signalling capability and willingness to retaliate).
          Cyber operations often blur this distinction, the same intrusion
          can serve as intelligence collection <em>and</em> a latent threat.
          This split offers an analytical lens, not a definitive classification.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compellence column */}
          <div className="rounded-xl border-2 border-signal-200/50 dark:border-signal-700/30 overflow-hidden">
            <div className="px-5 py-3.5 bg-signal-50/60 dark:bg-signal-900/10 border-b border-signal-200/40 dark:border-signal-700/25">
              <h3 className="text-sm font-bold text-signal-700 dark:text-signal-300 uppercase tracking-wider">
                Compellence
              </h3>
              <p className="text-xs text-signal-600/80 dark:text-signal-400/70 mt-0.5">
                Operations that impose costs to force a change in behaviour
              </p>
            </div>
            <div className="divide-y divide-signal-200/20 dark:divide-signal-800/20">
              {compellence.map(({ incident, reasoning }) => (
                <a
                  key={incident.id}
                  href={`/cases/${incident.slug}`}
                  className="flex gap-3 px-5 py-3 hover:bg-signal-50/40 dark:hover:bg-signal-900/5 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink dark:text-white">
                      {incident.shortName}
                      <span className="text-xs text-steel-500 dark:text-steel-400 ml-1.5 font-normal">
                        {incident.dateRange}
                      </span>
                    </p>
                    <p className="text-xs text-steel-500 dark:text-steel-400 mt-0.5 leading-relaxed">
                      {reasoning}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <Badge variant={incidentTypeBadge[incident.incidentType]}>
                      {incidentTypeLabels[incident.incidentType]}
                    </Badge>
                    <span className="text-[10px] font-mono text-steel-500 dark:text-ink-400">
                      {unpeaceScore(incident) * 10}
                    </span>
                  </div>
                </a>
              ))}
              {compellence.length === 0 && (
                <p className="px-5 py-4 text-sm text-steel-500 dark:text-ink-400 italic">
                  No incidents classified as compellent in this dataset.
                </p>
              )}
            </div>
          </div>

          {/* Deterrence column */}
          <div className="rounded-xl border-2 border-atlas-200/50 dark:border-atlas-700/30 overflow-hidden">
            <div className="px-5 py-3.5 bg-atlas-50/60 dark:bg-atlas-900/10 border-b border-atlas-200/40 dark:border-atlas-700/25">
              <h3 className="text-sm font-bold text-atlas-700 dark:text-atlas-400 uppercase tracking-wider">
                Deterrence
              </h3>
              <p className="text-xs text-atlas-600/80 dark:text-atlas-400/70 mt-0.5">
                Operations that signal capability without imposing irreversible harm
              </p>
            </div>
            <div className="divide-y divide-atlas-200/20 dark:divide-atlas-800/20">
              {deterrence.map(({ incident, reasoning }) => (
                <a
                  key={incident.id}
                  href={`/cases/${incident.slug}`}
                  className="flex gap-3 px-5 py-3 hover:bg-atlas-50/40 dark:hover:bg-atlas-900/5 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink dark:text-white">
                      {incident.shortName}
                      <span className="text-xs text-steel-500 dark:text-steel-400 ml-1.5 font-normal">
                        {incident.dateRange}
                      </span>
                    </p>
                    <p className="text-xs text-steel-500 dark:text-steel-400 mt-0.5 leading-relaxed">
                      {reasoning}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <Badge variant={incidentTypeBadge[incident.incidentType]}>
                      {incidentTypeLabels[incident.incidentType]}
                    </Badge>
                    <span className="text-[10px] font-mono text-steel-500 dark:text-ink-400">
                      {unpeaceScore(incident) * 10}
                    </span>
                  </div>
                </a>
              ))}
              {deterrence.length === 0 && (
                <p className="px-5 py-4 text-sm text-steel-500 dark:text-ink-400 italic">
                  No incidents classified as deterrent in this dataset.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Analytical caveat */}
        <div className="mt-6 p-4 rounded-xl border border-steel-200/20 dark:border-ink-600/25 bg-ink-50/30 dark:bg-ink-800/20">
          <p className="text-xs text-steel-500 dark:text-steel-400 leading-relaxed">
            <strong className="text-ink dark:text-ink-100">Analytical note:</strong>{" "}
            This classification uses the operation&apos;s primary coercive
            function as a heuristic. Many operations serve both logics
            simultaneously, an espionage campaign that pre-positions
            destructive capabilities deters through demonstrated access
            while also enabling future compellence. The distinction is
            most useful as a teaching tool for examining how states
            signal intent through cyber operations, not as a rigid taxonomy.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Governance-aware framing note                          */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="p-5 rounded-xl border-l-4 border-atlas-500 bg-atlas-50/40 dark:bg-atlas-900/10">
          <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-400 uppercase tracking-wider mb-2">
            On reading escalation
          </p>
          <p className="text-sm text-ink dark:text-white leading-relaxed">
            Escalation is not a conveyor belt, incidents do not inevitably
            progress from probing to destruction. Restraint is as analytically
            important as escalation. States frequently choose <em>not</em> to
            escalate, and understanding those choices requires examining
            governance constraints, norm commitments, and deterrence
            calculations alongside technical capabilities.
          </p>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mt-2">
            The categories and positions shown here are derived from the
            dataset&apos;s incident records. They reflect analytical judgement,
            not predictive modelling. All assessments should be read alongside
            the source material linked in each case.
          </p>
        </div>
      </section>
    </div>
  );
}
