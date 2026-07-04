import LeftSidebar from '@/components/sidebar/LeftSidebar';
import RightSidebar from '@/components/sidebar/RightSidebar';
import MapArea from '@/components/map/MapArea';

export default function Dashboard() {
  return (
    <>
      <LeftSidebar />
      <MapArea />
      <RightSidebar />
    </>
  );
}
