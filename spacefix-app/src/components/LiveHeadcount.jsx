import { useState, useEffect } from 'react';
import './LiveHeadcount.css';

export const LiveHeadcount = () => {
  const [headcount, setHeadcount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pollHeadcount = async () => {
      try {
        const response = await fetch('http://localhost:5000/live-count');
        if (!response.ok) {
          throw new Error('Failed to fetch headcount');
        }
        const data = await response.json();
        setHeadcount(data.headcount);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    const interval = setInterval(pollHeadcount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="headcount-container">
      <h2 className="headcount-title">Live Headcount</h2>
      {error ? (
        <div className="headcount-error">Error: {error}</div>
      ) : (
        <div className="headcount-display">
          {headcount}
          <div className="headcount-label">People detected</div>
        </div>
      )}
    </div>
  );
};