import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SmartBremenLines from '../assets/icons/smart_bremen_lines.svg'
import '../styles/colors.css';
import './contactus.css';

const ContactUs = () => {
  return (
    <div className='contactus-container'>
      <Header />
      <div className='contactus-content'>
      <div style={{textAlign : 'center', margin: '20px 0', fontFamily: 'CircularStd', fontWeight:'700', color: 'var(--secondary)', fontSize: '25px'}}>
        Contact Us Page
      </div>
      </div>      
      <Footer />
    </div>
  );
};

export default ContactUs;