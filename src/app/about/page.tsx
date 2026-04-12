import Image from "next/image";
import { PageHeader, SectionWrapper, Card } from "@/components/ui";

const faultlineProjects = [
  {
    name: "Cyber Escalation Atlas",
    href: "https://cyber-escalation-atlas.vercel.app/",
    description:
      "Policy-grade reference mapping state-linked cyber operations, escalation dynamics, and governance frameworks.",
  },
  {
    name: "Global Nuclear Infrastructure Atlas",
    href: "https://globalnuclearinfrastructureatlas.vercel.app/",
    description:
      "Interactive mapping of global nuclear infrastructure, facilities, and strategic dependencies.",
  },
  {
    name: "Orbital Risk Tracker",
    href: "https://orbitalrisktracker.vercel.app/",
    description:
      "Monitoring and analysis of orbital risks, space debris, and dual-use satellite systems.",
  },
  {
    name: "Space Mandate Atlas",
    href: "https://space-mandate-atlas.vercel.app/",
    description:
      "Mapping space governance mandates, treaties, and institutional authority across jurisdictions.",
  },
];

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

        {/* ── Author & Creator ── */}
        <section className="pt-4">
          <h2 className="text-xl font-bold text-ink dark:text-white tracking-tight mb-6">
            Author &amp; Creator
          </h2>
          <Card>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Risa Koyanagi"
                  width={120}
                  height={120}
                  className="rounded-xl object-cover w-[120px] h-[120px]"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-ink dark:text-white text-lg">
                    Risa Koyanagi
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-widest text-atlas-600 dark:text-atlas-400 mt-1">
                    Cambridge Future Scholar
                  </p>
                </div>
                <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
                  Risa Koyanagi is a Cambridge Future Scholar and researcher
                  working across space, nuclear, and emerging technology
                  governance and strategic risk. Her work focuses on
                  legitimation, dual-use systems, and authority architecture.
                  She also designs public-facing research platforms on AI
                  governance, strategic infrastructure risk, and interpretive
                  systems.
                </p>
                <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
                  The Cyber Escalation Atlas&trade; is designed, researched, and
                  built as part of an ongoing research programme examining the
                  intersection of cyber operations, space security, and nuclear
                  risk governance — and the analytical infrastructure required
                  to make those entanglements legible to policymakers.
                </p>
                <div className="pt-1">
                  <a
                    href="https://risakoyanagi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-atlas dark:text-atlas-400 hover:text-atlas-600 dark:hover:text-atlas-300 transition-colors underline underline-offset-2"
                  >
                    risakoyanagi.com
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="ml-0.5"
                    >
                      <path
                        d="M6 3h7v7M13 3L5 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── Faultline Ecosystem ── */}
        <section className="pt-4">
          <h2 className="text-xl font-bold text-ink dark:text-white tracking-tight mb-6">
            Part of Faultline
          </h2>
          <Card>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-atlas/10 dark:bg-atlas/15 flex items-center justify-center mt-0.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-atlas-500 dark:text-atlas-400"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-ink dark:text-white mb-1">
                    Faultline
                  </h3>
                  <p className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed">
                    The Cyber Escalation Atlas is part of{" "}
                    <a
                      href="https://faultline-nqmm.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-atlas dark:text-atlas-400 hover:text-atlas-600 dark:hover:text-atlas-300 transition-colors underline underline-offset-2"
                    >
                      Faultline
                    </a>
                    , a research ecosystem designed by Risa Koyanagi that maps
                    structural risk across interconnected strategic domains —
                    cyber, space, nuclear, and emerging technology governance.
                    Each platform within Faultline provides a distinct analytical
                    lens on the same underlying problem: how dual-use
                    infrastructure, contested authority, and governance gaps
                    create systemic escalation risk.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-4 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-steel-600 dark:text-steel-500 px-1">
              Faultline Projects
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {faultlineProjects.map((project) => (
                <a
                  key={project.href}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-ink dark:text-white group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                          {project.name}
                        </h4>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-steel-400 dark:text-steel-500 group-hover:text-atlas-500 dark:group-hover:text-atlas-400 transition-colors"
                        >
                          <path
                            d="M6 3h7v7M13 3L5 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-steel-500 dark:text-steel-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
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
