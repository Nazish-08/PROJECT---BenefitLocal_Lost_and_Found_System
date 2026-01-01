import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';
import logo from '../assets/logo.jpg';
import axios from 'axios';

const ResultPage = () => {
  const { state: formData } = useLocation();
  const [similarMatches, setSimilarMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:8000/all-uploads');
        const allData = res.data.photos;

        const matched = allData.filter(entry => {
          // ⚠️ Match karne ka basic logic (same station + status)
          return (
            entry.station === formData.station &&
            entry.status !== formData.status
          );
        });

        setSimilarMatches(matched);
      } catch (err) {
        console.error('Error fetching similar matches:', err);
      }
    };

    if (formData) fetchMatches();
  }, [formData]);

  if (!formData) {
    return <div>Form data missing. Please submit the form again.</div>;
  }

  return (
    <div className="result-container">
      <div className="result-box">
        <img src={logo} alt="logo" className="logo" />
        <h2>Submission Result</h2>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Status:</strong> {formData.status}</p>
        <p><strong>Line:</strong> {formData.line}</p>
        <p><strong>Station:</strong> {formData.station}</p>
        <p><strong>Time:</strong> {formData.time}</p>
        <p><strong>Description:</strong> {formData.description}</p>
        <img
          src={`data:image/jpeg;base64,${formData.photo_base64}`}
          alt="Uploaded"
          className="uploaded-photo"
        />

        <hr />

        <h3>🔍 Similar Matches</h3>
        {similarMatches.length > 0 ? (
          similarMatches.map((match, idx) => (
            <div key={idx} className="match-card">
              <p><strong>Matched Name:</strong> {match.name}</p>
              <p><strong>Status:</strong> {match.status}</p>
              <p><strong>Station:</strong> {match.station}</p>
              <img
                src={`http://localhost:8000/${match.photo_path}`}
                alt="Matched"
                className="uploaded-photo"
              />
            </div>
          ))
        ) : (
          <p>No similar matches found right now.</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
