import type { Incident } from "@/lib/types/incidents";
import { Badge } from "@/components/ui";
import { attributionLabels, attributionBadge } from "@/lib/utils/incidents";
import { SectionHeading } from "./SectionHeading";

interface AttributionSectionProps {
  incident: Incident;
}

export function AttributionSection({ incident }: AttributionSectionProps) {
  const { attribution, governance, sources } = incident;

  // Layer 1: Technical — derived from sources with vendor/academic category
  const technicalSources = sources.filter(
    (s) => s.category === "vendor" || s.category === "academic",
  );
  // Layer 2: Political — government statements, indictments
  const politicalSources = sources.filter(
    (s) => s.category === "government" || s.category === "legal",
  );
  // Layer 3: Journalistic
  const journalisticSources = sources.filter(
    (s) => s.category === "journalistic",
  );

  const hasIndictment = governance.flags.includes("indictment");
  const hasPublicAttribution = governance.flags.includes("attribution-public");
  const hasSanctions = governance.flags.includes("sanctions-imposed");

  return (
    <section>
      <SectionHeading id="attribution">Attribution Assessment</SectionHeading>

      {/* Confidence badge */}
      <div className="flex items-center gap-3 mb-5">
        <Badge variant={attributionBadge[attribution.confidence]}>
          {attributionLabels[attribution.confidence]}
        </Badge>
        <span className="text-sm text-slate dark:text-navy-200">
          {attribution.attributedTo}
        </span>
      </div>

      {/* 3-layer table */}
      <div className="rounded-lg border border-navy-200/30 dark:border-navy-600/40 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-50 dark:bg-navy-700/50">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate dark:text-navy-300 uppercase tracking-wider w-36">
                Layer
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate dark:text-navy-300 uppercase tracking-wider">
                Detail
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-200/20 dark:divide-navy-600/30">
            {/* Layer 1: Technical */}
            <tr className="bg-white dark:bg-navy-700/20">
              <td className="px-4 py-3 align-top">
                <span className="text-xs font-semibold text-navy dark:text-navy-100">
                  1. Technical
                </span>
              </td>
              <td className="px-4 py-3">
                <p className="text-navy dark:text-offwhite">
                  Country: <strong>{attribution.country}</strong>
                </p>
                {attribution.aliases.length > 0 && (
                  <p className="text-slate dark:text-navy-200 mt-1">
                    Aliases: {attribution.aliases.join(", ")}
                  </p>
                )}
                {technicalSources.length > 0 && (
                  <p className="text-xs text-slate dark:text-navy-300 mt-2">
                    Based on:{" "}
                    {technicalSources.map((s) => s.title).join("; ")}
                  </p>
                )}
              </td>
            </tr>

            {/* Layer 2: Political/Legal */}
            <tr className="bg-white dark:bg-navy-700/20">
              <td className="px-4 py-3 align-top">
                <span className="text-xs font-semibold text-navy dark:text-navy-100">
                  2. Political / Legal
                </span>
              </td>
              <td className="px-4 py-3">
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
                  <p className="text-xs text-slate dark:text-navy-300 mt-2">
                    Sources:{" "}
                    {politicalSources.map((s) => s.title).join("; ")}
                  </p>
                )}
              </td>
            </tr>

            {/* Layer 3: Journalistic / Open Source */}
            <tr className="bg-white dark:bg-navy-700/20">
              <td className="px-4 py-3 align-top">
                <span className="text-xs font-semibold text-navy dark:text-navy-100">
                  3. Open Source
                </span>
              </td>
              <td className="px-4 py-3">
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
                    section below for full references.
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Confidence note */}
      <p className="text-xs text-slate dark:text-navy-400 mt-3 italic">
        Attribution confidence reflects the level of public evidence and
        official statements available. &ldquo;{attributionLabels[attribution.confidence]}&rdquo;
        does not imply certainty — all assessments carry inherent uncertainty
        and should be read alongside the source material.
      </p>
    </section>
  );
}
