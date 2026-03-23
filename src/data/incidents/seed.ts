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
        "Highly targeted — designed to affect only specific Siemens S7-315/417 configurations",
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
    sources: [
      { title: "Symantec: W32.Stuxnet Dossier", category: "vendor", date: "2011-02" },
      { title: "Langner, R. 'To Kill a Centrifuge'", category: "academic", date: "2013-11" },
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
      impact: "Industroyer proved that adversaries are investing in reusable, modular ICS attack frameworks — raising the bar for grid defense and influencing ICS security standards worldwide.",
    },
    whyThisMatters: "Industroyer represented a generational leap in ICS malware sophistication — a modular, protocol-aware weapon that signaled the industrialization of grid-targeted cyber capabilities.",
    teaching: {
      keyQuestion: "What are the policy implications of reusable, modular cyber weapons designed for industrial control systems?",
      discussionPoints: [
        "Escalation trajectory from 2015 (manual SCADA access) to 2016 (automated ICS malware)",
        "Arms-race dynamics in offensive ICS capability development",
        "Role of private-sector threat intelligence in public defense",
      ],
      furtherReading: [
        "Dragos: CrashOverride — Analysis of the Threat to Electric Grid Operations, 2017.",
        "ESET: Industroyer — A New Threat for Industrial Control Systems, 2017.",
      ],
    },
    sources: [
      { title: "ESET: Industroyer — A New Threat for Industrial Control Systems", category: "vendor", date: "2017-06-12" },
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
    sources: [
      { title: "NHS England: Lessons Learned Review of WannaCry", category: "government", date: "2018-02" },
      { title: "Microsoft: Customer Guidance for WannaCrypt Attacks", category: "vendor", date: "2017-05-12" },
      { title: "White House Press Briefing: Attribution of WannaCry", category: "government", date: "2017-12-19" },
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
        "Attackers targeted IT, not OT directly — pipeline shutdown was a precautionary business decision",
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
          description: "Sodium hydroxide level changed from ~100 ppm to ~11,100 ppm — an operator noticed and reversed the change within minutes.",
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
      impact: "Exposed the severe under-investment in water-sector cybersecurity and became a catalyst for federal efforts to extend cyber standards to small utilities — though regulatory authority remains contested.",
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
      impact: "Demonstrated that cyber operations are now integrated into conventional military campaigns and that collateral effects readily cross borders — reinforcing momentum behind the EU NIS2 Directive and NATO cyber commitments.",
    },
    whyThisMatters: "Viasat KA-SAT was the clearest example yet of cyber attack as an opening act of war, with cross-border collateral damage that forced NATO and the EU to treat satellite infrastructure as a shared security concern.",
    teaching: {
      keyQuestion: "How does the integration of cyber operations into conventional warfare change the rules of armed conflict?",
      discussionPoints: [
        "Cyber as a precursor to kinetic operations: legal and strategic implications",
        "Collateral damage across borders and the distinction principle in IHL",
        "Resilience of commercial satellite infrastructure as a security dependency",
      ],
      furtherReading: [
        "SentinelOne: AcidRain — A Modem Wiper Rains Down on Europe, 2022.",
        "Viasat Incident Report: KA-SAT Network Cyber Attack Overview, 2022.",
      ],
    },
    sources: [
      { title: "Viasat: KA-SAT Network Cyber Attack Overview", category: "vendor", date: "2022-03-30" },
      { title: "SentinelOne: AcidRain — A Modem Wiper Rains Down on Europe", category: "vendor", date: "2022-03-31" },
      { title: "EU Council: Declaration on Viasat Cyber Attack Attribution", category: "government", date: "2022-05-10" },
    ],
  },
];
