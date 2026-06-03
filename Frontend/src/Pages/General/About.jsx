import React from "react";
import { FaHardHat, FaUsers, FaAward, FaHandshake } from "react-icons/fa";
import "../../assets/Listing.css";
import Seo from "../../components/Seo";

const About = () => {
    return (
        <div className="about-page bg-white" dir="ltr">
            <Seo
                title="About StageWare | Stage Solutions Experts"
                description="Learn about StageWare, our story, and our expertise in flame-retardant fabrics and stage solutions."
            />

            <div className="container py-5">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-7">
                        <h1 className="display-4 fw-bold text-dark mb-4 border-bottom pb-3">
                            About StageWare
                        </h1>
                        <h3 className="text-primary fw-light mb-4">
                            Where Art Meets Engineering
                        </h3>
                        <p className="lead text-muted lh-lg">
                            At StageWare, we believe that every great performance begins long before the curtain rises. It starts with the texture of a velvet drape, the precision of a motorized track, and the structural integrity of a scenic frame. Based in the heart of the region, we specialize in providing the backbone of the entertainment industry.
                        </p>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className="p-2 border rounded-4 shadow-sm">
                            <img
                                src="/logo.png"
                                alt="Stage Engineering"
                                className="img-fluid rounded-4"
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-5 py-5 bg-light rounded-4 px-4 mx-1 shadow-sm">
                    <div className="col-12 text-center mb-4">
                        <h2 className="fw-bold text-dark">Our Story</h2>
                    </div>
                    <div className="col-lg-10 mx-auto text-center">
                        <p className="text-muted fs-5">
                            We did not start as a warehouse; we started as enthusiasts of the craft. We saw a gap in the market for a supplier that truly understood the technical nuances of stagecraft, someone who knew the difference between a standard blackout fabric and specialized acoustic wool.
                        </p>
                        <p className="text-muted mt-3">
                            Over the years, we have grown into a trusted partner for theaters, production houses, and event planners. We have evolved from a simple supplier into a specialized curator of stage solutions, ensuring that every piece of equipment we provide is durable, professional, and reliable.
                        </p>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="fw-bold border-bottom d-inline-block pb-2">
                            Why Partners Choose Us
                        </h2>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                icon: <FaHardHat />,
                                title: "The Technical Edge",
                                desc: "We don't just sell products; we understand the engineering behind them."
                            },
                            {
                                icon: <FaUsers />,
                                title: "A Human Connection",
                                desc: "We pride ourselves on being accessible, working closely to fit your vision."
                            },
                            {
                                icon: <FaHandshake />,
                                title: "Clear Communication",
                                desc: "We keep projects moving with responsive support and practical guidance."
                            },
                            {
                                icon: <FaAward />,
                                title: "Curated Quality",
                                desc: "Every item has been hand-selected for performance on the global stage."
                            }
                        ].map((box, i) => (
                            <div key={i} className="col-md-6 col-lg-3">
                                <div className="card h-100 border-0 shadow-sm p-4 hover-lift text-center">
                                    <div className="text-primary fs-1 mb-3">{box.icon}</div>
                                    <h5 className="fw-bold mb-3">{box.title}</h5>
                                    <p className="text-muted small mb-0">{box.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row py-5 justify-content-center">
                    <div className="col-md-10 text-center border-top pt-5">
                        <h2 className="display-6 fw-bold mb-4">Our Mission</h2>
                        <p className="text-muted fs-5 mb-5">
                            Our mission is simple: to empower creators. We provide the tools, the fabrics, and the frames so that you can focus on the performance.
                        </p>
                        <a href="/contact" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm transition-zoom border-0">
                            Let's Start Your Project
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
