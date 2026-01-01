"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WeGuarantee() {
    return (
        <section id="guarantee" className="py-20 bg-primary-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm"
                    >
                        <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
                        <span className="text-xl font-semibold">100% Satisfaction Guarantee</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        We Guarantee Your Comfort
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-100 mb-10 leading-relaxed"
                    >
                        We stand behind our work with a 100% satisfaction guarantee. If you're not completely happy with our service, we'll make it right. Our job isn't done until you're comfortable.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => window.location.href = "/contact"}
                        >
                            Schedule Your Service Now
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
