import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/calendly/CalendlyEmbed";
import { Hero } from "@/components/sections/hero/Hero";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { Clock, CheckCircle, Calendar as CalendarIcon, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Appointment - Easy Online Scheduling | Diaz Airflow Solutions Inc.",
  description:
    "Schedule your HVAC service appointment online with Diaz Airflow Solutions Inc.. Choose a convenient time for maintenance, repair, or installation. Fast, easy, and secure booking.",
  keywords: [
    "book HVAC appointment",
    "schedule HVAC service",
    "online booking",
    "HVAC appointment Maryland",
    "air conditioning appointment",
    "heating repair booking",
  ],
  openGraph: {
    title: "Book Your HVAC Appointment Online | Diaz Airflow Solutions Inc.",
    description:
      "Schedule your HVAC service in minutes. Choose your preferred date and time for maintenance, repair, or installation services.",
    type: "website",
  },
};

const benefits = [
  {
    icon: Clock,
    title: "Choose Your Time",
    description: "Select a date and time that works best for your schedule",
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmation",
    description: "Receive immediate email confirmation with all appointment details",
  },
  {
    icon: CalendarIcon,
    title: "Easy Rescheduling",
    description: "Need to change your appointment? Reschedule anytime with one click",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your information is protected with enterprise-grade security",
  },
];

export default function BookAppointmentPage() {
  return (
    <main className="bg-neutral-950">
      {/* Hero Section */}
      <Hero
        headline="Schedule Your HVAC Service"
        subheadline="Book your appointment online in minutes. Choose a convenient time for maintenance, repair, or installation services. Our certified technicians are ready to help."
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80"
        primaryCTA={{
          text: "Book Below",
          href: "#booking"
        }}
      />

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative"
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
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-200">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section id="booking" className="py-8 px-4 pb-16">
        <div className="container mx-auto max-w-5xl">
          <div
            className="rounded-2xl shadow-xl p-4 md:p-8"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">
                Select Your Preferred Time
              </h2>
              <p className="text-primary-200 max-w-2xl mx-auto">
                Choose from our available time slots below. You'll receive instant
                confirmation via email with all the details.
              </p>
            </div>

            {/* Calendly Inline Widget */}
            <CalendlyEmbed
              utm={{
                utmSource: "website",
                utmMedium: "booking_page",
                utmCampaign: "online_scheduling",
              }}
            />
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 px-4 bg-red-900/40 text-white border-y border-red-500/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Emergency Service?
          </h2>
          <p className="text-lg mb-6 text-primary-100">
            For urgent HVAC issues requiring immediate attention, call us now for
            24/7 emergency service.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:2404327489"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-colors shadow-lg"
            >
              📞 Call (240) 432-7489
            </a>
            <a
              href="/emergency-service"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Emergency Request Form
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <h3 className="font-bold text-lg mb-2 text-white">
                How far in advance should I book?
              </h3>
              <p className="text-primary-200">
                We recommend booking at least 2-3 days in advance for routine
                maintenance. However, we often have same-day or next-day availability
                for urgent repairs.
              </p>
            </div>
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <h3 className="font-bold text-lg mb-2 text-white">
                What if I need to reschedule?
              </h3>
              <p className="text-primary-200">
                No problem! You can reschedule or cancel your appointment anytime
                using the link in your confirmation email. We just ask for at least
                24 hours notice when possible.
              </p>
            </div>
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <h3 className="font-bold text-lg mb-2 text-white">
                Do you charge for estimates?
              </h3>
              <p className="text-primary-200">
                We provide free estimates for new installations and major repairs.
                For diagnostic service calls, there is a service fee that is waived
                if you proceed with the recommended repairs.
              </p>
            </div>
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <h3 className="font-bold text-lg mb-2 text-white">
                What should I prepare before the appointment?
              </h3>
              <p className="text-primary-200">
                Please ensure our technician has clear access to your HVAC system,
                including the outdoor unit. If you have specific concerns or issues,
                note them down to share with the technician.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-4 bg-neutral-950">
        <div className="container mx-auto max-w-4xl">
          <div
            className="rounded-2xl p-8 shadow-lg"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">
                Why Choose Diaz Airflow Solutions Inc.?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary-500 mb-2">25+</div>
                  <div className="text-primary-200">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary-500 mb-2">5,000+</div>
                  <div className="text-primary-200">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
                  <div className="text-primary-200">Emergency Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
