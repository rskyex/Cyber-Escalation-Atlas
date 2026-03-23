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

function FrameworkCard({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-navy-200/25 dark:border-navy-600/35 bg-white dark:bg-navy-700/20">
      <h4 className="text-sm font-bold text-navy dark:text-offwhite mb-1">
        {name}
      </h4>
      <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
        {placeholder}
      </p>
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
            analytical questions at stake. The following sections will expand
            on each.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <FrameworkCard
              name="Kello — The Virtual Weapon"
              placeholder="On the strategic logic of cyber operations and why they resist traditional escalation models. Forthcoming section."
            />
            <FrameworkCard
              name="Rid & Buchanan — Attributing Cyber Attacks"
              placeholder="On the epistemology of attribution and the layers of evidence required. Forthcoming section."
            />
            <FrameworkCard
              name="Schelling — Arms and Influence"
              placeholder="On compellence, deterrence, and the signalling logic that underpins coercive cyber operations. Forthcoming section."
            />
            <FrameworkCard
              name="Tallinn Manual 2.0"
              placeholder="On the application of international law to cyber operations — sovereignty, due diligence, and use of force. Forthcoming section."
            />
            <FrameworkCard
              name="Valeriano & Maness — Cyber War versus Cyber Realities"
              placeholder="On the empirical restraint observed in interstate cyber conflict and the gap between rhetoric and behaviour. Forthcoming section."
            />
            <FrameworkCard
              name="Acton — Cyber Escalation Dynamics"
              placeholder="On entanglement, inadvertent escalation, and the nuclear-cyber nexus. Forthcoming section."
            />
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
