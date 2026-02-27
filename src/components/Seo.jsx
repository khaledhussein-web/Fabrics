import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toSiteUrl } from "../config/env";

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

const Seo = ({ title, description, image = "/logo.png", noindex = false }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = toSiteUrl(pathname);
    const imageUrl = toSiteUrl(image);
    const robots = noindex ? "noindex, nofollow" : "index, follow";

    document.title = title;
    upsertCanonical(canonicalUrl);
    upsertMetaTag("name", "description", description);
    upsertMetaTag("name", "robots", robots);
    upsertMetaTag("property", "og:type", "website");
    upsertMetaTag("property", "og:title", title);
    upsertMetaTag("property", "og:description", description);
    upsertMetaTag("property", "og:url", canonicalUrl);
    upsertMetaTag("property", "og:image", imageUrl);
    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", title);
    upsertMetaTag("name", "twitter:description", description);
    upsertMetaTag("name", "twitter:image", imageUrl);
  }, [description, image, noindex, pathname, title]);

  return null;
};

export default Seo;
