import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="BenefitLocal Logo" />
        <span className="navbar-logo-text">BenefitLocal</span>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/track">Track My Report</Link>
        <Link to="/all-images">All Items</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/faq">FAQ</Link>
      </div>
    </nav>
  );
}
