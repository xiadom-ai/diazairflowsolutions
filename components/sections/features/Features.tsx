"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";

export function Features() {
    return (
        <section className="py-20 bg-neutral-950 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-200 max-w-2xl mx-auto"
                    >
                        Comprehensive HVAC solutions for your home or business
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="group bg-[#201F1E] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
                                style={{
                                    border: '1px solid transparent',
                                    backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box',
                                }}
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary-500 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-primary-200 mb-6 line-clamp-3">
                                        {feature.short_description}
                                    </p>

                                    <Link
                                        href={feature.href}
                                        className="inline-flex items-center text-primary-400 font-semibold hover:text-secondary-500 transition-colors"
                                    >
                                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
