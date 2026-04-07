import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("mobileOffcanvas");
    if (offcanvasEl) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl) || new window.bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg sticky-top custom-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container-fluid px-3 d-flex align-items-center justify-content-between">
          
          {/* --- LOGO SECTION --- */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0 p-0">
            <div className="logo-box">
              <FaShopify size={20} />
            </div>
            <span className="brand-name">
              EMAD <span className="text-primary"> TELECOM</span>
            </span>
          </Link>

          {/* --- MOBILE ACTIONS (Perfectly Centered) --- */}
          <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">
            <Badge count={cart?.length} showZero offset={[2, 0]} size="small">
              <NavLink to="/cart" className="m-action-icon">
                <AiOutlineShoppingCart size={22} />
              </NavLink>
            </Badge>

            {auth?.user && (
              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="m-action-icon">
                <AiOutlineUser size={20} />
              </NavLink>
            )}

            <button className="m-menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileOffcanvas">
              <AiOutlineMenu size={22} />
            </button>
          </div>

          {/* --- DESKTOP NAV --- */}
          <div className="collapse navbar-collapse">
            <div className="mx-auto d-none d-lg-block">
              <SearchInput />
            </div>

            <ul className="navbar-nav ms-auto align-items-center gap-1">
              <li className="nav-item">
                <NavLink to="/" className="nav-link-pro">Home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link-pro dropdown-toggle" to="#" data-bs-toggle="dropdown">Categories</Link>
                <ul className="dropdown-menu border-0 shadow-lg animate-up">
                  <li><Link className="dropdown-item" to="/categories">All Categories</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  {categories?.map((c) => (
                    <li key={c._id}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item"><NavLink to="/register" className="nav-link-pro">Register</NavLink></li>
                  <li className="nav-item"><NavLink to="/login" className="login-pill ms-2">Login</NavLink></li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <span className="user-pill dropdown-toggle" data-bs-toggle="dropdown">
                    <AiOutlineUser /> {auth?.user?.name.split(' ')[0]}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg animate-up">
                    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><NavLink to="/login" onClick={handleLogout} className="dropdown-item text-danger">Logout</NavLink></li>
                  </ul>
                </li>
              )}

              <li className="nav-item ms-3 d-none d-lg-block">
                <Badge count={cart?.length} showZero offset={[8, 0]}>
                  <NavLink to="/cart" className="cart-pill">
                    <AiOutlineShoppingCart size={20} />
                    <span>Cart</span>
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <div className="offcanvas offcanvas-start m-canvas" id="mobileOffcanvas" tabIndex="-1">
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold">Main Menu</h5>
          <button type="button" className="close-btn-pro" onClick={closeOffcanvas}>✕</button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="p-3 bg-light border-bottom"><SearchInput /></div>
          <div className="m-nav-container">
            <NavLink to="/" className="m-nav-item" onClick={closeOffcanvas}>Home</NavLink>
            <div className="m-accordion">
              <div className="m-nav-item d-flex justify-content-between align-items-center" onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}>
                <span>Categories</span>
                <span className={`m-arrow ${mobileCategoryOpen ? 'open' : ''}`}>▼</span>
              </div>
              {mobileCategoryOpen && (
                <div className="m-sub-container">
                  <Link to="/categories" className="m-sub-link" onClick={closeOffcanvas}>All Categories</Link>
                  {categories?.map((c) => (
                    <Link key={c._id} to={`/category/${c.slug}`} className="m-sub-link" onClick={closeOffcanvas}>{c.name}</Link>
                  ))}
                </div>
              )}
            </div>
            {!auth?.user ? (
              <div className="p-3 mt-3 d-grid gap-2">
                <NavLink to="/login" className="btn btn-primary rounded-3" onClick={closeOffcanvas}>Login</NavLink>
                <NavLink to="/register" className="btn btn-outline-secondary rounded-3" onClick={closeOffcanvas}>Register</NavLink>
              </div>
            ) : (
              <div className="mt-4 pt-3 border-top">
                <p className="px-3 text-muted x-small fw-bold">ACCOUNT</p>
                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="m-nav-item" onClick={closeOffcanvas}>Dashboard</NavLink>
                <div className="m-nav-item text-danger" onClick={() => {handleLogout(); closeOffcanvas();}}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;