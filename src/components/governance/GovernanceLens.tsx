"use client";

import { useState } from "react";
import type { Incident, GovernanceFlag } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import {
  governanceFlagLabels,
  governanceFlagBadge,
  incidentTypeLabels,
  incidentTypeBadge,
  escalationTierLabels,
  escalationTierBadge,
  unpeaceScore,
} from "@/lib/utils/incidents";

// ---------------------------------------------------------------------------
// Flag analytical definitions
// ---------------------------------------------------------------------------

type ApplicabilityStatus = "yes" | "contested" | "no" | "unclear";

interface FlagAnalysis {
  flag: GovernanceFlag;
  shortExplanation: string;
  ruleCitation: string;
  politicalSignificance: string;
  /** Default applicability for the overall norm */
  defaultStatus: ApplicabilityStatus;
}

const FLAG_ANALYSES: FlagAnalysis[] = [
  {
    flag: "norm-violation",
    shortExplanation:
      "The operation violated or is assessed to have violated an established international norm governing state behaviour in cyberspace. This includes UN GGE consensus norms, OEWG commitments, and customary international law expectations.",
    ruleCitation:
      "UN GGE 2015, §13(f): States should not conduct or knowingly support ICT activity that intentionally damages critical infrastructure. Tallinn Manual 2.0, Rule 4 (Sovereignty), Rule 32 (Prohibition of Intervention).",
    politicalSignificance:
      "Norm-violation findings strengthen the case for collective attribution and countermeasures. They also test whether the norm regime has enforcement credibility — repeated violations without consequences risk hollowing out the framework.",
    defaultStatus: "yes",
  },
  {
    flag: "attribution-public",
    shortExplanation:
      "One or more governments issued a formal public attribution statement identifying the responsible state or state-affiliated actor. Public attribution represents a deliberate policy choice with diplomatic consequences.",
    ruleCitation:
      "There is no treaty obligation to attribute publicly. Practice draws on the Articles on State Responsibility (ILC 2001), Art. 49 (countermeasures) and Tallinn Manual 2.0, Rule 17 (Due Diligence). States increasingly treat public attribution as a norm-enforcement tool.",
    politicalSignificance:
      "Public attribution transforms a technical incident into a diplomatic event. It constrains future deniability, shapes alliance solidarity, and creates expectations for follow-on measures. Coordinated multi-state attribution amplifies political pressure.",
    defaultStatus: "yes",
  },
  {
    flag: "sanctions-imposed",
    shortExplanation:
      "Targeted sanctions — asset freezes, travel bans, or sectoral restrictions — were imposed on individuals, entities, or state bodies linked to the operation. Sanctions represent one of the strongest non-kinetic responses available.",
    ruleCitation:
      "UN Charter Art. 41 (measures not involving armed force); US Executive Orders 13694 & 13757 (cyber sanctions); EU Council Decision 2019/797 (cyber sanctions framework); Tallinn Manual 2.0, Rule 20 (Countermeasures).",
    politicalSignificance:
      "Sanctions signal that cyber operations carry material costs. Their effectiveness depends on coalition breadth, target vulnerability to financial isolation, and willingness to sustain them over time. Unilateral sanctions are easier to impose but weaker in effect.",
    defaultStatus: "yes",
  },
  {
    flag: "indictment",
    shortExplanation:
      "Criminal indictments were filed against named individuals — typically intelligence officers, military personnel, or state-affiliated hackers. Indictments personalise accountability and create lasting legal jeopardy.",
    ruleCitation:
      "US Computer Fraud and Abuse Act (18 U.S.C. §1030); Economic Espionage Act (18 U.S.C. §1831); Mutual Legal Assistance Treaties (MLATs). Tallinn Manual 2.0, Rule 2 (Jurisdiction).",
    politicalSignificance:
      "Indictments serve a dual function: legal accountability and strategic messaging. Named individuals face travel restrictions and personal consequences, even if extradition is unlikely. The evidentiary standard required lends credibility to attribution claims.",
    defaultStatus: "yes",
  },
  {
    flag: "un-discussion",
    shortExplanation:
      "The operation or its consequences were formally discussed in a UN body — the General Assembly, Security Council, GGE, or OEWG. This elevates the incident from bilateral dispute to multilateral governance concern.",
    ruleCitation:
      "UN Charter Art. 35 (referral to Security Council); UNGA Res. 70/237 (GGE mandate); OEWG annual sessions. Tallinn Manual 2.0 does not directly address UN processes but informs the expert discourse that shapes them.",
    politicalSignificance:
      "UN discussion legitimises the incident as a matter of international peace and security. It creates a textual record that shapes norm interpretation and can catalyse new governance instruments. However, Security Council action requires P5 consensus, which is rarely achievable for cyber incidents.",
    defaultStatus: "contested",
  },
  {
    flag: "regulatory-change",
    shortExplanation:
      "The incident triggered or materially accelerated regulatory or policy changes — new legislation, executive orders, mandatory reporting requirements, or sector-specific security standards.",
    ruleCitation:
      "Examples include: US EO 14028 (Improving the Nation's Cybersecurity, 2021); EU NIS2 Directive (2022); CISA Binding Operational Directives. Tallinn Manual 2.0, Rule 6 (Due Diligence) provides the normative foundation for regulatory obligations.",
    politicalSignificance:
      "Regulatory change is the most durable governance response — it alters baseline security requirements long after the incident fades from headlines. However, it is often slow, sector-specific, and subject to implementation gaps across jurisdictions.",
    defaultStatus: "yes",
  },
  {
    flag: "international-cooperation",
    shortExplanation:
      "The response to the operation involved formal international cooperation — joint attribution statements, coordinated law enforcement action, shared intelligence, or multilateral technical assistance.",
    ruleCitation:
      "UN GGE 2015, §13(c): States should cooperate to prevent malicious ICT activities. Budapest Convention on Cybercrime, Art. 29–35 (international cooperation). Tallinn Manual 2.0, Rule 6 (Due Diligence), Rule 14 (Cooperation).",
    politicalSignificance:
      "International cooperation demonstrates that cyber incidents can mobilise collective responses, strengthening deterrence. It also builds institutional capacity for future crises. The depth of cooperation varies significantly — from Five Eyes coordination to broader multilateral efforts.",
    defaultStatus: "yes",
  },
  {
    flag: "deterrence-signal",
    shortExplanation:
      "The incident or its response was used — explicitly or implicitly — to signal deterrence: demonstrating capability, willingness to retaliate, or establishing red lines. Deterrence signalling can come from either the attacker or the defender.",
    ruleCitation:
      "No direct treaty basis. Draws on strategic deterrence theory (Schelling, 1966) and emerging cyber deterrence doctrine. Tallinn Manual 2.0, Rule 20 (Countermeasures) and Rule 22 (Necessity) provide the legal framework within which deterrence operates.",
    politicalSignificance:
      "Deterrence signalling in cyberspace remains deeply contested. Unlike nuclear deterrence, cyber capabilities cannot be demonstrated without revealing them. The credibility of deterrence threats depends on demonstrated willingness to impose costs — which is why public attribution and sanctions often serve a deterrence function.",
    defaultStatus: "contested",
  },
];

