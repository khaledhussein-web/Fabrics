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
import Products from "./Pages/Products"

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

      {/* Navbar visible on every page */}
      <Navbar lang={lang} toggleLang={toggleLang} t={t} />
  
  {/* style={{ padding: "30px" }} */}
     <div>
        {/* <h1>StageWare</h1> */}

        {/* ✅ React Router setup */}
        <Routes>

          {/* ✅ Default home route */}
          <Route path="/" element={<Home t={t} />} />
          <Route path="/about" element={<About t={t}/>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:subcategory" element={<ProductCategory />} />
          <Route path="/AddData" element ={<AddData t={t}/>}/>
          <Route path="/products" element={<Products t={t}/>}/>

        
        </Routes>
      </div>
      <Footer t={t} dir={t.dir}/>
    </Router>
    </>
  );
}

export default App;
