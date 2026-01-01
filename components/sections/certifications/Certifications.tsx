"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { Award, CheckCircle } from "lucide-react";

export function Certifications() {
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
                        Certified Excellence
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-200 max-w-2xl mx-auto"
                    >
                        We maintain the highest standards in the industry through continuous training and certification.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-start gap-4 p-6 bg-[#201F1E] rounded-xl transition-all group relative"
                            style={{
                                border: '1px solid transparent',
                                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box',
                            }}
                        >
                            <div className="p-3 bg-primary-900/30 rounded-lg group-hover:bg-primary-900/50 transition-colors">
                                <Award className="h-6 w-6 text-primary-400 group-hover:text-secondary-500 transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2">
                                    {cert.name}
                                </h3>
                                <p className="text-sm text-primary-200">
                                    {cert.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
