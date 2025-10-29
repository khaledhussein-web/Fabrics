// Import react features
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS and JS
import "./assets/style.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { UI } from "./i18n";

//Componenets

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

import ProductCategory from "./Pages/ProductCategory";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About"
import AddData from "./Pages/AddData";
import Services from "./Pages/Services"
import Fabrics from "./Pages/Fabrics"

function App() {
  const [lang, setLang] = useState("en");

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");
  const t = UI[lang];

  useEffect(() => {
    document.title = "StageWare";
  }, []);

  return (
   
  <>
    <Router>
      <div className="app-wrapper">
        {/* Navbar visible on every page */}
        <Navbar lang={lang} toggleLang={toggleLang} t={t} dir={t.dir} />
          <main className="main-content">

            {/* ✅ React Router setup */}
            <Routes>
              
              <Route path="/" element={<Home t={t}  dir={t.dir}/>} />
              <Route path="/about" element={<About t={t} dir={t.dir}/>} />
              <Route path="/services" element={<Services  t={t} dir={t.dir} />} />
              <Route path="/contact" element={<Contact t={t}  dir={t.dir} />} />
              <Route path="/products/:category" element={<ProductCategory />} />
              <Route path="/products/:category/:subcategory" element={<ProductCategory />} />
              <Route path="/AddData" element ={<AddData t={t}/>}/>
              <Route path="products/fabrics" element={<Fabrics t={t}  dir={t.dir}/>}/>
            </Routes>
          </main>
        <Footer t={t} dir={t.dir}/>
      </div>
    </Router>
  </>
  );
}

export default App;
