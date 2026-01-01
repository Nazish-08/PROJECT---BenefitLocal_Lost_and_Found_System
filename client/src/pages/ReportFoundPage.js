import React, { useState } from "react";
import axios from "axios"; // ✅ YEH LINE ADD KARO
import { useNavigate } from "react-router-dom";
import "./FormPage.css";
import bgImage from "../assets/1.png";

export default function ReportFoundPage() {
  const navigate = useNavigate();

  // 🗓️ Helper functions
  const getToday = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const getFiveDaysAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - 5);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const today = getToday();
  const minDate = getFiveDaysAgo();

  const [formData, setFormData] = useState({
    yourName: "",
    itemName: "",
    description: "",
    foundLocation: "",
    dateFound: today,
    contactNumber: "",
    email: "",
    handoverOption: "police",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        alert("❗ Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setFormData((prev) => ({ ...prev, image: imageData }));
        setImagePreview(imageData);
        
        console.log("✅ Image loaded - Size:", imageData.length);
      };
      reader.onerror = () => {
        console.error("❌ Error reading image file");
        alert("❌ Error loading image. Please try another image.");
      };
      reader.readAsDataURL(file);
      return;
    }

    if (name === "contactNumber") {
      const cleaned = value.replace(/\D/g, "");
      const limited = cleaned.slice(0, 15);
      setFormData((prev) => ({ ...prev, contactNumber: limited }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.yourName.trim()) {
      alert("❗ Please enter your name.");
      return;
    }

    if (formData.dateFound < minDate || formData.dateFound > today) {
      alert("❗ Date must be within the last 5 days (including today).");
      return;
    }

    if (!formData.contactNumber || formData.contactNumber.length < 10) {
      alert("❗ Please enter a valid contact number (at least 10 digits).");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("❗ Please enter a valid email address.");
      return;
    }

    console.log("📸 Form Data before save:", {
      itemName: formData.itemName,
      hasImage: !!formData.image,
      imageSize: formData.image ? formData.image.length : 0
    });

    try {
      // ✅ LOCALSTORAGE MEIN SAVE
      const existingFoundReports = JSON.parse(localStorage.getItem("foundItems")) || [];
      const newFoundReport = { 
        ...formData, 
        reportedAt: new Date().toISOString(),
        id: Date.now()
      };
      
      existingFoundReports.push(newFoundReport);
      localStorage.setItem("foundItems", JSON.stringify(existingFoundReports));

      // ✅ PROJECT FOLDER MEIN SAVE (FastAPI through)
      const saveResponse = await axios.post('http://localhost:8000/save-found-item', newFoundReport);
      
      if (saveResponse.data.success) {
        alert("✅ Found item reported + Saved to project folder!");
        navigate("/home");
      } else {
        alert("❌ Error saving to server");
      }

    } catch (error) {
      console.error("❌ Error saving to localStorage:", error);
      alert("❌ Error saving report. Please try again.");
    }

    // Reset form
    setFormData({
      yourName: "",
      itemName: "",
      description: "",
      foundLocation: "",
      dateFound: today,
      contactNumber: "",
      email: "",
      handoverOption: "police",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div
      className="form-wrapper"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <form className="lost-found-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">📦 Report Found Item</h2>

        <input
          type="text"
          name="yourName"
          placeholder="Your Name"
          value={formData.yourName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="itemName"
          placeholder="Item Name (e.g., Wallet, Phone)"
          value={formData.itemName}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe the item (color, brand, details)"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="foundLocation"
          placeholder="Found Location (Station/Train)"
          value={formData.foundLocation}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dateFound"
          value={formData.dateFound}
          onChange={handleChange}
          required
          min={minDate}
          max={today}
        />

        <input
          type="tel"
          name="contactNumber"
          placeholder="Your Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email (optional)"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="handoverOption"
          value={formData.handoverOption}
          onChange={handleChange}
        >
          <option value="police">Handed over to Police</option>
          <option value="stationMaster">Given to Station Master</option>
          <option value="withMe">Still with me</option>
        </select>

        {/* Image Upload */}
        <div className="image-upload-section">
          <label>📷 Upload Item Image (Optional):</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <p>✅ Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ 
                width: "100%", 
                maxHeight: "200px", 
                objectFit: "cover", 
                marginTop: "10px", 
                borderRadius: "5px",
                border: "2px solid green"
              }}
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          📤 Submit Found Report
        </button>
      </form>
    </div>
  );
}