"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Testimonial {
    id: string;
    author: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    profile_photo_url?: string;
}



export function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [placeUrl, setPlaceUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("/api/reviews");
                if (!response.ok) throw new Error("Failed to fetch reviews");
                const data = await response.json();

                if (data.reviews && data.reviews.length > 0) {
                    // Limit to 6 reviews as requested
                    setTestimonials(data.reviews.slice(0, 6));
                    setPlaceUrl(data.placeUrl);
                } else {
                    setTestimonials([]);
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setTestimonials([]);
                setError("Could not load latest reviews.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (isPaused || testimonials.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused, testimonials.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    if (isLoading) {
        return (
            <section className="py-20 bg-neutral-950 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </section>
        );
    }

    // We no longer early-return for empty testimonials to ensure branding and buttons are always visible.

    return (
        <section id="testimonials" className="py-20 bg-primary-900 text-white relative overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-4"
                    >
                        What Our Clients Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-100 flex items-center justify-center gap-2"
                    >
                        Real stories from real customers on
                        <span className="flex items-center gap-1 font-semibold text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </span>
                    </motion.p>
                </div>

                {/* Carousel */}
                <div
                    className="max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative">
                        {testimonials.length > 0 ? (
                            <>
                                {/* Quote decoration */}
                                <Quote className="absolute -top-8 -left-4 h-16 w-16 text-primary-900 opacity-30" />

                                {/* Testimonial content */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-[#201F1E] rounded-2xl shadow-xl p-8 md:p-12 relative"
                                        style={{
                                            border: '1px solid transparent',
                                            backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                            backgroundOrigin: 'border-box',
                                            backgroundClip: 'padding-box, border-box',
                                        }}
                                    >
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "h-5 w-5",
                                                        i < testimonials[currentIndex].rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-neutral-700"
                                                    )}
                                                />
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <blockquote className="text-lg md:text-xl text-primary-100 leading-relaxed mb-8">
                                            &quot;{testimonials[currentIndex].content}&quot;
                                        </blockquote>

                                        {/* Author */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden relative border border-white/10">
                                                {testimonials[currentIndex].profile_photo_url ? (
                                                    <Image
                                                        src={testimonials[currentIndex].profile_photo_url}
                                                        alt={testimonials[currentIndex].author}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    testimonials[currentIndex].author[0]
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {testimonials[currentIndex].author}
                                                </p>
                                                <p className="text-sm text-primary-300">
                                                    {testimonials[currentIndex].role} {testimonials[currentIndex].company && `• ${testimonials[currentIndex].company}`}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation buttons */}
                                {testimonials.length > 1 && (
                                    <div className="flex items-center justify-between mt-8">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={goToPrevious}
                                            aria-label="Previous testimonial"
                                            className="text-primary-300 hover:text-white hover:bg-neutral-800"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>

                                        {/* Dots indicator */}
                                        <div className="flex gap-2">
                                            {testimonials.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentIndex(index)}
                                                    aria-label={`Go to testimonial ${index + 1}`}
                                                    className={cn(
                                                        "h-2 w-2 rounded-full transition-all duration-300",
                                                        index === currentIndex
                                                            ? "w-8 bg-primary-500"
                                                            : "bg-primary-800 hover:bg-primary-600"
                                                    )}
                                                />
                                            ))}
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={goToNext}
                                            aria-label="Next testimonial"
                                            className="text-primary-300 hover:text-white hover:bg-neutral-800"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-10 bg-neutral-900/50 rounded-2xl border border-white/5">
                                <p className="text-primary-300">No reviews found yet. Be the first to tell us about your experience!</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
                    {placeUrl && (
                        <a
                            href={placeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2")}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                            </svg>
                            See More Reviews <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                    <a
                        href={process.env.NEXT_PUBLIC_GOOGLE_WRITE_REVIEW_URL || (placeUrl ? `${placeUrl}/review` : "#")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "w-full sm:w-auto min-w-[200px] shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2")}
                    >
                        Leave a Review <Quote className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}

function ExternalLink({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}
