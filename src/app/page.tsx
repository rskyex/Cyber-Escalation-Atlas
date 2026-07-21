"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";
import { AtmosphericBackground, ProvenanceMark } from "@/components/observatory";
import type { ProvenanceKind } from "@/components/observatory";
import { caseCount, observatoryLayerCount } from "@/lib/datasetStats";

const observatoryLayers: {
  coord: string;
  title: string;
  href: string;
  metric: string;
  metricLabel: string;
  tone: "atlas" | "violet" | "plasma" | "amber";
  provenance: ProvenanceKind;
}[] = [
  { coord: "L-01", title: "Decision Compression", href: "/observatory/compression", metric: "0.4s", metricLabel: "autonomous latency", tone: "atlas", provenance: "illustrative" },
  { coord: "L-02", title: "Attribution Field",    href: "/observatory/attribution-field", metric: "5", metricLabel: "contested streams", tone: "violet", provenance: "structural" },
  { coord: "L-03", title: "Agent Pathways",       href: "/observatory/agent-pathways", metric: "6→∞", metricLabel: "branching depth", tone: "plasma", provenance: "illustrative" },
  { coord: "L-04", title: "Cross-Domain Map",     href: "/observatory/cross-domain", metric: "7", metricLabel: "interlocked domains", tone: "atlas", provenance: "structural" },
  { coord: "L-05", title: "Escalation Tempo",     href: "/observatory/tempo", metric: "10⁶×", metricLabel: "tempo asymmetry", tone: "amber", provenance: "illustrative" },
  { coord: "L-06", title: "Governance Cascade",   href: "/observatory/governance-cascade", metric: "6", metricLabel: "failure modes", tone: "plasma", provenance: "structural" },
  { coord: "L-07", title: "Authority Layer",      href: "/observatory/authority", metric: "4", metricLabel: "authority loci", tone: "violet", provenance: "structural" },
];

const featuredCases = [
  {
    slug: "notpetya",
    name: "NotPetya",
    year: 2017,
    type: "Destructive",
    variant: "signal" as const,
    region: "Global",
    summary:
      "Supply-chain wiper disguised as ransomware. $10B+ in collateral damage across 65 countries.",
  },
  {
    slug: "solarwinds",
    name: "SolarWinds",
    year: 2020,
    type: "Espionage",
    variant: "navy" as const,
    region: "United States",
    summary:
      "Nine-month supply-chain compromise of ~18,000 organizations. Redefined persistent access at scale.",
  },
  {
    slug: "viasat-kasat",
    name: "Viasat KA-SAT",
    year: 2022,
    type: "Destructive",
    variant: "signal" as const,
    region: "Europe",
    summary:
      "Satellite modem wiper timed to kinetic invasion. Collateral outages across NATO states.",
  },
];

const lenses = [
  {
    title: "Escalation",
    href: "/escalation-lens",
    description: "How cyber operations climb the escalation ladder from access to strategic impact.",
    coordinate: "ESC",
  },
  {
    title: "Infrastructure",
    href: "/infrastructure-lens",
    description: "Technical systems targeted and exploited across state-linked campaigns.",
    coordinate: "INF",
  },
  {
    title: "Governance",
    href: "/governance-lens",
    description: "Policy responses, international norms, and regulatory frameworks shaped by incidents.",
    coordinate: "GOV",
  },
  {
    title: "Attribution",
    href: "/attribution-lens",
    description: "Who attributed, in what sequence, with what evidence, and to what political consequence.",
    coordinate: "ATT",
  },
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
  },
};

const toneClassMap = {
  atlas: "text-atlas-400",
  violet: "text-violet-300",
  plasma: "text-plasma-400",
  amber: "text-amber-400",
};

const toneBorderMap = {
  atlas: "group-hover:border-atlas-500/30",
  violet: "group-hover:border-violet-500/30",
  plasma: "group-hover:border-plasma-500/30",
  amber: "group-hover:border-amber-500/30",
};

