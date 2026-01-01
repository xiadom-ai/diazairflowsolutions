"use client";

import { useEffect } from "react";

interface CalendlyEmbedProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

/**
 * Calendly Inline Embed Component
 * Embeds Calendly scheduling directly into the page
 */
export function CalendlyEmbed({ url, prefill, utm }: CalendlyEmbedProps) {
  const calendlyUrl =
    url ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/diazairflow";

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Build URL with parameters
  const buildUrl = () => {
    const params = new URLSearchParams();

    // Add prefill parameters
    if (prefill?.name) params.append("name", prefill.name);
    if (prefill?.email) params.append("email", prefill.email);

    // Add custom answers
    if (prefill?.customAnswers) {
      Object.entries(prefill.customAnswers).forEach(([key, value]) => {
        params.append(`a${key}`, value);
      });
    }

    // Add UTM parameters
    if (utm?.utmCampaign) params.append("utm_campaign", utm.utmCampaign);
    if (utm?.utmSource) params.append("utm_source", utm.utmSource);
    if (utm?.utmMedium) params.append("utm_medium", utm.utmMedium);
    if (utm?.utmContent) params.append("utm_content", utm.utmContent);
    if (utm?.utmTerm) params.append("utm_term", utm.utmTerm);

    const queryString = params.toString();
    return queryString ? `${calendlyUrl}?${queryString}` : calendlyUrl;
  };

  return (
    <div
      className="calendly-inline-widget"
      data-url={buildUrl()}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
