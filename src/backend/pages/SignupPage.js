import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/BackHeader";
import Footer from "../../components/Footer";
import logo from "../../assets/logos/logo_smart_bremen.svg";
import "./signuppage.css";
import routes from "../../routes";

function SignupPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    if (password === repeatPassword) {
      setIsSubmitted(true); // Show confirmation message
    } else {
      alert("Passwords do not match!");
    }
  }

  return (
    <div className="signup-page">
        <Header />
      <div className="logo-container">
        <img src={logo} alt="smart-bremen-logo" />
      </div>

      {isSubmitted ? (
        // Confirmation message
        <div className="confirmation-container">
          <p className="confirmation-text">You will receive a confirmation via email</p>
          <button
            className="home-button"
            onClick={() => navigate(routes.home)}
          >
            Home
          </button>
        </div>
      ) : (
        // Sign-up form
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
      <Footer />
    </div>
  );
}

export default SignupPage;
