import React from 'react';
import { Url } from '../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatisticsChartProps {
  urls: Url[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ urls }) => {
  // Group by creation date
  const dateCounts: Record<string, number> = {};
  urls.forEach((u) => {
    const d = new Date(u.createdAt).toLocaleDateString();
    dateCounts[d] = (dateCounts[d] || 0) + 1;
  });

  const labels = Object.keys(dateCounts).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const dataPoints = labels.map((label) => dateCounts[label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'New URLs created',
        data: dataPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'URL Creations Over Time' },
    },
  };

  return (
    <div className="chart-container">
      <h3>Global Statistics</h3>
      <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
         <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StatisticsChart;
