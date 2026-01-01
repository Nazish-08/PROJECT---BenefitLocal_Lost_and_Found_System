import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookTicket.css";

const BookTicket = () => {
  const navigate = useNavigate();

  const stations = [
    "CST Mumbai", "Dadar", "Thane", "Kalyan", "Kurla", 
    "Borivali", "Andheri", "Virar", "Panvel", "Vashi",
    "Churchgate", "Bandra", "Khar Road", "Santacruz", "Ghatkopar",
    "Mulund", "Nahur", "Bhandup", "Kanjur Marg", "Vikhroli"
  ];

  const trainTypes = [
    { id: "local", name: "Local Train", icon: "🚆", multiplier: 1 },
    { id: "express", name: "Express Local", icon: "🚄", multiplier: 1.5 },
    { id: "ac", name: "AC Local", icon: "❄️", multiplier: 2.5 }
  ];

  const ticketClasses = [
    { id: "general", name: "General", icon: "💺", multiplier: 1 },
    { id: "first", name: "First Class", icon: "⭐", multiplier: 2 },
    { id: "ladies", name: "Ladies Special", icon: "👩", multiplier: 1 }
  ];

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    trainType: "local",
    ticketClass: "general",
    passengers: 1,
    date: "",
    time: "",
    returnTicket: false,
    returnDate: ""
  });

  const [availableTrains, setAvailableTrains] = useState([]);
  const [showTrains, setShowTrains] = useState(false);

  useEffect(() => {
    if (formData.source && formData.destination) {
      // Simulate train availability
      const trains = [
        { id: 1, name: "Fast Local", departure: "08:30", duration: "45 mins", seats: "Available" },
        { id: 2, name: "Express", departure: "09:15", duration: "35 mins", seats: "Limited" },
        { id: 3, name: "AC Local", departure: "10:00", duration: "40 mins", seats: "Available" }
      ];
      setAvailableTrains(trains);
    }
  }, [formData.source, formData.destination]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ✅ Advanced fare calculation
  const calculateFare = () => {
    if (!formData.source || !formData.destination) return 0;
    
    const distance = Math.abs(stations.indexOf(formData.source) - stations.indexOf(formData.destination)) * 5;
    const baseFare = 10;
    const trainMultiplier = trainTypes.find(t => t.id === formData.trainType)?.multiplier || 1;
    const classMultiplier = ticketClasses.find(c => c.id === formData.ticketClass)?.multiplier || 1;
    
    let fare = (baseFare + distance) * trainMultiplier * classMultiplier * formData.passengers;
    
    if (formData.returnTicket) {
      fare *= 1.8; // Return ticket discount
    }
    
    return Math.round(fare);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fare = calculateFare();
    
    // Generate PNR
    const pnr = "PNR" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    navigate("/ticket-confirm", { 
      state: { 
        ...formData, 
        fare,
        pnr,
        bookingTime: new Date().toLocaleString(),
        trainDetails: availableTrains[0] || {}
      } 
    });
  };

  const fare = calculateFare();

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h2>🚆 Book Mumbai Local Train Ticket</h2>
        <p>Fast, Secure & Convenient Ticket Booking</p>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        {/* Route Selection */}
        <div className="form-section">
          <h3>📍 Journey Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Source Station</label>
              <select name="source" value={formData.source} onChange={handleChange} required>
                <option value="">-- Select Source --</option>
                {stations.map((station, index) => (
                  <option key={index} value={station}>{station}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Destination Station</label>
              <select name="destination" value={formData.destination} onChange={handleChange} required>
                <option value="">-- Select Destination --</option>
                {stations.map((station, index) => (
                  <option key={index} value={station}>{station}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Train Type & Class */}
        <div className="form-section">
          <h3>🎯 Train Preferences</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Train Type</label>
              <div className="option-grid">
                {trainTypes.map(train => (
                  <label key={train.id} className="option-card">
                    <input
                      type="radio"
                      name="trainType"
                      value={train.id}
                      checked={formData.trainType === train.id}
                      onChange={handleChange}
                    />
                    <div className="option-content">
                      <span className="option-icon">{train.icon}</span>
                      <span className="option-text">{train.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Ticket Class</label>
              <div className="option-grid">
                {ticketClasses.map(cls => (
                  <label key={cls.id} className="option-card">
                    <input
                      type="radio"
                      name="ticketClass"
                      value={cls.id}
                      checked={formData.ticketClass === cls.id}
                      onChange={handleChange}
                    />
                    <div className="option-content">
                      <span className="option-icon">{cls.icon}</span>
                      <span className="option-text">{cls.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Passenger & Date */}
        <div className="form-section">
          <h3>👥 Passenger Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Number of Passengers</label>
              <div className="passenger-selector">
                <button 
                  type="button" 
                  className="passenger-btn"
                  onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                >
                  -
                </button>
                <span className="passenger-count">{formData.passengers}</span>
                <button 
                  type="button" 
                  className="passenger-btn"
                  onClick={() => setFormData(prev => ({ ...prev, passengers: prev.passengers + 1 }))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Travel Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Return Ticket */}
        <div className="form-section">
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="returnTicket"
                checked={formData.returnTicket}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              🔄 Book Return Ticket
            </label>
          </div>

          {formData.returnTicket && (
            <div className="form-group">
              <label>Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                min={formData.date}
                required
              />
            </div>
          )}
        </div>

        {/* Fare Summary */}
        <div className="fare-summary">
          <h3>💰 Fare Breakdown</h3>
          <div className="fare-details">
            <div className="fare-row">
              <span>Base Fare:</span>
              <span>₹{Math.round(fare / (formData.trainType === 'ac' ? 2.5 : formData.trainType === 'express' ? 1.5 : 1))}</span>
            </div>
            {formData.trainType !== 'local' && (
              <div className="fare-row">
                <span>{trainTypes.find(t => t.id === formData.trainType)?.name} Surcharge:</span>
                <span>+₹{Math.round(fare * 0.3)}</span>
              </div>
            )}
            {formData.ticketClass === 'first' && (
              <div className="fare-row">
                <span>First Class Premium:</span>
                <span>+₹{Math.round(fare * 0.5)}</span>
              </div>
            )}
            {formData.returnTicket && (
              <div className="fare-row">
                <span>Return Ticket Discount:</span>
                <span>-₹{Math.round(fare * 0.2)}</span>
              </div>
            )}
            <div className="fare-total">
              <span>Total Amount:</span>
              <span className="total-amount">₹{fare}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          🎫 Book Ticket for ₹{fare}
        </button>
      </form>
    </div>
  );
};

export default BookTicket;