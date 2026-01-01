"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-200 max-w-2xl mx-auto"
                    >
                        Common questions about our HVAC services
                    </motion.p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * index }}
                            className="bg-white dark:bg-[#201F1E] rounded-xl overflow-hidden border border-neutral-200 shadow-lg hover:shadow-xl transition-all"
                            style={{
                                borderColor: 'transparent',
                                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box',
                            }}
                        >
                            <div className="dark:bg-[#201F1E] dark:rounded-xl dark:overflow-hidden"
                                style={{
                                    border: '1px solid transparent',
                                    backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box',
                                }}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 dark:hover:bg-black/30 transition-colors"
                                >
                                    <span className="font-semibold text-lg text-neutral-900 dark:text-white pr-8">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 text-neutral-500 dark:text-primary-400 transition-transform duration-300",
                                            openIndex === index ? "transform rotate-180" : ""
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-neutral-600 dark:text-primary-100 leading-relaxed border-t border-neutral-100 dark:border-white/5 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
