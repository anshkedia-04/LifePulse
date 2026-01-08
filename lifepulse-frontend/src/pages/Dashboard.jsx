import { useEffect, useState } from "react";
import api from "../api/client";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) return <p className="loading">Loading LifePulse…</p>;
  if (!data) return <p className="loading">Failed to load data</p>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>LifePulse Dashboard</h1>
        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </header>

      <div className="grid">
        {/* Risk Score */}
        <div className="card highlight">
          <h2>Risk Score</h2>
          <p className="score">{data.risk_score}</p>
          <span className={`priority ${data.priority.toLowerCase()}`}>
            {data.priority} PRIORITY
          </span>
        </div>

        {/* Summary */}
        <div className="card">
          <h2>Today’s Recommendation</h2>
          <ul>
            {data.summary.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Reasons */}
        <div className="card">
          <h2>Risk Factors</h2>
          <ul>
            {data.reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
