import Chart from 'chart.js/auto';
import { type FC, useEffect, useRef } from 'react';
import type { WeatherPoint } from '../types/base';

interface Props {
  weatherPoints: WeatherPoint[];
}

const TempChart: FC<Props> = ({ weatherPoints }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !weatherPoints.length) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = weatherPoints.map(item => {
      const date = new Date(item.dt_txt);
      return `${date.toLocaleDateString([], { weekday: 'short' })}, ${date.toLocaleTimeString([], { hour: '2-digit' })}`;
    });

    const temps = weatherPoints.map(item => item.main.temp);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Teploty po 3 hodinách',
            data: temps,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Teploty po 3 hodinách'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Teplota (°C)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [weatherPoints]);

  return <canvas ref={chartRef} />;
};

export default TempChart;
