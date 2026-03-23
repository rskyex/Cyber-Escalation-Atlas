import type { Incident, AttributionConfidence } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { attributionLabels, attributionBadge } from "@/lib/utils/incidents";

interface AttributionTableProps {
  incident: Incident;
}

const confidenceBarWidth: Record<AttributionConfidence, string> = {
  confirmed: "100%",
  high: "80%",
  moderate: "55%",
  low: "30%",
  contested: "15%",
};

const confidenceBarColor: Record<AttributionConfidence, string> = {
  confirmed: "bg-teal-500",
  high: "bg-teal-400",
  moderate: "bg-navy-400",
  low: "bg-amber-400",
  contested: "bg-amber-500",
};

export function AttributionTable({ incident }: AttributionTableProps) {
  const { attribution, governance, sources } = incident;

  const technicalSources = sources.filter(
    (s) => s.category === "vendor" || s.category === "academic",
  );
  const politicalSources = sources.filter(
    (s) => s.category === "government" || s.category === "legal",
  );
  const journalisticSources = sources.filter(
    (s) => s.category === "journalistic",
  );

  const hasIndictment = governance.flags.includes("indictment");
  const hasPublicAttribution = governance.flags.includes("attribution-public");
  const hasSanctions = governance.flags.includes("sanctions-imposed");

  return (
    <div className="rounded-lg border-2 border-navy-200/40 dark:border-navy-500/30 overflow-hidden">
      {/* Confidence header */}
      <div className="px-5 py-4 bg-navy-50/70 dark:bg-navy-700/40 border-b border-navy-200/30 dark:border-navy-600/30">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <Badge variant={attributionBadge[attribution.confidence]}>
              {attributionLabels[attribution.confidence]}
            </Badge>
            <span className="text-sm font-medium text-navy dark:text-offwhite">
              {attribution.attributedTo}
            </span>
          </div>
          <span className="text-xs text-slate dark:text-navy-300 shrink-0">
            {attribution.country}
          </span>
        </div>

        {/* Confidence bar */}
        <div className="h-1.5 rounded-full bg-navy-100 dark:bg-navy-600/40 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${confidenceBarColor[attribution.confidence]}`}
            style={{ width: confidenceBarWidth[attribution.confidence] }}
          />
        </div>

        {attribution.aliases.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {attribution.aliases.map((alias) => (
              <span
                key={alias}
                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-navy-100/60 dark:bg-navy-600/30 text-navy dark:text-navy-200"
              >
                {alias}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3-layer rows */}
      <div className="divide-y divide-navy-200/20 dark:divide-navy-600/25">
        {/* Layer 1 */}
        <LayerRow
          number={1}
          label="Technical"
          accent="teal"
        >
          <p className="text-sm text-navy dark:text-offwhite">
            Threat actor mapped to <strong>{attribution.country}</strong> based
            on infrastructure analysis, malware attribution, and operational
            patterns.
          </p>
          {technicalSources.length > 0 && (
            <p className="text-xs text-slate dark:text-navy-400 mt-2">
              Evidence: {technicalSources.map((s) => s.title).join("; ")}
            </p>
          )}
        </LayerRow>

        {/* Layer 2 */}
        <LayerRow
          number={2}
          label="Political / Legal"
          accent="navy"
        >
          <div className="flex flex-wrap gap-1.5 mb-2">
            {hasPublicAttribution && (
              <Badge variant="teal">Public Attribution</Badge>
            )}
            {hasIndictment && <Badge variant="teal">Indictment</Badge>}
            {hasSanctions && (
              <Badge variant="teal">Sanctions Imposed</Badge>
            )}
            {!hasPublicAttribution && !hasIndictment && !hasSanctions && (
              <Badge variant="default">No formal state response</Badge>
            )}
          </div>
          {governance.policyResponses.length > 0 && (
            <ul className="space-y-1 mt-1">
              {governance.policyResponses.map((r, i) => (
                <li
                  key={i}
                  className="text-sm text-slate dark:text-navy-200 flex gap-2"
                >
                  <span className="text-navy-300 shrink-0">&bull;</span>
                  {r}
                </li>
              ))}
            </ul>
          )}
          {politicalSources.length > 0 && (
            <p className="text-xs text-slate dark:text-navy-400 mt-2">
              Sources: {politicalSources.map((s) => s.title).join("; ")}
            </p>
          )}
        </LayerRow>

        {/* Layer 3 */}
        <LayerRow
          number={3}
          label="Open Source"
          accent="default"
        >
          {journalisticSources.length > 0 ? (
            <ul className="space-y-1">
              {journalisticSources.map((s, i) => (
                <li
                  key={i}
                  className="text-sm text-slate dark:text-navy-200"
                >
                  {s.title}
                  {s.date && (
                    <span className="text-xs text-navy-300 ml-1">
                      ({s.date})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate dark:text-navy-300 italic">
              No dedicated journalistic sources in dataset. See sources
              section for full references.
            </p>
          )}
        </LayerRow>
      </div>

      {/* Confidence caveat */}
      <div className="px-5 py-3 bg-navy-50/40 dark:bg-navy-800/20 border-t border-navy-200/20 dark:border-navy-600/25">
        <p className="text-xs text-slate dark:text-navy-400 italic">
          &ldquo;{attributionLabels[attribution.confidence]}&rdquo; reflects
          available public evidence. All assessments carry inherent uncertainty
          and should be read alongside source material.
        </p>
      </div>
    </div>
  );
}

function LayerRow({
  number,
  label,
  accent,
  children,
}: {
  number: number;
  label: string;
  accent: "teal" | "navy" | "default";
  children: React.ReactNode;
}) {
  const accentBorder =
    accent === "teal"
      ? "border-l-teal-400 dark:border-l-teal-500"
      : accent === "navy"
        ? "border-l-navy-400 dark:border-l-navy-300"
        : "border-l-navy-200 dark:border-l-navy-500";

  return (
    <div
      className={`flex gap-4 px-5 py-4 border-l-[3px] bg-white dark:bg-navy-700/15 ${accentBorder}`}
    >
      <div className="shrink-0 w-28">
        <span className="text-xs font-bold text-navy dark:text-navy-100">
          {number}. {label}
        </span>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
