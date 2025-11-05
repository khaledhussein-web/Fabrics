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

// import General ;
import Home from "./Pages/General/Home";
import Contact from "./Pages/General/Contact";
import About from "./Pages/General/About"
import AddData from "./Pages/General/AddData";
import Services from "./Pages/General/Services"


// Fabrics imports
import Fabrics from "./Pages/Fabrics/Fabrics"
import DecorationFabrics from "./Pages/Fabrics/DecorationFabrics";
import ProjectsScreen from "./Pages/Fabrics/ProjectsScreen";
import Holograme from "./Pages/Fabrics/Holograme";
import Flooring from "./Pages/Fabrics/Flooring";



// Tracks Imports (Added based on assumed component names)
import Tracks from "./Pages/Tracks/Tracks";
import ChainTrack from "./Pages/Tracks/ChainTrack";
import RevealSystems from "./Pages/Tracks/RevealSystems";
import Rollups from "./Pages/Tracks/Rollups";
// Frames Import (Added)
import Frames from "./Pages/Frames/Frames";

// ProductCategory Import
import ProductCategory from "./Pages/ProductCategory";




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
        <Header lang={lang} toggleLang={toggleLang} t={t} dir={t.dir} />
          <main className="main-content">

            {/* ✅ React Router setup */}
          <Routes>

            <Route path="/" element={<Home t={t}  dir={t.dir}/>} />
            <Route path="/fabrics" element={<Fabrics t={t} dir={t.dir} />} />
              <Route path="/about" element={<About t={t} dir={t.dir}/>} />
              <Route path="/services" element={<Services  t={t} dir={t.dir} />} />
              <Route path="/contact" element={<Contact t={t}  dir={t.dir} />} />
              {/* <Route path="/products/:category" element={<ProductCategory />} />
              <Route path="/products/:category/:subcategory" element={<ProductCategory />} /> */}
              <Route path="/AddData" element ={<AddData t={t}/>}/>

              {/* Fabrics sub-categories */}
              <Route path="products/fabrics" element={<Fabrics t={t} dir={t.dir} />} />
              <Route path="products/fabrics/decoration" element={<DecorationFabrics t={t} dir={t.dir} />} />
              <Route path="products/fabrics/projectsScreen" element={<ProjectsScreen t={t} dir={t.dir} />} />
              <Route path="products/fabrics/holograme" element={<Holograme t={t} dir={t.dir} />} />
              <Route path="products/fabrics/flooring" element={<Flooring t={t} dir={t.dir} />} />

              {/* tracks dropdown  */}
              <Route path="products/tracks/Tracks" element={<Tracks t={t} dir={t.dir} />} />
              <Route path="products/tracks/chainTrack" element={<ChainTrack t={t} dir={t.dir} />} />
              <Route path="products/tracks/revealSystems" element={<RevealSystems t={t} dir={t.dir} />} />
              <Route path="products/tracks/rollups" element={<Rollups t={t} dir={t.dir} />} />

              {/*  Frames */}
              <Route path="products/frames" element={<Frames t={t} dir={t.dir} />} />

              {/* Product Category */}
              <Route path="/product-category/fabric/:subcategory" element={<ProductCategory t={t} dir={t.dir} />} />
              <Route path="/product-category/tracks/:subcategory" element={<ProductCategory t={t} dir={t.dir} />} />
              <Route path="/product-category/frames/:subcategory" element={<ProductCategory t={t} dir={t.dir} />} />
            </Routes>
          </main>
        <Footer t={t} dir={t.dir}/>
      </div>
    </Router>
  </>
  );
}

export default App;
