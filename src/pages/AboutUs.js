import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamMember from '../components/TeamMember';
import '../styles/colors.css';
import './aboutus.css';
import aboutusData from '../data/aboutusData.json';

const AboutUs = () => {

  const[data, setData] = useState(null);

  useEffect(() => {
    setData(aboutusData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='aboutus-container'>
      <Header />
      <div className='aboutus-content'>
      <h1>{data.headline}</h1>
      <p>{data.description}</p>
      <h2>OUR TEAM</h2>
      <div className='team-container'>
        {data.team.map((member, index) => (
          <TeamMember key={index} member={member} />
        ))}
      </div>
      </div>      
      <Footer />
    </div>
  );
};

export default AboutUs;