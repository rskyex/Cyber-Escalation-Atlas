"use client";

import { motion } from "framer-motion";

interface UnpeaceAxisProps {
  /** Score between 1 and 10; displayed on a 0–100 scale. */
  score: number;
}

const zones = [
  { label: "Stable", start: 0, end: 30, bg: "bg-teal-100 dark:bg-teal-900/25" },
  { label: "Contested", start: 30, end: 60, bg: "bg-navy-100 dark:bg-navy-600/30" },
  { label: "Escalatory", start: 60, end: 100, bg: "bg-amber-100 dark:bg-amber-900/20" },
];

export function UnpeaceAxis({ score }: UnpeaceAxisProps) {
  const displayScore = score * 10; // map 1-10 → 10-100
  const pct = Math.min(100, Math.max(0, displayScore));

  return (
    <div className="space-y-2">
      {/* Zone labels */}
      <div className="flex text-[10px] font-medium uppercase tracking-wider">
        {zones.map((z) => (
          <div
            key={z.label}
            className="text-center text-slate dark:text-navy-300"
            style={{ width: `${z.end - z.start}%` }}
          >
            {z.label}
          </div>
        ))}
      </div>

      {/* Axis bar */}
      <div className="relative h-6 rounded-full overflow-hidden flex">
        {zones.map((z) => (
          <div
            key={z.label}
            className={`h-full ${z.bg}`}
            style={{ width: `${z.end - z.start}%` }}
          />
        ))}

        {/* Marker */}
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-0 h-full flex items-center"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 border-white dark:border-navy-800 shadow-sm ${
              pct >= 60
                ? "bg-amber-500"
                : pct >= 30
                  ? "bg-navy-400"
                  : "bg-teal-500"
            }`}
          />
        </motion.div>
      </div>

      {/* Numeric labels */}
      <div className="flex justify-between text-[10px] font-mono text-slate dark:text-navy-400">
        <span>0</span>
        <span>30</span>
        <span>60</span>
        <span>100</span>
      </div>
    </div>
  );
}
