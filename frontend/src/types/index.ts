export interface Layer {
  id: string;
  name: string;
  color: string;
  active: boolean;
}

export interface Insight {
  value: string;
  subtext: string;
}

export interface DashboardData {
  city: string;
  timeRange: string;
  layers: Layer[];
  insights: {
    surfaceTemp: Insight;
    ndviScore: Insight;
    uhiIndex: Insight;
    heatZones: Insight;
  };
  vegetation: Array<{
    area: string;
    status: string;
    score: number;
    color: string;
  }>;
}

export interface WeatherData {
  windSpeed: string;
  windDirection: string;
  humidity: string;
  aqi: number;
  aqiStatus: string;
}

export interface ChartData {
  labels: string[];
  today: number[];
  avg30Day: number[];
}
