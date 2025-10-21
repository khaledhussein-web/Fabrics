import React from "react";

export default function Home({ t }) {

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section id="home">
        <h1>{t?.hero?.slogan || "Elegance in Every Detail"}</h1>
        <p>
          {t?.hero?.subtitle ||
            "Premium fabrics, flooring, and decorative materials — designed, delivered, and installed with care."}
        </p>
        <div className="cta-row">
          <a href="#products" className="btn-primary">
            {t?.hero?.cta || "View Products"}
          </a>
        </div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section id="about">
        <h2>{t?.about?.title || "About Us"}</h2>
        <p>
          {t?.about?.body ||
            "We are a specialized interior solutions company providing high-quality fabrics, curtains, flooring, and decorative materials."}
        </p>
        <div className="about-badge">
          {t?.about?.years || "+10 years of experience"}
        </div>
        <h3>{t?.about?.missionTitle || "Our Mission"}</h3>
        <p>
          {t?.about?.mission ||
            "To deliver elegant, durable, and tailor-made interior finishes that reflect our clients’ style."}
        </p>
      </section>


      {/* ====== FOOTER ====== */}
      <footer>
        <p>
          © {new Date().getFullYear()} {t?.brand || "StageWare"}. All rights
          reserved.
        </p>
      </footer>


    </>
  );
}
