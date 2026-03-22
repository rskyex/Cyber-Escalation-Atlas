import { PageHeader, SectionWrapper, Card } from "@/components/ui";

export default function EscalationLensPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Escalation Lens"
        subtitle="Analyze how cyber operations move through phases of escalation — from initial access to strategic consequences — and how states signal, restrain, or intensify."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Escalation Timeline
          </h3>
          <p className="text-sm text-slate dark:text-navy-200">
            Interactive timeline visualization of escalation phases will be
            rendered here. Each case will be plotted against a common escalation
            framework.
          </p>
          <div className="mt-4 h-48 rounded-md border border-dashed border-navy-200/30 dark:border-navy-600/30 flex items-center justify-center text-sm text-slate/50 dark:text-navy-400">
            Timeline visualization placeholder
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-navy dark:text-offwhite mb-2">
            Escalation Patterns
          </h3>
          <p className="text-sm text-slate dark:text-navy-200">
            Cross-case comparison of escalation dynamics, restraint signals, and
            threshold-crossing events.
          </p>
          <div className="mt-4 h-48 rounded-md border border-dashed border-navy-200/30 dark:border-navy-600/30 flex items-center justify-center text-sm text-slate/50 dark:text-navy-400">
            Pattern analysis placeholder
          </div>
        </Card>
      </div>
    </SectionWrapper>
  );
}
