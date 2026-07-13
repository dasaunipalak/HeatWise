'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefreshCw, Download, Bell, Settings, Map as MapIcon, CheckCircle2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 h-[49px] bg-[#222732] border-b border-[#2D333E] flex items-center justify-between px-4 z-50 text-slate-200 shadow-md select-none">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[15px] text-white hover:opacity-90 transition-opacity">
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br from-orange-400 to-[#F05A28] shadow-[0_2px_8px_rgba(240,90,40,0.4)]">
            <Flame size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="tracking-wide">HeatWise</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
      </div>
    </header>
  );
}
