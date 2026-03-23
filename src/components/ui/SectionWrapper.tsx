interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function SectionWrapper({ children, className = "", narrow }: SectionWrapperProps) {
  return (
    <section className={`py-16 sm:py-22 ${className}`}>
      <div className={`mx-auto ${narrow ? "max-w-prose" : "max-w-content"} px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
