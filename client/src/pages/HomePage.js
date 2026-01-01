// src/pages/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import HeroBanner from '../components/HeroBanner';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🤝 Together We Build Trust</h2>
            
            <p>
              Socho ek pal ke liye — agar aapka samaan kho jaaye toh aap kitne pareshaan ho jaate ho.  
              Aur phir socho… agar koi aapka samaan surakshit rakhkar wapas kar de, toh woh relief aur khushi kaisi hogi. 🌟
            </p>

            <p>
              Bas wahi khushi aap bhi kisi aur ko de sakte ho.  
              Aapke honesty ke ek kadam se kisi ki umeed jagti hai,  
              aur unka trust hum sab par aur mazboot hota hai.
            </p>

            <p>
              Hamari community ek simple promise par bani hai:  
              <strong> jo bhi saman mile, use share karo – taki har kisi ka khooya hua saman wapas mil sake. </strong>
            </p>

            <p>
              Chaliye milke ek aisa platform banayein,  
              jahan <strong>insaaniyat aur trust</strong> sabse badi currency ho. ✨
            </p>

            <button onClick={handleClosePopup} className="popup-btn">
              Okay, I Promise 👍
            </button>
          </div>
        </div>
      )}

      <HeroBanner />

      <section className="features">
        <div className="card">
          <h2>Report Lost</h2>
          <p>Easily file a report if you lost something during travel.</p>
          <Link to="/report-lost">File Report →</Link>
        </div>
        <div className="card">
          <h2>Track Report</h2>
          <p>Track the status of your lost item using mobile number or report ID.</p>
          <Link to="/track">Track Now →</Link>
        </div>
        <div className="card">
          <h2>Report Found</h2>
          <p>Found an unclaimed item? Help return it to its rightful owner.</p>
          <Link to="/report-found">Submit Found Item →</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
