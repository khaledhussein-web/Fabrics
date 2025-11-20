import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios"; 
// Import your necessary CSS here, e.g.:
// import "../../assets/ProductDetail.css"; 

const ProductDetailPage = ({ t, dir }) => {
    // 1. Get the Product ID from the URL parameters
    const { productId } = useParams(); 
    
    // Initialize state to null/empty, relying on the API fetch below
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true); // Start loading
    const [error, setError] = useState(null);
    
    // Define the API URL for clarity
    const API_URL = `http://localhost:5000/api/product/${productId}`;

    // 2. useEffect Hook to Fetch Data from the API
    useEffect(() => {
        
        if (!productId) {
            setError("Invalid product URL. ID is missing.");
            setLoading(false);
            return;
        }
        
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // AXIOS CALL TO THE BACKEND SERVER
                const response = await axios.get(API_URL);
                
                // Assuming your API returns the product details directly or nested under 'product'
                // Adjust response.data.product based on your backend response structure
                setProduct(response.data.product || response.data); 
                
            } catch (err) {
                console.error(`Error fetching Product ID ${productId}:`, err);
                setError(`Failed to load product details for ID ${productId}. Please check the Backend API.`);
                setProduct(null); 
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails(); // Execute the fetch
        
        // Dependency array: re-run effect if productId or API_URL changes
    }, [productId, API_URL]); 

    // Helper function for multilingual display
    const getNameField = (item) => {
        // Fallback to name_en if name_ar is null, and vice versa
        return dir === "rtl" ? item?.name_ar || item?.name_en : item?.name_en || item?.name_ar;
    };

    // --- RENDERING LOGIC ---

    if (loading) {
        return <div className="product-detail-page m-4">Loading Product details...</div>;
    }

    if (error) {
        // Display the error message if the API call failed
        return <div className="product-detail-page m-4 text-danger">{error}</div>;
    }

    if (!product) {
        // If loading finished but product is null (e.g., product doesn't exist in DB)
        return <div className="product-detail-page m-4">Product not found.</div>;
    }

    // Dynamic content extraction
    const productName = getNameField(product);
    const productDescription = dir === "rtl" ? product.description_ar : product.description_en;
    // Assuming image_path is returned from the DB, append it to your base URL
    const imageUrl = product.image_path ? `http://localhost:5000${product.image_path}` : 'path/to/default/image.jpg';


    return (
        <div className="product-detail-page m-4" dir={dir || "ltr"}>
            <div className="container container--regular mb-5">
                
                {/* 🔹 Product Title (using DB data) */}
                <h1 className="mb-5 display-5 fw-bold">{productName}</h1>
                
                <div className="row g-5">
                    
                    {/* 🔹 Left Column: Image */}
                    <div className="col-lg-5 col-md-6">
                        <img
                            src={imageUrl} 
                            alt={productName} 
                            className="img-fluid rounded shadow-lg"
                        />
                    </div>

                    {/* 🔹 Right Column: Details */}
                    <div className="col-lg-7 col-md-6">
                        
                        <h3 className="mb-4 text-accent">
                            {t?.details || (dir === "rtl" ? "التفاصيل" : "Details")}
                        </h3>

                        {/* Description (using DB data) */}
                        <p className="lead" dangerouslySetInnerHTML={{ __html: productDescription }}>
                        </p>

                        {/* Example of displaying additional data points from the DB */}
                        <ul className="list-unstyled mt-4">
                            <li className="mb-2">
                                <span className="fw-bold me-2">
                                    {t?.model || (dir === "rtl" ? "الموديل:" : "Model:")}
                                </span>
                                {/* Assuming product object has model_number field */}
                                {product.model_number || "N/A"}
                            </li>
                            <li className="mb-2">
                                <span className="fw-bold me-2">
                                    {t?.material || (dir === "rtl" ? "المادة:" : "Material:")}
                                </span>
                                {/* Assuming product object has material_type field */}
                                {product.material_type || "N/A"}
                            </li>
                        </ul>

                        {/* <div className="mt-5">
                            <a 
                                href="/contact" 
                                className="btn btn-primary btn-lg"
                            >
                                {t?.requestQuote || (dir === "rtl" ? "طلب عرض سعر" : "Request a Quote")}
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;