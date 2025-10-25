import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'; // Import the component
export default function Navbar({ lang, toggleLang, t }) {

  //The setState for the desktop/mobile menu
  const [mobileMenu, setMobileMenu] = useState(false);


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

<Dropdown>
            <Dropdown.Toggle 
               
              id="product-menu-dropdown-responsive"
              className="nav-btn"
              as={Link} 
              to={`/products`}
            >
                {t.nav.products} 
            </Dropdown.Toggle>

            <Dropdown.Menu>
                
                {/* --- FABRICS (Nested Menu Item) --- */}
                <li className="dropdown-submenu">
                    <Dropdown.Item 
                    //  noCaret 
                        className="submenu-trigger cursor-pointer"
                    >
                        {t.productsCategories.fabrics}
                    </Dropdown.Item>

                    <div className="dropdown-menu-nested">
                        <Dropdown.Item as={Link} to={`/products/fabrics/decoration`}>
                          {t.fabricsSubCategories.decoration}
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/products/fabrics/projectsScreen`}>
                          {t.fabricsSubCategories.projectsScreen}
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/products/fabrics/holograme`}>
                          {t.fabricsSubCategories.holograme}
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/products/fabrics/flooring`}>
                          {t.fabricsSubCategories.flooring}
                        </Dropdown.Item>
                    </div>
                </li>
                
                {/* <Dropdown.Divider /> */}

                {/* --- TRACKS (Nested Menu Item) --- */}
                <li className="dropdown-submenu">
                    <Dropdown.Item 
                        // noCaret
                        className="submenu-trigger cursor-pointer"
                     
                    >
                        {t.productsCategories.tracks}
                    </Dropdown.Item>
                    
                    {/* Nested Menu Container: Subcategory Headers REMOVED */}
                    <div className="dropdown-menu-nested">
                        <Dropdown.Item as={Link} to={`/products/tracks/chainTrack`}>
                          {t.tracksSubCategories.chainTrack}
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/products/tracks/revealSystems`}>
                          {t.tracksSubCategories.revealSystems}
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/products/tracks/tracks`}>
                          {t.tracksSubCategories.tracks}
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/products/tracks/rollups`}>
                          {t.tracksSubCategories.rollups}
                        </Dropdown.Item>
                    </div>
                </li>

                {/* <Dropdown.Divider /> */}

                {/* --- FRAMES (Standalone Item) --- */}
                <Dropdown.Item 
                    as={Link} 
                    to={`/products/frames`}>
                    {t.productsCategories.frames}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

          {/*  End products dropdown*/}






            {/* Contact  */}
            <Link to="/contact" className="nav-btn">{t.nav.contact}</Link>
            {/* <Link to="/feedback" className="nav-btn">{t.nav.feedback}</Link> */}


            
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













      {/* ===== Mobile Navigation ===== */}


      <div className={`mobile-nav ${mobileMenu ? "show" : ""}`} id="mobile-nav">
        {/* <Link to="/" className="nav-btn" onClick={handleMenuToggle}>{t.nav.home}</Link> */}
        <Link to="/about" className="nav-btn" onClick={handleMenuToggle}>{t.nav.about}</Link>
        <Link to="/services" className="nav-btn" onClick={handleMenuToggle}>{t.nav.services}</Link>
        {/* <Link to="/products/fabrics" className="nav-btn" onClick={handleMenuToggle}>
          {lang === "en" ? "Fabrics" : "الأقمشة"}
        </Link> */}
        <Link to="/products/fabrics/decorationFabrics" className="nav-btn" onClick={handleMenuToggle}>
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
      </div>
    </header>
  );
}
