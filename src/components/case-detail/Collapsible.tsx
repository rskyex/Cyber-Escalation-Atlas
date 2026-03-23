"use client";

import { useState } from "react";

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  secondary?: boolean;
}

export function Collapsible({
  title,
  defaultOpen = false,
  children,
  secondary = false,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-lg border ${
        secondary
          ? "border-navy-200/20 dark:border-navy-600/30"
          : "border-navy-200/30 dark:border-navy-600/40"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-left"
      >
        <span
          className={`font-semibold ${
            secondary
              ? "text-sm text-slate dark:text-navy-200"
              : "text-base text-navy dark:text-offwhite"
          }`}
        >
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-slate dark:text-navy-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-navy-200/20 dark:border-navy-600/30 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
