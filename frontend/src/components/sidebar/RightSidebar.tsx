'use client';

import { useEffect, useState } from 'react';
import { Thermometer, Leaf, Activity, MapPin, Cloud, Building, Droplets, Map, RotateCcw, Home, Sun } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { getDashboard } from '@/services/api';
import { DashboardData } from '@/types';
import { getPrediction } from "@/services/api";
export default function RightSidebar({ isOpen = true }: { isOpen?: boolean }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [interventions, setInterventions] = useState({
    treeCover: 0,
    coolRoofs: 0,
    waterFeatures: 0,
    reflectiveSurfaces: 0
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [simulation, setSimulation] = useState<any>(null);
  useEffect(() => {
    getDashboard().then((res) => setData(res as DashboardData));
  }, []);

  if (!data) return <aside className={`bg-white border-l h-full flex items-center justify-center text-sm text-slate-500 transition-all duration-300 ${isOpen ? 'w-[300px]' : 'w-0 border-l-0'}`}>Loading...</aside>;

  return (
    <aside className={`bg-white border-slate-200/80 h-full overflow-hidden flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm select-none transition-all duration-300 ${isOpen ? 'w-[300px] border-l' : 'w-0 border-l-0'}`}>
      <div className="w-[300px] h-full flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-3 pb-2">
          <div className="bg-white rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center py-1.5 px-4">
            <h2 className="font-medium text-slate-800 flex items-center gap-2 text-[14px] leading-none">
              <Activity size={15} className="text-[#F05A28]" />
              <span className="pt-[1px]">Analysis</span>
            </h2>
          </div>
        </div>



        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full rounded-none border-b border-slate-200 bg-transparent p-0 h-auto flex !gap-0">
            <TabsTrigger value="overview" className="flex-1 rounded-none !border-0 !border-b-[2px] !border-b-transparent data-active:!border-b-[#F05A28] data-active:!text-[#F05A28] data-active:!bg-transparent !shadow-none data-active:!shadow-none !py-2 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-none cursor-pointer -mb-[1px]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="simulate" className="flex-1 rounded-none !border-0 !border-b-[2px] !border-b-transparent data-active:!border-b-[#F05A28] data-active:!text-[#F05A28] data-active:!bg-transparent !shadow-none data-active:!shadow-none !py-2 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-none cursor-pointer -mb-[1px]">
              Simulate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="m-0 outline-none">
            {/* Insight Cards Grid */}
            <div className="p-3 grid grid-cols-2 gap-2.5">
              {/* Avg Surface Temp */}
              <div className="bg-[#FFF6F6] border border-[#FCE4E4]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Thermometer size={12} className="text-[#ED4E4E]" /> Avg Surface Temp
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#ED4E4E] mb-0.5 leading-none">{data.insights.avgSurfaceTemp.value}</div>
                <div className="text-[9px] text-[#71717A] font-medium">{data.insights.avgSurfaceTemp.subtext}</div>
              </div>

              {/* Avg Air Temp */}
              <div className="bg-[#F0FAFF] border border-[#E0F2FE]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Cloud size={12} className="text-[#0EA5E9]" /> Avg Air Temp
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#0EA5E9] mb-0.5 leading-none">{data.insights.avgAirTemp.value}</div>
                <div className="text-[9px] text-[#71717A] font-medium">{data.insights.avgAirTemp.subtext}</div>
              </div>

              {/* Green Cover */}
              <div className="bg-[#F3FBF6] border border-[#D8F3E1]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Leaf size={12} className="text-[#1CC664]" /> Green Cover
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#1CC664] mb-0.5 leading-none">{data.insights.greenCover.value}</div>
                <div className="text-[9px] text-[#71717A] font-medium">{data.insights.greenCover.subtext}</div>
              </div>

              {/* Built-up Area */}
              <div className="bg-[#F8F5FF] border border-[#EAE0FE]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Building size={12} className="text-[#A36AF5]" /> Built-up Area
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#A36AF5] mb-0.5 leading-none">{data.insights.builtUpArea.value}</div>
                <div className="text-[9px] text-[#71717A] font-medium">{data.insights.builtUpArea.subtext}</div>
              </div>

              {/* Water Coverage */}
              <div className="bg-[#F0F7FF] border border-[#DDECFF]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Droplets size={12} className="text-[#3B82F6]" /> Water Coverage
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#3B82F6] mb-0.5 leading-none">{data.insights.waterCoverage.value}</div>
                <div className="text-[9px] text-[#71717A] font-medium">{data.insights.waterCoverage.subtext}</div>
              </div>

              {/* Dominant Land Type */}
              <div className="bg-[#FFFBF0] border border-[#FEF0C7]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Map size={12} className="text-[#F59E0B]" /> Dominant Land
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#F59E0B] mb-0.5 leading-none">{data.insights.dominantLandType.value}</div>
                <div className="text-[9px] text-[#71717A] font-medium">{data.insights.dominantLandType.subtext}</div>
              </div>
            </div>


            {/* Recommendations Section */}
            <div className="px-4 pb-4 flex flex-col gap-3.5">
              <h3 className="text-[12px] font-bold text-slate-800 mt-2">Recommendations</h3>

              {/* Downtown Core */}
              <div className="bg-[#FFF6F6] border border-[#FCE4E4] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-3">
                <div className="text-[11px] font-medium flex items-center gap-1.5">
                  <div className="text-[#ED4E4E]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></div>
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
                  <div className="text-[#F05A28]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></div>
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
                  <div className="text-[#5898F6]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg></div>
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
                  <div className="text-[#1CC664]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg></div>
                  Greenway Corridor
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Mitigation efforts since Q1 reduced UHI index by 8.3%</p>
                <button className="bg-green-500/10 text-green-600 font-bold text-[9px] px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 hover:bg-green-500/20 transition-colors">
                  View analysis ➔
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="simulate" className="m-0 outline-none p-4 flex flex-col gap-4 pb-24 h-full overflow-y-auto overflow-x-hidden">
            {/* Section 1: Design Interventions */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-4 relative">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[12px] font-bold text-slate-800">Design Interventions</h3>
                <button
                  onClick={() => {
                    setInterventions({ treeCover: 0, coolRoofs: 0, waterFeatures: 0, reflectiveSurfaces: 0 });
                    setHasSimulated(false);
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-md"
                >
                  <RotateCcw size={10} /> Reset
                </button>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-3.5">
                {[
                  { id: 'treeCover', label: 'Tree Cover', icon: Leaf, color: 'text-green-500', max: 100 },
                  { id: 'coolRoofs', label: 'Cool Roofs', icon: Home, color: 'text-blue-500', max: 100 },
                  { id: 'waterFeatures', label: 'Water Features', icon: Droplets, color: 'text-cyan-500', max: 100 },
                  { id: 'reflectiveSurfaces', label: 'Reflective Surfaces', icon: Sun, color: 'text-amber-500', max: 100 },
                ].map((item) => (
                  <div key={item.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <item.icon size={12} className={item.color} /> {item.label}
                      </div>
                      <span className="text-slate-500 font-mono text-[10px]">{interventions[item.id as keyof typeof interventions]}%</span>
                    </div>
                    <input
                      type="range"
                      min="0" max={item.max}
                      value={interventions[item.id as keyof typeof interventions]}
                      onChange={(e) => {
                        setInterventions({ ...interventions, [item.id]: parseInt(e.target.value) });
                        setHasSimulated(false); // Reset simulation state on change
                      }}
                      style={{ background: `linear-gradient(to right, #f97316 ${interventions[item.id as keyof typeof interventions]}%, #e2e8f0 ${interventions[item.id as keyof typeof interventions]}%)` }}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-sm [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-1.5 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-sm [&::-moz-range-thumb]:border-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Run Simulation */}
            <button
              onClick={async () => {
                setIsSimulating(true);

                try {
                  const result = await getPrediction(
                    26.8467,
                    80.9462,
                    interventions.treeCover / 100,
                    interventions.reflectiveSurfaces / 100,
                    1 - interventions.coolRoofs / 200
                  );

                  console.log(result);

                  setSimulation(result);
                  setHasSimulated(true);
                } catch (err) {
                  console.error(err);
                }

                setIsSimulating(false);
              }}
              disabled={isSimulating}
              className="w-full bg-[#F05A28] hover:bg-[#E04D1E] text-white font-bold text-[12px] py-3 rounded-xl shadow-[0_2px_10px_rgba(240,90,40,0.2)] transition-all flex items-center justify-center disabled:opacity-70"
            >
              {isSimulating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Running Simulation...
                </span>
              ) : 'Run Simulation'}
            </button>

            {/* Sections 3, 4, 5: Results */}
            <div className={`flex flex-col gap-4 transition-all duration-500 overflow-hidden ${hasSimulated ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
              {/* Simulation Results */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] text-slate-500 font-medium mb-1 line-clamp-1">Current</span>
                  <span className="text-[13px] font-bold text-slate-700 font-mono">41.2°C</span>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] text-orange-600/80 font-medium mb-1 line-clamp-1">Simulated</span>
                  <span className="text-[13px] font-bold text-orange-600 font-mono">
                    {(41.2 - (interventions.treeCover * 0.014 + interventions.coolRoofs * 0.012 + interventions.reflectiveSurfaces * 0.007 + interventions.waterFeatures * 0.003)).toFixed(1)}°C
                  </span>
                </div>
                <div className="bg-[#F3FBF6] border border-[#1CC664]/30 rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-[9px] text-green-700/80 font-medium mb-1 line-clamp-1">Reduction</span>
                  <span className="text-[15px] font-bold text-[#1CC664] font-mono">
                    -{(interventions.treeCover * 0.014 + interventions.coolRoofs * 0.012 + interventions.reflectiveSurfaces * 0.007 + interventions.waterFeatures * 0.003).toFixed(1)}°C
                  </span>
                </div>
              </div>

              {/* Intervention Impact */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <h3 className="text-[12px] font-bold text-slate-800">Intervention Impact</h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    { id: 'treeCover', label: 'Tree Cover', icon: Leaf, color: 'bg-green-500', factor: 0.014 },
                    { id: 'coolRoofs', label: 'Cool Roofs', icon: Home, color: 'bg-blue-500', factor: 0.012 },
                    { id: 'reflectiveSurfaces', label: 'Reflective Surfaces', icon: Sun, color: 'bg-amber-500', factor: 0.007 },
                    { id: 'waterFeatures', label: 'Water Features', icon: Droplets, color: 'bg-cyan-500', factor: 0.003 },
                  ].sort((a, b) => (interventions[b.id as keyof typeof interventions] * b.factor) - (interventions[a.id as keyof typeof interventions] * a.factor)).map((item) => {
                    const reduction = (interventions[item.id as keyof typeof interventions] * item.factor);
                    const maxTotal = 100 * 0.014 + 100 * 0.012 + 100 * 0.007 + 100 * 0.003;
                    const width = Math.max(0, (reduction / (maxTotal * 0.5)) * 100); // Scale up visually for small values
                    if (reduction === 0) return null;
                    return (
                      <div key={item.id} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[10px] font-medium text-slate-600">
                          <div className="flex items-center gap-1.5"><item.icon size={10} className="text-slate-400" /> {item.label}</div>
                          <span className="font-mono font-bold text-slate-700">↓ {reduction.toFixed(1)}°C</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, width)}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                  {interventions.treeCover === 0 && interventions.coolRoofs === 0 && interventions.reflectiveSurfaces === 0 && interventions.waterFeatures === 0 && (
                    <div className="text-[10px] text-slate-400 italic text-center py-2">No interventions selected.</div>
                  )}
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-[10px] text-slate-800 font-bold flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11.5 2 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z" /></svg>
                  AI Summary
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                  {(interventions.treeCover === 0 && interventions.coolRoofs === 0 && interventions.reflectiveSurfaces === 0 && interventions.waterFeatures === 0)
                    ? 'Apply interventions above to see their simulated impact on the environment.'
                    : <>
                      {(interventions.treeCover * 0.014) >= (interventions.coolRoofs * 0.012) ? 'Increasing tree cover produced the largest reduction in surface temperature. ' : 'Adding cool roofs produced the largest reduction in surface temperature. '}
                      {(interventions.waterFeatures > 0 || interventions.reflectiveSurfaces > 0) && 'Water features and reflective surfaces provided additional localized cooling.'}
                    </>
                  }
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </aside>
  );
}
