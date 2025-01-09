import React from 'react';
import PropTypes from 'prop-types';
import './teammember.css';
import blankProfilePicture from '../assets/images/blank-profile-picture.png';

const TeamMember = ({ member }) => {
    return(
        <div className='team-member'>
            <div className='profile-picture-container'>
                <img src={member.image || blankProfilePicture }  
                className="profile-picture"/>
            </div>
            <h3>{member.name}</h3>
            <p>{member.position}</p>
        </div>
    );
};

TeamMember.propTypes =  {
    member: PropTypes.shape({
        name: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

export default TeamMember;