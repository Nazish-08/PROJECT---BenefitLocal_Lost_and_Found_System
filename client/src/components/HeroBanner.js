import React from 'react';
import './HeroBanner.css';
import TrainVideo from '../assets/Train.mp4'; 
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-banner-container">
      <div className="hero-slide">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={TrainVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">
          <h1>BenefitLocal</h1>
          <p>Helping commuters recover their lost items across local stations.</p>
          
          {/* ✅ Report Lost & Found ek line me */}
          <div className="hero-buttons">
            <button 
              className="btn-report-lost" 
              onClick={() => navigate('/report-lost')}
            >
              Report Lost
            </button>

            <button 
              className="btn-report-found" 
              onClick={() => navigate('/report-found')}
            >
              Report Found
            </button>
          </div>

          {/* ✅ Book Ticket alag line me */}
          <div className="hero-book-ticket">
            <button 
              className="btn-book-ticket" 
              onClick={() => navigate('/book-ticket')}
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
