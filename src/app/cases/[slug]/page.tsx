import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seedIncidents } from "@/data/incidents";
import { findBySlug, findRelated } from "@/lib/utils/incidents";
import { SectionWrapper } from "@/components/ui";
import {
  HeaderSection,
  SummarySection,
  EscalationSection,
  AttributionSection,
  UnpeaceSection,
  CoerciveSection,
  EntanglementSection,
  InfrastructureSection,
  GovernanceSection,
  AttackSection,
  TeachingSection,
  SourcesSection,
  RelatedSection,
  CaseExportButton,
} from "@/components/case-detail";

// ---------------------------------------------------------------------------
// Static params — generate all slug pages at build time
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return seedIncidents.map((i) => ({ slug: i.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const incident = findBySlug(seedIncidents, params.slug);
  if (!incident) return { title: "Case Not Found" };
  return {
    title: `${incident.shortName} — Cyber Escalation Atlas`,
    description: incident.summary.slice(0, 160),
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const incident = findBySlug(seedIncidents, params.slug);
  if (!incident) notFound();

  const related = findRelated(incident, seedIncidents, 4);

  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Export */}
        <div className="flex justify-end">
          <CaseExportButton incident={incident} />
        </div>

        {/* 1. Header fields */}
        <HeaderSection incident={incident} />

        {/* 2–3. Executive summary + Why this matters */}
        <SummarySection incident={incident} />

        {/* 4. Escalation profile */}
        <EscalationSection incident={incident} />

        {/* 5. Attribution assessment (3-layer) */}
        <AttributionSection incident={incident} />

        {/* 6. Unpeace position */}
        <UnpeaceSection incident={incident} />

        {/* 7. Coercive function */}
        <CoerciveSection incident={incident} />

        {/* 8. Entanglement risk */}
        <EntanglementSection incident={incident} />

        {/* 9. Infrastructure meaning */}
        <InfrastructureSection incident={incident} />

        {/* 10. Governance analysis (visually prominent) */}
        <GovernanceSection incident={incident} />

        {/* 11. ATT&CK mapping (collapsible) */}
        <AttackSection incident={incident} />

        {/* 12. Teaching mode (collapsible) */}
        <TeachingSection incident={incident} />

        {/* 13. Sources */}
        <SourcesSection incident={incident} />

        {/* 14. Related cases */}
        <RelatedSection related={related} />
      </div>
    </SectionWrapper>
  );
}
