'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Wind, Droplets, Activity } from 'lucide-react';
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

  if (!data || !weather) return <aside className="w-[280px] bg-white border-r h-full flex items-center justify-center text-sm text-slate-500">Loading...</aside>;

  return (
    <aside className="w-[280px] bg-white border-r h-full overflow-y-auto flex flex-col pt-14 flex-shrink-0 z-40 relative shadow-sm">
      <div className="p-5 flex flex-col gap-6">
        
        {/* City Selector */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">CITY</h3>
          <div className="flex items-center justify-between border border-slate-200 rounded-lg p-2.5 cursor-pointer hover:bg-slate-50 transition-colors bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-[#ea580c]" />
              <span className="text-[13px] font-semibold text-slate-800">{data.city}</span>
            </div>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">TIME RANGE</h3>
          <div className="flex items-center justify-between border border-slate-200 rounded-lg p-2.5 cursor-pointer hover:bg-slate-50 transition-colors bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#ea580c]" />
              <span className="text-[13px] font-semibold text-slate-800">{data.timeRange}</span>
            </div>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>

        {/* Data Layers */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">DATA LAYERS</h3>
          <div className="flex flex-col gap-3.5">
            {data.layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: layer.color }}></div>
                  <span className={`text-[13px] font-semibold ${layer.active ? 'text-slate-800' : 'text-slate-500'}`}>{layer.name}</span>
                </div>
                <Switch 
                  checked={layer.active} 
                  className={
                    layer.id === 'surface_temp' ? 'data-[state=checked]:bg-[#ea580c]' : 
                    layer.id === 'ndvi_veg' ? 'data-[state=checked]:bg-[#22c55e]' : ''
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="space-y-4 mt-2">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">CONDITIONS</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Wind size={16} className="text-blue-400/80 mr-3" />
              <span className="text-[13px] font-semibold text-slate-500 flex-1">Wind Speed</span>
              <div className="text-[13px]">
                <strong className="text-slate-800 font-bold">{weather.windSpeed}</strong> <span className="text-slate-600 font-semibold">{weather.windDirection}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Droplets size={16} className="text-blue-400/80 mr-3" />
              <span className="text-[13px] font-semibold text-slate-500 flex-1">Humidity</span>
              <div className="text-[13px]">
                <strong className="text-slate-800 font-bold">{weather.humidity}</strong>
              </div>
            </div>
            <div className="flex items-center">
              <Activity size={16} className="text-orange-400/80 mr-3" />
              <span className="text-[13px] font-semibold text-slate-500 flex-1">AQI Index</span>
              <div className="text-[13px]">
                <strong className="text-slate-800 font-bold">{weather.aqi}</strong> <span className="text-slate-600 font-semibold">{weather.aqiStatus}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
