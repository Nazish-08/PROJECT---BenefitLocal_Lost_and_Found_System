import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h2 className="about-title">ℹ️ About BenefitLocal</h2>
      <p className="about-intro">
        BenefitLocal is a community-driven initiative designed to help railway
        commuters recover their lost belongings quickly and responsibly.  
        Our mission is to build a safer, more supportive travel experience by
        connecting people with their lost items across local train stations.
      </p>

      <div className="about-section">
        <h3>🌟 Our Vision</h3>
        <p>
          To create a reliable digital platform where commuters can report and
          find lost belongings, ensuring honesty, security, and accessibility
          for everyone.
        </p>
      </div>

      <div className="about-section">
        <h3>🚆 How It Works</h3>
        <ul>
          <li>Report your lost or found item easily via our platform.</li>
          <li>
            Check real-time alerts to see if your belongings have been reported.
          </li>
          <li>
            Verified handover process ensures items are safely returned to their
            rightful owners.
          </li>
          <li>
            Items that remain unclaimed must be handed over to the nearest{" "}
            <strong>police station</strong> or <strong>station master</strong>.
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h3>🤝 Community Contribution</h3>
        <p>
          BenefitLocal is not just a platform — it's a community effort. We
          encourage commuters to act responsibly:
        </p>
        <ul>
          <li>
            If you find an item, submit a report instead of keeping it.
          </li>
          <li>
            Always hand over valuables like jewelry, electronics, or wallets to
            the authorities if the owner cannot be located.
          </li>
          <li>
            Spread awareness among fellow passengers about lost & found safety.
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h3>💡 Why BenefitLocal?</h3>
        <p>
          Every year, thousands of items are lost in local trains, causing
          stress and inconvenience to commuters. With BenefitLocal, we aim to:
        </p>
        <ul>
          <li>Reduce loss anxiety for daily commuters.</li>
          <li>
            Build trust between passengers, authorities, and the community.
          </li>
          <li>
            Promote transparency and accountability in lost & found management.
          </li>
        </ul>
      </div>

      <div className="about-footer">
        <p>
          Together, we can make our local journeys safer and more reliable. 🚉  
          <br />
          <strong>BenefitLocal – Because every item matters!</strong>
        </p>
      </div>
    </div>
  );
}
