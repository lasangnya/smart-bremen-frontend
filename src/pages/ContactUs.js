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
        <form className='contactus-form'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' required minLength='3' maxLength='50'/>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input type='email' id='email' name='email' required minLength='5' maxLength='50'/>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Subject</label>
            <input type='text' id='subject' name='subject' required minLength='3' maxLength='100'/>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Message</label>
            <textarea id='message' name='message' rows = '4' required minLength='10' maxLength='1000'/>
          </div>
          <div className='send-message-button-container'>
            <button type='submit' className='send-message-button'>SEND MESSAGE</button>
          </div>
        </form>
      </div>      
      <Footer />
    </div>
  );
};

export default ContactUs;