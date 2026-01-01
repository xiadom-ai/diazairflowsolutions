"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";

const reasons = [
    {
        icon: Clock,
        title: "24/7 Emergency Service",
        description: "We are always available when you need us most, day or night, weekends and holidays."
    },
    {
        icon: ShieldCheck,
        title: "Licensed & Insured",
        description: "Fully licensed and insured for your peace of mind and protection."
    },
    {
        icon: Award,
        title: "Expert Technicians",
        description: "Our team consists of NATE-certified professionals with years of hands-on experience."
    },
    {
        icon: Users,
        title: "Customer Focused",
        description: "Your satisfaction is our top priority. We treat every home like our own."
    }
];

export function WhyChooseUs() {
    return (
        <section id="why-choose-us" className="py-20 bg-neutral-950 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
                    >
                        Why Choose Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-200 max-w-2xl mx-auto"
                    >
                        We deliver superior quality and reliable service that you can trust.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-[#201F1E] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative"
                                style={{
                                    border: '1px solid transparent',
                                    backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box',
                                }}
                            >
                                <div className="w-14 h-14 bg-primary-900/30 rounded-xl flex items-center justify-center mb-6 text-primary-400 group-hover:scale-110 transition-transform duration-300 border border-primary-500/30">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {reason.title}
                                </h3>
                                <p className="text-primary-200">
                                    {reason.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
