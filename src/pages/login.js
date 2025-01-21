import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import the context
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/colors.css";
import "./contactus.css";

const Login = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("secret");
  const [error, setError] = useState(null);
  const { token, login, logout } = useAuth(); // Use the global auth context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8082/api/auth/login",
        { email, password }
      );
      const { token } = response.data;
      login(token); // Use the context's login function
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        await axios.post(
          "http://127.0.0.1:8082/api/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      }
      logout(); // Use the context's logout function
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="contactus-container">
      <Header />
      <div className="contactus-content">
        {token ? (
          <div className="logged-in-container">
            <p>You are logged in with token: {token}</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <form className="contactus-form" onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                minLength="5"
                maxLength="50"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="5"
                maxLength="50"
              />
            </div>
            <div className="send-message-button-container">
              <button type="submit" className="send-message-button">
                Login
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