export default function HomePage() {
  return (
    <>
      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <AtmosphericBackground density="high" variant="command" />

        <div className="relative mx-auto max-w-content w-full px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            variants={stagger.container}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
              <span className="flex items-center gap-2 tag-mono">
                <span className="status-dot" />
                ATMOSPHERIC TELEMETRY · LIVE
              </span>
              <span className="tag-mono">v 2.0 · STRATEGIC LAYER</span>
              <span className="tag-mono">51.5074° N · 0.1278° W</span>
            </motion.div>

            <motion.p
              variants={stagger.item}
              className="font-editorial italic text-amber-400/80 text-body-lg mb-4"
            >
              An atlas of machine-speed geopolitical escalation.
            </motion.p>

            <motion.h1
              variants={stagger.item}
              className="font-display text-display-lg sm:text-display-xl text-white text-balance leading-[1.02] tracking-tight"
            >
              Cyber Escalation<br />
              <span className="text-atlas-400">Atlas</span>
            </motion.h1>

            <motion.p
              variants={stagger.item}
              className="mt-8 text-body-lg text-steel-300 max-w-2xl leading-relaxed"
            >
              Cyber, AI, space, nuclear, information, financial systems no longer escalate in isolation.
              This atlas maps their structural interdependencies, the compression of decision time, and
              the migration of authority between humans and machines, at speeds that outpace deliberation.
            </motion.p>

            <motion.p
              variants={stagger.item}
              className="mt-5 text-body text-steel-400 max-w-2xl leading-relaxed"
            >
              The central question is not <span className="text-amber-300/90">what did the system do</span>; it is{" "}
              <span className="text-atlas-300">who held authority to define meaning and response</span>.
            </motion.p>

            <motion.div variants={stagger.item} className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/observatory"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg bg-atlas-500 hover:bg-atlas-400 text-ink-900 font-medium transition-all duration-200 shadow-glow"
              >
                Enter Observatory
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/observatory/simulator"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-body font-medium text-amber-300 bg-amber-500/[0.08] border border-amber-500/30 hover:bg-amber-500/[0.14] hover:border-amber-500/50 transition-all duration-200"
              >
                <span className="status-dot status-dot-amber" />
                Live Simulator
              </Link>
              <Link
                href="/cases"
                className="inline-flex items-center px-6 py-3.5 rounded-lg text-body font-medium text-steel-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all duration-200"
              >
                Explore Cases
              </Link>
            </motion.div>

            <motion.div variants={stagger.item} className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 max-w-2xl">
              {([
                { value: String(observatoryLayerCount), label: "Observatory Layers", tone: "atlas", provenance: "structural" },
                { value: String(caseCount), label: "Documented Cases", tone: "steel" },
                { value: "10⁶×", label: "Tempo Asymmetry", tone: "amber", provenance: "illustrative" },
                { value: "Δ", label: "Phase-Shift Model", tone: "plasma" },
              ] as { value: string; label: string; tone: string; provenance?: ProvenanceKind }[]).map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className={`font-display text-heading ${
                      stat.tone === "atlas"
                        ? "text-atlas-300"
                        : stat.tone === "amber"
                          ? "text-amber-300"
                          : stat.tone === "plasma"
                            ? "text-plasma-300"
                            : "text-white"
                    }`}
                  >
                    {stat.value}
                    {stat.provenance && <ProvenanceMark kind={stat.provenance} />}
                  </span>
                  <span className="text-micro font-medium uppercase tracking-widest text-steel-500 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ OBSERVATORY · PRIORITY ═══ */}
      <section className="relative">
        <div className="obs-rule" />
        <div className="absolute inset-0 vol-backdrop opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-3xl"
          >
            <p className="tag-mono mb-2 text-atlas-400">ESCALATION OBSERVATORY · L-01 → L-07</p>
            <h2 className="font-display text-heading sm:text-display text-white mb-4">
              Seven interactive layers of escalation.
            </h2>
            <p className="text-body text-steel-400 leading-relaxed">
              The Observatory is the strategic layer of the atlas: interactive visualizations
              of AI-mediated escalation, attribution uncertainty, machine-speed governance, and
              cross-domain conflict propagation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {observatoryLayers.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={l.href} className="group block h-full">
                  <div className={`relative obs-panel rounded-xl p-5 h-full transition-all duration-300 ${toneBorderMap[l.tone]} group-hover:bg-white/[0.03]`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className={`tag-mono ${toneClassMap[l.tone]}`}>{l.coord}</span>
                      <span className={`font-display text-caption ${toneClassMap[l.tone]}`}>
                        {l.metric}
                        <ProvenanceMark kind={l.provenance} />
                      </span>
                    </div>
                    <h3 className="font-display text-subheading text-white mb-1.5 leading-tight group-hover:text-atlas-300 transition-colors">
                      {l.title}
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-steel-500">{l.metricLabel}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Link href="/observatory/simulator" className="group block h-full">
                <div className="relative obs-panel-strong corner-ticks rounded-xl p-5 h-full transition-all duration-300 group-hover:bg-atlas-500/10">
                  <div className="flex items-start justify-between mb-3">
                    <span className="tag-mono text-plasma-300">SIM-Δ</span>
                    <span className="font-display text-caption text-plasma-300">LIVE</span>
                  </div>
                  <h3 className="font-display text-subheading text-white mb-1.5 leading-tight">Live Simulator</h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">interactive · 5 axes</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED CASES ═══ */}
      <section className="relative">
        <div className="atlas-rule" />
        <div className="mx-auto max-w-content px-6 lg:px-8 py-20 sm:py-26">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-2">Featured Cases</p>
                <h2 className="text-heading font-display text-ink dark:text-white">
                  Landmark Incidents
                </h2>
              </div>
              <Link
                href="/cases"
                className="hidden sm:inline-flex items-center gap-1.5 text-caption font-medium text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 transition-colors"
              >
                View all cases
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            {featuredCases.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/cases/${c.slug}`} className="group block h-full">
                  <div className="relative h-full p-7 rounded-xl bg-ink-50/40 dark:bg-white/[0.02] border border-transparent dark:border-white/[0.04] transition-all duration-300 hover:bg-ink-100/60 dark:hover:bg-white/[0.05] hover:shadow-depth group-hover:border-atlas/10 dark:group-hover:border-atlas/10">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-micro font-mono text-steel-600 dark:text-steel-500">
                        {c.year} &middot; {c.region}
                      </span>
                      <Badge variant={c.variant}>{c.type}</Badge>
                    </div>
                    <h3 className="text-subheading font-display text-ink dark:text-white mb-3 group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-caption text-steel-500 dark:text-steel-400 leading-relaxed">
                      {c.summary}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-micro font-medium text-atlas-600 dark:text-atlas-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read analysis
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ANALYTICAL LENSES ═══ */}
      <section className="relative">
        <div className="atlas-rule" />
        <div className="atlas-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-content px-6 lg:px-8 py-20 sm:py-26">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-3xl"
          >
            <p className="section-label mb-2">Analytical Lenses</p>
            <h2 className="text-heading font-display text-ink dark:text-white mb-4">
              Four Dimensions of Case Analysis
            </h2>
            <p className="text-body text-steel-500 dark:text-steel-400">
              Beyond the Observatory's strategic layer, every documented case is
              analyzed through four dimensions: escalation trajectory, infrastructure
              entanglement, governance response, and attribution dynamics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lenses.map((lens, i) => (
              <motion.div
                key={lens.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={lens.href} className="group block h-full">
                  <div className="relative h-full p-6 rounded-xl bg-ink-50/40 dark:bg-white/[0.02] border border-transparent dark:border-white/[0.04] hover:bg-ink-100/60 dark:hover:bg-white/[0.05] hover:shadow-depth transition-all duration-300">
                    <span className="text-micro font-mono font-semibold text-atlas-500 dark:text-atlas-400 tracking-widest">
                      {lens.coordinate}
                    </span>
                    <h3 className="text-subheading font-display text-ink dark:text-white mt-2 mb-2 group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {lens.title}
                    </h3>
                    <p className="text-caption text-steel-500 dark:text-steel-400 leading-relaxed">
                      {lens.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING PRINCIPLE ═══ */}
      <section className="relative">
        <div className="atlas-rule" />
        <div className="mx-auto max-w-content px-6 lg:px-8 py-20 sm:py-26">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-atlas/[0.06] dark:bg-atlas/[0.08] mb-8">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-atlas-500 dark:text-atlas-400">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
                <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              </svg>
            </div>
            <blockquote className="font-editorial italic text-body-lg sm:text-subheading text-steel-300 dark:text-steel-300 leading-relaxed">
              &ldquo;This platform does not catalogue threats to be feared. It
              interprets machine-mediated escalation as a structural condition to be governed.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/methodology"
                className="text-caption font-medium text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 transition-colors"
              >
                Read our methodology
              </Link>
              <span className="text-steel-700">&middot;</span>
              <Link
                href="/about"
                className="text-caption font-medium text-steel-500 dark:text-steel-400 hover:text-ink dark:hover:text-white transition-colors"
              >
                About the project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CREATOR & FAULTLINE ═══ */}
      <section className="relative">
        <div className="atlas-rule" />
        <div className="mx-auto max-w-content px-6 lg:px-8 py-20 sm:py-26">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-label mb-4">Creator</p>
              <a
                href="https://risakoyanagi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-5 group"
              >
                <div className="relative rounded-xl overflow-hidden border border-transparent dark:border-white/[0.06]">
                  <Image
                    src="/risa-koyanagi-og.png"
                    alt="Risa Koyanagi, 小柳璃紗"
                    width={1536}
                    height={768}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </a>
              <div className="flex items-start gap-4">
                <Image
                  src="/profile.jpg"
                  alt="Risa Koyanagi"
                  width={56}
                  height={56}
                  className="rounded-lg object-cover w-14 h-14 flex-shrink-0"
                />
                <div>
                  <h3 className="text-subheading font-display text-ink dark:text-white">
                    Risa Koyanagi
                  </h3>
                  <p className="text-micro font-medium uppercase tracking-widest text-atlas-600 dark:text-atlas-400 mt-0.5">
                    Cambridge Future Scholar
                  </p>
                  <p className="mt-3 text-caption text-steel-500 dark:text-steel-400 leading-relaxed">
                    Researcher working across space, nuclear, and emerging
                    technology governance and strategic risk. Her work focuses
                    on legitimation, dual-use systems, and authority
                    architecture.
                  </p>
                  <a
                    href="https://risakoyanagi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-caption font-medium text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 dark:hover:text-atlas-300 transition-colors"
                  >
                    risakoyanagi.com
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3h7v7M13 3L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="section-label mb-4">Research Ecosystem</p>
              <a
                href="https://faultline-nqmm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-5 group"
              >
                <div className="relative rounded-xl overflow-hidden border border-transparent dark:border-white/[0.06]">
                  <Image
                    src="/faultline-og.png"
                    alt="Faultline: Strategic research ecosystem"
                    width={1200}
                    height={630}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </a>
              <p className="text-caption text-steel-500 dark:text-steel-400 leading-relaxed mb-5">
                This Atlas is part of{" "}
                <a
                  href="https://faultline-nqmm.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 dark:hover:text-atlas-300 transition-colors underline underline-offset-2"
                >
                  Faultline
                </a>
                &nbsp;&mdash; a research ecosystem mapping structural risk across
                cyber, space, nuclear, and emerging technology governance.
              </p>
              <div className="space-y-2">
                {[
                  { name: "Cyber Escalation Atlas", href: "https://cyber-escalation-atlas.vercel.app/" },
                  { name: "Global Nuclear Infrastructure Atlas", href: "https://globalnuclearinfrastructureatlas.vercel.app/" },
                  { name: "Orbital Risk Tracker", href: "https://orbitalrisktracker.vercel.app/" },
                  { name: "Space Mandate Atlas", href: "https://lunar-mandate-atlas.vercel.app/" },
                ].map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2.5 px-4 rounded-lg bg-ink-50/40 dark:bg-white/[0.02] border border-transparent dark:border-white/[0.04] hover:bg-ink-100/60 dark:hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <span className="text-caption font-medium text-ink dark:text-steel-200 group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {p.name}
                    </span>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-steel-400 dark:text-steel-500 group-hover:text-atlas-500 dark:group-hover:text-atlas-400 transition-colors">
                      <path d="M6 3h7v7M13 3L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
