import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import "./Users.css";

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getAllUsers();
    }
  }, [auth?.token]);

  return (
    <div className="users-body">
    <Layout title={"Dashboard - All Users"}>
      <div className="users-page-container container-fluid m-3 p-3">
        <div className="users-page-row row">
          <div className="users-sidebar col-md-3">
            <AdminMenu />
          </div>
          <div className="users-content col-md-9">
            <h1 className="users-title text-center mb-4">All Users</h1>
            {loading ? (
              <div className="users-loading text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : users?.length === 0 ? (
              <div className="users-empty text-center">
                <h4>No users found</h4>
              </div>
            ) : (
              <div className="users-table-responsive table-responsive">
                <table className="users-table table table-striped table-hover">
                  <thead className="users-table-head table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Address</th>
                      <th scope="col">Role</th>
                      <th scope="col">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="users-table-body">
                    {users?.map((user, index) => (
                      <tr key={user._id} className="users-table-row">
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {typeof user.address === "string"
                            ? user.address
                            : user.address?.street || "N/A"}
                        </td>
                        <td>
                          {user.role === 1 ? (
                            <span className="users-badge-admin badge bg-danger">
                              Admin
                            </span>
                          ) : (
                            <span className="users-badge-user badge bg-primary">
                              User
                            </span>
                          )}
                        </td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="users-stats mt-4">
              <div className="users-card card">
                <div className="users-card-body card-body">
                  <h5 className="users-card-title card-title">Statistics</h5>
                  <p className="users-card-text card-text">
                    <strong>Total Users:</strong> {users?.length || 0}
                  </p>
                  <p className="users-card-text card-text">
                    <strong>Admins:</strong>{" "}
                    {users?.filter((u) => u.role === 1).length || 0}
                  </p>
                  <p className="users-card-text card-text">
                    <strong>Regular Users:</strong>{" "}
                    {users?.filter((u) => u.role === 0).length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default Users;

