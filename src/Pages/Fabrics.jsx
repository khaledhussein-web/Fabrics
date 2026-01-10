import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Listing.css";

const Fabrics = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CATEGORY_ID = 1;
    // 💡 BASE URL for your images
    const IMAGE_BASE_URL = "http://localhost:5000/uploads/Fabrics/";
    const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                setContent(response.data.content);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load.");
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [API_URL]);

    const getNameField = (item) => {
        return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
    };

    if (loading) return <div className="text-center my-5 p-5">Loading...</div>;

    return (
        <div className="container-fluid py-5 bg-white" dir={t?.dir || "ltr"}>
            <div className="container">
                <h2 className="display-6 fw-bold mb-5 border-bottom pb-3">
                    {t?.productsCategories?.fabrics || "Fabrics"}
                </h2>
                
                <div className="row g-4">
                    {content.map((item, index) => {
                        const itemHref = item.is_folder 
                            ? `/products/sub-sub-list/${item.product_id}` 
                            : `/static-content/${item.product_id}`;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.product_id || index}>
                                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
                                    
                                    <div className="product-img-wrapper-wide bg-light">
                                        <a href={itemHref}>
                                            <img
                                                /* 💡 CONCATENATED PATH */
                                                src={`${IMAGE_BASE_URL}${item.image_path}`} 
                                                alt={getNameField(item)} 
                                                className="w-100 h-100 img-zoom-effect"
                                                style={{ objectFit: 'cover' }}
                                                /* 💡 Simplified onError to prevent the flickering loop */
                                                onError={(e) => { 
                                                    e.target.onerror = null; 
                                                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; 
                                                }}
                                            />
                                        </a>
                                    </div>

                                    <div className="card-body d-flex flex-column text-start p-3">
                                        <h6 className="card-title fw-bold mt-1 mb-auto text-dark">
                                            {getNameField(item)} 
                                        </h6>
                                        <div className="mt-4">
                                            <a className="btn btn-primary rounded-pill px-4 py-2 shadow-sm fw-bold d-inline-block" href={itemHref}>
                                                {item.is_folder ? "View Options" : "View Details"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Fabrics;