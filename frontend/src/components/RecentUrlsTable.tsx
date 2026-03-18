import React, { useState } from 'react';
import { Url } from '../types';

interface RecentUrlsTableProps {
  urls: Url[];
  onOpenAnalytics: (url: Url) => void;
}

const RecentUrlsTable: React.FC<RecentUrlsTableProps> = ({ urls, onOpenAnalytics }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(urls.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUrls = urls.slice(indexOfFirstItem, indexOfLastItem);

  const handleCopy = (shortCode: string) => {
    navigator.clipboard.writeText(`http://localhost:8080/${shortCode}`);
    alert('Copied to clipboard!');
  };

  return (
    <div className="table-container">
      <h3>Recent URLs</h3>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Actions</th>
            <th>Created Date</th>
            <th>Clicks</th>
            <th>Analytics</th>
          </tr>
        </thead>
        <tbody>
          {currentUrls.map((url) => (
            <tr key={url.id}>
              <td>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                  {url.originalUrl.length > 50 ? `${url.originalUrl.substring(0, 50)}...` : url.originalUrl}
                </a>
              </td>
              <td>
                <a href={`http://localhost:8080/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                  {url.shortCode}
                </a>
              </td>
              <td>
                <button className="action-btn" onClick={() => handleCopy(url.shortCode)}>
                  Copy
                </button>
                <a href={`http://localhost:8080/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className="action-btn btn-open">
                  Open
                </a>
              </td>
              <td>{new Date(url.createdAt).toLocaleDateString()}</td>
              <td>{url.clickCount}</td>
              <td>
                <button className="btn-analytics" onClick={() => onOpenAnalytics(url)}>
                  View Analytics
                </button>
              </td>
            </tr>
          ))}
          {currentUrls.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No URLs found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
          <span>{currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
        </div>
      )}
    </div>
  );
};

export default RecentUrlsTable;
