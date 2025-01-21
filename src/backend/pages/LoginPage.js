import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/BackHeader';
import Footer from '../../components/Footer';
import logo from '../../assets/logos/logo_smart_bremen.svg';
import './loginpage.css';
import routes from '../../routes';

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Call backend API for authentication here
      //onLogin(); // Notify parent component of successful login
      navigate(routes.dashboard);
    };
  
    return (
      <div className="login-page">
        <Header/>
        <div className='container'>
          <div className='logo-container'>
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
              <a href="/forgot-password" className='forgot-password'>Forgot Password?</a>
              <button type="submit" className="button">Login</button>
            </form>            
          </div>
        </div>
        <Footer/>
      </div>
    );
}

export default LoginPage;