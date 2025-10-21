import React from "react";
import { useParams } from "react-router-dom";

export default function ProductCategory() {
  const { category } = useParams();

  // Temporary demo data — will later come from backend
  const products = {
    fabrics: [
      { id: 1, name: "Velvet Curtain", img: "/uploads/fabrics/velvet.jpg" },
      { id: 2, name: "Blackout Fabric", img: "/uploads/fabrics/blackout.jpg" },
    ],
    tracks: [
      { id: 3, name: "Aluminum Track", img: "/uploads/tracks/track1.jpg" },
    ],
    flooring: [
      { id: 4, name: "Wood Parquet", img: "/uploads/flooring/wood.jpg" },
    ],
  };

  const categoryProducts = products[category] || [];

  return (
    <section className="products-page">
      <h2 style={{ textTransform: "capitalize" }}>{category}</h2>
      <div className="product-grid">
        {categoryProducts.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
        {categoryProducts.length === 0 && (
          <p>No products found for this category.</p>
        )}
      </div>
    </section>
  );
}
