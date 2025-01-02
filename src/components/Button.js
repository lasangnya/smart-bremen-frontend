import React from "react";
import './button.css';
import arrowIcon from '../assets/icons/arrow.svg';

const Button = ({ text, onClick }) => {
    return(
        <button className="custom-button" onClick={onClick}>
            {text}
            <span className="circle">
                <img src={arrowIcon} alt="Arrow" className="icon"/>
            </span>
        </button>
    );
};

export default Button;