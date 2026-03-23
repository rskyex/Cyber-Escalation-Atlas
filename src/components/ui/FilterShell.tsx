interface FilterShellProps {
  children: React.ReactNode;
  filters?: React.ReactNode;
}

export function FilterShell({ children, filters }: FilterShellProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {filters && (
        <aside className="w-full lg:w-60 shrink-0">
          <div className="sticky top-20 space-y-4 p-5 rounded-xl bg-ink-50/50 dark:bg-white/[0.02] border border-transparent dark:border-white/[0.04]">
            <h3 className="text-micro font-semibold uppercase tracking-widest text-steel-600 dark:text-steel-500">
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
