'use client';

import { MapContainer, TileLayer } from "react-leaflet";

export default function LeafletMap() {
    return (
        <MapContainer
            center={[26.8467, 80.9462]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}