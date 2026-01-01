// src/pages/TrackReportPage.js
import React, { useState } from "react";
import "./TrackReportPage.css";

export default function TrackReportPage() {
  const [mobile, setMobile] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ CORRECT KEYS USE KARO - tumhare actual localStorage keys
    const lostReports = JSON.parse(localStorage.getItem("lostItems")) || [];
    const foundReports = JSON.parse(localStorage.getItem("foundItems")) || [];

    // ✅ All items combine karo with proper type
    const allItems = [
      ...lostReports.map((r) => ({ ...r, type: "Lost" })),
      ...foundReports.map((r) => ({ ...r, type: "Found" })),
    ];

    // ✅ Mobile number match karo (contactNumber field check karo)
    const matched = allItems.filter(
      (item) => item.contactNumber && item.contactNumber.includes(mobile.trim())
    );

    console.log("Search Results:", {
      mobile: mobile,
      totalLost: lostReports.length,
      totalFound: foundReports.length,
      matched: matched.length
    });

    setResults(matched);
    setSearched(true);
  };

  return (
    <div className="track-container">
      <h2>🔍 Track My Lost / Found Report</h2>

      {/* --- Search Form --- */}
      <div className="track-card">
        <form className="track-form" onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="📱 Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            maxLength="15"
          />
          <button type="submit">Track Now →</button>
        </form>
      </div>

      {/* --- Search Results --- */}
      {searched && (
        <div className="results">
          <h3>📋 Search Results</h3>
          
          {results.length === 0 ? (
            <p className="no-results">❌ No reports found for this number.</p>
          ) : (
            <div className="results-grid">
              {results.map((item, index) => (
                <div key={index} className={`result-card ${item.type.toLowerCase()}-card`}>
                  {/* Status Badge */}
                  <div className={`status-badge ${item.type.toLowerCase()}`}>
                    {item.type} Item
                  </div>

                  {/* Image */}
                  {item.image && (
                    <img src={item.image} alt="Item" className="result-image" />
                  )}

                  {/* Basic Info */}
                  <div className="result-info">
                    <h3>{item.itemName || "Unnamed Item"}</h3>
                    <p><b>Description:</b> {item.description || "N/A"}</p>
                    <p><b>Location:</b> {item.foundLocation || item.lostLocation || "N/A"}</p>
                    <p><b>Date:</b> {item.dateFound || item.dateLost || "N/A"}</p>
                    {item.timeLost && <p><b>Time:</b> {item.timeLost}</p>}
                    <p><b>Contact:</b> {item.contactNumber}</p>
                    {item.email && <p><b>Email:</b> {item.email}</p>}
                    
                    {/* Additional Info */}
                    {item.handoverOption && (
                      <p><b>Handover:</b> {item.handoverOption}</p>
                    )}
                    
                    {item.reportedAt && (
                      <p><b>Reported:</b> {new Date(item.reportedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Debug Info */}
      <div className="debug-info">
        <p><small>💡 Search by the same mobile number used in form submission</small></p>
      </div>
    </div>
  );
}