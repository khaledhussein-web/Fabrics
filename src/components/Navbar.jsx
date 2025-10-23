import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'; // Import the component
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



          {/* Products dropdown */}


          <Dropdown
          // Use 'show' to control visibility via custom state (hover)
          show={dropdownOpen} 
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          as="div"
          className="nav-btn"
        >
          {/* Main button/toggle text */}
          <Dropdown.Toggle as="span" className="cursor-pointer">
            {t.nav.products}
          </Dropdown.Toggle>

          {/* Main Dropdown Menu */}
          <Dropdown.Menu>
            
            {/* ---------------------------------------------------- */}
            {/* NESTED FABRICS DROPDOWN - This is the custom part  */}
            {/* ---------------------------------------------------- */}
            <Dropdown.Item as="div" className="nested-dropdown">
              {/* This is essentially the NestedHoverDropdown component logic, 
                  but inlined for a single file example. */}
              <Dropdown>
                  <Dropdown.Toggle as="span" style={{ cursor: 'default'}} className="dropdown-item">
                      {t.productCategories.fabrics} {/* The text "Fabrics" */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="nested-dropdown-menu">
                    {/* The nested links MUST be Dropdown.Item components */}
                    <Dropdown.Item as={Link} to="/products/fabrics/decoration">
                      {t.fabricsSubCategories.decoration}
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/products/fabrics/projectors">
                      {t.fabricsSubCategories.projectsScreen}
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/products/fabrics/holograms">
                      {t.fabricsSubCategories.holograme}
                    </Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            
            {/* ---------------------------------------------------- */}

            {/* Other links in the main menu */}
            <Dropdown.Item as={Link} to="/products/tracks">
              {lang === "en" ? "Tracks" : "المسارات"}
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/products/frames">
              {lang === "en" ? "Frames" : "الإطارات"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


          {/*  End products dropdown*/}






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
