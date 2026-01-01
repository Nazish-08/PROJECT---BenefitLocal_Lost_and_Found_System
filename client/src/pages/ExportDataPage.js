// src/pages/ExportDataPage.js
import React from "react";
import "./ExportDataPage.css";

const ExportDataPage = () => {
  // ✅ COMPLETE DATA JSON FILE MEIN SAVE KAREGA
  const exportCompleteData = () => {
    try {
      // Saara data collect karo
      const completeData = {
        // ✅ OTP & LOGIN DATA
        otpData: {
          userPhone: localStorage.getItem("userPhone"),
          otpGenerated: localStorage.getItem("otpGenerated"),
          loginStatus: localStorage.getItem("loginStatus"),
          lastLogin: localStorage.getItem("lastLogin"),
          userVerified: localStorage.getItem("userVerified"),
          otpTimestamp: localStorage.getItem("otpTimestamp")
        },
        
        // ✅ LOST ITEMS DATA
        lostItems: JSON.parse(localStorage.getItem("lostItems") || "[]"),
        
        // ✅ FOUND ITEMS DATA  
        foundItems: JSON.parse(localStorage.getItem("foundItems") || "[]"),
        
        // ✅ EXPORT INFO
        exportInfo: {
          exportedAt: new Date().toLocaleString(),
          totalRecords: {
            lost: JSON.parse(localStorage.getItem("lostItems") || "[]").length,
            found: JSON.parse(localStorage.getItem("foundItems") || "[]").length,
            total: JSON.parse(localStorage.getItem("lostItems") || "[]").length + 
                   JSON.parse(localStorage.getItem("foundItems") || "[]").length
          },
          appVersion: "1.0",
          exportType: "COMPLETE_DATA"
        }
      };

      // JSON file banayo
      const dataStr = JSON.stringify(completeData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      
      // Download karo
      const link = document.createElement("a");
      link.href = URL.createObjectURL(dataBlob);
      link.download = `complete-data-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`✅ Complete data exported!\n📱 OTP Data + 📝 Form Data`);
      
    } catch (error) {
      console.error("Export error:", error);
      alert("❌ Error exporting complete data");
    }
  };

  // ✅ JSON FILE SE COMPLETE DATA IMPORT KAREGA
  const importCompleteData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // ✅ OTP DATA IMPORT
        if (importedData.otpData) {
          if (importedData.otpData.userPhone) {
            localStorage.setItem("userPhone", importedData.otpData.userPhone);
          }
          if (importedData.otpData.loginStatus) {
            localStorage.setItem("loginStatus", importedData.otpData.loginStatus);
          }
          if (importedData.otpData.lastLogin) {
            localStorage.setItem("lastLogin", importedData.otpData.lastLogin);
          }
        }
        
        // ✅ FORM DATA IMPORT (MERGE WITH EXISTING)
        if (importedData.lostItems) {
          const existingLost = JSON.parse(localStorage.getItem("lostItems") || "[]");
          const mergedLost = [...existingLost, ...importedData.lostItems];
          localStorage.setItem("lostItems", JSON.stringify(mergedLost));
        }
        
        if (importedData.foundItems) {
          const existingFound = JSON.parse(localStorage.getItem("foundItems") || "[]");
          const mergedFound = [...existingFound, ...importedData.foundItems];
          localStorage.setItem("foundItems", JSON.stringify(mergedFound));
        }
        
        alert(`✅ Complete data imported successfully!\n📊 Added ${importedData.lostItems?.length || 0} lost + ${importedData.foundItems?.length || 0} found items`);
        
        event.target.value = '';
        
      } catch (error) {
        console.error("Import error:", error);
        alert("❌ Invalid JSON file format");
      }
    };
    reader.readAsText(file);
  };

  // ✅ CURRENT DATA STATS
  const getStats = () => {
    const lostCount = JSON.parse(localStorage.getItem("lostItems") || "[]").length;
    const foundCount = JSON.parse(localStorage.getItem("foundItems") || "[]").length;
    const userPhone = localStorage.getItem("userPhone");
    
    return { lostCount, foundCount, userPhone };
  };

  const { lostCount, foundCount, userPhone } = getStats();

  return (
    <div className="export-container">
      <h2>📁 Complete Data Export</h2>
      
      <div className="stats">
        <h3>📊 Current Data Status:</h3>
        <p>📱 Logged-in User: {userPhone || "Not logged in"}</p>
        <p>❌ Lost Items: {lostCount}</p>
        <p>✅ Found Items: {foundCount}</p>
        <p>📈 Total Records: {lostCount + foundCount}</p>
      </div>

      <div className="export-buttons">
        <button onClick={exportCompleteData} className="btn btn-complete">
          💾 Export Complete Data (OTP + Forms)
        </button>
        
        <div className="import-section">
          <label htmlFor="import-complete" className="btn btn-import">
            📥 Import Complete Data
          </label>
          <input
            id="import-complete"
            type="file"
            accept=".json"
            onChange={importCompleteData}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="info">
        <h3>ℹ️ What gets exported:</h3>
        <ul>
          <li>✅ <strong>OTP Login Data:</strong> Phone number, OTP, login status</li>
          <li>✅ <strong>Lost Items:</strong> All form data + images</li>
          <li>✅ <strong>Found Items:</strong> All form data + images</li>
          <li>✅ <strong>Export Info:</strong> Timestamp, record counts</li>
        </ul>
        
        <h3>📁 File Name Format:</h3>
        <p><code>complete-data-1705306800000.json</code></p>
      </div>
    </div>
  );
};

export default ExportDataPage;