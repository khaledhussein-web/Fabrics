import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/Listing.css";

const SubSubListing = ({ t }) => {
    const { folderId } = useParams(); 
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubContent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/sub-content/${folderId}`);
                setContent(response.data.content || []);
            } catch (err) {
                console.error("Error fetching sub-content:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubContent();
    }, [folderId]);

    const getNameField = (item) => (t.dir === "rtl" ? item.name_ar || item.name_en : item.name_en);

    if (loading) return (
        <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary"></div>
        </div>
    );

    return (
        <div className="container py-5" dir={t.dir}>
            {/* Header style matching your Tracks/Frames pages */}
            <h2 className="display-6 fw-bold mb-5 border-bottom pb-3">
                {t?.viewDetails ? (t.dir === "rtl" ? "المنتجات" : "Products") : "Products"}
            </h2>

            <div className="row g-4">
                {content.map((item, index) => {
                    const itemId = item.product_id;
                    const itemHref = `/static-content/${itemId}`;

                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={itemId || index}>
                            {/* Card: matching the shadow-sm and border-0 look you liked */}
                            <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
                                
                                {/* Image Wrapper: bg-dark helps projection screens pop */}
                                <div className="bg-dark overflow-hidden" style={{ height: '220px' }}>
                                    <a href={itemHref}>
                                        <img 
                                            src={`http://localhost:5000/uploads/Fabrics/${item.image_path}`} 
                                            alt={getNameField(item)} 
                                            className="img-fluid w-100 h-100 transition-zoom"
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300x220?text=Projection+Screen";
                                            }}
                                        />
                                    </a>
                                </div>

                                {/* Card Body: p-3 and flex-column for clean alignment */}
                                <div className="card-body d-flex flex-column align-items-start p-3">
                                    <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                                        {getNameField(item)}
                                    </h6>
                                    
                                    {/* Pill Button: rounded-pill and px-4 as per your preference */}
                                    <a className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" href={itemHref}>
                                        {t?.viewDetails || (t.dir === "rtl" ? "عرض التفاصيل" : "View Details")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {content.length === 0 && !loading && (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted">No products found in this section.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubSubListing;