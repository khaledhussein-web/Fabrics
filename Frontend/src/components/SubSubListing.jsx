import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../assets/Listing.css";
import Seo from "./Seo";
import { toApiUrl, toProductImageUrl } from "../config/env";
import { breadcrumbJsonLd, collectionJsonLd } from "../seo";

const SubSubListing = ({ t }) => {
    const { folderId } = useParams();
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const folderKeyMap = {
        "32": "acousticMaskingBlackout",
        "33": "chromaKey",
        "34": "decorativeDisplay",
        "35": "digitalPrint",
        "36": "flooring",
        "37": "muslinCanvasScenic",
        "38": "projectionScreens",
        "39": "scrimGauzeNetting",
        "40": "sheersSilksSatins",
        "41": "velvetNatural",
        "42": "velvetSynthetic",
    };

    useEffect(() => {
        let isMounted = true;

        const fetchSubContent = async () => {
            try {
                setLoading(true);
                setError(null);
                setContent([]);

                const response = await axios.get(toApiUrl(`/api/sub-content/${folderId}`));

                if (isMounted) {
                    setContent(response.data.content || []);
                }
            } catch (err) {
                console.error("Error fetching sub-content:", err);
                if (isMounted) setError("Failed to load products.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (folderId) {
            fetchSubContent();
        }

        return () => {
            isMounted = false;
        };
    }, [folderId]);

    const getNameField = (item) => item.name_en;

    const uiKey = folderKeyMap[folderId];
    const folderTitle = t?.fabricsDirectSubCategories?.[uiKey] || "Products";
    const pagePath = `/products/sub-sub-list/${folderId}`;
    const pageDescription = `Browse ${folderTitle} products from StageWare.`;

    if (loading) return (
        <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container py-5 text-center text-danger">
            <h4>{error}</h4>
            <button className="btn btn-outline-primary mt-3" onClick={() => window.location.reload()}>
                Try Again
            </button>
        </div>
    );

    return (
        <div className="container py-5" dir="ltr">
            <Seo
                title={`${folderTitle} | StageWare`}
                description={pageDescription}
                jsonLd={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: t?.productsCategories?.fabrics || "Fabrics", path: "/products/fabrics" },
                        { name: folderTitle, path: pagePath },
                    ]),
                    collectionJsonLd({
                        name: folderTitle,
                        description: pageDescription,
                        path: pagePath,
                        items: content.map((item) => ({
                            name: getNameField(item),
                            url: `/product/${item.product_id}`,
                        })),
                    }),
                ]}
            />
            <div className="row mb-5">
                <div className="col-12">
                    <h1 className="display-6 fw-bold border-bottom pb-3 text-dark">
                        {folderTitle}
                    </h1>
                </div>
            </div>

            <div className="row g-4">
                {content.map((item, index) => {
                    const itemHref = `/product/${item.product_id}`;

                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.product_id || index}>
                            <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white hover-lift">
                                <div className="bg-dark overflow-hidden" style={{ height: "220px" }}>
                                    <Link to={itemHref}>
                                        <img
                                            src={toProductImageUrl(item.image_path, item.category_id)}
                                            alt={getNameField(item)}
                                            className="img-fluid w-100 h-100 img-zoom-effect"
                                            style={{ objectFit: "cover" }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/logo.png";
                                            }}
                                        />
                                    </Link>
                                </div>

                                <div className="card-body d-flex flex-column align-items-start p-3">
                                    <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                                        {getNameField(item)}
                                    </h6>
                                    <Link className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" to={itemHref}>
                                        {t?.viewDetails || "View Details"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {content.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted fs-5">No products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubSubListing;
