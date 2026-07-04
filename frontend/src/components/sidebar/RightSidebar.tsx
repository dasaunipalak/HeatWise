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
    <aside className="w-[380px] bg-white border-l border-slate-200 h-full overflow-y-auto flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-bold text-slate-800 flex items-center gap-2 text-[15px]">
          {/* Custom Sparkle Icon from Figma */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11.5 2 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z"/>
          </svg>
          AI Insights
        </h2>
        <span className="bg-orange-500/10 text-[#ea580c] text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide">GPT-4o</span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full rounded-none border-b border-slate-200 bg-transparent p-0 h-auto flex">
          <TabsTrigger value="overview" className="flex-1 rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#ea580c] data-[state=active]:text-[#ea580c] data-[state=active]:bg-transparent py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-700 transition-none shadow-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex-1 rounded-none border-b-[3px] border-transparent data-[state=active]:border-[#ea580c] data-[state=active]:text-[#ea580c] data-[state=active]:bg-transparent py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-700 transition-none shadow-none">
            Recommendations
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Insight Cards */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {/* Surface Temp */}
        <div className="bg-red-500/5 border border-red-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2.5 font-bold tracking-wide">
            <Thermometer size={14} className="text-red-400" /> Surface Temp
          </div>
          <div className="text-2xl font-bold font-mono text-red-500 mb-0.5">{data.insights.surfaceTemp.value}</div>
          <div className="text-[11px] text-slate-500 font-medium">{data.insights.surfaceTemp.subtext}</div>
        </div>

        {/* NDVI Score */}
        <div className="bg-green-500/5 border border-green-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2.5 font-bold tracking-wide">
            <Leaf size={14} className="text-green-500" /> NDVI Score
          </div>
          <div className="text-2xl font-bold font-mono text-green-500 mb-0.5">{data.insights.ndviScore.value}</div>
          <div className="text-[11px] text-slate-500 font-medium">{data.insights.ndviScore.subtext}</div>
        </div>

        {/* UHI Index */}
        <div className="bg-orange-500/5 border border-orange-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2.5 font-bold tracking-wide">
            <Activity size={14} className="text-orange-500" /> UHI Index
          </div>
          <div className="text-2xl font-bold font-mono text-orange-500 mb-0.5">{data.insights.uhiIndex.value}</div>
          <div className="text-[11px] text-slate-500 font-medium">{data.insights.uhiIndex.subtext}</div>
        </div>

        {/* Heat Zones */}
        <div className="bg-purple-500/5 border border-purple-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2.5 font-bold tracking-wide">
            <Map size={14} className="text-purple-500" /> Heat Zones
          </div>
          <div className="text-2xl font-bold font-mono text-purple-500 mb-0.5">{data.insights.heatZones.value}</div>
          <div className="text-[11px] text-slate-500 font-medium">{data.insights.heatZones.subtext}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-6 pb-6 border-b border-slate-200">
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[13px] font-bold text-slate-800">Temperature (24h)</h3>
            <span className="text-[11px] text-slate-400 font-mono font-medium">Phoenix</span>
          </div>
          <TemperatureChart />
          <div className="flex items-center gap-5 mt-5 text-[11px] font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#ea580c] rounded-full"></div> Today
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-slate-400 rounded-full border-dashed"></div> 30-day avg
            </div>
          </div>
        </div>
      </div>

      {/* Vegetation Section */}
      <div className="p-6">
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-bold text-slate-800">Vegetation Coverage</h3>
            <span className="text-[12px] font-mono font-bold text-green-500">0.22 NDVI</span>
          </div>
          <div className="flex flex-col gap-4">
            {data.vegetation.map((veg, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-700 font-semibold">{veg.area}</span>
                  <span className={`font-bold ${
                    veg.color === 'green' ? 'text-green-500' :
                    veg.color === 'orange' ? 'text-orange-500' :
                    'text-red-500'
                  }`}>
                    {veg.status}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
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
