import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getSiteSettings } from "@/lib/site-data";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { QuoteCalculator } from "@/components/forms/QuoteCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact G-Unit Security Perth — 24/7 Emergency Response",
  description:
    "Call +61 426 842 606 or email mandy.s@gunitsecurity.com.au. Head office in Perth, Western Australia. 24/7 emergency response, office hours Mon–Fri 9am–6pm.",
  path: "/contact",
});

export const revalidate = 600;

/**
 * The ONLY Google Maps URL form that reliably renders inside an iframe
 * without an API key is the one Maps produces via "Share → Embed a map":
 *   https://www.google.com/maps/embed?pb=...
 * Anything else — search URLs, /maps/place links, maps.app.goo.gl
 * shortlinks, q=&output=embed hacks — is now rejected by Google with a
 * broken-document iframe response. So we only return a real embed URL
 * when we're confident it will load; otherwise the caller falls back to
 * the clean address card.
 */
function resolveMapEmbedUrl(input: string | null | undefined): string | null {
  if (!input) return null;
  const value = input.trim();
  if (!value) return null;
  // Pasted full <iframe ... src="https://www.google.com/maps/embed?pb=...">
  const iframeMatch = value.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeMatch && /\/maps\/embed\?pb=/i.test(iframeMatch[1])) {
    return iframeMatch[1];
  }
  // Raw embed URL pasted directly.
  if (/\/maps\/embed\?pb=/i.test(value)) {
    return value;
  }
  return null;
}

function directionsUrl(address: string | null): string {
  const query = encodeURIComponent(address ?? "Perth WA 6000");
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const infoCards = [
    {
      icon: MapPin,
      label: "Head Office",
      value: settings?.address ?? "Perth CBD, WA",
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
      value: settings?.email ?? "mandy.s@gunitsecurity.com.au",
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
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

          {/* AI-assisted quote calculator */}
          <div className="mt-20">
            <QuoteCalculator />
          </div>

          {/* Office map */}
          <div className="mt-20">
            <h2 className="font-display text-3xl tracking-wider text-center mb-8">
              Find <span className="brand-gradient-text">Our Office</span>
            </h2>
            {(() => {
              // Only render the iframe when admin has pasted the real Google
              // Maps embed URL (the only form that works without API key).
              // Everything else — share links, search URLs, normal map URLs
              // — would produce Google's broken-iframe response, so we fall
              // through to the clean address card instead.
              const embedSrc = resolveMapEmbedUrl(settings?.mapEmbedUrl);
              if (embedSrc) {
                return (
                  <div className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                    <iframe
                      title="G-Unit Security office on Google Maps"
                      src={embedSrc}
                      width="100%"
                      height="420"
                      style={{
                        border: 0,
                        filter: "invert(92%) hue-rotate(180deg) brightness(0.95) contrast(1.1)",
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                );
              }
              return (
                <a
                  href={directionsUrl(settings?.address ?? null)}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-white/8 bg-navy-rich hover:border-red-primary/40 transition p-12 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-primary/20 to-blue-primary/20 border border-navy-light flex items-center justify-center mx-auto mb-5">
                    <MapPin className="w-6 h-6 text-red-bright" />
                  </div>
                  <p className="font-display text-2xl tracking-wider mb-2">
                    {settings?.address ?? "Perth, WA"}
                  </p>
                  <p className="text-gold-bright text-xs tracking-[3px] uppercase">
                    Open in Google Maps →
                  </p>
                </a>
              );
            })()}
            <p className="text-center text-gray-mid text-sm mt-4">
              {settings?.address ?? "Perth, WA"} ·{" "}
              <a
                href={directionsUrl(settings?.address ?? null)}
                target="_blank"
                rel="noreferrer"
                className="text-gold-bright hover:text-gold-soft underline-offset-4 hover:underline"
              >
                Get directions
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
