// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Navbar({ lang, toggleLang, t }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <header>
//       <nav>


//         <div className="brand">
//           <div className="logo"></div>
//           <div className="brand-text">{t.brand}</div>
//         </div>

//       {/* Menu  */}

//         <div className="nav-links">

//           {/* Home */}
//           <Link to="/" className="nav-btn">{t.nav.home}</Link>

//           {/* About us */}
//           <Link to="/about" className="nav-btn">{t.nav.about}</Link>

//           {/* Services */}
//           <Link to="/services" className="nav-btn">{t.nav.services}</Link>



//           {/* ✅ Products Dropdown */}
//           <div
//             className="nav-btn dropdown"
//             onMouseEnter={handleDropdown}
//             onMouseLeave={handleDropdown}
//           >
//             {t.nav.products}
//             {dropdownOpen && (
//               <div className="dropdown-menu">

//                 {/* Fabrics */}
//                 <Link to="/products/fabrics" className="dropdown-item">{lang === "en" ? "Fabrics" : "الأقمشة"}</Link>

//                 {/* Tracks ands frames */}
//                 <Link to="/products/tracks" className="dropdown-item">{lang === "en" ? "Tracks & Frames" : "المسارات والإطارات"}</Link>

//                  {/* Flooring */}
//                 <Link to="/products/flooring" className="dropdown-item">{lang === "en" ? "Flooring" : "الأرضيات"}</Link>
//               </div>
//             )}
//           </div>

//           {/* Contact */}
//           <Link to="/contact" className="nav-btn">{t.nav.contact}</Link>
//           {/* <Link to="/feedback" className="nav-btn">{t.nav.feedback}</Link> */}
//         </div>

//       {/* This is the change language button */}
//         <div className="nav-controls">
//           <button onClick={toggleLang} className="lang-toggle">
//             {lang === "en" ? "العربية" : "English"}
//           </button>
//         </div>


//       </nav>
//     </header>
//   );
// }
