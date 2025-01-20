import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';
import logo from '../assets/logos/logo_smart_bremen.svg';
import ic_profile from '../assets/icons/ic_profile.svg';
import navigation from '../assets/icons/navigation.svg';
import routes from '../routes';

const Header = () => {

  const [isNavVisible, setIsNavVisible] = useState(false);

  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsNavVisible(false);
  };

  return (
    <header className="header">
      <div className="header-section icon" onClick={() => handleNavigation(routes.loginPage)} style={{cursor: 'pointer'}}>
      <img src={ic_profile} alt="profile-icon" />
      </div>
      <div
      className="header-section logo"
      onClick={() => handleNavigation(routes.home)}
      style={{cursor: 'pointer'}}>
        <img src={logo} alt="smart-bremen-logo" />
      </div>
      <div className="header-section nav" onClick={toggleNav}>
        <img src={navigation} alt="navigation-menu-icon" />
      </div>
      {isNavVisible && (
        <div className="nav-popup">
        <ul>
          <li
            onClick={() => handleNavigation(routes.contactUs)}
            style={{cursor: 'pointer'}}>Contact Us</li>
          <li
            onClick={() => handleNavigation(routes.aboutUs)}
            style={{cursor: 'pointer'}}>About Us</li>
        </ul>
      </div>
      )}
    </header>
  );
};

export default Header;