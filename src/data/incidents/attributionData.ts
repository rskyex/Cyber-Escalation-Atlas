/**
 * Attribution detail data for all cases (Upgrade 1).
 * Maps case slug to AttributionDetail.
 */
import type { AttributionDetail } from "@/lib/types/incidents";

export const attributionDetails: Record<string, AttributionDetail> = {
  notpetya: {
    claimants: [
      { actor: "UK Government", date: "2018-02-15", confidenceLevel: "Confirmed", evidenceBasis: "NCSC formal attribution statement linking NotPetya to Russian military (GRU)" },
      { actor: "US Government", date: "2018-02-15", confidenceLevel: "Confirmed", evidenceBasis: "White House press statement attributing NotPetya to the Russian military" },
      { actor: "Allied Coalition", date: "2018-02-16", confidenceLevel: "Confirmed", evidenceBasis: "Five Eyes coordinated attribution statements within 24 hours" },
      { actor: "EU", date: "2018-10-04", confidenceLevel: "Confirmed", evidenceBasis: "EU Council conclusions attributing NotPetya to Russia" },
      { actor: "Academic/Private Sector", date: "2017-07-01", confidenceLevel: "High", evidenceBasis: "ESET and Cisco Talos technical analysis linking to Sandworm tooling" },
    ],
    coordinationType: "joint",
    consequences: ["Sanctions", "Indictment", "Public Naming Only"],
  },
  solarwinds: {
    claimants: [
      { actor: "US Government", date: "2021-01-05", confidenceLevel: "High", evidenceBasis: "Joint FBI/CISA/ODNI/NSA statement identifying Russia as likely origin" },
      { actor: "US Government", date: "2021-04-15", confidenceLevel: "Confirmed", evidenceBasis: "Executive Order and formal attribution to SVR" },
      { actor: "UK Government", date: "2021-04-15", confidenceLevel: "High", evidenceBasis: "NCSC statement supporting US attribution to SVR" },
      { actor: "Academic/Private Sector", date: "2020-12-13", confidenceLevel: "High", evidenceBasis: "FireEye discovery and technical analysis linking to APT29" },
    ],
    coordinationType: "joint",
    consequences: ["Sanctions", "Public Naming Only"],
  },
  stuxnet: {
    claimants: [
      { actor: "Academic/Private Sector", date: "2011-02-01", confidenceLevel: "High", evidenceBasis: "Symantec and Langner Group technical analysis of targeting specificity" },
      { actor: "Contested/Unknown", date: "2012-06-01", confidenceLevel: "High", evidenceBasis: "NYT reporting citing unnamed officials confirming US-Israeli operation" },
    ],
    coordinationType: "none",
    consequences: ["No Formal Response"],
  },
  "sony-pictures": {
    claimants: [
      { actor: "US Government", date: "2014-12-19", confidenceLevel: "Confirmed", evidenceBasis: "FBI public statement attributing to North Korea based on technical and intelligence evidence" },
      { actor: "US Government", date: "2014-12-19", confidenceLevel: "Confirmed", evidenceBasis: "Presidential statement confirming attribution" },
      { actor: "Academic/Private Sector", date: "2016-02-01", confidenceLevel: "High", evidenceBasis: "Novetta Operation Blockbuster linking tooling to Lazarus Group" },
    ],
    coordinationType: "unilateral",
    consequences: ["Sanctions", "Indictment", "Public Naming Only"],
  },
  "ukraine-power-grid-2015": {
    claimants: [
      { actor: "US Government", date: "2016-02-25", confidenceLevel: "High", evidenceBasis: "DHS ICS-CERT technical analysis and joint investigation with Ukrainian CERT" },
      { actor: "Academic/Private Sector", date: "2016-03-18", confidenceLevel: "High", evidenceBasis: "SANS ICS and ESET analysis linking BlackEnergy 3 to Sandworm group" },
      { actor: "Allied Coalition", date: "2018-02-15", confidenceLevel: "Confirmed", evidenceBasis: "Confirmed as part of broader Five Eyes Sandworm attribution in 2018" },
    ],
    coordinationType: "joint",
    consequences: ["Public Naming Only"],
  },
  "ukraine-power-grid-2016": {
    claimants: [
      { actor: "Academic/Private Sector", date: "2017-06-12", confidenceLevel: "High", evidenceBasis: "ESET and Dragos independent analysis of Industroyer malware capabilities" },
      { actor: "US Government", date: "2017-06-12", confidenceLevel: "High", evidenceBasis: "US-CERT alert TA17-163A on CrashOverride malware" },
      { actor: "Allied Coalition", date: "2020-10-19", confidenceLevel: "Confirmed", evidenceBasis: "Confirmed in DOJ indictment of six GRU officers" },
    ],
    coordinationType: "joint",
    consequences: ["Indictment", "Public Naming Only"],
  },
  wannacry: {
    claimants: [
      { actor: "US Government", date: "2017-12-19", confidenceLevel: "Confirmed", evidenceBasis: "White House formal attribution to North Korea" },
      { actor: "UK Government", date: "2017-12-19", confidenceLevel: "Confirmed", evidenceBasis: "NCSC assessment that Lazarus Group was responsible" },
      { actor: "Allied Coalition", date: "2017-12-19", confidenceLevel: "Confirmed", evidenceBasis: "Five Eyes plus Japan coordinated attribution" },
      { actor: "Academic/Private Sector", date: "2017-05-15", confidenceLevel: "High", evidenceBasis: "Symantec and Google code similarity analysis to Lazarus tooling" },
    ],
    coordinationType: "joint",
    consequences: ["Sanctions", "Indictment", "Public Naming Only"],
  },
  "colonial-pipeline": {
    claimants: [
      { actor: "US Government", date: "2021-05-10", confidenceLevel: "High", evidenceBasis: "FBI confirmed DarkSide ransomware responsible; assessed Russian-speaking criminal group" },
      { actor: "Academic/Private Sector", date: "2021-05-10", confidenceLevel: "High", evidenceBasis: "Multiple threat intelligence firms identified DarkSide RaaS infrastructure" },
    ],
    coordinationType: "unilateral",
    consequences: ["Sanctions", "Public Naming Only"],
  },
  "oldsmar-water": {
    claimants: [
      { actor: "Contested/Unknown", date: "2021-02-08", confidenceLevel: "Low", evidenceBasis: "Pinellas County Sheriff described remote intrusion; subsequent investigation raised insider possibility" },
    ],
    coordinationType: "none",
    consequences: ["No Formal Response"],
  },
  "viasat-kasat": {
    claimants: [
      { actor: "EU", date: "2022-05-10", confidenceLevel: "Confirmed", evidenceBasis: "EU Council declaration formally attributing to Russia" },
      { actor: "UK Government", date: "2022-05-10", confidenceLevel: "Confirmed", evidenceBasis: "NCSC statement attributing AcidRain attack to Russia" },
      { actor: "US Government", date: "2022-05-10", confidenceLevel: "Confirmed", evidenceBasis: "US State Department attribution statement" },
      { actor: "Academic/Private Sector", date: "2022-03-31", confidenceLevel: "High", evidenceBasis: "SentinelOne technical analysis of AcidRain wiper" },
    ],
    coordinationType: "joint",
    consequences: ["Sanctions", "Public Naming Only"],
  },
  "exchange-hafnium": {
    claimants: [
      { actor: "US Government", date: "2021-07-19", confidenceLevel: "High", evidenceBasis: "White House attribution statement naming PRC-affiliated actors" },
      { actor: "EU", date: "2021-07-19", confidenceLevel: "High", evidenceBasis: "EU statement supporting attribution to China" },
      { actor: "Allied Coalition", date: "2021-07-19", confidenceLevel: "High", evidenceBasis: "Unprecedented joint attribution by US, EU, NATO, Five Eyes, and Japan" },
      { actor: "Academic/Private Sector", date: "2021-03-02", confidenceLevel: "High", evidenceBasis: "Microsoft Threat Intelligence identified Hafnium as China-based group" },
    ],
    coordinationType: "joint",
    consequences: ["Indictment", "Public Naming Only"],
  },
  "costa-rica-conti": {
    claimants: [
      { actor: "US Government", date: "2022-05-06", confidenceLevel: "High", evidenceBasis: "State Department $10M reward for Conti leadership information" },
      { actor: "Academic/Private Sector", date: "2022-04-18", confidenceLevel: "Confirmed", evidenceBasis: "Conti group publicly claimed responsibility and leaked data" },
    ],
    coordinationType: "unilateral",
    consequences: ["Sanctions", "Public Naming Only"],
  },
  "albania-iran": {
    claimants: [
      { actor: "US Government", date: "2022-09-07", confidenceLevel: "Confirmed", evidenceBasis: "NSC statement confirming Iranian responsibility" },
      { actor: "Allied Coalition", date: "2022-09-07", confidenceLevel: "Confirmed", evidenceBasis: "NATO solidarity statement supporting Albanian attribution" },
      { actor: "Academic/Private Sector", date: "2022-09-08", confidenceLevel: "Confirmed", evidenceBasis: "Microsoft Threat Intelligence detailed technical attribution" },
    ],
    coordinationType: "joint",
    consequences: ["Sanctions", "Diplomatic Expulsion", "Public Naming Only"],
  },
  "shamoon-aramco": {
    claimants: [
      { actor: "US Government", date: "2012-10-11", confidenceLevel: "Moderate", evidenceBasis: "Secretary Panetta referenced attack without formal attribution; US officials later assessed Iranian involvement" },
      { actor: "Academic/Private Sector", date: "2012-08-16", confidenceLevel: "Moderate", evidenceBasis: "Symantec and Kaspersky technical analysis; hacktivist front claim" },
    ],
    coordinationType: "none",
    consequences: ["Public Naming Only"],
  },
  "bangladesh-bank-swift": {
    claimants: [
      { actor: "US Government", date: "2018-09-06", confidenceLevel: "Confirmed", evidenceBasis: "DOJ indictment of Park Jin Hyok linking to Lazarus Group" },
      { actor: "Academic/Private Sector", date: "2017-01-01", confidenceLevel: "High", evidenceBasis: "Kaspersky Lazarus Under the Hood report and SWIFT forensic analysis" },
    ],
    coordinationType: "unilateral",
    consequences: ["Indictment", "Sanctions"],
  },
  "australia-parliament": {
    claimants: [
      { actor: "Contested/Unknown", date: "2019-02-18", confidenceLevel: "Moderate", evidenceBasis: "PM Morrison attributed to a 'sophisticated state actor' without naming the country" },
      { actor: "Academic/Private Sector", date: "2019-03-01", confidenceLevel: "Moderate", evidenceBasis: "Media reporting and private research widely assessed China as likely sponsor" },
    ],
    coordinationType: "none",
    consequences: ["Public Naming Only"],
  },
  "iran-nuclear-cyber": {
    claimants: [
      { actor: "Contested/Unknown", date: "2020-07-02", confidenceLevel: "Moderate", evidenceBasis: "Iran publicly accused Israel; no independent forensic confirmation available" },
    ],
    coordinationType: "none",
    consequences: ["No Formal Response"],
  },
  "taiwan-telecom": {
    claimants: [
      { actor: "US Government", date: "2023-05-24", confidenceLevel: "Moderate", evidenceBasis: "CISA/NSA/FBI joint advisory on PRC-linked living-off-the-land activity" },
      { actor: "Allied Coalition", date: "2023-05-24", confidenceLevel: "Moderate", evidenceBasis: "Five Eyes joint advisory on Volt Typhoon" },
      { actor: "Academic/Private Sector", date: "2023-05-24", confidenceLevel: "Moderate", evidenceBasis: "Microsoft Volt Typhoon and Flax Typhoon reporting" },
    ],
    coordinationType: "joint",
    consequences: ["Public Naming Only"],
  },
  industroyer2: {
    claimants: [
      { actor: "Academic/Private Sector", date: "2022-04-12", confidenceLevel: "Confirmed", evidenceBasis: "CERT-UA and ESET joint technical analysis" },
      { actor: "Allied Coalition", date: "2022-04-12", confidenceLevel: "Confirmed", evidenceBasis: "Cited in allied documentation of Russian cyber operations in Ukraine" },
    ],
    coordinationType: "joint",
    consequences: ["Public Naming Only"],
  },
  "scattered-spider-mgm": {
    claimants: [
      { actor: "US Government", date: "2023-11-16", confidenceLevel: "High", evidenceBasis: "FBI/CISA joint advisory identifying Scattered Spider" },
      { actor: "Academic/Private Sector", date: "2023-09-14", confidenceLevel: "High", evidenceBasis: "CrowdStrike and Microsoft public threat reporting" },
    ],
    coordinationType: "unilateral",
    consequences: ["Indictment"],
  },
};

/**
 * Actor slug mapping for all cases (Upgrade 3).
 */
export const actorSlugs: Record<string, string> = {
  notpetya: "sandworm",
  solarwinds: "svr-apt29",
  stuxnet: "unknown-contested",
  "sony-pictures": "lazarus-group",
  "ukraine-power-grid-2015": "sandworm",
  "ukraine-power-grid-2016": "sandworm",
  wannacry: "lazarus-group",
  "colonial-pipeline": "unknown-contested",
  "oldsmar-water": "unknown-contested",
  "viasat-kasat": "sandworm",
  "exchange-hafnium": "hafnium-apt40",
  "costa-rica-conti": "unknown-contested",
  "albania-iran": "iranian-state-actors",
  "shamoon-aramco": "iranian-state-actors",
  "bangladesh-bank-swift": "lazarus-group",
  "australia-parliament": "unknown-contested",
  "iran-nuclear-cyber": "unknown-contested",
  "taiwan-telecom": "hafnium-apt40",
  industroyer2: "sandworm",
  "scattered-spider-mgm": "scattered-spider",
};
