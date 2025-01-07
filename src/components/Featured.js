import React, { useState } from 'react';
import SmartBremenLines from '../assets/icons/smart_bremen_lines.svg';
import featuredData from '../data/featuredData';
import './featured.css';
import ArtistProfileandName from './ArtistProfileandName';

const Featured = () => {

    const[currentSlide, setCurrentSlide] = useState(0);

    const handlePrevClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? featuredData.length - 1 : prevSlide - 1));
      };
    
      const handleNextClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide === featuredData.length - 1 ? 0 : prevSlide + 1));
      };

      const { artist } = featuredData[currentSlide];

    return (
        <div className="featured-container">
            <div className='text-container'>
                <div className="text-we-are-bremen">
                    <span className="text-we-are">WE ARE</span>
                    <span className="text-with-icon">
                        <span className="text-bremen">BREMEN</span>
                        <img src={SmartBremenLines} alt="lines" className="icon" />
                    </span>
                </div>
                <div className="text-featured">
                    FEATURED
                </div>
            </div>
            <div className='arrow left-arrow' onClick={handlePrevClick}>&#9664;</div>
            <div className='slide'>
                <div className="pictures-container">
                        {artist.pictures.map((picture, index) => (
                            <img key={index} src={picture} alt={`Artist ${artist.name} picture ${index}`} className="picture" />
                        ))}
                </div>
                <div className='artist-info'>
                    <div className='artist-description'>{artist.description}</div>
                    <ArtistProfileandName artist={artist} />
                </div>                
            </div>
            <div className="arrow right-arrow" onClick={handleNextClick}>&#9654;</div>
        </div>
    );
};

export default Featured;