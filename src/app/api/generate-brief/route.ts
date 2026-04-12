import { NextResponse } from "next/server";
import { seedIncidents } from "@/data/incidents";
import type { TargetSector } from "@/lib/types/incidents";

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
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { actor?: string; sector?: string; region?: string; briefType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { actor = "all", sector = "all", region = "all", briefType = "executive" } = body;

  // Filter cases
  let cases = [...seedIncidents];
  if (actor !== "all") {
    cases = cases.filter((c) => c.actorSlug === actor);
  }
  if (sector !== "all") {
    cases = cases.filter((c) =>
      c.infrastructure.targetSectors.includes(sector as TargetSector)
    );
  }
  if (region !== "all") {
    cases = cases.filter((c) =>
      c.infrastructure.targetCountries.some(
        (country) => country.toLowerCase() === region.toLowerCase()
      )
    );
  }

  if (cases.length === 0) {
    return NextResponse.json(
      { error: "No cases match the selected filters" },
      { status: 400 }
    );
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

  const systemPrompt = `You are a senior cyber policy analyst producing a structured intelligence brief for a policy audience. Write in precise, non-sensational, analytically grounded language. Use the following section structure: ${structure}. Target approximately ${wordCount} words. Format section headers with ## markdown. Do not include a title — the platform will add it.`;

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
        { error: errData.error?.message || `Anthropic API error (${res.status})` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text =
      data.content?.[0]?.text || "Brief generation returned no content.";

    return NextResponse.json({ brief: text });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to call Anthropic API" },
      { status: 502 }
    );
  }
}
