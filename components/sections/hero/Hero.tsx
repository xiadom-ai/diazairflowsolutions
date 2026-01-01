"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroProps {
    headline: string;
    subheadline: string;
    primaryCTA?: {
        text: string;
        href: string;
    };
    secondaryCTA?: {
        text: string;
        href: string;
    };
    backgroundImage?: string;
}

export function Hero({
    headline,
    subheadline,
    primaryCTA,
    secondaryCTA,
    backgroundImage,
}: HeroProps) {
    return (
        <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
            {/* Header Spacer - Exactly offsets the 128px fixed header (Emergency Banner + Nav) */}
            <div className="h-28 sm:h-32 w-full flex-shrink-0" />

            {/* Content Area - Centers content in the remaining viewport height */}
            <div className="flex-1 flex items-center py-12 lg:py-20 relative z-10">
                {/* Dark background */}
                <div className="absolute inset-0 z-0 bg-neutral-950" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content - Left Side */}
                        <div className="max-w-2xl">
                            {/* Trust signals */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full backdrop-blur-sm"
                            >
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <span className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
                                    100% Satisfaction Guarantee
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight gradient-text"
                            >
                                {headline}
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
                            >
                                {subheadline}
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                {primaryCTA && (
                                    <Button
                                        size="lg"
                                        variant="primary"
                                        rightIcon={ArrowRight}
                                        className="group"
                                        onClick={() => (window.location.href = primaryCTA.href)}
                                    >
                                        {primaryCTA.text}
                                    </Button>
                                )}
                                {secondaryCTA && (
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={() => (window.location.href = secondaryCTA.href)}
                                    >
                                        {secondaryCTA.text}
                                    </Button>
                                )}
                            </motion.div>

                            {/* Glassmorphic info cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
                            >
                                {[
                                    { label: "Response Time", value: "< 2 Hours" },
                                    { label: "Experience", value: "20+ Years" },
                                    { label: "Service Area", value: "MD, VA, DC" },
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-md border border-neutral-300 rounded-lg p-4"
                                    >
                                        <p className="text-white/60 text-sm">{stat.label}</p>
                                        <p className="text-white text-2xl font-bold">{stat.value}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Image - Right Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative h-[600px] hidden lg:block"
                        >
                            {backgroundImage && (
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-300">
                                    <Image
                                        src={backgroundImage}
                                        alt="HVAC Professional"
                                        fill
                                        className="object-cover"
                                        priority
                                        quality={90}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            )}

                            {/* Floating elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl"
                            />
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
