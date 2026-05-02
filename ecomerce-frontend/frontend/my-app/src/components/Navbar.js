 import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./assets/Navbar.css";

// ✅ Cart context hook
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  // cartCount না থাকলে default 0
  const { cartCount = 0 } = useCart();

  // ✅ login check (JWT)
  const isLoggedIn = !!localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <>
      {/* Top Promo Bar */}
      <div className="top-promo">premium quality</div>

      {/* Main Navbar */}
      <header className="site-header">
        <div className="nav-inner container">
          {/* Logo */}
          <Link to="/" className="brand-logo">
            CARRYONIX
          </Link>

          {/* Middle Menu */}
          <nav className="main-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/products">
              Collections
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            {!isLoggedIn ? (
              <Link className="nav-account" to="/login">
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="nav-account logout-btn"
                type="button"
              >
                Logout
              </button>
            )}

            <Link to="/cart" className="cart-button">
              <span className="cart-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M7 4h-2l-1 2h2l3 9h9l3-8h-13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="19" r="1.4"></circle>
                  <circle cx="18" cy="19" r="1.4"></circle>
                </svg>
              </span>

              <span className="cart-label">Cart</span>

              {/* ✅ Dynamic cart count */}
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

