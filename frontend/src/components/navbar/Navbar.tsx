'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefreshCw, Download, Bell, Settings, Map as MapIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#1e2530] border-b border-[#2e3748]/60 flex items-center justify-between px-4 z-50 text-slate-200 shadow-md select-none">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white hover:opacity-90 transition-opacity">
          <div className="w-6 h-6 bg-[#ea580c] rounded flex items-center justify-center">
            {/* Custom Icon resembling Figma */}
            <div className="w-3 h-3 border-2 border-white rounded-[2px] opacity-90"></div>
          </div>
          HeatWise
          <span className="bg-[#ea580c]/25 text-[#ea580c] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ml-1 shadow-sm">
            AI
          </span>
        </Link>
        <div className="w-px h-5 bg-slate-700/60"></div>
        <nav className="flex items-center gap-3 text-[13px] font-medium">
          <Link href="/" className={`${pathname === '/' ? 'text-white bg-[#2e3748] border border-slate-600/50 px-3.5 py-1.5 rounded-lg shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 px-3.5 py-1.5 rounded-lg'} transition-all duration-200 flex items-center gap-2`}>
            <MapIcon size={14} className={pathname === '/' ? 'text-orange-400' : ''} /> Heat Map
          </Link>
          <Link href="/plan-site" className={`${pathname === '/plan-site' ? 'text-white bg-[#2e3748] border border-slate-600/50 px-3.5 py-1.5 rounded-lg shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 px-3.5 py-1.5 rounded-lg'} transition-all duration-200 flex items-center gap-2`}>
            <CheckCircle2 size={14} className={pathname === '/plan-site' ? 'text-orange-400' : ''} /> Plan Your Site
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#2e3748]/50 border border-slate-700/60 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide text-green-400">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          LIVE
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-[#2e3748]/60 h-8 w-8 rounded-lg transition-all duration-200">
            <RefreshCw size={15} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-[#2e3748]/60 h-8 w-8 rounded-lg transition-all duration-200">
            <Download size={15} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-[#2e3748]/60 h-8 w-8 rounded-lg relative transition-all duration-200">
            <Bell size={15} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#1e2530]"></span>
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-[#2e3748]/60 h-8 w-8 rounded-lg transition-all duration-200">
            <Settings size={15} />
          </Button>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-[10px] font-bold text-white ml-2 cursor-pointer hover:ring-2 hover:ring-[#ea580c]/50 hover:scale-105 active:scale-95 transition-all shadow-sm">
          AW
        </div>
      </div>
    </header>
  );
}
