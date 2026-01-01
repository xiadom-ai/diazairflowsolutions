import { Hero } from "@/components/sections/hero/Hero";
import { Features } from "@/components/sections/features/Features";
import { Statistics } from "@/components/sections/statistics/Statistics";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { WhoWeAre } from "@/components/sections/homepage/WhoWeAre";
import { WhyChooseUs } from "@/components/sections/homepage/WhyChooseUs";
import { WeGuarantee } from "@/components/sections/homepage/WeGuarantee";
import { companyInfo, heroSection } from "@/lib/data";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero
        headline={heroSection.main_headline}
        subheadline={heroSection.sub_headline}
        primaryCTA={{
          text: heroSection.cta_primary.text,
          href: heroSection.cta_primary.action
        }}
        secondaryCTA={{
          text: heroSection.cta_secondary.text,
          href: heroSection.cta_secondary.action
        }}
        backgroundImage={heroSection.hero_image}
      />
      <WhoWeAre />
      <Features />
      <WhyChooseUs />
      <WeGuarantee />
      <Statistics />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
