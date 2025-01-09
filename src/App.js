import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import Featured from './components/Featured';
import MapView from './components/MapView';
import ContactUs from './pages/ContactUs';
import './styles/colors.css';
import './App.css';
import routes from "./routes";
import AboutUs from './pages/AboutUs';

const App = () => {

  const navigate = useNavigate();

  const handleContactUsClick = () => {
    navigate('/contactus');
  }

  return (
    <div className='app-container'>
      <Header />
      <MapView />
      <Featured />
      <div className='app-content'>
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0', fontFamily: 'CircularStd', fontWeight: '700', color: 'var(--secondary)', fontSize: '25px' }}>
        Like to get featured?
      </div>
      <div className='button-container'>
        <Button text="CONTACT US" onClick={handleContactUsClick} />
      </div>
      <Footer />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path={routes.home} element={<App />} />

      {/* Contact Us route */}
      <Route path={routes.contactUs} element={<ContactUs />} />

      {/* About Us route */}
      <Route path={routes.aboutUs} element={<AboutUs />} />
    </Routes>
  );
};


export default AppWrapper;