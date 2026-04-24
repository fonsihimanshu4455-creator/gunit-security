import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCoreValues, getSiteSettings } from "@/lib/site-data";
import { resolveIcon } from "@/lib/icons";
import { PageHero } from "@/components/shared/PageHero";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "G Unit Security — Perth's trusted security partner since 2010. 15+ years of excellence, $20M insured, licensed by Western Australia.",
};

export const dynamic = "force-dynamic";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Clients Protected" },
  { value: "$20M", label: "Insurance Coverage" },
  { value: "24/7", label: "Response Ready" },
];

export default async function AboutPage() {
  const [values, settings] = await Promise.all([getCoreValues(), getSiteSettings()]);

  return (
    <>
      <PageHero
        title={
          <>
            About <span className="brand-gradient-text">Us</span>
          </>
        }
        subtitle="Built on integrity, driven by excellence — discover the story behind Perth's most trusted security partner."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-navy-light bg-navy-rich flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-red-primary/20 via-transparent to-blue-primary/20" />
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="relative text-center">
              <p className="font-display text-[180px] leading-none brand-gradient-text tracking-wider">
                15+
              </p>
              <p className="text-xs tracking-[5px] text-off-white/70 uppercase mt-4">
                Years of Excellence
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wider">
              Guarding Perth <span className="brand-gradient-text">Since 2010</span>
            </h2>
            <p className="text-gray-mid leading-relaxed">
              G Unit Security was founded with a singular mission: to deliver uncompromising
              security services that protect what matters most to our clients. From our base in
              Mirrabooka, Western Australia, we&apos;ve grown into one of Perth&apos;s most trusted
              security providers.
            </p>
            <p className="text-gray-mid leading-relaxed">
              Our approach combines rigorous training, advanced technology, and deep industry
              expertise. We&apos;ve built lasting relationships with local government, major events
              organisers, commercial properties, and hotels — earning their trust through consistent
              excellence and uncompromising standards.
            </p>
            <p className="text-gray-mid leading-relaxed">
              With $20 million in comprehensive public and professional indemnity insurance, fully
              licensed personnel, and strong ties with WA Police and the Liquor Enforcement Unit, we
              stand ready to serve you with the highest level of professionalism.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-primary to-red-deep hover:from-red-bright hover:to-red-primary text-white text-xs tracking-[3px] uppercase font-medium px-7 py-3.5 rounded-lg transition shadow-[0_15px_40px_-15px_rgba(200,16,46,0.5)]"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-rich/40 grid-bg">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
            <SectionLabel>Core Competencies</SectionLabel>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wider">
              What <span className="brand-gradient-text">Drives</span> Us
            </h2>
            <p className="font-serif italic text-lg text-off-white/70">
              Six pillars that define how we operate, serve our clients, and continuously raise the
              bar for the security industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => {
              const Icon = resolveIcon(value.icon);
              return (
                <div
                  key={value.id}
                  className="bg-navy-rich border border-navy-light hover:border-red-primary/40 rounded-2xl p-7 transition hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-primary/20 to-blue-primary/20 flex items-center justify-center mb-5 border border-navy-light">
                    <Icon className="w-5 h-5 text-red-bright" />
                  </div>
                  <h3 className="font-display text-2xl tracking-wider mb-3">{value.title}</h3>
                  <p className="text-gray-mid text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <SectionLabel>By The Numbers</SectionLabel>
            <h2 className="font-display text-5xl tracking-wider">
              Trusted <span className="brand-gradient-text">Excellence</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-navy-rich border border-navy-light rounded-2xl p-8 text-center"
              >
                <p className="font-display text-6xl brand-gradient-text tracking-wider">
                  {stat.value}
                </p>
                <p className="text-xs tracking-[3px] text-gray-mid mt-2 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection settings={settings} />
    </>
  );
}
