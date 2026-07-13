'use client';

import { useEffect, useRef, useState } from 'react';
import { searchLocation, SearchResult } from '@/services/geocode';
import {
  Search,
  Calendar,
  Wind,
  Droplets,
  Activity,
  ChevronDown,
  Building2,
  Droplet,
  Layers,
  X,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  getDashboard,
  getLocationConditions,
  LocationConditions,
} from '@/services/api';
import { DashboardData } from '@/types';

interface LeftSidebarProps {
  isOpen?: boolean;
  activeLayer: string | null;
  setActiveLayer: React.Dispatch<React.SetStateAction<string | null>>;
  selectedLocation: { lat: number; lon: number } | null;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lon: number;
    } | null>
  >;
  isLoadingTile?: boolean;
  onClose?: () => void;
}

const DEFAULT_LOCATION = {
  lat: 26.8467,
  lon: 80.9462,
};

const windDirectionLabel = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % directions.length];
};

const getAQIColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('good')) return { bg: '#F0FDF4', border: '#DCFCE7', text: '#166534' }; // green
  if (s.includes('moderate')) return { bg: '#FEFCE8', border: '#FEF08A', text: '#854D0E' }; // yellow
  if (s.includes('sensitive')) return { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C' }; // orange
  if (s.includes('very unhealthy')) return { bg: '#FAF5FF', border: '#E9D5FF', text: '#6B21A8' }; // purple
  if (s.includes('unhealthy')) return { bg: '#FEF2F2', border: '#FECACA', text: '#991B1B' }; // red
  if (s.includes('hazardous')) return { bg: '#FFF1F2', border: '#FECDD3', text: '#9F1239' }; // rose
  return { bg: '#F8F9FB', border: '#E5E7EB', text: '#6B7280' }; // gray
};

