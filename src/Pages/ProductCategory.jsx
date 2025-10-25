import React from "react";
import { useParams } from "react-router-dom";

export default function ProductCategory() {
  // const { category } = useParams();
  const { category, subcategory } = useParams();

  const products = {
    fabrics: {
      decoration: [
        { id: 1, name: "Velvet Curtain", img: "/uploads/fabrics/velvet.jpg" },
        { id: 2, name: "Blackout Fabric", img: "/uploads/fabrics/blackout.jpg" },
      ],
      projectors: [
        { id: 5, name: "Projects Screen Fabric", img: "/uploads/fabrics/projector.jpg" },
      ],
      holograms: [
        { id: 6, name: "Holographic Mesh", img: "/uploads/fabrics/hologram.jpg" },
      ],
    },
    tracks: [
      { id: 3, name: "Aluminum Track", img: "/uploads/tracks/track1.jpg" },
    ],
    frames: [
      { id: 4, name: "Wood Parquet", img: "/uploads/flooring/wood.jpg" },
    ],
  };

  let categoryProducts = [];
  let displayTitle = "";

  if (category && subcategory) {
    // Case 1: Nested Route (e.g., /products/fabrics/decoration)
    // Use optional chaining (?.) for safe access: products[category] -> fabrics -> decoration
    categoryProducts = products[category]?.[subcategory] || [];

    // Use subcategory for the title, or a combination (e.g., Decoration)
    displayTitle = subcategory;
  } else if (category) {
    // Case 2: Top-Level Route (e.g., /products/tracks or /products/flooring)
    // We assume top-level items in the data are arrays (not nested objects)
    categoryProducts = Array.isArray(products[category]) ? products[category] : [];

    // Use category for the title (e.g., Tracks)
    displayTitle = category;
  }

  return (
    <section className="products-page">
      <h2 style={{ textTransform: "capitalize" }}>
        {displayTitle.replace(/-/g, ' ')}
      </h2>
      <div className="product-grid">
        {categoryProducts.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
        {categoryProducts.length === 0 && (
          <p>No products found for the category: **{displayTitle.replace(/-/g, ' ')}**.</p>
        )}
      </div>
    </section>
  );
}
