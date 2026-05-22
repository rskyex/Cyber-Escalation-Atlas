"use client";

interface ExcelDownloadButtonProps {
  onClick: () => void;
  label?: string;
  variant?: "default" | "primary";
}

export function ExcelDownloadButton({
  onClick,
  label = "Download Excel",
  variant = "default",
}: ExcelDownloadButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors print:hidden";
  const variantClasses =
    variant === "primary"
      ? "bg-atlas-500 hover:bg-atlas-600 text-white border border-atlas-500"
      : "border border-atlas-400/50 dark:border-atlas-600/40 text-atlas-700 dark:text-atlas-400 hover:bg-atlas-50/50 dark:hover:bg-atlas-900/20";

  return (
    <button onClick={onClick} className={`${base} ${variantClasses}`}>
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {label}
    </button>
  );
}
