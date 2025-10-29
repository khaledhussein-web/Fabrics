import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductCategory() {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        console.log('Fetched products:', data.products);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  // 🟢 Filter products based on category and subcategory
  let filteredProducts = [];
  let displayTitle = "";

  if (category && subcategory) {
    // 🔹 Your backend does not have `subcategory_name`, so remove that condition
    filteredProducts = products.filter(product =>
      product.category_name?.toLowerCase() === category.toLowerCase()
    );
    displayTitle = `${category} / ${subcategory}`;
  } else if (category) {
    filteredProducts = products.filter(product =>
      product.category_name?.toLowerCase() === category.toLowerCase()
    );
    displayTitle = category;
  } else {
    filteredProducts = products;
    displayTitle = "All Products";
  }

  return (
    <section className="products-page">
      <h2 style={{ textTransform: "capitalize" }}>
        {displayTitle.replace(/-/g, " ")}
      </h2>

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image_path || "/placeholder.jpg"} alt={p.name_en} />
            <h3>{p.name_en}</h3>
            {p.name_ar && <h4>{p.name_ar}</h4>}
            {p.category_name && <small className="text-muted">{p.category_name}</small>}
            {p.description_en && <p>{p.description_en}</p>}
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p>
            No products found for the category:{" "}
            <strong>{displayTitle.replace(/-/g, " ")}</strong>.
          </p>
        )}
      </div>
    </section>
  );
}
