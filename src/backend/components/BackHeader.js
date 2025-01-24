import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './backheader.css';
import logo from '../../assets/logos/logo_smart_bremen.svg';
import routes from '../../routes';

const Header = () => {

  const [isNavVisible, setIsNavVisible] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsNavVisible(false);
  };

  return (
    <header className="header">
      <div
      className="header-section logo"
      onClick={() => handleNavigation(routes.home)}
      style={{cursor: 'pointer'}}>
        <img src={logo} alt="smart-bremen-logo" />
      </div>
    </header>
  );
};

export default Header;