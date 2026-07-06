'use client';

import { useState, useEffect } from 'react';
import LeftSidebar from '@/components/sidebar/LeftSidebar';
import RightSidebar from '@/components/sidebar/RightSidebar';
import MapArea from '@/components/map/MapArea';

export default function Dashboard() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [activeLayer, setActiveLayer] = useState<string | null>("surface_temp");
  const [previousLayer, setPreviousLayer] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const [isLoadingTile, setIsLoadingTile] = useState(false);
  const [tileError, setTileError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeLayer) {
      setTileUrl(null);
      setPreviousLayer(null);
      return;
    }

    let isCurrent = true;
    async function fetchTile() {
      setIsLoadingTile(true);
      setTileError(null);
      try {
        const response = await fetch(`/api/v1/maps/${activeLayer}`);
        if (!response.ok) {
          throw new Error(`Failed to load layer: ${response.statusText || response.status}`);
        }
        const data = await response.json();
        if (isCurrent) {
          if (data && data.tile_url) {
            setTileUrl(data.tile_url);
            setPreviousLayer(activeLayer);
          } else {
            throw new Error("No tile URL returned from backend");
          }
        }
      } catch (error: any) {
        if (isCurrent) {
          setTileError(error.message || "Failed to load layer");
          // Revert activeLayer to previous successful layer to sync UI
          setActiveLayer(previousLayer);
        }
      } finally {
        if (isCurrent) {
          setIsLoadingTile(false);
        }
      }
    }

    fetchTile();

    return () => {
      isCurrent = false;
    };
  }, [activeLayer]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <LeftSidebar
        isOpen={leftOpen}
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        setSelectedLocation={setSelectedLocation}
        isLoadingTile={isLoadingTile}
      />

      <MapArea
        activeLayer={activeLayer}
        selectedLocation={selectedLocation}
        leftOpen={leftOpen}
        rightOpen={rightOpen}
        onToggleLeft={() => setLeftOpen(!leftOpen)}
        onToggleRight={() => setRightOpen(!rightOpen)}
        tileUrl={tileUrl}
        isLoadingTile={isLoadingTile}
        tileError={tileError}
        setTileError={setTileError}
      />

      <RightSidebar isOpen={rightOpen} />
    </div>
  );
}
