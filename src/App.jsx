// Import react features
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS and JS
import "./assets/style.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { UI } from "./i18n";

//Componenets
import Header from "./components/Header";
import Footer from "./components/Footer"


// import General 
import Home from "./Pages/General/Home";
import Contact from "./Pages/General/Contact";
import About from "./Pages/General/About"
import AddData from "./Pages/General/AddData";
import Services from "./Pages/General/Services"

// Fabrics imports
import Fabrics from "./Pages/Fabrics" 
// Tracks Imports
import Tracks from "./Pages/Tracks"; 
// Frames Import
import Frames from "./Pages/Frames"; 

import Flooring from "./Pages/Flooring";


import SubcategoryPage from "./components/SubcategoryPage";
import ProductDetailPage from "./components/ProductDetailPage";
import SubSubListing from "./components/SubSubListing";


function App() {
  const [lang, setLang] = useState("en");

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");
  const t = UI[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    
  <>
    <Router>
      <div className="app-wrapper">
        <Header lang={lang} toggleLang={toggleLang} t={t} dir={t.dir} />
          <main className="main-content">

          <Routes>

            <Route path="/" element={<Home t={t}  dir={t.dir}/>} />
            <Route path="/about" element={<About t={t} dir={t.dir}/>} />
            <Route path="/services" element={<Services t={t} dir={t.dir} />} />
            <Route path="/contact" element={<Contact t={t} dir={t.dir} />} />
            <Route path="/AddData" element ={<AddData t={t}/>}/>


            {/* Main Category Pages */}
            <Route path="products/fabrics" element={<Fabrics t={t} dir={t.dir} />} />
            <Route path="products/tracks" element={<Tracks t={t} dir={t.dir} />} />
            <Route path="products/frames" element={<Frames t={t} dir={t.dir} />} />
            <Route path="products/flooring" element={<Flooring t={t} dir={t.dir} />} />

            <Route 
                path="/products/:categoryName/:subcategoryId" 
                element={<SubcategoryPage t={t} dir={t.dir}/>} 
            />

            {/* new paths */}

            <Route path="/product/:productId" element={<ProductDetailPage t={t} dir={t.dir} />} />
            <Route 
                path="/static-content/:productId" 
                element={<ProductDetailPage t={t} dir={t.dir} />} 
            />
            <Route path="/products/sub-sub-list/:folderId" element={<SubSubListing t={t} dir={t.dir} />} />
          
          </Routes>
          </main>
        <Footer t={t} dir={t.dir}/>
      </div>
    </Router>
  </>
  );
}

export default App;
