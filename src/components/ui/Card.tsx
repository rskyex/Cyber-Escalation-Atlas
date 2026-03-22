"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const base =
    "rounded-lg border border-navy-200/30 dark:border-navy-600/40 bg-white dark:bg-navy-700/50 p-6";
  const hoverStyles = hover
    ? "transition-shadow hover:shadow-md dark:hover:shadow-navy-900/40"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`${base} ${hoverStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
