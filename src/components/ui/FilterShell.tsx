interface FilterShellProps {
  children: React.ReactNode;
  filters?: React.ReactNode;
}

export function FilterShell({ children, filters }: FilterShellProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {filters && (
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-20 space-y-4 p-4 rounded-lg border border-navy-200/30 dark:border-navy-600/40 bg-white dark:bg-navy-700/50">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-navy-300">
              Filters
            </h3>
            {filters}
          </div>
        </aside>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
