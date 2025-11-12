import React, { useState, useEffect } from "react";
import axios from "axios"; // You'll need to install axios if you haven't: npm install axios
import "../../assets/Fabrics.css";

// NOTE: We are removing the hardcoded fabricsCategories array.

const Fabrics = ({ t }) => {
  // State to hold the fetched content (products and L1 content)
  const [content, setContent] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Hardcode the ID for the 'Fabrics' category (which is 1 in your DB)
  const FABRICS_CATEGORY_ID = 1;
  // Use your backend URL
  const API_URL = `http://localhost:5000/api/category-content/${FABRICS_CATEGORY_ID}`;

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
  }, [API_URL]); // Dependency array ensures effect runs only on mount

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
            
            // Determine the URL for the product/content item
            // This needs custom logic based on how you route your individual pages.
            // For now, we'll use a placeholder.
            const itemHref = `/product/${item.id}`; 
            
            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={item.id || index} // Use item.id for a stable key
              >
                <div className="align-items-start card border-0">
                  <a href={itemHref}>
                    <img
                      // Assuming your image_path contains a full or relative URL
                      // We'll prepend the server base URL if needed.
                      src={`http://localhost:5000${item.image_path}`} 
                      className="img-fluid rounded shadow-sm"
                      alt={getNameField(item)} // Use the dynamic name for alt text
                      loading="lazy"
                    />
                  </a>
                  {/* Display the name based on language/direction */}
                  <p className="mt-3 fw-bold text-center">
                    {getNameField(item)} 
                    {item.subcategory_name && (
                      <span className="text-muted d-block small">({item.subcategory_name})</span>
                    )}
                  </p>
                  
                  <div className="text-center">
                    <a className="btn btn-primary" href={itemHref}>
                      {t?.viewProducts || "View Details"}
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