import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import "./Orders.css";

const orderStatusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];
const paymentStatusOptions = ["Pending", "Paid"];
const courierOptions = [
  "Sundarban Courier",
  "SA Paribahan",
  "RedX",
  "Paperfly",
  "eCourier",
  "Pathao",
  "Steadfast",
  "Others",
];

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierService, setCourierService] = useState("");
  const [commentTexts, setCommentTexts] = useState({});

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/all-orders", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth?.token]);

  const handleOrderStatusChange = async (orderId, orderStatus) => {
    try {
      if (orderStatus === "Shipped") {
        const order = orders.find((o) => o._id === orderId);
        setSelectedOrder(order);
        setTrackingNumber(order?.trackingNumber || "");
        setCourierService(order?.courierService || "");
        setShowTrackingModal(true);
        return;
      }

      const { data } = await axios.put(
        `/api/v1/order/order-status/${orderId}`,
        { orderStatus },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success("Order status updated");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  const handleSaveTracking = async () => {
    if (!trackingNumber || !courierService) {
      toast.error("Please enter tracking number and courier service");
      return;
    }

    try {
      const { data } = await axios.put(
        `/api/v1/order/shipping-tracking/${selectedOrder._id}`,
        { trackingNumber, courierService },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success("Shipping tracking updated");
        setShowTrackingModal(false);
        setSelectedOrder(null);
        setTrackingNumber("");
        setCourierService("");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update tracking");
    }
  };

  const handlePaymentStatusChange = async (orderId, paymentStatus) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/payment-status/${orderId}`,
        { paymentStatus },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success("Payment status updated");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update payment status");
    }
  };

  const cancelOrder = async (orderId) => {
    const reason = window.prompt("Please provide a reason for cancellation:");
    if (!reason || !reason.trim()) return;
    try {
      const { data } = await axios.put(
        `/api/v1/order/admin/cancel/${orderId}`,
        { reason },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success("Order cancelled");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  const addComment = async (orderId) => {
    const text = (commentTexts[orderId] || "").trim();
    if (!text) return toast.error("Enter a comment");
    try {
      const { data } = await axios.post(
        `/api/v1/order/comment/${orderId}`,
        { text },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success("Comment added");
        setCommentTexts({ ...commentTexts, [orderId]: "" });
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    }
  };

  const getPaymentMethodLabel = (method) => {
    if (method === "BKASH") return "bKash";
    if (method === "NAGAD") return "Nagad";
    return method;
  };

  return (
    <Layout title="Dashboard - Orders">
      <div className="orders-admin-page container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 orders-admin-sidebar">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="orders-admin-title text-center mb-4">All Orders</h1>

            {loading ? (
              <div className="orders-admin-loading text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : orders?.length === 0 ? (
              <div className="orders-admin-no-orders text-center">
                <h4>No orders found</h4>
              </div>
            ) : (
              <div className="orders-admin-list">
                {orders.map((order) => (
                  <div key={order._id} className={`orders-admin-card mb-3 ${order.orderStatus === "Cancelled" ? "cancelled" : ""}`}
>
                    {/* Header */}
                    <div className="orders-admin-card-header">
                      <div>
                        <h5>Order #{order._id.slice(-8).toUpperCase()}</h5>
                        <small className="orders-admin-text-muted">
                          {new Date(order.createdAt).toLocaleString()}
                        </small>
                      </div>
                      <div>
                        <span
                          className={`orders-admin-badge ${
                            order.orderStatus === "Delivered"
                              ? "orders-admin-badge-success"
                              : order.orderStatus === "Shipped"
                              ? "orders-admin-badge-info"
                              : "orders-admin-badge-warning"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="orders-admin-card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Customer:</strong> {order.user?.name || "N/A"}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.user?.email || "N/A"}
                          </p>
                          <p>
                            <strong>Phone:</strong> {order.user?.phone || "N/A"}
                          </p>
                          <p>
                            <strong>Address:</strong> {order.address}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Payment Method:</strong>{" "}
                            {getPaymentMethodLabel(order.paymentMethod)}
                          </p>
                          <p>
                            <strong>Payment Status:</strong>{" "}
                            <select
                              className="orders-admin-select d-inline-block ms-2"
                              value={order.paymentStatus}
                              onChange={(e) =>
                                handlePaymentStatusChange(order._id, e.target.value)
                              }
                            >
                              {paymentStatusOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </p>
                          {order.paymentMethod !== "COD" && (
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {order.paymentMethod === "BKASH"
                                ? order.bkashTrxId
                                : order.nagadTrxId}
                            </p>
                          )}
                          <p>
                            <strong>Total Amount:</strong> {order.totalAmount} TK
                          </p>
                          {order.orderStatus === "Cancelled" && order.cancelled && (
                            <div className="orders-admin-cancelled-info mt-2 p-2 border rounded bg-light">
                              <small className="orders-admin-cancelled-by d-block">
                                Cancelled by: {order.cancelled.by?.name || order.cancelled.role}
                              </small>
                              <small className="orders-admin-cancelled-date d-block">
                                On: {new Date(order.cancelled.at).toLocaleString()}
                              </small>
                              <div>
                                <strong>Reason:</strong> {order.cancelled.reason}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Products */}
                      <div className="orders-admin-products mt-3">
                        {order.products?.map((item, idx) => (
                          <div key={idx} className="orders-admin-product-item">
                            <img
                              src={`/api/v1/product/product-photo/${item.product?._id}`}
                              alt={item.product?.name}
                              className="orders-admin-product-img"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                            <div>
                              <div className="orders-admin-product-name">
                                {item.product?.name || "Product removed"}
                              </div>
                              <small>
                                Qty: {item.quantity} × {item.product?.price || 0} TK
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Tracking */}
                      {order.orderStatus === "Shipped" && order.trackingNumber && (
                        <div className="orders-admin-tracking mt-3 p-2 bg-info bg-opacity-10 rounded">
                          <strong>📦 Shipping Tracking:</strong>
                          <div>
                            <strong>Courier:</strong> {order.courierService}
                          </div>
                          <div>
                            <strong>Tracking Number:</strong> {order.trackingNumber}
                          </div>
                        </div>
                      )}

                      {/* Order Status Update */}
                      <div className="orders-admin-status-update mt-3">
                        <label>
                          <strong>Update Order Status:</strong>
                        </label>
                        <select
                          className="orders-admin-select"
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleOrderStatusChange(order._id, e.target.value)
                          }
                        >
                          {orderStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Comments Section */}
                      <div className="orders-admin-comments mt-3">
                        <div className="orders-admin-comments-header">
                          <h6>💬 Order Communication</h6>
                          <span>Chat with admin</span>
                        </div>
                        <div className="orders-admin-comments-list">
                          {(order.comments || []).length > 0 ? (
                            order.comments.map((c, idx) => (
                              <div
                                key={idx}
                                className={`orders-admin-comment-bubble ${
                                  c.role === "admin"
                                    ? "orders-admin-comment-admin"
                                    : "orders-admin-comment-user"
                                }`}
                              >
                                <div className="orders-admin-bubble-header">
                                  <span className="orders-admin-bubble-author">
                                    {c.author?.name || (c.role === "admin" ? "Admin" : "You")}
                                  </span>
                                  <span className="orders-admin-bubble-time">
                                    {new Date(c.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                <div className="orders-admin-bubble-text">{c.text}</div>
                              </div>
                            ))
                          ) : (
                            <div className="orders-admin-no-comments">
                              No messages yet. Start the conversation 👋
                            </div>
                          )}
                        </div>
                        <div className="orders-admin-comment-input-box">
                          <input
                            type="text"
                            className="orders-admin-comment-input"
                            placeholder="Type your message..."
                            value={commentTexts[order._id] || ""}
                            onChange={(e) =>
                              setCommentTexts({ ...commentTexts, [order._id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") addComment(order._id);
                            }}
                          />
                          <button
                            className="orders-admin-comment-send-btn"
                            onClick={() => addComment(order._id)}
                          >
                            ➤
                          </button>
                        </div>
                      </div>

                      {/* Cancel Button */}
                      {!["Delivered", "Cancelled"].includes(order.orderStatus) && (
                        <div className="orders-admin-cancel-btn mt-3 text-end">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => cancelOrder(order._id)}
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      {showTrackingModal && (
        <div
          className="orders-admin-modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowTrackingModal(false)}
        >
          <div className="orders-admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="orders-admin-modal-content">
              <div className="orders-admin-modal-header">
                <h5>Add Shipping Tracking</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTrackingModal(false)}
                ></button>
              </div>
              <div className="orders-admin-modal-body">
                <div className="mb-3">
                  <label className="form-label">Courier Service</label>
                  <select
                    className="form-select"
                    value={courierService}
                    onChange={(e) => setCourierService(e.target.value)}
                  >
                    <option value="">Select Courier</option>
                    {courierOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tracking Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="orders-admin-modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowTrackingModal(false);
                    setSelectedOrder(null);
                    setTrackingNumber("");
                    setCourierService("");
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveTracking}>
                  Save Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
