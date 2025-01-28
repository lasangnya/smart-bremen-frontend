import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../assets/logos/logo_smart_bremen_white.svg';
import uni_logo from '../assets/logos/UHB_Logo_Web_negativ.svg';
import bremen_skyline from '../assets/images/bremen-skyline.svg';

const Footer = () => {
    return(
        <footer className='footer'>
            <div className='footer-skyline-container'>
                <div className='footer-skyline-wrapper'>
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                    <img src={bremen_skyline} alt='Bremen Skyline' className='footer-skyline' />
                </div>
            </div>
            <div className='footer-content'>
                <div className='footer-logos'>
                    <img src={logo} alt='Smart Bremen Logo' className='footer-logo' />
                    <img src={uni_logo} alt='University of Bremen Logo' className='footer-logo' />
                </div>
                <div className='footer-links'>
                    <div className = 'footer-contact'>
                        CONTACT US: <br/>
                        <a href="mailto:info@smartbremen.uni-bremen.de">info@smartbremen.uni-bremen.de</a>
                        <br />
                    </div>
                    <div className='footer-about-us'>
                        <Link to="/aboutus" className="footer-link">
                            ABOUT US
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;