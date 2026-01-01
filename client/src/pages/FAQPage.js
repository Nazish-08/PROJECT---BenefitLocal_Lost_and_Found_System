import React, { useState } from "react";
import "./FAQPage.css";

const faqs = [
  {
    question: "How do I report a lost item?",
    answer: "Go to the 'Report Lost Item' page, fill in the details, and submit the form. Our system will keep track of your report."
  },
  {
    question: "How do I report a found item?",
    answer: "Click on 'Report Found Item' and provide the details of the item. If possible, hand it over to the station master or nearest police station."
  },
  {
    question: "How can I track my report?",
    answer: "Navigate to 'Track My Report' and enter your registered phone number or report ID to view updates."
  },
  {
    question: "What happens if my lost item is found?",
    answer: "You will receive a notification via SMS or email. You can then collect your item from the designated location."
  },
  {
    question: "What if I find an item but cannot hand it over immediately?",
    answer: "Please keep the item safe and hand it over to the nearest police station or station master as soon as possible after reporting it on BenefitLocal."
  },
  {
    question: "Is this service free?",
    answer: "Yes ✅ BenefitLocal is a free community-driven service to help commuters recover their belongings."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">❓ Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
