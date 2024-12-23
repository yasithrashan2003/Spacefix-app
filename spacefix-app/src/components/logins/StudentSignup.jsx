import React from 'react';
import { Link } from 'react-router-dom';
import './StudentAuth.css';

const StudentSignup = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Student Sign Up</h1>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/student-login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;