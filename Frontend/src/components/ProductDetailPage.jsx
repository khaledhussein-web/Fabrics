import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { UI } from "../i18n";
import Seo from "./Seo";
import { toApiUrl, toProductImageUrl } from "../config/env";
import { breadcrumbJsonLd, normalizeDescription, productJsonLd } from "../seo";

const ProductDetailPage = () => {
    const { productId } = useParams();
    const { pathname } = useLocation();

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

    const productName = product.name_en;
    const productDescription = product.description_en;
    const productDescriptionText = String(productDescription || "").replace(/<[^>]*>/g, "");
    const pageDescription = normalizeDescription(productDescription, "Product details from StageWare.");
    const categoryPathMap = {
        1: "/products/fabrics",
        2: "/products/flooring",
        3: "/products/frames",
        4: "/products/tracks",
        5: "/products/fabrics",
        6: "/products/trussing",
    };
    const categoryPath = categoryPathMap[Number(product.category_id)] || "/products/fabrics";

    const imageUrl = toProductImageUrl(product.image_path, product.category_id);
    const additionalPhotos = (product.additional_photos || [])
        .map((item) => ({
            url: toProductImageUrl(item.photo_url, product.category_id),
            alt: item.alt_text,
        }))
        .filter((item) => item.url && item.url !== imageUrl);

    const labels = UI.en.productsDetails;

    const renderSpecs = () => {
        if (!product.specs) return null;

        const specs = product.specs;

        return (
            <div className="row product-specs">
                <div className="col-md-6">
                    <ul className="list-unstyled product-spec-list">
                        {specs.product_code && <li><strong>{labels.product_code}:</strong> {specs.product_code}</li>}
                        {specs.width && <li><strong>{labels.width}:</strong> {specs.width}</li>}
                        {specs.fabric_thickness && <li><strong>{labels.fabric_thickness}:</strong> {specs.fabric_thickness}</li>}
                        {specs.fr_durability && <li><strong>{labels.fr_durability}:</strong> {specs.fr_durability}</li>}
                        {specs.perfect_for && <li><strong>{labels.perfect_for}:</strong> {specs.perfect_for}</li>}
                        {specs.gain && <li><strong>{labels.gain}:</strong> {specs.gain}</li>}
                        {specs.diameter && <li><strong>{labels.diameter}:</strong> {specs.diameter}</li>}
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="list-unstyled product-spec-list">
                        {specs.roll_length && <li><strong>{labels.roll_length}:</strong> {specs.roll_length}</li>}
                        {specs.weight && <li><strong>{labels.weight}:</strong> {specs.weight}</li>}
                        {specs.fr_certification && <li><strong>{labels.fr_certification}:</strong> {specs.fr_certification}</li>}
                        {specs.custom_dye && <li><strong>{labels.custom_dye}:</strong> {specs.custom_dye}</li>}
                        {specs.transmittance && <li><strong>{labels.transmittance}:</strong> {specs.transmittance}</li>}
                        {specs.length && <li><strong>{labels.length}:</strong> {specs.length}</li>}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="product-detail-page" dir="ltr">
            <Seo
                title={`${productName} | StageWare`}
                description={pageDescription}
                image={imageUrl || "/logo.png"}
                type="product"
                jsonLd={[
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: product.category_name || "Products", path: categoryPath },
                        { name: productName, path: pathname },
                    ]),
                    productJsonLd({
                        product,
                        imageUrl,
                        path: pathname,
                    }),
                ]}
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
                                e.target.src = "/logo.png";
                            }}
                        />
                    </div>

                    <div className="col-lg-7">
                        <h2 className="product-detail-heading">
                            {labels.details}
                        </h2>

                        <div
                            className="lead mb-4"
                            style={{ color: "#334155", lineHeight: "1.8" }}
                        >
                            {productDescriptionText}
                        </div>

                        {renderSpecs()}

                        <div className="product-detail-actions">
                            <button onClick={() => window.history.back()} className="btn btn-primary rounded-pill px-4">
                                Back
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
                                                e.target.src = "/logo.png";
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
