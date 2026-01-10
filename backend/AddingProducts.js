const express = require('express');
const router = express.Router();
const pool = require('./db'); // Your database connection

// GET L3 Folders - Fixes the 404 error on port 5000
router.get('/products-folders/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const result = await pool.query(
            'SELECT product_id, name_en FROM products WHERE category_id = $1 AND is_folder = true',
            [categoryId]
        );
        
        res.json({ products: result.rows || [] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;