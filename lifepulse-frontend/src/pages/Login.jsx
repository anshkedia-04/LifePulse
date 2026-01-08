import { useState } from "react";
import api from "../api/client";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
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
      setError("Login failed. Check console.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LifePulse</h1>
        <p className="subtitle">Daily Risk Intelligence</p>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Sign In</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
