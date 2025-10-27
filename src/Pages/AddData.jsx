import { useState } from 'react';

export default function AddData() {
    const [category, setCategory] = useState('');
    const [englishName, setEnglishName] = useState('');
    const [arabicName, setArabicName] = useState('');
    const [englishDesc, setEnglishDesc] = useState('');
    const [arabicDesc, setArabicDesc] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const productData = {
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                alert('Product added successfully!');
                // Reset form
                setCategory('');
                setEnglishName('');
                setArabicName('');
                setEnglishDesc('');
                setArabicDesc('');
                setImagePath('');
                setCreatedAt('');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding product');
        }
    }

return(

    // Fabrics:
    // Decoration fabrics
    // Projects screen
    // Holograme
    // Flooring

    // Tracks:
    // Chain Track 
    // Reveal systems
    // Tracks
    // Rollups

    // Frames
  
    <div className="container p-3 mt-5 mb-5 border rounded">
          <h2 className="text-center">Add products</h2>
        <div className="row">

        <form onSubmit={handleSubmit}>
        <p>
                <label>Category:&nbsp;</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
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
                </select>
            </p>

            <p>
                <label>English name:&nbsp;</label>
                <input type="text" value={englishName} onChange={(e) => setEnglishName(e.target.value)} required/>
            </p>

            <p>
                <label>Arabic name:&nbsp;</label>
                <input type="text" value={arabicName} onChange={(e) => setArabicName(e.target.value)}/>
            </p>

             <p>
                <label>English desc:&nbsp;</label>
                  <textarea rows="5" cols="90" value={englishDesc} onChange={(e) => setEnglishDesc(e.target.value)}></textarea>
            </p>

            <p>
                <label>Arabic desc:&nbsp;</label>
                <textarea rows="5" cols="90" value={arabicDesc} onChange={(e) => setArabicDesc(e.target.value)}></textarea>
            </p>
            <p>
                <label>Image path:&nbsp;</label>
                <input type="text" value={imagePath} onChange={(e) => setImagePath(e.target.value)}/>
            </p>

               <p>
                <label>created at&nbsp;</label>
                <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)}/>
            </p>

            <button className="rounded">Submit</button>
        </form>
        </div>
    </div>

);
   
}