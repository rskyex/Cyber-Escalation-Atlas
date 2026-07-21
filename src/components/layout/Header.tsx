"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { primaryNav, secondaryNav } from "@/lib/navigation";
import { useTheme } from "./ThemeProvider";
import { SearchModal } from "./SearchModal";

function openSearch() {
  window.dispatchEvent(new Event("cea:open-search"));
}

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-ink-800/80 backdrop-blur-xl">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            {/* Atlas mark */}
            <div className="w-7 h-7 rounded-md bg-atlas/10 dark:bg-atlas/15 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-atlas-500 dark:text-atlas-400">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
                <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
              </svg>
            </div>
            <span className="text-body font-semibold text-ink dark:text-white tracking-tight">
              CEA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-caption rounded-md transition-all duration-200 ${
                    active
                      ? "text-white bg-ink-500/80 dark:bg-white/10 font-medium"
                      : item.highlight
                        ? "text-atlas-600 dark:text-atlas-400 hover:text-atlas-500 dark:hover:text-atlas-300 font-medium"
                        : "text-steel-500 dark:text-steel-400 hover:text-ink dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Secondary links — desktop only */}
            <div className="hidden lg:flex items-center gap-0.5 mr-2">
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 text-caption rounded-md transition-colors ${
                    pathname === item.href
                      ? "text-ink dark:text-white font-medium"
                      : "text-steel-600 dark:text-steel-500 hover:text-ink dark:hover:text-steel-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Search trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-steel-500 dark:text-steel-400 hover:text-ink dark:hover:text-white hover:bg-ink-50/50 dark:hover:bg-white/5 transition-colors"
              aria-label="Search (Command K)"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m2.2-5.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
              <kbd className="hidden lg:inline text-[10px] font-mono text-steel-500 border border-steel-300/40 dark:border-ink-600/50 rounded px-1 py-0.5">
                ⌘K
              </kbd>
            </button>

            <div className="hidden lg:block w-px h-4 bg-steel-200/30 dark:bg-steel-700/30 mx-1" />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-steel-500 dark:text-steel-400 hover:text-ink dark:hover:text-white hover:bg-ink-50/50 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-steel-500 dark:text-steel-400 hover:text-ink dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle bottom line */}
      <div className="atlas-rule" />

      {/* Site-wide search (Cmd/Ctrl-K) */}
      <SearchModal />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-ink-800/95 backdrop-blur-xl"
          >
            <nav className="px-6 py-4 space-y-0.5">
              {[...primaryNav, ...secondaryNav].map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 text-body rounded-lg transition-colors ${
                      active
                        ? "bg-atlas/5 text-atlas-600 dark:text-atlas-400 font-medium"
                        : item.highlight
                          ? "text-atlas-600 dark:text-atlas-400 font-medium"
                          : "text-steel-500 dark:text-steel-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
