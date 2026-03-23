"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export function Card({ children, className = "", hover = false, accent = false }: CardProps) {
  const base =
    "rounded-xl bg-ink-50/50 dark:bg-white/[0.03] p-6 transition-all duration-300";
  const borderStyles = "border border-transparent dark:border-white/[0.04]";
  const hoverStyles = hover
    ? "hover:bg-ink-100/60 dark:hover:bg-white/[0.06] hover:shadow-depth cursor-pointer"
    : "";
  const accentStyles = accent ? "card-accent" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${base} ${borderStyles} ${hoverStyles} ${accentStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
