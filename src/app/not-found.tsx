import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found (404)",
  robots: { index: false },
};

const destinations = [
  { href: "/cases", label: "Case Database", desc: "Browse documented operations" },
  { href: "/observatory", label: "Observatory", desc: "Interactive escalation layers" },
  { href: "/compare", label: "Compare", desc: "Analyse cases side by side" },
  { href: "/glossary", label: "Glossary", desc: "Concepts and definitions" },
  { href: "/methodology", label: "Methodology", desc: "How the Atlas is built" },
  { href: "/data", label: "Data & Downloads", desc: "Export the dataset" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 lg:px-8 py-24 sm:py-32">
      <p className="tag-mono text-atlas-500 dark:text-atlas-400 mb-3">ERROR · 404</p>
      <h1 className="font-display text-display sm:text-display-lg text-ink dark:text-white mb-4">
        This coordinate isn&apos;t on the map.
      </h1>
      <p className="text-body text-steel-500 dark:text-steel-400 max-w-xl mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Here are
        the main sections of the atlas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {destinations.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group block p-5 rounded-xl border border-steel-200/25 dark:border-white/[0.05] bg-ink-50/40 dark:bg-white/[0.02] hover:border-atlas-400/50 hover:bg-ink-100/60 dark:hover:bg-white/[0.05] transition-all"
          >
            <p className="text-sm font-semibold text-ink dark:text-white group-hover:text-atlas-600 dark:group-hover:text-atlas-400 transition-colors">
              {d.label}
            </p>
            <p className="text-xs text-steel-500 dark:text-steel-400 mt-1">{d.desc}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 mt-10 text-sm font-medium text-atlas-600 dark:text-atlas-400 hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
