// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const knex = require('./db'); 

// Import Route Files
const productAddRoutes = require('./AddingProducts');
const generalRoutes = require('./RetrivingProducts');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect Routers
app.use('/api', productAddRoutes); 
app.use('/api', generalRoutes); 

// ==================== API ROUTES ====================

// Get Categories (L1)
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await knex.select("id as category_id", "name").from("categories");
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Subcategories (L2)
app.get("/api/subcategories", async (req, res) => {
  try {
    // We alias parent_category_id to category_id so React can filter easily
    const subcategories = await knex.select(
        "subcategory_id", 
        "name", 
        "parent_category_id as category_id", 
        "name_ar"
    ).from("subcategories");
    res.json({ subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});