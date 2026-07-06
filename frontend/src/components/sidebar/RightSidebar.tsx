'use client';

import { useEffect, useState } from 'react';
import { Thermometer, Leaf, Activity, MapPin } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TemperatureChart from '@/components/charts/TemperatureChart';
import { getDashboard } from '@/services/api';
import { DashboardData } from '@/types';

export default function RightSidebar({ isOpen = true }: { isOpen?: boolean }) {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboard().then((res) => setData(res as DashboardData));
  }, []);

  if (!data) return <aside className={`bg-white border-l h-full flex items-center justify-center text-sm text-slate-500 transition-all duration-300 ${isOpen ? 'w-[300px]' : 'w-0 border-l-0'}`}>Loading...</aside>;

  return (
    <aside className={`bg-white border-slate-200/80 h-full overflow-hidden flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm select-none transition-all duration-300 ${isOpen ? 'w-[300px] border-l' : 'w-0 border-l-0'}`}>
      <div className="w-[300px] h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-[8px] border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900 flex items-center gap-1.5 text-[13px] leading-none">
          {/* Custom Lightning Bolt Icon from Figma */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F05A28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="pt-[1px]">AI Insights</span>
        </h2>
        <span className="bg-[#FFF3ED] text-[#F05A28] text-[8px] font-bold px-1.5 py-[2px] rounded-[4px] tracking-wide leading-none flex items-center justify-center">
          <span className="pt-[0.5px]">GPT-4o</span>
        </span>
      </div>

      {/* Mock Demo Data Notice */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200/60 flex items-center gap-1.5 text-[9.5px] text-slate-500 font-medium select-none">
        <span>ℹ️</span>
        <span>AI analysis and metrics shown are mock demo data</span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full rounded-none border-b border-slate-200 bg-transparent p-0 h-auto flex !gap-0">
          <TabsTrigger value="overview" className="flex-1 rounded-none !border-0 !border-b-[2px] !border-b-transparent data-active:!border-b-[#F05A28] data-active:!text-[#F05A28] data-active:!bg-transparent !shadow-none data-active:!shadow-none !py-2 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-none cursor-pointer -mb-[1px]">
            Overview
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex-1 rounded-none !border-0 !border-b-[2px] !border-b-transparent data-active:!border-b-[#F05A28] data-active:!text-[#F05A28] data-active:!bg-transparent !shadow-none data-active:!shadow-none !py-2 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-none cursor-pointer -mb-[1px]">
            Recommendations
          </TabsTrigger>
        </TabsList>

      <TabsContent value="overview" className="m-0 outline-none">
      {/* Insight Cards Grid */}
      <div className="p-3 grid grid-cols-2 gap-2.5">
        {/* Surface Temp */}
        <div className="bg-[#FFF6F6] border border-[#FCE4E4]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
          <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
            <Thermometer size={12} className="text-[#ED4E4E]" /> Surface Temp
          </div>
          <div className="text-[14px] font-semibold font-mono text-[#ED4E4E] mb-0.5 leading-none">{data.insights.surfaceTemp.value}</div>
          <div className="text-[9px] text-[#71717A] font-medium">{data.insights.surfaceTemp.subtext}</div>
        </div>

        {/* NDVI Score */}
        <div className="bg-[#F3FBF6] border border-[#D8F3E1]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
          <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
            <Leaf size={12} className="text-[#1CC664]" /> NDVI Score
          </div>
          <div className="text-[14px] font-semibold font-mono text-[#1CC664] mb-0.5 leading-none">{data.insights.ndviScore.value}</div>
          <div className="text-[9px] text-[#71717A] font-medium">{data.insights.ndviScore.subtext}</div>
        </div>

        {/* UHI Index */}
        <div className="bg-[#FFF7F4] border border-[#FCE8E1]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
          <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
            <Activity size={12} className="text-[#F05A28]" /> UHI Index
          </div>
          <div className="text-[14px] font-semibold font-mono text-[#F05A28] mb-0.5 leading-none">{data.insights.uhiIndex.value}</div>
          <div className="text-[9px] text-[#71717A] font-medium">{data.insights.uhiIndex.subtext}</div>
        </div>

        {/* Heat Zones */}
        <div className="bg-[#F8F5FF] border border-[#EAE0FE]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
          <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
            <MapPin size={12} className="text-[#A36AF5]" /> Heat Zones
          </div>
          <div className="text-[14px] font-semibold font-mono text-[#A36AF5] mb-0.5 leading-none">{data.insights.heatZones.value}</div>
          <div className="text-[9px] text-[#71717A] font-medium">{data.insights.heatZones.subtext}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-3 pb-3 border-b border-slate-100">
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 shadow-none">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[12px] font-bold text-slate-800">Temperature (24h)</h3>
            <span className="text-[9px] text-slate-500 font-bold font-mono">Phoenix</span>
          </div>
          <TemperatureChart />
          <div className="flex items-center gap-4 mt-2 text-[9px] font-semibold text-slate-500 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 bg-[#F05A28] rounded-full"></div> Today
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 bg-[#8DA2C0] rounded-full border-dashed"></div> 30-day avg
            </div>
          </div>
        </div>
      </div>

      {/* Vegetation Section */}
      <div className="px-3 pb-3">
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 shadow-none">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[12px] font-bold text-slate-800">Vegetation Coverage</h3>
            <span className="text-[9px] font-bold text-[#1CC664] font-mono">0.22 NDVI</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.vegetation.map((veg, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between text-[9.5px] font-medium">
                  <span className="text-slate-600">{veg.area}</span>
                  <span className={`font-bold capitalize font-mono text-[9px] ${
                    veg.color === 'green' ? 'text-[#1CC664]' :
                    veg.color === 'orange' ? 'text-[#F05A28]' :
                    'text-[#ED4E4E]'
                  }`}>
                    {veg.status}
                  </span>
                </div>
                <div className="h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      veg.color === 'green' ? 'bg-[#1CC664]' :
                      veg.color === 'orange' ? 'bg-[#F05A28]' :
                      'bg-[#ED4E4E]'
                    }`} 
                    style={{ width: `${veg.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </TabsContent>

      <TabsContent value="recommendations" className="m-0 outline-none p-4 flex flex-col gap-3.5 pb-24">
        {/* AI Analysis */}
        <div className="bg-[#FFF7F4] border border-[#FCE8E1] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-2">
          <div className="text-[11px] text-[#F05A28] font-bold flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11.5 2 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z"/></svg>
            AI Analysis
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Phoenix is experiencing a severe urban heat island event. The downtown core shows surface temps 4.3°C above suburban areas. Immediate intervention recommended for 3 critical zones.</p>
        </div>

        {/* Downtown Core */}
        <div className="bg-[#FFF6F6] border border-[#FCE4E4] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-3">
          <div className="text-[11px] font-medium flex items-center gap-1.5">
            <div className="text-[#ED4E4E]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>
            Downtown Core
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Deploy emergency cooling stations — 3 hotspot zones exceed 47°C</p>
          <button className="bg-red-500/10 text-red-600 font-bold text-[9px] px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 hover:bg-red-500/20 transition-colors">
            Activate protocol ➔
          </button>
        </div>

        {/* Warehouse District */}
        <div className="bg-[#FFF7F4] border border-[#FCE8E1] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-3">
          <div className="text-[11px] font-medium flex items-center gap-1.5">
            <div className="text-[#F05A28]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>
            Warehouse District
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Low NDVI (0.12) + high albedo — recommend green roof pilot</p>
          <button className="bg-orange-500/10 text-orange-600 font-bold text-[9px] px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 hover:bg-orange-500/20 transition-colors">
            View proposal ➔
          </button>
        </div>

        {/* Residential NW */}
        <div className="bg-[#F4F8FE] border border-[#E1EEFD] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-3">
          <div className="text-[11px] font-medium flex items-center gap-1.5">
            <div className="text-[#5898F6]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
            Residential NW
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Planting 2,400 shade trees would reduce local temp by ~2.1°C</p>
          <button className="bg-blue-500/10 text-blue-600 font-bold text-[9px] px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 hover:bg-blue-500/20 transition-colors">
            Generate report ➔
          </button>
        </div>

        {/* Greenway Corridor */}
        <div className="bg-[#F3FBF6] border border-[#D8F3E1] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-3">
          <div className="text-[11px] font-medium flex items-center gap-1.5">
            <div className="text-[#1CC664]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg></div>
            Greenway Corridor
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Mitigation efforts since Q1 reduced UHI index by 8.3%</p>
          <button className="bg-green-500/10 text-green-600 font-bold text-[9px] px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 hover:bg-green-500/20 transition-colors">
            View analysis ➔
          </button>
        </div>

        {/* Projected Impact */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-3 mt-1">
          <div className="text-[11px] text-slate-800 font-medium flex items-center gap-1.5">
            Projected Impact
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
              <span className="text-[9.5px] text-slate-600 font-medium">Temp reduction if all actions taken</span>
              <span className="text-[9.5px] text-[#1CC664] font-bold">-3.8°C</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
              <span className="text-[9.5px] text-slate-600 font-medium">CO₂ offset (trees planted)</span>
              <span className="text-[9.5px] text-[#5898F6] font-bold">1,240 t/yr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] text-slate-600 font-medium">Energy savings estimate</span>
              <span className="text-[9.5px] text-[#F05A28] font-bold">$2.1M/yr</span>
            </div>
          </div>
        </div>
      </TabsContent>
      </Tabs>

      </div>
    </aside>
  );
}
