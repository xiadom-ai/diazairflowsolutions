import { Features } from "@/components/sections/features/Features";
import { Hero } from "@/components/sections/hero/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Diaz Airflow Solutions Inc.",
    description: "Professional HVAC services in MD, VA, and DC. AC installation, repair, heating services, and air quality solutions.",
};

export default function ServicesPage() {
    return (
        <main>
            {/* Hero Section */}
            <Hero
                headline="Our Services"
                subheadline="Expert HVAC solutions tailored to your needs. From installation to maintenance, we handle it all."
                backgroundImage="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
            />
            <Features />
        </main>
    );
}
