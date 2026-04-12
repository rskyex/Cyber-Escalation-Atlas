"use client";

import type { Incident } from "@/lib/types/incidents";
import { exportCasePdf } from "@/lib/utils/pdf";
import { ExportButton } from "@/components/ui";

export function CaseExportButton({ incident }: { incident: Incident }) {
  return <ExportButton onClick={() => exportCasePdf(incident)} />;
}
