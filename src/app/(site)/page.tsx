import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import {
  getPublishedHeroSlides,
  getPartners,
  getPublishedServices,
  getPublishedIndustries,
  getPublishedTestimonials,
  getSiteSettings,
} from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [slides, partners, services, industries, testimonials, settings] = await Promise.all([
    getPublishedHeroSlides(),
    getPartners(),
    getPublishedServices(),
    getPublishedIndustries(),
    getPublishedTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <TrustBar partners={partners} />
      <ServicesGrid services={services} />
      <WhyUs />
      <IndustriesSection industries={industries} />
      <Testimonials items={testimonials} />
      <CTASection settings={settings} />
    </>
  );
}
