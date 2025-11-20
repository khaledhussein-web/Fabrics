import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Listing.css";

const Fabrics = ({ t }) => {
    // State to hold the fetched content (L1 items)
    const [content, setContent] = useState([]);
    // State for loading status
    const [loading, setLoading] = useState(true);
    // State for error handling
    const [error, setError] = useState(null);

    // Hardcode the ID for the 'Fabrics' category (which is 1 in your DB)
    const CATEGORY_ID = 1;
    // Use the API route that fetches content for a given Parent Category ID
    const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;


    useEffect(() => {
        const fetchFabricsContent = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch the content where category_id = 1 and subcategory_id IS NULL
                const response = await axios.get(API_URL);

                // The API returns the data under the 'content' key
                setContent(response.data.content);
                
            } catch (err) {
                console.error("Error fetching Fabrics content:", err);
                setError("Failed to load products. Please check the server.");
                setContent([]); // Clear content on error
            } finally {
                setLoading(false);
            }
        };

        fetchFabricsContent();
    }, [API_URL]);

    // Determine which field to display based on translation context
    const getNameField = (item) => {
        // If translation direction is RTL (Arabic), use name_ar, otherwise use name_en
        return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
    };

    // --- RENDERING LOGIC ---

    if (loading) {
        return <div className="fabrics-page m-4">Loading Fabrics content...</div>;
    }

    if (error) {
        return <div className="fabrics-page m-4 text-danger">{error}</div>;
    }

    if (content.length === 0) {
        return <div className="fabrics-page m-4">No content found for Fabrics.</div>;
    }


    return (
        <div className="fabrics-page m-4" dir={t?.dir || "ltr"}>
            {/* 🔹 Dashboard grid (dynamic content from DB) */}
            <div className="container container--regular mb-5">
                <h2 className="mb-4">{t?.productsCategories?.fabrics || "Fabrics"}</h2>
                <div className="row g-4">
                    
                    {content.map((item, index) => {
                        
                        let itemHref = '';
                        // IMPORTANT: Use the correct primary key from the DB
                        const itemId = item.product_id; 
                        
                        // ⭐️ NEW LOGIC IMPLEMENTATION ⭐️
                        
                        // Example 1: Use a specific ID to trigger the STATIC PAGE link
                        // If you want ID 4 ('Acoustic, Masking and Blackout') to be a static page:
                        if (itemId === 4) { 
                            itemHref = `/static-content/${itemId}`; 
                        } 
                        // Example 2: Use another ID (e.g., ID 8 'Flooring') to be a static page
                        else if (itemId === 8) {
                            itemHref = `/static-content/${itemId}`;
                        }
                        
                        // Default Link: If the item is not flagged for static content, 
                        // it links to the L2 Subcategory List Page (original behavior).
                        else {
                            // Link to the SubcategoryPage component
                            itemHref = `/products/fabrics/${itemId}`;
                        }
                        
                        return (
                            <div
                                className="col-12 col-sm-6 col-md-4 col-lg-3"
                                key={itemId || index} 
                            >
                                <div className="align-items-start card border-0">
                                    <div className="product-image-wrapper shadow-sm">
                                    <a href={itemHref}>
                                        <img
                                            // Assuming image_path is returned from the DB
                                            src={`http://localhost:5000${item.image_path}`} 
                                            alt={getNameField(item)} 
                                            loading="lazy"
                                        />
                                    </a>
                                    </div>
                                    {/* Display the name based on language/direction */}
                                    <p className="mt-3 fw-bold text-center">
                                        {getNameField(item)} 
                                    </p>
                                    
                                    <div className="text-center">
                                        <a className="btn btn-primary" href={itemHref}>
                                            {t?.viewProducts || "View Products"}
                                        </a>
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