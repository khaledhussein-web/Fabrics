import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios"; 

const ProductDetailPage = ({ t, dir }) => {
    // 1. productId must match your App.js route exactly
    const { productId } = useParams(); 
    
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    
    const API_URL = `http://localhost:5000/api/product/${productId}`;

    useEffect(() => {
        if (!productId || productId === "undefined") {
            setError("Invalid product ID.");
            setLoading(false);
            return;
        }
        
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                // Extracting 'product' object from the API response
                setProduct(response.data.product || response.data); 
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [productId, API_URL]); 

    // Helper: Determine folder based on category_id
    const getFolderByCategory = (catId) => {
        switch (catId) {
            case 1: return "Fabrics";
            case 2: return "Tracks";
            case 3: return "Frames";
            default: return "General";
        }
    };

    if (loading) return <div className="container py-5 text-center">Loading...</div>;
    if (error || !product) return <div className="container py-5 text-center text-danger">{error || "Not found"}</div>;

    const productName = dir === "rtl" ? product.name_ar || product.name_en : product.name_en;
    
    // 💡 DYNAMIC IMAGE PATH LOGIC
    // Uses category_id from DB to pick the right folder
    const folder = getFolderByCategory(product.category_id);
    const imageUrl = product.image_path?.startsWith('/') 
        ? `http://localhost:5000${product.image_path}` 
        : `http://localhost:5000/uploads/${folder}/${product.image_path}`;

    return (
        <div className="product-detail-page py-5" dir={dir || "ltr"}>
            <div className="container">
                <h1 className="mb-5 display-5 fw-bold" style={{color:'#1e3a8a'}}>{productName}</h1>
                
                <div className="row g-5">
                    <div className="col-lg-5">
                        <img
                            src={imageUrl} 
                            alt={productName} 
                            className="img-fluid rounded shadow-lg"
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = "https://via.placeholder.com/500x400?text=Image+Not+Found"; 
                            }}
                        />
                    </div>

                    <div className="col-lg-7">
                        <h3 className="mb-4" style={{color:'#1e3a8a'}}>
                            {t?.details || (dir === "rtl" ? "التفاصيل" : "Details")}
                        </h3>
                        <div 
                            className="lead" 
                            style={{color:'#334155', lineHeight: '1.8'}} 
                            dangerouslySetInnerHTML={{ __html: product.description_en || "" }}
                        ></div>
                        
                        <div className="mt-5">
                            <button onClick={() => window.history.back()} className="btn btn-primary rounded-pill px-4">
                                {dir === "rtl" ? "العودة" : "Back"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;