const express = require('express');
const router = express.Router();
const pool = require('./db'); // Your database connection
const { sendServerError, validatePositiveIdParam } = require("./security");

// GET L3 Folders - Fixes the 404 error on port 5000
router.get('/products-folders/:categoryId', async (req, res) => {
    const categoryId = validatePositiveIdParam(req, res, "categoryId");
    if (!categoryId) return;

    try {
        const result = await pool.query(
            'SELECT product_id, name_en FROM products WHERE category_id = $1 AND is_folder = true',
            [categoryId]
        );
        
        res.json({ products: result.rows || [] });
    } catch (err) {
        return sendServerError(res, err, "Unable to fetch product folders.");
    }
});

module.exports = router;
