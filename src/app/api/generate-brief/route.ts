import { NextResponse } from "next/server";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import {
  buildTemplateBrief,
  filterCasesForBrief,
  type BriefType,
} from "@/lib/utils/templateBrief";

const STRUCTURES: Record<string, string> = {
  executive:
    "Threat Landscape Overview / Key Incidents / Escalation Pattern / Governance Implications / Recommended Watch Areas",
  technical:
    "Actor TTPs / Infrastructure Targeting / Attack Vectors / Persistence Mechanisms / Detection Considerations",
  governance:
    "Norm Violations Identified / Attribution Accountability Gap / Policy Responses to Date / Residual Governance Gaps / Recommendations",
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { actor?: string; sector?: string; region?: string; briefType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { actor = "all", sector = "all", region = "all", briefType = "executive" } = body;

  const cases = filterCasesForBrief(seedIncidents, { actor, sector, region });
  if (cases.length === 0) {
    return NextResponse.json(
      { error: "No cases match the selected filters" },
      { status: 400 }
    );
  }

  // No model configured: return a deterministic brief built only from the
  // filtered case records, clearly labelled as a template.
  if (!apiKey) {
    const type: BriefType =
      briefType === "technical" || briefType === "governance" ? briefType : "executive";
    const actorName = actorProfiles.find((a) => a.slug === actor)?.name;
    return NextResponse.json({
      brief: buildTemplateBrief(cases, { actor, sector, region, actorName }, type),
      mode: "template",
      caseCount: cases.length,
    });
  }

  const structure = STRUCTURES[briefType] || STRUCTURES.executive;
  const wordCount = briefType === "executive" ? 500 : 800;

  const caseData = cases.map((c) => ({
    name: c.name,
    year: c.year,
    type: c.incidentType,
    attribution: c.attribution.attributedTo,
    country: c.attribution.country,
    sectors: c.infrastructure.targetSectors,
    peakTier: c.escalation.peakTier,
    governanceFlags: c.governance.flags,
    impact: c.governance.impact,
    summary: c.summary,
  }));

  const systemPrompt = `You are a senior cyber policy analyst producing a structured intelligence brief for a policy audience. Write in precise, non-sensational, analytically grounded language. Use only the facts in the case data provided. Do not add names, dates, figures or events that are not in that data; if something is not in the data, say it is not recorded. Use the following section structure: ${structure}. Target approximately ${wordCount} words. Format section headers with ## markdown. Do not include a title, the platform will add it.`;

  const userMessage = `Produce a ${briefType} brief based on the following ${cases.length} cases from the Cyber Escalation Atlas dataset.

Filters applied: Actor=${actor}, Sector=${sector}, Region=${region}.

Case data:
${JSON.stringify(caseData, null, 2)}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: `The AI model request failed (${errData.error?.message || `HTTP ${res.status}`}).`,
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text =
      data.content?.[0]?.text || "Brief generation returned no content.";

    return NextResponse.json({ brief: text, mode: "ai", caseCount: cases.length });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        error: `The AI model could not be reached (${e instanceof Error ? e.message : "network error"}).`,
      },
      { status: 502 }
    );
  }
}
