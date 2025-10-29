// ==================== IMPORTS ====================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // PostgreSQL connection (Pool)

// ==================== CONFIG ====================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());

// ==================== BASIC ROUTE ====================
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fabrics API with Category Support 🧵' });
});

// ==================== PRODUCTS ROUTES ====================

// 🟢 GET all products (JOIN category)
app.get('/api/products', async (req, res) => {
  try {
    console.log('GET /api/products triggered...');

    // Test database connection
    await db.query('SELECT 1');
    console.log('✅ Database connection OK');

    const query = `
      SELECT 
        p.id,
        p.name_en,
        p.name_ar,
        p.description_en,
        p.description_ar,
        p.image_path,
        p.created_at,
        c.id AS category_id,
        c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
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

// 🟢 POST a new product (with category_id)
app.post('/api/products', async (req, res) => {
  const {
    category_id,
    name_en,
    name_ar,
    description_en,
    description_ar,
    image_path,
    created_at
  } = req.body;

  console.log('POST /api/products received:', req.body);

  try {
    await db.query('SELECT 1');
    console.log('✅ Database connection OK');

    const cleanedImagePath = image_path
      ? image_path.replace(/^["']|["']$/g, '')
      : null;

    const query = `
      INSERT INTO products (
        category_id, name_en, name_ar, description_en, description_ar, image_path, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      category_id,
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

// 🟢 GET all categories
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
