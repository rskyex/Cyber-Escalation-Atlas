"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
  label?: string;
}

export function PageHeader({ title, subtitle, accent, label }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <h1
        className={`text-display-lg sm:text-display font-display tracking-tight ${
          accent
            ? "text-atlas-600 dark:text-atlas-400"
            : "text-ink dark:text-white"
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-body-lg text-steel-500 dark:text-steel-400 max-w-prose leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
