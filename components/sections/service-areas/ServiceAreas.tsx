"use client";

import { motion } from "framer-motion";
import { serviceAreas } from "@/lib/data";
import { MapPin } from "lucide-react";

export function ServiceAreas() {
    return (
        <section className="py-20 bg-neutral-950 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    >
                        Areas We Serve
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-200 max-w-2xl mx-auto"
                    >
                        Proudly serving homeowners and businesses throughout Maryland, DC, and Northern Virginia.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {serviceAreas.map((area, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * index }}
                            className="flex items-center gap-2 p-4 bg-[#201F1E] rounded-lg shadow-sm hover:shadow-md transition-all group relative"
                            style={{
                                border: '1px solid transparent',
                                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box',
                            }}
                        >
                            <MapPin className="h-5 w-5 text-secondary-500 flex-shrink-0 group-hover:text-secondary-400 transition-all" />
                            <span className="font-medium text-primary-100">
                                {area}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
