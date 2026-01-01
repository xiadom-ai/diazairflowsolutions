"use client";

import Link from "next/link";
import { Home, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-[200px] sm:text-[300px] font-bold leading-none gradient-text opacity-20">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="relative -mt-32 sm:-mt-48">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button variant="gradient" size="lg">
                <Home className="mr-2 h-5 w-5 inline-block" />
                Go Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                <Phone className="mr-2 h-5 w-5 inline-block" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/services"
                className="text-neutral-300 hover:text-primary-400 transition-colors text-left p-2 hover:bg-neutral-700 rounded-lg"
              >
                Our Services
              </Link>
              <Link
                href="/about"
                className="text-neutral-300 hover:text-primary-400 transition-colors text-left p-2 hover:bg-neutral-700 rounded-lg"
              >
                About Us
              </Link>
              <Link
                href="/services/ac-repair"
                className="text-neutral-300 hover:text-primary-400 transition-colors text-left p-2 hover:bg-neutral-700 rounded-lg"
              >
                AC Repair
              </Link>
              <Link
                href="/services/heating-installation"
                className="text-neutral-300 hover:text-primary-400 transition-colors text-left p-2 hover:bg-neutral-700 rounded-lg"
              >
                Heating Installation
              </Link>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white">
            <p className="text-sm font-semibold mb-2">Need Emergency Service?</p>
            <a href="tel:2404327489" className="text-2xl font-bold hover:underline">
              (240) 432-7489
            </a>
            <p className="text-sm mt-1 text-white/80">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
