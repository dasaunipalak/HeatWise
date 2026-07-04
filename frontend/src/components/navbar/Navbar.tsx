'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefreshCw, Download, Bell, Settings, Map as MapIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#1a202c] border-b border-slate-700/50 flex items-center justify-between px-4 z-50 text-slate-200">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <div className="w-6 h-6 bg-[#ea580c] rounded flex items-center justify-center">
            {/* Custom Icon resembling Figma */}
            <div className="w-3 h-3 border-2 border-white rounded-[2px] opacity-90"></div>
          </div>
          HeatWatch
          <span className="bg-[#ea580c]/20 text-[#ea580c] text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ml-1">
            AI
          </span>
        </Link>
        <div className="w-px h-5 bg-slate-700"></div>
        <nav className="flex items-center gap-6 text-[13px] font-medium">
          <Link href="/" className={`${pathname === '/' ? 'text-white bg-slate-800/50 px-3 py-1.5 rounded-md' : 'text-slate-400 hover:text-slate-200'} transition-all flex items-center gap-1.5`}>
            <MapIcon size={14} className={pathname === '/' ? 'text-slate-300' : ''} /> Heat Map
          </Link>
          <Link href="/plan-site" className={`${pathname === '/plan-site' ? 'text-white bg-slate-800/50 px-3 py-1.5 rounded-md' : 'text-slate-400 hover:text-slate-200'} transition-all flex items-center gap-1.5`}>
            <CheckCircle2 size={14} /> Plan Your Site
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide text-green-500">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          LIVE
        </div>
        <div className="flex items-center gap-0.5 ml-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8">
            <RefreshCw size={15} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8">
            <Download size={15} />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8 relative">
            <Bell size={15} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#1a202c]"></span>
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8">
            <Settings size={15} />
          </Button>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-[10px] font-bold text-white ml-2 cursor-pointer hover:ring-2 hover:ring-[#ea580c]/50 transition-all shadow-sm">
          AW
        </div>
      </div>
    </header>
  );
}
