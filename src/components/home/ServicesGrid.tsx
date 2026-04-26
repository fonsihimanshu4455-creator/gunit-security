import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal, RevealStagger } from "@/components/shared/Reveal";
import { resolveIcon } from "@/lib/icons";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider">
            Complete <span className="brand-gradient-text">Security</span>
            <br />
            Solutions
          </h2>
          <p className="font-serif italic text-xl text-off-white/65 leading-relaxed">
            From intimate VIP details to large-scale event security — our distinctly uniformed,
            fully-licensed team delivers with the highest standards in the industry.
          </p>
        </Reveal>

        <RevealStagger
          stagger={0.07}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => {
            const Icon = resolveIcon(service.icon);
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative card-luxury rounded-2xl p-7 block"
              >
                <span className="absolute top-4 right-5 font-display text-2xl text-off-white/10 group-hover:text-gold-accent/40 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-primary/20 to-blue-primary/20 flex items-center justify-center mb-6 border border-white/8 group-hover:border-gold-accent/40 transition-colors">
                  <Icon className="w-5 h-5 text-red-bright group-hover:text-gold-bright transition-colors" />
                </div>
                <h3 className="font-display text-2xl tracking-wider mb-3 group-hover:gold-gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="text-off-white/60 text-sm leading-relaxed mb-6">{service.shortDesc}</p>
                <span className="inline-flex items-center gap-1.5 text-gold-bright text-[10px] tracking-[3px] uppercase font-medium group-hover:gap-3 transition-all">
                  Discover More
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
