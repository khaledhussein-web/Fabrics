import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "/logo.png"

export default function Header({ t }) {


  // Mobile menu logic


  //The setState for the desktop/mobile menu
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenuToggle = () => setMobileMenu(!mobileMenu);
  const closeMobileMenu = () => setMobileMenu(false);

  // --- Close menu on desktop resize ---
  useEffect(() => {
    const handleResize = () => {
      // Keep this aligned with the responsive breakpoint in style.css.
      if (window.innerWidth > 1050) {
        setMobileMenu(false); // Force close the menu
      }
    };

    // Set up the listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this runs only on mount/unmount


  // End of mobile menu logic

//web menu


  return (
    <header dir={t.dir}>
      <nav className="navbar">

        {/* ===== Brand ===== */}

        {/* <Link to="/" className="nav-logo">
          <div className="brand">
            <div className="logo"></div> 
            <div className="brand-text">{t.brand}</div>
          </div>
        </Link> */}
        <Link to="/" className="nav-logo" aria-label="StageWare home">
          <img
            src={logo} 
            alt="StageWare"
            width="216"
            height="70"
            className="d-inline-block" 
            />
        </Link>

        {/* ===== Nav Links and Controls ===== */}
        <div className="nav-right">
          <div className="nav-links" id="nav-links">

            {/* About */}
            <Link to="/about" className="nav-btn">{t.nav.about}</Link>
            {/* Services */}
            <Link to="/services" className="nav-btn">{t.nav.services}</Link>



            {/* Products dropdown */}
            <div className="products-dropdown-override">
              <button
                type="button"
                id="product-menu-dropdown-responsive"
                className="nav-btn products-toggle"
                aria-haspopup="true"
              >
                {t.nav.products}
              </button>
              <div className="desktop-products-menu">
                
                {/* 1. Fabrics Dropdown */}
                <div className="dropdown-submenu">
                  {/* Link to main Fabrics page */}
                  <Link to="/products/fabrics" className="dropdown-item submenu-trigger cursor-pointer">
                    {t.productsCategories.fabrics}
                  </Link>

                  <div className="dropdown-menu-nested">
                    <Link className="dropdown-item" to="/products/fabrics/1">
                      {t.fabricsSubCategories.decoration}
                    </Link>
                    <Link className="dropdown-item" to="/products/fabrics/2">
                      {t.fabricsSubCategories.ph} 
                    </Link>
                    <Link className="dropdown-item" to="/products/fabrics/6">
                      {t.fabricsSubCategories.fabricDrawings}
                    </Link>
                  </div>
                </div>

                {/* 2. Flooring */}
                <Link className="dropdown-item" to="/products/flooring">
                  {t.productsCategories.flooring}
                </Link>

                {/* 3. Frames Link */}
                <Link className="dropdown-item" to="/products/frames">
                  {t.productsCategories.frames}
                </Link>

                {/* 4. Tracks Dropdown */}
                <div className="dropdown-submenu">
                    <Link className="dropdown-item submenu-trigger cursor-pointer" to="/products/tracks">
                      {t.productsCategories.tracks}
                    </Link>
                    <div className="dropdown-menu-nested">
                      <Link className="dropdown-item" to="/products/tracks/3">
                        {t.tracksSubCategories.chainTrack}
                      </Link>
                      <Link className="dropdown-item" to="/products/tracks/4">
                        {t.tracksSubCategories.revealSystems}
                      </Link>
                      <Link className="dropdown-item" to="/products/tracks/5">
                        {t.tracksSubCategories.rollups}
                      </Link>
                    </div>
                </div>

                {/* 5. Trussing */}
                <Link className="dropdown-item" to="/products/trussing">
                  {t.productsCategories.trussing}
                </Link>
              </div>
            </div>
            {/* End products dropdown*/}


            {/* Contact  */}
            <Link to="/contact" className="nav-btn">{t.nav.contact}</Link>
            {/* AddData  */}
            {/* <Link to="/AddData" className="nav-btn">AddData</Link> */}

          </div>

          <div className="nav-controls">
            {/* Burger menu button */}
            <button
              type="button"
              onClick={handleMenuToggle}
              className="menu-toggle"
              aria-label={mobileMenu ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenu}
              aria-controls="mobile-nav"
            >
              <span aria-hidden="true">{"\u2630"}</span>
            </button>

          </div>
        </div>
      </nav>


{/* ===== Mobile Navigation (RESTORED) ===== */}

      <nav
        className={`mobile-nav ${mobileMenu ? "show" : ""}`}
        id="mobile-nav"
        aria-label="Mobile navigation"
      >
        {/* Primary Top-Level Links */}
        <Link to="/about" className="nav-btn" onClick={closeMobileMenu}>{t.nav.about}</Link>
        <Link to="/services" className="nav-btn" onClick={closeMobileMenu}>{t.nav.services}</Link>

        {/* Products links mirror the desktop menu, including third-level items. */}
        <div className="mobile-products">
          <div className="mobile-products-title">{t.nav.products}</div>

          <Link to="/products/fabrics" className="nav-btn mobile-product-parent" onClick={closeMobileMenu}>
            {t.productsCategories.fabrics}
          </Link>
          <Link to="/products/fabrics/1" className="nav-btn mobile-product-child" onClick={closeMobileMenu}>
            {t.fabricsSubCategories.decoration}
          </Link>
          <Link to="/products/fabrics/2" className="nav-btn mobile-product-child" onClick={closeMobileMenu}>
            {t.fabricsSubCategories.ph}
          </Link>
          <Link to="/products/fabrics/6" className="nav-btn mobile-product-child" onClick={closeMobileMenu}>
            {t.fabricsSubCategories.fabricDrawings}
          </Link>

          <Link to="/products/flooring" className="nav-btn mobile-product-parent" onClick={closeMobileMenu}>
            {t.productsCategories.flooring}
          </Link>

          <Link to="/products/frames" className="nav-btn mobile-product-parent" onClick={closeMobileMenu}>
            {t.productsCategories.frames}
          </Link>

          <Link to="/products/tracks" className="nav-btn mobile-product-parent" onClick={closeMobileMenu}>
            {t.productsCategories.tracks}
          </Link>
          <Link to="/products/tracks/3" className="nav-btn mobile-product-child" onClick={closeMobileMenu}>
            {t.tracksSubCategories.chainTrack}
          </Link>
          <Link to="/products/tracks/4" className="nav-btn mobile-product-child" onClick={closeMobileMenu}>
            {t.tracksSubCategories.revealSystems}
          </Link>
          <Link to="/products/tracks/5" className="nav-btn mobile-product-child" onClick={closeMobileMenu}>
            {t.tracksSubCategories.rollups}
          </Link>

          <Link to="/products/trussing" className="nav-btn mobile-product-parent" onClick={closeMobileMenu}>
            {t.productsCategories.trussing}
          </Link>
        </div>

        {/* Utility Links */}
        <Link to="/contact" className="nav-btn" onClick={closeMobileMenu}>{t.nav.contact}</Link>
      </nav>
    </header>
  );
}
