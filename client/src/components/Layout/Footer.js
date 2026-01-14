import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import "./Footer.css"

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left */}
        <div className="footer-box">
          <h2 className="footer-title">EMAD TELECOM</h2>
          <p className='text-white'>Your trusted mobile shop in Feni.</p>
          <p className="copyright text-info">
            © {currentYear} EMAD TELECOM | All Rights Reserved
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-box">
          <h3>Contact Us</h3>
          <p className='text-white'><FaMapMarkerAlt /> Hazari Road, Mohipal, Feni</p>
          <p className='text-white' ><FaPhoneAlt /> 01971676314</p>
          <p className='text-white'><FaEnvelope /> ohinnurfoisal@gmail.com</p>

          <div className="social">
            <a href="https://www.facebook.com/nur.foisal.ohin"><FaFacebook /></a>
            <a href="https://api.whatsapp.com/send/?phone=8801971676314&text&type=phone_number&app_absent=0"><FaWhatsapp /></a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
