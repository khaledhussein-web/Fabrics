const express = require('express');
const router = express.Router();
const db = require('./db'); // The PostgreSQL connection pool

// ==================== HIERARCHY & SUBCATEGORY ROUTES ====================

// 🟢 GET: Fetch the full Category/Subcategory hierarchy for the menu
router.get('/hierarchy/menu', async (req, res) => {
    try {
        const query = `
            SELECT
                c.id AS parent_id,
                c.name AS parent_name,
                JSON_AGG(
                    DISTINCT JSONB_BUILD_OBJECT(
                        'id', s.subcategory_id,
                        'name', s.name,
                        'name_ar', s.name_ar
                    )
                ) AS subcategories
            FROM public.categories c
            LEFT JOIN public.subcategories s ON s.parent_category_id = c.category_id
            GROUP BY c.id, c.name
            ORDER BY c.id;
        `;
        const result = await db.query(query);
        
        // Post-processing logic to clean up [null] entries
        const cleanRows = result.rows.map(row => {
            if (row.subcategories && row.subcategories.length === 1 && row.subcategories[0].id === null) {
                row.subcategories = [];
            }
            return row;
        });

        res.json({ hierarchy: cleanRows });
    } catch (err) {
        console.error('❌ Error fetching hierarchy:', err);
        res.status(500).json({
            message: 'Internal server error while fetching hierarchy',
            error: err.message
        });
    }
});

