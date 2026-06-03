import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/Listing.css";
import Seo from "../components/Seo";
import { toApiUrl, toProductImageUrl } from "../config/env";
import { collectionJsonLd } from "../seo";

const Flooring = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CATEGORY_ID = 2;
    const API_URL = toApiUrl(`/api/category-content/${CATEGORY_ID}`);

    useEffect(() => {
        let isMounted = true;

        const fetchContent = async () => {
            try {
                setLoading(true);
                setError(null);
                setContent([]);

                const response = await axios.get(API_URL);

                if (isMounted) {
                    setContent(response.data.content || []);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                if (isMounted) setError("Failed to load.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchContent();

        return () => {
            isMounted = false;
        };
    }, [API_URL]);

    const getNameField = (item) => item.name_en;

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

    const topLevelContent = content.filter((item) => item.parent_id === null);
    const pageTitle = "Flooring | StageWare";
    const pageDescription =
        "Professional flooring solutions for theatres and events, including flame-retardant performance options.";

    return (
        <div className="container-fluid py-5 bg-white" dir="ltr">
            <Seo
                title={pageTitle}
                description={pageDescription}
                image="/flooring.jpg"
                jsonLd={collectionJsonLd({
                    name: "StageWare Flooring",
                    description: pageDescription,
                    path: "/products/flooring",
                    items: topLevelContent.map((item) => ({
                        name: getNameField(item),
                        url: item.is_folder
                            ? `/products/sub-sub-list/${item.product_id}`
                            : `/static-content/${item.product_id}`,
                    })),
                })}
            />
            <div className="container">
                <h1 className="display-6 fw-bold mb-5 border-bottom pb-3 text-dark">
                    {t?.productsCategories?.flooring || "Flooring"}
                </h1>

                <div className="row g-4">
                    {topLevelContent.map((item, index) => {
                        const itemId = item.product_id;
                        const itemHref = item.is_folder
                            ? `/products/sub-sub-list/${itemId}`
                            : `/static-content/${itemId}`;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white hover-lift">
                                    <div className="product-img-wrapper-wide bg-light overflow-hidden">
                                        <Link to={itemHref}>
                                            <img
                                                src={toProductImageUrl(item.image_path, item.category_id)}
                                                alt={getNameField(item)}
                                                className="w-100 h-100 img-zoom-effect"
                                                style={{ objectFit: "cover" }}
                                                loading="lazy"
                                                onError={(e) => {
                                                    if (!e.target.src.endsWith("/logo.png")) {
                                                        e.target.onerror = null;
                                                        e.target.src = "/logo.png";
                                                    }
                                                }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="card-body d-flex flex-column text-start p-3">
                                        <h6 className="card-title fw-bold mt-1 mb-auto text-dark">
                                            {getNameField(item)}
                                        </h6>
                                        <div className="mt-4">
                                            <Link className="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-bold d-inline-block border-0" to={itemHref}>
                                                {item.is_folder ? "View Options" : "View Details"}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {topLevelContent.length === 0 && (
                    <div className="text-center py-5">
                        <p className="text-muted">No top-level categories found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Flooring;
