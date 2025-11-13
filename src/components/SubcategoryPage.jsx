import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios"; 
// import "../../assets/Subcategory.css"; 

const SubcategoryPage = ({ t, dir }) => {
  // 1. Get the subcategory ID from the URL parameters
  const { subcategoryId } = useParams(); 
    
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use your backend URL
  const API_URL = `http://localhost:5000/api/subcategory-products/${subcategoryId}`;

  useEffect(() => {
    if (!subcategoryId) {
        setError("Invalid subcategory URL. ID is missing.");
        setLoading(false);
        return;
    }
    
    const fetchSubcategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the dedicated subcategory products using the backend route
        const response = await axios.get(API_URL);
        setProducts(response.data.products);
        
      } catch (err) {
        console.error("Error fetching Subcategory products:", err);
        setError(`Failed to load products for subcategory ID ${subcategoryId}. Check server status.`);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryProducts();
  }, [subcategoryId, API_URL]);

  // Helper function for multilingual display (uses the 'dir' prop for context)
  const getNameField = (item, isTitle = false) => {
    // If it's a product name, check name_ar/name_en
    if (!isTitle) {
      return dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
    }
    // If it's the subcategory title (from the product's embedded data)
    return dir === "rtl" ? item.subcategory_name_ar || item.subcategory_name_en : item.subcategory_name_en;
  };

  // --- RENDERING LOGIC ---

  if (loading) {
    return <div className="subcategory-page m-4">Loading Products...</div>;
  }

  if (error) {
    return <div className="subcategory-page m-4 text-danger">{error}</div>;
  }

  // Determine the dynamic title from the first product's subcategory name
  const subcategoryTitle = products.length > 0 
    ? getNameField(products[0], true) 
    : (dir === "rtl" ? "منتجات الفئة الفرعية" : "Subcategory Products");


  return (
    <div className="subcategory-page m-4" dir={dir || "ltr"}>
      <div className="container container--regular mb-5">
        
        {/* Dynamic Title */}
        <h2 className="mb-4">{subcategoryTitle}</h2> 
        
        <div className="row g-4">
          
          {products.length === 0 ? (
            <div className="col-12">No products found in this subcategory.</div>
          ) : (
            products.map((item, index) => {
              const itemHref = `/product/${item.id}`; 
              
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
                    <p className="mt-3 fw-bold text-center">
                      {getNameField(item)} 
                    </p>
                    
                    <div className="text-center">
                      <a className="btn btn-primary" href={itemHref}>
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
    </div>
  );
};

export default SubcategoryPage;