import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import "./Order.css";

const Order = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentTexts, setCommentTexts] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Get user orders
  const getUserOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/user-orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data?.success) setOrders(data.orders);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getUserOrders();
  }, [auth?.token]);

  const getPaymentMethodName = (method) => {
    switch (method) {
      case "COD":
        return "Cash on Delivery";
      case "BKASH":
        return "bKash";
      case "NAGAD":
        return "Nagad";
      default:
        return method;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "badge bg-success";
      case "Shipped":
        return "badge bg-info";
      case "Processing":
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  };

  const getPaymentStatusBadgeClass = (status) => {
    switch (status) {
      case "Paid":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    const reason = window.prompt("Please provide a reason for cancellation:");
    if (!reason || !reason.trim()) return;
    try {
      const { data } = await axios.put(
        `/api/v1/order/cancel/${orderId}`,
        { reason },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success("Order cancelled");
        getUserOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  // Comments
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
        getUserOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    }
  };

  // Review modal
  const openReviewModal = (productId) => {
    setSelectedProductId(productId);
    setShowReview(true);
  };
  const closeReview = () => {
    setShowReview(false);
    setRating(0);
    setReviewText("");
  };

  const submitReview = async () => {
    if (!rating || !reviewText.trim()) return toast.error("Rating & review required");

    try {
      const { data } = await axios.post(
        "/api/v1/review/add",
        { productId: selectedProductId, rating, comment: reviewText },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (data.success) {
        toast.success("Review submitted");
        closeReview();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="order-page-body">
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center mb-4 text-danger p-3">Your Orders</h1>

              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : orders?.length === 0 ? (
                <div className="text-center">
                  <h4>No orders found</h4>
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="orders-container">
                  {orders?.map((order) => (
                    <div key={order._id}  className={`orders-admin-card mb-3 ${order.orderStatus === "Cancelled" ? "cancelled" : ""}`}>
                      {/* ----------------- HEADER ----------------- */}
                      <div className="order-header">
                        <div className="order-info">
                          <h5>Order #{order._id.slice(-6).toUpperCase()}</h5>
                          <p className="text-muted">
                            Placed on: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="order-status">
                          <span className={getStatusBadgeClass(order.orderStatus)}>
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>

                      {/* ----------------- PRODUCTS ----------------- */}
                      <div className="order-products">
                        <h6>Products:</h6>
                        {order.products?.map((item, index) => (
                          <div key={index} className="order-product-item">
                            <div className="product-image">
                              <img
                                src={`/api/v1/product/product-photo/${item.product?._id}`}
                                alt={item.product?.name}
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/50";
                                }}
                              />
                            </div>
                            <div className="product-details">
                              <h6>{item.product?.name || "Product removed"}</h6>
                              <p className="text-muted">
                                Quantity: {item.quantity} × {item.product?.price || 0} TK
                              </p>

                              {/* Review Button */}
                              {order.orderStatus === "Delivered" && (
                                <button
                                  className="btn btn-sm btn-outline-primary mt-2"
                                  onClick={() => openReviewModal(item.product._id)}
                                >
                                  ⭐ Write Review
                                </button>
                              )}
                            </div>
                            <div className="product-total">
                              <strong>{item.quantity * (item.product?.price || 0)} TK</strong>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ----------------- SUMMARY ----------------- */}
                      <div className="order-summary">
                        <div className="summary-row">
                          <span>Payment Method:</span>
                          <strong>{getPaymentMethodName(order.paymentMethod)}</strong>
                        </div>

                        {order.paymentMethod === "BKASH" && order.bkashTrxId && (
                          <div className="summary-row">
                            <span>bKash Transaction ID:</span>
                            <strong>{order.bkashTrxId}</strong>
                          </div>
                        )}

                        {order.paymentMethod === "NAGAD" && order.nagadTrxId && (
                          <div className="summary-row">
                            <span>Nagad Transaction ID:</span>
                            <strong>{order.nagadTrxId}</strong>
                          </div>
                        )}

                        <div className="summary-row">
                          <span>Payment Status:</span>
                          <span className={getPaymentStatusBadgeClass(order.paymentStatus)}>
                            {order.paymentStatus}
                          </span>
                        </div>

                        <div className="summary-row">
                          <span>Delivery Address:</span>
                          <strong>{order.address}</strong>
                        </div>

                        {/* ----------------- SHIPPING ----------------- */}
                        {order.trackingNumber && (
                          <div className="tracking-box">
                            <h6>📦 Shipment Details</h6>
                            <p><strong>Courier:</strong> {order.courierService}</p>
                            <p><strong>Tracking No:</strong> {order.trackingNumber}</p>
                            {order.trackingUrl && (
                              <a
                                href={order.trackingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-info"
                              >
                                Track Package
                              </a>
                            )}
                          </div>
                        )}

                        <div className="summary-row total-row">
                          <span>Total Amount:</span>
                          <strong className="total-amount">{order.totalAmount} TK</strong>
                        </div>

                        {order.orderStatus === "Cancelled" && order.cancelled && (
                          <div className="mt-2 p-2 border rounded bg-light">
                            <small className="text-muted d-block">
                              Cancelled by: {order.cancelled.by?.name || order.cancelled.role}
                            </small>
                            <small className="text-muted d-block">
                              On: {new Date(order.cancelled.at).toLocaleString()}
                            </small>
                            <div><strong>Reason:</strong> {order.cancelled.reason}</div>
                          </div>
                        )}
                      </div>

                      {/* ----------------- COMMENTS ----------------- */}
                      <div className="order-comments premium-comments">
                        <div className="comments-header">
                          <h6>💬 Order Communication</h6>
                          <span className="comments-subtitle">Chat with admin</span>
                        </div>

                        <div className="comments-list">
                          {(order.comments || []).map((c, idx) => (
                            <div
                              key={idx}
                              className={`comment-bubble ${c.role === "admin" ? "admin-bubble" : "user-bubble"}`}
                            >
                              <div className="bubble-header">
                                <span className="author-name text-danger">
                                  {c.author?.name || (c.role === "admin" ? "Admin" : "You")}
                                </span>
                                <span className="bubble-time">
                                  {new Date(c.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <div className="bubble-text">{c.text}</div>
                            </div>
                          ))}

                          {(!order.comments || order.comments.length === 0) && (
                            <div className="no-comments">
                              No messages yet. Start the conversation 👋
                            </div>
                          )}
                        </div>

                        <div className="comment-input-box">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={commentTexts[order._id] || ""}
                            onChange={(e) =>
                              setCommentTexts({ ...commentTexts, [order._id]: e.target.value })
                            }
                          />
                          <button className="btn send-btn" onClick={() => addComment(order._id)}>➤</button>
                        </div>
                      </div>

                      {/* ----------------- CANCEL BUTTON ----------------- */}
                      {!["Shipped", "Delivered", "Cancelled"].includes(order.orderStatus) && (
                        <div className="mt-3 text-end">
                          <button className="btn btn-outline-danger" onClick={() => cancelOrder(order._id)}>
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ----------------- REVIEW MODAL ----------------- */}
        {showReview && (
          <div className="review-modal">
            <div className="review-card">
              <h5>Rate this product</h5>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating ? "active" : ""}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                className="form-control mt-3"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={closeReview}>Cancel</button>
                <button className="btn btn-primary" onClick={submitReview}>Submit Review</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Order;
