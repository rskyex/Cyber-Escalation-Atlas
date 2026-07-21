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
      discussionQuestions: [
        "If an operation is aimed at one country but spreads globally, who bears responsibility for the collateral harm — the attacker, the software vendor, or the unpatched victims?",
        "NotPetya was disguised as ransomware. How should defenders and policymakers classify an operation whose apparent motive masks its real one?",
        "Public attribution to Russia eventually came, but consequences took years. What, if anything, does delayed attribution actually deter?",
        "Several insurers invoked 'act of war' clauses to deny claims. Does importing that language into cyber help or hinder the development of norms?",
      ],
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
    lastUpdated: "2026-07",
    sources: [
      { title: "CISA Alert TA17-181A: Petya Ransomware", url: "https://www.cisa.gov/news-events/alerts/2017/07/01/petya-ransomware", category: "government", date: "2017-07-01" },
      { title: "Microsoft Threat Intelligence: Petya Ransomware Attack", category: "vendor", date: "2017-06-27" },
      { title: "US DOJ: Six Russian GRU Officers Charged", url: "https://www.justice.gov/archives/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and", category: "legal", date: "2020-10-19" },
      { title: "Andy Greenberg, 'The Untold Story of NotPetya, the Most Devastating Cyberattack in History,' Wired", url: "https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/", category: "journalistic", date: "2018-08-22" },
      { title: "Andy Greenberg, Sandworm (Doubleday, 2019)", category: "academic", date: "2019" },
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
        "Operated within traditional espionage norms, collection, not disruption",
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
      discussionQuestions: [
        "SolarWinds is usually described as espionage, not attack. Where is the line between intelligence collection and attack preparation when the same access enables both?",
        "Should a software vendor bear liability for a supply-chain compromise it did not detect? What incentives would that create?",
        "The intrusion went undetected for roughly nine months. Does the duration of undetected access change its strategic meaning?",
        "How should a state calibrate a proportionate response to a large-scale espionage operation that caused no destruction?",
      ],
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
    lastUpdated: "2026-07",
    sources: [
      { title: "CISA Emergency Directive 21-01: Mitigate SolarWinds Orion Code Compromise", url: "https://www.cisa.gov/news-events/directives/ed-21-01-mitigate-solarwinds-orion-code-compromise-closed", category: "government", date: "2020-12-13" },
      { title: "FireEye/Mandiant: Highly Evasive Attacker Leverages SolarWinds Supply Chain (SUNBURST)", url: "https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor/", category: "vendor", date: "2020-12-13" },
      { title: "Executive Order 14028: Improving the Nation's Cybersecurity", category: "government", date: "2021-05-12" },
      { title: "Brad Smith (Microsoft), 'A moment of reckoning: the need for a strong and global cybersecurity response'", url: "https://blogs.microsoft.com/on-the-issues/2020/12/17/cyberattacks-cybersecurity-solarwinds-fireeye/", category: "journalistic", date: "2020-12-17" },
      { title: "Dina Temple-Raston, 'A “Worst Nightmare” Cyberattack: The Untold Story Of The SolarWinds Hack,' NPR", category: "journalistic", date: "2021-04-16" },
    ],
  },

  // ---- Incident 3: Stuxnet --------------------------------------------------
  {
    id: "stuxnet-2010",
    slug: "stuxnet",
    name: "Stuxnet",
    shortName: "Stuxnet",
    year: 2010,
    dateRange: "circa 2007 – 2010",
    incidentType: "sabotage",
    summary:
      "A precision cyber weapon that targeted Siemens SCADA systems controlling uranium-enrichment centrifuges at Iran's Natanz facility. It caused physical destruction of centrifuges while reporting normal telemetry to operators. Widely regarded as the first publicly known cyber operation to cause physical damage to industrial equipment.",
    attribution: {
      confidence: "high",
      attributedTo: "Widely attributed to a joint US–Israeli operation",
      country: "United States / Israel",
      aliases: ["Olympic Games"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Air-gapped network penetration",
          description: "Malware introduced via removable media into an air-gapped industrial control network.",
          date: "2007",
        },
        {
          tier: "degradation",
          label: "Centrifuge manipulation",
          description: "Altered PLC code caused centrifuges to spin outside safe parameters while masking anomalies from monitoring systems.",
          date: "2008",
        },
        {
          tier: "destruction",
          label: "Physical equipment damage",
          description: "Approximately 1,000 IR-1 centrifuges destroyed, temporarily setting back Iran's enrichment program.",
          date: "2009-2010",
        },
      ],
      peakTier: "destruction",
      restraintFactors: [
        "Highly targeted, designed to affect only specific Siemens S7-315/417 configurations",
        "No broader disruption to Iranian civilian infrastructure intended",
      ],
      thresholdCrossings: [
        "First known cyber operation to cause physical destruction of industrial equipment",
        "Demonstrated that cyber means can achieve strategic effects previously requiring kinetic action",
      ],
    },
    infrastructure: {
      targetSectors: ["energy", "critical-infrastructure"],
      targetCountries: ["Iran"],
      techniques: [
        { id: "T1091", name: "Replication Through Removable Media", tactic: "Initial Access" },
        { id: "T1068", name: "Exploitation for Privilege Escalation", tactic: "Privilege Escalation" },
        { id: "T0831", name: "Manipulation of Control", tactic: "Impact (ICS)" },
        { id: "T0856", name: "Spoof Reporting Message", tactic: "Evasion (ICS)" },
      ],
      malwareFamilies: ["Stuxnet"],
      impactSummary: "~1,000 IR-1 centrifuges destroyed at Natanz; temporary disruption to Iran's uranium enrichment timeline.",
    },
    governance: {
      flags: ["norm-violation", "deterrence-signal"],
      normsInvoked: [
        "Sovereignty and non-intervention (UN Charter Art. 2(4) by analogy)",
        "Debate over whether cyber sabotage constitutes a use of force",
      ],
      policyResponses: [
        "Accelerated international discussion of cyber norms (UN GGE 2013 mandate)",
        "Iran expanded its own offensive cyber program in the years following",
      ],
      regulatoryChanges: [
        "Increased ICS/SCADA security guidance from NIST and ICS-CERT",
        "Heightened focus on air-gap integrity in critical infrastructure policy",
      ],
      impact: "Opened the global debate on whether cyber operations can constitute acts of force under international law, and catalyzed both defensive and offensive cyber investment worldwide.",
    },
    whyThisMatters: "Stuxnet proved that software alone can destroy physical infrastructure, fundamentally changing how states, lawyers, and strategists think about the threshold between cyber operations and armed conflict.",
    teaching: {
      keyQuestion: "Does a cyber operation that causes physical destruction cross the use-of-force threshold under international law?",
      discussionQuestions: [
        "Stuxnet caused physical damage but was never publicly claimed. Does deniability make an operation more or less escalatory?",
        "If a cyber operation achieves what a conventional strike would have, should it be judged by the same legal standards?",
        "Stuxnet is often credited with delaying a nuclear programme without war. Is that a model of restraint or a dangerous precedent?",
        "What norms, if any, did Stuxnet establish for using cyber weapons against industrial control systems?",
      ],
      discussionPoints: [
        "Legitimacy of covert cyber sabotage as a non-kinetic alternative to military strikes",
        "Proliferation risk: Stuxnet's code became publicly available after discovery",
        "Precedent-setting effects on other states' cyber doctrines",
      ],
      furtherReading: [
        "Zetter, K. 'Countdown to Zero Day.' Crown, 2014.",
        "Langner, R. 'To Kill a Centrifuge.' The Langner Group, 2013.",
      ],
    },
    lastUpdated: "2026-07",
    sources: [
      { title: "Falliere, Murchu & Chien (Symantec): W32.Stuxnet Dossier", url: "https://docs.broadcom.com/docs/security-response-w32-stuxnet-dossier-11-en", category: "vendor", date: "2011-02" },
      { title: "Ralph Langner, 'To Kill a Centrifuge'", category: "academic", date: "2013-11" },
      { title: "Ralph Langner, 'Stuxnet: Dissecting a Cyberwarfare Weapon,' IEEE Security & Privacy 9(3)", url: "https://ieeexplore.ieee.org/document/5772960/", category: "academic", date: "2011" },
      { title: "David E. Sanger, 'Obama Order Sped Up Wave of Cyberattacks Against Iran,' The New York Times", url: "https://www.nytimes.com/2012/06/01/world/middleeast/obama-ordered-wave-of-cyberattacks-against-iran.html", category: "journalistic", date: "2012-06-01" },
      { title: "ICS-CERT Advisory ICSA-10-272-01", category: "government", date: "2010-09" },
    ],
  },

  // ---- Incident 4: Sony Pictures --------------------------------------------
  {
    id: "sony-pictures-2014",
    slug: "sony-pictures",
    name: "Sony Pictures Entertainment Hack",
    shortName: "Sony Pictures",
    year: 2014,
    dateRange: "November – December 2014",
    incidentType: "destructive",
    summary:
      "Destructive intrusion into Sony Pictures Entertainment that exfiltrated confidential data and deployed wiper malware, rendering thousands of workstations inoperable. Accompanied by coercive threats linked to the film 'The Interview,' prompting an unprecedented US public attribution to a state actor.",
    attribution: {
      confidence: "high",
      attributedTo: "Lazarus Group, attributed by the US government to North Korea's RGB",
      country: "North Korea",
      aliases: ["Lazarus Group", "HIDDEN COBRA", "Guardians of Peace"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Network compromise",
          description: "Attackers gained persistent access to Sony's corporate network and conducted extensive data exfiltration over several weeks.",
          date: "2014-09",
        },
        {
          tier: "destruction",
          label: "Wiper deployment and data leak",
          description: "Destover wiper malware destroyed data on workstations; stolen emails, unreleased films, and employee records published online.",
          date: "2014-11-24",
        },
        {
          tier: "disruption",
          label: "Coercive threats",
          description: "Threats of violence against theaters led Sony to temporarily cancel the theatrical release of 'The Interview.'",
          date: "2014-12",
        },
      ],
      peakTier: "destruction",
      restraintFactors: [
        "Targeted a single corporation, not government or critical infrastructure",
        "No reported physical harm to individuals",
      ],
      thresholdCrossings: [
        "State-sponsored destructive attack against a private company over expressive content",
        "First US presidential public attribution of a cyber attack to a specific state",
      ],
    },
    infrastructure: {
      targetSectors: ["media"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1566.001", name: "Phishing: Spearphishing Attachment", tactic: "Initial Access" },
        { id: "T1485", name: "Data Destruction", tactic: "Impact" },
        { id: "T1561.002", name: "Disk Wipe: Disk Structure Wipe", tactic: "Impact" },
        { id: "T1537", name: "Transfer Data to Cloud Account", tactic: "Exfiltration" },
      ],
      malwareFamilies: ["Destover", "WhiskeyAlfa"],
      impactSummary: "Massive data breach and destruction of IT infrastructure at a major studio; temporary suppression of a film release.",
    },
    governance: {
      flags: ["attribution-public", "sanctions-imposed", "indictment"],
      normsInvoked: [
        "Freedom of expression and non-interference with media",
        "Proportionality debate: cyber destruction as retaliation for a film",
      ],
      policyResponses: [
        "FBI public attribution statement (Dec 2014)",
        "Executive Order 13687 imposing sanctions on North Korean entities (Jan 2015)",
        "US DOJ indictment of Park Jin Hyok (Sep 2018)",
      ],
      regulatoryChanges: [
        "Elevated private-sector cyber threat awareness for entertainment and media industries",
      ],
      impact: "Established the precedent that the US would publicly name state sponsors of cyber attacks against private companies, signaling that corporate targets are within the scope of national security response.",
    },
    whyThisMatters: "Sony Pictures showed that a state can weaponize cyber operations to coerce a private company and suppress speech, raising urgent questions about where corporate cybersecurity meets national security.",
    teaching: {
      keyQuestion: "When does a cyber attack on a private company become a matter of national security?",
      discussionPoints: [
        "State coercion of private-sector speech through cyber means",
        "Effectiveness and risks of public attribution",
        "Proportionality of state response to attacks on non-government targets",
      ],
      furtherReading: [
        "Sanger, D.E. & Perlroth, N. 'U.S. Said to Find North Korea Ordered Cyberattack on Sony.' NYT, 2014.",
        "US DOJ: Criminal Complaint, United States v. Park Jin Hyok, 2018.",
      ],
    },
    sources: [
      { title: "FBI: Update on Sony Investigation", category: "government", date: "2014-12-19" },
      { title: "US DOJ: North Korean Regime-Backed Programmer Charged", category: "legal", date: "2018-09-06" },
      { title: "Novetta: Operation Blockbuster Report", category: "vendor", date: "2016-02" },
    ],
  },

  // ---- Incident 5: Ukraine Power Grid I (2015) ------------------------------
  {
    id: "ukraine-grid-2015",
    slug: "ukraine-power-grid-2015",
    name: "Ukraine Power Grid Attack (2015)",
    shortName: "Ukraine Grid I",
    year: 2015,
    dateRange: "December 2015",
    incidentType: "sabotage",
    summary:
      "Coordinated cyber attack against three Ukrainian regional power distribution companies that caused power outages affecting approximately 230,000 customers. Attackers used spearphishing for initial access, then leveraged stolen credentials to remotely operate SCADA systems and open breakers, followed by destructive actions to delay restoration.",
    attribution: {
      confidence: "high",
      attributedTo: "Sandworm Team, attributed by multiple governments to Russia's GRU",
      country: "Russia",
      aliases: ["Sandworm", "Voodoo Bear", "IRIDIUM"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Spearphishing and credential theft",
          description: "BlackEnergy 3 malware delivered via spearphishing enabled persistent access to corporate networks of three power distributors.",
          date: "2015-03",
        },
        {
          tier: "disruption",
          label: "Remote SCADA manipulation",
          description: "Operators used VPN access and stolen credentials to remotely open circuit breakers at ~30 substations, cutting power to ~230,000 customers.",
          date: "2015-12-23",
        },
        {
          tier: "degradation",
          label: "Restoration sabotage",
          description: "KillDisk wiper deployed on operator workstations; UPS firmware overwritten; call-center telephone lines flooded to hinder response.",
          date: "2015-12-23",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Outages lasted ~6 hours; manual restoration was possible",
        "Limited to distribution-level systems, not generation or transmission",
      ],
      thresholdCrossings: [
        "First publicly confirmed cyber attack to cause a power outage",
        "Demonstrated end-to-end attack chain from IT network to physical grid impact",
      ],
    },
    infrastructure: {
      targetSectors: ["energy", "critical-infrastructure"],
      targetCountries: ["Ukraine"],
      techniques: [
        { id: "T1566.001", name: "Phishing: Spearphishing Attachment", tactic: "Initial Access" },
        { id: "T1078", name: "Valid Accounts", tactic: "Persistence" },
        { id: "T0831", name: "Manipulation of Control", tactic: "Impact (ICS)" },
        { id: "T1561", name: "Disk Wipe", tactic: "Impact" },
      ],
      malwareFamilies: ["BlackEnergy 3", "KillDisk"],
      impactSummary: "Power outages for ~230,000 customers across three regions; manual restoration required ~6 hours.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "international-cooperation"],
      normsInvoked: [
        "UN GGE 2015 norm against attacking critical infrastructure",
        "Tallinn Manual rules on attacks against civilian objects",
      ],
      policyResponses: [
        "DHS ICS-CERT technical assistance and joint analysis with Ukrainian CERT",
        "Increased NATO cyber cooperation with Ukraine",
      ],
      regulatoryChanges: [
        "Spurred US grid-security reviews (NERC CIP awareness campaigns)",
        "Informed EU NIS Directive discussions on energy-sector resilience",
      ],
      impact: "Provided the first real-world proof that cyber operations can disrupt civilian power infrastructure, materially shaping ICS security standards and NATO cyber policy.",
    },
    whyThisMatters: "Ukraine 2015 was the first confirmed cyber-caused power outage, turning a theoretical risk into an operational reality that reshaped how governments defend energy grids.",
    teaching: {
      keyQuestion: "How should states protect civilian critical infrastructure from cyber attacks during geopolitical conflict?",
      discussionPoints: [
        "Value of manual override capability as a resilience measure",
        "IT/OT convergence as an attack surface",
        "Applicability of the UN GGE critical-infrastructure norm",
      ],
      furtherReading: [
        "Lee, R.M. et al. 'Analysis of the Cyber Attack on the Ukrainian Power Grid.' SANS ICS, 2016.",
        "Greenberg, A. 'Sandworm.' Doubleday, 2019.",
      ],
    },
    sources: [
      { title: "ICS-CERT Alert IR-ALERT-H-16-056-01", category: "government", date: "2016-02-25" },
      { title: "SANS ICS: Analysis of the Cyber Attack on the Ukrainian Power Grid", category: "academic", date: "2016-03-18" },
      { title: "ESET: BlackEnergy by the SSHBearDoor", category: "vendor", date: "2016-01" },
    ],
  },

  // ---- Incident 6: Ukraine Power Grid II (2016) -----------------------------
  {
    id: "ukraine-grid-2016",
    slug: "ukraine-power-grid-2016",
    name: "Ukraine Power Grid Attack (2016 / Industroyer)",
    shortName: "Ukraine Grid II",
    year: 2016,
    dateRange: "December 2016",
    incidentType: "sabotage",
    summary:
      "A more sophisticated follow-up to the 2015 grid attack, this operation used purpose-built ICS malware (Industroyer/CrashOverride) capable of directly speaking industrial protocols to open circuit breakers. It caused a localized outage in Kyiv lasting approximately one hour.",
    attribution: {
      confidence: "high",
      attributedTo: "Sandworm Team, attributed by multiple governments to Russia's GRU",
      country: "Russia",
      aliases: ["Sandworm", "Voodoo Bear", "IRIDIUM"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Network pre-positioning",
          description: "Attackers established persistent access to Ukrenergo's network months before the attack.",
          date: "2016-01",
        },
        {
          tier: "disruption",
          label: "Automated protocol-level attack",
          description: "Industroyer malware issued commands via IEC 101, IEC 104, OPC DA, and IEC 61850 protocols to trip breakers at a Kyiv-area transmission substation.",
          date: "2016-12-17",
        },
        {
          tier: "degradation",
          label: "Attempted recovery sabotage",
          description: "Wiper component targeted Windows workstations; a denial-of-service module aimed at Siemens SIPROTEC relays to hinder manual restoration.",
          date: "2016-12-17",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Outage lasted ~1 hour; scope limited to one transmission substation",
        "Relay DoS module did not achieve widespread effect",
      ],
      thresholdCrossings: [
        "First known malware purpose-built to attack electric grid protocols",
        "Demonstrated automated ICS attack capability without operator interaction",
      ],
    },
    infrastructure: {
      targetSectors: ["energy", "critical-infrastructure"],
      targetCountries: ["Ukraine"],
      techniques: [
        { id: "T0855", name: "Unauthorized Command Message", tactic: "Impact (ICS)" },
        { id: "T0831", name: "Manipulation of Control", tactic: "Impact (ICS)" },
        { id: "T1059", name: "Command and Scripting Interpreter", tactic: "Execution" },
        { id: "T1561", name: "Disk Wipe", tactic: "Impact" },
      ],
      malwareFamilies: ["Industroyer", "CrashOverride"],
      impactSummary: "~1-hour power outage in part of Kyiv via automated ICS malware; limited physical damage.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "international-cooperation"],
      normsInvoked: [
        "UN GGE 2015 norm against attacking critical infrastructure",
        "Tallinn Manual rules on proportionality and civilian objects",
      ],
      policyResponses: [
        "Joint ESET/Dragos technical disclosure to support global ICS defense",
        "US DHS and CISA advisories on Industroyer threat",
        "Deepened NATO–Ukraine cyber defense cooperation",
      ],
      regulatoryChanges: [
        "Accelerated ICS protocol security research globally",
        "Informed IEC 62351 security standard adoption discussions",
      ],
      impact: "Industroyer proved that adversaries are investing in reusable, modular ICS attack frameworks, raising the bar for grid defense and influencing ICS security standards worldwide.",
    },
    whyThisMatters: "Industroyer represented a generational leap in ICS malware sophistication, a modular, protocol-aware weapon that signaled the industrialization of grid-targeted cyber capabilities.",
    teaching: {
      keyQuestion: "What are the policy implications of reusable, modular cyber weapons designed for industrial control systems?",
      discussionPoints: [
        "Escalation trajectory from 2015 (manual SCADA access) to 2016 (automated ICS malware)",
        "Arms-race dynamics in offensive ICS capability development",
        "Role of private-sector threat intelligence in public defense",
      ],
      furtherReading: [
        "Dragos: CrashOverride, Analysis of the Threat to Electric Grid Operations, 2017.",
        "ESET: Industroyer, A New Threat for Industrial Control Systems, 2017.",
      ],
    },
    sources: [
      { title: "ESET: Industroyer, A New Threat for Industrial Control Systems", category: "vendor", date: "2017-06-12" },
      { title: "Dragos: CrashOverride Report", category: "vendor", date: "2017-06-12" },
      { title: "US-CERT Alert TA17-163A", category: "government", date: "2017-06-12" },
    ],
  },

  // ---- Incident 7: WannaCry -------------------------------------------------
  {
    id: "wannacry-2017",
    slug: "wannacry",
    name: "WannaCry Ransomware",
    shortName: "WannaCry",
    year: 2017,
    dateRange: "May 2017",
    incidentType: "ransomware",
    summary:
      "Self-propagating ransomware that exploited the EternalBlue SMB vulnerability to spread across ~150 countries in hours. The UK's National Health Service was among the hardest hit, with hospitals diverting ambulances and cancelling surgeries. A researcher-activated kill switch slowed propagation, but not before substantial global disruption.",
    attribution: {
      confidence: "high",
      attributedTo: "Lazarus Group, attributed by the US, UK, and allied governments to North Korea's RGB",
      country: "North Korea",
      aliases: ["Lazarus Group", "HIDDEN COBRA"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Weaponization of leaked exploit",
          description: "EternalBlue (leaked from NSA tooling by Shadow Brokers) integrated into a worm-capable ransomware payload.",
          date: "2017-04",
        },
        {
          tier: "disruption",
          label: "Global worm propagation",
          description: "WannaCry spread autonomously via SMBv1, encrypting systems in hospitals, telecoms, railways, and factories across ~150 countries.",
          date: "2017-05-12",
        },
        {
          tier: "degradation",
          label: "Healthcare impact",
          description: "NHS England diverted ambulances from at least 5 emergency departments; ~19,000 appointments cancelled in one week.",
          date: "2017-05-12",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Kill switch domain limited further spread once activated",
        "Ransomware payment mechanism was poorly designed, suggesting profit was not the primary motive",
      ],
      thresholdCrossings: [
        "First state-linked ransomware to cause widespread disruption to healthcare services",
        "Demonstrated risk of weaponized vulnerability stockpiles entering the wild",
      ],
    },
    infrastructure: {
      targetSectors: ["healthcare", "telecommunications", "transportation", "manufacturing", "multiple"],
      targetCountries: ["Global"],
      techniques: [
        { id: "T1210", name: "Exploitation of Remote Services", tactic: "Lateral Movement" },
        { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
        { id: "T1570", name: "Lateral Tool Transfer", tactic: "Lateral Movement" },
      ],
      malwareFamilies: ["WannaCry", "EternalBlue"],
      impactSummary: "~200,000 systems encrypted in ~150 countries; major disruption to UK NHS, Telefónica, Deutsche Bahn, and others.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "sanctions-imposed", "indictment"],
      normsInvoked: [
        "UN GGE 2015 norm against damaging critical infrastructure",
        "Duty of care toward healthcare systems in peacetime",
      ],
      policyResponses: [
        "Five Eyes + Japan joint attribution to North Korea (Dec 2017)",
        "US DOJ indictment of Park Jin Hyok (Sep 2018)",
        "Renewed debate over intelligence agency vulnerability equities processes",
      ],
      regulatoryChanges: [
        "NHS mandated cyber-resilience upgrades and patching requirements",
        "Accelerated global patch-management awareness campaigns",
      ],
      impact: "Forced governments to confront the tension between stockpiling vulnerabilities for intelligence and protecting public health infrastructure from the same exploits.",
    },
    whyThisMatters: "WannaCry exposed how a leaked intelligence exploit can cascade into a global healthcare crisis, sharpening the policy debate on vulnerability disclosure and the duty to protect civilian systems.",
    teaching: {
      keyQuestion: "Should states disclose vulnerabilities they discover, or stockpile them for intelligence purposes?",
      discussionQuestions: [
        "WannaCry spread using an exploit derived from a leaked government toolkit. What responsibility do states bear for the vulnerabilities they stockpile?",
        "The outbreak was slowed partly by chance (a kill switch). How should the role of luck factor into assessments of severity?",
        "Hospitals were disrupted though not specifically targeted. Does intent matter when civilian critical infrastructure is harmed?",
        "North Korea was formally named. What is the purpose of attribution when the named state faces few additional consequences?",
      ],
      discussionPoints: [
        "Vulnerability equities process: intelligence value vs. public safety",
        "Healthcare as a uniquely vulnerable sector in cyber conflict",
        "Attribution challenges when criminal tools serve state objectives",
      ],
      furtherReading: [
        "NAO: Investigation: WannaCry Cyber Attack and the NHS. 2018.",
        "Bossert, T. 'It's Official: North Korea Is Behind WannaCry.' WSJ, 2017.",
      ],
    },
    lastUpdated: "2026-07",
    sources: [
      { title: "NHS England: Lessons Learned Review of WannaCry", category: "government", date: "2018-02" },
      { title: "MSRC: Customer Guidance for WannaCrypt Attacks", url: "https://msrc.microsoft.com/blog/2017/05/customer-guidance-for-wannacrypt-attacks/", category: "vendor", date: "2017-05-12" },
      { title: "CISA Alert TA17-132A: Indicators Associated With WannaCry Ransomware", url: "https://www.cisa.gov/news-events/alerts/2017/05/12/indicators-associated-wannacry-ransomware", category: "government", date: "2017-05-12" },
      { title: "US DOJ: North Korean Regime-Backed Programmer Charged (Park Jin Hyok)", url: "https://www.justice.gov/archives/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and", category: "legal", date: "2018-09-06" },
      { title: "Nicole Perlroth, This Is How They Tell Me the World Ends (Bloomsbury, 2021)", category: "academic", date: "2021" },
    ],
  },

  // ---- Incident 8: Colonial Pipeline ----------------------------------------
  {
    id: "colonial-pipeline-2021",
    slug: "colonial-pipeline",
    name: "Colonial Pipeline Ransomware Attack",
    shortName: "Colonial Pipeline",
    year: 2021,
    dateRange: "May 2021",
    incidentType: "ransomware",
    summary:
      "DarkSide ransomware group encrypted IT systems at Colonial Pipeline, operator of the largest refined-fuel pipeline in the US. The company preemptively shut down OT pipeline operations for six days, triggering fuel shortages and panic buying across the US East Coast. A $4.4M ransom was paid, of which the DOJ later recovered roughly $2.3M.",
    attribution: {
      confidence: "high",
      attributedTo: "DarkSide ransomware-as-a-service group, assessed to be a Russian-speaking criminal organization",
      country: "Russia (criminal, not directly state-sponsored per US assessment)",
      aliases: ["DarkSide", "BlackMatter"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "VPN credential compromise",
          description: "Initial access via a compromised VPN account lacking multi-factor authentication.",
          date: "2021-05-06",
        },
        {
          tier: "disruption",
          label: "IT encryption and OT shutdown",
          description: "DarkSide encrypted IT billing systems; Colonial preemptively shut OT pipeline operations to contain potential spread.",
          date: "2021-05-07",
        },
        {
          tier: "degradation",
          label: "Fuel supply disruption",
          description: "Six-day pipeline shutdown caused fuel shortages, price spikes, and emergency declarations in 17 US states.",
          date: "2021-05-07",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Attackers targeted IT, not OT directly, pipeline shutdown was a precautionary business decision",
        "DarkSide issued a public statement claiming they did not intend societal disruption",
      ],
      thresholdCrossings: [
        "Ransomware caused a national-level fuel supply disruption for the first time",
        "Demonstrated that IT-side attacks can have cascading OT and societal effects",
      ],
    },
    infrastructure: {
      targetSectors: ["energy", "critical-infrastructure", "transportation"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
        { id: "T1021.001", name: "Remote Services: Remote Desktop Protocol", tactic: "Lateral Movement" },
      ],
      malwareFamilies: ["DarkSide"],
      impactSummary: "Six-day shutdown of 5,500-mile pipeline supplying ~45% of US East Coast fuel; 17-state emergency declarations.",
    },
    governance: {
      flags: ["regulatory-change", "sanctions-imposed", "deterrence-signal"],
      normsInvoked: [
        "Responsible state behavior: harboring cybercriminals targeting critical infrastructure",
        "Biden–Putin Geneva summit discussion on ransomware safe harbors (Jun 2021)",
      ],
      policyResponses: [
        "DOJ Recovery of ~$2.3M in Bitcoin ransom (Jun 2021)",
        "Executive Order 14028: Improving the Nation's Cybersecurity (May 2021)",
        "TSA Security Directives mandating pipeline cybersecurity controls (Jul 2021)",
      ],
      regulatoryChanges: [
        "TSA pipeline cybersecurity requirements (first-ever mandatory controls)",
        "CISA ransomware reporting guidance",
        "Strengthened Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA) momentum",
      ],
      impact: "Transformed pipeline cybersecurity from voluntary to mandatory and accelerated federal ransomware strategy, including offensive operations against ransomware infrastructure.",
    },
    whyThisMatters: "Colonial Pipeline proved that criminal ransomware can trigger national-level infrastructure disruptions, collapsing the boundary between cybercrime and national security and forcing mandatory regulation of pipeline cyber defenses.",
    teaching: {
      keyQuestion: "Should critical infrastructure cybersecurity be regulated, or left to market incentives?",
      discussionPoints: [
        "Cascading effects: IT compromise leading to precautionary OT shutdown",
        "State responsibility for criminal groups operating within borders",
        "Ransom payment policy: pay to restore vs. refuse to deter",
      ],
      furtherReading: [
        "CISA: DarkSide Ransomware Alert AA21-131A, 2021.",
        "Testimony of Colonial Pipeline CEO before US Senate, Jun 2021.",
      ],
    },
    sources: [
      { title: "CISA Alert AA21-131A: DarkSide Ransomware", category: "government", date: "2021-05-11" },
      { title: "DOJ: Department of Justice Seizes $2.3 Million in Cryptocurrency", category: "legal", date: "2021-06-07" },
      { title: "TSA Security Directive Pipeline-2021-01", category: "government", date: "2021-07-20" },
    ],
  },

  // ---- Incident 9: Oldsmar Water Plant --------------------------------------
  {
    id: "oldsmar-water-2021",
    slug: "oldsmar-water",
    name: "Oldsmar Water Treatment Plant Intrusion",
    shortName: "Oldsmar Water",
    year: 2021,
    dateRange: "February 2021",
    incidentType: "sabotage",
    summary:
      "An unauthorized actor remotely accessed the SCADA system at the Oldsmar, Florida water treatment plant via TeamViewer and attempted to increase sodium hydroxide (lye) levels to potentially dangerous concentrations. An operator observed the cursor movement in real time and immediately reversed the change. No public harm resulted.",
    attribution: {
      confidence: "low",
      attributedTo: "Unknown; initial reports suggested a remote intruder, though subsequent investigation raised the possibility of insider involvement",
      country: "Unknown",
      aliases: [],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Remote access via TeamViewer",
          description: "Attacker accessed the plant's HMI through TeamViewer software using shared credentials on an internet-facing system.",
          date: "2021-02-05",
        },
        {
          tier: "disruption",
          label: "Chemical setpoint manipulation",
          description: "Sodium hydroxide level changed from ~100 ppm to ~11,100 ppm, an operator noticed and reversed the change within minutes.",
          date: "2021-02-05",
        },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "Operator observation enabled immediate reversal",
        "Multiple downstream safety checks would likely have caught the change before it reached consumers",
      ],
      thresholdCrossings: [
        "Demonstrated that remote access to water treatment SCADA can enable potentially harmful chemical manipulation",
        "Highlighted systemic weaknesses: shared passwords, unpatched remote-access software, flat networks",
      ],
    },
    infrastructure: {
      targetSectors: ["critical-infrastructure"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1133", name: "External Remote Services", tactic: "Initial Access" },
        { id: "T0831", name: "Manipulation of Control", tactic: "Impact (ICS)" },
        { id: "T1078", name: "Valid Accounts", tactic: "Persistence" },
      ],
      malwareFamilies: [],
      impactSummary: "No public harm; chemical change reversed within minutes by an alert operator.",
    },
    governance: {
      flags: ["regulatory-change"],
      normsInvoked: [
        "Safe drinking water as a protected civilian necessity",
        "Duty to secure public health infrastructure",
      ],
      policyResponses: [
        "CISA, FBI, and EPA joint advisory on water/wastewater sector cybersecurity",
        "Congressional attention to water-sector cyber resilience funding gaps",
      ],
      regulatoryChanges: [
        "EPA increased focus on cybersecurity in sanitary surveys (later challenged in court)",
        "CISA launched water-sector specific vulnerability scanning services",
      ],
      impact: "Exposed the severe under-investment in water-sector cybersecurity and became a catalyst for federal efforts to extend cyber standards to small utilities, though regulatory authority remains contested.",
    },
    whyThisMatters: "Oldsmar made water-system cyber risk tangible for policymakers and the public, revealing how small utilities with minimal security budgets can become targets with public-health consequences.",
    teaching: {
      keyQuestion: "How should governments secure thousands of small, under-resourced water utilities against cyber threats?",
      discussionPoints: [
        "Resource asymmetry: small utilities vs. sophisticated threats",
        "Attribution uncertainty and its effect on policy response",
        "Role of human-in-the-loop as a last line of defense in ICS",
      ],
      furtherReading: [
        "CISA Advisory AA21-042A: Compromise of U.S. Water Treatment Facility, 2021.",
        "EPA: Cybersecurity for the Water Sector, 2023.",
      ],
    },
    sources: [
      { title: "CISA/FBI/EPA Advisory AA21-042A", category: "government", date: "2021-02-11" },
      { title: "Pinellas County Sheriff press conference transcript", category: "government", date: "2021-02-08" },
    ],
  },

  // ---- Incident 10: Viasat KA-SAT -------------------------------------------
  {
    id: "viasat-kasat-2022",
    slug: "viasat-kasat",
    name: "Viasat KA-SAT (AcidRain)",
    shortName: "Viasat KA-SAT",
    year: 2022,
    dateRange: "February 2022",
    incidentType: "destructive",
    summary:
      "Destructive cyber attack against Viasat's KA-SAT satellite broadband network, timed to coincide with Russia's invasion of Ukraine on 24 February 2022. AcidRain wiper malware bricked tens of thousands of satellite modems across Europe, disrupting Ukrainian military and government communications and causing collateral outages to wind turbines in Germany and broadband users in multiple EU states.",
    attribution: {
      confidence: "confirmed",
      attributedTo: "Attributed by the EU, UK, US, and allied governments to Russia's GRU",
      country: "Russia",
      aliases: ["Sandworm"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "VPN appliance exploitation",
          description: "Attackers exploited a misconfigured VPN appliance in the KA-SAT management network to reach modem provisioning infrastructure.",
          date: "2022-02-24",
        },
        {
          tier: "destruction",
          label: "Mass modem wipe",
          description: "AcidRain wiper pushed to tens of thousands of SurfBeam2 modems, overwriting flash storage and rendering them permanently inoperable.",
          date: "2022-02-24",
        },
        {
          tier: "strategic",
          label: "Collateral disruption across Europe",
          description: "Beyond Ukraine, the attack disrupted ~5,800 Enercon wind turbines in Germany and broadband for users in France, Italy, and Central Europe.",
          date: "2022-02-24",
        },
      ],
      peakTier: "strategic",
      restraintFactors: [
        "Attack targeted communications infrastructure, not life-safety systems",
        "Physical satellite constellation was not damaged",
      ],
      thresholdCrossings: [
        "First confirmed cyber attack synchronized with the opening of a conventional military invasion",
        "Cross-border collateral impact on NATO-member critical infrastructure",
      ],
    },
    infrastructure: {
      targetSectors: ["telecommunications", "defense", "energy", "critical-infrastructure"],
      targetCountries: ["Ukraine", "Germany", "France", "Italy", "Central Europe"],
      techniques: [
        { id: "T1133", name: "External Remote Services", tactic: "Initial Access" },
        { id: "T1561.002", name: "Disk Wipe: Disk Structure Wipe", tactic: "Impact" },
        { id: "T1498", name: "Network Denial of Service", tactic: "Impact" },
      ],
      malwareFamilies: ["AcidRain"],
      impactSummary: "Tens of thousands of satellite modems bricked; disruption to Ukrainian military comms and collateral outages across multiple EU states.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "sanctions-imposed", "international-cooperation"],
      normsInvoked: [
        "UN GGE 2015 norm against attacking critical infrastructure",
        "International humanitarian law: proportionality and distinction in armed conflict",
      ],
      policyResponses: [
        "EU, UK, and US formal attribution to Russia (May 2022)",
        "NATO recognized cyberspace as an operational domain with renewed emphasis",
        "Viasat coordinated with NSA and allied agencies on incident response",
      ],
      regulatoryChanges: [
        "EU NIS2 Directive implementation accelerated, partly citing Viasat as a motivating case",
        "Increased focus on satellite and space-system cybersecurity in US National Cyber Strategy (2023)",
      ],
      impact: "Demonstrated that cyber operations are now integrated into conventional military campaigns and that collateral effects readily cross borders, reinforcing momentum behind the EU NIS2 Directive and NATO cyber commitments.",
    },
    whyThisMatters: "Viasat KA-SAT was the clearest example yet of cyber attack as an opening act of war, with cross-border collateral damage that forced NATO and the EU to treat satellite infrastructure as a shared security concern.",
    teaching: {
      keyQuestion: "How does the integration of cyber operations into conventional warfare change the rules of armed conflict?",
      discussionQuestions: [
        "A commercial satellite network served military and civilian users alike. How should dual-use infrastructure be treated under the principle of distinction?",
        "Collateral outages spread across NATO states not party to the conflict. When does spillover become a separate international wrong?",
        "Allied attribution was unusually fast and coordinated. What made rapid joint attribution possible here, and is it repeatable?",
        "The wiper was timed to a kinetic invasion. How does cyber–kinetic coordination change the escalation calculus?",
      ],
      discussionPoints: [
        "Cyber as a precursor to kinetic operations: legal and strategic implications",
        "Collateral damage across borders and the distinction principle in IHL",
        "Resilience of commercial satellite infrastructure as a security dependency",
      ],
      furtherReading: [
        "SentinelOne: AcidRain, A Modem Wiper Rains Down on Europe, 2022.",
        "Viasat Incident Report: KA-SAT Network Cyber Attack Overview, 2022.",
      ],
    },
    lastUpdated: "2026-07",
    sources: [
      { title: "Viasat: KA-SAT Network Cyber Attack Overview", url: "https://news.viasat.com/blog/corporate/ka-sat-network-cyber-attack-overview", category: "vendor", date: "2022-03-30" },
      { title: "Guerrero-Saade & Chen (SentinelOne Labs): AcidRain — A Modem Wiper Rains Down on Europe", url: "https://www.sentinelone.com/labs/acidrain-a-modem-wiper-rains-down-on-europe/", category: "vendor", date: "2022-03-31" },
      { title: "Council of the EU: Declaration by the High Representative on Russian cyber operations against Ukraine (Viasat/KA-SAT)", url: "https://www.consilium.europa.eu/en/press/press-releases/2022/05/10/russian-cyber-operations-against-ukraine-declaration-by-the-high-representative-on-behalf-of-the-european-union/", category: "government", date: "2022-05-10" },
    ],
  },

  // ---- Incident 11: Microsoft Exchange / Hafnium (2021) ---------------------
  {
    id: "exchange-hafnium-2021",
    slug: "exchange-hafnium",
    name: "Microsoft Exchange Server Exploitation (Hafnium)",
    shortName: "Exchange/Hafnium",
    year: 2021,
    dateRange: "January – March 2021",
    incidentType: "espionage",
    summary:
      "Mass exploitation of four zero-day vulnerabilities in on-premises Microsoft Exchange Server by a China-based group, later followed by indiscriminate exploitation by multiple actors after patches were released. At least 30,000 US organizations and many more worldwide were compromised, with web shells left for persistent access.",
    attribution: {
      confidence: "high",
      attributedTo: "Hafnium, attributed by the US and allied governments to actors affiliated with China's Ministry of State Security",
      country: "China",
      aliases: ["Hafnium", "Silk Typhoon"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Targeted zero-day exploitation",
          description: "Hafnium exploited ProxyLogon vulnerabilities (CVE-2021-26855 et al.) for targeted espionage against select organizations.",
          date: "2021-01",
        },
        {
          tier: "disruption",
          label: "Mass exploitation wave",
          description: "Exploitation broadened dramatically in late February, compromising tens of thousands of Exchange servers worldwide with web shells before patches were available.",
          date: "2021-02-27",
        },
        {
          tier: "degradation",
          label: "Persistent access and secondary actors",
          description: "Multiple unrelated threat groups began exploiting the same vulnerabilities, complicating triage. Ransomware operators leveraged web shells left behind.",
          date: "2021-03",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Initial phase was narrowly targeted espionage",
        "No destructive payload deployed by the primary actor",
      ],
      thresholdCrossings: [
        "Shift from targeted espionage to indiscriminate mass exploitation at scale",
        "Created attack surface subsequently exploited by criminal ransomware groups",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "defense", "healthcare", "education", "technology", "multiple"],
      targetCountries: ["United States", "Global"],
      techniques: [
        { id: "T1190", name: "Exploit Public-Facing Application", tactic: "Initial Access" },
        { id: "T1505.003", name: "Server Software Component: Web Shell", tactic: "Persistence" },
        { id: "T1078", name: "Valid Accounts", tactic: "Persistence" },
      ],
      malwareFamilies: ["China Chopper", "ASPXSpy"],
      impactSummary: "At least 30,000 US organizations compromised; web shells provided persistent access exploitable by any subsequent attacker.",
    },
    governance: {
      flags: ["attribution-public", "indictment", "international-cooperation", "norm-violation"],
      normsInvoked: [
        "Responsible disclosure and restraint in vulnerability exploitation",
        "UN GGE norm on responsible state behavior in ICT use",
      ],
      policyResponses: [
        "Unprecedented joint attribution by US, EU, NATO, Five Eyes, and Japan (Jul 2021)",
        "US DOJ indictment of four MSS-affiliated individuals (Jul 2021)",
        "CISA Emergency Directive 21-02 ordering federal agencies to patch or disconnect",
      ],
      regulatoryChanges: [
        "Strengthened CISA authority for emergency directives on private-sector software",
        "Accelerated US push for coordinated vulnerability disclosure norms",
      ],
      impact: "The broadest multilateral cyber attribution to date, including NATO's first explicit attribution to China, established a template for coalition-based diplomatic response to state-sponsored cyber campaigns.",
    },
    whyThisMatters: "Hafnium demonstrated how a targeted espionage operation can metastasize into a mass-compromise event affecting tens of thousands, and prompted the widest coalition cyber attribution ever directed at China.",
    teaching: {
      keyQuestion: "What obligations do states have to limit collateral damage from their own cyber espionage operations?",
      discussionPoints: [
        "Responsible vulnerability exploitation vs. indiscriminate access",
        "Cascading risk when espionage infrastructure is discovered by criminal actors",
        "Effectiveness of multilateral attribution coalitions",
      ],
      furtherReading: [
        "Microsoft Threat Intelligence: Hafnium Targeting Exchange Servers, 2021.",
        "White House: Attribution Statement on Microsoft Exchange Exploitation, Jul 2021.",
      ],
    },
    sources: [
      { title: "Microsoft: Hafnium Targeting Exchange Servers with 0-Day Exploits", category: "vendor", date: "2021-03-02" },
      { title: "CISA Emergency Directive 21-02", category: "government", date: "2021-03-03" },
      { title: "White House: PRC Cyber Attribution Statement", category: "government", date: "2021-07-19" },
    ],
  },

  // ---- Incident 12: Costa Rica Government (2022) ----------------------------
  {
    id: "costa-rica-conti-2022",
    slug: "costa-rica-conti",
    name: "Costa Rica Government Ransomware Attack",
    shortName: "Costa Rica / Conti",
    year: 2022,
    dateRange: "April – May 2022",
    incidentType: "ransomware",
    summary:
      "Conti ransomware group attacked multiple Costa Rican government ministries, encrypting systems at the Ministry of Finance, disabling tax and customs platforms, and demanding a $20M ransom (later reduced to $10M). Costa Rica declared a national emergency, the first country to do so in response to a ransomware attack. A follow-on attack attributed to HIVE targeted the social security healthcare system weeks later.",
    attribution: {
      confidence: "high",
      attributedTo: "Conti ransomware group (Russian-speaking criminal organization); follow-on attack attributed to HIVE",
      country: "Russia (criminal, not directly state-sponsored per public assessments)",
      aliases: ["Conti", "Wizard Spider", "HIVE"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Initial government network compromise",
          description: "Conti gained access to the Ministry of Finance network, exfiltrating data and pre-positioning for encryption.",
          date: "2022-04-12",
        },
        {
          tier: "disruption",
          label: "Multi-ministry encryption",
          description: "Tax collection, customs, and import/export systems taken offline; ~672 GB of government data exfiltrated and partially leaked.",
          date: "2022-04-18",
        },
        {
          tier: "degradation",
          label: "National emergency declaration",
          description: "President Chaves declared a national emergency; HIVE subsequently attacked the social security health system (CCSS), disrupting hospital operations.",
          date: "2022-05-08",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Attackers offered decryption for ransom, coercive but not purely destructive",
        "No reported impact on life-safety systems",
      ],
      thresholdCrossings: [
        "First country to declare a national emergency over ransomware",
        "Demonstrated that ransomware can functionally incapacitate the fiscal apparatus of a nation-state",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "finance", "healthcare"],
      targetCountries: ["Costa Rica"],
      techniques: [
        { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1048", name: "Exfiltration Over Alternative Protocol", tactic: "Exfiltration" },
      ],
      malwareFamilies: ["Conti", "HIVE"],
      impactSummary: "Tax and customs systems offline for weeks; national emergency declared; healthcare disrupted by follow-on attack.",
    },
    governance: {
      flags: ["norm-violation", "international-cooperation", "sanctions-imposed"],
      normsInvoked: [
        "Protection of government services and public welfare infrastructure",
        "Responsible state behavior: preventing criminal groups from operating with impunity",
      ],
      policyResponses: [
        "US offered $10M reward for information on Conti leadership",
        "US and allied assistance to Costa Rica for incident response",
        "Counter Ransomware Initiative (CRI) coalition cited Costa Rica as motivating case",
      ],
      regulatoryChanges: [
        "Costa Rica accelerated national cybersecurity strategy and institutional reforms",
        "Reinforced international momentum for the Counter Ransomware Initiative",
      ],
      impact: "Made the strategic threat of ransomware to sovereign governance undeniable, strengthening the case for treating ransomware groups as national security threats rather than mere criminal nuisances.",
    },
    whyThisMatters: "Costa Rica showed that ransomware can effectively disable a nation's fiscal and health systems, forcing the first-ever national emergency declaration over a cyber attack and elevating ransomware to a sovereign-level threat.",
    teaching: {
      keyQuestion: "When ransomware incapacitates core government functions, does it cross the threshold from crime to national security threat?",
      discussionPoints: [
        "Capacity gaps: small and mid-size states facing sophisticated criminal groups",
        "International assistance frameworks for ransomware emergencies",
        "Strategic relationship between ransomware crews and state tolerance",
      ],
      furtherReading: [
        "BleepingComputer: Costa Rica declares national emergency after Conti ransomware attacks, 2022.",
        "Counter Ransomware Initiative Joint Statement, 2022.",
      ],
    },
    sources: [
      { title: "Costa Rica Presidential Decree of National Emergency", category: "government", date: "2022-05-08" },
      { title: "US State Department: Reward Offer for Conti Leadership", category: "government", date: "2022-05-06" },
      { title: "CISA: Conti Ransomware Advisory AA21-265A (updated)", category: "government", date: "2022-04" },
    ],
  },

  // ---- Incident 13: Albania Government (2022) -------------------------------
  {
    id: "albania-iran-2022",
    slug: "albania-iran",
    name: "Albania Government Cyber Attack",
    shortName: "Albania / Iran",
    year: 2022,
    dateRange: "July – September 2022",
    incidentType: "destructive",
    summary:
      "Iran-linked actors launched destructive cyber attacks against Albanian government systems, deploying wiper malware and ransomware that took e-government services offline for weeks. Albania attributed the attack to Iran and took the unprecedented step of severing diplomatic relations, the first known rupture of diplomatic ties over a cyber operation.",
    attribution: {
      confidence: "high",
      attributedTo: "Attributed by Albania, the US, and allied governments to Iranian state actors affiliated with MOIS",
      country: "Iran",
      aliases: ["Homeland Justice", "DEV-0861", "DEV-0166"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Persistent access established",
          description: "Iranian actors maintained access to Albanian government networks for over a year prior to the destructive phase.",
          date: "2021-05",
        },
        {
          tier: "destruction",
          label: "Wiper and ransomware deployment",
          description: "Wiper malware and ransomware deployed against government IT systems, taking down e-services including border control and tax platforms.",
          date: "2022-07-15",
        },
        {
          tier: "disruption",
          label: "Second wave and data leaks",
          description: "A follow-on attack in September targeted law enforcement systems; stolen data leaked online as part of an influence operation.",
          date: "2022-09",
        },
      ],
      peakTier: "destruction",
      restraintFactors: [
        "Attacks targeted government IT, not civilian critical infrastructure",
        "No reported physical harm",
      ],
      thresholdCrossings: [
        "First known severance of diplomatic relations over a cyber attack",
        "State-sponsored destructive attack against a NATO member's government systems",
      ],
    },
    infrastructure: {
      targetSectors: ["government"],
      targetCountries: ["Albania"],
      techniques: [
        { id: "T1190", name: "Exploit Public-Facing Application", tactic: "Initial Access" },
        { id: "T1485", name: "Data Destruction", tactic: "Impact" },
        { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
        { id: "T1530", name: "Data from Cloud Storage", tactic: "Collection" },
      ],
      malwareFamilies: ["ZeroCleare variant", "Chimneysweep"],
      impactSummary: "E-government services offline for weeks; border control, tax, and law enforcement systems disrupted; diplomatic break with Iran.",
    },
    governance: {
      flags: ["attribution-public", "sanctions-imposed", "norm-violation", "deterrence-signal", "international-cooperation"],
      normsInvoked: [
        "Sovereignty and non-intervention",
        "UN GGE norm on responsible state behavior in ICT",
      ],
      policyResponses: [
        "Albania severed diplomatic relations with Iran (Sep 2022)",
        "NATO issued a statement of allied solidarity",
        "US imposed sanctions on Iran's MOIS and senior officials",
        "CISA issued joint advisory with FBI on Iranian threat activity",
      ],
      regulatoryChanges: [
        "Albania accelerated e-government security overhaul with allied support",
        "NATO reinforced cyber defense commitment to member states",
      ],
      impact: "Established that cyber attacks can trigger real diplomatic rupture and NATO solidarity, expanding the practical consequences states may face for destructive cyber operations against alliance members.",
    },
    whyThisMatters: "Albania's decision to sever diplomatic ties over a cyber attack, backed by NATO solidarity, set a new precedent for treating destructive cyber operations as grounds for the most serious peacetime diplomatic consequences.",
    teaching: {
      keyQuestion: "What diplomatic and alliance responses are appropriate when a state conducts destructive cyber operations against another state's government?",
      discussionPoints: [
        "Proportionality of diplomatic severance as a response to cyber attack",
        "NATO's evolving posture on collective cyber defense",
        "Iran's use of cyber operations as a coercive tool beyond its immediate region",
      ],
      furtherReading: [
        "Microsoft Threat Intelligence: Microsoft investigates Iranian attacks against the Albanian government, 2022.",
        "Albanian PM Rama: Statement on severance of diplomatic relations with Iran, Sep 2022.",
      ],
    },
    sources: [
      { title: "Microsoft: Iranian Attacks Against the Albanian Government", category: "vendor", date: "2022-09-08" },
      { title: "White House: Statement on Iran's Cyberattack Against Albania", category: "government", date: "2022-09-07" },
      { title: "FBI/CISA Advisory AA22-264A: Iranian State Actors Conduct Cyber Operations Against Albania", category: "government", date: "2022-09-21" },
    ],
  },

  // ---- Incident 14: Saudi Aramco / Shamoon (2012) ---------------------------
  {
    id: "shamoon-aramco-2012",
    slug: "shamoon-aramco",
    name: "Saudi Aramco Shamoon Attack",
    shortName: "Shamoon / Aramco",
    year: 2012,
    dateRange: "August 2012",
    incidentType: "destructive",
    summary:
      "The Shamoon wiper malware destroyed data on approximately 35,000 workstations at Saudi Aramco, the world's largest oil company. The attack overwrote master boot records with an image of a burning US flag. Aramco was forced to operate on paper for weeks while rebuilding its IT fleet. A group calling itself the 'Cutting Sword of Justice' claimed responsibility, citing Saudi foreign policy.",
    attribution: {
      confidence: "moderate",
      attributedTo: "Widely assessed by US officials and researchers to be linked to Iran, though direct attribution remains circumstantial",
      country: "Iran (assessed)",
      aliases: ["APT33", "Elfin", "Cutting Sword of Justice"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Initial access and staging",
          description: "Attackers gained access to Aramco's corporate network and pre-positioned the Shamoon wiper across thousands of endpoints.",
          date: "2012-08",
        },
        {
          tier: "destruction",
          label: "Mass wiper deployment",
          description: "Shamoon activated during a holiday period, wiping ~35,000 workstations and overwriting MBRs. Corporate IT was rendered inoperable.",
          date: "2012-08-15",
        },
        {
          tier: "disruption",
          label: "Operational recovery",
          description: "Aramco operated core business on paper and fax for approximately two weeks while sourcing replacement hardware globally.",
          date: "2012-08",
        },
      ],
      peakTier: "destruction",
      restraintFactors: [
        "OT and production control systems were air-gapped and unaffected",
        "Oil production and export operations continued without interruption",
      ],
      thresholdCrossings: [
        "Largest destructive cyber attack against a single enterprise at that time",
        "Targeted the crown jewel of a major economy's resource sector",
      ],
    },
    infrastructure: {
      targetSectors: ["energy"],
      targetCountries: ["Saudi Arabia"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1561.002", name: "Disk Wipe: Disk Structure Wipe", tactic: "Impact" },
        { id: "T1485", name: "Data Destruction", tactic: "Impact" },
      ],
      malwareFamilies: ["Shamoon", "Disttrack"],
      impactSummary: "~35,000 workstations wiped; weeks of degraded corporate IT operations; no impact on oil production.",
    },
    governance: {
      flags: ["norm-violation", "deterrence-signal"],
      normsInvoked: [
        "Protection of critical economic infrastructure",
        "Proportionality: destructive response to policy grievances",
      ],
      policyResponses: [
        "Then-US Defense Secretary Panetta cited Shamoon in 'Cyber Pearl Harbor' speech (Oct 2012)",
        "Heightened US–Saudi cybersecurity cooperation",
      ],
      regulatoryChanges: [
        "Saudi Arabia established the National Cybersecurity Authority (NCA) in subsequent years",
        "Accelerated OT/IT network segmentation in the global energy sector",
      ],
      impact: "Made energy-sector cyber risk tangible for policymakers and drove early momentum toward mandatory OT security standards in the oil and gas industry.",
    },
    whyThisMatters: "Shamoon was the first large-scale destructive attack against a critical energy company, demonstrating that states could use wiper malware to inflict strategic economic signaling without kinetic force.",
    teaching: {
      keyQuestion: "How should energy-dependent economies defend against destructive cyber attacks on their resource sectors?",
      discussionPoints: [
        "Value of OT/IT segmentation as a resilience measure",
        "Strategic signaling through cyber destruction vs. espionage",
        "Challenges of attributing attacks when hacktivist fronts are used",
      ],
      furtherReading: [
        "Bronk, C. & Tikk-Ringas, E. 'The Cyber Attack on Saudi Aramco.' Survival, 2013.",
        "Symantec: The Shamoon Attacks, 2012.",
      ],
    },
    sources: [
      { title: "Symantec: The Shamoon Attacks", category: "vendor", date: "2012-08-16" },
      { title: "Panetta, L. 'Defending the Nation from Cyber Attack' (speech)", category: "government", date: "2012-10-11" },
      { title: "Kaspersky: Shamoon the Wiper, Copycats at Work", category: "vendor", date: "2012-08-16" },
    ],
  },

  // ---- Incident 15: Bangladesh Bank SWIFT (2016) ----------------------------
  {
    id: "bangladesh-bank-swift-2016",
    slug: "bangladesh-bank-swift",
    name: "Bangladesh Bank SWIFT Heist",
    shortName: "Bangladesh Bank",
    year: 2016,
    dateRange: "February 2016",
    incidentType: "hybrid",
    summary:
      "Attackers compromised Bangladesh Bank's SWIFT terminal and issued fraudulent transfer requests totaling $951M from its account at the Federal Reserve Bank of New York. Most transactions were blocked, but $81M was successfully routed to accounts in the Philippines. The operation demonstrated that the global interbank messaging system could be exploited for state-linked financial theft.",
    attribution: {
      confidence: "high",
      attributedTo: "Lazarus Group, attributed by the US DOJ and multiple researchers to North Korea's RGB",
      country: "North Korea",
      aliases: ["Lazarus Group", "APT38", "BlueNoroff"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "SWIFT environment compromise",
          description: "Attackers gained access to Bangladesh Bank's network and SWIFT terminal, studying transfer workflows over several weeks.",
          date: "2016-01",
        },
        {
          tier: "disruption",
          label: "Fraudulent SWIFT messages",
          description: "35 fraudulent transfer requests totaling $951M sent via SWIFT to the NY Fed. Timing exploited the weekend gap between Dhaka and New York.",
          date: "2016-02-04",
        },
        {
          tier: "degradation",
          label: "Partial fund exfiltration",
          description: "$81M successfully transferred to Philippine bank accounts and laundered through casinos. Remaining $870M blocked by correspondent banks due to anomalies.",
          date: "2016-02-05",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "A typo in a transfer request triggered manual review, limiting losses",
        "SWIFT infrastructure itself was not technically compromised, the endpoint was",
      ],
      thresholdCrossings: [
        "First confirmed state-linked operation targeting the global interbank financial system",
        "Demonstrated that SWIFT endpoint security was a systemic risk across central banks",
      ],
    },
    infrastructure: {
      targetSectors: ["finance"],
      targetCountries: ["Bangladesh", "Philippines"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1565.001", name: "Data Manipulation: Stored Data Manipulation", tactic: "Impact" },
        { id: "T1070", name: "Indicator Removal", tactic: "Defense Evasion" },
      ],
      malwareFamilies: ["NESTEGG", "DYEPACK", "custom SWIFT manipulation tools"],
      impactSummary: "$81M stolen; $870M in additional transfers blocked; systemic confidence in SWIFT endpoint security shaken.",
    },
    governance: {
      flags: ["indictment", "norm-violation", "sanctions-imposed", "regulatory-change"],
      normsInvoked: [
        "Protection of financial infrastructure and the international banking system",
        "UN sanctions framework: DPRK revenue generation through illicit cyber means",
      ],
      policyResponses: [
        "US DOJ indictment of Park Jin Hyok (Sep 2018, alongside Sony and WannaCry charges)",
        "SWIFT implemented mandatory Customer Security Programme (CSP) for member institutions",
        "UN Panel of Experts documented DPRK cyber-enabled theft as sanctions evasion",
      ],
      regulatoryChanges: [
        "SWIFT Customer Security Programme with mandatory security controls",
        "Enhanced central bank cybersecurity standards globally",
      ],
      impact: "Forced a fundamental upgrade to global interbank security and established that state-sponsored financial cyber theft could fund weapons programs in violation of UN sanctions.",
    },
    whyThisMatters: "The Bangladesh Bank heist revealed that the global financial messaging system's security depended on its weakest endpoint, and that state actors would exploit that gap to fund sanctioned programs.",
    teaching: {
      keyQuestion: "How should the international community respond when a state uses cyber operations to steal from the global financial system?",
      discussionPoints: [
        "Systemic risk in federated trust systems like SWIFT",
        "North Korea's cyber-enabled revenue model as sanctions evasion",
        "Responsibilities of correspondent banks and messaging system operators",
      ],
      furtherReading: [
        "Kaspersky: Lazarus Under the Hood, 2017.",
        "UN Security Council Panel of Experts DPRK Reports, 2019–2023.",
      ],
    },
    sources: [
      { title: "Reuters: How the New York Fed fumbled over the Bangladesh Bank cyber-heist", category: "journalistic", date: "2016-07-21" },
      { title: "US DOJ: North Korean Regime-Backed Programmer Charged", category: "legal", date: "2018-09-06" },
      { title: "SWIFT: Customer Security Programme overview", category: "vendor", date: "2017-01" },
    ],
  },

  // ---- Incident 16: Australia Parliament (2019) -----------------------------
  {
    id: "australia-parliament-2019",
    slug: "australia-parliament",
    name: "Australian Parliament and Political Party Intrusions",
    shortName: "Australia Parliament",
    year: 2019,
    dateRange: "January – February 2019",
    incidentType: "espionage",
    summary:
      "Intrusions into the Australian Parliament House network and the networks of three major political parties, discovered weeks before a federal election. Australia's Prime Minister publicly attributed the activity to a 'sophisticated state actor' without naming the responsible country. Reporting widely assessed China as the likely sponsor, though this was never officially confirmed.",
    attribution: {
      confidence: "moderate",
      attributedTo: "Described by the Australian government as a 'sophisticated state actor'; widely assessed in reporting to be China-linked, but never officially confirmed",
      country: "Unknown (officially); China (widely assessed)",
      aliases: [],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Parliamentary network compromise",
          description: "Unauthorized access detected on the Parliament House network, prompting a forced password reset for all users.",
          date: "2019-02-01",
        },
        {
          tier: "intrusion",
          label: "Political party network access",
          description: "Investigation revealed the same actor had also compromised networks of the Liberal, Labor, and National parties.",
          date: "2019-02-18",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "No destructive or disruptive actions taken, activity consistent with intelligence collection",
        "No public evidence of data weaponization or influence operations",
      ],
      thresholdCrossings: [
        "Compromise of a national legislature and ruling/opposition parties during an election period",
        "Blurred line between traditional espionage and potential election interference",
      ],
    },
    infrastructure: {
      targetSectors: ["government"],
      targetCountries: ["Australia"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1114", name: "Email Collection", tactic: "Collection" },
        { id: "T1071.001", name: "Application Layer Protocol: Web Protocols", tactic: "Command and Control" },
      ],
      malwareFamilies: [],
      impactSummary: "Unauthorized access to parliamentary and political party networks; scope of data exfiltration not publicly disclosed.",
    },
    governance: {
      flags: ["attribution-public", "deterrence-signal"],
      normsInvoked: [
        "Non-interference in democratic processes",
        "UN GGE norms on responsible state behavior in ICT use",
      ],
      policyResponses: [
        "Prime Minister Morrison public statement attributing to a 'sophisticated state actor' (Feb 2019)",
        "Australian Signals Directorate led incident response",
        "Accelerated Australian Cyber Security Strategy 2020 development",
      ],
      regulatoryChanges: [
        "Strengthened political party cybersecurity guidance from the Australian Cyber Security Centre",
        "Informed the Critical Infrastructure Security Act 2022 (SOCI Act) expansion",
      ],
      impact: "Elevated political-party cybersecurity as a democratic integrity issue and contributed to Australia's broader critical infrastructure security reforms.",
    },
    whyThisMatters: "The compromise of a parliament and major parties during an election cycle demonstrated that cyber espionage against democratic institutions is a live risk, even when the collected intelligence is never publicly weaponized.",
    teaching: {
      keyQuestion: "Should espionage against political parties during election periods be treated differently from ordinary state-on-state intelligence collection?",
      discussionPoints: [
        "Distinction between intelligence collection and election interference",
        "Strategic ambiguity in attribution: naming the act but not the actor",
        "Resilience of democratic institutions to pre-election cyber intrusions",
      ],
      furtherReading: [
        "Australian PM Morrison: Statement on Parliament House cyber incident, Feb 2019.",
        "Australian Cyber Security Strategy 2020.",
      ],
    },
    sources: [
      { title: "Australian PM Morrison: Statement on Cyber Incident Affecting Parliament", category: "government", date: "2019-02-18" },
      { title: "Australian Cyber Security Centre: Advisory on Parliament Compromise", category: "government", date: "2019-02" },
    ],
  },

  // ---- Incident 17: Iran Nuclear Facilities – Ongoing Cyber Campaign --------
  {
    id: "iran-nuclear-cyber-various",
    slug: "iran-nuclear-cyber",
    name: "Iran Nuclear Facilities – Cyber Incidents (2020–2021)",
    shortName: "Iran Nuclear Cyber",
    year: 2020,
    dateRange: "2020 – 2021",
    incidentType: "sabotage",
    summary:
      "A series of reported cyber-enabled incidents at Iranian nuclear and industrial facilities, including an explosion and fire at the Natanz enrichment plant (July 2020), a power distribution disruption at Natanz (April 2021), and other suspected sabotage events. Iran attributed several incidents to Israel. Details remain opaque, with much information coming from Iranian state media and unconfirmed reporting.",
    attribution: {
      confidence: "moderate",
      attributedTo: "Iran publicly attributed several incidents to Israel; independent confirmation is limited and details remain sparse",
      country: "Israel (attributed by Iran; not officially confirmed)",
      aliases: [],
    },
    escalation: {
      phases: [
        {
          tier: "degradation",
          label: "Natanz centrifuge assembly explosion",
          description: "An explosion and fire damaged a centrifuge assembly building at Natanz. Some reports suggest a cyber-enabled or remotely triggered device.",
          date: "2020-07-02",
        },
        {
          tier: "disruption",
          label: "Natanz power system disruption",
          description: "An incident disrupted the electrical distribution system at Natanz, reportedly damaging centrifuges. Iran called it 'nuclear terrorism.'",
          date: "2021-04-11",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Incidents were narrowly targeted at specific nuclear facilities",
        "No broader civilian infrastructure affected",
      ],
      thresholdCrossings: [
        "If confirmed as cyber-enabled, represents continued willingness to physically damage nuclear infrastructure through non-kinetic means",
        "Occurs against the backdrop of active diplomatic negotiations (JCPOA)",
      ],
    },
    infrastructure: {
      targetSectors: ["energy", "critical-infrastructure"],
      targetCountries: ["Iran"],
      techniques: [
        { id: "T0831", name: "Manipulation of Control", tactic: "Impact (ICS)" },
      ],
      malwareFamilies: [],
      impactSummary: "Reported physical damage at Natanz enrichment facility; scope and technical details not independently verified.",
    },
    governance: {
      flags: ["norm-violation", "deterrence-signal"],
      normsInvoked: [
        "Sovereignty and non-intervention",
        "Nuclear safety and security obligations (IAEA framework)",
      ],
      policyResponses: [
        "Iran accused Israel publicly and vowed retaliation",
        "Incidents complicated JCPOA revival negotiations",
        "No multilateral attribution or formal international response",
      ],
      regulatoryChanges: [
        "Renewed international discussion on cyber risks to nuclear facilities (IAEA context)",
      ],
      impact: "Reinforced the precedent set by Stuxnet that nuclear facilities are considered legitimate cyber targets by some states, complicating arms-control diplomacy.",
    },
    whyThisMatters: "These incidents illustrate that cyber-enabled sabotage of nuclear facilities did not end with Stuxnet, the pattern persists, with implications for nonproliferation, deterrence, and the stability of diplomatic negotiations.",
    teaching: {
      keyQuestion: "Does covert cyber sabotage of nuclear facilities help or hinder nonproliferation diplomacy?",
      discussionPoints: [
        "Sabotage as an alternative to military strikes vs. sabotage as a diplomatic spoiler",
        "Verification and transparency challenges when incidents are opaque",
        "Risk of escalation between covert cyber operations and overt military responses",
      ],
      furtherReading: [
        "Sanger, D.E. & Bergman, R. 'Israel's Shadow War with Iran.' NYT, various.",
        "IAEA Board of Governors Reports on Iran, 2020–2021.",
      ],
    },
    sources: [
      { title: "NYT: Explosion at Iran's Natanz Nuclear Facility", category: "journalistic", date: "2020-07-02" },
      { title: "Iran AEOI Statement on Natanz Electrical Incident", category: "government", date: "2021-04-11" },
    ],
  },

  // ---- Incident 18: Taiwan Telecom Intrusions (2023) ------------------------
  {
    id: "taiwan-telecom-2023",
    slug: "taiwan-telecom",
    name: "Taiwan Telecommunications Intrusions",
    shortName: "Taiwan Telecom",
    year: 2023,
    dateRange: "2022 – 2023 (disclosed 2023)",
    incidentType: "espionage",
    summary:
      "Sustained intrusions into Taiwanese telecommunications providers attributed to China-linked threat groups, part of a broader pattern of pre-positioning in critical infrastructure. The campaigns, overlapping with activity Microsoft tracks as Volt Typhoon and Flax Typhoon, focused on persistent access rather than immediate disruption, raising concerns about preparation for contingency operations.",
    attribution: {
      confidence: "moderate",
      attributedTo: "Attributed by researchers and the US government to China-linked groups; Taiwan's government has acknowledged the threat without detailed public attribution",
      country: "China (assessed)",
      aliases: ["Volt Typhoon", "Flax Typhoon"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Persistent access to telecom infrastructure",
          description: "China-linked actors established long-term access in Taiwanese ISPs and telecom providers using living-off-the-land techniques to avoid detection.",
          date: "2022",
        },
        {
          tier: "probing",
          label: "Pre-positioning for contingency",
          description: "Activity consistent with infrastructure mapping and access maintenance rather than data exfiltration, assessed as preparation for potential future disruption.",
          date: "2023",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "No disruptive or destructive actions observed",
        "Activity consistent with intelligence preparation rather than immediate attack",
      ],
      thresholdCrossings: [
        "Pre-positioning in telecom infrastructure of a potential military contingency target",
        "Part of a broader pattern including US critical infrastructure (Volt Typhoon)",
      ],
    },
    infrastructure: {
      targetSectors: ["telecommunications", "critical-infrastructure"],
      targetCountries: ["Taiwan"],
      techniques: [
        { id: "T1078", name: "Valid Accounts", tactic: "Initial Access" },
        { id: "T1218", name: "System Binary Proxy Execution", tactic: "Defense Evasion" },
        { id: "T1071.001", name: "Application Layer Protocol: Web Protocols", tactic: "Command and Control" },
      ],
      malwareFamilies: [],
      impactSummary: "Persistent access to telecom networks; no disruption observed, but pre-positioning raises contingency concerns.",
    },
    governance: {
      flags: ["attribution-public", "deterrence-signal", "international-cooperation"],
      normsInvoked: [
        "Responsible state behavior in ICT use (UN OEWG)",
        "Pre-positioning in critical infrastructure as a potentially destabilizing activity",
      ],
      policyResponses: [
        "US CISA, NSA, and FBI joint advisory on Volt Typhoon (May 2023)",
        "Five Eyes joint advisory on living-off-the-land threats to critical infrastructure",
        "Taiwan strengthened telecom cybersecurity regulations",
      ],
      regulatoryChanges: [
        "Taiwan amended telecommunications management regulations to include cybersecurity requirements",
        "US critical infrastructure pre-positioning elevated as a strategic intelligence priority",
      ],
      impact: "Crystallized the policy debate about whether pre-positioning in critical infrastructure during peacetime constitutes a violation of international norms, a question with no consensus answer.",
    },
    whyThisMatters: "These intrusions highlight the emerging norm challenge of peacetime pre-positioning: states embedding access in adversary infrastructure for potential future use, blurring the line between espionage and preparation for attack.",
    teaching: {
      keyQuestion: "Is peacetime pre-positioning in another state's critical infrastructure a form of threatening behavior under international law?",
      discussionPoints: [
        "Distinction between espionage, pre-positioning, and preparation for armed conflict",
        "Strategic stability implications of mutual infrastructure access",
        "Living-off-the-land: how legitimate tools complicate detection and attribution",
      ],
      furtherReading: [
        "Microsoft: Volt Typhoon targets US critical infrastructure, 2023.",
        "CISA Advisory AA23-144A: PRC State-Sponsored Actors, 2023.",
      ],
    },
    sources: [
      { title: "CISA/NSA/FBI Advisory AA23-144A: PRC State-Sponsored Cyber Actor Living off the Land", category: "government", date: "2023-05-24" },
      { title: "Microsoft: Volt Typhoon Targets US Critical Infrastructure", category: "vendor", date: "2023-05-24" },
    ],
  },

  // ---- Incident 19: Industroyer2 (2022) -------------------------------------
  {
    id: "industroyer2-2022",
    slug: "industroyer2",
    name: "Industroyer2 – Ukraine Grid Attack Attempt",
    shortName: "Industroyer2",
    year: 2022,
    dateRange: "April 2022",
    incidentType: "sabotage",
    summary:
      "Sandworm deployed Industroyer2, an updated variant of the 2016 Industroyer malware, against a Ukrainian regional energy company during Russia's ongoing invasion. The attack aimed to de-energize electrical substations using IEC 104 protocol commands. CERT-UA and ESET detected and neutralized the attack before it could cause a sustained outage, marking a successful wartime cyber defense.",
    attribution: {
      confidence: "confirmed",
      attributedTo: "Sandworm Team, attributed by Ukraine's CERT-UA and corroborated by ESET and allied governments to Russia's GRU",
      country: "Russia",
      aliases: ["Sandworm", "Voodoo Bear", "IRIDIUM"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Pre-positioning in energy network",
          description: "Sandworm established access to a Ukrainian energy company's OT network weeks before the planned attack.",
          date: "2022-02",
        },
        {
          tier: "disruption",
          label: "Industroyer2 deployment attempt",
          description: "Industroyer2 configured to issue IEC 104 commands to open breakers at targeted substations; CaddyWiper deployed on IT systems to hinder forensics.",
          date: "2022-04-08",
        },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "Attack was detected and mitigated before causing sustained outage",
        "Narrower scope than the 2016 Industroyer attack",
      ],
      thresholdCrossings: [
        "First known use of purpose-built ICS malware during an active conventional war",
        "Confirmed that Sandworm maintained and updated its grid-attack toolkit across six years",
      ],
    },
    infrastructure: {
      targetSectors: ["energy", "critical-infrastructure"],
      targetCountries: ["Ukraine"],
      techniques: [
        { id: "T0855", name: "Unauthorized Command Message", tactic: "Impact (ICS)" },
        { id: "T1561", name: "Disk Wipe", tactic: "Impact" },
        { id: "T1059", name: "Command and Scripting Interpreter", tactic: "Execution" },
      ],
      malwareFamilies: ["Industroyer2", "CaddyWiper"],
      impactSummary: "Attack neutralized before sustained outage; demonstrated continued ICS threat capability during wartime.",
    },
    governance: {
      flags: ["norm-violation", "attribution-public", "international-cooperation"],
      normsInvoked: [
        "IHL prohibition on attacking civilian objects (electric grid serving civilians)",
        "UN GGE 2015 norm against damaging critical infrastructure",
      ],
      policyResponses: [
        "CERT-UA public disclosure with ESET technical analysis (Apr 2022)",
        "Cited in allied governments' ongoing documentation of Russian cyber operations in Ukraine",
        "Reinforced NATO and EU cyber assistance to Ukraine",
      ],
      regulatoryChanges: [
        "Strengthened international support for Ukrainian energy-sector cyber defense",
        "Informed EU NIS2 Directive risk scenarios for energy operators",
      ],
      impact: "Demonstrated both the persistent threat of ICS-targeted malware in armed conflict and the effectiveness of international cyber defense cooperation in neutralizing it.",
    },
    whyThisMatters: "Industroyer2 confirmed that grid-targeting ICS malware is now a recurring feature of armed conflict, while its successful mitigation showed that coordinated cyber defense can work under wartime conditions.",
    teaching: {
      keyQuestion: "What does the successful defense against Industroyer2 reveal about effective models for international cyber assistance during armed conflict?",
      discussionPoints: [
        "Evolution of ICS attack tools across the 2015–2016–2022 trajectory",
        "Role of vendor-government partnerships in wartime cyber defense",
        "IHL application to cyber attacks on civilian power infrastructure during armed conflict",
      ],
      furtherReading: [
        "ESET: Industroyer2, Sandworm's Cyberwarfare Targets Ukraine's Power Grid Again, 2022.",
        "CERT-UA: Alert on Industroyer2 and CaddyWiper, 2022.",
      ],
    },
    sources: [
      { title: "ESET: Industroyer2, Sandworm Targets Ukraine's Power Grid Again", category: "vendor", date: "2022-04-12" },
      { title: "CERT-UA Alert #4435: Industroyer2 and CaddyWiper", category: "government", date: "2022-04-12" },
    ],
  },

  // ---- Incident 20: Scattered Spider / MGM & Caesars (2023) -----------------
  {
    id: "scattered-spider-mgm-2023",
    slug: "scattered-spider-mgm",
    name: "Scattered Spider – MGM Resorts & Caesars Entertainment",
    shortName: "MGM / Scattered Spider",
    year: 2023,
    dateRange: "September 2023",
    incidentType: "ransomware",
    summary:
      "The Scattered Spider threat group, composed largely of English-speaking individuals using social engineering and SIM-swapping, compromised MGM Resorts and Caesars Entertainment. Caesars reportedly paid approximately $15M in ransom. MGM refused to pay; the resulting disruption took hotel and casino systems offline for over a week, with estimated losses exceeding $100M. The incidents highlighted the effectiveness of social engineering against helpdesk and identity systems.",
    attribution: {
      confidence: "high",
      attributedTo: "Scattered Spider, a loosely organized English-speaking threat group acting as an ALPHV/BlackCat ransomware affiliate",
      country: "United States / United Kingdom (individuals; not state-sponsored)",
      aliases: ["Scattered Spider", "UNC3944", "Octo Tempest", "0ktapus"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Social engineering of helpdesk",
          description: "Attackers impersonated employees to IT helpdesks to obtain credentials and MFA resets, bypassing technical controls through human vectors.",
          date: "2023-08",
        },
        {
          tier: "disruption",
          label: "Ransomware deployment and system shutdown",
          description: "ALPHV/BlackCat ransomware deployed across MGM infrastructure; hotel check-in, slot machines, restaurant POS, and loyalty systems went offline for over a week.",
          date: "2023-09-10",
        },
        {
          tier: "degradation",
          label: "Extended operational impact",
          description: "MGM operated on manual processes for days; estimated losses exceeded $100M. Caesars paid ~$15M ransom to avoid similar disruption.",
          date: "2023-09",
        },
      ],
      peakTier: "degradation",
      restraintFactors: [
        "Financially motivated, no geopolitical or destructive intent",
        "Attackers offered decryption for payment, consistent with criminal ransomware model",
      ],
      thresholdCrossings: [
        "Demonstrated that social engineering alone can defeat sophisticated technical security at major enterprises",
        "Highlighted that young, loosely organized groups can cause damage comparable to state-sponsored actors",
      ],
    },
    infrastructure: {
      targetSectors: ["multiple"],
      targetCountries: ["United States"],
      techniques: [
        { id: "T1566.004", name: "Phishing: Spearphishing Voice", tactic: "Initial Access" },
        { id: "T1199", name: "Trusted Relationship", tactic: "Initial Access" },
        { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
        { id: "T1078", name: "Valid Accounts", tactic: "Persistence" },
      ],
      malwareFamilies: ["ALPHV", "BlackCat"],
      impactSummary: "MGM systems offline for 10+ days with >$100M in losses; Caesars paid ~$15M ransom; customer data exfiltrated at both companies.",
    },
    governance: {
      flags: ["regulatory-change", "indictment"],
      normsInvoked: [
        "Corporate duty of care for customer data and operational resilience",
        "Debate over ransom payment regulation",
      ],
      policyResponses: [
        "FBI and CISA joint advisory on Scattered Spider (Nov 2023)",
        "SEC required MGM and Caesars to disclose incidents under new cyber disclosure rules",
        "Multiple Scattered Spider members subsequently arrested in the US and UK (2024)",
      ],
      regulatoryChanges: [
        "SEC cyber incident disclosure rules (effective Dec 2023) applied to both companies",
        "Renewed Congressional interest in regulating ransom payments",
      ],
      impact: "Accelerated the SEC's practical enforcement of new cyber disclosure requirements and re-centered policy attention on identity security and social engineering as enterprise-critical risks.",
    },
    whyThisMatters: "MGM/Caesars showed that social engineering by loosely organized criminal groups can paralyze major enterprises as effectively as sophisticated malware, exposing identity and helpdesk processes as critical policy-relevant attack surfaces.",
    teaching: {
      keyQuestion: "Should regulators mandate specific identity-verification and helpdesk security controls, or leave them to market incentives?",
      discussionPoints: [
        "Social engineering as the weakest link despite technical security investment",
        "To pay or not to pay: strategic and ethical dimensions of ransom decisions",
        "Effectiveness of SEC disclosure rules in improving corporate cyber accountability",
      ],
      furtherReading: [
        "CISA/FBI Advisory AA23-320A: Scattered Spider, 2023.",
        "SEC Filings: MGM Resorts International 8-K, Oct 2023.",
      ],
    },
    sources: [
      { title: "CISA/FBI Advisory AA23-320A: Scattered Spider", category: "government", date: "2023-11-16" },
      { title: "SEC: MGM Resorts International Form 8-K", category: "legal", date: "2023-10-05" },
      { title: "Bloomberg: Caesars Paid Roughly Half of $30M Ransom Demand", category: "journalistic", date: "2023-09-14" },
    ],
  },
];
