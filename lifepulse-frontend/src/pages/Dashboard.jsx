import { useEffect, useState } from "react";
import api from "../api/client";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    api.get("/pulse/today")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading LifePulse Dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-container">
        <p className="error-text">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-badge">
            <svg className="logo-icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="header-title">
            <h1>Life<span className="title-highlight">Pulse</span></h1>
            <p className="header-subtitle">Daily Risk Intelligence</p>
          </div>
        </div>
        
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-text">Welcome back, <span className="username-highlight">{data.username || 'User'}</span></h2>
          <p className="welcome-subtext">Here's your daily risk analysis for {formatDate(currentTime)}</p>
        </div>
        <div className="current-time">
          <svg className="time-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="time-text">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Risk Score - Large Card */}
        <div className="card card-risk">
          <div className="card-header">
            <h3 className="card-title">Risk Score</h3>
            <div className="risk-trend">
              <svg className="trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="risk-score-display">
            <p className="risk-number">{data.risk_score}</p>
            <span className={`risk-priority priority-${data.priority.toLowerCase()}`}>
              {data.priority} PRIORITY
            </span>
          </div>
          <div className="risk-indicator">
            <div className="indicator-bar">
              <div 
                className="indicator-fill" 
                style={{ width: `${(data.risk_score / 100) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current AQI */}
        <div className="card card-aqi">
          <div className="card-icon-wrapper aqi-icon">
            <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="card-title">Current AQI</h3>
          <p className="card-value">--</p>
          <span className="card-status status-coming">Coming Soon</span>
        </div>

        {/* Current Temperature */}
        <div className="card card-temp">
          <div className="card-icon-wrapper temp-icon">
            <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="card-title">Temperature</h3>
          <p className="card-value">--°C</p>
          <span className="card-status status-coming">Coming Soon</span>
        </div>

        {/* AQI Category */}
        <div className="card card-category">
          <div className="card-icon-wrapper category-icon">
            <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="card-title">AQI Category</h3>
          <p className="card-value">--</p>
          <span className="card-status status-coming">Coming Soon</span>
        </div>

        {/* Today's Recommendation */}
        <div className="card card-recommendation">
          <div className="card-header">
            <h3 className="card-title">Today's Recommendation</h3>
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <ul className="recommendation-list">
            {data.summary.map((item, idx) => (
              <li key={idx} className="recommendation-item">
                <span className="item-bullet"></span>
                <span className="item-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Factors */}
        <div className="card card-factors">
          <div className="card-header">
            <h3 className="card-title">Risk Factors</h3>
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <ul className="factors-list">
            {data.reasons.map((reason, idx) => (
              <li key={idx} className="factor-item">
                <span className="factor-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="factor-text">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Traffic Analysis */}
        <div className="card card-traffic">
          <div className="card-icon-wrapper traffic-icon">
            <svg className="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="card-title">Traffic Analysis</h3>
          <p className="card-value">--</p>
          <span className="card-status status-coming">Coming Soon</span>
        </div>

        {/* Calendar */}
        <div className="card card-calendar">
          <div className="card-header">
            <h3 className="card-title">Calendar</h3>
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="calendar-preview">
            <p className="calendar-date">{formatDate(currentTime)}</p>
            <span className="card-status status-coming">Full Calendar Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}