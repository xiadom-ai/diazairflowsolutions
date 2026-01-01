"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Loader2,
  Zap
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { emergencyFormSchema, type EmergencyFormData } from "@/lib/validations";

export default function EmergencyServicePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmergencyFormData>({
    resolver: zodResolver(emergencyFormSchema),
  });

  const onSubmit = async (data: EmergencyFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending emergency request...");

    try {
      const response = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(result.error || "Failed to send request. Please call us directly.");
        return;
      }

      toast.success("Emergency request received! We're dispatching a technician now.", {
        duration: 10000,
      });

      // Track emergency conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          form_type: "emergency",
          urgency_level: data.urgencyLevel,
        });
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Emergency form error:", error);
      toast.error("Please call us immediately at (240) 432-7489", { duration: 10000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 pt-32 pb-20">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 py-6 mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 text-white">
            <AlertTriangle className="h-8 w-8 animate-pulse" />
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">24/7 Emergency HVAC Service</h1>
              <p className="text-sm sm:text-base mt-1">Response time: Under 2 hours</p>
            </div>
            <Zap className="h-8 w-8 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call Now Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-primary-700 rounded-2xl p-8 text-center text-white shadow-2xl border border-primary-600">
            <Phone className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Need Help Right Now?</h2>
            <p className="text-xl mb-6 text-primary-100">Call us immediately for fastest response</p>
            <a
              href="tel:2404327489"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 hover:bg-red-50 rounded-full font-bold text-2xl transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="h-6 w-6" />
              (240) 432-7489
            </a>
            <p className="text-sm mt-4 text-white/80">Available 24 hours a day, 7 days a week</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Emergency Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#201F1E] rounded-2xl p-8 border-2 border-red-500/30 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="text-2xl font-bold text-white">Emergency Request Form</h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
                  <p className="text-primary-100 mb-6">
                    A technician is being dispatched to your location. You'll receive a call within
                    minutes to confirm arrival time.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-200 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-200 mb-2">
                      Phone Number * (We'll call you immediately)
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                      placeholder="(240) 555-0123"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-200 mb-2">
                      Service Address *
                    </label>
                    <input
                      type="text"
                      {...register("address")}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                      placeholder="123 Main St, Bowie, MD 20721"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-200 mb-2">
                      Urgency Level *
                    </label>
                    <select
                      {...register("urgencyLevel")}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                    >
                      <option value="">Select urgency</option>
                      <option value="urgent">Urgent - Need service today</option>
                      <option value="critical">Critical - No heat/AC, unsafe conditions</option>
                    </select>
                    {errors.urgencyLevel && (
                      <p className="mt-1 text-sm text-red-400">{errors.urgencyLevel.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-200 mb-2">
                      Describe the Issue * (Minimum 20 characters)
                    </label>
                    <textarea
                      {...register("issueDescription")}
                      rows={4}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white resize-none"
                      placeholder="Please describe what's happening with your HVAC system..."
                    />
                    {errors.issueDescription && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.issueDescription.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    rightIcon={isSubmitting ? Loader2 : AlertTriangle}
                    className={isSubmitting ? "opacity-75" : ""}
                  >
                    {isSubmitting ? "Sending Emergency Request..." : "Send Emergency Request"}
                  </Button>

                  <p className="text-xs text-primary-300 text-center">
                    By submitting this form, you agree to be contacted by Diaz Airflow Solutions Inc.
                    regarding your emergency service request.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* What to Expect */}
            <div className="bg-[#201F1E] rounded-2xl p-6 border border-neutral-300">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-400" />
                What to Expect
              </h4>
              <ol className="space-y-3 text-primary-200">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Call or submit form - we receive your emergency request</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Immediate response - we call you within 5 minutes</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Technician dispatched - arrives within 2 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-bold">
                    4
                  </span>
                  <span>Diagnosis and repair - get your system working again</span>
                </li>
              </ol>
            </div>

            {/* Common Emergencies */}
            <div className="bg-[#201F1E] rounded-2xl p-6 border border-neutral-300">
              <h4 className="text-xl font-bold text-white mb-4">Common HVAC Emergencies</h4>
              <ul className="space-y-2 text-primary-200 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>No heat in winter (furnace failure)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>No AC in summer (system breakdown)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Gas leak or carbon monoxide smell</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Water leaking from HVAC unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Strange noises or burning smell</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Frozen pipes or AC unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Complete system failure</span>
                </li>
              </ul>
            </div>

            {/* Service Area */}
            <div className="bg-[#201F1E] rounded-2xl p-6 border border-neutral-300">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary-400" />
                Service Area
              </h4>
              <p className="text-primary-200 text-sm mb-3">
                We provide emergency HVAC service throughout:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-primary-200">
                <div>Bowie, MD</div>
                <div>Silver Spring, MD</div>
                <div>Rockville, MD</div>
                <div>Bethesda, MD</div>
                <div>Laurel, MD</div>
                <div>Washington, DC</div>
              </div>
              <p className="text-xs text-primary-300 mt-3">
                Don't see your city? Call us - we may still be able to help!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
