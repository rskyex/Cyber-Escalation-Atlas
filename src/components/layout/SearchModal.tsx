"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { search, type SearchItem, type SearchType } from "@/lib/search";

const typeStyles: Record<SearchType, string> = {
  Case: "bg-atlas-100 dark:bg-atlas-900/40 text-atlas-700 dark:text-atlas-300",
  Actor: "bg-signal-50 dark:bg-signal-900/30 text-signal-700 dark:text-signal-300",
  Norm: "bg-ink-100 dark:bg-ink-600/40 text-ink dark:text-steel-200",
  Legal: "bg-amber-50 dark:bg-amber-900/25 text-amber-700 dark:text-amber-300",
  Term: "bg-violet-50 dark:bg-violet-900/25 text-violet-700 dark:text-violet-300",
};

/**
 * Site-wide search modal, opened with Cmd/Ctrl-K or the header button. Searches
 * a client-side index over cases, actors, norms, legal rules, and glossary
 * terms with keyboard navigation.
 */
export function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query ? search(query) : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // Global open shortcut + expose an event so the header button can open it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cea:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cea:open-search", onOpen);
    };
  }, [close]);

  // Focus input when opened.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = useCallback(
    (item: SearchItem) => {
      close();
      router.push(item.href);
    },
    [close, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] bg-ink-900/50 backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        className="w-full max-w-xl rounded-xl border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
      >
        <div className="flex items-center gap-3 px-4 border-b border-steel-200/30 dark:border-ink-600/40">
          <svg className="w-4 h-4 text-steel-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m2.2-5.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search cases, actors, norms, legal rules, glossary…"
            className="flex-1 bg-transparent py-3.5 text-sm text-ink dark:text-white placeholder:text-steel-400 focus:outline-none"
            aria-label="Search query"
          />
          <kbd className="hidden sm:block text-[10px] font-mono text-steel-500 border border-steel-300/40 dark:border-ink-600/50 rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="px-4 py-6 text-sm text-steel-500 dark:text-steel-400 text-center">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          )}
          {!query && (
            <p className="px-4 py-6 text-sm text-steel-500 dark:text-steel-400 text-center">
              Type to search across the atlas.
            </p>
          )}
          <ul>
            {results.map((item, i) => (
              <li key={`${item.type}-${item.href}-${item.title}`}>
                <button
                  onClick={() => go(item)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${
                    i === active
                      ? "bg-atlas-50/70 dark:bg-atlas-900/20"
                      : "hover:bg-ink-50/50 dark:hover:bg-ink-700/30"
                  }`}
                >
                  <span className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${typeStyles[item.type]}`}>
                    {item.type}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink dark:text-white truncate">
                      {item.title}
                    </span>
                    <span className="block text-xs text-steel-500 dark:text-steel-400 truncate">
                      {item.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
