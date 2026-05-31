export interface ActorProfile {
  slug: string;
  name: string;
  stateNexus: string;
  missionType: string;
  primarySectors: string[];
  operationalPeriod: string;
  ttps: string;
  behavioralSignature: string;
  governanceFootprint: string;
}

export const actorProfiles: ActorProfile[] = [
  {
    slug: "sandworm",
    name: "Sandworm Team (GRU Unit 74455)",
    stateNexus: "Russia, GRU (Main Intelligence Directorate), assessed to be Unit 74455",
    missionType: "Disruption and destruction of critical infrastructure, strategic sabotage in support of Russian military and geopolitical objectives",
    primarySectors: ["Energy", "Telecommunications", "Critical Infrastructure", "Government"],
    operationalPeriod: "2014 – present",
    ttps: "Sandworm consistently demonstrates ICS/SCADA-targeting capability, deploying purpose-built malware to interact directly with industrial protocols (IEC 104, IEC 61850). The group chains supply-chain compromise or credential-based access with disk-wiping components to delay forensic analysis. In wartime operations, Sandworm coordinates cyber attacks with kinetic military operations, as seen in the Viasat and Industroyer campaigns.",
    behavioralSignature: "Sandworm pursues strategic-level disruption with a willingness to accept collateral damage. Its operations exhibit progressive sophistication across multi-year attack cycles (2015 manual grid attack → 2016 automated Industroyer → 2022 Industroyer2). The group tolerates high visibility and attribution risk, suggesting its operations serve primarily as demonstrations of capability and coercive signalling rather than covert intelligence collection.",
    governanceFootprint: "Subject to the broadest multilateral attribution campaign of any cyber actor. Named in US DOJ indictments (2020), Five Eyes joint attribution (2018), EU sanctions. Sandworm operations have been central to international debates on IHL applicability to cyber operations in armed conflict.",
  },
  {
    slug: "lazarus-group",
    name: "Lazarus Group (RGB, North Korea)",
    stateNexus: "North Korea, Reconnaissance General Bureau (RGB)",
    missionType: "Financial theft for regime revenue, coercive destruction for political signalling, espionage",
    primarySectors: ["Finance", "Media", "Healthcare", "Technology"],
    operationalPeriod: "2009 – present",
    ttps: "Lazarus demonstrates unusual operational breadth: destructive wipers (Sony), self-propagating ransomware (WannaCry), and sophisticated financial system manipulation (SWIFT heists). The group frequently exploits trusted third-party relationships and supply chain vectors. Financial operations show deep knowledge of banking settlement systems and cryptocurrency infrastructure.",
    behavioralSignature: "Lazarus is uniquely driven by financial objectives alongside political ones, reflecting DPRK's use of cyber operations to fund sanctioned programmes. The group shows high risk tolerance and limited concern for collateral damage, as demonstrated by WannaCry's indiscriminate global spread. Target selection oscillates between high-profile political coercion and systematic financial theft.",
    governanceFootprint: "Subject to US DOJ indictments (Park Jin Hyok, 2018; three additional operatives, 2021), Treasury sanctions, and extensive UN Panel of Experts documentation of DPRK cyber-enabled sanctions evasion. Lazarus operations have been pivotal to debates on state-sponsored financial cybercrime and vulnerability equities.",
  },
  {
    slug: "svr-apt29",
    name: "SVR / APT29 / Cozy Bear",
    stateNexus: "Russia, SVR (Foreign Intelligence Service)",
    missionType: "Strategic intelligence collection, long-duration supply chain compromise, targeting of foreign government and technology vendors",
    primarySectors: ["Government", "Technology", "Defense"],
    operationalPeriod: "2008 – present",
    ttps: "APT29 specialises in patient, low-signature supply chain compromise and abuse of cloud authentication mechanisms. The group demonstrates exceptional operational security, carefully limiting second-stage payload deployment to high-value targets while maintaining broad initial access. Authentication token manipulation and OAuth abuse are recurring techniques reflecting deep understanding of cloud identity architecture.",
    behavioralSignature: "APT29 operates within traditional espionage parameters but at unprecedented scale. Its operations are characterised by restraint in execution, broad access coupled with selective targeting, and a focus on intelligence collection from technology providers' own internal systems rather than their customers directly. This patience distinguishes APT29 from the more aggressive GRU-linked operations.",
    governanceFootprint: "Subject to US sanctions and diplomatic expulsions (April 2021). SolarWinds prompted Executive Order 14028, the most significant US cybersecurity policy reform in a decade. Midnight Blizzard triggered CISA Emergency Directive 24-02 and intensified scrutiny of cloud vendor security accountability.",
  },
  {
    slug: "hafnium-apt40",
    name: "Hafnium / PRC MSS-Linked Groups",
    stateNexus: "China, Ministry of State Security (MSS) and affiliated entities (including MSS contractors such as Sichuan Juxinhe Network Technology designated in January 2025 for Salt Typhoon)",
    missionType: "Strategic espionage, intellectual property theft, critical infrastructure pre-positioning for contingency operations",
    primarySectors: ["Government", "Technology", "Telecommunications", "Critical Infrastructure"],
    operationalPeriod: "2009 – present",
    ttps: "PRC-linked groups demonstrate proficiency in zero-day exploitation of public-facing applications, mass exploitation campaigns, and living-off-the-land techniques for persistent access. Volt Typhoon's use of legitimate system tools to avoid detection in critical infrastructure networks represents the most advanced form of this approach. Groups routinely target cloud identity infrastructure and authentication mechanisms.",
    behavioralSignature: "PRC-linked operations span a wide spectrum from targeted espionage (Storm-0558) to indiscriminate mass exploitation (Hafnium Exchange campaign) to strategic pre-positioning (Volt Typhoon). The willingness to shift from targeted to mass exploitation, and the Volt Typhoon pre-positioning pattern, distinguishes PRC operations from the more restrained SVR approach. Target selection reflects both traditional intelligence priorities and preparation for potential military contingencies.",
    governanceFootprint: "Subject to the broadest multilateral attribution coalition to date (July 2021, including NATO's first attribution to China). Hafnium prompted the broadest international attribution coordination. Volt Typhoon generated the most significant Five Eyes joint advisory. PRC operations have driven major US legislative and regulatory responses including EO 14028 and proposed critical infrastructure legislation.",
  },
  {
    slug: "pla-cyber",
    name: "People's Liberation Army Cyber Units (PLA Unit 61398 / 3PLA Successor)",
    stateNexus: "China, People's Liberation Army (PLA), formerly Third Department of the General Staff Department (3PLA) including Unit 61398; reorganised under the PLA Strategic Support Force (SSF) in 2015 and subsequent restructurings",
    missionType: "Cyber-enabled economic espionage and strategic intelligence collection on behalf of PRC military and industrial priorities",
    primarySectors: ["Defense", "Technology", "Energy", "Manufacturing", "Telecommunications"],
    operationalPeriod: "circa 2006 – present (organisational successors)",
    ttps: "PLA cyber units have historically relied on high-volume spearphishing with custom backdoor families (WEBC2, BACKSPACE, BISCUIT, BANGAT, STARSYPOUND, as catalogued in the Mandiant APT1 report) and long-duration credential-based access for intellectual property exfiltration. Operational security has been substantially uneven across operators, with Mandiant's APT1 analysis identifying specific operator personas and Pudong, Shanghai-based infrastructure.",
    behavioralSignature: "PLA cyber operations have been characterised by emphasis on industrial and economic targets aligned with PRC five-year-plan priorities, dwell times measured in months to years, and tolerance of operational signatures that allowed extensive private-sector attribution. The 2014 DOJ indictment of five PLA Unit 61398 officers, the first US criminal charges against named foreign uniformed military personnel for cyber economic espionage, defines the canonical PLA-cyber-attribution case and is analytically distinct from MSS contractor operations.",
    governanceFootprint: "Subject to the foundational US indictment-as-attribution exercise (US v. Wang Dong et al., W.D. Pa., May 2014). The case established the indictment-without-enforcement template for cyber statecraft; no defendant has appeared. Activity catalysed the 2015 Obama–Xi understanding on cyber-enabled economic espionage and informed the design of Executive Order 13694 cyber sanctions authority (though that authority was not invoked against PLA Unit 61398).",
  },
  {
    slug: "scattered-spider",
    name: "Scattered Spider",
    stateNexus: "Non-state: loosely organized English-speaking individuals (US/UK)",
    missionType: "Financial extortion through social engineering and ransomware",
    primarySectors: ["Technology", "Finance", "Multiple"],
    operationalPeriod: "2022 – present",
    ttps: "Scattered Spider relies primarily on social engineering rather than technical exploitation: vishing (voice phishing) of helpdesks, SIM swapping, and impersonation to obtain credentials and MFA resets. Once inside, the group uses identity provider manipulation and cloud console access for persistence. Operates as an affiliate of ALPHV/BlackCat ransomware-as-a-service.",
    behavioralSignature: "Scattered Spider demonstrates that loosely organized criminal groups composed of young individuals can cause enterprise damage comparable to state actors. Their exclusive reliance on social engineering as an initial vector, bypassing technical controls entirely, has forced a reassessment of identity and helpdesk security as critical attack surfaces. The group's English-language proficiency distinguishes it from Russian-speaking ransomware ecosystems.",
    governanceFootprint: "Operations prompted FBI/CISA joint advisory (Nov 2023). MGM/Caesars incidents were among the first subject to SEC cyber disclosure rules. Multiple members arrested in the US and UK (2024), demonstrating that domestic law enforcement can reach non-state cyber actors more effectively than state-sponsored ones.",
  },
  {
    slug: "iranian-state-actors",
    name: "Iranian State-Linked Actors (IRGC/MOIS)",
    stateNexus: "Iran, Islamic Revolutionary Guard Corps (IRGC) and Ministry of Intelligence and Security (MOIS)",
    missionType: "Destructive signalling, political coercion, regional espionage, retaliatory operations",
    primarySectors: ["Energy", "Government"],
    operationalPeriod: "2012 – present",
    ttps: "Iranian actors deploy wiper malware for strategic signalling (Shamoon, Albania attacks), use hacktivist fronts for deniability, and conduct espionage through custom RATs. Operations frequently employ initial access through public-facing web applications followed by data destruction or exfiltration. Recent campaigns show improved operational security and diversification of tooling.",
    behavioralSignature: "Iranian operations are characteristically retaliatory and politically motivated, responding to perceived threats or grievances through destructive cyber demonstrations. The use of hacktivist fronts (Cutting Sword of Justice, Homeland Justice) provides deniability while ensuring the coercive message is received. Target selection reflects geopolitical relationships: Gulf states, Israel, and states hosting Iranian opposition groups.",
    governanceFootprint: "Albania's diplomatic severance following the 2022 attack was the first rupture of diplomatic relations over a cyber operation. US sanctions imposed on MOIS and affiliated entities. Iranian operations have been central to debates on cyber deterrence and the effectiveness of diplomatic consequences for state-sponsored destructive operations.",
  },
  {
    slug: "unknown-contested",
    name: "Unknown / Contested Attribution",
    stateNexus: "Various, includes cases where attribution is contested, unconfirmed, or points to non-state or negligence-based incidents",
    missionType: "Varies, includes criminal ransomware, unattributed espionage, and non-offensive governance cases",
    primarySectors: ["Multiple"],
    operationalPeriod: "Various",
    ttps: "Cases in this category span a wide range from sophisticated ransomware-as-a-service operations (Colonial Pipeline, Change Healthcare) to unattributed espionage (Oldsmar Water) to non-offensive governance cases (Ecuador data exposure). The common thread is the absence of confirmed state attribution, which itself carries analytical significance for understanding the governance response gap.",
    behavioralSignature: "The contested-attribution category is analytically significant precisely because the absence of clear attribution constrains governance responses. Criminal ransomware groups in this category often operate from jurisdictions that tolerate their activity, creating a state-responsibility gray zone. Non-offensive cases like Ecuador illustrate governance failures that exist independently of adversarial intent.",
    governanceFootprint: "Cases in this category have driven significant regulatory change (Colonial Pipeline → TSA pipeline directives; Change Healthcare → healthcare security mandates) despite the absence of clear state attribution, demonstrating that governance responses can be triggered by impact severity alone, independent of adversary identity.",
  },
];
