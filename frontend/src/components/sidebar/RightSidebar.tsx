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
    urbanGreening: 0,
    developmentIntensity: 0,
    waterFeatures: 0,
    coolRoofs: 0
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [hasEverSimulated, setHasEverSimulated] = useState(false);
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
              <div className="bg-[#FFF6F6] border border-[#FCE4E4]/60 rounded-[10px] p-2.5 flex flex-col justify-between h-full shadow-none">
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
              <div className="bg-[#F0FAFF] border border-[#E0F2FE]/60 rounded-[10px] p-2.5 flex flex-col justify-between h-full shadow-none">
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
              <div className="bg-[#F3FBF6] border border-[#D8F3E1]/60 rounded-[10px] p-2.5 flex flex-col justify-between h-full shadow-none">
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
              <div className="bg-[#F8F5FF] border border-[#EAE0FE]/60 rounded-[10px] p-2.5 flex flex-col justify-between h-full shadow-none">
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
              <div className="bg-[#F0F7FF] border border-[#DDECFF]/60 rounded-[10px] p-2.5 flex flex-col justify-between h-full shadow-none">
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
              <div className="bg-[#FFFBF0] border border-[#FEF0C7]/60 rounded-[10px] p-2.5 flex flex-col justify-between h-full shadow-none">
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
              <h3 className="text-[12px] font-bold text-slate-800 mt-2 dark:text-slate-100">
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
                      critical:
                        "bg-[#FFF6F6] border-[#FCE4E4] text-[#ED4E4E] dark:bg-red-950/45 dark:border-red-800 dark:text-red-300",
                      high:
                        "bg-[#FFF7F4] border-[#FCE8E1] text-[#F05A28] dark:bg-orange-950/45 dark:border-orange-800 dark:text-orange-300",
                      medium:
                        "bg-[#F4F8FE] border-[#E1EEFD] text-[#5898F6] dark:bg-blue-950/45 dark:border-blue-800 dark:text-blue-300",
                      low:
                        "bg-[#F3FBF6] border-[#D8F3E1] text-[#1CC664] dark:bg-emerald-950/45 dark:border-emerald-800 dark:text-emerald-300",
                    };

                    return (
                      <div
                        key={index}
                        className={`border rounded-xl p-4 flex flex-col gap-2 ${styles[recommendation.priority]}`}
                      >
                        <div className="text-[11px] font-semibold">
                          {recommendation.title}
                        </div>

                        <p className="text-[10px] text-slate-600 leading-relaxed font-medium dark:text-slate-200">
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
            {/* Section 0: Current Site Analysis */}
            {backendData && !hasSimulated && (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 relative">
                <h3 className="text-[12px] font-bold text-slate-800">Current Site Analysis</h3>
                
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Baseline Predicted LST</span>
                    <span className="text-slate-800 font-bold font-mono">{backendData.current_temperature.toFixed(2)}°C</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Vegetation Cover</span>
                    <span className="text-green-600 font-bold font-mono">{Math.round(backendData.static_features.Vegetation_Cover * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Built-up Cover</span>
                    <span className="text-purple-600 font-bold font-mono">{Math.round(backendData.static_features.BuiltUp_Cover * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">Water Cover</span>
                    <span className="text-blue-600 font-bold font-mono">{Math.round(backendData.static_features.Water_Cover * 100)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Section 1: Design Interventions */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-4 relative">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[12px] font-bold text-slate-800">Design Interventions</h3>
                <button
                  onClick={() => {
                    setInterventions({ urbanGreening: 0, developmentIntensity: 0, waterFeatures: 0, coolRoofs: 0 });
                    setHasSimulated(false);
                    setSimulation(null);
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-md"
                >
                  <RotateCcw size={10} /> Reset
                </button>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-4">
                {[
                  { id: 'urbanGreening', label: 'Urban Greening', icon: Leaf, color: 'text-green-500', min: -30, max: 30, unit: '%', tooltip: 'Adjusts vegetation (NDVI) within the simulated neighbourhood.' },
                  { id: 'developmentIntensity', label: 'Development Intensity', icon: Building, color: 'text-purple-500', min: -20, max: 20, unit: '%', tooltip: 'Changes built-up density (NDBI).' },
                  { id: 'waterFeatures', label: 'Water Features', icon: Droplets, color: 'text-blue-500', min: -15, max: 15, unit: '%', tooltip: 'Changes water presence (NDWI).' },
                  { id: 'coolRoofs', label: 'Cool Roof Adoption', icon: Home, color: 'text-sky-500', min: 0, max: 100, unit: '%', tooltip: 'Reduces absorbed solar radiation.' },
                ].map((item) => {
                  const val = interventions[item.id as keyof typeof interventions];
                  const percentage = ((val - item.min) / (item.max - item.min)) * 100;
                  
                  let bgStyle = '';
                  if (item.min >= 0) {
                    bgStyle = `linear-gradient(to right, #f97316 ${percentage}%, #e2e8f0 ${percentage}%)`;
                  } else {
                    const zeroPercentage = ((0 - item.min) / (item.max - item.min)) * 100;
                    if (val > 0) {
                      bgStyle = `linear-gradient(to right, #e2e8f0 ${zeroPercentage}%, #f97316 ${zeroPercentage}%, #f97316 ${percentage}%, #e2e8f0 ${percentage}%)`;
                    } else if (val < 0) {
                      bgStyle = `linear-gradient(to right, #e2e8f0 ${percentage}%, #f97316 ${percentage}%, #f97316 ${zeroPercentage}%, #e2e8f0 ${zeroPercentage}%)`;
                    } else {
                      bgStyle = `#e2e8f0`;
                    }
                  }

                  return (
                    <div key={item.id} className="flex flex-col gap-1.5" title={item.tooltip}>
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <item.icon size={12} className={item.color} /> 
                          <span className="border-b border-dashed border-slate-300 cursor-help">{item.label}</span>
                        </div>
                        <span className="text-slate-500 font-mono text-[10px]">
                          {val > 0 && item.min < 0 ? '+' : ''}{val}{item.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={item.min} max={item.max}
                        value={val}
                        onChange={(e) => {
                          setInterventions({ ...interventions, [item.id]: parseInt(e.target.value) });
                          setHasSimulated(false);
                        }}
                        style={{ background: bgStyle }}
                        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-sm [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-1.5 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:rounded-sm [&::-moz-range-thumb]:border-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Run Simulation */}
            <button
              onClick={async () => {
                setIsSimulating(true);

                try {
                  const ndviChange = (interventions.urbanGreening / 100) * 0.30;
                  const ndbiChange = (interventions.developmentIntensity / 100) * 0.20;
                  const ndwiChange = (interventions.waterFeatures / 100) * 0.15;
                  const radiationFactor = 1.0 - (interventions.coolRoofs / 100) * 0.20;

                  const result = await getPrediction(
                    locationToQuery.lat,
                    locationToQuery.lon,
                    ndviChange,
                    ndbiChange,
                    ndwiChange,
                    radiationFactor
                  );

                  console.log(result);

                  setSimulation(result);
                  setHasSimulated(true);
                  setHasEverSimulated(true);
                } catch (err) {
                  console.error(err);
                }

                setIsSimulating(false);
              }}
              disabled={isSimulating}
              className="w-full bg-[#F05A28] hover:bg-[#E04D1E] text-white font-bold text-[12px] py-3 rounded-xl shadow-[0_2px_10px_rgba(240,90,40,0.2)] transition-all flex items-center justify-center disabled:opacity-70 relative overflow-hidden"
            >
              <div className="relative w-full h-4 flex items-center justify-center">
                <span className={`absolute flex items-center gap-2 transition-all duration-300 ${isSimulating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Running Simulation...
                </span>
                <span className={`absolute flex items-center gap-1.5 transition-all duration-300 ${!isSimulating && hasEverSimulated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  Update Simulation
                </span>
                <span className={`absolute flex items-center gap-1.5 transition-all duration-300 ${!isSimulating && !hasEverSimulated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  Run Simulation
                </span>
              </div>
            </button>

            {/* Empty State */}
            {!hasSimulated && backendData && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center mt-2">
                <p className="text-[11px] text-slate-500 font-medium">
                  No intervention has been simulated yet.<br/>
                  Adjust one or more interventions and click Update Simulation.
                </p>
              </div>
            )}

            {/* Success Message */}
            <div className={`flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#1CC664] transition-all duration-500 overflow-hidden ${hasSimulated && !isSimulating ? 'opacity-100 max-h-10 mt-1 mb-1' : 'opacity-0 max-h-0 m-0'}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Simulation Complete
            </div>

            {/* Sections 3, 4, 5: Results */}
            <div className={`flex flex-col gap-4 transition-all duration-500 overflow-hidden ${hasSimulated ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
              {/* Simulation Results */}
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center relative overflow-hidden">
                <h3 className="text-[12px] font-bold text-slate-800 self-start mb-3 z-10">Simulation Results</h3>

                <div className="flex flex-col items-center justify-center text-center z-10 w-full mb-3 mt-1">
                  <span className="text-[26px] font-black text-[#1CC664] font-mono tracking-tighter leading-none mb-1.5">
                    {simulation ? `${simulation.temperature_change > 0 ? '+' : ''}${simulation.temperature_change.toFixed(2)}°C` : "--"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-0.5 mb-0.5">
                    Net Temperature Change
                  </span>
                  <span className="text-[8px] text-slate-500 font-medium max-w-[80%]">
                    Estimated shift in average surface temp
                  </span>
                </div>

                <div className="w-full h-[1px] bg-slate-100 mb-4 z-10"></div>

                <div className="w-full flex items-center justify-between z-10 px-1 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-slate-400 font-semibold mb-1 flex items-center gap-1 uppercase tracking-wider text-center leading-tight max-w-[60px]">
                      Baseline Predicted LST
                    </span>
                    <span className="text-[13px] font-bold text-slate-700 font-mono">
                      {simulation ? `${simulation.current_temperature.toFixed(2)}°C` : "--"}
                    </span>
                  </div>

                  <div className="text-slate-300 px-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-orange-500/80 font-semibold mb-1 flex items-center gap-1 uppercase tracking-wider text-center leading-tight max-w-[60px]">
                      Projected LST After
                    </span>
                    <span className="text-[13px] font-bold text-orange-600 font-mono">
                      {simulation ? `${simulation.predicted_temperature.toFixed(2)}°C` : "--"}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-slate-100 mb-3 z-10"></div>
                
                <div className="flex flex-col gap-1.5 w-full text-left">
                  <div className="text-[9px] text-slate-500 flex justify-between">
                    <span className="font-semibold text-slate-600">Simulation Area</span>
                    <span>1 km radius neighbourhood</span>
                  </div>
                  <div className="text-[9px] text-slate-500 flex justify-between">
                    <span className="font-semibold text-slate-600">Prediction Method</span>
                    <span>Random Forest Regression</span>
                  </div>
                  <div className="text-[8px] text-slate-400 italic text-center w-full mt-1">
                    This prediction represents average land surface temperature for the selected neighbourhood.
                  </div>
                </div>
              </div>

              {/* Before / After Feature Comparison */}
              {simulation && simulation.original_features && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                  <h3 className="text-[12px] font-bold text-slate-800">Feature Comparison</h3>
                  <div className="w-full">
                    <table className="w-full text-[10px] text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400">
                          <th className="font-semibold py-1">Feature</th>
                          <th className="font-semibold py-1 text-right pr-4">Current</th>
                          <th className="font-semibold py-1 text-right">After Simulation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-50">
                          <td className="py-1.5 text-slate-600 font-medium">NDVI</td>
                          <td className="py-1.5 font-mono text-slate-500 text-right pr-4">{simulation.original_features.NDVI.toFixed(3)}</td>
                          <td className="py-1.5 font-mono text-slate-800 font-bold text-right">{simulation.static_features.NDVI.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-slate-50">
                          <td className="py-1.5 text-slate-600 font-medium">NDBI</td>
                          <td className="py-1.5 font-mono text-slate-500 text-right pr-4">{simulation.original_features.NDBI.toFixed(3)}</td>
                          <td className="py-1.5 font-mono text-slate-800 font-bold text-right">{simulation.static_features.NDBI.toFixed(3)}</td>
                        </tr>
                        <tr className="border-b border-slate-50">
                          <td className="py-1.5 text-slate-600 font-medium">NDWI</td>
                          <td className="py-1.5 font-mono text-slate-500 text-right pr-4">{simulation.original_features.NDWI.toFixed(3)}</td>
                          <td className="py-1.5 font-mono text-slate-800 font-bold text-right">{simulation.static_features.NDWI.toFixed(3)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Simulation Summary */}
              {simulation && (
                <div className={`bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5 shadow-sm`}>
                  <div className="text-[11px] text-slate-800 font-bold flex items-center gap-1.5 uppercase tracking-wider mb-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F05A28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11.5 2 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z" /></svg>
                    Simulation Summary
                  </div>
                  <div className="text-[10.5px] text-slate-600 leading-relaxed font-medium">
                    <ul className="list-disc pl-4 mb-3 space-y-1">
                      {interventions.urbanGreening !== 0 ? (
                        <li>Urban greening was {interventions.urbanGreening > 0 ? 'increased' : 'reduced'}.</li>
                      ) : null}
                      {interventions.developmentIntensity !== 0 ? (
                        <li>Development intensity was {interventions.developmentIntensity > 0 ? 'increased' : 'reduced'}.</li>
                      ) : null}
                      {interventions.waterFeatures !== 0 ? (
                        <li>Water features were {interventions.waterFeatures > 0 ? 'expanded' : 'reduced'}.</li>
                      ) : null}
                      {interventions.coolRoofs !== 0 ? (
                        <li>Cool roof adoption was increased.</li>
                      ) : null}
                      {Object.values(interventions).every(v => v === 0) && <li>No interventions applied.</li>}
                    </ul>
                    <p>
                      Combined interventions resulted in an estimated <span className="font-bold text-[#F05A28]">{Math.abs(simulation.temperature_change).toFixed(2)}°C {simulation.temperature_change > 0 ? 'increase' : 'reduction'}</span> in neighbourhood average land surface temperature.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </aside>
  );
}
