import { services } from "@/lib/data";
import { Hero } from "@/components/sections/hero/Hero";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Check, ArrowLeft, Phone, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = services.find((s) => s.href === `/services/${slug}`);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.title} | Diaz Airflow Solutions Inc.`,
        description: service.short_description,
    };
}

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.href.split("/").pop(),
    }));
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = services.find((s) => s.href === `/services/${slug}`);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950">
            {/* Hero Section */}
            <Hero
                headline={service.title}
                subheadline={service.short_description}
                primaryCTA={{
                    text: "Schedule Service",
                    href: "/contact"
                }}
                secondaryCTA={{
                    text: "Call Now",
                    href: "tel:2404327489"
                }}
                backgroundImage={service.image}
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                                About This Service
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-primary-200 leading-relaxed">
                                {service.full_description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                                Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-[#201F1E] rounded-xl"
                                    >
                                        <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-neutral-700 dark:text-primary-200 font-medium">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                                <Calendar className="mr-2 h-5 w-5" />
                                Schedule Service
                            </Link>
                            <a href="tel:2404327489" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                                <Phone className="mr-2 h-5 w-5" />
                                Call (240) 432-7489
                            </a>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Service Details Card */}
                        <div className="bg-white dark:bg-[#201F1E] p-6 rounded-2xl border border-neutral-200 dark:border-primary-600/30 shadow-sm">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                                Service Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-neutral-100 dark:border-white/5">
                                    <span className="text-neutral-600 dark:text-primary-200">Price Range</span>
                                    <span className="font-semibold text-neutral-900 dark:text-white">{service.price_range}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-neutral-100 dark:border-white/5">
                                    <span className="text-neutral-600 dark:text-primary-200">Duration</span>
                                    <span className="font-semibold text-neutral-900 dark:text-white">{service.duration}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-neutral-100 dark:border-white/5">
                                    <span className="text-neutral-600 dark:text-primary-200">Warranty</span>
                                    <span className="font-semibold text-neutral-900 dark:text-white">Available</span>
                                </div>
                            </div>
                        </div>

                        {/* Other Services */}
                        <div className="bg-neutral-50 dark:bg-[#201F1E] p-6 rounded-2xl border border-transparent dark:border-primary-600/30">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                                Other Services
                            </h3>
                            <div className="space-y-3">
                                {services
                                    .filter((s) => s.id !== service.id)
                                    .map((s) => {
                                        const ServiceIcon = s.icon;
                                        return (
                                            <Link
                                                key={s.id}
                                                href={s.href}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-neutral-600 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 group"
                                            >
                                                <ServiceIcon className="h-4 w-4 text-primary-500 group-hover:text-primary-400 transition-colors" />
                                                <span className="font-medium">
                                                    {s.title}
                                                </span>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
