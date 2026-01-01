"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, Phone, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Error boundary caught:", error);

    // Track error with analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-red-500/10 p-6 rounded-full border-2 border-red-500/20">
            <AlertTriangle className="h-20 w-20 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-neutral-400 mb-2">
            We're sorry, but something unexpected happened.
          </p>
          <p className="text-sm text-neutral-500 mb-8">
            Our team has been notified and we're working on a fix.
          </p>

          {/* Error Details (dev only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-8 p-4 bg-neutral-900/50 backdrop-blur-sm rounded-lg text-left border border-white/5">
              <p className="text-xs font-mono text-red-400 mb-2">Development Mode Error:</p>
              <p className="text-xs font-mono text-neutral-300 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-neutral-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="gradient"
              size="lg"
              leftIcon={RotateCcw}
              onClick={reset}
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="secondary" size="lg" leftIcon={Home}>
                Go Home
              </Button>
            </Link>
          </div>

          {/* Emergency Contact */}
          <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white">
            <p className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              Need Immediate Assistance?
            </p>
            <a href="tel:2404327489" className="text-2xl font-bold hover:underline">
              (240) 432-7489
            </a>
            <p className="text-sm mt-1 text-white/80">24/7 Emergency HVAC Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
