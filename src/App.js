import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import SmartBremenLines from './assets/icons/smart_bremen_lines.svg'
import './styles/colors.css';
import './App.css';

const App = () => {
  return (
    <div className='app-container'>
      <Header />
      <div className='text-container'>
        <div className='text-content'>
          <span className='text-we-are'>WE ARE</span>
          <span className='text-with-icon'>
            <span className='text-bremen'>BREMEN</span>
            <img src={SmartBremenLines} alt='lines' className='icon'/>
          </span>          
        </div>
      </div>
      <div style={{textAlign : 'center', margin: '20px 0', fontFamily: 'CircularStd', fontWeight:'700', color: 'var(--secondary)', fontSize: '25px'}}>
        Like to get featured?
      </div>
      <div className='button-container'>
        <Button text="CONTACT US" onClick={() => {}} />
      </div>
      <Footer />
    </div>
  );
};

export default App;