'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Wind, Droplets, Activity, ChevronDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { getDashboard, getWeather } from '@/services/api';
import { DashboardData, WeatherData } from '@/types';

export default function LeftSidebar() {
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
      <aside className="w-[280px] bg-white border-r border-slate-200/80 h-full flex items-center justify-center text-sm text-slate-500 pt-14">
        Loading...
      </aside>
    );
  }

  return (
    <aside className="w-[280px] bg-white border-r border-slate-200/80 h-full overflow-y-auto flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm select-none">
      <div className="p-5 flex flex-col gap-6">
        
        {/* City Selector */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">CITY</h3>
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] duration-200">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-[#ea580c]" />
              <span className="text-[13px] font-semibold text-slate-700">{data.city}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">TIME RANGE</h3>
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] duration-200">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#ea580c]" />
              <span className="text-[13px] font-semibold text-slate-700">{data.timeRange}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Data Layers */}
        <div className="space-y-3.5">
          <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">DATA LAYERS</h3>
          <div className="flex flex-col gap-3.5">
            {data.layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: layer.color }}></div>
                  <span className={`text-[13px] font-semibold transition-colors ${layer.active ? 'text-slate-800' : 'text-slate-400'}`}>
                    {layer.name}
                  </span>
                </div>
                <Switch 
                  checked={layer.active} 
                  className={
                    layer.id === 'surface_temp' ? 'data-checked:bg-[#ea580c]' : 
                    layer.id === 'ndvi_veg' ? 'data-checked:bg-[#22c55e]' : ''
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">CONDITIONS</h3>
          <div className="flex flex-col gap-2.5">
            
            {/* Wind Speed */}
            <div className="flex items-center justify-between border border-slate-100 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                  <Wind size={15} />
                </div>
                <span className="text-[12.5px] font-semibold text-slate-500">Wind Speed</span>
              </div>
              <div className="text-[12.5px] text-right font-medium">
                <strong className="text-slate-800 font-bold">{weather.windSpeed}</strong>{' '}
                <span className="text-slate-500 font-semibold">{weather.windDirection}</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between border border-slate-100 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                  <Droplets size={15} />
                </div>
                <span className="text-[12.5px] font-semibold text-slate-500">Humidity</span>
              </div>
              <div className="text-[12.5px] text-right font-medium">
                <strong className="text-slate-800 font-bold">{weather.humidity}</strong>
              </div>
            </div>

            {/* AQI Index */}
            <div className="flex items-center justify-between border border-slate-100 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                  <Activity size={15} />
                </div>
                <span className="text-[12.5px] font-semibold text-slate-500">AQI Index</span>
              </div>
              <div className="text-[12.5px] text-right font-medium">
                <strong className="text-slate-800 font-bold">{weather.aqi}</strong>{' '}
                <span className="text-slate-500 font-semibold">{weather.aqiStatus}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </aside>
  );
}
