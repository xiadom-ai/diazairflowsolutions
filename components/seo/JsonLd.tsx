/**
 * JSON-LD Schema Markup Components
 * Implements structured data for better SEO
 */

import Script from "next/script";

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry?: string;
  };
  areaServed?: string[];
  priceRange?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function LocalBusinessSchema({
  name = "Diaz Airflow Solutions Inc.",
  description = "Professional HVAC services in Maryland, Virginia, and Washington DC. 24/7 emergency AC repair, heating installation, and maintenance. Licensed & insured since 2010.",
  telephone = "(240) 432-7489",
  email = "info@diazairflowsolutions.com",
  address = {
    streetAddress: "13133 Beaver Terrace",
    addressLocality: "Rockville",
    addressRegion: "MD",
    postalCode: "20853",
    addressCountry: "US",
  },
  areaServed = [
    "Bowie, MD",
    "Upper Marlboro, MD",
    "Laurel, MD",
    "Silver Spring, MD",
    "Rockville, MD",
    "Bethesda, MD",
    "College Park, MD",
    "Hyattsville, MD",
    "Washington, DC",
    "Arlington, VA",
    "Alexandria, VA",
  ],
  priceRange = "$$",
  rating = {
    ratingValue: 4.9,
    reviewCount: 487,
  },
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.diazairflowsolutions.com/#organization",
    name,
    description,
    url: "https://www.diazairflowsolutions.com",
    logo: "https://www.diazairflowsolutions.com/logo-diazairflowsolutions.png",
    image: "https://www.diazairflowsolutions.com/logo-diazairflowsolutions.png",
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "39.0840",
      longitude: "-77.1528",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "23:59",
        description: "Emergency Service Only",
      },
    ],
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    priceRange,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/diazairflowsolutions",
      "https://www.instagram.com/diazairflowsolutions",
      "https://www.linkedin.com/company/diazairflowsolutions",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Air Conditioning Installation",
            description: "Professional AC installation with energy-efficient systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AC Repair",
            description: "24/7 emergency AC repair service",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Heating Installation",
            description: "High-efficiency furnace and heat pump installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Heating Repair",
            description: "Emergency heating repair service",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HVAC Maintenance",
            description: "Comprehensive maintenance plans and tune-ups",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Indoor Air Quality",
            description: "Air purification and filtration systems",
          },
        },
      ],
    },
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  priceRange?: string;
  areaServed?: string[];
}

export function ServiceSchema({
  serviceName,
  description,
  priceRange = "$$",
  areaServed = ["Maryland", "Virginia", "Washington DC"],
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "HVACBusiness",
      name: "Diaz Airflow Solutions Inc.",
      telephone: "(240) 432-7489",
      url: "https://www.diazairflowsolutions.com",
    },
    description,
    areaServed: areaServed.map((area) => ({
      "@type": "State",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceName,
      itemListElement: [
        {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            price: priceRange,
          },
        },
      ],
    },
  };

  return (
    <Script
      id={`service-schema-${serviceName.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
