'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefreshCw, Download, Bell, Settings, Map as MapIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 h-[49px] bg-[#222732] border-b border-[#2D333E] flex items-center justify-between px-4 z-50 text-slate-200 shadow-md select-none">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[14.5px] text-white hover:opacity-90 transition-opacity">
          <div className="w-6 h-6 bg-[#F05A28] rounded flex items-center justify-center">
            {/* Custom Icon resembling Figma */}
            <div className="w-3 h-3 border-2 border-white rounded-[2px] opacity-90"></div>
          </div>
          HeatWise
          <span className="bg-[#F05A28]/25 text-[#F05A28] text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ml-1 shadow-sm">
            AI
          </span>
        </Link>

      </div>

      <div className="flex items-center gap-4">
      </div>
    </header>
  );
}
