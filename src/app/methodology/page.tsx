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
        <span className="text-xs font-mono text-atlas-600 dark:text-atlas-400 shrink-0">
          {number}
        </span>
        <h2 className="text-xl font-bold text-ink dark:text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="pl-8 space-y-3 text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
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
    <div id={id} className="scroll-mt-24 p-5 rounded-xl border border-transparent dark:border-white/[0.04] bg-ink-50/50 dark:bg-white/[0.03]">
      <h4 className="text-base font-bold text-ink dark:text-white mb-1">
        {name}
      </h4>
      <p className="text-xs font-mono text-steel-500 dark:text-ink-400 mb-3">
        {citation}
      </p>
      <div className="space-y-2.5 text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
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
  { id: "strategic-behaviours", number: "09", title: "Strategic Behaviours, Not Spectacles" },
  { id: "foundations", number: "10", title: "Theoretical Foundations" },
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
      <nav className="mb-12 p-5 rounded-xl border border-transparent dark:border-white/[0.04] bg-ink-50/30 dark:bg-ink-800/15">
        <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-3">
          Contents
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {TOC.map(({ id, number, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-baseline gap-2 text-sm text-steel-500 dark:text-steel-300 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
              >
                <span className="font-mono text-[10px] text-atlas-600 dark:text-atlas-400">
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
            Three commitments shape the platform. First, cyber operations are
            treated as political acts embedded in interstate relationships, not
            as standalone technical incidents. Second, governance is not a
            secondary layer added after technical analysis — it is the central
            frame through which escalation and restraint should be understood.
            Third, analytical uncertainty is stated openly rather than hidden
            behind false precision.
          </p>
          <p>
            The Atlas does not aim to provide real-time situational awareness
            or to serve as a threat dashboard. Its value lies in structured
            comparison across cases, not in speed of reporting. Users looking
            for breaking-news coverage of cyber incidents should consult
            dedicated threat intelligence services; users seeking to understand
            how those incidents fit into broader patterns of escalation,
            restraint, and governance response will find the Atlas more useful.
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
            state-level response (as in the case of ransomware operations
            that prompted executive-level policy changes or international
            summitry).
          </p>
          <p>
            Geographic and temporal scope is determined by data availability
            and analytical value, not by an attempt to be exhaustive. The
            dataset is selective by design. It does not aspire to catalogue
            every reported cyber incident — such an effort would sacrifice
            analytical depth for breadth and would rapidly become a list
            rather than a tool for structured comparison.
          </p>
          <p>
            The current dataset spans operations from 2010 to the present,
            across multiple geographic regions and actor types. Coverage is
            stronger for operations involving NATO-aligned states, reflecting
            the availability of English-language open sources. This is an
            acknowledged bias, not a deliberate editorial choice. Operations
            involving non-Western actors are included where public
            documentation is sufficient for structured analysis.
          </p>
          <p>
            The platform analyses cyber operations through three lenses —
            escalation, infrastructure, and governance — each with its own
            methodology documented in subsequent sections. Not every incident
            is equally well-documented across all three; the Atlas notes where
            evidence is thinner rather than filling gaps with speculation.
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
            distinctive teaching value — for example, an operation with
            moderate technical impact but unusual governance consequences
            may be more instructive than a technically sophisticated
            operation that provoked no policy response.
          </p>
          <p>
            Cases are excluded when documentation is insufficient for
            structured analysis across multiple lenses, when attribution
            remains too uncertain to support meaningful comparison, or when
            the operation does not rise to the level of strategic
            significance defined above. Exclusion is not a judgement that the
            operation was unimportant — it reflects the practical limits of
            open-source analysis.
          </p>
          <p>
            The three-of-five threshold is a guideline, not a rule. The
            purpose of the criteria is to ensure that every included case can
            be meaningfully analysed and compared, not to create a mechanical
            filter that might exclude important edge cases.
          </p>
        </Section>

        {/* 04 — Source hierarchy */}
        <Section id="sources" number="04" title="Source Hierarchy">
          <p>
            Sources are weighted by category. The hierarchy reflects
            proximity to primary evidence and institutional accountability,
            not a claim that any single category is sufficient or free from
            bias:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>
              <strong>Government advisories and legal documents</strong> —
              CISA alerts, DOJ indictments, court filings, official
              attribution statements, UN reports. These carry institutional
              weight and legal accountability, but they also reflect policy
              priorities. Governments may attribute selectively, and
              advisory quality varies across jurisdictions.
            </li>
            <li>
              <strong>Vendor and technical reports</strong> — threat
              intelligence publications from established cybersecurity firms
              with direct forensic access to affected systems. These are
              typically the strongest source for technical detail (IOCs,
              malware analysis, lateral movement chains), but vendors have
              commercial incentives that can shape which incidents receive
              public reporting and how findings are framed.
            </li>
            <li>
              <strong>Academic and policy analysis</strong> — peer-reviewed
              research, policy institute publications, structured case
              studies. These provide the most careful analytical framing but
              are often published with significant delay and may lack access
              to primary technical data.
            </li>
            <li>
              <strong>Investigative journalism</strong> — long-form
              reporting from outlets with established track records in cyber
              and national security. Journalism fills gaps that other
              categories miss — particularly on the political context of
              operations — but varies widely in rigour and sourcing
              transparency.
            </li>
          </ol>
          <p>
            No single source is treated as definitive. Assessments are built
            from corroboration across categories. Where only one category of
            source is available, the Atlas notes this limitation explicitly.
          </p>
          <p>
            The hierarchy is not a ranking of truth. A well-sourced
            journalistic investigation may be more informative than a
            thinly-reasoned government advisory. The weighting reflects
            default reliability in the absence of case-specific reasons to
            adjust.
          </p>
        </Section>

        {/* 05 — Classification logic */}
        <Section id="classification" number="05" title="Classification Logic">
          <p>
            Incidents are classified along several dimensions, each using a
            controlled vocabulary:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Incident type</strong> (espionage, destructive,
              ransomware, influence, sabotage, hybrid) — describes the
              primary operational character. Some operations span multiple
              types; the label reflects the dominant observed function.
            </li>
            <li>
              <strong>Escalation tier</strong> (probing, intrusion,
              disruption, degradation, destruction, strategic impact) —
              describes peak observed severity. These tiers represent
              qualitative shifts in effect, not a linear progression.
              An operation classified as &ldquo;disruption&rdquo; is not
              necessarily a precursor to &ldquo;destruction&rdquo; — most
              operations do not escalate beyond their initial tier.
            </li>
            <li>
              <strong>Attribution confidence</strong> (confirmed, high,
              moderate, low, contested) — reflects the weight of publicly
              available evidence, structured by the Rid–Buchanan layered
              model. See section 07 for caveats.
            </li>
            <li>
              <strong>Target sectors and countries</strong> — drawn from a
              fixed taxonomy. An incident may target multiple sectors; all
              are recorded.
            </li>
            <li>
              <strong>Governance flags</strong> — eight binary indicators
              recording whether specific governance mechanisms were
              triggered (norm violation, public attribution, sanctions,
              indictment, UN discussion, regulatory change, international
              cooperation, deterrence signal). Flags indicate that a
              mechanism was invoked, not that it was effective or
              appropriate.
            </li>
          </ul>
          <p>
            Two derived scores provide additional comparative dimensions.
            The <strong>unpeace score</strong> (0–100) combines escalation
            tier, threshold crossings, and governance weight into a single
            composite indicator. The <strong>entanglement score</strong>
            (1–10) measures how many sectors, countries, and collateral
            dimensions an incident touches. Both are heuristics designed for
            comparison and teaching. They are not measurements, and they
            should not be cited as if they carried the precision of
            quantitative data. Their formulas are documented in the
            codebase and can be inspected directly.
          </p>
          <p>
            Classification decisions involve analytical judgement.
            Reasonable analysts may assign different tiers or types to the
            same operation. The Atlas aims for consistency and transparency
            in its choices, not for claims of definitive correctness.
          </p>
        </Section>

        {/* 06 — Limitations */}
        <Section id="limitations" number="06" title="Limitations">
          <p>
            This platform has significant limitations that users should
            understand before drawing conclusions from its content:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Selective dataset.</strong> The Atlas is not a census
              of cyber incidents. Important operations may be absent because
              they are poorly documented in open sources, fall outside the
              scope criteria, or occurred in contexts where English-language
              reporting is sparse.
            </li>
            <li>
              <strong>Open-source constraint.</strong> All information is
              derived from publicly available material. Classified
              intelligence, private-sector incident data shared under NDA,
              and diplomatic communications are not accessible to this
              analysis. The picture is necessarily incomplete.
            </li>
            <li>
              <strong>Attribution uncertainty.</strong> Attribution
              assessments reflect the balance of publicly available
              evidence. They are not intelligence community judgements and
              carry inherent uncertainty. Even &ldquo;confirmed&rdquo;
              attributions rest on evidence that could, in principle, be
              incomplete or misleading.
            </li>
            <li>
              <strong>Classification subjectivity.</strong> Escalation
              tiers, incident types, and derived scores involve analytical
              judgement. Two competent analysts given the same evidence
              might reasonably assign different classifications. The Atlas
              aims for transparency in its reasoning, not for claims of
              objectivity.
            </li>
            <li>
              <strong>Governance flags are descriptive, not evaluative.</strong>{" "}
              A flag indicates that a governance mechanism was triggered —
              not that it was appropriate, proportionate, or effective. The
              presence of a &ldquo;sanctions imposed&rdquo; flag does not
              imply that sanctions were warranted or successful.
            </li>
            <li>
              <strong>No intent modelling.</strong> The platform analyses
              observed effects and documented responses. It does not claim
              to know what states intended, only what they did and how the
              international community reacted.
            </li>
            <li>
              <strong>Temporal decay.</strong> Open-source information about
              older incidents is often thinner and less reliable than for
              recent ones. The quality of analysis varies across the
              dataset as a consequence.
            </li>
          </ul>
          <p>
            These limitations are features of the problem domain, not
            deficiencies unique to this platform. Any open-source analysis
            of cyber conflict operates under irreducible uncertainty. The
            appropriate response is to state that uncertainty clearly — as
            this page attempts to do — rather than to project false
            confidence.
          </p>
        </Section>

        {/* 07 — Attribution caution */}
        <Section id="attribution" number="07" title="Analytic Caution on Attribution">
          <p>
            Attribution of cyber operations to specific state actors is one
            of the most epistemologically fraught tasks in security analysis.
            The Atlas uses a structured confidence scale — confirmed, high,
            moderate, low, contested — but this scale describes the weight
            of available public evidence, not ground truth. Every level of
            the scale carries residual uncertainty.
          </p>
          <p>
            Following the Rid–Buchanan framework (see section 10), the Atlas
            distinguishes between technical indicators (infrastructure,
            tooling, tradecraft patterns), operational linkage (tying those
            indicators to a specific unit or organisation), and political
            attribution (a government&apos;s public decision to name a
            responsible state). &ldquo;Confirmed&rdquo; in the Atlas means
            that all three layers are supported by publicly available
            evidence — typically through a combination of vendor forensics,
            government attribution statements, and legal action. It does
            not mean that the attribution is beyond doubt.
          </p>
          <p>
            Public attribution by governments is a policy act as much as an
            analytical one. States may attribute to deter, to rally
            alliances, to justify sanctions, or to signal resolve. They may
            decline to attribute when diplomatic equities outweigh
            accountability interests. The timing, framing, and coalition
            structure of attribution statements all carry political
            significance that the Atlas records but does not adjudicate.
          </p>
          <p>
            False-flag operations, shared tooling across threat actors,
            and the deliberate contamination of forensic evidence are all
            documented phenomena. The Atlas does not assume that technical
            indicators are immune to manipulation. Where the source
            material acknowledges these risks, the Atlas reflects them in
            a lower confidence assessment.
          </p>
          <p>
            Users should treat all attribution assessments in the Atlas as
            provisional, read them alongside the cited source material, and
            recognise that the most honest statement about many attributions
            is that they are well-evidenced but not conclusively proven.
          </p>
        </Section>

        {/* 08 — Behaviour vs. law */}
        <Section id="behavior-vs-law" number="08" title="Operational Behaviour vs. Legal Interpretation">
          <p>
            The Atlas describes what states did and how the international
            community responded. It does not offer legal opinions on whether
            specific operations violated international law. This is a
            deliberate methodological choice, not an evasion.
          </p>
          <p>
            The legal status of most cyber operations is genuinely contested.
            Whether a given intrusion violates sovereignty depends on
            unresolved questions about whether sovereignty is a primary rule
            of international law or merely a principle. Whether destructive
            malware constitutes a use of force under Article 2(4) of the UN
            Charter depends on threshold arguments that legal scholars and
            states have not settled. Whether espionage is lawful under
            international law is itself debated — most states practice it,
            few acknowledge a legal right to do so.
          </p>
          <p>
            Terms like &ldquo;norm violation&rdquo; in the Atlas refer to
            assessments made by governments, international bodies, or legal
            scholars — not to findings by this platform. When the Atlas
            records a governance flag of &ldquo;norm violation,&rdquo; it
            means that a credible authority assessed the operation as
            violating an established norm, not that the Atlas has
            independently reached that conclusion.
          </p>
          <p>
            This distinction matters practically. An educator using the Atlas
            should be able to present the same incident as a case study in
            norm enforcement <em>and</em> as a case study in the limits of
            the norm framework — depending on the pedagogical objective. The
            Atlas supplies the structured data and the documented
            assessments; the interpretive work belongs to the user.
          </p>
        </Section>

        {/* 09 — Strategic behaviours */}
        <Section id="strategic-behaviours" number="09" title="Strategic Behaviours, Not Spectacles">
          <p>
            Public discourse about cyber operations tends toward two poles:
            breathless alarm (&ldquo;cyber Pearl Harbor,&rdquo; &ldquo;cyber
            war&rdquo;) or dismissive minimisation (&ldquo;just espionage,&rdquo;
            &ldquo;no one died&rdquo;). Neither framing serves analysis.
            The Atlas is built on the premise that cyber operations are
            strategic behaviours — deliberate actions by states pursuing
            political objectives within the constraints of capability, risk
            tolerance, and international norms.
          </p>
          <p>
            This framing has specific analytical consequences. It means that
            an espionage campaign is not merely a data breach but a signal
            about what a state values, what access it has developed, and
            what options it is preserving for the future. A destructive
            wiper is not merely a technical event but a choice about
            proportionality, deniability, and acceptable collateral damage.
            A ransomware operation that prompts a presidential summit is
            not merely a crime but a governance failure that reshaped policy.
          </p>
          <p>
            The Atlas deliberately avoids the aesthetics of threat
            dashboards — real-time counters, red-and-black colour schemes,
            alarm iconography. These design choices serve threat monitoring;
            they do not serve analysis. The visual language of the platform
            is restrained because the analytical posture is restrained:
            careful assessment of evidence, explicit acknowledgement of
            uncertainty, and structured comparison rather than dramatic
            narration.
          </p>
          <p>
            This does not mean the platform minimises severity. Operations
            that caused billions of dollars in damage, disrupted hospitals,
            or degraded military communications are presented with the
            gravity they warrant. But gravity is conveyed through precise
            description and structured analysis, not through theatrical
            presentation.
          </p>
        </Section>

        {/* 10 — Theoretical foundations */}
        <Section id="foundations" number="10" title="Theoretical Foundations">
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
              <p className="text-xs text-ink-400 dark:text-ink-500 italic">
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
              <p className="text-xs text-ink-400 dark:text-ink-500 italic">
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
              <p className="text-xs text-ink-400 dark:text-ink-500 italic">
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
              <p className="text-xs text-ink-400 dark:text-ink-500 italic">
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
              <p className="text-xs text-ink-400 dark:text-ink-500 italic">
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
              <p className="text-xs text-ink-400 dark:text-ink-500 italic">
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
          <div className="mt-6 p-4 rounded-xl border border-transparent dark:border-white/[0.04] bg-ink-50/20 dark:bg-ink-800/15">
            <p className="text-xs font-semibold text-ink dark:text-ink-100 uppercase tracking-wider mb-1.5">
              On using these frameworks together
            </p>
            <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
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
      <div className="mt-14 max-w-3xl p-5 rounded-xl border-l-4 border-atlas-500 bg-atlas-500/10 dark:bg-atlas-900/10">
        <p className="text-xs font-semibold text-atlas-700 dark:text-atlas-400 uppercase tracking-wider mb-2">
          On reading this page
        </p>
        <p className="text-sm text-ink dark:text-white leading-relaxed">
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
