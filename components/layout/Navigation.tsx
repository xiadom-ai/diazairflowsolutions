"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data";

interface NavigationProps {
    cta?: {
        text: string;
        href: string;
    };
}

export function Navigation({ cta }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Service Areas", href: "/service-areas" },
        { label: "Gallery", href: "/gallery" },
        { label: "Emergency", href: "/emergency-service", highlight: true },
        { label: "Contact Us", href: "/contact" },
    ];

    return (
        <>
            <nav
                className="fixed top-12 left-0 right-0 z-50 bg-neutral-50/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 transition-all duration-300"
                style={{ WebkitBackdropFilter: 'blur(20px) saturate(150%)' }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo-diazairflowsolutions.png"
                                alt="Diaz Airflow Solutions Inc."
                                width={180}
                                height={50}
                                priority
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden xl:flex items-center gap-6">
                            <Link href="/" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                                Home
                            </Link>

                            <Link href="/about" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                                About Us
                            </Link>

                            {/* Services Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                            >
                                <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-primary-400 transition-colors py-2">
                                    Services <ChevronDown className="h-4 w-4" />
                                </button>

                                <AnimatePresence>
                                    {isServicesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 w-72 bg-neutral-100/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden py-2"
                                        >
                                            <div className="flex flex-col">
                                                {services.map((service) => {
                                                    const Icon = service.icon;
                                                    return (
                                                        <Link
                                                            key={service.id}
                                                            href={service.href}
                                                            className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-800 hover:bg-white/5 hover:text-white transition-all group"
                                                        >
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-200 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                                                                <Icon className="h-4 w-4" />
                                                            </div>
                                                            <span className="font-medium">{service.title}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="/service-areas" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                                Service Areas
                            </Link>

                            <Link href="/gallery" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                                Gallery
                            </Link>

                            <Link href="/#testimonials" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                                Reviews
                            </Link>

                            <Link href="/book-appointment" className="text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent hover:from-primary-400 hover:to-secondary-400 transition-all">
                                Book Appointment
                            </Link>

                            <Link href="/emergency-service" className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
                                Emergency 24/7
                            </Link>

                            <Link href="/contact" className="text-sm font-medium text-white hover:text-primary-400 transition-colors">
                                Contact Us
                            </Link>
                        </div>

                        {/* Right Side Icons */}
                        <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
                            <a href="tel:2404327489" className="p-2 text-white hover:text-primary-400 hover:bg-white/10 rounded-full transition-all" aria-label="Call Us">
                                <Phone className="h-5 w-5" />
                            </a>
                            <a href="mailto:info@diazairflowsolutions.com" className="p-2 text-white hover:text-primary-400 hover:bg-white/10 rounded-full transition-all" aria-label="Email Us">
                                <Mail className="h-5 w-5" />
                            </a>
                            <a href="/contact" className="p-2 text-white hover:text-primary-400 hover:bg-white/10 rounded-full transition-all" aria-label="Find Us">
                                <MapPin className="h-5 w-5" />
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="xl:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-neutral-100/98 backdrop-blur-md shadow-xl xl:hidden border-l border-white/10"
                    >
                        <div className="flex flex-col h-full pt-24 px-6 overflow-y-auto">
                            <Link
                                href="/"
                                className="py-3 text-lg font-medium text-neutral-800 hover:text-primary-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="py-3 text-lg font-medium text-neutral-800 hover:text-primary-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>

                            <div className="py-3 border-b border-white/10">
                                <div className="text-lg font-medium text-neutral-800 mb-4">Services</div>
                                <div className="grid gap-3">
                                    {services.map((service) => {
                                        const Icon = service.icon;
                                        return (
                                            <Link
                                                key={service.id}
                                                href={service.href}
                                                className="flex items-center gap-3 py-2 text-neutral-800 hover:text-primary-400 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-200 text-neutral-800">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <span className="font-medium">{service.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <Link
                                href="/service-areas"
                                className="py-3 text-lg font-medium text-neutral-800 hover:text-primary-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Service Areas
                            </Link>
                            <Link
                                href="/gallery"
                                className="py-3 text-lg font-medium text-neutral-800 hover:text-primary-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Gallery
                            </Link>
                            <Link
                                href="/#testimonials"
                                className="py-3 text-lg font-medium text-neutral-800 hover:text-primary-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Reviews
                            </Link>
                            <Link
                                href="/book-appointment"
                                className="py-3 text-lg font-medium bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                📅 Book Appointment
                            </Link>
                            <Link
                                href="/emergency-service"
                                className="py-3 text-lg font-medium text-red-500 hover:text-red-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                🚨 Emergency 24/7
                            </Link>
                            <Link
                                href="/contact"
                                className="py-3 text-lg font-medium text-neutral-800 hover:text-primary-400 border-b border-white/10"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>

                            <div className="flex gap-4 mt-8 justify-center">
                                <a href="tel:2404327489" className="p-3 bg-neutral-200 rounded-full text-white hover:bg-primary-600 transition-colors">
                                    <Phone className="h-5 w-5" />
                                </a>
                                <a href="mailto:info@diazairflowsolutions.com" className="p-3 bg-neutral-200 rounded-full text-white hover:bg-primary-600 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </a>
                                <a href="/contact" className="p-3 bg-neutral-200 rounded-full text-white hover:bg-primary-600 transition-colors">
                                    <MapPin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
