"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CalendlyPopupButtonProps {
  url?: string;
  text?: string;
  variant?: "primary" | "secondary" | "gradient";
  size?: "sm" | "md" | "lg";
  prefill?: {
    name?: string;
    email?: string;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
  };
}

/**
 * Calendly Popup Button Component
 * Opens Calendly in a popup modal when clicked
 */
export function CalendlyPopupButton({
  url,
  text = "Book Appointment",
  variant = "primary",
  size = "md",
  prefill,
  utm,
}: CalendlyPopupButtonProps) {
  const calendlyUrl =
    url ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/diazairflow";

  useEffect(() => {
    // Load Calendly popup widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleClick = () => {
    // Build URL with parameters
    const params = new URLSearchParams();

    if (prefill?.name) params.append("name", prefill.name);
    if (prefill?.email) params.append("email", prefill.email);
    if (utm?.utmCampaign) params.append("utm_campaign", utm.utmCampaign);
    if (utm?.utmSource) params.append("utm_source", utm.utmSource);
    if (utm?.utmMedium) params.append("utm_medium", utm.utmMedium);

    const queryString = params.toString();
    const finalUrl = queryString ? `${calendlyUrl}?${queryString}` : calendlyUrl;

    // Open Calendly popup
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: finalUrl });
    }

    // Track button click
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "calendly_open", {
        button_location: "popup_button",
        page: window.location.pathname,
      });
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleClick} leftIcon={Calendar}>
      {text}
    </Button>
  );
}
