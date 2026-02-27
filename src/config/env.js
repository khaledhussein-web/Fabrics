const stripTrailingSlash = (value) => (value || "").replace(/\/+$/, "");

export const API_BASE_URL =
  stripTrailingSlash(import.meta.env.VITE_API_BASE_URL) || "http://localhost:5000";

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