// 🟢 GET: Fetch all L1 content for a given Parent Category ID
router.get('/category-content/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const query = `
        SELECT p.*
        FROM public.products p
        WHERE p.category_id = $1 AND p.subcategory_id IS NULL
        ORDER BY p.product_id;
    `;
    try {
        const result = await db.query(query, [categoryId]);
        res.json({ content: result.rows });
    } catch (err) {
        console.error('❌ Error fetching L1 category content:', err);
        res.status(500).json({
            message: 'Server error while fetching L1 category content.',
            error: err.message
        });
    }
});

// 🟢 GET: Fetch all products for a specific Subcategory ID
router.get('/subcategory-products/:subcategoryId', async (req, res) => {
    const subcategoryId = req.params.subcategoryId;
    const query = `
        SELECT p.*
        FROM public.products p
        WHERE p.subcategory_id = $1
        ORDER BY p.product_id;
    `;
    try {
        const result = await db.query(query, [subcategoryId]);
        res.json({ products: result.rows });
    } catch (err) {
        console.error('❌ Error fetching subcategory products:', err);
        res.status(500).json({
            message: 'Server error while fetching subcategory products.',
            error: err.message
        });
    }
});


// ==================== SUBCATEGORIES MANAGEMENT ROUTES (CRUD) ====================

// 🟢 POST: Create a new subcategory
router.post('/subcategories', async (req, res) => {
    const { parent_category_id, name, name_ar } = req.body;
    
    if (!parent_category_id || !name) {
        return res.status(400).json({ message: 'Parent Category ID and English name are required.' });
    }

    try {
        const query = `
            INSERT INTO public.subcategories (parent_category_id, name, name_ar)
            VALUES ($1, $2, $3)
            RETURNING subcategory_id, name, parent_category_id;
        `;
        const values = [parent_category_id, name, name_ar || null];

        const { rows } = await db.query(query, values);
        res.status(201).json({
            message: 'Subcategory added successfully',
            subcategory: rows[0]
        });
    } catch (error) {
        console.error('❌ Error adding subcategory:', error);
        res.status(500).json({
            message: 'Internal server error while adding subcategory',
            error: error.message
        });
    }
});

// 🟡 PUT: Update an existing subcategory
router.put('/subcategories/:id', async (req, res) => {
    const subcategoryId = req.params.id;
    const { parent_category_id, name, name_ar } = req.body;
    
    try {
        const query = `
            UPDATE public.subcategories
            SET
                parent_category_id = COALESCE($1, parent_category_id),
                name = COALESCE($2, name),
                name_ar = $3
            WHERE subcategory_id = $4
            RETURNING subcategory_id, name, name_ar;
        `;
        const values = [parent_category_id, name, name_ar || null, subcategoryId];

        const { rowCount, rows } = await db.query(query, values);

        if (rowCount === 0) {
            return res.status(404).json({ message: 'Subcategory not found.' });
        }

        res.json({
            message: 'Subcategory updated successfully',
            subcategory: rows[0]
        });
    } catch (error) {
        console.error('❌ Error updating subcategory:', error);
        res.status(500).json({
            message: 'Internal server error while updating subcategory',
            error: error.message
        });
    }
});

// 🔴 DELETE: Delete a subcategory
router.delete('/subcategories/:id', async (req, res) => {
    const subcategoryId = req.params.id;

    try {
        // IMPORTANT: Check if any products still reference this subcategory_id
        const productCheckQuery = 'SELECT COUNT(*) FROM public.products WHERE subcategory_id = $1';
        const { rows: productRows } = await db.query(productCheckQuery, [subcategoryId]);
        
        if (parseInt(productRows[0].count, 10) > 0) {
            return res.status(400).json({
                message: 'Cannot delete subcategory. Products are still linked to it.',
                linked_products_count: parseInt(productRows[0].count, 10)
            });
        }
        
        // No products linked, proceed with deletion
        const deleteQuery = 'DELETE FROM public.subcategories WHERE subcategory_id = $1';
        const { rowCount } = await db.query(deleteQuery, [subcategoryId]);

        if (rowCount === 0) {
            return res.status(404).json({ message: 'Subcategory not found.' });
        }

        res.json({ message: `Subcategory ID ${subcategoryId} deleted successfully.` });
    } catch (error) {
        console.error('❌ Error deleting subcategory:', error);
        res.status(500).json({
            message: 'Internal server error while deleting subcategory',
            error: error.message
        });
    }
});


// ==================== PRODUCTS ROUTES (UPDATED) ====================

// 🟢 GET all products (JOIN category and subcategory)
router.get('/products', async (req, res) => {
    try {
        const query = `
            SELECT
                p.product_id,
                p.category_id,
                p.subcategory_id,
                p.name_en,
                p.name_ar,
                p.description_en,
                p.description_ar,
                p.image_path,
                p.created_at,
                c.name AS category_name,
                s.name AS subcategory_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN subcategories s ON p.subcategory_id = s.subcategory_id
            ORDER BY p.created_at DESC
        `;
    
        const { rows } = await db.query(query);
    
        // Clean image paths (assuming this was part of your original logic)
        const cleanedRows = rows.map(row => ({
            ...row,
            image_path: row.image_path
                ? row.image_path.replace(/^["']|["']$/g, '')
                : row.image_path
        }));
    
        res.json({ products: cleanedRows });
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        res.status(500).json({
            message: 'Internal server error while fetching products',
            error: error.message
        });
    }
});

// NOTE: The POST /products route remains in AddingProducts.js


// ==================== CATEGORIES ROUTES ====================

// 🟢 GET all subcategories
router.get('/subcategories', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM subcategories ORDER BY subcategory_id ASC');
        res.json({ subcategories: rows });
    } catch (error) {
        console.error('❌ Error fetching subcategories:', error);
        res.status(500).json({
            message: 'Internal server error while fetching subcategories',
            error: error.message
        });
    }
});

// 🟢 GET all categories (Top-level only)
router.get('/categories', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT category_id, name FROM categories ORDER BY category_id ASC');
        res.json({ categories: rows });
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        res.status(500).json({
            message: 'Internal server error while fetching categories',
            error: error.message
        });
    }
});

// 🟢 POST a new category
router.post('/categories', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const query = `INSERT INTO categories (name) VALUES ($1) RETURNING id`;
        const { rows } = await db.query(query, [name]);
        res.status(201).json({ message: 'Category added successfully', id: rows[0].id });
    } catch (error) {
        console.error('❌ Error adding category:', error);
        res.status(500).json({
            message: 'Internal server error while adding category',
            error: error.message
        });
    }
});


module.exports = router;