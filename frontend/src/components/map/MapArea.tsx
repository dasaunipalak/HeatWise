'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from "next/dynamic";
import Legend from "./Legend";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

interface MapAreaProps {
  activeLayer: string | null;
  selectedLocation: {
    lat: number;
    lon: number;
  } | null;
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  tileUrl: string | null;
  isLoadingTile: boolean;
  tileError: string | null;
  setTileError: (error: string | null) => void;
}


export default function MapArea({
  activeLayer,
  selectedLocation,
  leftOpen = true,
  rightOpen = true,
  onToggleLeft,
  onToggleRight,
  tileUrl,
  isLoadingTile,
  tileError,
  setTileError
}: MapAreaProps) {
  return (
    <main className="flex-1 relative bg-[#f2e7d7] overflow-hidden flex flex-col z-10 select-none transition-all duration-300">
      
      {/* Toast Error Notification */}
      {tileError && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-red-600 animate-in fade-in slide-in-from-top-4 duration-300">
          <span>⚠️ {tileError}</span>
          <button onClick={() => setTileError(null)} className="ml-2 font-bold hover:text-red-200 text-sm">×</button>
        </div>
      )}

      {/* Loading overlay indicator */}
      {isLoadingTile && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2A303C]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700/50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-3.5 h-3.5 border-2 border-[#ea580c] border-t-transparent rounded-full animate-spin"></div>
          <span>Generating GEE Layer...</span>
        </div>
      )}

      <div className="absolute inset-x-0 top-14 bottom-0 z-0">
        <LeafletMap selectedLocation={selectedLocation} tileUrl={tileUrl} activeLayer={activeLayer} />
      </div>

      {/* Slider Left Arrow */}
      <button
        onClick={onToggleLeft}
        className="absolute left-[-1px] top-[50%] -translate-y-1/2 w-[22px] h-[48px] rounded-r-[12px] rounded-l-none bg-white text-slate-500 flex items-center justify-center shadow-[3px_0_5px_rgba(0,0,0,0.04)] hover:bg-slate-50 transition-colors border border-slate-200 border-l-0 z-30 cursor-pointer pr-[2px]"
      >
        <ChevronLeft size={14} strokeWidth={2.5} className={`transition-transform duration-300 ${!leftOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={onToggleRight}
        className="absolute right-[-1px] top-[50%] -translate-y-1/2 w-[22px] h-[48px] rounded-l-[12px] rounded-r-none bg-white text-slate-500 flex items-center justify-center shadow-[-3px_0_5px_rgba(0,0,0,0.04)] hover:bg-slate-50 transition-colors border border-slate-200 border-r-0 z-30 cursor-pointer pl-[2px]"
      >
        <ChevronRight size={14} strokeWidth={2.5} className={`transition-transform duration-300 ${!rightOpen ? 'rotate-180' : ''}`} />
      </button>

      {activeLayer !== null && <Legend type={activeLayer} />}

      <button className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#2A303C] text-white flex items-center justify-center shadow-xl hover:bg-[#3B4252] hover:scale-105 active:scale-95 transition-all z-50 border border-[#3B4252] font-bold text-sm cursor-pointer">
        ?
      </button>

      {/* 500m scale */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end select-none z-20 opacity-70">
        <div className="h-[1px] w-12 bg-slate-400 mb-1"></div>
        <span className="text-[7px] font-bold text-slate-400">500m</span>
      </div>
    </main>
  );
}
