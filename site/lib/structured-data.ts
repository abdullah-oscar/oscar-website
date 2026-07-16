/**
 * JSON-LD structured data. Rendered into <head> so Google can build
 * rich results (Organization knowledge panel, SoftwareApplication,
 * FAQ rich snippets). See /docs/SEO.md.
 */
import { site, faqs } from "./site";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    foundingDate: site.founded,
    sameAs: [site.links.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: site.links.demo,
    },
  };
}

export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: site.description,
    url: site.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Request a demo",
      url: site.links.demo,
    },
    featureList: [
      "Real-time fraud, void, and discount detection",
      "Root-cause sales anomaly detection",
      "Labor efficiency and compliance monitoring",
      "Customer sentiment analysis",
      "Product availability monitoring",
      "Automated reports and prescriptive action plans",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "38",
    },
  };
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}
