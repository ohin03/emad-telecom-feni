import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUsers, FaUserShield, FaUserTag, FaCalendarAlt, FaAddressCard, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Users.css";

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/all-users", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data?.success) setUsers(data.users);
    } catch (error) {
      toast.error("Failed to fetch user database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  // --- Pagination Logic ---
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // পেজ চেঞ্জ হলে উপরে স্ক্রল হবে
  };

  return (
    <Layout title="System Management - All Users">
      <div className="users-pro-container">
        <div className="container-fluid py-4 px-lg-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="sticky-top" style={{ top: "90px" }}>
                <AdminMenu />
              </div>
            </div>

            <div className="col-lg-9">
              {/* Stats Cards (আগের মতোই) */}
              <div className="row g-3 mb-4">
                <div className="col-md-4 col-6">
                  <div className="stat-card-pro total">
                    <div className="stat-icon"><FaUsers /></div>
                    <div className="stat-info">
                      <h3>{users?.length || 0}</h3>
                      <p>Total Database</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="stat-card-pro admins">
                    <div className="stat-icon"><FaUserShield /></div>
                    <div className="stat-info">
                      <h3>{users?.filter(u => u.role === 1).length || 0}</h3>
                      <p>System Admins</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-none d-md-block">
                  <div className="stat-card-pro active-users">
                    <div className="stat-icon"><FaUserTag /></div>
                    <div className="stat-info">
                      <h3>{users?.filter(u => u.role === 0).length || 0}</h3>
                      <p>Regular Clients</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="users-list-wrapper shadow-sm">
                <div className="list-header-pro">
                  <h5 className="m-0 fw-bold">User Directory</h5>
                  <button className="refresh-btn" onClick={getAllUsers}>Sync Data</button>
                </div>

                {loading ? (
                  <div className="pro-loader text-center py-5">
                    <div className="spinner-grow text-primary" role="status"></div>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive d-none d-md-block">
                      <table className="table users-table-pro align-middle">
                        <thead>
                          <tr>
                            <th>Identity</th>
                            <th>Contact Details</th>
                            <th>Location</th>
                            <th>Privilege</th>
                            <th>Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers?.map((u) => (
                            <tr key={u._id}>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <div className="user-avatar-pro">
                                    {u.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="u-name">{u.name}</div>
                                    <div className="u-id">ID: {u._id.substring(18)}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="u-email">{u.email}</div>
                                <div className="u-phone">{u.phone}</div>
                              </td>
                              <td>
                                <div className="u-address">
                                  <FaAddressCard className="me-1 text-muted"/>
                                  {typeof u.address === "string" ? u.address : u.address?.street || "Feni, BD"}
                                </div>
                              </td>
                              <td>
                                <span className={`role-badge ${u.role === 1 ? 'admin' : 'user'}`}>
                                  {u.role === 1 ? "Administrator" : "Client"}
                                </span>
                              </td>
                              <td>
                                <div className="u-date">
                                  <FaCalendarAlt className="me-1"/>
                                  {new Date(u.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile View */}
                    <div className="d-md-none p-2">
                      {currentUsers?.map((u) => (
                        <div key={u._id} className="user-mobile-card mb-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                             <div className="d-flex align-items-center gap-2">
                                <div className="user-avatar-pro small">{u.name.charAt(0)}</div>
                                <h6 className="m-0 fw-bold">{u.name}</h6>
                             </div>
                             <span className={`role-badge sm ${u.role === 1 ? 'admin' : 'user'}`}>
                                {u.role === 1 ? "Admin" : "User"}
                             </span>
                          </div>
                          <div className="mobile-info-grid">
                            <p><strong>Email:</strong> {u.email}</p>
                            <p><strong>Phone:</strong> {u.phone}</p>
                            <p><strong>Joined:</strong> {new Date(u.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* --- Pro Pagination Footer --- */}
                    <div className="pro-pagination-footer">
                      <div className="pagination-info d-none d-sm-block">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length}
                      </div>
                      <div className="pagination-btns">
                        <button 
                          className="p-btn prev"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <FaChevronLeft />
                        </button>

                        <div className="p-numbers d-none d-md-flex">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button 
                              key={i + 1}
                              className={`p-num-btn ${currentPage === i + 1 ? 'active' : ''}`}
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button 
                          className="p-btn next"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;