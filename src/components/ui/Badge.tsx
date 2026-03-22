type BadgeVariant = "default" | "teal" | "amber" | "navy";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  mono?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-navy-100 dark:bg-navy-600/50 text-navy dark:text-navy-100",
  teal: "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300",
  amber:
    "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  navy: "bg-navy-200 dark:bg-navy-600 text-navy dark:text-navy-100",
};

export function Badge({ children, variant = "default", mono }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
        variantStyles[variant]
      } ${mono ? "font-mono" : ""}`}
    >
      {children}
    </span>
  );
}
