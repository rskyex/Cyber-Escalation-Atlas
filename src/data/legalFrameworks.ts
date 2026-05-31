export interface LegalRule {
  ruleId: string;
  name: string;
  description: string;
  cyberControversy: string;
  cases: { caseSlug: string; note: string }[];
}

export interface LegalFramework {
  id: string;
  name: string;
  rules: LegalRule[];
}

export const legalFrameworks: LegalFramework[] = [
  {
    id: "tallinn",
    name: "Tallinn Manual 2.0",
    rules: [
      {
        ruleId: "tallinn-r4",
        name: "Rule 4, State Responsibility",
        description: "A state bears international responsibility for a cyber operation attributable to it that constitutes a breach of an international obligation. Attribution requires that the operation was conducted by state organs or by persons acting under the direction or control of the state.",
        cyberControversy: "The threshold for 'direction or control' remains contested. States increasingly use proxy groups, contractors, and criminal organisations for cyber operations, making attribution under Rule 4 analytically complex. The 'effective control' vs. 'overall control' debate from ICJ and ICTY jurisprudence has no settled cyber-specific interpretation.",
        cases: [
          { caseSlug: "colonial-pipeline", note: "Criminal group operating from Russian territory raises questions about state tolerance as a basis for responsibility" },
          { caseSlug: "costa-rica-conti", note: "Conti's Russian nexus tested the boundary between criminal autonomy and state acquiescence" },
          { caseSlug: "wannacry", note: "State-linked group (Lazarus) using criminal ransomware tools blurs the state/non-state distinction" },
          { caseSlug: "cloud-hopper-apt10", note: "MSS Tianjin State Security Bureau association in the 2018 DOJ indictment tested 'direction or control' applied to a contractor model at allied scale" },
          { caseSlug: "salt-typhoon", note: "Jan 2025 OFAC designation of Sichuan Juxinhe Network Technology operationalised attribution of contractor activity to PRC state responsibility through sanctions rather than indictment" },
          { caseSlug: "belgacom-operation-socialist", note: "High-confidence technical attribution to a Five Eyes service produced no political-attribution chain; tests Rule 4 in the absence of victim-state willingness to invoke it against an ally" },
        ],
      },
      {
        ruleId: "tallinn-r14",
        name: "Rule 14, Due Diligence",
        description: "A state must not knowingly allow its territory to be used for cyber operations that adversely affect the rights of other states. The duty extends to taking feasible measures to halt ongoing operations and prevent future ones.",
        cyberControversy: "The scope of due diligence in cyberspace is deeply contested. Questions remain about what constitutes 'knowledge' of malicious activity originating from a state's territory, what 'feasible measures' are required, and whether the obligation is one of conduct or result.",
        cases: [
          { caseSlug: "colonial-pipeline", note: "Russia's failure to act against DarkSide operating from its territory tested due diligence limits" },
          { caseSlug: "volt-typhoon", note: "Pre-positioning from Chinese infrastructure raises due diligence questions about both origin and target states" },
          { caseSlug: "salt-typhoon", note: "PRC tolerance of contractor (Sichuan Juxinhe) operating from its territory against US telecommunications backbone tested due diligence; OFAC sanctions reframed the response as targeting the contractor directly rather than invoking PRC due-diligence obligations" },
          { caseSlug: "cloud-hopper-apt10", note: "MSS Tianjin contractor model raised due diligence questions across the 10+ jurisdictions whose downstream MSP clients were compromised" },
        ],
      },
      {
        ruleId: "tallinn-r30",
        name: "Rule 30, Distinction",
        description: "Parties to an armed conflict must distinguish between civilian objects and military objectives. Cyber attacks may only be directed at military objectives.",
        cyberControversy: "Dual-use infrastructure, telecommunications networks, power grids, cloud platforms serving both military and civilian users, makes distinction in cyberspace exceptionally difficult. A cyber operation targeting a military communication channel hosted on civilian infrastructure may inevitably affect civilian services.",
        cases: [
          { caseSlug: "viasat-kasat", note: "Satellite network serving both Ukrainian military and European civilians challenged distinction principle" },
          { caseSlug: "kyivstar", note: "Civilian telecom network destroyed during wartime; dual-use argument contested" },
          { caseSlug: "ukraine-power-grid-2015", note: "Civilian power distribution targeted with no clear military objective" },
        ],
      },
      {
        ruleId: "tallinn-r32",
        name: "Rule 32, Proportionality",
        description: "A cyber attack that may be expected to cause incidental civilian harm must not be excessive in relation to the concrete and direct military advantage anticipated.",
        cyberControversy: "Proportionality assessment in cyber operations is complicated by the difficulty of predicting cascading effects. Worm-like propagation (NotPetya), supply chain compromise (SolarWinds), and cross-border collateral damage challenge the ability to assess proportionality ex ante.",
        cases: [
          { caseSlug: "notpetya", note: "$10B+ in collateral damage across 65 countries far exceeded any conceivable military advantage against Ukraine" },
          { caseSlug: "stuxnet", note: "Targeted sabotage with limited collateral is often cited as proportionate; uncontrolled spread outside Iran complicates this assessment" },
        ],
      },
      {
        ruleId: "tallinn-r69",
        name: "Rule 69, Countermeasures",
        description: "An injured state may take proportionate countermeasures against a responsible state for the purpose of inducing compliance with the latter's international obligations.",
        cyberControversy: "Cyber countermeasures face unique challenges: the speed of cyber operations may not allow time for the prior notification traditionally required, and the reversibility of cyber effects complicates proportionality assessment. States disagree on whether 'hack back' constitutes a legitimate countermeasure.",
        cases: [
          { caseSlug: "iran-nuclear-cyber", note: "If Israel conducted cyber sabotage as a countermeasure to Iran's nuclear programme, the legal basis and proportionality remain highly contested" },
          { caseSlug: "albania-iran", note: "Albania's diplomatic severance could be seen as a non-cyber countermeasure; cyber-specific countermeasure options were limited" },
        ],
      },
      {
        ruleId: "tallinn-r80",
        name: "Rule 80, Intervention",
        description: "A state may not intervene, including by cyber means, in the internal or external affairs of another state regarding matters in which the state is permitted to decide freely.",
        cyberControversy: "The boundary between espionage (generally not prohibited) and intervention (prohibited) in cyberspace is unclear. Cyber operations that compromise electoral infrastructure or government decision-making systems may constitute intervention even without data manipulation, if they coerce or dictate outcomes in the target state's internal affairs.",
        cases: [
          { caseSlug: "australia-parliament", note: "Compromise of parliamentary and party networks during an election raised intervention questions despite no evidence of data manipulation" },
          { caseSlug: "albania-iran", note: "Destructive attack against government systems to punish political choices is a clear candidate for prohibited intervention" },
        ],
      },
    ],
  },
  {
    id: "un-charter",
    name: "UN Charter",
    rules: [
      {
        ruleId: "un-2-4",
        name: "Article 2(4), Prohibition on the Use of Force",
        description: "All Members shall refrain from the threat or use of force against the territorial integrity or political independence of any state. The prohibition is a cornerstone of the international legal order.",
        cyberControversy: "Whether cyber operations can constitute a 'use of force' remains the most consequential unresolved question in international cyber law. Most scholars agree that cyber operations causing physical damage or death cross the threshold, but operations causing massive economic disruption without physical damage, like NotPetya, occupy a gray zone.",
        cases: [
          { caseSlug: "stuxnet", note: "Physical destruction of centrifuges is the strongest candidate for a cyber 'use of force' in the dataset" },
          { caseSlug: "notpetya", note: "$10B in economic destruction without physical casualties tests whether non-kinetic harm can constitute force" },
          { caseSlug: "viasat-kasat", note: "Synchronized with kinetic military invasion, blurring the line between cyber and conventional use of force" },
        ],
      },
      {
        ruleId: "un-51",
        name: "Article 51, Self-Defence",
        description: "Nothing in the Charter shall impair the inherent right of individual or collective self-defence if an armed attack occurs against a Member of the United Nations.",
        cyberControversy: "The 'armed attack' threshold for triggering self-defence in response to a cyber operation is unresolved. If a cyber operation does not constitute an armed attack, the victim state cannot invoke Article 51 for a kinetic response, leaving it limited to countermeasures, retorsion, and diplomatic responses.",
        cases: [
          { caseSlug: "ukraine-power-grid-2015", note: "Grid attack causing civilian blackouts during geopolitical conflict tested whether self-defence was available as a legal response" },
          { caseSlug: "shamoon-aramco", note: "Massive economic disruption to a critical national asset raised questions about whether the armed-attack threshold was crossed" },
        ],
      },
    ],
  },
  {
    id: "ihl",
    name: "Geneva Conventions / IHL",
    rules: [
      {
        ruleId: "ihl-distinction",
        name: "Principle of Distinction",
        description: "Parties to a conflict must at all times distinguish between the civilian population and combatants, and between civilian objects and military objectives. Attacks may only be directed at military objectives.",
        cyberControversy: "Digital infrastructure is overwhelmingly dual-use. Cloud services, telecommunications networks, and internet exchange points serve both military and civilian users simultaneously. A cyber operation targeting military communications routed through civilian infrastructure may violate distinction if civilian harm is foreseeable and disproportionate.",
        cases: [
          { caseSlug: "kyivstar", note: "Destruction of a civilian telecom network during armed conflict raises fundamental distinction questions" },
          { caseSlug: "viasat-kasat", note: "Collateral effects on civilian broadband and wind turbines across NATO states challenged distinction compliance" },
          { caseSlug: "industroyer2", note: "Targeting civilian power grid during armed conflict; successfully defended but intent clearly violated distinction" },
        ],
      },
      {
        ruleId: "ihl-proportionality",
        name: "Principle of Proportionality",
        description: "An attack is prohibited if it may be expected to cause incidental loss of civilian life, injury to civilians, or damage to civilian objects that would be excessive in relation to the concrete and direct military advantage anticipated.",
        cyberControversy: "Cyber operations' cascading and unpredictable effects make ex ante proportionality assessment difficult. NotPetya's global spread from a Ukraine-targeted operation demonstrates how cyber weapons can produce disproportionate collateral damage far exceeding any intended military purpose.",
        cases: [
          { caseSlug: "notpetya", note: "Intended as Ukraine-targeted but caused $10B+ global damage, the clearest case of disproportionate cyber collateral" },
          { caseSlug: "wannacry", note: "NHS disruption affecting patient care raised proportionality concerns even for a state-linked criminal operation" },
        ],
      },
      {
        ruleId: "ihl-precaution",
        name: "Precaution in Attack",
        description: "Those who plan or decide upon an attack shall take all feasible precautions to avoid or minimize incidental civilian harm.",
        cyberControversy: "The obligation to take precautions is particularly challenging for cyber operations with autonomous propagation capabilities. Once deployed, worm-like malware cannot be recalled, and operators may have limited ability to constrain its spread, raising questions about whether deployment itself violates the precaution obligation.",
        cases: [
          { caseSlug: "stuxnet", note: "Designed with targeting constraints but still spread beyond Natanz, testing precautionary obligations" },
          { caseSlug: "notpetya", note: "No apparent precautionary measures to limit global propagation, suggesting precaution was not adequately considered" },
        ],
      },
    ],
  },
  {
    id: "gge-norms",
    name: "UN GGE Voluntary Norms (2015)",
    rules: [
      {
        ruleId: "gge-13a",
        name: "Norm 13(a), Cooperation on Security",
        description: "States should cooperate in developing and applying measures to increase stability and security in the use of ICTs, and to prevent ICT practices that are harmful or may pose threats to international peace and security.",
        cyberControversy: "The voluntary nature of GGE norms means cooperation remains discretionary. States invoke this norm selectively, cooperating on threats that align with their interests while declining cooperation on operations they sponsor or benefit from.",
        cases: [
          { caseSlug: "exchange-hafnium", note: "Unprecedented multilateral attribution cooperation demonstrated 13(a) in practice" },
          { caseSlug: "volt-typhoon", note: "Five Eyes cooperation on joint advisory represents the most robust implementation of 13(a) to date" },
        ],
      },
      {
        ruleId: "gge-13f",
        name: "Norm 13(f), Critical Infrastructure Protection",
        description: "A state should not conduct or knowingly support ICT activity that intentionally damages critical infrastructure or otherwise impairs the use and operation of critical infrastructure to provide services to the public.",
        cyberControversy: "This is the most frequently cited and most frequently violated norm in the dataset. Its voluntary status means there are no enforcement mechanisms beyond political pressure and countermeasures. Repeated violations without meaningful consequences risk rendering the norm aspirational rather than operative.",
        cases: [
          { caseSlug: "ukraine-power-grid-2015", note: "First confirmed violation of 13(f), cyber attack causing civilian power outage" },
          { caseSlug: "notpetya", note: "Global collateral damage to critical infrastructure across 65+ countries" },
          { caseSlug: "colonial-pipeline", note: "Criminal ransomware disrupting critical fuel infrastructure; 13(f) applicability to non-state actors debated" },
          { caseSlug: "kyivstar", note: "Destruction of civilian telecom infrastructure during armed conflict" },
          { caseSlug: "salt-typhoon", note: "PRC compromise of US lawful-intercept and core telecom systems tested 13(f) coverage of espionage-without-disruption against critical infrastructure" },
          { caseSlug: "belgacom-operation-socialist", note: "Allied compromise of EU member state's telecom backbone predates the 2015 norm but is widely retro-applied as the paradigm case of 13(f) ambiguity when the operator is itself a 13(f) drafter" },
        ],
      },
      {
        ruleId: "gge-13j",
        name: "Norm 13(j), Vulnerability Disclosure",
        description: "States should encourage responsible reporting of ICT vulnerabilities and share associated information on available remedies to limit and possibly eliminate potential threats.",
        cyberControversy: "Tensions between intelligence collection value and public safety create persistent pressure to stockpile rather than disclose vulnerabilities. WannaCry's use of a leaked NSA exploit dramatically illustrated the risks of vulnerability hoarding, but no state has committed to full disclosure practices.",
        cases: [
          { caseSlug: "wannacry", note: "Used leaked NSA exploit, the defining case for vulnerability equities debate" },
          { caseSlug: "exchange-hafnium", note: "Zero-day exploitation at scale before patches were available raised disclosure timeline questions" },
          { caseSlug: "storm-0558", note: "Forged signing key exploit highlighted cloud authentication vulnerability disclosure gaps" },
        ],
      },
    ],
  },
];
