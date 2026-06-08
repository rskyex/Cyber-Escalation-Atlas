import Link from "next/link";
import { primaryNav, secondaryNav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="atlas-rule" />
      <div className="mx-auto max-w-content px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 rounded-md bg-atlas/10 dark:bg-atlas/15 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-atlas-500 dark:text-atlas-400">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
                  <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                  <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                </svg>
              </div>
              <span className="text-body font-semibold text-ink dark:text-white tracking-tight">
                Cyber Escalation Atlas
              </span>
            </div>
            <p className="text-caption text-steel-500 dark:text-steel-500 leading-relaxed max-w-sm">
              A research reference for understanding cyber operations,
              escalation dynamics, and governance frameworks.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-micro font-semibold uppercase tracking-widest text-steel-600 dark:text-steel-600 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption text-steel-500 dark:text-steel-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-micro font-semibold uppercase tracking-widest text-steel-600 dark:text-steel-600 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption text-steel-500 dark:text-steel-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Faultline Ecosystem */}
          <div className="lg:col-span-2">
            <h4 className="text-micro font-semibold uppercase tracking-widest text-steel-600 dark:text-steel-600 mb-4">
              Faultline
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://faultline-nqmm.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 dark:hover:text-atlas-300 transition-colors"
                >
                  Faultline Hub
                </a>
              </li>
              <li>
                <a
                  href="https://globalnuclearinfrastructureatlas.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-steel-500 dark:text-steel-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                >
                  Nuclear Infrastructure Atlas
                </a>
              </li>
              <li>
                <a
                  href="https://orbitalrisktracker.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-steel-500 dark:text-steel-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                >
                  Orbital Risk Tracker
                </a>
              </li>
              <li>
                <a
                  href="https://lunar-mandate-atlas.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-steel-500 dark:text-steel-400 hover:text-atlas-600 dark:hover:text-atlas-400 transition-colors"
                >
                  Space Mandate Atlas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="atlas-rule mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-micro text-steel-600 dark:text-steel-600">
            &copy; 2026 Risa Koyanagi. All rights reserved.
          </p>
          <p className="text-micro text-steel-600 dark:text-steel-600">
            A{" "}
            <a
              href="https://faultline-nqmm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 dark:hover:text-atlas-300 transition-colors"
            >
              Faultline
            </a>
            {" "}project by{" "}
            <a
              href="https://risakoyanagi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 dark:hover:text-atlas-300 transition-colors"
            >
              Risa Koyanagi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
