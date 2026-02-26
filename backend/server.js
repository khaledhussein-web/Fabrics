const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db'); // Renamed to 'pool' for clarity

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

// ==================== API ROUTES (POOL VERSION) ====================

const DEFAULT_UK_WHATSAPP_NUMBER = "447700900123";
const DEFAULT_WHATSAPP_TEXT = "Hello, need some help with your products.";

const normalizeWhatsAppNumber = (input) => {
  const digits = (input || "").replace(/\D/g, "");
  if (!digits) return DEFAULT_UK_WHATSAPP_NUMBER;
  if (digits.startsWith("44")) return digits;
  if (digits.startsWith("0")) return `44${digits.slice(1)}`;
  return digits;
};

const buildWhatsAppChatUrl = () => {
  const rawNumber = process.env.WHATSAPP_UK_NUMBER || DEFAULT_UK_WHATSAPP_NUMBER;
  const rawText = (process.env.WHATSAPP_DEFAULT_TEXT || DEFAULT_WHATSAPP_TEXT).trim();
  const digitsOnly = normalizeWhatsAppNumber(rawNumber);
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(rawText)}`;
};

app.get("/api/config/whatsapp", (req, res) => {
  res.json({ chatUrl: buildWhatsAppChatUrl() });
});

// Get Categories (L1)
app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query('SELECT id AS category_id, name FROM categories');
    res.json({ categories: result.rows });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Subcategories (L2)
app.get("/api/subcategories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT subcategory_id, name, parent_category_id AS category_id, name_ar 
      FROM subcategories
    `);
    res.json({ subcategories: result.rows });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Sub-products for a specific Folder (L3)
// This fixes the "TypeError" and the 404
app.get("/api/sub-content/:folderId", async (req, res) => {
    const { folderId } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE parent_id = $1 ORDER BY product_id ASC',
            [folderId]
        );
        // React expects response.data.content
        res.json({ content: result.rows });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
