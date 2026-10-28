/**
 * Tallinn Manual 2.0 rules cited in the Atlas. Every rule number in src/ comes
 * from this table; do not type rule numbers by hand elsewhere.
 *
 * Numbers and titles are checked against the Manual's table of contents
 * (Schmitt (ed.), Tallinn Manual 2.0 on the International Law Applicable to
 * Cyber Operations, CUP 2017, https://doi.org/10.1017/9781316822524) and, where
 * it cites the rule, the CCDCOE International Cyber Law: Interactive Toolkit
 * page given in `source`.
 */
export const TALLINN_RULES = {
  violationOfSovereignty: {
    number: 4,
    title: "Violation of sovereignty",
    source: "https://cyberlaw.ccdcoe.org/wiki/Sovereignty",
  },
  dueDiligence: {
    number: 6,
    title: "Due diligence (general principle)",
    source: "https://cyberlaw.ccdcoe.org/wiki/Due_diligence",
  },
  dueDiligenceCompliance: {
    number: 7,
    title: "Compliance with the due diligence principle",
    source: "https://cyberlaw.ccdcoe.org/wiki/Due_diligence",
  },
  jurisdiction: {
    number: 8,
    title: "Jurisdiction (general principle)",
    source: "https://doi.org/10.1017/9781316822524", // table of contents; not cited by number in the toolkit
  },
  lawEnforcementCooperation: {
    number: 13,
    title: "International cooperation in law enforcement",
    source: "https://doi.org/10.1017/9781316822524", // table of contents; not cited by number in the toolkit
  },
  internationallyWrongfulActs: {
    number: 14,
    title: "Internationally wrongful cyber acts",
    source: "https://cyberlaw.ccdcoe.org/wiki/State_responsibility",
  },
  attributionStateOrgans: {
    number: 15,
    title: "Attribution of cyber operations by State organs",
    source: "https://cyberlaw.ccdcoe.org/wiki/Attribution",
  },
  attributionNonStateActors: {
    number: 17,
    title: "Attribution of cyber operations by non-State actors",
    source: "https://cyberlaw.ccdcoe.org/wiki/Scenario_14:_Ransomware_campaign",
  },
  countermeasures: {
    number: 20,
    title: "Countermeasures (general principle)",
    source: "https://cyberlaw.ccdcoe.org/wiki/Scenario_21:_Misattribution_caused_by_deception",
  },
  proportionalityOfCountermeasures: {
    number: 23,
    title: "Proportionality of countermeasures",
    source: "https://cyberlaw.ccdcoe.org/wiki/Countermeasures",
  },
  necessity: {
    number: 26,
    title: "Necessity",
    source: "https://cyberlaw.ccdcoe.org/wiki/Scenario_14:_Ransomware_campaign",
  },
  peacetimeEspionage: {
    number: 32,
    title: "Peacetime cyber espionage",
    source: "https://cyberlaw.ccdcoe.org/wiki/Peacetime_cyber_espionage",
  },
  interventionByStates: {
    number: 66,
    title: "Intervention by States",
    source: "https://cyberlaw.ccdcoe.org/wiki/Prohibition_of_intervention",
  },
  distinction: {
    number: 93,
    title: "Distinction",
    source: "https://doi.org/10.1017/9781316822524", // table of contents; not cited by number in the toolkit
  },
  proportionality: {
    number: 113,
    title: "Proportionality",
    source: "https://cyberlaw.ccdcoe.org/wiki/Proportionality",
  },
} as const;

export type TallinnRuleKey = keyof typeof TALLINN_RULES;

/** "Rule 66 – Intervention by States" */
export function tallinnRule(key: TallinnRuleKey): string {
  const r = TALLINN_RULES[key];
  return `Rule ${r.number} – ${r.title}`;
}

/** "Tallinn Manual 2.0, Rule 6 – Due diligence (general principle); Rule 13 – …" */
export function tallinnCite(...keys: TallinnRuleKey[]): string {
  return `Tallinn Manual 2.0, ${keys.map(tallinnRule).join("; ")}`;
}

/** "Rule 93", "Rules 6 and 7", "Rules 14, 15 and 17" */
export function tallinnNumbers(...keys: TallinnRuleKey[]): string {
  const n = keys.map((k) => TALLINN_RULES[k].number);
  if (n.length === 1) return `Rule ${n[0]}`;
  return `Rules ${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}`;
}
