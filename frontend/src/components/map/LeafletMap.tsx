'use client';

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";

interface LeafletMapProps {
    selectedLocation: {
        lat: number;
        lon: number;
    } | null;
    tileUrl: string | null;
    activeLayer: string | null;
}

function FlyToLocation({
    selectedLocation,
}: {
    selectedLocation: { lat: number; lon: number } | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (selectedLocation) {
            map.flyTo(
                [selectedLocation.lat, selectedLocation.lon],
                13,
                {
                    duration: 1.5,
                }
            );
        }
    }, [selectedLocation, map]);

    return null;
}

export default function LeafletMap({ selectedLocation, tileUrl, activeLayer }: LeafletMapProps) {
    return (
        <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
        >
            <FlyToLocation selectedLocation={selectedLocation} />
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {tileUrl && (
                <TileLayer
                    key={tileUrl}
                    url={tileUrl}
                    attribution="Google Earth Engine"
                />
            )}
        </MapContainer>
    );
}