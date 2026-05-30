const stripTrailingSlash = (value) => (value || "").replace(/\/+$/, "");
const stripQuotes = (value) => String(value || "").trim().replace(/^["']|["']$/g, "");
const normalizeSlashes = (value) => value.replace(/\\/g, "/");

const ENV_API_BASE_URL = stripTrailingSlash(import.meta.env.VITE_API_BASE_URL);
export const API_BASE_URL = ENV_API_BASE_URL || "";

export const SITE_URL =
  stripTrailingSlash(import.meta.env.VITE_SITE_URL) ||
  (typeof window !== "undefined" ? window.location.origin : "");

export const toApiUrl = (path = "") => {
  if (/^https?:\/\//i.test(path)) return path;
  if (!path) return API_BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const toSiteUrl = (path = "") => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

const CATEGORY_UPLOAD_FOLDERS = {
  1: "Fabrics",
  2: "Flooring",
  3: "Frames",
  4: "Tracks",
  5: "ProjectionScreens",
};

export const toProductImageUrl = (rawPath, categoryId) => {
  const pathValue = normalizeSlashes(stripQuotes(rawPath));
  if (!pathValue) return "";
  if (/^https?:\/\//i.test(pathValue)) return pathValue;
  if (pathValue.startsWith("/uploads/")) return `${API_BASE_URL}${pathValue}`;
  if (pathValue.startsWith("uploads/")) return `${API_BASE_URL}/${pathValue}`;
  if (pathValue.startsWith("src/")) return `/${pathValue.replace(/^src\//, "")}`;
  if (pathValue.startsWith("/")) return `${API_BASE_URL}${pathValue}`;

  const looksLikeNestedPath = pathValue.includes("/");
  if (looksLikeNestedPath) {
    return toApiUrl(`/uploads/${pathValue}`);
  }

  const folder = CATEGORY_UPLOAD_FOLDERS[Number(categoryId)];
  if (folder) {
    return toApiUrl(`/uploads/${folder}/${pathValue}`);
  }

  return toApiUrl(`/uploads/${pathValue}`);
};
