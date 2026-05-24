"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  coordinate: string;
  layerIndex: string;
  title: string;
  tagline: string;
  description: string;
  classification?: string;
  status?: "live" | "modeled" | "speculative";
}

const statusMap = {
  live: { label: "Live model · streaming telemetry", dot: "status-dot" },
  modeled: { label: "Modeled · static parameters", dot: "status-dot status-dot-amber" },
  speculative: { label: "Speculative · interpretive", dot: "status-dot status-dot-amber" },
};

export function ObservatoryHeader({
  coordinate,
  layerIndex,
  title,
  tagline,
  description,
  classification = "UNCLASSIFIED · OPEN RESEARCH",
  status = "modeled",
}: Props) {
  const st = statusMap[status];

  return (
    <div className="relative mb-12">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
        <Link href="/observatory" className="tag-mono text-atlas-500 dark:text-atlas-400 hover:text-amber-400 transition-colors">
          ← Observatory
        </Link>
        <span className="tag-mono">{layerIndex}</span>
        <span className="tag-mono">COORD · {coordinate}</span>
        <span className="tag-mono opacity-70">{classification}</span>
        <span className="flex items-center gap-2 tag-mono">
          <span className={st.dot} />
          {st.label}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-editorial italic text-amber-400/70 text-body-lg mb-2">{tagline}</p>
        <h1 className="font-display text-display sm:text-display-lg text-white tracking-tight leading-[1.05]">
          {title}
        </h1>
        <p className="mt-6 text-body-lg text-steel-300/90 leading-relaxed max-w-3xl">
          {description}
        </p>
      </motion.div>

      <div className="obs-rule mt-10" />
    </div>
  );
}
