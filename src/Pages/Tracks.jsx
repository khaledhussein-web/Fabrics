import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Listing.css";

const Tracks = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Category 2 is for Tracks based on your database
    const CATEGORY_ID = 2;
    const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;

    useEffect(() => {
        const fetchTracksContent = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(API_URL);
                
                // Ensure we handle the nested 'content' key from your API response
                setContent(response.data.content || []);
            } catch (err) {
                console.error("Error fetching Tracks content:", err);
                setError("Failed to load products.");
                setContent([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchTracksContent();
    }, [API_URL]);

    const getNameField = (item) => {
        return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
    };

    if (loading) return (
        <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary"></div>
        </div>
    );

    if (error) return (
        <div className="container py-5 text-center text-danger">
            <h3>{error}</h3>
        </div>
    );

    return (
        <div className="container py-5" dir={t?.dir || "ltr"}>
            <h2 className="display-6 fw-bold mb-5 border-bottom pb-3">
                {t?.productsCategories?.tracks || (t?.dir === "rtl" ? "المسارات" : "Tracks")}
            </h2>

            <div className="row g-4">
                {content.length > 0 ? (
                    content.map((item, index) => {
                        const itemId = item.product_id; 
                        
                        // 🔑 FIX: Point all items to /static-content/ to use the ProductDetailPage
                        // This matches your working Frames logic
                        const itemHref = `/static-content/${itemId}`;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
                                    
                                    <div className="bg-dark overflow-hidden">
                                        <a href={itemHref}>
                                            <img
                                                src={`http://localhost:5000/uploads/Tracks/${item.image_path}`} 
                                                alt={getNameField(item)} 
                                                className="img-fluid w-100 h-100 transition-zoom"
                                                style={{ objectFit: 'cover' }}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                                                }}
                                            />
                                        </a>
                                    </div>

                                    <div className="card-body d-flex flex-column align-items-start p-3">
                                        <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                                            {getNameField(item)} 
                                        </h6>
                                        
                                        <a className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" href={itemHref}>
                                            {t?.viewProducts || (t?.dir === "rtl" ? "عرض التفاصيل" : "View Details")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center">
                        <p className="lead text-muted">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracks;