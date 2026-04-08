import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaThLarge, 
  FaPlusCircle, 
  FaBoxes, 
  FaClipboardList, 
  FaUsers, 
  FaShieldAlt 
} from 'react-icons/fa';
import "./AdminMenu.css";

const AdminMenu = () => {
  // Active Link এর জন্য কমন স্টাইল ফাংশন
  const linkStyle = ({ isActive }) => ({
    background: isActive ? 'linear-gradient(135deg, #0fb9b1 0%, #079992 100%)' : 'transparent',
    color: isActive ? '#fff' : '#64748b',
    boxShadow: isActive ? '0 10px 20px rgba(15, 185, 177, 0.2)' : 'none'
  });

  return (
    <div className='admin-sidebar-wrapper'>
      <div className="admin-sidebar-card shadow-sm">
        <div className="sidebar-header-pro">
          <div className="admin-avatar">
            <FaShieldAlt />
          </div>
          <div className="admin-title">
            <h6>Admin Panel</h6>
            <p>Emad Telecom</p>
          </div>
        </div>
        
        <div className="admin-nav-list">
          <NavLink to="/dashboard/admin/create-category" className="pro-nav-item" style={linkStyle}>
            <FaThLarge className="pro-icon" />
            <span>Create Category</span>
          </NavLink>

          <NavLink to="/dashboard/admin/create-product" className="pro-nav-item" style={linkStyle}>
            <FaPlusCircle className="pro-icon" />
            <span>Create Product</span>
          </NavLink>

          <NavLink to="/dashboard/admin/products" className="pro-nav-item" style={linkStyle}>
            <FaBoxes className="pro-icon" />
            <span>All Products</span>
          </NavLink>

          <NavLink to="/dashboard/admin/orders" className="pro-nav-item" style={linkStyle}>
            <FaClipboardList className="pro-icon" />
            <span>Manage Orders</span>
          </NavLink>

          <NavLink to="/dashboard/admin/users" className="pro-nav-item" style={linkStyle}>
            <FaUsers className="pro-icon" />
            <span>User Database</span>
          </NavLink>
        </div>

        <div className="sidebar-badge mt-4">
          <small>Emad Telecom</small>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;