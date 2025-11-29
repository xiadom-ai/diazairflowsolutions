# 🎨 Modern Component Implementation Examples

Complete code examples for key components following the Blueprint v2.0 standards with modern, responsive, and accessible implementations.

---

## 🔘 Button Component with All Variants

```tsx
// components/ui/Button.tsx
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles - accessibility and animation
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600 text-white",
          "hover:bg-primary-700 hover:shadow-lg hover:scale-105",
          "active:bg-primary-800 active:scale-95",
          "focus-visible:ring-primary-500",
        ],
        secondary: [
          "bg-secondary-100 text-secondary-900",
          "hover:bg-secondary-200 hover:shadow-md",
          "active:bg-secondary-300",
          "focus-visible:ring-secondary-500",
        ],
        ghost: [
          "text-neutral-700",
          "hover:bg-neutral-100 hover:text-neutral-900",
          "active:bg-neutral-200",
          "focus-visible:ring-neutral-500",
        ],
        gradient: [
          "bg-gradient-to-r from-primary-500 to-secondary-500 text-white",
          "hover:shadow-xl hover:scale-105",
          "active:scale-95",
          "focus-visible:ring-primary-500",
          "hover:from-primary-600 hover:to-secondary-600",
        ],
        glass: [
          "bg-white/10 backdrop-blur-md border border-white/20 text-white",
          "hover:bg-white/20 hover:border-white/30",
          "active:bg-white/30",
          "focus-visible:ring-white/50",
        ],
        danger: [
          "bg-red-600 text-white",
          "hover:bg-red-700 hover:shadow-lg",
          "active:bg-red-800",
          "focus-visible:ring-red-500",
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-10 px-4 text-base rounded-lg",
        lg: "h-11 px-6 text-lg rounded-lg",
        xl: "h-12 px-8 text-xl rounded-xl",
        icon: "h-10 w-10 rounded-lg p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  "aria-label"?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      children,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const isIconOnly = size === "icon";
    
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        aria-label={ariaLabel || (isIconOnly && typeof children === "string" ? children : undefined)}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className="h-4 w-4" aria-hidden="true" />}
            {!isIconOnly && children}
            {RightIcon && <RightIcon className="h-4 w-4" aria-hidden="true" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## 🎯 Modern Hero Section Variants

### Hero with Gradient and Glassmorphism

```tsx
// components/sections/hero/HeroGradient.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroGradientProps {
  headline: string;
  subheadline: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  rating?: {
    score: number;
    reviews: number;
  };
  backgroundImage?: string;
}

