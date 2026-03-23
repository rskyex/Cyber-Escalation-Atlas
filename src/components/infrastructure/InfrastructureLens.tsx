"use client";

import { useState } from "react";
import type { Incident, TargetSector } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  unpeaceScore,
  entanglementScore,
  escalationTierLabels,
  escalationTierBadge,
  incidentTypeLabels,
  incidentTypeBadge,
  tierIndex,
} from "@/lib/utils/incidents";

// ---------------------------------------------------------------------------
// Sector definitions — static analytical content for each of the 8 sectors
// ---------------------------------------------------------------------------

interface SectorDef {
  id: string;
  label: string;
  /** TargetSector values in the dataset that map to this sector */
  dataKeys: TargetSector[];
  /** Also match incidents tagged "critical-infrastructure" or "multiple" */
  broadMatch: boolean;
  strategicImportance: string;
  dependencies: string[];
  typicalCyberEffects: string[];
  escalationProneness: "low" | "moderate" | "high" | "very-high";
  escalationPronenessReason: string;
  governanceVulnerabilities: string[];
}

const SECTORS: SectorDef[] = [
  {
    id: "energy",
    label: "Energy",
    dataKeys: ["energy"],
    broadMatch: true,
    strategicImportance:
      "Electrical grids, oil and gas pipelines, and fuel distribution underpin every other sector. Disruption cascades into healthcare, finance, transport, and communications within hours.",
    dependencies: [
      "SCADA / ICS control systems",
      "Fuel supply chains and refining",
      "Cross-border interconnections (gas pipelines, power grids)",
    ],
    typicalCyberEffects: [
      "Load-shedding or blackout via ICS manipulation",
      "Pipeline shutdown through IT/OT boundary compromise",
      "Data destruction to delay restoration",
    ],
    escalationProneness: "very-high",
    escalationPronenessReason:
      "Energy disruption has immediate civilian impact and is treated by most states as an armed-attack equivalent under certain conditions. Operations here risk rapid cross-domain escalation.",
    governanceVulnerabilities: [
      "Patchwork of national vs. regional energy regulators",
      "Legacy OT systems with multi-decade replacement cycles",
      "Ambiguity over whether energy disruption triggers Article 5 or equivalent collective defence",
    ],
  },
  {
    id: "telecom",
    label: "Telecommunications",
    dataKeys: ["telecommunications"],
    broadMatch: false,
    strategicImportance:
      "Telecommunications networks carry military, government, and civilian traffic. Compromising telecom provides both intelligence access and the ability to degrade command-and-control in a conflict.",
    dependencies: [
      "Undersea cable and satellite backhaul",
      "Mobile network operators and backbone ISPs",
      "DNS and routing infrastructure",
    ],
    typicalCyberEffects: [
      "Persistent espionage via network equipment implants",
      "Service disruption through BGP hijacking or DDoS",
      "Wiretapping and metadata collection at scale",
    ],
    escalationProneness: "high",
    escalationPronenessReason:
      "Telecom compromise is often treated as strategic espionage — tolerated until discovered, then intensely destabilising because it reveals the depth of adversary access.",
    governanceVulnerabilities: [
      "Global supply chain for network equipment (vendor trust issues)",
      "Fragmented regulation across jurisdictions",
      "Dual-use nature of lawful intercept capabilities",
    ],
  },
  {
    id: "finance",
    label: "Finance",
    dataKeys: ["finance"],
    broadMatch: false,
    strategicImportance:
      "Banking systems, payment networks, and central bank infrastructure sustain economic stability. Cyber operations against finance can destabilise currencies, freeze commerce, or fund adversary programmes.",
    dependencies: [
      "SWIFT and interbank settlement systems",
      "Stock exchanges and clearinghouses",
      "Central bank reserve management",
    ],
    typicalCyberEffects: [
      "Fraudulent fund transfer (e.g., SWIFT manipulation)",
      "Ransomware disrupting payment processing",
      "Data theft enabling sanctions evasion or market manipulation",
    ],
    escalationProneness: "moderate",
    escalationPronenessReason:
      "Financial attacks cause significant economic harm but are less likely to trigger kinetic responses than critical-infrastructure attacks — unless attributed to a state pursuing strategic economic coercion.",
    governanceVulnerabilities: [
      "Cross-border regulatory gaps (national vs. international banking rules)",
      "Cryptocurrency as a sanctions-evasion channel",
      "Concentration of risk in a few global payment networks",
    ],
  },
  {
    id: "ports-logistics",
    label: "Ports & Logistics",
    dataKeys: ["transportation"],
    broadMatch: true,
    strategicImportance:
      "Maritime ports, airports, and logistics networks move goods, military materiel, and humanitarian aid. Disruption can stall supply chains across continents.",
    dependencies: [
      "Port terminal operating systems",
      "Shipping container tracking and customs IT",
      "Intermodal logistics coordination (rail, truck, sea)",
    ],
    typicalCyberEffects: [
      "Terminal shutdowns via ransomware or wipers",
      "Cargo tracking disruption causing supply chain delays",
      "Collateral disruption from cross-sector operations (e.g., NotPetya on Maersk)",
    ],
    escalationProneness: "high",
    escalationPronenessReason:
      "Logistics disruption has immediate economic and potentially military implications. States that depend on just-in-time supply chains are disproportionately vulnerable.",
    governanceVulnerabilities: [
      "International Maritime Organisation (IMO) cyber guidelines are non-binding",
      "Port IT often managed by private operators with variable security postures",
      "Dual-use port infrastructure (commercial + military)",
    ],
  },
  {
    id: "health",
    label: "Healthcare",
    dataKeys: ["healthcare"],
    broadMatch: false,
    strategicImportance:
      "Hospitals, pharmaceutical manufacturing, and public health agencies are essential to population welfare. Cyber operations here carry direct risk to human life.",
    dependencies: [
      "Hospital information systems and medical devices",
      "Pharmaceutical supply chains",
      "Public health surveillance and reporting systems",
    ],
    typicalCyberEffects: [
      "Ransomware forcing hospital diversions and surgery delays",
      "Pharmaceutical IP theft (vaccine research, drug formulations)",
      "Patient data theft enabling coercion or influence operations",
    ],
    escalationProneness: "moderate",
    escalationPronenessReason:
      "Healthcare attacks generate strong normative condemnation but are rarely attributed to states — making escalation less likely even when harm is severe.",
    governanceVulnerabilities: [
      "WHO and ICRC norms against targeting healthcare lack enforcement mechanisms",
      "HIPAA and equivalents focus on privacy, not operational resilience",
      "Under-funded IT security in public health systems globally",
    ],
  },
  {
    id: "government",
    label: "Government",
    dataKeys: ["government", "defense"],
    broadMatch: false,
    strategicImportance:
      "Government networks hold classified data, citizen records, and command-and-control systems. Compromise enables strategic espionage, influence operations, and pre-positioning for conflict.",
    dependencies: [
      "Classified networks and diplomatic communications",
      "Identity management and citizen services",
      "Defence command-and-control systems",
    ],
    typicalCyberEffects: [
      "Large-scale espionage via supply chain or zero-day exploitation",
      "Destructive attacks on government IT to punish or coerce",
      "Election infrastructure interference and influence operations",
    ],
    escalationProneness: "high",
    escalationPronenessReason:
      "Operations against government networks are inherently political. Public attribution raises pressure for response, and classified-data theft can shift strategic balances.",
    governanceVulnerabilities: [
      "Sovereign immunity complicates cross-border investigation",
      "Intelligence agencies exempt from many civilian security standards",
      "Attribution-response gap: states may know the attacker but lack proportionate response options",
    ],
  },
  {
    id: "space",
    label: "Space Systems",
    dataKeys: [],
    broadMatch: true,
    strategicImportance:
      "Satellites provide GPS/GNSS timing, military communications, ISR, and early warning. Ground segment compromise can degrade these capabilities without kinetic anti-satellite weapons.",
    dependencies: [
      "Satellite ground stations and command uplinks",
      "GPS/GNSS timing signals (used in finance, telecom, power grids)",
      "Space situational awareness networks",
    ],
    typicalCyberEffects: [
      "Satellite modem wiping (e.g., Viasat KA-SAT attack)",
      "GPS spoofing or jamming affecting navigation and precision timing",
      "Ground station compromise enabling satellite control manipulation",
    ],
    escalationProneness: "very-high",
    escalationPronenessReason:
      "Space assets are strategic military infrastructure. Interference with satellites — even via cyber means — is increasingly viewed through a deterrence lens by major space-faring states.",
    governanceVulnerabilities: [
      "Outer Space Treaty (1967) pre-dates cyber threats; no cyber-specific provisions",
      "Commercial satellite operators subject to minimal security regulation",
      "Dual-use satellites blur civilian/military targeting distinctions",
    ],
  },
  {
    id: "nuclear",
    label: "Nuclear Facilities",
    dataKeys: [],
    broadMatch: true,
    strategicImportance:
      "Nuclear power plants and enrichment facilities represent the intersection of energy, non-proliferation, and existential risk. Cyber operations here carry unique escalation potential.",
    dependencies: [
      "Industrial control systems (PLCs, safety instrumented systems)",
      "Nuclear material accounting and safeguards systems",
      "IAEA inspection and monitoring infrastructure",
    ],
    typicalCyberEffects: [
      "Centrifuge sabotage via PLC manipulation (Stuxnet model)",
      "Safety system interference risking reactor incidents",
      "Safeguards data manipulation undermining non-proliferation verification",
    ],
    escalationProneness: "very-high",
    escalationPronenessReason:
      "Any cyber operation against nuclear facilities is treated as a potential red-line crossing. The Stuxnet precedent established that cyber sabotage of nuclear programmes is a viable coercive tool — but one that risks severe retaliation.",
    governanceVulnerabilities: [
      "IAEA Computer Security Guidelines are non-binding recommendations",
      "Air-gapping assumptions have been repeatedly violated in practice",
      "Tension between non-proliferation objectives and sovereignty over nuclear programmes",
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const pronenessColors: Record<SectorDef["escalationProneness"], { bg: string; text: string; label: string }> = {
  low: { bg: "bg-teal-50 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300", label: "Low" },
  moderate: { bg: "bg-navy-100 dark:bg-navy-600/40", text: "text-navy dark:text-navy-100", label: "Moderate" },
  high: { bg: "bg-amber-50 dark:bg-amber-900/25", text: "text-amber-700 dark:text-amber-300", label: "High" },
  "very-high": { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", label: "Very High" },
};

function matchIncidents(sector: SectorDef, incidents: Incident[]): Incident[] {
  return incidents.filter((inc) => {
    const sectors = inc.infrastructure.targetSectors;
    // Direct key match
    if (sector.dataKeys.some((k) => sectors.includes(k))) return true;
    // Broad match: incidents tagged "critical-infrastructure" or "multiple"
    // are relevant to certain physical sectors
    if (sector.broadMatch) {
      // Space: match Viasat specifically (defense + telecommunications + energy tagged as critical-infrastructure)
      if (sector.id === "space" && inc.slug === "viasat-kasat") return true;
      // Nuclear: match Stuxnet and Iran nuclear cyber
      if (sector.id === "nuclear" && (inc.slug === "stuxnet" || inc.slug === "iran-nuclear-cyber")) return true;
      // Energy and ports-logistics: also match critical-infrastructure tagged incidents
      if (sector.dataKeys.length > 0 && sectors.includes("critical-infrastructure")) {
        // Only if incident plausibly targets this sector
        if (sector.id === "energy" && (sectors.includes("energy") || sectors.includes("critical-infrastructure"))) return true;
        if (sector.id === "ports-logistics" && (sectors.includes("transportation") || inc.slug === "notpetya")) return true;
      }
    }
    return false;
  });
}

function avgEntanglement(incidents: Incident[]): number {
  if (incidents.length === 0) return 0;
  const total = incidents.reduce((sum, inc) => sum + entanglementScore(inc), 0);
  return Math.round((total / incidents.length) * 10) / 10;
}

function peakTierInSet(incidents: Incident[]): string {
  if (incidents.length === 0) return "—";
  let maxIdx = -1;
  let maxTier = "";
  for (const inc of incidents) {
    const idx = tierIndex(inc.escalation.peakTier);
    if (idx > maxIdx) {
      maxIdx = idx;
      maxTier = escalationTierLabels[inc.escalation.peakTier];
    }
  }
  return maxTier;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-slate dark:text-navy-300">{label}</span>
      <span className="text-xs font-semibold text-navy dark:text-offwhite">{value}</span>
    </div>
  );
}

function SectorCard({
  sector,
  incidents,
  isExpanded,
  onToggle,
}: {
  sector: SectorDef;
  incidents: Incident[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const matched = matchIncidents(sector, incidents);
  const proneness = pronenessColors[sector.escalationProneness];
  const avgEnt = avgEntanglement(matched);
  const peak = peakTierInSet(matched);

  return (
    <div className="rounded-lg border border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/20 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-navy-50/30 dark:hover:bg-navy-700/30 transition-colors"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-navy dark:text-offwhite">
              {sector.label}
            </h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${proneness.bg} ${proneness.text}`}>
              {proneness.label} escalation risk
            </span>
          </div>
          <p className="text-sm text-slate dark:text-navy-200 mt-1 leading-relaxed line-clamp-2">
            {sector.strategicImportance}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3 pt-1">
          <span className="text-xs text-navy-300 dark:text-navy-400 font-mono">
            {matched.length} case{matched.length !== 1 ? "s" : ""}
          </span>
          <svg
            className={`w-4 h-4 text-navy-300 dark:text-navy-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-navy-200/15 dark:border-navy-600/25">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-navy-200/15 dark:divide-navy-600/25">
            {/* Left: Analytical details */}
            <div className="p-5 lg:col-span-2 space-y-5">
              {/* Strategic importance */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1.5">
                  Strategic Importance
                </p>
                <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
                  {sector.strategicImportance}
                </p>
              </div>

              {/* Dependencies */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1.5">
                  Key Dependencies
                </p>
                <ul className="space-y-1">
                  {sector.dependencies.map((dep) => (
                    <li key={dep} className="text-sm text-slate dark:text-navy-200 flex items-start gap-2">
                      <span className="text-navy-300 dark:text-navy-500 mt-1 shrink-0">·</span>
                      {dep}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Typical cyber effects */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1.5">
                  Typical Cyber Effects
                </p>
                <ul className="space-y-1">
                  {sector.typicalCyberEffects.map((effect) => (
                    <li key={effect} className="text-sm text-slate dark:text-navy-200 flex items-start gap-2">
                      <span className="text-navy-300 dark:text-navy-500 mt-1 shrink-0">·</span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Escalation proneness */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1.5">
                  Escalation Proneness
                </p>
                <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
                  {sector.escalationPronenessReason}
                </p>
              </div>

              {/* Governance vulnerabilities */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1.5">
                  Governance Vulnerabilities
                </p>
                <ul className="space-y-1">
                  {sector.governanceVulnerabilities.map((vuln) => (
                    <li key={vuln} className="text-sm text-slate dark:text-navy-200 flex items-start gap-2">
                      <span className="text-amber-400 dark:text-amber-500 mt-1 shrink-0">·</span>
                      {vuln}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Stats + linked cases */}
            <div className="p-5 space-y-5 bg-navy-50/20 dark:bg-navy-800/20">
              {/* Quick stats */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
                  Dataset Summary
                </p>
                <div className="divide-y divide-navy-200/15 dark:divide-navy-600/20">
                  <StatPill label="Linked incidents" value={matched.length} />
                  <StatPill label="Avg. entanglement" value={avgEnt > 0 ? `${avgEnt} / 10` : "—"} />
                  <StatPill label="Peak escalation tier" value={peak} />
                  <StatPill label="Escalation proneness" value={proneness.label} />
                </div>
              </div>

              {/* Linked cases */}
              <div>
                <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2">
                  Relevant Cases
                </p>
                {matched.length === 0 ? (
                  <p className="text-xs text-slate dark:text-navy-400 italic">
                    No incidents in the current dataset directly target this sector.
                    Analytical content is derived from the broader threat landscape.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {matched.map((inc) => (
                      <li key={inc.id}>
                        <a
                          href={`/cases/${inc.slug}`}
                          className="block p-2.5 rounded-md border border-navy-200/20 dark:border-navy-600/25 hover:border-teal-300/50 dark:hover:border-teal-600/40 transition-colors bg-white dark:bg-navy-700/30"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-medium text-navy dark:text-offwhite truncate">
                              {inc.shortName}
                            </span>
                            <span className="text-[10px] font-mono text-slate dark:text-navy-400 shrink-0">
                              {inc.year}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-1.5">
                            <Badge variant={incidentTypeBadge[inc.incidentType]}>
                              {incidentTypeLabels[inc.incidentType]}
                            </Badge>
                            <Badge variant={escalationTierBadge[inc.escalation.peakTier]}>
                              {escalationTierLabels[inc.escalation.peakTier]}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-slate dark:text-navy-300 leading-relaxed line-clamp-2">
                            {inc.infrastructure.impactSummary}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-navy-300 dark:text-navy-500">
                            <span>Unpeace: {unpeaceScore(inc) * 10}</span>
                            <span>Entanglement: {entanglementScore(inc)}/10</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function InfrastructureLens({ incidents }: { incidents: Incident[] }) {
  const [expandedId, setExpandedId] = useState<string | null>("energy");

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Compute overall stats
  const totalLinked = SECTORS.reduce(
    (sum, s) => sum + matchIncidents(s, incidents).length,
    0,
  );
  const veryHighCount = SECTORS.filter((s) => s.escalationProneness === "very-high").length;

  return (
    <div className="space-y-10">
      {/* Overview stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg border border-navy-200/20 dark:border-navy-600/25 bg-white dark:bg-navy-700/20">
          <p className="text-2xl font-bold text-navy dark:text-offwhite">{SECTORS.length}</p>
          <p className="text-xs text-slate dark:text-navy-300">Sectors analysed</p>
        </div>
        <div className="p-3.5 rounded-lg border border-navy-200/20 dark:border-navy-600/25 bg-white dark:bg-navy-700/20">
          <p className="text-2xl font-bold text-navy dark:text-offwhite">{incidents.length}</p>
          <p className="text-xs text-slate dark:text-navy-300">Incidents in dataset</p>
        </div>
        <div className="p-3.5 rounded-lg border border-navy-200/20 dark:border-navy-600/25 bg-white dark:bg-navy-700/20">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-300">{veryHighCount}</p>
          <p className="text-xs text-slate dark:text-navy-300">Very-high escalation sectors</p>
        </div>
        <div className="p-3.5 rounded-lg border border-navy-200/20 dark:border-navy-600/25 bg-white dark:bg-navy-700/20">
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">{totalLinked}</p>
          <p className="text-xs text-slate dark:text-navy-300">Sector–case linkages</p>
        </div>
      </div>

      {/* Sector cards */}
      <section>
        <h2 className="text-lg font-bold text-navy dark:text-offwhite tracking-tight mb-1">
          Sector Analysis
        </h2>
        <p className="text-sm text-slate dark:text-navy-200 mb-6 max-w-2xl leading-relaxed">
          Each sector card presents its strategic significance, dependency
          structure, and governance gaps. Linked cases are drawn from the
          existing dataset — sectors without direct matches include
          analytical context derived from the broader incident landscape.
        </p>

        <div className="space-y-3">
          {SECTORS.map((sector) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              incidents={incidents}
              isExpanded={expandedId === sector.id}
              onToggle={() => toggle(sector.id)}
            />
          ))}
        </div>
      </section>

      {/* Cross-sector note */}
      <section>
        <div className="p-5 rounded-lg border-l-4 border-teal-500 bg-teal-50/40 dark:bg-teal-900/10">
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
            On infrastructure interdependence
          </p>
          <p className="text-sm text-navy dark:text-offwhite leading-relaxed">
            Critical infrastructure sectors do not exist in isolation.
            Energy disruption cascades into telecommunications, healthcare,
            and finance. Space system compromise affects navigation, timing,
            and financial settlement. Understanding cyber escalation requires
            analysing these interdependencies — an operation targeting one
            sector often produces effects across several.
          </p>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed mt-2">
            Governance frameworks remain largely sector-specific, creating
            gaps at the boundaries where cascading effects are most
            dangerous. The entanglement scores shown in each case reflect
            this cross-sector risk.
          </p>
        </div>
      </section>
    </div>
  );
}
