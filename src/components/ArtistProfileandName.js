import React from 'react';
import PropTypes from 'prop-types';
import './artistnameandprofile.css';
import blankProfilePicture from '../assets/images/blank-profile-picture.png';
import SmartBremenLines from '../assets/icons/smart_bremen_lines.svg';

const ArtistProfileandName = ({ artist }) => {
    return(
        <div className='artist-profile'>
            <div className='artist-profile-text'>
                <h3>{artist.name}</h3>
                <p>
                    {artist.category}
                    <img src={SmartBremenLines} alt="Smart Bremen Lines" className="smart-bremen-lines" />
                    </p>
            </div>
            <div className='profile-picture-container'>
                <img src={artist.displayPicture || blankProfilePicture }  
                className="profile-picture" alt={artist.name}/>
            </div>            
        </div>
    );
};

ArtistProfileandName.propTypes =  {
    artist: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        displayPicture: PropTypes.string.isRequired
    }).isRequired
};

export default ArtistProfileandName;