import { toSiteUrl } from "./config/env";

export const SITE_NAME = "StageWare";
export const DEFAULT_SEO_IMAGE = "/logo.png";
export const DEFAULT_SEO_DESCRIPTION =
  "StageWare supplies flame-retardant fabrics, flooring, track systems, frame profiles, and trussing systems for theatres, events, and commercial spaces.";

export const normalizeDescription = (value, fallback = DEFAULT_SEO_DESCRIPTION) => {
  const text = String(value || fallback).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157).trim()}...` : text;
};

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": toSiteUrl("/#organization"),
  name: SITE_NAME,
  url: toSiteUrl("/"),
  logo: toSiteUrl(DEFAULT_SEO_IMAGE),
  description: DEFAULT_SEO_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "info@stageware.com",
    areaServed: ["GB", "LB", "AE", "SA", "QA", "KW"],
    availableLanguage: ["en"],
  },
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": toSiteUrl("/#website"),
  name: SITE_NAME,
  url: toSiteUrl("/"),
  publisher: {
    "@id": toSiteUrl("/#organization"),
  },
});

export const breadcrumbJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toSiteUrl(item.path),
  })),
});

export const collectionJsonLd = ({ name, description, path, items = [] }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  description: normalizeDescription(description),
  url: toSiteUrl(path),
  isPartOf: {
    "@id": toSiteUrl("/#website"),
  },
  about: {
    "@type": "Thing",
    name,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items.slice(0, 24).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: toSiteUrl(item.url),
    })),
  },
});

export const productJsonLd = ({ product, imageUrl, path }) => {
  const specs = product?.specs || {};

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name_en || "StageWare product",
    description: normalizeDescription(product?.description_en, "Product details from StageWare."),
    image: imageUrl ? [toSiteUrl(imageUrl)] : [toSiteUrl(DEFAULT_SEO_IMAGE)],
    url: toSiteUrl(path),
    sku: specs.product_code || String(product?.product_id || ""),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: product?.category_name || undefined,
  };
};
