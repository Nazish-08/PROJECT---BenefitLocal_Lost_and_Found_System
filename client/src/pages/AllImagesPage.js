// src/pages/AllImagesPage.js
import React, { useEffect, useState } from "react";
import "./AllImagesPage.css";

const AllImagesPage = () => {
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = () => {
      try {
        // ✅ Same keys jo tum save kar rahe ho
        const storedLost = JSON.parse(localStorage.getItem("lostItems")) || [];
        const storedFound = JSON.parse(localStorage.getItem("foundItems")) || [];

        console.log("=== DEBUG LOCALSTORAGE ===");
        console.log("Lost Reports count:", storedLost.length);
        console.log("Found Reports count:", storedFound.length);
        
        // ✅ Detailed image check
        storedLost.forEach((report, index) => {
          console.log(`📸 Lost Report ${index}:`, {
            item: report.itemName,
            hasImage: !!report.image,
            imageStartsWith: report.image ? report.image.substring(0, 50) + "..." : "No image"
          });
        });

        storedFound.forEach((report, index) => {
          console.log(`📸 Found Report ${index}:`, {
            item: report.itemName,
            hasImage: !!report.image,
            imageStartsWith: report.image ? report.image.substring(0, 50) + "..." : "No image"
          });
        });

        setLostReports(storedLost);
        setFoundReports(storedFound);
      } catch (error) {
        console.error("❌ Error loading reports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return <div className="loading">Loading reports...</div>;
  }

  return (
    <div className="images-container">
      <h2>🖼️ All Reports</h2>

      {/* Lost Reports */}
      <h3 className="lost-title">❌ Lost Reports ({lostReports.length})</h3>
      <div className="image-grid">
        {lostReports.length > 0 ? (
          lostReports.map((report, index) => (
            <div key={report.id || index} className="image-card lost-card">
              {report.image ? (
                <div className="image-with-badge">
                  <img
                    src={report.image}
                    alt={`Lost ${report.itemName}`}
                    className="uploaded-image"
                    onError={(e) => {
                      console.error(`❌ Image ${index} failed to load`);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log(`✅ Image ${index} loaded successfully`)}
                  />
                  <span className="image-badge">📸 Image Available</span>
                </div>
              ) : (
                <div className="no-image-placeholder">
                  <div className="no-image-icon">📷</div>
                  <p>No Image</p>
                </div>
              )}
              <div className="details">
                <p><strong>Item:</strong> {report.itemName}</p>
                <p><strong>Location:</strong> {report.lostLocation}</p>
                <p><strong>Date:</strong> {report.dateLost}</p>
                <p><strong>Contact:</strong> {report.contactNumber}</p>
                <p><strong>Status:</strong> {report.image ? "✅ With Image" : "❌ No Image"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No Lost Reports yet.</p>
        )}
      </div>

      {/* Found Reports */}
      <h3 className="found-title">✅ Found Reports ({foundReports.length})</h3>
      <div className="image-grid">
        {foundReports.length > 0 ? (
          foundReports.map((report, index) => (
            <div key={report.id || index} className="image-card found-card">
              {report.image ? (
                <div className="image-with-badge">
                  <img
                    src={report.image}
                    alt={`Found ${report.itemName}`}
                    className="uploaded-image"
                    onError={(e) => {
                      console.error(`❌ Image ${index} failed to load`);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log(`✅ Image ${index} loaded successfully`)}
                  />
                  <span className="image-badge">📸 Image Available</span>
                </div>
              ) : (
                <div className="no-image-placeholder">
                  <div className="no-image-icon">📷</div>
                  <p>No Image</p>
                </div>
              )}
              <div className="details">
                <p><strong>Item:</strong> {report.itemName}</p>
                <p><strong>Location:</strong> {report.foundLocation}</p>
                <p><strong>Date:</strong> {report.dateFound}</p>
                <p><strong>Contact:</strong> {report.contactNumber}</p>
                <p><strong>Handover:</strong> {report.handoverOption}</p>
                <p><strong>Status:</strong> {report.image ? "✅ With Image" : "❌ No Image"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No Found Reports yet.</p>
        )}
      </div>
    </div>
  );
};

export default AllImagesPage;