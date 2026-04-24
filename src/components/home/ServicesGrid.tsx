import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { resolveIcon } from "@/lib/icons";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wider">
            Complete <span className="brand-gradient-text">Security</span>
            <br />
            Solutions
          </h2>
          <p className="font-serif italic text-lg text-off-white/70">
            From intimate VIP details to large-scale event security — our distinctly uniformed,
            fully-licensed team delivers with the highest standards in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = resolveIcon(service.icon);
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative bg-navy-rich border border-navy-light hover:border-red-primary/40 rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(200,16,46,0.4)]"
              >
                <span className="absolute top-4 right-5 font-display text-2xl text-off-white/10 group-hover:text-red-bright/40 transition">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-primary/20 to-blue-primary/20 flex items-center justify-center mb-5 border border-navy-light group-hover:border-red-primary/40 transition">
                  <Icon className="w-5 h-5 text-red-bright" />
                </div>
                <h3 className="font-display text-2xl tracking-wider mb-3">{service.title}</h3>
                <p className="text-gray-mid text-sm leading-relaxed mb-5">{service.shortDesc}</p>
                <span className="inline-flex items-center gap-1.5 text-red-bright text-xs tracking-widest uppercase font-medium group-hover:gap-2.5 transition-all">
                  Discover More
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
