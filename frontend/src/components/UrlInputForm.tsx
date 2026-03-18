import React, { useState } from 'react';

interface UrlInputFormProps {
  onShorten: (url: string) => void;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onShorten }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onShorten(url);
      setUrl('');
    }
  };

  return (
    <div className="hero-section">
      <h2>Simplify your URL</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="url"
          placeholder="Enter long link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">
          Shorten URL
        </button>
      </form>
      <p className="helper-text">Shorten, share and track your shortened URLs</p>
    </div>
  );
};

export default UrlInputForm;
