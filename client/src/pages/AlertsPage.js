import React, { useState, useEffect } from "react";
import "./AlertsPage.css";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Load real data from localStorage
  useEffect(() => {
    const loadData = () => {
      const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
      const foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
      
      // Convert to alerts format
      const lostAlerts = lostItems.map(item => ({
        id: item.id,
        type: "lost",
        title: `${item.itemName} Lost`,
        description: `${item.itemName} lost at ${item.lostLocation}. ${item.description}`,
        location: item.lostLocation,
        date: item.dateLost,
        contact: item.contactNumber,
        urgent: true,
        image: item.image
      }));

      const foundAlerts = foundItems.map(item => ({
        id: item.id,
        type: "found", 
        title: `${item.itemName} Found`,
        description: `${item.itemName} found at ${item.foundLocation}. ${item.description}`,
        location: item.foundLocation,
        date: item.dateFound,
        contact: item.contactNumber,
        urgent: item.handoverOption === "police",
        image: item.image
      }));

      const allAlerts = [...lostAlerts, ...foundAlerts].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );

      // Calculate stats
      const statsData = {
        totalLost: lostItems.length,
        totalFound: foundItems.length,
        recoveredRate: foundItems.length > 0 ? 
          Math.round((foundItems.length / (lostItems.length + foundItems.length)) * 100) : 0,
        recentAlerts: allAlerts.length
      };

      setAlerts(allAlerts);
      setStats(statsData);
    };

    loadData();
  }, []);

  // ✅ Filter alerts based on search
  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Mark alert as resolved
  const markAsResolved = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    alert("✅ Alert marked as resolved!");
  };

  return (
    <div className="alerts-container">
      {/* ✅ Header with Stats */}
      <div className="alerts-header">
        <h2 className="alerts-title">🚨 Lost & Found Intelligence Center</h2>
        <p className="alerts-subtitle">
          Real-time tracking and recovery system for lost items across all stations
        </p>
        
        {/* Stats Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <h3>{stats.totalLost || 0}</h3>
              <p>Items Lost</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.totalFound || 0}</h3>
              <p>Items Found</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.recoveredRate || 0}%</h3>
              <p>Recovery Rate</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-info">
              <h3>{stats.recentAlerts || 0}</h3>
              <p>Active Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Search and Filter Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search by item, location, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button className="filter-btn active">All Alerts</button>
          <button className="filter-btn">Lost Items</button>
          <button className="filter-btn">Found Items</button>
          <button className="filter-btn">Urgent</button>
        </div>
      </div>

      {/* ✅ Real Alerts from Your Data */}
      <div className="alerts-list">
        <h3 className="section-title">📢 Live Alerts & Notifications</h3>
        
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <p>🚫 No alerts found matching your search</p>
            <small>Try different keywords or check back later</small>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className={`alert-item ${alert.type} ${alert.urgent ? 'urgent' : ''}`}>
              <div className="alert-header">
                <div className="alert-type-badge">
                  {alert.type === 'lost' ? '❌ LOST' : '✅ FOUND'}
                  {alert.urgent && <span className="urgent-badge">URGENT</span>}
                </div>
                <button 
                  className="resolve-btn"
                  onClick={() => markAsResolved(alert.id)}
                >
                  Mark Resolved
                </button>
              </div>
              
              <div className="alert-content">
                {alert.image && (
                  <img src={alert.image} alt="Item" className="alert-image" />
                )}
                
                <div className="alert-details">
                  <h3>{alert.title}</h3>
                  <p className="alert-description">{alert.description}</p>
                  
                  <div className="alert-meta">
                    <span className="meta-item">📍 {alert.location}</span>
                    <span className="meta-item">📅 {alert.date}</span>
                    {alert.contact && <span className="meta-item">📞 {alert.contact}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Sample Alerts (Fallback) */}
      {alerts.length === 0 && (
        <div className="alerts-list">
          <h3 className="section-title">📢 Sample Alerts (Demo)</h3>
          <div className="alert-item found urgent">
            <div className="alert-header">
              <div className="alert-type-badge">
                ✅ FOUND <span className="urgent-badge">URGENT</span>
              </div>
            </div>
            <div className="alert-content">
              <div className="alert-details">
                <h3>iPhone 14 Pro Found</h3>
                <p className="alert-description">
                  Black iPhone 14 Pro with silver edges found at Dadar Station near ticket counter. 
                  Has a cracked screen protector and blue case.
                </p>
                <div className="alert-meta">
                  <span className="meta-item">📍 Dadar Station</span>
                  <span className="meta-item">📅 2024-01-15</span>
                  <span className="meta-item">📞 9876543210</span>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-item lost">
            <div className="alert-header">
              <div className="alert-type-badge">❌ LOST</div>
            </div>
            <div className="alert-content">
              <div className="alert-details">
                <h3>Wallet with Important Documents</h3>
                <p className="alert-description">
                  Brown leather wallet containing Aadhar card, driving license, and credit cards. 
                  Lost somewhere between Platform 2 and 3 at CST Station.
                </p>
                <div className="alert-meta">
                  <span className="meta-item">📍 CST Station</span>
                  <span className="meta-item">📅 2024-01-14</span>
                  <span className="meta-item">📞 9876543211</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Enhanced Rules Section */}
      <div className="rules-section">
        <h2 className="rules-title">⚖️ Recovery Protocol & Guidelines</h2>
        
        <div className="rules-grid">
          <div className="rule-card">
            <div className="rule-icon">🆔</div>
            <h3>Identity Verification</h3>
            <p>Always carry valid government ID proof when claiming lost items. Photo ID mandatory for high-value items.</p>
          </div>
          
          <div className="rule-card">
            <div className="rule-icon">👮</div>
            <h3>Police Coordination</h3>
            <p>Valuable items must be immediately handed over to nearest police station for proper documentation.</p>
          </div>
          
          <div className="rule-card">
            <div className="rule-icon">⏰</div>
            <h3>Time Limits</h3>
            <p>Claim items within 30 days. Unclaimed items are donated to charity or auctioned after this period.</p>
          </div>
          
          <div className="rule-card">
            <div className="rule-icon">📝</div>
            <h3>Documentation</h3>
            <p>Detailed description and proof of ownership required. Photos, receipts, or unique identifiers help verification.</p>
          </div>
        </div>

        <div className="legal-notice">
          <h4>⚠️ Legal Notice</h4>
          <p>
            Misappropriation of lost property is punishable under Section 403 of IPC with imprisonment up to 2 years. 
            Always follow ethical practices and report found items immediately.
          </p>
        </div>
      </div>

      {/* ✅ Emergency Contacts */}
      <div className="emergency-section">
        <h2 className="emergency-title">🚨 Emergency Contacts</h2>
        <div className="contacts-grid">
          <div className="contact-card">
            <h3>Police Control Room</h3>
            <p className="contact-number">📞 100</p>
            <p>24/7 Emergency Response</p>
          </div>
          <div className="contact-card">
            <h3>Railway Police</h3>
            <p className="contact-number">📞 1322</p>
            <p>Railway Specific Issues</p>
          </div>
          <div className="contact-card">
            <h3>Women's Helpline</h3>
            <p className="contact-number">📞 1091</p>
            <p>Women Safety & Support</p>
          </div>
          <div className="contact-card">
            <h3>Ambulance</h3>
            <p className="contact-number">📞 108</p>
            <p>Medical Emergencies</p>
          </div>
        </div>
      </div>
    </div>
  );
}