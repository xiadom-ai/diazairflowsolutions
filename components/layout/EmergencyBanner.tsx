"use client";

import { Phone, X, Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function EmergencyBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky banner after scrolling 100px
            setIsScrolled(window.scrollY > 100);
        };

        // Load Calendly CSS
        const link = document.createElement("link");
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Load Calendly script
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            // Cleanup script and css to avoid duplicates if re-mounted (optional but good practice)
            if (script.parentNode) script.parentNode.removeChild(script);
            if (link.parentNode) link.parentNode.removeChild(link);
        };
    }, []);

    const openCalendly = (e: React.MouseEvent) => {
        e.preventDefault();
        const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/diazairflowsolutions-info/30-minutes-of-pre-estimation";

        // @ts-ignore
        if (window.Calendly) {
            // @ts-ignore
            window.Calendly.initPopupWidget({
                url: calendlyUrl
            });
        }

        return false;
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Top Banner - Always visible at the top */}
            <div className="gradient-banner text-white relative z-[60]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
                            <Clock className="h-4 w-4 hidden sm:block" />
                            <span className="font-bold text-xs sm:text-sm md:text-base tracking-wide">
                                24/7 Emergency HVAC Service Available
                            </span>
                            <Phone className="h-4 w-4 hidden sm:block" />
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0 ml-2"
                            aria-label="Close banner"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sticky Emergency Bar - Appears on scroll */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "fixed top-0 left-0 right-0 z-[100]",
                            "bg-gradient-to-r from-red-600 to-orange-500",
                            "shadow-lg border-b border-neutral-300"
                        )}
                    >
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-14">
                                {/* Left side - Message */}
                                <div className="flex items-center gap-2 text-white">
                                    <div className="bg-white/20 p-2 rounded-full hidden sm:block">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold hidden sm:block">
                                            24/7 Emergency Service
                                        </p>
                                        <p className="text-sm sm:text-base font-bold">
                                            Need Help Now?
                                        </p>
                                    </div>
                                </div>

                                {/* Right side - Buttons */}
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <a
                                        href="#"
                                        className={cn(
                                            "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5",
                                            "bg-white text-primary-600 hover:bg-primary-50",
                                            "rounded-full font-bold text-sm sm:text-base",
                                            "transition-all duration-200 hover:scale-105",
                                            "shadow-lg"
                                        )}
                                        onClick={openCalendly}
                                    >
                                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="hidden sm:inline">Schedule Now</span>
                                        <span className="sm:hidden">Book</span>
                                    </a>

                                    <a
                                        href="tel:2404327489"
                                        className={cn(
                                            "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5",
                                            "bg-white text-red-600 hover:bg-red-50",
                                            "rounded-full font-bold text-sm sm:text-base",
                                            "transition-all duration-200 hover:scale-105",
                                            "shadow-lg"
                                        )}
                                        onClick={() => {
                                            // Track phone click in analytics
                                            if (typeof window !== "undefined" && (window as any).gtag) {
                                                (window as any).gtag("event", "phone_click", {
                                                    button_location: "sticky_emergency_bar",
                                                    page: window.location.pathname,
                                                });
                                            }
                                        }}
                                    >
                                        <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="hidden sm:inline">(240) 432-7489</span>
                                        <span className="sm:hidden">Call Now</span>
                                    </a>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white ml-2"
                                    aria-label="Close emergency banner"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
