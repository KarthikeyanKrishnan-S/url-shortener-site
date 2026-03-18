import React, { useEffect, useState } from 'react';
import { Url } from './types';
import { getRecentUrls, shortenUrl } from './services/api';
import Header from './components/Header';
import UrlInputForm from './components/UrlInputForm';
import RecentUrlsTable from './components/RecentUrlsTable';
import AnalyticsModal from './components/AnalyticsModal';
import StatisticsChart from './components/StatisticsChart';

const App: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [selectedAnalyticsUrl, setSelectedAnalyticsUrl] = useState<Url | null>(null);

  const fetchUrls = async () => {
    try {
      const data = await getRecentUrls();
      setUrls(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Failed to fetch URLs:', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShorten = async (originalUrl: string) => {
    try {
      await shortenUrl(originalUrl);
      fetchUrls(); // Refresh to show newly generated URL
    } catch (error) {
      console.error('Failed to shorten URL:', error);
      alert('Error creating short URL. It might already exist!');
    }
  };

  return (
    <div>
      <Header />
      <UrlInputForm onShorten={handleShorten} />
      
      {/* Container for main content */}
      <div className="main-content">
        <RecentUrlsTable urls={urls} onOpenAnalytics={(url) => setSelectedAnalyticsUrl(url)} />
        
        {urls.length > 0 && <StatisticsChart urls={urls} />}
      </div>

      {selectedAnalyticsUrl && (
        <AnalyticsModal url={selectedAnalyticsUrl} onClose={() => setSelectedAnalyticsUrl(null)} />
      )}
    </div>
  );
};

export default App;
