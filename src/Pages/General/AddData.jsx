import React, { useState, useEffect } from "react";

export default function AddData() {
    const [formData, setFormData] = useState({
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        image_path: "",
        category_id: "",
        subcategory_id: ""
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories + subcategories
    useEffect(() => {
        const loadData = async () => {
            try {
                const res1 = await fetch("http://localhost:5000/api/categories");
                const res2 = await fetch("http://localhost:5000/api/subcategories");

                const data1 = await res1.json();
                const data2 = await res2.json();

                setCategories(data1.categories || []);
                setSubcategories(data2.subcategories || []);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Filter subcategories for selected category
    const filteredSubcategories = subcategories.filter(
        (sub) => sub.category_id == formData.category_id
    );

    // Submit product
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            category_id: parseInt(formData.category_id),
            subcategory_id: formData.subcategory_id ? parseInt(formData.subcategory_id) : null,
            name_en: formData.name_en,
            name_ar: formData.name_ar,
            description_en: formData.description_en,
            description_ar: formData.description_ar,
            image_path: formData.image_path
        };

        console.log("Sending product:", payload);

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Product added successfully!");

                setFormData({
                    name_en: "",
                    name_ar: "",
                    description_en: "",
                    description_ar: "",
                    image_path: "",
                    category_id: "",
                    subcategory_id: ""
                });
            } else {
                alert(`❌ Failed to add product: ${data.message || data.error}`);
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("❌ Server error");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2>Add New Product</h2>

            <form onSubmit={handleSubmit} style={styles.form}>

                {/* Name EN */}
                <label style={styles.label}>Name (EN)</label>
                <input
                    name="name_en"
                    value={formData.name_en}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                {/* Name AR */}
                <label style={styles.label}>Name (AR)</label>
                <input
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                {/* Description EN */}
                <label style={styles.label}>Description (EN)</label>
                <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                {/* Description AR */}
                <label style={styles.label}>Description (AR)</label>
                <textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                {/* Image Path */}
                <label style={styles.label}>Image Path</label>
                <input
                    name="image_path"
                    value={formData.image_path}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                {/* Category */}
                <label style={styles.label}>Category</label>
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                    style={styles.input}
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                        <option key={c.category_id} value={c.category_id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* Subcategory */}
                <label style={styles.label}>Subcategory</label>
                <select
                    name="subcategory_id"
                    value={formData.subcategory_id}
                    onChange={handleChange}
                    disabled={!formData.category_id}
                    style={styles.input}
                >
                    <option value="">-- Select Subcategory --</option>
                    {filteredSubcategories.map((s) => (
                        <option key={s.subcategory_id} value={s.subcategory_id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                <button type="submit" style={styles.button}>Add Product</button>
            </form>
        </div>
    );
}

const styles = {
    container: { maxWidth: "500px", margin: "30px auto" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    label: { fontWeight: "bold" },
    input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
    button: {
        padding: "12px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }
};
