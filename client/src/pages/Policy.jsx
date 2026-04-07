import React from "react";
import Layout from "../components/Layout/Layout";
import "./Policy.css";
import { 
  FaShieldAlt, 
  FaUserLock, 
  FaDatabase, 
  FaCookieBite, 
  FaHeadset, 
  FaGavel, 
  FaCheckCircle, 
  FaBalanceScale 
} from "react-icons/fa";

const Policy = () => {
  return (
    <Layout 
      title={"Privacy Policy | Emad Telecom"} 
      description="Your privacy is our top priority. Read how Emad Telecom handles your data securely."
    >
      <div className="policy-page-final">
        
        {/* ================= PURE CSS PRO HERO ================= */}
        <section className="policy-hero-gradient">
          <div className="container">
            <div className="hero-flex-pro">
              <div className="hero-text-pro">
                <div className="trust-badge-pro">
                  <FaShieldAlt className="me-2" /> 
                  100% Data Protection
                </div>
                <h1 className="hero-title-final">Privacy & <br/><span>Security</span> Center</h1>
                <p className="hero-sub-final">Transparency is the core of Emad Telecom.</p>
              </div>
              <div className="hero-visual-pro">
                <div className="floating-icon icon-1"><FaUserLock /></div>
                <div className="floating-icon icon-2"><FaDatabase /></div>
                <div className="floating-icon icon-3"><FaCookieBite /></div>
              </div>
            </div>
          </div>
          {/* Background Decorative Gradient Shapes */}
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </section>

        {/* ================= CONTENT MAIN SECTION ================= */}
        <section className="policy-content-final">
          <div className="container">
            <div className="row g-4 justify-content-center">
              
              {/* Card 1: Data Collection */}
              <div className="col-lg-4 col-md-6">
                <div className="policy-card-final h-100">
                  <div className="card-head-pro">
                    <FaUserLock className="card-icon-pro" />
                    <h4>Data Collection</h4>
                  </div>
                  <p>We collect essential information to process your orders and provide seamless customer support.</p>
                  <ul className="pro-check-list">
                    <li><FaCheckCircle /> Name & Number</li>
                    <li><FaCheckCircle /> Shipping Address</li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Data Usage */}
              <div className="col-lg-4 col-md-6">
                <div className="policy-card-final h-100 shadow-teal-glow">
                  <div className="card-head-pro">
                    <FaDatabase className="card-icon-pro" />
                    <h4>Data Usage</h4>
                  </div>
                  <p>Your information is used strictly for order fulfillment, warranty tracking, and service updates.</p>
                  <ul className="pro-check-list">
                    <li><FaCheckCircle /> 100% Shared Control</li>
                    <li><FaCheckCircle /> Safe Payment Process</li>
                  </ul>
                </div>
              </div>

              {/* Card 3: Refund Policy */}
              <div className="col-lg-4 col-md-6">
                <div className="policy-card-final h-100">
                  <div className="card-head-pro">
                    <FaGavel className="card-icon-pro" />
                    <h4>Refund Policy</h4>
                  </div>
                  <p>Repairs carry a 7-day testing warranty. Returns for new products follow brand policies.</p>
                  <ul className="pro-check-list">
                    <li><FaCheckCircle /> Easy Returns</li>
                    <li><FaCheckCircle /> Quick Refunds</li>
                  </ul>
                </div>
              </div>

              {/* Card 4: Detailed Terms & Legal */}
              <div className="col-12 mt-5">
                <div className="glass-terms-box">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaBalanceScale className="text-teal" size={30} />
                    <h3 className="mb-0 fw-bold">Terms of Data Protection</h3>
                  </div>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <p><b>User Data Rights:</b> You have the full right to access, rectify, or delete your personal data from our database at any time. Simply request data removal by emailing us.</p>
                    </div>
                    <div className="col-md-6">
                      <p><b>Cookies:</b> We use cookies to improve your user experience on our website. Cookies help us analyze web traffic and personalize content for you.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Contact Legal */}
              <div className="col-12 mt-4">
                <div className="pro-contact-banner">
                  <div className="d-flex align-items-center gap-4 flex-wrap">
                    <div className="support-badge"><FaHeadset /></div>
                    <div className="text-pro-box">
                      <h4>Have Questions? Contact Legal Support</h4>
                      <p>Our legal team is available for any clarification: <b>support@emadtelecom.com</b></p>
                    </div>
                    <button className="pro-btn-final ms-lg-auto" onClick={() => window.location.href='/contact'}>Get Support</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Policy;