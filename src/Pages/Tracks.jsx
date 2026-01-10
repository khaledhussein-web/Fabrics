import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Listing.css";

const Tracks = ({ t }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CATEGORY_ID = 2;
    const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;

    useEffect(() => {
        const fetchTracksContent = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(API_URL);
                setContent(response.data.content);
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

    if (loading) return <div className="text-center my-5 py-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container py-5" dir={t?.dir || "ltr"}>
            {/* Bootstrap Typography & Border */}
            <h2 className="display-6 fw-bold mb-5 border-bottom pb-3">
                {t?.productsCategories?.tracks || "Tracks"}
            </h2>

            <div className="row g-4">
                {content.map((item, index) => {
                    const itemId = item.product_id; 
                    let itemHref = itemId === 4 || itemId === 8 
                        ? `/static-content/${itemId}` 
                        : `/products/fabrics/${itemId}`;

                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                            {/* Bootstrap Card: shadow-sm for depth, border-0 for clean look */}
                            <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
                                
                                {/* Image Container: Uses bg-dark to match track image backgrounds */}
                                <div className="bg-dark overflow-hidden">
                                    <a href={itemHref}>
                                        <img
                                            src={`http://localhost:5000/uploads/Tracks/${item.image_path}`} 
                                            alt={getNameField(item)} 
                                            className="img-fluid w-100 transition-zoom"
                                            loading="lazy"
                                        />
                                    </a>
                                </div>

                                {/* Card Body: p-3 provides the inset padding you liked */}
                                <div className="card-body d-flex flex-column align-items-start p-3">
                                    {/* Text: fw-bold and mb-3 for spacing */}
                                    <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                                        {getNameField(item)} 
                                    </h6>
                                    
                                    {/* Button: rounded-pill and px-4 for that specific pill shape */}
                                    <a className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" href={itemHref}>
                                        {t?.viewProducts || "View Products"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tracks;