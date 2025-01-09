import React from 'react';
import PropTypes from 'prop-types';
import './artistprofilepicture.css';

const ArtistProfilePicture = ({ artist }) => {
    return(
        <div className='artist-profile'>
            <div className='profile-picture-container'>
                <img src={artist.profilePicture}  
                className="profile-picture" alt={artist.name}/>
            </div>            
        </div>
    );
};

ArtistProfilePicture.propTypes =  {
    artist: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        displayPicture: PropTypes.string.isRequired
    }).isRequired
};

export default ArtistProfilePicture;