import type { Incident } from "@/lib/types/incidents";

export const seedIncidents: Incident[] = [
  {
    id: "notpetya-2017",
    slug: "notpetya",
    name: "NotPetya",
    shortName: "NotPetya",
    year: 2017,
    dateRange: "June 2017",
    incidentType: "destructive",
    summary:
      "Destructive wiper malware disguised as ransomware, distributed via a compromised Ukrainian tax software update. Caused an estimated $10B+ in global damages, primarily affecting shipping, logistics, and pharmaceutical companies.",
    attribution: {
      confidence: "confirmed",
      attributedTo: "GRU (Main Intelligence Directorate)",
      country: "Russia",
      aliases: ["Sandworm", "Voodoo Bear", "IRIDIUM"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Supply chain compromise",
          description: "Backdoor inserted into M.E.Doc accounting software update mechanism.",
          date: "2017-04",
        },
        {
          tier: "destruction",
          label: "Global wiper deployment",
          description: "EternalBlue + Mimikatz-based lateral movement delivered irreversible disk destruction across 65+ countries.",
          date: "2017-06-27",
        },
        {
          tier: "strategic",
          label: "Economic disruption at scale",
          description: "Maersk, Merck, FedEx/TNT, and Rosneft among those crippled; global shipping delayed for weeks.",
          date: "2017-06",
        },
      ],
      peakTier: "strategic",
      restraintFactors: [
        "Disguised as criminal ransomware, providing deniability",
        "No direct military targeting",
      ],
      thresholdCrossings: [
        "First cyber operation to cause >$10B in collateral economic damage",
        "Indiscriminate global propagation beyond intended target set",
      ],
    },
    infrastructure: {
      targetSectors: ["multiple", "critical-infrastructure"],
      targetCountries: ["Ukraine", "Global"],
      techniques: [
        { id: "T1195.002", name: "Supply Chain Compromise: Software Supply Chain", tactic: "Initial Access" },
        { id: "T1210", name: "Exploitation of Remote Services", tactic: "Lateral Movement" },
        { id: "T1003.001", name: "OS Credential Dumping: LSASS Memory", tactic: "Credential Access" },
        { id: "T1561.002", name: "Disk Wipe: Disk Structure Wipe", tactic: "Impact" },
      ],
      malwareFamilies: ["NotPetya", "EternalBlue", "Mimikatz"],
      impactSummary: "Irreversible disk encryption/wipe across ~2,000 organizations in 65+ countries.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "sanctions-imposed", "indictment"],
      normsInvoked: [
        "UN GGE 2015 norm against damaging critical infrastructure",
        "Due diligence obligations (Tallinn Manual Rule 6)",
      ],
      policyResponses: [
        "Five Eyes joint attribution statement (Feb 2018)",
        "US DOJ indictment of six GRU officers (Oct 2020)",
        "EU sanctions against GRU entities",
      ],
      regulatoryChanges: [
        "Accelerated adoption of supply chain security requirements",
        "Increased focus on software bill of materials (SBOM)",
      ],
      impact: "Established precedent for multilateral public attribution of destructive cyber operations and highlighted supply chain risk as a policy priority.",
    },
    whyThisMatters: "NotPetya demonstrated that a cyber weapon aimed at one country can inflict billions in collateral damage worldwide, making it a landmark case for debating proportionality, state responsibility, and the limits of deniability in cyber conflict.",
    teaching: {
      keyQuestion: "When does a cyber operation targeting one country become a matter of international concern?",
      discussionPoints: [
        "Proportionality of collateral damage vs. intended target",
        "Effectiveness of public attribution as a deterrent",
        "Supply chain interdependence as a vulnerability multiplier",
      ],
      furtherReading: [
        "Greenberg, A. 'Sandworm.' Doubleday, 2019.",
        "Bowen, A.S. 'Russian Cyber Units.' CRS Report, 2022.",
      ],
    },
    sources: [
      { title: "CISA Alert TA17-181A", category: "government", date: "2017-06-30" },
      { title: "Microsoft Threat Intelligence: Petya Ransomware Attack", category: "vendor", date: "2017-06-27" },
      { title: "US DOJ: Six Russian GRU Officers Indicted", category: "legal", date: "2020-10-19" },
    ],
  },
  {
    id: "solarwinds-2020",
    slug: "solarwinds",
    name: "SolarWinds (Sunburst)",
    shortName: "SolarWinds",
    year: 2020,
    dateRange: "March 2020 – December 2020",
    incidentType: "espionage",
    summary:
      "Sophisticated supply chain compromise of SolarWinds Orion IT monitoring platform, enabling covert access to ~18,000 organizations including US federal agencies. Discovered in December 2020 after ~9 months of undetected access.",
    attribution: {
      confidence: "high",
      attributedTo: "SVR (Foreign Intelligence Service)",
      country: "Russia",
      aliases: ["APT29", "Cozy Bear", "Nobelium", "Midnight Blizzard"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Supply chain backdoor",
          description: "Trojanized SolarWinds Orion update delivered SUNBURST backdoor to ~18,000 customers.",
          date: "2020-03",
        },
        {
          tier: "intrusion",
          label: "Selective second-stage targeting",
          description: "Operators deployed TEARDROP/Cobalt Strike only against ~100 high-value targets including Treasury, Commerce, DHS.",
          date: "2020-05",
        },
        {
          tier: "disruption",
          label: "Discovery and response",
          description: "FireEye discovered breach via stolen red-team tools; triggered government-wide incident response.",
          date: "2020-12",
        },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "Operated within traditional espionage norms — collection, not disruption",
        "Selective targeting minimized footprint",
      ],
      thresholdCrossings: [
        "Scale of supply chain access exceeded traditional espionage scope",
        "Compromised core government IT monitoring infrastructure",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "technology", "defense"],
      targetCountries: ["United States", "United Kingdom", "NATO allies"],
      techniques: [
        { id: "T1195.002", name: "Supply Chain Compromise: Software Supply Chain", tactic: "Initial Access" },
        { id: "T1078", name: "Valid Accounts", tactic: "Persistence" },
        { id: "T1550.001", name: "Use Alternate Authentication Material: Application Access Token", tactic: "Lateral Movement" },
        { id: "T1071.001", name: "Application Layer Protocol: Web Protocols", tactic: "Command and Control" },
      ],
      malwareFamilies: ["SUNBURST", "TEARDROP", "Cobalt Strike"],
      impactSummary: "Covert access to email and files at Treasury, Commerce, DHS, DOE, and ~100 private-sector organizations.",
    },
    governance: {
      flags: ["attribution-public", "sanctions-imposed", "regulatory-change", "deterrence-signal"],
      normsInvoked: [
        "Debate over whether espionage violates UN GGE norms",
        "Responsible state behavior in cyberspace (OEWG)",
      ],
      policyResponses: [
        "Executive Order 14028: Improving the Nation's Cybersecurity (May 2021)",
        "US sanctions against Russian entities and expulsion of diplomats (Apr 2021)",
        "CISA Emergency Directive 21-01",
      ],
      regulatoryChanges: [
        "Federal zero-trust architecture mandate",
        "SBOM requirements for federal software suppliers",
        "Cyber Safety Review Board (CSRB) establishment",
      ],
      impact: "Catalyzed the most significant US cybersecurity policy overhaul in a decade, establishing zero-trust mandates and supply chain security requirements across the federal government.",
    },
    whyThisMatters: "SolarWinds exposed systemic supply chain risk in government IT and triggered the most sweeping US cybersecurity executive order in a decade, reshaping federal procurement and zero-trust policy.",
    teaching: {
      keyQuestion: "Is large-scale cyber espionage an accepted norm of state behavior, or does its scale change its character?",
      discussionPoints: [
        "Espionage vs. attack: where should the line be drawn?",
        "Government dependence on commercial software supply chains",
        "Effectiveness of EO 14028 reforms",
      ],
      furtherReading: [
        "Sanger, D.E. 'The Perfect Weapon.' Crown, 2018 (updated).",
        "CSRB Review of the SolarWinds Incident, 2022.",
      ],
    },
    sources: [
      { title: "CISA Emergency Directive 21-01", category: "government", date: "2020-12-13" },
      { title: "FireEye: Highly Evasive Attacker Leverages SolarWinds Supply Chain", category: "vendor", date: "2020-12-13" },
      { title: "Executive Order 14028", category: "government", date: "2021-05-12" },
    ],
  },
];
