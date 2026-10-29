import { seedIncidents } from "@/data/incidents";
import { confidenceLevels, flagCodebook } from "@/data/flagCodebook";
import {
  attributionLabels,
  governanceFlagLabels,
  thresholdMeta,
  THRESHOLD_CODES,
  unpeaceRanks,
  unpeaceRaw,
  UNPEACE_WEIGHTS,
} from "@/lib/utils/incidents";

const th = "text-left font-semibold text-ink dark:text-white p-2 border-b border-steel-200/40 dark:border-ink-600/40";
const td = "p-2 align-top border-b border-steel-200/20 dark:border-ink-600/20";

export function ConfidenceLevelsTable() {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className={th}>Level</th>
            <th className={th}>Requires</th>
          </tr>
        </thead>
        <tbody>
          {confidenceLevels.map((c) => (
            <tr key={c.level}>
              <td className={`${td} whitespace-nowrap font-medium`}>{attributionLabels[c.level]}</td>
              <td className={td}>{c.requires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FlagCodebookTable() {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className={th}>Flag</th>
            <th className={th}>Kind</th>
            <th className={th}>Definition</th>
            <th className={th}>Evidence threshold</th>
          </tr>
        </thead>
        <tbody>
          {flagCodebook.map((f) => (
            <tr key={f.flag}>
              <td className={`${td} font-medium`}>{governanceFlagLabels[f.flag]}</td>
              <td className={td}>{f.kind === "formal" ? "Formal response" : "Analyst judgement"}</td>
              <td className={td}>{f.definition}</td>
              <td className={td}>{f.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ThresholdTable() {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className={th}>Threshold</th>
            <th className={th}>Crossed when</th>
            <th className={th}>Evidence</th>
            <th className={th}>Cases</th>
          </tr>
        </thead>
        <tbody>
          {THRESHOLD_CODES.map((t) => (
            <tr key={t}>
              <td className={`${td} font-medium`}>{thresholdMeta[t].label}</td>
              <td className={td}>{thresholdMeta[t].crossedWhen}</td>
              <td className={td}>{thresholdMeta[t].evidence}</td>
              <td className={`${td} font-mono`}>{seedIncidents.filter((i) => i.escalation.thresholds.includes(t)).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const WEIGHTS: { tier: number; threshold: number; label: string }[] = [
  { ...UNPEACE_WEIGHTS, label: "Default (tier ×1.2, thresholds ×1)" },
  { tier: 1, threshold: 1, label: "Tier ×1" },
  { tier: 1.5, threshold: 1, label: "Tier ×1.5" },
  { tier: 1.2, threshold: 0.5, label: "Thresholds ×0.5" },
  { tier: 1.2, threshold: 2, label: "Thresholds ×2" },
  { tier: 1, threshold: 0, label: "Tier only" },
];

/** Rank of every case under alternative weights, plus the count at 10. */
export function SensitivityTable() {
  const ranks = WEIGHTS.map((w) => unpeaceRanks(seedIncidents, w));
  const atTen = WEIGHTS.map((w) => seedIncidents.filter((i) => Math.round(unpeaceRaw(i, w)) === 10).length);
  const rows = [...seedIncidents].sort((a, b) => (ranks[0].get(a.slug) ?? 0) - (ranks[0].get(b.slug) ?? 0) || a.name.localeCompare(b.name));
  return (
    <div className="overflow-x-auto mt-3 max-h-[32rem] overflow-y-auto">
      <table className="w-full text-xs border-collapse">
        <caption className="text-left text-steel-500 dark:text-steel-400 pb-2">
          Rank of each case (1 = most severe; ties share the top rank) under six weightings of the unpeace formula.
        </caption>
        <thead>
          <tr>
            <th className={th}>Case</th>
            {WEIGHTS.map((w) => (
              <th key={w.label} className={`${th} whitespace-nowrap`}>
                {w.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => (
            <tr key={i.slug}>
              <td className={td}>{i.shortName}</td>
              {ranks.map((r, k) => (
                <td key={k} className={`${td} font-mono`}>
                  {r.get(i.slug)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className={`${td} font-semibold`}>Cases at 10</td>
            {atTen.map((n, k) => (
              <td key={k} className={`${td} font-mono font-semibold`}>
                {n}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
