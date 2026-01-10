import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/Listing.css";

const SubSubListing = ({ t }) => {
    const { folderId } = useParams(); // Get the L3 ID from the URL
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubContent = async () => {
            try {
                setLoading(true);
                // Fetch products that belong to this specific L3 folder
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

    const getNameField = (item) => (t.dir === "rtl" ? item.name_ar : item.name_en);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="listing-page" dir={t.dir}>
            <div className="container">
                <div className="row mt-4">
                    {content.map((item) => (
                        <div key={item.product_id} className="col-md-4 mb-4">
                            <div className="product-card shadow-sm p-3">
                                <div className="product-image-wrapper">
                                    <img 
                                        src={`http://localhost:5000${item.image_path}`} 
                                        alt={getNameField(item)} 
                                    />
                                </div>
                                <p className="mt-3 fw-bold text-center">{getNameField(item)}</p>
                                <div className="text-center">
                                    {/* L4 items always go to the final details page */}
                                    <a className="btn btn-primary" href={`/static-content/${item.product_id}`}>
                                        {t?.viewDetails || "View Details"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubSubListing;