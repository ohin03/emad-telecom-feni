import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "8801971676314";
    const text = `New Contact Message
Name: ${name}
Email: ${email}
Message: ${message}`;

    window.open(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (
    <Layout
      title={"Contact us -> Emad Telecom"}
      description="Get in touch with Emad Telecom. Visit our store in Feni for mobile phones, accessories, repairs, and second-hand devices."
      keywords="Mobile, Accessories, Repair, Second Hand Phones, Contact, Feni, Mobile Shop"
    >
      <div className="contact-page">
        {/* ================= HERO / CAROUSEL ================= */}
        <section className="contact-hero">
          <div
            id="contactHeroCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            {/* indicators */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#contactHeroCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
              ></button>
              <button
                type="button"
                data-bs-target="#contactHeroCarousel"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#contactHeroCarousel"
                data-bs-slide-to="2"
              ></button>
            </div>

            {/* slides */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/images/home-banner2.png"
                  className="d-block w-100 hero-img"
                  alt="Banner 1"
                />
              </div>

              <div className="carousel-item">
                <img
                  src="/images/home-banner-3.png"
                  className="d-block w-100 hero-img"
                  alt="Banner 2"
                />
              </div>

              <div className="carousel-item">
                <img
                  src="/images/contact-banner3.png"
                  className="d-block w-100 hero-img"
                  alt="Banner 3"
                />
              </div>
            </div>

            {/* controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#contactHeroCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-dark"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#contactHeroCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-dark"></span>
            </button>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="contact-content">
          {/* LEFT */}
          <div className="contact-left">
            <img
              src="/images/shop-photo.jpg"
              alt="Emad Telecom Shop"
              className="shop-img"
            />

            <h2>Visit Our Store</h2>
            <p><FaMapMarkerAlt /> Hazari Road, Mohipal, Feni</p>
            <p><FaPhoneAlt /> +8801971676314</p>
            <p><FaEnvelope /> ohinurfoisal@gmail.com</p>

            <div className="social-links">
              <a
                href="https://api.whatsapp.com/send/?phone=8801971676314"
                className="whatsapp"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <a
                href="https://www.facebook.com/nur.foisal.ohin"
                className="facebook"
              >
                <FaFacebook /> Facebook
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-right">
            <h2>Send Message</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>

              <button type="submit">
                <FaWhatsapp /> Send via WhatsApp
              </button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
