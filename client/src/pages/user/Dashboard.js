import React from 'react';
import Layout from './../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { AiOutlineUser, AiOutlineMail, AiOutlineHome, AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import "./Dashboard.css";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={'User Dashboard - Emad Telecom'}>
      <div className='dashboard-page'>
        <div className="container-fluid py-5 px-md-5">
          <div className="row">
            
            {/* --- SIDEBAR MENU --- */}
            <div className="col-md-3 mb-4">
              <div className="menu-glass-wrapper">
                <UserMenu />
              </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="col-md-9">
              <div className="dashboard-main-content">
                
                {/* 1. Welcome Header */}
                <div className="welcome-card animate-fadeIn">
                  <div className="welcome-text">
                    <h2>Hello, {auth?.user?.name.split(' ')[0]}! <HiOutlineBadgeCheck className="verified-icon" /></h2>
                   <p>Welcome to your dashboard. Here you can manage your orders, update your profile, and track your activity.</p>
                  </div>
                  <div className="user-avatar-circle">
                    {auth?.user?.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* 2. Info Grid Card */}
                <div className="info-grid-container mt-4">
                  <div className="profile-detail-card">
                    <div className="card-header-pro">
                      <h5>Account Information</h5>
                      <span className="status-badge">Active</span>
                    </div>
                    
                    <div className="info-row">
                      <div className="info-item">
                        <label><AiOutlineUser /> Full Name</label>
                        <p>{auth?.user?.name}</p>
                      </div>
                      <div className="info-item">
                        <label><AiOutlineMail /> Email Address</label>
                        <p>{auth?.user?.email}</p>
                      </div>
                    </div>

                    <div className="info-row">
                      <div className="info-item">
                        <label><AiOutlinePhone /> Phone Number</label>
                        <p>{auth?.user?.phone || "Not Provided"}</p>
                      </div>
                      <div className="info-item">
                        <label><AiOutlineHome /> Shipping Address</label>
                        <p>{auth?.user?.address || "No Address Saved"}</p>
                      </div>
                    </div>

                    <button className="edit-profile-btn " onClick={() => window.location.href='/dashboard/user/profile'}>
                      Update Profile Info
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;