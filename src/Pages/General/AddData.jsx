import { useState, useEffect } from 'react';

export default function AddData() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [englishDesc, setEnglishDesc] = useState('');
  const [arabicDesc, setArabicDesc] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  // 🔹 Fetch all categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();

        console.log("Fetched categories:", data.categories); // ✅ Debug log

        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.warn('⚠️ No categories found or invalid response format.');
          setCategories([]);
        }
      } catch (err) {
        console.error('❌ Error fetching categories:', err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      category_id: Number(categoryId),
      name_en: englishName,
      name_ar: arabicName,
      description_en: englishDesc,
      description_ar: arabicDesc,
      image_path: imagePath,
      created_at: createdAt
    };

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        alert('✅ Product added successfully!');
        setCategoryId('');
        setEnglishName('');
        setArabicName('');
        setEnglishDesc('');
        setArabicDesc('');
        setImagePath('');
        setCreatedAt('');
      } else {
        const errData = await response.json();
        alert(`❌ Failed to add product: ${errData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error adding product:', error);
      alert('Error adding product. Check the console for details.');
    }
  }

  return (
    <div className="container p-3 mt-5 mb-5 border rounded">
      <h2 className="text-center mb-3">Add Product</h2>

      <form onSubmit={handleSubmit}>
        {/* CATEGORY DROPDOWN */}
        <div className="mb-3">
          <label>Category:&nbsp;</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ENGLISH NAME */}
        <p>
          <label>English Name:&nbsp;</label>
          <input
            type="text"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            required
          />
        </p>

        {/* ARABIC NAME */}
        <p>
          <label>Arabic Name:&nbsp;</label>
          <input
            type="text"
            value={arabicName}
            onChange={(e) => setArabicName(e.target.value)}
          />
        </p>

        {/* ENGLISH DESC */}
        <p>
          <label>English Description:&nbsp;</label>
          <textarea
            rows="5"
            cols="90"
            value={englishDesc}
            onChange={(e) => setEnglishDesc(e.target.value)}
          ></textarea>
        </p>

        {/* ARABIC DESC */}
        <p>
          <label>Arabic Description:&nbsp;</label>
          <textarea
            rows="5"
            cols="90"
            value={arabicDesc}
            onChange={(e) => setArabicDesc(e.target.value)}
          ></textarea>
        </p>

        {/* IMAGE PATH */}
        <p>
          <label>Image Path:&nbsp;</label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="/uploads/fabrics/example.jpg"
          />
          <small className="text-muted d-block">
            Use server-relative paths like "/uploads/fabrics/velvet.jpg". Avoid local file paths like "C:\Users\...".
          </small>
        </p>

        {/* CREATED AT */}
        <p>
          <label>Created At:&nbsp;</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </p>

        <button className="rounded btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}
