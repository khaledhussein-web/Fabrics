// ==================== IMPORTS ====================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // PostgreSQL connection (Pool)
 
dotenv.config();
// ==================== CONFIG ====================
const app = express();
const PORT = process.env.PORT || 5000;
 
// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
 
 
// ==================== BASIC ROUTE ====================
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fabrics API with complete Category/Subcategory Support 🧵' });
});
 
 
// ==================== HIERARCHY & SUBCATEGORY ROUTES ====================
 
// 🟢 GET: Fetch the full Category/Subcategory hierarchy for the menu
app.get('/api/hierarchy/menu', async (req, res) => {
    try {
        const query = `
            SELECT
                c.id AS parent_id,
                c.name AS parent_name,
                -- Aggregate all subcategories into a single JSON array per parent category
                JSON_AGG(
                    DISTINCT JSONB_BUILD_OBJECT(
                        'id', s.subcategory_id,
                        'name', s.name,
                        'name_ar', s.name_ar
                    )
                ) AS subcategories
            FROM public.categories c
            -- LEFT JOIN ensures categories with no subcategories still appear
            LEFT JOIN public.subcategories s ON s.parent_category_id = c.id
            GROUP BY c.id, c.name
            ORDER BY c.id;
        `;
        const result = await db.query(query);
       
        // Post-processing to clean up [null] entries for categories with no subcategories
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
 
// 🟢 GET: Fetch all L1 content for a given Parent Category ID (subcategory_id IS NULL)
app.get('/api/category-content/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
   
    // ADJUSTED QUERY: Only fetches L1 content (products NOT linked to any subcategory).
    const query = `
        SELECT
            p.*
        FROM public.products p
       
        -- The crucial updated WHERE clause:
        -- 1. Must belong to this parent category (p.category_id = $1).
        -- 2. Must NOT be linked to any subcategory (p.subcategory_id IS NULL).
        WHERE
            p.category_id = $1
            AND
            p.subcategory_id IS NULL
       
        ORDER BY p.id;
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
app.get('/api/subcategory-products/:subcategoryId', async (req, res) => {
    const subcategoryId = req.params.subcategoryId;
 
    const query = `
        SELECT
            p.*
        FROM public.products p
       
        -- Simply filter by the requested subcategory ID
        WHERE
            p.subcategory_id = $1
       
        ORDER BY p.id;
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
app.post('/api/subcategories', async (req, res) => {
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
app.put('/api/subcategories/:id', async (req, res) => {
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
app.delete('/api/subcategories/:id', async (req, res) => {
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
// NOTE: This route now only shows products that have a category or subcategory linked.
app.get('/api/products', async (req, res) => {
  try {
    console.log('GET /api/products triggered...');
 
    // Test database connection
    await db.query('SELECT 1');
    console.log('✅ Database connection OK');
 
    const query = `
      SELECT
        p.id,
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
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN subcategories s ON p.subcategory_id = s.subcategory_id
      ORDER BY p.created_at DESC
    `;
 
    const { rows } = await db.query(query);
 
    // Clean image paths
    const cleanedRows = rows.map(row => ({
      ...row,
      image_path: row.image_path
        ? row.image_path.replace(/^["']|["']$/g, '')
        : row.image_path
    }));
 
    console.log(`✅ Retrieved ${cleanedRows.length} products`);
    res.json({ products: cleanedRows });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      message: 'Internal server error while fetching products',
      error: error.message
    });
  }
});
 
// 🟢 POST a new product (with subcategory_id AND category_id)
app.post('/api/products', async (req, res) => {
  const {
    category_id,
    subcategory_id,
    name_en,
    name_ar,
    description_en,
    description_ar,
    image_path,
    created_at
  } = req.body;
 
  console.log('POST /api/products received:', req.body);
  console.log('🔍 Category ID:', category_id, 'Subcategory ID:', subcategory_id);
 
  // Basic validation for the new structure
  if (!category_id) {
    return res.status(400).json({ message: 'Category ID is required.' });
  }
 
  try {
    await db.query('SELECT 1');
    console.log('✅ Database connection OK');
 
    const cleanedImagePath = image_path
      ? image_path.replace(/^["']|["']$/g, '')
      : null;
 
    const query = `
      INSERT INTO products (
        category_id, subcategory_id, name_en, name_ar, description_en, description_ar, image_path, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;
 
    const values = [
      category_id,
      subcategory_id || null, // Allow NULL for direct L1 linkage
      name_en,
      name_ar || null,
      description_en || null,
      description_ar || null,
      cleanedImagePath,
      created_at || new Date().toISOString()
    ];
 
    const { rows } = await db.query(query, values);
    console.log('✅ Product inserted:', rows[0]);
 
    res.status(201).json({
      message: 'Product added successfully',
      id: rows[0].id
    });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({
      message: 'Internal server error while adding product',
      error: error.message
    });
  }
});
 
// ==================== CATEGORIES ROUTES ====================
 
// 🟢 GET all categories (Top-level only)
app.get('/api/categories', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories ORDER BY id ASC');
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
app.post('/api/categories', async (req, res) => {
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
 
 
// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
 