'use client';

import { useEffect, useState } from 'react';
import { Thermometer, Leaf, Activity, Cloud, Building, Droplets, Map, RotateCcw, Home, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { getDashboard } from '@/services/api';
import { DashboardData } from '@/types';
import { getPrediction } from "@/services/api";

const LULC_CLASSES = [
  "Water",             // 0
  "Trees",             // 1
  "Grass",             // 2
  "Flooded Vegetation",// 3
  "Crops",             // 4
  "Shrub & Scrub",     // 5
  "Built Area",        // 6
  "Bare Ground",       // 7
  "Snow/Ice"           // 8
];

interface RightSidebarProps {
  isOpen?: boolean;
  selectedLocation: { lat: number; lon: number } | null;
  onClose?: () => void;
}

export default function RightSidebar({ isOpen = true, selectedLocation, onClose }: RightSidebarProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [backendData, setBackendData] = useState<any>(null);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);
  const [interventions, setInterventions] = useState({
    treeCover: 0,
    coolRoofs: 0,
    waterFeatures: 0,
    reflectiveSurfaces: 0
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [simulation, setSimulation] = useState<any>(null);

  // Fallback to Lucknow coordinates on initial load if no location is clicked yet
  const locationToQuery = selectedLocation || { lat: 26.8467, lon: 80.9462 };

  useEffect(() => {
    getDashboard().then((res) => setData(res as DashboardData));
  }, []);

  // Fetch real GEE static features and live weather data from backend when location changes
useEffect(() => {
  const controller = new AbortController();

  setIsLoadingBackend(true);

  getPrediction(
    locationToQuery.lat,
    locationToQuery.lon,
    0,
    0,
    1,
    controller.signal
  )
    .then((result) => {
      setBackendData(result);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch backend metrics:", error);
      }
    })
    .finally(() => {
      if (!controller.signal.aborted) {
        setIsLoadingBackend(false);
      }
    });

  return () => {
    controller.abort();
  };
}, [locationToQuery.lat, locationToQuery.lon]);

  if (!data) return <aside className={`fixed inset-y-0 right-0 md:static bg-white border-l h-full flex items-center justify-center text-sm text-slate-500 transition-all duration-300 z-40 ${isOpen ? 'w-[300px]' : 'w-0 border-l-0'}`}>Loading...</aside>;

  return (
    <aside className={`fixed inset-y-0 right-0 md:static bg-white border-slate-200/80 h-full overflow-hidden flex flex-col pt-14 flex-shrink-0 z-40 shadow-sm select-none transition-all duration-300 ${isOpen ? 'w-[300px] border-l' : 'w-0 border-l-0'}`}>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close right sidebar"
          className="md:hidden absolute left-2 top-16 z-50 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <X size={16} />
        </button>
      )}
      <div className="w-[300px] h-full flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-3 pb-2">
          <div className="bg-white rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center justify-center py-2 px-4 gap-1">
            <h2 className="font-medium text-slate-800 flex items-center gap-2 text-[14px] leading-none">
              <Activity size={15} className="text-[#F05A28]" />
              <span className="pt-[1px]">Analysis</span>
            </h2>
            <span className="text-[9px] text-slate-400 font-mono">
              {selectedLocation 
                ? `${selectedLocation.lat.toFixed(4)}°, ${selectedLocation.lon.toFixed(4)}°` 
                : "Lucknow (Default)"}
            </span>
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
              {/* Zone-average predicted surface temperature */}
              <div className="bg-[#FFF6F6] border border-[#FCE4E4]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Thermometer size={12} className="text-[#ED4E4E]" /> Zone Surface Temp
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#ED4E4E] mb-0.5 leading-none">
                  {backendData 
                    ? `${backendData.current_temperature.toFixed(1)}°C` 
                    : data.insights.avgSurfaceTemp.value}
                </div>
                <div className="text-[9px] text-[#71717A] font-medium">
                  {backendData 
                    ? "1 km zone ML prediction"
                    : data.insights.avgSurfaceTemp.subtext}
                </div>
              </div>

              {/* Current weather at the selected zone */}
              <div className="bg-[#F0FAFF] border border-[#E0F2FE]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Cloud size={12} className="text-[#0EA5E9]" /> Avg Air Temp
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#0EA5E9] mb-0.5 leading-none">
                  {backendData 
                    ? `${backendData.weather.AirTemp.toFixed(1)}°C` 
                    : data.insights.avgAirTemp.value}
                </div>
                <div className="text-[9px] text-[#71717A] font-medium">
                  {backendData 
                    ? "Current weather estimate"
                    : data.insights.avgAirTemp.subtext}
                </div>
              </div>

              {/* Classified vegetation share within the zone */}
              <div className="bg-[#F3FBF6] border border-[#D8F3E1]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Leaf size={12} className="text-[#1CC664]" /> Vegetation Cover
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#1CC664] mb-0.5 leading-none">
                  {backendData 
                    ? `${Math.round(backendData.static_features.Vegetation_Cover * 100)}%`
                    : data.insights.greenCover.value}
                </div>
                <div className="text-[9px] text-[#71717A] font-medium">
                  {backendData 
                    ? `NDVI: ${backendData.static_features.NDVI.toFixed(2)}` 
                    : data.insights.greenCover.subtext}
                </div>
              </div>

              {/* Classified built-up share within the zone */}
              <div className="bg-[#F8F5FF] border border-[#EAE0FE]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Building size={12} className="text-[#A36AF5]" /> Built-up Cover
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#A36AF5] mb-0.5 leading-none">
                  {backendData 
                    ? `${Math.round(backendData.static_features.BuiltUp_Cover * 100)}%`
                    : data.insights.builtUpArea.value}
                </div>
                <div className="text-[9px] text-[#71717A] font-medium">
                  {backendData 
                    ? "Dynamic World confident built-up share" 
                    : data.insights.builtUpArea.subtext}
                </div>
              </div>

              {/* Classified water share within the zone */}
              <div className="bg-[#F0F7FF] border border-[#DDECFF]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Droplets size={12} className="text-[#3B82F6]" /> Water Coverage
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#3B82F6] mb-0.5 leading-none">
                  {backendData 
                    ? `${Math.round(backendData.static_features.Water_Cover * 100)}%`
                    : data.insights.waterCoverage.value}
                </div>
                <div className="text-[9px] text-[#71717A] font-medium">
                  {backendData 
                    ? `NDWI: ${backendData.static_features.NDWI.toFixed(2)}` 
                    : data.insights.waterCoverage.subtext}
                </div>
              </div>

              {/* Most common Dynamic World class in the zone */}
              <div className="bg-[#FFFBF0] border border-[#FEF0C7]/60 rounded-[10px] p-2.5 flex flex-col justify-center shadow-none">
                <div className="text-[10px] text-[#71717A] flex items-center gap-1.5 mb-1.5 font-medium">
                  <Map size={12} className="text-[#F59E0B]" /> Dominant Zone Land
                </div>
                <div className="text-[14px] font-semibold font-mono text-[#F59E0B] mb-0.5 leading-none">
                  {backendData 
                    ? (LULC_CLASSES[backendData.static_features.LULC_Map] || "Unknown") 
                    : data.insights.dominantLandType.value}
                </div>
                <div className="text-[9px] text-[#71717A] font-medium">
                  {backendData 
                    ? "Most common class in 1 km zone"
                    : data.insights.dominantLandType.subtext}
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="px-4 pb-4 flex flex-col gap-3.5">
  <h3 className="text-[12px] font-bold text-slate-800 mt-2">
    Recommendations for this area
  </h3>

  {isLoadingBackend ? (
    <p className="text-[10px] text-slate-500">
      Analysing local heat drivers…
    </p>
  ) : backendData?.recommendations?.length ? (
    backendData.recommendations.map(
      (recommendation: {
        priority: "critical" | "high" | "medium" | "low";
        title: string;
        message: string;
      }, index: number) => {
        const styles = {
          critical: "bg-[#FFF6F6] border-[#FCE4E4] text-[#ED4E4E]",
          high: "bg-[#FFF7F4] border-[#FCE8E1] text-[#F05A28]",
          medium: "bg-[#F4F8FE] border-[#E1EEFD] text-[#5898F6]",
          low: "bg-[#F3FBF6] border-[#D8F3E1] text-[#1CC664]",
        };

        return (
          <div
            key={index}
            className={`border rounded-xl p-4 flex flex-col gap-2 ${styles[recommendation.priority]}`}
          >
            <div className="text-[11px] font-semibold">
              {recommendation.title}
            </div>

            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
              {recommendation.message}
            </p>
          </div>
        );
      }
    )
  ) : (
    <p className="text-[10px] text-slate-500">
      Select a location to view its heat analysis.
    </p>
  )}
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
                  { id: 'reflectiveSurfaces', label: 'Built-up Density', icon: Building, color: 'text-purple-500', max: 100 },
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
                    locationToQuery.lat,
                    locationToQuery.lon,
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
                  <span className="text-[9px] text-slate-500 font-medium mb-1 line-clamp-1">
                    Current
                  </span>
                  <span className="text-[13px] font-bold text-slate-700 font-mono">
                    {simulation ? `${simulation.current_temperature.toFixed(2)}°C` : "--"}
                  </span>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] text-orange-600/80 font-medium mb-1 line-clamp-1">
                    Simulated
                  </span>
                  <span className="text-[13px] font-bold text-orange-600 font-mono">
                    {simulation ? `${simulation.predicted_temperature.toFixed(2)}°C` : "--"}
                  </span>
                </div>

                <div className="bg-[#F3FBF6] border border-[#1CC664]/30 rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-[9px] text-green-700/80 font-medium mb-1 line-clamp-1">
                    Reduction
                  </span>
                  <span className="text-[15px] font-bold text-[#1CC664] font-mono">
                    {simulation
                      ? `${Math.abs(simulation.temperature_change).toFixed(2)}°C`
                      : "--"}
                  </span>
                </div>
              </div>

              {/* Intervention Impact */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <h3 className="text-[12px] font-bold text-slate-800">
                  Applied Interventions
                </h3>

                <div className="space-y-3">

                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>Tree Cover</span>
                      <span>{interventions.treeCover}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${interventions.treeCover}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>Cool Roofs</span>
                      <span>{interventions.coolRoofs}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${interventions.coolRoofs}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>Built-up Density</span>
                      <span>{interventions.reflectiveSurfaces}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${interventions.reflectiveSurfaces}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-[10px] text-slate-800 font-bold flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11.5 2 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z" /></svg>
                  AI Summary
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                  {simulation
                    ? simulation.drivers.join(". ") + "."
                    : "Run a simulation to receive AI insights."}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </aside>
  );
}
