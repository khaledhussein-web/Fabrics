import React, { useState, useEffect } from "react";
import Seo from "../../components/Seo";
import { toApiUrl } from "../../config/env";

export default function AddData() {
    const [formData, setFormData] = useState({
        name_en: "", name_ar: "", description_en: "", description_ar: "", 
        image_path: "", category_id: "", subcategory_id: "",
        parent_id: "", is_folder: false
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [parentOptions, setParentOptions] = useState([]); 
    const [loading, setLoading] = useState(true);

    // 1. Initial Load from Port 5000
    useEffect(() => {
        const loadInitial = async () => {
            try {
                const [catRes, subRes] = await Promise.all([
                    fetch(toApiUrl("/api/categories")),
                    fetch(toApiUrl("/api/subcategories"))
                ]);
                const catData = await catRes.json();
                const subData = await subRes.json();
                
                setCategories(catData.categories || []);
                setSubcategories(subData.subcategories || []);
                console.log("Subcategories received:", subData.subcategories);
            } catch (e) { 
                console.error("Fetch error:", e); 
            } finally { 
                setLoading(false); 
            }
        };
        loadInitial();
    }, []);

    // 2. Fetch L3 Folders when Category changes
    useEffect(() => {
        if (formData.category_id) {
            fetch(toApiUrl(`/api/products-folders/${formData.category_id}`))
                .then(res => res.json())
                .then(data => setParentOptions(data.products || []))
                .catch(err => console.error("L3 Fetch error:", err));
        }
    }, [formData.category_id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            ...(name === "category_id" ? { subcategory_id: "", parent_id: "" } : {}),
        }));
    };

    // 💡 THE CRITICAL FIX: Changed 'category_id' to 'parent_category_id' 
    // to match your database response
    const filteredSubcategories = subcategories.filter((sub) => {
        return Number(sub.parent_category_id) === Number(formData.category_id);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(toApiUrl("/api/products"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) alert("Data successfully saved!");
        } catch { alert("Error saving data"); }
    };

    if (loading) return <div style={{padding: "20px"}}>Loading Data...</div>;

    return (
        <div style={styles.container}>
            <Seo
                title="Add Product | StageWare"
                description="Internal StageWare product management page."
                noindex={true}
            />
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Add Product</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.row}>
                    <input name="name_en" placeholder="Name (EN)" value={formData.name_en} onChange={handleChange} required style={styles.input} />
                    <input name="name_ar" placeholder="Name (AR)" value={formData.name_ar} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.row}>
                    <div style={{flex: 1}}>
                        <label style={styles.label}>Category (L1)</label>
                        <select name="category_id" value={formData.category_id} onChange={handleChange} required style={styles.input}>
                            <option value="">-- Select --</option>
                            {categories.map(c => <option key={c.category_id} value={c.category_id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div style={{flex: 1}}>
                        <label style={styles.label}>Subcategory (L2)</label>
                        <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} style={styles.input}>
                            <option value="">-- Select --</option>
                            {filteredSubcategories.map(s => (
                                <option key={s.subcategory_id} value={s.subcategory_id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={styles.checkboxWrapper}>
                    <input type="checkbox" name="is_folder" id="is_folder" checked={formData.is_folder} onChange={handleChange} />
                    <label htmlFor="is_folder" style={styles.checkboxLabel}>Mark as L3 Folder</label>
                </div>

                {!formData.is_folder && (
                    <div>
                        <label style={styles.label}>Parent Folder (L3)</label>
                        <select name="parent_id" value={formData.parent_id} onChange={handleChange} style={styles.input}>
                            <option value="">-- None --</option>
                            {parentOptions.map(p => <option key={p.product_id} value={p.product_id}>{p.name_en}</option>)}
                        </select>
                    </div>
                )}

                <button type="submit" style={styles.button}>Save Data</button>
            </form>
        </div>
    );
}

const styles = {
    container: { maxWidth: "600px", margin: "30px auto", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    row: { display: "flex", gap: "10px" },
    input: { padding: "10px", border: "1px solid #ddd", borderRadius: "5px", width: "100%" },
    label: { fontSize: "12px", fontWeight: "bold", color: "#666", display: "block", marginBottom: "5px" },
    checkboxWrapper: { display: "flex", alignItems: "center", gap: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "5px" },
    checkboxLabel: { fontWeight: "bold", color: "#007bff" },
    button: { padding: "12px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }
};
