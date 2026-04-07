import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myWhatsApp = "8801971676314";
    const text = `*New Lead - Emad Telecom Web*%0A%0A👤 *Name:* ${name}%0A📞 *Phone:* ${phone}%0A💬 *Message:* ${message}`;
    window.open(`https://wa.me/${myWhatsApp}?text=${text}`, "_blank");
  };

  return (
    <Layout title={"Contact Us | Emad Telecom"}>
      <div className="contact-main-wrapper">
        
        {/* ================= BANNER SECTION ================= */}
        <section className="banner-section">
          <div id="contactCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/contact-banner2.png" className="banner-img" alt="Banner 1" />
              </div>
              <div className="carousel-item">
                <img src="/images/home-banner2.png" className="banner-img" alt="Banner 2" />
              </div>
              <div className="carousel-item">
                <img src="/images/home-banner-3.png" className="banner-img" alt="Banner 3" />
              </div>
            </div>
            {/* Pro Navigation Buttons */}
            <button className="carousel-control-prev pro-nav" type="button" data-bs-target="#contactCarousel" data-bs-slide="prev">
              <span className="nav-arrow">‹</span>
            </button>
            <button className="carousel-control-next pro-nav" type="button" data-bs-target="#contactCarousel" data-bs-slide="next">
              <span className="nav-arrow">›</span>
            </button>
          </div>
        </section>

        {/* ================= CONTACT FORM & INFO ================= */}
        <section className="content-section">
          <div className="container">
            <div className="contact-card shadow-lg">
              <div className="row g-0">
                {/* Left Side: Gradient Info */}
                <div className="col-lg-5 info-side">
                  <div className="info-content">
                    <h2 className="fw-bold">Contact Info</h2>
                    <p className="mb-5 opacity-75">Visit our shop or send a message for any inquiries.</p>
                    
                    <div className="contact-item">
                      <div className="icon-box"><FaMapMarkerAlt /></div>
                      <div>
                        <h6>Store Location</h6>
                        <p>Hazari Road, Mohipal Junction, Feni</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="icon-box"><FaPhoneAlt /></div>
                      <div>
                        <h6>Call Us</h6>
                        <p>+880 1971-676314</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="icon-box"><FaEnvelope /></div>
                      <div>
                        <h6>Email Us</h6>
                        <p>ohinurfoisal@gmail.com</p>
                      </div>
                    </div>

                    <div className="social-box mt-5">
                      <a href="https://wa.me/8801971676314" className="social-link wa"><FaWhatsapp /></a>
                      <a href="https://facebook.com/nur.foisal.ohin" className="social-link fb"><FaFacebook /></a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-lg-7 form-side">
                  <div className="form-content">
                    <h3 className="fw-bold mb-4" style={{color: "#0fb9b1"}}>Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Your Name</label>
                        <input type="text" className="pro-input" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" className="pro-input" placeholder="017XXXXXXXX" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Your Message</label>
                        <textarea className="pro-input" rows="4" placeholder="How can we help you?" value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                      </div>
                      <button type="submit" className="pro-btn">
                        <span>Send to WhatsApp</span> <FaPaperPlane className="ms-2" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ACCURATE MAP SECTION ================= */}
        <section className="map-section container py-5">
          <div className="map-wrapper shadow">
            {/* Mohipal Flyover & Hajari Road Junction, Feni */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.365319808608!2d91.38573197592471!3d23.010376266100257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37536b94040e34b9%3A0xc3f173b22b0c16b!2sMohipal%20Junction!5e0!3m2!1sen!2sbd!4v1712497800000!5m2!1sen!2sbd"
              width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;