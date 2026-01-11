import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Use Link for SPA navigation
import axios from "axios";
import "../assets/Listing.css";

const Frames = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CATEGORY_ID = 3;
    const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;

    useEffect(() => {
        let isMounted = true; // Prevents state updates on unmounted components

        const fetchContent = async () => {
            try {
                // 1. Reset states immediately to ensure a fresh UI on back/forward navigation
                setLoading(true);
                setError(null);
                setContent([]); 

                const response = await axios.get(API_URL);
                
                if (isMounted) {
                    setContent(response.data.content || []);
                }
            } catch (err) {
                console.error("Error fetching content:", err);
                if (isMounted) setError("Failed to load items.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchContent();

        // 2. Cleanup function to prevent memory leaks and ghost updates
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

    // 🚀 CONSTRAINT: Only display if category_id=3 AND parent_id is null
    const topLevelFrames = content.filter(item => item.parent_id === null);

    return (
        <div className="container-fluid py-5 bg-white" dir={t?.dir || "ltr"}>
            <div className="container">
                <h2 className="display-6 fw-bold mb-5 border-bottom pb-3 text-dark">
                    {t?.productsCategories?.frames || (t?.dir === "rtl" ? "الإطارات" : "Frames")}
                </h2>

                <div className="row g-4">
                    {topLevelFrames.map((item, index) => {
                        const itemId = item.product_id; 
                        
                        // 🔑 Consistent Link Logic for Folder vs Product
                        const itemHref = item.is_folder 
                            ? `/products/sub-sub-list/${itemId}` 
                            : `/static-content/${itemId}`;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white hover-lift">
                                    
                                    <div className="bg-dark overflow-hidden" style={{ height: '220px' }}>
                                        <Link to={itemHref}>
                                            <img
                                                src={`http://localhost:5000/uploads/Frames/${item.image_path}`} 
                                                alt={getNameField(item)} 
                                                className="w-100 h-100 img-zoom-effect"
                                                loading="lazy"
                                                style={{ objectFit: 'cover' }}
                                                onError={(e) => { 
                                                    e.target.onerror = null; 
                                                    e.target.src = "https://via.placeholder.com/300x200?text=Frame+System"; 
                                                }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="card-body d-flex flex-column text-start p-3">
                                        <h6 className="card-title fw-bold mb-3 flex-grow-1 text-dark">
                                            {getNameField(item)} 
                                        </h6>
                                        
                                        <div>
                                            <Link className="btn btn-primary px-4 py-2 rounded-pill shadow-sm fw-bold d-inline-block border-0" to={itemHref}>
                                                {item.is_folder 
                                                    ? (t?.dir === "rtl" ? "عرض الخيارات" : "View Options") 
                                                    : (t?.dir === "rtl" ? "عرض التفاصيل" : "View Details")
                                                }
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {topLevelFrames.length === 0 && !loading && (
                    <div className="col-12 text-center py-5">
                        <p className="lead text-muted">
                            {t?.dir === "rtl" ? "لا توجد فئات متاحة حالياً" : "No frame categories found."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Frames;