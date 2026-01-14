import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "./AdminDashboard.css"; // Custom CSS

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Emad Telecom"}>
      <div className="dashboard-container container-fluid p-3">
        <div className="row">

          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>

          {/* Admin Info */}
          <div className="col-md-9">
            <div className="admin-card shadow p-4 rounded">
              <h2 className="mb-3">Welcome, {auth?.user?.name} 👋</h2>
              <div className="info-list">
                <p><strong>Name:</strong> {auth?.user?.name}</p>
                <p><strong>Email:</strong> {auth?.user?.email}</p>
                <p><strong>Phone:</strong> {auth?.user?.phone || "Not Provided"}</p>
              </div>
            </div>

            {/* Optional Stats / Quick Links */}
          
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
