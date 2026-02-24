import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios"; 
import { UI } from "../i18n"; // استدعاء الترجمات

const ProductDetailPage = ({ t, dir }) => {
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

    const getFolderByCategory = (catId) => {
        switch (Number(catId)) {
            case 1: return "Fabrics";
            case 2: return "Flooring";
            case 3: return "Frames";
            case 4: return "Tracks";
            default: return "General";
        }
    };

    if (loading) return <div className="container py-5 text-center">Loading...</div>;
    if (error || !product) return <div className="container py-5 text-center text-danger">{error || "Not found"}</div>;

    const productName = dir === "rtl" ? product.name_ar || product.name_en : product.name_en;
    const productDescription = dir === "rtl" ? product.description_ar || product.description_en : product.description_en;

    const folder = getFolderByCategory(product.category_id);
    const imageUrl = product.image_path?.startsWith('/') 
        ? `http://localhost:5000${product.image_path}` 
        : `http://localhost:5000/uploads/${folder}/${product.image_path}`;

    const labels = dir === "rtl" ? UI.ar.productsDetails : UI.en.productsDetails;

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
                            {labels.details}
                        </h3>
                        
                        {/* Product Description */}
                        <div 
                            className="lead mb-4" 
                            style={{color:'#334155', lineHeight: '1.8'}} 
                            dangerouslySetInnerHTML={{ __html: productDescription || "" }}
                        ></div>
                        
                        {/* Extra Product Fields in 2 columns */}
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled" style={{color:'#334155', lineHeight:'1.8'}}>
                                    {dir === "rtl" ? (
                                        <>
                                            {product.product_code_ar && <li><strong>{labels.product_code}:</strong> {product.product_code_ar}</li>}
                                            {product.width_ar && <li><strong>{labels.width}:</strong> {product.width_ar}</li>}
                                            {product.fabric_thickness_ar && <li><strong>{labels.fabric_thickness}:</strong> {product.fabric_thickness_ar}</li>}
                                            {product.fr_durability_ar && <li><strong>{labels.fr_durability}:</strong> {product.fr_durability_ar}</li>}
                                        </>
                                    ) : (
                                        <>
                                            {product.product_code && <li><strong>{labels.product_code}:</strong> {product.product_code}</li>}
                                            {product.width && <li><strong>{labels.width}:</strong> {product.width}</li>}
                                            {product.fabric_thickness && <li><strong>{labels.fabric_thickness}:</strong> {product.fabric_thickness}</li>}
                                            {product.fr_durability && <li><strong>{labels.fr_durability}:</strong> {product.fr_durability}</li>}
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-unstyled" style={{color:'#334155', lineHeight:'1.8'}}>
                                    {dir === "rtl" ? (
                                        <>
                                            {product.roll_length_ar && <li><strong>{labels.roll_length}:</strong> {product.roll_length_ar}</li>}
                                            {product.weight_ar && <li><strong>{labels.weight}:</strong> {product.weight_ar}</li>}
                                            {product.fr_certification_ar && <li><strong>{labels.fr_certification}:</strong> {product.fr_certification_ar}</li>}
                                            {product.custom_dye_ar && <li><strong>{labels.custom_dye}:</strong> {product.custom_dye_ar}</li>}
                                        </>
                                    ) : (
                                        <>
                                            {product.roll_length && <li><strong>{labels.roll_length}:</strong> {product.roll_length}</li>}
                                            {product.weight && <li><strong>{labels.weight}:</strong> {product.weight}</li>}
                                            {product.fr_certification && <li><strong>{labels.fr_certification}:</strong> {product.fr_certification}</li>}
                                            {product.custom_dye && <li><strong>{labels.custom_dye}:</strong> {product.custom_dye}</li>}
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

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
