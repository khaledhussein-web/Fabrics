import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/Fabrics.css";

const getImageUrl = (path) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("C:\\")) return "/placeholder.jpg"; // local Windows file
  if (path.startsWith("/uploads")) return `http://localhost:5000${path}`; // server file
  return path; // already a full URL
};

const ProductCategory = ({ t }) => {
  const { subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔍 Fetching products from /api/products...");
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("✅ Raw response from /api/products:", data);
        if (data.products) {
          console.log(`✅ Fetched ${data.products.length} products:`, data.products.map(p => ({ id: p.id, name: p.name_en, category: p.category_name })));
        } else {
          console.log("⚠️ No products array in response");
        }
        setProducts(data.products || []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    document.title = `Products - ${subcategory.replace(/-/g, ' ')}`;
  }, [subcategory]);

  // Normalize subcategory for matching
  const normalizeSubcategory = (sub) => sub.replace(/-/g, " ").toLowerCase().trim();

  const normalizedSubcategory = normalizeSubcategory(subcategory);

  // Filter products by subcategory
  const filteredProducts = products.filter((p) =>
    p.category_name?.toLowerCase().trim() === normalizedSubcategory
  );

  console.log("🧵 Filtering products for subcategory:", subcategory, "normalized:", normalizedSubcategory);
  console.log("All products before filtering:", products.map(p => ({ id: p.id, cat: p.category_name })));
  console.log("Filtered products:", filteredProducts.map(p => p.id));

  if (!subcategory) return <p>Invalid subcategory URL.</p>;

  return (
    <div className="fabrics-page m-4" dir={t?.dir || "ltr"}>
      <div className="container mt-5">
        <h2 className="mb-3 text-capitalize">
          {subcategory.replace(/-/g, ' ')}
        </h2>
        <p className="text-muted">
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}.
        </p>

        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p>No products found for this subcategory.</p>
        )}

        <div className="row g-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 product-card"
            >
              <div className="card shadow-sm h-100">
                <img
                  src={getImageUrl(p.image_path)}
                  className="card-img-top"
                  alt={p.name_en}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name_en}</h5>
                  {p.name_ar && (
                    <h6 className="card-subtitle mb-2 text-muted">{p.name_ar}</h6>
                  )}
                  <small className="text-muted d-block mb-2">
                    {p.category_name}
                  </small>
                  {p.description_en && (
                    <p className="card-text">{p.description_en}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;