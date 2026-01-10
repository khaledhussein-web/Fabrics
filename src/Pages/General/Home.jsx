import React from "react";
import '../../assets/Home.css'; 

export default function Home({ t }) {

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
     <div class="container">
  <div class="row">
    <div class="col-12">
      <h2>View products</h2>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4">
      <img src="image1.jpg" class="img-fluid" alt="Image 1" />
      <a href="#" class="btn btn-primary">Button 1</a>
    </div>

    <div class="col-md-4">
      <img src="image2.jpg" class="img-fluid" alt="Image 2" />
      <a href="#" class="btn btn-primary">Button 2</a>
    </div>

    <div class="col-md-4">
      <img src="image3.jpg" class="img-fluid" alt="Image 3" />
      <a href="#" class="btn btn-primary">Button 3</a>
    </div>
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
