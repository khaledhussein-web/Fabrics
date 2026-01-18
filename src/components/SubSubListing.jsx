import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Use Link for smoother navigation
import axios from "axios";
import "../assets/Listing.css";

const SubSubListing = ({ t, dir }) => {
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
        "42": "velvetSynthetic"
    };

    useEffect(() => {
        let isMounted = true; // Prevents updating state on an unmounted component

        const fetchSubContent = async () => {
            try {
                // 1. Reset states immediately when folderId changes
                setLoading(true);
                setError(null);
                setContent([]); 

                const response = await axios.get(`http://localhost:5000/api/sub-content/${folderId}`);
                
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

        // 2. Cleanup function to cancel the request logic if user leaves the page
        return () => {
            isMounted = false;
        };
    }, [folderId]); // Listens specifically for changes in the URL parameter

    const getNameField = (item) => (dir === "rtl" ? item.name_ar || item.name_en : item.name_en);

    const uiKey = folderKeyMap[folderId];
    const folderTitle = t?.fabricsDirectSubCategories?.[uiKey] || (dir === "rtl" ? "المنتجات" : "Products");

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
                {dir === "rtl" ? "إعادة المحاولة" : "Try Again"}
            </button>
        </div>
    );

    return (
        <div className="container py-5" dir={dir || "ltr"}>
            <div className="row mb-5">
                <div className="col-12">
                    <h2 className="display-6 fw-bold border-bottom pb-3 text-dark">
                        {folderTitle}
                    </h2>
                </div>
            </div>

            <div className="row g-4">
                {content.map((item, index) => {
                    // Using Link instead of <a> tags prevents full page reloads 
                    // and makes the 'Back' button work better in React apps.
                    const itemHref = `/product/${item.product_id}`;

                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.product_id || index}>
                            <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white hover-lift">
                                <div className="bg-dark overflow-hidden" style={{ height: '220px' }}>
                                    <Link to={itemHref}>
                                        <img 
                                            src={`http://localhost:5000${item.image_path}`} 
                                            alt={getNameField(item)} 
                                            className="img-fluid w-100 h-100 img-zoom-effect"
                                            style={{ objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/300x220?text=StageWare";
                                            }}
                                        />
                                    </Link>
                                </div>

                                <div className="card-body d-flex flex-column align-items-start p-3">
                                    <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                                        {getNameField(item)}
                                    </h6>
                                    <Link className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" to={itemHref}>
                                        {t?.viewDetails || (dir === "rtl" ? "عرض التفاصيل" : "View Details")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {content.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted fs-5">
                            {dir === "rtl" ? "لا توجد منتجات حالياً" : "No products found."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubSubListing;