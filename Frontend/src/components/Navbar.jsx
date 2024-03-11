import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          <span>OJ</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/problems" className="navbar-link">
          Problems
        </Link>
        <Link to="/about-us" className="navbar-link">
          About Us
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
