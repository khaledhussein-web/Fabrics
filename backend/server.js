const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pool = require('./db');
const { ensureErrorLogTable } = require("./errorLogger");
const { validateProductionAdminToken } = require("./runtimeConfig");
const {
  ERROR_CODES,
  corsOptions,
  createRateLimiter,
  errorCodeForStatus,
  requestContext,
  sanitizeText,
  securityHeaders,
  sendPublicError,
  sendServerError,
  validatePositiveIdParam,
} = require("./security");

// Import Route Files
const productAddRoutes = require('./AddingProducts');
const contactRequestRoutes = require("./ContactRequests");
const generalRoutes = require('./RetrivingProducts');

dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });
const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const sanitizeProductRecord = (row) => ({
  ...row,
  name_en: sanitizeText(row.name_en, { maxLength: 150 }),
  name_ar: sanitizeText(row.name_ar, { maxLength: 150 }),
  description_en: sanitizeText(row.description_en, { maxLength: 5000 }),
  description_ar: sanitizeText(row.description_ar, { maxLength: 5000 }),
});
const sanitizeCategoryRecord = (row) => ({
  ...row,
  name: sanitizeText(row.name, { maxLength: 150 }),
  name_ar: sanitizeText(row.name_ar, { maxLength: 150 }),
});

const validateRuntimeEnv = () => {
  const parsedPort = Number(PORT);
  const missing = [];

  if (!Number.isInteger(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
    missing.push("valid PORT");
  }

  if (isProduction && !process.env.FRONTEND_URL && !process.env.CORS_ALLOWED_ORIGINS) {
    missing.push("FRONTEND_URL or CORS_ALLOWED_ORIGINS");
  }

  validateProductionAdminToken();

  if (missing.length > 0) {
    throw new Error(`Missing required backend environment values: ${missing.join(", ")}`);
  }
};

validateRuntimeEnv();
ensureErrorLogTable().catch((error) => {
  console.error("Unable to initialize API error logging:", error);
});
// In production, trust the first platform proxy so req.ip is accurate for rate limiting.
app.set("trust proxy", isProduction ? 1 : false);
app.disable("x-powered-by");

const publicApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 120,
  keyPrefix: "api-public",
});

// Middleware
// Helmet applies secure headers such as CSP, no-sniff, frame protection, and hidden framework headers.
app.use(requestContext);
app.use(securityHeaders);
app.use(cors(corsOptions));
// Small body limits reduce abuse from oversized JSON/form submissions.
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "50kb" }));
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
    // Only serve expected image assets from uploads; deny scripts, archives, and traversal attempts.
    let decodedPath;
    try {
      decodedPath = decodeURIComponent(req.path || "");
    } catch {
      return sendPublicError(
        res,
        400,
        ERROR_CODES.BAD_REQUEST,
        "Invalid file path."
      );
    }

    // Express request paths start with "/", but paths under this mount are
    // relative to the uploads directory. Normalize that relative path before
    // checking for traversal so valid image requests are not rejected.
    const relativePath = decodedPath.replace(/\\/g, "/").replace(/^\/+/, "");
    const safePath = path.posix.normalize(relativePath);
    const allowedImage = /\.(?:png|jpe?g|gif|webp)$/i.test(safePath);
    const traversal =
      !relativePath ||
      safePath === ".." ||
      safePath.startsWith("../") ||
      path.posix.isAbsolute(safePath);

    if (req.method !== "GET" && req.method !== "HEAD") {
      return sendPublicError(
        res,
        405,
        ERROR_CODES.METHOD_NOT_ALLOWED,
        "Method not allowed."
      );
    }

    if (!allowedImage || traversal) {
      return sendPublicError(
        res,
        403,
        ERROR_CODES.FORBIDDEN,
        "File type not allowed."
      );
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
app.use('/api', publicApiLimiter, productAddRoutes); 
app.use("/api", publicApiLimiter, contactRequestRoutes);
app.use('/api', publicApiLimiter, generalRoutes); 

// ==================== API ROUTES (POOL VERSION) ====================

const DEFAULT_UK_WHATSAPP_NUMBER = "447441922124";
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

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.json({ status: "ok" });
  } catch (error) {
    console.error(`[${res.locals.requestId}] Health check failed`, error);
    return sendPublicError(
      res,
      503,
      ERROR_CODES.SERVICE_UNAVAILABLE,
      "Service unavailable."
    );
  }
});

// Get Categories (L1)
app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query('SELECT id AS category_id, name FROM categories');
    res.json({ categories: result.rows.map(sanitizeCategoryRecord) });
  } catch (error) {
    return sendServerError(res, error, "Unable to fetch categories.");
  }
});

// Get Subcategories (L2)
app.get("/api/subcategories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT subcategory_id, name, parent_category_id AS category_id, name_ar 
      FROM subcategories
    `);
    res.json({ subcategories: result.rows.map(sanitizeCategoryRecord) });
  } catch (error) {
    return sendServerError(res, error, "Unable to fetch subcategories.");
  }
});

// Get Sub-products for a specific Folder (L3)
// This fixes the "TypeError" and the 404
app.get("/api/sub-content/:folderId", async (req, res) => {
    const folderId = validatePositiveIdParam(req, res, "folderId");
    if (!folderId) return;
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE parent_id = $1 ORDER BY product_id ASC',
            [folderId]
        );
        // React expects response.data.content
        res.json({ content: result.rows.map(sanitizeProductRecord) });
    } catch (error) {
        return sendServerError(res, error, "Unable to fetch products.");
    }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

app.use((req, res) =>
  sendPublicError(
    res,
    404,
    ERROR_CODES.NOT_FOUND,
    "Resource not found."
  )
);

app.use((err, req, res, next) => {
  if (err?.message === "Origin not allowed by CORS") {
    return sendPublicError(
      res,
      403,
      ERROR_CODES.FORBIDDEN,
      "Forbidden origin."
    );
  }

  const errorStatus = err?.status ?? err?.statusCode;
  const status = Number.isInteger(errorStatus) ? errorStatus : 500;
  if (status >= 400 && status < 500) {
    const message = status === 404 ? "Resource not found." : "Request failed.";
    return sendPublicError(
      res,
      status,
      errorCodeForStatus(status),
      message
    );
  }

  return sendServerError(res, err, "Internal server error.");
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
