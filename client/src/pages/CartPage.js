import React, { useState } from "react"; 
import Layout from "../components/Layout/Layout"; 
import { useCart } from "../context/cart"; 
import { useAuth } from "../context/auth"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";

import "./CardPage.css"; 

const CartPage = () => { 
  const [auth] = useAuth(); 
  const [cart, setCart] = useCart(); 
  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD, BKASH, NAGAD
  const [trxId, setTrxId] = useState("");
  const navigate = useNavigate(); 

  // total price considering quantity
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        const qty = Number(item.quantity || 1);
        total += Number(item.price) * qty;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }; 

  // remove item 
  const removeCartItem = (pid) => { 
    try { 
      let myCart = [...cart]; 
      let index = myCart.findIndex((item) => item._id === pid); 
      myCart.splice(index, 1); 
      setCart(myCart); 
      localStorage.setItem("cart", JSON.stringify(myCart)); 
    } catch (error) { 
      console.log(error); 
    } 
  }; 

  // update quantity for an item in cart
  const updateQuantity = (pid, qty) => {
    try {
      const quantity = Math.max(1, Number(qty) || 1);
      const newCart = cart.map((item) =>
        item._id === pid ? { ...item, quantity } : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (e) {
      console.log(e);
    }
  };

  // Place order
const placeOrder = async () => {
  try {
    if (!cart?.length) return toast.error(" Your cart is empty!");
    if (!auth?.user?.address) return toast.error("Please update your address before placing an order!");

    if ((paymentMethod === "BKASH" || paymentMethod === "NAGAD") && !trxId) {
      return toast.error("Please provide the transaction ID for mobile payment!");
    }

    // Format products with quantity
    const formattedProducts = cart.map((item) => ({
      _id: item._id,
      quantity: Number(item.quantity || 1),
    }));

    const { data } = await axios.post(
      "/api/v1/order/place-order",
      {
        products: formattedProducts,
        paymentMethod,
        trxId: paymentMethod !== "COD" ? trxId : null,
        address: auth?.user?.address,
        totalAmount: totalPrice(),
      },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (data?.success) {
      toast.success("Order placed successfully!");
      setCart([]); 
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Order failed!");
  }
};


  return ( 
   
    <Layout> 
      <div className="cart-page-container"> 
        <div className="cart-header"> 
          <h1>Hello {auth?.token ? auth?.user?.name : "Guest"}</h1> 
          <h4> 
            {cart?.length 
              ? `You have ${cart.length} items in your cart ${ auth?.token ? "" : " | Please log in to checkout. " }` 
              : "Your cart is empty"} 
          </h4> 
        </div> 

        <div className="cart-content">
          <div className="cart-items cart-row">
            {cart?.length === 0 ? (
              <div className="empty-cart text-center w-100">
                <div className="empty-cart-icon mb-3">🛒</div>
                <h3>Your cart is empty</h3>
                <p className="text-muted">Add some products to your cart to continue shopping</p>
                <button 
                  className="btn btn-primary mt-3"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart?.map((p) => (
                <div className="cart-card" key={p._id}>
                  <div className="cart-card-image">
                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                  </div>
                  <div className="cart-card-details">
                    <h4>{p.name}</h4>
                    <p>{p.description?.substring(0, 30)}...</p>
                    <div className="d-flex align-items-end gap-3 mb-3">
  <div>
    <small className="text-muted">Unit Price</small>
    <h5 className="mb-0">{p.price} TK</h5>
  </div>

  <div className="ms-auto d-flex flex-column">
    <label className="form-label mb-1 text-end">Total product</label>
    <input
      type="number"
      min="1"
      className="form-control"
      style={{ width: 90 }}
      value={p.quantity || 1}
      onChange={(e) => updateQuantity(p._id, e.target.value)}
    />
  </div>
</div>

                    <div className="d-flex justify-content-between align-items-center">
                      <strong className='p-3'> Subtotal: {Number(p.price) * Number(p.quantity || 1)} TK</strong>
                      <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart?.length > 0 && (
            <div className="cart-summary">
              <h2 className="text-center mb-4">Checkout</h2>
              <hr />
              
              {/* Total Price */}
              <div className="total-section mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Total Amount:</h4>
                  <h3 className="mb-0 text-primary fw-bold">{totalPrice()} TK</h3>
                </div>
              </div>

            {/* Address Section */}
            {!auth?.token ? (
              <div className="alert alert-warning mb-3">
                <p className="mb-2">⚠️ Please login to place order</p>
                <button 
                  className="btn btn-warning w-100" 
                  onClick={() => navigate('/login', {state: '/cart'})}
                >
                  Login to Continue
                </button>
              </div>
            ) : !auth?.user?.address ? (
              <div className="alert alert-danger mb-3">
                <p className="mb-2">⚠️ Address is required to place order</p>
                <button 
                  className="btn btn-danger w-100" 
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Add Address
                </button>
              </div>
            ) : (
              <>
                <div className="address-section mb-3 p-3 bg-light rounded">
                  <h5 className="mb-2">📍 Delivery Address:</h5>
                  <p className="mb-2">{auth?.user?.address}</p>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                </div>

                {/* Payment Method */}
                <div className="payment-section mb-3">
                  <h5 className="mb-3">💳 Payment Method:</h5>
                  <div className="payment-options">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                      />
                      <label className="form-check-label" htmlFor="cod">
                        💵 Cash on Delivery (COD)
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="bkash"
                        value="BKASH"
                        checked={paymentMethod === "BKASH"}
                        onChange={() => setPaymentMethod("BKASH")}
                      />
                      <label className="form-check-label" htmlFor="bkash">
                        📱 bKash
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="nagad"
                        value="NAGAD"
                        checked={paymentMethod === "NAGAD"}
                        onChange={() => setPaymentMethod("NAGAD")}
                      />
                      <label className="form-check-label" htmlFor="nagad">
                        📱 Nagad
                      </label>
                    </div>
                  </div>
                </div>

                {/* Mobile Payment Instruction */}
                {(paymentMethod === "BKASH" || paymentMethod === "NAGAD") && (
                  <div className="alert alert-info mb-3">
                    <h6 className="mb-2">📱 Payment Instructions:</h6>
                    <p className="mb-2">Send money to: <strong>01XXXXXXXXX</strong></p>
                    <label className="form-label">Transaction ID:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Transaction ID"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Place Order Button */}
                <button 
                  className="btn btn-success btn-lg w-100 mt-3 fw-bold" 
                  onClick={placeOrder}
                  disabled={!cart?.length}
                  style={{
                    padding: "15px",
                    fontSize: "18px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                >
                  ✅ Place Order Now
                </button>
                <p className="text-center text-muted mt-2 small">
                  Click to confirm your order
                </p>
              </>
            )}
            </div>
          )}
        </div> 
      </div> 
    </Layout> 
   
  ); 
}; 

export default CartPage;
