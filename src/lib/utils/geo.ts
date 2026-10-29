// ---------------------------------------------------------------------------
// Country/region → approximate centroid coordinates for map pins
// ---------------------------------------------------------------------------

const coords: Record<string, [number, number]> = {
  "united states": [-98.5, 39.8],
  "united kingdom": [-1.5, 54.0],
  ukraine: [31.2, 48.4],
  russia: [37.6, 55.8],
  iran: [53.7, 32.4],
  israel: [34.8, 31.0],
  china: [104.2, 35.9],
  "north korea": [127.0, 40.0],
  "south korea": [127.8, 36.0],
  japan: [138.3, 36.2],
  germany: [10.5, 51.2],
  france: [2.2, 46.6],
  italy: [12.6, 42.5],
  "saudi arabia": [45.1, 23.9],
  bangladesh: [90.4, 23.7],
  philippines: [121.8, 12.9],
  australia: [133.8, -25.3],
  taiwan: [120.9, 23.7],
  albania: [20.2, 41.2],
  "costa rica": [-84.0, 9.9],
  "nato allies": [4.4, 50.8],
  global: [0.0, 20.0],
  "central europe": [15.5, 49.8],
  "allied jurisdictions": [4.4, 50.8],
  guam: [144.8, 13.4],
  canada: [-106.3, 56.1],
  india: [78.9, 20.6],
  pakistan: [69.3, 30.4],
  egypt: [30.8, 26.8],
  thailand: [101.0, 15.9],
  belgium: [4.5, 50.5],
  "palestinian territories": [35.2, 31.9],
  netherlands: [5.3, 52.1],
  sweden: [18.6, 60.1],
  switzerland: [8.2, 46.8],
  brazil: [-51.9, -14.2],
  sudan: [30.2, 12.9],
  syria: [38.9, 34.8],
  lebanon: [35.9, 33.9],
};

/**
 * Returns [longitude, latitude] for a country/region name.
 * Falls back to [0, 20] (mid-Atlantic) for unknown entries.
 */
export function countryCoords(name: string): [number, number] {
  return coords[name.toLowerCase()] ?? [0, 20];
}

/**
 * Derive a primary coordinate for an incident from its target countries.
 * Prefers the first non-"Global" entry.
 */
export function incidentCoords(targetCountries: string[]): [number, number] {
  const primary =
    targetCountries.find((c) => c.toLowerCase() !== "global") ??
    targetCountries[0] ??
    "Global";
  return countryCoords(primary);
}

/**
 * Derive the primary region label for an incident.
 */
export function primaryRegion(targetCountries: string[]): string {
  return targetCountries[0] ?? "Unknown";
}
