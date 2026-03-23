import { PageHeader, SectionWrapper } from "@/components/ui";

// ---------------------------------------------------------------------------
// Section shell component — consistent heading + placeholder prose container
// ---------------------------------------------------------------------------

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-xs font-mono text-teal-600 dark:text-teal-400 shrink-0">
          {number}
        </span>
        <h2 className="text-xl font-bold text-navy dark:text-offwhite tracking-tight">
          {title}
        </h2>
      </div>
      <div className="pl-8 space-y-3 text-sm text-slate dark:text-navy-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function FrameworkSection({
  id,
  name,
  citation,
  children,
}: {
  id: string;
  name: string;
  citation: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 p-5 rounded-lg border border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/20">
      <h4 className="text-base font-bold text-navy dark:text-offwhite mb-1">
        {name}
      </h4>
      <p className="text-xs font-mono text-slate dark:text-navy-400 mb-3">
        {citation}
      </p>
      <div className="space-y-2.5 text-sm text-slate dark:text-navy-200 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table of contents
// ---------------------------------------------------------------------------

const TOC = [
  { id: "purpose", number: "01", title: "Purpose Statement" },
  { id: "scope", number: "02", title: "Scope of the Platform" },
  { id: "inclusion", number: "03", title: "Inclusion Criteria" },
  { id: "sources", number: "04", title: "Source Hierarchy" },
  { id: "classification", number: "05", title: "Classification Logic" },
  { id: "limitations", number: "06", title: "Limitations" },
  { id: "attribution", number: "07", title: "Analytic Caution on Attribution" },
  { id: "behavior-vs-law", number: "08", title: "Operational Behaviour vs. Legal Interpretation" },
  { id: "foundations", number: "09", title: "Theoretical Foundations" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MethodologyPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Methodology"
        subtitle="Transparency in analytical methodology is essential for credibility. This page documents the frameworks, criteria, standards, and theoretical commitments used throughout the Atlas."
      />

      {/* Table of contents */}
      <nav className="mb-12 p-5 rounded-lg border border-navy-200/20 dark:border-navy-600/25 bg-navy-50/30 dark:bg-navy-800/15">
        <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-3">
          Contents
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {TOC.map(({ id, number, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-baseline gap-2 text-sm text-slate dark:text-navy-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400">
                  {number}
                </span>
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="space-y-12 max-w-3xl">
        {/* 01 — Purpose */}
        <Section id="purpose" number="01" title="Purpose Statement">
          <p>
            The Cyber Escalation Atlas is a structured analytical platform for
            examining how cyber operations escalate, what restraint looks like,
            and how governance frameworks respond. It is designed for teaching,
            policy analysis, and research — not threat monitoring or operational
            intelligence.
          </p>
          <p>
            The platform interprets incidents as strategic behaviours — actions
            taken by states and state-affiliated actors within a political
            context — rather than as isolated technical events or spectacles of
            disruption.
          </p>
        </Section>

        {/* 02 — Scope */}
        <Section id="scope" number="02" title="Scope of the Platform">
          <p>
            The Atlas covers state and state-affiliated cyber operations that
            have crossed a threshold of strategic significance: operations that
            triggered governance responses, tested international norms, or
            produced effects beyond the immediate target. Purely criminal
            activity without state nexus is excluded unless it provoked a
            state-level response.
          </p>
          <p>
            Geographic and temporal scope is determined by data availability
            and analytical value, not by an attempt to be exhaustive. The
            dataset is selective by design.
          </p>
        </Section>

        {/* 03 — Inclusion criteria */}
        <Section id="inclusion" number="03" title="Inclusion Criteria">
          <p>
            Each incident in the dataset must satisfy at least three of the
            following conditions to be included:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attributed (publicly or by government statement) to a state or state-affiliated actor</li>
            <li>Produced effects beyond the immediate target (collateral, cascading, or cross-border)</li>
            <li>Triggered a formal governance response (attribution statement, sanctions, indictment, regulatory change)</li>
            <li>Documented by at least two independent source categories (government, vendor, academic, journalistic, legal)</li>
            <li>Relevant to at least two of the three analytical lenses (escalation, infrastructure, governance)</li>
          </ul>
          <p>
            These criteria are applied with analytical judgement, not
            mechanically. Borderline cases are included when they offer
            distinctive teaching value.
          </p>
        </Section>

        {/* 04 — Source hierarchy */}
        <Section id="sources" number="04" title="Source Hierarchy">
          <p>
            Sources are weighted by category. The hierarchy reflects
            reliability and proximity to evidence, not a claim that any single
            category is sufficient:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Government advisories and legal documents</strong> — CISA alerts, DOJ indictments, court filings, official attribution statements</li>
            <li><strong>Vendor and technical reports</strong> — threat intelligence publications from established cybersecurity firms with direct forensic access</li>
            <li><strong>Academic and policy analysis</strong> — peer-reviewed research, policy institute publications, structured case analyses</li>
            <li><strong>Investigative journalism</strong> — long-form reporting from outlets with established track records in cyber and national security</li>
          </ol>
          <p>
            No single source is treated as definitive. Assessments are built
            from corroboration across categories.
          </p>
        </Section>

        {/* 05 — Classification logic */}
        <Section id="classification" number="05" title="Classification Logic">
          <p>
            Incidents are classified along several dimensions: incident type,
            escalation tier, attribution confidence, target sectors, governance
            flags, and derived scores (unpeace, entanglement). Each dimension
            uses a controlled vocabulary defined in the type system.
          </p>
          <p>
            The six-tier escalation ladder (probing, intrusion, disruption,
            degradation, destruction, strategic impact) describes qualitative
            shifts in severity, not a linear progression. Assignment to a tier
            reflects peak observed effect, not intent.
          </p>
          <p>
            Derived scores (unpeace 0–100, entanglement 1–10) are composite
            heuristics, not measurements. They are designed to support
            comparison and teaching, not to substitute for case-level analysis.
          </p>
        </Section>

        {/* 06 — Limitations */}
        <Section id="limitations" number="06" title="Limitations">
          <p>
            This platform has significant limitations that users should bear in
            mind:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The dataset is selective, not comprehensive. Important incidents may be absent due to data availability or scope constraints.</li>
            <li>All information is derived from open sources. Classified or non-public evidence is not available to this analysis.</li>
            <li>Attribution assessments reflect the weight of publicly available evidence. They are not intelligence judgements and carry inherent uncertainty.</li>
            <li>Escalation tiers and derived scores involve analytical judgement. Reasonable analysts may disagree on classification.</li>
            <li>Governance flag assessments indicate whether a mechanism was triggered, not whether it was effective or appropriate.</li>
            <li>The platform does not model intent. Observed effects and documented responses are the basis for analysis.</li>
          </ul>
          <p>
            These limitations are features of the problem, not deficiencies
            of the platform. Cyber conflict analysis operates under
            irreducible uncertainty.
          </p>
        </Section>

        {/* 07 — Attribution caution */}
        <Section id="attribution" number="07" title="Analytic Caution on Attribution">
          <p>
            Attribution of cyber operations to state actors is one of the most
            contested areas in cybersecurity. The Atlas uses a structured
            confidence scale (confirmed, high, moderate, low, contested) but
            this should not be mistaken for certainty.
          </p>
          <p>
            Public attribution by governments reflects policy decisions as much
            as technical evidence. States may attribute for deterrence purposes,
            may decline to attribute for diplomatic reasons, or may attribute
            with varying standards of evidence. The Atlas records these
            attributions as data points, not as verified truths.
          </p>
          <p>
            Users should treat all attribution assessments as provisional and
            read them alongside the cited source material.
          </p>
        </Section>

        {/* 08 — Behaviour vs. law */}
        <Section id="behavior-vs-law" number="08" title="Operational Behaviour vs. Legal Interpretation">
          <p>
            The Atlas describes what states did and how the international
            community responded. It does not offer legal opinions on whether
            specific operations constituted violations of international law.
          </p>
          <p>
            Terms like &ldquo;norm violation&rdquo; refer to assessments made
            by governments, international bodies, or legal scholars — not to
            findings by this platform. Where legal interpretation is
            contested, the Atlas notes the contestation rather than resolving
            it.
          </p>
          <p>
            This distinction matters because the same operation can be
            described as lawful espionage, a sovereignty violation, or a use
            of force depending on the legal framework applied. The Atlas
            presents the operation and the debate, not a verdict.
          </p>
        </Section>

        {/* 09 — Theoretical foundations */}
        <Section id="foundations" number="09" title="Theoretical Foundations">
          <p>
            The Atlas draws on several bodies of scholarship to structure its
            analysis. These frameworks inform how incidents are categorised,
            compared, and interpreted — but none of them fully settles the
            analytical questions at stake. Where a framework is useful, we say
            so; where contestation remains, we note that too.
          </p>

          <div className="space-y-5 mt-5">
            {/* Kello */}
            <FrameworkSection
              id="fw-kello"
              name="Kello — The Virtual Weapon and International Order"
              citation="Kello, L. The Virtual Weapon and International Order. Yale University Press, 2017."
            >
              <p>
                Lucas Kello argues that cyber operations occupy an analytically
                distinct space between peace and war — what he terms
                &ldquo;unpeace.&rdquo; In this framing, states can impose
                significant strategic costs on one another through cyber means
                without crossing the threshold of armed conflict as
                traditionally understood. The concept is useful because it
                names a condition that existing international law and
                strategic theory struggle to categorise: sustained,
                consequential hostility that falls below the use-of-force
                threshold.
              </p>
              <p>
                The Atlas adopts the &ldquo;unpeace&rdquo; concept as the
                basis for its 0–100 scoring axis. This is a deliberate
                analytical choice, not an endorsement of every claim in
                Kello&apos;s argument. His work has been criticised for
                understating the degree to which existing legal frameworks can
                accommodate cyber operations, and for overstating the novelty
                of the strategic problems they pose. The unpeace framing is
                most helpful as a teaching tool for discussing the grey zone;
                it is less useful as a predictive model.
              </p>
              <p className="text-xs text-navy-400 dark:text-navy-500 italic">
                Contestation: Whether &ldquo;unpeace&rdquo; constitutes a
                genuinely new strategic condition or a relabelling of
                familiar coercive competition remains debated. See Rid (2013)
                for a sceptical view.
              </p>
            </FrameworkSection>

            {/* Rid & Buchanan */}
            <FrameworkSection
              id="fw-rid-buchanan"
              name="Rid & Buchanan — Attributing Cyber Attacks"
              citation="Rid, T. & Buchanan, B. 'Attributing Cyber Attacks.' Journal of Strategic Studies, 38(1–2), 2015, pp. 4–37."
            >
              <p>
                Thomas Rid and Ben Buchanan propose a layered model of
                attribution that distinguishes technical attribution (linking
                an operation to infrastructure and tools), operational
                attribution (linking it to an organisation or unit), and
                political attribution (a government&apos;s public decision to
                name a responsible state). This layered approach helps explain
                why attribution is simultaneously more feasible than early
                sceptics claimed and more politically fraught than technical
                analysts sometimes acknowledge.
              </p>
              <p>
                The Atlas uses this framework to structure its attribution
                confidence scale. &ldquo;Confirmed&rdquo; attribution
                typically means all three layers are supported by public
                evidence. &ldquo;Contested&rdquo; often reflects disagreement
                at the political layer — the technical evidence may point in
                one direction while governments dispute responsibility or
                decline to attribute formally.
              </p>
              <p className="text-xs text-navy-400 dark:text-navy-500 italic">
                Contestation: The Rid–Buchanan model treats attribution as
                progressively resolvable given enough evidence. Critics note
                that sophisticated adversaries can deliberately pollute each
                layer (false flags, shared tooling, borrowed infrastructure),
                making confident attribution a matter of analytic judgement
                rather than forensic proof.
              </p>
            </FrameworkSection>

            {/* Schelling */}
            <FrameworkSection
              id="fw-schelling"
              name="Schelling — Arms and Influence"
              citation="Schelling, T.C. Arms and Influence. Yale University Press, 1966."
            >
              <p>
                Thomas Schelling&apos;s distinction between compellence
                (using force to change an adversary&apos;s behaviour) and
                deterrence (threatening force to prevent it) provides the
                analytical backbone for the Atlas&apos;s escalation lens.
                Schelling&apos;s insight that coercive power depends on
                credible communication of capability and resolve — not on
                the force itself — translates directly to cyber operations,
                where the relationship between capability, demonstration,
                and restraint is central.
              </p>
              <p>
                The Atlas applies this framework in the compellence-versus-deterrence
                split view, classifying operations by their primary
                coercive function. Destructive operations that impose costs
                lean toward compellence; espionage campaigns that
                demonstrate access without exercising it lean toward
                deterrence. This is a heuristic, not a binary: many
                operations serve both functions simultaneously, and the
                classification reflects the dominant observable logic rather
                than verified intent.
              </p>
              <p className="text-xs text-navy-400 dark:text-navy-500 italic">
                Contestation: Schelling developed his framework for nuclear
                strategy, where capabilities are demonstrable and costs are
                existential. Cyber operations differ on both counts — capabilities
                are consumed on use, and costs are often ambiguous. Whether
                Schelling&apos;s escalation logic transfers cleanly to cyberspace
                is one of the central open questions in the field.
              </p>
            </FrameworkSection>

            {/* Tallinn Manual 2.0 */}
            <FrameworkSection
              id="fw-tallinn"
              name="Tallinn Manual 2.0 on the International Law Applicable to Cyber Operations"
              citation="Schmitt, M.N. (ed.). Tallinn Manual 2.0 on the International Law Applicable to Cyber Operations. Cambridge University Press, 2017."
            >
              <p>
                The Tallinn Manual 2.0, produced by an international group
                of legal experts convened by the NATO Cooperative Cyber
                Defence Centre of Excellence, represents the most
                comprehensive attempt to map existing international law onto
                cyber operations. Its 154 rules cover sovereignty, due
                diligence, jurisdiction, the law of armed conflict, and state
                responsibility. The Atlas references specific Tallinn rules
                in its governance flag citations — particularly Rule 4
                (sovereignty), Rule 6 (due diligence), Rule 20
                (countermeasures), and Rule 32 (intervention).
              </p>
              <p>
                The Manual is useful because it provides a shared vocabulary
                for debating the legality of cyber operations. It is not,
                however, binding international law. It reflects the views of
                its expert group, and several of its positions are contested
                by states — most notably on whether sovereignty constitutes
                a primary rule of international law that can be independently
                violated by cyber operations, or merely a principle that
                underlies other rules. China, Russia, and several other
                states have declined to endorse the Manual&apos;s framework.
              </p>
              <p className="text-xs text-navy-400 dark:text-navy-500 italic">
                Contestation: The Manual&apos;s state-centric, Western-legal
                framework has been criticised for marginalising alternative
                governance traditions and for assuming that existing
                international humanitarian law applies to cyber operations
                without adaptation. The sovereignty question remains
                genuinely unresolved in state practice.
              </p>
            </FrameworkSection>

            {/* Valeriano & Maness */}
            <FrameworkSection
              id="fw-valeriano-maness"
              name="Valeriano & Maness — Cyber War versus Cyber Realities"
              citation="Valeriano, B. & Maness, R.C. Cyber War versus Cyber Realities: Cyber Conflict in the International System. Oxford University Press, 2015."
            >
              <p>
                Brandon Valeriano and Ryan Maness provide the most
                systematic empirical challenge to the &ldquo;cyber
                doom&rdquo; narrative. Drawing on a dataset of interstate
                cyber incidents, they demonstrate that states overwhelmingly
                exercise restraint in cyberspace — most operations remain at
                low severity, escalation to destructive effects is rare, and
                cyber operations have not triggered kinetic military
                responses. Their concept of &ldquo;cyber restraint&rdquo;
                informs the Atlas&apos;s treatment of restraint factors as
                analytically important data, not merely the absence of
                escalation.
              </p>
              <p>
                The Atlas incorporates this perspective by tracking restraint
                factors alongside threshold crossings in every case. The
                escalation ladder is not a conveyor belt — most incidents
                cluster at the lower tiers, and understanding why states
                choose not to escalate is as important as understanding when
                they do.
              </p>
              <p className="text-xs text-navy-400 dark:text-navy-500 italic">
                Contestation: Critics argue that Valeriano and Maness
                undercount significant operations by using a narrow
                definition of &ldquo;cyber conflict&rdquo; and that their
                dataset ends before several of the most consequential
                incidents in the Atlas (NotPetya, SolarWinds, Viasat). The
                restraint thesis may also reflect the period studied rather
                than an enduring strategic pattern.
              </p>
            </FrameworkSection>

            {/* Acton */}
            <FrameworkSection
              id="fw-acton"
              name="Acton — Cyber Weapons and Nuclear Stability"
              citation="Acton, J.M. 'Cyber Weapons and Precision-Guided Munitions.' In Cross-Domain Deterrence, ed. Lindsay & Gartzke. Oxford University Press, 2019. See also: 'Escalation through Entanglement.' International Security, 43(1), 2018, pp. 56–99."
            >
              <p>
                James Acton introduces the concept of &ldquo;entanglement&rdquo;
                to describe how cyber capabilities create inadvertent
                escalation pathways — particularly between conventional and
                nuclear domains. When cyber intrusions target dual-use
                systems (satellite communications used by both conventional
                forces and nuclear command-and-control, for instance), the
                defender cannot easily distinguish between espionage,
                conventional preparation, and a strategic first-strike
                enabler. This ambiguity can compress decision timelines and
                increase the risk of miscalculated escalation.
              </p>
              <p>
                The Atlas draws on this framework for its entanglement score,
                which measures how many sectors, countries, and collateral
                dimensions an incident touches. Operations that span multiple
                sectors or affect dual-use infrastructure score higher,
                reflecting the greater risk of unintended escalation
                dynamics. The space and nuclear sector cards in the
                infrastructure lens are directly informed by Acton&apos;s
                analysis of the cyber-nuclear nexus.
              </p>
              <p className="text-xs text-navy-400 dark:text-navy-500 italic">
                Contestation: The entanglement thesis rests on assumptions
                about decision-making under uncertainty that are difficult
                to test empirically. Critics note that nuclear-armed states
                have strong institutional incentives to avoid miscalculation,
                and that the entanglement risk may be overstated relative to
                the stabilising effects of mutual vulnerability. The debate
                is ongoing and unresolved.
              </p>
            </FrameworkSection>
          </div>

          {/* Synthesis note */}
          <div className="mt-6 p-4 rounded-lg border border-navy-200/15 dark:border-navy-600/20 bg-navy-50/20 dark:bg-navy-800/15">
            <p className="text-xs font-semibold text-navy dark:text-navy-100 uppercase tracking-wider mb-1.5">
              On using these frameworks together
            </p>
            <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
              These six bodies of work do not form a unified theory. They
              address different questions (What is the strategic logic? How
              do we know who did it? What does the law say? Do states actually
              escalate? Where are the inadvertent risks?) and sometimes
              reach incompatible conclusions. The Atlas uses them as
              complementary lenses, not as a single coherent model. Where
              they disagree — on whether cyber operations are genuinely
              novel, on whether existing law is adequate, on whether
              restraint is durable — the Atlas presents the disagreement
              rather than resolving it. Analytical honesty requires
              acknowledging that the field has not settled these questions.
            </p>
          </div>
        </Section>
      </div>

      {/* Closing note */}
      <div className="mt-14 max-w-3xl p-5 rounded-lg border-l-4 border-teal-500 bg-teal-50/40 dark:bg-teal-900/10">
        <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
          On reading this page
        </p>
        <p className="text-sm text-navy dark:text-offwhite leading-relaxed">
          Methodology is not a formality. The choices documented here —
          what to include, how to classify, which frameworks to apply —
          shape every analytical output in the Atlas. Users who disagree
          with these choices should be able to trace them here and form
          their own judgements accordingly.
        </p>
      </div>
    </SectionWrapper>
  );
}
