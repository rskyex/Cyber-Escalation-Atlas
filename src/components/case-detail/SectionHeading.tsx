interface SectionHeadingProps {
  children: React.ReactNode;
  id?: string;
}

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-lg font-bold text-navy dark:text-offwhite tracking-tight mb-4"
    >
      {children}
    </h2>
  );
}
