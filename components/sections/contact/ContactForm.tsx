"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        // Show loading toast
        const loadingToast = toast.loading("Sending your message...");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            if (!response.ok) {
                if (response.status === 429) {
                    toast.error("Too many requests. Please wait a moment and try again.");
                } else {
                    toast.error(result.error || "Failed to send message. Please try again.");
                }
                return;
            }

            // Success!
            toast.success(
                "Thank you! We've received your message and will respond within 2 hours.",
                { duration: 7000 }
            );

            // Track conversion with Google Analytics
            if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "form_submit", {
                    form_type: "contact",
                    service_requested: data.service,
                });
            }

            // Reset form
            reset();

        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("Form submission error:", error);
            toast.error(
                "An unexpected error occurred. Please try calling us at (240) 432-7489",
                { duration: 8000 }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-neutral-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-4"
                    >
                        Get In Touch
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-200"
                    >
                        Ready to schedule service? Contact us today!
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#201F1E] rounded-2xl shadow-xl p-8 relative"
                        style={{
                            border: '1px solid transparent',
                            backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-primary-200 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors hover:border-white/20"
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-primary-200 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors hover:border-white/20"
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-primary-200 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register("phone")}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-neutral-400 transition-colors hover:border-white/20"
                                    placeholder="(240) 432-7489"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-primary-200 mb-2">
                                    Service Needed *
                                </label>
                                <select
                                    id="service"
                                    {...register("service")}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-colors hover:border-white/20"
                                >
                                    <option value="">Select a service</option>
                                    <option value="AC Installation">AC Installation</option>
                                    <option value="AC Repair">AC Repair</option>
                                    <option value="Heating Installation">Heating Installation</option>
                                    <option value="Heating Repair">Heating Repair</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Air Quality">Air Quality</option>
                                    <option value="Emergency Service">Emergency Service</option>
                                </select>
                                {errors.service && (
                                    <p className="mt-1 text-sm text-red-400">{errors.service.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-primary-200 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    {...register("message")}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-neutral-950 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-neutral-400 resize-none transition-colors hover:border-white/20"
                                    placeholder="Tell us about your HVAC needs..."
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                variant="gradient"
                                size="lg"
                                fullWidth
                                disabled={isSubmitting}
                                rightIcon={isSubmitting ? Loader2 : Send}
                                className={isSubmitting ? "opacity-75" : ""}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-[#201F1E] text-primary-300">or</span>
                                </div>
                            </div>

                            <CalendlyPopupButton
                                text="Schedule Appointment Online"
                                variant="secondary"
                                size="lg"
                            />
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <a href="tel:2404327489" className="hover:underline">
                                            (240) 432-7489
                                        </a>
                                        <p className="text-sm mt-1 text-white/80">24/7 Emergency Service</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <a href="mailto:info@diazairflowsolutions.com" className="hover:underline break-all">
                                            info@diazairflowsolutions.com
                                        </a>
                                        <p className="text-sm mt-1 text-white/80">Response within 2 hours</p>
                                    </div>
                                </div>

                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=13133+Beaver+Terrace+Rockville+MD+20853"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 group hover:opacity-90 transition-opacity"
                                    aria-label="View our location on Google Maps"
                                >
                                    <MapPin className="h-6 w-6 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <p className="font-semibold">Service Area</p>
                                        <p>Maryland, Virginia, Washington DC</p>
                                        <p className="text-sm mt-1 text-white/80 group-hover:underline">
                                            Based in Rockville, MD
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-[#201F1E] rounded-2xl shadow-xl p-8 relative"
                            style={{
                                border: '1px solid transparent',
                                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box',
                            }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
                            <div className="space-y-2 text-primary-200">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="font-semibold text-white">7:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-semibold text-white">8:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-semibold text-white">Emergency Only</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-sm text-secondary-500 font-semibold">
                                        ⚡ 24/7 Emergency Service Available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
