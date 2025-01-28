import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext"; // Import the context

import { useNavigate } from "react-router-dom";
import Header from "../components/BackHeader";
import Footer from "../../components/Footer";
import logo from "../../assets/logos/logo_smart_bremen.svg";
import "./loginpage.css";
import routes from "../../routes";

const mockUser = {
  email: "test@aa.com",
  password: "11111111"
}

function LoginPage(/*{ onLogin }*/) { //un comment the onLogin parameter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { token, login, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //////////////mock login - remove after test/////////////////////////////
    // Mock login logic
    if (email === mockUser.email && password === mockUser.password) {
      const mockToken = "mock-auth-token";
      login(mockToken); 
      navigate(routes.dashboard); 
    } else {
      setError("Invalid email or password"); 
    }
    /////////////////////////////////////////////////////////////////////////
    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:8082/api/auth/login",
    //     { email, password }
    //   );
    //   const { token } = response.data;
    //   login(token);
    // } catch (err) {
    //   setError(err.response?.data?.message || "Login failed. Try again.");
    // }
    // navigate(routes.home);
  };
  const handleLogout = async () => {
    //////////////mock logout - remove after test/////////////////////////////
    logout();
    navigate(routes.loginPage);
    /////////////////////////////////////////////////////////////////////////
    // try {
    //   const authToken = localStorage.getItem("authToken");
    //   if (authToken) {
    //     await axios.post(
    //       "http://127.0.0.1:8082/api/auth/logout",
    //       {},
    //       { headers: { Authorization: `Bearer ${authToken}` } }
    //     );
    //   }
    //   logout();
    // } catch (err) {
    //   console.error("Logout error:", err.response?.data || err.message);
    // }
    // navigate(routes.home);
  };

  return (
    <div className="login-page">
      <Header />
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="smart-bremen-logo" />
        </div>
        <div className="login-form">
          {token ? (
            <div className="logged-in-container">
              <p>You are logged in with token: {token}</p>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
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
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
              <button type="submit" className="button">
                Login
              </button>
              <a href="/signup" className="signup-link">
                Don’t have an account? Create one here
              </a>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
