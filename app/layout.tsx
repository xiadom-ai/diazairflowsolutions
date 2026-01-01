import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { LocalBusinessSchema } from "@/components/seo/JsonLd";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.diazairflowsolutions.com"),
  title: {
    default: "Diaz Airflow Solutions Inc. | HVAC Services in Maryland | 24/7 Emergency AC Repair",
    template: "%s | Diaz Airflow Solutions Inc.",
  },
  description: "Expert HVAC services in Maryland, Virginia & DC. 24/7 emergency AC repair, heating installation, and maintenance. Licensed, insured, serving DMV since 2010. Call (240) 432-7489.",
  keywords: "HVAC Maryland, AC repair Bowie, heating installation Silver Spring, air conditioning Rockville, furnace repair Bethesda, emergency HVAC DMV",
  authors: [{ name: "Diaz Airflow Solutions Inc." }],
  creator: "Diaz Airflow Solutions Inc.",
  publisher: "Diaz Airflow Solutions Inc.",

  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.diazairflowsolutions.com",
    siteName: "Diaz Airflow Solutions Inc.",
    images: [
      {
        url: "/logo-diazairflowsolutions.png",
        width: 1200,
        height: 630,
        alt: "Diaz Airflow Solutions Inc. - Expert HVAC Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diaz Airflow Solutions Inc. | HVAC Services in Maryland",
    description: "Expert HVAC services in Maryland. 24/7 emergency service. Call (240) 432-7489.",
    creator: "@diazairflow",
    images: ["/logo-diazairflowsolutions.png"],
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnalyticsProvider />
          <LocalBusinessSchema />
          <ToastProvider />
          <EmergencyBanner />
          <Navigation
            cta={{ text: "Schedule Service", href: "/contact" }}
          />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
