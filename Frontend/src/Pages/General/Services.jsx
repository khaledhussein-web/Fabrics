import React from "react";
import {
  FaCut,
  FaSlidersH,
  FaLayerGroup,
  FaTools,
  FaQuoteLeft
} from "react-icons/fa";

import "../../assets/Listing.css";
import Seo from "../../components/Seo";

const Services = () => {
    return (
        <div className="services-page bg-white" dir="ltr">
            <Seo
                title="Services | StageWare"
                description="End-to-end services for stage fabrics, track systems, framing, and professional installation."
            />
            <div className="container py-5">
                <div className="row mb-5">
                    <div className="col-lg-8">
                        <h1 className="display-5 fw-bold text-dark mb-4 border-bottom pb-3">
                            Our Services
                        </h1>
                        <p className="lead text-muted">
                            At StageWare, we don't just supply materials; we engineer environments. Whether it is a national theater, a corporate event, or a specialized architectural project, our team provides end-to-end solutions tailored to the unique demands of your space.
                        </p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaCut /></div>
                            <h5 className="fw-bold mb-3">Bespoke Fabric Solutions</h5>
                            <p className="text-muted small">
                                Specializing in the selection and customization of premium decorative and technical textiles.
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">-</span>Acoustic Excellence</li>
                                <li className="mb-2"><span className="text-primary me-2">-</span>Safety First</li>
                                <li><span className="text-primary me-2">-</span>Custom Branding</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaSlidersH /></div>
                            <h5 className="fw-bold mb-3">Precision Track Systems</h5>
                            <p className="text-muted small">
                                Designing the tracking systems that make stage transitions look effortless.
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">-</span>Heavy-Duty Engineering</li>
                                <li className="mb-2"><span className="text-primary me-2">-</span>Reveal & Roll-up Systems</li>
                                <li><span className="text-primary me-2">-</span>Silent Operation</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaLayerGroup /></div>
                            <h5 className="fw-bold mb-3">Structural Framing</h5>
                            <p className="text-muted small">
                                The hidden strength providing rigid support for projection screens and scenic elements.
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">-</span>Modular Design</li>
                                <li className="mb-2"><span className="text-primary me-2">-</span>Custom Curvature</li>
                                <li><span className="text-primary me-2">-</span>On-Site Integration</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaTools /></div>
                            <h5 className="fw-bold mb-3">Installation & Consult</h5>
                            <p className="text-muted small">
                                Our technical team handles the complexity so you can focus on the performance.
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">-</span>Detailed Site Surveys</li>
                                <li className="mb-2"><span className="text-primary me-2">-</span>Expert Riggers</li>
                                <li><span className="text-primary me-2">-</span>Regional Reach</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row mt-5 pt-5 justify-content-center">
                    <div className="col-md-10 text-center">
                        <div className="bg-light p-4 p-md-5 rounded-4 shadow-sm position-relative">
                            <FaQuoteLeft className="position-absolute top-0 start-0 m-4 text-primary opacity-25" size={40} />
                            <h3 className="fw-light fst-italic text-dark mb-4">
                                We believe that every detail matters because in the spotlight, there is no room for error.
                            </h3>
                            <a href="/contact" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm border-0 transition-zoom">
                                Contact Us Today
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
