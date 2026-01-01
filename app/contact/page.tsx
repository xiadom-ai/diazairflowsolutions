import { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { FAQs } from "@/components/sections/faqs/FAQs";
import { ServiceAreas } from "@/components/sections/service-areas/ServiceAreas";

export const metadata: Metadata = {
    title: "Contact Us | Diaz Airflow Solutions Inc.",
    description: "Contact Diaz Airflow Solutions Inc. for all your HVAC needs. 24/7 emergency service available. Call (240) 432-7489 or schedule online.",
};

export default function ContactPage() {
    return (
        <main className="bg-neutral-950">
            {/* Hero Section */}
            <Hero
                headline="Get In Touch"
                subheadline="We're here to help with all your heating and cooling needs. Available 24/7 for emergencies."
                backgroundImage="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1200&q=80"
            />

            <ContactForm />
            <FAQs />
            <ServiceAreas />
        </main>
    );
}
