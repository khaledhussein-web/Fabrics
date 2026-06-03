import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toSiteUrl } from "../config/env";
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_IMAGE, normalizeDescription, SITE_NAME } from "../seo";

const upsertMetaTag = (attribute, key, content) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonical = (href) => {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const upsertJsonLd = (jsonLd) => {
  const scriptId = "page-json-ld";
  let tag = document.head.querySelector(`script#${scriptId}`);

  if (!jsonLd) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("script");
    tag.id = scriptId;
    tag.type = "application/ld+json";
    document.head.appendChild(tag);
  }

  const entries = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  tag.textContent = JSON.stringify(entries.length === 1 ? entries[0] : entries);
};

const Seo = ({
  title = `${SITE_NAME} | Stage Fabrics, Flooring, Tracks, Frames and Trussing`,
  description = DEFAULT_SEO_DESCRIPTION,
  image = DEFAULT_SEO_IMAGE,
  noindex = false,
  type = "website",
  jsonLd,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = toSiteUrl(pathname);
    const imageUrl = toSiteUrl(image);
    const cleanDescription = normalizeDescription(description);
    const robots = noindex ? "noindex, nofollow" : "index, follow";

    document.title = title;
    upsertCanonical(canonicalUrl);
    upsertMetaTag("name", "description", cleanDescription);
    upsertMetaTag("name", "robots", robots);
    upsertMetaTag("property", "og:type", type);
    upsertMetaTag("property", "og:title", title);
    upsertMetaTag("property", "og:description", cleanDescription);
    upsertMetaTag("property", "og:url", canonicalUrl);
    upsertMetaTag("property", "og:image", imageUrl);
    upsertMetaTag("property", "og:image:alt", `${SITE_NAME} product and stage solutions`);
    upsertMetaTag("property", "og:site_name", SITE_NAME);
    upsertMetaTag("property", "og:locale", "en_GB");
    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", title);
    upsertMetaTag("name", "twitter:description", cleanDescription);
    upsertMetaTag("name", "twitter:image", imageUrl);
    upsertJsonLd(jsonLd);
  }, [description, image, jsonLd, noindex, pathname, title, type]);

  return null;
};

export default Seo;
