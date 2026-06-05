const MIN_ADMIN_TOKEN_LENGTH = 32;
const ADMIN_TOKEN_PLACEHOLDER = "change_this_to_a_long_random_secret";
const WEAK_ADMIN_TOKENS = new Set([
  ADMIN_TOKEN_PLACEHOLDER,
  "admin",
  "password",
  "secret",
  "token",
]);

const getAdminTokenProblem = (token) => {
  const normalized = String(token || "").trim();

  if (!normalized) return "ADMIN_API_TOKEN is required in production";
  if (WEAK_ADMIN_TOKENS.has(normalized.toLowerCase())) {
    return "ADMIN_API_TOKEN must not use a known placeholder or weak value";
  }
  if (normalized.length < MIN_ADMIN_TOKEN_LENGTH) {
    return `ADMIN_API_TOKEN must be at least ${MIN_ADMIN_TOKEN_LENGTH} characters`;
  }

  return null;
};

const validateProductionAdminToken = ({
  nodeEnv = process.env.NODE_ENV,
  adminToken = process.env.ADMIN_API_TOKEN,
} = {}) => {
  if (nodeEnv !== "production") return;

  const problem = getAdminTokenProblem(adminToken);
  if (problem) throw new Error(problem);
};

const isProductionAdminTokenAllowed = ({
  nodeEnv = process.env.NODE_ENV,
  adminToken = process.env.ADMIN_API_TOKEN,
} = {}) => nodeEnv !== "production" || !getAdminTokenProblem(adminToken);

module.exports = {
  ADMIN_TOKEN_PLACEHOLDER,
  MIN_ADMIN_TOKEN_LENGTH,
  getAdminTokenProblem,
  isProductionAdminTokenAllowed,
  validateProductionAdminToken,
};
