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
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Targeted espionage campaigns", description: "Both sides conducted persistent spearphishing campaigns against military, diplomatic, and government targets using custom remote access trojans.", date: "2016" },
        { tier: "intrusion", label: "Intensification during tensions", description: "Cyber operations escalated during the 2016 Uri attack aftermath and 2019 Balakot crisis, with both sides increasing targeting of military and intelligence organizations.", date: "2019" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Operations remained within espionage parameters — no destructive payloads documented",
        "Both sides maintained deniability through proxy groups",
      ],
      thresholdCrossings: [
        "Most sustained reciprocal cyber espionage campaign between nuclear-armed adversaries in South Asia",
        "Demonstrated that cyber operations track kinetic tension cycles in regional conflicts",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "defense", "media"],
      targetCountries: ["India", "Pakistan"],
      techniques: [
        { id: "T1566.001", name: "Phishing: Spearphishing Attachment", tactic: "Initial Access" },
        { id: "T1059", name: "Command and Scripting Interpreter", tactic: "Execution" },
        { id: "T1114", name: "Email Collection", tactic: "Collection" },
      ],
      malwareFamilies: ["CrimsonRAT", "Peppy RAT", "Razor RAT"],
      impactSummary: "Sustained bilateral espionage affecting military and government targets; scope of intelligence loss not publicly assessed.",
    },
    governance: {
      flags: ["deterrence-signal"],
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
    sources: [
      { title: "Recorded Future: Pakistan-Linked Cyber Threats to Indian Targets", category: "vendor", date: "2019-06" },
      { title: "Kaspersky: Transparent Tribe Campaign Analysis", category: "vendor", date: "2020-06" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2019-06-01", confidenceLevel: "Moderate", evidenceBasis: "Recorded Future and Symantec research documenting bilateral campaigns" },
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
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Mobile espionage campaigns", description: "Deployed custom Android spyware through fake messaging and dating applications targeting Israeli military personnel and Palestinian Authority officials.", date: "2018" },
        { tier: "intrusion", label: "Evolved tradecraft", description: "Updated mobile malware with improved evasion techniques; expanded targeting to include regional diplomatic targets in Egypt and Gulf states.", date: "2021" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Operations remained focused on intelligence collection, not disruption",
        "Mobile malware designed for stealth and persistence rather than destruction",
      ],
      thresholdCrossings: [
        "Non-state armed group maintaining a persistent, multi-year cyber espionage programme",
        "Targeting of an occupying military's personnel through social engineering at scale",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "defense"],
      targetCountries: ["Israel", "Palestinian Territories", "Egypt"],
      techniques: [
        { id: "T1566.002", name: "Phishing: Spearphishing Link", tactic: "Initial Access" },
        { id: "T1437", name: "Application Layer Protocol", tactic: "Command and Control" },
        { id: "T1429", name: "Audio Capture", tactic: "Collection" },
      ],
      malwareFamilies: ["GnatSpy", "Viper RAT", "BarbWire"],
      impactSummary: "Sustained espionage against Israeli military personnel and PA officials; intelligence value of exfiltrated data unknown.",
    },
    governance: {
      flags: ["deterrence-signal"],
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
    sources: [
      { title: "ESET: APT-C-23 targets Middle Eastern users with fake messaging apps", category: "vendor", date: "2022-04" },
      { title: "Check Point: Gaza Cybergang Threat Intelligence Report", category: "vendor", date: "2021-02" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2020-01-01", confidenceLevel: "Moderate", evidenceBasis: "ESET, Kaspersky, and Check Point independent research attributing to Hamas-linked group" },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },
  {
    id: "thailand-election-2019",
    slug: "thailand-election-2019",
    name: "Thailand Election Infrastructure Targeting",
    shortName: "Thailand Election",
    year: 2019,
    dateRange: "2019",
    incidentType: "espionage",
    summary:
      "Intrusions targeting Thailand's Election Commission and political party systems during the 2019 general election, the first since the 2014 military coup. The operations compromised voter registration databases and party communication systems, raising concerns about electoral integrity in a democratically fragile context.",
    attribution: {
      confidence: "moderate",
      attributedTo: "Assessed to be regional state-linked actors; specific attribution remains inconclusive",
      country: "Unknown (regional state-linked actors assessed)",
      aliases: [],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Election Commission compromise", description: "Unauthorized access to Election Commission systems including voter registration infrastructure during the pre-election period.", date: "2019-02" },
        { tier: "intrusion", label: "Party systems targeted", description: "Political party communication and coordination systems accessed, raising concerns about intelligence collection on democratic opposition.", date: "2019-03" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "No evidence of data manipulation or vote-count interference",
        "No disruptive or destructive actions observed",
      ],
      thresholdCrossings: [
        "Targeting of electoral infrastructure in a democratically fragile Southeast Asian state",
        "Compromise during the first election after a military coup, heightening political sensitivity",
      ],
    },
    infrastructure: {
      targetSectors: ["government"],
      targetCountries: ["Thailand"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1114", name: "Email Collection", tactic: "Collection" },
      ],
      malwareFamilies: [],
      impactSummary: "Election Commission and party systems accessed; no evidence of data manipulation; intelligence collection suspected.",
    },
    governance: {
      flags: ["deterrence-signal"],
      normsInvoked: [
        "Non-interference in electoral processes (UN GGE 2015 Norm 13(b))",
        "Sovereignty of democratic institutions",
      ],
      policyResponses: [
        "Thai Election Commission acknowledged cyber incidents without detailed public attribution",
        "Regional cybersecurity cooperation discussions in ASEAN context",
      ],
      regulatoryChanges: [
        "Thailand strengthened Cybersecurity Act (2019) implementation",
        "Electoral Commission adopted enhanced security protocols",
      ],
      impact: "Highlighted the vulnerability of electoral infrastructure in Southeast Asia to cyber intrusion, contributing to ASEAN-level discussions on election security norms in a region where democratic institutions face diverse pressures.",
    },
    whyThisMatters: "The Thailand election targeting illustrates that electoral cyber interference extends beyond the frequently studied US and European cases, affecting democratically transitional states where institutional resilience is lowest and stakes are highest.",
    teaching: {
      keyQuestion: "How should democratically fragile states protect electoral infrastructure when they lack both attribution capability and deterrence credibility?",
      discussionPoints: [
        "Electoral cyber security in transitional democracies vs. established ones",
        "ASEAN cyber norm development and its applicability to election security",
        "Attribution gaps in the Global South and their governance implications",
      ],
      furtherReading: [
        "International Crisis Group: Thailand's Election and Its Aftermath, 2019.",
        "ASEAN: Framework on Digital Data Governance, 2019.",
      ],
    },
    sources: [
      { title: "Thai Election Commission: Statement on cyber incidents", category: "government", date: "2019-03" },
      { title: "Reuters: Thailand election agency targeted by cyber attacks", category: "journalistic", date: "2019-03" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Contested/Unknown", date: "2019-03-01", confidenceLevel: "Moderate", evidenceBasis: "Regional state-linked actors assessed; no formal attribution" },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },
  {
    id: "ecuador-data-2019",
    slug: "ecuador-data-exposure-2019",
    name: "Ecuador Citizen Data Exposure",
    shortName: "Ecuador Data Exposure",
    year: 2019,
    dateRange: "September 2019 (disclosed)",
    incidentType: "hybrid",
    summary:
      "An exposed Elasticsearch database operated by a state-contracted analytics firm contained personal data of virtually the entire Ecuadorian population — approximately 20.8 million records including children and deceased individuals. The exposure included national identity numbers, financial information, and family relationships. This governance-priority case examines state responsibility for civilian data protection rather than offensive cyber operations.",
    attribution: {
      confidence: "confirmed",
      attributedTo: "Non-state negligence: Novaestrat, an Ecuadorian data analytics firm operating a state-contracted database without adequate security controls",
      country: "Ecuador (domestic negligence)",
      aliases: [],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Unprotected database discovered", description: "vpnMentor researchers discovered an unprotected Elasticsearch server containing 18 GB of personal data of virtually every Ecuadorian citizen.", date: "2019-09-11" },
        { tier: "disruption", label: "National privacy crisis", description: "Disclosure triggered national alarm over data sovereignty; Ecuadorian government ordered investigation and emergency data protection measures.", date: "2019-09-16" },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "Not an offensive cyber operation — exposure resulted from negligent security practices",
        "No evidence the exposed data was exploited for malicious purposes before discovery",
      ],
      thresholdCrossings: [
        "Near-total population data exposure from a single misconfigured database",
        "Demonstrated the governance gap in state responsibility for contracted data handling",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "critical-infrastructure"],
      targetCountries: ["Ecuador"],
      techniques: [
        { id: "T1530", name: "Data from Cloud Storage", tactic: "Collection" },
      ],
      malwareFamilies: [],
      impactSummary: "Personal data of ~20.8 million Ecuadorians exposed; national identity numbers, financial records, and family data affected.",
    },
    governance: {
      flags: ["regulatory-change"],
      normsInvoked: [
        "State responsibility for civilian data protection",
        "Data sovereignty and the obligation to secure citizen information held by state contractors",
      ],
      policyResponses: [
        "Ecuadorian government launched criminal investigation into Novaestrat",
        "Emergency measures to assess and contain exposure",
        "International pressure for data protection legislation",
      ],
      regulatoryChanges: [
        "Ecuador enacted Organic Law on Personal Data Protection (May 2021)",
        "Strengthened oversight requirements for state data contractors",
      ],
      impact: "Catalyzed Ecuador's first comprehensive data protection legislation, demonstrating that mass civilian data exposure events — even without malicious intent — can drive fundamental governance reform in states previously lacking data protection frameworks.",
    },
    whyThisMatters: "The Ecuador data exposure demonstrates that state failure to secure contracted civilian data systems can produce population-scale privacy crises, illustrating data sovereignty as a governance challenge distinct from but parallel to offensive cyber threats.",
    teaching: {
      keyQuestion: "What obligations do states bear for protecting citizen data held by private contractors, and what governance frameworks are needed in states that lack comprehensive data protection legislation?",
      discussionPoints: [
        "Data sovereignty vs. data negligence: governance-priority cases",
        "The role of security researchers in discovering government data exposures",
        "Data protection legislation as a response to exposure events",
      ],
      furtherReading: [
        "vpnMentor: Report on Ecuador Data Breach, Sep 2019.",
        "Ecuador Organic Law on Personal Data Protection, 2021.",
      ],
    },
    sources: [
      { title: "vpnMentor: Report — Ecuadorian Breach", category: "vendor", date: "2019-09-11" },
      { title: "Ecuador Government: Statement on Data Exposure Investigation", category: "government", date: "2019-09-16" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2019-09-11", confidenceLevel: "Confirmed", evidenceBasis: "vpnMentor discovered unprotected Elasticsearch database" },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },
  {
    id: "bangladesh-egov-2021",
    slug: "bangladesh-egov-2021",
    name: "Bangladesh e-Government Portal Intrusions",
    shortName: "Bangladesh e-Gov",
    year: 2021,
    dateRange: "2021 – 2022",
    incidentType: "espionage",
    summary:
      "Series of intrusions targeting Bangladeshi government digital service portals, exposing citizen data including national identity information and disrupting administrative functions. The incidents highlighted the vulnerability of rapidly digitized government services in developing states where cybersecurity investment has not kept pace with digital transformation.",
    attribution: {
      confidence: "low",
      attributedTo: "Unknown; investigations did not produce public attribution. Some researchers noted similarities with regional threat groups but evidence remained inconclusive",
      country: "Unknown",
      aliases: [],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Government portal compromise", description: "Attackers gained access to multiple e-government service portals including citizen registration and administrative systems.", date: "2021-07" },
        { tier: "disruption", label: "Data exposure and service disruption", description: "Citizen data exposed through compromised portals; some administrative services taken offline during incident response.", date: "2021-12" },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "No destructive payloads deployed",
        "Scope appeared opportunistic rather than strategically targeted",
      ],
      thresholdCrossings: [
        "Compromise of national citizen identity data in a rapidly digitizing state",
        "Exposed the security gap between e-government ambition and cybersecurity capability",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "technology"],
      targetCountries: ["Bangladesh"],
      techniques: [
        { id: "T1190", name: "Exploit Public-Facing Application", tactic: "Initial Access" },
        { id: "T1530", name: "Data from Cloud Storage", tactic: "Collection" },
      ],
      malwareFamilies: [],
      impactSummary: "Citizen data from government portals exposed; administrative services temporarily disrupted.",
    },
    governance: {
      flags: ["regulatory-change"],
      normsInvoked: [
        "State duty to protect citizen data in digitized government services",
        "Responsible development of e-government platforms",
      ],
      policyResponses: [
        "Bangladesh CERT issued advisories on government portal security",
        "Government initiated security audits of digital service platforms",
      ],
      regulatoryChanges: [
        "Bangladesh Digital Security Act enforcement strengthened",
        "National cybersecurity awareness programs expanded",
      ],
      impact: "Demonstrated the security debt accumulated during rapid e-government digitization in developing states, reinforcing the need for cybersecurity capacity-building in digital development assistance frameworks.",
    },
    whyThisMatters: "The Bangladesh e-government intrusions exemplify a pattern common across rapidly digitizing developing states: the gap between e-government ambition and cybersecurity capability creates systemic risk to citizen data and public trust in digital services.",
    teaching: {
      keyQuestion: "How should development assistance for e-government in developing states integrate cybersecurity as a foundational requirement rather than an afterthought?",
      discussionPoints: [
        "Digital transformation security debt in developing states",
        "Capacity-building: international assistance models for government cybersecurity",
        "Citizen trust and the social contract implications of government data breaches",
      ],
      furtherReading: [
        "World Bank: Digital Government Readiness Assessment, 2022.",
        "ITU: Global Cybersecurity Index, 2020.",
      ],
    },
    sources: [
      { title: "Bangladesh CERT: Advisory on Government Portal Security", category: "government", date: "2021-08" },
      { title: "TechCrunch: Bangladesh government websites leak citizen data", category: "journalistic", date: "2023-07" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Contested/Unknown", date: "2021-07-01", confidenceLevel: "Low", evidenceBasis: "No public attribution; investigations inconclusive" },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },
];
