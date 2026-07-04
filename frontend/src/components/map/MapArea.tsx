'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MapArea() {
  return (
    <main className="flex-1 relative bg-[#f2e7d7] overflow-hidden flex flex-col pt-14 z-10 select-none">
      
      {/* Grid Mockup Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.75) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.75) 1.5px, transparent 1.5px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Simulated map overlays to visually match Figma map */}
      <div className="absolute top-[18%] left-[0%] w-[35%] h-[12%] bg-[#86efac]/60 border-b border-r border-white/40"></div>
      <div className="absolute top-[18%] left-[35%] w-[25%] h-[12%] bg-[#f87171]/70 border-b border-r border-white/40"></div>
      <div className="absolute top-[18%] left-[60%] w-[40%] h-[12%] bg-[#fdba74]/70 border-b border-r border-white/40"></div>
      
      {/* Gomti River area and overlay */}
      <div className="absolute top-[30%] left-[0%] w-[100%] h-[20%] bg-[#ef4444]/65 border-b border-white/40 flex items-center justify-center">
        {/* River blue strip */}
        <div className="absolute left-0 right-0 h-6 bg-[#38bdf8]/40 border-y border-white/30 backdrop-blur-[0.5px]"></div>
      </div>
      <div className="absolute top-[30%] left-[35%] w-[25%] h-[20%] bg-[#b91c1c]/60 mix-blend-multiply border-b border-white/40"></div>
      
      <div className="absolute top-[50%] left-[0%] w-[45%] h-[22%] bg-[#86efac]/70 border-b border-r border-white/40"></div>
      <div className="absolute top-[50%] left-[45%] w-[55%] h-[22%] bg-[#fde047]/60 border-b border-white/40"></div>
      
      <div className="absolute top-[72%] left-[0%] w-[100%] h-[28%] bg-[#fde047]/50"></div>
      <div className="absolute top-[72%] left-[30%] w-[40%] h-[28%] bg-[#b91c1c]/10 mix-blend-multiply"></div>

      {/* Concentric Circle indicators */}
      {/* Aminabad Hotspot */}
      <div className="absolute top-[50%] left-[33%] flex items-center justify-center z-20">
        <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-500/30 animate-pulse"></span>
        <span className="absolute inline-flex h-5 w-5 rounded-full bg-red-600/40 border border-white/40"></span>
        <span className="relative rounded-full h-2 w-2 bg-red-600 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"></span>
      </div>

      {/* Alambagh Hotspot */}
      <div className="absolute top-[71%] left-[27%] flex items-center justify-center z-20">
        <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-500/30 animate-pulse"></span>
        <span className="absolute inline-flex h-5 w-5 rounded-full bg-red-600/40 border border-white/40"></span>
        <span className="relative rounded-full h-2 w-2 bg-red-600 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"></span>
      </div>

      {/* Building Mockups footprint overlay in Hazratganj */}
      <div className="absolute top-[46%] left-[40%] grid grid-cols-4 gap-1 opacity-[0.35] pointer-events-none z-20">
        <div className="w-5 h-5 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-6 h-5 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-4 h-5 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-7 h-5 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-6 h-4 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-5 h-4 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-6 h-4 bg-[#475569] rounded-[2px] shadow-sm"></div>
        <div className="w-4 h-4 bg-[#475569] rounded-[2px] shadow-sm"></div>
      </div>

      {/* Map Labels */}
      <span className="absolute top-[32%] left-[22%] text-slate-800/80 font-bold text-[10px] tracking-wide bg-white/45 px-1 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)]">Mahanagar</span>
      <span className="absolute top-[32%] left-[41%] text-slate-800/90 font-bold text-[10.5px] tracking-wide bg-white/45 px-1 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)]">Aliganj</span>
      <span className="absolute top-[30%] left-[58%] text-slate-800/80 font-bold text-[10px] tracking-wide bg-white/45 px-1 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)]">Indira Nagar</span>
      
      <span className="absolute top-[41%] left-[45%] text-slate-800/70 font-extrabold text-[11px] tracking-widest uppercase z-20 select-none">Gomti River</span>
      
      <span className="absolute top-[51%] left-[31.5%] text-slate-800 font-bold text-[10px] bg-white/80 px-1 py-0.5 rounded shadow-sm border border-slate-200/50 z-20">Aminabad</span>
      <div className="absolute top-[50%] left-[42.5%] bg-[#ea580c]/90 border border-orange-500 text-white font-bold text-[11.5px] px-2 py-0.5 rounded shadow-md z-20 drop-shadow-sm select-none">
        Hazratganj
      </div>
      <span className="absolute top-[51%] left-[58%] text-slate-800/80 font-bold text-[10px] tracking-wide bg-white/45 px-1 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)]">Gomti Nagar</span>
      
      <span className="absolute top-[72%] left-[23.5%] text-slate-800 font-bold text-[10px] bg-white/80 px-1 py-0.5 rounded shadow-sm border border-slate-200/50 z-20">Alambagh</span>
      <span className="absolute top-[71%] left-[48%] text-slate-800/80 font-bold text-[10px] tracking-wide bg-white/45 px-1 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)]">Rajajipuram</span>
      <span className="absolute top-[71%] left-[68%] text-slate-800/80 font-bold text-[10px] tracking-wide bg-white/45 px-1 rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)]">South City</span>

      {/* Slider Left Arrow */}
      <button className="absolute left-4 top-[50%] -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-600 flex items-center justify-center shadow-md hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all border border-slate-200 z-30 select-none cursor-pointer">
        <ChevronLeft size={16} />
      </button>

      {/* Slider Right Arrow */}
      <button className="absolute right-4 top-[50%] -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-600 flex items-center justify-center shadow-md hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all border border-slate-200 z-30 select-none cursor-pointer">
        <ChevronRight size={16} />
      </button>

      {/* Cookie Consent Banner Mockup */}
      <div className="absolute bottom-6 left-6 z-30">
        <button className="bg-[#0f172a] text-slate-200 text-[11px] font-bold px-3.5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 active:scale-95 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer">
          Manage cookies or opt out
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-[200px] bg-[#1a202c]/95 backdrop-blur-md p-4 rounded-xl text-white w-64 shadow-xl border border-slate-700/50 z-20 select-none">
        <div className="text-[10px] font-bold tracking-wider mb-2.5 text-slate-400 uppercase">SURFACE TEMP</div>
        <div className="h-2 rounded-full bg-gradient-to-r from-[#22c55e] via-[#eab308] via-[#ea580c] to-[#991b1b] mb-2"></div>
        <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
          <span>28°C</span>
          <span>36°C</span>
          <span>44°C</span>
          <span>52°C</span>
        </div>
      </div>

      {/* Floating Help Button - Fixed at bottom-right of viewport */}
      <button className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#1a202c] text-white flex items-center justify-center shadow-xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all z-50 border border-slate-700/50 font-bold text-lg cursor-pointer">
        ?
      </button>

      {/* 500m scale */}
      <span className="absolute bottom-6 right-6 text-[10px] font-bold text-slate-400 font-mono select-none">500m</span>
    </main>
  );
}
