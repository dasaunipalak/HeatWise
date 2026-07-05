'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from "next/dynamic";
import Legend from "./Legend";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

interface MapAreaProps {
  activeLayer: string;
  leftOpen?: boolean;
  rightOpen?: boolean;
  onToggleLeft?: () => void;
  onToggleRight?: () => void;
}


export default function MapArea({ activeLayer, leftOpen = true, rightOpen = true, onToggleLeft, onToggleRight }: MapAreaProps) {
  return (
    <main className="flex-1 relative bg-[#f2e7d7] overflow-hidden flex flex-col z-10 select-none transition-all duration-300">
      <div className="absolute inset-x-0 top-14 bottom-0 z-0">
        <LeafletMap />
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
