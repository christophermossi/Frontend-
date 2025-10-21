import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import "./Header.css";
import LoginModal from "./LoginModal";

const Header = ({ setCurrentPage, cartCount, mobileMenuOpen, setMobileMenuOpen }) => {
  const [showAuthModal, setShowAuthModal] = useState(false); // State for modal visibility

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <button onClick={() => setCurrentPage("home")} className="logo">
            LA PARFUM
          </button>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <button onClick={() => setCurrentPage("home")}>Home</button>
            <button onClick={() => setCurrentPage("collections")}>Collections</button>
            <button onClick={() => setCurrentPage("about")}>About</button>

          </nav>

          {/* Icons */}
          <div className="icon-group">
            <button className="search-btn">
              <Search size={20} />
            </button>

            <button onClick={() => setCurrentPage("cart")} className="cart-btn">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            <button
              className="menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* User Icon for Sign In/Login */}
            <button className="user-btn" onClick={() => setShowAuthModal(true)}>
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <button
              onClick={() => {
                setCurrentPage("home");
                setMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage("collections");
                setMobileMenuOpen(false);
              }}
            >
              Collections
            </button>
            <button
              onClick={() => {
                setCurrentPage("about");
                setMobileMenuOpen(false);
              }}
            >
              About
            </button>
          </nav>
        )}
      </div>

      {/* LoginPage Modal */}
      <LoginModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default Header;
