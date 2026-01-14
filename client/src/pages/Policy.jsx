import React from "react";
import Layout from "../components/Layout/Layout";
import "./Policy.css";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy -> Emad Telecom"} description="Read Emad Telecom's privacy policy. Your personal data is safe. We sell mobiles, accessories, repair services, and second-hand devices."
     keywords="Mobile, Accessories, Repair, Second Hand Phones, Privacy Policy, Feni" >


      <div className="policy-page">
        {/* HERO */}
        <section className="hero">
          <img
            src="/images/privacy-banner.jpg"
            alt="Privacy Policy"
            className="hero-img"
          />
        </section>

        {/* CONTENT */}
        <section className="policy-content">

          <div className="policy-card">
            <h2>Information We Collect</h2>
            <p>
              We collect personal information such as your name, phone number,
              email address, and delivery details to process orders and provide
              customer support efficiently.
            </p>
          </div>

          <div className="policy-card">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To process and deliver your orders</li>
              <li>To provide customer support and updates</li>
              <li>To improve our products and services</li>
              <li>To communicate offers and important notices</li>
            </ul>
          </div>

          <div className="policy-card">
            <h2>Data Protection & Security</h2>
            <p>
              We use appropriate security measures to protect your personal
              data. Your information is never sold, traded, or shared with
              third parties without consent.
            </p>
          </div>

          <div className="policy-card">
            <h2>Cookies & Tracking</h2>
            <p>
              Our website may use cookies to enhance user experience, analyze
              traffic, and improve functionality. You can disable cookies from
              your browser settings at any time.
            </p>
          </div>

          <div className="policy-card">
            <h2>Contact Information</h2>
            <p>
              📍 Hazari Road, Mohipal, Feni <br />
              📞 +8801971676314 <br />
              ✉️ support@emadtelecom.com
            </p>
          </div>

        </section>
      </div>
    </Layout>
  );
};

export default Policy;
