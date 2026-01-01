"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function WhoWeAre() {
    return (
        <section className="py-20 bg-neutral-950 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
                            alt="HVAC Technician"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-lg font-semibold">Serving the DMV Area</p>
                            <p className="text-sm opacity-90">Since 2010</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                            Who We Are!!!!
                        </h2>
                        <p className="text-lg text-primary-200 leading-relaxed">
                            Diaz Airflow Solutions Inc. is a premier HVAC contractor dedicated to providing top-quality heating and cooling services. With over 25 years of experience, we have built a reputation for excellence, integrity, and reliability.
                        </p>
                        <p className="text-lg text-primary-200 leading-relaxed">
                            Our team of certified technicians is committed to ensuring your indoor comfort year-round. Whether you need emergency repairs, a new system installation, or routine maintenance, we have the expertise to get the job done right the first time.
                        </p>
                        <Button size="lg" onClick={() => window.location.href = "/about"}>
                            Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
