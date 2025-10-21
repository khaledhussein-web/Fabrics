import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCategory from "./Pages/ProductCategory";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import "./assets/style.css"; // ✅ make sure the name matches your real file
import { UI } from "./i18n";

function App() {
  const [lang, setLang] = useState("en");

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");
  const t = UI[lang];

  useEffect(() => {
    document.title = "StageWare";
  }, []);

  return (
    <Router>
      {/* ✅ Navbar visible on every page */}
      <Navbar lang={lang} toggleLang={toggleLang} t={t} />

      <div style={{ padding: "30px" }}>
        <h1>StageWare</h1>

        {/* ✅ React Router setup */}
        <Routes>
          {/* ✅ Default home route */}
          <Route path="/" element={<Home t={t} />} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="/products/:category" element={<ProductCategory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
