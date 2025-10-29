import React from "react";
import "../assets/Home.css"

export default function Home({ t, dir }) {

  return (

    <div dir={t.dir} >
      <div className="p-0 m-0"  >
        {/* The p-0 and m-0 classes remove any default padding/margin */}

        <img
          src="/banners/banner 1.png"
          alt="Banner 1"
          className="img-fluid d-block w-100"
        />

        {/* 
        <img 
          src="/banners/banner2.jpg" 
          alt="Banner 2" 
          className="img-fluid d-block w-100" 
        />
        
        <img 
          src="/banners/banner3.jpg" 
          alt="Banner 3" 
          className="img-fluid d-block w-100" 
        /> */}
      </div>




      {/* ====== HERO SECTION ====== */}
      <section id="home" className="d-flex flex-column justify-content-center align-items-center text-center mb-3">
        <h1>{t?.hero?.slogan || "Elegance in Every Detail"}</h1>
        <p>
          {t?.hero?.subtitle ||
            "Premium fabrics, flooring, and decorative materials — designed, delivered, and installed with care."}
        </p>
        <div className="d-flex gap-3 justify-content-center mt-3">
          <a href="#products" className="btn-primary">
            {t?.hero?.cta || "View Products"}
          </a>
        </div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section className="container" style={{ color: "var(--text-color)" }}>
        <h2>{t?.about?.title || "About Us"}</h2>
        <p>
          {t?.about?.body ||
            "We are a specialized interior solutions company providing high-quality fabrics, curtains, flooring, and decorative materials."}
        </p>
        <div className="">
          {t?.about?.years || "+10 years of experience"}
        </div>
        <h3>{t?.about?.missionTitle || "Our Mission"}</h3>
        <p>
          {t?.about?.mission ||
            "To deliver elegant, durable, and tailor-made interior finishes that reflect our clients’ style."}
        </p>
      </section>

    </div>


  );
}
