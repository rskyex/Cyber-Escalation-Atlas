/**
 * Norms dataset (Upgrade 7) for the Cyber Escalation Atlas.
 * Maps international cyber norms to case studies, tracking their status
 * and effects across real-world incidents.
 */

export interface NormEntry {
  normId: string;
  title: string;
  description: string;
  status: "Emerging" | "Contested" | "Partially Accepted" | "Violated Repeatedly";
  anchorInstruments: string[];
  cases: string[];
  normEffects: { caseSlug: string; effect: "reinforced" | "violated" | "exposed gap in" }[];
  /** Year the norm was first articulated in a foundational instrument. */
  originYear: number;
  /** The instrument that first articulated it (basis for originYear). */
  originBasis: string;
}

export const normsData: NormEntry[] = [
  {
    normId: "civilian-infrastructure",
    title: "Prohibition on Targeting Civilian Critical Infrastructure",
    description:
      "States should not conduct or knowingly support cyber operations that intentionally damage critical infrastructure providing services to the public. This norm extends the longstanding international humanitarian law principle of distinction into the cyber domain, recognizing that attacks on civilian infrastructure can cause widespread humanitarian harm. It is the most frequently cited norm in international cyber policy discourse and the most frequently violated in practice.",
    status: "Violated Repeatedly",
        originYear: 2015,
    originBasis: "UN GGE 2015 Group report, Norm 13(f) (rooted in IHL distinction, 1977)",
    anchorInstruments: [
      "Tallinn Manual 2.0 Rule 30 (Distinction)",
      "UN GGE 2015 Norm 13(f)",
    ],
    cases: [
      "notpetya",
      "ukraine-power-grid-2015",
      "ukraine-power-grid-2016",
      "wannacry",
      "viasat-kasat",
      "colonial-pipeline",
      "industroyer2",
      "kyivstar",
      "belgacom-operation-socialist",
      "salt-typhoon",
    ],
    normEffects: [
      { caseSlug: "notpetya", effect: "violated" },
      { caseSlug: "ukraine-power-grid-2015", effect: "violated" },
      { caseSlug: "ukraine-power-grid-2016", effect: "violated" },
      { caseSlug: "wannacry", effect: "violated" },
      { caseSlug: "viasat-kasat", effect: "violated" },
      { caseSlug: "colonial-pipeline", effect: "exposed gap in" },
      { caseSlug: "industroyer2", effect: "violated" },
      { caseSlug: "kyivstar", effect: "violated" },
      { caseSlug: "belgacom-operation-socialist", effect: "exposed gap in" },
      { caseSlug: "salt-typhoon", effect: "exposed gap in" },
    ],
  },
  {
    normId: "state-proxy-responsibility",
    title: "State Responsibility for Proxy and Contractor Operations",
    description:
      "States bear responsibility for cyber operations conducted by non-state actors operating under their direction, control, or with their knowing acquiescence. The norm derives from general principles of state responsibility and seeks to close the accountability gap created by state reliance on criminal proxies, patriotic hackers, and private military cyber contractors. Its application remains contested because the evidentiary threshold for proving effective control or direction varies across legal frameworks.",
    status: "Contested",
        originYear: 2001,
    originBasis: "ILC Articles on State Responsibility, Art. 8 (2001)",
    anchorInstruments: [
      "ILC Articles on State Responsibility Art. 8",
      "Tallinn Manual 2.0 Rule 4",
    ],
    cases: [
      "colonial-pipeline",
      "costa-rica-conti",
      "scattered-spider-mgm",
      "wannacry",
      "salt-typhoon",
      "cloud-hopper-apt10",
    ],
    normEffects: [
      { caseSlug: "colonial-pipeline", effect: "exposed gap in" },
      { caseSlug: "costa-rica-conti", effect: "exposed gap in" },
      { caseSlug: "scattered-spider-mgm", effect: "exposed gap in" },
      { caseSlug: "wannacry", effect: "reinforced" },
      { caseSlug: "salt-typhoon", effect: "reinforced" },
      { caseSlug: "cloud-hopper-apt10", effect: "exposed gap in" },
    ],
  },
  {
    normId: "proportionality",
    title: "Proportionality in Cyber Operations",
    description:
      "Cyber operations, including those conducted as countermeasures or in self-defence, must be proportional to the harm suffered or the legitimate military objective pursued. The principle requires that incidental civilian damage not be excessive relative to the concrete military advantage anticipated. Applying proportionality to cyber operations is challenging because cascading digital effects often propagate beyond the intended scope in ways that are difficult to predict or contain.",
    status: "Partially Accepted",
        originYear: 1977,
    originBasis: "IHL Additional Protocol I, Art. 51(5)(b) (1977)",
    anchorInstruments: [
      "Tallinn Manual 2.0 Rule 32",
      "UN Charter Art. 51",
      "IHL Additional Protocol I Art. 51(5)(b)",
    ],
    cases: [
      "notpetya",
      "stuxnet",
      "sony-pictures",
      "viasat-kasat",
      "shamoon-aramco",
    ],
    normEffects: [
      { caseSlug: "notpetya", effect: "violated" },
      { caseSlug: "stuxnet", effect: "exposed gap in" },
      { caseSlug: "sony-pictures", effect: "exposed gap in" },
      { caseSlug: "viasat-kasat", effect: "reinforced" },
      { caseSlug: "shamoon-aramco", effect: "violated" },
    ],
  },
  {
    normId: "vulnerability-disclosure",
    title: "Duty to Disclose Vulnerabilities (Responsible Disclosure)",
    description:
      "States should encourage responsible reporting of ICT vulnerabilities and share associated information on available remedies. This norm reflects a growing consensus that stockpiling zero-day vulnerabilities for offensive purposes increases collective risk, as stockpiled exploits may leak or be independently discovered by adversaries. The tension between intelligence equities and defensive disclosure remains the central policy challenge.",
    status: "Emerging",
        originYear: 2015,
    originBasis: "UN GGE 2015 Group report, Norm 13(j)",
    anchorInstruments: [
      "UN GGE 2015 Norm 13(j)",
      "Wassenaar Arrangement",
    ],
    cases: [
      "wannacry",
      "exchange-hafnium",
      "solarwinds",
      "storm-0558",
    ],
    normEffects: [
      { caseSlug: "wannacry", effect: "exposed gap in" },
      { caseSlug: "exchange-hafnium", effect: "violated" },
      { caseSlug: "solarwinds", effect: "exposed gap in" },
      { caseSlug: "storm-0558", effect: "exposed gap in" },
    ],
  },
  {
    normId: "electoral-noninterference",
    title: "Non-Interference in Electoral Infrastructure",
    description:
      "States should refrain from conducting or supporting cyber operations aimed at disrupting the electoral processes or institutions of another state. Electoral infrastructure is increasingly recognized as a subset of critical infrastructure deserving heightened protection, given the direct relationship between electoral integrity and democratic legitimacy. This norm has gained traction following high-profile incidents of election-related cyber operations, though enforcement mechanisms remain weak.",
    status: "Partially Accepted",
        originYear: 2015,
    originBasis: "UN GGE 2015 Group report, Norm 13(b)",
    anchorInstruments: [
      "UN GGE 2015 Norm 13(b)",
      "Tallinn Manual 2.0 Rule 32 (Prohibition of Intervention)",
    ],
    cases: [
      "australia-parliament",
      "thailand-election-2019",
    ],
    normEffects: [
      { caseSlug: "australia-parliament", effect: "reinforced" },
      { caseSlug: "thailand-election-2019", effect: "exposed gap in" },
    ],
  },
  {
    normId: "no-first-use-ci",
    title: "No-First-Use Norms in Peacetime Critical Infrastructure",
    description:
      "States should refrain from pre-positioning offensive capabilities within the critical infrastructure of other states during peacetime. This emerging norm addresses the growing practice of implanting persistent access in energy, telecommunications, and water systems as a form of strategic preparation. Proponents argue that such pre-positioning is inherently destabilizing, analogous to mining a harbour in peacetime, while opponents contend it is indistinguishable from legitimate intelligence collection.",
    status: "Emerging",
        originYear: 2021,
    originBasis: "UN OEWG 2021 substantive report",
    anchorInstruments: [
      "UN OEWG 2021 recommendations",
      "Tallinn Manual 2.0 Rule 14 (Due Diligence)",
    ],
    cases: [
      "volt-typhoon",
      "taiwan-telecom",
      "ukraine-power-grid-2015",
    ],
    normEffects: [
      { caseSlug: "volt-typhoon", effect: "violated" },
      { caseSlug: "taiwan-telecom", effect: "exposed gap in" },
      { caseSlug: "ukraine-power-grid-2015", effect: "reinforced" },
    ],
  },
];
