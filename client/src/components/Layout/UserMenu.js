import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaShoppingBag, FaUserEdit, FaChevronRight } from 'react-icons/fa';
import "./UserMenu.css";

const UserMenu = () => {
  // Active Link logic for React Router v6
  const activeLink = ({ isActive }) => ({
    background: isActive ? 'linear-gradient(135deg, #0fb9b1 0%, #079992 100%)' : 'transparent',
    color: isActive ? '#fff' : '#4b5563',
    boxShadow: isActive ? '0 8px 15px rgba(15, 185, 177, 0.2)' : 'none'
  });

  return (
    <div className='user-menu-wrapper'>
      <div className="user-sidebar-card shadow-sm">
        {/* User Greeting Section */}
        <div className="user-card-header">
          <div className="user-icon-bg">
            <FaUserCircle />
          </div>
          <div className="user-text">
            <h5>My Account</h5>
            <p>Emad Telecom Customer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="user-nav-links">
          <NavLink to="/dashboard/user/profile" className="user-nav-item" style={activeLink}>
            <div className="d-flex align-items-center gap-3">
              <FaUserEdit className="nav-icon-pro" />
              <span>Personal Profile</span>
            </div>
            <FaChevronRight className="arrow-icon" />
          </NavLink>

          <NavLink to="/dashboard/user/orders" className="user-nav-item" style={activeLink}>
            <div className="d-flex align-items-center gap-3">
              <FaShoppingBag className="nav-icon-pro" />
              <span>Purchase History</span>
            </div>
            <FaChevronRight className="arrow-icon" />
          </NavLink>
        </div>

        {/* Support Section */}
        <div className="user-support-box mt-4">
          <p>Need help with orders?</p>
                 <button className="pro-btn-final ms-lg-auto" onClick={() => window.location.href='/contact'}>Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;