import type { AIAttributionExploratoryEntry } from "@/lib/types/aiAttributionExploratory";

/**
 * Banner lines rendered at the top of the exploratory sheet. Carries the
 * scope warning and the empty-Category-A finding so a downstream reader
 * who opens the sheet in isolation cannot mistake it for coded findings.
 */
export const aiAttributionExploratoryBanner: string[] = [
  "EXPLORATORY SCAFFOLDING — NOT PART OF THE 36-INCIDENT MAIN CORPUS. Not counted toward any case totals.",
  "Scope: cases where AI/ML output entered the CHARACTERISATION or ATTRIBUTION of a cyber event (the naming side). EXCLUDES cases where AI was merely used to conduct an attack (e.g. ML-enabled phishing).",
  "Empirical finding: in the open record we could verify, ZERO (0) discrete cyber incidents have been publicly attributed to a specific actor on the basis of AI/ML output. Every entry below is a CAPABILITY (Category B), not a coded incident (Category A).",
  "Verifiability is marked honestly per source: Confirmed = primary source fetched and supports the claim directly; Reported = secondary reporting or search snippet only; Inferred = logical inference, not directly stated.",
];

/**
 * Capabilities and policy postures that COULD enter an attribution decision,
 * with the public role of AI/ML in each. None are coded findings; mixing
 * them into the main corpus would corrupt its controlled scheme.
 */
