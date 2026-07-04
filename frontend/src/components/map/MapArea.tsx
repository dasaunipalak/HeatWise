'use client';

import { HelpCircle } from 'lucide-react';

export default function MapArea() {
  return (
    <main className="flex-1 relative bg-[#f1e6d6] overflow-hidden flex flex-col pt-14 z-10">
      
      {/* Grid Mockup Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.7) 2px, transparent 2px)',
          backgroundSize: '120px 120px',
        }}
      />

      {/* Simulated map overlays to visually match Figma map */}
      <div className="absolute top-[18%] left-[0%] w-[35%] h-[12%] bg-[#86efac]/70"></div>
      <div className="absolute top-[18%] left-[36%] w-[25%] h-[12%] bg-[#f87171]/80"></div>
      <div className="absolute top-[18%] left-[62%] w-[38%] h-[12%] bg-[#fdba74]/80"></div>
      
      <div className="absolute top-[31%] left-[0%] w-[100%] h-[28%] bg-[#ef4444]/75"></div>
      <div className="absolute top-[31%] left-[36%] w-[25%] h-[28%] bg-[#b91c1c]/70 mix-blend-multiply"></div>
      
      <div className="absolute top-[60%] left-[0%] w-[45%] h-[20%] bg-[#86efac]/80"></div>
      <div className="absolute top-[60%] left-[46%] w-[54%] h-[25%] bg-[#fde047]/70"></div>

      {/* Map Labels */}
      <span className="absolute top-[28%] left-[40%] text-slate-800/60 font-bold text-[10px] tracking-wide">Aliganj</span>
      <span className="absolute top-[42%] left-[45%] text-slate-800/50 font-bold text-[12px] tracking-widest uppercase">Gomti River</span>
      <span className="absolute top-[52%] left-[43%] text-white font-bold text-[13px] tracking-wide drop-shadow-md">Hazratganj</span>
      <span className="absolute top-[70%] left-[50%] text-slate-800/40 font-bold text-[11px] tracking-wide">Rajajipuram</span>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-[#1a202c]/95 backdrop-blur-md p-4 rounded-xl text-white w-64 shadow-xl border border-slate-700/50 z-20">
        <div className="text-[11px] font-mono tracking-widest mb-3 text-slate-300 font-bold uppercase">SURFACE TEMP</div>
        <div className="h-2.5 rounded-full bg-gradient-to-r from-[#22c55e] via-[#eab308] via-[#ea580c] to-[#991b1b] mb-2.5"></div>
        <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
          <span>28°C</span>
          <span>36°C</span>
          <span>44°C</span>
          <span>52°C</span>
        </div>
      </div>

      {/* Floating Help Button */}
      <button className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-[#1a202c] text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors z-20 border border-slate-700/50">
        <HelpCircle size={20} />
      </button>

      {/* 500m scale */}
      <span className="absolute bottom-6 right-20 text-[10px] font-bold text-slate-400 font-mono">500m</span>
    </main>
  );
}
