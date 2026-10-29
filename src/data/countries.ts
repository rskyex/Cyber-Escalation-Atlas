import type { GeographicScope } from "@/lib/types/incidents";

/** ISO 3166-1 alpha-2 codes used in targetCountries, with display names. */
export const countryNames: Record<string, string> = {
  AL: "Albania",
  AU: "Australia",
  BD: "Bangladesh",
  BE: "Belgium",
  BR: "Brazil",
  CA: "Canada",
  CH: "Switzerland",
  CR: "Costa Rica",
  DE: "Germany",
  EG: "Egypt",
  FR: "France",
  GB: "United Kingdom",
  GU: "Guam",
  IL: "Israel",
  IN: "India",
  IR: "Iran",
  IT: "Italy",
  JP: "Japan",
  KR: "South Korea",
  LB: "Lebanon",
  NL: "Netherlands",
  PH: "Philippines",
  PK: "Pakistan",
  PS: "Palestinian Territories",
  SA: "Saudi Arabia",
  SD: "Sudan",
  SE: "Sweden",
  SY: "Syria",
  TH: "Thailand",
  TW: "Taiwan",
  UA: "Ukraine",
  US: "United States",
};

export const scopeLabels: Record<GeographicScope, string> = {
  global: "Global",
  "nato-allies": "NATO allies",
  "central-europe": "Central Europe",
  "allied-jurisdictions": "Allied jurisdictions",
};

export function countryName(code: string): string {
  return countryNames[code] ?? code;
}
