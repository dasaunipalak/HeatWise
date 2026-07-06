export interface SearchResult {
    lat: number;
    lon: number;
    displayName: string;
}

export async function searchLocation(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
        )}&countrycodes=in&featuretype=settlement&limit=5`
    );

    const data = await response.json();

    return data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        displayName: item.display_name,
    }));
}