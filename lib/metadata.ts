import { Metadata } from "next";

interface PageMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.diazairflowsolutions.com";
const defaultImage = `${baseUrl}/logo-diazairflowsolutions.png`;
const siteName = "Diaz Airflow Solutions Inc.";

/**
 * Generate comprehensive metadata including Open Graph and Twitter Cards
 */
export function generateMetadata({
  title,
  description,
  path = "/",
  image = defaultImage,
  type = "website",
  keywords,
}: PageMetadataProps): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@diazairflow",
      site: "@diazairflow",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

/**
 * Home page metadata
 */
export const homeMetadata = generateMetadata({
  title: "Diaz Airflow Solutions Inc. | HVAC Services in Maryland | 24/7 Emergency AC Repair",
  description:
    "Expert HVAC services in Maryland, Virginia & DC. 24/7 emergency AC repair, heating installation, and maintenance. Licensed, insured, serving DMV since 2010. Call (240) 432-7489.",
  keywords:
    "HVAC Maryland, AC repair Bowie, heating installation Silver Spring, air conditioning Rockville, furnace repair Bethesda, emergency HVAC DMV, HVAC contractor Maryland",
  path: "/",
});

/**
 * About page metadata
 */
export const aboutMetadata = generateMetadata({
  title: "About Us - 20+ Years of HVAC Excellence",
  description:
    "Learn about Diaz Airflow Solutions Inc. Over 20 years of expert HVAC service in Maryland. Family-owned, licensed, and insured. Serving residential and commercial clients throughout the DMV.",
  keywords: "HVAC company Maryland, about Diaz Air Flow, HVAC contractor Bowie MD, licensed HVAC Maryland",
  path: "/about",
});

/**
 * Services page metadata
 */
export const servicesMetadata = generateMetadata({
  title: "HVAC Services - AC, Heating, Maintenance & Air Quality",
  description:
    "Comprehensive HVAC services: AC installation & repair, heating systems, maintenance plans, and indoor air quality solutions. Serving Maryland, Virginia & DC. Free estimates available.",
  keywords:
    "HVAC services Maryland, AC installation, heating repair, HVAC maintenance, air quality, duct cleaning",
  path: "/services",
});

/**
 * Contact page metadata
 */
export const contactMetadata = generateMetadata({
  title: "Contact Us - Schedule HVAC Service Today",
  description:
    "Contact Diaz Airflow Solutions Inc. for expert HVAC service. Call (240) 432-7489 for 24/7 emergency service or schedule online. Serving Bowie, Silver Spring, Rockville & surrounding areas.",
  keywords: "contact HVAC Maryland, schedule AC repair, HVAC emergency service, get HVAC estimate",
  path: "/contact",
});

/**
 * Generate service-specific metadata
 */
export function generateServiceMetadata(serviceName: string, description: string): Metadata {
  const slug = serviceName.toLowerCase().replace(/\s+/g, "-");

  return generateMetadata({
    title: `${serviceName} in Maryland | Professional HVAC Service`,
    description: `${description} Licensed technicians serving Maryland, Virginia & DC. Free estimates, 24/7 emergency service. Call (240) 432-7489.`,
    keywords: `${serviceName} Maryland, ${serviceName} Bowie, ${serviceName} DMV, professional ${serviceName}`,
    path: `/services/${slug}`,
  });
}
