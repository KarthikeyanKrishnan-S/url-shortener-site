import React, { useEffect, useState } from 'react';
import { Url, ClickEvent } from '../types';
import { getUrlAnalytics } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AnalyticsModalProps {
  url: Url | null;
  onClose: () => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ url, onClose }) => {
  const [events, setEvents] = useState<ClickEvent[]>([]);

  useEffect(() => {
    if (url) {
      getUrlAnalytics(url.id).then((data) => setEvents(data));
    }
  }, [url]);

  if (!url) return null;

  // Group events by Date
  const dateCounts: Record<string, number> = {};
  events.forEach((event) => {
    const d = new Date(event.clickedAt).toLocaleDateString();
    dateCounts[d] = (dateCounts[d] || 0) + 1;
  });

  const labels = Object.keys(dateCounts).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const dataPoints = labels.map((label) => dateCounts[label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Clicks over time',
        data: dataPoints,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.2, // smoothing
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Click Analytics' },
    },
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Analytics for {url.shortCode}</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <div>
          {events.length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <p style={{ textAlign: 'center', padding: '20px' }}>No click events recorded yet.</p>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
