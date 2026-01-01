import Image from "next/image";
import { Hero } from "@/components/sections/hero/Hero";
import { Statistics } from "@/components/sections/statistics/Statistics";
import { Certifications } from "@/components/sections/certifications/Certifications";
import { ServiceAreas } from "@/components/sections/service-areas/ServiceAreas";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { aboutMetadata } from "@/lib/metadata";

export const metadata = aboutMetadata;

export default function AboutPage() {
    return (
        <main>
            {/* Hero Section */}
            <Hero
                headline="Your Comfort is Our Mission"
                subheadline="Since 2010, Diaz Airflow Solutions Inc. has been providing top-tier HVAC services to the DMV area. We are built on a foundation of integrity, expertise, and unwavering commitment to customer satisfaction."
                primaryCTA={{
                    text: "Contact Us Today",
                    href: "/contact"
                }}
                backgroundImage="https://storage.googleapis.com/diazairflowsolutions/about-us/hero-1/about-us-team.jpg"
            />

            {/* Story Section */}
            <section className="py-20 bg-neutral-950 transition-colors duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://img.freepik.com/free-photo/close-up-hvac-system-manometers_482257-90544.jpg"
                                alt="HVAC Professional Team"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-lg text-primary-200">
                                <p>
                                    Founded over two decades ago, Diaz Airflow Solutions Inc. began with a simple goal: to provide honest, high-quality heating and cooling services to our neighbors in Maryland.
                                </p>
                                <p>
                                    What started as a small family operation has grown into one of the most trusted HVAC companies in the region. Despite our growth, we've never lost sight of our core values. We treat every home as if it were our own and every customer like family.
                                </p>
                                <p>
                                    Our team of certified technicians undergoes rigorous training to stay ahead of the latest HVAC technologies, ensuring we can handle any system, old or new.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Statistics />
            <Certifications />
            <ServiceAreas />
        </main>
    );
}
