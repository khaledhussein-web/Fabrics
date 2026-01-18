import React from "react";
import { FaHardHat, FaUsers, FaLanguage, FaAward } from "react-icons/fa";
import "../../assets/Listing.css";

const About = ({ t }) => {
    const isRtl = t?.dir === "rtl";

    return (
        <div className="about-page bg-white" dir={isRtl ? "rtl" : "ltr"}>
            {/* --- Hero Section --- */}
            <div className="container py-5">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-7">
                        <h1 className="display-4 fw-bold text-dark mb-4 border-bottom pb-3">
                            {isRtl ? "عن ستيدج وير" : "About StageWare"}
                        </h1>
                        <h3 className="text-primary fw-light mb-4">
                            {isRtl ? "حيث يلتقي الفن بالهندسة" : "Where Art Meets Engineering"}
                        </h3>
                        <p className="lead text-muted lh-lg">
                            {isRtl 
                                ? "في ستيدج وير، نؤمن أن كل أداء عظيم يبدأ قبل وقت طويل من رفع الستار. يبدأ بملمس ستارة مخملية، ودقة مسار آلي، والمتانة الهيكلية لإطار سينمائي. ومقرنا في قلب المنطقة، نحن متخصصون في توفير 'العمود الفقري' لصناعة الترفيه."
                                : "At StageWare, we believe that every great performance begins long before the curtain rises. It starts with the texture of a velvet drape, the precision of a motorized track, and the structural integrity of a scenic frame. Based in the heart of the region, we specialize in providing the 'backbone' of the entertainment industry."}
                        </p>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className="p-2 border rounded-4 shadow-sm">
                            <img 
                                src="logo.png"
                                alt="Stage Engineering" 
                                className="img-fluid rounded-4"
                            />
                        </div>
                    </div>
                </div>

                {/* --- Our Story Section --- */}
                <div className="row mb-5 py-5 bg-light rounded-4 px-4 mx-1 shadow-sm">
                    <div className="col-12 text-center mb-4">
                        <h2 className="fw-bold text-dark">{isRtl ? "قصتنا" : "Our Story"}</h2>
                    </div>
                    <div className="col-lg-10 mx-auto text-center">
                        <p className="text-muted fs-5">
                            {isRtl 
                                ? "لم نبدأ كمستودع؛ بل بدأنا كعشاق لهذه الحرفة. رأينا فجوة في السوق لمورد يفهم حقاً الفروق الدقيقة التقنية لفنون المسرح - شخص يعرف الفرق بين نسيج التعتيم القياسي والصوف الصوتي المتخصص."
                                : "We didn’t start as a warehouse; we started as enthusiasts of the craft. We saw a gap in the market for a supplier that truly understood the technical nuances of stagecraft—someone who knew the difference between a standard blackout fabric and specialized acoustic wool."}
                        </p>
                        <p className="text-muted mt-3">
                            {isRtl
                                ? "على مر السنين، نمونا لنصبح شريكاً موثوقاً للمسارح وشركات الإنتاج. لقد تطورنا من مورد بسيط إلى منسق متخصص لحلول المسرح، مما يضمن أن كل قطعة معدات نوفرها هي بجودة 'Real Boss' - متينة واحترافية وموثوقة."
                                : "Over the years, we have grown into a trusted partner for theaters, production houses, and event planners. We have evolved from a simple supplier into a specialized curator of stage solutions, ensuring that every piece of equipment we provide is 'Real Boss' quality—durable, professional, and reliable."}
                        </p>
                    </div>
                </div>

                {/* --- Why Partners Choose Us (Grid) --- */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="fw-bold border-bottom d-inline-block pb-2">
                            {isRtl ? "لماذا يختارنا الشركاء" : "Why Partners Choose Us"}
                        </h2>
                    </div>
                    
                    <div className="row g-4">
                        {[
                            {
                                icon: <FaHardHat />,
                                title: isRtl ? "التفوق التقني" : "The Technical Edge",
                                desc: isRtl ? "نحن لا نبيع المنتجات فحسب؛ بل نفهم الهندسة الكامنة وراءها." : "We don't just sell products; we understand the engineering behind them."
                            },
                            {
                                icon: <FaUsers />,
                                title: isRtl ? "اتصال إنساني" : "A Human Connection",
                                desc: isRtl ? "نحن نفخر بكوننا متاحين للعمل وثيقاً مع عملائنا." : "We pride ourselves on being accessible, working closely to fit your vision."
                            },
                            {
                                icon: <FaLanguage />,
                                title: isRtl ? "خبرة ثنائية اللغة" : "Bilingual Expertise",
                                desc: isRtl ? "نقدم دعماً كاملاً باللغتين الإنجليزية والعربية." : "Full support in both English and Arabic for seamless communication."
                            },
                            {
                                icon: <FaAward />,
                                title: isRtl ? "جودة مختارة" : "Curated Quality",
                                desc: isRtl ? "كل صنف في كتالوجنا تم اختياره يدوياً لأدائه." : "Every item has been hand-selected for performance on the global stage."
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

                {/* --- Mission Section (Call to Action Style) --- */}
                <div className="row py-5 justify-content-center">
                    <div className="col-md-10 text-center border-top pt-5">
                        <h2 className="display-6 fw-bold mb-4">{isRtl ? "مهمتنا" : "Our Mission"}</h2>
                        <p className="text-muted fs-5 mb-5">
                            {isRtl 
                                ? "مهمتنا بسيطة: تمكين المبدعين. نحن نوفر الأدوات والأقمشة والإطارات حتى تتمكن من التركيز على الأداء."
                                : "Our mission is simple: To empower creators. We provide the tools, the fabrics, and the frames so that you can focus on the performance."}
                        </p>
                        <a href="/contact" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm transition-zoom border-0">
                            {isRtl ? "لنبدأ مشروعك" : "Let's Start Your Project"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;