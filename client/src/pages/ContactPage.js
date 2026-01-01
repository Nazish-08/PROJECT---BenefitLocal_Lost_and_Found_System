import React from "react";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">📞 Contact Us</h2>
      <p className="contact-intro">
        Have questions, suggestions, or need help? We’d love to hear from you!  
        Fill out the form below or reach us through the provided details.
      </p>

      <div className="contact-content">
        {/* Left side: Contact Form */}
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Right side: Contact Info */}
        <div className="contact-info">
          <h3>📍 Get in Touch</h3>
          <p>
            <strong>Email:</strong> support@benefitlocal.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <strong>Address:</strong> BenefitLocal HQ, CST Railway Station, Mumbai
          </p>

          <h3>⏰ Working Hours</h3>
          <p>Monday – Saturday: 9 AM – 7 PM</p>
          <p>Sunday: Closed</p>

          <h3>⚠️ Note</h3>
          <p>
            If you find an unclaimed item, please hand it over to the nearest{" "}
            <strong>Police Station</strong> or <strong>Station Master</strong> 
            after reporting it here.
          </p>
        </div>
      </div>
    </div>
  );
}
