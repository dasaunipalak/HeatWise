'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Wind, Droplets, Activity, ChevronDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { getDashboard, getWeather } from '@/services/api';
import { DashboardData, WeatherData } from '@/types';

interface LeftSidebarProps {
  isOpen?: boolean;
  activeLayer: string;
  setActiveLayer: React.Dispatch<React.SetStateAction<string>>;
}

export default function LeftSidebar({
  isOpen = true,
  activeLayer,
  setActiveLayer,
}: LeftSidebarProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dashData = await getDashboard() as DashboardData;
      const weatherData = await getWeather() as WeatherData;
      setData(dashData);
      setWeather(weatherData);
    };
    fetchData();
  }, []);

  if (!data || !weather) {
    return (
      <aside className={`bg-white border-r border-slate-200/80 h-full flex items-center justify-center text-sm text-slate-500 pt-14 transition-all duration-300 ${isOpen ? 'w-[250px]' : 'w-0 border-r-0'}`}>
        Loading...
      </aside>
    );
  }

  return (
    <aside className={`bg-white border-slate-200/80 h-full overflow-hidden flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm select-none transition-all duration-300 ${isOpen ? 'w-[250px] border-r' : 'w-0 border-r-0'}`}>
      <div className="p-5 flex flex-col gap-6 w-[250px] h-full overflow-y-auto">

        {/* City Selector */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-semibold text-[#8F95A1] tracking-[0.12em] uppercase">CITY</h3>
          <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all bg-[#F8F9FB] shadow-[0_1px_2px_rgba(0,0,0,0.02)] duration-200">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-[#F05A28]" />
              <span className="text-[11px] font-medium text-slate-700">{data.city}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-semibold text-[#8F95A1] tracking-[0.12em] uppercase">TIME RANGE</h3>
          <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all bg-[#F8F9FB] shadow-[0_1px_2px_rgba(0,0,0,0.02)] duration-200">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#F05A28]" />
              <span className="text-[11px] font-medium text-slate-700">{data.timeRange}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Data Layers */}
        <div className="space-y-3.5">
          <h3 className="text-[9px] font-semibold text-[#8F95A1] tracking-[0.12em] uppercase">DATA LAYERS</h3>
          <div className="flex flex-col gap-3.5">
            {data.layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shadow-sm transition-opacity duration-200 ${layer.active ? 'opacity-100' : 'opacity-30'}`}
                    style={{ backgroundColor: layer.color }}
                  ></div>
                  <span className={`text-[11px] font-medium transition-colors ${layer.active ? 'text-slate-800' : 'text-slate-400'}`}>
                    {layer.name}
                  </span>
                </div>
                <Switch
                  checked={layer.active}
                  onCheckedChange={(checked) => {
                    setData(prev =>
                      prev
                        ? {
                          ...prev,
                          layers: prev.layers.map(l =>
                            l.id === layer.id
                              ? { ...l, active: checked }
                              : { ...l, active: false }
                          ),
                        }
                        : prev
                    );

                    if (checked) {
                      setActiveLayer(layer.id);
                    } else {
                      setActiveLayer(null);
                    }
                  }}
                  style={{ backgroundColor: layer.active ? layer.color : '#e2e8f0', borderColor: layer.active ? layer.color : '#e2e8f0' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="space-y-3">
          <h3 className="text-[9px] font-semibold text-[#8F95A1] tracking-[0.12em] uppercase">CONDITIONS</h3>
          <div className="flex flex-col gap-2.5">

            {/* Wind Speed */}
            <div className="flex items-center justify-between bg-[#F8F9FB] hover:bg-slate-50 rounded-xl px-3 py-2.5 transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="text-[#5898F6]">
                  <Wind size={15} />
                </div>
                <span className="text-[10.5px] font-medium text-[#6B7280]">Wind Speed</span>
              </div>
              <div className="text-right font-mono text-[11px] font-bold text-slate-800">
                {weather.windSpeed} <span className="text-[10px]">{weather.windDirection}</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between bg-[#F8F9FB] hover:bg-slate-50 rounded-xl px-3 py-2.5 transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="text-[#0EA5E9]">
                  <Droplets size={15} />
                </div>
                <span className="text-[10.5px] font-medium text-[#6B7280]">Humidity</span>
              </div>
              <div className="text-right font-mono text-[11px] font-bold text-slate-800">
                {weather.humidity}
              </div>
            </div>

            {/* AQI Index */}
            <div className="flex items-center justify-between bg-[#F8F9FB] hover:bg-slate-50 rounded-xl px-3 py-2.5 transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Activity size={15} />
                </div>
                <span className="text-[10.5px] font-medium text-[#6B7280]">AQI Index</span>
              </div>
              <div className="text-right font-mono text-[11px] font-bold text-slate-800">
                {weather.aqi} <span className="text-[10px]">{weather.aqiStatus}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </aside>
  );
}
