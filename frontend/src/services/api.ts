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
  ndvi_change = 0,
  ndbi_change = 0,
  radiation_factor = 1
) => {
  const response = await fetch(
    `${BASE_URL}/predict?latitude=${latitude}&longitude=${longitude}&ndvi_change=${ndvi_change}&ndbi_change=${ndbi_change}&radiation_factor=${radiation_factor}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return response.json();
};
