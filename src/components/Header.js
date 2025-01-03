import React, { useState } from 'react';
import './header.css';
import logo from '../assets/logos/logo_smart_bremen.svg';
import ic_profile from '../assets/icons/ic_profile.svg';
import navigation from '../assets/icons/navigation.svg';

const Header = () => {

  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="header">
      <div className="header-section icon">
      <img src={ic_profile} alt="profile-icon" />
      </div>
      <div className="header-section logo">
        <img src={logo} alt="smart-bremen-logo" />
      </div>
      <div className="header-section nav" onClick={toggleNav}>
        <img src={navigation} alt="navigation-menu-icon" />
      </div>
      {isNavVisible && (
        <div className="nav-popup">
        <ul>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
      </div>
      )}
    </header>
  );
};

export default Header;