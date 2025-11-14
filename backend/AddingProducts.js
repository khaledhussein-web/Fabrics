const express = require('express');
const router = express.Router();
// 🚨 Import the existing database connection
const db = require('./db'); 

// POST /api/products - Adds a new product to the Products table
router.post('/products', async (req, res) => {
    // Destructure properties using the EXACT field names from the database image
    const { 
        category_id,
        subcategory_id,
        name_en, 
        name_ar, 
        description_en, 
        description_ar, 
        image_path
    } = req.body; 

    // Basic validation
    if (!category_id || !name_en || !description_en) {
        return res.status(400).json({ message: 'Category ID, English Name, and English Description are required fields.' });
    }

    // NOTE: We are assuming 'created_at' is handled by a database default (like NOW())
    // If not, we would add it to the INSERT statement.
    const insertQuery = `
        INSERT INTO public.products (
            category_id, 
            subcategory_id, 
            name_en, 
            name_ar, 
            description_en, 
            description_ar, 
            image_path
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING product_id, name_en, category_id;
    `;
    
    // Values array for safe parameterized query
    const values = [
        category_id, 
        subcategory_id || null, // Allow null if not provided
        name_en, 
        name_ar || null,       // Allow null if not provided
        description_en, 
        description_ar || null, // Allow null if not provided
        image_path || null      // Allow null if not provided (will be updated after file upload)
    ];

    try {
        const result = await db.query(insertQuery, values); 
        
        res.status(201).json({ 
            message: 'Product added successfully!', 
            product: result.rows[0] 
        });

    } catch (err) {
        console.error('Error executing product INSERT query:', err.stack);
        // Status 409 (Conflict) is common for duplicate unique keys if you had one (e.g., SKU)
        const status = err.code === '23505' ? 409 : 500; 
        res.status(status).json({ 
            error: 'Failed to add product due to a database error.', 
            details: err.message 
        });
    }
});

module.exports = router;