import React, { useState } from 'react';

// Assuming category and subcategory data is passed as props for dropdowns
const AddData = ({ categories = [], subcategories = [] }) => {
    // 1. Initialize State for Form Inputs
    const [formData, setFormData] = useState({
        productName: '',
        sku: '',
        price: '',
        stockQuantity: '',
        selectedCategory: '',
        selectedSubcategory: '',
    });

    // 2. Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 3. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.productName || !formData.price || !formData.selectedSubcategory) {
            alert('Please fill in all required fields (Name, Price, and Subcategory).');
            return;
        }

        // Prepare the data to match your SQL schema structure (Products table)
        const productData = {
            product_name: formData.productName,
            sku: formData.sku,
            price: parseFloat(formData.price),
            stock_quantity: parseInt(formData.stockQuantity || 0),
            // This links to your Subcategories table via Foreign Key
            subcategory_id: parseInt(formData.selectedSubcategory) 
        };

        console.log('Attempting to add product data:', productData);

        // --- 🚨 IMPORTANT: Integration Point ---
        // REPLACE this console.log/alert with your actual API/fetch call to your backend.
        /*
        try {
            const response = await fetch('/api/products', { // Replace with your endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            if (response.ok) {
                alert('Product added successfully!');
                // Reset form after success
                setFormData({ 
                    productName: '', sku: '', price: '', stockQuantity: '',
                    selectedCategory: '', selectedSubcategory: '',
                }); 
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Check console for details.');
        }
        */

        alert(`Simulated success! Product: ${formData.productName} added.`);
        setFormData({ // Reset form after simulated success
            productName: '', sku: '', price: '', stockQuantity: '',
            selectedCategory: '', selectedSubcategory: '',
        });
    };

    // Filter subcategories based on the selected category ID
    const filteredSubcategories = subcategories.filter(sub =>
        sub.category_id.toString() === formData.selectedCategory
    );

    return (
        <div style={styles.container}>
            <h2>➕ Add New Fabric Product Data</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                
                {/* Product Name */}
                <div style={styles.group}>
                    <label htmlFor="productName" style={styles.label}>Product Name:</label>
                    <input
                        id="productName"
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>

                {/* SKU */}
                <div style={styles.group}>
                    <label htmlFor="sku" style={styles.label}>SKU (Unique Identifier):</label>
                    <input
                        id="sku"
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                
                {/* Category Selection */}
                <div style={styles.group}>
                    <label htmlFor="selectedCategory" style={styles.label}>Category:</label>
                    <select
                        id="selectedCategory"
                        name="selectedCategory"
                        value={formData.selectedCategory}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(cat => (
                            <option key={cat.category_id} value={cat.category_id}>
                                {cat.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Subcategory Selection */}
                <div style={styles.group}>
                    <label htmlFor="selectedSubcategory" style={styles.label}>Subcategory:</label>
                    <select
                        id="selectedSubcategory"
                        name="selectedSubcategory"
                        value={formData.selectedSubcategory}
                        onChange={handleChange}
                        required
                        disabled={!formData.selectedCategory}
                        style={styles.input}
                    >
                        <option value="">-- Select Subcategory --</option>
                        {filteredSubcategories.map(sub => (
                            <option key={sub.subcategory_id} value={sub.subcategory_id}>
                                {sub.subcategory_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div style={styles.group}>
                    <label htmlFor="price" style={styles.label}>Price ($):</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0.01"
                        step="0.01"
                        style={styles.input}
                    />
                </div>
                
                {/* Stock Quantity */}
                <div style={styles.group}>
                    <label htmlFor="stockQuantity" style={styles.label}>Stock Quantity:</label>
                    <input
                        id="stockQuantity"
                        type="number"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        min="0"
                        style={styles.input}
                    />
                </div>
                
                <button type="submit" style={styles.button}>Add Product Data</button>
            </form>
        </div>
    );
};

// Basic Inline Styles (Keep these or replace them with your own CSS/utility classes)
const styles = {
    container: { maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 12px rgba(0,0,0,0.1)' },
    form: { display: 'flex', flexDirection: 'column' },
    group: { marginBottom: '15px' },
    label: { marginBottom: '5px', fontWeight: 'bold', display: 'block' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' },
    button: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }
};

export default AddData;