import React from "react";
import { Link } from "react-router-dom";
import '../../assets/Home.css'; 
import Seo from "../../components/Seo";
import { collectionJsonLd, organizationJsonLd, websiteJsonLd } from "../../seo";

export default function Home({ t }) {
  const productCategories = [
    { name: "Fabrics", url: "/products/fabrics" },
    { name: "Flooring", url: "/products/flooring" },
    { name: "Frames and LED", url: "/products/frames" },
    { name: "Tracks", url: "/products/tracks" },
    { name: "Trussing systems", url: "/products/trussing" },
  ];

  return (

    <div dir="ltr" >
      <Seo
        title="StageWare | Stage Fabrics, Flooring, Tracks, Frames and Trussing"
        description="StageWare supplies flame-retardant fabrics, flooring, track systems, frame profiles, and trussing systems for theatres and events."
        image="/banners/Fabrics_Home_page.png"
        jsonLd={[
          organizationJsonLd(),
          websiteJsonLd(),
          collectionJsonLd({
            name: "StageWare Products",
            description:
              "StageWare supplies flame-retardant fabrics, flooring, tracks, frames, and trussing systems for theatres and events.",
            path: "/",
            items: productCategories,
          }),
        ]}
      />
      <div className="home-hero-section">
        <div className="home-hero-container">
        <img
          src="/banners/Fabrics_Home_page.png"
          alt="StageWare flame-retardant fabrics and stage solutions"
          className="home-hero-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/banners/banner4.png";
          }}
        />
        </div>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section id="home" className="d-flex flex-column justify-content-center align-items-center text-center mb-3">
        <h1 className="mb-3">{t?.brand}</h1>
        <h3>{t?.hero?.slogan || "Elegance in Every Detail"}</h3>
        <p>
          {t?.hero?.subtitle ||
            "Premium fabrics, flooring, and decorative materials - designed, delivered, and installed with care."}
        </p>
        {/* <div className="d-flex gap-3 justify-content-center mt-3">
          <a href="#products" className="btn-primary">
            {t?.hero?.cta || "View Products"}
          </a>
        </div> */}
     <div className="container py-5">
  <div className="row mb-5">
    <div className="col-12 text-center">
      <h2 className="display-5 fw-bold text-dark">Our Products</h2>
    </div>
  </div>

  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 home-products-grid">
    {/* Fabrics Card - Changed to col-md-3 */}
    <div className="col">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4 product-category-card">
        <div className="position-relative overflow-hidden">
          <img 
            src="fabrics.jpg" 
            className="card-img-top img-fluid" 
            alt="Flame-retardant stage fabrics" 
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4 product-card-content">
          <h4 className="fw-bold mb-3 product-card-title">{t?.productsCategories?.fabrics || "Fabrics"}</h4>
          <Link to="/products/fabrics" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm product-card-button">
           {t?.viewDetails || "View More"}
          </Link>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4 product-category-card">
        <div className="position-relative overflow-hidden">
          <img 
            src="flooring.jpg" 
            className="card-img-top img-fluid" 
            alt="Professional theatre and event flooring" 
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4 product-card-content">
          <h4 className="fw-bold mb-3 product-card-title">{t?.productsCategories?.flooring || "Flooring"}</h4>
          <Link to="/products/flooring" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm product-card-button">
            {t?.viewDetails || "View More"}
          </Link>
        </div>
      </div>
    </div>

   

    {/* Frames Card - Changed to col-md-3 */}
    <div className="col">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4 product-category-card">
        <div className="position-relative overflow-hidden">
          <img 
            src="frames.jpg" 
            className="card-img-top img-fluid" 
            alt="Aluminum Frame Profiles" 
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4 product-card-content">
          <h4 className="fw-bold mb-3 product-card-title">{t?.productsCategories?.frames || "Frames"}</h4>
          <Link to="/products/frames" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm product-card-button">
            {t?.viewDetails || "View More"}
          </Link>
        </div>
      </div>
    </div>

 {/* Tracks Card - Changed to col-md-3 */}
    <div className="col">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4 product-category-card">
        <div className="position-relative overflow-hidden">
          <img 
            src="tracks.jpg" 
            className="card-img-top img-fluid" 
            alt="Curtain Tracks" 
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4 product-card-content">
          <h4 className="fw-bold mb-3 product-card-title">{t?.productsCategories?.tracks || "Tracks"}</h4>
          <Link to="/products/tracks" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm product-card-button">
            {t?.viewDetails || "View More"}
          </Link>
        </div>
      </div>
    </div>
    {/* Trussing Card */}
    <div className="col">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4 product-category-card">
        <div className="position-relative overflow-hidden">
          <img
            src="/trussing.png"
            className="card-img-top img-fluid"
            alt="Stage trussing system"
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4 product-card-content">
          <h4 className="fw-bold mb-3 product-card-title">{t?.productsCategories?.trussing || "Standard and customize Trussing system"}</h4>
          <Link to="/products/trussing" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm product-card-button">
            {t?.viewDetails || "View More"}
          </Link>
        </div>
      </div>
    </div>
    
  </div>
</div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section className="about-mission-section">
        <div className="about-mission-card">
        <h2>{t?.nav?.about || "About Us"}</h2>
        <p>
          {t?.hero?.aboutUs ||
            "We are a specialized interior solutions company providing high-quality fabrics, curtains, flooring, and decorative materials."}
        </p>
        <h3>Our Mission</h3>
        <p>
          {t?.hero?.ourMission ||
            "To deliver elegant, durable, and tailor-made interior finishes that reflect our clients' style."}
        </p>
        </div>
      </section>

    </div>


  );
}
