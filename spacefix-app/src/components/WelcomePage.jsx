// WelcomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import spacemanagementImg from '../assets/spacemanagement.jpg';


const WelcomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleServiceLogin = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="welcome-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          {/* Logo */}
          <div className="logo">
            <span>Spacefix</span>
          </div>

          {/* Login Buttons */}
          <div className="login-buttons">
            {/* <button className="login-btn">Student Login</button> */}
            
            <button className="login-btn">
            <Link to="/student-login">Student Login</Link>
            </button>

            <button className="login-btn">Lecture Login</button>
            
            {/* Service Login Dropdown */}
            <div className="dropdown">
              <button onClick={handleServiceLogin} className="login-btn service-btn">
                Service Login
                <span className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`}></span>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <button>Administrative Staff Login</button>
                  <button>Lab Keeper Login</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column - Text Content */}
        <div className="text-section">
          <h1>Space<span className="fix">fix</span></h1>
          <p>
            Effortlessly manage and book university spaces with real-time 
            availability and streamlined scheduling.
          </p>
          <button className="try-btn">Get Started</button>
        </div>

        {/* Right Column - Image */}
        <div className="image-section">
        <img src={spacemanagementImg} alt="University classroom" />
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;