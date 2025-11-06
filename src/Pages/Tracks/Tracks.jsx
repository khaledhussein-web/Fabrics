import React, { useEffect, useState } from "react";

export default function Tracks() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔍 Attempting to fetch products from API...");
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) {
          console.error("❌ API response not ok:", res.status, res.statusText);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("✅ Raw API response data:", data);
        console.log("✅ Products array:", data.products || []);
        setProducts(data.products || []); // ✅ Prevent crash
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = (products || []).filter((p) =>
    ["chain track", "reveal systems", "rollups"].includes(
      p.category_name?.toLowerCase().trim()
    )
  );

  return (
    <section className="products-page container mt-4">
      <h2 className="mb-4">Tracks</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="product-card border rounded p-3 m-2">
              <img
                src={p.image_path || "/placeholder.jpg"}
                alt={p.name_en}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <h4 className="mt-2">{p.name_en}</h4>
              {p.name_ar && <h5>{p.name_ar}</h5>}
              <small className="text-muted">{p.category_name}</small>
              {p.description_en && <p>{p.description_en}</p>}
            </div>
          ))
        ) : (
          <p>No products found in Tracks categories.</p>
        )}
      </div>
    </section>
  );
}
