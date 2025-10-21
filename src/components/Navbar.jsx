import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ lang, toggleLang, t }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuToggle = () => setMobileMenu(!mobileMenu);

  // Close mobile nav when language changes
  useEffect(() => {
    setMobileMenu(false);
  }, [lang]);

  return (
    <header>
      <nav className="navbar">
        {/* ===== Brand ===== */}
        <div className="brand">
          <div className="logo"></div>
          <div className="brand-text">{t.brand}</div>
        </div>

        {/* ===== Nav Links and Controls ===== */}
        <div className="nav-right">
          <div className="nav-links" id="nav-links">
            <Link to="/" className="nav-btn">{t.nav.home}</Link>
            <Link to="/about" className="nav-btn">{t.nav.about}</Link>
            <Link to="/services" className="nav-btn">{t.nav.services}</Link>

            {/* ===== Products Dropdown ===== */}
            <div
              className="nav-btn dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {t.nav.products}
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/products/fabrics" className="dropdown-item">
                    {lang === "en" ? "Fabrics" : "الأقمشة"}
                  </Link>
                  <Link to="/products/tracks" className="dropdown-item">
                    {lang === "en" ? "Tracks & Frames" : "المسارات والإطارات"}
                  </Link>
                  <Link to="/products/flooring" className="dropdown-item">
                    {lang === "en" ? "Flooring" : "الأرضيات"}
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="nav-btn">{t.nav.contact}</Link>
            <Link to="/feedback" className="nav-btn">{t.nav.feedback}</Link>
          </div>

          {/* ===== Language & Menu Buttons ===== */}
          <div className="nav-controls">
            <button onClick={toggleLang} className="lang-toggle">
              {lang === "en" ? "العربية" : "English"}
            </button>
            <button onClick={handleMenuToggle} className="menu-toggle">☰</button>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Navigation ===== */}
      <div className={`mobile-nav ${mobileMenu ? "show" : ""}`} id="mobile-nav">
        <Link to="/" className="nav-btn" onClick={handleMenuToggle}>{t.nav.home}</Link>
        <Link to="/about" className="nav-btn" onClick={handleMenuToggle}>{t.nav.about}</Link>
        <Link to="/services" className="nav-btn" onClick={handleMenuToggle}>{t.nav.services}</Link>
        <Link to="/products/fabrics" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Fabrics" : "الأقمشة"}
        </Link>
        <Link to="/products/tracks" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Tracks & Frames" : "المسارات والإطارات"}
        </Link>
        <Link to="/products/flooring" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Flooring" : "الأرضيات"}
        </Link>
        <Link to="/contact" className="nav-btn" onClick={handleMenuToggle}>{t.nav.contact}</Link>
        <Link to="/feedback" className="nav-btn" onClick={handleMenuToggle}>{t.nav.feedback}</Link>
      </div>
    </header>
  );
}
