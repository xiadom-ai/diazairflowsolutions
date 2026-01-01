import { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { ServiceAreaMap } from "@/components/maps/ServiceAreaMap";
import { MapPin, Clock, Shield, Star } from "lucide-react";
import { Statistics } from "@/components/sections/statistics/Statistics";

export const metadata: Metadata = {
  title: "Service Areas - HVAC Services Across Maryland, Virginia & DC",
  description:
    "Diaz Airflow Solutions Inc. serves Bowie, Silver Spring, Rockville, Bethesda, Washington DC, and surrounding areas. Fast response times, 24/7 emergency service available.",
  keywords:
    "HVAC service areas Maryland, AC repair Bowie MD, heating Rockville, HVAC Silver Spring, emergency service DMV",
};

export default function ServiceAreasPage() {
  return (
    <main className="bg-neutral-950 pb-20">
      {/* Hero Section */}
      <Hero
        headline="Areas We Serve"
        subheadline="Providing professional HVAC services across Maryland, Virginia, and Washington DC. Fast response times, experienced technicians, and 24/7 emergency service."
        backgroundImage="https://storage.googleapis.com/diazairflowsolutions/heros/DAFS-01.jpeg"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div
            className="bg-[#201F1E] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="w-14 h-14 bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-400 group-hover:scale-110 transition-transform duration-300 border border-primary-500/30">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">11+ Cities</h3>
            <p className="text-primary-200">Comprehensive coverage across DMV</p>
          </div>

          <div
            className="bg-[#201F1E] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="w-14 h-14 bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-400 group-hover:scale-110 transition-transform duration-300 border border-primary-500/30">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Under 2 Hours</h3>
            <p className="text-primary-200">Emergency response time</p>
          </div>

          <div
            className="bg-[#201F1E] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="w-14 h-14 bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-400 group-hover:scale-110 transition-transform duration-300 border border-primary-500/30">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Licensed & Insured</h3>
            <p className="text-primary-200">Fully certified technicians</p>
          </div>

          <div
            className="bg-[#201F1E] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="w-14 h-14 bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-400 group-hover:scale-110 transition-transform duration-300 border border-primary-500/30">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">4.9/5 Rating</h3>
            <p className="text-primary-200">Based on 487 reviews</p>
          </div>
        </div>

        {/* Interactive Map */}
        <ServiceAreaMap />
      </div>

      {/* Statistics - Full Width */}
      <div className="mt-20">
        <Statistics />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom CTA */}
        <div className="mt-16 bg-primary-700 rounded-2xl p-8 sm:p-12 text-center text-white border border-primary-600">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Schedule Service?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us today for fast, reliable HVAC service in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:2404327489"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-neutral-100 transition-all hover:scale-105 shadow-lg"
            >
              <Clock className="h-5 w-5" />
              Call (240) 432-7489
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              <MapPin className="h-5 w-5" />
              Request Service
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
