const express = require('express');
const router = express.Router();
const db = require('./db'); // The PostgreSQL connection pool
const { createRateLimiter, requireAdminAuth } = require("./security");

const stripHtmlTags = (value) => String(value ?? '').replace(/<[^>]*>/g, '');
const sanitizeText = (value) => stripHtmlTags(value).trim();
const sanitizeOptionalText = (value) => {
    if (value === undefined || value === null) return null;
    const clean = sanitizeText(value);
    return clean || null;
};
const cleanImagePath = (value) =>
    value ? String(value).replace(/^["']|["']$/g, '') : value;
const sanitizeProductRecord = (row) => ({
    ...row,
    name_en: sanitizeOptionalText(row.name_en) ?? row.name_en,
    name_ar: sanitizeOptionalText(row.name_ar) ?? row.name_ar,
    description_en: sanitizeOptionalText(row.description_en) ?? row.description_en,
    description_ar: sanitizeOptionalText(row.description_ar) ?? row.description_ar,
    image_path: cleanImagePath(row.image_path),
});
const parsePositiveInt = (value) => {
    const number = Number(value);
    if (!Number.isInteger(number) || number <= 0) return null;
    return number;
};
const validatePositiveIdParam = (req, res, paramName) => {
    const parsed = parsePositiveInt(req.params[paramName]);
    if (!parsed) {
        res.status(400).json({ message: `Invalid ${paramName}` });
        return null;
    }
    return parsed;
};
const writeLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 20,
    keyPrefix: "api-write",
});

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
    const categoryId = validatePositiveIdParam(req, res, "categoryId");
    if (!categoryId) return;
    const query = `
        SELECT p.*
        FROM public.products p
        WHERE p.category_id = $1 AND p.subcategory_id IS NULL
        ORDER BY p.product_id;
    `;
    try {
        const result = await db.query(query, [categoryId]);
        const safeRows = result.rows.map(sanitizeProductRecord);
        res.json({ content: safeRows });
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
    const subcategoryId = validatePositiveIdParam(req, res, "subcategoryId");
    if (!subcategoryId) return;
    const query = `
        SELECT p.*
        FROM public.products p
        WHERE p.subcategory_id = $1
        ORDER BY p.product_id;
    `;
    try {
        const result = await db.query(query, [subcategoryId]);
        const safeRows = result.rows.map(sanitizeProductRecord);
        res.json({ products: safeRows });
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
router.post('/subcategories', writeLimiter, requireAdminAuth, async (req, res) => {
    const { parent_category_id, name, name_ar } = req.body;
    const safeParentCategoryId = parsePositiveInt(parent_category_id);
    const safeName = sanitizeOptionalText(name);
    const safeNameAr = sanitizeOptionalText(name_ar);
    
    if (!safeParentCategoryId || !safeName) {
        return res.status(400).json({ message: 'Parent Category ID and English name are required.' });
    }

    try {
        const query = `
            INSERT INTO public.subcategories (parent_category_id, name, name_ar)
            VALUES ($1, $2, $3)
            RETURNING subcategory_id, name, parent_category_id;
        `;
        const values = [safeParentCategoryId, safeName, safeNameAr];

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
router.put('/subcategories/:id', writeLimiter, requireAdminAuth, async (req, res) => {
    const subcategoryId = validatePositiveIdParam(req, res, "id");
    if (!subcategoryId) return;
    const { parent_category_id, name, name_ar } = req.body;
    const safeParentCategoryId =
      parent_category_id === undefined ? undefined : parsePositiveInt(parent_category_id);
    const safeName = name === undefined ? undefined : sanitizeOptionalText(name);
    const safeNameAr = name_ar === undefined ? undefined : sanitizeOptionalText(name_ar);

    if (name !== undefined && !safeName) {
        return res.status(400).json({ message: 'Subcategory English name cannot be empty.' });
    }
    if (parent_category_id !== undefined && !safeParentCategoryId) {
        return res.status(400).json({ message: 'Invalid parent_category_id' });
    }
    
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
        const values = [safeParentCategoryId, safeName, safeNameAr, subcategoryId];

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
router.delete('/subcategories/:id', writeLimiter, requireAdminAuth, async (req, res) => {
    const subcategoryId = validatePositiveIdParam(req, res, "id");
    if (!subcategoryId) return;

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
                NULL::timestamp AS created_at,
                c.name AS category_name,
                s.name AS subcategory_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN subcategories s ON p.subcategory_id = s.subcategory_id
            ORDER BY p.product_id DESC
        `;
    
        const { rows } = await db.query(query);
    
        // Clean image paths (assuming this was part of your original logic)
        const cleanedRows = rows.map(sanitizeProductRecord);
    
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
router.post('/categories', writeLimiter, requireAdminAuth, async (req, res) => {
    const { name } = req.body;
    const safeName = sanitizeOptionalText(name);

    if (!safeName) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const query = `INSERT INTO categories (name) VALUES ($1) RETURNING id`;
        const { rows } = await db.query(query, [safeName]);
        res.status(201).json({ message: 'Category added successfully', id: rows[0].id });
    } catch (error) {
        console.error('❌ Error adding category:', error);
        res.status(500).json({
            message: 'Internal server error while adding category',
            error: error.message
        });
    }
});

router.get('/product/:id', async (req, res) => {
  const id = validatePositiveIdParam(req, res, "id");
  if (!id) return;

  try {
    // Base product query
    const productQuery = `
      SELECT p.*, c.name AS category_name, s.name AS subcategory_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN subcategories s ON p.subcategory_id = s.subcategory_id
      WHERE p.product_id = $1
      LIMIT 1
    `;
    const { rows } = await db.query(productQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = sanitizeProductRecord(rows[0]);

    // Decide which spec table to join
    let specQuery;
    if (Number(product.category_id) === 1 && Number(product.subcategory_id) === 2) {
      // Projection Screens live under Fabrics -> subcategory 2
      specQuery = 'SELECT * FROM projection_specs WHERE product_id = $1';
    } else {
      switch (Number(product.category_id)) {
        case 1: // Fabrics
          specQuery = 'SELECT * FROM fabric_specs WHERE product_id = $1';
          break;
        case 2: // Flooring
          specQuery = 'SELECT * FROM flooring_specs WHERE product_id = $1';
          break;
        case 3: // Frames
          specQuery = 'SELECT * FROM print_frame_specs WHERE product_id = $1';
          break;
        case 4: // Tracks
          specQuery = 'SELECT * FROM tracks_specs WHERE product_id = $1 ORDER BY photo_id ASC';
          break;
        case 5: // Legacy Projection Screens category
          specQuery = 'SELECT * FROM projection_specs WHERE product_id = $1';
          break;
        default:
          specQuery = null;
      }
    }

    if (specQuery) {
      const { rows: specRows } = await db.query(specQuery, [id]);
      product.specs = specRows[0] || {};

      // Tracks specs table stores additional photos. Keep product.image_path as the main image.
      if (Number(product.category_id) === 4) {
        product.additional_photos = specRows
          .filter((row) => row.photo_url)
          .map((row) => ({
            photo_id: row.photo_id,
            photo_url: row.photo_url,
            alt_text: sanitizeOptionalText(row.alt_text) || product.name_en || 'Track photo',
            alt_text_ar:
              sanitizeOptionalText(row.alt_text_ar) ||
              sanitizeOptionalText(row.alt_text) ||
              product.name_ar ||
              product.name_en ||
              'Track photo',
          }));
      } else {
        product.additional_photos = [];
      }
    } else {
      product.specs = product.specs_json || {};
      product.additional_photos = [];
    }

    res.json({ product });
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({
      message: 'Internal server error while fetching product',
      error: error.message
    });
  }
});


module.exports = router;