// ---------------------------------------------------------------------------
// Status badge component
// ---------------------------------------------------------------------------

const statusConfig: Record<ApplicabilityStatus, { label: string; bg: string; text: string }> = {
  yes: {
    label: "Applicable",
    bg: "bg-teal-50 dark:bg-teal-900/30",
    text: "text-teal-700 dark:text-teal-300",
  },
  contested: {
    label: "Contested",
    bg: "bg-amber-50 dark:bg-amber-900/25",
    text: "text-amber-700 dark:text-amber-300",
  },
  no: {
    label: "Not applicable",
    bg: "bg-navy-100 dark:bg-navy-600/40",
    text: "text-navy dark:text-navy-200",
  },
  unclear: {
    label: "Unclear",
    bg: "bg-navy-50 dark:bg-navy-700/30",
    text: "text-slate dark:text-navy-300",
  },
};

function StatusBadge({ status }: { status: ApplicabilityStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${cfg.bg} ${cfg.text}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "yes"
            ? "bg-teal-500"
            : status === "contested"
              ? "bg-amber-500"
              : status === "no"
                ? "bg-navy-300 dark:bg-navy-500"
                : "bg-slate/40 dark:bg-navy-500"
        }`}
      />
      {cfg.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Per-incident flag applicability heuristic
// ---------------------------------------------------------------------------

function incidentFlagStatus(
  incident: Incident,
  flag: GovernanceFlag,
): ApplicabilityStatus {
  const hasFlag = incident.governance.flags.includes(flag);
  if (hasFlag) return "yes";

  // Check if the incident's norms/policies suggest relevance
  const norms = incident.governance.normsInvoked.join(" ").toLowerCase();
  const policies = incident.governance.policyResponses.join(" ").toLowerCase();
  const combined = norms + " " + policies;

  switch (flag) {
    case "norm-violation":
      if (combined.includes("norm") || combined.includes("tallinn") || combined.includes("gge"))
        return "contested";
      return "no";
    case "attribution-public":
      if (combined.includes("attribution") || combined.includes("identified"))
        return "contested";
      return "no";
    case "sanctions-imposed":
      if (combined.includes("sanction")) return "contested";
      return "no";
    case "indictment":
      if (combined.includes("indict") || combined.includes("charged") || combined.includes("doj"))
        return "contested";
      return "no";
    case "un-discussion":
      if (combined.includes("un ") || combined.includes("unga") || combined.includes("security council"))
        return "contested";
      return "unclear";
    case "regulatory-change":
      if (combined.includes("regulat") || combined.includes("directive") || combined.includes("executive order"))
        return "contested";
      return "no";
    case "international-cooperation":
      if (combined.includes("cooperat") || combined.includes("joint") || combined.includes("multilateral"))
        return "contested";
      return "no";
    case "deterrence-signal":
      if (combined.includes("deter") || combined.includes("signal") || combined.includes("red line"))
        return "contested";
      return "unclear";
    default:
      return "unclear";
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FlagOverviewGrid({
  incidents,
  onSelectFlag,
  selectedFlag,
}: {
  incidents: Incident[];
  onSelectFlag: (flag: GovernanceFlag) => void;
  selectedFlag: GovernanceFlag | null;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {FLAG_ANALYSES.map(({ flag, shortExplanation, defaultStatus }) => {
        const count = incidents.filter((i) =>
          i.governance.flags.includes(flag),
        ).length;
        const isSelected = selectedFlag === flag;

        return (
          <button
            key={flag}
            onClick={() => onSelectFlag(flag)}
            className={`text-left p-4 rounded-lg border transition-all ${
              isSelected
                ? "border-teal-400 dark:border-teal-500 bg-teal-50/50 dark:bg-teal-900/15 ring-1 ring-teal-400/30 dark:ring-teal-500/20"
                : "border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/20 hover:border-navy-300/40 dark:hover:border-navy-500/40"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className={`text-sm font-bold leading-snug ${
                  isSelected
                    ? "text-teal-700 dark:text-teal-300"
                    : "text-navy dark:text-offwhite"
                }`}
              >
                {governanceFlagLabels[flag]}
              </h3>
              <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-navy-100/60 dark:bg-navy-600/40 text-xs font-bold text-navy dark:text-navy-100">
                {count}
              </span>
            </div>
            <p className="text-xs text-slate dark:text-navy-300 leading-relaxed line-clamp-3 mb-3">
              {shortExplanation}
            </p>
            <StatusBadge status={defaultStatus} />
          </button>
        );
      })}
    </div>
  );
}

