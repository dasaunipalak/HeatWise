'use client';
import { useState, useEffect, useRef } from 'react';
import { searchLocation, SearchResult } from "@/services/geocode";
import {
  Search,
  Calendar,
  Wind,
  Droplets,
  Activity,
  ChevronDown,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { getDashboard, getWeather } from '@/services/api';
import { DashboardData, WeatherData } from '@/types';

interface LeftSidebarProps {
  isOpen?: boolean;
  activeLayer: string | null;
  setActiveLayer: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lon: number;
    } | null>
  >;
}

export default function LeftSidebar({
  isOpen = true,
  activeLayer,
  setActiveLayer,
  setSelectedLocation,
}: LeftSidebarProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dashData = await getDashboard() as DashboardData;
      const weatherData = await getWeather() as WeatherData;
      setData(dashData);
      setWeather(weatherData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let isActive = true;

    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await searchLocation(searchQuery);
      if (isActive) {
        setSuggestions(results);
        setSelectedIndex(results.length > 0 ? 0 : -1);
      }
    }, 300);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

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

        {/* Search Location */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-semibold text-[#8F95A1] tracking-[0.12em] uppercase">
            SEARCH LOCATION
          </h3>

          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F05A28]"
            />

            <input
              type="text"
              placeholder="Search any place..."
              className="w-full pl-9 pr-3 py-2 text-[11px] font-medium text-slate-700 bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:border-slate-300 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (!suggestions.length) return;

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelectedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                  );
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : prev
                  );
                }

                if (e.key === "Enter") {
                  e.preventDefault();

                  const place = suggestions[selectedIndex];

                  if (!place) return;

                  setSearchQuery(place.displayName);

                  setSelectedLocation({
                    lat: place.lat,
                    lon: place.lon,
                  });

                  setSuggestions([]);
                  setSelectedIndex(-1);
                }

                if (e.key === "Escape") {
                  setSuggestions([]);
                  setSelectedIndex(-1);
                }
              }}
            />
            {suggestions.length > 0 && (
              <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((place, index) => (
                  <button
                    key={index}
                    className={`w-full px-3 py-2 text-left text-[11px] transition-colors ${index === selectedIndex ? "bg-slate-100" : "hover:bg-slate-100"}`}
                    onClick={() => {
                      setSearchQuery(place.displayName);

                      setSelectedLocation({
                        lat: place.lat,
                        lon: place.lon,
                      });

                      setSuggestions([]);
                    }}
                  >
                    📍 {place.displayName}
                  </button>
                ))}
              </div>
            )}
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
