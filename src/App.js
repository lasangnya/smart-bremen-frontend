import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import './styles/colors.css';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
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