import React, { useState, useEffect } from 'react';
import Button from './Button';
import './mapview.css';
import ArtistProfilePicture from './ArtistProfilePicture';
import artistData from '../data/artistData.json';

const MapView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 6) % artistData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayedArtists = artistData.slice(currentIndex, currentIndex + 6);

  return (
    <div className='map-view'>
      <div className='map-container'>
        <div className='left-column'>
          {displayedArtists.slice(0, 3).map((artist, index) => (
            <ArtistProfilePicture
              key={index}
              artist={artist}
              size={{ width: `${Math.random() * 50 + 100}px`, height: `${Math.random() * 50 + 100}px` }}
            />
          ))}
        </div>
        <div className='right-column'>
          {displayedArtists.slice(3, 6).map((artist, index) => (
            <ArtistProfilePicture
              key={index}
              artist={artist}
              size={{ width: `${Math.random() * 50 + 100}px`, height: `${Math.random() * 50 + 100}px` }}
            />
          ))}
        </div>
      </div>
      <div className='who-are-we-button-container'>
        <Button text="WHO ARE WE" onClick={() => {}} />
      </div>
    </div>
  );
};

export default MapView;