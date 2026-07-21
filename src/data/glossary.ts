// ---------------------------------------------------------------------------
// Glossary of concepts used throughout the Atlas.
//
// Definitions are grounded in the scholarship cited on /methodology. Where a
// term originates with a specific author, the source is named so readers can
// trace it. No definitions are invented; each reflects established usage.
// ---------------------------------------------------------------------------

export interface GlossaryTerm {
  id: string;
  term: string;
  aliases?: string[];
  definition: string;
  /** Named source/attribution for the concept, if it has a specific origin. */
  source?: string;
  /** Optional link to the source or a methodology anchor. */
  sourceHref?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "unpeace",
    term: "Unpeace",
    definition:
      "A condition of sustained, consequential interstate hostility that falls below the threshold of armed conflict as traditionally understood. States impose strategic costs on one another through cyber means without crossing into war. The Atlas uses the concept as the basis for its severity axis.",
    source: "Lucas Kello, The Virtual Weapon and International Order (Yale University Press, 2017)",
    sourceHref: "/methodology#fw-kello",
  },
  {
    id: "entanglement",
    term: "Entanglement",
    definition:
      "The way cyber operations against dual-use systems create inadvertent escalation pathways — for example, between conventional and nuclear domains. When an intrusion targets systems used for both conventional and strategic purposes, the defender cannot easily distinguish espionage from attack preparation, compressing decision time and raising miscalculation risk.",
    source: "James M. Acton, 'Escalation through Entanglement,' International Security 43(1), 2018",
    sourceHref: "/methodology#fw-acton",
  },
  {
    id: "attribution-layers",
    term: "Attribution Layers",
    aliases: ["technical attribution", "political attribution", "Rid-Buchanan"],
    definition:
      "A layered model distinguishing technical attribution (linking an operation to infrastructure and tools), operational attribution (linking it to a unit or organisation), and political attribution (a government's public decision to name a responsible state). The layers can be resolved independently, which is why attribution is simultaneously more feasible and more politically fraught than it first appears.",
    source: "Thomas Rid & Ben Buchanan, 'Attributing Cyber Attacks,' Journal of Strategic Studies, 2015",
    sourceHref: "/methodology#fw-rid-buchanan",
  },
  {
    id: "compellence",
    term: "Compellence",
    definition:
      "The use of coercive pressure to change an adversary's behaviour — to make them do something they would not otherwise do. Distinct from deterrence, which seeks to prevent action. In cyber terms, destructive operations that impose costs lean toward compellence.",
    source: "Thomas C. Schelling, Arms and Influence (Yale University Press, 1966)",
    sourceHref: "/methodology#fw-schelling",
  },
  {
    id: "deterrence",
    term: "Deterrence",
    definition:
      "The threat of force to prevent an adversary from taking an action. Deterrence depends on credibly communicating capability and resolve rather than on exercising force. Espionage campaigns that demonstrate access without using it lean toward deterrence.",
    source: "Thomas C. Schelling, Arms and Influence (Yale University Press, 1966)",
    sourceHref: "/methodology#fw-schelling",
  },
  {
    id: "escalation-tier",
    term: "Escalation Tier",
    definition:
      "The Atlas's controlled vocabulary for peak observed severity: probing, intrusion, disruption, degradation, destruction, strategic impact. Tiers represent qualitative shifts in effect, not a linear conveyor belt — most operations do not escalate beyond their initial tier.",
    sourceHref: "/methodology#classification",
  },
  {
    id: "cyber-restraint",
    term: "Cyber Restraint",
    definition:
      "The empirical observation that states overwhelmingly exercise restraint in cyberspace: most operations remain low-severity, escalation to destructive effects is rare, and cyber operations have not triggered kinetic military responses. Restraint factors are treated as analytically important data, not merely the absence of escalation.",
    source: "Brandon Valeriano & Ryan Maness, Cyber War versus Cyber Realities (Oxford University Press, 2015)",
    sourceHref: "/methodology#fw-valeriano-maness",
  },
  {
    id: "threshold-crossing",
    term: "Threshold Crossing",
    definition:
      "A discrete point at which an operation moves past an escalation boundary — for instance, from access to disruption, or from a single target to cascading collateral impact. The number of thresholds crossed feeds the Atlas's unpeace and entanglement scores.",
    sourceHref: "/methodology#scoring",
  },
  {
    id: "norm",
    term: "Norm (cyber)",
    definition:
      "A shared expectation of appropriate state behaviour in cyberspace, typically voluntary and non-binding. The Atlas tracks six norms and whether each incident reinforced, violated, or exposed gaps in them. A norm's presence does not imply it is effective or enforced.",
    sourceHref: "/norms",
  },
  {
    id: "sovereignty",
    term: "Sovereignty (in cyberspace)",
    definition:
      "A contested question in international law: whether sovereignty is a primary rule that can be independently violated by a cyber operation, or merely a principle underlying other rules. States disagree; the Tallinn Manual's expert group did not fully settle it.",
    source: "Tallinn Manual 2.0 (Cambridge University Press, 2017)",
    sourceHref: "/methodology#fw-tallinn",
  },
  {
    id: "false-flag",
    term: "False Flag",
    definition:
      "The deliberate contamination of forensic evidence — planting indicators, borrowing infrastructure, or reusing another actor's tooling — to misdirect attribution. A documented phenomenon that means technical indicators cannot be assumed immune to manipulation.",
    sourceHref: "/methodology#attribution",
  },
  {
    id: "supply-chain-compromise",
    term: "Supply-Chain Compromise",
    definition:
      "An operation that reaches its ultimate targets by first compromising a trusted upstream provider — a software vendor, update mechanism, or hardware supplier. Maximises reach while complicating attribution and defence. SolarWinds and NotPetya are canonical examples in the dataset.",
    sourceHref: "/cases/solarwinds",
  },
];
