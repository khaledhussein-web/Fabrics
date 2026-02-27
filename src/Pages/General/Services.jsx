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

const Services = ({ t }) => {
    const isRtl = t?.dir === "rtl";

    return (
        <div className="services-page bg-white" dir={isRtl ? "rtl" : "ltr"}>
            <Seo
                title={isRtl ? "خدماتنا | ستايج وير" : "Services | StageWare"}
                description={
                    isRtl
                        ? "حلول متكاملة للأقمشة، المسارات، الإطارات، والتركيب الاحترافي للمسارح والفعاليات."
                        : "End-to-end services for stage fabrics, track systems, framing, and professional installation."
                }
            />
            <div className="container py-5">
                {/* --- Main Header pulled from i18n.js --- */}
                <div className="row mb-5">
                    <div className="col-lg-8">
                        <h1 className="display-5 fw-bold text-dark mb-4 border-bottom pb-3">
                            {t?.services || (isRtl ? "خدماتنا" : "Our Services")}
                        </h1>
                        <p className="lead text-muted">
                            {isRtl 
                                ? "في ستيدج وير، نحن لا نوفر المواد فحسب؛ بل نصمم البيئات. سواء كان مسرحاً وطنياً، أو فعالية للشركات، أو مشروعاً معمارياً متخصصاً، يقدم فريقنا حلولاً متكاملة مصممة خصيصاً للمتطلبات الفريدة لمساحتك."
                                : "At StageWare, we don't just supply materials; we engineer environments. Whether it’s a national theater, a corporate event, or a specialized architectural project, our team provides end-to-end solutions tailored to the unique demands of your space."}
                        </p>
                    </div>
                </div>

                {/* --- Services Grid --- */}
                <div className="row g-4">
                    {/* 1. Bespoke Fabric Solutions */}
                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaCut /></div>
                            <h5 className="fw-bold mb-3">{isRtl ? "حلول الأقمشة المخصصة" : "Bespoke Fabric Solutions"}</h5>
                            <p className="text-muted small">
                                {isRtl 
                                    ? "نحن متخصصون في اختيار وتخصيص المنسوجات الزخرفية والتقنية الفاخرة."
                                    : "Specializing in the selection and customization of premium decorative and technical textiles."}
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "التميز الصوتي" : "Acoustic Excellence"}</li>
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "الأمان أولاً" : "Safety First"}</li>
                                <li><span className="text-primary me-2">•</span>{isRtl ? "هوية مخصصة" : "Custom Branding"}</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Precision Track & Reveal */}
                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaSlidersH /></div>
                            <h5 className="fw-bold mb-3">{isRtl ? "أنظمة المسارات والإزاحة" : "Precision Track Systems"}</h5>
                            <p className="text-muted small">
                                {isRtl 
                                    ? "تصميم وتركيب 'العظام' الحركية للمسرح لتحقيق انتقالات سلسة."
                                    : "Designing the 'bones' of your stage—tracking systems that make transitions look effortless."}
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "هندسة للأحمال الثقيلة" : "Heavy-Duty Engineering"}</li>
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "أنظمة الكشف واللف" : "Reveal & Roll-up Systems"}</li>
                                <li><span className="text-primary me-2">•</span>{isRtl ? "تشغيل صامت" : "Silent Operation"}</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. Structural Framing */}
                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaLayerGroup /></div>
                            <h5 className="fw-bold mb-3">{isRtl ? "الهياكل والدعم الإنشائي" : "Structural Framing"}</h5>
                            <p className="text-muted small">
                                {isRtl 
                                    ? "القوة الخفية وراء كل عرض رائع؛ توفر الدعم الصلب للشاشات والديكور."
                                    : "The hidden strength providing rigid support for projection screens and scenic elements."}
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "تصميم معياري" : "Modular Design"}</li>
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "انحناءات مخصصة" : "Custom Curvature"}</li>
                                <li><span className="text-primary me-2">•</span>{isRtl ? "تكامل في الموقع" : "On-Site Integration"}</li>
                            </ul>
                        </div>
                    </div>

                    {/* 4. Professional Installation */}
                    <div className="col-md-6 col-xl-3">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-lift bg-white">
                            <div className="mb-3 text-primary fs-2"><FaTools /></div>
                            <h5 className="fw-bold mb-3">{isRtl ? "التركيب والاستشارات" : "Installation & Consult"}</h5>
                            <p className="text-muted small">
                                {isRtl 
                                    ? "يتولى فريقنا الفني التعقيدات حتى تتمكن أنت من التركيز على الأداء."
                                    : "Our technical team handles the complexity so you can focus on the performance."}
                            </p>
                            <ul className="list-unstyled small mt-auto text-secondary">
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "مسح ميداني دقيق" : "Detailed Site Surveys"}</li>
                                <li className="mb-2"><span className="text-primary me-2">•</span>{isRtl ? "خبراء فنيين" : "Expert Riggers"}</li>
                                <li><span className="text-primary me-2">•</span>{isRtl ? "وصول إقليمي" : "Regional Reach"}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- Approved Client Quote --- */}
                <div className="row mt-5 pt-5 justify-content-center">
                    <div className="col-md-10 text-center">
                        <div className="bg-light p-4 p-md-5 rounded-4 shadow-sm position-relative">
                            <FaQuoteLeft className={`position-absolute top-0 ${isRtl ? 'end-0' : 'start-0'} m-4 text-primary opacity-25`} size={40} />
                            <h3 className="fw-light fst-italic text-dark mb-4">
                                {isRtl 
                                    ? "نحن نؤمن بأن كل تفصيل مهم - لأنه تحت الأضواء، لا مجال للخطأ."
                                    : "We believe that every detail matters—because in the spotlight, there is no room for error."}
                            </h3>
                            <a href="/contact" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm border-0 transition-zoom">
                                {isRtl ? "تواصل معنا اليوم" : "Contact Us Today"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
