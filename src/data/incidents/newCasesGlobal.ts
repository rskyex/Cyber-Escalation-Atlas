import type { Incident } from "@/lib/types/incidents";

export const newCasesGlobal: Incident[] = [
  {
    id: "india-pakistan-cyber-2018",
    slug: "india-pakistan-cyber",
    name: "India–Pakistan Cyber Operations",
    shortName: "India–Pakistan Cyber",
    year: 2018,
    dateRange: "2016 – 2019 (multiple incidents)",
    incidentType: "espionage",
    summary:
      "Reciprocal intrusion campaigns between Indian and Pakistani state-linked actors targeting government, military, and media sectors. The most documented South Asian cyber conflict pattern, involving persistent espionage operations from both sides that intensified during periods of kinetic tension along the Line of Control.",
    attribution: {
      confidence: "moderate",
      attributedTo: "Multiple groups on both sides; Pakistani-linked groups include Transparent Tribe (APT36) and Gorgon Group; Indian-linked groups include SideWinder and Patchwork",
      country: "India / Pakistan (reciprocal)",
      aliases: ["Transparent Tribe", "APT36", "SideWinder", "Patchwork", "Gorgon Group"],
      intrusionSetIds: ["G0134", "G0121", "G0040", "G0078"],
      layers: ["technical"],
    },
    escalation: {
      thresholds: [],
      phases: [
        { tier: "intrusion", label: "Targeted espionage campaigns", description: "Both sides conducted persistent spearphishing campaigns against military, diplomatic, and government targets using custom remote access trojans.", date: "2016" },
        { tier: "intrusion", label: "Intensification during tensions", description: "Cyber operations escalated during the 2016 Uri attack aftermath and 2019 Balakot crisis, with both sides increasing targeting of military and intelligence organizations.", date: "2019" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Operations remained within espionage parameters, no destructive payloads documented",
        "Both sides maintained deniability through proxy groups",
      ],
      significance: [
        "Most sustained reciprocal cyber espionage campaign between nuclear-armed adversaries in South Asia",
        "Demonstrated that cyber operations track kinetic tension cycles in regional conflicts",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "defense", "media"],
      targetCountries: ["IN", "PK"],
      techniques: [
        { id: "T1566.001", name: "Phishing: Spearphishing Attachment", tactic: "Initial Access" },
        { id: "T1059", name: "Command and Scripting Interpreter", tactic: "Execution" },
        { id: "T1114", name: "Email Collection", tactic: "Collection" },
      ],
      malwareFamilies: ["CrimsonRAT", "Peppy RAT", "Razor RAT"],
      impactSummary: "Sustained bilateral espionage affecting military and government targets; scope of intelligence loss not publicly assessed.",
    },
    governance: {
      flags: [],
      normsInvoked: [
        "Responsible state behavior in ICT use (UN OEWG)",
        "Restraint in cyber operations between nuclear-armed states",
      ],
      policyResponses: [
        "No formal attribution statements from either government",
        "Private sector threat intelligence provided primary public documentation",
      ],
      regulatoryChanges: [
        "India accelerated national cybersecurity strategy and CERT-In strengthening",
        "Pakistan established National Centre for Cyber Security",
      ],
      impact: "Illustrated how bilateral cyber espionage operates as a persistent feature of South Asian strategic competition, highlighting the absence of regional cyber confidence-building measures between nuclear-armed adversaries.",
    },
    whyThisMatters: "India-Pakistan cyber operations represent the most documented case of sustained reciprocal cyber espionage between regional nuclear-armed adversaries, demonstrating that cyber conflict dynamics extend well beyond the US-Russia-China axis.",
    teaching: {
      keyQuestion: "How do cyber operations interact with kinetic military tensions between nuclear-armed states, and what confidence-building measures could reduce escalation risk?",
      discussionPoints: [
        "Cyber operations as a barometer of kinetic tension in regional conflicts",
        "Absence of bilateral cyber norms or CBMs in South Asia",
        "Role of private sector in documenting state-on-state cyber campaigns",
      ],
      furtherReading: [
        "Recorded Future: Pakistan-Linked Threat Actors, 2019.",
        "Kaspersky: Transparent Tribe Campaign Analysis, 2020.",
      ],
    },
    lastUpdated: "2026-10-29",
    inclusionCriteriaMet: ["state-attribution", "two-analytical-lenses"],
    sources: [
      { title: "Kaspersky: Transparent Tribe: Evolution analysis, part 1", url: "https://securelist.com/transparent-tribe-part-1/98127/", category: "vendor", date: "2020-08-20" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2019-06-01", confidenceLevel: "Moderate", evidenceBasis: "Vendor research (Kaspersky's Transparent Tribe analysis) documenting Pakistan-linked campaigns against Indian targets" },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },
  {
    id: "apt-c23-gaza-2020",
    slug: "apt-c23-gaza-cybergang",
    name: "APT-C-23 / Gaza Cybergang Operations",
    shortName: "Gaza Cybergang",
    year: 2020,
    dateRange: "2018 – 2022 (ongoing, landmark incidents)",
    incidentType: "espionage",
    summary:
      "Hamas-linked threat actor conducting espionage against Palestinian Authority officials, Israeli military and security personnel, and regional governments using sophisticated mobile malware and social engineering. Operations demonstrate that non-state armed groups in conflict zones have developed persistent cyber espionage capabilities comparable to some state programmes.",
    attribution: {
      confidence: "moderate",
      attributedTo: "APT-C-23 / Gaza Cybergang / Arid Viper, assessed by multiple security vendors to be linked to Hamas",
      country: "Palestinian Territories (Hamas-linked)",
      aliases: ["APT-C-23", "Arid Viper", "Desert Falcon", "Gaza Cybergang"],
      intrusionSetIds: ["G1028"],
      layers: ["technical"],
    },
    escalation: {
      thresholds: [],
      phases: [
        { tier: "intrusion", label: "Mobile espionage campaigns", description: "Deployed custom Android spyware through fake messaging and dating applications targeting Israeli military personnel and Palestinian Authority officials.", date: "2018" },
        { tier: "intrusion", label: "Evolved tradecraft", description: "Updated mobile malware with improved evasion techniques; expanded targeting to include regional diplomatic targets in Egypt and Gulf states.", date: "2021" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Operations remained focused on intelligence collection, not disruption",
        "Mobile malware designed for stealth and persistence rather than destruction",
      ],
      significance: [
        "Non-state armed group maintaining a persistent, multi-year cyber espionage programme",
        "Targeting of an occupying military's personnel through social engineering at scale",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "defense"],
      targetCountries: ["IL", "PS", "EG"],
      techniques: [
        { id: "T1566.002", name: "Phishing: Spearphishing Link", tactic: "Initial Access" },
        { id: "T1437", name: "Application Layer Protocol", tactic: "Command and Control" },
        { id: "T1429", name: "Audio Capture", tactic: "Collection" },
      ],
      malwareFamilies: ["GnatSpy", "Viper RAT", "BarbWire"],
      impactSummary: "Sustained espionage against Israeli military personnel and PA officials; intelligence value of exfiltrated data unknown.",
    },
    governance: {
      flags: [],
      normsInvoked: [
        "Application of cyber norms to non-state armed groups in conflict zones",
        "Dual-use mobile surveillance capabilities",
      ],
      policyResponses: [
        "Israeli security services reported disruption of some campaigns",
        "Google and Apple removed malicious applications from app stores upon vendor notification",
      ],
      regulatoryChanges: [
        "Informed Israeli military mobile device security policies",
      ],
      impact: "Demonstrated that non-state armed groups in protracted conflict zones can develop and sustain cyber espionage capabilities, challenging the state-centric framing of most international cyber norm discussions.",
    },
    whyThisMatters: "Gaza Cybergang operations demonstrate that non-state armed groups can develop persistent cyber espionage capabilities, complicating the state-centric framework of international cyber norms and raising questions about accountability in asymmetric conflict.",
    teaching: {
      keyQuestion: "How should international cyber norms account for non-state armed groups that develop persistent cyber espionage capabilities in conflict zones?",
      discussionPoints: [
        "State-centric norm frameworks and the non-state actor gap",
        "Mobile platforms as espionage vectors in conflict environments",
        "Accountability challenges when attribution points to non-state entities",
      ],
      furtherReading: [
        "ESET: APT-C-23 Mobile Campaign Analysis, 2022.",
        "Check Point: Gaza Cybergang Group1 Campaign, 2021.",
      ],
    },
    lastUpdated: "2026-10-29",
    inclusionCriteriaMet: ["two-analytical-lenses"],
    sources: [
      { title: "ESET: APT-C-23 group evolves its Android spyware", url: "https://www.welivesecurity.com/2020/09/30/aptc23-group-evolves-its-android-spyware/", category: "vendor", date: "2020-09-30" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2020-01-01", confidenceLevel: "Moderate", evidenceBasis: "ESET research attributing the activity to a Hamas-linked group" },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },
];
