"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export function PageHeader({ title, subtitle, accent }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <h1
        className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          accent
            ? "text-teal-600 dark:text-teal-300"
            : "text-navy dark:text-offwhite"
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-slate dark:text-navy-200 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
