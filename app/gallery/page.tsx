import { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { Camera, Star, Award, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Gallery - Our Work in Maryland, VA & DC | Diaz Airflow Solutions Inc.",
  description:
    "Explore our gallery of HVAC projects across the DMV area. From residential installations to complex commercial systems, see the Diaz Airflow Solutions Inc. quality difference.",
  keywords:
    "HVAC gallery, AC installation photos, heating system portfolio, ductwork projects, Maryland HVAC contractor",
};

export default function GalleryPage() {
  return (
    <main className="bg-neutral-950 pb-20">
      {/* Hero Section */}
      <Hero
        headline="Project Gallery"
        subheadline="Explore our portfolio of successfully completed HVAC projects. From residential installations to complex commercial systems, we deliver quality workmanship every time."
        backgroundImage="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=80"
        primaryCTA={{
          text: "Get Free Estimate",
          href: "/contact"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          <div
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-3xl font-bold text-white mb-1">10,000+</div>
            <div className="text-sm text-primary-200">Projects Completed</div>
          </div>
          <div
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
            <div className="text-sm text-primary-200">Customer Rating</div>
          </div>
          <div
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-3xl font-bold text-white mb-1">25+</div>
            <div className="text-sm text-primary-200">Years Experience</div>
          </div>
          <div
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-primary-200">Satisfaction Rate</div>
          </div>
        </div>

        {/* Gallery Component */}
        <ProjectGallery />

        {/* Our Commitment */}
        <div
          className="mt-20 rounded-2xl p-8 sm:p-12 shadow-lg"
          style={{
            border: '1px solid transparent',
            backgroundImage: 'linear-gradient(#201F1E, #201F1E), linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(255, 140, 75, 0.3))',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          <div className="max-w-3xl mx-auto text-center mb-8">
            <Award className="h-12 w-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Commitment to Quality</h2>
            <p className="text-primary-200 text-lg">
              Every project in our gallery represents our commitment to excellence and customer
              satisfaction. We take pride in our work and stand behind it with comprehensive
              warranties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Quality Materials</h3>
              <p className="text-sm text-primary-200">
                Energy Star certified equipment from leading manufacturers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Certified Technicians</h3>
              <p className="text-sm text-primary-200">
                NATE certified, EPA licensed professionals
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="font-bold text-white mb-2">10-Year Warranty</h3>
              <p className="text-sm text-primary-200">
                Comprehensive coverage on labor and parts
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary-700 rounded-2xl p-8 sm:p-12 text-center text-white border border-primary-600">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Let's discuss your HVAC needs and create a custom solution for your home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-neutral-100 transition-all hover:scale-105 shadow-lg"
            >
              Get Free Estimate
            </a>
            <a
              href="tel:2404327489"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Call (240) 432-7489
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
