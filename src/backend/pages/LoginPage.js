import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext"; // Import the context
import { API_BASE_URL } from "../../routes";

import { useNavigate } from "react-router-dom";
import Header from "../components/BackHeader";
import Footer from "../../components/Footer";
import logo from "../../assets/logos/logo_smart_bremen.svg";
import "./loginpage.css";
import routes from "../../routes";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { token, login, logout } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if a valid token exists
    if (token) {
      navigate(routes.dashboard);
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      login(token, user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
    navigate(routes.home);
  };

  return (
    <div className="login-page">
      <Header />
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="smart-bremen-logo" />
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
            <button type="submit" className="button">
              Login
            </button>
            <a href="/signup" className="signup-link">
              Don't have an account? Create one here
            </a>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
