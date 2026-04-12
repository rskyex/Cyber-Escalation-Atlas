"use client";

import { useState } from "react";
import { PageHeader, SectionWrapper } from "@/components/ui";
import { seedIncidents } from "@/data/incidents";
import { actorProfiles } from "@/data/actors";
import { targetSectorLabels } from "@/lib/utils/incidents";
import type { TargetSector } from "@/lib/types/incidents";

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

export default function BriefPage() {
  const [actor, setActor] = useState("all");
  const [sector, setSector] = useState("all");
  const [region, setRegion] = useState("all");
  const [briefType, setBriefType] = useState("executive");
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    setBrief("");
    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actor, sector, region, briefType }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      setBrief(data.brief);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(brief);
  }

  return (
    <SectionWrapper>
      <PageHeader
        title="AI Intelligence Brief Generator"
        subtitle="Generate structured intelligence briefs from the CEA case dataset using AI analysis. Select filters and brief type to produce a tailored assessment."
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

      <button
        onClick={generate}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-atlas-500 hover:bg-atlas-600 text-white text-sm font-medium transition-all disabled:opacity-50 shadow-glow-sm hover:shadow-glow mb-8"
      >
        {loading ? "Generating..." : "Generate Brief"}
      </button>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200/40 dark:border-red-700/30 text-sm text-red-700 dark:text-red-300 mb-6">
          {error}
        </div>
      )}

      {brief && (
        <div className="rounded-xl border border-steel-200/25 dark:border-ink-600/35 bg-white dark:bg-ink-700/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ink dark:text-white">Generated Brief</h2>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="px-3 py-1.5 text-xs font-medium rounded-md border border-atlas-400/50 dark:border-atlas-600/40 text-atlas-700 dark:text-atlas-400 hover:bg-atlas-50/50 dark:hover:bg-atlas-900/20 transition-colors">
                Copy to clipboard
              </button>
            </div>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {brief.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-base font-bold text-ink dark:text-white mt-4 mb-2">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-sm font-bold text-ink dark:text-white mt-3 mb-1">{line.replace("### ", "")}</h3>;
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-sm text-steel-500 dark:text-steel-300 leading-relaxed mb-2">{line}</p>;
            })}
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
