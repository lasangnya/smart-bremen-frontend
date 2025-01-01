import React from 'react';
import './header.css';
import logo from '../assets/logos/logo_smart_bremen.svg';
import ic_profile from '../assets/icons/ic_profile.svg';
import navigation from '../assets/icons/navigation.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-section icon">
      <img src={ic_profile} alt="smart-bremen-logo" />
      </div>
      <div className="header-section logo">
        <img src={logo} alt="smart-bremen-logo" />
      </div>
      <div className="header-section nav">
      <img src={navigation} alt="navigation-menu-icon" />
      </div>
    </header>
  );
};

export default Header;