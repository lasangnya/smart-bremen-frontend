import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../assets/logos/logo_smart_bremen.svg";
import ic_profile from "../assets/icons/ic_profile.svg";
import navigation from "../assets/icons/navigation.svg";
import routes from "../routes";
import { useAuth } from "../backend/components/AuthContext"; // Import the context

const Header = () => {
  const { token, logout } = useAuth();
  const [isNavVisible, setIsNavVisible] = useState(false);

  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsNavVisible(false);
  };

  const handleLogout = async () => {
    console.log("aaaa");
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        await axios.post(
          "http://134.102.23.131:8082/api/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      }
      logout();
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
    navigate(routes.home);
  };

  return (
    <header className="header">
      <div
        className="header-section logo"
        onClick={() => handleNavigation(routes.home)}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="smart-bremen-logo" />
      </div>
      <div
        className="header-section icon"
        onClick={() => handleNavigation(routes.loginPage)}
        style={{ cursor: "pointer" }}
      >
        <img src={ic_profile} alt="profile-icon" />
      </div>
      {/* <div className="header-section nav" onClick={toggleNav}>
        <img src={navigation} alt="navigation-menu-icon" />
      </div> */}
      {/* {isNavVisible && (
        <div className="nav-popup">
          <ul>
            {token ? (
              <li onClick={() => handleLogout()} style={{ cursor: "pointer" }}>
                Logout
              </li>
            ) : (
              <>
                <li
                  onClick={() => handleNavigation(routes.loginPage)}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </li>
                <li
                  onClick={() => handleNavigation(routes.signupPage)}
                  style={{ cursor: "pointer" }}
                >
                  Signup
                </li>
              </>
            )}
            <li
              onClick={() => handleNavigation(routes.contactUs)}
              style={{ cursor: "pointer" }}
            >
              Contact Us
            </li>
            <li
              onClick={() => handleNavigation(routes.aboutUs)}
              style={{ cursor: "pointer" }}
            >
              About Us
            </li>
          </ul>
        </div>
      )} */}
    </header>
  );
};

export default Header;
