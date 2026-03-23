import { PageHeader, SectionWrapper, Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="About"
        subtitle="The Cyber Escalation Atlas is an independent research project that provides structured, policy-grade analysis of significant cyber operations."
      />
      <div className="space-y-6 max-w-3xl">
        <Card>
          <h3 className="font-semibold text-ink dark:text-white mb-2">
            Purpose
          </h3>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
            The Atlas serves as an interactive reference for policymakers,
            analysts, educators, and students seeking to understand how cyber
            operations unfold, how they relate to broader geopolitical dynamics,
            and what governance responses have been developed. It bridges the
            gap between technical threat intelligence and policy analysis.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-ink dark:text-white mb-2">
            Approach
          </h3>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
            Each case is analyzed through three complementary lenses —
            Escalation, Infrastructure, and Governance — that together provide
            a comprehensive picture of how cyber operations create strategic
            effects. The tool is designed to be a teaching instrument as much
            as a reference, with structured data enabling cross-case comparison
            and pattern identification.
          </p>
        </Card>

        {/* ── Why This Atlas Exists ── */}
        <section className="pt-4">
          <h2 className="text-xl font-bold text-ink dark:text-white tracking-tight mb-6">
            Why This Atlas Exists
          </h2>
          <div className="space-y-5 text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
            <p>
              The single most consequential security challenge of the current
              decade is not a particular adversary or a single category of
              attack. It is an architectural problem: the structural
              entanglement of cyber, space, and nuclear systems, and the
              governance vacuum that surrounds it.
            </p>
            <p>
              The command, control, and early-warning systems that underpin
              nuclear deterrence now depend on satellite infrastructure that
              is itself vulnerable to cyber operations. Those satellite
              systems are increasingly dual-use — the same orbital assets
              that enable civilian communications and GPS navigation also
              support military targeting and ballistic missile defence. The
              cyber domain provides a persistent, low-threshold tool for
              reaching into both. The result is a coupling that existing
              governance frameworks were not designed to manage.
            </p>

            <h3 className="text-base font-semibold text-ink dark:text-white pt-2">
              The Entanglement Problem
            </h3>
            <p>
              The danger is not that a cyber attack will cause a nuclear
              launch. The danger is subtler and harder to govern: that a
              cyber operation targeting satellite infrastructure —
              plausibly motivated by intelligence collection,
              pre-positioning, or compellence in a conventional conflict —
              could be misread as preparation for a disarming first strike.
            </p>
            <p>
              James Acton&apos;s concept of entanglement captures the
              structural logic precisely. When the same physical
              infrastructure serves both conventional and nuclear functions,
              an adversary cannot reliably distinguish between a limited
              operation and the opening move of strategic escalation. That
              uncertainty is itself destabilising, independent of intent.
            </p>

            <h3 className="text-base font-semibold text-ink dark:text-white pt-2">
              A Concrete Illustration
            </h3>
            <p>
              The 2022 Viasat KA-SAT attack illustrates the problem in
              miniature. A cyber operation targeting a commercial satellite
              communication system, conducted in the opening hours of the
              Russia–Ukraine war, disrupted Ukrainian military
              communications — but also knocked out wind turbines across
              Central Europe and disabled satellite modems in multiple NATO
              member states.
            </p>
            <p>
              No governance framework determined whether this constituted an
              act of war, triggered collective defence obligations, or
              warranted a countermeasure. The Tallinn Manual&nbsp;2.0 offers
              analytical tools; it does not provide binding thresholds. The
              gap between what the law says and what operational reality
              demands has never been wider.
            </p>

            <h3 className="text-base font-semibold text-ink dark:text-white pt-2">
              Why This Problem Is Primary
            </h3>
            <p>
              What makes entanglement risk the primary challenge — above
              climate, pandemic risk, or conventional great-power rivalry —
              is that it combines three properties simultaneously. It is
              already operational rather than hypothetical. It is
              structurally resistant to existing arms control approaches
              because it cannot be verified or bounded the way nuclear
              warheads can. And it creates escalation pathways that move
              faster than diplomatic or legal institutions can respond.
              Climate change is a generational governance failure.
              Entanglement risk is a real-time one.
            </p>

            <h3 className="text-base font-semibold text-ink dark:text-white pt-2">
              The Governance Task
            </h3>
            <p>
              The governance response requires integrating three bodies of
              work that presently operate in silos: cyber norms development
              (the GGE/OEWG process), space security (the Open-Ended
              Working Group on reducing space threats), and nuclear risk
              reduction. None of these tracks currently accounts for the
              interaction effects between them.
            </p>
            <p>
              Building the analytical and institutional infrastructure to
              address that gap is the most consequential security governance
              task of the current decade — and the intellectual problem
              that motivates this platform. The Atlas exists to make that
              entanglement legible: to provide structured, evidence-based
              analysis of how cyber operations interact with escalation
              dynamics, infrastructure dependencies, and governance
              responses, so that the pattern becomes visible across cases
              rather than rediscovered in each crisis.
            </p>
          </div>
        </section>

        {/* ── Author ── */}
        <Card>
          <h3 className="font-semibold text-ink dark:text-white mb-2">
            Author &amp; Builder
          </h3>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
            The Cyber Escalation Atlas&trade; is designed, researched, and built
            by{" "}
            <a
              href="https://risakoyanagi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-atlas dark:text-atlas-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors underline underline-offset-2"
            >
              Risa Koyanagi
            </a>
            . The project reflects an ongoing research interest in the
            intersection of cyber operations, space security, and nuclear risk
            governance — and the analytical infrastructure required to make
            those entanglements legible to policymakers.
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-ink dark:text-white mb-2">
            Contact
          </h3>
          <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
            For inquiries about the project, data corrections, or collaboration
            opportunities, please reach out through the project repository or
            via{" "}
            <a
              href="https://risakoyanagi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-atlas dark:text-atlas-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors underline underline-offset-2"
            >
              risakoyanagi.com
            </a>
            .
          </p>
        </Card>
      </div>
    </SectionWrapper>
  );
}
