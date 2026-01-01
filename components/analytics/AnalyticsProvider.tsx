"use client";

import { GoogleAnalytics } from "./GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "./GoogleTagManager";
import { FacebookPixel } from "./FacebookPixel";
import { MicrosoftClarity } from "./MicrosoftClarity";

/**
 * Analytics Provider - consolidates all analytics scripts
 * Only loads in production or when explicitly enabled
 */
export function AnalyticsProvider() {
  const isProduction = process.env.NODE_ENV === "production";
  const forceAnalytics = process.env.NEXT_PUBLIC_FORCE_ANALYTICS === "true";

  if (!isProduction && !forceAnalytics) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <GoogleTagManagerNoScript />
      <FacebookPixel />
      <MicrosoftClarity />
    </>
  );
}
