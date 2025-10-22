import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ lang, toggleLang, t }) {

  //The setState for the desktop/mobile menu
  const [mobileMenu, setMobileMenu] = useState(false);

  //The products dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //The fabrics dropDown
  const [fabricsDropdownOpen, setFabricsDropdownOpen] = useState(false);

  const handleMenuToggle = () => setMobileMenu(!mobileMenu);

  // Close mobile nav when language changes
  useEffect(() => {
    setMobileMenu(false);
  }, [lang]);

  return (
    <header>
      <nav className="navbar">
        
        {/* ===== Brand ===== */}

        <Link to="/" className="nav-btn">
            <div className="brand">
              <div className="logo"></div>
              <div className="brand-text">{t.brand}</div>
            </div>
        </Link>

        {/* ===== Nav Links and Controls ===== */}
        <div className="nav-right">
          <div className="nav-links" id="nav-links">

            {/* Home */}
            {/* <Link to="/" className="nav-btn">{t.nav.home}</Link> */}

            {/* About */}
            <Link to="/about" className="nav-btn">{t.nav.about}</Link>

            {/* Services */}
            <Link to="/services" className="nav-btn">{t.nav.services}</Link>

            {/* ===== Products Dropdown  ===== */}
            <div
              className="nav-btn dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => {
              setDropdownOpen(false);
              setFabricsDropdownOpen(false);
            }}>

              {t.nav.products}
              {dropdownOpen && (
                <div className="dropdown-menu">

                  {/* NEW: Fabrics Link with Nested Dropdown */}
      <div 
          className="dropdown-item nested-dropdown"
          onMouseEnter={() => setFabricsDropdownOpen(true)}
          onMouseLeave={() => setFabricsDropdownOpen(false)}
      >
          {t.productCategories.fabrics} {/* The text "Fabrics" */}
          {fabricsDropdownOpen && (
          <div className="nested-dropdown-menu">
            <Link to="/products/fabrics/decoration" className="dropdown-item">
                {t.fabricsSubCategories.decoration}
            </Link>
            <Link to="/products/fabrics/projectors" className="dropdown-item">
                {t.fabricsSubCategories.projectsScreen}
            </Link>
            <Link to="/products/fabrics/holograms" className="dropdown-item">
                {t.fabricsSubCategories.holograme}
            </Link>
        </div>
          )}
          </div>
                  {/* <Link to="/products/fabrics" className="dropdown-item">
                    {lang === "en" ? "Fabrics" : "الأقمشة"}
                  </Link> */}
                  <Link to="/products/tracks" className="dropdown-item">
                    {lang === "en" ? "Tracks" : "المسارات"}
                  </Link>
                  {/* <Link to="/products/flooring" className="dropdown-item">
                    {lang === "en" ? "Flooring" : "الأرضيات"}
                  </Link> */}
                  <Link to="/products/frames" className="dropdown-item">
                    {lang === "en" ? "Frames" : "الإطارات"}
                  </Link>
                </div>
              )}
            </div>

            {/* Contact  */}
            <Link to="/contact" className="nav-btn">{t.nav.contact}</Link>
            {/* <Link to="/feedback" className="nav-btn">{t.nav.feedback}</Link> */}
            <Link to="/Demo" className="nav-btn">{t.nav.Test}</Link>
            <Link to="/Demo" className="nav-btn">{t.nav.Demo}</Link>
            <Link to="/Login" className="nav-btn">{t.nav.Login}</Link>
          </div>

          {/* Language button */}
          <div className="nav-controls">
            <button onClick={toggleLang} className="lang-toggle">
              {lang === "en" ? "العربية" : "English"}
            </button>

               {/* Burger menu button */}
            <button onClick={handleMenuToggle} className="menu-toggle">☰</button>

          </div>
        </div>
      </nav>













      {/* ===== Mobile Navigation ===== */}


      <div className={`mobile-nav ${mobileMenu ? "show" : ""}`} id="mobile-nav">
        {/* <Link to="/" className="nav-btn" onClick={handleMenuToggle}>{t.nav.home}</Link> */}
        <Link to="/about" className="nav-btn" onClick={handleMenuToggle}>{t.nav.about}</Link>
        <Link to="/services" className="nav-btn" onClick={handleMenuToggle}>{t.nav.services}</Link>
        {/* <Link to="/products/fabrics" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Fabrics" : "الأقمشة"}
        </Link> */}
        <Link to="/products/fabrics/decoration" className="nav-btn" onClick={handleMenuToggle}>
          {t.fabricsSubCategories.decoration}
        </Link>
        <Link to="/products/fabrics/projectors" className="nav-btn" onClick={handleMenuToggle}>
          {t.fabricsSubCategories.projectsScreen}
        </Link>
        <Link to="/products/fabrics/holograms" className="nav-btn" onClick={handleMenuToggle}>
          {t.fabricsSubCategories.holograme}
        </Link>
        <Link to="/products/tracks" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Tracks & Frames" : "المسارات والإطارات"}
        </Link>
        <Link to="/products/flooring" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Flooring" : "الأرضيات"}
        </Link>
        <Link to="/contact" className="nav-btn" onClick={handleMenuToggle}>{t.nav.contact}</Link>
        {/* <Link to="/feedback" className="nav-btn" onClick={handleMenuToggle}>{t.nav.feedback}</Link> */}
        {/* <Link to="/Demo" className="nav-btn" onClick={handleMenuToggle}>{t.nav.Demo}</Link> */}
      </div>
    </header>
  );
}
