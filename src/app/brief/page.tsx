"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import { targetSectorLabels } from "@/lib/utils/incidents";
import type { TargetSector } from "@/lib/types/incidents";
import {
  TEMPLATE_BRIEF_LABEL,
  buildTemplateBrief,
  filterCasesForBrief,
  type BriefType,
} from "@/lib/utils/templateBrief";

const BRIEF_TYPES = [
  { value: "executive", label: "Executive Summary (500 words)" },
  { value: "technical", label: "Technical Assessment (800 words)" },
  { value: "governance", label: "Governance Analysis (800 words)" },
];

const allSectors: TargetSector[] = [
  "energy", "finance", "government", "healthcare", "telecommunications",
  "transportation", "defense", "technology", "manufacturing", "media",
  "critical-infrastructure",
];

const allRegions = Array.from(
  new Set(seedIncidents.flatMap((i) => i.infrastructure.targetCountries))
).sort();

type BriefMode = "ai" | "template";

const TRUNCATED_LABEL =
  "[Truncated: the model reached its output limit before finishing this brief. The last section is incomplete.]";

function renderBrief(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="text-base font-bold text-ink dark:text-white mt-4 mb-2">{line.replace("## ", "")}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="text-sm font-bold text-ink dark:text-white mt-3 mb-1">{line.replace("### ", "")}</h3>;
    if (line.startsWith("- ")) return <p key={i} className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-1.5 pl-4 -indent-3 break-words">{"\u2022 "}{line.slice(2)}</p>;
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-2 break-words">{line}</p>;
  });
}

