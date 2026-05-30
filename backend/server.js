const express = require('express');
const cors = require('cors');
<<<<<<< Updated upstream
const dotenv = require('dotenv');
const path = require('path');
=======
>>>>>>> Stashed changes
const pool = require('./db'); // Renamed to 'pool' for clarity
const { corsOptions, createRateLimiter, securityHeaders } = require("./security");

// Import Route Files
const productAddRoutes = require('./AddingProducts');
const generalRoutes = require('./RetrivingProducts');

<<<<<<< Updated upstream
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });
=======
>>>>>>> Stashed changes
const app = express();
const PORT = process.env.PORT || 5000;

const stripHtmlTags = (value) => String(value ?? '').replace(/<[^>]*>/g, '');
const sanitizeOptionalText = (value) => {
  if (value === undefined || value === null) return value;
  const clean = stripHtmlTags(value).trim();
  return clean || null;
};
const sanitizeProductRecord = (row) => ({
  ...row,
  name_en: sanitizeOptionalText(row.name_en),
  name_ar: sanitizeOptionalText(row.name_ar),
  description_en: sanitizeOptionalText(row.description_en),
  description_ar: sanitizeOptionalText(row.description_ar),
});
const parsePositiveInt = (value) => {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) return null;
  return number;
};

// Middleware
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(
  createRateLimiter({
    windowMs: 60 * 1000,
    max: 180,
    keyPrefix: "api-global",
  })
);
app.use(
  "/uploads",
  (req, res, next) => {
    const blocked = /\.(?:html?|svg|js|mjs|cjs|php|aspx?)$/i.test(req.path || "");
    if (blocked) {
      return res.status(403).json({ message: "File type not allowed." });
    }
    return next();
  },
  express.static(path.resolve(__dirname, "uploads"), {
    dotfiles: "deny",
    fallthrough: false,
    index: false,
    maxAge: "7d",
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    },
  })
);

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
    const folderId = parsePositiveInt(req.params.folderId);
    if (!folderId) {
      return res.status(400).json({ message: "Invalid folderId" });
    }
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE parent_id = $1 ORDER BY product_id ASC',
            [folderId]
        );
        // React expects response.data.content
        res.json({ content: result.rows.map(sanitizeProductRecord) });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('❌ Server failed:', error);
  process.exit(1);
});

server.on('close', () => {
  console.log('⚠️ Server closed.');
});
