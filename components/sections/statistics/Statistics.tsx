"use client";

import { motion } from "framer-motion";
import { type LucideIcon, Award, Users, Clock, ShieldCheck, Star, Award as Certificate } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
    value: string;
    label: string;
    icon: LucideIcon;
}

const stats: Stat[] = [
    {
        value: "25+",
        label: "Years of Experience",
        icon: Award,
    },
    {
        value: "10,000+",
        label: "Happy Customers",
        icon: Users,
    },
    {
        value: "24/7",
        label: "Emergency Service",
        icon: Clock,
    },
    {
        value: "100%",
        label: "Satisfaction Guarantee",
        icon: ShieldCheck,
    },
    {
        value: "A+",
        label: "BBB Rating",
        icon: Star,
    },
    {
        value: "50+",
        label: "Certified Technicians",
        icon: Certificate,
    },
];

export function Statistics() {
    return (
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-4"
                    >
                        Trusted by Thousands
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90"
                    >
                        Your comfort is our mission
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className={cn(
                                    "group relative p-6 rounded-2xl text-center",
                                    "bg-white/10 backdrop-blur-md border border-neutral-300",
                                    "hover:bg-white/20 transition-all duration-300"
                                )}
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-lg flex items-center justify-center",
                                            "bg-secondary-600",
                                            "group-hover:scale-110 transition-transform duration-300"
                                        )}
                                    >
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>

                                {/* Value */}
                                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    {stat.value}
                                </p>

                                {/* Label */}
                                <p className="text-sm text-white/80">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
