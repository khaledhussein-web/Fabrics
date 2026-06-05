const crypto = require("crypto");
const helmet = require("helmet");
const { logApiError } = require("./errorLogger");
const { isProductionAdminTokenAllowed } = require("./runtimeConfig");

const isProduction = process.env.NODE_ENV === "production";

const ERROR_CODES = Object.freeze({
  NOT_FOUND: 10000,
  BAD_REQUEST: 10001,
  UNAUTHORIZED: 10002,
  FORBIDDEN: 10003,
  METHOD_NOT_ALLOWED: 10004,
  RATE_LIMITED: 10005,
  INTERNAL_ERROR: 10006,
  SERVICE_UNAVAILABLE: 10007,
});

const ERROR_CODE_BY_STATUS = Object.freeze({
  400: ERROR_CODES.BAD_REQUEST,
  401: ERROR_CODES.UNAUTHORIZED,
  403: ERROR_CODES.FORBIDDEN,
  404: ERROR_CODES.NOT_FOUND,
  405: ERROR_CODES.METHOD_NOT_ALLOWED,
  429: ERROR_CODES.RATE_LIMITED,
  500: ERROR_CODES.INTERNAL_ERROR,
  503: ERROR_CODES.SERVICE_UNAVAILABLE,
});

const LOCAL_DEV_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const PRODUCTION_FRONTEND_ORIGIN = "https://stageware.co.uk";

const parseAllowedOrigins = () => {
  const raw = process.env.CORS_ALLOWED_ORIGINS || "";
  const list = raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .filter((origin) => {
      try {
        const parsed = new URL(origin);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    });
  if (list.length > 0) return list;

  if (isProduction) {
    return [process.env.FRONTEND_URL || PRODUCTION_FRONTEND_ORIGIN];
  }

  return [...LOCAL_DEV_ORIGINS, process.env.FRONTEND_URL].filter(Boolean);
};

const allowedOrigins = parseAllowedOrigins();

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  return allowedOrigins.includes(origin);
};

const corsOptions = {
  origin(origin, callback) {
    // Browser clients must come from known frontend origins; server-to-server/no-origin requests are allowed.
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Token"],
  credentials: false,
  maxAge: 600,
  optionsSuccessStatus: 204,
};

const cspConnectSources = [
  "'self'",
  ...allowedOrigins,
  process.env.BACKEND_URL,
].filter(Boolean);

const cspDirectives = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
  "frame-ancestors": ["'none'"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "object-src": ["'none'"],
  "script-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "connect-src": cspConnectSources,
  "form-action": ["'self'"],
};

if (isProduction) {
  cspDirectives["upgrade-insecure-requests"] = [];
}

// Helmet sets common secure headers and hides framework details.
const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: cspDirectives,
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});

const requestContext = (req, res, next) => {
  const incomingId = req.get("x-request-id");
  const requestId =
    typeof incomingId === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(incomingId)
      ? incomingId
      : crypto.randomUUID();

  res.locals.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
};

const errorCodeForStatus = (status) => {
  if (ERROR_CODE_BY_STATUS[status]) return ERROR_CODE_BY_STATUS[status];
  return status >= 400 && status < 500
    ? ERROR_CODES.BAD_REQUEST
    : ERROR_CODES.INTERNAL_ERROR;
};

const sendPublicError = (res, status, code, message, extra = {}) => {
  const requestId = res.locals.requestId || crypto.randomUUID();
  const req = res.req;

  void logApiError({
    requestId,
    errorCode: code,
    httpStatus: status,
    method: req?.method,
    // originalUrl includes the query string, so use path/baseUrl only.
    requestPath: req ? `${req.baseUrl || ""}${req.path || "/"}` : "/",
    publicMessage: message,
  });

  return res.status(status).json({
    ...extra,
    code,
    message,
    requestId,
  });
};

const createRateLimiter = ({ windowMs, max, keyPrefix = "global" }) => {
  const buckets = new Map();
  let lastCleanup = Date.now();

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    const key = `${keyPrefix}:${ip}`;
    const existing = buckets.get(key) || [];
    const fresh = existing.filter((ts) => now - ts < windowMs);

    // Periodically drop expired buckets so the in-memory limiter cannot grow forever.
    if (now - lastCleanup > windowMs) {
      for (const [bucketKey, timestamps] of buckets.entries()) {
        const active = timestamps.filter((ts) => now - ts < windowMs);
        if (active.length === 0) buckets.delete(bucketKey);
        else buckets.set(bucketKey, active);
      }
      lastCleanup = now;
    }

    if (fresh.length >= max) {
      return sendPublicError(
        res,
        429,
        ERROR_CODES.RATE_LIMITED,
        "Too many requests. Please try again later."
      );
    }

    fresh.push(now);
    buckets.set(key, fresh);
    next();
  };
};

const stripHtmlTags = (value) => String(value ?? "").replace(/<[^>]*>/g, "");

const sanitizeText = (value, { maxLength = 255, required = false } = {}) => {
  if (value === undefined || value === null) {
    return required ? null : "";
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return required ? null : "";
  }

  const clean = stripHtmlTags(value).replace(/\s+/g, " ").trim();
  if (required && !clean) return null;
  return clean.slice(0, maxLength);
};

const parsePositiveInt = (value) => {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) return null;
  return number;
};

const validatePositiveIdParam = (req, res, paramName) => {
  const parsed = parsePositiveInt(req.params[paramName]);
  if (!parsed) {
    sendPublicError(res, 400, ERROR_CODES.BAD_REQUEST, `Invalid ${paramName}`);
    return null;
  }
  return parsed;
};

const validateSearchQuery = (value) => {
  if (value === undefined || value === null || value === "") return "";
  return sanitizeText(value, { maxLength: 80 });
};

const sendServerError = (res, error, publicMessage = "Internal server error") => {
  const requestId = res.locals.requestId || crypto.randomUUID();
  console.error(`[${requestId}] ${publicMessage}`, error);
  return sendPublicError(
    res,
    500,
    ERROR_CODES.INTERNAL_ERROR,
    publicMessage
  );
};

const timingSafeMatch = (input, expected) => {
  const a = Buffer.from(String(input || ""), "utf8");
  const b = Buffer.from(String(expected || ""), "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

const requireAdminAuth = (req, res, next) => {
  const configuredToken = process.env.ADMIN_API_TOKEN || "";
  if (
    !configuredToken ||
    !isProductionAdminTokenAllowed({
      nodeEnv: process.env.NODE_ENV,
      adminToken: configuredToken,
    })
  ) {
    return sendPublicError(
      res,
      503,
      ERROR_CODES.SERVICE_UNAVAILABLE,
      "Admin API is unavailable."
    );
  }

  const authHeader = req.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const fallback = (req.get("x-admin-token") || "").trim();
  const providedToken = bearer || fallback;

  if (!timingSafeMatch(providedToken, configuredToken)) {
    return sendPublicError(
      res,
      401,
      ERROR_CODES.UNAUTHORIZED,
      "Unauthorized"
    );
  }

  const origin = req.get("origin");
  if (!isAllowedOrigin(origin)) {
    return sendPublicError(
      res,
      403,
      ERROR_CODES.FORBIDDEN,
      "Forbidden origin"
    );
  }

  return next();
};

module.exports = {
  ERROR_CODES,
  allowedOrigins,
  corsOptions,
  createRateLimiter,
  errorCodeForStatus,
  isAllowedOrigin,
  parsePositiveInt,
  requireAdminAuth,
  requestContext,
  sanitizeText,
  securityHeaders,
  sendPublicError,
  sendServerError,
  validatePositiveIdParam,
  validateSearchQuery,
};
