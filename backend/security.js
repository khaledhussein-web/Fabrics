const crypto = require("crypto");

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "https://stageware.co.uk",
];

const parseAllowedOrigins = () => {
  const raw = process.env.CORS_ALLOWED_ORIGINS || "";
  const list = raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return list.length > 0 ? list : DEFAULT_ALLOWED_ORIGINS;
};

const allowedOrigins = parseAllowedOrigins();

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  return allowedOrigins.includes(origin);
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Token"],
  credentials: false,
};

const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  );
  next();
};

const createRateLimiter = ({ windowMs, max, keyPrefix = "global" }) => {
  const buckets = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const ip =
      (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    const key = `${keyPrefix}:${ip}`;
    const existing = buckets.get(key) || [];
    const fresh = existing.filter((ts) => now - ts < windowMs);

    if (fresh.length >= max) {
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }

    fresh.push(now);
    buckets.set(key, fresh);
    next();
  };
};

const timingSafeMatch = (input, expected) => {
  const a = Buffer.from(String(input || ""), "utf8");
  const b = Buffer.from(String(expected || ""), "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

const requireAdminAuth = (req, res, next) => {
  const configuredToken = process.env.ADMIN_API_TOKEN || "";
  if (!configuredToken) {
    return res.status(503).json({
      message: "Admin API is disabled. Set ADMIN_API_TOKEN to enable write operations.",
    });
  }

  const authHeader = req.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const fallback = (req.get("x-admin-token") || "").trim();
  const providedToken = bearer || fallback;

  if (!timingSafeMatch(providedToken, configuredToken)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const origin = req.get("origin");
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ message: "Forbidden origin" });
  }

  return next();
};

module.exports = {
  allowedOrigins,
  corsOptions,
  createRateLimiter,
  isAllowedOrigin,
  requireAdminAuth,
  securityHeaders,
};
