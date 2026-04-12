"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

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
    highlight: true,
  },
  {
    title: "Attribution",
    href: "/attribution-lens",
    description: "Who attributed, in what sequence, with what evidence, and to what political consequence.",
    coordinate: "ATT",
  },
];

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.08 } },
  },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Atlas grid background */}
        <div className="absolute inset-0 atlas-grid-dense" />
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-atlas/[0.06] via-atlas/[0.02] to-transparent pointer-events-none" />
        {/* Horizontal coordinate lines */}
        <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas/10 to-transparent" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas/5 to-transparent" />

        <div className="relative mx-auto max-w-content px-6 lg:px-8 pt-24 sm:pt-34 pb-20 sm:pb-30">
          <motion.div
            variants={stagger.container}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            {/* Coordinate label */}
            <motion.p variants={stagger.item} className="coordinate-mark mb-6">
              51.5074° N &middot; 0.1278° W &mdash; Strategic Mapping Platform
            </motion.p>

            <motion.h1
              variants={stagger.item}
              className="font-display text-display-lg sm:text-display-xl text-ink dark:text-white text-balance"
            >
              Cyber Escalation<br />
              <span className="text-atlas-600 dark:text-atlas-400">Atlas</span>
              <sup className="text-[0.35em] ml-1 text-steel-400 dark:text-steel-500 font-sans">&trade;</sup>
            </motion.h1>

            <motion.p
              variants={stagger.item}
              className="mt-6 text-body-lg text-steel-500 dark:text-steel-300 max-w-xl leading-relaxed"
            >
              A policy-grade reference mapping how state-linked cyber operations
              unfold, escalate, and reshape international governance.
            </motion.p>

            <motion.div variants={stagger.item} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-atlas-500 hover:bg-atlas-600 text-white text-body font-medium transition-all duration-200 shadow-glow-sm hover:shadow-glow"
              >
                Explore Cases
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/escalation-lens"
                className="inline-flex items-center px-6 py-3 rounded-lg text-body font-medium text-steel-400 dark:text-steel-300 hover:text-ink dark:hover:text-white bg-ink-50/50 dark:bg-white/[0.04] hover:bg-ink-100/60 dark:hover:bg-white/[0.08] border border-transparent dark:border-white/[0.06] transition-all duration-200"
              >
                View Escalation Lens
              </Link>
            </motion.div>

            {/* Compact stats — integrated into hero */}
            <motion.div variants={stagger.item} className="mt-16 flex items-center gap-8 sm:gap-12">
              {[
                { value: "30", label: "Cases" },
                { value: "4", label: "Lenses" },
                { value: "7", label: "Actor Profiles" },
                { value: "6", label: "Norms Tracked" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-heading font-display text-ink dark:text-white">{stat.value}</span>
                  <span className="text-micro font-medium uppercase tracking-widest text-steel-600 dark:text-steel-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
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
                    {/* Year + type row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-micro font-mono text-steel-600 dark:text-steel-500">
                        {c.year} &middot; {c.region}
                      </span>
                      <Badge variant={c.variant}>{c.type}</Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-subheading font-display text-ink dark:text-white mb-3 group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {c.name}
                    </h3>

                    {/* Summary */}
                    <p className="text-caption text-steel-500 dark:text-steel-400 leading-relaxed">
                      {c.summary}
                    </p>

                    {/* Read more indicator */}
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
            className="text-center mb-16"
          >
            <p className="section-label mb-2">Analytical Lenses</p>
            <h2 className="text-heading font-display text-ink dark:text-white mb-4">
              Four Dimensions of Analysis
            </h2>
            <p className="text-body text-steel-500 dark:text-steel-400 max-w-lg mx-auto">
              Each lens offers a distinct perspective on the same underlying incidents,
              revealing patterns invisible from any single vantage point.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lenses.map((lens, i) => (
              <motion.div
                key={lens.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={lens.href} className="group block h-full">
                  <div className={`relative h-full p-8 rounded-xl transition-all duration-300 ${
                    lens.highlight
                      ? "bg-atlas/[0.04] dark:bg-atlas/[0.06] border border-atlas/10 dark:border-atlas/15 hover:border-atlas/25 hover:shadow-glow"
                      : "bg-ink-50/40 dark:bg-white/[0.02] border border-transparent dark:border-white/[0.04] hover:bg-ink-100/60 dark:hover:bg-white/[0.05] hover:shadow-depth"
                  }`}>
                    {/* Coordinate marker */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-micro font-mono font-semibold text-atlas-500 dark:text-atlas-400 tracking-widest">
                        {lens.coordinate}
                      </span>
                      {lens.highlight && (
                        <span className="text-micro font-medium text-atlas-600 dark:text-atlas-400 bg-atlas/10 px-2 py-0.5 rounded">
                          Priority
                        </span>
                      )}
                    </div>

                    <h3 className="text-subheading font-display text-ink dark:text-white mb-3 group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
                      {lens.title}
                    </h3>
                    <p className="text-caption text-steel-500 dark:text-steel-400 leading-relaxed">
                      {lens.description}
                    </p>

                    <div className="mt-6 flex items-center gap-1.5 text-micro font-medium text-atlas-600 dark:text-atlas-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Enter lens
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
            <blockquote className="text-body-lg font-display text-steel-300 dark:text-steel-300 leading-relaxed italic">
              &ldquo;This platform does not catalogue threats to be feared. It
              interprets incidents as strategic behaviors to be understood.&rdquo;
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
            {/* Creator */}
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
                    alt="Risa Koyanagi — 小柳璃紗"
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

            {/* Faultline */}
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
                    alt="Faultline — Strategic research ecosystem"
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
                  { name: "Space Mandate Atlas", href: "https://space-mandate-atlas.vercel.app/" },
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