function FlagDetailPanel({
  analysis,
  incidents,
}: {
  analysis: FlagAnalysis;
  incidents: Incident[];
}) {
  const matchedIncidents = incidents.filter((i) =>
    i.governance.flags.includes(analysis.flag),
  );
  const relatedIncidents = incidents.filter(
    (i) =>
      !i.governance.flags.includes(analysis.flag) &&
      incidentFlagStatus(i, analysis.flag) === "contested",
  );

  return (
    <div className="rounded-lg border-2 border-teal-300/40 dark:border-teal-600/30 bg-white dark:bg-navy-700/20 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 bg-teal-50/40 dark:bg-teal-900/10 border-b border-teal-200/30 dark:border-teal-700/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-navy dark:text-offwhite tracking-tight">
              {governanceFlagLabels[analysis.flag]}
            </h3>
            <p className="text-sm text-slate dark:text-navy-200 mt-1 leading-relaxed max-w-2xl">
              {analysis.shortExplanation}
            </p>
          </div>
          <StatusBadge status={analysis.defaultStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-navy-200/15 dark:divide-navy-600/20">
        {/* Left: Analysis (3 cols) */}
        <div className="lg:col-span-3 p-6 space-y-6">
          {/* Rule citation */}
          <div>
            <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
              Rule Citation
            </p>
            <div className="p-3.5 rounded-md bg-navy-50/40 dark:bg-navy-800/30 border border-navy-200/15 dark:border-navy-600/20">
              <p className="text-sm text-navy dark:text-navy-100 leading-relaxed font-serif italic">
                {analysis.ruleCitation}
              </p>
            </div>
          </div>

          {/* Political significance */}
          <div>
            <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
              Political Significance
            </p>
            <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
              {analysis.politicalSignificance}
            </p>
          </div>

          {/* Applicability across dataset */}
          <div>
            <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
              Status Across Dataset
            </p>
            <div className="flex flex-wrap gap-2">
              {(["yes", "contested", "no", "unclear"] as ApplicabilityStatus[]).map(
                (status) => {
                  const count = incidents.filter(
                    (i) => incidentFlagStatus(i, analysis.flag) === status,
                  ).length;
                  if (count === 0) return null;
                  return (
                    <div key={status} className="flex items-center gap-1.5">
                      <StatusBadge status={status} />
                      <span className="text-xs text-slate dark:text-navy-400">
                        ({count})
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* Right: Linked cases (2 cols) */}
        <div className="lg:col-span-2 p-6 bg-navy-50/15 dark:bg-navy-800/15">
          {/* Triggered cases */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2.5">
              Flag Triggered ({matchedIncidents.length})
            </p>
            {matchedIncidents.length === 0 ? (
              <p className="text-xs text-slate dark:text-navy-400 italic">
                No incidents in the dataset trigger this flag.
              </p>
            ) : (
              <ul className="space-y-2">
                {matchedIncidents.map((inc) => (
                  <li key={inc.id}>
                    <a
                      href={`/cases/${inc.slug}`}
                      className="block p-3 rounded-md border border-navy-200/20 dark:border-navy-600/25 bg-white dark:bg-navy-700/30 hover:border-teal-300/50 dark:hover:border-teal-600/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-medium text-navy dark:text-offwhite truncate">
                          {inc.shortName}
                        </span>
                        <StatusBadge status="yes" />
                      </div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        <Badge variant={incidentTypeBadge[inc.incidentType]}>
                          {incidentTypeLabels[inc.incidentType]}
                        </Badge>
                        <Badge variant={escalationTierBadge[inc.escalation.peakTier]}>
                          {escalationTierLabels[inc.escalation.peakTier]}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate dark:text-navy-300 leading-relaxed">
                        {inc.dateRange} · Unpeace {unpeaceScore(inc) * 10}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contested / related */}
          {relatedIncidents.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-2.5">
                Contested Applicability ({relatedIncidents.length})
              </p>
              <ul className="space-y-1.5">
                {relatedIncidents.map((inc) => (
                  <li key={inc.id}>
                    <a
                      href={`/cases/${inc.slug}`}
                      className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-navy-50/50 dark:hover:bg-navy-700/40 transition-colors"
                    >
                      <span className="text-sm text-navy dark:text-navy-100 truncate">
                        {inc.shortName}
                      </span>
                      <StatusBadge status="contested" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cross-flag matrix
// ---------------------------------------------------------------------------

function GovernanceMatrix({ incidents }: { incidents: Incident[] }) {
  const flags = FLAG_ANALYSES.map((a) => a.flag);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 font-semibold text-navy dark:text-navy-100 border-b border-navy-200/20 dark:border-navy-600/25 min-w-[140px]">
              Incident
            </th>
            {flags.map((f) => (
              <th
                key={f}
                className="p-2 font-semibold text-navy dark:text-navy-100 border-b border-navy-200/20 dark:border-navy-600/25 text-center whitespace-nowrap"
                title={governanceFlagLabels[f]}
              >
                <span className="hidden lg:inline">{governanceFlagLabels[f]}</span>
                <span className="lg:hidden">{abbreviateFlag(f)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc) => (
            <tr
              key={inc.id}
              className="border-b border-navy-200/10 dark:border-navy-600/15 hover:bg-navy-50/30 dark:hover:bg-navy-700/20"
            >
              <td className="p-2">
                <a
                  href={`/cases/${inc.slug}`}
                  className="text-navy dark:text-offwhite hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors"
                >
                  {inc.shortName}
                </a>
              </td>
              {flags.map((f) => {
                const status = incidentFlagStatus(inc, f);
                return (
                  <td key={f} className="p-2 text-center">
                    <MatrixDot status={status} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MatrixDot({ status }: { status: ApplicabilityStatus }) {
  const colors: Record<ApplicabilityStatus, string> = {
    yes: "bg-teal-500",
    contested: "bg-amber-400",
    no: "bg-navy-200 dark:bg-navy-600",
    unclear: "bg-navy-100 dark:bg-navy-700",
  };
  const labels: Record<ApplicabilityStatus, string> = {
    yes: "Yes",
    contested: "Contested",
    no: "No",
    unclear: "Unclear",
  };
  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colors[status]}`}
      title={labels[status]}
    />
  );
}

function abbreviateFlag(flag: GovernanceFlag): string {
  const abbr: Record<GovernanceFlag, string> = {
    "norm-violation": "Norm",
    "attribution-public": "Attr",
    "sanctions-imposed": "Sanc",
    indictment: "Indt",
    "un-discussion": "UN",
    "regulatory-change": "Reg",
    "international-cooperation": "Coop",
    "deterrence-signal": "Det",
  };
  return abbr[flag];
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function GovernanceLens({ incidents }: { incidents: Incident[] }) {
  const [selectedFlag, setSelectedFlag] = useState<GovernanceFlag | null>(null);

  const selectedAnalysis = selectedFlag
    ? FLAG_ANALYSES.find((a) => a.flag === selectedFlag) ?? null
    : null;

  // Compute summary stats
  const totalFlagInstances = incidents.reduce(
    (sum, inc) => sum + inc.governance.flags.length,
    0,
  );
  const avgFlags = (totalFlagInstances / incidents.length).toFixed(1);
  const mostCommonFlag = FLAG_ANALYSES.reduce(
    (best, a) => {
      const count = incidents.filter((i) =>
        i.governance.flags.includes(a.flag),
      ).length;
      return count > best.count ? { flag: a.flag, count } : best;
    },
    { flag: "norm-violation" as GovernanceFlag, count: 0 },
  );

  return (
    <div className="space-y-12">
      {/* ----------------------------------------------------------------- */}
      {/* Summary statistics                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg border border-teal-200/30 dark:border-teal-700/25 bg-teal-50/30 dark:bg-teal-900/10">
          <p className="text-2xl font-bold text-teal-700 dark:text-teal-300">{FLAG_ANALYSES.length}</p>
          <p className="text-xs text-slate dark:text-navy-300">Governance flags tracked</p>
        </div>
        <div className="p-4 rounded-lg border border-teal-200/30 dark:border-teal-700/25 bg-teal-50/30 dark:bg-teal-900/10">
          <p className="text-2xl font-bold text-teal-700 dark:text-teal-300">{totalFlagInstances}</p>
          <p className="text-xs text-slate dark:text-navy-300">Total flag instances</p>
        </div>
        <div className="p-4 rounded-lg border border-teal-200/30 dark:border-teal-700/25 bg-teal-50/30 dark:bg-teal-900/10">
          <p className="text-2xl font-bold text-teal-700 dark:text-teal-300">{avgFlags}</p>
          <p className="text-xs text-slate dark:text-navy-300">Avg. flags per incident</p>
        </div>
        <div className="p-4 rounded-lg border border-teal-200/30 dark:border-teal-700/25 bg-teal-50/30 dark:bg-teal-900/10">
          <p className="text-2xl font-bold text-teal-700 dark:text-teal-300">
            {governanceFlagLabels[mostCommonFlag.flag]}
          </p>
          <p className="text-xs text-slate dark:text-navy-300">
            Most frequent flag ({mostCommonFlag.count} cases)
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Flag tag grid                                          */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="text-xl font-bold text-navy dark:text-offwhite tracking-tight mb-1">
          Governance Flags
        </h2>
        <p className="text-sm text-slate dark:text-navy-200 mb-6 max-w-2xl leading-relaxed">
          The Atlas tracks eight governance dimensions across all documented
          incidents. Each flag indicates whether a specific governance
          mechanism was triggered, contested, or absent. Select a flag to
          examine its legal basis, political significance, and case-level
          applicability.
        </p>

        <FlagOverviewGrid
          incidents={incidents}
          onSelectFlag={(flag) =>
            setSelectedFlag(selectedFlag === flag ? null : flag)
          }
          selectedFlag={selectedFlag}
        />
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Selected flag detail panel                             */}
      {/* ----------------------------------------------------------------- */}
      {selectedAnalysis && (
        <section>
          <FlagDetailPanel analysis={selectedAnalysis} incidents={incidents} />
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Cross-flag applicability matrix                        */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="text-xl font-bold text-navy dark:text-offwhite tracking-tight mb-1">
          Applicability Matrix
        </h2>
        <p className="text-sm text-slate dark:text-navy-200 mb-4 max-w-2xl leading-relaxed">
          How each governance flag applies across all incidents in the dataset.
          A filled circle indicates direct applicability; amber indicates
          contested or partial applicability.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate dark:text-navy-300">
          {(["yes", "contested", "no", "unclear"] as ApplicabilityStatus[]).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <MatrixDot status={s} />
              {statusConfig[s].label}
            </span>
          ))}
        </div>

        <div className="rounded-lg border border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/20 p-4 overflow-hidden">
          <GovernanceMatrix incidents={incidents} />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Governance framing note                                */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <div className="p-6 rounded-lg border-l-4 border-teal-500 bg-teal-50/40 dark:bg-teal-900/10">
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
            Why governance is central
          </p>
          <p className="text-sm text-navy dark:text-offwhite leading-relaxed">
            Cyber operations do not occur in a governance vacuum. Every
            incident in this atlas triggered, tested, or exposed gaps in the
            international rules-based order. The governance lens is not a
            secondary analytical layer — it is the frame through which
            escalation, restraint, and strategic consequence should be
            understood.
          </p>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed mt-3">
            The eight flags tracked here correspond to the principal
            mechanisms through which the international community has
            responded to hostile cyber operations: norm invocation, public
            attribution, sanctions, criminal accountability, multilateral
            discussion, regulatory adaptation, international cooperation, and
            deterrence signalling. No single mechanism is sufficient; their
            cumulative effect shapes the evolving governance landscape.
          </p>
          <p className="text-sm text-slate dark:text-navy-200 leading-relaxed mt-3">
            Status assessments (applicable, contested, unclear) reflect
            analytical judgement informed by the cited legal frameworks and
            publicly available state practice. They are intended as starting
            points for classroom discussion and policy analysis, not
            definitive legal opinions.
          </p>
        </div>
      </section>
    </div>
  );
}
