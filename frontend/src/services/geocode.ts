export interface SearchResult {
  lat: number;
  lon: number;
  displayName: string;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function searchLocation(query: string): Promise<SearchResult[]> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) return [];

  const params = new URLSearchParams({
    format: "jsonv2",
    q: trimmedQuery,
    countrycodes: "in",
    addressdetails: "1",
    dedupe: "1",
    limit: "8",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  const data: NominatimResult[] = await response.json();

  return data.map((item) => ({
    lat: Number(item.lat),
    lon: Number(item.lon),
    displayName: item.display_name,
  }));
}