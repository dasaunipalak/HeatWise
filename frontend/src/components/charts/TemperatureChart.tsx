'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getChartData } from '@/services/api';
import { ChartData } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function TemperatureChart() {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    getChartData().then((res) => setData(res as ChartData));
  }, []);

  if (!data) return <div className="h-[120px] flex items-center justify-center text-[10px] text-slate-400">Loading...</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Today',
        data: data.today,
        borderColor: '#F05A28', // Orange
        backgroundColor: 'rgba(240, 90, 40, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: '30-day avg',
        data: data.avg30Day,
        borderColor: '#8DA2C0', // Slate-400
        borderWidth: 1.5,
        borderDash: [4, 4],
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 9,
            family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            weight: 500,
          },
          padding: 6,
        },
      },
      y: {
        grid: {
          color: '#f8fafc',
          tickLength: 0,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 9,
            family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            weight: 500,
          },
          stepSize: 15,
          max: 60,
          min: 0,
          padding: 6,
        },
        position: 'left' as const,
        border: {
          display: false,
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    layout: {
      padding: {
        left: -8,
        bottom: -5,
      }
    }
  };

  return (
    <div className="h-[120px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
