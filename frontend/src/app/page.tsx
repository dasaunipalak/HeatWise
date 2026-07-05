'use client';

import { useState } from 'react';
import LeftSidebar from '@/components/sidebar/LeftSidebar';
import RightSidebar from '@/components/sidebar/RightSidebar';
import MapArea from '@/components/map/MapArea';

export default function Dashboard() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <LeftSidebar
        isOpen={leftOpen}
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
      />

      <MapArea
        activeLayer={activeLayer}
        leftOpen={leftOpen}
        rightOpen={rightOpen}
        onToggleLeft={() => setLeftOpen(!leftOpen)}
        onToggleRight={() => setRightOpen(!rightOpen)}
      />

      <RightSidebar isOpen={rightOpen} />
    </div>
  );
}
