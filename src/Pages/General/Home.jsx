import React from "react";
import '../../assets/Home.css'; 

export default function Home({ t , dir}) {

  return (

    <div dir={t.dir} >
      <div className="p-0 m-0"  >
        {/* The p-0 and m-0 classes remove any default padding/margin */}

        <img
          src="/banners/banner4.png"
          alt="Banner"
          className="img-fluid d-block w-100"
        />
      </div>

      {/* ====== HERO SECTION ====== */}
      <section id="home" className="d-flex flex-column justify-content-center align-items-center text-center mb-3">
        <h1 className="mb-3">{t?.brand}</h1>
        <h3>{t?.hero?.slogan || "Elegance in Every Detail"}</h3>
        <p>
          {t?.hero?.subtitle ||
            "Premium fabrics, flooring, and decorative materials — designed, delivered, and installed with care."}
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

  <div className="row g-4">
    {/* Fabrics Card - Changed to col-md-3 */}
    <div className="col-md-3">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4">
        <div className="position-relative overflow-hidden">
          <img 
            src="fabrics.jpg" 
            className="card-img-top img-fluid" 
            alt="Stage Fabrics" 
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4">
          <h4 className="fw-bold mb-3">{t?.productsCategories?.fabrics || (t?.dir === "rtl" ? "الأقمشة" : "Fabrics")}</h4>
          <a href="/products/fabrics" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm">
           {t?.viewDetails || (dir === "rtl" ? "عرض اكثر" : "View More")}
          </a>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4">
        <div className="position-relative overflow-hidden">
          <img 
            src="flooring.jpg" 
            className="card-img-top img-fluid" 
            alt="Accessories" 
            style={{ height: '280px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center bg-white p-4">
          <h4 className="fw-bold mb-3">{t?.productsCategories?.flooring || (t?.dir === "rtl" ? "الأقمشة" : "Flooring")}</h4>
          <a href="/products/flooring" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm">
            {t?.viewDetails || (dir === "rtl" ? "عرض اكثر" : "View More")}
          </a>
        </div>
      </div>
    </div>

   

    {/* Frames Card - Changed to col-md-3 */}
    <div className="col-md-3">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4">
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
        <div className="card-body text-center bg-white p-4">
          <h4 className="fw-bold mb-3">{t?.productsCategories?.frames || (t?.dir === "rtl" ? "الإطارات" : "Frames")}</h4>
          <a href="/products/frames" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm">
            {t?.viewDetails || (dir === "rtl" ? "عرض اكثر" : "View More")}
          </a>
        </div>
      </div>
    </div>

 {/* Tracks Card - Changed to col-md-3 */}
    <div className="col-md-3">
      <div className="card h-100 border-0 shadow-lg overflow-hidden rounded-4">
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
        <div className="card-body text-center bg-white p-4">
          <h4 className="fw-bold mb-3">Tracks</h4>
          <a href="/products/tracks" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm">
            {t?.viewDetails || (dir === "rtl" ? "عرض اكثر" : "View More")}
          </a>
        </div>
      </div>
    </div>
    {/* New Fourth Card - Changed to col-md-3 */}
    
  </div>
</div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section className="container" style={{ color: "var(--text-color)" }}>
        <h2>{t?.about?.title || "About Us"}</h2>
        <p>
          {t?.about?.body ||
            "We are a specialized interior solutions company providing high-quality fabrics, curtains, flooring, and decorative materials."}
        </p>
        <h3>{t?.about?.missionTitle || "Our Mission"}</h3>
        <p>
          {t?.about?.mission ||
            "To deliver elegant, durable, and tailor-made interior finishes that reflect our clients’ style."}
        </p>
      </section>

    </div>


  );
}
