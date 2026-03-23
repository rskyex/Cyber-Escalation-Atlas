"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";

const featuredCases = [
  {
    slug: "notpetya",
    name: "NotPetya",
    year: 2017,
    type: "Destructive",
    badge: "amber" as const,
    summary:
      "Supply-chain wiper disguised as ransomware caused $10B+ in global damages, demonstrating how cyber operations can produce strategic-scale economic disruption.",
  },
  {
    slug: "solarwinds",
    name: "SolarWinds",
    year: 2020,
    type: "Espionage",
    badge: "navy" as const,
    summary:
      "Nine-month undetected compromise of ~18,000 organizations via software supply chain, reshaping assumptions about persistent access at scale.",
  },
  {
    slug: "viasat-kasat",
    name: "Viasat KA-SAT",
    year: 2022,
    type: "Destructive",
    badge: "amber" as const,
    summary:
      "Satellite modem wiper timed to Russia's invasion of Ukraine disrupted military comms and caused collateral outages across NATO states — the entanglement problem in miniature.",
  },
];

const frameworks = [
  {
    name: "Kello",
    label: "Virtual Weapon Framework",
    description:
      "Lucas Kello's framework for classifying cyber operations by their strategic weight — distinguishing disruption from degradation and destruction.",
    badge: "Strategic Theory",
  },
  {
    name: "Rid & Buchanan",
    label: "Escalation Dynamics",
    description:
      "Thomas Rid and Ben Buchanan's analysis of how cyber operations interact with conventional escalation ladders and crisis stability.",
    badge: "Escalation Logic",
  },
  {
    name: "Tallinn Manual",
    label: "International Law",
    description:
      "The NATO-affiliated legal analysis applying international humanitarian law and the law of armed conflict to state-conducted cyber operations.",
    badge: "Legal Framework",
  },
];

const lenses = [
  {
    title: "Escalation Lens",
    href: "/escalation-lens",
    description:
      "Trace how cyber operations escalate from initial access through strategic impact, mapped to real-world incidents.",
    badge: "Analytical",
    badgeVariant: "navy" as const,
  },
  {
    title: "Infrastructure Lens",
    href: "/infrastructure-lens",
    description:
      "Examine the technical infrastructure targeted and exploited across documented cyber campaigns.",
    badge: "Technical",
    badgeVariant: "navy" as const,
  },
  {
    title: "Governance Lens",
    href: "/governance-lens",
    description:
      "Evaluate policy responses, international norms, and regulatory frameworks shaped by major cyber incidents.",
    badge: "Policy Priority",
    badgeVariant: "teal" as const,
    highlight: true,
  },
];

const stats = [
  { label: "Documented Cases", value: "20", note: "across state-linked operations" },
  { label: "Analytical Lenses", value: "3", note: "Escalation, Infrastructure, Governance" },
  { label: "ATT&CK Techniques", value: "100+", note: "mapped per case" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-16 sm:pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-teal dark:text-teal-300 mb-3">
            Structured Analysis of Cyber Conflict
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-navy dark:text-offwhite leading-tight">
            Cyber Escalation Atlas
          </h1>
          <p className="mt-6 text-lg text-slate dark:text-navy-200 leading-relaxed max-w-2xl">
            A policy-grade interactive reference mapping how state-linked cyber
            operations unfold, escalate, and reshape governance. Built for
            analysts, educators, and policymakers navigating the intersection of
            cyber, space, and nuclear risk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cases"
              className="inline-flex items-center px-5 py-2.5 rounded-md bg-navy dark:bg-offwhite text-offwhite dark:text-navy text-sm font-medium hover:bg-navy-600 dark:hover:bg-navy-100 transition-colors"
            >
              Explore Cases
            </Link>
            <Link
              href="/escalation-lens"
              className="inline-flex items-center px-5 py-2.5 rounded-md border border-teal text-teal dark:text-teal-300 text-sm font-medium hover:bg-teal/10 transition-colors"
            >
              View Escalation Lens
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center px-5 py-2.5 rounded-md border border-navy-200/40 dark:border-navy-600/40 text-slate dark:text-navy-200 text-sm font-medium hover:bg-navy-100/40 dark:hover:bg-navy-600/20 transition-colors"
            >
              Compare Incidents
            </Link>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-5 rounded-lg border border-navy-200/20 dark:border-navy-600/30 bg-white/50 dark:bg-navy-700/30"
            >
              <div className="text-2xl font-bold text-navy dark:text-offwhite">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate dark:text-navy-200 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate/70 dark:text-navy-300 mt-1">
                {stat.note}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Cases */}
      <SectionWrapper>
        <h2 className="text-2xl font-semibold text-navy dark:text-offwhite mb-2">
          Featured Cases
        </h2>
        <p className="text-sm text-slate dark:text-navy-200 mb-6">
          Key incidents that illustrate the Atlas&apos;s analytical approach.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`}>
              <Card hover>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-navy dark:text-offwhite">
                    {c.name}
                    <span className="ml-2 text-sm font-normal text-slate dark:text-navy-300">
                      {c.year}
                    </span>
                  </h3>
                  <Badge variant={c.badge}>{c.type}</Badge>
                </div>
                <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
                  {c.summary}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Analytical Lenses */}
      <SectionWrapper>
        <h2 className="text-2xl font-semibold text-navy dark:text-offwhite mb-6">
          Analytical Lenses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lenses.map((lens) => (
            <Link key={lens.href} href={lens.href}>
              <Card
                hover
                className={
                  lens.highlight
                    ? "border-teal/40 dark:border-teal/30 ring-1 ring-teal/20"
                    : ""
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className={`text-lg font-semibold ${
                      lens.highlight
                        ? "text-teal-600 dark:text-teal-300"
                        : "text-navy dark:text-offwhite"
                    }`}
                  >
                    {lens.title}
                  </h3>
                  <Badge variant={lens.badgeVariant}>{lens.badge}</Badge>
                </div>
                <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
                  {lens.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Framework Teasers */}
      <SectionWrapper>
        <h2 className="text-2xl font-semibold text-navy dark:text-offwhite mb-2">
          Theoretical Frameworks
        </h2>
        <p className="text-sm text-slate dark:text-navy-200 mb-6">
          The analytical scaffolding underpinning each case assessment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map((fw) => (
            <Card key={fw.name}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-navy dark:text-offwhite">
                  {fw.name}
                </h3>
                <Badge variant="teal">{fw.badge}</Badge>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-teal dark:text-teal-300 mb-2">
                {fw.label}
              </p>
              <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
                {fw.description}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Closing Principle */}
      <SectionWrapper className="pb-16">
        <div className="max-w-3xl mx-auto border-l-2 border-teal/40 dark:border-teal/30 pl-6 py-2">
          <p className="text-base text-slate dark:text-navy-200 leading-relaxed italic">
            &ldquo;This platform does not catalogue threats to be feared. It
            interprets incidents as strategic behaviors to be understood. The
            question is not &lsquo;what attacked us&rsquo; but &lsquo;what does
            this behavior mean, strategically, legally, and
            institutionally?&rsquo;&rdquo;
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