export default function BriefPage() {
  const [actor, setActor] = useState("all");
  const [sector, setSector] = useState("all");
  const [region, setRegion] = useState("all");
  const [briefType, setBriefType] = useState("executive");
  const [brief, setBrief] = useState("");
  const [mode, setMode] = useState<BriefMode>("ai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [briefCaseCount, setBriefCaseCount] = useState(0);
  const [truncated, setTruncated] = useState(false);

  const matchingCases = filterCasesForBrief(seedIncidents, { actor, sector, region });

  function buildLocalTemplate() {
    const type: BriefType =
      briefType === "technical" || briefType === "governance" ? briefType : "executive";
    const actorName = actorProfiles.find((a) => a.slug === actor)?.name;
    setBrief(buildTemplateBrief(matchingCases, { actor, sector, region, actorName }, type));
    setMode("template");
    setTruncated(false);
    setBriefCaseCount(matchingCases.length);
    setError("");
  }

  async function generate() {
    setLoading(true);
    setError("");
    setBrief("");
    setTruncated(false);
    setCopied(false);
    if (matchingCases.length === 0) {
      setError("No cases match the selected filters. Widen the actor, sector or region selection and try again.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actor, sector, region, briefType }),
      });
      const raw = await res.text();
      let data: { brief?: string; error?: string; mode?: BriefMode; truncated?: boolean } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.error || `The brief service returned an error (HTTP ${res.status}).`);
      }
      if (!data.brief || typeof data.brief !== "string") {
        throw new Error("The brief service returned an empty response.");
      }
      setBrief(data.brief);
      setMode(data.mode === "template" ? "template" : "ai");
      setTruncated(data.truncated === true);
      setBriefCaseCount(matchingCases.length);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      setError(msg && msg !== "Failed to fetch" ? msg : "Could not reach the brief service. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    const header = mode === "template" ? `${TEMPLATE_BRIEF_LABEL}\n\n` : "";
    try {
      const footer = truncated ? `

${TRUNCATED_LABEL}` : "";
      await navigator.clipboard.writeText(header + brief + footer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <SectionWrapper>
      <PageHeader
        title="AI Intelligence Brief Generator"
        subtitle="Generate structured briefs from the CEA case dataset. Select filters and a brief type. When no AI model is configured, the site builds a template brief directly from the matching case records."
      />

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">Threat Actor</label>
          <select value={actor} onChange={(e) => setActor(e.target.value)} className="w-full text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-atlas-500">
            <option value="all">All Actors</option>
            {actorProfiles.map((a) => (
              <option key={a.slug} value={a.slug}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">Sector</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-atlas-500">
            <option value="all">All Sectors</option>
            {allSectors.map((s) => (
              <option key={s} value={s}>{targetSectorLabels[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">Region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-atlas-500">
            <option value="all">Global</option>
            {allRegions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-steel-500 dark:text-steel-400 mb-1">Brief Type</label>
          <select value={briefType} onChange={(e) => setBriefType(e.target.value)} className="w-full text-sm rounded-md border border-steel-200/40 dark:border-ink-600/50 bg-white dark:bg-ink-700 text-ink dark:text-white px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-atlas-500">
            {BRIEF_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button
          onClick={generate}
          disabled={loading}
          aria-busy={loading}
          className="px-6 py-3 rounded-lg bg-atlas-500 hover:bg-atlas-600 text-white text-sm font-medium transition-all disabled:opacity-50 shadow-glow-sm hover:shadow-glow"
        >
          {loading ? "Generating..." : "Generate Brief"}
        </button>
        <span className="text-xs text-steel-500 dark:text-ink-400" data-testid="matching-count">
          {matchingCases.length} of {seedIncidents.length} cases match these filters
        </span>
      </div>

      {error && (
        <div
          role="alert"
          data-testid="brief-error"
          className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200/40 dark:border-red-700/30 mb-6"
        >
          <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">The brief could not be generated</p>
          <p className="text-sm text-red-700 dark:text-red-300 break-words">{error}</p>
          {matchingCases.length > 0 && (
            <button
              onClick={buildLocalTemplate}
              className="mt-3 px-3 py-1.5 text-xs font-medium rounded-md border border-red-300/60 dark:border-red-700/50 text-red-800 dark:text-red-200 hover:bg-red-100/60 dark:hover:bg-red-900/20 transition-colors"
            >
              Build a template brief from the data instead
            </button>
          )}
        </div>
      )}

      {!brief && !loading && !error && (
        <div className="rounded-xl border border-dashed border-steel-300/50 dark:border-ink-600/50 bg-ink-50/30 dark:bg-ink-800/15 p-6">
          <h2 className="text-sm font-bold text-ink dark:text-white mb-2">What the brief contains</h2>
          <ul className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed list-disc pl-5 space-y-1">
            <li>Scope: how many cases match, the years they cover and their incident types.</li>
            <li>The cases in scope, with attribution and peak escalation tier.</li>
            <li>Escalation peaks and recorded threshold crossings.</li>
            <li>Attribution status: confidence levels and attributed state nexus.</li>
            <li>Governance responses recorded for each case.</li>
          </ul>
          <p className="text-xs text-steel-500 dark:text-ink-400 mt-3">
            Every statement is drawn from the case records. Check case pages for primary sources.
          </p>
        </div>
      )}

      {brief && (
        <div className="rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ink dark:text-white">Generated Brief</h2>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="px-3 py-1.5 text-xs font-medium rounded-md border border-atlas-400/50 dark:border-atlas-600/40 text-atlas-700 dark:text-atlas-400 hover:bg-atlas-50/50 dark:hover:bg-atlas-900/20 transition-colors">
                {copied ? "Copied" : "Copy to clipboard"}
              </button>
            </div>
          </div>
          {mode === "template" ? (
            <div data-testid="template-label" className="mb-5 flex items-start gap-2.5 p-3 rounded-lg bg-ink-50/60 dark:bg-ink-800/30 border border-steel-300/40 dark:border-ink-600/40">
              <span className="mt-0.5 w-2 h-2 rounded-full bg-steel-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-ink dark:text-white">{TEMPLATE_BRIEF_LABEL}</p>
                <p className="text-xs text-steel-500 dark:text-steel-300 leading-relaxed mt-0.5">
                  Built by a fixed template from the {briefCaseCount} matching case records. No language model was used and no facts outside the dataset were added.
                </p>
              </div>
            </div>
          ) : (
          <div className="mb-5 flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/60 dark:bg-amber-900/10 border border-amber-300/40 dark:border-amber-700/30">
            <span className="mt-0.5 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <p className="text-xs font-medium text-amber-800 dark:text-amber-300 leading-relaxed">
              AI-generated from the CEA dataset. Verify before operational use.
              This is a synthesis of documented cases, not an intelligence product.
            </p>
          </div>
          )}
          {truncated && (
            <p data-testid="truncated-label" role="status" className="mb-5 p-3 rounded-lg text-xs font-semibold text-signal-800 dark:text-signal-200 bg-signal-50/60 dark:bg-signal-900/20 border border-signal-300/50 dark:border-signal-700/40">
              {TRUNCATED_LABEL}
            </p>
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none" data-testid="brief-body">
            {renderBrief(brief)}
            {truncated && <p className="text-sm font-semibold text-signal-700 dark:text-signal-300">[… truncated]</p>}
          </div>
          <div className="mt-6 p-3 rounded-lg bg-signal-50/30 dark:bg-signal-900/10 border border-signal-200/30 dark:border-signal-700/20">
            <p className="text-xs text-signal-700 dark:text-signal-300 italic">
              This brief is generated from the CEA case dataset. All analytical judgements should be verified against primary sources.
            </p>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
