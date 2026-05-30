import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UI } from "../i18n";
import Seo from "./Seo";
import { toApiUrl, toProductImageUrl } from "../config/env";

const ProductDetailPage = ({ dir }) => {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = toApiUrl(`/api/product/${productId}`);

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

    if (loading) return <div className="container py-5 text-center">Loading...</div>;
    if (error || !product) return <div className="container py-5 text-center text-danger">{error || "Not found"}</div>;

    const productName = dir === "rtl" ? product.name_ar || product.name_en : product.name_en;
    const productDescription = dir === "rtl" ? product.description_ar || product.description_en : product.description_en;
    const productDescriptionText = String(productDescription || "").replace(/<[^>]*>/g, "");

    const imageUrl = toProductImageUrl(product.image_path, product.category_id);
    const additionalPhotos = (product.additional_photos || [])
        .map((item) => ({
            url: toProductImageUrl(item.photo_url, product.category_id),
            alt: dir === "rtl" ? item.alt_text_ar || item.alt_text : item.alt_text || item.alt_text_ar,
        }))
        .filter((item) => item.url && item.url !== imageUrl);

    const labels = dir === "rtl" ? UI.ar.productsDetails : UI.en.productsDetails;

    const renderSpecs = () => {
        if (!product.specs) return null;

        const specs = product.specs;
        const isRTL = dir === "rtl";

        return (
            <div className="row product-specs">
                <div className="col-md-6">
                    <ul className="list-unstyled product-spec-list">
                        {isRTL ? (
                            <>
                                {specs.product_code_ar && <li><strong>{labels.product_code}:</strong> {specs.product_code_ar}</li>}
                                {specs.width_ar && <li><strong>{labels.width}:</strong> {specs.width_ar}</li>}
                                {specs.fabric_thickness_ar && <li><strong>{labels.fabric_thickness}:</strong> {specs.fabric_thickness_ar}</li>}
                                {specs.fr_durability_ar && <li><strong>{labels.fr_durability}:</strong> {specs.fr_durability_ar}</li>}
                                {specs.perfect_for_ar && <li><strong>{labels.perfect_for || "الاستخدام المثالي"}:</strong> {specs.perfect_for_ar}</li>}
                                {specs.gain_ar && <li><strong>{labels.gain || "معامل السطوع"}:</strong> {specs.gain_ar}</li>}
                                {specs.diameter_ar && <li><strong>{labels.diameter}:</strong> {specs.diameter_ar}</li>}
                            </>
                        ) : (
                            <>
                                {specs.product_code && <li><strong>{labels.product_code}:</strong> {specs.product_code}</li>}
                                {specs.width && <li><strong>{labels.width}:</strong> {specs.width}</li>}
                                {specs.fabric_thickness && <li><strong>{labels.fabric_thickness}:</strong> {specs.fabric_thickness}</li>}
                                {specs.fr_durability && <li><strong>{labels.fr_durability}:</strong> {specs.fr_durability}</li>}
                                {specs.perfect_for && <li><strong>{labels.perfect_for || "Perfect For"}:</strong> {specs.perfect_for}</li>}
                                {specs.gain && <li><strong>{labels.gain || "Gain"}:</strong> {specs.gain}</li>}
                                {specs.diameter && <li><strong>{labels.diameter}:</strong> {specs.diameter}</li>}
                            </>
                        )}
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="list-unstyled product-spec-list">
                        {isRTL ? (
                            <>
                                {specs.roll_length_ar && <li><strong>{labels.roll_length}:</strong> {specs.roll_length_ar}</li>}
                                {specs.weight_ar && <li><strong>{labels.weight}:</strong> {specs.weight_ar}</li>}
                                {specs.fr_certification_ar && <li><strong>{labels.fr_certification}:</strong> {specs.fr_certification_ar}</li>}
                                {specs.custom_dye_ar && <li><strong>{labels.custom_dye}:</strong> {specs.custom_dye_ar}</li>}
                                {specs.transmittance_ar && <li><strong>{labels.transmittance || "النفاذية الضوئية"}:</strong> {specs.transmittance_ar}</li>}
                                {specs.length_ar && <li><strong>{labels.length}:</strong> {specs.length_ar}</li>}
                            </>
                        ) : (
                            <>
                                {specs.roll_length && <li><strong>{labels.roll_length}:</strong> {specs.roll_length}</li>}
                                {specs.weight && <li><strong>{labels.weight}:</strong> {specs.weight}</li>}
                                {specs.fr_certification && <li><strong>{labels.fr_certification}:</strong> {specs.fr_certification}</li>}
                                {specs.custom_dye && <li><strong>{labels.custom_dye}:</strong> {specs.custom_dye}</li>}
                                {specs.transmittance && <li><strong>{labels.transmittance || "Transmittance"}:</strong> {specs.transmittance}</li>}
                                {specs.length && <li><strong>{labels.length}:</strong> {specs.length}</li>}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="product-detail-page" dir={dir || "ltr"}>
            <Seo
                title={`${productName} | StageWare`}
                description={
                    productDescription
                        ? String(productDescription).replace(/<[^>]*>/g, "").slice(0, 155)
                        : "Product details from StageWare."
                }
                image={imageUrl || "/logo.png"}
            />
            <div className="container">
                <h1 className="product-detail-title">{productName}</h1>

                <div className="row g-5">
                    <div className="col-lg-5">
                        <img
                            src={imageUrl}
                            alt={productName}
                            className="product-detail-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/500x400?text=Image+Not+Found";
                            }}
                        />
                    </div>

                    <div className="col-lg-7">
                        <h2 className="product-detail-heading">
                            {labels.details}
                        </h2>

                        <div
<<<<<<< Updated upstream
                            className="lead mb-4"
                            style={{ color: "#334155", lineHeight: "1.8" }}
                        >
                            {productDescriptionText}
                        </div>
=======
                            className="product-detail-description"
                            dangerouslySetInnerHTML={{ __html: productDescription || "" }}
                        ></div>
>>>>>>> Stashed changes

                        {renderSpecs()}

                        <div className="product-detail-actions">
                            <button onClick={() => window.history.back()} className="btn btn-primary rounded-pill px-4">
                                {dir === "rtl" ? "العودة" : "Back"}
                            </button>
                        </div>
                    </div>
                </div>

                {additionalPhotos.length > 0 && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="row g-3">
                                {additionalPhotos.map((photo, idx) => (
                                    <div className="col-12" key={`${photo.url}-${idx}`}>
                                        <img
                                            src={photo.url}
                                            alt={photo.alt || `${productName} ${idx + 1}`}
                                            className="img-fluid rounded shadow-sm w-100"
                                            style={{ objectFit: "contain" }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
