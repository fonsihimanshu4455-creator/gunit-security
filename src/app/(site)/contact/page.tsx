import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getSiteSettings } from "@/lib/site-data";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with G Unit Security. 24/7 emergency response. Based in Mirrabooka, WA.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const infoCards = [
    {
      icon: MapPin,
      label: "Head Office",
      value: settings?.address ?? "Mirrabooka, WA",
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings?.phone ?? "+61 426 842 606",
      href: settings?.phone ? `tel:${settings.phone.replace(/\s/g, "")}` : undefined,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings?.email ?? "info@gunitsecurity.com.au",
      href: settings?.email ? `mailto:${settings.email}` : undefined,
    },
    {
      icon: Clock,
      label: "Hours",
      value: settings?.hours ?? "24/7 Emergency Response",
    },
  ];

  return (
    <>
      <PageHero
        title={
          <>
            Get In <span className="brand-gradient-text">Touch</span>
          </>
        }
        subtitle="Ready to secure what matters? Our team is standing by 24/7 to discuss your needs."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {infoCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="bg-navy-rich border border-navy-light hover:border-red-primary/40 rounded-2xl p-6 h-full transition hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-primary/20 to-blue-primary/20 flex items-center justify-center mb-4 border border-navy-light">
                    <Icon className="w-5 h-5 text-red-bright" />
                  </div>
                  <p className="text-xs tracking-widest text-gray-mid uppercase mb-1.5">
                    {card.label}
                  </p>
                  <p className="text-off-white whitespace-pre-line text-sm leading-relaxed">
                    {card.value}
                  </p>
                </div>
              );
              return card.href ? (
                <a key={card.label} href={card.href}>
                  {content}
                </a>
              ) : (
                <div key={card.label}>{content}</div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-navy-rich border border-navy-light rounded-2xl p-8">
              <h2 className="font-display text-4xl tracking-wider mb-2">Send a Message</h2>
              <p className="text-gray-mid text-sm mb-8">
                Fill out the form below and we&apos;ll respond within one business day.
              </p>
              <ContactForm />
            </div>

            <aside className="lg:col-span-2 space-y-6">
              <div className="bg-navy-rich border border-navy-light rounded-2xl p-8">
                <h3 className="font-display text-2xl tracking-wider mb-4">Emergency Response</h3>
                <p className="text-gray-mid text-sm leading-relaxed mb-4">
                  For urgent security matters, call our 24/7 line. Trained operators dispatch
                  mobile patrols and coordinate with WA Police as required.
                </p>
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 font-display text-3xl tracking-wider brand-gradient-text"
                  >
                    {settings.phone}
                  </a>
                )}
              </div>

              <div className="bg-gradient-to-br from-red-primary/15 via-navy-rich to-blue-primary/15 border border-navy-light rounded-2xl p-8">
                <h3 className="font-display text-2xl tracking-wider mb-3">Request a Quote</h3>
                <p className="text-gray-mid text-sm leading-relaxed">
                  Share your requirements and we&apos;ll prepare a tailored proposal — including
                  licensing, coverage, and pricing — within 24 hours.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
