import React, { useEffect, useState } from "react";

export default function FoundItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("foundItems")) || [];
    setItems(stored);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 All Reported Found Items</h2>
      {items.length === 0 ? (
        <p>No found items reported yet.</p>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #333",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: "#1a1a1a",
              color: "#e0e0e0"
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt="Found Item"
                style={{ width: "100%", maxHeight: "200px", borderRadius: "8px", marginBottom: "10px" }}
              />
            )}
            <h3 style={{ color: "#ffc107" }}>{item.itemName}</h3>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Found Location:</b> {item.foundLocation}</p>
            <p><b>Date Found:</b> {item.dateFound}</p>
            <p><b>Contact:</b> {item.contactNumber}</p>
            <p><b>Email:</b> {item.email || "N/A"}</p>
            <p><b>Handover:</b> {item.handoverOption}</p>
          </div>
        ))
      )}
    </div>
  );
}
