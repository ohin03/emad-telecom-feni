import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "./AdminDashboard.css";
import { 
  FaUserShield, FaEnvelope, FaPhoneAlt, 
  FaBoxOpen, FaUsers, FaChartLine, FaEdit, FaTimes 
} from "react-icons/fa";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  // Function to handle Edit (Currently opens modal)
  const handleEditToggle = () => setShowEditModal(!showEditModal);

  return (
    <Layout title={"Admin Panel - Emad Telecom"}>
      <div className="admin-pro-wrapper">
        <div className="container-fluid p-lg-5 p-md-3">
          <div className="row g-4">
            
            {/* --- SIDEBAR --- */}
            <div className="col-lg-3">
              <div className="sidebar-glass">
                <AdminMenu />
              </div>
            </div>

            {/* --- MAIN PANEL --- */}
            <div className="col-lg-9">
              
              {/* HEADER SECTION */}
              <header className="dashboard-header d-flex justify-content-between align-items-center mb-4">
                <div className="title-area">
                  <h1 className="fw-bold">Management Dashboard</h1>
                  <p className="text-muted">Overview of your telecom business operations</p>
                </div>
                <div className="date-badge">
                  {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </header>

       
            

              {/* PROFILE CONTROL CENTER */}
              <div className="profile-master-card shadow-sm">
                <div className="card-top-bar">
                  <div className="d-flex align-items-center gap-2">
                    <div className="status-pulse"></div>
                    <h5 className="m-0 fw-bold">Admin Authority Profile</h5>
                  </div>
                  <button className="pro-edit-btn" onClick={handleEditToggle}>
                    <FaEdit className="me-2" /> Edit Profile
                  </button>
                </div>

                <div className="profile-grid">
                  <div className="profile-item">
                    <label>Administrator</label>
                    <h6>{auth?.user?.name}</h6>
                  </div>
                  <div className="profile-item">
                    <label>Verified Email</label>
                    <h6>{auth?.user?.email}</h6>
                  </div>
                  <div className="profile-item">
                    <label>Contact Liaison</label>
                    <h6>{auth?.user?.phone || "+880 xxxxxxxxxx"}</h6>
                  </div>
                  <div className="profile-item">
                    <label>Role</label>
                    <span className="role-tag">Super Admin</span>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS SECTION */}
              <div className="mt-5">
                <h5 className="fw-bold mb-3">System Health</h5>
                <div className="system-status-bar shadow-sm">
                  <div className="status-item text-success">● Server Online</div>
                  <div className="status-item text-primary">● Database Synced</div>
                  <div className="status-item text-warning">● Notifications</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- EDIT PROFILE MODAL --- */}
        {showEditModal && (
          <div className="pro-modal-overlay">
            <div className="pro-modal-content animate-pop">
              <div className="modal-header-pro">
                <h5>Update Profile</h5>
                <button className="close-btn" onClick={handleEditToggle}><FaTimes /></button>
              </div>
              <form className="p-4">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="modal-input" defaultValue={auth?.user?.name} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="modal-input" defaultValue={auth?.user?.phone} />
                </div>
                <button type="button" className="save-changes-btn w-100">Save Changes</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;