export function HeroGradient({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  rating,
  backgroundImage,
}: HeroGradientProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-secondary-900/90" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-20 animate-float-delayed" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Trust signals */}
          {rating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(rating.score)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-white/90 text-sm">
                {rating.score} ({rating.reviews.toLocaleString()} reviews)
              </span>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {primaryCTA && (
              <Button
                size="lg"
                variant="glass"
                rightIcon={ArrowRight}
                className="group"
                onClick={() => window.location.href = primaryCTA.href}
              >
                {primaryCTA.text}
              </Button>
            )}
            {secondaryCTA && (
              <Button
                size="lg"
                variant="ghost"
                leftIcon={Play}
                className="text-white hover:bg-white/10"
                onClick={() => window.location.href = secondaryCTA.href}
              >
                {secondaryCTA.text}
              </Button>
            )}
          </motion.div>

          {/* Glassmorphic info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
          >
            {[
              { label: "Response Time", value: "< 2 Hours" },
              { label: "Success Rate", value: "99.8%" },
              { label: "Happy Clients", value: "10,000+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4"
              >
                <p className="text-white/70 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

---

## 📊 Bento Grid Feature Section

```tsx
// components/sections/features/BentoGrid.tsx
"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  gradient?: string;
}

interface BentoGridProps {
  features: BentoFeature[];
}

export function BentoGrid({ features }: BentoGridProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Comprehensive features designed to help you succeed
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={cn(
                  "group relative p-6 rounded-2xl",
                  "bg-white border border-neutral-200",
                  "hover:shadow-xl transition-all duration-300",
                  "overflow-hidden cursor-pointer",
                  isLarge && "md:col-span-2 md:row-span-2",
                  feature.className
                )}
              >
                {/* Background gradient on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-500",
                    feature.gradient || "bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
                  )}
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                      "bg-gradient-to-br from-primary-500 to-secondary-500",
                      "group-hover:scale-110 transition-transform duration-300"
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className={cn(
                    "font-semibold text-neutral-900 mb-2",
                    isLarge ? "text-2xl" : "text-lg"
                  )}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={cn(
                    "text-neutral-600 leading-relaxed",
                    isLarge ? "text-base" : "text-sm"
                  )}>
                    {feature.description}
                  </p>
                  
                  {/* Decorative element for large cards */}
                  {isLarge && (
                    <div className="mt-auto pt-4">
                      <div className="h-2 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 💬 Modern Testimonial Carousel

```tsx
// components/sections/testimonials/TestimonialCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  date: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-600"
          >
            Real stories from real customers
          </motion.p>
        </div>

        {/* Carousel */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            {/* Quote decoration */}
            <Quote className="absolute -top-8 -left-4 h-16 w-16 text-primary-200 opacity-50" />

            {/* Testimonial content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < currentTestimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-neutral-300"
                      )}
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {currentTestimonial.avatar ? (
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.author}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl">
                      {currentTestimonial.author[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {currentTestimonial.author}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
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
                        ? "w-8 bg-primary-600"
                        : "bg-neutral-300 hover:bg-neutral-400"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 📱 Responsive Navigation with Mobile Menu

```tsx
// components/layout/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavigationProps {
  items: NavItem[];
  logo: string;
  cta?: {
    text: string;
    href: string;
  };
}

export function Navigation({ items, logo, cta }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className={cn(
                "text-xl font-bold transition-colors",
                isScrolled ? "text-neutral-900" : "text-white"
              )}>
                {logo}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {items.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                          isScrolled
                            ? "text-neutral-700 hover:text-primary-600"
                            : "text-white/90 hover:text-white"
                        )}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                            onMouseEnter={() => setOpenDropdown(item.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors",
                        isScrolled
                          ? "text-neutral-700 hover:text-primary-600"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              {cta && (
                <Button
                  variant={isScrolled ? "primary" : "glass"}
                  size="sm"
                  onClick={() => window.location.href = cta.href}
                >
                  {cta.text}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-neutral-700 hover:bg-neutral-100"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
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
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-40 lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              {/* Mobile Nav Items */}
              <div className="flex-1 space-y-4">
                {items.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50 rounded-lg">
                          {item.label}
                          <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="mt-2 ml-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              {cta && (
                <Button
                  fullWidth
                  size="lg"
                  onClick={() => {
                    window.location.href = cta.href;
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {cta.text}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 💰 Pricing Cards with Comparison

```tsx
// components/sections/pricing/PricingCards.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  features: PricingFeature[];
  recommended?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

interface PricingCardsProps {
  plans: PricingPlan[];
}

export function PricingCards({ plans }: PricingCardsProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8"
          >
            Choose the perfect plan for your needs. Always flexible to scale.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-4 p-1 bg-neutral-100 rounded-full"
          >
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billingPeriod === "monthly"
                  ? "bg-white text-neutral-900 shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billingPeriod === "yearly"
                  ? "bg-white text-neutral-900 shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              Yearly
              <span className="ml-2 text-xs text-green-600 font-bold">Save 20%</span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "relative rounded-2xl p-8",
                "bg-white border-2 transition-all duration-300",
                plan.recommended
                  ? "border-primary-500 shadow-xl scale-105"
                  : "border-neutral-200 hover:border-neutral-300 hover:shadow-lg"
              )}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-semibold text-neutral-600">
                    {plan.currency}
                  </span>
                  <span className="text-5xl font-bold text-neutral-900">
                    {billingPeriod === "monthly"
                      ? plan.price.monthly
                      : Math.floor(plan.price.yearly / 12)}
                  </span>
                  <span className="text-neutral-600">/month</span>
                </div>
                
                {billingPeriod === "yearly" && (
                  <p className="text-sm text-neutral-500 mt-2">
                    Billed annually ({plan.currency}{plan.price.yearly})
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included ? "text-neutral-700" : "text-neutral-400"
                      )}
                    >
                      {feature.name}
                    </span>
                    {feature.tooltip && (
                      <div className="group relative">
                        <Info className="h-4 w-4 text-neutral-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                          <div className="bg-neutral-900 text-white text-xs rounded-lg px-3 py-2 w-48">
                            {feature.tooltip}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                              <div className="border-4 border-transparent border-t-neutral-900" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                fullWidth
                variant={plan.recommended ? "primary" : "secondary"}
                size="lg"
                onClick={() => window.location.href = plan.cta.href}
              >
                {plan.cta.text}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600">
            All plans include 30-day money-back guarantee • No setup fees • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🎨 Tailwind Configuration for Modern Design

```javascript
// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.indigo,
        neutral: colors.gray,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
```

---

## 🔧 Utility Functions

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

*These implementation examples demonstrate modern, accessible, and responsive component patterns that follow the Blueprint v2.0 standards. Each component is production-ready with proper TypeScript typing, accessibility features, and responsive design.*