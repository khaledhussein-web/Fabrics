import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/Listing.css";
import Seo from "../components/Seo";
import { toApiUrl } from "../config/env";

const Tracks = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CATEGORY_ID = 4;
    const IMAGE_BASE_URL = toApiUrl("/uploads/Tracks");
    const API_URL = toApiUrl(`/api/category-content/${CATEGORY_ID}`);

    useEffect(() => {
        let isMounted = true;

        const fetchTracksContent = async () => {
            try {
                setLoading(true);
                setError(null);
                setContent([]);

                const response = await axios.get(API_URL);

                if (isMounted) {
                    setContent(response.data.content || []);
                }
            } catch (err) {
                console.error("Error fetching Tracks content:", err);
                if (isMounted) setError("Failed to load products.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTracksContent();

        return () => {
            isMounted = false;
        };
    }, [API_URL]);

    const getNameField = (item) => {
        return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
    };

    if (loading) return (
        <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container py-5 text-center text-danger">
            <h3>{error}</h3>
        </div>
    );

    const topLevelTracks = content.filter((item) => item.parent_id === null);

    return (
        <div className="container py-5" dir={t?.dir || "ltr"}>
            <Seo
                title={t?.dir === "rtl" ? "المسارات | ستايج وير" : "Tracks | StageWare"}
                description={
                    t?.dir === "rtl"
                        ? "أنظمة مسارات احترافية يدوية وآلية للستائر والحلول المسرحية."
                        : "Professional manual and motorized track systems for curtains and stage applications."
                }
            />
            <h1 className="display-6 fw-bold mb-5 border-bottom pb-3 text-dark">
                {t?.productsCategories?.tracks || (t?.dir === "rtl" ? "المسارات" : "Tracks")}
            </h1>

            <div className="row g-4">
                {topLevelTracks.length > 0 ? (
                    topLevelTracks.map((item, index) => {
                        const itemId = item.product_id;
                        const itemHref = item.is_folder
                            ? `/products/sub-sub-list/${itemId}`
                            : `/static-content/${itemId}`;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white hover-lift">
                                    <div className="bg-dark overflow-hidden" style={{ height: "220px" }}>
                                        <Link to={itemHref}>
                                            <img
                                                src={`${IMAGE_BASE_URL}/${item.image_path}`}
                                                alt={getNameField(item)}
                                                className="img-fluid w-100 h-100 img-zoom-effect"
                                                style={{ objectFit: "cover" }}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://via.placeholder.com/300x200?text=Track+System";
                                                }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="card-body d-flex flex-column align-items-start p-3">
                                        <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                                            {getNameField(item)}
                                        </h6>

                                        <Link className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" to={itemHref}>
                                            {item.is_folder
                                                ? (t?.dir === "rtl" ? "عرض الخيارات" : "View Options")
                                                : (t?.dir === "rtl" ? "عرض التفاصيل" : "View Details")
                                            }
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="lead text-muted">
                            {t?.dir === "rtl" ? "لا توجد مسارات حالياً" : "No track systems found."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracks;
