import type { Incident } from "@/lib/types/incidents";

export const newCases2024: Incident[] = [
  {
    id: "storm-0558-2023",
    slug: "storm-0558",
    name: "Microsoft Storm-0558 Cloud Email Compromise",
    shortName: "Storm-0558",
    year: 2023,
    dateRange: "May – July 2023",
    incidentType: "espionage",
    summary:
      "China-linked espionage operation exploiting a forged Microsoft account signing key to access Outlook Web Access and Outlook.com email accounts of approximately 25 organizations, including US State Department and Commerce Department officials. The operation exposed foundational assumptions about cloud authentication trust and triggered mandatory security logging reforms across the federal government.",
    attribution: {
      confidence: "high",
      attributedTo: "Storm-0558, assessed by Microsoft and US CISA to be a China-based threat actor focused on espionage",
      country: "China",
      aliases: ["Storm-0558"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Signing key acquisition",
          description: "Actor obtained a Microsoft account consumer signing key and exploited a token validation flaw to forge authentication tokens for enterprise Exchange Online accounts.",
          date: "2023-05",
        },
        {
          tier: "intrusion",
          label: "Targeted email access",
          description: "Used forged tokens to access email accounts at ~25 organizations including senior US government officials' mailboxes.",
          date: "2023-06",
        },
        {
          tier: "disruption",
          label: "Discovery and remediation",
          description: "State Department detected anomalous activity using premium audit logging; Microsoft revoked the compromised key and patched the validation flaw.",
          date: "2023-07",
        },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "Activity consistent with targeted intelligence collection, not disruption",
        "No destructive payload or lateral movement beyond email access",
      ],
      thresholdCrossings: [
        "Compromised a foundational cloud identity trust mechanism affecting all Microsoft cloud tenants",
        "Demonstrated that a single signing key compromise could bypass multi-tenant cloud security boundaries",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "technology"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1199", name: "Trusted Relationship", tactic: "Initial Access" },
        { id: "T1550.001", name: "Use Alternate Authentication Material: Application Access Token", tactic: "Defense Evasion" },
        { id: "T1114.002", name: "Email Collection: Remote Email Collection", tactic: "Collection" },
      ],
      malwareFamilies: [],
      impactSummary: "Email accounts of ~25 organizations accessed including senior US officials; exposed systemic cloud authentication trust gap.",
    },
    governance: {
      flags: ["attribution-public", "regulatory-change", "international-cooperation"],
      normsInvoked: [
        "Responsible state behavior in ICT use (UN GGE/OEWG)",
        "Cloud provider security obligations and transparency duties",
      ],
      policyResponses: [
        "CSRB investigation and critical report on Microsoft security culture (Mar 2024)",
        "CISA mandated expanded logging for federal cloud tenants",
        "Microsoft expanded free security logging for all cloud customers",
      ],
      regulatoryChanges: [
        "CISA Binding Operational Directive on cloud security logging",
        "CSRB recommendations for cloud provider accountability",
      ],
      impact: "Forced the most significant reassessment of cloud provider security accountability in the federal government, establishing that cloud identity infrastructure is a national security dependency requiring regulatory oversight.",
    },
    whyThisMatters: "Storm-0558 revealed that a single compromised signing key could bypass the security boundaries of the cloud infrastructure underlying most government communications, making cloud identity trust a first-order national security concern.",
    teaching: {
      keyQuestion: "What security obligations should cloud providers owe to governments that depend on their infrastructure for sensitive communications?",
      discussionPoints: [
        "Concentration risk: government dependence on a single cloud provider's identity infrastructure",
        "CSRB findings on Microsoft security culture and accountability",
        "Audit logging as a security equity: who should pay for visibility?",
      ],
      furtherReading: [
        "CSRB: Review of the Summer 2023 Microsoft Exchange Online Intrusion, Mar 2024.",
        "Microsoft: Results of Major Technical Investigation for Storm-0558 Key Acquisition, Sep 2023.",
      ],
    },
    sources: [
      { title: "Microsoft: Analysis of Storm-0558 techniques", category: "vendor", date: "2023-07-14" },
      { title: "CISA: Enhanced Monitoring to Detect APT Activity Targeting Outlook Online", category: "government", date: "2023-07-12" },
      { title: "CSRB: Review of the Summer 2023 Microsoft Exchange Online Intrusion", category: "government", date: "2024-03-20" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "US Government", date: "2023-07-12", confidenceLevel: "High", evidenceBasis: "CISA advisory identifying China-based threat actor" },
        { actor: "Academic/Private Sector", date: "2023-07-14", confidenceLevel: "High", evidenceBasis: "Microsoft threat intelligence identifying Storm-0558 as China-based espionage group" },
      ],
      coordinationType: "unilateral",
      consequences: ["Public Naming Only"],
    },
    actorSlug: "hafnium-apt40",
  },
  {
    id: "change-healthcare-2024",
    slug: "change-healthcare",
    name: "Change Healthcare Ransomware Attack",
    shortName: "Change Healthcare",
    year: 2024,
    dateRange: "February 2024",
    incidentType: "ransomware",
    summary:
      "ALPHV/BlackCat ransomware attack on Change Healthcare, a UnitedHealth Group subsidiary processing approximately one-third of all US healthcare claims. The attack disrupted prescription processing, insurance claims, and revenue cycles across the US healthcare system for weeks, affecting hospitals, pharmacies, and patients nationwide. UnitedHealth reportedly paid a $22M ransom.",
    attribution: {
      confidence: "high",
      attributedTo: "ALPHV/BlackCat ransomware-as-a-service group, a Russian-speaking criminal organization",
      country: "Russia (criminal, possible state nexus)",
      aliases: ["ALPHV", "BlackCat", "Noberus"],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Initial access via stolen credentials", description: "Attackers gained access to Change Healthcare systems using compromised credentials for a Citrix remote access portal lacking multi-factor authentication.", date: "2024-02-12" },
        { tier: "disruption", label: "Ransomware deployment and system shutdown", description: "ALPHV/BlackCat ransomware encrypted critical systems; Change Healthcare disconnected its entire network, halting claims processing nationwide.", date: "2024-02-21" },
        { tier: "degradation", label: "Healthcare system cascading impact", description: "Pharmacies could not process prescriptions; hospitals lost revenue cycle management; small practices faced cash-flow crises threatening viability.", date: "2024-02" },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Financially motivated, no geopolitical or destructive intent beyond extortion",
        "Attackers offered decryption for ransom payment",
      ],
      thresholdCrossings: [
        "Largest disruption to US healthcare infrastructure from a single cyber attack",
        "Demonstrated systemic concentration risk in healthcare claims processing",
      ],
    },
    infrastructure: {
      targetSectors: ["healthcare", "critical-infrastructure"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
        { id: "T1048", name: "Exfiltration Over Alternative Protocol", tactic: "Exfiltration" },
      ],
      malwareFamilies: ["ALPHV", "BlackCat"],
      impactSummary: "Healthcare claims processing disrupted nationwide for weeks; pharmacies, hospitals, and providers affected; $22M ransom reportedly paid.",
    },
    governance: {
      flags: ["regulatory-change", "norm-violation"],
      normsInvoked: [
        "Protection of healthcare infrastructure as critical civilian necessity",
        "Corporate duty of care for healthcare data and operational resilience",
      ],
      policyResponses: [
        "HHS and CISA emergency coordination and guidance for affected providers",
        "Congressional hearings on healthcare cybersecurity and concentration risk",
        "UnitedHealth CEO testified before Senate Finance Committee (May 2024)",
      ],
      regulatoryChanges: [
        "Renewed push for mandatory healthcare cybersecurity standards",
        "HHS proposed updates to HIPAA Security Rule with prescriptive controls",
        "CMS accelerated payment programs to offset provider cash-flow disruptions",
      ],
      impact: "Exposed the systemic fragility of concentrated healthcare infrastructure and accelerated federal momentum toward mandatory cybersecurity standards for healthcare entities handling critical claims processing functions.",
    },
    whyThisMatters: "Change Healthcare demonstrated that a single ransomware attack on a dominant healthcare intermediary can cascade into a national healthcare crisis, making the case for treating healthcare claims infrastructure as critical national infrastructure.",
    teaching: {
      keyQuestion: "Should entities that process a dominant share of critical healthcare transactions be subject to mandatory cybersecurity standards equivalent to financial infrastructure?",
      discussionPoints: [
        "Concentration risk: single points of failure in healthcare infrastructure",
        "Ransom payment ethics when patient care is at stake",
        "MFA as a baseline: failure of basic controls at a critical provider",
      ],
      furtherReading: [
        "Senate Finance Committee: Hearing on Change Healthcare Cyberattack, May 2024.",
        "HHS: Proposed Updates to the HIPAA Security Rule, 2024.",
      ],
    },
    sources: [
      { title: "CISA: ALPHV BlackCat Advisory Update", category: "government", date: "2024-02-27" },
      { title: "UnitedHealth Group: Change Healthcare Cyber Response Update", category: "vendor", date: "2024-03-13" },
      { title: "Senate Finance Committee: Hearing Testimony on Change Healthcare", category: "government", date: "2024-05-01" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "US Government", date: "2024-02-27", confidenceLevel: "High", evidenceBasis: "CISA and FBI advisory identifying ALPHV/BlackCat" },
        { actor: "Academic/Private Sector", date: "2024-02-22", confidenceLevel: "High", evidenceBasis: "ALPHV publicly claimed responsibility on darknet leak site" },
      ],
      coordinationType: "unilateral",
      consequences: ["Public Naming Only"],
    },
    actorSlug: "unknown-contested",
  },
  {
    id: "volt-typhoon-2024",
    slug: "volt-typhoon",
    name: "Volt Typhoon, US Critical Infrastructure Pre-positioning",
    shortName: "Volt Typhoon",
    year: 2024,
    dateRange: "2023 – 2024 (disclosed 2024)",
    incidentType: "espionage",
    summary:
      "PRC-linked threat actor assessed to be pre-positioning access in US critical infrastructure, including water, energy, communications, and transportation systems, as preparation for potential disruptive operations in a Taiwan contingency scenario. The most significant allied joint attribution in the dataset, involving all Five Eyes nations in coordinated advisories.",
    attribution: {
      confidence: "high",
      attributedTo: "Volt Typhoon, attributed by the US, UK, Australia, Canada, and New Zealand to PRC state-sponsored actors",
      country: "China",
      aliases: ["Volt Typhoon", "BRONZE SILHOUETTE", "Vanguard Panda"],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Living-off-the-land access", description: "Actor used legitimate credentials and native system tools to establish persistent access across US CI networks, avoiding traditional malware signatures.", date: "2023" },
        { tier: "probing", label: "Infrastructure mapping and pre-positioning", description: "Activity consistent with mapping operational technology environments and maintaining access for future use, not immediate data exfiltration.", date: "2024" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "No disruptive or destructive actions observed, activity consistent with preparation, not execution",
        "Living-off-the-land techniques suggest intent to avoid detection and maintain long-term access",
      ],
      thresholdCrossings: [
        "First publicly documented campaign of peacetime pre-positioning across multiple US critical infrastructure sectors simultaneously",
        "Reframed the espionage/pre-attack distinction as a policy-urgent question",
      ],
    },
    infrastructure: {
      targetSectors: ["critical-infrastructure", "energy", "telecommunications", "transportation", "multiple"],
      targetCountries: ["United States", "Guam"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1218", name: "System Binary Proxy Execution", tactic: "Defense Evasion" },
        { id: "T1046", name: "Network Service Discovery", tactic: "Discovery" },
      ],
      malwareFamilies: [],
      impactSummary: "Persistent access established across US water, energy, communications, and transportation infrastructure; no disruption executed.",
    },
    governance: {
      flags: ["attribution-public", "international-cooperation", "regulatory-change", "deterrence-signal"],
      normsInvoked: [
        "Responsible state behavior in ICT use (UN OEWG)",
        "Pre-positioning in critical infrastructure as a destabilizing activity",
        "Due diligence obligations of states regarding their territory",
      ],
      policyResponses: [
        "Five Eyes joint advisory, the broadest allied attribution in the dataset (Feb 2024)",
        "CISA Emergency Guidance for CI owners on Volt Typhoon detection",
        "FBI disrupted Volt Typhoon botnet infrastructure (KV Botnet takedown, Jan 2024)",
      ],
      regulatoryChanges: [
        "Directly shaped US National Cybersecurity Strategy implementation priorities",
        "Accelerated CISA cross-sector risk management directives",
        "Informed proposed critical infrastructure cybersecurity legislation",
      ],
      impact: "Generated the most significant Five Eyes joint attribution to date and reframed critical infrastructure pre-positioning as the defining cyber threat of the current strategic environment, directly shaping US infrastructure security legislation.",
    },
    whyThisMatters: "Volt Typhoon represents the clearest case of peacetime pre-positioning in adversary critical infrastructure, forcing an urgent policy reckoning on whether such activity constitutes a threat of force and how states should respond to it below the threshold of armed conflict.",
    teaching: {
      keyQuestion: "Does pre-positioning destructive access in another state's critical infrastructure during peacetime constitute a violation of international law, and what responses are available?",
      discussionPoints: [
        "The espionage/pre-attack distinction: intelligence collection vs. preparation for sabotage",
        "Living-off-the-land techniques and the detection challenge they pose",
        "Alliance coordination as a response tool: Five Eyes model for cyber attribution",
      ],
      furtherReading: [
        "CISA/NSA/FBI/Five Eyes: PRC State-Sponsored Actors Compromise and Maintain Persistent Access to US CI, Feb 2024.",
        "Microsoft Threat Intelligence: Volt Typhoon, 2023–2024.",
      ],
    },
    sources: [
      { title: "CISA/NSA/FBI Joint Advisory: Volt Typhoon", category: "government", date: "2024-02-07" },
      { title: "Microsoft: Volt Typhoon targets US critical infrastructure", category: "vendor", date: "2023-05-24" },
      { title: "FBI: Court-Authorized Operation Disrupts KV Botnet", category: "government", date: "2024-01-31" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "US Government", date: "2024-02-07", confidenceLevel: "Confirmed", evidenceBasis: "CISA/NSA/FBI joint advisory with technical indicators" },
        { actor: "UK Government", date: "2024-02-07", confidenceLevel: "Confirmed", evidenceBasis: "NCSC co-sealed Five Eyes advisory" },
        { actor: "Allied Coalition", date: "2024-02-07", confidenceLevel: "Confirmed", evidenceBasis: "Australia, Canada, New Zealand co-authored advisory" },
        { actor: "Academic/Private Sector", date: "2023-05-24", confidenceLevel: "High", evidenceBasis: "Microsoft original Volt Typhoon reporting" },
      ],
      coordinationType: "joint",
      consequences: ["Public Naming Only"],
    },
    actorSlug: "hafnium-apt40",
  },
  {
    id: "midnight-blizzard-2024",
    slug: "midnight-blizzard",
    name: "Microsoft Midnight Blizzard Corporate Intrusion",
    shortName: "Midnight Blizzard",
    year: 2024,
    dateRange: "November 2023 – January 2024 (disclosed January 2024)",
    incidentType: "espionage",
    summary:
      "SVR/Cozy Bear intrusion into Microsoft's corporate environment via a password spray attack on a legacy test tenant, subsequently accessing source code repositories and internal email communications of senior leadership and cybersecurity staff. The operation targeted a foundational technology vendor's own internal systems rather than its customers.",
    attribution: {
      confidence: "confirmed",
      attributedTo: "Midnight Blizzard (APT29/Cozy Bear), attributed by Microsoft and the US government to Russia's SVR",
      country: "Russia",
      aliases: ["Midnight Blizzard", "APT29", "Cozy Bear", "Nobelium"],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Legacy tenant compromise", description: "Password spray attack compromised a legacy test OAuth application with elevated privileges in Microsoft's corporate environment.", date: "2023-11" },
        { tier: "intrusion", label: "Email and source code access", description: "Actor accessed email accounts of senior leadership and cybersecurity personnel, then pivoted to source code repositories.", date: "2024-01" },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Activity consistent with espionage, no destructive or disruptive payload deployed",
        "No evidence of customer environment compromise through this vector",
      ],
      thresholdCrossings: [
        "State actor directly targeting a foundational technology vendor's internal systems and source code",
        "Escalated concerns about supply chain trust when a platform vendor's own defenses are penetrated",
      ],
    },
    infrastructure: {
      targetSectors: ["technology"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1110.003", name: "Brute Force: Password Spraying", tactic: "Credential Access" },
        { id: "T1550.001", name: "Use Alternate Authentication Material: Application Access Token", tactic: "Lateral Movement" },
        { id: "T1213", name: "Data from Information Repositories", tactic: "Collection" },
      ],
      malwareFamilies: [],
      impactSummary: "Access to Microsoft senior leadership email and source code repositories; scope of exfiltrated data not fully disclosed.",
    },
    governance: {
      flags: ["attribution-public", "regulatory-change"],
      normsInvoked: [
        "Responsible state behavior: targeting foundational technology providers",
        "Supply chain security as a collective defense obligation",
      ],
      policyResponses: [
        "Microsoft SEC 8-K filing under new cyber incident disclosure rules (Jan 2024)",
        "CISA Emergency Directive 24-02 requiring federal agencies to assess exposure",
        "Congressional scrutiny of Microsoft security practices intensified",
      ],
      regulatoryChanges: [
        "SEC cyber disclosure rules applied to a major platform vendor for the first time",
        "CISA expanded authority to direct federal agency response to vendor compromises",
      ],
      impact: "Demonstrated that even the most significant technology vendors remain vulnerable to state-sponsored intrusion, reinforcing demands for platform provider accountability and accelerating federal vendor risk management frameworks.",
    },
    whyThisMatters: "Midnight Blizzard showed that state actors will target the internal systems of foundational technology platforms, not just their customers, raising existential questions about supply chain trust and platform security accountability.",
    teaching: {
      keyQuestion: "When a platform vendor serving most of the world's governments is itself compromised by a state actor, what systemic risks does this create and who bears responsibility?",
      discussionPoints: [
        "Legacy infrastructure debt as a national security vulnerability",
        "Platform vendor accountability: should governments regulate the security of their own suppliers?",
        "SEC disclosure as a transparency mechanism for cybersecurity",
      ],
      furtherReading: [
        "Microsoft Security Response Center: Midnight Blizzard Corporate Intrusion, Jan 2024.",
        "CISA Emergency Directive 24-02, Apr 2024.",
      ],
    },
    sources: [
      { title: "Microsoft: Nation-state attack on Microsoft corporate systems", category: "vendor", date: "2024-01-19" },
      { title: "SEC: Microsoft 8-K Filing on Cyber Incident", category: "legal", date: "2024-01-19" },
      { title: "CISA Emergency Directive 24-02", category: "government", date: "2024-04-02" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2024-01-19", confidenceLevel: "Confirmed", evidenceBasis: "Microsoft identified Midnight Blizzard (APT29) through internal investigation" },
        { actor: "US Government", date: "2024-04-02", confidenceLevel: "Confirmed", evidenceBasis: "CISA emergency directive referencing Russian state-sponsored actor" },
      ],
      coordinationType: "unilateral",
      consequences: ["Public Naming Only"],
    },
    actorSlug: "svr-apt29",
  },
  {
    id: "kyivstar-2023",
    slug: "kyivstar",
    name: "Kyivstar Telecommunications Attack",
    shortName: "Kyivstar",
    year: 2023,
    dateRange: "December 2023",
    incidentType: "destructive",
    summary:
      "Sandworm attack destroying the core network of Kyivstar, Ukraine's largest mobile operator serving approximately 24 million subscribers. The attack wiped network infrastructure and disrupted mobile communications, internet access, and air-raid alert systems across Ukraine for several days during active conflict.",
    attribution: {
      confidence: "confirmed",
      attributedTo: "Sandworm Team, attributed by Ukraine's SBU to Russia's GRU",
      country: "Russia",
      aliases: ["Sandworm", "Voodoo Bear", "IRIDIUM", "Seashell Blizzard"],
    },
    escalation: {
      phases: [
        { tier: "intrusion", label: "Network pre-positioning", description: "Sandworm established access to Kyivstar's internal infrastructure months before the destructive phase.", date: "2023-05" },
        { tier: "destruction", label: "Core network destruction", description: "Wiper malware destroyed core network equipment including virtualization infrastructure, rendering the entire mobile network inoperable.", date: "2023-12-12" },
        { tier: "strategic", label: "Cascading civilian impact", description: "24 million subscribers lost mobile service; air-raid alert systems disrupted during active Russian missile campaigns; banking systems relying on SMS authentication affected.", date: "2023-12-12" },
      ],
      peakTier: "destruction",
      restraintFactors: [
        "Attack targeted a single operator, not all Ukrainian telecoms simultaneously",
        "Service was restored within days through emergency measures",
      ],
      thresholdCrossings: [
        "Largest cyber attack on a telecommunications company during an active armed conflict",
        "Disrupted civilian emergency warning systems during wartime missile campaigns",
      ],
    },
    infrastructure: {
      targetSectors: ["telecommunications", "critical-infrastructure"],
      targetCountries: ["Ukraine"],
      techniques: [
        { id: "T1485", name: "Data Destruction", tactic: "Impact" },
        { id: "T1561.002", name: "Disk Wipe: Disk Structure Wipe", tactic: "Impact" },
        { id: "T1078", name: "Valid Accounts", tactic: "Persistence" },
      ],
      malwareFamilies: ["Solntsepyok wiper"],
      impactSummary: "Core mobile network destroyed; 24 million subscribers affected; air-raid alerts and banking disrupted for days.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "international-cooperation"],
      normsInvoked: [
        "IHL prohibition on targeting civilian communication infrastructure during armed conflict",
        "UN GGE 2015 norm against damaging critical infrastructure",
      ],
      policyResponses: [
        "Ukraine SBU formal attribution to Sandworm (GRU)",
        "Allied governments cited Kyivstar in documentation of Russian wartime cyber operations",
        "Emergency telecommunications support from allied nations",
      ],
      regulatoryChanges: [
        "Ukraine accelerated telecom infrastructure resilience and redundancy measures",
        "Informed EU NIS2 implementation for telecommunications operators",
      ],
      impact: "Demonstrated that cyber operations can achieve telecommunications-equivalent effects to kinetic strikes against civilian infrastructure during armed conflict, strengthening the case for applying IHL to wartime cyber operations against civilian communications.",
    },
    whyThisMatters: "Kyivstar represented the most destructive cyber attack against a telecommunications provider during active conflict, demonstrating ICS-equivalent destructive capability against civilian communication infrastructure and disrupting life-safety warning systems.",
    teaching: {
      keyQuestion: "How should international humanitarian law apply to cyber attacks that destroy civilian communication infrastructure during armed conflict?",
      discussionPoints: [
        "Distinction and proportionality when targeting a dual-use telecom network",
        "Cascading effects: mobile service disruption affecting air-raid warnings",
        "Resilience through redundancy: should states mandate multi-operator fallback?",
      ],
      furtherReading: [
        "Ukraine SBU: Statement on Kyivstar cyber attack attribution, Dec 2023.",
        "RUSI: Cyber Operations in the Russia-Ukraine War, 2024.",
      ],
    },
    sources: [
      { title: "Ukraine SBU: Sandworm responsible for Kyivstar attack", category: "government", date: "2024-01-04" },
      { title: "Kyivstar: Statement on cyber attack and service restoration", category: "vendor", date: "2023-12-12" },
    ],
    attributionDetail: {
      claimants: [
        { actor: "Academic/Private Sector", date: "2024-01-04", confidenceLevel: "Confirmed", evidenceBasis: "Ukraine SBU investigation with technical forensics" },
        { actor: "Allied Coalition", date: "2024-01-15", confidenceLevel: "Confirmed", evidenceBasis: "Allied governments cited in broader Sandworm documentation" },
      ],
      coordinationType: "unilateral",
      consequences: ["Public Naming Only"],
    },
    actorSlug: "sandworm",
  },
];
