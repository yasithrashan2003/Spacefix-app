import React from 'react';
import { Link } from 'react-router-dom';
import './StudentAuth.css';

const StudentLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Student Login</h1>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/student-signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;