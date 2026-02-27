import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import logo from "/logo.png"

export default function Header({ lang, toggleLang, t }) {


  // Mobile menu logic


  //The setState for the desktop/mobile menu
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenuToggle = () => setMobileMenu(!mobileMenu);

  // Close mobile nav when language changes
  useEffect(() => {
    setMobileMenu(false);
  }, [lang]);

  // --- Close menu on desktop resize ---
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than your mobile breakpoint (768px)
      if (window.innerWidth > 768) {
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
<Navbar.Brand as={Link} to="/" className="nav-logo">
          <Image
            src={logo} 
            alt="Company Logo"
            height="70" 
            className="d-inline-block" 
            />
        </Navbar.Brand>

        {/* ===== Nav Links and Controls ===== */}
        <div className="nav-right">
          <div className="nav-links" id="nav-links">

            {/* About */}
            <Link to="/about" className="nav-btn">{t.nav.about}</Link>
            {/* Services */}
            <Link to="/services" className="nav-btn">{t.nav.services}</Link>



            {/* Products dropdown (Desktop - RESTORED) */}
            <Dropdown className="products-dropdown-override">
              <Dropdown.Toggle id="product-menu-dropdown-responsive" className="nav-btn" as="span">
                {t.nav.products}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                
                {/* 1. Fabrics Dropdown */}
                <li className="dropdown-submenu">
                  {/* Link to main Fabrics page */}
                  <Dropdown.Item as={Link} to={`/products/fabrics`} className="submenu-trigger cursor-pointer" >
                    {t.productsCategories.fabrics}
                  </Dropdown.Item>

                  <div className="dropdown-menu-nested">
                    <Dropdown.Item as={Link} to={`/products/fabrics/1`}> 
                      {t.fabricsSubCategories.decoration}
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/products/fabrics/2`}>
                      {t.fabricsSubCategories.ph} 
                    </Dropdown.Item>
                  </div>
                </li>

                {/* 2. Flooring */}
                <Dropdown.Item as={Link} to={`/products/flooring`}>
                {t.productsCategories.flooring}
                </Dropdown.Item>

                {/* 3. Frames Link */}
                <Dropdown.Item as={Link} to={`/products/frames`}> 
                  {t.productsCategories.frames}
                </Dropdown.Item>

                {/* 4. Tracks Dropdown */}
                <li className="dropdown-submenu">
                    <Dropdown.Item as={Link} to={`/products/tracks`} className="submenu-trigger cursor-pointer">
                      {t.productsCategories.tracks}
                    </Dropdown.Item>
                    <div className="dropdown-menu-nested">
                      <Dropdown.Item as={Link} to={`/products/tracks/3`}>
                        {t.tracksSubCategories.chainTrack}
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to={`/products/tracks/4`}>
                        {t.tracksSubCategories.revealSystems}
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to={`/products/tracks/5`}>
                        {t.tracksSubCategories.rollups}
                      </Dropdown.Item>
                    </div>
                </li>
                
           

              </Dropdown.Menu>
            </Dropdown>
            {/* End products dropdown*/}


            {/* Contact  */}
            <Link to="/contact" className="nav-btn">{t.nav.contact}</Link>
            {/* AddData  */}
            <Link to="/AddData" className="nav-btn">AddData</Link>

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


{/* ===== Mobile Navigation (RESTORED) ===== */}

      <div className={`mobile-nav ${mobileMenu ? "show" : ""}`} id="mobile-nav">
        {/* Primary Top-Level Links */}
        <Link to="/about" className="nav-btn" onClick={handleMenuToggle}>{t.nav.about}</Link>
        <Link to="/services" className="nav-btn" onClick={handleMenuToggle}>{t.nav.services}</Link>
        
        {/* --- 1. FABRICS DROPDOWN (Vertical Accordion) --- */}
        <Dropdown className="w-100 mobile-dropdown-item">
            <Dropdown.Toggle as={Link} to={`/products/fabrics`} className="nav-btn-parent w-100 text-start" onClick={handleMenuToggle}>
                {t.productsCategories.fabrics}
            </Dropdown.Toggle>

            {/* Sub-Items are inside the Dropdown.Menu */}
            <Dropdown.Menu className="mobile-dropdown-menu">
                {/* ⚠️ NOTE: Replace the numeric IDs (1, 2, 3, 4) with the actual database ID for each subcategory */}
                <Dropdown.Item as={Link} to={`/products/fabrics/1`} onClick={handleMenuToggle} className="nav-btn-child">
                    {t.fabricsSubCategories.decoration}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/products/fabrics/2`} onClick={handleMenuToggle} className="nav-btn-child">
                    {t.fabricsSubCategories.ph} 
                </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
                    <Dropdown.Item as={Link} to={`/products/flooring`} onClick={handleMenuToggle} className="nav-btn-child">
                    {t.fabricsSubCategories.flooring}
            </Dropdown.Item>
        
        {/* --- 2. TRACKS DROPDOWN (Vertical Accordion) --- */}
        <Dropdown className="w-100 mobile-dropdown-item">
            <Dropdown.Toggle as={Link} to={`/products/tracks/`} className="nav-btn-parent w-100 text-start" onClick={handleMenuToggle}>
                {t.productsCategories.tracks}
            </Dropdown.Toggle>
            <Dropdown.Menu className="mobile-dropdown-menu">
                <Dropdown.Item as={Link} to={`/products/tracks/3`} onClick={handleMenuToggle} className="nav-btn-child">
                    {t.tracksSubCategories.chainTrack}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/products/tracks/4`} onClick={handleMenuToggle} className="nav-btn-child">
                    {t.tracksSubCategories.revealSystems}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/products/tracks/5`} onClick={handleMenuToggle} className="nav-btn-child">
                    {t.tracksSubCategories.rollups}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        
        {/* --- 3. FRAMES Standalone Item --- */}
        <Link to={`/products/frames`} className="nav-btn" onClick={handleMenuToggle}>
           {t.productsCategories.frames}
        </Link>

        {/* Utility Links */}
        <Link to="/contact" className="nav-btn" onClick={handleMenuToggle}>{t.nav.contact}</Link>
        <Link to="/AddData" className="nav-btn" onClick={handleMenuToggle}>AddData</Link>
      </div>
    </header>
  );
}