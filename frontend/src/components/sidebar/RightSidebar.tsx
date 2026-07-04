'use client';

import { useEffect, useState } from 'react';
import { Thermometer, Leaf, Activity, Map } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TemperatureChart from '@/components/charts/TemperatureChart';
import { getDashboard } from '@/services/api';
import { DashboardData } from '@/types';

export default function RightSidebar() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboard().then((res) => setData(res as DashboardData));
  }, []);

  if (!data) return <aside className="w-[380px] bg-white border-l h-full flex items-center justify-center text-sm text-slate-500">Loading...</aside>;

  return (
    <aside className="w-[380px] bg-white border-l border-slate-200/80 h-full overflow-y-auto flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm select-none">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-bold text-slate-800 flex items-center gap-2 text-[14.5px]">
          {/* Custom Sparkle Icon from Figma */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11.5 2 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z"/>
          </svg>
          AI Insights
        </h2>
        <span className="bg-[#ea580c]/10 text-[#ea580c] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">GPT-4o</span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full rounded-none border-b border-slate-200 bg-transparent p-0 h-auto flex">
          <TabsTrigger value="overview" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#ea580c] data-[state=active]:text-[#ea580c] data-[state=active]:bg-transparent py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-700 transition-none shadow-none cursor-pointer">
            Overview
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#ea580c] data-[state=active]:text-[#ea580c] data-[state=active]:bg-transparent py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-700 transition-none shadow-none cursor-pointer">
            Recommendations
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Insight Cards Grid */}
      <div className="p-5 grid grid-cols-2 gap-3.5">
        {/* Surface Temp */}
        <div className="bg-red-500/[0.03] border border-red-100/80 hover:border-red-200 rounded-2xl p-4 flex flex-col justify-center transition-all duration-250 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-sm">
          <div className="text-[10px] text-red-500/80 flex items-center gap-1.5 mb-2 font-bold tracking-wider uppercase">
            <Thermometer size={14} className="text-red-400" /> Surface Temp
          </div>
          <div className="text-2xl font-bold font-mono text-red-500 mb-0.5 leading-none">{data.insights.surfaceTemp.value}</div>
          <div className="text-[10.5px] text-slate-400 font-semibold">{data.insights.surfaceTemp.subtext}</div>
        </div>

        {/* NDVI Score */}
        <div className="bg-green-500/[0.03] border border-green-100/80 hover:border-green-200 rounded-2xl p-4 flex flex-col justify-center transition-all duration-250 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-sm">
          <div className="text-[10px] text-green-600/80 flex items-center gap-1.5 mb-2 font-bold tracking-wider uppercase">
            <Leaf size={14} className="text-green-500" /> NDVI Score
          </div>
          <div className="text-2xl font-bold font-mono text-green-600 mb-0.5 leading-none">{data.insights.ndviScore.value}</div>
          <div className="text-[10.5px] text-slate-400 font-semibold">{data.insights.ndviScore.subtext}</div>
        </div>

        {/* UHI Index */}
        <div className="bg-orange-500/[0.03] border border-orange-100/80 hover:border-orange-200 rounded-2xl p-4 flex flex-col justify-center transition-all duration-250 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-sm">
          <div className="text-[10px] text-orange-600/80 flex items-center gap-1.5 mb-2 font-bold tracking-wider uppercase">
            <Activity size={14} className="text-orange-500" /> UHI Index
          </div>
          <div className="text-2xl font-bold font-mono text-orange-600 mb-0.5 leading-none">{data.insights.uhiIndex.value}</div>
          <div className="text-[10.5px] text-slate-400 font-semibold">{data.insights.uhiIndex.subtext}</div>
        </div>

        {/* Heat Zones */}
        <div className="bg-purple-500/[0.03] border border-purple-100/80 hover:border-purple-200 rounded-2xl p-4 flex flex-col justify-center transition-all duration-250 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-sm">
          <div className="text-[10px] text-purple-600/80 flex items-center gap-1.5 mb-2 font-bold tracking-wider uppercase">
            <Map size={14} className="text-purple-500" /> Heat Zones
          </div>
          <div className="text-2xl font-bold font-mono text-purple-600 mb-0.5 leading-none">{data.insights.heatZones.value}</div>
          <div className="text-[10.5px] text-slate-400 font-semibold">{data.insights.heatZones.subtext}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-5 pb-5 border-b border-slate-100">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-slate-800">Temperature (24h)</h3>
            <span className="text-[10.5px] text-slate-400 font-mono font-bold">Phoenix</span>
          </div>
          <TemperatureChart />
          <div className="flex items-center gap-5 mt-4 text-[10.5px] font-semibold text-slate-400 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[#ea580c] rounded-full"></div> Today
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-slate-400 rounded-full border-dashed"></div> 30-day avg
            </div>
          </div>
        </div>
      </div>

      {/* Vegetation Section */}
      <div className="p-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-slate-800">Vegetation Coverage</h3>
            <span className="text-[11.5px] font-mono font-bold text-green-500">0.22 NDVI</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {data.vegetation.map((veg, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-600">{veg.area}</span>
                  <span className={`font-bold uppercase text-[10.5px] ${
                    veg.color === 'green' ? 'text-green-500' :
                    veg.color === 'orange' ? 'text-orange-500' :
                    'text-red-500'
                  }`}>
                    {veg.status}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      veg.color === 'green' ? 'bg-green-500' :
                      veg.color === 'orange' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`} 
                    style={{ width: `${veg.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </aside>
  );
}
