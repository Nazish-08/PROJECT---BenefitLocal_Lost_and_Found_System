// src/components/Features.js
import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="next-section">
      <div className="card-container">
        <div className="feature-card">
          <h2>Report Lost</h2>
          <p>Easily file a report if you lost something during travel.</p>
          <a href="#">File Report →</a>
        </div>
        <div className="feature-card">
          <h2>Track Report</h2>
          <p>Track the status of your lost item using report ID.</p>
          <a href="#">Track Now →</a>
        </div>
        <div className="feature-card">
          <h2>Report Found</h2>
          <p>Found an item? Help return it to the owner.</p>
          <a href="#">Submit Found Item →</a>
        </div>
      </div>
    </div>
  );
};

export default Features;
