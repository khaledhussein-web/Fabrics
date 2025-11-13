import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/Fabrics.css";

const Fabrics = ({ t }) => {
  // State to hold the fetched content (subcategories and products)
  const [content, setContent] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Hardcode the ID for the 'Fabrics' category (which is 1 in your DB)
  const CATEGORY_ID = 1;
  // Use your backend URL
  const API_URL = `http://localhost:5000/api/category-content/${CATEGORY_ID}`;

  useEffect(() => {
    const fetchFabricsContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the flexible content using the new API route
        const response = await axios.get(API_URL);

        // The API returns the data under the 'content' key
        setContent(response.data.content);
        
      } catch (err) {
        console.error("Error fetching Fabrics content:", err);
        setError("Failed to load products. Please check the server.");
        setContent([]); // Clear content on error
      } finally {
        setLoading(false);
      }
    };

    fetchFabricsContent();
  }, [API_URL]);

  // Determine which field to display based on translation context
  const getNameField = (item) => {
    // If translation direction is RTL (Arabic), use name_ar, otherwise use name_en
    return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
  };

  // --- RENDERING LOGIC ---

  if (loading) {
    return <div className="fabrics-page m-4">Loading Fabrics content...</div>;
  }

  if (error) {
    return <div className="fabrics-page m-4 text-danger">{error}</div>;
  }

  if (content.length === 0) {
    return <div className="fabrics-page m-4">No content found for Fabrics.</div>;
  }


  return (
    <div className="fabrics-page m-4" dir={t?.dir || "ltr"}>
      {/* 🔹 Dashboard grid (dynamic content from DB) */}
      <div className="container container--regular mb-5">
        <h2 className="mb-4">{t?.productsCategories?.fabrics || "Fabrics"}</h2>
        <div className="row g-4">
          
          {content.map((item, index) => {
            
            let itemHref = '';
            
            // ⭐️ NEW LOGIC: Check if this item is a SUB-CATEGORY (L1) or a product (L0)
            // If subcategory_id is NULL, it means the item is an L1 Subcategory (e.g., Decoration Fabrics).
            // We use the new dynamic route: /products/categoryName/subcategoryId
            if (item.subcategory_id === null) {
                // The main category name is 'fabrics' (hardcoded based on context)
                // The subcategory ID is stored in the item.id field for L1 categories.
                itemHref = `/products/fabrics/${item.id}`;
            } else {
                // If subcategory_id is NOT null, it's an L0 product
                // This link should go to the individual product page
                itemHref = `/product/${item.id}`;
            }
            
            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={item.id || index} 
              >
                <div className="align-items-start card border-0">
                  <a href={itemHref}>
                    <img
                      src={`http://localhost:5000${item.image_path}`} 
                      className="img-fluid rounded shadow-sm"
                      alt={getNameField(item)} 
                      loading="lazy"
                    />
                  </a>
                  {/* Display the name based on language/direction */}
                  <p className="mt-3 fw-bold text-center">
                    {getNameField(item)} 
                    {/* Hiding the subcategory name helper here, as this is the main page */}
                  </p>
                  
                  <div className="text-center">
                    <a className="btn btn-primary" href={itemHref}>
                      {t?.viewProducts || "View Products"}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fabrics;