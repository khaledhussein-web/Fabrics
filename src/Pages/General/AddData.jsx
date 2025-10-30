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

  // 🔹 Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else {
          console.warn('No categories in DB, using predefined fallback list.');
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      category_id: categoryId,
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
        alert('❌ Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error adding product');
    }
  }

  return (
    <div className="container p-3 mt-5 mb-5 border rounded">
      <h2 className="text-center mb-3">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category:&nbsp;</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>

            {/* ✅ If backend has categories */}
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <>
                {/* ✅ Fallback: predefined local categories */}
                <optgroup label="Fabrics">
                  <option value="Decoration fabrics">Decoration fabrics</option>
                  <option value="Projects screen">Projects screen</option>
                  <option value="Holograme">Holograme</option>
                  <option value="Flooring">Flooring</option>
                </optgroup>

                <optgroup label="Tracks">
                  <option value="Chain Track">Chain Track</option>
                  <option value="Reveal systems">Reveal systems</option>
                  <option value="Tracks">Tracks</option>
                  <option value="Rollups">Rollups</option>
                </optgroup>

                <option value="Frames">Frames</option>
              </>
            )}
          </select>
        </div>

        <p>
          <label>English Name:&nbsp;</label>
          <input
            type="text"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            required
          />
        </p>

        <p>
          <label>Arabic Name:&nbsp;</label>
          <input
            type="text"
            value={arabicName}
            onChange={(e) => setArabicName(e.target.value)}
          />
        </p>

        <p>
          <label>English Description:&nbsp;</label>
          <textarea
            rows="5"
            cols="90"
            value={englishDesc}
            onChange={(e) => setEnglishDesc(e.target.value)}
          ></textarea>
        </p>

        <p>
          <label>Arabic Description:&nbsp;</label>
          <textarea
            rows="5"
            cols="90"
            value={arabicDesc}
            onChange={(e) => setArabicDesc(e.target.value)}
          ></textarea>
        </p>

        <p>
          <label>Image Path:&nbsp;</label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </p>

        <p>
          <label>Created At:&nbsp;</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </p>

        <button className="rounded btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