export default function LeftSidebar({
  isOpen = true,
  activeLayer,
  setActiveLayer,
  selectedLocation,
  setSelectedLocation,
  isLoadingTile = false,
  onClose,
}: LeftSidebarProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [weather, setWeather] = useState<LocationConditions | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const locationToQuery = selectedLocation ?? DEFAULT_LOCATION;

  useEffect(() => {
    const loadDashboard = async () => {
      const dashboard = (await getDashboard()) as DashboardData;

      setData({
        ...dashboard,
        layers: [
          {
            ...dashboard.layers[0],
            active: false,
          },
          {
            ...dashboard.layers[1],
            active: false,
          },
          {
            id: 'ndbi_builtup',
            name: 'Built-up Density (NDBI)',
            color: '#A36AF5',
            active: false,
          },
          {
            id: 'ndwi_water',
            name: 'Water Presence (NDWI)',
            color: '#0ea5e9',
            active: false,
          },
          {
            id: 'lulc_classification',
            name: 'Land Use Classification (LULC)',
            color: '#F59E0B',
            active: false,
          },
        ],
      });
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    let cancelled = false;

    getLocationConditions(locationToQuery.lat, locationToQuery.lon)
      .then((conditions) => {
        if (!cancelled) {
          setWeather(conditions);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch location conditions:', error);

        if (!cancelled) {
          setWeather(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locationToQuery.lat, locationToQuery.lon]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      setSuggestions([]);
      setSelectedIndex(-1);
      setIsSearching(false);
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      setIsSearching(true);

      try {
        const results = await searchLocation(query);

        if (!cancelled) {
          setSuggestions(results);
          setSelectedIndex(results.length > 0 ? 0 : -1);
        }
      } catch (error) {
        console.error('Location search failed:', error);

        if (!cancelled) {
          setSuggestions([]);
          setSelectedIndex(-1);
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [searchQuery]);

  const selectPlace = (place: SearchResult) => {
    setSearchQuery(place.displayName);

    setSelectedLocation({
      lat: place.lat,
      lon: place.lon,
    });

    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  if (!data) {
    return (
      <aside
        className={`fixed inset-y-0 left-0 md:static bg-white border-r border-slate-200/80 h-full flex items-center justify-center text-sm text-slate-500 pt-14 transition-all duration-300 z-40 ${
          isOpen ? 'w-[250px]' : 'w-0 border-r-0'
        }`}
      >
        Loading...
      </aside>
    );
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 md:static bg-white border-slate-200/80 h-full overflow-hidden flex flex-col pt-14 flex-shrink-0 z-40 shadow-sm select-none transition-all duration-300 ${
        isOpen ? 'w-[280px] border-r' : 'w-0 border-r-0'
      }`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close left sidebar"
          className="md:hidden absolute right-2 top-16 z-50 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <X size={16} />
        </button>
      )}

      <div className="p-5 flex flex-col gap-6 w-[280px] h-full overflow-y-auto">
        <div className="space-y-2">
          <h3 className="text-[11px] font-semibold text-slate-500 tracking-[0.1em] uppercase">
            Search Location
          </h3>

          <div className="relative" ref={searchRef}>
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F05A28]"
            />

            <input
              ref={inputRef}
              type="text"
              placeholder="Search city, area, or landmark..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-[13px] font-medium text-slate-800 shadow-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setSuggestions([]);
                  setSelectedIndex(-1);
                  return;
                }

                if (!suggestions.length) return;

                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setSelectedIndex((previous) =>
                    previous < suggestions.length - 1
                      ? previous + 1
                      : previous
                  );
                }

                if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  setSelectedIndex((previous) =>
                    previous > 0 ? previous - 1 : previous
                  );
                }

                if (event.key === 'Enter') {
                  event.preventDefault();

                  const place = suggestions[selectedIndex];

                  if (place) {
                    selectPlace(place);
                  }
                }
              }}
            />

            {isSearching && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                …
              </span>
            )}

            {searchQuery && (
              <button
                type="button"
                aria-label="Clear location search"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={13} />
              </button>
            )}

            {suggestions.length > 0 && (
              <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((place, index) => (
                  <button
                    key={`${place.lat}-${place.lon}-${index}`}
                    type="button"
                    className={`w-full px-3 py-2 text-left text-[11px] transition-colors truncate ${
                      index === selectedIndex
                        ? 'bg-slate-100'
                        : 'hover:bg-slate-100'
                    }`}
                    title={place.displayName}
                    onClick={() => selectPlace(place)}
                  >
                    📍 {place.displayName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>



        <div className="space-y-3.5">
          <h3 className="text-[11px] font-semibold text-slate-500 tracking-[0.1em] uppercase">
            Data Layers
          </h3>

          <div className="flex flex-col gap-2">
            {data.layers.map((layer) => {
              const isLayerActive = layer.id === activeLayer;

              let iconComponent = null;

              return (
                <div
                    key={layer.id}
                    className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-slate-50"
                  >
                  <div className="flex items-center gap-2.5">
                    {iconComponent ? (
                      <div className="w-4 h-4 flex items-center justify-center">
                        {iconComponent}
                      </div>
                    ) : (
                      <div
                        className={`w-2.5 h-2.5 rounded-full shadow-sm transition-opacity duration-200 ${
                          isLayerActive ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{ backgroundColor: layer.color }}
                      />
                    )}

                    <span
                      className={`text-[13px] font-medium transition-colors ${
  isLayerActive
    ? 'text-slate-800 dark:text-slate-100'
    : 'text-slate-400 dark:text-slate-500'
}`}
                    >
                      {layer.name}
                    </span>
                  </div>

                  <Switch
                    checked={isLayerActive}
                    disabled={isLoadingTile}
                    onCheckedChange={(checked) => {
                      setActiveLayer(checked ? layer.id : null);
                    }}
                    style={{
                      backgroundColor: isLayerActive
                        ? layer.color
                        : '#e2e8f0',
                      borderColor: isLayerActive ? layer.color : '#e2e8f0',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-[11px] font-semibold text-slate-500 tracking-[0.1em] uppercase">
            Conditions
          </h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between bg-[#F8F9FB] hover:bg-slate-50 rounded-xl px-3 py-2.5 transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="text-[#5898F6]">
                  <Wind size={15} />
                </div>
                <span className="text-[13px] font-medium text-slate-600">
                  Wind Speed
                </span>
              </div>

              <div className="text-right font-mono text-[11px] font-bold text-slate-800 dark:text-slate-100">
                {weather ? `${weather.Wind.toFixed(0)} km/h` : '—'}{' '}
                <span className="text-[10px]">
                  {weather ? windDirectionLabel(weather.WindDirection) : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#F8F9FB] hover:bg-slate-50 rounded-xl px-3 py-2.5 transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="text-[#0EA5E9]">
                  <Droplets size={15} />
                </div>
                <span className="text-[13px] font-medium text-slate-600">
                  Humidity
                </span>
              </div>

              <div className="text-right font-mono text-[11px] font-bold text-slate-800 dark:text-slate-100">
                {weather ? `${weather.Humidity.toFixed(0)}%` : '—'}
              </div>
            </div>

            <div className="flex flex-col bg-[#F8F9FB] hover:bg-slate-50 rounded-xl transition-all duration-200 overflow-hidden border border-transparent hover:border-slate-200">
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="text-[#F59E0B]">
                    <Activity size={15} />
                  </div>
                  <span className="text-[13px] font-medium text-slate-600">
                    AQI Index
                  </span>
                </div>

                <div className="font-mono text-[12px] font-bold text-slate-800 dark:text-slate-100">
                  {weather?.AQI ?? '—'}
                </div>
              </div>

              {weather?.AQIStatus && (
                <div 
                  className="px-3 py-1.5 border-t text-[10px] font-semibold text-center tracking-wide" 
                  style={{ 
                    backgroundColor: getAQIColor(weather.AQIStatus).bg, 
                    borderColor: getAQIColor(weather.AQIStatus).border, 
                    color: getAQIColor(weather.AQIStatus).text 
                  }}
                >
                  {weather.AQIStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}