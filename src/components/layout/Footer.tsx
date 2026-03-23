import Link from "next/link";
import { primaryNav } from "@/lib/navigation";

const relatedProjects = [
  { label: "Nuclear Atlas", href: "#" },
  { label: "Orbital Risk Tracker", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-200/20 dark:border-navy-600/40 bg-offwhite dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
              Cyber Escalation Atlas&trade;
            </h3>
            <p className="text-sm text-slate dark:text-navy-200 leading-relaxed">
              A policy-grade interactive reference for understanding cyber
              operations, escalation dynamics, and governance frameworks.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-navy-300 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {primaryNav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate dark:text-navy-200 hover:text-teal dark:hover:text-teal-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-navy-300 mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              {primaryNav.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate dark:text-navy-200 hover:text-teal dark:hover:text-teal-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate dark:text-navy-200 hover:text-teal dark:hover:text-teal-300 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Related Projects */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-navy-300 mb-3">
              Related Projects
            </h4>
            <ul className="space-y-2">
              {relatedProjects.map((project) => (
                <li key={project.label}>
                  <a
                    href={project.href}
                    className="text-sm text-teal dark:text-teal-300 hover:text-teal-600 dark:hover:text-teal-200 transition-colors"
                  >
                    {project.label} &rarr;
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-200/20 dark:border-navy-600/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate dark:text-navy-300">
            &copy; 2026 Risa Koyanagi. All rights reserved.
          </p>
          <p className="text-xs text-slate dark:text-navy-300">
            Built by{" "}
            <a
              href="https://risakoyanagi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal dark:text-teal-300 hover:text-teal-600 dark:hover:text-teal-200 transition-colors"
            >
              Risa Koyanagi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
