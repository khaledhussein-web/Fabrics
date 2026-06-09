// Import react features
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS and JS
import "./assets/style.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { UI } from "./i18n";

//Componenets
import Header from "./components/Header";
import Footer from "./components/Footer"


// Keep the landing page in the initial bundle and load other routes on demand.
import Home from "./Pages/General/Home";
const Contact = lazy(() => import("./Pages/General/Contact"));
const About = lazy(() => import("./Pages/General/About"));
const AddData = lazy(() => import("./Pages/General/AddData"));
const Services = lazy(() => import("./Pages/General/Services"));
const NotFound = lazy(() => import("./Pages/General/NotFound"));
const Fabrics = lazy(() => import("./Pages/Fabrics"));
const Tracks = lazy(() => import("./Pages/Tracks"));
const Frames = lazy(() => import("./Pages/Frames"));
const Flooring = lazy(() => import("./Pages/Flooring"));
const Trussing = lazy(() => import("./Pages/Trussing"));
const SubcategoryPage = lazy(() => import("./components/SubcategoryPage"));
const ProductDetailPage = lazy(() => import("./components/ProductDetailPage"));
const SubSubListing = lazy(() => import("./components/SubSubListing"));


function App() {
  const t = UI.en;

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = t.dir;
  }, [t.dir]);

  return (
    
  <>
    <Router>
      <div className="app-wrapper">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header t={t} dir={t.dir} />
          <main id="main-content" className="main-content" tabIndex="-1">

          <Suspense fallback={<div className="route-loading" role="status">Loading page...</div>}>
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
              <Route path="products/trussing" element={<Trussing t={t} dir={t.dir} />} />

              <Route
                  path="/products/:categoryName/:subcategoryId"
                  element={<SubcategoryPage t={t} dir={t.dir}/>}
              />

              <Route path="/product/:productId" element={<ProductDetailPage t={t} dir={t.dir} />} />
              <Route
                  path="/static-content/:productId"
                  element={<ProductDetailPage t={t} dir={t.dir} />}
              />
              <Route path="/products/sub-sub-list/:folderId" element={<SubSubListing t={t} dir={t.dir} />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
          </main>
        <Footer t={t} dir={t.dir}/>
      </div>
    </Router>
  </>
  );
}

export default App;