export const aiAttributionExploratory: AIAttributionExploratoryEntry[] = [
  {
    name: "Mandiant ATOMIC clustering model",
    year: "2018 deployed; described 2020 & 2024",
    category: "B_Capability",
    system:
      "TF-IDF plus cosine-similarity document clustering over Mandiant's intrusion-artefact corpus; produces a similarity score between an unattributed cluster (UNC) and known APT/FIN groups.",
    judgmentEntered:
      "Suggests which uncategorised activity clusters may belong together or to a known group; surfaces candidate associations for analyst review.",
    authorityAugmented:
      "Augments Mandiant analysts; vendor framing is explicit that the model 'assist[s]' and 'augment[s]' human intelligence experts rather than producing the verdict.",
    publicDisclosure: "Yes",
    sources: [
      {
        title:
          "Mandiant — Clustering and associating attacker activity at scale",
        url: "https://cloud.google.com/blog/topics/threat-intelligence/clustering-and-associating-attacker-activity-at-scale/",
        fetched: true,
      },
      {
        title: "Mandiant — How Mandiant tracks uncategorised threat actors",
        url: "https://cloud.google.com/blog/topics/threat-intelligence/how-mandiant-tracks-uncategorized-threat-actors",
        fetched: true,
      },
    ],
    verifiability: "Confirmed",
    accountabilityNote:
      "Decision-maker remains Mandiant's analyst team; ML output functions as internal corroboration. No public Mandiant attribution names the model's output as the decisive evidence, so accountability for any published call is still traceable to named humans.",
  },
  {
    name: "Microsoft MSTIC threat-actor taxonomy (Storm / weather naming)",
    year: "Current taxonomy from April 2023",
    category: "B_Capability",
    system:
      "Tracks activity clusters as DEV-#### then Storm-#### until 'high confidence about origin or identity' is reached; uses telemetry, analytics, and ML-assisted clustering across Microsoft signal. The 'MSTIC Librarian' approves names.",
    judgmentEntered:
      "Decides when a cluster has enough signal to be promoted from temporary (Storm-####) to a named actor; partitions the threat-actor namespace Microsoft uses in public attributions.",
    authorityAugmented:
      "Augments Microsoft analysts; the human MSTIC team remains the named public decision-maker.",
    publicDisclosure: "Partial",
    sources: [
      {
        title:
          "Microsoft — Volt Typhoon targets US critical infrastructure (moderate-confidence attribution language; does not cite ML as basis)",
        url: "https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/",
        fetched: true,
      },
    ],
    verifiability: "Confirmed",
    accountabilityNote:
      "Process is public, but the relative weight of ML versus analyst judgment in any specific naming decision is not broken out. Accountability is nominally human, but the opacity of the cluster-to-name pipeline means the public cannot verify which inputs drove a given call.",
  },
  {
    name: "CISA Cyber Analytic and Data System (CADS) / EINSTEIN successor",
    year: "2023 announcement; rollout in progress",
    category: "B_Capability",
    system:
      "Unsupervised ML over EINSTEIN sensor logs to 'detect trends, patterns, and anomalies' and surface candidates for analyst review; described in CISA program materials and DHS AI use-case inventory.",
    judgmentEntered:
      "Detection and triage of suspicious activity on federal networks; narrows scope of analysis. Not framed as an attribution tool.",
    authorityAugmented:
      "Augments CISA SOC analysts upstream of any attribution.",
    publicDisclosure: "Yes",
    sources: [
      {
        title: "CISA — Cyber Analytic and Data System (CADS) programme page",
        url: "https://www.cisa.gov/resources-tools/programs/cyber-analytic-and-data-system",
        fetched: false,
      },
      {
        title: "CISA — AI Use Cases",
        url: "https://www.cisa.gov/ai/cisa-use-cases",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "CADS is described publicly as detection/triage, not attribution. No public CISA attribution decision has been tied to a specific CADS output. Accountability for any attribution remains with CISA leadership and analyst chain.",
  },
  {
    name: "CISA Automated Indicator Sharing (AIS) confidence / opinion scoring",
    year: "Framework V1.0 (current)",
    category: "B_Capability",
    system:
      "STIX-based scoring framework: submitters attach a 'confidence' value to Indicator objects; CISA adds an 'opinion' value via a documented enrichment framework. The scores are set by people (submitter or CISA per rubric), not produced autonomously by an ML model.",
    judgmentEntered:
      "Numerical confidence on individual threat indicators flowing through the AIS ecosystem; influences downstream consumer prioritisation.",
    authorityAugmented:
      "Encodes submitter / CISA analyst judgment in a machine-readable form.",
    publicDisclosure: "Yes",
    sources: [
      {
        title:
          "CISA — AIS Scoring Framework Used for Indicator Enrichment (V1.0)",
        url: "https://www.cisa.gov/resources-tools/resources/automated-indicator-sharing-ais-scoring-framework-used-indicator-enrichment",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "Often cited as an example of 'AI confidence scoring' but the scores are produced by humans following a rubric. No public attribution has been based on an AIS confidence score as a citable evidentiary input. Accountability rests with the named submitter.",
  },
  {
    name: "CISA Roadmap for Artificial Intelligence (Nov 2023)",
    year: "2023",
    category: "B_Capability",
    system:
      "Policy roadmap setting five lines of effort for CISA's AI adoption: cyber-defence triage, anomaly detection, malware analysis, vulnerability remediation, and workforce / governance support.",
    judgmentEntered:
      "Defines the SCOPE of AI use at CISA; relevant here as a negative finding — attribution / characterisation of incidents to specific actors is NOT listed among the published AI use cases.",
    authorityAugmented:
      "Sets institutional direction; no operational attribution function created.",
    publicDisclosure: "Yes",
    sources: [
      {
        title:
          "CISA — Releases Roadmap for Artificial Intelligence Adoption (news release)",
        url: "https://www.cisa.gov/news-events/alerts/2023/11/14/cisa-releases-roadmap-artificial-intelligence-adoption",
        fetched: false,
      },
      {
        title: "CISA — AI Use Cases",
        url: "https://www.cisa.gov/ai/cisa-use-cases",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "Direct fetch of the PDF was blocked (HTTP 403); secondary summaries and the CISA use-case page consistently show no attribution use case. The negative finding — that the most authoritative US public statement of AI cyber-defence ambitions does not include attribution — is itself relevant for the paper.",
  },
  {
    name: "CrowdStrike Charlotte AI / Falcon adversary association",
    year: "Charlotte AI launched 2023; agentic features 2024-2025",
    category: "B_Capability",
    system:
      "Generative-AI assistant layered over CrowdStrike Falcon. Vendor materials state it 'can automatically associate detected activities with known threat actors' using CrowdStrike's adversary database.",
    judgmentEntered:
      "Surfaces likely-actor associations to SOC analysts inside customer environments; speeds triage.",
    authorityAugmented:
      "Augments customer SOC analysts; CrowdStrike Intelligence remains the named decision-maker for any public actor profile.",
    publicDisclosure: "Partial",
    sources: [
      {
        title: "CrowdStrike — Falcon UX transformation with Charlotte AI",
        url: "https://www.crowdstrike.com/en-us/blog/crowdstrike-transforms-falcon-ux-charlotte-ai/",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "Vendor marketing source only; no public attribution decision documents Charlotte AI output as the basis. The 'can automatically associate' framing creates an accountability ambiguity if a customer cites Charlotte's output externally without naming a human analyst.",
  },
  {
    name: "USCYBERCOM / Army Cyber Command 'Panoptic Junction' pilot",
    year: "Piloted 2024",
    category: "B_Capability",
    system:
      "DoD AI pilot for continuous security monitoring, threat-intel correlation, and anomaly detection on military networks. Framed as detection / monitoring, not attribution.",
    judgmentEntered:
      "Anomaly surfacing and correlation across data sources; upstream of any attribution.",
    authorityAugmented:
      "Augments USCYBERCOM / Army Cyber analysts.",
    publicDisclosure: "Yes",
    sources: [
      {
        title:
          "DefenseScoop — Cybercom, Army Cyber Command pilot 'Panoptic Junction' AI capability",
        url: "https://defensescoop.com/2024/10/30/cybercom-army-cyber-command-panoptic-junction-artificial-intelligence/",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "No public attribution decision tied to its output. Command chain remains the named decision-maker.",
  },
  {
    name: "CSE Canada AI Strategy",
    year: "2024",
    category: "B_Capability",
    system:
      "CSE publicly states use of AI/ML for malware classification and pattern detection in defence of federal and critical-infrastructure systems.",
    judgmentEntered:
      "Malware family classification and anomaly detection; described as defensive, not attributive.",
    authorityAugmented:
      "Augments CSE analysts.",
    publicDisclosure: "Yes",
    sources: [
      {
        title:
          "CSE — Communications Security Establishment Canada Artificial Intelligence Strategy",
        url: "https://www.cse-cst.gc.ca/en/mission/research-cse/communications-security-establishment-canada-artificial-intelligence-strategy",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "No public CSE attribution traced to a specific ML output. Accountability remains with CSE leadership.",
  },
  {
    name: "UK NCSC and Australia ACSC AI posture (combined)",
    year: "Ongoing",
    category: "B_Capability",
    system:
      "NCSC publishes ML principles and points to the UK Professional Development Framework for all-source intelligence assessment as the attribution-methodology baseline — explicitly steering attribution toward human structured analytic techniques rather than ML output. ACSC public reporting on AI focuses on AI as a threat vector and on detection tooling, not on AI as an attribution basis.",
    judgmentEntered:
      "Policy posture: AI used for defence, classification, triage; attribution remains a human structured-analytic process.",
    authorityAugmented:
      "Neither agency publicly delegates an attribution call to an ML output.",
    publicDisclosure: "Yes",
    sources: [
      {
        title: "NCSC — Principles for the security of machine learning",
        url: "https://www.ncsc.gov.uk/collection/machine-learning",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "The most explicit allied posture: attribution methodology is anchored to human SAT, not to ML output. Accountability is preserved by design.",
  },
  {
    name: "DoD Project Maven",
    year: "2017 origin; cyber data sources reported integrated by 2024; LLM features added 2025",
    category: "B_Capability",
    system:
      "DoD ML platform; CENTCOM's instance reportedly integrates 179 data sources including cyber; generative-AI features added in 2025.",
    judgmentEntered:
      "Cross-source pattern detection; primarily ISR-oriented, with cyber data as one input.",
    authorityAugmented:
      "Augments DoD analysts and operators.",
    publicDisclosure: "Partial",
    sources: [
      {
        title: "Wikipedia — Project Maven (overview)",
        url: "https://en.wikipedia.org/wiki/Project_Maven",
        fetched: false,
      },
      {
        title: "GlobalSecurity.org — Project Maven",
        url: "https://www.globalsecurity.org/intell/systems/maven.htm",
        fetched: false,
      },
    ],
    verifiability: "Reported",
    accountabilityNote:
      "No public cyber attribution decision tied to Maven output. The opacity of military targeting / attribution chains makes future accountability gaps a foreseeable concern even though none is documented today.",
  },
];

/**
 * Borderline cases the research considered and rejected, kept here so the
 * paper's negative finding is auditable and a future reviewer can see the
 * lines that were drawn.
 */
export const aiAttributionRejectedBorderlines: {
  name: string;
  reason: string;
  source?: string;
}[] = [
  {
    name: "Microsoft Volt Typhoon attribution (May 2023)",
    reason:
      "Microsoft used 'moderate confidence' language but did not name AI/ML output as evidentiary basis. The MSTIC clustering process is a Category B capability above; the attribution itself is a human call.",
    source:
      "https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/",
  },
  {
    name: "Microsoft + OpenAI 'Forest Blizzard / Charcoal Typhoon' disclosure (Feb 2024)",
    reason:
      "This was attribution of threat actors' USE of AI, not an AI-driven attribution. Out of scope per the exclusion rule.",
  },
  {
    name: "Cybercheck (criminal-case AI tool)",
    reason:
      "An AI/ML tool whose outputs have been disputed and excluded by judges in Ohio and New York. But Cybercheck is used in general criminal investigations (suspect placement via OSINT), not for cyber-incident characterisation or nation-state attribution — out of scope.",
  },
  {
    name: "WhisperGate retrospective ML analysis (arXiv 2025)",
    reason:
      "Academic post-hoc ML applied to a 2022 attribution. The original US/UK attribution to Russia did not cite ML output, so this does not qualify as an AI-driven attribution decision.",
  },
  {
    name: "US indictments of GRU / MSS officers (2018, 2020, 2024)",
    reason:
      "Searched and found no indictment, sanctions notice, or court filing citing AI/ML output as evidence. Vendor reports referenced by government rely on analyst attribution.",
  },
];
