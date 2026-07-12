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

    onBoundsChange: (bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    }) => void;
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

function BoundsWatcher({
    onBoundsChange,
}: {
    onBoundsChange: (bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    }) => void;
}) {
    const map = useMap();

    useEffect(() => {
        const updateBounds = () => {
            const bounds = map.getBounds();

            onBoundsChange({
                north: bounds.getNorth(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                west: bounds.getWest(),
            });
        };

        updateBounds();

        map.on("moveend", updateBounds);
        map.on("zoomend", updateBounds);

        return () => {
            map.off("moveend", updateBounds);
            map.off("zoomend", updateBounds);
        };
    }, [map, onBoundsChange]);

    return null;
}

function ResizeWatcher() {
    const map = useMap();
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        const container = map.getContainer();
        if (container) resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, [map]);
    return null;
}

export default function LeafletMap({
    selectedLocation,
    tileUrl,
    activeLayer,
    onBoundsChange,
}: LeafletMapProps) {
    return (
        <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
        >
            <BoundsWatcher onBoundsChange={onBoundsChange} />
            <ResizeWatcher />

            <FlyToLocation selectedLocation={selectedLocation} />

            <TileLayer
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {tileUrl && (
                <TileLayer
                    key={tileUrl}
                    url={tileUrl}
                    attribution="Google Earth Engine"
                    opacity={0.30}
                />
            )}
        </MapContainer>
    );
}