// import { useState } from "react";
// import api from "../api/client";
// import "./Login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const form = new URLSearchParams();
//       form.append("username", username);
//       form.append("password", password);

//       const res = await api.post("/login", form);

//       console.log("LOGIN RESPONSE:", res.data);

//       localStorage.setItem("token", res.data.access_token);
//       window.location.reload();
//     } catch (err) {
//       console.error("LOGIN ERROR:", err);
//       console.error("RESPONSE:", err.response);
//       setError("Login failed. Check console.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1>LifePulse</h1>
//         <p className="subtitle">Daily Risk Intelligence</p>

//         <input
//           placeholder="Username"
//           onChange={e => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={e => setPassword(e.target.value)}
//         />

//         <button onClick={handleLogin}>Sign In</button>

//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// }


// Login.jsx
import { useState } from "react";
import api from "../api/client";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);

      const res = await api.post("/login", form);

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.access_token);
      window.location.reload();
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      console.error("RESPONSE:", err.response);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-container">
      {/* Animated Background Elements */}
      <div className="background-overlay">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-pattern"></div>

      {/* Main Content */}
      <div className="login-content">
        <div className="login-wrapper">
          {/* Logo & Brand */}
          <div className="brand-section">
            <div className="logo-container">
              <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="brand-title">
              Life<span className="brand-highlight">Pulse</span>
            </h1>
            <p className="brand-subtitle">Daily Risk Intelligence Platform</p>
          </div>

          {/* Login Card */}
          <div className="login-card">
            <div className="form-content">
              {/* Username Input */}
              <div className="input-group">
                <label className="input-label">Username</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your username"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="error-text">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading || !username || !password}
                className="login-button"
              >
                {isLoading ? (
                  <>
                    <svg className="spinner" fill="none" viewBox="0 0 24 24">
                      <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Footer Links */}
              <div className="footer-links">
                <a href="#" className="footer-link">Forgot password?</a>
                <a href="#" className="footer-link">Create account</a>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="security-text">
            Secured with enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}