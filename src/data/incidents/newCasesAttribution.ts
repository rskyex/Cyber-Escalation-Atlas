import type { Incident } from "@/lib/types/incidents";

/**
 * Attribution-consequence matched-pair cases.
 *
 * Selected to populate cells under-represented by the existing dataset, in
 * support of the argument that — when technical attribution confidence is
 * held roughly constant — the consequence an incident draws (no formal
 * response → public naming → indictment → sanctions → diplomatic
 * expulsion) diverges with the political relationship between the
 * attributed actor and the Western attributing coalition, not with
 * technical certainty or operational severity.
 *
 * Scoring discipline: every case is calibrated against named existing
 * anchors. See per-case calibration comments. Scores are derived from
 * peakTier / thresholdCrossings / governance.flags / targetSectors /
 * targetCountries via src/lib/utils/incidents.ts, not stored.
 */
export const newCasesAttribution: Incident[] = [
  // ---- 1. Belgacom / Operation Socialist -----------------------------------
  // Calibration anchor: Storm-0558 (telecom-adjacent state espionage by an
  // adversary actor, high technical confidence). Belgacom shares the
  // technical sophistication band (Regin malware tier ≈ Storm-0558 key-forge
  // tier) but sits BELOW Storm-0558 on governance flags because the
  // attributing coalition declined to formalise. This is the sharpest
  // "protected actor → no consequence" data point in the dataset.
  {
    id: "belgacom-2013",
    slug: "belgacom-operation-socialist",
    name: "Belgacom / Operation Socialist",
    shortName: "Belgacom",
    year: 2013,
    dateRange: "circa 2010 – disclosed September 2013",
    incidentType: "espionage",
    summary:
      "Multi-year intrusion into Belgacom, Belgium's largest telecommunications operator and at the time a majority state-owned carrier of EU institutional and NATO traffic. Snowden documents disclosed in September 2013 described the campaign — codenamed Operation Socialist — as a UK GCHQ operation that used QUANTUM packet injection and a man-in-the-middle infrastructure (FoxAcid) to compromise Belgacom engineers and pivot into the BICS international roaming subsidiary. Subsequent forensic work attributed the implant family to Regin, a malware platform later linked by multiple vendors to Five Eyes tooling.",
    attribution: {
      confidence: "high",
      attributedTo:
        "UK Government Communications Headquarters (GCHQ), based on internal Snowden documents and on Regin malware family attribution by Symantec, F-Secure, and Kaspersky",
      country: "United Kingdom",
      aliases: ["Operation Socialist", "Regin (toolset)"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "QUANTUM-assisted operator compromise",
          description:
            "GCHQ infrastructure used QUANTUM packet injection against LinkedIn and Slashdot sessions of targeted Belgacom system administrators, redirecting them to FoxAcid exploit servers to deploy implants on engineer workstations.",
          date: "2010",
        },
        {
          tier: "intrusion",
          label: "Pivot into BICS international roaming",
          description:
            "Operators moved laterally from the corporate IT network into BICS, Belgacom's international carrier subsidiary, gaining visibility into roaming and signalling traffic across multiple jurisdictions.",
          date: "2011-2012",
        },
        {
          tier: "intrusion",
          label: "Discovery and uneven public response",
          description:
            "Belgacom detected anomalous activity in mid-2013; Snowden documents published by Der Spiegel and The Intercept in September 2013 identified GCHQ as the operator. The Belgian federal prosecutor opened a criminal investigation that was closed in 2018 without indictments after the suspect was determined to be a foreign state.",
          date: "2013-09",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Activity consistent with intelligence collection, not disruption — no destructive payload, no manipulation of communications integrity disclosed",
        "Targeting concentrated on engineer credentials and signalling visibility rather than mass subscriber data exfiltration",
      ],
      thresholdCrossings: [
        "First publicly documented case of one EU/NATO member state hacking the critical telecommunications infrastructure of another",
        "Compromise of a majority state-owned carrier handling EU institutional traffic, including European Commission and Council communications",
        "High-confidence allied-on-allied attribution that produced no formal diplomatic, sanctions, or judicial consequence",
      ],
    },
    infrastructure: {
      targetSectors: ["telecommunications", "critical-infrastructure"],
      targetCountries: ["Belgium"],
      techniques: [
        {
          id: "T1557",
          name: "Adversary-in-the-Middle",
          tactic: "Credential Access",
        },
        {
          id: "T1189",
          name: "Drive-by Compromise",
          tactic: "Initial Access",
        },
        {
          id: "T1078",
          name: "Valid Accounts",
          tactic: "Persistence",
        },
        {
          id: "T1071.001",
          name: "Application Layer Protocol: Web Protocols",
          tactic: "Command and Control",
        },
      ],
      malwareFamilies: ["Regin"],
      impactSummary:
        "Multi-year covert access to Belgacom corporate IT and BICS international carrier networks, with visibility into engineering credentials and international signalling traffic; no public assessment of total data exfiltrated.",
    },
    governance: {
      flags: [],
      normsInvoked: [
        "Sovereignty of telecommunications infrastructure (Tallinn Manual 2.0 Rule 4 by analogy)",
        "UN GGE 2015 Norm 13(f) on critical infrastructure (the norm did not yet exist at the time of the operation but was widely retro-applied in academic commentary)",
      ],
      policyResponses: [
        "Belgian federal prosecutor opened a criminal investigation in 2013; closed in 2018 without charges, citing inability to prosecute foreign state agents",
        "No formal Belgian, EU, or NATO attribution statement issued",
        "No sanctions, diplomatic expulsions, or indictments",
      ],
      regulatoryChanges: [
        "Belgian parliamentary inquiry into intelligence oversight (2014) — recommendations partially implemented",
        "Strengthened operator-side security at Proximus (the rebranded Belgacom) and BICS, on the operator's own initiative",
      ],
      impact:
        "Demonstrated the boundary of the public-attribution machinery: when high-confidence technical attribution points to an allied state, the political mechanisms that would normally translate evidence into consequence (joint statements, sanctions, indictments) do not engage. Belgacom is the most direct empirical counter to the claim that consequence tracks attribution confidence.",
    },
    whyThisMatters:
      "Belgacom is the strongest case in the dataset for the proposition that consequence in cyber conflict is determined by political relationship rather than by technical certainty. The forensic and documentary evidence base was as strong as in most cases coded 'confirmed'; the consequence was zero. Holding Belgacom alongside Salt Typhoon — a structurally similar telecom-backbone operation attributed to an adversary that drew OFAC sanctions — isolates the political variable.",
    teaching: {
      keyQuestion:
        "When high-confidence technical attribution points at an allied intelligence service, which mechanisms in the public-attribution toolkit are available, and which are foreclosed?",
      discussionPoints: [
        "Allied-on-allied cyber operations and the limits of the public-attribution model",
        "Why Belgian judicial process closed without indictment despite documentary evidence",
        "Implications for EU strategic autonomy in cybersecurity and telecommunications",
      ],
      furtherReading: [
        "Gallagher, R. 'Operation Socialist: The Inside Story of How British Spies Hacked Belgium's Largest Telco.' The Intercept, 13 December 2014.",
        "Symantec Security Response. 'Regin: Top-tier espionage tool enables stealthy surveillance.' November 2014.",
        "De Standaard / Le Soir investigative reporting on the Belgian federal prosecutor's 2018 closure of the investigation.",
        "Bossong, R. & Wagner, B. 'A typology of cybersecurity and public-private partnerships in the context of the EU.' Crime, Law and Social Change, 67(3), 2017.",
      ],
    },
    sources: [
      {
        title:
          "Der Spiegel: 'Belgacom Attack: Britain's GCHQ Hacked Belgian Telecoms Firm'",
        category: "journalistic",
        date: "2013-09-20",
      },
      {
        title:
          "The Intercept: 'Operation Socialist — The Inside Story of How British Spies Hacked Belgium's Largest Telco'",
        category: "journalistic",
        date: "2014-12-13",
      },
      {
        title:
          "Symantec Security Response: 'Regin: Top-tier espionage tool enables stealthy surveillance'",
        category: "vendor",
        date: "2014-11-23",
      },
      {
        title:
          "Kaspersky Lab: 'The Regin Platform — Nation-State Ownership of GSM Networks'",
        category: "vendor",
        date: "2014-11-24",
      },
      {
        title:
          "Belgian Federal Prosecutor — Statement on closure of the Belgacom investigation (reported by RTBF and De Standaard)",
        category: "legal",
        date: "2018-09",
      },
    ],
    attributionDetail: {
      claimants: [
        {
          actor: "Academic/Private Sector",
          date: "2013-09-20",
          confidenceLevel: "High",
          evidenceBasis:
            "Der Spiegel publication of internal GCHQ presentations from the Snowden archive describing Operation Socialist against Belgacom",
        },
        {
          actor: "Academic/Private Sector",
          date: "2014-11-23",
          confidenceLevel: "High",
          evidenceBasis:
            "Symantec, F-Secure, and Kaspersky technical analyses linking the Regin malware platform to Five Eyes tooling and Belgacom forensics",
        },
        {
          actor: "Academic/Private Sector",
          date: "2014-12-13",
          confidenceLevel: "Confirmed",
          evidenceBasis:
            "The Intercept's publication of additional GCHQ documents identifying QUANTUM/FoxAcid infrastructure used against Belgacom engineers",
        },
        {
          actor: "Contested/Unknown",
          date: "2018-09-01",
          confidenceLevel: "High",
          evidenceBasis:
            "Belgian federal prosecutor closure noted the operation was conducted by a foreign state but declined to name the state in the public communiqué; no government formally attributed",
        },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },

  // ---- 2. OPM data breach --------------------------------------------------
  // Calibration anchor: SolarWinds. Both are large-scale espionage against
  // the US federal government, both attributed with high confidence, both
  // produced massive intelligence loss. SolarWinds drew sanctions and
  // diplomatic expulsions; OPM was characterised by senior US officials as
  // legitimate espionage and drew no formal foreign-policy consequence. OPM
  // sits below SolarWinds on governance flags (no sanctions, no indictment)
  // but matches it on threshold crossings (scale of access, foundational
  // dataset compromised). This is the China-side matched pair to
  // SolarWinds.
  {
    id: "opm-breach-2015",
    slug: "opm-breach",
    name: "OPM Data Breach",
    shortName: "OPM",
    year: 2015,
    dateRange: "2014 – disclosed June 2015",
    incidentType: "espionage",
    summary:
      "Intrusion into the US Office of Personnel Management resulting in exfiltration of personnel records on approximately 21.5 million current and former federal employees, contractors, and family members, including approximately 5.6 million sets of fingerprints and the contents of Standard Form 86 security clearance background investigation files. The compromised dataset is widely assessed as one of the most consequential counter-intelligence losses in US history. Despite high-confidence assessment that the operation was conducted by China-linked actors, the US imposed no sanctions and filed no indictments; Director of National Intelligence James Clapper publicly characterised the operation as legitimate espionage.",
    attribution: {
      confidence: "high",
      attributedTo:
        "China-linked actors; US officials assessed Chinese state responsibility but did not name a specific service in public attribution",
      country: "China",
      aliases: ["Deep Panda", "Axiom (linked tooling)"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Initial access via contractor",
          description:
            "Initial intrusion vector traced to credentials of a KeyPoint Government Solutions contractor used to access OPM networks; persistence established without detection.",
          date: "2014-03",
        },
        {
          tier: "intrusion",
          label: "Background investigation database exfiltration",
          description:
            "Exfiltration of the eQIP / e-OPF environment containing Standard Form 86 security clearance background investigation files for approximately 21.5 million individuals.",
          date: "2014-05",
        },
        {
          tier: "intrusion",
          label: "Fingerprint database exfiltration",
          description:
            "Separate exfiltration of approximately 5.6 million sets of fingerprints retained by OPM for the background investigation programme.",
          date: "2014-12",
        },
        {
          tier: "disruption",
          label: "Discovery, public disclosure, and policy response",
          description:
            "Breach discovered in April 2015 and publicly disclosed in June 2015. OPM Director Katherine Archuleta resigned. DNI Clapper publicly characterised the operation as 'kind of admirable' as espionage; no sanctions or indictments followed. The National Background Investigations Bureau was created, and OPM's security-clearance investigative function was eventually transferred to DCSA.",
          date: "2015-06",
        },
      ],
      peakTier: "disruption",
      restraintFactors: [
        "Activity confined to data exfiltration; no destructive payload, no manipulation, no public release of the stolen data",
        "DNI Clapper publicly framed the operation as conventional espionage that the United States itself conducts, signalling a deliberate decision not to treat it as crossing a norm threshold",
      ],
      thresholdCrossings: [
        "Largest compromise of US federal personnel data in history",
        "Compromise of SF-86 background investigation files containing decades of biographical, financial, and counter-intelligence-relevant information on cleared personnel",
        "High-confidence attribution to a state actor producing no formal foreign-policy consequence",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "defense"],
      targetCountries: ["United States"],
      techniques: [
        {
          id: "T1078",
          name: "Valid Accounts",
          tactic: "Initial Access",
        },
        {
          id: "T1199",
          name: "Trusted Relationship",
          tactic: "Initial Access",
        },
        {
          id: "T1003",
          name: "OS Credential Dumping",
          tactic: "Credential Access",
        },
        {
          id: "T1567",
          name: "Exfiltration Over Web Service",
          tactic: "Exfiltration",
        },
      ],
      malwareFamilies: ["PlugX", "Sakula"],
      impactSummary:
        "Exfiltration of background investigation records on ~21.5M individuals and ~5.6M fingerprint sets; structural counter-intelligence loss persisting beyond the lifecycle of any individual operation.",
    },
    governance: {
      flags: ["attribution-public", "regulatory-change"],
      normsInvoked: [
        "Debate over whether large-scale espionage against state personnel data falls within or outside the UN GGE 2015 norm framework",
        "Distinction between economic espionage (covered by 2015 Obama–Xi understanding) and political/counter-intelligence espionage (not covered)",
      ],
      policyResponses: [
        "OPM Director Katherine Archuleta resigned (Jul 2015)",
        "House Oversight and Government Reform Committee majority report 'The OPM Data Breach: How the Government Jeopardized Our National Security for More than a Generation' (Sep 2016)",
        "Free credit monitoring and identity protection services provided to affected individuals via contractor (ID Experts)",
        "No US sanctions, no US indictments, no public diplomatic expulsions linked to OPM",
      ],
      regulatoryChanges: [
        "Cybersecurity Sprint and Cybersecurity Strategy and Implementation Plan (CSIP) issued by OMB (2015)",
        "Establishment of the National Background Investigations Bureau within OPM (2016); functions later transferred to the Defense Counterintelligence and Security Agency (DCSA) under the Defense Department",
        "Cyber Information Sharing Act (CISA) enacted in late 2015, partly in response to OPM and other large-scale intrusions",
      ],
      impact:
        "OPM is the paradigmatic case of a high-confidence, strategically consequential intrusion that produced extensive domestic regulatory reform but no foreign-policy consequence. Senior officials' explicit framing of the operation as legitimate espionage marks the political ceiling on cyber accountability for activity coded as collection.",
    },
    whyThisMatters:
      "OPM is the structural pair to SolarWinds: both are large-scale espionage operations against the US federal government, both with high-confidence state attribution, both producing extensive intelligence loss. SolarWinds drew sanctions and expulsions; OPM drew none. Holding the two together isolates the political variable from the technical and consequential variables.",
    teaching: {
      keyQuestion:
        "If senior US intelligence officials publicly classify a particular intrusion as legitimate espionage, what does that disclose about the working definition of cyber norm violations in practice?",
      discussionPoints: [
        "The espionage-versus-attack line and its relationship to public attribution choices",
        "Counter-intelligence consequences of a permanent foreign-held SF-86 dataset",
        "Whether the 2015 Obama–Xi economic espionage understanding can be read as implicit ratification of political espionage at scale",
      ],
      furtherReading: [
        "US House of Representatives, Committee on Oversight and Government Reform. 'The OPM Data Breach: How the Government Jeopardized Our National Security for More than a Generation.' Majority staff report, September 2016.",
        "GAO Reports on OPM information security (GAO-15-714T, GAO-16-501).",
        "Sanger, D.E. & Schmitt, E. 'Spy Agency Consensus Grows That Russia Hacked D.N.C.' New York Times, July 2016 — referenced for Clapper's comparative remarks on OPM.",
      ],
    },
    sources: [
      {
        title: "OPM: Cybersecurity Incidents — Information About the Background Investigations Incident",
        category: "government",
        date: "2015-09",
      },
      {
        title:
          "House Oversight and Government Reform: 'The OPM Data Breach' Majority Staff Report",
        category: "government",
        date: "2016-09-07",
      },
      {
        title:
          "GAO: Information Security — OPM Has Improved Controls, but Further Efforts Are Needed (GAO-17-614)",
        category: "government",
        date: "2017-08",
      },
      {
        title:
          "Washington Post: 'Director of National Intelligence Clapper: \"You have to kind of salute the Chinese for what they did\"'",
        category: "journalistic",
        date: "2015-06-25",
      },
      {
        title: "CrowdStrike: 'Deep Panda' threat actor profile",
        category: "vendor",
        date: "2014",
      },
    ],
    attributionDetail: {
      claimants: [
        {
          actor: "US Government",
          date: "2015-06-25",
          confidenceLevel: "High",
          evidenceBasis:
            "DNI James Clapper publicly identified China as the prime suspect at a Wilson Center event; the assessment was reinforced in classified Congressional briefings",
        },
        {
          actor: "Academic/Private Sector",
          date: "2015-06",
          confidenceLevel: "High",
          evidenceBasis:
            "CrowdStrike, FireEye/Mandiant, and ThreatConnect linked tooling and infrastructure to China-nexus actors (Deep Panda / Axiom)",
        },
        {
          actor: "US Government",
          date: "2016-09-07",
          confidenceLevel: "High",
          evidenceBasis:
            "House Oversight and Government Reform majority staff report cited Chinese state responsibility based on classified briefings and IC assessments",
        },
      ],
      coordinationType: "unilateral",
      consequences: ["Public Naming Only"],
    },
    actorSlug: "hafnium-apt40",
  },

  // ---- 3. APT1 / PLA Unit 61398 --------------------------------------------
  // Calibration anchor: Bangladesh Bank SWIFT (Lazarus indictment) and
  // Exchange/Hafnium (PRC indictment band). APT1 was the first US indictment
  // of named foreign military officers for cyber economic espionage; it
  // produced public naming and the indictment flag, but never resulted in
  // any defendant appearing in court and no sanctions followed. Score sits
  // in the indictment-without-sanctions band — below Exchange/Hafnium on
  // sanctions but matches it on indictment and attribution-public.
  {
    id: "apt1-2013",
    slug: "apt1-pla-61398",
    name: "APT1 / PLA Unit 61398 Economic Espionage",
    shortName: "APT1",
    year: 2013,
    dateRange: "2006 – disclosed February 2013; indictment May 2014",
    incidentType: "espionage",
    summary:
      "Multi-year economic espionage campaign attributed by Mandiant to People's Liberation Army Unit 61398 (Second Bureau of the Third Department, General Staff Department), targeting at least 141 organisations across 20 major industries. The February 2013 Mandiant report APT1 was the first publicly attributed campaign tying a named foreign military unit to specific intrusion sets. In May 2014, the US Department of Justice indicted five PLA officers — the first US criminal charges against named foreign uniformed military personnel for cyber economic espionage. No defendant has ever appeared in a US court.",
    attribution: {
      confidence: "confirmed",
      attributedTo:
        "People's Liberation Army (PLA) Unit 61398, Second Bureau of the Third Department of the General Staff Department, as named by Mandiant in February 2013 and by US DOJ indictment in May 2014",
      country: "China",
      aliases: ["APT1", "Comment Crew", "Comment Group", "Byzantine Candor"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Sustained spearphishing and credential-based access",
          description:
            "Spearphishing campaigns delivered custom backdoors (WEBC2, BACKSPACE family) to enable long-duration access to corporate environments across aerospace, energy, telecommunications, IT, satellite, manufacturing, and other sectors.",
          date: "2006",
        },
        {
          tier: "intrusion",
          label: "Persistent data exfiltration",
          description:
            "Mandiant documented an average dwell time of 356 days across 141 victim organisations, with terabytes of intellectual property and business-sensitive data exfiltrated.",
          date: "2010-2013",
        },
        {
          tier: "intrusion",
          label: "Public attribution and DOJ indictment",
          description:
            "Mandiant published the APT1 report attributing the campaign to PLA Unit 61398 (Feb 2013). The US DOJ indicted five PLA officers — Wang Dong, Sun Kailiang, Wen Xinyu, Huang Zhenyu, and Gu Chunhui — for computer fraud and economic espionage (May 2014). No defendant has been extradited or appeared.",
          date: "2014-05-19",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Activity confined to economic and business intelligence collection; no destructive payload, no manipulation of data",
        "Targeting concentrated on long-running access rather than disruption",
      ],
      thresholdCrossings: [
        "First public attribution of a named foreign military unit to a specific cyber intrusion set with photographic identification of operators",
        "First US criminal charges filed against named foreign uniformed military personnel for cyber economic espionage",
        "Established the 'indictment without enforcement' template for naming-and-shaming as a US response tool",
      ],
    },
    infrastructure: {
      targetSectors: [
        "technology",
        "defense",
        "energy",
        "manufacturing",
        "telecommunications",
        "multiple",
      ],
      targetCountries: [
        "United States",
        "Canada",
        "United Kingdom",
        "South Korea",
        "Japan",
        "Taiwan",
      ],
      techniques: [
        {
          id: "T1566.001",
          name: "Phishing: Spearphishing Attachment",
          tactic: "Initial Access",
        },
        {
          id: "T1059.003",
          name: "Command and Scripting Interpreter: Windows Command Shell",
          tactic: "Execution",
        },
        {
          id: "T1071.001",
          name: "Application Layer Protocol: Web Protocols",
          tactic: "Command and Control",
        },
        {
          id: "T1003",
          name: "OS Credential Dumping",
          tactic: "Credential Access",
        },
      ],
      malwareFamilies: ["WEBC2", "BACKSPACE", "BISCUIT", "BANGAT", "STARSYPOUND"],
      impactSummary:
        "Terabytes of intellectual property and business intelligence exfiltrated from at least 141 organisations across 20 industries over six-plus years.",
    },
    governance: {
      flags: ["attribution-public", "indictment", "deterrence-signal"],
      normsInvoked: [
        "Distinction between political/military espionage (broadly tolerated in state practice) and economic espionage for commercial benefit (asserted by the United States as a prohibited category)",
        "Obama–Xi understanding of September 2015 — neither government will conduct or knowingly support cyber-enabled theft of intellectual property for commercial advantage",
      ],
      policyResponses: [
        "Mandiant APT1 report (Feb 2013) — first public attribution naming a specific PLA unit",
        "US DOJ indictment of five PLA officers (May 2014)",
        "Obama–Xi cyber espionage understanding (September 2015)",
        "No sanctions issued specifically in response to APT1; no defendant appeared",
      ],
      regulatoryChanges: [
        "Catalysed the use of criminal indictment as a public-attribution tool for cyber operations attributed to foreign states",
        "Informed the design of the 2015 Executive Order 13694 cyber sanctions authority (used for later China actions but not APT1)",
        "Set a precedent the US later repeated against PRC, Russian, Iranian, and DPRK personnel",
      ],
      impact:
        "APT1 established the template for indictment as a signalling tool divorced from prospect of enforcement. It produced public naming and the indictment flag, but no US sanctions and no diplomatic expulsions. The case is the canonical example of consequence-stopping at the indictment tier when the target is a great-power adversary, and a useful pair with Hafnium (indictment without sanctions) and with later Chinese cases that did draw sanctions.",
    },
    whyThisMatters:
      "APT1 is the foundational test case for indictment-as-signal in cyber statecraft. It demonstrates that the United States is willing to publicly name uniformed foreign military personnel — but that this willingness does not, on its own, translate into sanctions or any other coercive consequence. Read alongside Sandworm (indictment plus sanctions) and Salt Typhoon (sanctions on PRC contractor), it shows that the indictment-to-sanctions step is a discretionary political choice, not an automatic escalation.",
    teaching: {
      keyQuestion:
        "What does indictment without enforcement accomplish as a tool of cyber statecraft, and what does its repeated use without escalation to sanctions reveal about the political logic of public attribution?",
      discussionPoints: [
        "Indictment as signalling: deterrence, audience effects, and the cost of repeated non-enforcement",
        "The economic-versus-political espionage distinction and whether it has held in practice",
        "Comparing APT1 to subsequent indictments (Sandworm 2020, Hafnium 2024) — what changed and what did not",
      ],
      furtherReading: [
        "Mandiant. 'APT1: Exposing One of China's Cyber Espionage Units.' February 2013.",
        "US Department of Justice. Indictment of Wang Dong et al., Western District of Pennsylvania, May 1, 2014.",
        "Segal, A. 'The Hacked World Order.' PublicAffairs, 2016 — chapter on APT1 and the indictment turn.",
      ],
    },
    sources: [
      {
        title: "Mandiant: 'APT1 — Exposing One of China's Cyber Espionage Units'",
        category: "vendor",
        date: "2013-02-19",
      },
      {
        title:
          "US Department of Justice: Indictment of Wang Dong, Sun Kailiang, Wen Xinyu, Huang Zhenyu, and Gu Chunhui (W.D. Pa.)",
        category: "legal",
        date: "2014-05-01",
      },
      {
        title:
          "US Department of Justice press release: 'U.S. Charges Five Chinese Military Hackers for Cyber Espionage Against U.S. Corporations and a Labor Organization for Commercial Advantage'",
        category: "legal",
        date: "2014-05-19",
      },
      {
        title:
          "White House: Fact Sheet — President Xi Jinping's State Visit to the United States (cyber espionage understanding)",
        category: "government",
        date: "2015-09-25",
      },
      {
        title:
          "Council on Foreign Relations: 'Cyber Operations Tracker — APT1 / PLA Unit 61398'",
        category: "academic",
        date: "2018",
      },
    ],
    attributionDetail: {
      claimants: [
        {
          actor: "Academic/Private Sector",
          date: "2013-02-19",
          confidenceLevel: "High",
          evidenceBasis:
            "Mandiant APT1 report linking infrastructure, tooling, and operator personas to PLA Unit 61398 in Pudong, Shanghai",
        },
        {
          actor: "US Government",
          date: "2014-05-19",
          confidenceLevel: "Confirmed",
          evidenceBasis:
            "US Department of Justice indictment naming five PLA officers with specific charges and underlying evidence summarised in the indictment",
        },
      ],
      coordinationType: "unilateral",
      consequences: ["Indictment", "Public Naming Only"],
    },
    actorSlug: "hafnium-apt40",
  },

  // ---- 4. Salt Typhoon ------------------------------------------------------
  // Calibration anchor: Volt Typhoon (parallel PRC telecom-adjacent CI case).
  // Salt Typhoon sits ABOVE Volt Typhoon on governance because of the
  // OFAC sanctions on Sichuan Juxinhe Network Technology (Jan 2025) — the
  // pivot point in the wider 2024-25 China cyber sanctions wave. Also paired
  // with Belgacom (telecom backbone, allied perpetrator, no consequence) to
  // demonstrate the asymmetry axis runs through the perpetrator's political
  // relationship to the attributing coalition, not through the technical
  // facts of the operation.
  {
    id: "salt-typhoon-2024",
    slug: "salt-typhoon",
    name: "Salt Typhoon — US Telecommunications Backbone Compromise",
    shortName: "Salt Typhoon",
    year: 2024,
    dateRange:
      "Access established earlier; disclosed September–December 2024 (note: investigation and disclosures ongoing as of May 2025)",
    incidentType: "espionage",
    summary:
      "China-linked intrusion campaign against US telecommunications operators including AT&T, Verizon, Lumen, and others, gaining access to portions of the carriers' core network infrastructure including, in some operators, the systems used to service US lawful-intercept (CALEA) requests. The campaign exposed call metadata and content for an unknown number of US persons, with US officials publicly confirming targeting of senior US political figures' communications during the 2024 election cycle. The US Treasury OFAC sanctioned Sichuan Juxinhe Network Technology and a Shanghai-based individual (Yin Kecheng) in January 2025, part of a wider 2024–2025 wave of sanctions against China-linked cyber contractors (alongside actions against Integrity Technology Group / Flax Typhoon and Sichuan Silence Information Technology).",
    attribution: {
      confidence: "confirmed",
      attributedTo:
        "Salt Typhoon, attributed by the US government to PRC Ministry of State Security (MSS) and contractor Sichuan Juxinhe Network Technology",
      country: "China",
      aliases: [
        "Salt Typhoon",
        "GhostEmperor",
        "FamousSparrow",
        "Earth Estries",
      ],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Initial access into US telecom carriers",
          description:
            "Long-duration access established into core networks of multiple US telecommunications operators using credential abuse and exploitation of network-edge devices.",
          date: "2024",
        },
        {
          tier: "intrusion",
          label: "Access to lawful-intercept systems and high-profile targets",
          description:
            "US officials publicly confirmed that operators had accessed systems used to service CALEA lawful-intercept requests, and had targeted phones used by the 2024 Trump and Harris campaigns and senior congressional staff.",
          date: "2024-10",
        },
        {
          tier: "intrusion",
          label:
            "Public attribution, OFAC sanctions, and ongoing remediation",
          description:
            "FBI/CISA joint advisories named PRC actors; US Treasury OFAC sanctioned Sichuan Juxinhe Network Technology and Yin Kecheng on 17 January 2025. CISA, NSA, and Five Eyes partners issued hardening guidance for telecom infrastructure. Forensic remediation across carriers is ongoing as of May 2025.",
          date: "2025-01-17",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Activity to date consistent with intelligence collection; no public evidence of destructive payload or manipulation of communications integrity",
        "Public US government framing distinguishes Salt Typhoon (collection) from Volt Typhoon (pre-positioning for disruption), though the two campaigns are run by separate PRC actors",
      ],
      thresholdCrossings: [
        "First publicly documented compromise of US lawful-intercept (CALEA) infrastructure by a foreign state",
        "First US OFAC sanctions against a PRC commercial contractor for telecommunications-sector cyber espionage (Sichuan Juxinhe, 17 Jan 2025)",
        "Marked the consolidation of a 2024–2025 US sanctions posture against PRC cyber contractors, alongside Flax Typhoon / Integrity Tech and Sichuan Silence designations",
      ],
    },
    infrastructure: {
      targetSectors: [
        "telecommunications",
        "critical-infrastructure",
        "government",
      ],
      targetCountries: ["United States", "multiple allied jurisdictions"],
      techniques: [
        {
          id: "T1190",
          name: "Exploit Public-Facing Application",
          tactic: "Initial Access",
        },
        {
          id: "T1078",
          name: "Valid Accounts",
          tactic: "Persistence",
        },
        {
          id: "T1040",
          name: "Network Sniffing",
          tactic: "Credential Access",
        },
        {
          id: "T1071.001",
          name: "Application Layer Protocol: Web Protocols",
          tactic: "Command and Control",
        },
      ],
      malwareFamilies: ["GhostSpider", "Demodex (rootkit, historic linkage)"],
      impactSummary:
        "Access to core network and CALEA-related systems at multiple major US telecommunications operators; metadata and content for an unknown number of US persons exposed; senior political figures' communications targeted. Full scope and remediation status remain under investigation as of May 2025.",
    },
    governance: {
      flags: [
        "attribution-public",
        "sanctions-imposed",
        "regulatory-change",
        "international-cooperation",
        "deterrence-signal",
      ],
      normsInvoked: [
        "UN GGE 2015 Norm 13(f) on critical infrastructure (telecommunications)",
        "Tallinn Manual 2.0 Rule 4 (state responsibility for MSS contractor activity)",
        "OECD principles on lawful-intercept infrastructure integrity",
      ],
      policyResponses: [
        "FBI/CISA joint advisories on Salt Typhoon TTPs (Dec 2024)",
        "Senate Intelligence and House Energy and Commerce hearings on telecom backbone security (Nov 2024 – Jan 2025)",
        "US Treasury OFAC designation of Sichuan Juxinhe Network Technology and Yin Kecheng (17 Jan 2025)",
        "Five Eyes hardening guidance for telecommunications operators (Dec 2024)",
        "Bipartisan Congressional letters calling for review of CALEA architecture and lawful-intercept design",
      ],
      regulatoryChanges: [
        "FCC declaratory ruling and proposed rulemaking on telecommunications cybersecurity (early 2025)",
        "CISA expanded guidance on protecting carrier network-edge infrastructure",
        "Renewed legislative interest in revisiting CALEA's lawful-intercept design after demonstrated foreign-state abuse — TODO: status of any enacted legislation as of mid-2025 left for human review",
      ],
      impact:
        "Salt Typhoon marks the consolidation of US OFAC sanctions as a routinised response to PRC telecommunications-sector espionage. Pairing Salt Typhoon (PRC contractor, sanctions imposed) with Belgacom (UK GCHQ, no formal response) isolates the political relationship of the perpetrator from the technical character of the operation; pairing it with Volt Typhoon (parallel PRC campaign, no sanctions in the immediate response cycle) tracks how the 2024–2025 wave shifted the consequence baseline for China-attributed CI espionage.",
    },
    whyThisMatters:
      "Salt Typhoon is the temporal pivot of the matched-pair argument. It is structurally similar to Belgacom (a foreign state compromising another state's telecommunications backbone) but draws a sharply higher consequence — OFAC sanctions on a named contractor — because the perpetrator is positioned outside the Western attributing coalition. Read alongside Belgacom and OPM, it shows the consequence axis tracking political relationship rather than technical facts; read alongside Volt Typhoon, it shows that the relationship can move within a short time horizon (sanctions arrived for Salt Typhoon faster than for the parallel Volt Typhoon campaign).",
    teaching: {
      keyQuestion:
        "When two structurally similar telecommunications-backbone espionage operations attract opposite consequences — sanctions for the PRC contractor case, no formal response for the UK GCHQ case — what does this disclose about the criteria that govern public-attribution machinery?",
      discussionPoints: [
        "Lawful-intercept architecture as a strategic vulnerability and an attribution choice",
        "Sanctions against named state contractors as a developing US tool against the PRC cyber ecosystem",
        "How quickly the 2024–2025 sanctions wave shifted the consequence baseline relative to earlier China-attributed espionage",
      ],
      furtherReading: [
        "US Department of the Treasury press release: 'Treasury Sanctions Cyber Actors Involved in PRC State-Sponsored Hacking of U.S. Telecommunications.' 17 January 2025.",
        "FBI / CISA Joint Cybersecurity Advisory on Salt Typhoon TTPs (December 2024).",
        "Senate Select Committee on Intelligence hearings on telecom backbone security, November 2024 – January 2025.",
        "Lewis, J.A. (CSIS) commentary on the 2024–2025 PRC cyber sanctions wave.",
      ],
    },
    sources: [
      {
        title:
          "US Department of the Treasury: 'Treasury Sanctions Cyber Actors Involved in PRC State-Sponsored Hacking of U.S. Telecommunications'",
        category: "government",
        date: "2025-01-17",
      },
      {
        title: "CISA / FBI / NSA Joint Cybersecurity Advisory: PRC-Affiliated Actor Compromise of US Telecommunications Providers",
        category: "government",
        date: "2024-12-03",
      },
      {
        title:
          "Wall Street Journal: 'China-Linked Hackers Breach U.S. Internet Providers in New Salt Typhoon Cyberattack'",
        category: "journalistic",
        date: "2024-09-25",
      },
      {
        title:
          "Washington Post: 'Chinese hack of U.S. telecoms compromised more than Trump campaign phones'",
        category: "journalistic",
        date: "2024-10-26",
      },
      {
        title:
          "Microsoft Threat Intelligence: 'Salt Typhoon / Earth Estries — adversary profile'",
        category: "vendor",
        date: "2024-11",
      },
    ],
    attributionDetail: {
      claimants: [
        {
          actor: "Academic/Private Sector",
          date: "2024-09-25",
          confidenceLevel: "High",
          evidenceBasis:
            "Initial public disclosure via WSJ and follow-on Microsoft/Trend Micro/Cisco Talos reporting linking activity to Salt Typhoon / Earth Estries cluster",
        },
        {
          actor: "US Government",
          date: "2024-12-03",
          confidenceLevel: "Confirmed",
          evidenceBasis:
            "CISA / FBI / NSA joint advisory attributing the campaign to PRC state-affiliated actors and detailing TTPs",
        },
        {
          actor: "US Government",
          date: "2025-01-17",
          confidenceLevel: "Confirmed",
          evidenceBasis:
            "US Treasury OFAC designation of Sichuan Juxinhe Network Technology and Yin Kecheng with formal attribution to PRC state-sponsored cyber operations against US telecommunications",
        },
        {
          actor: "Allied Coalition",
          date: "2024-12",
          confidenceLevel: "High",
          evidenceBasis:
            "Five Eyes joint guidance on protecting telecommunications infrastructure references the campaign and reinforces the attribution",
        },
      ],
      coordinationType: "joint",
      consequences: ["Sanctions", "Public Naming Only"],
    },
    actorSlug: "hafnium-apt40",
  },

  // ---- 5. Flame / Flamer (Tier 2) ------------------------------------------
  // Calibration anchor: Stuxnet (assessed US/Israel, no formal response,
  // sabotage tier). Flame is the espionage analogue — sophisticated US/Israel-
  // linked toolkit, regional spread, no formal foreign-policy consequence.
  // Sits BELOW Stuxnet on peak tier (intrusion vs destruction) and matches
  // it on governance (zero flags). Reinforces the protected-actor cell that
  // Belgacom anchors.
  {
    id: "flame-2012",
    slug: "flame-flamer",
    name: "Flame / Flamer",
    shortName: "Flame",
    year: 2012,
    dateRange: "Active circa 2007 – disclosed May 2012",
    incidentType: "espionage",
    summary:
      "Modular espionage toolkit of exceptional size and sophistication disclosed in May 2012, primarily affecting computers in Iran, Israel/Palestine, Sudan, Syria, Lebanon, Saudi Arabia, and Egypt. Flame collected screenshots, microphone audio, keystrokes, Bluetooth device proximity data, and file contents from compromised systems. Its update channel abused a forged Microsoft code-signing certificate produced via a novel MD5 chosen-prefix collision, an engineering capability widely assessed to require state-level resources. Multiple security firms and the Washington Post linked Flame to the same US–Israel programme that produced Stuxnet; no government has formally attributed Flame, and no formal foreign-policy consequence followed.",
    attribution: {
      confidence: "high",
      attributedTo:
        "Widely assessed by Kaspersky, CrySyS Lab, and Washington Post reporting to be a US–Israeli joint intelligence operation; never formally attributed by any government",
      country: "United States / Israel",
      aliases: ["Flame", "Flamer", "sKyWIper"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "Long-duration regional espionage",
          description:
            "Flame compromised systems primarily in Iran and surrounding Middle Eastern states, collecting screenshots, audio, keystrokes, and files via a modular plugin architecture.",
          date: "2007",
        },
        {
          tier: "intrusion",
          label: "Forged Microsoft code-signing certificate",
          description:
            "Flame's update channel relied on a forged Microsoft code-signing certificate generated via a novel MD5 chosen-prefix collision against Microsoft Terminal Services Licensing — the first publicly documented offensive use of this cryptanalytic technique, requiring state-level engineering capacity.",
          date: "2010",
        },
        {
          tier: "intrusion",
          label: "Disclosure and self-destruct",
          description:
            "Kaspersky and CrySyS Lab published technical analyses (May 2012); operators issued a self-destruct command to compromised machines shortly after disclosure. Washington Post reporting linked Flame to the same joint US–Israel programme as Stuxnet (June 2012).",
          date: "2012-05-28",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Activity confined to intelligence collection; no destructive payload, no manipulation of operational systems",
        "Targeting concentrated on specific machines of intelligence interest rather than indiscriminate mass spread",
      ],
      thresholdCrossings: [
        "First publicly documented offensive operational use of an MD5 chosen-prefix collision to forge a Microsoft code-signing certificate",
        "One of the largest and most modular espionage platforms publicly disclosed at the time",
        "High-confidence assessment of state authorship producing no formal foreign-policy consequence — reinforcing the protected-actor cell that Belgacom anchors",
      ],
    },
    infrastructure: {
      targetSectors: ["government", "education", "energy", "multiple"],
      targetCountries: [
        "Iran",
        "Israel",
        "Sudan",
        "Syria",
        "Lebanon",
        "Saudi Arabia",
        "Egypt",
      ],
      techniques: [
        {
          id: "T1553.002",
          name: "Subvert Trust Controls: Code Signing",
          tactic: "Defense Evasion",
        },
        {
          id: "T1547",
          name: "Boot or Logon Autostart Execution",
          tactic: "Persistence",
        },
        {
          id: "T1056",
          name: "Input Capture",
          tactic: "Collection",
        },
        {
          id: "T1123",
          name: "Audio Capture",
          tactic: "Collection",
        },
        {
          id: "T1119",
          name: "Automated Collection",
          tactic: "Collection",
        },
      ],
      malwareFamilies: ["Flame", "Flamer", "sKyWIper"],
      impactSummary:
        "Long-duration espionage against several thousand machines across the Middle East; novel cryptographic attack against Microsoft's code-signing infrastructure with broad ecosystem implications.",
    },
    governance: {
      flags: [],
      normsInvoked: [
        "Debate over whether large-scale espionage falls within or outside UN GGE norms (Flame predates the 2015 GGE norms)",
        "Cryptographic infrastructure trust and the implications of state forgery of commercial signing chains",
      ],
      policyResponses: [
        "Microsoft revoked the compromised certificate hierarchy and tightened Windows Update authentication via Security Advisory 2718704 (June 2012)",
        "No government formally attributed Flame",
        "No sanctions, indictments, or diplomatic consequences linked to Flame",
      ],
      regulatoryChanges: [
        "Industry-wide acceleration of MD5 deprecation and cryptographic agility planning",
        "Tightened Microsoft code-signing infrastructure and revocation processes",
      ],
      impact:
        "Flame is the espionage analogue to Stuxnet in the protected-actor cell: extensively technically attributed by private analysts, widely assessed to be a US–Israel operation, and producing zero formal foreign-policy consequence. Together with Belgacom it forms the empirical floor of the consequence-gradient argument.",
    },
    whyThisMatters:
      "Flame and Stuxnet together demonstrate the consistent floor of the protected-actor cell: even when technical assessment is strong and the operation is operationally consequential, attribution to an allied state does not, in practice, draw the public-attribution machinery (joint statements, sanctions, indictments). The consistency of this floor across multiple cases is what makes the matched-pair comparison with Salt Typhoon and OPM analytically informative.",
    teaching: {
      keyQuestion:
        "Why does technical attribution that links sophisticated state-tier espionage to an allied power consistently fail to mobilise the public-attribution machinery, even when the operation has been extensively documented in open sources?",
      discussionPoints: [
        "Cryptographic infrastructure as a strategic resource and the implications of state forgery of commercial signing chains",
        "The relationship between technical attribution by private analysts and political attribution by governments",
        "Stuxnet and Flame as a paired test of the consequence-tier ceiling for allied-attributed operations",
      ],
      furtherReading: [
        "Kaspersky Lab. 'The Flame: Questions and Answers.' May 2012.",
        "CrySyS Lab (Budapest University of Technology and Economics). 'sKyWIper (a.k.a. Flame, a.k.a. Flamer): A complex malware for targeted attacks.' May 31, 2012.",
        "Nakashima, E., Miller, G., & Tate, J. 'U.S., Israel developed Flame computer virus to slow Iranian nuclear efforts, officials say.' Washington Post, June 19, 2012.",
        "Stevens, M. et al. 'Counter-cryptanalysis: Reconstructing the MD5 collision in the Flame malware.' CWI Amsterdam, 2012.",
      ],
    },
    sources: [
      {
        title: "Kaspersky Lab: 'The Flame — Questions and Answers'",
        category: "vendor",
        date: "2012-05-28",
      },
      {
        title:
          "CrySyS Lab: 'sKyWIper — A complex malware for targeted attacks'",
        category: "academic",
        date: "2012-05-31",
      },
      {
        title:
          "Microsoft Security Advisory 2718704: 'Unauthorized Digital Certificates Could Allow Spoofing'",
        category: "vendor",
        date: "2012-06-03",
      },
      {
        title:
          "Washington Post: 'U.S., Israel developed Flame computer virus to slow Iranian nuclear efforts'",
        category: "journalistic",
        date: "2012-06-19",
      },
      {
        title:
          "Stevens, M. et al.: 'Counter-cryptanalysis: Reconstructing the MD5 collision in the Flame malware' (CWI Amsterdam)",
        category: "academic",
        date: "2012-06",
      },
    ],
    attributionDetail: {
      claimants: [
        {
          actor: "Academic/Private Sector",
          date: "2012-05-28",
          confidenceLevel: "High",
          evidenceBasis:
            "Kaspersky Lab and CrySyS Lab technical analyses linking Flame to the same operator cluster as Stuxnet and Duqu via shared code constructs and infrastructure",
        },
        {
          actor: "Contested/Unknown",
          date: "2012-06-19",
          confidenceLevel: "High",
          evidenceBasis:
            "Washington Post reporting citing unnamed senior US and Western officials confirming joint US–Israel authorship; no government has formally attributed",
        },
      ],
      coordinationType: "none",
      consequences: ["No Formal Response"],
    },
    actorSlug: "unknown-contested",
  },

  // ---- 6. Cloud Hopper / APT10 (Tier 2) ------------------------------------
  // Calibration anchor: APT1 (indictment-without-sanctions band, PRC) and
  // Exchange/Hafnium (indictment, PRC). Cloud Hopper exceeds APT1 on
  // entanglement because of the global MSP supply-chain scope (12+ countries
  // affected) and matches APT1 on governance flags (attribution-public,
  // indictment, international-cooperation; no sanctions at the time of the
  // 2018 indictment). Reinforces the indictment-without-sanctions cell.
  {
    id: "cloud-hopper-2018",
    slug: "cloud-hopper-apt10",
    name: "Cloud Hopper / APT10 Managed Service Provider Campaign",
    shortName: "Cloud Hopper",
    year: 2018,
    dateRange: "Active circa 2014 – publicly disclosed April 2017; indictment December 2018",
    incidentType: "espionage",
    summary:
      "Multi-year campaign of intrusions against managed IT service providers (MSPs) in at least a dozen countries, pivoting through MSP credentials and infrastructure to reach the providers' downstream client networks. PwC UK, BAE Systems, and the UK NCSC publicly disclosed the campaign as Operation Cloud Hopper in April 2017, attributing it to APT10 (a.k.a. Stone Panda, MenuPass). The US Department of Justice indicted two PRC nationals — Zhu Hua and Zhang Shilong — alleged to be acting in association with the Ministry of State Security's Tianjin State Security Bureau, on 20 December 2018, in coordination with allied public-naming statements from the UK, Australia, Canada, New Zealand, Japan, and others. The indictment was not accompanied by US sanctions at the time of filing.",
    attribution: {
      confidence: "confirmed",
      attributedTo:
        "APT10 acting in association with the PRC Ministry of State Security (MSS) Tianjin State Security Bureau, per US DOJ indictment and coordinated allied attribution statements",
      country: "China",
      aliases: ["APT10", "Stone Panda", "MenuPass", "POTASSIUM", "Red Apollo"],
    },
    escalation: {
      phases: [
        {
          tier: "intrusion",
          label: "MSP credential compromise",
          description:
            "APT10 used spearphishing and credential abuse to compromise managed service providers, then leveraged the MSP-to-client trust relationship to pivot into hundreds of downstream organisations across multiple sectors and jurisdictions.",
          date: "2014",
        },
        {
          tier: "intrusion",
          label: "Public attribution by PwC, BAE Systems, and UK NCSC",
          description:
            "Joint Operation Cloud Hopper report by PwC UK, BAE Systems, and the UK National Cyber Security Centre detailed the MSP-pivot tradecraft and attributed it to APT10.",
          date: "2017-04",
        },
        {
          tier: "intrusion",
          label: "Coordinated DOJ indictment and allied naming",
          description:
            "US DOJ indicted Zhu Hua and Zhang Shilong (Dec 2018) in coordination with public-naming statements from the UK, Australia, Canada, New Zealand, Japan, Germany, the Netherlands, Norway, Sweden, and Finland. No US sanctions were imposed in conjunction with the indictment.",
          date: "2018-12-20",
        },
      ],
      peakTier: "intrusion",
      restraintFactors: [
        "Activity confined to intellectual-property and business-intelligence collection across MSP client networks; no destructive payload, no manipulation",
        "Operators selected downstream targets selectively from MSP visibility rather than pursuing indiscriminate disruption",
      ],
      thresholdCrossings: [
        "First public attribution of MSP-pivot tradecraft at global scale, demonstrating the systemic risk of concentrated managed-service trust relationships",
        "First broadly coordinated allied public-naming statement against a PRC cyber espionage campaign (10+ jurisdictions in December 2018)",
        "Reinforced the indictment-without-sanctions pattern previously established by APT1",
      ],
    },
    infrastructure: {
      targetSectors: [
        "technology",
        "telecommunications",
        "manufacturing",
        "finance",
        "healthcare",
        "government",
        "multiple",
      ],
      targetCountries: [
        "United States",
        "United Kingdom",
        "Japan",
        "Australia",
        "Canada",
        "France",
        "Germany",
        "Netherlands",
        "Sweden",
        "Switzerland",
        "Brazil",
        "India",
        "South Korea",
      ],
      techniques: [
        {
          id: "T1199",
          name: "Trusted Relationship",
          tactic: "Initial Access",
        },
        {
          id: "T1566.001",
          name: "Phishing: Spearphishing Attachment",
          tactic: "Initial Access",
        },
        {
          id: "T1078",
          name: "Valid Accounts",
          tactic: "Persistence",
        },
        {
          id: "T1071.001",
          name: "Application Layer Protocol: Web Protocols",
          tactic: "Command and Control",
        },
        {
          id: "T1003",
          name: "OS Credential Dumping",
          tactic: "Credential Access",
        },
      ],
      malwareFamilies: [
        "PlugX",
        "RedLeaves",
        "QuasarRAT",
        "Poison Ivy",
        "ChChes",
      ],
      impactSummary:
        "MSP-pivot intrusions across at least a dozen jurisdictions enabling access to hundreds of downstream client networks; full scope of exfiltrated data not publicly enumerated.",
    },
    governance: {
      flags: [
        "attribution-public",
        "indictment",
        "international-cooperation",
        "deterrence-signal",
      ],
      normsInvoked: [
        "Obama–Xi 2015 understanding on cyber-enabled economic espionage; Cloud Hopper was cited as an indication that the understanding had not produced sustained behavioural change",
        "UN GGE 2015 Norm 13(i) on supply-chain integrity (relevant by extension to MSP trust relationships)",
        "State responsibility for contractor / MSS-affiliated operator activity (Tallinn Manual 2.0 Rule 4)",
      ],
      policyResponses: [
        "Operation Cloud Hopper joint report by PwC UK, BAE Systems, and UK NCSC (Apr 2017)",
        "US DOJ indictment of Zhu Hua and Zhang Shilong (Dec 2018)",
        "Coordinated allied public-naming statements from 10+ jurisdictions (Dec 2018)",
        "No US sanctions issued in conjunction with the 2018 indictment — TODO: confirm subsequent Treasury actions touching APT10-linked entities for human review",
      ],
      regulatoryChanges: [
        "Catalysed CISA and NCSC guidance on MSP and third-party risk management",
        "Informed subsequent US executive action on software-supply-chain security (e.g., EO 14028)",
        "Renewed allied attention to MSS contractor model and the limits of indictment as enforcement",
      ],
      impact:
        "Cloud Hopper reinforced the indictment-without-sanctions pattern at allied scale: the breadth of coordinated public-naming statements was unprecedented for a PRC cyber campaign in 2018, but no US sanctions accompanied the indictment. The case sits in the same governance band as APT1 and provides the temporal bridge to the Salt Typhoon / Flax Typhoon / Sichuan Silence sanctions wave of 2024–2025.",
    },
    whyThisMatters:
      "Cloud Hopper is the strongest pre-2024 data point on the indictment-without-sanctions cell at allied scale. It shows that even a coordinated 10-jurisdiction public-naming exercise against a PRC MSS contractor model did not, in 2018, escalate to OFAC sanctions. Read forward to Salt Typhoon (Jan 2025 OFAC sanctions on a comparable PRC contractor), it provides the time-series evidence that the consequence baseline for China-attributed espionage shifted in the 2024–2025 window — and that the shift was a political choice rather than a response to new technical facts.",
    teaching: {
      keyQuestion:
        "What does the 2018 Cloud Hopper indictment-without-sanctions outcome — and its 2024–2025 contrast with the Salt Typhoon sanctions — reveal about the discretionary nature of the indictment-to-sanctions escalation step?",
      discussionPoints: [
        "MSP-pivot tradecraft as a systemic supply-chain vulnerability and the policy responses it generated",
        "Coordinated allied public-naming as a substitute for, or precursor to, sanctions",
        "Time-series comparison: APT1 (2014) → Cloud Hopper (2018) → Salt Typhoon (2024–25) and the shifting consequence ceiling for PRC cyber espionage",
      ],
      furtherReading: [
        "PwC UK, BAE Systems, and UK NCSC. 'Operation Cloud Hopper.' April 2017.",
        "US Department of Justice. 'Two Chinese Hackers Associated With the Ministry of State Security Charged With Global Computer Intrusion Campaigns Targeting Intellectual Property and Confidential Business Information.' 20 December 2018.",
        "UK Foreign and Commonwealth Office. 'UK and allies reveal global scale of Chinese cyber campaign.' 20 December 2018.",
        "Australian Government, Minister for Foreign Affairs. Joint statement on attribution of malicious cyber activity. 21 December 2018.",
      ],
    },
    sources: [
      {
        title:
          "PwC UK / BAE Systems / UK NCSC: 'Operation Cloud Hopper' joint report",
        category: "vendor",
        date: "2017-04-03",
      },
      {
        title:
          "US Department of Justice: Indictment of Zhu Hua and Zhang Shilong (S.D.N.Y.)",
        category: "legal",
        date: "2018-12-17",
      },
      {
        title:
          "US Department of Justice press release: 'Two Chinese Hackers Associated With the Ministry of State Security Charged With Global Computer Intrusion Campaigns'",
        category: "legal",
        date: "2018-12-20",
      },
      {
        title:
          "UK Foreign and Commonwealth Office: 'UK and allies reveal global scale of Chinese cyber campaign'",
        category: "government",
        date: "2018-12-20",
      },
      {
        title:
          "Australian Government Joint Statement on Attribution of Malicious Cyber Activity",
        category: "government",
        date: "2018-12-21",
      },
    ],
    attributionDetail: {
      claimants: [
        {
          actor: "Academic/Private Sector",
          date: "2017-04-03",
          confidenceLevel: "High",
          evidenceBasis:
            "PwC UK and BAE Systems Operation Cloud Hopper joint report attributing the campaign to APT10 with MSP-pivot tradecraft detail",
        },
        {
          actor: "UK Government",
          date: "2017-04-03",
          confidenceLevel: "High",
          evidenceBasis:
            "UK National Cyber Security Centre co-authored the Operation Cloud Hopper report",
        },
        {
          actor: "US Government",
          date: "2018-12-20",
          confidenceLevel: "Confirmed",
          evidenceBasis:
            "US DOJ indictment of Zhu Hua and Zhang Shilong naming MSS Tianjin State Security Bureau association",
        },
        {
          actor: "Allied Coalition",
          date: "2018-12-20",
          confidenceLevel: "Confirmed",
          evidenceBasis:
            "Coordinated public-naming statements from UK, Australia, Canada, New Zealand, Japan, Germany, Netherlands, Norway, Sweden, and Finland",
        },
      ],
      coordinationType: "joint",
      consequences: ["Indictment", "Public Naming Only"],
    },
    actorSlug: "hafnium-apt40",
  },
];
