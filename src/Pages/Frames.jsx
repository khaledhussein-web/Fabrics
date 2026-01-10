import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Listing.css";

const Frames = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CATEGORY_ID = 3;
    const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(API_URL);
                setContent(response.data.content);
            } catch (err) {
                console.error("Error fetching content:", err);
                setError("Failed to load items.");
                setContent([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [API_URL]);

    const getNameField = (item) => {
        return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
    };

    if (loading) return <div className="text-center my-5"><strong>Loading...</strong></div>;

    return (
        <div className="container-fluid py-5 bg-white" dir={t?.dir || "ltr"}>
            <div className="container">
                <h2 className="display-6 fw-bold mb-5 border-bottom pb-3">
                    {t?.productsCategories?.frames || "Frames"}
                </h2>

                <div className="row g-4">
                    {content.map((item, index) => {
                        const itemId = item.product_id; 
                        const itemHref = item.is_folder 
                            ? `/products/sub-sub-list/${itemId}` 
                            : `/static-content/${itemId}`;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                                <div className="card h-100 border-0 shadow-sm product-card-v2 overflow-hidden">
                                    
                                    <div className="product-img-wrapper-wide">
                                        <a href={itemHref}>
                                            <img
                                                src={`http://localhost:5000/uploads/Frames/${item.image_path}`} 
                                                alt={getNameField(item)} 
                                                className="w-100 h-100 img-zoom-effect"
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>

                                    {/* 💡 The 'p-3' adds the small padding between the border and everything inside */}
                                    <div className="card-body d-flex flex-column text-start p-3">
                                        <h6 className="card-title fw-bold mb-3 flex-grow-1 text-dark">
                                            {getNameField(item)} 
                                        </h6>
                                        
                                        {/* 💡 'w-auto' and 'd-inline-block' keep the button from being full-width */}
                                        <div>
                                            <a className="btn btn-primary px-4 py-2 rounded-pill shadow-sm fw-bold d-inline-block" href={itemHref}>
                                                {item.is_folder 
                                                    ? (t?.viewOptions || "View Options") 
                                                    : (t?.viewDetails || "View Details")
                                                }
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

export default Frames;