import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios"; 
import "../assets/Listing.css";

const SubcategoryPage = ({ t, dir }) => {
  const { subcategoryId } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Create a map to connect Database IDs to your UI keys
  const subcategoryKeyMap = {
    "1": "decoration",
    "2": "ph",
    "3": "chainTrack",
    "4": "revealSystems",
    "5": "rollups"
};

  const API_URL = `http://localhost:5000/api/subcategory-products/${subcategoryId}`;

  useEffect(() => {
    if (!subcategoryId) {
        setError("Invalid subcategory URL.");
        setLoading(false);
        return;
    }
    
    const fetchSubcategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(`Failed to load products.`);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryProducts();
  }, [subcategoryId, API_URL]);

  const getNameField = (item) => {
    return dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
  };

  if (loading) return (
    <div className="text-center my-5 py-5">
        <div className="spinner-border text-primary"></div>
    </div>
  );

  // --- 🔑 TITLE LOGIC FROM i18n ---
  // Get the key (e.g., 'projectionScreens') based on the ID from the URL
  const uiKey = subcategoryKeyMap[subcategoryId];
  // Look it up in your translated UI object
  const subcategoryTitle = t?.allSubCategories?.[uiKey] || (dir === "rtl" ? "المنتجات" : "Products");

  return (
    <div className="container py-5" dir={dir || "ltr"}>
      {/* Dynamic Header using your i18n file */}
      <h2 className="display-6 fw-bold mb-5 border-bottom pb-3">
        {subcategoryTitle}
      </h2> 
      
      <div className="row g-4">
        {products.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="lead text-muted">No products found.</p>
          </div>
        ) : (
          products.map((item, index) => {
            const itemHref = `/product/${item.product_id}`;
            
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.product_id || index}>
                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
                  <div className="bg-dark overflow-hidden" style={{ height: '220px' }}>
                    <a href={itemHref}>
                      <img
                        src={`http://localhost:5000${item.image_path}`} 
                        alt={getNameField(item)} 
                        className="img-fluid w-100 h-100 transition-zoom"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </a>
                  </div>

                  <div className="card-body d-flex flex-column align-items-start p-3">
                    <h6 className="card-title fw-bold text-dark mt-1 mb-3 flex-grow-1">
                      {getNameField(item)} 
                    </h6>
                    <a className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm border-0" href={itemHref}>
                      {t?.viewDetails || (dir === "rtl" ? "عرض التفاصيل" : "View Details")}
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;