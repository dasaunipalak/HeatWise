'use client';

import { useState } from 'react';
import LeftSidebar from '@/components/sidebar/LeftSidebar';
import RightSidebar from '@/components/sidebar/RightSidebar';
import MapArea from '@/components/map/MapArea';

export default function Dashboard() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <>
      <LeftSidebar isOpen={leftOpen} />
      <MapArea 
        leftOpen={leftOpen} 
        rightOpen={rightOpen} 
        onToggleLeft={() => setLeftOpen(!leftOpen)} 
        onToggleRight={() => setRightOpen(!rightOpen)} 
      />
      <RightSidebar isOpen={rightOpen} />
    </>
  );
}
