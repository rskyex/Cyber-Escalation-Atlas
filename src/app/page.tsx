"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";

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
  { label: "Documented Cases", value: "20", note: "coming soon" },
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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-navy dark:text-offwhite leading-tight">
            Mapping Cyber Conflict
            <br />
            for Policy and Practice
          </h1>
          <p className="mt-6 text-lg text-slate dark:text-navy-200 leading-relaxed max-w-2xl">
            The Cyber Escalation Atlas is a structured, policy-grade reference
            for understanding how state-linked cyber operations unfold, escalate,
            and reshape governance. Built for analysts, educators, and
            policymakers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cases"
              className="inline-flex items-center px-5 py-2.5 rounded-md bg-navy dark:bg-offwhite text-offwhite dark:text-navy text-sm font-medium hover:bg-navy-600 dark:hover:bg-navy-100 transition-colors"
            >
              Explore Cases
            </Link>
            <Link
              href="/governance-lens"
              className="inline-flex items-center px-5 py-2.5 rounded-md border border-teal text-teal dark:text-teal-300 text-sm font-medium hover:bg-teal/10 transition-colors"
            >
              Governance Lens
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center px-5 py-2.5 rounded-md border border-navy-200/40 dark:border-navy-600/40 text-slate dark:text-navy-200 text-sm font-medium hover:bg-navy-100/40 dark:hover:bg-navy-600/20 transition-colors"
            >
              Methodology
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

      {/* Lenses */}
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
    </>
  );
}
