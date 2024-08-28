// LogoPreloader.js
import React from 'react';
// import './LogoPreloader.css'; // Create a CSS file for styling
import Logo from "../../../../assets/Logo/Logo-Full-Light.png"

const LogoPreloader = () => {
  return (
    <div className="logo-preloader flex flex-col">
      <img src={Logo} alt="Loading..." className="preloader-logo w-[150px] md:w-[300px]" />
   
    </div>
  );
};

export default LogoPreloader;
