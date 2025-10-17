import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-container">

          {/* Logo and About */}
          <div className="footer-section">
            <h2 className="footer-logo">LA PARFUM</h2>
            <p className="footer-about">
              Discover timeless fragrances crafted with elegance and passion.
              Inspired by luxury, designed for every moment.
            </p>
          </div>

          {/* Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h3>Get in Touch</h3>
            <p>Email: info@laparfum.com</p>
            <div className="footer-social">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LA PARFUM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
