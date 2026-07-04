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
