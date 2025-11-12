import React, { useState, useEffect } from "react";
// We use useParams to read the ID from the URL (e.g., /fabrics/1)
import { useParams } from 'react-router-dom'; 
import axios from "axios"; 
// import "../../assets/Subcategory.css"; 

const SubcategoryPage = ({ t }) => {
  // 1. Get the subcategory ID from the URL parameters
  // Assuming your route is set up like: <Route path="/category/:subcategoryId" ...
  const { subcategoryId } = useParams(); 
    
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use your backend URL
  const API_URL = `http://localhost:5000/api/subcategory-products/${subcategoryId}`;

  useEffect(() => {
    if (!subcategoryId) {
        // If the ID isn't found in the URL, stop.
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

        // The API returns the data under the 'products' key
        setProducts(response.data.products);
        
      } catch (err) {
        console.error("Error fetching Subcategory products:", err);
        // Log a user-friendly error
        setError(`Failed to load products for subcategory ID ${subcategoryId}. Check server.`);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryProducts();
  }, [subcategoryId, API_URL]); // Dependency array: fetches again if the ID changes

  // Helper function for multilingual display
  const getNameField = (item) => {
    // If translation direction is RTL (Arabic), use name_ar, otherwise use name_en
    return t?.dir === "rtl" ? item.name_ar || item.name_en : item.name_en;
  };

  // --- RENDERING LOGIC ---

  if (loading) {
    return <div className="subcategory-page m-4">Loading Products...</div>;
  }

  if (error) {
    return <div className="subcategory-page m-4 text-danger">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="subcategory-page m-4">No products found in this subcategory.</div>;
  }

  // Determine the title dynamically. Since the backend only returns product data,
  // we'll use a placeholder or assume the title is passed via props/context.
  const subcategoryTitle = products[0]?.subcategory_name_en || 'Subcategory Products';


  return (
    <div className="subcategory-page m-4" dir={t?.dir || "ltr"}>
      <div className="container container--regular mb-5">
        
        {/* Using the static name here for simplicity. Ideally, this name would also be fetched. */}
        <h2 className="mb-4">Products in Decoration Fabrics</h2> 
        
        <div className="row g-4">
          
          {products.map((item, index) => {
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
                      {t?.viewDetails || "View Details"}
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

export default SubcategoryPage;