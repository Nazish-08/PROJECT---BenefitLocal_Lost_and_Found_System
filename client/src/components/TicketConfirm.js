import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TicketConfirm.css";

const TicketConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    source, 
    destination, 
    trainType,
    ticketClass,
    passengers, 
    date, 
    time,
    returnTicket,
    returnDate,
    fare, 
    pnr,
    bookingTime,
    trainDetails
  } = location.state || {};

  const downloadTicket = () => {
    const ticketContent = `
      MUMBAI LOCAL RAILWAYS
      =====================
      PNR: ${pnr}
      From: ${source}
      To: ${destination}
      Date: ${date}
      Time: ${time}
      Passengers: ${passengers}
      Class: ${ticketClass}
      Train: ${trainType}
      Total Fare: ₹${fare}
      Booking Time: ${bookingTime}
      ${returnTicket ? `Return Date: ${returnDate}` : ''}
      
      ✅ Ticket Confirmed
      Have a safe journey!
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${pnr}.txt`;
    a.click();
  };

  const shareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Train Ticket',
        text: `I've booked a ticket from ${source} to ${destination} on ${date}`,
        url: window.location.href,
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  return (
    <div className="confirm-container">
      <div className="confirmation-header">
        <div className="success-icon">✅</div>
        <h2>Ticket Booked Successfully!</h2>
        <p>Your journey is confirmed. Have a safe trip! 🚆</p>
      </div>

      <div className="ticket-card">
        <div className="ticket-header">
          <div className="ticket-pnr">
            <strong>PNR: {pnr}</strong>
          </div>
          <div className="ticket-status confirmed">CONFIRMED</div>
        </div>

        <div className="route-info">
          <div className="station source">
            <div className="station-name">{source}</div>
            <div className="station-time">{time}</div>
          </div>
          
          <div className="journey-line">
            <div className="train-icon">🚆</div>
            <div className="journey-duration">45 mins</div>
          </div>

          <div className="station destination">
            <div className="station-name">{destination}</div>
            <div className="station-time">{/* Arrival time */}</div>
          </div>
        </div>

        <div className="ticket-details-grid">
          <div className="detail-item">
            <span className="detail-label">📅 Date:</span>
            <span className="detail-value">{date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">👥 Passengers:</span>
            <span className="detail-value">{passengers}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🎯 Train Type:</span>
            <span className="detail-value">{trainType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">💺 Class:</span>
            <span className="detail-value">{ticketClass}</span>
          </div>
          {returnTicket && (
            <div className="detail-item">
              <span className="detail-label">🔄 Return:</span>
              <span className="detail-value">{returnDate}</span>
            </div>
          )}
        </div>

        <div className="fare-section">
          <div className="fare-total">
            <span>Total Fare Paid:</span>
            <span className="fare-amount">₹{fare}</span>
          </div>
        </div>

        <div className="booking-meta">
          <div className="meta-item">
            <span>Booking Time:</span>
            <span>{bookingTime}</span>
          </div>
          <div className="meta-item">
            <span>Ticket ID:</span>
            <span>{pnr}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-download" onClick={downloadTicket}>
          📥 Download Ticket
        </button>
        <button className="btn-share" onClick={shareTicket}>
          📤 Share Ticket
        </button>
        <button className="btn-again" onClick={() => navigate("/book-ticket")}>
          🎫 Book Another Ticket
        </button>
      </div>

      <div className="important-info">
        <h4>⚠️ Important Information</h4>
        <ul>
          <li>Carry valid ID proof during journey</li>
          <li>Arrive at station 30 minutes before departure</li>
          <li>Ticket is valid only for the specified date and train</li>
          <li>Keep this PNR safe for any queries: <strong>{pnr}</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default TicketConfirm;