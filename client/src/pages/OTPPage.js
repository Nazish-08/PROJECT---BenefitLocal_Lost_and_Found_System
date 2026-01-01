// src/OTPPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OTPPage.css';
import logo from '../assets/logo.jpg';
import bgImage from '../assets/3.jpg';

const OTPPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [serverOTP, setServerOTP] = useState('');
  const navigate = useNavigate();

  // OTP bhejna
  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/generate-otp', null, {
        params: { phone }
      });
      setServerOTP(res.data.otp);
      
      // ✅ LocalStorage mein save
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("otpGenerated", res.data.otp);
      localStorage.setItem("otpTimestamp", new Date().toISOString());
      localStorage.setItem("loginStatus", "pending");
      
      console.log("✅ OTP saved to localStorage and project folder");
      
    } catch (err) {
      console.error("Error generating OTP:", err);
      alert("Error generating OTP");
    }
  };

  // OTP verify
  const handleVerify = async () => {
    if (otp === serverOTP) {
      // ✅ LocalStorage mein save
      localStorage.setItem("loginStatus", "verified");
      localStorage.setItem("lastLogin", new Date().toISOString());
      localStorage.setItem("userVerified", "true");
      
      alert("✅ OTP Verified Successfully!");
      navigate('/home');
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <div
      className="otp-container"
      style={{
        backgroundImage: `linear-gradient(rgba(18,18,18,0.4), rgba(18,18,18,0.2)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div className="otp-box">
        <img src={logo} alt="logo" className="logo" />
        <h2>BenefitLocal Lost & Found</h2>
        
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength="10"
        />
        <button onClick={handleSendOTP}>Get OTP</button>

        {serverOTP && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              maxLength="6"
            />
            <button onClick={handleVerify}>Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OTPPage;