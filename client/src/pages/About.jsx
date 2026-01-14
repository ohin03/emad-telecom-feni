import React from 'react'
import Layout from '../components/Layout/Layout'
import "./About.css"
import { FaMobileAlt, FaUsers, FaStar, FaTools } from "react-icons/fa";
function About() {
  return (
    <Layout title="About Us -> Emad Telecom" description="Learn about Emad Telecom, the trusted mobile shop in Feni. Original mobile phones, accessories, repair services, and second-hand devices."
    keywords="Mobile, Accessories, Repair, Second Hand Phones, Smartphones, Feni, Mobile Shop">

      
    <div className="about-page">
      {/* ===== HERO ===== */}
      <section className="about-bg">
        <div className="glass-box">

          <h1>About Emad Telecom</h1>
          <p className="subtitle">
            Trusted Mobile Shop & Accessories Store in Feni Since 2018
          </p>

          {/* ===== IMAGE + TEXT ===== */}
          {/* ===== WHO WE ARE ===== */}
<div className="about-intro">

  {/* Image Gallery */}
  <div className="about-images">
    <img
      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
      alt="Mobile shop"
    />
    <img
      src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
      alt="Mobile accessories"
    />
    <img
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      alt="Customer service"
    />
  </div>

  {/* Text */}
  <div className="about-text">
    <h2>Who We Are</h2>
    <p>
      Emad Telecom is a trusted mobile shop located at Hazari Road, Mohipal,
      Feni. Since 2018, we have been providing original smartphones,
      accessories, and professional mobile services.
    </p>

    <p>
      Our goal is to ensure quality products, honest pricing, and excellent
      customer service for every customer.
    </p>
  </div>

</div>

          {/* ===== FEATURES ===== */}
          <div className="about-features">
            <div className="feature-card">
              <FaMobileAlt />
              <h3>Original Products</h3>
              <p>
                We sell authentic smartphones and accessories with proper
                quality assurance.
              </p>
            </div>

            <div className="feature-card">
              <FaTools />
              <h3>Expert Service</h3>
              <p>
                Mobile repair, software update, and customer support by skilled
                technicians.
              </p>
            </div>

            <div className="feature-card">
              <FaUsers />
              <h3>Customer Trust</h3>
              <p>
                Thousands of satisfied customers trust Emad Telecom every year.
              </p>
            </div>

            <div className="feature-card">
              <FaStar />
              <h3>Best Experience</h3>
              <p>
                Friendly service, honest advice, and long-term relationships.
              </p>
            </div>
          </div>

          {/* ===== EXTRA SECTION ===== */}
          <div className="about-extra">
            <h2>Why Choose Emad Telecom?</h2>
            <p>
              We believe business is built on trust. Our goal is not just to sell
              products, but to build long-term relationships with our customers
              by offering the best value and service.
            </p>

            <p>
              Whether you are buying a new phone or need reliable service, Emad
              Telecom is always ready to help.
            </p>
          </div>

        </div>
         </section>
         </div>
         {/* ===== CUSTOMER REVIEWS ===== */}
<div className="review-section">
  <h2>What Our Customers Say</h2>

  <div className="review-grid">
    <div className="review-card">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Customer"
      />
      <h4>Arif Hossain</h4>
      <p className="stars">★★★★★</p>
      <p>
        Very trusted shop. I bought my phone from Emad Telecom and got original
        product with good price.
      </p>
    </div>

    <div className="review-card">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Customer"
      />
      <h4>Sabina Akter</h4>
      <p className="stars">★★★★★</p>
      <p>
        Their customer service is excellent. Highly recommended for mobile and
        accessories.
      </p>
    </div>

    <div className="review-card">
      <img
        src="https://randomuser.me/api/portraits/men/65.jpg"
        alt="Customer"
      />
      <h4>Rakib Ahmed</h4>
      <p className="stars">★★★★☆</p>
      <p>
        Good behavior and honest advice. Repair service was fast and reliable.
      </p>
    </div>
  </div>
</div>
    </Layout>
  )
}

export default About
