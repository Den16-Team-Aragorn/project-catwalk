/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import {FaSearch} from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
        <img className="logo" src="./narsil_edit_2.png" />
        <h1 className="bilbosbaubles">Bilbo's Baubles</h1>
        <div className="search-div">
           <input type="text" placeholder="Search..." className="search"></input>
           <FaSearch className="search-icon"/>
        </div>
    </div>
  );
};



export default Header;

