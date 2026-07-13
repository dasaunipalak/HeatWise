import dashboardData from '../mock/dashboard.json';
import weatherData from '../mock/weather.json';
import chartData from '../mock/chartData.json';

export const getDashboard = async () => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardData);
    }, 300);
  });
};

export const getWeather = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(weatherData);
    }, 300);
  });
};

export const getChartData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(chartData);
    }, 300);
  });
};

const BASE_URL = "http://127.0.0.1:8000";

export const getPrediction = async (
  latitude: number,
  longitude: number,
  ndviChange = 0,
  ndbiChange = 0,
  ndwiChange = 0,
  radiationFactor = 1,
  signal?: AbortSignal
) => {
  const response = await fetch(
    `${BASE_URL}/predict?latitude=${latitude}&longitude=${longitude}&ndvi_change=${ndviChange}&ndbi_change=${ndbiChange}&ndwi_change=${ndwiChange}&radiation_factor=${radiationFactor}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return response.json();
};

export interface LocationConditions {
  AirTemp: number;
  Humidity: number;
  Wind: number;
  WindDirection: number;
  AQI: number | null;
  AQIStatus: string;
}

export const getLocationConditions = async (
  latitude: number,
  longitude: number
): Promise<LocationConditions> => {
  const response = await fetch(
    `${BASE_URL}/weather?latitude=${latitude}&longitude=${longitude}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch location conditions");
  }

  return response.json();
};
