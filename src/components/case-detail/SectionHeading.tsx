interface SectionHeadingProps {
  children: React.ReactNode;
  id?: string;
}

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-lg font-bold text-ink dark:text-white tracking-tight mb-4"
    >
      {children}
    </h2>
  );
}
