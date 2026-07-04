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

  if (!data) return <div className="h-[140px] flex items-center justify-center text-xs text-slate-400">Loading...</div>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Today',
        data: data.today,
        borderColor: '#ea580c', // Orange
        backgroundColor: 'rgba(234, 88, 12, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: '30-day avg',
        data: data.avg30Day,
        borderColor: '#94a3b8', // Slate-400
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
            family: 'monospace',
          },
          padding: 8,
        },
      },
      y: {
        grid: {
          color: '#f1f5f9',
          drawBorder: false,
          tickLength: 0,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 9,
            family: 'monospace',
          },
          stepSize: 15,
          max: 60,
          min: 0,
          padding: 8,
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
    <div className="h-[140px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
