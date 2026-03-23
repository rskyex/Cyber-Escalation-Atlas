type BadgeVariant = "default" | "teal" | "amber" | "navy" | "atlas" | "signal" | "threat";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  mono?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-ink-100 dark:bg-white/[0.06] text-steel-600 dark:text-steel-300",
  atlas: "bg-atlas-50 dark:bg-atlas-900/20 text-atlas-700 dark:text-atlas-400",
  teal: "bg-atlas-50 dark:bg-atlas-900/20 text-atlas-700 dark:text-atlas-400",
  signal:
    "bg-signal-50 dark:bg-signal-800/20 text-signal-700 dark:text-signal-400",
  amber:
    "bg-signal-50 dark:bg-signal-800/20 text-signal-700 dark:text-signal-400",
  threat:
    "bg-red-50 dark:bg-threat-600/10 text-threat-600 dark:text-threat-400",
  navy: "bg-ink-100 dark:bg-white/[0.08] text-ink-600 dark:text-steel-200",
};

export function Badge({ children, variant = "default", mono }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-micro font-medium ${
        variantStyles[variant]
      } ${mono ? "font-mono" : ""}`}
    >
      {children}
    </span>
  );
}
